import { ids, nameFix, nameException, typeSwap, typeUni, statsException, statsFix, abilitiesException, abilitiesFix } from './infiniteFusionData.js'

// ====================================================================
// == WEBSITE PROPERTIES ==============================================
// ====================================================================

const maxPoke = 420
const buttonTimeout = 700
const customFusionUrl = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/'
const autogenFusionUrl = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/'

// ====================================================================
// == END OF WEBSITE PROPERTIES =======================================
// ====================================================================

// Classes
class Pokemon {
    id: number
    name: string
    stats: number[]
    types: string[]
    abilities: string[]
    image: string
}

// HTML Elements
const pokemon1_input = document.getElementById('fname1') as HTMLInputElement
const pokemon2_input = document.getElementById('fname2') as HTMLInputElement
const pokemon1_random_btn = document.getElementById('random1') as HTMLInputElement
const pokemon2_random_btn = document.getElementById('random2') as HTMLInputElement
const input_wrapper = document.getElementById('input-wrapper') as HTMLDivElement

const reset_btn = document.getElementById("reset") as HTMLInputElement
const random_btn = document.getElementById("random") as HTMLInputElement
const fuse_btn = document.getElementById("fuse") as HTMLInputElement

const dexnum1_span = document.getElementById("dexnumber1") as HTMLSpanElement
const dexnum2_span = document.getElementById("dexnumber2") as HTMLSpanElement
const fusionid1_span = document.getElementById("fusionid1") as HTMLSpanElement
const fusionid2_span = document.getElementById("fusionid2") as HTMLSpanElement

const fp1_div = document.getElementById("FP1") as HTMLDivElement
const fp2_div = document.getElementById("FP2") as HTMLDivElement

const pic1_img = document.getElementById("pic1") as HTMLImageElement
const pic2_img = document.getElementById("pic2") as HTMLImageElement

const p1 = document.getElementById("p1") as HTMLImageElement
const p2 = document.getElementById("p2") as HTMLImageElement
const p3 = document.getElementById("p3") as HTMLImageElement
const p4 = document.getElementById("p4") as HTMLImageElement

const hp1 = document.getElementById("hp1") as HTMLSpanElement
const atk1 = document.getElementById("atk1") as HTMLSpanElement
const def1 = document.getElementById("def1") as HTMLSpanElement
const spatk1 = document.getElementById("spatk1") as HTMLSpanElement
const spdef1 = document.getElementById("spdef1") as HTMLSpanElement
const spe1 = document.getElementById("spe1") as HTMLSpanElement
const ab1 = document.getElementById("ab1") as HTMLSpanElement
const bs1 = document.getElementById("bs1") as HTMLSpanElement
const hab1 = document.getElementById("hab1") as HTMLSpanElement

const hp2 = document.getElementById("hp2") as HTMLSpanElement
const atk2 = document.getElementById("atk2") as HTMLSpanElement
const def2 = document.getElementById("def2") as HTMLSpanElement
const spatk2 = document.getElementById("spatk2") as HTMLSpanElement
const spdef2 = document.getElementById("spdef2") as HTMLSpanElement
const spe2 = document.getElementById("spe2") as HTMLSpanElement
const ab2 = document.getElementById("ab2") as HTMLSpanElement
const bs2 = document.getElementById("bs2") as HTMLSpanElement
const hab2 = document.getElementById("hab2") as HTMLSpanElement

const weak14 = document.getElementById("weak14") as HTMLSpanElement
const weak12 = document.getElementById("weak12") as HTMLSpanElement
const weak11 = document.getElementById("weak11") as HTMLSpanElement
const weak105 = document.getElementById("weak105") as HTMLSpanElement
const weak1025 = document.getElementById("weak1025") as HTMLSpanElement
const weak100 = document.getElementById("weak100") as HTMLSpanElement

const weak24 = document.getElementById("weak24") as HTMLSpanElement
const weak22 = document.getElementById("weak22") as HTMLSpanElement
const weak21 = document.getElementById("weak21") as HTMLSpanElement
const weak205 = document.getElementById("weak205") as HTMLSpanElement
const weak2025 = document.getElementById("weak2025") as HTMLSpanElement
const weak200 = document.getElementById("weak200") as HTMLSpanElement

// Pokemon Object
const pokemon1 = new Pokemon()
const pokemon2 = new Pokemon()

createDatalist()

// ====================================================================
// == MAIN FUNCTIONS ==================================================
// ====================================================================

function createDatalist() {
    const poke_datalist = document.createElement('datalist') as HTMLDataListElement
    poke_datalist.id = 'dlPkmn'    // Set datalist's ID to dlPkmn

    // Create options to be appended in the datalist
    // TODO: Fix name capitalization
    for (let i = 0; i < ids.length; i++) {
        const option = document.createElement('option') as HTMLOptionElement

        // Fix Nidoran gender
        // Removing this will make fetching PokeAPI for nidoran impossible
        if (ids[i][0] === 'Nidoranf') {
            ids[i][0] = 'nidoran-f'
        } else if (ids[i][0] === 'Nidoranm') {
            ids[i][0] = 'nidoran-m'
        } else {
            ids[i][0] = ids[i][0].toString().toLowerCase()
        }

        // Check if pokemon's name needs to be fixed
        // else create normal option
        if (nameFix.includes(ids[i][0].toString())) {
            option.value = nameException[nameFix.indexOf(ids[i][0].toString())]
        } else {
            const name = ids[i][0].toString()
            option.value = name
        }

        // Append option to datalist
        poke_datalist.appendChild(option)
    }

    input_wrapper.appendChild(poke_datalist)
}

function resetPoke() {
    // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nresetPoke() called!")

    pokemon1_input.value = ""
    pokemon2_input.value = ""

    p1.src = "types/unknown.png"
    p2.src = "types/unknown.png"
    p3.src = "types/unknown.png"
    p4.src = "types/unknown.png"

    p2.style.display = "none"
    p4.style.display = "none"

    pic1_img.src = "question.png"
    pic2_img.src = "question.png"

    dexnum1_span.innerHTML = ""
    dexnum2_span.innerHTML = ""
    fusionid1_span.innerHTML = ""
    fusionid2_span.innerHTML = ""

    fp1_div.innerHTML = "mon1/mon2"
    fp2_div.innerHTML = "mon1/mon2"

    hp1.innerHTML = "HP:"
    atk1.innerHTML = "ATK:"
    def1.innerHTML = "DEF:"
    spatk1.innerHTML = "SPE.ATK:"
    spdef1.innerHTML = "SPE.DEF:"
    spe1.innerHTML = "SPEED:"
    bs1.innerHTML = "TOTAL:"
    ab1.innerHTML = "ABILITY:"
    hab1.innerHTML = ""

    hp2.innerHTML = "HP:"
    atk2.innerHTML = "ATK:"
    def2.innerHTML = "DEF:"
    spatk2.innerHTML = "SPE.ATK:"
    spdef2.innerHTML = "SPE.DEF:"
    spe2.innerHTML = "SPEED:"
    bs2.innerHTML = "TOTAL:"
    ab2.innerHTML = "ABILITY:"
    hab2.innerHTML = ""

    weak14.innerHTML = "x4:"
    weak12.innerHTML = "x2:"
    weak11.innerHTML = "x1:"
    weak105.innerHTML = "x0.5:"
    weak1025.innerHTML = "x0.25:"
    weak100.innerHTML = "x0:"

    weak24.innerHTML = "x4:"
    weak22.innerHTML = "x2:"
    weak21.innerHTML = "x2:"
    weak205.innerHTML = "x0.5:"
    weak2025.innerHTML = "x0.25:"
    weak200.innerHTML = "x0:"

    let L0 = ["hp1", "atk1", "def1", "spatk1", "spdef1", "spe1", "bs1"];
    let L1 = ["hp2", "atk2", "def2", "spatk2", "spdef2", "spe2", "bs2"];

    for (const key in L0) {
        document.getElementById(L0[key]).style.color = "";
        document.getElementById(L1[key]).style.color = "";
    }
}

