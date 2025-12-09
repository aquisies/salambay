    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesWrapper = document.getElementById('slidesWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginator = document.getElementById('paginator');

    // Títulos de los slides para el menú
    const slideTitles = [
      { num: '1', title: 'Portada' },
      { num: '2', title: 'El Problema' },
      { num: '3', title: 'Ecosistema Digital' },
      { num: '3b', title: 'Canvas Estratégico' },
      { num: '4', title: 'Antes vs Después' },
      { num: '5', title: 'Journey del Cliente' },
      { num: '6', title: 'Cerebro IA' },
      { num: '7', title: 'Beneficios/ROI' },
      { num: '8', title: 'Quick Wins' },
      { num: '8b', title: 'Módulos Ecosistema' },
      { num: '8c', title: 'Ruta de Implementación' },
      { num: '9', title: 'Por Qué Nosotros' },
      { num: '10', title: 'Próximos Pasos' },
      { num: '11', title: 'Cierre + Contacto' }
    ];

    // Función para mostrar/ocultar código fuente (debe estar antes de generateContextMenu)
    window.toggleCodeViewer = function() {
      const codeViewer = document.getElementById('codeViewer');
      const codeViewerBtn = document.getElementById('codeViewerBtn');
      
      if (!codeViewer) return;
      
      const isActive = codeViewer.classList.contains('active');
      
      if (!isActive) {
        // Mostrar código
        codeViewer.classList.add('active');
        loadCodeSource('html'); // Cargar HTML por defecto
      } else {
        // Ocultar código
        codeViewer.classList.remove('active');
      }
      
      // Actualizar el botón en el menú contextual
      if (codeViewerBtn) {
        const isNowActive = codeViewer.classList.contains('active');
        codeViewerBtn.innerHTML = `
          <span class="context-menu-icon" style="font-size: 1.2rem;">${isNowActive ? '👁\u200d🗨' : '👁'}</span>
          <span>${isNowActive ? 'Ocultar Código' : 'Ver Código'}</span>
        `;
      }
    };
    
    // Función para cargar el código fuente según la pestaña seleccionada
    function loadCodeSource(type) {
      const codeText = document.getElementById('codeText');
      if (!codeText) return;
      
      // Obtener el código según el tipo
      let sourceCode = '';
      
      if (type === 'html') {
        // Obtener el HTML del documento completo
        sourceCode = document.documentElement.outerHTML;
        // Formatear básicamente
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else if (type === 'css') {
        // Obtener todos los estilos CSS
        const stylesheets = Array.from(document.styleSheets);
        sourceCode = '';
        stylesheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach(rule => {
              sourceCode += rule.cssText + '\n';
            });
          } catch (e) {
            // Ignorar errores de CORS
          }
        });
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else if (type === 'js') {
        // Obtener el código JavaScript de los scripts inline
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        sourceCode = '// Scripts externos:\n';
        scripts.forEach(script => {
          sourceCode += `// ${script.src}\n`;
        });
        sourceCode += '\n// Scripts inline:\n';
        const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'));
        inlineScripts.forEach(script => {
          sourceCode += script.textContent + '\n\n';
        });
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
      
      codeText.innerHTML = sourceCode || '// No hay código disponible';
    }

    // Generar paginador elegante - Solo muestra Primero/Anterior/Siguiente/Último
    function generatePaginator() {
      if (!paginator) return; // Guard
      paginator.innerHTML = '';
      
      // Botón "Primero" - Solo visible si no estamos en el primer slide
      if (currentSlideIndex > 0) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'nav-page-btn';
        firstBtn.textContent = 'Primero';
        firstBtn.title = 'Ir al primer slide';
        firstBtn.onclick = () => goToSlide(0);
        paginator.appendChild(firstBtn);
      }
      
      // Botón "Anterior" - Solo visible si no estamos en el primer slide
      if (currentSlideIndex > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-page-btn';
        prevBtn.textContent = 'Anterior';
        prevBtn.title = 'Slide anterior';
        prevBtn.onclick = () => previousSlide();
        paginator.appendChild(prevBtn);
      }
      
      // Indicador de slide actual
      const currentIndicator = document.createElement('div');
      currentIndicator.className = 'current-slide-indicator';
      currentIndicator.innerHTML = `
        <span class="current-slide-num">${slideTitles[currentSlideIndex].num}</span>
        <span class="current-slide-title">${slideTitles[currentSlideIndex].title}</span>
      `;
      paginator.appendChild(currentIndicator);
      
      // Botón "Siguiente" - Solo visible si no estamos en el último slide
      if (currentSlideIndex < totalSlides - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-page-btn';
        nextBtn.textContent = 'Siguiente';
        nextBtn.title = 'Siguiente slide';
        nextBtn.onclick = () => nextSlide();
        paginator.appendChild(nextBtn);
      }
      
      // Botón "Último" - Solo visible si no estamos en el último slide
      if (currentSlideIndex < totalSlides - 1) {
        const lastBtn = document.createElement('button');
        lastBtn.className = 'nav-page-btn';
        lastBtn.textContent = 'Último';
        lastBtn.title = 'Ir al último slide';
        lastBtn.onclick = () => goToSlide(totalSlides - 1);
        paginator.appendChild(lastBtn);
      }
    }

    // Actualizar paginador activo
    function updatePaginator() {
      // Regenerar el paginador para reflejar la posición actual
      generatePaginator();
    }

    // Generar menú contextual completo (Salir + Slides)
    function generateContextMenu() {
      const contextMenu = document.getElementById('contextMenu');
      if (!contextMenu) return;
      
      contextMenu.innerHTML = '';
      
      // Primero: Botón de Salir
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'context-menu-item';
      logoutBtn.id = 'logoutBtn';
      logoutBtn.title = 'Cerrar Sesión';
      logoutBtn.innerHTML = `
        <span class="context-menu-icon">🚪</span>
        <span>Cerrar Sesión</span>
      `;
      logoutBtn.onclick = function(e) {
        e.stopPropagation();
        const contextMenu = document.getElementById('contextMenu');
        if (contextMenu) {
          contextMenu.classList.remove('active');
        }
        if (window.logout) {
          window.logout(e);
        }
      };
      contextMenu.appendChild(logoutBtn);
      
      // Separador
      const separator = document.createElement('div');
      separator.className = 'context-menu-separator';
      contextMenu.appendChild(separator);
      
      // Título de sección
      const sectionTitle = document.createElement('div');
      sectionTitle.className = 'context-menu-section-title';
      sectionTitle.textContent = 'Navegar a Slide';
      contextMenu.appendChild(sectionTitle);
      
      // Luego: Todas las opciones de slides
      let itemsCreated = 0;
      slideTitles.forEach((slide, index) => {
        const item = document.createElement('button');
        item.className = 'context-menu-item slide-menu-item';
        if (index === currentSlideIndex) {
          item.classList.add('active');
        }
        item.innerHTML = `
          <span class="context-menu-icon menu-num">${slide.num}</span>
          <span>${slide.title}</span>
        `;
        item.onclick = () => {
          goToSlide(index);
          const contextMenu = document.getElementById('contextMenu');
          if (contextMenu) {
            contextMenu.classList.remove('active');
          }
        };
        contextMenu.appendChild(item);
        itemsCreated++;
      });
      
      // Debug: Verificar que se generaron todos los elementos
      console.log(`Menú contextual generado con ${slideTitles.length} slides (${itemsCreated} items creados)`);
      console.log(`Elementos en el DOM:`, contextMenu.querySelectorAll('.slide-menu-item').length);
      
      // Reinicializar el botón de logout después de regenerar el menú
      if (typeof initLogoutButton === 'function') {
        setTimeout(() => {
          initLogoutButton();
        }, 100);
      }
    }

    // Actualizar menú contextual (marcar slide activo)
    function updateContextMenu() {
      const contextMenu = document.getElementById('contextMenu');
      if (!contextMenu) return;
      
      const slideItems = contextMenu.querySelectorAll('.slide-menu-item');
      slideItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlideIndex);
      });
    }

    // Cerrar menú contextual al hacer clic fuera
    document.addEventListener('click', function(e) {
      const contextMenu = document.getElementById('contextMenu');
      const contextMenuBtn = document.getElementById('contextMenuBtn');
      if (contextMenu && contextMenuBtn && 
          !e.target.closest('.context-menu') && 
          !e.target.closest('.context-menu-btn')) {
        contextMenu.classList.remove('active');
      }
    });
    
    // Función para cargar el código fuente según la pestaña seleccionada
    function loadCodeSource(type) {
      const codeText = document.getElementById('codeText');
      if (!codeText) return;
      
      // Obtener el código según el tipo
      let sourceCode = '';
      
      if (type === 'html') {
        // Obtener el HTML del documento completo
        sourceCode = document.documentElement.outerHTML;
        // Formatear básicamente
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else if (type === 'css') {
        // Obtener todos los estilos CSS
        const stylesheets = Array.from(document.styleSheets);
        sourceCode = '';
        stylesheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);
            rules.forEach(rule => {
              sourceCode += rule.cssText + '\n';
            });
          } catch (e) {
            // Ignorar errores de CORS
          }
        });
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else if (type === 'js') {
        // Obtener el código JavaScript de los scripts inline
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        sourceCode = '// Scripts externos:\n';
        scripts.forEach(script => {
          sourceCode += `// ${script.src}\n`;
        });
        sourceCode += '\n// Scripts inline:\n';
        const inlineScripts = Array.from(document.querySelectorAll('script:not([src])'));
        inlineScripts.forEach(script => {
          sourceCode += script.textContent + '\n\n';
        });
        sourceCode = sourceCode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
      
      codeText.innerHTML = sourceCode || '// No hay código disponible';
    }
    
    // Manejar cambio de pestañas del visor de código
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('code-tab')) {
        const tabs = document.querySelectorAll('.code-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        const tabType = e.target.getAttribute('data-tab');
        loadCodeSource(tabType);
      }
    });
    
    // Cerrar visor de código con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const codeViewer = document.getElementById('codeViewer');
        if (codeViewer && codeViewer.classList.contains('active')) {
          toggleCodeViewer();
        }
      }
    });
    
    // Inicializar menú contextual
    function initContextMenu() {
      const contextMenuBtn = document.getElementById('contextMenuBtn');
      const contextMenu = document.getElementById('contextMenu');
      
      if (contextMenuBtn && contextMenu) {
        contextMenuBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          contextMenu.classList.toggle('active');
        });
      }
      
      // Generar el contenido del menú
      generateContextMenu();
    }

    // Initialize paginator and menu
    if (paginator) generatePaginator();
    initContextMenu();
    updateNavigation();

    /**
     * Maneja el efecto flip de las tarjetas de IA
     * @param {HTMLElement} card - Elemento de la tarjeta a voltear
     * @param {Event} event - Evento del click
     */
    function flipCard(card, event) {
      if (event) {
        event.stopPropagation(); // Prevenir navegación al hacer clic en tarjeta
        event.preventDefault();
      }
      const isFlipped = card.classList.contains('flipped');
      
      if (isFlipped) {
        card.classList.remove('flipped');
      } else {
        card.classList.add('flipped');
      }
    }

    /**
     * Inicializa los event listeners para las tarjetas flip
     */
    function initFlipCards() {
      const flipCards = document.querySelectorAll('.flip-card');
      flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
          flipCard(this, e);
        });
      });
    }

    /**
     * Navega al slide siguiente
     */
    function nextSlide() {
      if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        goToSlide(currentSlideIndex);
      }
    }

    /**
     * Navega al slide anterior
     */
    function previousSlide() {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        goToSlide(currentSlideIndex);
      }
    }

    // Las funciones globales se exponen al final del archivo

    /**
     * Va a un slide específico
     * @param {number} index - Índice del slide (0-based)
     */
    function goToSlide(index) {
      currentSlideIndex = index;
      const slideWidth = 960; // Ancho fijo del slide en px
      const translateX = -index * slideWidth;
      slidesWrapper.style.transform = `translateX(${translateX}px)`;
      updateNavigation();
    }

    /**
     * Actualiza los controles de navegación
     */
    function updateNavigation() {
      if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
      if (nextBtn) nextBtn.disabled = currentSlideIndex === totalSlides - 1;
      updatePaginator();
      updateContextMenu();
    }

    /**
     * Maneja la navegación con teclado
     */
    document.addEventListener('keydown', function(e) {
      // Cerrar modales y menú con Escape
      if (e.key === 'Escape') {
        closeImageModal();
        closeProductModal();
        const contextMenu = document.getElementById('contextMenu');
        if (contextMenu) {
          contextMenu.classList.remove('active');
        }
        return;
      }
      
      // Si el modal está abierto, no navegar slides
      const modal = document.getElementById('imageModal');
      if (modal && modal.classList.contains('active')) {
        return;
      }
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    });

    /**
     * IMAGE MODAL / LIGHTBOX FUNCTIONALITY
     */
    function openImageModal(imgSrc) {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      if (modal && modalImg) {
        modalImg.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeImageModal() {
      const modal = document.getElementById('imageModal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    function initImageModal() {
      // Agregar click listener a todas las imágenes en slides
      const images = document.querySelectorAll('.slide img:not(.no-modal)');
      images.forEach(img => {
        img.addEventListener('click', function(e) {
          e.stopPropagation();
          openImageModal(this.src);
        });
      });

      // Cerrar modal al hacer clic en el overlay
      const modal = document.getElementById('imageModal');
      if (modal) {
        modal.addEventListener('click', function(e) {
          if (e.target === this || e.target.classList.contains('image-modal-close')) {
            closeImageModal();
          }
        });
      }
    }

    /**
     * PRODUCT MODAL - Ficha estilo Netflix
     */
    // Variables para la galería
    let currentGalleryIndex = 0;
    let currentGalleryImages = [];

    const productData = {
      'lead-router': {
        images: ['./assets/images/products/lead_router.png'],
        badge: 'LEAD ROUTER',
        badgeColor: '#38bdf8',
        title: 'Asistente de Clasificación Inteligente',
        tagline: '"Tu secretario digital que nunca duerme, nunca olvida, y siempre prioriza bien"',
        description: `Imagina tener un asistente que trabaja 24/7, los 365 días del año. Cada vez que alguien envía un mensaje preguntando por tus servicios —ya sea por WhatsApp, formulario web o email— este asistente:<br><br>
        <b>1. Entiende la intención:</b> ¿Quiere remodelar? ¿Vender su casa? ¿Es un inversor buscando flip?<br>
        <b>2. Detecta la urgencia:</b> ¿Necesita respuesta hoy o está explorando para el próximo año?<br>
        <b>3. Identifica la zona:</b> Nassau, Suffolk, Queens... sabe dónde está el proyecto.<br>
        <b>4. Responde personalizado:</b> El cliente recibe un mensaje relevante en segundos.<br>
        <b>5. Te prepara el dossier:</b> Cuando abres tu panel, tienes todo: nombre, contacto, tipo de proyecto, urgencia, y sugerencia de próximo paso.<br><br>
        Tú solo decides a quién llamar primero. El resto ya está hecho.`,
        features: [
          { icon: '⚡', title: 'Respuesta Instantánea', desc: 'Menos de 30 segundos' },
          { icon: '🎯', title: 'Clasificación Precisa', desc: '95% de accuracy' },
          { icon: '📊', title: 'Lead Scoring', desc: 'Prioriza por valor' },
          { icon: '🔄', title: 'Aprende Contigo', desc: 'Mejora con feedback' },
          { icon: '📱', title: 'Multi-Canal', desc: 'WhatsApp, Web, Email' },
          { icon: '🌙', title: '24/7 Activo', desc: 'Nunca descansa' }
        ],
        stats: [
          { value: '< 30s', label: 'Tiempo de respuesta' },
          { value: '+200%', label: 'Más leads capturados' },
          { value: '24/7', label: 'Disponibilidad' }
        ]
      },
      'virtual-staging': {
        images: ['./assets/images/products/virtual_staging_main.png', './assets/images/products/virtual_staging_1.png', './assets/images/products/virtual_staging_2.png'],
        badge: 'STAGING IA',
        badgeColor: '#a855f7',
        title: 'Diseñador Virtual de Interiores',
        tagline: '"Muestra el potencial de cualquier propiedad sin mover un solo mueble"',
        description: `El staging tradicional cuesta miles de dólares y días de trabajo. Con Virtual Staging IA, transformas cualquier espacio vacío en una visión aspiracional en minutos:<br><br>
        <b>1. Sube las fotos:</b> Toma fotos del espacio vacío con tu celular.<br>
        <b>2. Elige el estilo:</b> Moderno, clásico, farmhouse, minimalista, industrial...<br>
        <b>3. La IA hace magia:</b> En minutos tienes renders fotorrealistas de cómo quedaría amueblado.<br>
        <b>4. Impresiona clientes:</b> Muestra el "antes y después" en tu portafolio y propuestas.<br><br>
        Perfecto para:<br>
        • <b>Fix & Flip:</b> Muestra el potencial antes de comprar<br>
        • <b>Ventas:</b> Ayuda compradores a visualizar su futuro hogar<br>
        • <b>Remodelaciones:</b> Presenta opciones de diseño sin contratar arquitecto`,
        features: [
          { icon: '🖼️', title: 'Foto → Render', desc: 'Transformación mágica' },
          { icon: '🎨', title: '10+ Estilos', desc: 'Moderno a clásico' },
          { icon: '⏱️', title: 'En Minutos', desc: 'No días ni semanas' },
          { icon: '💰', title: '90% Ahorro', desc: 'vs staging tradicional' },
          { icon: '🔄', title: 'Iteraciones', desc: 'Ajusta hasta que ames' },
          { icon: '📤', title: 'Alta Resolución', desc: 'Listo para imprimir' }
        ],
        stats: [
          { value: '< 5min', label: 'Por render' },
          { value: '90%', label: 'Ahorro vs tradicional' },
          { value: '10+', label: 'Estilos disponibles' }
        ]
      },
      'content-generator': {
        images: ['./assets/images/products/content_generator.png'],
        badge: 'CONTENT IA',
        badgeColor: '#ec4899',
        title: 'Redactor de Contenido de Autoridad',
        tagline: '"Posiciónate como el experto que eres, sin escribir una sola palabra"',
        description: `Google ama el contenido fresco y relevante. Pero ¿quién tiene tiempo de escribir blog posts cuando hay proyectos que supervisar? Content IA resuelve esto:<br><br>
        <b>1. Temas inteligentes:</b> La IA sugiere temas que tu audiencia busca: "Permisos DOB en Nassau", "Cómo evaluar una casa para flip", "Tendencias de remodelación 2025".<br>
        <b>2. Borradores estructurados:</b> Recibes artículos completos con introducción, desarrollo, conclusión, y llamados a la acción.<br>
        <b>3. SEO integrado:</b> Cada artículo viene optimizado para las palabras clave que importan.<br>
        <b>4. Tu voz, tu estilo:</b> La IA aprende cómo escribes y mantiene tu tono personal.<br><br>
        El resultado: Un blog activo que atrae tráfico orgánico, posiciona tu marca como autoridad, y genera leads mientras duermes. Tú solo revisas, ajustas si quieres, y publicas.`,
        features: [
          { icon: '🔍', title: 'SEO Nativo', desc: 'Optimizado de fábrica' },
          { icon: '📝', title: 'Borradores Listos', desc: 'Solo revisar y publicar' },
          { icon: '🎯', title: 'Keywords Locales', desc: '"contractor near me"' },
          { icon: '📅', title: 'Calendario', desc: 'Publicación programada' },
          { icon: '🗣️', title: 'Tu Voz', desc: 'Mantiene tu estilo' },
          { icon: '📈', title: 'Analytics', desc: 'Mide qué funciona' }
        ],
        stats: [
          { value: '4x', label: 'Más contenido/mes' },
          { value: '+150%', label: 'Tráfico orgánico' },
          { value: '10hrs', label: 'Ahorro semanal' }
        ]
      }
    };

    function openProductModal(productId) {
      const product = productData[productId];
      if (!product) return;

      const modal = document.getElementById('productModal');
      
      // Inicializar galería
      currentGalleryImages = product.images;
      currentGalleryIndex = 0;
      updateGalleryImage();
      updateGalleryDots();
      updateGalleryCounter();
      updateGalleryNavButtons();

      // Poblar datos
      document.getElementById('productModalBadge').textContent = product.badge;
      document.getElementById('productModalBadge').style.background = product.badgeColor;
      document.getElementById('productModalTitle').textContent = product.title;
      document.getElementById('productModalTitle').style.color = product.badgeColor;
      document.getElementById('productModalTagline').textContent = product.tagline;
      document.getElementById('productModalDescription').innerHTML = product.description;

      // Features
      const featuresContainer = document.getElementById('productModalFeatures');
      featuresContainer.innerHTML = product.features.map(f => `
        <div class="product-modal-feature">
          <div class="product-modal-feature-icon">${f.icon}</div>
          <div class="product-modal-feature-title">${f.title}</div>
          <div class="product-modal-feature-desc">${f.desc}</div>
        </div>
      `).join('');

      // Stats
      product.stats.forEach((stat, i) => {
        document.getElementById(`productModalStat${i+1}Value`).textContent = stat.value;
        document.getElementById(`productModalStat${i+1}Value`).style.color = product.badgeColor;
        document.getElementById(`productModalStat${i+1}Label`).textContent = stat.label;
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
      const modal = document.getElementById('productModal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Funciones de la galería
    function updateGalleryImage() {
      const img = document.getElementById('productModalImage');
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = currentGalleryImages[currentGalleryIndex];
        img.style.opacity = '1';
      }, 200);
    }

    function updateGalleryDots() {
      const dotsContainer = document.getElementById('galleryDots');
      if (currentGalleryImages.length <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }
      dotsContainer.style.display = 'flex';
      dotsContainer.innerHTML = currentGalleryImages.map((_, i) => `
        <button class="gallery-dot ${i === currentGalleryIndex ? 'active' : ''}" 
                onclick="goToGalleryImage(${i})"></button>
      `).join('');
    }

    function updateGalleryCounter() {
      const counter = document.getElementById('galleryCounter');
      if (currentGalleryImages.length <= 1) {
        counter.style.display = 'none';
        return;
      }
      counter.style.display = 'block';
      counter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
    }

    function updateGalleryNavButtons() {
      const prevBtn = document.querySelector('.gallery-nav.prev');
      const nextBtn = document.querySelector('.gallery-nav.next');
      
      if (currentGalleryImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
      }
      
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      prevBtn.disabled = currentGalleryIndex === 0;
      nextBtn.disabled = currentGalleryIndex === currentGalleryImages.length - 1;
    }

    function prevGalleryImage() {
      if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGalleryImage();
        updateGalleryDots();
        updateGalleryCounter();
        updateGalleryNavButtons();
      }
    }

    function nextGalleryImage() {
      if (currentGalleryIndex < currentGalleryImages.length - 1) {
        currentGalleryIndex++;
        updateGalleryImage();
        updateGalleryDots();
        updateGalleryCounter();
        updateGalleryNavButtons();
      }
    }

    function goToGalleryImage(index) {
      currentGalleryIndex = index;
      updateGalleryImage();
      updateGalleryDots();
      updateGalleryCounter();
      updateGalleryNavButtons();
    }

    // ACCESS CONTROL - Handled by app.js (removed duplicate)


    // ============================================
    // MOBILE SWIPE LOGIC
    // ============================================
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const SWIPE_THRESHOLD = 50;
      const swipeDistance = touchEndX - touchStartX;
      
      // Swipe Left (Next)
      if (swipeDistance < -SWIPE_THRESHOLD) {
        if (!document.querySelector('.product-modal.active') && !document.querySelector('.image-modal.active')) {
          nextSlide();
        }
      }
      
      // Swipe Right (Prev)
      if (swipeDistance > SWIPE_THRESHOLD) {
        if (!document.querySelector('.product-modal.active') && !document.querySelector('.image-modal.active')) {
          previousSlide();
        }
      }
    }

    // ============================================
    // EXPOSE GLOBAL FUNCTIONS
    // ============================================
    // Hacer funciones globales para acceso desde HTML
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.prevSlide = previousSlide; // Alias para compatibilidad
    window.goToSlide = goToSlide;
    // toggleSlideMenu ya no existe - el menú de slides ahora está en el menú contextual
    window.openProductModal = openProductModal;
    window.closeProductModal = closeProductModal;
    window.prevGalleryImage = prevGalleryImage;
    window.nextGalleryImage = nextGalleryImage;
    window.goToGalleryImage = goToGalleryImage;

    // ============================================
    // ACCORDION SYSTEM FOR RESPONSIVE CARDS
    // ============================================
    function initAccordionCards() {
      // Solo en móvil (hasta 768px) para Quick Wins
      // Para Benefits, también funciona en tablet (hasta 1024px)
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      
      // Quick Wins: solo en móvil
      const quickWinsCards = document.querySelectorAll('.quick-wins-card');
      if (quickWinsCards.length > 0) {
        if (isMobile) {
          // Expandir la primera tarjeta por defecto
          quickWinsCards.forEach(c => c.classList.remove('expanded'));
          if (quickWinsCards[0]) {
            quickWinsCards[0].classList.add('expanded');
          }
        } else {
          // En desktop/tablet, remover expanded
          quickWinsCards.forEach(c => c.classList.remove('expanded'));
        }
      }
      
      // Benefits: en móvil y tablet
      const benefitCards = document.querySelectorAll('.benefit-card');
      if (benefitCards.length > 0) {
        if (isMobile || isTablet) {
          // Expandir la primera tarjeta por defecto
          benefitCards.forEach(c => c.classList.remove('expanded'));
          if (benefitCards[0]) {
            benefitCards[0].classList.add('expanded');
          }
        } else {
          // En desktop, remover expanded
          benefitCards.forEach(c => c.classList.remove('expanded'));
        }
      }
    }
    
    // Manejar clicks en las tarjetas usando delegación de eventos
    function handleAccordionClick(e) {
      const card = e.target.closest('.quick-wins-card, .benefit-card');
      if (!card) return;
      
      // No colapsar si se hace clic en un tooltip o link
      if (e.target.closest('.tooltip') || e.target.closest('a')) {
        return;
      }
      
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      
      // Quick Wins: solo en móvil
      if (card.classList.contains('quick-wins-card') && isMobile) {
        const isExpanded = card.classList.contains('expanded');
        const allCards = document.querySelectorAll('.quick-wins-card');
        
        // Colapsar todas las tarjetas
        allCards.forEach(c => c.classList.remove('expanded'));
        
        // Expandir solo la clickeada si no estaba expandida
        if (!isExpanded) {
          card.classList.add('expanded');
        }
      }
      
      // Benefits: en móvil y tablet
      if (card.classList.contains('benefit-card') && (isMobile || isTablet)) {
        const isExpanded = card.classList.contains('expanded');
        const allCards = document.querySelectorAll('.benefit-card');
        
        // Colapsar todas las tarjetas
        allCards.forEach(c => c.classList.remove('expanded'));
        
        // Expandir solo la clickeada si no estaba expandida
        if (!isExpanded) {
          card.classList.add('expanded');
        }
      }
    }
    
    // Reinicializar acordeón al cambiar de slide o resize
    function reinitAccordion() {
      initAccordionCards();
    }
    
    // Usar delegación de eventos para evitar duplicados
    document.addEventListener('click', handleAccordionClick);
    window.addEventListener('resize', reinitAccordion);

    // ============================================
    // INITIALIZATION
    // ============================================
    // Inicialización cuando el DOM está listo
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Presentación Salambay Developers cargada correctamente');

      // Inicializar las tarjetas flip
      initFlipCards();
      // Inicializar el modal de imágenes
      initImageModal();
      // Inicializar sistema de acordeón
      initAccordionCards();
      
      // Asegurar que el primer slide esté visible
      goToSlide(0);
    });
    
    // Reinicializar acordeón después de cambiar de slide
    const originalGoToSlide = goToSlide;
    window.goToSlide = function(index) {
      originalGoToSlide(index);
      setTimeout(() => {
        initAccordionCards();
      }, 100);
    };
    
    // Nota: autoScale() es manejado por app.js para evitar duplicación
