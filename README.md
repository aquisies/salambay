# 🏠 Salambay - Presentación Digital

Presentación interactiva para **Salambay Developers**, propuesta de ecosistema digital inmobiliario potenciado con inteligencia artificial.

---

## 📁 Estructura del Proyecto

```
salambay/
├── presentation.html          # Archivo principal de la presentación
├── README.md                  # Este archivo
├── salambay.jpg               # Logo de Salambay
│
├── 📸 Imágenes de Slides
│   ├── Gemini_Generated_Image_01.png   # Slide 1: Portada
│   ├── Gemini_Generated_Image_02.png   # Slide 2: El Problema
│   ├── Gemini_Generated_Image_03.png   # Slide 3: Ecosistema Digital
│   ├── Gemini_Generated_Image_04.png   # Slide 4: Antes vs Después
│   ├── Gemini_Generated_Image_05.png   # Slide 5: Solución Propuesta
│   ├── Gemini_Generated_Image_06.png   # Slide 6: IA Inteligente
│   ├── Gemini_Generated_Image_17bkhk17bkhk17bk.png  # Adicional
│   └── Gemini_Generated_Image_pg2szopg2szopg2s.png  # Adicional
│
└── 📸 Imágenes de Productos IA
    ├── ia_virtual_staging.png    # Virtual Staging - Cocina (efecto púrpura)
    ├── ia_virtual_staging1.png   # Virtual Staging - Cocina (transformación)
    ├── ia_virtual_staging2.png   # Virtual Staging - Baño (antes/después)
    ├── ia_content_generator.png  # Content Generator
    └── ia_lead_router.png        # Lead Router
```

---

## 🚀 Despliegue

### Opción 1: Abrir directamente (Local)

Simplemente abre el archivo `presentation.html` en tu navegador:

```bash
# macOS
open presentation.html

# Windows
start presentation.html

# Linux
xdg-open presentation.html
```

### Opción 2: Servidor local (Recomendado)

Para evitar restricciones de CORS con imágenes locales:

```bash
# Usando Python 3
cd /ruta/a/salambay
python3 -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000/presentation.html
```

```bash
# Usando Node.js (npx)
npx serve .

# O con http-server
npx http-server -p 8000
```

### Opción 3: Despliegue en la nube

#### GitHub Pages
1. Sube el proyecto a un repositorio GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Accede en: `https://tuusuario.github.io/salambay/presentation.html`

#### Netlify / Vercel
1. Arrastra la carpeta `salambay/` al dashboard
2. Se despliega automáticamente con un dominio único

#### Hostinger / VPS
```bash
# Sube los archivos via FTP/SFTP o SSH
scp -r salambay/* usuario@servidor:/var/www/html/salambay/
```

---

## 🎮 Navegación

| Acción | Resultado |
|--------|-----------|
| `→` `Space` `Click derecho` | Siguiente slide |
| `←` `Click izquierdo` | Slide anterior |
| `Home` | Ir al inicio |
| `End` | Ir al final |
| `Esc` | Cerrar modal de imagen |
| **Paginator** | Click en número para ir a slide específico |
| **Menú ☰** | Dropdown con todos los slides |

---

## ✨ Características

- 📱 **Responsive**: Adaptable a diferentes tamaños de pantalla
- 🎨 **Tema oscuro**: Diseño elegante con gradientes púrpura/magenta
- 🖼️ **Modal de imágenes**: Click en cualquier imagen para verla a pantalla completa
- 📸 **Galería de productos**: Navegación entre múltiples imágenes en fichas de producto
- 💡 **Tooltips informativos**: Hover sobre items para ver descripciones
- 🧭 **Navegación múltiple**: Teclado, botones, paginator y menú dropdown

---

## 📋 Contenido de la Presentación

| Slide | Título | Descripción |
|-------|--------|-------------|
| 1 | Portada | Introducción Salambay Developers |
| 2 | El Problema | Pain points actuales |
| 3 | Ecosistema Digital | Visión del sistema conectado |
| 4 | Antes vs Después | Transformación propuesta |
| 5 | Solución Propuesta | Arquitectura técnica |
| 6 | IA Inteligente | Módulos de IA (Virtual Staging, Content Generator, Lead Router) |
| 7 | ROI y Beneficios | Retorno de inversión esperado |
| 8 | Quick Wins | Mejoras rápidas al sitio actual |
| 9 | Ecosistema Completo | Paquetes modulares detallados |
| 10 | Inversión | Desglose de costos y oferta especial |
| 11 | Cronograma | Timeline de implementación |
| 12 | Cierre | Contacto y llamado a la acción |

---

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables, Flexbox, Grid, Transiciones, Animaciones
- **JavaScript** - Vanilla JS (sin frameworks)
- **Imágenes** - Generadas con Gemini AI

---

## 📞 Contacto

**Alexander Mina**  
📧 aquisiesalex@gmail.com  
📱 WhatsApp: +57 316 868 9852

---

## 📄 Licencia

Este proyecto es una propuesta comercial para Salambay.  
Todos los derechos reservados © 2024

