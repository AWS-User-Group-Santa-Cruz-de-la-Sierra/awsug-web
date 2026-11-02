/**
 * Un solo orquestador para todos los stickers de la página.
 *
 * - Stickers sueltos ([data-sticker]): se pegan al entrar en pantalla, escalonados por grupo.
 * - Pistas ([data-sticker-track]): sus stickers se pegan uno a uno según avanza el scroll
 *   por la sección, así la tapa se va llenando mientras bajas.
 * - Profundidad ([data-depth]): los stickers del hero se desplazan a distinta velocidad.
 * - Táctil: tocar un sticker le levanta la esquina un momento.
 */
const raiz = document.documentElement;
const todos = Array.from(document.querySelectorAll<HTMLElement>('[data-sticker]'));
const pistas = Array.from(document.querySelectorAll<HTMLElement>('[data-sticker-track]'));
const enPista = new Set(pistas.flatMap((p) => Array.from(p.querySelectorAll<HTMLElement>('[data-sticker]'))));
const sueltos = todos.filter((s) => !enPista.has(s));
const hero = document.querySelector<HTMLElement>('[data-hero]');

const pegar = (s: Element) => s.classList.add('is-stuck');

if (!raiz.classList.contains('motion') || !('IntersectionObserver' in window)) {
  todos.forEach(pegar);
} else {
  // 1. stickers sueltos, escalonados dentro de su grupo
  const indices = new Map<Element, number>();
  for (const s of sueltos) {
    const grupo = s.closest('[data-sticker-group]') ?? document.body;
    const i = indices.get(grupo) ?? 0;
    indices.set(grupo, i + 1);
    s.style.setProperty('--d', `${Math.min(i, 8) * 110}ms`);
  }

  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        pegar(e.target);
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  sueltos.forEach((s) => io.observe(s));

  // 2 y 3. un solo hilo de scroll para las pistas y la profundidad del hero
  const pendientes = pistas.map((pista) => ({
    pista,
    stickers: Array.from(pista.querySelectorAll<HTMLElement>('[data-sticker]')),
  }));

  let programado = false;
  function cuadro() {
    programado = false;
    const alto = window.innerHeight;

    for (const p of pendientes) {
      if (!p.stickers.length) continue;
      const r = p.pista.getBoundingClientRect();
      // 0 cuando la pista asoma por abajo, 1 cuando su centro pasa el centro de la pantalla
      const avance = Math.min(1, Math.max(0, (alto - r.top) / (alto * 0.55 + r.height * 0.5)));
      const n = p.stickers.length;
      p.stickers = p.stickers.filter((s, i) => {
        if (avance >= (i + 1) / (n + 1)) {
          pegar(s);
          return false;
        }
        return true;
      });
    }

    if (hero) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > 0) raiz.style.setProperty('--hero-scroll', String(Math.max(0, -r.top)));
    }
  }

  const pedir = () => {
    if (!programado) {
      programado = true;
      requestAnimationFrame(cuadro);
    }
  };
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  cuadro();

  // si alguien imprime la página, todo debe estar pegado
  window.addEventListener('beforeprint', () => todos.forEach(pegar));
}

// 4. en táctil, tocar un sticker le levanta la esquina
document.addEventListener(
  'pointerdown',
  (e) => {
    if (e.pointerType !== 'touch') return;
    const s = (e.target as Element).closest<HTMLElement>('.sticker');
    if (!s || !s.querySelector(':scope > .peel')) return;
    s.classList.add('tocado');
    window.setTimeout(() => s.classList.remove('tocado'), 900);
  },
  { passive: true },
);
