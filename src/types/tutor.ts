/**
 * Tipos y modelos de datos para Kusi - Tutor IA Escolar
 */

export type MascotMood = 'happy' | 'thinking' | 'explaining' | 'celebrating';

export type SubjectCategory = 'ciencias' | 'matematicas' | 'historia' | 'lenguaje' | 'general';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  subject?: SubjectCategory;
  funFact?: string;
  isStreaming?: boolean;
}

export interface SubjectItem {
  id: SubjectCategory;
  name: string;
  tag: string;
  icon: string;
  colorName: 'green' | 'blue' | 'yellow' | 'purple';
  suggestedQuestions: string[];
}

export interface ServerStatus {
  mode: 'offline-local' | 'online';
  label: string;
  latencyMs: number;
}

export interface DailyProgress {
  day: string;
  fullDay: string;
  preguntas: number;
  estrellas: number;
  isToday?: boolean;
}

export interface PeruvianAvatar {
  id: string;
  name: string;
  title: string;
  region: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: string;
}

export interface StudentProfile {
  name: string;
  gradeSection: string;
  avatarId: string;
  isLoggedIn: boolean;
}
