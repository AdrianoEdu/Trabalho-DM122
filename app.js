import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDB");

db.version(1).stores({
  pokemon: "++id,name",
});

db.on("populate", async () => {

  for (var i = 1; i <= 151; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)))
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
      },
    ]);
  }

  retrieveData();
});

db.open();

function buildUrl(pokeNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`;
}

function buildPokemonUrl(pokeNumber) {
  return `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`
}

function byChar(char) {
  return function (poke) {
    console.log(poke.name);
    return poke.name.includes(char);
  };
}

async function retrieveData() {
  const pokemonList = await db.pokemon
    // .where("name")
    // .startsWithIgnoreCase("c")
    // .filter(byChar("a"))
    .toArray();

  const section = document.querySelector("section");
  const pokeHTML = pokemonList.map(toHTML).join("");
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);

  function toHTML(poke) {
    return `
        <a href="#" class="card-wrapper">
          <div class="card" style="border-color: var(--grass);">
            <div class="card-id" style="color: var(--grass);">${poke.id}</div>
            <div class="card-image">
              <img alt="${poke.name}" src="${URL.createObjectURL(
      poke.picture
    )}">
            </div>
          </div>
          <div class="card-name" style="background-color: var(--grass);">
            ${poke.name}
          </div>
        </a>
    `;
  }
}
retrieveData();

async function getPokemonUrl(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  return response.json();
}

async function downloadImage(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
}

async function saveFormData(event) {
  event.preventDefault();
  const form = event.target;
  await saveOnDatabase({
    name: form.name.value,
    pokeNumber: form.pokeNumber.value,
  });
  retrieveData();
  form.reset();
  form.name.focus();
  return false;
}

async function saveOnDatabase({ name, pokeNumber }) {
  const pokemon = await db.pokemon.where("name").equals(name).toArray();
  if (pokemon.length === 0) {
    await db.pokemon.add({
      name,
      picture: await downloadImage(buildUrl(pokeNumber)),
    });
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", saveFormData);