function randomPoke(should_rand1: boolean, should_rand2: boolean) {
    // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nrandomPoke() called!")
    disableButton()

    if (should_rand1) {
        // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nRandomizing Pokemon 1!")
        const value = getRandomPokeID()
        pokemon1_input.value = fixPokeName(ids[value][0].toString())
    }

    if (should_rand2) {
        // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nRandomizing Pokemon 2!")
        const value = getRandomPokeID()
        pokemon2_input.value = fixPokeName(ids[value][0].toString())
    }

    // Automatically fuse Pokemon
    if (pokemon1_input.value && pokemon2_input.value) {
        fusePoke()
    }

    enableButton()
}

async function fusePoke() {
    // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nfusePoke() called!")
    disableButton()

    const mon1 = pokemon1_input.value
    const mon2 = pokemon2_input.value

    // Check if pokemons exist in the textbox
    if (!pokemon1_input.value || !pokemon2_input.value) {
        alert("Please fill out the text inputs!")
        return
    }

    // Nidoran clause
    if (pokemon1_input.value === 'nidoran' || pokemon2_input.value === 'nidoran') {
        alert("Please specify a gender for Nidoran! (f or m)")
        return
    }

    // Giratina & Deoxy clause
    if (nameException.includes(pokemon1_input.value)) {
        pokemon1_input.value = fixPokeName(pokemon1_input.value)
    }

    if (nameException.includes(pokemon2_input.value)) {
        pokemon2_input.value = fixPokeName(pokemon2_input.value)
    }

    let fetchRes1 = await fetchPokeAPI('https://pokeapi.co/api/v2/pokemon/' + pokemon1_input.value)
    let fetchRes2 = await fetchPokeAPI('https://pokeapi.co/api/v2/pokemon/' + pokemon2_input.value)

    buildPokemonData(fetchRes1, pokemon1_input.value, pokemon1)
    buildPokemonData(fetchRes2, pokemon2_input.value, pokemon2)

    const dexpokemon1_id = Math.floor(pokemon1.id + (maxPoke + pokemon2.id))
    const dexpokemon2_id = Math.floor(pokemon2.id + (maxPoke + pokemon1.id))

    // Dex number of Fusion
    dexnum1_span.innerHTML = dexpokemon1_id.toString()
    dexnum2_span.innerHTML = dexpokemon2_id.toString()
    fusionid1_span.innerHTML = "(" + pokemon1.id + "." + pokemon2.id + ")"
    fusionid2_span.innerHTML = "(" + pokemon2.id + "." + pokemon1.id + ")"

    // Name of fusion
    fp1_div.innerHTML = pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1) + " / " + pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)
    fp2_div.innerHTML = pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1) + " / " + pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)

    // Image of fusion
    const pic1 = `${pokemon1.id}.${pokemon2.id}.png`
    const pic2 = `${pokemon2.id}.${pokemon1.id}.png`

    showFusion(pic1_img, pic1, fusionid1_span, pokemon1.id)
    showFusion(pic2_img, pic2, fusionid2_span, pokemon2.id)

    enableButton()
}

// ====================================================================
// == HELPER FUNCTIONS ================================================
// ====================================================================

async function fetchPokeAPI(url: string) {
    const response = await fetch(url)
        .then((r) => r.json())
        .catch((e) => console.log(e))

    return response
}

function getRandomPokeID(): number {
    return Math.floor(Math.random() * Math.floor(maxPoke))
}

function fixPokeName(name: string): string {
    if (nameFix.includes(name)) {
        name = nameException[nameFix.indexOf(name)]
    }

    else if (nameException.includes(name)) {
        name = nameFix[nameException.indexOf(name)]
    }
    return name
}

function disableButton() {
    // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nButtons temporary disabled!")
    const buttons_coll = document.getElementsByClassName("button") as HTMLCollectionOf<HTMLInputElement>

    for (let i = 0; i < buttons_coll.length; i++) {
        buttons_coll[i].disabled = true
    }
}

function enableButton() {
    // console.log("DEBUG @ " + new Date().toLocaleTimeString() + "\nButtons enabled!")
    const buttons_coll = document.getElementsByClassName("button") as HTMLCollectionOf<HTMLInputElement>

    setTimeout(() => {
        for (let i = 0; i < buttons_coll.length; i++) {
            buttons_coll[i].disabled = false
        }
    }, buttonTimeout)
}

async function showFusion(element: HTMLImageElement, fusionId: string, elementFusionId: HTMLSpanElement, headid: number) {
    let fusionUrl = `${customFusionUrl}/${fusionId}`

    const response = await fetch(fusionUrl)
        .then((r) => r)

    // Fallback URL
    if (response.status === 404) {
        fusionUrl = `${autogenFusionUrl}${headid}/${fusionId}`
    }

    element.alt = fusionId
    element.src = fusionUrl
}

