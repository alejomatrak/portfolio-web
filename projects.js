// Edita aquí los proyectos: textos, orden, videos. La página se arma sola a partir de esta lista.
// vimeo: el número del video en Vimeo.  thumb: el id de la miniatura de Vimeo.  cover: imagen propia de portada (opcional).
// images: lista de fotos (carpeta img/). Un proyecto puede tener video, fotos o las dos cosas.
const PROJECTS = [
  {
    id: 'ia-workflow',
    title: 'AI Workflow',
    client: 'Generative AI',
    year: '2026',
    role: 'Direction, generation & editing with AI',
    // Video principal del proyecto.
    videoLabel: 'AI Music Video',
    desc: '“Addiction”, a music video made end to end with AI. Shots generated in Higgsfield with Seedance 2.5; shot list, prompts and references with Claude and Gemini; edit and color in post. And a lot of passion.',
    tools: ['Higgsfield', 'Seedance 2.5', 'Claude', 'Gemini'],
    vimeo: 1233232684,
    thumb: '2208841727-22d37ef92d83d7ea5cc7d174220b2eb605f82924cc5113b5afe85f802f487f1c',
    ratio: '4 / 3',
    // Segunda parte: galería de fotos debajo del video.
    imagesLabel: 'Brand portraits · Hazlo',
    imagesDesc: 'Brand portraits produced with AI: starting from one photo and a set of style references, generating variations in angle, background and framing, ready for campaign.',
    images: [
      { src: 'img/ia-1.jpg', caption: 'Original background' },
      { src: 'img/ia-2.jpg', caption: 'Low angle' },
      { src: 'img/ia-3.jpg', caption: 'High angle' },
      { src: 'img/ia-4.jpg', caption: 'Blue backdrop portrait' },
    ],
  },
  {
    id: 'casa-medina',
    title: 'Casa Medina 80th Anniversary',
    client: 'Four Seasons Casa Medina',
    year: '2026',
    role: 'Direction & editing',
    desc: 'Commemorative film for Casa Medina’s 80th anniversary. Archive photography and historical clippings edited as a collage that walks through the building’s memory.',
    tools: ['Premiere Pro', 'After Effects'],
    vimeo: 1230037186,
    thumb: '2204846376-af82214321355b164d8ca771aa030df4fdd8119849953727e180992f4acac079',
  },
  {
    id: 'huawei',
    title: 'Watch GT Runner 2',
    client: 'Huawei',
    year: '2026',
    role: 'Production, editing & cinematography',
    desc: 'Product film for the Huawei Watch GT Runner 2 under the “No Human is Limited” concept: typography, X-rays of the body in motion and a runner’s pace in the cut.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    vimeo: 1219108650,
    thumb: '2191216853-ac5165aa80af9630d5090973f5afe04770b6cfe9f58a2ab5110b0d3eab86cd00',
  },
  {
    id: 'sony-inzone',
    title: 'Sony INZONE × F4',
    client: 'Sony INZONE',
    year: '2026',
    role: 'Direction, production & editing',
    desc: 'Branded content for Sony INZONE with the F4 Esports team. Interview and product, from pre-production to master.',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    vimeo: 1219109971,
    thumb: '2191218602-14f2fb73debb3188856b56404b065537b32d71640b6a68338045e4c5609d1fa2',
  },
  {
    id: 'vfx',
    title: 'VFX & Shorts',
    client: 'Various',
    year: '2026',
    role: 'VFX & editing',
    desc: 'A selection of vertical pieces with visual effects: compositing, tracking and editing built for short-form.',
    tools: ['After Effects', 'Blender', 'Premiere Pro'],
    vimeo: 1219110215,
    thumb: '2191218969-76bbeba55306e28d45d6517449e749f42ade787223d2c079927c48f663b15a54',
  },
  {
    id: 'ego-t4',
    title: 'eGo · T4',
    client: 'eGo / T4',
    year: '2026',
    role: 'Editing & motion graphics',
    desc: 'Social content for eGo and T4: vertical product pieces and influencer work, with graphics and cuts made for the feed.',
    tools: ['Premiere Pro', 'After Effects', 'CapCut'],
    vimeo: 1219110301,
    thumb: '2191219123-199166a6d52155ef625cc7f1a9064b9f93d7ae8c15ad1a615e8b7411bae9603c',
  },
  {
    id: 'hazlo',
    title: 'Hazlo × Tony Hawk',
    client: 'Hazlo',
    year: '2026',
    role: 'Digital marketing & strategy',
    desc: 'Film from Hazlo’s Tony Hawk Pro Skater 2 event: the atmosphere, the people and the game, edited for social.',
    tools: ['Premiere Pro', 'After Effects'],
    vimeo: 1233040712,
    ratio: '16 / 10', // proporción del video si no es 16:9
    cover: 'img/hazlo-cover.jpg', // portada propia en vez de la miniatura de Vimeo
    thumb: '2208598326-b0a52b7181e7049412246bdb0aa2f25c571209c447d3d8f637209112a34728a9',
  },
  {
    id: 'f4',
    title: 'F4 Esports',
    client: 'F4',
    year: '2026',
    role: 'Creative direction & influencer marketing',
    desc: 'Creative direction for F4 Esports: team reveals, video identity and creator campaigns.',
    tools: ['Premiere Pro', 'After Effects', 'OBS'],
    vimeo: 1219110803,
    thumb: '2191219609-9e1790e27ec4318143aca97d8c77a69485c6a993cc9b5935bdb629c6d75222af',
  },
];

// El reel va de último en la sección de trabajo; el botón de la portada baja hasta él.
const REEL = {
  id: 'reel',
  title: 'Reel 2026',
  client: 'Alejandro Ariza',
  year: '2026',
  role: 'Direction, editing & color',
  desc: 'One minute with the best of the year: brand films, social content and VFX.',
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  vimeo: 1219110092,
  thumb: '2191218801-d71556fa66d48fc5919c70d5a75594dc16ef520d69fe6a46e097fd2fccdd6d8a',
};

// Logos de la portada. Al hacer clic abren el proyecto indicado en "open".
// logo: archivo en img/ (o URL). Se pinta en blanco automáticamente, así que sirve un PNG negro o de color con fondo transparente.
// keep: true deja el logo tal cual, sin repintarlo (para los que ya son blancos y tienen sombreado).
// Si una marca no tiene logo todavía, se muestra el nombre en texto.
// size: tamaño relativo del logo (1 = normal). Súbelo o bájalo para equilibrar la fila.
const BRANDS = [
  { name: 'AI Workflow', open: 'ia-workflow', logo: 'img/logo-ia.png', size: 1.9, keep: true }, // rótulo cromado años 2000
  { name: 'Huawei', open: 'huawei', logo: 'img/logo-huawei.png', size: 1.5 },
  { name: 'Four Seasons', open: 'casa-medina', logo: 'img/logo-fourseasons.svg', size: 1.45 },
  { name: 'Sony', open: 'sony-inzone', logo: 'img/logo-sony.svg', size: 0.55, crop: true },
  { name: 'T4', open: 'ego-t4', logo: 'img/logo-t4.png', keep: true },
  { name: 'eGo', open: 'ego-t4', logo: 'img/logo-ego.png', size: 0.8, keep: true },
  { name: 'Hazlo', open: 'hazlo', logo: 'img/logo-hazlo.png', size: 0.5 },
  { name: 'F4', open: 'f4' },
];
