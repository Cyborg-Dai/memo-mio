
let timer; //intervalo para geationar tiempo (cronómetro).  Almacena el intervalo del cronómetro para poder iniciarlo y detenerlo cuando sea necesario.
let tiempo = 0; //tiempo transcurrido o restante 
let aciertos = 0; //pares encontrados correctamente
let movimientos = 0; //número de movimientos realizados por el jugador
let $primerCuadro = null;

const $tablero = document.querySelector("#tablero");
const $cartas = document.querySelectorAll(".card");
const $mensajeFinJuego = document.querySelector(".modal");
const contadorMovimientos = document.querySelector("#contador_movimientos");
const contadorAciertos = document.querySelector("#contador_aciertos");  
const contadorTiempo = document.querySelector("#contador_tiempo");
const $botonReiniciar = document.querySelector(".botonReiniciar");


const imagenesOriginales = [
    { id: 0, src: "src/images/1-elfa.png" },
    { id: 1, src: "src/images/2-Gigante-de-Hielo.png" },
    { id: 2, src: "src/images/3-GuerreroEspadadLuz.png" },
    { id: 3, src: "src/images/4-valledeAlfheim0x1024.png" },
    { id: 4, src: "src/images/5-HierbasyPociones.png" },
    { id: 5, src: "src/images/6-barconordico.png" },
    { id: 6, src: "src/images/7-guerrero.png" },
    { id: 7, src: "src/images/8-Sacerdo.png" },
];

function inicializarJuego() {
    const cartasRepetidas = cartasOriginales.concat(cartasOriginales); //duplico las imagenes origiinales
    cartasRepetidas.sort(function() { 
        return Math.random() - 0.5 }); //Mezcla las imagenes de manera aleatoria

        for (let i = 0; i < cartasRepetidas.length; i++) {
            $cartas[i].dataset.id = cartasRepetidas[i].id
          }
        };
          


function cartaSeleccionada(){

}


function manejarEventos(imagenesDestapadas, tablero) {
    tablero.addEventListener('click', (e) => {
        const $carta = e.target;
    
        // Verificamos que el clic ocurrió en una carta
        if ($carta.classList.contains('card-size')) {
          // Destapamos la carta y la añadimos al array de imágenes destapadas
          $carta.classList.add('card-back');
          const cartaId = $carta.dataset.id;
    
          // Obtenemos los datos de la carta (asumiendo que tienes un array "cartas")
          const cartaData = cartas.find(carta => carta.id === cartaId);
          $carta.src = cartaData.src;
    
          // Guardamos la carta en el array de imágenes destapadas
          imagenesDestapadas.push(cartaData);
    
          // Revisamos si hay dos cartas destapadas
          if (imagenesDestapadas.length === 2) {
            verificarPareja(imagenesDestapadas);
            imagenesDestapadas.length = 0; // Reseteamos para la siguiente pareja
          }
        }
      });
    }
}

function manejarEventos(imagenesDestapadas, tablero) {
    tablero.addEventListener("click", (event) => {
        const id = event.target.id;
        if (imagenesDestapadas[id].estaDestapada) {
            return;
        }
        imagenesDestapadas[id].estaDestapada = true;
        tablero.innerHTML = "";
})
}

//cuadros.forEach(function($cuadro){
    //   $cuadro.onclick = function(){
    //     manejarClickCuadro($cuadro);
    //   }
    // });


let aciertos = 0;
let movimientos = 0; 

function sound(src) {
    this.sound = document.createElement("audio"); // Crea un elemento <audio>
    this.sound.src = "sounds/music-viking.mp3"; // Establece la fuente del audio al valor proporcionado (URL del archivo)
    this.sound.setAttribute("preload", "auto"); // Configura el audio para que se cargue automáticamente al cargar la página
    this.sound.style.display = "none"; // Oculta el elemento <audio> en el DOM
    document.body.appendChild(this.sound); // Agrega el elemento <audio> al documento HTML
  
    // Método para reproducir el sonido
    sound.play().catch(function (error) {
      console.error("Error al reproducir el sonido:", error);
    });
};
    
  
    // Método para pausar el sonido
    this.stop = function() {
      this.sound.pause();
    };
  

function mostrarFinDeJuego(resultado){
    mensajeResultado.textContent = resultado; // Actualiza el contenido del h2 con el resultado GANASTE O PERDISTE

    contadorMovimientos.textContent = movimientos; 
    contadorAciertos.textContent = aciertos; 
    contadorTiempo.textContent = tiempo; 

    modal.style.display = "block"; // Muestra el modal
}

$botonReiniciar.addEventListener("click", function() {
    modal.style.display = "none"; // Oculta el modal
    reiniciarJuego(); //LLama a la función que reinicia el juego 
});

    /*
  // Mostrar el modal
function mostrarModal() {
    modal.style.display = 'flex'; // Cambia a flex para centrar
  }
  
  // Cerrar el modal
  function cerrar() {
    modal.style.display = 'none';
  }
  
  // Eventos para cerrar
  cerrarModal.onclick = cerrar;
  spanCerrar.onclick = cerrar;
  
  // Cerrar con clic fuera del modal
  window.onclick = function(event) {
    if (event.target === modal) {
      cerrar();
    }
  };
  */