function buildPokemonData(url: any, input_pokemon: string, pokemon: Pokemon) {

    pokemon.id = url.id
    pokemon.name = url.name

    // ========
    // == ID ==

    for (const key in ids) {
        if (input_pokemon === ids[key][0]) {
            pokemon.id = parseInt(ids[key][1].toString())
        }
    }

    // ===========
    // == TYPES ==

    pokemon.types = []
    const type1 = url.types
    let compt = 0

    // Swap types if:
    // Magnemite, Magneton, Magnezone
    // Dewgong, Omanyte, Omastar
    // Scizor
    // Empoleon
    // Fletchinder
    // Spiritomb, Ferrothorn
    // Celebi
    for (const key in typeSwap) {
        if (typeSwap[key][2].toString() === input_pokemon.charAt(0).toUpperCase() + input_pokemon.slice(1)) {
            pokemon.types.push(typeSwap[key][0]);
            pokemon.types.push(typeSwap[key][1]);
            compt = 1;
        }
    }

    // Swap types for single-typed pokemons
    for (const key in typeUni) {
        if (typeUni[key][1] == input_pokemon.charAt(0).toUpperCase() + input_pokemon.slice(1)) {
            pokemon.types.push(typeUni[key][0]);
            compt = 2;
        }
    }

    // Skip if pokemon is one of the above
    if (compt === 0) {
        for (const key in type1) {
            pokemon.types.push(type1[key]['type']['name'])
        }

        if (pokemon.types.includes('normal') && pokemon.types.includes('flying')) {
            pokemon.types = ['flying']
        }
    }

    // ===========
    // == STATS ==

    pokemon.stats = [] // Reset stats
    let stats

    if (statsException.includes(input_pokemon)) {
        statsFix[statsException.indexOf(input_pokemon)]
    } else {
        stats = url.stats
    }

    for (const key in stats) {
        pokemon.stats.push(stats[key]['base_stat'])
    }

    // ===============
    // == ABILITIES ==

    pokemon.abilities = []
    let abilities

    if (abilitiesException.includes(input_pokemon)) {
        abilities = abilitiesFix[abilitiesException.indexOf(input_pokemon)]
    } else {
        abilities = url.abilities
    }

    for (const key in abilities) {
        pokemon.abilities.push(abilities[key]['ability']['name'])
    }
}

// TODO: Figure this one out!!
// function resetPoke() {
//     let L0 = ["hp1", "atk1", "def1", "spatk1", "spdef1", "spe1", "bs1"];
//     let L1 = ["hp2", "atk2", "def2", "spatk2", "spdef2", "spe2", "bs2"];
//     for (let i = 0; i < L0.length; i++) {
//         document.getElementById(L0[i]).style.color = "";
//         document.getElementById(L1[i]).style.color = "";
//     }
// }

// ====================================================================
// == EVENT LISTENERS =================================================
// ====================================================================

// TODO: Change button click to function call!
pokemon1_input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById("button").click();
    }
})

pokemon2_input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById("button").click();
    }
})

pokemon1_random_btn.addEventListener("click", function (event) {
    randomPoke(true, false)
}, false)

pokemon2_random_btn.addEventListener("click", function (event) {
    randomPoke(false, true)
}, false)

random_btn.addEventListener("click", function (event) {
    randomPoke(true, true)
}, false)

reset_btn.addEventListener("click", resetPoke, false)
fuse_btn.addEventListener("click", fusePoke, false)

// // Fusion calculation function
// function fusePoke() {

//     //Pokemon from both text area
//     mon1 = getPokemonName("fname1");
//     mon2 = getPokemonName("fname2");

//     if (isMissingNames(mon1, mon2)) {
//         buttons = document.getElementsByClassName("button");
//         for (let i = 0; i < buttons.length; i++) {
//             buttons[i].disabled = false;
//         };
//         alert("Please fill the two text inputs!");
// return
//     }

//     // TODO : test if poke is in fangame
//     // idCheck

//             // First request - version A
//             let xhr1a = new XMLHttpRequest();
//             let url1a = "https://pokeapi.co/api/v2/pokemon/" + mon1;
//             xhr1a.open('GET', url1a, true);
//             xhr1a.send();
//             xhr1a.onload = function () {
//                 jsonBody = xhr1a.responseText;
//                 if (jsonBody) {
//                     if (jsonBody != "Not Found") {
//                         jp = JSON.parse(jsonBody);
//                         fuseFirstPoke(jp);
//                     }
//                     else {

//                         //First request - version B
//                         let xhr1b = new XMLHttpRequest();
//                         let url1b = "https://pokeapi.co/api/v2/pokemon/" + mon1 + "/";
//                         xhr1b.open('GET', url1b, true);
//                         xhr1b.send();
//                         xhr1b.onload = function () {
//                             jsonBody = xhr1b.responseText;
//                             if (jsonBody) {
//                                 if (jsonBody != "Not Found") {
//                                     jp = JSON.parse(jsonBody);
//                                     fuseFirstPoke(jp);
//                                 }
//                                 else {
//                                     alert("First pokemon was misspelled ?");
//                                 }
//                             }
//                             else {
//                                 alert("PokeAPI is unreachable (1b)");
//                             }
//                         }
//                     }
//                 }
//                 else {
//                     alert("PokeAPI is unreachable (1a)");
//                 }
//             }
//         }
//     }
// }


// function fuseFirstPoke(jsonString) {

//     //ID selector for sprite showcase of the 1st mon/ Validator for 1st mon
//     pokemon1_id = jsonString.id;
//     let id1 = pokemon1_id;
//     let idCheck1 = false;
//
//     for (let i = 0; i < ids.length; i++) {
//         if (ids[i][0] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
//             idCheck1 = true;
//             pokemon1_id = ids[i][1];
//         }
//     }
//     if (idCheck1 == false && id1 >= 252) {
//         alert("The first pokemon isn't in the fangame!")
//     }
//     else {

//         //#region Type of 1st mon
//         //Type selector for fusion type knowledge of the 1st mon
//         let type1 = jsonString.types;
//         mon1types = [];
//         let compt = 0;

//         //Exception mon selected for swapped types
//         for (let i = 0; i < typeSwap.length; i++) {
//             if (typeSwap[i][2] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
//                 mon1types.push(typeSwap[i][0]);
//                 mon1types.push(typeSwap[i][1]);
//                 let compt = 1;
//             }
//         }

//         //Exception mon selected for one type
//         for (let i = 0; i < typeUni.length; i++) {
//             if (typeUni[i][1] == mon1.charAt(0).toUpperCase() + mon1.slice(1)) {
//                 mon1types.push(typeUni[i][0]);
//                 let compt = 2;
//             }
//         }

//         if (compt == 0) {
//             mon1types.push(type1[0].type.name);
//             if (type1.length == 2 && compt != 2) {
//                 if (type1[0].type.name == "normal" && type1[1].type.name == "flying") {
//                     mon1types[0] = "flying";
//                 } else {
//                     mon1types.push(type1[1].type.name);
//                 }
//             }
//         }
//         //#endregion

//         //#region Stats of 1st mon
//         let stats1;
//         if (statsException.includes(mon1)) {
//             stats1 = statsFix[statsException.indexOf(mon1)];
//         } else {
//             stats1 = jsonString.stats;
//         }

//         mon1stats = [];
//         for (let i = 0; i < stats1.length; i++) {
//             mon1stats.push(stats1[i].base_stat);
//         }
//         //#endregion

//         //#region Abilities of 1st mon
//         let ab1;
//         if (abilitiesException.includes(mon1)) {
//             ab1 = abilitiesFix[abilitiesException.indexOf(mon1)];
//         } else {
//             ab1 = jsonString.abilities;
//         }
//         mon1abilities = [];
//         for (let i = 0; i < ab1.length; i++) {
//             mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
//         }
//         //#endregion

