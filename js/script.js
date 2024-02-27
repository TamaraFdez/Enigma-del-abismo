// Generar un número aleatorio entre 1 y 100

let numRandom = Math.floor(Math.random() * 100) + 1;
// Número máximo de intentos permitidos
const intentosMax = 7;

// Iniciar el contador de intentos
let intentos = 0;

// lista de números elegidos por el Usuario
let numerosElegidos = [];

// Guardar variables para usar
const display = document.querySelector("#display");
const displayIntentos = document.querySelector("#intentos");
const start = document.querySelector("#start");
const reboot = document.querySelector("#reboot");

// display.innerHTML = `<p>¡Saludos, intrépido aventurero! En el reino de la adivinación, te invito a revelar el número secreto oculto en las sombras místicas. Elige con sabiduría pues solo tienes ${intentosMax} intentos. ¡Que la magia guíe tu selección! ¿Cuál es tu número mágico entre 1 y 100?</p>`;
function startGame(e) {
  e.preventDefault();
  const numUser = parseInt(document.querySelector("#numero-usuario").value, 10);
  console.log(numUser, numRandom);
  //   numUser = parseInt(numUser, 10);
  if (intentos >= intentosMax) {
    display.innerText = `¡Oh no! Has agotado tus ${intentosMax} intentos. El número mágico era "${numRandom}". Números elegidos: ${numerosElegidos.join(
      ", "
    )}`;
    return;
  }
  // Comprobar si el número del usuario es un número válido entre 1 y 100
  if (isNaN(numUser) || numUser < 1 || numUser > 100) {
    display.innerHTML =
      "<p>Por favor, ingresa un número válido entre 1 y 100. El juego ha terminado.</p>";
    rebootGame();
    numUser.value = "";
  } else {
    for (let i = 0; i < numerosElegidos.length; i++) {
      if (numerosElegidos[i] === numUser) {
        display.innerHTML =
          "<p>Ya has elegido ese número. Intenta con otro.</p>";
        return; // Sale de la función si el número ya fue elegido
      }
    }
    start.value = "Intentar";

    numerosElegidos.push(numUser);
    displayIntentos.innerText = `Estos son los números con los que has intentado: ${numerosElegidos}`;

    if (numUser === numRandom) {
      display.innerHTML = `<p>¡Increíble! Eres un verdadero maestro de la adivinanza. ¡Has descubierto el número mágico "${numRandom}" en ${intentos} intentos!</p>`;
    } else if (numRandom < numUser) {
      // Pedir un número menor
      intentos += 1;
      display.innerHTML = `<p>Interesante elección. Sin embargo, debes mirar más de cerca las runas. El número que buscas es menor. Llevas ${intentos} intentos. Números elegidos: ${numerosElegidos.join(
        ", "
      )}</p>`;
      document.querySelector("#numero-usuario").value = "";
    } else {
      intentos += 1;
      // Pedir un número mayor
      display.innerHTML = `<p>Hmm... El número que buscas está más allá de las sombras. Prueba con un número mayor. Llevas ${intentos} intentos. Números elegidos: ${numerosElegidos.join(
        ", "
      )}</p>`;
      document.querySelector("#numero-usuario").value = "";
    }
  }
}

function rebootGame() {
  intentos = 0;
  display.innerText = "";
  numerosElegidos = [];
  displayIntentos.innerHTML = "";
  document.querySelector("#numero-usuario").value = "";
  numRandom = Math.floor(Math.random() * 100) + 1;
  start.value = "Start";
}
// eventos

start.addEventListener("click", startGame);
reboot.addEventListener("click", rebootGame);
