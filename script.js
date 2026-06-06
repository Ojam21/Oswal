// Productos Database
const productos = [
    {
        id: 1,
        nombre: "Auriculares Premium Wireless",
        categoria: "electronica",
        precio: 199.99,
        icono: "🎧",
        descripcion: "Sonido de alta fidelidad con cancelación de ruido"
    },
    {
        id: 2,
        nombre: "Smartwatch Ultra",
        categoria: "electronica",
        precio: 299.99,
        icono: "⌚",
        descripcion: "Reloj inteligente con monitoreo de salud avanzado"
    },
    {
        id: 3,
        nombre: "Cámara Digital 4K",
        categoria: "electronica",
        precio: 599.99,
        icono: "📷",
        descripcion: "Captura momentos en ultra resolución"
    },
    {
        id: 4,
        nombre: "Mochila Ejecutiva",
        categoria: "accesorios",
        precio: 89.99,
        icono: "🎒",
        descripcion: "Diseño profesional con múltiples compartimentos"
    },
    {
        id: 5,
        nombre: "Reloj de Lujo Clásico",
        categoria: "accesorios",
        precio: 249.99,
        icono: "⏰",
        descripcion: "Elegancia y precisión en cada pulsación"
    },
    {
        id: 6,
        nombre: "Cartera Premium Cuero",
        categoria: "accesorios",
        precio: 149.99,
        icono: "👝",
        descripcion: "Cuero genuino con acabado premium"
    },
    {
        id: 7,
        nombre: "Chaqueta Deportiva",
        categoria: "ropa",
        precio: 129.99,
        icono: "🧥",
        descripcion: "Tecnología de tela transpirable"
    },
    {
        id: 8,
        nombre: "Sudadera Premium",
        categoria: "ropa",
        precio: 79.99,
        icono: "👕",
        descripcion: "Comodidad absoluta con estilo moderno"
    },
    {
        id: 9,
        nombre: "Pantalones Ejecutivos",
        categoria: "ropa",
        precio: 99.99,
        icono: "👖",
        descripcion: "Perfecto para la oficina o casual"
    },
    {
        id: 10,
        nombre: "Zapatillas Running Pro",
        categoria: "ropa",
        precio: 159.99,
        icono: "👟",
        descripcion: "Tecnología de amortiguación avanzada"
    },
    {
        id: 11,
        nombre: "Gafas de Sol Polarizadas",
        categoria: "accesorios",
        precio: 179.99,
        icono: "😎",
        descripcion: "Protección UV 100% con lentes premium"
    },
    {
        id: 12,
        nombre: "Cinturón de Cuero Premium",
        categoria: "accesorios",
        precio: 69.99,
        icono: "🎗️",
        descripcion: "Accesor imprescindible de elegancia"
    }
];

// Carrito
let carrito = [];

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos('todos');
    cargarCarrito();
    aplicarTemaGuardado();
});

// Cargar Productos
function cargarProductos(categoria) {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = '';

    let productosAMostrar = productos;
    if (categoria !== 'todos') {
        productosAMostrar = productos.filter(p => p.categoria === categoria);
    }

    productosAMostrar.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="producto-img">${producto.icono}</div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="producto-footer">
                    <span class="precio">$${producto.precio}</span>
                    <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    actualizarFiltros(categoria);
}

// Filtrar Productos
function filtrarProductos(categoria) {
    cargarProductos(categoria);
}

// Actualizar botones de filtro
function actualizarFiltros(categoriaActiva) {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Agregar al Carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion('Producto agregado al carrito! 🎉');
}

// Mostrar Notificación
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #8b5cf6, #ec4899);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Actualizar Carrito
function actualizarCarrito() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;

    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #64748b;">Tu carrito está vacío</p>';
        return;
    }

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.nombre}</strong>
                <div>Cantidad: ${item.cantidad}</div>
                <div>$${(item.precio * item.cantidad).toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" onclick="eliminarDelCarrito(${index})">×</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    actualizarTotal();
}

// Eliminar del Carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion('Producto removido del carrito');
}

// Actualizar Total
function actualizarTotal() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Alternar Carrito
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

// Guardar Carrito en LocalStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar Carrito desde LocalStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Checkout
function checkout() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mostrarNotificacion(`¡Pedido procesado! Total: $${total.toFixed(2)} 🎊`);
    
    // Simular procesamiento
    setTimeout(() => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        toggleCart();
        mostrarNotificacion('¡Gracias por tu compra! 🙌');
    }, 2000);
}

// Suscribirse Newsletter
function suscribirse(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    mostrarNotificacion(`¡Suscripción confirmada! Revisa ${email} 📧`);
    event.target.reset();
}

// Alternar Tema Oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    actualizarIconoTema();
}

// Aplicar Tema Guardado
function aplicarTemaGuardado() {
    const tema = localStorage.getItem('theme');
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
    }
    actualizarIconoTema();
}

// Actualizar Icono Tema
function actualizarIconoTema() {
    const btn = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        btn.className = 'fas fa-sun';
    } else {
        btn.className = 'fas fa-moon';
    }
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('cartModal');
    if (e.target === modal) {
        toggleCart();
    }
});

// Animaciones al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.producto-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
