import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";


const db = new Dexie("typeDB");
const listTypePokemon = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "eletric", "psychic", "ice", "dragon", "dark", "fairy"]

db.version(1).stores({
    type: "++id,name",
});

db.on("populate", async () => {

    for (var i = 1; i <= 18; i++) {
        const typePokemon = await (await getTypeUrl(buildTypeUrl(i)))

        await db.type.bulkPut([
            {
                name: typePokemon.name,
                picture: await loadImageToBlob(typePokemon.name),
            },
        ]);
    }
});

db.open();

async function getTypeUrl(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    return response.json();
}

function buildTypeUrl(typeNumber) {
    return `https://pokeapi.co/api/v2/type/${typeNumber}`
}

async function loadImageToBlob(typeName) {

    const response = await fetch(selectTypeImage(typeName));
    const blob = await response.blob();
    return blob;
}

function selectTypeImage(typeName) {

    switch (typeName) {
        case listTypePokemon[0]:
            console.log("Arroz");
            // case listTypePokemon[1]:
            return "https://archives.bulbagarden.net/media/upload/6/68/Fighting_icon_LA.png";
            break;
        case listTypePokemon[2]:
            return "https://archives.bulbagarden.net/media/upload/b/b5/Flying_icon_SwSh.png";
            break;
        case listTypePokemon[3]:
            return "https://archives.bulbagarden.net/media/upload/8/8d/Poison_icon_SwSh.png";
            break;
        case listTypePokemon[4]:
            return "https://archives.bulbagarden.net/media/upload/2/27/Ground_icon_SwSh.png";
            break;
        case listTypePokemon[5]:
            return "https://archives.bulbagarden.net/media/upload/1/11/Rock_icon_SwSh.png";
            break;
        case listTypePokemon[6]:
            return "https://archives.bulbagarden.net/media/upload/9/9c/Bug_icon_SwSh.png";
            break;
        case listTypePokemon[7]:
            return "https://archives.bulbagarden.net/media/upload/0/01/Ghost_icon_SwSh.png";
            break;
        case listTypePokemon[8]:
            return "https://archives.bulbagarden.net/media/upload/0/09/Steel_icon_SwSh.png";
            break;
        case listTypePokemon[9]:
            return "https://archives.bulbagarden.net/media/upload/a/ab/Fire_icon_SwSh.png";
            break;
        case listTypePokemon[10]:
            return "https://archives.bulbagarden.net/media/upload/8/80/Water_icon_SwSh.png";
            break;
        case listTypePokemon[11]:
            return "https://archives.bulbagarden.net/media/upload/a/a8/Grass_icon_SwSh.png";
            break;
        case listTypePokemon[12]:
            return "https://archives.bulbagarden.net/media/upload/7/7b/Electric_icon_SwSh.png";
            break;
        case listTypePokemon[13]:
            return "https://archives.bulbagarden.net/media/upload/7/73/Psychic_icon_SwSh.png";
            break;
        case listTypePokemon[14]:
            return "https://archives.bulbagarden.net/media/upload/1/15/Ice_icon_SwSh.png";
            break;
        case listTypePokemon[15]:
            return "https://archives.bulbagarden.net/media/upload/2/28/Dragon_icon_LA.png";
            break;
        case listTypePokemon[16]:
            return "https://archives.bulbagarden.net/media/upload/7/7f/Dark_icon_LA.png";
            break;
        case listTypePokemon[17]:
            return "https://archives.bulbagarden.net/media/upload/c/c6/Fairy_icon_SwSh.png";
            break;
    }
}