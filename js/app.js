/* ============================================
   APP BOOTSTRAPPER & SECURITY
   ============================================ */

// Estado global de seguridad
const SECURITY_STATE = {
  get accessGranted() {
    return localStorage.getItem('salambay_access') === 'true';
  },
  set accessGranted(value) {
    if (!value) {
      localStorage.removeItem('salambay_access');
    } else {
      localStorage.setItem('salambay_access', 'true');
    }
  }
};

const VALID_CODES = ['SALAMBAY2025', 'DIGITAL25', 'ADMIN'];

/* Access Gate Logic */
function initApp() {
  console.log('Salambay App Initializing...');
  checkSecurity();
  autoScale();
  window.addEventListener('resize', autoScale);
}

function checkSecurity() {
  const gate = document.getElementById('accessGate');
  if (!gate) {
    console.warn('Access gate element not found');
    return;
  }
  
  // Leer directamente del localStorage para asegurar que está actualizado
  const isGranted = localStorage.getItem('salambay_access') === 'true';
  
  console.log('checkSecurity: isGranted =', isGranted, 'localStorage value =', localStorage.getItem('salambay_access'));
  
  if (isGranted) {
    gate.classList.add('hidden');
    console.log('Access granted - hiding gate');
  } else {
    gate.classList.remove('hidden');
    console.log('Access denied - showing gate');
  }
}

// Global Validation Function (called by HTML form)
window.validateAccess = function() {
  const input = document.getElementById('accessCode');
  const btn = document.querySelector('.login-btn');
  const msg = document.getElementById('loginMsg');
  const code = input.value.trim().toUpperCase();

  if (VALID_CODES.includes(code)) {
    localStorage.setItem('salambay_access', 'true');
    SECURITY_STATE.accessGranted = true;
    
    btn.textContent = '¡ACCESO CONCEDIDO!';
    btn.style.background = '#4ade80';
    
    setTimeout(() => {
      document.getElementById('accessGate').classList.add('hidden');
    }, 800);
  } else {
    msg.textContent = 'CÓDIGO INCORRECTO';
    input.classList.add('shake');
    setTimeout(() => {
      input.classList.remove('shake');
      msg.textContent = '';
      input.value = '';
    }, 1000);
  }
};

/* Auto Scale Logic (Responsive Canvas) */
function autoScale() {
  const container = document.querySelector('.presentation-container');
  if (!container) return;

  const designW = 960;
  const designH = 540;
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const scale = Math.min( winW / designW, winH / designH );
  container.style.transform = `scale(${scale})`;
}

// Función para cerrar sesión
function performLogout() {
  // Eliminar todas las posibles claves de acceso (por si hay múltiples)
  localStorage.removeItem('salambay_access');
  localStorage.removeItem('salambay_access_granted');
  
  // Forzar actualización del estado
  SECURITY_STATE.accessGranted = false;
  
  // Verificar que se eliminó correctamente
  console.log('Logout: localStorage eliminado. Valor actual:', localStorage.getItem('salambay_access'));
  
  // Recargar la página después de un pequeño delay para asegurar que el localStorage se actualizó
  setTimeout(() => {
    location.reload(true); // true fuerza recarga desde servidor
  }, 100);
}

// Función para mostrar el modal de confirmación de logout
function showLogoutModal() {
  const modal = document.getElementById('logoutModal');
  if (modal) {
    modal.classList.add('active');
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }
}

// Función para cerrar el modal de confirmación de logout
window.closeLogoutModal = function() {
  const modal = document.getElementById('logoutModal');
  if (modal) {
    modal.classList.remove('active');
    // Restaurar scroll del body
    document.body.style.overflow = '';
  }
};

// Función para confirmar el logout
window.confirmLogout = function() {
  closeLogoutModal();
  performLogout();
};

// Función wrapper para el diálogo de confirmación
window.logout = function(event) {
  // Prevenir cualquier propagación de eventos
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  
  // Mostrar modal profesional en lugar de confirm()
  setTimeout(() => {
    showLogoutModal();
  }, 10);
};

// Inicializar el event listener del botón de logout
function initLogoutButton() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    // Remover cualquier listener anterior clonando el elemento
    const newLogoutBtn = logoutBtn.cloneNode(true);
    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
    
    // Agregar nuevo listener con captura para asegurar que se ejecute primero
    newLogoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      // Cerrar el menú contextual
      const contextMenu = document.getElementById('contextMenu');
      if (contextMenu) {
        contextMenu.classList.remove('active');
      }
      
      // Mostrar modal profesional en lugar de confirm()
      showLogoutModal();
    }, true); // true = usar captura phase
  }
}

// Función para mostrar/ocultar contraseña
window.togglePasswordVisibility = function() {
  const passwordInput = document.getElementById('accessCode');
  const toggleIcon = document.getElementById('passwordToggleIcon');
  
  if (!passwordInput || !toggleIcon) return;
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '👁️‍🗨️';
    toggleIcon.setAttribute('title', 'Ocultar contraseña');
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
    toggleIcon.setAttribute('title', 'Mostrar contraseña');
  }
};

// Cerrar modal de logout al hacer clic fuera
document.addEventListener('click', function(e) {
  const logoutModal = document.getElementById('logoutModal');
  if (logoutModal && logoutModal.classList.contains('active')) {
    if (e.target === logoutModal) {
      closeLogoutModal();
    }
  }
});

// Cerrar modal de logout con Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal && logoutModal.classList.contains('active')) {
      closeLogoutModal();
    }
  }
});

// Init
document.addEventListener('DOMContentLoaded', function() {
  initApp();
  initLogoutButton();
});
