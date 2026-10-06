const $ = (id) => document.getElementById(id);
const thumb = (p, size = '1280x720') => `https://i.vimeocdn.com/video/${p.thumb}-d_${size}`;
const pad = (n) => String(n).padStart(2, '0');

// --- Logos de marcas en la portada ---
// La misma fila va en la portada y en la barra fija que aparece al bajar.
const brandsHTML = BRANDS.map((b) => `
  <li><a href="#${b.open}" aria-label="${b.name}: ver proyecto" title="${b.name}">
    ${b.logo ? `<img class="${b.crop ? 'crop' : ''} ${b.keep ? 'keep' : ''}" style="--s:${b.size || 1}" src="${b.logo}" alt="${b.name}">` : `<span>${b.name}</span>`}
  </a></li>`).join('');
$('brands').innerHTML = brandsHTML;
$('brandbar').innerHTML = brandsHTML;

// --- Proyectos, uno debajo del otro ---
// El video se carga al darle play, para que la página abra rápido.
const gallery = (p) => `<div class="gallery">${p.images.map((im) => `<figure><img src="${im.src}" alt="${im.caption}" loading="lazy"><figcaption>${im.caption}</figcaption></figure>`).join('')}</div>`;
const video = (p) => `
    ${p.videoLabel ? `<p class="sublabel">${p.videoLabel}</p>` : ''}
    <div class="player" style="--ratio:${p.ratio || '16 / 9'}">
      <button data-vimeo="${p.vimeo}" data-title="${p.videoLabel || p.title}" aria-label="Reproducir ${p.videoLabel || p.title}">
        <img src="${thumb(p)}" alt="" loading="lazy"><span class="play"><span class="tri"></span></span>
      </button>
    </div>`;

$('feed').innerHTML = [...PROJECTS, REEL].map((p, i) => `
  <article class="project" id="${p.id}">
    <p class="eyebrow"><b>${p === REEL ? 'Reel' : pad(i + 1)}</b> / ${p.client} · ${p.year}</p>
    ${p.vimeo ? video(p) : gallery(p)}
    <div class="info">
      <div>
        <h2>${p.title}</h2>
        <p class="role">${p.role}</p>
      </div>
      <div>
        <p class="lead">${p.desc}</p>
        <ul class="chips">${p.tools.map((t) => `<li>${t}</li>`).join('')}</ul>
      </div>
    </div>
    ${p.vimeo && p.images ? `
    <div class="extra">
      <p class="sublabel">${p.imagesLabel || 'Fotos'}</p>
      ${p.imagesDesc ? `<p class="lead">${p.imagesDesc}</p>` : ''}
      ${gallery(p)}
    </div>` : ''}
  </article>`).join('');

const VIMEO = 'https://player.vimeo.com';
const sound = $('sound');
let muted = true;
const current = () => document.querySelector('.player.playing iframe');
const tell = (method, value) => {
  const f = current();
  if (f) f.contentWindow.postMessage(JSON.stringify(value === undefined ? { method } : { method, value }), VIMEO);
};
function showMuted(m) {
  muted = m;
  sound.classList.toggle('unmuted', !m);
  sound.setAttribute('aria-pressed', String(!m));
  $('sound-label').textContent = m ? 'Activar sonido' : 'Silenciar';
}

function play(btn) {
  // Solo suena un video a la vez: los demás vuelven a su portada.
  document.querySelectorAll('.player.playing').forEach((el) => {
    el.classList.remove('playing');
    el.querySelector('iframe').remove();
  });
  const player = btn.parentElement;
  player.classList.add('playing');
  player.insertAdjacentHTML('beforeend', `<iframe src="${VIMEO}/video/${btn.dataset.vimeo}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1" title="${btn.dataset.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
  sound.classList.add('on');
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.player button');
  if (btn) play(btn);
});

// El reproductor de Vimeo avisa si arrancó en silencio (en teléfonos suele hacerlo).
addEventListener('message', (e) => {
  const f = current();
  if (e.origin !== VIMEO || !f || e.source !== f.contentWindow) return;
  let d = e.data;
  try { if (typeof d === 'string') d = JSON.parse(d); } catch { return; }
  if (d.event === 'ready') {
    tell('addEventListener', 'volumechange');
    tell('addEventListener', 'play');
    tell('getMuted');
  } else if (d.event === 'volumechange' || d.event === 'play') {
    tell('getMuted');
  } else if (d.method === 'getMuted') {
    showMuted(!!d.value);
  }
});
sound.addEventListener('click', () => {
  const next = !muted;
  tell('setMuted', next);
  if (!next) { tell('setVolume', 1); tell('play'); }
  showMuted(next);
});

// --- Playhead y timecode según el scroll ---
const FPS = 24;
const DURATION = 60 * FPS; // la página "dura" un minuto
const hero = document.querySelector('.hero');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const t = max > 0 ? scrollY / max : 0;
  $('playhead').style.transform = `scaleX(${t})`;
  // La barra de marcas aparece cuando la fila de la portada ya salió de la pantalla.
  document.body.classList.toggle('stuck', $('brands').getBoundingClientRect().bottom < 60);
  // La foto de la portada se difumina a medida que se baja.
  hero.style.setProperty('--p', Math.min(1, scrollY / (hero.offsetHeight * 0.7)).toFixed(3));
  const f = Math.round(t * DURATION);
  $('timecode').textContent = `00:${pad(Math.floor(f / FPS / 60))}:${pad(Math.floor(f / FPS) % 60)}:${pad(f % FPS)}`;
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// Resalta en la barra la marca del proyecto que se está viendo.
const barLinks = [...$('brandbar').querySelectorAll('a')];
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    barLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    // En pantallas angostas la barra se desliza sola hasta la marca activa.
    const on = $('brandbar').querySelector('a.active');
    if (on) $('brandbar').scrollTo({ left: on.offsetLeft - $('brandbar').clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' });
  });
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('.project').forEach((p) => projectObserver.observe(p));
