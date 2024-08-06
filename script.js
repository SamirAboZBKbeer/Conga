// Constants
const POKEMON_INTERVAL = 350; // Interval for creating new Pokémon (shorter for more frequent spawning)
const MOVE_DURATION = 1700; // Duration for Pokémon to move across the screen in milliseconds (faster movement)
const BG_COLOR_CHANGE_INTERVAL = 500; // Faster background color change

// References
const background = document.getElementById("background");
const mainCharacter = document.getElementById("main-character");

// Function to generate random colors
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to create random Pokémon
function createRandomPokemon() {
  const pokemon = document.createElement("div");
  pokemon.className = "pokemon";
  pokemon.style.backgroundImage = `url('./flipanim.com-18TsTpLi.gif')`; // Set GIF as the image
  pokemon.style.position = "absolute";
  pokemon.style.width = "150px"; // Adjust size as needed
  pokemon.style.height = "150px"; // Adjust size as needed
  pokemon.style.opacity = "0.5"; // 50% transparency
  pokemon.style.transition = `left ${MOVE_DURATION}ms linear, top ${MOVE_DURATION}ms linear`;

  // Decide start position: either far left or far right
  const startPosition = Math.random() < 0.5 ? "0%" : "100%";
  pokemon.style.left = startPosition;
  pokemon.style.top = `${Math.random() * 100}vh`;

  background.appendChild(pokemon);

  // Ensure immediate removal after the transition
  setTimeout(() => {
    pokemon.style.left = startPosition === "0%" ? "100%" : "0%";
    pokemon.style.top = `${Math.random() * 100}vh`;
  }, 10); // Small delay to start the transition immediately

  // Remove Pokémon after they move
  setTimeout(() => {
    pokemon.remove();
  }, MOVE_DURATION); // Extra time to ensure removal immediately after movement
}

// Function to change background color
function changeBackground() {
  const randomColor = getRandomColor();
  background.style.backgroundColor = randomColor;
}

// Initialize the site
function init() {
  // Change background colors periodically
  setInterval(changeBackground, BG_COLOR_CHANGE_INTERVAL); // Faster background color change

  // Spawn Pokémon periodically
  setInterval(createRandomPokemon, POKEMON_INTERVAL);

  // Set the main character GIF
  mainCharacter.style.backgroundImage = `url('./flipanim.com-18TsTpLi.gif')`; // Use GIF as the image
}

document.addEventListener("click", () => {
  const audio = document.getElementById("background-music");
  if (audio.paused) {
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }
});

init();
