import { ids, nameFix, nameException, types, typeName, typeSwap, typeUni, statsException, statsFix, abilitiesException, abilitiesFix, abilitySwap, selfFusionTypeException, selfFusionTypeFix } from './infiniteFusionData.js';
// LIST OF HELPER FUNCTIONS
// - conlog() : Only logs when is_verbose is true
// - getByID(htmlID) : short version of document.getElementByID()
//                   : returns HTMLElement
// NAMING
// ======
// | functions | camelCase
// | variables | snake_case
// ============================================================================================================
// == WEB PROPERTIES ==========================================================================================
// ============================================================================================================
let is_verbose = true;
const MAX_POKEMON = 420;
const BUTTON_TIMEOUT = 700;
const COLOR_RED = 'lightcoral';
const COLOR_GREEN = 'lightgreen';
const COLOR_ORANGE = 'lemonchiffon';
const ERROR_INPUT_MISSING = 'Please fill out the text inputs!';
const ERROR_NIDORAN_GENDER = "Please specify Nidoran's gender!";
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const CUSTOM_FUSION_URL = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/';
const FALLBACK_FUSION_URL = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/';
// ============================================================================================================
// == END OF WEB PROPERTIES ===================================================================================
// ============================================================================================================
// CLASS
class Pokemon {
    id;
    name;
    stats;
    types;
    abilities;
}
class FusedPokemon {
    id;
    fusion_id;
    name;
    image;
    stats;
    types;
    type_effectiveness;
    abilities;
    hidden_abilities;
}
class FusionHTMLCollection {
    hp;
    atk;
    def;
    spatk;
    spdef;
    spe;
    bs;
    ab;
    hab;
    weakness;
    dexnum;
    fusionID;
    fusname;
    image;
    type;
    constructor(hp, atk, def, spatk, spdef, spe, bs, ab, hab, w4, w2, w1, w05, w025, w0, dexnum, fusionID, fusname, image, type) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spatk = spatk;
        this.spdef = spdef;
        this.spe = spe;
        this.bs = bs;
        this.ab = ab;
        this.hab = hab;
        this.weakness = [w4, w2, w1, w05, w025, w0];
        this.dexnum = dexnum;
        this.fusionID = fusionID;
        this.fusname = fusname;
        this.image = image;
        this.type = type;
    }
}
const pokemon1 = new Pokemon();
const pokemon2 = new Pokemon();
const fused_pokemon1 = new FusedPokemon();
const fused_pokemon2 = new FusedPokemon();
// HTML ELEMENTS
const random1_btn = getByID('random1');
const random2_btn = getByID('random2');
const reset_btn = getByID('reset');
const random_btn = getByID('random');
const fuse_btn = getByID('fuse');
const pkmn1_input = getByID('fname1');
const pkmn2_input = getByID('fname2');
const datalist = getByID('dlPkmn');
const dexnum1_span = getByID('dexnumber1');
const dexnum2_span = getByID('dexnumber2');
const fusionid1_span = getByID('fusionid1');
const fusionid2_span = getByID('fusionid2');
const fp1_div = getByID('FP1');
const fp2_div = getByID('FP2');
const pic1_img = getByID('pic1');
const pic2_img = getByID('pic2');
const hp1_e = getByID('hp1');
const atk1_e = getByID('atk1');
const def1_e = getByID('def1');
const spatk1_e = getByID('spatk1');
const spdef1_e = getByID('spdef1');
const spe1_e = getByID('spe1');
const ab1_e = getByID('ab1');
const bs1_e = getByID('bs1');
const hab1_e = getByID('hab1');
const weak14_e = getByID('weak14');
const weak12_e = getByID('weak12');
const weak11_e = getByID('weak11');
const weak105_e = getByID('weak105');
const weak1025_e = getByID('weak1025');
const weak100_e = getByID('weak100');
const hp2_e = getByID('hp2');
const atk2_e = getByID('atk2');
const def2_e = getByID('def2');
const spatk2_e = getByID('spatk2');
const spdef2_e = getByID('spdef2');
const spe2_e = getByID('spe2');
const ab2_e = getByID('ab2');
const bs2_e = getByID('bs2');
const hab2_e = getByID('hab2');
const weak24_e = getByID('weak24');
const weak22_e = getByID('weak22');
const weak21_e = getByID('weak21');
const weak205_e = getByID('weak205');
const weak2025_e = getByID('weak2025');
const weak200_e = getByID('weak200');
const type1_e = getByID('type1');
const type2_e = getByID('type2');
const fusion_HTMLCollection_1 = new FusionHTMLCollection(hp1_e, atk1_e, def1_e, spatk1_e, spdef1_e, spe1_e, bs1_e, ab1_e, hab1_e, weak14_e, weak12_e, weak11_e, weak105_e, weak1025_e, weak100_e, dexnum1_span, fusionid1_span, fp1_div, pic1_img, type1_e);
const fusion_HTMLCollection_2 = new FusionHTMLCollection(hp2_e, atk2_e, def2_e, spatk2_e, spdef2_e, spe2_e, bs2_e, ab2_e, hab2_e, weak24_e, weak22_e, weak21_e, weak205_e, weak2025_e, weak200_e, dexnum2_span, fusionid2_span, fp2_div, pic2_img, type2_e);
// ============================================================================================================
// == EVENT LISTENERS  ========================================================================================
// ============================================================================================================
random1_btn.addEventListener('click', function () {
    randomPoke(true, false);
}, false);
random2_btn.addEventListener('click', function () {
    randomPoke(false, true);
}, false);
random_btn.addEventListener('click', function () {
    randomPoke(true, true);
});
reset_btn.addEventListener('click', function () {
    resetPoke();
});
fuse_btn.addEventListener('click', function () {
    fusePoke();
});
pkmn1_input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fusePoke();
    }
});
pkmn2_input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fusePoke();
    }
});
// ============================================================================================================
// == END OF EVENT LISTENERS  =================================================================================
// ============================================================================================================
// FIRE FUNCTIONS WHEN DOCUMENT LOADED
createDatalistOptions();
// ============================================================================================================
// == MAIN FUNCTIONS ==========================================================================================
// ============================================================================================================
function createDatalistOptions() {
    for (const key in ids) {
        const option_element = document.createElement('option');
        const pokemon = ids[key][0].toString().toLowerCase();
        if (nameFix.includes(pokemon)) {
            const value = nameException[nameFix.indexOf(pokemon)];
            option_element.value = value;
        }
        else {
            option_element.value = pokemon;
        }
        datalist.appendChild(option_element);
    }
}
function resetPoke() {
    conlog('Resetting data');
    const f1 = fusion_HTMLCollection_1;
    const f2 = fusion_HTMLCollection_2;
    f1.image.src = 'question.png';
    f1.hp.innerHTML = '';
    f1.atk.innerHTML = '';
    f1.def.innerHTML = '';
    f1.spatk.innerHTML = '';
    f1.spdef.innerHTML = '';
    f1.spe.innerHTML = '';
    f1.bs.innerHTML = '';
    f1.ab.innerHTML = '';
    f1.hab.innerHTML = '';
    f1.type.innerHTML = '';
    f1.dexnum.innerHTML = '';
    f1.fusionID.innerHTML = '';
    f1.fusname.innerHTML = '';
    for (const key in f1['weakness']) {
        f1['weakness'][key].innerHTML = '';
    }
    f2.image.src = 'question.png';
    f2.hp.innerHTML = '';
    f2.atk.innerHTML = '';
    f2.def.innerHTML = '';
    f2.spatk.innerHTML = '';
    f2.spdef.innerHTML = '';
    f2.spe.innerHTML = '';
    f2.bs.innerHTML = '';
    f2.ab.innerHTML = '';
    f2.hab.innerHTML = '';
    f2.type.innerHTML = '';
    f2.dexnum.innerHTML = '';
    f2.fusionID.innerHTML = '';
    f2.fusname.innerHTML = '';
    for (const key in f2['weakness']) {
        f2['weakness'][key].innerHTML = '';
    }
}
function randomPoke(should_rand1, should_rand2) {
    conlog('Randomizing Pokemon(s)' + '\nFP => ' + should_rand1 + '\nSP => ' + should_rand2);
    disableButtons();
    console.clear();
    // Randomize first Pokemon
    if (should_rand1) {
        const value = getRandomPokeID();
        pkmn1_input.value = checkPokeName(ids[value][0].toString());
    }
    // Randomize second Pokemon
    if (should_rand2) {
        const value = getRandomPokeID();
        pkmn2_input.value = checkPokeName(ids[value][0].toString());
    }
    if (pkmn1_input.value && pkmn2_input.value) {
        fusePoke();
    }
    enableButtons();
}
async function fusePoke() {
    conlog('Fusing pokemon! ' + pkmn1_input.value + ' \u21cc ' + pkmn2_input.value);
    disableButtons();
    // Check if two text inputs are filled out!
    if (!pkmn1_input.value || !pkmn2_input.value) {
        alert(ERROR_INPUT_MISSING);
        enableButtons();
        return;
    }
    // Nidoran clause
    if (pkmn1_input.value.toLowerCase() === 'nidoran' || pkmn1_input.value.toLowerCase() === 'nidoran') {
        alert(ERROR_NIDORAN_GENDER);
        enableButtons();
        return;
    }
    // Special mon selector: Giratina, Deoxys
    pkmn1_input.value = checkPokeName(pkmn1_input.value);
    pkmn2_input.value = checkPokeName(pkmn2_input.value);
    const pkmn1_response = await fetchPokeAPI(pkmn1_input.value.toLowerCase());
    const pkmn2_response = await fetchPokeAPI(pkmn2_input.value.toLowerCase());
    buildPokemon(pkmn1_response, pkmn1_input.value, pokemon1);
    buildPokemon(pkmn2_response, pkmn2_input.value, pokemon2);
    // buildFusedPokemon(fused_pokemon_OBJECT, first_pokemon_OBJECT, second_pokemon_OBJECT)
    buildFusedPokemon(fused_pokemon1, pokemon1, pokemon2);
    buildFusedPokemon(fused_pokemon2, pokemon2, pokemon1);
    // buildUI(head_pokemon_OBJECT, body_pokemon_OBJECT, HTMLCollection_OBJECT)
    buildUI(fused_pokemon1, fused_pokemon2, fusion_HTMLCollection_1);
    buildUI(fused_pokemon2, fused_pokemon1, fusion_HTMLCollection_2);
    enableButtons();
}
function buildFusedPokemon(fused_pokemon_obj, head_pokemon, body_pokemon) {
    // Build FUSION DEX
    fused_pokemon_obj.id = Math.floor(head_pokemon.id + MAX_POKEMON * body_pokemon.id);
    // Build FUSION ID
    fused_pokemon_obj.fusion_id = head_pokemon.id + '.' + body_pokemon.id;
    // Build FUSION NAME
    fused_pokemon_obj.name = [head_pokemon.name, body_pokemon.name];
    // Build IMAGE NAME
    fused_pokemon_obj.image = fused_pokemon_obj.fusion_id + '.png';
    // prettier-ignore
    const hp = Math.floor((body_pokemon.stats[0] / 3) + 2 * (head_pokemon.stats[0] / 3));
    // prettier-ignore
    const atk = Math.floor(2 * (body_pokemon.stats[1] / 3) + (head_pokemon.stats[1] / 3));
    // prettier-ignore
    const def = Math.floor(2 * (body_pokemon.stats[2] / 3) + (head_pokemon.stats[2] / 3));
    // prettier-ignore
    const spatk = Math.floor((body_pokemon.stats[3] / 3) + 2 * (head_pokemon.stats[3] / 3));
    // prettier-ignore
    const spdef = Math.floor((body_pokemon.stats[4] / 3) + 2 * (head_pokemon.stats[4] / 3));
    // prettier-ignore
    const spe = Math.floor(2 * (body_pokemon.stats[5] / 3) + (head_pokemon.stats[5] / 3));
    const total = hp + atk + def + spatk + spdef + spe;
    // Build STATS
    fused_pokemon_obj.stats = [hp, atk, def, spatk, spdef, spe, total];
    // SWAP HEAD POKEMON'S ABILITIES
    // IF POKEMON EXIST IN ABILITY SWAP
    if (abilitySwap.includes(head_pokemon.name)) {
        const new_arr = [];
        Object.keys(head_pokemon.abilities)
            .reverse()
            .forEach((key) => {
            new_arr.push(head_pokemon.abilities[key]);
        });
        head_pokemon.abilities = new_arr;
    }
    // Build FUSION TYPES
    const fusion_types = [];
    if (head_pokemon.name === body_pokemon.name) {
        if (selfFusionTypeException.includes(head_pokemon.name)) {
            for (const key in selfFusionTypeFix[selfFusionTypeException.indexOf(head_pokemon.name)]) {
                fusion_types.push(selfFusionTypeFix[selfFusionTypeException.indexOf(head_pokemon.name)][key]);
            }
        }
    }
    else {
        const fused_types = fusType(head_pokemon.types, body_pokemon.types);
        for (const key in fused_types) {
            fusion_types.push(fused_types[key]);
        }
    }
    fused_pokemon_obj.types = fusion_types;
    // Build TYPES EFFECTIVENESS
    const type_effective_id = typeId(fusion_types);
    const type_effectiveness_array = [];
    for (const key in typeName) {
        type_effectiveness_array.push(types[key][type_effective_id[0]] * types[key][type_effective_id[1]]);
    }
    fused_pokemon_obj.type_effectiveness = type_effectiveness_array;
    // Build FUSION ABILITIES
    const abilities = fusionAbilities(head_pokemon.abilities, body_pokemon.abilities);
    const hidden_abilities = fusionHiddenAbilities(head_pokemon.abilities, body_pokemon.abilities, abilities);
    // Sanitize abilities
    const fused_abilities = sanitizeAbilityList(abilities);
    const fused_hidden_abilities = sanitizeAbilityList(hidden_abilities);
    fused_pokemon_obj.abilities = fused_abilities;
    fused_pokemon_obj.hidden_abilities = fused_hidden_abilities;
    console.log(fused_pokemon_obj);
}
function buildUI(head_pokemon, body_pokemon, HTMLCollection) {
    HTMLCollection.hp.innerHTML = head_pokemon.stats[0].toString();
    HTMLCollection.atk.innerHTML = head_pokemon.stats[1].toString();
    HTMLCollection.def.innerHTML = head_pokemon.stats[2].toString();
    HTMLCollection.spatk.innerHTML = head_pokemon.stats[3].toString();
    HTMLCollection.spdef.innerHTML = head_pokemon.stats[4].toString();
    HTMLCollection.spe.innerHTML = head_pokemon.stats[5].toString();
    HTMLCollection.bs.innerHTML = head_pokemon.stats[6].toString();
    HTMLCollection.dexnum.innerHTML = head_pokemon.id.toString();
    HTMLCollection.fusionID.innerHTML = head_pokemon.fusion_id.toString();
    // Build Name, Abilities, and Hidden Abilities list
    appendElementToList(head_pokemon.name, HTMLCollection.fusname, 'name-item');
    appendElementToList(head_pokemon.abilities, HTMLCollection.ab, 'ability-item');
    appendElementToList(head_pokemon.hidden_abilities, HTMLCollection.hab, 'ability-item');
    // Build Image source
    appendSrcToImage(head_pokemon.fusion_id, HTMLCollection.image, HTMLCollection.fusionID);
    // Build Types
    appendSrcToType(head_pokemon.types, HTMLCollection.type, 'fusion-type');
    // Build Weakness
    appendSrcToTypeEffectiveness(head_pokemon.type_effectiveness, HTMLCollection.weakness, 'weakness-type');
}
function appendSrcToType(list_array, html_element, class_name) {
    html_element.innerHTML = '';
    for (const key in list_array) {
        const new_img = new Image();
        new_img.className = class_name;
        new_img.src = 'types/' + list_array[key] + '.png';
        html_element.appendChild(new_img);
    }
}
function appendSrcToTypeEffectiveness(list_array, HTMLElements, class_name) {
    for (const key in HTMLElements) {
        HTMLElements[key].innerHTML = '';
    }
    for (const key in typeName) {
        const new_img = new Image();
        new_img.className = class_name;
        new_img.src = 'types/' + typeName[key] + '.png';
        switch (list_array[key]) {
            case 4:
                HTMLElements[0].appendChild(new_img);
                break;
            case 2:
                HTMLElements[1].appendChild(new_img);
                break;
            case 1:
                HTMLElements[2].appendChild(new_img);
                break;
            case 0.5:
                HTMLElements[3].appendChild(new_img);
                break;
            case 0.25:
                HTMLElements[4].appendChild(new_img);
                break;
            case 0:
                HTMLElements[5].appendChild(new_img);
                break;
            default:
                console.log('what???');
                break;
        }
    }
}
async function appendSrcToImage(fusionID, html_element, elementFusionID) {
    const fusion_Url = CUSTOM_FUSION_URL + fusionID + '.png';
    const fallback_Fusion_Url = FALLBACK_FUSION_URL + fusionID.toString().split('.')[0] + '/' + fusionID + '.png';
    const response = await fetch(fusion_Url)
        .then((r) => r)
        .catch((e) => e);
    if (response.ok) {
        html_element.src = fusion_Url;
        elementFusionID.className = 'custom-sprite';
    }
    else {
        html_element.src = fallback_Fusion_Url;
        elementFusionID.className = 'autogen-sprite';
    }
}
// function fuseBothPoke() {
// 	conlog('Fusing Both pokemons!')
// 	// TODO : refactor this
// 	// //Name of fusion
// 	// if (!nameFix.includes(mon1) && !nameFix.includes(mon2)) {
// 	// 	fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1)
// 	// 	fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1)
// 	// } else if (nameFix.includes(mon1) && !nameFix.includes(mon2)) {
// 	// 	fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1)
// 	// 	fmon2 = mon2.charAt(0).toUpperCase() + mon2.slice(1)
// 	// } else if (!nameFix.includes(mon1) && nameFix.includes(mon2)) {
// 	// 	fmon1 = mon1.charAt(0).toUpperCase() + mon1.slice(1)
// 	// 	fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1)
// 	// } else if (nameFix.includes(mon1) && nameFix.includes(mon2)) {
// 	// 	let fmon1 = nameException[nameFix.indexOf(mon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon1)].slice(1)
// 	// 	let fmon2 = nameException[nameFix.indexOf(mon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(mon2)].slice(1)
// 	// }
// 	//Dex Numbers
// 	const dexnum1 = Math.floor(pokemon1.id + MAX_POKEMON * pokemon2.id)
// 	const dexnum2 = Math.floor(pokemon2.id + MAX_POKEMON * pokemon1.id)
// 	// Change DexNumber
// 	dexnum1_span.innerHTML = dexnum1.toString()
// 	dexnum2_span.innerHTML = dexnum2.toString()
// 	fusionid1_span.innerHTML = pokemon1.id + '.' + pokemon2.id
// 	fusionid2_span.innerHTML = pokemon2.id + '.' + pokemon1.id
// 	//Name of fusions
// 	fp1_div.innerHTML = pokemon1.name + ' / ' + pokemon2.name
// 	fp2_div.innerHTML = pokemon2.name + ' / ' + pokemon1.name
// 	//Name of pictures
// 	const pic1 = pokemon1.id + '.' + pokemon2.id + '.png'
// 	const pic2 = pokemon2.id + '.' + pokemon1.id + '.png'
// 	//Stats calculation
// 	const hp1 = pokemon1.stats[0] / 3 + 2 * (pokemon1.stats[0] / 3)
// 	const atk1 = 2 * (pokemon2.stats[1] / 3) + pokemon1.stats[1] / 3
// 	const def1 = 2 * (pokemon2.stats[2] / 3) + pokemon1.stats[2] / 3
// 	const spatk1 = pokemon2.stats[3] / 3 + 2 * (pokemon1.stats[3] / 3)
// 	const spdef1 = pokemon2.stats[4] / 3 + 2 * (pokemon1.stats[4] / 3)
// 	const spe1 = 2 * (pokemon2.stats[5] / 3) + pokemon1.stats[5] / 3
// 	const bs1 = Math.floor(hp1) + Math.floor(atk1) + Math.floor(def1) + Math.floor(spatk1) + Math.floor(spdef1) + Math.floor(spe1)
// 	const hp2 = pokemon1.stats[0] / 3 + 2 * (pokemon2.stats[0] / 3)
// 	const atk2 = 2 * (pokemon1.stats[1] / 3) + pokemon2.stats[1] / 3
// 	const def2 = 2 * (pokemon1.stats[2] / 3) + pokemon2.stats[2] / 3
// 	const spatk2 = pokemon1.stats[3] / 3 + 2 * (pokemon2.stats[3] / 3)
// 	const spdef2 = pokemon1.stats[4] / 3 + 2 * (pokemon2.stats[4] / 3)
// 	const spe2 = 2 * (pokemon1.stats[5] / 3) + pokemon2.stats[5] / 3
// 	const bs2 = Math.floor(hp2) + Math.floor(atk2) + Math.floor(def2) + Math.floor(spatk2) + Math.floor(spdef2) + Math.floor(spe2)
// 	const L0 = ['hp1', 'atk1', 'def1', 'spatk1', 'spdef1', 'spe1', 'bs1']
// 	const L1 = ['hp2', 'atk2', 'def2', 'spatk2', 'spdef2', 'spe2', 'bs2']
// 	const L2 = [Math.floor(hp1), Math.floor(atk1), Math.floor(def1), Math.floor(spatk1), Math.floor(spdef1), Math.floor(spe1), Math.floor(bs1)]
// 	const L3 = [Math.floor(hp2), Math.floor(atk2), Math.floor(def2), Math.floor(spatk2), Math.floor(spdef2), Math.floor(spe2), Math.floor(bs2)]
// 	const L4 = []
// 	const L5 = []
// 	for (const key in L0) {
// 		L4.push(Math.max(L2[key], L3[key]) - Math.min(L2[key], L3[key]))
// 	}
// 	//Color of stats
// 	for (const key in L1) {
// 		if (L2[key] < L3[key]) {
// 			document.getElementById(L0[key]).style.color = COLOR_RED
// 			document.getElementById(L1[key]).style.color = COLOR_GREEN
// 			L5.push(' (+' + L4[key] + ')')
// 			L4[key] = ' (-' + L4[key] + ')'
// 		} else if (L2[key] > L3[key]) {
// 			document.getElementById(L1[key]).style.color = COLOR_RED
// 			document.getElementById(L0[key]).style.color = COLOR_GREEN
// 			L5.push(' (-' + L4[key] + ')')
// 			L4[key] = ' (+' + L4[key] + ')'
// 		} else {
// 			document.getElementById(L1[key]).style.color = COLOR_ORANGE
// 			document.getElementById(L0[key]).style.color = COLOR_ORANGE
// 			L4[key] = ' (0)'
// 			L5.push(' (0)')
// 		}
// 		document.getElementById(L0[key]).innerHTML = L0[key].slice(-1) + ': ' + L2[key]
// 		document.getElementById(L1[key]).innerHTML = L1[key].slice(-1) + ': ' + L3[key]
// 	}
// 	//Writting stat in HTML
// 	hp1_e.innerHTML = Math.floor(hp1) + L4[0]
// 	atk1_e.innerHTML = Math.floor(atk1) + L4[1]
// 	def1_e.innerHTML = Math.floor(def1) + L4[2]
// 	spatk1_e.innerHTML = Math.floor(spatk1) + L4[3]
// 	spdef1_e.innerHTML = Math.floor(spdef1) + L4[4]
// 	spe1_e.innerHTML = Math.floor(spe1) + L4[5]
// 	bs1_e.innerHTML = Math.floor(bs1) + L4[6]
// 	hp2_e.innerHTML = Math.floor(hp2) + L5[0]
// 	atk2_e.innerHTML = Math.floor(atk2) + L5[1]
// 	def2_e.innerHTML = Math.floor(def2) + L5[2]
// 	spatk2_e.innerHTML = Math.floor(spatk2) + L5[3]
// 	spdef2_e.innerHTML = Math.floor(spdef2) + L5[4]
// 	spe2_e.innerHTML = Math.floor(spe2) + L5[5]
// 	bs2_e.innerHTML = Math.floor(bs2) + L5[6]
// 	//Abilities of fused mons
// 	if (abilitySwap.includes(pokemon1.name)) {
// 		;[pokemon1.abilities[0], pokemon1.abilities[1]] = [pokemon1.abilities[1], pokemon1.abilities[0]]
// 	}
// 	if (abilitySwap.includes(pokemon2.name)) {
// 		;[pokemon2.abilities[0], pokemon2.abilities[1]] = [pokemon2.abilities[1], pokemon2.abilities[0]]
// 	}
// 	//Type of fused mons
// 	let fusion_pokemon_result1_types = null
// 	let fusion_pokemon_result2_types = null
// 	if (pokemon1.name === pokemon2.name && selfFusionTypeException.includes(pokemon1.name)) {
// 		fusion_pokemon_result1_types = selfFusionTypeFix[selfFusionTypeException.indexOf(pokemon1.name)]
// 		fusion_pokemon_result2_types = fusion_pokemon_result1_types
// 	} else {
// 		fusion_pokemon_result1_types = fusType(pokemon1.types, pokemon2.types)
// 		fusion_pokemon_result2_types = fusType(pokemon2.types, pokemon1.types)
// 	}
// 	let typeComp = 0
// 	//Types effectiveness
// 	// Reset??????
// 	if (typeComp > 0) {
// 		const pokemon_weakness_collection = document.getElementsByClassName('monweak') as HTMLCollectionOf<HTMLDivElement>
// 		for (const key in pokemon_weakness_collection) {
// 			const defaultValue = pokemon_weakness_collection[key].getAttribute('data-default')
// 			if (defaultValue) {
// 				pokemon_weakness_collection[key].innerText = defaultValue
// 			}
// 		}
// 	}
// 	let type_effective_id1: [number, number] = typeId(fusion_pokemon_result1_types)
// 	const type_effectiveness_array1 = new Array()
// 	for (const key in typeName) {
// 		type_effectiveness_array1[key] = types[key][type_effective_id1[0]] * types[key][type_effective_id1[1]]
// 	}
// 	for (const key in typeName) {
// 		let image = new Image()
// 		image.src = 'types/' + typeName[key] + '.png'
// 		switch (type_effectiveness_array1[key]) {
// 			case 4:
// 				weak14_e.appendChild(image)
// 				break
// 			case 2:
// 				weak12_e.appendChild(image)
// 				break
// 			case 1:
// 				weak11_e.appendChild(image)
// 				break
// 			case 0.5:
// 				weak105_e.appendChild(image)
// 				break
// 			case 0.25:
// 				weak1025_e.appendChild(image)
// 				break
// 			case 0:
// 				weak100_e.appendChild(image)
// 				break
// 			default:
// 				break
// 		}
// 	}
// 	type_effective_id1 = typeId(fusion_pokemon_result2_types)
// 	const type_effectiveness_array2 = new Array()
// 	for (const key in typeName) {
// 		type_effectiveness_array2[key] = types[key][type_effective_id1[0]] * types[key][type_effective_id1[1]]
// 	}
// 	for (const key in typeName) {
// 		let image = new Image()
// 		image.src = 'types/' + typeName[key] + '.png'
// 		switch (type_effectiveness_array2[key]) {
// 			case 4:
// 				weak24_e.appendChild(image)
// 				break
// 			case 2:
// 				weak22_e.appendChild(image)
// 				break
// 			case 1:
// 				weak21_e.appendChild(image)
// 				break
// 			case 0.5:
// 				weak205_e.appendChild(image)
// 				break
// 			case 0.25:
// 				weak2025_e.appendChild(image)
// 				break
// 			case 0:
// 				weak200_e.appendChild(image)
// 				break
// 			default:
// 				break
// 		}
// 	}
// 	typeComp += 1
// 	// Fusion main types
// 	p1.src = 'types/' + fusion_pokemon_result1_types[0] + '.png'
// 	if (fusion_pokemon_result1_types.length != 1 && fusion_pokemon_result1_types.length == 2 && fusion_pokemon_result1_types[0] != fusion_pokemon_result1_types[1]) {
// 		p2.style.display = 'inline-block'
// 		p2.src = 'types/' + fusion_pokemon_result1_types[1] + '.png'
// 	} else {
// 		p2.style.display = 'none'
// 	}
// 	p3.src = 'types/' + fusion_pokemon_result2_types[0] + '.png'
// 	if (fusion_pokemon_result2_types.length != 1 && fusion_pokemon_result2_types.length == 2 && fusion_pokemon_result2_types[0] != fusion_pokemon_result2_types[1]) {
// 		p4.style.display = 'inline-block'
// 		p4.src = 'types/' + fusion_pokemon_result2_types[1] + '.png'
// 	} else {
// 		p4.style.display = 'none'
// 	}
// 	//Picture of fusions (if inside CustomBattlers)
// 	showFusion('pic1', pic1, 'fusionid1')
// 	showFusion('pic2', pic2, 'fusionid2')
// 	//Abilities 1
// 	let abilities1 = fusionAbilities(pokemon1.abilities, pokemon2.abilities)
// 	let hiddenAbilities1 = fusionHiddenAbilities(pokemon1.abilities, pokemon2.abilities, abilities1)
// 	let pokemon1_abilities = sanitizeAbilityList(abilities1)
// 	let pokemon1_hidden_abilities = sanitizeAbilityList(hiddenAbilities1)
// 	appendElementToList(pokemon1_abilities, ab1_e, 'ability-item')
// 	appendElementToList(pokemon1_hidden_abilities, hab1_e, 'ability-item')
// 	//Abilities 2
// 	let abilties2 = fusionAbilities(pokemon2.abilities, pokemon1.abilities)
// 	let hiddenAbilities2 = fusionHiddenAbilities(pokemon2.abilities, pokemon1.abilities, abilties2)
// 	let pokemon2_abilities = sanitizeAbilityList(abilties2)
// 	let hiddenAbilitiesText2 = sanitizeAbilityList(hiddenAbilities2)
// 	appendElementToList(pokemon2_abilities, ab2_e, 'ability-item')
// 	appendElementToList(hiddenAbilitiesText2, hab2_e, 'ability-item')
// }
//Custom sprite fusion function
// async function showFusion(elementId, fusionId, elementFusionId) {
// 	const image = getByID(elementId) as HTMLImageElement
// 	const fusionID = getByID(elementFusionId) as HTMLSpanElement
// 	const fusion_Url = CUSTOM_FUSION_URL + fusionId
// 	const fallback_Fusion_Url = FALLBACK_FUSION_URL + fusionId.split('.')[0] + '/' + fusionId
// 	const response = await fetch(fusion_Url)
// 		.then((r) => r)
// 		.catch((e) => console.log(e))
// 	// @ts-ignore
// 	if (response.ok) {
// 		image.src = fusion_Url
// 		fusionID.style.color = COLOR_GREEN
// 	} else {
// 		image.src = fallback_Fusion_Url
// 		fusionID.style.color = COLOR_RED
// 	}
// }
// Swaps the head with the body and viceversa
// function swapPoke() {
// 	let auxId = headId
// 	let auxFname = document.getElementById('fname1').value
// 	headId = bodyId
// 	document.getElementById('fname1').value = document.getElementById('fname2').value
// 	bodyId = auxId
// 	document.getElementById('fname2').value = auxFname
// 	showShinies(false, false)
// }
// Let's you pick a image from your machine
// $("input[id='pic1']").click(function () {
// 	$("input[id='input_file']").click()
// })
// function readURLImage(input) {
// 	if (typeof headId !== 'undefined' && typeof bodyId !== 'undefined') {
// 		if (input.files && input.files[0]) {
// 			let reader = new FileReader()
// 			reader.onload = function (e) {
// 				$('#pic1').attr('src', e.target.result)
// 				$('#pic2').attr('src', e.target.result)
// 				document.getElementById('pic2').style.filter = 'hue-rotate(' + calcShinyHue(headId, bodyId, true, false) + 'deg)'
// 				$('#pic3').attr('src', e.target.result)
// 				document.getElementById('pic3').style.filter = 'hue-rotate(' + calcShinyHue(headId, bodyId, false, true) + 'deg)'
// 				$('#pic4').attr('src', e.target.result)
// 				document.getElementById('pic4').style.filter = 'hue-rotate(' + calcShinyHue(headId, bodyId, true, true) + 'deg)'
// 			}
// 			reader.readAsDataURL(input.files[0])
// 		}
// 	} else {
// 		alert('Please fill the two text inputs!')
// 	}
// }
// Shows the images for the mon and it's shinies
// function showShinies(randomHead, randomBody) {
// 	buttons = document.getElementsByClassName('button')
// 	for (let i = 0; i < buttons.length; i++) {
// 		buttons[i].disabled = true
// 	}
// 	document.getElementById('input_file').value = '' // To make the input work everytime, even if the input image has not changed
// 	if (randomHead) {
// 		headId = getRandomPokeID()
// 		let name = ids[headId][0].toLowerCase()
// 		if (nameFix.includes(name)) {
// 			name = nameException[nameFix.indexOf(name)]
// 		}
// 		document.getElementById('fname1').value = name
// 	} else {
// 		let name = document.getElementById('fname1').value.toLowerCase()
// 		if (nameException.includes(name)) {
// 			name = nameFix[nameException.indexOf(name)]
// 		}
// 		for (let i = 0; i < ids.length; i++) {
// 			if (name.toUpperCase() == ids[i][0].toUpperCase()) {
// 				headId = i
// 				break
// 			}
// 		}
// 	}
// 	if (randomBody) {
// 		bodyId = getRandomPokeID()
// 		let name2 = ids[bodyId][0].toLowerCase()
// 		if (nameFix.includes(name2)) {
// 			name2 = nameException[nameFix.indexOf(name2)]
// 		}
// 		document.getElementById('fname2').value = name2
// 	} else {
// 		let name2 = document.getElementById('fname2').value.toLowerCase()
// 		if (nameException.includes(name2)) {
// 			name2 = nameFix[nameException.indexOf(name2)]
// 		}
// 		for (let i = 0; i < ids.length; i++) {
// 			if (name2.toUpperCase() == ids[i][0].toUpperCase()) {
// 				bodyId = i
// 				break
// 			}
// 		}
// 	}
// 	document.getElementById('dexnumber1').innerHTML = (bodyId + 1) * 420 + headId + 1
// 	document.getElementById('fusionid1').innerHTML = ' (' + (headId + 1) + '.' + (bodyId + 1) + ')'
// 	document.getElementById('fusionid1').style.color = 'green'
// 	picShinySrc = 'https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/' + (headId + 1) + '.' + (bodyId + 1) + '.png'
// 	if (!doesImageExists(picShinySrc)) {
// 		picShinySrc = 'https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/' + (headId + 1) + '/' + (headId + 1) + '.' + (bodyId + 1) + '.png'
// 		document.getElementById('fusionid1').style.color = 'red'
// 	}
// 	document.getElementById('pic1').src = picShinySrc
// 	window.hueShift = []
// 	hueShift[0] = calcShinyHue(headId, bodyId, true, false)
// 	let picShiny = document.getElementById('pic2')
// 	picShiny.title = picShiny.alt = 'Hue shift ' + Math.trunc(hueShift[0])
// 	hueShift[1] = calcShinyHue(headId, bodyId, false, true)
// 	picShiny = document.getElementById('pic3')
// 	picShiny.title = picShiny.alt = 'Hue shift ' + Math.trunc(hueShift[1])
// 	hueShift[2] = calcShinyHue(headId, bodyId, true, true)
// 	picShiny = document.getElementById('pic4')
// 	picShiny.title = picShiny.alt = 'Hue shift ' + Math.trunc(hueShift[2])
// 	buttons = document.getElementsByClassName('button')
// 	for (let i = 0; i < buttons.length; i++) {
// 		buttons[i].disabled = false
// 	}
// }
// Calculates the hue of the shiny and returns it it.
// This tries to replicate the calculation made in the game itself.
// function calcShinyHue(num1, num2, hasShinyHead, hasShinyBody) {
// 	let offset = 0
// 	if (hasShinyHead && hasShinyBody && num1 in shinyColorOffsetsDict && num2 in shinyColorOffsetsDict) {
// 		offset = shinyColorOffsetsDict[num1] + shinyColorOffsetsDict[num2]
// 	} else if (hasShinyHead && num1 in shinyColorOffsetsDict) {
// 		offset = shinyColorOffsetsDict[num1]
// 	} else if (hasShinyBody && num2 in shinyColorOffsetsDict) {
// 		offset = shinyColorOffsetsDict[num2]
// 	} else {
// 		offset = calcShinyHueDeafult(num1, num2, hasShinyHead, hasShinyBody)
// 	}
// 	return offset
// }
// Calculates the hue of the shiny and returns it it.
// This tries to replicate the calculation made in the game itself.
// function calcShinyHueDeafult(num1, num2, hasShinyHead, hasShinyBody) {
// 	let dexOffset = num1 + num2 * 420
// 	let dexDiff = Math.abs(num2 - num1)
// 	if (hasShinyHead && !hasShinyBody) {
// 		dexOffset = num1
// 	} else if (!hasShinyHead && hasShinyBody) {
// 		dexOffset = dexDiff > 20 ? num2 : num2 + 40
// 	}
// 	offset = dexOffset + 75
// 	if (offset > 420) offset /= 360
// 	if (offset < 40) offset = 40
// 	if (Math.abs(360 - offset) < 40) offset = 40
// 	return offset
// }
//Ability fusion function
// function fusAb(pokemon1, pokemon2) {
// 	let fusion_abilities = []
// 	let H0 = pokemon1[0][0].name
// 	if (pokemon1.length == 3 && pokemon1[2][1] == true) {
// 		let H1 = pokemon1[1][0].name
// 		let HH = pokemon1[2][0].name
// 	} else if (pokemon1.length == 2 && pokemon1[1][1] == true) {
// 		let HH = pokemon1[1][0].name
// 	} else if (pokemon1.length == 2 && pokemon1[1][1] == false) {
// 		let H1 = pokemon1[1][0].name
// 	}
// 	let B0 = pokemon2[0][0].name
// 	if (pokemon2.length == 3 && pokemon2[2][1] == true) {
// 		let B1 = pokemon2[1][0].name
// 		let BH = pokemon2[2][0].name
// 	} else if (pokemon2.length == 2 && pokemon2[1][1] == true) {
// 		let BH = pokemon2[1][0].name
// 	} else if (pokemon1.length == 2 && pokemon1[1][1] == false) {
// 		let B1 = pokemon2[1][0].name
// 	}
// 	//cas H0/null/null + B0/null/null [H0=B0] -> H0/null/null
// 	if (pokemon1.length == 1 && pokemon2.length == 1 && pokemon1[0][1] == false && pokemon2[0][1] == false) {
// 		if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			//cas H0/null/null + B0/null/null [H0#B0] -> H0/B0/null
// 		} else if (H0 != B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 		}
// 		//cas H0/H1/null + B0/null/null [H0=B0] -> H0/H1/null
// 	} else if (pokemon1.length == 2 && pokemon2.length == 1 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon2[0][1] == false) {
// 		if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(H1)
// 			//cas H0/H1/null + B0/null/null [H0#B0] -> H0/B0/H1
// 		} else if (H0 != B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(H1)
// 		}
// 		//cas H0/null/HH + B0/null/null [H0=B0 | HH=B0] -> H0/null/HH
// 	} else if (pokemon1.length == 2 && pokemon2.length == 1 && pokemon1[0][1] == false && pokemon1[1][1] == true && pokemon2[0][1] == false) {
// 		if (H0 == B0 || HH == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(HH)
// 			//cas H0/null/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
// 		} else if (H0 != B0 && HH != B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/H1/HH + B0/null/null [H0=B0 | B0=HH] -> H0/H1/HH
// 	} else if (pokemon1.length == 3 && pokemon2.length == 1 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon1[2][1] == true && pokemon2[0][1] == false) {
// 		if (H0 == B0 || B0 == HH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(H1)
// 			fusion_abilities.push(HH)
// 			//cas H0/H1/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
// 		} else if (H0 != B0 && HH != B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/null/null + B0/B1/null [H0=B1] -> H0/B0/null
// 	} else if (pokemon1.length == 1 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == false) {
// 		if (H0 == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			//cas H0/null/null + B0/B1/null [H0=B0] -> H0/B1/null
// 		} else if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			//cas H0/null/null + B0/B1/null [H0#B0 & H0#B1] -> H0/B1/B0
// 		} else if (H0 != B0 && H0 != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(B0)
// 		}
// 		//cas H0/H1/null + B0/B1/null [H0=B1] -> H0/B0/H1
// 	} else if (pokemon1.length == 2 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == false) {
// 		if (H0 == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(H1)
// 			//cas H0/H1/null + B0/B1/null [H0=B0] -> H0/B1/H1
// 		} else if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(H1)
// 			//cas H0/H1/null + B0/B1/null [H1#B0 & H1#B1] -> H0/B1/H1
// 		} else if (H1 != B0 && H1 != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(H1)
// 		}
// 		//cas H0/null/HH + B0/B01/null [H0=B1 | HH=B1] -> H0/B0/HH
// 	} else if (pokemon1.length == 2 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == false) {
// 		if (H0 == B1 || HH == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/null/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
// 		} else if (H0 != B1 && HH != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(H1)
// 		}
// 		//cas H0/H1/HH + B0/B1/null [H0=B1 | HH=B1] -> H0/B0/HH
// 	} else if (pokemon1.length == 3 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon1[2][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == false) {
// 		if (H0 == B1 || HH == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/H1/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
// 		} else if (H0 != B1 && HH != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/null/null + B0/null/BH [H0=BH] -> H0/null/B0
// 	} else if (pokemon1.length == 1 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == true) {
// 		if (H0 == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			//cas H0/null/null + B0/null/BH [H0=B0] -> H0/null/BH
// 		} else if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(BH)
// 			//cas H0/null/null + B0/null/BH [H0#B0 & H0#BH] -> H0/B0/BH
// 		} else if (H0 != B0 && H0 != BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(BH)
// 		}
// 		//cas H0/H1/null + B0/null/BH [H0=BH] -> H0/B0/H1
// 	} else if (pokemon1.length == 2 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == true) {
// 		if (H0 == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(H1)
// 			//cas H0/H1/null + B0/null/BH [H0=B0] -> H0/BH/H1
// 		} else if (H0 == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(BH)
// 			fusion_abilities.push(H1)
// 			//cas H0/H1/null + B0/null/BH [H0#BH & H1#BH] -> H0/H1/BH
// 		} else if (H0 != BH && H1 != BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(H1)
// 			fusion_abilities.push(BH)
// 		}
// 		//cas H0/null/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
// 	} else if (pokemon1.length == 2 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == true) {
// 		if (H0 == BH || HH == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/null/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
// 		} else if (H0 != BH && HH != BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(BH)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/H1/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
// 	} else if (pokemon1.length == 3 && pokemon2.length == 2 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon1[2][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == true) {
// 		if (H0 == BH || HH == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/H1/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
// 		} else if (H0 != BH && HH != BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(BH)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/null/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
// 	} else if (pokemon1.length == 1 && pokemon2.length == 3 && pokemon1[0][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == false && pokemon2[2][1] == true) {
// 		if (H0 != B1 && H0 != BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(BH)
// 			//cas H0/null/null + B0/B1/BH [H0=B1] -> H0/B0/BH
// 		} else if (H0 == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(BH)
// 			//cas H0/null/null + B0/B1/BH [H0=BH] -> H0/B1/B0
// 		} else if (H0 == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(B0)
// 		}
// 		//cas H0/H1/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
// 	} else if (pokemon1.length == 2 && pokemon2.length == 3 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon2[0][1] == false && pokemon2[1][1] == false && pokemon2[2][1] == true) {
// 		if (H0 == B1 || H0 == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(BH)
// 			//cas H0/H1/null + B0/B1/BH [H0=B1] -> H0/B0/BH
// 		} else if (H0 == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(BH)
// 			//cas H0/H1/null + B0/B1/BH [H0=BH] -> H0/B1/B0
// 		} else if (H0 == BH) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(B0)
// 		}
// 		//cas H0/null/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
// 	} else if (pokemon1.length == 2 && pokemon2.length == 3 && pokemon1[0][1] == false && pokemon1[1][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == false && pokemon2[2][1] == true) {
// 		if (H0 != B1 && HH != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(HH)
// 			//cas H0/null/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
// 		} else if (H0 == B1 || HH == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/null/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
// 		} else if (H0 == B0 || HH == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(HH)
// 		}
// 		//cas H0/H1/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
// 	} else if (pokemon1.length == 3 && pokemon2.length == 3 && pokemon1[0][1] == false && pokemon1[1][1] == false && pokemon1[2][1] == true && pokemon2[0][1] == false && pokemon2[1][1] == false && pokemon2[2][1] == true) {
// 		if (H0 != B1 && HH != B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(HH)
// 			//cas H0/H1/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
// 		} else if (H0 == B1 || HH == B1) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B0)
// 			fusion_abilities.push(HH)
// 			//cas H0/H1/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
// 		} else if (H0 == B0 || HH == B0) {
// 			fusion_abilities.push(H0)
// 			fusion_abilities.push(B1)
// 			fusion_abilities.push(HH)
// 		}
// 	}
// 	return fusion_abilities
// }
//Type fusion function
// function isMissingNames(mon1, mon2) {
// 	return mon1 == '' || mon1.length == 0 || mon1 == null || mon2 == '' || mon2.length == 0 || mon2 == null
// }
// function getPokemonName(htmlId) {
// 	let pokemonName = (document.getElementById(htmlId) as HTMLInputElement).value.toLowerCase()
// 	pokemonName = pokemonName.replace(/\W/g, '')
// 	return pokemonName
// }
// ============================================================================================================
// == HELPER FUNCTIONS ========================================================================================
// ============================================================================================================
function conlog(msg) {
    if (is_verbose) {
        let color = (function lol(m, s, c) {
            return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
        })(Math, '789ABCDEF', 4);
        console.log('%c[ DEBUG @ ' + new Date().toLocaleTimeString() + ' ]\n' + msg, 'color: #' + color);
    }
}
function getByID(htmlId) {
    return document.getElementById(htmlId);
}
function getCollByTag(htmlTag) {
    return document.getElementsByTagName(htmlTag);
}
function getRandomPokeID() {
    return Math.floor(Math.random() * Math.floor(MAX_POKEMON));
}
function disableButtons() {
    const buttons_collection = getCollByTag('button');
    for (let i = 0; i < buttons_collection.length; i++) {
        buttons_collection[i].disabled = true;
    }
}
function enableButtons() {
    const buttons_collection = getCollByTag('button');
    for (let i = 0; i < buttons_collection.length; i++) {
        buttons_collection[i].disabled = false;
    }
}
function checkPokeName(name) {
    if (nameFix.includes(name)) {
        name = nameException[nameFix.indexOf(name)];
    }
    else if (nameException.includes(name)) {
        name = nameFix[nameException.indexOf(name)];
    }
    return name.toLowerCase();
}
async function fetchPokeAPI(name) {
    const response = await fetch(POKEAPI_URL + name)
        .then((r) => r.json())
        .catch((e) => console.log(e));
    return response;
}
function buildPokemon(response, pokemon_name, pokemon_obj) {
    // ID CHECK
    let is_valid_id = false;
    pokemon_obj.name = response.name;
    for (const key in ids) {
        if (ids[key][0].toString().toLowerCase() === pokemon_name) {
            is_valid_id = true;
            pokemon_obj.id = ids[key][1];
        }
    }
    if (!is_valid_id) {
        alert('INVALID POKEMON ID');
        enableButtons();
        return;
    }
    // TYPES
    const types = [];
    let compt = 0;
    for (const key in typeSwap) {
        if (typeSwap[key][2].toLowerCase() === pokemon_name) {
            types.push(typeSwap[key][0]);
        }
    }
    for (const key in typeUni) {
        if (typeUni[key][1].toLowerCase() === pokemon_name) {
            types.push(typeUni[key][0]);
        }
    }
    for (const key in response['types']) {
        // Prevent type duplication
        if (!types.includes(response['types'][key]['type']['name'])) {
            types.push(response['types'][key]['type']['name']);
        }
    }
    pokemon_obj.types = types;
    // STATS
    const stats = [];
    // CHECK IF POKEMON IS IN THE STATS EXCEPTION LIST
    if (statsException.includes(pokemon_name)) {
        const value = statsFix[statsException.indexOf(pokemon_name)];
        for (const key in value) {
            stats.push(value[key]['base_stat']);
        }
    }
    else {
        for (const key in response['stats']) {
            stats.push(response['stats'][key]['base_stat']);
        }
    }
    pokemon_obj.stats = stats;
    const abilities = [];
    if (abilitiesException.includes(pokemon_name)) {
        const value = abilitiesFix[abilitiesException.indexOf(pokemon_name)];
        for (const key in value) {
            abilities.push(value[key]);
        }
    }
    else {
        for (const key in response['abilities']) {
            abilities.push(response['abilities'][key]);
        }
    }
    pokemon_obj.abilities = abilities;
}
function fusType(pokemon1, pokemon2) {
    let fusion_pokemon = [];
    //cas H0/null + B0/null [H0#B0] -> H0/B0
    if (pokemon1.length == 1 && pokemon2.length == 1) {
        if (pokemon1[0] != pokemon2[0]) {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[0]);
            //cas H0/null + B0/null [H0=B0] -> H0/null
        }
        else {
            fusion_pokemon.push(pokemon1[0]);
        }
    }
    else if (pokemon1.length == 2 && pokemon2.length == 1) {
        //cas H0/H1 + B0/null [H0#B0] -> H0/B0
        if (pokemon1[0] != pokemon2[0]) {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[0]);
            // Exception:
            // The body will provide its primary type
            // instead of the secondary
            // if the head is already providing that element.
            //cas H0/H1 + B0/null [H0=B0] -> H0
        }
        else {
            fusion_pokemon.push(pokemon1[0]);
        }
    }
    else if (pokemon1.length == 1 && pokemon2.length == 2) {
        //cas H0/null + B0/B1 [H0#B1] -> H0/B1
        if (pokemon1[0] != pokemon2[1]) {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[1]);
            //cas H0/null + B0/B1 [H0=B1] -> H0/B0
        }
        else {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[0]);
        }
        //cas H0/H1 + B0/B1 [H0=B1] -> H0/B0
    }
    else if (pokemon1.length == 2 && pokemon2.length == 2) {
        if (pokemon1[0] == pokemon2[1]) {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[0]);
            //cas H0/H1 + B0/B1 [H0#B1] -> H0/B1
        }
        else {
            fusion_pokemon.push(pokemon1[0]);
            fusion_pokemon.push(pokemon2[1]);
        }
    }
    return fusion_pokemon;
}
function typeId(fusion_type) {
    let type1 = typeName.indexOf(fusion_type[0]);
    let type2;
    if (fusion_type.length == 2) {
        type2 = typeName.indexOf(fusion_type[1]);
    }
    else {
        type2 = 18;
    }
    return [type1, type2];
}
function upperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}
function appendElementToList(list_array, html_element, class_name) {
    // Reset HTML Element's inner HTML
    html_element.innerHTML = '';
    for (const key in list_array) {
        const created_span = document.createElement('span');
        created_span.className = class_name;
        created_span.innerHTML = list_array[key];
        html_element.appendChild(created_span);
    }
}
function removeDuplicates(list) {
    return Array.from(new Set(list));
}
function fusionAbilities(pokemon_head_abilities, pokemon_body_abilities) {
    let rebuilt_body_abilities = pokemon_body_abilities[0]['ability']['name'];
    let rebuilt_head_abilities;
    //If there is only one ability, pick that one
    if (pokemon_head_abilities.length === 1) {
        rebuilt_head_abilities = pokemon_head_abilities[0]['ability']['name'];
    }
    // If the second ability is a hidden ability, pick the first ability
    else if (pokemon_head_abilities[1][1] == true) {
        rebuilt_head_abilities = pokemon_head_abilities[0]['ability']['name'];
    }
    //Otherwise, actually take the second ability
    else {
        rebuilt_head_abilities = pokemon_head_abilities[1]['ability']['name'];
    }
    return [rebuilt_body_abilities, rebuilt_head_abilities];
}
function fusionHiddenAbilities(pokemon_head_abilities, pokemon_body_abilities, fusion_abilities) {
    let rebuilded_head_abilities;
    let rebuilded_body_abilities;
    let all_abilities = [];
    const max_abilities = 3; //Pokémons can't have more than 3 abilities
    for (let key = 0; key < max_abilities; key++) {
        if (key < pokemon_head_abilities.length) {
            rebuilded_head_abilities = pokemon_head_abilities[key]['ability']['name'];
            all_abilities.push(rebuilded_head_abilities);
        }
        if (key < pokemon_body_abilities.length) {
            rebuilded_body_abilities = pokemon_body_abilities[key]['ability']['name'];
            all_abilities.push(rebuilded_body_abilities);
        }
    }
    let hiddenAbilities = all_abilities.filter((n) => !fusion_abilities.includes(n));
    return hiddenAbilities;
}
function sanitizeAbilityList(ability_list) {
    // Function guard
    if (ability_list.length == 0) {
        return ability_list;
    }
    ability_list = removeDuplicates(ability_list);
    const list_abilities = [];
    for (const key in ability_list) {
        list_abilities.push(ability_list[key]);
    }
    // Clean the abilities list
    for (const key in list_abilities) {
        const temp_arr = list_abilities[key].split('-');
        for (const code in temp_arr) {
            temp_arr[code] = temp_arr[code];
        }
        list_abilities[key] = temp_arr.join(' ');
    }
    return list_abilities;
}
