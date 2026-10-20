import { PeruvianAvatar, Badge } from '../types/tutor';

export const PERUVIAN_AVATARS: PeruvianAvatar[] = [
  {
    id: 'llama',
    name: 'Kusi',
    title: 'Llamita Sabia',
    region: 'Altiplano (Puno y Cusco)',
    emoji: '🦙',
    color: '#58CC02',
    description: 'Curiosa, amable y experta en guiar a los exploradores escolares.'
  },
  {
    id: 'condor',
    name: 'Kuntur',
    title: 'Cóndor Andino',
    region: 'Cañón del Colca (Arequipa)',
    emoji: '🦅',
    color: '#1CB0F6',
    description: 'Vuela alto observando todos los detalles para resolver problemas complejos.'
  },
  {
    id: 'oso',
    name: 'Ukuku',
    title: 'Oso de Anteojos',
    region: 'Bosques de Neblina (Selva Alta)',
    emoji: '🐻',
    color: '#FFC800',
    description: 'Paciente, perseverante y con anteojos mágicos para leer con calma.'
  },
  {
    id: 'viringo',
    name: 'Viringo',
    title: 'Perro sin Pelo del Perú',
    region: 'Costa Norte (Chan Chan y Mochica)',
    emoji: '🐕',
    color: '#CE82FF',
    description: 'Guardián milenario y leal amigo que nunca te deja solo en las tareas.'
  },
  {
    id: 'delfin',
    name: 'Bufeo',
    title: 'Delfín Rosado',
    region: 'Río Amazonas (Loreto / Iquitos)',
    emoji: '🐬',
    color: '#FF6B8B',
    description: 'Alegre, juguetón y lleno de creatividad para imaginar grandes historias.'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-question',
    title: 'Primer Descubrimiento',
    description: '¡Hiciste tu primera pregunta en Kusi!',
    icon: '🌟',
    unlocked: true,
    unlockedAt: 'Hoy',
    requirement: 'Realiza 1 pregunta'
  },
  {
    id: 'curious-explorer',
    title: 'Chasqui de la Sabiduría',
    description: 'Completaste 3 preguntas seguidas en tu sesión de estudio.',
    icon: '🦙',
    unlocked: false,
    requirement: 'Realiza 3 preguntas'
  },
  {
    id: 'science-hero',
    title: 'Mente Científica & IA',
    description: 'Exploraste cómo funcionan las células, plantas o la Inteligencia Artificial.',
    icon: '🔬',
    unlocked: false,
    requirement: 'Pregunta en Ciencias'
  },
  {
    id: 'math-wizard',
    title: 'As de los Números',
    description: 'Resolviste dudas de fracciones, áreas o porcentajes de 6to de primaria.',
    icon: '📐',
    unlocked: false,
    requirement: 'Pregunta en Matemáticas'
  },
  {
    id: 'inca-historian',
    title: 'Sabio del Tahuantinsuyo',
    description: 'Aprendiste sobre los grandes gobernantes y la historia del Perú.',
    icon: '🏔️',
    unlocked: false,
    requirement: 'Pregunta en Historia'
  },
  {
    id: 'grammar-master',
    title: 'Pluma de Oro',
    description: 'Dominaste las reglas de tildes o análisis de oraciones en Lenguaje.',
    icon: '✍️',
    unlocked: false,
    requirement: 'Pregunta en Lenguaje'
  }
];
