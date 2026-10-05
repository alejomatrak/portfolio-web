const $ = (id) => document.getElementById(id);
const thumb = (p, size = '1280x720') => `https://i.vimeocdn.com/video/${p.thumb}-d_${size}`;
const pad = (n) => String(n).padStart(2, '0');

// --- Logos de marcas en la portada ---
$('brands').innerHTML = BRANDS.map((b) => `
  <li><a href="#${b.open}" aria-label="${b.name}: ver proyecto" title="${b.name}">
    ${b.logo ? `<img class="${b.crop ? 'crop' : ''} ${b.keep ? 'keep' : ''}" style="--s:${b.size || 1}" src="${b.logo}" alt="${b.name}">` : `<span>${b.name}</span>`}
  </a></li>`).join('');

// --- Proyectos, uno debajo del otro ---
// El video se carga al darle play, para que la página abra rápido.
const media = (p) => p.images
  ? `<div class="gallery">${p.images.map((im) => `<figure><img src="${im.src}" alt="${im.caption}" loading="lazy"><figcaption>${im.caption}</figcaption></figure>`).join('')}</div>`
  : `<div class="player" style="--ratio:${p.ratio || '16 / 9'}">
      <button data-vimeo="${p.vimeo}" data-title="${p.title}" aria-label="Reproducir ${p.title}">
        <img src="${thumb(p)}" alt="" loading="lazy"><span class="play"><span class="tri"></span></span>
      </button>
    </div>`;

$('feed').innerHTML = [...PROJECTS, REEL].map((p, i) => `
  <article class="project" id="${p.id}">
    <p class="eyebrow"><b>${p === REEL ? 'Reel' : pad(i + 1)}</b> / ${p.client} · ${p.year}</p>
    ${media(p)}
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
  </article>`).join('');

function play(btn) {
  // Solo suena un video a la vez: los demás vuelven a su portada.
  document.querySelectorAll('.player.playing').forEach((el) => {
    el.classList.remove('playing');
    el.querySelector('iframe').remove();
  });
  const player = btn.parentElement;
  player.classList.add('playing');
  player.insertAdjacentHTML('beforeend', `<iframe src="https://player.vimeo.com/video/${btn.dataset.vimeo}?autoplay=1&title=0&byline=0&portrait=0&dnt=1" title="${btn.dataset.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`);
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.player button');
  if (btn) play(btn);
});

// --- Playhead y timecode según el scroll ---
const FPS = 24;
const DURATION = 60 * FPS; // la página "dura" un minuto
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const t = max > 0 ? scrollY / max : 0;
  $('playhead').style.transform = `scaleX(${t})`;
  const f = Math.round(t * DURATION);
  $('timecode').textContent = `00:${pad(Math.floor(f / FPS / 60))}:${pad(Math.floor(f / FPS) % 60)}:${pad(f % FPS)}`;
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();
