/**
 * Muestra un modal personalizado en la pantalla
 * @param {string} title - Título del modal
 * @param {string} content - Contenido HTML del modal
 * @param {boolean} [isSuccess=true] - Determina el estilo (éxito/error)
 * @param {boolean} [showAcceptButton=true] - Determina si mostrar el botón Aceptar
 */
export function showModal(title, content, isSuccess = true, showAcceptButton = true) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content ${isSuccess ? 'success' : 'error'}">
            <span class="close-modal">&times;</span>
            <h3>${title}</h3>
            <div class="modal-body">${content}</div>
            ${showAcceptButton ? '<button class="modal-close-btn button button--primary">Aceptar</button>' : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.classList.remove('no-scroll');
            document.body.style.overflow = '';
        }, 300);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    if (showAcceptButton) {
        modal.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    
    modal._closeModal = () => {
        document.removeEventListener('keydown', handleKeyDown);
        closeModal();
    };
    
    return modal;
}

/**
 * Inicializa los modales para los artículos del blog
 */
function initBlogModals() {
    document.querySelectorAll('.blog-post__link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const post = this.closest('.blog-post');
            const title = post.querySelector('.blog-post__title').textContent;
            const author = post.querySelector('.blog-post__author').textContent;
            const date = post.querySelector('.blog-post__date').textContent;
            const category = post.querySelector('.blog-post__category').textContent;
            const tags = [...post.querySelectorAll('.blog-post__tag')].map(tag => tag.textContent).join(', ');

            let modalContent = '';
            
            if (title.toLowerCase().includes('inglés')) {
                modalContent = `
                    <div class="modal-header">
                        <div class="modal-meta">
                            <span class="meta-author">${author}</span>
                            <span class="meta-date">${date}</span>
                            <span class="meta-category">${category}</span>
                            <div class="meta-tags">${tags}</div>
                        </div>
                    </div>
                    
                    <div class="modal-scroll-container">
                        <div class="modal-content-inner">
                            <h4>El inglés ya no es solo una materia escolar, es una herramienta fundamental para el desarrollo académico, profesional y personal.</h4>
                            <p>Incluirlo desde la educación básica da a los niños ventajas significativas a corto y largo plazo.</p>
                            
                            <div class="modal-tips">
                                ${getEnglishTips()}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                modalContent = `
                    <div class="modal-header">
                        <div class="modal-meta">
                            <span class="meta-author">${author}</span>
                            <span class="meta-date">${date}</span>
                            <span class="meta-category">${category}</span>
                            <div class="meta-tags">${tags}</div>
                        </div>
                    </div>
                    
                    <div class="modal-scroll-container">
                        <div class="modal-content-inner">
                            <h4>Estudiar desde casa puede ser un gran reto tanto para los niños como para los padres.</h4>
                            <p>La falta de estructura escolar, las distracciones del hogar y la motivación fluctuante pueden dificultar el aprendizaje.</p>
                            
                            <div class="modal-tips">
                                ${getHomeStudyTips()}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            showModal(title, modalContent + getModalStyles(), true);
        });
    });
}

/**
 * Devuelve los tips para el artículo de inglés
 */
function getEnglishTips() {
    return `
        <div class="modal-tip">
            <h5>1. Acceso a Oportunidades Académicas</h5>
            <ul>
                <li>Muchos contenidos científicos, tecnológicos y culturales están en inglés.</li>
                <li>Saber inglés facilita el acceso a materiales de calidad, libros, cursos y programas internacionales desde edades tempranas.</li>
                <li>Mejora el rendimiento escolar al poder entender términos clave en otras materias (como ciencia o informática).</li>
            </ul>
        </div>
        
        <div class="modal-tip">
            <h5>2. Desarrollo Cognitivo y Mental</h5>
            <ul>
                <li>Aprender un segundo idioma estimula la memoria, la atención y la capacidad de resolver problemas.</li>
                <li>Cuanto antes se expone un niño a un nuevo idioma, más natural y efectiva es su adquisición.</li>
                <li>Fomenta la flexibilidad mental al cambiar entre idiomas.</li>
            </ul>
        </div>
        
        <div class="modal-tip">
            <h5>3. Mejora la Comunicación Global</h5>
            <ul>
                <li>El inglés es el idioma más utilizado en contextos internacionales.</li>
                <li>Permite comunicarse con personas de diferentes países, culturas y contextos.</li>
                <li>Abre puertas para viajes, intercambios y experiencias multiculturales.</li>
            </ul>
        </div>
        
        <div class="modal-tip important-tip">
            <h5>📌 ¿Por Qué Enseñar Inglés Desde la Educación Básica?</h5>
            <ul>
                <li>A los niños les resulta más fácil y natural aprender idiomas que a los adultos.</li>
                <li>Se sientan las bases para una comunicación más amplia y segura en el futuro.</li>
                <li>Aumenta la autoestima y la confianza al poder expresarse en otro idioma.</li>
            </ul>
        </div>
    `;
}

