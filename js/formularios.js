import { showModal } from './modals.js';

const FORM_CONFIG = {
  contact: {
    storageKey: 'contactosNivora',
    fields: {
      nombre: { min: 3, max: 100, errorMessage: 'El nombre debe tener entre 3 y 100 caracteres' },
      correo: { 
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'Por favor ingrese un correo válido (ejemplo: usuario@dominio.com)' 
      },
      telefono: { 
        regex: /^[\d\s+-]{9,15}$/, 
        required: false,
        errorMessage: 'El teléfono debe tener entre 9 y 15 dígitos' 
      },
      mensaje: { 
        min: 10, 
        errorMessage: 'El mensaje debe tener al menos 10 caracteres' 
      }
    },
    successMessage: (data) => `Gracias ${data.nombre}, hemos recibido tu consulta sobre "${data.asunto}".`,
    formClasses: {
      error: 'input-error',
      success: 'input-success'
    }
  },
  reclamo: {
    storageKey: 'reclamosNivora',
    fields: {
      nombre: { 
        min: 3, 
        max: 100,
        errorMessage: 'El nombre debe tener entre 3 y 100 caracteres' 
      },
      dni: { 
        regex: /^\d{8}$/,
        errorMessage: 'El DNI debe tener exactamente 8 dígitos' 
      },
      correo: { 
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        required: false,
        errorMessage: 'Por favor ingrese un correo válido (ejemplo: usuario@dominio.com)' 
      },
      descripcion: { 
        min: 20, 
        max: 1000,
        errorMessage: 'La descripción debe tener entre 20 y 1000 caracteres' 
      }
    },
    successMessage: (data, count) => `Estimado ${data.nombre}, hemos registrado tu ${getTipoReclamoText(data.tipo)} con el código #${count}.`,
    formClasses: {
      error: 'input-error',
      success: 'input-success'
    },
    tipoMessages: {
      queja: 'Queja Registrada',
      reclamo: 'Reclamo Formal Recibido',
      default: 'Consulta Registrada'
    }
  }
};

function getTipoReclamoText(tipo) {
  return FORM_CONFIG.reclamo.tipoMessages[tipo] || FORM_CONFIG.reclamo.tipoMessages.default;
}

function validateField(field, fieldConfig) {
  const value = field.value.trim();

  if (fieldConfig.required !== false && !value) {
    return { isValid: false, message: 'Este campo es requerido' };
  }

  if (fieldConfig.min && value.length < fieldConfig.min) {
    return { isValid: false, message: fieldConfig.errorMessage };
  }

  if (fieldConfig.max && value.length > fieldConfig.max) {
    return { isValid: false, message: fieldConfig.errorMessage };
  }

  if (fieldConfig.regex && !fieldConfig.regex.test(value)) {
    return { isValid: false, message: fieldConfig.errorMessage };
  }

  return { isValid: true };
}

function showValidationState(input, validationResult, formType) {
  const formGroup = input.closest('.form__group');
  const config = FORM_CONFIG[formType];

  input.setAttribute('aria-invalid', !validationResult.isValid);
  
  if (!validationResult.isValid) {
    let errorMsg = formGroup.querySelector('.error-message') || document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = validationResult.message;
    errorMsg.id = `${input.id}-error`;
    
    if (!formGroup.contains(errorMsg)) {
      formGroup.appendChild(errorMsg);
    }
    
    input.classList.add(config.formClasses.error);
    input.classList.remove(config.formClasses.success);
    
    if (!input.getAttribute('aria-describedby')) {
      input.setAttribute('aria-describedby', errorMsg.id);
    }
  } else {
    const errorMsg = formGroup.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
    
    input.classList.remove(config.formClasses.error);
    input.classList.add(config.formClasses.success);
    
    input.removeAttribute('aria-describedby');
  }
}

function setupFormValidation(form, type) {
  const config = FORM_CONFIG[type];
  let formData = JSON.parse(localStorage.getItem(config.storageKey)) || [];

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(form, type)) return;
    
    const data = getFormData(form, type);
    formData.push(data);
    localStorage.setItem(config.storageKey, JSON.stringify(formData));
    
    showSuccessModal(type, data, formData.length);
    form.reset();
    
    if (type === 'reclamo') {
      renderReclamos(formData);
    }
  });

  setupLiveValidation(form, type);
  
  if (type === 'reclamo') {
    setupDniValidation(form);
  }
}

