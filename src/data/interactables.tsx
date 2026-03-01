export interface TileCoord {
  r: number;
  c: number;
}

export interface InteractableContent {
  title: string;
  items: string[];
}

export interface Interactable {
  id: string;
  tiles: TileCoord[];
  label: string;
  icon: string;
  color: string;
  content: InteractableContent;pm
}

export const INTERACTABLES: Interactable[] = [
  {
    id: "shelf",
    tiles: [
      { r: 2, c: 2 },
      { r: 2, c: 3 },
      { r: 2, c: 4 },
      { r: 3, c: 2 },
    ],
    label: "📚 Estantería",
    icon: "📚",
    color: "#8B5E3C",
    content: {
      title: "Mis Tecnologías",
      items: [
        "React / Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "Figma",
        "Git",
      ],
    },
  },
  {
    id: "monitor",
    tiles: [
      { r: 2, c: 10 },
      { r: 2, c: 11 },
      { r: 3, c: 10 },
    ],
    label: "🖥️ Monitor",
    icon: "🖥️",
    color: "#3B82F6",
    content: {
      title: "Mis Proyectos",
      items: [
        "🚀 Proyecto A — descripción breve",
        "🎨 Proyecto B — descripción breve",
        "🔧 Proyecto C — descripción breve",
      ],
    },
  },
  {
    id: "desk",
    tiles: [
      { r: 8, c: 10 },
      { r: 8, c: 11 },
      { r: 8, c: 12 },
      { r: 9, c: 10 },
    ],
    label: "🪑 Escritorio",
    icon: "🪑",
    color: "#10B981",
    content: {
      title: "Sobre mí",
      items: [
        "👋 ¡Hola! Soy [Tu Nombre]",
        "💼 Desarrollador / Diseñador",
        "📍 [Tu ciudad]",
        "✉️ [tu@email.com]",
      ],
    },
  },
  {
    id: "plant",
    tiles: [{ r: 7, c: 12 }],
    label: "🌿 Planta",
    icon: "🌿",
    color: "#22C55E",
    content: {
      title: "Fun facts",
      items: [
        "☕ Café por las mañanas",
        "🎮 Gamer de fin de semana",
        "🐈 Team gato",
        "🎵 Música mientras codifico",
      ],
    },
  },
];
