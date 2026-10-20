import React from 'react';
import { MascotMood } from '../types/tutor';

interface KusiMascotProps {
  mood: MascotMood;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  bubbleText?: string;
}

export const KusiMascot: React.FC<KusiMascotProps> = ({
  mood,
  size = 'md',
  onClick,
  bubbleText
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 md:w-32 md:h-32',
    lg: 'w-36 h-36 md:w-44 md:h-44'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        onClick={onClick}
        className={`relative ${sizeMap[size]} transition-transform duration-300 transform hover:scale-105 cursor-pointer`}
        title="Kusi la Llamita Sabia (¡Haz clic para saludar!)"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sombra base */}
          <ellipse cx="100" cy="188" rx="55" ry="10" fill="#E2E8F0" />

          {/* Cuello y Cuerpo de la Llama */}
          <path
            d="M 80 140 C 80 110, 85 90, 85 75 L 115 75 C 115 90, 120 110, 120 140 C 135 155, 135 185, 115 185 L 85 185 C 65 185, 65 155, 80 140 Z"
            fill="#FFFDF7"
            stroke="#E2D9CC"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Collar Andino con borlas de colores */}
          <path
            d="M 80 140 Q 100 152 120 140"
            fill="none"
            stroke="#E11D48"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Borlas de colores del collar */}
          <circle cx="88" cy="148" r="4.5" fill="#FBBF24" />
          <circle cx="100" cy="151" r="5" fill="#06B6D4" />
          <circle cx="112" cy="148" r="4.5" fill="#10B981" />

          {/* Oreja Izquierda */}
          <g className={mood === 'thinking' ? 'animate-pulse origin-bottom' : ''}>
            <path
              d="M 68 65 C 55 35, 60 15, 75 32 C 78 36, 78 48, 76 65 Z"
              fill="#FFFDF7"
              stroke="#E2D9CC"
              strokeWidth="3"
            />
            <path d="M 68 55 C 62 38, 66 26, 73 35 Z" fill="#FBCFE8" />
          </g>

          {/* Oreja Derecha */}
          <g className={mood === 'celebrating' ? 'animate-bounce origin-bottom' : ''}>
            <path
              d="M 132 65 C 145 35, 140 15, 125 32 C 122 36, 122 48, 124 65 Z"
              fill="#FFFDF7"
              stroke="#E2D9CC"
              strokeWidth="3"
            />
            <path d="M 132 55 C 138 38, 134 26, 127 35 Z" fill="#FBCFE8" />
          </g>

          {/* Cabeza de Kusi */}
          <path
            d="M 72 75 C 65 55, 80 40, 100 40 C 120 40, 135 55, 128 75 C 128 95, 118 105, 100 105 C 82 105, 72 95, 72 75 Z"
            fill="#FFFDF7"
            stroke="#E2D9CC"
            strokeWidth="3.5"
          />

          {/* Hocico suave */}
          <ellipse cx="100" cy="85" rx="16" ry="12" fill="#FCE7F3" />
          <circle cx="95" cy="82" r="2" fill="#BE185D" />
          <circle cx="105" cy="82" r="2" fill="#BE185D" />

          {/* Boca según emoción */}
          {mood === 'celebrating' && (
            <path
              d="M 92 88 Q 100 99 108 88"
              fill="#BE185D"
              stroke="#9D174D"
              strokeWidth="2"
            />
          )}
          {mood === 'thinking' && (
            <path
              d="M 94 89 Q 100 86 106 88"
              fill="none"
              stroke="#BE185D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}
          {(mood === 'happy' || mood === 'explaining') && (
            <path
              d="M 93 87 Q 100 94 107 87"
              fill="none"
              stroke="#BE185D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Mejillas sonrosadas */}
          <circle cx="79" cy="82" r="5" fill="#F472B6" opacity="0.6" />
          <circle cx="121" cy="82" r="5" fill="#F472B6" opacity="0.6" />

          {/* Ojos según emoción */}
          {mood === 'thinking' ? (
            // Ojos mirando arriba pensando
            <g>
              <ellipse cx="86" cy="65" rx="5" ry="6" fill="#1E293B" />
              <ellipse cx="114" cy="65" rx="5" ry="6" fill="#1E293B" />
              <circle cx="85" cy="62" r="2" fill="#FFFFFF" />
              <circle cx="113" cy="62" r="2" fill="#FFFFFF" />
            </g>
          ) : mood === 'celebrating' ? (
            // Ojos felices cerrados en arco ( ^ ^ )
            <g>
              <path
                d="M 81 68 Q 86 60 91 68"
                fill="none"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 109 68 Q 114 60 119 68"
                fill="none"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          ) : (
            // Ojos redondos y amigables estándar
            <g>
              <ellipse cx="86" cy="67" rx="5.5" ry="6.5" fill="#1E293B" />
              <ellipse cx="114" cy="67" rx="5.5" ry="6.5" fill="#1E293B" />
              <circle cx="84" cy="64.5" r="2" fill="#FFFFFF" />
              <circle cx="112" cy="64.5" r="2" fill="#FFFFFF" />
              <circle cx="88" cy="69" r="1" fill="#FFFFFF" />
              <circle cx="116" cy="69" r="1" fill="#FFFFFF" />
            </g>
          )}

          {/* Chullo Tradicional Andino (Gorro con orejeras de fiesta) */}
          <g id="chullo">
            {/* Cuerpo principal del gorro */}
            <path
              d="M 73 52 C 73 25, 90 12, 100 12 C 110 12, 127 25, 127 52 Z"
              fill="#DC2626"
            />
            {/* Patrón andino geométrico (franjas turquesa y amarillo) */}
            <path
              d="M 76 43 L 124 43 L 126 50 L 74 50 Z"
              fill="#FBBF24"
            />
            <path
              d="M 79 34 L 121 34 L 123 40 L 77 40 Z"
              fill="#06B6D4"
            />
            {/* Orejera izquierda del chullo con trenza */}
            <path
              d="M 73 48 L 68 70 L 75 70 Z"
              fill="#DC2626"
            />
            <path
              d="M 71 70 Q 70 85 68 95"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Orejera derecha del chullo con trenza */}
            <path
              d="M 127 48 L 132 70 L 125 70 Z"
              fill="#DC2626"
            />
            <path
              d="M 129 70 Q 130 85 132 95"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Pompón superior del chullo */}
            <circle cx="100" cy="11" r="7" fill="#FBBF24" />
            <circle cx="98" cy="9" r="2.5" fill="#FEF08A" />
          </g>

          {/* Efectos de Emoción Extra */}
          {mood === 'thinking' && (
            <g className="animate-bounce">
              <circle cx="138" cy="35" r="4" fill="#93C5FD" />
              <circle cx="148" cy="24" r="6" fill="#60A5FA" />
              <g transform="translate(150, 2) scale(0.8)">
                <circle cx="12" cy="12" r="10" fill="#FBBF24" />
                <path d="M 8 18 L 16 18 L 14 22 L 10 22 Z" fill="#92400E" />
                <line x1="12" y1="0" x2="12" y2="2" stroke="#F59E0B" strokeWidth="2" />
                <line x1="22" y1="12" x2="24" y2="12" stroke="#F59E0B" strokeWidth="2" />
                <line x1="2" y1="12" x2="0" y2="12" stroke="#F59E0B" strokeWidth="2" />
              </g>
            </g>
          )}

          {mood === 'celebrating' && (
            <g className="animate-spin origin-[100px_40px] duration-1000">
              <polygon points="145,15 148,22 155,23 150,28 152,35 145,31 138,35 140,28 135,23 142,22" fill="#F59E0B" />
              <polygon points="55,18 58,24 64,25 60,29 61,35 55,32 49,35 50,29 46,25 52,24" fill="#10B981" />
            </g>
          )}

          {mood === 'explaining' && (
            <g transform="translate(125, 90)">
              <rect x="0" y="0" width="22" height="6" rx="3" fill="#3B82F6" transform="rotate(-30)" />
              <polygon points="20, -11 25, -9 22, -4" fill="#F59E0B" />
            </g>
          )}
        </svg>

        {/* Badge de estado de ánimo */}
        <div className="absolute -bottom-1 -right-1 bg-white border border-slate-200 shadow-sm rounded-full px-1.5 py-0.5 text-[11px] font-bold text-slate-700 flex items-center gap-1">
          {mood === 'thinking' && '💭 Pensando...'}
          {mood === 'celebrating' && '🎉 ¡Genial!'}
          {mood === 'explaining' && '💡 ¡Atento!'}
          {mood === 'happy' && '🦙 ¡Hola!'}
        </div>
      </div>

      {/* Globo de texto interactivo para la mascota */}
      {bubbleText && (
        <div className="hidden sm:block relative bg-white border-2 border-[#58CC02] text-slate-800 px-4 py-2.5 rounded-2xl shadow-sm text-sm font-semibold max-w-xs animate-in fade-in slide-in-from-left-2 duration-200">
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-[#58CC02] border-b-[6px] border-b-transparent"></div>
          {bubbleText}
        </div>
      )}
    </div>
  );
};