/**
 * Devuelve los tips para el artículo de estudiar en casa
 */
function getHomeStudyTips() {
    return `
        <div class="modal-tip">
            <h5>1. Crea un Espacio de Estudio Adecuado</h5>
            <ul>
                <li>Establece un lugar fijo para estudiar que sea tranquilo, ordenado y libre de distracciones.</li>
                <li>Asegúrate de que tenga buena iluminación, una silla cómoda y los materiales escolares necesarios.</li>
                <li>Evita zonas como la cama o el sofá para mantener el enfoque.</li>
            </ul>
        </div>
        
        <div class="modal-tip">
            <h5>2. Establece una Rutina Diaria</h5>
            <ul>
                <li>Mantén horarios regulares para levantarse, estudiar, comer y descansar.</li>
                <li>Una rutina clara ayuda a los niños a sentirse seguros y organizados.</li>
                <li>Incluye pausas cortas entre sesiones de estudio para mantener la concentración.</li>
            </ul>
        </div>
        
        <div class="modal-tip">
            <h5>3. Usa Herramientas y Recursos Educativos</h5>
            <ul>
                <li>Aprovecha aplicaciones, videos educativos y plataformas interactivas.</li>
                <li>Combina el uso de tecnología con libros físicos, fichas de repaso y juegos didácticos.</li>
            </ul>
        </div>
    `;
}

/**
 * Devuelve los estilos CSS para los modales
 */
function getModalStyles() {
    return `
        <style>
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                overflow-y: auto;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .modal.active {
                opacity: 1;
                pointer-events: auto;
            }
            
            .modal-content {
                background: white;
                border-radius: 8px;
                width: 100%;
                max-width: 800px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                transform: translateY(-20px);
                transition: transform 0.3s ease;
                position: relative;
            }
            
            .modal.active .modal-content {
                transform: translateY(0);
            }
            
            .modal-scroll-container {
                overflow-y: auto;
                padding: 20px;
                flex-grow: 1;
                scrollbar-width: thin;
                scrollbar-color: #4a90e2 #f0f0f0;
            }
            
            .modal-scroll-container::-webkit-scrollbar {
                width: 6px;
            }
            
            .modal-scroll-container::-webkit-scrollbar-track {
                background: #f0f0f0;
                border-radius: 3px;
            }
            
            .modal-scroll-container::-webkit-scrollbar-thumb {
                background-color: #4a90e2;
                border-radius: 3px;
            }
            
            .modal-header {
                position: sticky;
                top: 0;
                background: white;
                padding: 20px 20px 15px 20px;
                z-index: 10;
                border-bottom: 1px solid #eee;
            }
            
            .modal-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                font-size: 0.85rem;
                color: #666;
                margin-top: 8px;
            }
            
            .modal-tips { margin-top: 20px; }
            .modal-tip { 
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f0f0f0;
            }
            .modal-tip:last-child { border-bottom: none; }
            .modal-tip h5 { 
                color: #2c3e50;
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            .modal-tip ul {
                padding-left: 20px;
                margin-top: 5px;
            }
            .modal-tip li {
                margin-bottom: 8px;
                line-height: 1.5;
            }
            .important-tip {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                z-index: 11;
            }
            
            .close-modal:hover {
                color: #333;
            }
            
            .modal-close-btn {
                margin: 20px auto;
                display: block;
                width: calc(100% - 40px);
                max-width: 200px;
            }
            
            .no-scroll {
                overflow: hidden;
            }
        </style>
    `;
}

/**
 * Inicializa los modales para las modalidades de cursos
 */
