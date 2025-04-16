const nameSpan = document.getElementById("pokemonName");
const image = document.getElementById("pokemonImage");
const buttons = document.querySelectorAll(".pokemon-button");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

async function buscarPokemon(nome) {
  if (!nome) {
    nameSpan.innerText = "Digite ou selecione um Pokémon!";
    image.style.display = "none";
    return;
  }

  const nomeFormatado = nome.trim().toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeFormatado}`);
    if (!response.ok) throw new Error("Não encontrado");
    const data = await response.json();

    nameSpan.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    image.src = data.sprites.front_default;
    image.alt = `Imagem do Pokémon ${data.name}`;
    image.style.display = "block";
  } catch (error) {
    nameSpan.innerText = "Pokémon não encontrado.";
    image.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  buscarPokemon(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarPokemon(searchInput.value);
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buscarPokemon(button.textContent);
  });
});
