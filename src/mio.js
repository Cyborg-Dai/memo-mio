function sound(src) {
    this.sound = document.createElement("audio"); // Crea un elemento <audio>
    this.sound.src = "sounds/music-viking.mp3"; // Establece la fuente del audio al valor proporcionado (URL del archivo)
    this.sound.setAttribute("preload", "auto"); // Configura el audio para que se cargue automáticamente al cargar la página
    this.sound.setAttribute("controls", "none"); // Quita los controles de reproducción predeterminados del navegador
    this.sound.style.display = "none"; // Oculta el elemento <audio> en el DOM
    document.body.appendChild(this.sound); // Agrega el elemento <audio> al documento HTML
  
    // Método para reproducir el sonido
    this.play = function() {
      this.sound.play()catch((error) => {
        console.error("El navegador bloqueó la reproducción automática:", error);
    });
};
    };
  
    // Método para pausar el sonido
    this.stop = function() {
      this.sound.pause();
    };
  
  