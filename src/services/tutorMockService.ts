/**
 * Servicio Mock del Tutor IA Escolar (Simulación de Backend Local)
 *
 * NOTA PARA EL DESARROLLADOR / PROFESOR:
 * Esta función simula la llamada a un servidor local mediante una promesa con delay de 1000ms.
 * Cuando tengas tu servidor local corriendo (ejemplo: Flask, FastAPI, Express con Ollama o Gemini),
 * solo necesitas reemplazar el cuerpo de `consultarTutorIA` con el `fetch()` real.
 */

import { SubjectCategory } from '../types/tutor';

export interface TutorResponse {
  answer: string;
  detectedSubject: SubjectCategory;
  funFact?: string;
}

// Base de conocimientos didáctica orientada a niños de 6to de Primaria (11-12 años)
const RESPUESTAS_DIDACTICAS: Array<{
  keywords: string[];
  subject: SubjectCategory;
  answer: string;
  funFact?: string;
}> = [
  // --- CIENCIAS & INTELIGENCIA ARTIFICIAL ---
  {
    keywords: ['inteligencia artificial', 'ia', 'robot', 'algoritmo', 'como aprende'],
    subject: 'ciencias',
    answer: '¡Excelente pregunta! 🤖 La Inteligencia Artificial es como un programa de computadora muy curioso. No nace sabiendo las cosas: aprende viendo miles de ejemplos (como cuando tú aprendiste a reconocer a los perros viendo fotos de perritos). En la escuela la usamos como un asistente que nos ayuda a investigar y pensar, ¡pero el verdadero explorador y creador eres tú!',
    funFact: '¿Sabías que la palabra "algoritmo" viene del matemático persa Al-Juarismi y es simplemente una lista de pasos ordenados, como una receta para hacer panqueques? 🥞'
  },
  {
    keywords: ['fotosintesis', 'planta', 'oxigeno', 'sol', 'hoja'],
    subject: 'ciencias',
    answer: '🌿 ¡Las plantas son verdaderas fábricas de energía! La fotosíntesis funciona así:\n1. Las raíces absorben agua y minerales del suelo.\n2. Las hojas capturan dióxido de carbono del aire y luz del sol con una sustancia verde llamada clorofila.\n3. ¡Pum! Convierten todo eso en glucosa (su alimento) y liberan el oxígeno puro que respiramos todos los días.',
    funFact: '¡El 70% del oxígeno del planeta no lo producen los árboles, sino diminutas algas en los océanos llamadas fitoplancton! 🌊'
  },
  {
    keywords: ['celula', 'nucleo', 'citoplasma', 'membrana', 'adn'],
    subject: 'ciencias',
    answer: '🔬 La célula es la unidad más chiquita con vida que forma tu cuerpo. Imagínala como una ciudad en miniatura:\n• La membrana es la muralla con guardias en la puerta.\n• El núcleo es el palacio municipal donde está el ADN (el manual de instrucciones de tu cuerpo).\n• Las mitocondrias son las centrales eléctricas que te dan energía para correr en el recreo.',
    funFact: '¡Tu cuerpo tiene más de 30 billones de células trabajando en equipo sin descanso! 🧬'
  },

  // --- MATEMÁTICAS ---
  {
    keywords: ['fraccion', 'fracciones', 'denominador', 'numerador', 'sumar fracciones'],
    subject: 'matematicas',
    answer: '🍕 ¡Las fracciones son súper fáciles si piensas en comida! Imagina una pizza:\n• El numerador (el número de arriba) son las rebanadas que tienes.\n• El denominador (el número de abajo) es en cuántas partes iguales se cortó la pizza entera.\n\nPara sumar fracciones con distinto denominador (como 1/2 + 1/4), busca un denominador común: 1/2 es igual a 2/4. Así: 2/4 + 1/4 = 3/4.',
    funFact: 'Los antiguos egipcios hace más de 3,000 años solo usaban fracciones con numerador 1 (como 1/3, 1/5 o 1/10). ¡Eran maestros del cálculo! 📐'
  },
  {
    keywords: ['area', 'triangulo', 'circulo', 'perimetro', 'geometria', 'rectangulo'],
    subject: 'matematicas',
    answer: '📐 ¡Vamos a medir figuras! \n• Área del rectángulo: Base × Altura (Base × Altura).\n• Área del triángulo: (Base × Altura) ÷ 2. ¿Sabes por qué entre dos? ¡Porque cualquier rectángulo se puede cortar en dos triángulos gemelos!\n• Perímetro: Es simplemente sumar todos los lados por fuera, como si pusieras una cerca alrededor de tu jardín.',
    funFact: 'El número Pi (π ≈ 3.1416) relaciona el contorno de cualquier círculo con su ancho. ¡No importa si es una moneda o el planeta Tierra! 🌍'
  },
  {
    keywords: ['porcentaje', 'descuento', '%', 'cien'],
    subject: 'matematicas',
    answer: '💰 El porcentaje (%) significa "de cada cien". Por ejemplo:\n• El 50% de algo es su mitad (50 de 100).\n• El 25% de algo es su cuarta parte.\n• Si un juego cuesta 80 soles y tiene 10% de descuento, calculas 80 × 0.10 = 8 soles de ahorro. ¡Pagas 72 soles!',
    funFact: 'El símbolo % nació en Italia hace siglos como una abreviatura escrita a mano de "por cento" (per 100). ✨'
  },

  // --- HISTORIA ---
  {
    keywords: ['inca', 'machu picchu', 'tahuantinsuyo', 'pachacutec', 'cusco', 'quechua'],
    subject: 'historia',
    answer: '🏔️ ¡El Tahuantinsuyo fue una de las civilizaciones más asombrosas del mundo! Se extendió por 6 países actuales. El gran Inca Pachacútec organizó los cuatro suyos (Chinchaysuyo, Antisuyo, Collasuyo y Contisuyo) y mandó construir Machu Picchu con una ingeniería sismorresistente que aún sorprende a los científicos modernos.',
    funFact: 'Los Incas no tenían caballos ni ruedas para transporte, pero tenían a los veloces Chasquis y usaban el Qhapaq Ñan: ¡una red de caminos de más de 30,000 kilómetros! 🏃‍♂️💨'
  },
  {
    keywords: ['independencia', 'san martin', 'bolivar', '28 de julio', '1821'],
    subject: 'historia',
    answer: '🇵🇪 La Independencia del Perú fue proclamada el 28 de julio de 1821 por el general José de San Martín en la Plaza Mayor de Lima con las famosas palabras: "El Perú es, desde este momento, libre e independiente por la voluntad general de los pueblos...". Más tarde, con Simón Bolívar y las batallas de Junín y Ayacucho (1824), se selló la libertad total en Sudamérica.',
    funFact: 'El sueño de San Martín en las bahías de Paracas inspiró los colores rojo y blanco de nuestra bandera tras ver volar a las bellas parihuanas (flamencos andinos). 🦩'
  },

  // --- LENGUAJE Y COMUNICACIÓN ---
  {
    keywords: ['aguda', 'grave', 'esdrujula', 'tilde', 'acento', 'ortografia'],
    subject: 'lenguaje',
    answer: '✍️ ¡El truco secreto para no equivocarte de tildes! Usa la regla SEGA:\n• Esdrújulas: La fuerza está en la antepenúltima sílaba (¡SIEMPRE llevan tilde! Ej: mú-si-ca, pá-ja-ro).\n• Graves: La fuerza en la penúltima sílaba (llevan tilde si NO terminan en N, S o Vocal. Ej: ár-bol, lá-piz).\n• Agudas: La fuerza en la última sílaba (llevan tilde si SÍ terminan en N, S o Vocal. Ej: co-ra-zón, ma-má).',
    funFact: 'Las palabras sobreesdrújulas (como "cómpratelo") también llevan tilde siempre, ¡sin ninguna excepción! 🎯'
  },
  {
    keywords: ['sujeto', 'predicado', 'verbo', 'oracion'],
    subject: 'lenguaje',
    answer: '📖 Para analizar cualquier oración, busca primero al Rey de la fiesta: ¡el VERBO (la acción)! Luego pregúntale: \n• ¿Quién o quiénes hacen la acción? -> Ese es el SUJETO.\n• ¿Qué se dice de ese sujeto? -> Ese es el PREDICADO.\nEjemplo: "La llamita Kusi come pasto fresco."\nVerbo: come. ¿Quién come? La llamita Kusi (Sujeto). ¿Qué hace? come pasto fresco (Predicado).',
    funFact: 'En español existen oraciones con sujeto tácito (escondido), como: "Llegamos tarde". El sujeto somos "Nosotros", aunque no esté escrito. 🕵️‍♂️'
  }
];