//         //#region Request
//         // Second request - version A
//         let xhr2a = new XMLHttpRequest();
//         let url2a = "https://pokeapi.co/api/v2/pokemon/" + mon2;
//         xhr2a.open('GET', url2a, true);
//         xhr2a.send();
//         xhr2a.onload = function () {
//             jsonBody = xhr2a.responseText;
//             if (jsonBody) {
//                 if (jsonBody != "Not Found") {
//                     jp = JSON.parse(jsonBody);
//                     fuseSecondPoke(jp);
//                 }
//                 else {

//                     // Second request - version B
//                     let xhr2b = new XMLHttpRequest();
//                     let url2b = "https://pokeapi.co/api/v2/pokemon/" + mon2 + "/";
//                     xhr2b.open('GET', url2b, true);
//                     xhr2b.send();
//                     xhr2b.onload = function () {
//                         jsonBody = xhr2b.responseText;
//                         if (jsonBody) {
//                             if (jsonBody != "Not Found") {
//                                 jp = JSON.parse(jsonBody);
//                                 fuseSecondPoke(jp);
//                             }
//                             else {
//                                 alert("Second pokemon was misspelled ?");
//                             }
//                         }
//                         else {
//                             alert("PokeAPI is unreachable (2b)");
//                         }
//                     }
//                 }
//             }
//             else {
//                 alert("PokeAPI is unreachable (2a)");
//             }

//         }
//         //#endregion
//     }
// }


// function fuseSecondPoke(jsonString) {

//     //ID selector for sprite showcase of the 2st mon
//     num2 = jsonString.id;
//     let id2 = num2;
//     let idCheck2 = false;
//     for (let i = 0; i < ids.length; i++) {
//         if (ids[i][0] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
//             idCheck2 = true;
//             num2 = ids[i][1];
//         }
//     }
//     if (idCheck2 == false && id2 >= 252) {
//         alert("The second pokemon isn't in the fangame!")
//     }
//     else {

//         //#region Type of 2nd mon
//         //Type selector for fusion type knowledge of the 2nd mon
//         let type2 = jsonString.types;
//         mon2types = [];
//         let compt = 0;

//         //Exception mon selected for swapped types
//         for (let i = 0; i < typeSwap.length; i++) {
//             if (typeSwap[i][2] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
//                 mon2types.push(typeSwap[i][0]);
//                 mon2types.push(typeSwap[i][1]);
//                 let compt = 1;
//             }
//         }

//         //Exception mon selected for one type
//         for (let i = 0; i < typeUni.length; i++) {
//             if (typeUni[i][1] == mon2.charAt(0).toUpperCase() + mon2.slice(1)) {
//                 mon2types.push(typeUni[i][0]);
//                 let compt = 2;
//             }
//         }

//         //Type of 2nd mon
//         if (compt == 0) {
//             mon2types.push(type2[0].type.name);
//             if (type2.length == 2 && compt != 2) {
//                 if (type2[0].type.name == "normal" && type2[1].type.name == "flying") {
//                     mon2types[0] = "flying";
//                 } else {
//                     mon2types.push(type2[1].type.name);
//                 }
//             }
//         }
//         //#endregion

//         //#region Stats of 2nd mon
//         let stats2;
//         if (statsException.includes(mon2)) {
//             stats2 = statsFix[statsException.indexOf(mon2)];
//         } else {
//             stats2 = jsonString.stats;
//         }
//         mon2stats = [];
//         for (let i = 0; i < stats2.length; i++) {
//             mon2stats.push(stats2[i].base_stat);
//         }
//         //#endregion

//         //#region Abilities of 2nd mon
//         let ab2;
//         if (abilitiesException.includes(mon2)) {
//             ab2 = abilitiesFix[abilitiesException.indexOf(mon2)];
//         } else {
//             ab2 = jsonString.abilities;
//         }

//         mon2abilities = [];
//         for (let i = 0; i < ab2.length; i++) {
//             mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
//         }
//         //#endregion

//         fuseBothPoke()

//     }

// }


// function fuseBothPoke() {

//     //TODO : factor this
//     //Name of fusion
//     if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
//         let fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
//         let fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
//     } else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
//         let fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
//         let fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1);
//     } else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
//         let fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1);
//         let fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
//     } else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
//         let fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1);
//         let fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1);
//     }

//     //Name of pictures
//     let pic1 = pokemon1_id + "." + num2 + ".png";
//     let pic2 = num2 + "." + pokemon1_id + ".png";

//     //Stats calculation
//     let hp1 = (mon2stats[0] / 3) + 2 * (mon1stats[0] / 3);
//     let atk1 = 2 * (mon2stats[1] / 3) + (mon1stats[1] / 3);
//     let def1 = 2 * (mon2stats[2] / 3) + (mon1stats[2] / 3);
//     let spatk1 = (mon2stats[3] / 3) + 2 * (mon1stats[3] / 3);
//     let spdef1 = (mon2stats[4] / 3) + 2 * (mon1stats[4] / 3);
//     let spe1 = 2 * (mon2stats[5] / 3) + (mon1stats[5] / 3);
//     let bs1 = Math.floor(hp1) + Math.floor(atk1) + Math.floor(def1) + Math.floor(spatk1) + Math.floor(spdef1) + Math.floor(spe1);

//     let hp2 = (mon1stats[0] / 3) + 2 * (mon2stats[0] / 3);
//     let atk2 = 2 * (mon1stats[1] / 3) + (mon2stats[1] / 3);
//     let def2 = 2 * (mon1stats[2] / 3) + (mon2stats[2] / 3);
//     let spatk2 = (mon1stats[3] / 3) + 2 * (mon2stats[3] / 3);
//     let spdef2 = (mon1stats[4] / 3) + 2 * (mon2stats[4] / 3);
//     let spe2 = 2 * (mon1stats[5] / 3) + (mon2stats[5] / 3);
//     let bs2 = Math.floor(hp2) + Math.floor(atk2) + Math.floor(def2) + Math.floor(spatk2) + Math.floor(spdef2) + Math.floor(spe2);

//     let L0 = ["hp1", "atk1", "def1", "spatk1", "spdef1", "spe1", "bs1"];
//     let L1 = ["hp2", "atk2", "def2", "spatk2", "spdef2", "spe2", "bs2"];
//     let L2 = [Math.floor(hp1), Math.floor(atk1), Math.floor(def1), Math.floor(spatk1), Math.floor(spdef1), Math.floor(spe1), Math.floor(bs1)];
//     let L3 = [Math.floor(hp2), Math.floor(atk2), Math.floor(def2), Math.floor(spatk2), Math.floor(spdef2), Math.floor(spe2), Math.floor(bs2)];
//     let L4 = [];
//     let L5 = [];
//     for (let i = 0; i < L0.length; i++) {
//         L4.push(Math.max(L2[i], L3[i]) - Math.min(L2[i], L3[i]));
//     }

