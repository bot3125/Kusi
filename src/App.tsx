/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { KusiMascot } from './components/KusiMascot';
import { SubjectBar } from './components/SubjectBar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ProgressModal } from './components/ProgressModal';
import { BadgesModal } from './components/BadgesModal';
import { LoginModal } from './components/LoginModal';
import {
  ChatMessage as ChatMessageType,
  MascotMood,
  SubjectCategory,
  DailyProgress,
  Badge,
  StudentProfile
} from './types/tutor';
import { PERUVIAN_AVATARS, INITIAL_BADGES } from './data/avatarsAndBadges';
import { consultarTutorIA } from './services/tutorMockService';
import { Sparkles, Trophy } from 'lucide-react';

const INITIAL_PROGRESS: DailyProgress[] = [
  { day: 'Lun', fullDay: 'Lunes', preguntas: 3, estrellas: 15 },
  { day: 'Mar', fullDay: 'Martes', preguntas: 4, estrellas: 20 },
  { day: 'Mié', fullDay: 'Miércoles', preguntas: 2, estrellas: 10 },
  { day: 'Jue', fullDay: 'Jueves', preguntas: 5, estrellas: 25 },
  { day: 'Vie', fullDay: 'Viernes', preguntas: 3, estrellas: 15 },
  { day: 'Sáb', fullDay: 'Sábado', preguntas: 1, estrellas: 5 },
  { day: 'Dom', fullDay: 'Domingo', preguntas: 2, estrellas: 10, isToday: true }
];

