import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDB");

db.version(1).stores({
  pokemon: "++id,name",
});

db.on("populate", async () => {

  const section = document.getElementById("kanto");
  section.style.display = "none";

  const splashScreen = document.getElementById("splashScreen");

  for (var i = 1; i <= 151; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 1,
      },
    ]);
  }

  const labelKanto = document.getElementById("labelKanto");
  labelKanto.innerHTML += " Deu certo"

  for (var i = 152; i <= 251; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 2,
      }
    ])
  }

  for (var i = 252; i <= 386; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 3,
      }
    ])
  }

  for (var i = 387; i <= 493; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 4,
      }
    ])
  }

  for (var i = 494; i <= 649; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 5,
      }
    ])
  }

  for (var i = 650; i <= 721; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 6,
      }
    ])
  }

  for (var i = 722; i <= 809; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 7,
      }
    ])
  }

  for (var i = 810; i <= 905; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        types: pokemon.types,
        generation: 8,
      }
    ])
  }

  splashScreen.style.display = "none";

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
    return poke.name.includes(char);
  };
}

async function retrieveDataKanto() {
  const pokemonList = await db.pokemon
    // .where("name")
    // .startsWithIgnoreCase("c")
    // .filter(byChar("a"))
    .toArray();

  const section = document.getElementById("kanto");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 1);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataJohto() {
  const pokemonList = await db.pokemon
    // .where("name")
    // .startsWithIgnoreCase("c")
    // .filter(byChar("a"))
    .toArray();

  const section = document.getElementById("johto");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 2);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataHoen() {
  const pokemonList = await db.pokemon.toArray();

  const section = document.getElementById("hoen");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 3);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataSinnoh() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("sinnoh");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 4);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataUnova() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("unova");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 5);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataKalos() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("kalos");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 6);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataAlola() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("alola");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 7);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

async function retrieveDataGalar() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("galar");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 8);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
}

retrieveDataKanto();

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

function toHTML(poke) {
  var style = selectGradientFromTypePokemon(poke);

  return `
      <a href="#" class="card-wrapper">
        <div class="card" style="border-color: var(--${poke.types[0].type.name});">
          <div class="card-id" style="color: var(--${poke.types[0].type.name});">${poke.id}</div>
          <div class="card-image">
            <img alt="${poke.name}" src="${URL.createObjectURL(
    poke.picture
  )}">
          </div>
        </div>
        <div class="card-name" style="${style};">
          ${poke.name}
        </div>
      </a>
  `;
}

function selectList(pokemonList, id) {
  const pokemon = pokemonList.map((poke) => {
    if (poke.generation === id) {
      return toHTML(poke);
    }
  }).join("");

  return pokemon;
}

function selectionRegion() {
  var select = document.getElementById("regionPokemon");
  var selectValue = select.value;

  document.getElementById("kanto").style.display = "none";
  document.getElementById("johto").style.display = "none";
  document.getElementById("hoen").style.display = "none";
  document.getElementById("sinnoh").style.display = "none";
  document.getElementById("unova").style.display = "none";
  document.getElementById("kalos").style.display = "none";
  document.getElementById("alola").style.display = "none";
  document.getElementById("galar").style.display = "none";

  switch (selectValue) {
    case "1":
      retrieveDataKanto();
      break;
    case "2":
      retrieveDataJohto();
      break;
    case "3":
      retrieveDataHoen();
      break;
    case "4":
      retrieveDataSinnoh();
      break;
    case "5":
      retrieveDataUnova();
      break;
    case "6":
      retrieveDataKalos();
      break;
    case "7":
      retrieveDataAlola();
      break;
    case "8":
      retrieveDataGalar();
      break;
  }
}

function selectGradientFromTypePokemon(poke) {
  var type1 = poke.types[0].type.name;

  if (poke.types.length > 1) {
    var type2 = poke.types[1].type.name;
    return `background : linear-gradient(var(--${type1}), var(--${type2}))`;
  }
  else {
    return `background-color: var(--${type1})`;
  }
}

const select = document.getElementById("regionPokemon");
select.onchange = selectionRegion;

const form = document.querySelector("form");
form.addEventListener("submit", saveFormData);