//     //Color of stats
//     for (let i = 0; i < L1.length; i++) {
//         if (L2[i] < L3[i]) {
//             document.getElementById(L0[i]).style.color = "red";
//             document.getElementById(L1[i]).style.color = "green";
//             L5.push(" (+" + L4[i] + ")");
//             L4[i] = " (-" + L4[i] + ")";
//         } else if (L2[i] > L3[i]) {
//             document.getElementById(L1[i]).style.color = "red";
//             document.getElementById(L0[i]).style.color = "green";
//             L5.push(" (-" + L4[i] + ")");
//             L4[i] = " (+" + L4[i] + ")";
//         } else {
//             document.getElementById(L1[i]).style.color = "orange";
//             document.getElementById(L0[i]).style.color = "orange";
//             L4[i] = " (0)";
//             L5.push(" (0)");
//         }
//         document.getElementById(L0[i]).innerHTML = L0[i].slice(-1) + ": " + L2[i];
//         document.getElementById(L1[i]).innerHTML = L1[i].slice(-1) + ": " + L3[i];
//     }

//     //Writting stat in HTML

//     /*
//     if (mon1 == "shedinja" || mon2 == "shedinja") {
//         document.getElementById("hp1").innerHTML = "HP: 1 (0)";
//         document.getElementById("hp1").style.color = "orange";
//     } else {*/
//     document.getElementById("hp1").innerHTML = "HP: " + Math.floor(hp1) + L4[0];
//     /*}*/

//     document.getElementById("atk1").innerHTML = "ATK: " + Math.floor(atk1) + L4[1];
//     document.getElementById("def1").innerHTML = "DEF: " + Math.floor(def1) + L4[2];
//     document.getElementById("spatk1").innerHTML = "SPE.ATK: " + Math.floor(spatk1) + L4[3];
//     document.getElementById("spdef1").innerHTML = "SPE.DEF: " + Math.floor(spdef1) + L4[4];
//     document.getElementById("spe1").innerHTML = "SPEED: " + Math.floor(spe1) + L4[5];
//     document.getElementById("bs1").innerHTML = "TOTAL: " + Math.floor(bs1) + L4[6];

//     /*
//     if (mon1 == "shedinja" || mon2 == "shedinja") {
//         document.getElementById("hp2").innerHTML = "HP: 1 (0)";
//         document.getElementById("hp2").style.color = "orange";
//     } else {*/
//     document.getElementById("hp2").innerHTML = "HP: " + Math.floor(hp2) + L5[0];
//     /*}*/
//     document.getElementById("atk2").innerHTML = "ATK: " + Math.floor(atk2) + L5[1];
//     document.getElementById("def2").innerHTML = "DEF: " + Math.floor(def2) + L5[2];
//     document.getElementById("spatk2").innerHTML = "SPE.ATK: " + Math.floor(spatk2) + L5[3];
//     document.getElementById("spdef2").innerHTML = "SPE.DEF: " + Math.floor(spdef2) + L5[4];
//     document.getElementById("spe2").innerHTML = "SPEED: " + Math.floor(spe2) + L5[5];
//     document.getElementById("bs2").innerHTML = "TOTAL: " + Math.floor(bs2) + L5[6];

//     //Abilities of fused mons
//     if (abilitySwap.includes(mon1)) {
//         [mon1abilities[0], mon1abilities[1]] = [mon1abilities[1], mon1abilities[0]];
//     }
//     if (abilitySwap.includes(mon2)) {
//         [mon2abilities[0], mon2abilities[1]] = [mon2abilities[1], mon2abilities[0]];
//     }

//     //Type of fused mons
//     let fmonres1 = null;
//     let fmonres2 = null;
//     if (mon1 == mon2 && selfFusionTypeException.includes(mon1)) {
//         fmonres1 = selfFusionTypeFix[selfFusionTypeException.indexOf(mon1)];
//         fmonres2 = fmonres1
//     }
//     else {
//         fmonres1 = fusType(mon1types, mon2types);
//         fmonres2 = fusType(mon2types, mon1types);
//     }

//     //Types effectiveness
//     if (typeComp > 0) {
//         c = document.getElementsByClassName('monweak');
//         for (b = 0; b < c.length; b++) {
//             defaultValue = c[b].getAttribute('data-default');
//             if (defaultValue) {
//                 c[b].innerText = defaultValue;
//             }
//         }
//     }

//     tyeffid1 = typeId(fmonres1);
//     tyeffid2 = typeId(fmonres1);

//     for (let i = 0; i < typeName.length; i++) {
//         result1[i] = (types[i][tyeffid1[0]] * types[i][tyeffid1[1]]);
//     }

//     for (let i = 0; i < typeName.length; i++) {
//         let image = new Image()
//         image.src = "types/" + typeName[i] + ".png";

//         if (result1[i] == 4) {
//             document.getElementById("weak14").appendChild(image);
//         }
//         if (result1[i] == 2) {
//             document.getElementById("weak12").appendChild(image);
//         }
//         if (result1[i] == 1) {
//             document.getElementById("weak11").appendChild(image);
//         }
//         if (result1[i] == 0.5) {
//             document.getElementById("weak105").appendChild(image);
//         }
//         if (result1[i] == 0.25) {
//             document.getElementById("weak1025").appendChild(image);
//         }
//         if (result1[i] == 0) {
//             document.getElementById("weak100").appendChild(image);
//         }
//     }

//     tyeffid1 = typeId(fmonres2);
//     tyeffid2 = typeId(fmonres2);

//     for (let i = 0; i < typeName.length; i++) {
//         result2[i] = (types[i][tyeffid1[0]] * types[i][tyeffid1[1]]);
//     }

//     for (let i = 0; i < typeName.length; i++) {
//         let image = new Image();
//         image.src = "types/" + typeName[i] + ".png";

//         if (result2[i] == 4) {
//             document.getElementById("weak24").appendChild(image);
//         }
//         if (result2[i] == 2) {
//             document.getElementById("weak22").appendChild(image);
//         }
//         if (result2[i] == 1) {
//             document.getElementById("weak21").appendChild(image);
//         }
//         if (result2[i] == 0.5) {
//             document.getElementById("weak205").appendChild(image);
//         }
//         if (result2[i] == 0.25) {
//             document.getElementById("weak2025").appendChild(image);
//         }
//         if (result2[i] == 0) {
//             document.getElementById("weak200").appendChild(image);
//         }
//     }

//     typeComp += 1;

//     document.getElementById("p1").src = "types/" + fmonres1[0] + ".png";
//     if (fmonres1.length != 1 && (fmonres1.length == 2 && fmonres1[0] != fmonres1[1])) {
//         document.getElementById("p2").style.display = "inline-block";
//         document.getElementById("p2").src = "types/" + fmonres1[1] + ".png";
//     } else {
//         document.getElementById("p2").style.display = "none";
//     }

//     document.getElementById("p3").src = "types/" + fmonres2[0] + ".png";

