import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDB");
const pokeRegion = ["Kanto", "Johto", "Hoen", "Sinnoh", "Unova", "Kalos", "Alola", "Galar"]

db.version(1).stores({
  pokemon: "++id,name",
});

db.on("populate", async () => {

  const section = document.getElementById("kanto");
  section.style.display = "none";

  createSplashScreen();
  await getPokemons(db);

  document.getElementById("splash-screen").style.display = "none";

  await retrieveDataKanto();
});

function createSplashScreen() {
  var splashScreen = createDivsValidatePokedex();

  document.body.appendChild(splashScreen);
}

function createDivsValidatePokedex() {

  var splashScreen = document.getElementById("splash-screen");
  splashScreen.style.display = "flex";

  var divSplashScreen = document.createElement("div");
  divSplashScreen.className = "div-splash-screen";

  var divLoading = document.createElement("div");
  divLoading.className = "div-loading-region"

  var paragraph = document.createElement("p");
  paragraph.innerHTML = "Loading"

  var image = document.createElement("img");
  image.src = "/images/pokeball/pokeball.png"
  image.className = "image-pokeball";

  divLoading.appendChild(paragraph);
  divLoading.appendChild(image);
  divSplashScreen.appendChild(divLoading);
  splashScreen.appendChild(divSplashScreen);

  for (var i = 0; i <= 7; i++) {

    var divRegionPokemon = document.createElement("div")
    divRegionPokemon.className = "div-region-pokemon";

    var paragraph = document.createElement("p")
    paragraph.innerHTML = pokeRegion[i];

    var image = document.createElement("img");
    image.id = "div-" + pokeRegion[i];
    image.src = "/images/validate/false.svg";
    image.className = "image-state";

    divRegionPokemon.appendChild(paragraph);
    divRegionPokemon.appendChild(image);

    splashScreen.appendChild(divRegionPokemon);
  }

  return splashScreen;
}

async function getPokemons(db) {

  for (var i = 1; i <= 905; i++) {
    const pokemon = await (await getPokemonUrl(buildPokemonUrl(i)));
    const pokemonName = await pokemon.name;

    await db.pokemon.bulkPut([
      {
        name: pokemonName,
        picture: await downloadImage(buildUrl(i)),
        pictureShiny: await downloadImage(buildShinyUrl(i)),
        types: pokemon.types,
        generation: getGeneraion(i),
        move: pokemon.moves,
        favorite: false
      },
    ]);

    awaitJsonFinish(i)
  }
}

async function getPokemonUrl(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  return response.json();
}

async function downloadImage(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
}

function awaitJsonFinish(pokemonId) {

  var div = "div-"
  switch (pokemonId) {
    case 151:
      const imageKanto = document.getElementById(div + pokeRegion[0]);
      imageKanto.src = "/images/validate/correct.svg"
      break;
    case 251:
      const imageJohto = document.getElementById(div + pokeRegion[1]);
      imageJohto.src = "/images/validate/correct.svg"
      break;
    case 386:
      const imageHoen = document.getElementById(div + pokeRegion[2]);
      imageHoen.src = "/images/validate/correct.svg"
      break;
    case 493:
      const imageSinnoh = document.getElementById(div + pokeRegion[3]);
      imageSinnoh.src = "/images/validate/correct.svg"
      break;
    case 649:
      const imageUnova = document.getElementById(div + pokeRegion[4]);
      imageUnova.src = "/images/validate/correct.svg"
      break;
    case 721:
      const imageKalos = document.getElementById(div + pokeRegion[5]);
      imageKalos.src = "/images/validate/correct.svg"
      break;
    case 809:
      const imageAlola = document.getElementById(div + pokeRegion[6]);
      imageAlola.src = "/images/validate/correct.svg"
      break;
    case 905:
      const imageGalar = document.getElementById(div + pokeRegion[7]);
      imageGalar.src = "/images/validate/correct.svg"
      break;
  }
}

function getGeneraion(pokeId) {
  if (pokeId <= 151) return 1;
  if (pokeId <= 251) return 2;
  if (pokeId <= 386) return 3;
  if (pokeId <= 493) return 4;
  if (pokeId <= 649) return 5;
  if (pokeId <= 721) return 6;
  if (pokeId <= 809) return 7;
  if (pokeId <= 905) return 8;
}

db.open();

function buildUrl(pokeNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`;
}

function buildShinyUrl(pokeNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokeNumber}.png`;
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
  document.body.appendChild(section)
  getFunctionClickImg(1, 151)
}

async function retrieveDataJohto() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("johto");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 2);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(152, 251)

}

async function retrieveDataHoen() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("hoen");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 3);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(252, 386)
}

async function retrieveDataSinnoh() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("sinnoh");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 4);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(387, 493)
}

async function retrieveDataUnova() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("unova");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 5);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(494, 649)
}

async function retrieveDataKalos() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("kalos");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 6);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(650, 701)
}

async function retrieveDataAlola() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("alola");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 7);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(702, 809)
}

