import React from 'react';
import {
  Volume2,
  VolumeX,
  Server,
  RotateCcw,
  BarChart3,
  Award,
  Moon,
  Sun
} from 'lucide-react';
import { PeruvianAvatar, StudentProfile } from '../types/tutor';

interface HeaderProps {
  points: number;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  onResetChat: () => void;
  isLocalServerConnected: boolean;
  onToggleServerMode?: () => void;
  // Nuevas propiedades
  isDark: boolean;
  onToggleDarkMode: () => void;
  onOpenProgress: () => void;
  onOpenBadges: () => void;
  onOpenLogin: () => void;
  unlockedBadgesCount: number;
  studentProfile: StudentProfile;
  currentAvatar?: PeruvianAvatar;
}

export const Header: React.FC<HeaderProps> = ({
  points,
  speechEnabled,
  onToggleSpeech,
  onResetChat,
  isLocalServerConnected = true,
  onToggleServerMode,
  isDark,
  onToggleDarkMode,
  onOpenProgress,
  onOpenBadges,
  onOpenLogin,
  unlockedBadgesCount,
  studentProfile,
  currentAvatar
}) => {
  return (
    <header
      className={`sticky top-0 z-30 border-b-2 shadow-xs px-3 sm:px-6 py-2.5 transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-white backdrop-blur-md'
          : 'bg-white/95 border-slate-200 text-slate-800 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Lado Izquierdo: Marca e Identidad */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#58CC02] border-b-3 border-[#46A302] flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xs shrink-0">
            🦙
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                Kusi
              </h1>
              <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-[#1CB0F6]/15 text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
                Tutor IA Escolar
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold hidden sm:block">
              6to de Primaria · Aprende paso a paso
            </p>
          </div>
        </div>

        {/* Zona Central: Indicador Visual de Estado Requerido */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={onToggleServerMode}
            title="Haz clic para comprobar el estado de conexión del servidor local"
            className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold transition-all border shadow-xs ${
              isDark
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Server className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-slate-900"></span>
            </div>
            <div className="text-left">
              <span className="block leading-tight text-[11px] font-extrabold">
                {isLocalServerConnected
                  ? 'Modo Offline / Conectado al Servidor Local'
                  : 'Servidor Desconectado'}
              </span>
              <span className="block text-[9px] opacity-75">
                Latencia: 1s (Simulación didáctica)
              </span>
            </div>
          </button>
        </div>

        {/* Lado Derecho: Controles, Gráfico Recharts, Medallas, Modo Oscuro y Perfil */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Botón de Gráfico de Progreso Semanal (Recharts) */}
          <button
            onClick={onOpenProgress}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isDark
                ? 'bg-slate-800 border-[#1CB0F6]/40 text-[#38BDF8] hover:bg-slate-700'
                : 'bg-sky-50 border-[#1CB0F6] text-[#0284C7] hover:bg-sky-100'
            }`}
            title="Ver gráfico de progreso semanal con Recharts"
          >
            <BarChart3 className="w-4 h-4 text-[#1CB0F6]" />
            <span className="hidden sm:inline">Progreso</span>
          </button>

          {/* Botón de Medallas */}
          <button
            onClick={onOpenBadges}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isDark
                ? 'bg-slate-800 border-amber-500/40 text-amber-300 hover:bg-slate-700'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
            title="Ver medallas y logros ganados"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Logros</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-black">
              {unlockedBadgesCount}
            </span>
          </button>

          {/* Alternador de Modo Oscuro */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl border-2 font-bold transition-all text-xs flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche (Cielo Andino)'}
            aria-label="Alternar modo oscuro"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Botón de Voz */}
          <button
            onClick={onToggleSpeech}
            className={`p-2 rounded-xl border-2 font-bold transition-all text-xs flex items-center justify-center cursor-pointer ${
              speechEnabled
                ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={speechEnabled ? 'Voz activada' : 'Activar voz'}
            aria-label="Voz de lectura"
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Botón Reiniciar Chat */}
          <button
            onClick={onResetChat}
            className="p-2 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reiniciar chat"
            aria-label="Reiniciar chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Perfil del Estudiante con Avatar Peruano */}
          <button
            onClick={onOpenLogin}
            className={`flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-2xl border-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:border-[#58CC02]'
                : 'bg-slate-50 border-slate-200 hover:border-[#58CC02]'
            }`}
            title="Haz clic para cambiar tu nombre o tu avatar peruano"
          >
            <div className="w-7 h-7 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-base">
              {currentAvatar?.emoji || '🦙'}
            </div>
            <div className="text-left hidden md:block">
              <span className="block text-xs font-black leading-tight text-slate-900 dark:text-white max-w-[80px] truncate">
                {studentProfile.name}
              </span>
              <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400">
                {studentProfile.gradeSection}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