function validateForm(form, type) {
  const config = FORM_CONFIG[type];
  let isFormValid = true;

  Object.entries(config.fields).forEach(([fieldId, fieldConfig]) => {
    const input = form.querySelector(`#${fieldId}`);
    if (!input) return;
    
    const validationResult = validateField(input, fieldConfig);
    showValidationState(input, validationResult, type);
    
    if (!validationResult.isValid) {
      isFormValid = false;
    }
  });

  return isFormValid;
}

function getFormData(form, type) {
  const baseData = {
    nombre: form.nombre.value.trim(),
    fecha: new Date().toLocaleString()
  };

  if (type === 'contact') {
    return {
      ...baseData,
      correo: form.correo.value.trim(),
      telefono: form.telefono.value.trim(),
      asunto: form.asunto.value.trim() || 'Consulta general',
      mensaje: form.mensaje.value.trim()
    };
  } else {
    return {
      ...baseData,
      dni: form.dni.value.trim(),
      correo: form.correo.value.trim(),
      tipo: form.tipo.value,
      descripcion: form.descripcion.value.trim(),
      estado: 'pendiente'
    };
  }
}

function showSuccessModal(type, data, count) {
  const config = FORM_CONFIG[type];
  
  if (type === 'reclamo') {
    showModal(
      getTipoReclamoText(data.tipo),
      config.successMessage(data, count),
      true
    );
  } else {
    showModal(
      'Mensaje Enviado',
      config.successMessage(data),
      true
    );
  }
}

function setupLiveValidation(form, type) {
  const config = FORM_CONFIG[type];
  
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => {
      const fieldId = input.id;
      const fieldConfig = config.fields[fieldId];
      
      if (fieldConfig) {
        const validationResult = validateField(input, fieldConfig);
        showValidationState(input, validationResult, type);
      }
    });
  });
}

function setupDniValidation(form) {
  const dniInput = form.querySelector('#dni');
  if (dniInput) {
    dniInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 8);
      
      const validationResult = validateField(this, FORM_CONFIG.reclamo.fields.dni);
      showValidationState(this, validationResult, 'reclamo');
    });
  }
}

function renderReclamos(reclamos) {
  const container = document.getElementById('reclamosContainer');
  if (!container) return;

  if (reclamos.length === 0) {
    container.innerHTML = '<p class="no-reclamos">No hay reclamos registrados</p>';
    return;
  }

  container.innerHTML = reclamos.map((reclamo, index) => `
    <div class="reclamo-card">
      <h3>${getTipoReclamoText(reclamo.tipo)} #${index + 1}</h3>
      <p><strong>Fecha:</strong> ${reclamo.fecha}</p>
      <p><strong>Estado:</strong> <span class="estado ${reclamo.estado}">${reclamo.estado}</span></p>
      <button class="button button--small ver-detalle" data-id="${index}">Ver detalles</button>
    </div>
  `).join('');

  container.querySelectorAll('.ver-detalle').forEach(btn => {
    btn.addEventListener('click', () => {
      const reclamo = reclamos[btn.dataset.id];
      showReclamoDetailsModal(reclamo, parseInt(btn.dataset.id) + 1);
    });
  });
}

function showReclamoDetailsModal(reclamo, numeroReclamo) {
  showModal(
    `Detalles de ${reclamo.tipo} #${numeroReclamo}`,
    `
    <div class="reclamo-details">
      <p><strong>Nombre:</strong> ${reclamo.nombre}</p>
      <p><strong>DNI:</strong> ${reclamo.dni}</p>
      <p><strong>Correo:</strong> ${reclamo.correo || 'No proporcionado'}</p>
      <p><strong>Tipo:</strong> ${reclamo.tipo}</p>
      <p><strong>Fecha:</strong> ${reclamo.fecha}</p>
      <p><strong>Descripción:</strong></p>
      <div class="descripcion-box">${reclamo.descripcion}</div>
    </div>
    `,
    false
  );
}

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.form--contact');
  if (contactForm) {
    setupFormValidation(contactForm, 'contact');
  }

  const reclamoForm = document.querySelector('.form--reclamos');
  if (reclamoForm) {
    setupFormValidation(reclamoForm, 'reclamo');
    
    if (document.getElementById('reclamosContainer')) {
      const reclamos = JSON.parse(localStorage.getItem(FORM_CONFIG.reclamo.storageKey)) || [];
      renderReclamos(reclamos);
    }
  }
});