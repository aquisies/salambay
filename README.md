# 🏗️ Salambay Developers - Propuesta de Ecosistema Digital

Presentación interactiva y propuesta comercial para la transformación digital de **Salambay Developers**, diseñada para mostrar el potencial de una plataforma inmobiliaria potenciada por Inteligencia Artificial y automatización.

![Salambay Digital Canvas](./assets/images/digital_ecosystem_canvas.png)

## 🎯 Objetivos de la Propuesta
Este proyecto no es solo una landing page, es un **Ecosistema Digital Completo** que abarca:
1.  **Captación Inteligente:** Uso de IA Lead Router para clasificar prospectos.
2.  **Visualización Persuasiva:** Virtual Staging automatizado para propiedades.
3.  **Autoridad en Contenido:** Blog SEO generado por IA.
4.  **Gestión Operativa:** Negocio digitalizado y métricas claras.

---

## 📁 Estructura del Proyecto

Organización moderna y limpia para facilitar su mantenimiento y despliegue:

```
salambay/
├── assets/
│   └── images/
│       ├── backgrounds/       # Fondos y texturas visuales
│       ├── products/          # Iconos y demos de los productos IA (LeadRouter, Staging)
│       ├── digital_ecosystem_canvas.png  # Mapa estratégico del negocio
│       └── ...                # Diagramas de arquitectura y flujos
├── presentation.html          # Single Page Application (SPA) de la presentación
├── Dockerfile                 # Configuración para despliegue en contenedor
└── README.md                  # Documentación del proyecto
```

---

## 🚀 Despliegue en Producción (Docker)

El proyecto está "Dockerizado" para un despliegue instantáneo y ligero en cualquier servidor (Hostinger VPS, Dokploy, Portainer).

### Requisitos
*   Docker instalado
*   Un dominio configurado (opcional)

### Pasos Rápidos
1.  **Construir la imagen:**
    ```bash
    docker build -t salambay-demo .
    ```
2.  **Correr el contenedor:**
    ```bash
    docker run -d -p 80:80 --name salambay-demo salambay-demo
    ```
3.  **Acceder:** Abre tu navegador en `http://localhost` (o la IP de tu servidor).

### Despliegue con Dokploy
1.  Crear **Application**.
2.  Conectar repositorio GitHub: `aquisies/salambay`.
3.  Rama: `main`.
4.  Build Type: `Dockerfile`.
5.  ¡Deploy!

---

## 🎮 Navegación de la Presentación

| Acción | Resultado |
|--------|-----------|
| `→` `Espacio` | Siguiente diapositiva |
| `←` | Diapositiva anterior |
| `Esc` | Cerrar modales (Imágenes o Fichas de Producto) |
| **Menú ☰** | Saltara cualquier sección específica |

---

## 📋 Contenido (Slides)

| # | Título | Foco |
|---|--------|------|
| 1 | **Portada** | Introducción e impacto visual. |
| 2 | **El Problema** | Dolores actuales (leads perdidos, procesos manuales). |
| 3 | **Ecosistema** | Visión macro de la solución. |
| 3b| **Estrategia** | **Digital Ecosystem Canvas** (Modelo de negocio). |
| 4 | **Antes vs Después** | Comparativa visual de resultados. |
| 5 | **Customer Journey** | Flujo desde la visita hasta la venta. |
| 6 | **Cerebro IA** | Demo de productos: Lead Router, Staging, Content IA. |
| 7 | **Beneficios/ROI** | Retorno de inversión y métricas esperadas. |
| 8 | **Quick Wins** | Mejoras inmediatas al sitio actual. |
| 8b| **Módulos** | Detalle técnico y precios por módulo. |
| 8c| **Hoja de Ruta** | Plan de implementación paso a paso. |
| 9 | **Por Qué Nosotros** | Diferenciadores clave (Bootstrap, IA Real). |
| 10| **Próximos Pasos** | Call to Action (CTA. |
| 11| **Contacto** | Información final. |

---

## 🛠️ Stack Tecnológico
*   **HTML5 & CSS3 Moderno:** Sin frameworks pesados, puro rendimiento.
*   **Vanilla JS:** Lógica ligera para navegación y modales.
*   **Nginx Alpine:** Servidor web ultra-compacto (<10MB) para producción.

---

## 📞 Contacto y Autoría
**Alexander Mina**  
*Ingeniero de Sistemas Senior | Arquitecto de Soluciones*  
📧 aquisiesalex@gmail.com
