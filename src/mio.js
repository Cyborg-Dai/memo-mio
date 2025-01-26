
let timer; //intervalo para geationar tiempo (cronómetro).  Almacena el intervalo del cronómetro para poder iniciarlo y detenerlo cuando sea necesario.
let tiempo = 0; //tiempo transcurrido o restante 
let aciertos = 0; //pares encontrados correctamente
let movimientos = 0; //número de movimientos realizados por el jugador
let cartasGiradas = 0;


const $tablero = document.querySelector("#tablero");
const $cartas = document.querySelectorAll(".card-back");
const $mensajeFinJuego = document.querySelector(".modal");
const contadorMovimientos = document.querySelector("#contador_movimientos");
const contadorAciertos = document.querySelector("#contador_aciertos");  
const contadorTiempo = document.querySelector("#contador_tiempo");
const $botonReiniciar = document.querySelector(".botonReiniciar");


const cartasOriginales = [
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
            $cartas[i].dataset.id = cartasRepetidas[i].id //Le asigno el dataset id a cada carta con su respectivo id. Dataset es un atributo que se utiliza para almacenar datos personalizados en un elemento HTML. O sea, cuando $carta[0] (del HTML) va a tener un dataset de 0 y eso va a ser igual a cartasRepetidas[0].id (del JS). Dataset.id -> data-id, dataset.nombre -> data-nombre / $cartas[0].dataset.id = cartasRepetidas[0].id; // data-id="101", porque en la posicion 0 el valor de id es 101
            console.log("1");//ver si le puedo agregar el src acá 
            //manejarEventos($tablero);
            girarCartas();
          }
        };

function manejarEventos ($tablero) {  
  $tablero.onclick = function(e) { // cada vez que se haga click en el tablero, se ejecutara la funcion asignada (manejarClickCuadro). Dentro del manjador del evento (function(e)), el parámetro representa el evento que se ha disparado (en este caso, el evento es un click). Es un evento que contiene informacion sobre el click realizado, como donde ocurrio, el emento clicleado etc (e.target)
    const $seleccion = e.target; // //La propiedad e.target se utiliza para identificar el elemento específico que fue clickeado dentro de $tablero.
    if ($seleccion.classList.contains('card-back')) {   //Aquí verificas si el elemento clickeado contiene la clase cuadro. Si es así, entonces se ejecuta la lógica definida dentro del bloque. 
      girarCartas($seleccion); //Si el elemento tiene la clase cuadro, se invoca la función manejarClickCuadro, pasándole el elemento clickeado.
    }
  }
}


function girarCartas(id) { // Debería pasar el cuadro al cual le hacemos click 

  if (temporizador == false) { //Si es la primera vez que se destapa una carta, llama a la funcion que inicia el cronometro
    contadorTiempo();
    temporizador = true; //Cambia el estado del temporizador a true
  }

if (cartasGiradas == 0) { //Si es la primera vez que se destapa una carta
  let card1 = e.currentTarget;
  primeraEleccion = cartasOriginales[id];
  card1.innerHTML = `<img src="src/images/${primeraEleccion}.png">`;
  //clickAucio.play();
  card1.classList.add(non-clickeable) // ver si le cambio el classa a card-back
  cartasGiradas++;
  primerId = id;//Guarda el id de la primera carta

} else if (cartasGiradas == 1) {
  let card2 = document.getElementById(id);
  segundaEleccion = cartasOriginales[id];
  card2.innerHTML = `<img src="src/images/${segundaEleccion}.png">`;
  //clickAucio.play();
  card2.classList.add("non-clickeable") // ver si le cambio el classa a card-back
  cartasGiradas++;
  segundoId = id;//Guarda el id de la segunda carta 
  movimientos++;
  //mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`; //este esta raro, aún no lo defini en mi codigo
  compararCartas();
}


}

function compararCartas() {
  
  if (primeraEleccion.dataset.id == segundaEleccion.dataset.id) {
    //si coinciden, mantenerlas reveladas 
    resetearCartas(true);
  } else {
    // si no coinciden, voltearlas despues de un tiempo 
    setTimeout(() => {
      primeraCarta.src = 'src/images/2-Gigante-de-Hielo.png';
      segundaCarta.src = 'src/images/2-Gigante-de-Hielo.png';
      resetearCartas(false);
    }, 1000);
  }   
}
///////////////////////////////
/*
//chequear
function resetearCartas(correcto) {
  if (!correcto) {
    primeraCarta.classList.remove("revealed");
    segundaCarta.classList.remove("revealed");
  }
  primeraCarta = null;
  segundaCarta = null;
  cartasGiradas = 0;
}
*/
/////////////////////////

function contarTiempo() {
  tiempoRegresivo = setInterval (() => {
    mostrarTiempo.innerHTML = `Tiempo restante: ${tiempo} segundos`;
    timer--;
    if(timer < 0) {
      clearInterval(tiempoRegresivo);
      //bloquearTablero();
      mostrarMensajeFinJuego();
      //loseAudio.play(); 
    }

  }, 1000, timer);
}
              

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
  

  inicializarJuego();