//     if (fmonres2.length != 1 && (fmonres2.length == 2 && fmonres2[0] != fmonres2[1])) {
//         document.getElementById("p4").style.display = "inline-block";
//         document.getElementById("p4").src = "types/" + fmonres2[1] + ".png";
//     } else {
//         document.getElementById("p4").style.display = "none";
//     }

//     //Picture of fusions (if inside CustomBattlers)
//     showFusion("pic1", pic1, "fusionid1");
//     showFusion("pic2", pic2, "fusionid2");

//     //Abilities 1
//     let abilities1 = fusionAbilities(mon1abilities, mon2abilities);
//     let hiddenAbilities1 = fusionHiddenAbilities(mon1abilities, mon2abilities, abilities1);
//     let abilitiesText1 = "ABILITY: " + sanitizeAbilityList(abilities1);
//     let hiddenAbilitiesText1 = sanitizeAbilityList(hiddenAbilities1);

//     document.getElementById("ab1").innerHTML = abilitiesText1;
//     document.getElementById("hab1").innerHTML = hiddenAbilitiesText1;

//     //Abilities 2
//     let abilties2 = fusionAbilities(mon2abilities, mon1abilities);
//     let hiddenAbilities2 = fusionHiddenAbilities(mon2abilities, mon1abilities, abilties2);
//     let abilitiesText2 = "ABILITY: " + sanitizeAbilityList(abilties2);
//     let hiddenAbilitiesText2 = sanitizeAbilityList(hiddenAbilities2);

//     document.getElementById("ab2").innerHTML = abilitiesText2;
//     document.getElementById("hab2").innerHTML = hiddenAbilitiesText2;

//     //Fusion done
//     buttons = document.getElementsByClassName("button");
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].disabled = false;
//     };
// }


// function typeId(ftype) {
//     let ty1 = typeName.indexOf(ftype[0]);
//     if (ftype.length == 2) {
//         let ty2 = typeName.indexOf(ftype[1]);
//     } else {
//         let ty2 = 18;
//     }
//     return [ty1, ty2];
// }


// //Custom sprite fusion function
// function showFusion(elementId, fusionId, elementFusionId) {

//     fusionUrl = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + fusionId;
//     document.getElementById(elementId).title = fusionId;

//     if (doesImageExists(fusionUrl)) {
//         document.getElementById(elementId).src = fusionUrl;
//         document.getElementById(elementFusionId).style.color = "green";
//     }
//     else {//Screenshot of autogen pokemon
//         fallbackFusionRepository = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/"
//         headId = fusionId.split(".")[0];
//         fallbackFusionUrl = fallbackFusionRepository + headId + "/" + fusionId;
//         document.getElementById(elementId).src = fallbackFusionUrl;
//         document.getElementById(elementFusionId).style.color = "red";
//     }
// }

// //Error detection
// function doesImageExists(imageUrl) {
//     let http = new XMLHttpRequest();
//     http.open('HEAD', imageUrl, false);

//     // Can't handle error in an easy way
//     http.send();
//     return http.status != 404;
// }

// // Swaps the head with the body and viceversa
// function swapPoke() {
//     let auxId = headId;
//     let auxFname = document.getElementById("fname1").value;

//     headId = bodyId;
//     document.getElementById("fname1").value = document.getElementById("fname2").value;

//     bodyId = auxId;
//     document.getElementById("fname2").value = auxFname;

//     showShinies(false, false);
// }

// // Let's you pick a image from your machine
// $("input[id='pic1']").click(function () {
//     $("input[id='input_file']").click();
// });
// function readURLImage(input) {
//     if (typeof headId !== 'undefined' && typeof bodyId !== 'undefined') {
//         if (input.files && input.files[0]) {
//             let reader = new FileReader();
//             reader.onload = function (e) {
//                 $('#pic1').attr('src', e.target.result);
//                 $('#pic2').attr('src', e.target.result);
//                 document.getElementById("pic2").style.filter
//                     = "hue-rotate(" + calcShinyHue(headId, bodyId, true, false) + "deg)";
//                 $('#pic3').attr('src', e.target.result);
//                 document.getElementById("pic3").style.filter
//                     = "hue-rotate(" + calcShinyHue(headId, bodyId, false, true) + "deg)";
//                 $('#pic4').attr('src', e.target.result);
//                 document.getElementById("pic4").style.filter
//                     = "hue-rotate(" + calcShinyHue(headId, bodyId, true, true) + "deg)";
//             };
//             reader.readAsDataURL(input.files[0]);
//         }
//     } else {
//         alert("Please fill the two text inputs!");
//     }
// }

// // Shows the images for the mon and it's shinies
// function showShinies(randomHead, randomBody) {
//     buttons = document.getElementsByClassName("button");
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].disabled = true;
//     };

//     document.getElementById("input_file").value = ""; // To make the input work everytime, even if the input image has not changed

//     if (randomHead) {
//         headId = getRandomPokeID();
//         let name = ids[headId][0].toLowerCase();
//         if (nameFix.includes(name)) {
//             name = nameException[nameFix.indexOf(name)];
//         }
//         document.getElementById("fname1").value = name;
//     } else {
//         let name = document.getElementById("fname1").value.toLowerCase();
//         if (nameException.includes(name)) {
//             name = nameFix[nameException.indexOf(name)];
//         }
//         for (let i = 0; i < ids.length; i++) {
//             if (name.toUpperCase() == ids[i][0].toUpperCase()) {
//                 headId = i;
//                 break;
//             }
//         }
//     }

//     if (randomBody) {
//         bodyId = getRandomPokeID();
//         let name2 = ids[bodyId][0].toLowerCase();
//         if (nameFix.includes(name2)) {
//             name2 = nameException[nameFix.indexOf(name2)];
//         }
//         document.getElementById("fname2").value = name2;
//     } else {
//         let name2 = document.getElementById("fname2").value.toLowerCase();
//         if (nameException.includes(name2)) {
//             name2 = nameFix[nameException.indexOf(name2)];
//         }
//         for (let i = 0; i < ids.length; i++) {
//             if (name2.toUpperCase() == ids[i][0].toUpperCase()) {
//                 bodyId = i;
//                 break;
//             }
//         }
//     }

//     document.getElementById("dexnumber1").innerHTML = (bodyId + 1) * 420 + headId + 1;
//     document.getElementById("fusionid1").innerHTML = " (" + (headId + 1) + "." + (bodyId + 1) + ")"
//     document.getElementById("fusionid1").style.color = "green";

//     picShinySrc = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + (headId + 1) + "." + (bodyId + 1) + ".png";

//     if (!doesImageExists(picShinySrc)) {
//         picShinySrc = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/" + (headId + 1) + "/" + (headId + 1) + "." + (bodyId + 1) + ".png";
//         document.getElementById("fusionid1").style.color = "red";
//     }

//     document.getElementById("pic1").src = picShinySrc;

//     window.hueShift = [];
//     hueShift[0] = calcShinyHue(headId, bodyId, true, false)
//     let picShiny = document.getElementById("pic2");
//     picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[0]);

