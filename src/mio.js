// Variables globales
let cartasGiradas = 0;
let primeraEleccion = null;
let segundaEleccion = null;
let movimientos = 0;
let aciertos = 0;
let timer = 60;
let temporizador = false;
let tiempoRegresivo = null;

// Cartas del juego
const cartasOriginales = [
    { id: 0, src: "./src/images/1-elfa.png" },
    { id: 1, src: "./src/images/2-jotun.jpeg" },
    { id: 2, src: "./src/images/3-GuerreroEspada.png" },
    { id: 3, src: "./src/images/4-valledeAlfheim.png" },
    { id: 4, src: "./src/images/5-HierbasyPociones.png" },
    { id: 5, src: "./src/images/6-barconordico.png" },
    { id: 6, src: "./src/images/7-guerero.png" },
    { id: 7, src: "./src/images/8-Sacerdo.png" }
];

// Funciones del juego
function inicializarJuego() {
    const elementos = obtenerElementos();
    const cartasRepetidas = cartasOriginales.concat(cartasOriginales);
    cartasRepetidas.sort(() => Math.random() - 0.5);

    elementos.cartas.forEach((carta, index) => {
        carta.dataset.id = cartasRepetidas[index].id;
        carta.dataset.src = cartasRepetidas[index].src;
    });
}

function obtenerElementos() {
    return {
        tablero: document.querySelector("#tablero"),
        cartas: document.querySelectorAll(".card-back"),
        contadores: {
            movimientos: document.querySelector("#contador_movimientos"),
            aciertos: document.querySelector("#contador_aciertos"),
            tiempo: document.querySelector("#contador_tiempo")
        },
        modal: {
            contenedor: document.querySelector("#mensajeFinJuego"),
            resultado: document.querySelector("#mensajeResultado"),
            movimientos: document.querySelector("#modal_movimientos"),
            aciertos: document.querySelector("#modal_aciertos"),
            tiempo: document.querySelector("#modal_tiempo"),
            botonReiniciar: document.querySelector(".botonReiniciar"),
            cerrar: document.querySelector(".close")
        }
    };
}

function inicializarEventos() {
    const elementos = obtenerElementos();
    
    elementos.tablero.addEventListener('click', function(e) {
        const carta = e.target;
        if (carta.classList.contains('card-back')) {
            girarCartas(carta);
        }
    });

    if (elementos.modal.botonReiniciar) {
        elementos.modal.botonReiniciar.addEventListener('click', reiniciarJuego);
    }
    
    if (elementos.modal.cerrar) {
        elementos.modal.cerrar.addEventListener('click', cerrarModal);
    }
}

function girarCartas($carta) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }

    if (cartasGiradas === 0) {
        primeraEleccion = $carta;
        mostrarCarta($carta);
        cartasGiradas++;
    } else if (cartasGiradas === 1) {
        segundaEleccion = $carta;
        mostrarCarta($carta);
        cartasGiradas++;
        movimientos++;
        actualizarContadores();
        compararCartas();
    }
}

function mostrarCarta($carta) {
    const imgSrc = $carta.dataset.src;
    console.log('Intentando cargar imagen:', imgSrc);
    $carta.src = imgSrc;
    $carta.classList.add('card-flipped');
    $carta.classList.add('non-clickeable');
}

function compararCartas() {
    if (primeraEleccion.dataset.id === segundaEleccion.dataset.id) {
        aciertos++;
        actualizarContadores();
        resetearCartas(true);
        if (aciertos === cartasOriginales.length) {
            clearInterval(tiempoRegresivo);
            mostrarFinDeJuego('¡Felicitaciones! Has ganado');
        }
    } else {
        setTimeout(() => {
            resetearCartas(false);
        }, 1000);
    }
}

function resetearCartas(correcto) {
    if (!correcto) {
        primeraEleccion.src = "src/images/parteTrasera.jpg";
        primeraEleccion.classList.remove('card-flipped');
        primeraEleccion.classList.remove('non-clickeable');
        
        segundaEleccion.src = "src/images/parteTrasera.jpg";
        segundaEleccion.classList.remove('card-flipped');
        segundaEleccion.classList.remove('non-clickeable');
    }
    primeraEleccion = null;
    segundaEleccion = null;
    cartasGiradas = 0;
}

function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        actualizarContadores();
        if (timer === 0) {
            clearInterval(tiempoRegresivo);
            mostrarFinDeJuego('¡Se acabó el tiempo!');
        }
    }, 1000);
}

function mostrarFinDeJuego(mensaje) {
    const elementos = obtenerElementos();
    
    if (elementos.modal.resultado) {
        elementos.modal.resultado.textContent = mensaje;
    }
    if (elementos.modal.movimientos) {
        elementos.modal.movimientos.textContent = movimientos;
    }
    if (elementos.modal.aciertos) {
        elementos.modal.aciertos.textContent = aciertos;
    }
    if (elementos.modal.tiempo) {
        elementos.modal.tiempo.textContent = timer;
    }
    if (elementos.modal.contenedor) {
        elementos.modal.contenedor.style.display = "block";
    }
}

function cerrarModal() {
    const elementos = obtenerElementos();
    if (elementos.modal.contenedor) {
        elementos.modal.contenedor.style.display = "none";
    }
}

function actualizarContadores() {
    const elementos = obtenerElementos();
    if (elementos.contadores.movimientos) {
        elementos.contadores.movimientos.textContent = movimientos;
    }
    if (elementos.contadores.aciertos) {
        elementos.contadores.aciertos.textContent = aciertos;
    }
    if (elementos.contadores.tiempo) {
        elementos.contadores.tiempo.textContent = timer;
    }
}

function reiniciarJuego() {
    cartasGiradas = 0;
    primeraEleccion = null;
    segundaEleccion = null;
    movimientos = 0;
    aciertos = 0;
    timer = 60;
    temporizador = false;
    
    if (tiempoRegresivo) {
        clearInterval(tiempoRegresivo);
    }
    
    cerrarModal();
    inicializarJuego();
    actualizarContadores();
}

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('sonidoFondo');
    
    // Iniciar audio con el primer clic en la página
    document.addEventListener('click', () => {
        audio.play();
    }, { once: true }); // 'once: true' hace que el evento se ejecute solo una vez
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarJuego();
    inicializarEventos();
});


