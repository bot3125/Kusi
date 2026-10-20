# Kusi: Gráfico de Progreso con Recharts, Modo Oscuro, Medallas y Avatares Peruanos

Actualización integral para enriquecer la experiencia escolar del estudiante con visualización de progreso semanal mediante Recharts en el header, modo oscuro temático ("Noche Andina"), medallas de logros desbloqueables, login escolar accesible y selección de avatares de la fauna y cultura peruana.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisiones confirmadas por el usuario:**
> - **Visualización del Gráfico:** Botón interactivo en el header con icono de analítica (`BarChart3`) y etiqueta de racha que despliega una tarjeta modal interactiva de Progreso Semanal con Recharts (ResponsiveContainer, BarChart, Tooltip personalizado, barras en verde lima `#58CC02` y azul cielo `#1CB0F6`).
> - **Métricas del Gráfico:** Preguntas resueltas y estrellas de aprendizaje ganadas por cada día de la semana (Lunes a Domingo), con comparativa visual del día actual y metas de estudio.
> - **Modo Oscuro ("Noche Andina"):** Alternador accesible sol/luna en el header con paleta nocturna en tonos índigo/slate (`#0F172A`, `#1E293B`), bordes sutiles y textos con compensación óptica para lectura descansada.
> - **Login Escolar Amigable:** Modal de bienvenida donde el estudiante ingresa su nombre/apodo, salón o grado escolar (6to A, B, C) y guarda su progreso en almacenamiento local (`localStorage`).
> - **Avatares Culturales Peruanos:** Galería interactiva con personajes autóctonos:
>   - 🦙 *Kusi la Llamita* (Altiplano)
>   - 🦅 *Kuntur el Cóndor* (Cordillera de los Andes)
>   - 🐻 *Ukuku el Oso de Anteojos* (Bosques de neblina)
>   - 🐕 *Viringo el Perro Calato Peruano* (Costa prehispánica)
>   - 🐬 *Bufeo el Delfín Rosado* (Amazonía peruana)
> - **Sistema de Medallas y Logros:** Panel de insignias desbloqueables basadas en las preguntas realizadas (ej. "Primer Paso", "Chasqui Veloz", "Maestro Inca", "Mente Científica").

---

### 1. Overview & Core Concept

- **Propósito:** Motivar a los alumnos de 6to de primaria mediante gamificación positiva (estadísticas de superación personal, no punitivas), personalización cultural de su perfil y adaptabilidad visual para jornadas diurnas y nocturnas.
- **Valor Pedagógico:** Permitir al estudiante (y al docente o tutor) comprobar de un vistazo cuántas dudas ha resuelto esta semana y en qué áreas ha demostrado mayor curiosidad.

---

### 2. User Experience & Visual Design

- **Flujo de Usuario:**
  1. **Header Mejorado:**
     - Botón de **Progreso Semanal** con barra de nivel actual y acceso al modal con gráficos de Recharts.
     - Botón de **Medallas** con badge que indica cuántos logros se han desbloqueado (ej: 2/6).
     - Botón de **Modo Oscuro** (Sol / Luna) con transición suave de colores.
     - Botón de **Perfil Escolar** mostrando el avatar peruano seleccionado y el nombre del niño (al tocarlo permite cambiar de avatar o editar el nombre).
  2. **Tarjeta Modal de Progreso con Recharts:**
     - Gráfico de barras duales: Barras verdes (`#58CC02`) para preguntas y barras azules (`#1CB0F6`) para estrellas ganadas.
     - Eje X con días de la semana (`Lun`, `Mar`, `Mié`, `Jue`, `Vie`, `Sáb`, `Dom`).
     - Tooltip interactivo con esquinas redondeadas y estilo lúdico para niños.
     - Indicador de racha actual ("¡3 días seguidos aprendiendo! 🔥").
  3. **Sistema de Medallas:**
     - Cuadrícula con medallas doradas y plateadas:
       - 🌟 *Primer Descubrimiento* (Hacer 1 pregunta)
       - ⚡ *Curiosidad Activa* (Hacer 5 preguntas)
       - 🏔️ *Sabiduría Andina* (Explorar tema de Historia)
       - 📐 *As de los Números* (Preguntar sobre Matemáticas)
       - 🔬 *Futuro Científico* (Preguntar sobre Ciencias o IA)
       - ✍️ *Pluma de Oro* (Preguntar sobre Lenguaje)
  4. **Modo Oscuro:**
     - Fondo: `#0B1120` / `#0F172A`
     - Tarjetas y Contenedores: `#1E293B` con bordes `#334155`
     - Burbujas de chat adaptadas con contraste óptimo para evitar fatiga ocular.

---

### 3. Key Product Decisions & Trade-Offs

- **Librería de Gráficos:** Instalación de `recharts` vía `install_applet_package` tras la aprobación del plan.
- **Persistencia de Datos Escolar:** Uso de `localStorage` para guardar el nombre del estudiante, el avatar elegido, las medallas ganadas y el tema visual preferido (claro/oscuro), garantizando que al recargar la página la información permanezca intacta sin requerir configuración compleja de base de datos.
- **Acceso sin Barreras (Sin contraseñas):** En entornos de primaria, un login con contraseña compleja suele provocar frustración y pérdida de tiempo. Se opta por un login de perfil ágil ("¿Quién está aprendiendo hoy?") con nombre, grado y avatar.

---

### 4. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                               Header                                   │
│  [ Marca ] [ Servidor ] [ Progreso 📊 ] [ Medallas 🏅 ] [ 🌙 ] [ Avatar 🦙 ]│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
     ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
     │ ProgressModal.tsx│ │  BadgesModal.tsx │ │  LoginModal.tsx  │
     │ (Recharts Bar)   │ │  (Insignias)     │ │  (Avatar Selector│
     └──────────────────┘ └──────────────────┘ └──────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                    Hero Mascot + Subject Deck + Chat                   │
│        (Con soporte completo para tema Claro / Modo Oscuro)            │
└────────────────────────────────────────────────────────────────────────┘
```

#### Archivos Nuevos y Modificados:
1. `package.json`: Incorporar `recharts` como dependencia principal.
2. `src/types/tutor.ts`: Nuevos tipos para `DailyProgress`, `Badge`, `StudentProfile` y `ThemeMode`.
3. `src/components/ProgressModal.tsx`: Componente con gráfico de barras de Recharts, racha y estadísticas semanales.
4. `src/components/BadgesModal.tsx`: Visualizador de medallas y logros ganados con animaciones.
5. `src/components/LoginModal.tsx`: Modal para iniciar sesión escolar y elegir avatar peruano.
6. `src/components/Header.tsx`: Actualizado con los nuevos disparadores interactivos, avatar y alternador de modo oscuro.
7. `src/App.tsx`: Gestión global del perfil, medallas ganadas, progreso dinámico y clases de tema oscuro (`dark`).
