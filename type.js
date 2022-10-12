import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDb");

db.version(1).stores({
    type: "++id,name",
});

db.on("populate", async () => {

    for (var i = 1; i <= 18; i++) {
        const typePokemon = await (await getTypeUrl(buildTypeUrl(i)))

        await db.type.bulkPut([
            {
                name: typePokemon.name,
                picture: "",
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