function initCourseModals() {
    const modalidadesData = {
        presencial: {
            title: "Clases Presenciales",
            description: "Aprende en nuestras modernas instalaciones con profesores certificados.",
            beneficios: [
                "Interacción directa con profesores",
                "Acceso a biblioteca y recursos físicos",
                "Grupos reducidos (máx. 8 estudiantes)",
                "Horarios flexibles"
            ],
            precios: {
                básico: { precio: "S/.120/mes", horas: "8 horas semanales", descripcion: "Ideal para iniciación" },
                intermedio: { precio: "S/.150/mes", horas: "12 horas semanales", descripcion: "Para estudiantes con bases" },
                avanzado: { precio: "S/.180/mes", horas: "16 horas semanales", descripcion: "Avanzado con práctica intensiva" },
                intensivo: { precio: "S/.250/mes", horas: "20 horas semanales", descripcion: "Inmersión completa" }
            }
        },
        virtual: {
            title: "Clases Virtuales",
            description: "Aprende desde cualquier lugar con nuestra plataforma interactiva.",
            beneficios: [
                "Clases en vivo con profesores en tiempo real",
                "Acceso a grabaciones de las sesiones",
                "Plataforma interactiva con ejercicios",
                "Horarios flexibles y adaptables"
            ],
            precios: {
                básico: { precio: "S/.100/mes", horas: "6 horas semanales", descripcion: "Clases básicas en línea" },
                intermedio: { precio: "S/.130/mes", horas: "9 horas semanales", descripcion: "Sesiones interactivas" },
                avanzado: { precio: "S/.160/mes", horas: "12 horas semanales", descripcion: "Programa completo virtual" },
                intensivo: { precio: "S/.220/mes", horas: "15 horas semanales", descripcion: "Curse acelerado online" }
            }
        },
        intensivo: {
            title: "Cursos Intensivos",
            description: "Programas acelerados para obtener resultados rápidos.",
            beneficios: [
                "Inmersión completa en el idioma",
                "Avance rápido en poco tiempo",
                "Ideal para preparación de exámenes o viajes",
                "Horarios concentrados"
            ],
            precios: {
                "4 semanas": { precio: "S/.300", horas: "40 horas totales", descripcion: "Curso rápido de 1 mes" },
                "8 semanas": { precio: "S/.550", horas: "80 horas totales", descripcion: "Programa intermedio" },
                "12 semanas": { precio: "S/.750", horas: "120 horas totales", descripcion: "Preparación completa" }
            }
        },
        examenes: {
            title: "Preparación para Exámenes Internacionales",
            description: "Prepárate para TOEFL, IELTS y otros exámenes de certificación.",
            beneficios: [
                "Enfoque en técnicas de examen",
                "Simulacros de prueba periódicos",
                "Retroalimentación personalizada",
                "Materiales de estudio especializados"
            ],
            precios: {
                TOEFL: { precio: "S/.350", horas: "30 horas", descripcion: "Preparación completa TOEFL" },
                IELTS: { precio: "S/.380", horas: "32 horas", descripcion: "Curso especializado IELTS" },
                TOEIC: { precio: "S/.320", horas: "28 horas", descripcion: "Preparación TOEIC" },
                Cambridge: { precio: "S/.400", horas: "35 horas", descripcion: "Certificación Cambridge" }
            }
        }
    };

    // Array para almacenar todas las inscripciones
    const inscripciones = [];

    document.querySelectorAll('.modalidad-card__button').forEach(button => {
        button.addEventListener('click', function() {
            const modalidadCard = this.closest('.modalidad-card');
            const modalidad = modalidadCard.dataset.modalidad;
            const data = modalidadesData[modalidad];
            
            if (!data) {
                console.error('Modalidad no encontrada:', modalidad);
                return;
            }
            
            showPackageSelectionModal(data, modalidad, inscripciones);
        });
    });

    function showPackageSelectionModal(data, modalidad, inscripciones) {
        const packageOptions = Object.entries(data.precios).map(([nombre, detalle]) => 
            `<div class="package-option">
                <h4>${nombre.toUpperCase()}</h4>
                <p class="package-price">${detalle.precio}</p>
                <p class="package-hours">${detalle.horas}</p>
                <p class="package-description">${detalle.descripcion}</p>
                <button class="button button--primary select-package" 
                        data-package="${nombre}"
                        data-modalidad="${modalidad}">
                    Seleccionar
                </button>
            </div>`
        ).join('');

        const modal = showModal(
            `Seleccione su paquete - ${data.title}`,
            `
            <div class="modal-scroll-container">
                <h4>Paquetes disponibles:</h4>
                <div class="packages-grid">
                    ${packageOptions}
                </div>
            </div>
            ` + getPackageSelectionStyles(),
            true,
            false // No mostrar botón Aceptar aquí
        );

        modal.querySelectorAll('.select-package').forEach(btn => {
            btn.addEventListener('click', () => {
                const packageName = btn.dataset.package;
                const packageDetails = data.precios[packageName];
                showInscriptionForm(data.title, modalidad, packageName, packageDetails, inscripciones);
                modal._closeModal();
            });
        });
    }

    function showInscriptionForm(modalidadTitle, modalidadType, packageName, packageDetails, inscripciones) {
        const modal = showModal(
            `Inscripción: ${modalidadTitle} - ${packageName}`,
            `
            <div class="modal-scroll-container">
                <div class="package-summary">
                    <h4>Resumen del paquete seleccionado:</h4>
                    <p><strong>Modalidad:</strong> ${modalidadTitle}</p>
                    <p><strong>Paquete:</strong> ${packageName}</p>
                    <p><strong>Precio:</strong> ${packageDetails.precio}</p>
                    <p><strong>Duración:</strong> ${packageDetails.horas}</p>
                    <p><strong>Descripción:</strong> ${packageDetails.descripcion}</p>
                </div>
                
                <form id="inscriptionForm" class="inscription-form">
                    <h4>Complete sus datos:</h4>
                    
                    <div class="form-group">
                        <label for="nombre">Nombre completo:</label>
                        <input type="text" id="nombre" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Correo electrónico:</label>
                        <input type="email" id="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefono">Teléfono:</label>
                        <input type="tel" id="telefono" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="dni">DNI:</label>
                        <input type="text" id="dni" required pattern="[0-9]{8}">
                    </div>
                    
                    <div class="form-group">
                        <label for="fecha-inicio">Fecha de inicio preferida:</label>
                        <input type="date" id="fecha-inicio" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="metodo-pago">Método de pago:</label>
                        <select id="metodo-pago" required>
                            <option value="">Seleccione...</option>
                            <option value="tarjeta">Tarjeta de crédito/débito</option>
                            <option value="transferencia">Transferencia bancaria</option>
                            <option value="efectivo">Pago en efectivo</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="terminos" required>
                            Acepto los términos y condiciones
                        </label>
                    </div>
                    
                    <button type="submit" class="button button--primary">Confirmar Inscripción</button>
                </form>
            </div>
            ` + getFormStyles(),
            true,
            false // No mostrar botón Aceptar aquí
        );

        modal.querySelector('#inscriptionForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                modalidad: modalidadTitle,
                tipo: modalidadType,
                paquete: packageName,
                precio: packageDetails.precio,
                horas: packageDetails.horas,
                nombre: modal.querySelector('#nombre').value,
                email: modal.querySelector('#email').value,
                telefono: modal.querySelector('#telefono').value,
                dni: modal.querySelector('#dni').value,
                fechaInicio: modal.querySelector('#fecha-inicio').value,
                metodoPago: modal.querySelector('#metodo-pago').value,
                fechaInscripcion: new Date().toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            };

            inscripciones.push(formData);
            console.log('Inscripción registrada:', formData);
            
            showConfirmationModal(formData);
            modal._closeModal();
        });
    }

    function showConfirmationModal(inscripcion) {
        const modal = showModal(
            '¡Inscripción Exitosa!',
            `
            <div class="confirmation-container">
                <div class="confirmation-icon">✓</div>
                <h3>Gracias por tu inscripción, ${inscripcion.nombre.split(' ')[0]}!</h3>
                
                <div class="confirmation-details">
                    <h4>Resumen de tu inscripción:</h4>
                    
                    <div class="detail-row">
                        <span class="detail-label">Modalidad:</span>
                        <span class="detail-value">${inscripcion.modalidad}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Paquete:</span>
                        <span class="detail-value">${inscripcion.paquete}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Inversión:</span>
                        <span class="detail-value">${inscripcion.precio}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Horas incluidas:</span>
                        <span class="detail-value">${inscripcion.horas}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Fecha de inicio:</span>
                        <span class="detail-value">${inscripcion.fechaInicio}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Método de pago:</span>
                        <span class="detail-value">${getPaymentMethodName(inscripcion.metodoPago)}</span>
                    </div>
                </div>
                
                <div class="confirmation-message">
                    <p>Hemos enviado los detalles de tu inscripción a:</p>
                    <p class="confirmation-email">${inscripcion.email}</p>
                    
                    <div class="whatsapp-notice">
                        <p>Además, en los próximos minutos recibirás un mensaje por WhatsApp al:</p>
                        <p class="confirmation-phone">${inscripcion.telefono}</p>
                        <p>para coordinar los detalles finales.</p>
                    </div>
                    
                    <p class="welcome-message">¡Bienvenido/a a nuestra comunidad educativa!</p>
                </div>
                
                <button class="button button--primary close-confirmation">Aceptar</button>
            </div>
            ` + getConfirmationStyles(),
            true,
            false // no mostrar el boton aceptar
        );

        modal.querySelector('.close-confirmation').addEventListener('click', () => {
            modal._closeModal();
        });
    }

    function getPaymentMethodName(method) {
        const methods = {
            'tarjeta': 'Tarjeta de crédito/débito',
            'transferencia': 'Transferencia bancaria',
            'efectivo': 'Pago en efectivo'
        };
        return methods[method] || method;
    }

    function getPackageSelectionStyles() {
        return `
        <style>
            .modal-scroll-container {
                max-height: 70vh;
                overflow-y: auto;
                padding-right: 10px;
            }
            .packages-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .package-option {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
            }
            .package-price {
                font-size: 1.2em;
                font-weight: bold;
                color: #2c3e50;
                margin: 10px 0;
            }
            .package-hours {
                color: #666;
                margin-bottom: 15px;
            }
            .package-description {
                font-size: 0.9em;
                color: #555;
                margin-bottom: 15px;
            }
            .select-package {
                width: 100%;
            }
        </style>
        `;
    }

    function getFormStyles() {
        return `
        <style>
            .package-summary {
                background: #f5f9ff;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                border-left: 4px solid #4a90e2;
            }
            .inscription-form {
                margin-top: 20px;
            }
            .form-group {
                margin-bottom: 15px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            .form-group input,
            .form-group select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 16px;
            }
            .form-group input[type="checkbox"] {
                width: auto;
                margin-right: 10px;
            }
            button[type="submit"] {
                margin-top: 20px;
                width: 100%;
            }
        </style>
        `;
    }

    function getConfirmationStyles() {
        return `
        <style>
            .confirmation-container {
                text-align: center;
                max-width: 500px;
                margin: 0 auto;
            }
            .confirmation-icon {
                font-size: 60px;
                color: #4CAF50;
                margin-bottom: 20px;
            }
            .confirmation-details {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                text-align: left;
            }
            .confirmation-details h4 {
                margin-top: 0;
                color: #2c3e50;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
            .detail-label {
                font-weight: 500;
                color: #555;
            }
            .detail-value {
                font-weight: 600;
                color: #2c3e50;
            }
            .confirmation-email,
            .confirmation-phone {
                font-weight: bold;
                color: #1a73e8;
                font-size: 1.1em;
                margin: 10px 0;
            }
            .whatsapp-notice {
                background: #f0f7ed;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #4CAF50;
            }
            .welcome-message {
                font-style: italic;
                color: #4CAF50;
                margin-top: 20px;
            }
            .close-confirmation {
                margin-top: 25px;
                padding: 10px 25px;
            }
        </style>
        `;
    }
}

/**
 * Inicializa los modales genéricos (activados por data-modal)
 */
function initGenericModals() {
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('no-scroll');
                document.body.style.overflow = 'hidden';
                
                modal.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
                    closeBtn.addEventListener('click', () => {
                        modal.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                        document.body.style.overflow = '';
                    });
                });
            }
        });
    });
}

/**
 * Inicializa todos los modales cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initGenericModals();
    initBlogModals();
    initCourseModals();
});