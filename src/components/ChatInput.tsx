import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onQuickPrompt: (prompt: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onQuickPrompt
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isLoading) return;

    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const quickHelpers = [
    { label: '🔍 Explícamelo más fácil', text: '¿Podrías explicármelo de forma más sencilla con un ejemplo de la vida diaria?' },
    { label: '💡 Dame un reto', text: '¡Ponme un reto o pregunta rápida para ver si entendí el tema!' },
    { label: '📝 ¿Cómo lo resumo para mi tarea?', text: '¿Cuáles son las 3 ideas principales que debería anotar en mi cuaderno?' }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-t-2 border-slate-200/80 dark:border-slate-800 p-3 sm:p-4 shadow-lg rounded-t-3xl transition-colors">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Atajos de ayuda rápida */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0 hidden sm:inline flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Atajos:
          </span>
          {quickHelpers.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onQuickPrompt(item.text)}
              disabled={isLoading}
              className="shrink-0 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Formulario de entrada */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={
                isLoading
                  ? 'Kusi está pensando tu respuesta... 🦙'
                  : 'Escribe tu pregunta para Kusi (ej: ¿Qué es una fracción?)...'
              }
              className="w-full bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-bold text-sm sm:text-base px-4 sm:px-5 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 focus:border-[#58CC02] focus:outline-none transition-all shadow-inner"
            />
            {text.length > 0 && !isLoading && (
              <button
                type="button"
                onClick={() => setText('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200/80 dark:bg-slate-700 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                title="Borrar texto"
              >
                ✕
              </button>
            )}
          </div>

          {/* Botón de Enviar 3D Grande y Llamativo */}
          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`btn-3d-green font-black text-sm sm:text-base px-5 sm:px-7 py-3.5 rounded-2xl flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:border-b-4`}
          >
            <span>{isLoading ? 'Pensando...' : '¡Preguntar!'}</span>
            <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoading ? 'animate-pulse' : ''}`} />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1">
          <span>Presiona <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">Enter ↵</kbd> para enviar tu duda</span>
          <span>Tutor pedagógico para 6to de Primaria</span>
        </div>
      </div>
    </div>
  );
};