async function retrieveDataGalar() {
  const pokemonList = await db.pokemon.toArray();
  const section = document.getElementById("galar");
  section.style.display = "flex";
  const pokeHTML = selectList(pokemonList, 8);
  section.innerHTML = pokeHTML;
  document.body.appendChild(section);
  getFunctionClickImg(810, 905)
}

function getFunctionClickImg(begin, last) {
  for (var i = begin; begin <= last; i++) {
    var component = document.getElementById(i);
    var componentFavorite = document.getElementById("favorite-pokemon-" + i)

    componentFavorite.addEventListener("click", async function () {
      await addFavoritePokemon(this.id);
    })

    component.addEventListener("click", async function () {
      popup.style.display = "block"
      await getPokemonHabiliy(this.id);
    })


  }
}

async function getPokemonHabiliy(id) {
  const pokemonList = await db.pokemon.toArray();

  var pokemon = await pokemonList.filter(function el(poke) {
    if (poke.id === parseInt(id)) {
      return poke;
    }
  })[0];

  var h2PokeName = document.getElementById("poke-name");
  h2PokeName.innerHTML = pokemon.name.toUpperCase();
  h2PokeName.style.borderRadius = "10px"

  const popup = document.querySelector(".popup");
  popup.style.background = selectGradientFromTypePokemonDOM(pokemon);
  popup.style.borderRadius = "10px"
};

function selectList(pokemonList, id) {
  const pokemon = pokemonList.map((poke) => {
    if (poke.generation === id) {
      return toHTML(poke);
    }
  }).join("");

  return pokemon;
}

retrieveDataKanto();

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

  var pokemonType1 = poke.types[0].type.name;
  var type2 = `<img alt="${poke.name}" src="/images/state/blank.png" width=15px; height = 12px; style="margin-left: 2px">`;

  if (poke.types.length > 1) {
    type2 = `<img alt="${poke.name}" src="${getImageTypePokemon(poke.types[1].type.name)}" width=15px; height = 12px; style="margin-left: 2px">`;
  }

  var innerHtml = `
      <a href="#" class="card-wrapper">
        <div class="card" style="border-color: var(--${pokemonType1});">
        <div class="card-id" style="color: var(--${pokemonType1});">
          <div class="card-type">
            <img alt="${poke.name}" src="${getImageTypePokemon(pokemonType1)}" width=15px; height=12px;  >
            {{img::type2}}
            <p class="id-pokemon">${poke.id}</p>
          </div>
        </div>
        <div class="card-image">
        <img alt="${poke.name}" id="${poke.id}" onmouseover="this.src='${URL.createObjectURL(poke.pictureShiny)}'"  src="${URL.createObjectURL(poke.picture)}"  onmouseout="this.src='${URL.createObjectURL(poke.picture)}'">
          </div>
        </div>
        <div class="card-name" style="${style};">
        ${poke.name}
        <img id="favorite-pokemon-${poke.id}" src="${isFavorite(poke.favorite)}" width=15px height=15px style="background-color:red;">
        </div>
      </a>
  `;

  innerHtml = innerHtml.replace("{{img::type2}}", type2);
  return innerHtml;
}

function getImageTypePokemon(pokeType) {
  if (pokeType === "fairy")
    return `/images/type/${pokeType}.png`;

  return `/images/type/${pokeType}.webp`;
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

function selectGradientFromTypePokemonDOM(poke) {
  var type1 = poke.types[0].type.name;

  if (poke.types.length > 1) {
    var type2 = poke.types[1].type.name;
    return `linear-gradient(var(--${type1}), var(--${type2}))`;
  }
  else {
    return `var(--${type1})`;
  }
}

function isFavorite(favorite) {
  if (favorite)
    return "/images/favorite/favorite.webp";

  return "/images/favorite/no-favorite.png";
}

const select = document.getElementById("regionPokemon");
select.onchange = selectionRegion;

const form = document.querySelector("form");
form.addEventListener("submit", saveFormData);

const popup = document.querySelector(".popup-wrapper");

popup.addEventListener("click", event => {
  const classNameOfClickedElement = event.target.classList[0];
  const classNames = ["popup-close", "popup-wrapper", "popup-link"];

  const shouldClosePopup = classNames.some(className =>
    className === classNameOfClickedElement)

  if (shouldClosePopup) {
    popup.style.display = "none";
  }
})

async function addFavoritePokemon(idComponent) {
  const pokemonList = await db.pokemon.toArray();

  var id = idComponent.split("-")[2];

  var pokemon = await pokemonList.filter(function el(poke) {
    if (poke.id === parseInt(id)) {
      return poke;
    }
  })[0];

  pokemon.favorite = !pokemon.favorite

  var component = document.getElementById(idComponent);
  component.src = isFavorite(pokemon.favorite);

  await db.pokemon.put(pokemon, id)
};

if ('serviceWorker' in navigator) {
  const onsuccess = () => console.log('[Service Worker] Registered');
  const onerror = () => console.log('[Service Worker] Registration failed');

  navigator.serviceWorker
    .register('sw.js')
    .then(onsuccess)
    .catch(onerror);
}