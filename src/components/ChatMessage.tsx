import React from 'react';
import { ChatMessage as ChatMessageType, PeruvianAvatar } from '../types/tutor';
import { Volume2, Sparkles, Copy, Check } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onSpeak?: (text: string) => void;
  userAvatar?: PeruvianAvatar;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSpeak, userAvatar }) => {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex w-full mb-4 ${
        isUser ? 'justify-end' : 'justify-start'
      } animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div
        className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[78%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isUser ? (
            <div className="w-9 h-9 rounded-2xl bg-[#1CB0F6] border-b-3 border-[#1899D6] flex items-center justify-center text-lg shadow-xs">
              {userAvatar?.emoji || '👤'}
            </div>
          ) : (
            <div className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#58CC02] flex items-center justify-center text-lg shadow-xs">
              🦙
            </div>
          )}
        </div>

        {/* Burbuja de Mensaje */}
        <div className="flex flex-col">
          {/* Nombre y hora */}
          <div
            className={`flex items-center gap-1.5 text-[11px] font-bold mb-1 px-1 ${
              isUser
                ? 'justify-end text-sky-700 dark:text-sky-400'
                : 'justify-start text-emerald-700 dark:text-emerald-400'
            }`}
          >
            <span>{isUser ? `${userAvatar?.name || 'Tú'} (Estudiante)` : 'Kusi (Tutor IA)'}</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal">· {message.timestamp}</span>
          </div>

          <div
            className={`rounded-3xl p-4 sm:p-4.5 text-[15px] sm:text-base leading-relaxed shadow-xs transition-all ${
              isUser
                ? 'bg-[#1CB0F6] text-white font-bold rounded-tr-sm border-b-3 border-[#1899D6]'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium rounded-tl-sm border-2 border-slate-200/90 dark:border-slate-700 shadow-sm'
            }`}
          >
            {/* Texto del mensaje */}
            <div className="whitespace-pre-line break-words">{message.text}</div>

            {/* Recuadro de Dato Curioso o Desafío */}
            {!isUser && message.funFact && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-start gap-2 bg-amber-50/90 dark:bg-amber-950/40 p-2.5 rounded-2xl border border-amber-200/70 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-700 dark:text-amber-400 block font-black uppercase text-[10px] tracking-wider">
                    ¡Dato Curioso de Kusi!
                  </span>
                  <span>{message.funFact}</span>
                </div>
              </div>
            )}
          </div>

          {/* Barra de herramientas accesible bajo el mensaje de Kusi */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-1.5 px-2">
              {onSpeak && (
                <button
                  onClick={() => onSpeak(message.text)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-md"
                  title="Escuchar este mensaje con voz"
                >
                  <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Escuchar</span>
                </button>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-md"
                title="Copiar texto para mi tarea"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
