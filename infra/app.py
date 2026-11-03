#!/usr/bin/env python3
"""Infraestructura del sitio del AWS UG Santa Cruz (CDK).

Stack awsug-web: bucket S3 privado + CloudFront + certificado ACM + DNS en Route 53.
Vive en us-east-1 porque CloudFront exige el certificado en esa región.
"""
import os

import aws_cdk as cdk

from stacks.sitio import SitioStack

app = cdk.App()

SitioStack(
    app,
    "awsug-web",
    env=cdk.Environment(account=os.environ.get("CDK_DEFAULT_ACCOUNT"), region="us-east-1"),
    dominio=app.node.try_get_context("dominio"),
    hosted_zone_id=app.node.try_get_context("hostedZoneId"),
)

cdk.Tags.of(app).add("proyecto", "awsug-web")
app.synth()
