// Edita aquí los proyectos: textos, orden, videos. La página se arma sola a partir de esta lista.
// vimeo: el número del video en Vimeo.  thumb: el id de la miniatura de Vimeo.
// images: lista de fotos (carpeta img/). Un proyecto puede tener video, fotos o las dos cosas.
const PROJECTS = [
  {
    id: 'ia-workflow',
    title: 'IA Workflow',
    client: 'IA generativa',
    year: '2026',
    role: 'Dirección, generación y montaje con IA',
    // Video principal del proyecto.
    videoLabel: 'IA Videoclip',
    desc: '«Addiction», un videoclip hecho de principio a fin con IA. Planos generados en Higgsfield con Seedance 2.5; guion técnico, prompts y referencias con Claude y Gemini; montaje y color en post. Y mucha pasión.',
    tools: ['Higgsfield', 'Seedance 2.5', 'Claude', 'Gemini'],
    vimeo: 1233232684,
    thumb: '2208841727-22d37ef92d83d7ea5cc7d174220b2eb605f82924cc5113b5afe85f802f487f1c',
    ratio: '4 / 3',
    // Segunda parte: galería de fotos debajo del video.
    imagesLabel: 'Retratos de marca · Hazlo',
    imagesDesc: 'Retratos de marca producidos con IA: a partir de una foto y referencias de estilo, se generan variaciones de ángulo, fondo y encuadre listas para campaña.',
    images: [
      { src: 'img/ia-1.jpg', caption: 'Fondo original' },
      { src: 'img/ia-2.jpg', caption: 'Contrapicado' },
      { src: 'img/ia-3.jpg', caption: 'Picado' },
      { src: 'img/ia-4.jpg', caption: 'Retrato fondo azul' },
    ],
  },
  {
    id: 'casa-medina',
    title: 'Casa Medina 80 años',
    client: 'Four Seasons Casa Medina',
    year: '2026',
    role: 'Dirección y edición',
    desc: 'Pieza conmemorativa por los 80 años de Casa Medina. Fotografía de archivo y recortes históricos montados como un collage que recorre la memoria del edificio.',
    tools: ['Premiere Pro', 'After Effects'],
    vimeo: 1230037186,
    thumb: '2204846376-af82214321355b164d8ca771aa030df4fdd8119849953727e180992f4acac079',
  },
  {
    id: 'huawei',
    title: 'Watch GT Runner 2',
    client: 'Huawei',
    year: '2026',
    role: 'Producción, edición y fotografía',
    desc: 'Pieza de producto para el Huawei Watch GT Runner 2 bajo el concepto “No Human is Limited”: tipografía, radiografías del cuerpo en movimiento y ritmo de carrera en el corte.',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    vimeo: 1219108650,
    thumb: '2191216853-ac5165aa80af9630d5090973f5afe04770b6cfe9f58a2ab5110b0d3eab86cd00',
  },
  {
    id: 'sony-inzone',
    title: 'Sony INZONE × F4',
    client: 'Sony INZONE',
    year: '2026',
    role: 'Dirección, producción y edición',
    desc: 'Contenido de marca para Sony INZONE junto al equipo F4 Esports. Entrevista y producto, de la preproducción al máster.',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    vimeo: 1219109971,
    thumb: '2191218602-14f2fb73debb3188856b56404b065537b32d71640b6a68338045e4c5609d1fa2',
  },
  {
    id: 'vfx',
    title: 'VFX y Shorts',
    client: 'Varios',
    year: '2026',
    role: 'Efectos y montaje',
    desc: 'Selección de piezas verticales con efectos visuales: composición, tracking y montaje pensado para formato corto.',
    tools: ['After Effects', 'Blender', 'Premiere Pro'],
    vimeo: 1219110215,
    thumb: '2191218969-76bbeba55306e28d45d6517449e749f42ade787223d2c079927c48f663b15a54',
  },
  {
    id: 'ego-t4',
    title: 'eGo · T4',
    client: 'eGo / T4',
    year: '2026',
    role: 'Edición y grafismo',
    desc: 'Contenido social para eGo y T4: piezas verticales de producto y trabajo con influencers, con grafismo y corte hechos para el feed.',
    tools: ['Premiere Pro', 'After Effects', 'CapCut'],
    vimeo: 1219110301,
    thumb: '2191219123-199166a6d52155ef625cc7f1a9064b9f93d7ae8c15ad1a615e8b7411bae9603c',
  },
  {
    id: 'hazlo',
    title: 'Hazlo × Tony Hawk',
    client: 'Hazlo',
    year: '2026',
    role: 'Marketing digital y estrategia',
    desc: 'Pieza del evento Tony Hawk Pro Skater 2 de Hazlo: el ambiente, la gente y el juego, editados para redes.',
    tools: ['Premiere Pro', 'After Effects'],
    vimeo: 1233040712,
    ratio: '16 / 10', // proporción del video si no es 16:9
    thumb: '2208598326-b0a52b7181e7049412246bdb0aa2f25c571209c447d3d8f637209112a34728a9',
  },
  {
    id: 'f4',
    title: 'F4 Esports',
    client: 'F4',
    year: '2026',
    role: 'Dirección creativa y marketing de influencers',
    desc: 'Dirección creativa para F4 Esports: presentaciones de equipo, identidad en video y campañas con creadores.',
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
  role: 'Dirección, edición y color',
  desc: 'Un minuto con lo mejor del año: piezas de marca, contenido social y VFX.',
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
  { name: 'IA Workflow', open: 'ia-workflow', logo: 'img/logo-ia.png', size: 1.9, keep: true }, // rótulo cromado años 2000
  { name: 'Huawei', open: 'huawei', logo: 'img/logo-huawei.png', size: 1.5 },
  { name: 'Four Seasons', open: 'casa-medina', logo: 'img/logo-fourseasons.svg', size: 1.45 },
  { name: 'Sony', open: 'sony-inzone', logo: 'img/logo-sony.svg', size: 0.55, crop: true },
  { name: 'T4', open: 'ego-t4', logo: 'img/logo-t4.png', keep: true },
  { name: 'eGo', open: 'ego-t4', logo: 'img/logo-ego.png', size: 0.8, keep: true },
  { name: 'Hazlo', open: 'hazlo', logo: 'img/logo-hazlo.png', size: 0.5 },
  { name: 'F4', open: 'f4' },
];