export default function App() {
  // Modo oscuro con persistencia
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('kusi_dark_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('kusi_dark_mode', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Perfil del estudiante con persistencia
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('kusi_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      name: 'Mateo',
      gradeSection: '6to A',
      avatarId: 'llama',
      isLoggedIn: true
    };
  });

  const handleSaveProfile = (newProfile: StudentProfile) => {
    setStudentProfile(newProfile);
    localStorage.setItem('kusi_student_profile', JSON.stringify(newProfile));
    setMascotBubble(`¡Bienvenido(a), ${newProfile.name}! ¡Vamos a aprender juntos!`);
    playSound('star');
  };

  // Medallas e insignias con persistencia
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('kusi_badges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return INITIAL_BADGES;
  });

  // Progreso semanal para Recharts
  const [weeklyProgress, setWeeklyProgress] = useState<DailyProgress[]>(() => {
    const saved = localStorage.getItem('kusi_weekly_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return INITIAL_PROGRESS;
  });

  // Modales
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);

  // Mensajes de chat
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome-1',
      sender: 'tutor',
      text: '¡Hola, explorador(a)! 🦙✨ Soy Kusi, tu tutora escolar de Inteligencia Artificial.\n\nEstoy aquí para acompañarte en tus tareas de 6to de primaria: resolver retos de Matemáticas, descubrir experimentos de Ciencias, revivir la Historia del Tahuantinsuyo o mejorar tu redacción en Lenguaje.\n\n¿Qué tema quieres explorar hoy?',
      timestamp: 'Ahora',
      subject: 'general',
      funFact: '¡Aprender todos los días activa miles de nuevas conexiones en tus neuronas!'
    }
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [mascotBubble, setMascotBubble] = useState<string>('¡Pregúntame lo que quieras para tu tarea!');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | null>('ciencias');
  const [points, setPoints] = useState<number>(10);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);
  const [isLocalServerConnected, setIsLocalServerConnected] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentAvatar = PERUVIAN_AVATARS.find((a) => a.id === studentProfile.avatarId) || PERUVIAN_AVATARS[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Audio sintético amigable
  const playSound = (type: 'send' | 'receive' | 'star' | 'badge') => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'receive') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'star') {
        osc.frequency.setValueAtTime(784, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.5, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'badge') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1046.5, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      }
    } catch {
      // Ignorar si el audio no está permitido por autoplay
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  // Desbloqueo dinámico de insignias escolares
  const checkBadgeUnlocks = (subject: SubjectCategory, currentCount: number) => {
    setBadges((prevBadges) => {
      let updated = false;
      const nextBadges = prevBadges.map((badge) => {
        if (!badge.unlocked) {
          if (badge.id === 'curious-explorer' && currentCount >= 3) {
            updated = true;
            triggerBadgeToast(badge.title, badge.icon);
            return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
          }
          if (badge.id === 'science-hero' && subject === 'ciencias') {
            updated = true;
            triggerBadgeToast(badge.title, badge.icon);
            return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
          }
          if (badge.id === 'math-wizard' && subject === 'matematicas') {
            updated = true;
            triggerBadgeToast(badge.title, badge.icon);
            return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
          }
          if (badge.id === 'inca-historian' && subject === 'historia') {
            updated = true;
            triggerBadgeToast(badge.title, badge.icon);
            return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
          }
          if (badge.id === 'grammar-master' && subject === 'lenguaje') {
            updated = true;
            triggerBadgeToast(badge.title, badge.icon);
            return { ...badge, unlocked: true, unlockedAt: 'Hoy' };
          }
        }
        return badge;
      });

      if (updated) {
        localStorage.setItem('kusi_badges', JSON.stringify(nextBadges));
      }
      return nextBadges;
    });
  };

  const triggerBadgeToast = (title: string, icon: string) => {
    setBadgeToast(`¡Medalla Desbloqueada! ${icon} ${title}`);
    playSound('badge');
    setTimeout(() => setBadgeToast(null), 4000);
  };

  // Enviar mensaje del estudiante y actualizar métricas de Recharts
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    playSound('send');

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: timeString
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setMascotMood('thinking');
    setMascotBubble('¡Mmm! Déjame buscar en mis apuntes andinos... 📚');

    try {
      const response = await consultarTutorIA(text);

      const tutorMessage: ChatMessageType = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: response.answer,
        timestamp: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
        subject: response.detectedSubject,
        funFact: response.funFact
      };

      setMessages((prev) => [...prev, tutorMessage]);
      setPoints((prev) => prev + 5);
      playSound('receive');

      // Actualizar datos del gráfico de Recharts para hoy
      setWeeklyProgress((prev) => {
        const next = prev.map((item) => {
          if (item.isToday) {
            return {
              ...item,
              preguntas: item.preguntas + 1,
              estrellas: item.estrellas + 5
            };
          }
          return item;
        });
        localStorage.setItem('kusi_weekly_progress', JSON.stringify(next));
        return next;
      });

      // Verificar medallas
      const userQuestionsCount = messages.filter((m) => m.sender === 'user').length + 1;
      checkBadgeUnlocks(response.detectedSubject, userQuestionsCount);

      setMascotMood('celebrating');
      setMascotBubble('¡Eureka! ¡Aquí tienes la explicación explicadita! 🌟');

      if (speechEnabled) {
        speakText(response.answer);
      }

      setTimeout(() => {
        setMascotMood('happy');
        setMascotBubble('¿Te quedó alguna duda o pasamos al siguiente tema?');
      }, 4000);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `tutor-err-${Date.now()}`,
          sender: 'tutor',
          text: '¡Uy! Ocurrió un pequeño inconveniente al contactar al servidor local. Por favor verifica tu conexión.',
          timestamp: timeString,
          subject: 'general'
        }
      ]);
      setMascotMood('happy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'tutor',
        text: '¡Conversación reiniciada! 🦙 Cuaderno en blanco listo. ¿Con qué tarea de 6to grado comenzamos ahora?',
        timestamp: 'Ahora',
        subject: 'general',
        funFact: '¿Sabías que repasar un tema 10 minutos al día es mejor que estudiar horas antes del examen?'
      }
    ]);
    setMascotMood('happy');
    setMascotBubble('¡Todo listo para una nueva aventura escolar!');
  };

  const totalWeeklyQuestions = weeklyProgress.reduce((sum, d) => sum + d.preguntas, 0);
  const totalWeeklyStars = weeklyProgress.reduce((sum, d) => sum + d.estrellas, 0);
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${isDark ? 'bg-[#0B1120] text-slate-100' : 'bg-[#F4F9F2] text-slate-800'}`}>
      {/* 1. Header con botones para Recharts, medallas, modo oscuro y perfil */}
      <Header
        points={points}
        speechEnabled={speechEnabled}
        onToggleSpeech={() => setSpeechEnabled(!speechEnabled)}
        onResetChat={handleResetChat}
        isLocalServerConnected={isLocalServerConnected}
        onToggleServerMode={() => setIsLocalServerConnected((prev) => !prev)}
        isDark={isDark}
        onToggleDarkMode={() => setIsDark((prev) => !prev)}
        onOpenProgress={() => setIsProgressModalOpen(true)}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        unlockedBadgesCount={unlockedBadgesCount}
        studentProfile={studentProfile}
        currentAvatar={currentAvatar}
      />

      {/* Notificación flotante de Medalla Desbloqueada */}
      {badgeToast && (
        <div className="fixed top-18 right-4 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 border-white animate-in slide-in-from-top-3 duration-300">
          <Trophy className="w-5 h-5 text-white" />
          <span>{badgeToast}</span>
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* 2. Sección Hero Mascota & Presentación con Avatar Escolar */}
        <div className={`border-2 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-colors ${
          isDark
            ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border-slate-800'
            : 'bg-gradient-to-r from-emerald-100/70 via-white to-sky-100/70 border-[#58CC02]/30'
        }`}>
          <div className="flex items-center gap-4">
            <KusiMascot
              mood={mascotMood}
              size="md"
              bubbleText={mascotBubble}
              onClick={() => {
                setMascotMood('celebrating');
                setMascotBubble(`¡Jaja! ¡Cosquillas! ¡Me alegra mucho estudiar contigo, ${studentProfile.name}!`);
                playSound('star');
                setTimeout(() => setMascotMood('happy'), 2500);
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black leading-tight text-slate-900 dark:text-white">
                  Kusi la Llamita Sabia
                </h2>
                <span className="text-xs bg-[#58CC02] text-white font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                  Tutor IA
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold mt-1 max-w-md text-slate-600 dark:text-slate-300">
                Acompañando a <span className="font-bold text-[#58CC02]">{studentProfile.name}</span> ({studentProfile.gradeSection}) con su avatar <span className="font-bold">{currentAvatar.name} {currentAvatar.emoji}</span>.
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                handleSendMessage('¡Hola Kusi! ¿Qué podemos aprender hoy juntos?');
              }}
              className="btn-3d-yellow text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Saludar a Kusi</span>
            </button>
          </div>
        </div>

        {/* 3. Barra de Selección de Materias con Atajos de 6to de Primaria */}
        <SubjectBar
          selectedSubject={selectedSubject}
          onSelectSubject={(subj) => setSelectedSubject(subj)}
          onAskSuggestedQuestion={(question) => handleSendMessage(question)}
        />

        {/* 4. Área Central de Chat Didáctico */}
        <div className={`flex-1 min-h-[320px] max-h-[500px] overflow-y-auto backdrop-blur-xs border-2 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col transition-colors ${
          isDark
            ? 'bg-slate-900/70 border-slate-800'
            : 'bg-white/70 border-slate-200/90'
        }`}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSpeak={(text) => speakText(text)}
              userAvatar={currentAvatar}
            />
          ))}

          {/* Indicador de "Kusi está pensando" (Simulación de backend de 1 segundo) */}
          {isLoading && (
            <div className="flex items-center gap-3 my-2 animate-in fade-in duration-200">
              <div className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#58CC02] flex items-center justify-center text-lg animate-bounce">
                🦙
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xs">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#58CC02] rounded-full animate-bounce"></span>
                </span>
                <span>Kusi está redactando una explicación fácil para ti... (Servidor local)</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 5. Barra Inferior de Entrada de Texto con Botón 3D */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onQuickPrompt={(prompt) => handleSendMessage(prompt)}
      />

      {/* Modales Interactivos */}
      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        data={weeklyProgress}
        totalQuestions={totalWeeklyQuestions}
        totalStars={totalWeeklyStars}
        streakDays={4}
        isDark={isDark}
      />

      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        badges={badges}
        isDark={isDark}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentProfile={studentProfile}
        onSaveProfile={handleSaveProfile}
        isDark={isDark}
      />
    </div>
  );
}
