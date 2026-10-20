import React from 'react';
import { SubjectCategory, SubjectItem } from '../types/tutor';
import { Atom, Calculator, Landmark, BookOpen } from 'lucide-react';

interface SubjectBarProps {
  selectedSubject: SubjectCategory | null;
  onSelectSubject: (subject: SubjectCategory) => void;
  onAskSuggestedQuestion: (question: string) => void;
}

export const SUBJECTS: SubjectItem[] = [
  {
    id: 'ciencias',
    name: 'Ciencias & IA',
    tag: 'Fotosíntesis · Algoritmos',
    icon: 'Atom',
    colorName: 'green',
    suggestedQuestions: [
      '¿Qué es la Inteligencia Artificial y cómo aprende?',
      '¿Cómo hacen las plantas la fotosíntesis?',
      '¿Cuáles son las partes de una célula?'
    ]
  },
  {
    id: 'matematicas',
    name: 'Matemáticas',
    tag: 'Fracciones · Áreas',
    icon: 'Calculator',
    colorName: 'blue',
    suggestedQuestions: [
      '¿Cómo sumo fracciones con diferente denominador?',
      '¿Cómo calculo el área de un triángulo y un rectángulo?',
      '¿Qué significa sacar el 20% de descuento de un precio?'
    ]
  },
  {
    id: 'historia',
    name: 'Historia',
    tag: 'Tahuantinsuyo · 1821',
    icon: 'Landmark',
    colorName: 'yellow',
    suggestedQuestions: [
      '¿Cómo organizó Pachacútec el Tahuantinsuyo?',
      '¿Quién proclamó la Independencia del Perú en 1821?',
      '¿Quiénes eran los Chasquis y qué era el Qhapaq Ñan?'
    ]
  },
  {
    id: 'lenguaje',
    name: 'Lenguaje',
    tag: 'Tildes · Sujeto y Verbo',
    icon: 'BookOpen',
    colorName: 'purple',
    suggestedQuestions: [
      '¿Cuál es la regla para tildar palabras agudas, graves y esdrújulas?',
      '¿Cómo identifico el sujeto y el predicado en una oración?',
      '¿Qué es una metáfora y para qué sirve en un poema?'
    ]
  }
];

export const SubjectBar: React.FC<SubjectBarProps> = ({
  selectedSubject,
  onSelectSubject,
  onAskSuggestedQuestion
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getButtonClass = (sub: SubjectItem, isSelected: boolean) => {
    if (sub.colorName === 'green') {
      return isSelected
        ? 'btn-3d-green ring-4 ring-[#58CC02]/30 scale-[1.02]'
        : 'btn-3d-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:border-[#58CC02] hover:text-[#58CC02]';
    }
    if (sub.colorName === 'blue') {
      return isSelected
        ? 'btn-3d-blue ring-4 ring-[#1CB0F6]/30 scale-[1.02]'
        : 'btn-3d-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:border-[#1CB0F6] hover:text-[#1CB0F6]';
    }
    if (sub.colorName === 'yellow') {
      return isSelected
        ? 'btn-3d-yellow ring-4 ring-[#FFC800]/40 scale-[1.02]'
        : 'btn-3d-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:border-[#FFC800] hover:text-[#794D00]';
    }
    return isSelected
      ? 'btn-3d-purple ring-4 ring-[#CE82FF]/30 scale-[1.02]'
      : 'btn-3d-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:border-[#CE82FF] hover:text-[#CE82FF]';
  };

  const currentSubjectData = SUBJECTS.find((s) => s.id === selectedSubject);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 rounded-3xl p-3.5 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Explora por Asignatura (6to de Primaria)
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-400 font-bold hidden sm:inline">
          Toca una materia para ver preguntas clave 👇
        </span>
      </div>

      {/* Grid de 4 botones 3D de materias */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {SUBJECTS.map((subject) => {
          const isSelected = selectedSubject === subject.id;
          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl font-black text-sm cursor-pointer ${getButtonClass(
                subject,
                isSelected
              )}`}
            >
              <div className="shrink-0">{renderIcon(subject.icon)}</div>
              <div className="text-left leading-tight truncate">
                <span className="block truncate">{subject.name}</span>
                <span className="block text-[10px] font-semibold opacity-85 truncate">
                  {subject.tag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tarjeta con sugerencias rápidas */}
      {currentSubjectData && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
            Preguntas populares sobre <span className="text-slate-900 dark:text-white font-extrabold">{currentSubjectData.name}</span>:
          </p>
          <div className="flex flex-wrap gap-2">
            {currentSubjectData.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onAskSuggestedQuestion(q)}
                className="text-left text-xs bg-slate-50 dark:bg-slate-800/80 hover:bg-[#58CC02]/10 dark:hover:bg-[#58CC02]/20 hover:border-[#58CC02] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow-2xs active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>✨</span>
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
