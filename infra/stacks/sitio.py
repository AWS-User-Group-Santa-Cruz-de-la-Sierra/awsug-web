from aws_cdk import CfnOutput, Duration, RemovalPolicy, Stack
from aws_cdk import aws_certificatemanager as acm
from aws_cdk import aws_cloudfront as cloudfront
from aws_cdk import aws_cloudfront_origins as origins
from aws_cdk import aws_route53 as route53
from aws_cdk import aws_route53_targets as targets
from aws_cdk import aws_s3 as s3
from constructs import Construct

# El origen REST de S3 no resuelve /events/ → /events/index.html.
# Esta función lo hace y redirige /events → /events/ (trailingSlash: 'always' en Astro).
INDEX_REWRITE = """
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
    return request;
  }
  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (last.indexOf('.') === -1) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri + '/' } },
    };
  }
  return request;
}
"""


class SitioStack(Stack):
    def __init__(self, scope: Construct, id: str, *, dominio: str, hosted_zone_id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        bucket = s3.Bucket(
            self,
            "Bucket",
            bucket_name=f"awsug-web-{self.account}",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            object_ownership=s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
            encryption=s3.BucketEncryption.S3_MANAGED,
            enforce_ssl=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        zona = route53.HostedZone.from_hosted_zone_attributes(
            self, "Zona", hosted_zone_id=hosted_zone_id, zone_name=dominio
        )

        certificado = acm.Certificate(
            self,
            "Certificado",
            domain_name=dominio,
            validation=acm.CertificateValidation.from_dns(zona),
        )

        index_rewrite = cloudfront.Function(
            self,
            "IndexRewrite",
            code=cloudfront.FunctionCode.from_inline(INDEX_REWRITE),
            runtime=cloudfront.FunctionRuntime.JS_2_0,
            comment="Agrega index.html a las rutas de directorio",
        )

        # Sin s3:ListBucket, S3 responde 403 a lo que no existe: ambos van a 404.html.
        error_404 = [
            cloudfront.ErrorResponse(
                http_status=status,
                response_http_status=404,
                response_page_path="/404.html",
                ttl=Duration.minutes(1),
            )
            for status in (403, 404)
        ]

        distribucion = cloudfront.Distribution(
            self,
            "Distribucion",
            comment=dominio,
            domain_names=[dominio],
            certificate=certificado,
            minimum_protocol_version=cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            default_root_object="index.html",
            http_version=cloudfront.HttpVersion.HTTP2_AND_3,
            # PriceClass_All incluye los edges de Sudamérica (la audiencia está en Bolivia).
            price_class=cloudfront.PriceClass.PRICE_CLASS_ALL,
            error_responses=error_404,
            default_behavior=cloudfront.BehaviorOptions(
                # OAC: CDK agrega al bucket la política que deja leer solo a esta distribución.
                origin=origins.S3BucketOrigin.with_origin_access_control(bucket),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                response_headers_policy=cloudfront.ResponseHeadersPolicy.SECURITY_HEADERS,
                compress=True,
                function_associations=[
                    cloudfront.FunctionAssociation(
                        function=index_rewrite,
                        event_type=cloudfront.FunctionEventType.VIEWER_REQUEST,
                    )
                ],
            ),
        )

        destino = route53.RecordTarget.from_alias(targets.CloudFrontTarget(distribucion))
        route53.ARecord(self, "DnsA", zone=zona, target=destino)
        route53.AaaaRecord(self, "DnsAAAA", zone=zona, target=destino)

        # El workflow de publicación lee estas salidas; las exportaciones quedan para otros stacks.
        def salida(nombre: str, valor: str, exportar: bool = True) -> None:
            CfnOutput(
                self,
                nombre,
                value=valor,
                export_name=f"{self.stack_name}-{nombre}" if exportar else None,
            )

        salida("BucketName", bucket.bucket_name)
        salida("DistributionId", distribucion.distribution_id)
        salida("CertificateArn", certificado.certificate_arn)
        salida("HostedZoneId", zona.hosted_zone_id)
        salida("DistributionDomain", distribucion.distribution_domain_name, exportar=False)
        salida("SiteUrl", f"https://{dominio}/", exportar=False)
