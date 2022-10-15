import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";


const db = new Dexie("typeDB");

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
    if (typeName === "fairy") {
        return `https://raw.githubusercontent.com/AdrianoEdu/Trabalho-DM122/main/images/type/${typeName}.png`
    }

    return `https://raw.githubusercontent.com/AdrianoEdu/Trabalho-DM122/main/images/type/${typeName}.webp`
}