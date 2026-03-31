# Veronica Icaza-Lory - Site Web en HTML/CSS/JS Pur

Une version alternativa del sitio web construida con **HTML, CSS y JavaScript vanilla** sin frameworks.

## 📁 Estructura del Proyecto

```
html/
├── index.html          # Página de inicio
├── faq.html            # Página de preguntas frecuentes
├── ma-methode.html     # Página del método
├── css/
│   └── styles.css      # Todos los estilos y animaciones
└── js/
    └── main.js         # JavaScript vanilla mínimo
```

## ✨ Características

### CSS Puro

- **Variables CSS** para colores y tipografía
- **Animaciones CSS**:
  - `fadeInUp` - Aparición con desenfoque
  - `slideInLeft` / `slideInRight` - Deslizamiento lateral
  - `scaleIn` - Escalado de entrada
  - `bounce-gentle` - Rebote suave
  - `float` - Flotación continua
  - `pulse-glow` - Pulso de brillo
- **Diseño responsive** con breakpoints en 768px y 480px
- **Menú hamburguesa** con CSS checkbox hack
- **Transiciones suaves** en hover
- **Soporte para `prefers-reduced-motion`**

### JavaScript Vanilla

- **Intersection Observer** para animaciones al scroll
- **Form validation** con mensajes de error/éxito
- **Navegación activa** según la sección visible
- **Scroll suave** para enlaces internos
- **Debounce/Throttle** para mejor rendimiento

### Sin Dependencias

- ❌ Sin React/Vue/Angular
- ❌ Sin Tailwind CSS
- ❌ Sin Bootstrap
- ❌ Sin jQuery
- ✅ Solo HTML5, CSS3 y JavaScript ES6+

## 🚀 Cómo Usar

### Opción 1: Abrir directamente

Simplemente abre `index.html` en tu navegador.

### Opción 2: Servidor local

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000/html/`

## 📱 Páginas

1. **Inicio** (`index.html`) - Hero, sobre mí, estadísticas, servicios, testimonios, contacto
2. **FAQ** (`faq.html`) - Preguntas frecuentes con acordeón
3. **Mi Método** (`ma-methode.html`) - Comparativa y explicación del método

## 🎨 Personalización

### Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
  --primary: 25 55% 45%; /* Marrón principal */
  --cream: 40 30% 97%; /* Fondo crema */
  --brown-light: 30 40% 70%; /* Marrón claro */
  --brown-dark: 25 40% 25%; /* Marrón oscuro */
}
```

### Tipografía

Google Fonts ya está configurado:

- **Dancing Script** - Para títulos (caligráfico)
- **DM Sans** - Para texto (sans-serif)

### Animaciones

Todas las animaciones están basadas en CSS puro. Puedes modificar:

- Duración con `animation-duration`
- Retraso con `animation-delay`
- Función de easing con `animation-timing-function`

## 📂 Archivos de Imágenes

Las imágenes se encuentran en `../src/assets/`. Para producción, mueve las imágenes a una carpeta `images/` y actualiza las rutas.

## 🌐 Navegación

El menú tiene tres páginas:

- Inicio
- Mi Método
- FAQ

Con soporte para:

- Menú hamburguesa en móvil
- Scroll suave a secciones
- Indicador de página activa

## 📝 Licencia

© 2026 Veronica Icaza-Lory. Todos los derechos reservados.