//     hueShift[1] = calcShinyHue(headId, bodyId, false, true)
//     picShiny = document.getElementById("pic3");
//     picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[1]);

//     hueShift[2] = calcShinyHue(headId, bodyId, true, true)
//     picShiny = document.getElementById("pic4");
//     picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[2]);

//     buttons = document.getElementsByClassName("button");
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].disabled = false;
//     };
// }

// // Calculates the hue of the shiny and returns it it.
// // This tries to replicate the calculation made in the game itself.
// function calcShinyHue(pokemon1_id, num2, hasShinyHead, hasShinyBody) {
//     let offset = 0;

//     if (hasShinyHead && hasShinyBody && pokemon1_id in shinyColorOffsetsDict && num2 in shinyColorOffsetsDict) {
//         offset = shinyColorOffsetsDict[pokemon1_id] + shinyColorOffsetsDict[num2];
//     } else if (hasShinyHead && pokemon1_id in shinyColorOffsetsDict) {
//         offset = shinyColorOffsetsDict[pokemon1_id]
//     } else if (hasShinyBody && num2 in shinyColorOffsetsDict) {
//         offset = shinyColorOffsetsDict[num2]
//     } else {
//         offset = calcShinyHueDeafult(pokemon1_id, num2, hasShinyHead, hasShinyBody);
//     }

//     return offset;
// }

// // Calculates the hue of the shiny and returns it it.
// // This tries to replicate the calculation made in the game itself.
// function calcShinyHueDeafult(pokemon1_id, num2, hasShinyHead, hasShinyBody) {
//     let dexOffset = pokemon1_id + num2 * 420;
//     let dexDiff = Math.abs(num2 - pokemon1_id);

//     if (hasShinyHead && !hasShinyBody) {
//         dexOffset = pokemon1_id;
//     } else if (!hasShinyHead && hasShinyBody) {
//         dexOffset = dexDiff > 20 ? num2 : num2 + 40
//     }

//     offset = dexOffset + 75;
//     if (offset > 420) offset /= 360;
//     if (offset < 40) offset = 40;
//     if (Math.abs(360 - offset) < 40) offset = 40;

//     return offset;
// }


// function fusionAbilities(headAbilities, bodyAbilities) {
//     let B0 = bodyAbilities[0][0].name;
//     let H1;

//     //If there is only ability, pick that one
//     if (headAbilities.length == 1) {
//         H1 = headAbilities[0][0].name;
//     }

//     //If the second ability is a hidden ability, pick the first ability
//     else if (headAbilities[1][1] == true) {
//         H1 = headAbilities[0][0].name;
//     }
//     //Otherwise, actually take the second ability
//     else {
//         H1 = headAbilities[1][0].name;
//     }

//     return [B0, H1];
// }


// function fusionHiddenAbilities(headAbilities, bodyAbilities, fusionAbilities) {

//     let headAbility, bodyAbility;
//     let allAbilities = [];

//     let maxAbilities = 3;//Pokémons can't have more than 3 abilities
//     for (let a = 0; a < maxAbilities; a++) {
//         if (a < headAbilities.length) {
//             headAbility = ability = headAbilities[a][0].name;
//             allAbilities.push(headAbility);
//         }
//         if (a < bodyAbilities.length) {
//             bodyAbility = bodyAbilities[a][0].name;
//             allAbilities.push(bodyAbility);
//         }
//     }

//     hiddenAbilities = allAbilities.filter(n => !fusionAbilities.includes(n));

//     return hiddenAbilities;
// }


// function removeDuplicates(list) {
//     return Array.from(new Set(list));
// }


// function sanitizeAbilityList(abilityList) {

//     if (abilityList.length == 0) {
//         return abilityList;
//     }

//     abilityList = removeDuplicates(abilityList);

//     let listAb1 = "";
//     for (let i = 0; i < abilityList.length; i++) {
//         listAb1 = listAb1 + abilityList[i].charAt(0).toUpperCase() + abilityList[i].slice(1) + " / ";
//     }
//     listAb1 = listAb1.slice(0, listAb1.length - 1);
//     listAb1 = listAb1.split("-").join(" ")
//     listAb1 = listAb1.split(" ")
//     for (let i = 0, x = listAb1.length; i < x; i++) {
//         listAb1[i] = listAb1[i][0].toUpperCase() + listAb1[i].substr(1);
//     }
//     listAb1 = listAb1.join(" ").slice(0, -2);

//     return listAb1;
// }


