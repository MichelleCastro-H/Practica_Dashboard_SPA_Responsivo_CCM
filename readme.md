# Dashboard SPA Responsivo - Panel de Infraestructura

Un panel de control (Single Page Application) moderno y responsivo diseñado para ingenieros DevOps y administradores de infraestructura en la nube. Este proyecto se centra en la visualización rápida de métricas, la gestión segura de servidores y una experiencia de usuario fluida e intuitiva.

Desarrollado aplicando los principios de Experiencia de Usuario (UX) y las **5 Dimensiones del Diseño de Interacción (IxD)**, utilizando una arquitectura de tres zonas funcionales.

## Características Principales

* **Compuesto por:** Construido estrictamente con HTML5 semántico, CSS3 moderno y JavaScript puro (cero dependencias de frameworks externos como Bootstrap o Tailwind).
* **Arquitectura de 3 Zonas:**
  * *Zona 1:* Navegación contextual (Sidebar retráctil, Breadcrumbs).
  * *Zona 2:* Contenido dinámico organizado mediante un patrón **Bento Grid Layout**.
  * *Zona 3:* Interacciones críticas mediante capas flotantes (Panel *Drawer* para configuraciones y *Modal* nativo para acciones destructivas).
* **Modo Oscuro Dinámico:** Implementación nativa con variables CSS (`:root`). Detecta automáticamente la preferencia del sistema operativo y permite el cambio manual con transición de íconos (☀️/🌙).
* **Gráfica CSS:** Visualización de consumo general generada exclusivamente con propiedades CSS, sin librerías de gráficos.
* **Gestión de Estados (IxD):** Control riguroso de microinteracciones visuales para los 5 estados interactivos: *Default, Hover, Focus (accesibilidad), Disabled y Loading* (con simulador de peticiones asíncronas).
* **Mobile-First:** Diseño completamente responsivo. En dispositivos móviles, la interfaz prioriza el contenido apilado y oculta elementos no críticos para maximizar el espacio táctil.

## Tecnologías Utilizadas

* **HTML5:** Marcado semántico (`<main>`, `<aside>`, `<dialog>`, etc.) para estructurar la información y mejorar la accesibilidad.
* **CSS3:** Flexbox y CSS Grid, Custom Properties (Variables CSS), animaciones y transiciones (`keyframes`), Media Queries progresivas.
* **Vanilla JavaScript (ES6):** Manipulación del DOM, gestión de eventos (Listeners) y control de clases dinámicas para modales, panel lateral y modo oscuro.

## Estructura del Proyecto

```text
/
├── index.html   # Estructura principal y maquetación en 3 Zonas
├── styles.css   # Estilos globales
├── script.js    # Lógica de componentes
└── README.md    # Documentación del proyecto
```

## Cómo ejecutar el proyecto

Al ser un proyecto estático sin dependencias de servidor (Node.js u otros), la ejecución es inmediata:

1. Clona este repositorio en tu máquina local
2. Navega a la carpeta del proyecto.
3. Abre el archivo `index.html` directamente en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).
   * *Opcional:* Puedes usar la extensión "Live Server" en Visual Studio Code para ver los cambios en tiempo real si decides modificar el código.

## Aplicación de las 5 Dimensiones de IxD

Este proyecto cumple rigurosamente con los fundamentos de Diseño de Interacción:

1. **Palabras (1D):** Microcopia directa para evitar errores (ej. "Sí, Eliminar") y prevención de acciones destructivas accidentales.
2. **Representaciones Visuales (2D):** Uso de *badges* semánticos (verde/naranja) en la tabla y jerarquía visual mediante CSS Grid.
3. **Objetos Físicos y Espacio (3D):** Botones e inputs diseñados con un `min-height: 44px` cumpliendo el estándar de zonas de toque para pulgares en móviles.
4. **Tiempo (4D):** Transiciones calibradas (0.2s - 0.3s) para respuestas orgánicas, y estados de *loading* visuales durante procesos.
5. **Comportamiento (5D):** Bloqueo de reenvío de formularios y uso del elemento nativo `<dialog>` que permite el cierre de modales con la tecla *Escape*.

---
*Diseñado y desarrollado por **Michelle Castro** como Práctica Integral de Diseño de Interfaces.*