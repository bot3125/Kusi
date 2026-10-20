import React, { useState } from 'react';
import { PERUVIAN_AVATARS } from '../data/avatarsAndBadges';
import { StudentProfile } from '../types/tutor';
import { X, Sparkles, UserCheck, MapPin } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
  isDark: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  isDark
}) => {
  const [name, setName] = useState(currentProfile.name);
  const [gradeSection, setGradeSection] = useState(currentProfile.gradeSection);
  const [selectedAvatarId, setSelectedAvatarId] = useState(currentProfile.avatarId);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveProfile({
      name: name.trim(),
      gradeSection: gradeSection || '6to de Primaria',
      avatarId: selectedAvatarId,
      isLoggedIn: true
    });
    onClose();
  };

  const sections = ['6to A', '6to B', '6to C', '6to de Primaria'];

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
          <div className="w-12 h-12 rounded-2xl bg-[#1CB0F6] border-b-4 border-[#1899D6] flex items-center justify-center text-white shadow-xs">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Perfil del Estudiante
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-75">
              Personaliza tu identidad y elige tu avatar peruano acompañante
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nombre */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1.5 opacity-80">
              ¿Cómo te llamas? (Tu nombre o apodo)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Mateo, Valeria o Joaquín"
              className={`w-full px-4 py-3 rounded-2xl border-2 font-bold text-sm sm:text-base outline-none transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-700 focus:border-[#1CB0F6] text-white'
                  : 'bg-slate-50 border-slate-200 focus:border-[#1CB0F6] text-slate-900'
              }`}
            />
          </div>

          {/* Grado / Sección */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider mb-1.5 opacity-80">
              Grado y Sección Escolar
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sections.map((sec) => (
                <button
                  type="button"
                  key={sec}
                  onClick={() => setGradeSection(sec)}
                  className={`py-2 px-3 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${
                    gradeSection === sec
                      ? 'bg-[#1CB0F6] border-[#1899D6] text-white shadow-xs'
                      : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Avatares Peruanos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Elige tu Avatar Peruano
              </label>
              <span className="text-[11px] font-bold text-[#58CC02]">
                5 guardianes culturales
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
              {PERUVIAN_AVATARS.map((av) => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <div
                    key={av.id}
                    onClick={() => setSelectedAvatarId(av.id)}
                    className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-[#58CC02] bg-[#58CC02]/15 ring-2 ring-[#58CC02]/30 scale-[1.01]'
                        : isDark
                        ? 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                      {av.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                          {av.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-[#58CC02] text-white font-black px-1.5 py-0.2 rounded-md">
                            Activo
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">
                        {av.title}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 dark:text-slate-500 truncate">
                        <MapPin className="w-2.5 h-2.5 shrink-0" /> {av.region}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botones inferiores */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-3d-green px-5 py-2.5 rounded-xl font-black text-xs cursor-pointer disabled:opacity-50"
            >
              ¡Guardar mi Perfil!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