/**
 * Consulta simulada al Tutor IA con 1 segundo de retraso (1000ms)
 * @param pregunta Texto ingresado por el estudiante
 * @returns Promesa con la respuesta didáctica adaptada a 6to de primaria
 */
export async function consultarTutorIA(pregunta: string): Promise<TutorResponse> {
  // Simular la latencia de red de 1000ms requerida en el brief
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const cleanQuery = pregunta.toLowerCase().trim();

  // 1. Saludos amigables
  if (cleanQuery.match(/^(hola|buenas|hey|buenos dias|buenas tardes|que tal|como estas)/i)) {
    return {
      answer: '¡Kamisaraki! ¡Hola! Soy Kusi, tu llamita compañera de estudios. 🦙✨ Estoy lista para explorar Ciencias, Matemáticas, Historia o Lenguaje contigo. ¿Qué tema estás repasando hoy en el colegio?',
      detectedSubject: 'general',
      funFact: '¿Sabías que "Kusi" en idioma quechua significa alegre y feliz? ¡Me encanta aprender cosas nuevas contigo! 🌟'
    };
  }

  // 2. Búsqueda por palabras clave temáticas
  for (const item of RESPUESTAS_DIDACTICAS) {
    const coincide = item.keywords.some((kw) => cleanQuery.includes(kw));
    if (coincide) {
      return {
        answer: item.answer,
        detectedSubject: item.subject,
        funFact: item.funFact
      };
    }
  }

  // 3. Respuesta pedagógica adaptada por defecto para cualquier otra duda
  return {
    answer: `¡Me encanta tu curiosidad sobre "${pregunta}"! 🎒\n\nVamos a resolverlo juntos paso a pasito:\n1. Piensa primero: ¿qué datos o pistas ya conoces sobre este tema?\n2. Relaciónalo con lo que vimos en clase o en la vida diaria.\n3. Si quieres más ayuda, prueba a preguntarme sobre fórmulas de matemáticas, experimentos de ciencias, el gran Imperio Inca o cómo poner tildes. ¡Tú tienes una mente brillante! 💡`,
    detectedSubject: 'general',
    funFact: 'Hacer preguntas es la habilidad más importante de los científicos e inventores. ¡Nunca dejes de preguntar! 🚀'
  };
}

/**
 * NOTA PARA MODO PRODUCCIÓN:
 * Para conectar a un backend local real (ej: http://localhost:8000/chat),
 * puedes implementar esta función alternativa:
 *
 * export async function consultarServidorReal(pregunta: string): Promise<string> {
 *   const response = await fetch('http://localhost:8000/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ message: pregunta, grade: '6to_primaria' })
 *   });
 *   const data = await response.json();
 *   return data.reply;
 * }
 */
