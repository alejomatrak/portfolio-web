const $ = (id) => document.getElementById(id);
const thumb = (p, size = '1280x720') => `https://i.vimeocdn.com/video/${p.thumb}-d_${size}`;
const pad = (n) => String(n).padStart(2, '0');

// --- Logos de marcas en la portada ---
// La misma fila va en la portada y en la barra fija que aparece al bajar.
const brandsHTML = BRANDS.map((b) => `
  <li><a href="#${b.open}" aria-label="${b.name}: view project" title="${b.name}">
    ${b.logo ? `<img class="${b.crop ? 'crop' : ''} ${b.keep ? 'keep' : ''}" style="--s:${b.size || 1}" src="${b.logo}" alt="${b.name}">` : `<span>${b.name}</span>`}
  </a></li>`).join('');
$('brands').innerHTML = brandsHTML;
$('brandbar').innerHTML = brandsHTML;

// --- Trabajo por secciones de marca ---
// Cada marca tiene su fila; sus piezas van una al lado de la otra y se deslizan hacia la derecha.
// El video se carga al darle play, para que la página abra rápido.
const video = (p) => `
      <div class="player${p.cover ? ' corner' : ''}" style="--ratio:${p.ratio || '16 / 9'}">
        <button ${p.file ? `data-file="${p.file}"` : `data-vimeo="${p.vimeo}"`} data-title="${p.title}" aria-label="Play ${p.title}">
          <img src="${p.cover || thumb(p)}" alt="" loading="lazy"><span class="play"><span class="tri"></span></span>
        </button>
      </div>`;

// Pieza en bucle (como un GIF): corre sola y sin sonido.
const loop = (p) => `
      <div class="loop-card" style="--ratio:${p.ratio}">
        <video class="loop" src="${p.loop.file}" poster="${p.loop.poster}" muted loop playsinline preload="none" aria-label="${p.title}"></video>
      </div>`;

const photos = (p) => `
      <div class="photos">${p.images.map((im) => `<figure><img src="${im.src}" alt="${im.caption}" loading="lazy"><figcaption>${im.caption}</figcaption></figure>`).join('')}</div>`;

const card = (p) => `
    <div class="card">
      <p class="card-label"><b>${p.title}</b><span>${p.role}</span></p>
      ${p.images ? photos(p) : p.loop ? loop(p) : video(p)}
      ${p.desc ? `<div class="card-info"><p>${p.desc}</p>${p.tools && p.tools.length ? `<ul class="chips">${p.tools.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}</div>` : ''}
    </div>`;

const reelSection = { id: REEL.id, title: REEL.title, client: REEL.client, year: REEL.year, items: [REEL] };
$('feed').innerHTML = [...SECTIONS, reelSection].map((s, i) => `
  <article class="project" id="${s.id}">
    <p class="eyebrow"><b>${s === reelSection ? 'Reel' : pad(i + 1)}</b> / ${s.client} · ${s.year}</p>
    <header class="head">
      <h2>${s.titleLogo ? `<img class="title-logo" src="${s.titleLogo}" alt="${s.title}">` : s.title}</h2>
      ${s.items.length > 1 ? `<div class="arrows"><button class="prev" aria-label="Previous">←</button><button class="next" aria-label="Next">→</button></div>` : ''}
    </header>
    <div class="track">${s.items.map(card).join('')}</div>
  </article>`).join('');

// Flechas: deslizan la fila una pieza a la vez.
document.addEventListener('click', (e) => {
  const arrow = e.target.closest('.arrows button');
  if (!arrow) return;
  const track = arrow.closest('.project').querySelector('.track');
  const cards = [...track.children];
  const x = track.scrollLeft;
  const pos = cards.map((c) => c.offsetLeft - track.firstElementChild.offsetLeft);
  const target = arrow.classList.contains('next') ? pos.find((l) => l > x + 4) : [...pos].reverse().find((l) => l < x - 4);
  track.scrollTo({ left: target ?? (arrow.classList.contains('next') ? track.scrollWidth : 0), behavior: 'smooth' });
});
function updateArrows(track) {
  const a = track.closest('.project').querySelector('.arrows');
  if (!a) return;
  a.querySelector('.prev').disabled = track.scrollLeft < 4;
  a.querySelector('.next').disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 4;
  a.hidden = track.scrollWidth <= track.clientWidth + 4;
}
document.querySelectorAll('.track').forEach((t) => {
  t.addEventListener('scroll', () => updateArrows(t), { passive: true });
  addEventListener('resize', () => updateArrows(t));
  updateArrows(t);
});

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
  $('sound-label').textContent = m ? 'Unmute' : 'Mute';
}

function play(btn) {
  // Solo suena un video a la vez: los demás vuelven a su portada.
  document.querySelectorAll('.player.playing').forEach((el) => {
    el.classList.remove('playing');
    el.querySelector('iframe, video').remove();
  });
  const player = btn.parentElement;
  player.classList.add('playing');
  if (btn.dataset.file) {
    // Video alojado en el propio sitio.
    player.insertAdjacentHTML('beforeend', `<video src="${btn.dataset.file}" autoplay controls playsinline title="${btn.dataset.title}"></video>`);
    const v = player.querySelector('video');
    v.addEventListener('volumechange', () => showMuted(v.muted));
    v.play().catch(() => { v.muted = true; v.play(); });
    showMuted(v.muted);
    sound.classList.add('on');
    return;
  }
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
  const v = document.querySelector('.player.playing video');
  if (v) { v.muted = next; if (!next) v.play(); showMuted(next); return; }
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

// Los videos en bucle solo corren cuando se ven.
const loopObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause()));
}, { threshold: 0.25 });
document.querySelectorAll('video.loop').forEach((v) => loopObserver.observe(v));
