import React from 'react';
import { Badge } from '../types/tutor';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  isDark: boolean;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges,
  isDark
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-xl rounded-3xl p-5 sm:p-6 shadow-2xl border-2 transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full border-2 transition-transform active:scale-90 ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFC800] border-b-4 border-[#E5A500] flex items-center justify-center text-amber-900 shadow-xs">
            <Award className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Medallas de Curiosidad
              </h2>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                {unlockedCount} de {badges.length} desbloqueadas
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold opacity-75">
              Recompensas por tus investigaciones en 6to de Primaria
            </p>
          </div>
        </div>

        {/* Barra de progreso de logros */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full mb-5 overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-[#58CC02] to-[#FFC800] rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
          ></div>
        </div>

        {/* Grid de medallas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                  badge.unlocked
                    ? isDark
                      ? 'bg-slate-800/90 border-amber-400/50 shadow-sm'
                      : 'bg-amber-50/60 border-amber-300 shadow-sm'
                    : isDark
                    ? 'bg-slate-800/30 border-slate-700/50 opacity-60'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                {/* Ícono de la medalla */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-b-3 shadow-xs ${
                    badge.unlocked
                      ? 'bg-white border-amber-300 ring-2 ring-amber-300/40 animate-in zoom-in-50'
                      : 'bg-slate-200 border-slate-300 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white truncate">
                      {badge.title}
                    </h3>
                    {badge.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                    {badge.description}
                  </p>
                  <span
                    className={`inline-block mt-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      badge.unlocked
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {badge.unlocked ? '¡Completado!' : badge.requirement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pie de modal */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="btn-3d-yellow px-5 py-2 rounded-xl text-xs font-black cursor-pointer"
          >
            ¡Genial!
          </button>
        </div>
      </div>
    </div>
  );
};