// //Ability fusion function
// function fusAb(mon1, mon2) {
//     let fabs = [];
//     let H0 = mon1[0][0].name;
//     if (mon1.length == 3 && mon1[2][1] == true) {
//         let H1 = mon1[1][0].name;
//         let HH = mon1[2][0].name;
//     } else if (mon1.length == 2 && mon1[1][1] == true) {
//         let HH = mon1[1][0].name;
//     } else if (mon1.length == 2 && mon1[1][1] == false) {
//         let H1 = mon1[1][0].name;
//     }
//     let B0 = mon2[0][0].name;
//     if (mon2.length == 3 && mon2[2][1] == true) {
//         let B1 = mon2[1][0].name;
//         let BH = mon2[2][0].name;
//     } else if (mon2.length == 2 && mon2[1][1] == true) {
//         let BH = mon2[1][0].name;
//     } else if (mon1.length == 2 && mon1[1][1] == false) {
//         let B1 = mon2[1][0].name;
//     }
//     //cas H0/null/null + B0/null/null [H0=B0] -> H0/null/null
//     if (mon1.length == 1 && mon2.length == 1 && mon1[0][1] == false && mon2[0][1] == false) {
//         if (H0 == B0) {
//             fabs.push(H0);
//             //cas H0/null/null + B0/null/null [H0#B0] -> H0/B0/null
//         } else if (H0 != B0) {
//             fabs.push(H0);
//             fabs.push(B0);
//         }
//         //cas H0/H1/null + B0/null/null [H0=B0] -> H0/H1/null
//     } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false) {
//         if (H0 == B0) {
//             fabs.push(H0);
//             fabs.push(H1);
//             //cas H0/H1/null + B0/null/null [H0#B0] -> H0/B0/H1
//         } else if (H0 != B0) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(H1);
//         }
//         //cas H0/null/HH + B0/null/null [H0=B0 | HH=B0] -> H0/null/HH
//     } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false) {
//         if (H0 == B0 || HH == B0) {
//             fabs.push(H0);
//             fabs.push(HH);
//             //cas H0/null/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
//         } else if (H0 != B0 && HH != B0) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//         }
//         //cas H0/H1/HH + B0/null/null [H0=B0 | B0=HH] -> H0/H1/HH
//     } else if (mon1.length == 3 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false) {
//         if (H0 == B0 || B0 == HH) {
//             fabs.push(H0);
//             fabs.push(H1);
//             fabs.push(HH);
//             //cas H0/H1/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
//         } else if (H0 != B0 && HH != B0) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//         }
//         //cas H0/null/null + B0/B1/null [H0=B1] -> H0/B0/null
//     } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
//         if (H0 == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             //cas H0/null/null + B0/B1/null [H0=B0] -> H0/B1/null
//         } else if (H0 == B0) {
//             fabs.push(H0);
//             fabs.punch(B1);
//             //cas H0/null/null + B0/B1/null [H0#B0 & H0#B1] -> H0/B1/B0
//         } else if (H0 != B0 && H0 != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(B0);
//         }
//         //cas H0/H1/null + B0/B1/null [H0=B1] -> H0/B0/H1
//     } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
//         if (H0 == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(H1);
//             //cas H0/H1/null + B0/B1/null [H0=B0] -> H0/B1/H1
//         } else if (H0 == B0) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(H1);
//             //cas H0/H1/null + B0/B1/null [H1#B0 & H1#B1] -> H0/B1/H1
//         } else if (H1 != B0 && H1 != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(H1);
//         }
//         //cas H0/null/HH + B0/B01/null [H0=B1 | HH=B1] -> H0/B0/HH
//     } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
//         if (H0 == B1 || HH == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/null/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
//         } else if (H0 != B1 && HH != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(H1);
//         }
//         //cas H0/H1/HH + B0/B1/null [H0=B1 | HH=B1] -> H0/B0/HH
//     } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
//         if (H0 == B1 || HH == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/H1/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
//         } else if (H0 != B1 && HH != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(HH);
//         }
//         //cas H0/null/null + B0/null/BH [H0=BH] -> H0/null/B0
//     } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
//         if (H0 == BH) {
//             fabs.push(H0);
//             fabs.push(B0);
//             //cas H0/null/null + B0/null/BH [H0=B0] -> H0/null/BH
//         } else if (H0 == B0) {
//             fabs.push(H0);
//             fabs.push(BH);
//             //cas H0/null/null + B0/null/BH [H0#B0 & H0#BH] -> H0/B0/BH
//         } else if (H0 != B0 && H0 != BH) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(BH);
//         }
//         //cas H0/H1/null + B0/null/BH [H0=BH] -> H0/B0/H1
//     } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
//         if (H0 == BH) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(H1);
//             //cas H0/H1/null + B0/null/BH [H0=B0] -> H0/BH/H1
//         } else if (H0 == B0) {
//             fabs.push(H0);
//             fabs.push(BH);
//             fabs.push(H1);
//             //cas H0/H1/null + B0/null/BH [H0#BH & H1#BH] -> H0/H1/BH
//         } else if (H0 != BH && H1 != BH) {
//             fabs.push(H0);
//             fabs.push(H1);
//             fabs.push(BH);
//         }
//         //cas H0/null/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
//     } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
//         if (H0 == BH || HH == BH) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/null/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
//         } else if (H0 != BH && HH != BH) {
//             fabs.push(H0);
//             fabs.push(BH);
//             fabs.push(HH);
//         }
//         //cas H0/H1/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
//     } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
//         if (H0 == BH || HH == BH) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/H1/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
//         } else if (H0 != BH && HH != BH) {
//             fabs.push(H0);
//             fabs.push(BH);
//             fabs.push(HH);
//         }
//         //cas H0/null/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
//     } else if (mon1.length == 1 && mon2.length == 3 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
//         if (H0 != B1 && H0 != BH) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(BH);
//             //cas H0/null/null + B0/B1/BH [H0=B1] -> H0/B0/BH
//         } else if (H0 == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(BH);
//             //cas H0/null/null + B0/B1/BH [H0=BH] -> H0/B1/B0
//         } else if (H0 == BH) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(B0);
//         }
//         //cas H0/H1/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
//     } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
//         if (H0 == B1 || H0 == BH) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(BH);
//             //cas H0/H1/null + B0/B1/BH [H0=B1] -> H0/B0/BH
//         } else if (H0 == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(BH);
//             //cas H0/H1/null + B0/B1/BH [H0=BH] -> H0/B1/B0
//         } else if (H0 == BH) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(B0);
//         }
//         //cas H0/null/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
//     } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
//         if (H0 != B1 && HH != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(HH);
//             //cas H0/null/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
//         } else if (H0 == B1 || HH == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/null/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
//         } else if (H0 == B0 || HH == B0) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(HH);
//         }
//         //cas H0/H1/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
//     } else if (mon1.length == 3 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
//         if (H0 != B1 && HH != B1) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(HH);
//             //cas H0/H1/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
//         } else if (H0 == B1 || HH == B1) {
//             fabs.push(H0);
//             fabs.push(B0);
//             fabs.push(HH);
//             //cas H0/H1/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
//         } else if (H0 == B0 || HH == B0) {
//             fabs.push(H0);
//             fabs.push(B1);
//             fabs.push(HH);
//         }
//     }
//     return fabs
// }


// //Type fusion function
// function fusType(mon1, mon2) {
//     let fmon = []

//     //cas H0/null + B0/null [H0#B0] -> H0/B0
//     if (mon1.length == 1 && mon2.length == 1) {
//         if (mon1[0] != mon2[0]) {
//             fmon.push(mon1[0]);
//             fmon.push(mon2[0])

//             //cas H0/null + B0/null [H0=B0] -> H0/null
//         } else {
//             fmon.push(mon1[0]);
//         }
//     } else if (mon1.length == 2 && mon2.length == 1) {

//         //cas H0/H1 + B0/null [H0#B0] -> H0/B0
//         if (mon1[0] != mon2[0]) {
//             fmon.push(mon1[0]);
//             fmon.push(mon2[0]);

//             // Exception:
//             // The body will provide its primary type
//             // instead of the secondary
//             // if the head is already providing that element.

//             //cas H0/H1 + B0/null [H0=B0] -> H0
//         } else {
//             fmon.push(mon1[0]);
//         }
//     } else if (mon1.length == 1 && mon2.length == 2) {

//         //cas H0/null + B0/B1 [H0#B1] -> H0/B1
//         if (mon1[0] != mon2[1]) {
//             fmon.push(mon1[0]);
//             fmon.push(mon2[1]);

//             //cas H0/null + B0/B1 [H0=B1] -> H0/B0
//         } else {
//             fmon.push(mon1[0])
//             fmon.push(mon2[0]);
//         }

//         //cas H0/H1 + B0/B1 [H0=B1] -> H0/B0
//     } else if (mon1.length == 2 && mon2.length == 2) {
//         if (mon1[0] == mon2[1]) {
//             fmon.push(mon1[0]);
//             fmon.push(mon2[0]);

//             //cas H0/H1 + B0/B1 [H0#B1] -> H0/B1
//         } else {
//             fmon.push(mon1[0]);
//             fmon.push(mon2[1]);
//         }
//     }
//     return fmon
// }


// function isMissingNames(mon1, mon2) {
//     return (mon1 == "" || mon1.length == 0 || mon1 == null) || (mon2 == "" || mon2.length == 0 || mon2 == null)
// }
