import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { DailyProgress } from '../types/tutor';
import { X, Flame, Sparkles, HelpCircle, Trophy } from 'lucide-react';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DailyProgress[];
  totalQuestions: number;
  totalStars: number;
  streakDays: number;
  isDark: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
  isDark: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`p-3 rounded-2xl shadow-lg border-2 ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <p className="font-extrabold text-xs mb-1.5 flex items-center gap-1">
          <span>📅</span> <span>{label}</span>
        </p>
        <div className="space-y-1 text-xs font-bold">
          <p className="flex items-center gap-1.5 text-[#58CC02]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#58CC02]"></span>
            <span>Preguntas: {payload[0]?.value || 0}</span>
          </p>
          <p className="flex items-center gap-1.5 text-[#1CB0F6]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1CB0F6]"></span>
            <span>Estrellas: {payload[1]?.value || 0}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  data,
  totalQuestions,
  totalStars,
  streakDays,
  isDark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-2xl border-2 transition-all ${
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
          <div className="w-12 h-12 rounded-2xl bg-[#58CC02] border-b-4 border-[#46A302] flex items-center justify-center text-white shadow-xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Progreso Semanal de Aprendizaje
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-75">
              Tu constancia en 6to de Primaria construyendo el hábito del saber
            </p>
          </div>
        </div>

        {/* Tarjetas resumen de métricas */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <div
            className={`p-3 rounded-2xl border-2 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-[#58CC02] mb-0.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Preguntas</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {totalQuestions}
            </div>
            <span className="text-[10px] font-bold opacity-70">En la semana</span>
          </div>

          <div
            className={`p-3 rounded-2xl border-2 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-sky-50/70 border-sky-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-[#1CB0F6] mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Estrellas</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {totalStars}
            </div>
            <span className="text-[10px] font-bold opacity-70">Puntos acumulados</span>
          </div>

          <div
            className={`p-3 rounded-2xl border-2 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50/70 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 mb-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>Racha</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {streakDays} {streakDays === 1 ? 'Día' : 'Días'}
            </div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400">
              ¡Imparable! 🔥
            </span>
          </div>
        </div>

        {/* Contenedor del Gráfico con Recharts */}
        <div
          className={`p-4 rounded-2xl border-2 mb-4 ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider opacity-70">
              Actividad Diaria (Lunes a Domingo)
            </span>
            <span className="text-[11px] font-bold text-[#58CC02]">
              ● Hoy: Activo
            </span>
          </div>

          <div className="w-full h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDark ? '#334155' : '#E2E8F0'}
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: isDark ? '#475569' : '#CBD5E1' }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11, fontWeight: 700 }}
                  axisLine={{ stroke: isDark ? '#475569' : '#CBD5E1' }}
                  tickLine={false}
                />
                <Tooltip
                  content={<CustomTooltip isDark={isDark} />}
                  cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 10, fontSize: 12, fontWeight: 700 }}
                />
                {/* Barra 1: Preguntas (Verde Lima) */}
                <Bar
                  name="Preguntas Resueltas"
                  dataKey="preguntas"
                  fill="#58CC02"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
                {/* Barra 2: Estrellas Ganadas (Azul Cielo) */}
                <Bar
                  name="Estrellas Ganadas"
                  dataKey="estrellas"
                  fill="#1CB0F6"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mensaje motivacional inferior */}
        <div className="flex items-center justify-between text-xs font-bold pt-1">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>💡</span> Meta sugerida: 3 preguntas al día para fijar tus aprendizajes.
          </span>
          <button
            onClick={onClose}
            className="btn-3d-green px-4 py-2 rounded-xl text-xs font-black cursor-pointer"
          >
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};
