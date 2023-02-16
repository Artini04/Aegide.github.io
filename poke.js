var result1 = new Array();
var result2 = new Array();
var typeComp = 0;

let pokemon1, pokemon2;
var num1, num2;
var mon1stats, mon2stats;
var mon1types, mon2types;
var mon1abilities, mon2abilities;
var jsonBody;

const MAX_POKE = 420
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/'

// HTML Elements
const pk1Els = {
	$fname: $('#fname1'),

	$type1: $('#p1'),
	$type2: $('#p2'),
	$image: $('#pic1'),

	$dexNum: $('#dexnumber1'),
	$fusionID: $('#fusionid1'),
	$fusionName: $('#FP1'),

	$hp: $('#hp1'),
	$atk: $('#atk1'),
	$def: $('#def1'),
	$spatk: $('#spatk1'),
	$spdef: $('#spdef1'),
	$spe: $('#spe1'),

	$total: $('#bs1'),
	$abilities: $('#ab1'),
	$hiddenAbilities: $('#hab1'),

	$weak4: $('#weak14'),
	$weak2: $('#weak12'),
	$weak1: $('#weak11'),
	$weak05: $('#weak105'),
	$weak025: $('#weak1025'),
	$weak0: $('#weak100'),
}

const pk2Els = {
	$fname: $('#fname2'),

	$type1: $('#p3'),
	$type2: $('#p4'),
	$image: $('#pic2'),

	$dexNum: $('#dexnumber2'),
	$fusionID: $('#fusionid2'),
	$fusionName: $('#FP2'),

	$hp: $('#hp2'),
	$atk: $('#atk2'),
	$def: $('#def2'),
	$spatk: $('#spatk2'),
	$spdef: $('#spdef2'),
	$spe: $('#spe2'),

	$total: $('#bs2'),
	$abilities: $('#ab2'),
	$hiddenAbilities: $('#hab2'),

	$weak4: $('#weak24'),
	$weak2: $('#weak22'),
	$weak1: $('#weak21'),
	$weak05: $('#weak205'),
	$weak025: $('#weak2025'),
	$weak0: $('#weak200'),
}

const random_btn = $('#random')
const random1_btn = $('#random1')
const random2_btn = $('#random2')
const reset_btn = $('#reset')
const fuse_btn = $('#fuse')

//Adding options to datalist
// Always better to wrap everything in a function
populateDatalist()
function populateDatalist() {
	const datalist = $('#dlPkmn')

	for (const item in ids) {
		const newOption = document.createElement('option')
		const pokemon = ids[item][0].toString().toLowerCase()	// Make completely sure that we're dealing with strings before lowercasing it

		//Special name case
		if (nameFix.includes(pokemon)) {
			const name = nameException[nameFix.indexOf(pokemon)]
			newOption.value = name.charAt(0).toUpperCase() + name.substring(1)
		} else {
			newOption.value = pokemon.charAt(0).toUpperCase() + pokemon.substring(1)
		}

		datalist[0].appendChild(newOption)
	}
}

// =====================
// == EVENT LISTENERS ==
// =====================

// Press ENTER on text area 1
pk1Els.$fname[0].addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        fusePoke()
    }
});

// Press ENTER to text area 2
pk2Els.$fname[0].addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
		fusePoke()
    }
});

random_btn[0].addEventListener('click', () => {
    randomPoke(true, true)
})

reset_btn[0].addEventListener('click', () => {
    resetPoke()
})

fuse_btn[0].addEventListener('click', () => {
    fusePoke()
})

random1_btn[0].addEventListener('click', () => {
    randomPoke(true, false)
})

random2_btn[0].addEventListener('click', () => {
    randomPoke(false, true)
})

// ====================
// == MAIN FUNCTIONS ==
// ====================

// Reset Pokemon's Data
function resetPoke() {
	pk1Els.$fname[0].value = ''
	pk2Els.$fname[0].value = ''

	pk1Els.$type1[0].src = 'types/unknown.png'
	pk1Els.$type2[0].src = 'types/unknown.png'
	pk1Els.$type2[0].style.display = 'none'
	pk2Els.$type1[0].src = 'types/unknown.png'
	pk2Els.$type2[0].src = 'types/unknown.png'
	pk2Els.$type2[0].style.display = 'none'

	pk1Els.$image[0].src = 'question.png'
	pk2Els.$image[0].src = 'question.png'

	pk1Els.$dexNum[0].innerHTML = '\u00A0'
	pk2Els.$dexNum[0].innerHTML = '\u00A0'
	pk1Els.$fusionID[0].innerHTML = ' '
	pk2Els.$fusionID[0].innerHTML = ' '
	pk1Els.$fusionName[0].innerHTML = 'Pokemon 1 / Pokemon 2'
	pk2Els.$fusionName[0].innerHTML = 'Pokemon 2 / Pokemon 1'

	pk1Els.$hp[0].innerHTML = 'HP:'
	pk1Els.$atk[0].innerHTML = 'ATK:'
	pk1Els.$def[0].innerHTML = 'DEF:'
	pk1Els.$spatk[0].innerHTML = 'SP.ATK:'
	pk1Els.$spdef[0].innerHTML = 'SP.DEF:'
	pk1Els.$spe[0].innerHTML = 'SPEED:'
	pk1Els.$total[0].innerHTML = 'TOTAL:'
	pk1Els.$abilities[0].innerHTML = 'ABILITY:'
	pk1Els.$hiddenAbilities[0].innerHTML = ''

	pk2Els.$hp[0].innerHTML = 'HP:'
	pk2Els.$atk[0].innerHTML = 'ATK:'
	pk2Els.$def[0].innerHTML = 'DEF:'
	pk2Els.$spatk[0].innerHTML = 'SP.ATK:'
	pk2Els.$spdef[0].innerHTML = 'SP.DEF:'
	pk2Els.$spe[0].innerHTML = 'SPEED:'
	pk2Els.$total[0].innerHTML = 'TOTAL:'
	pk2Els.$abilities[0].innerHTML = 'ABILITY:'
	pk2Els.$hiddenAbilities[0].innerHTML = ''

	pk1Els.$weak4[0].innerHTML = 'x4:'
	pk1Els.$weak2[0].innerHTML = 'x2:'
	pk1Els.$weak1[0].innerHTML = 'x1:'
	pk1Els.$weak05[0].innerHTML = 'x0.5:'
	pk1Els.$weak025[0].innerHTML = 'x0.25:'
	pk1Els.$weak0[0].innerHTML = 'x0:'

	pk2Els.$weak4[0].innerHTML = 'x4:'
	pk2Els.$weak2[0].innerHTML = 'x2:'
	pk2Els.$weak1[0].innerHTML = 'x1:'
	pk2Els.$weak05[0].innerHTML = 'x0.5:'
	pk2Els.$weak025[0].innerHTML = 'x0.25:'
	pk2Els.$weak0[0].innerHTML = 'x0:'

	const base1 = ['hp1', 'atk1', 'def1', 'spatk1', 'spdef1', 'spe1', 'bs1']
	const base2 = ['hp2', 'atk2', 'def2', 'spatk2', 'spdef2', 'spe2', 'bs2']
	for (const id in base1) {
		document.getElementById(base1[id]).style.color = ''
		document.getElementById(base2[id]).style.color = ''
	}
}

function randomPoke(should_rand1, should_rand2) {
	disableButtons()

	if (should_rand1) {
		const name = ids[getRandomPokeID()][0].toString().toLowerCase()
		pk1Els.$fname[0].value = checkName(name)
	}

	if (should_rand2) {
		const name = ids[getRandomPokeID()][0].toString().toLowerCase()
		pk2Els.$fname[0].value = checkName(name)
	}

	// Fires only when both pokemons are present
	if (pk1Els.$fname[0].value && pk2Els.$fname[0].value) {
		fusePoke()
	} else {
		enableButtons()
	}

	/**
	 * Local function that checks whether the name is included in the nameFix array
	 * @param {string} name
	 * @returns string
	 */
	function checkName(name) {
		if (nameFix.includes(name)) {
			name = nameException[nameFix.indexOf(name)]
		}
		return name
	}
}

// ======================
// == HELPER FUNCTIONS ==
// ======================

function getRandomPokeID(){
    return Math.floor(Math.random() * Math.floor(MAX_POKE));
}

function disableButtons() {
    const buttons_collection = $('.button')

    for (const elem in buttons_collection) {
        buttons_collection[elem].disabled = true
    }
}

function enableButtons() {
	const buttons_collection = $('.button')

	for (const elem in buttons_collection) {
		buttons_collection[elem].disabled = false
	}
}

function getPokemonName(htmlId){
    var pokemonName = (document.getElementById(htmlId)).value.toLowerCase();
    pokemonName = pokemonName.replace(/\W/g, '');
    return pokemonName;
}

//Fusion calculation function
async function fusePoke() {
	disableButtons()

	// Copy pokemon from both text area
	pokemon1 = pk1Els.$fname[0].value.toString().toLowerCase()
	pokemon2 = pk2Els.$fname[0].value.toString().toLowerCase()

	if (!pokemon1 || !pokemon2) {
		enableButtons()
		alert('Please fill out the textboxes!')
		return
	}

	// idCheck
	// Nidoran clause
	if (pokemon1 == 'nidoran' || pokemon2 == 'nidoran') {
		alert("Please specify Nidoran's gender! (f or m)")
		return
	}

	// Special mon selector: Giratina, Deoxys
	pokemon1 = checkName(pokemon1)
	pokemon2 = checkName(pokemon2)

    // Fetch Pokemon's data from PokeAPI
    const poke1_res = await fetch(POKEAPI_URL + pokemon1.toString().toLowerCase())
        .then(response => response.json())
        .catch((error) => {
            console.log(error)
            alert('PokeAPI is unreachable!')
        })

    const poke2_res = await fetch(POKEAPI_URL + pokemon2)
		.then((response) => response.json())
		.catch((error) => {
			console.log(error)
			alert('PokeAPI is unreachable!')
		})

    // Build pokemon's data
    buildPokemon(poke1_res, pokemon1)
    buildPokemon(poke2_res, pokemon2)

    enableButtons()

	/**
	 * Local function that checks if pokemon is in nameException
	 * @param {string} name
	 * @returns string
	 */
	function checkName(name) {
		if (nameException.includes(name)) {
			name = nameFix[nameException.indexOf(name)]
		}

		return name
	}
}

/**
 * build the pokemon
 * @param {json} pokemonData 
 */
function buildPokemon (pokemonData, pokemonName) {
    let pokemonID = pokemonData.id

    // ID Check
    let IDCheck = false

    for (const item in ids) {
        const pokemon = ids[item][0].toString().toLowerCase()
        if (pokemonName === pokemon) {
            IDCheck = true
            pokemonID = ids[item][1]
        }
    }

    // Check if the pokemon is in the fangame!
    if (IDCheck === false || pokemonID >= MAX_POKE) {
        alert(pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.substring(1) + ' isn\'t in the fangame!')
        return
    }

    // ==============================
    // START OF BUILDING POKEMON DATA
    // ==============================

    // Types
    let fetched_types = pokemonData.types
    const pokemon_types = []
    let compt = 0

    // Exceptions for pokemons with swapped types
    for (const i in typeSwap) {
        const ID_pokemon = typeSwap[i][2].toString().toLowerCase()

        if (ID_pokemon === pokemonName) {
            pokemon_types.push(typeSwap[i][0].toString())
            pokemon_types.push(typeSwap[i][1].toString())
            compt = 1
        }
    }

    // Exception for pokemons with single type
    for (const i in typeUni) {
        const ID_pokemon = typeUni[i][1].toString().toLowerCase()

        if (ID_pokemon === pokemonName) {
            pokemon_types.push(typeUni[i][0].toString())
            compt = 2
        }
    }

    if (compt === 0) {
        for (const type in fetched_types) {
            const typeName = fetched_types[type]['type']['name']

            if (typeName === 'normal' || typeName === 'flying') {
                pokemon_types.push('flying')
            } else {
                pokemon_types.push(typeName)
            }
        }
    }

    // Stats
    let pokemon_stats

    if (statsException.includes(pokemonName)) {
        pokemon_stats = statsFix[statsException.indexOf(pokemonName)]
    } else {
        pokemon_stats = pokemonData.stats
    }

    for (const stat in pokemon_stats) {
        // TODO
    }
}


function fuseFirstPoke(jsonString){

    //ID selector for sprite showcase of the 1st mon/ Validator for 1st mon
    num1 = jsonString.id;
    var id1 = num1;
    var idCheck1 = false;
    for (var i = 0; i < ids.length; i++){
        if (ids[i][0] == pokemon1.charAt(0).toUpperCase() + pokemon1.slice(1)) {
            idCheck1 = true;
            num1 = ids[i][1];
        }
    }
    if (idCheck1 == false && id1 >= 252) {
        alert("The first pokemon isn't in the fangame!")
    }
    else {

        //#region Type of 1st mon
        //Type selector for fusion type knowledge of the 1st mon
        var type1 = jsonString.types;
        mon1types = [];
        var compt = 0;

        //Exception mon selected for swapped types
        for (var i = 0; i < typeSwap.length; i++) {
            if (typeSwap[i][2] == pokemon1.charAt(0).toUpperCase() + pokemon1.slice(1)) {
                mon1types.push(typeSwap[i][0]);
                mon1types.push(typeSwap[i][1]);
                var compt = 1;
            }
        }

        //Exception mon selected for one type
        for (var i = 0; i < typeUni.length; i++) {
            if (typeUni[i][1] == pokemon1.charAt(0).toUpperCase() + pokemon1.slice(1)) {
                mon1types.push(typeUni[i][0]);
                var compt = 2;
            }
        }

        if (compt == 0) {
            mon1types.push(type1[0].type.name);
            if (type1.length == 2 && compt != 2) {
                if (type1[0].type.name == "normal" && type1[1].type.name == "flying") {
                    mon1types[0] = "flying";
                } else {
                    mon1types.push(type1[1].type.name);
                }
            }
        }
        //#endregion

        //#region Stats of 1st mon
        var stats1;
        if (statsException.includes(pokemon1)) {
            stats1 = statsFix[statsException.indexOf(pokemon1)];
        } else {
            stats1 = jsonString.stats;
        }

        mon1stats = [];
        for (var i = 0; i < stats1.length; i++) {
            mon1stats.push(stats1[i].base_stat);
        }
        //#endregion

        //#region Abilities of 1st mon
        var ab1;
        if (abilitiesException.includes(pokemon1)) {
            ab1 = abilitiesFix[abilitiesException.indexOf(pokemon1)];
        } else {
            ab1 = jsonString.abilities;
        }
        mon1abilities = [];
        for (var i = 0; i < ab1.length; i++) {
            mon1abilities.push([ab1[i].ability, ab1[i].is_hidden]);
        }  
        //#endregion

        //#region Request
        // Second request - version A
        var xhr2a = new XMLHttpRequest();
        var url2a = "https://pokeapi.co/api/v2/pokemon/" + pokemon2;
        xhr2a.open('GET', url2a, true);
        xhr2a.send();
        xhr2a.onload = function() {
            jsonBody = xhr2a.responseText;
            if(jsonBody){
                if(jsonBody != "Not Found"){
                    jp = JSON.parse(jsonBody);
                    fuseSecondPoke(jp);
                }
                else{

                    // Second request - version B
                    var xhr2b = new XMLHttpRequest();
                    var url2b = "https://pokeapi.co/api/v2/pokemon/" + pokemon2 + "/";
                    xhr2b.open('GET', url2b, true);
                    xhr2b.send();
                    xhr2b.onload = function() {
                        jsonBody = xhr2b.responseText;
                        if(jsonBody) {
                            if(jsonBody != "Not Found"){
                                jp = JSON.parse(jsonBody);
                                fuseSecondPoke(jp);
                            }
                            else{
                                alert("Second pokemon was misspelled ?");
                            }
                        }
                        else{
                            alert("PokeAPI is unreachable (2b)");
                        }
                    }
                }
            }
            else{
                alert("PokeAPI is unreachable (2a)");
            }
            
        }
        //#endregion
    }
}


function fuseSecondPoke(jsonString){
    
    //ID selector for sprite showcase of the 2st mon
    num2 = jsonString.id;
    var id2 = num2;
    var idCheck2 = false;
    for (var i = 0; i < ids.length; i++){
        if (ids[i][0] == pokemon2.charAt(0).toUpperCase() + pokemon2.slice(1)) {
            idCheck2 = true;
            num2 = ids[i][1];
        }
    }
    if (idCheck2 == false && id2 >= 252) {
        alert("The second pokemon isn't in the fangame!")
    }
    else {

        //#region Type of 2nd mon
        //Type selector for fusion type knowledge of the 2nd mon
        var type2 = jsonString.types;
        mon2types = [];
        var compt = 0;

        //Exception mon selected for swapped types
        for (var i = 0; i < typeSwap.length; i++) {
            if (typeSwap[i][2] == pokemon2.charAt(0).toUpperCase() + pokemon2.slice(1)) {
                mon2types.push(typeSwap[i][0]);
                mon2types.push(typeSwap[i][1]);
                var compt = 1;
            }
        }

        //Exception mon selected for one type
        for (var i = 0; i < typeUni.length; i++) {
            if (typeUni[i][1] == pokemon2.charAt(0).toUpperCase() + pokemon2.slice(1)) {
                mon2types.push(typeUni[i][0]);
                var compt = 2;
            }
        }

        //Type of 2nd mon
        if (compt == 0) {
            mon2types.push(type2[0].type.name);
            if (type2.length == 2 && compt != 2) {
                if (type2[0].type.name == "normal" && type2[1].type.name == "flying") {
                    mon2types[0] = "flying";
                } else {
                    mon2types.push(type2[1].type.name);
                }
            }
        }
        //#endregion

        //#region Stats of 2nd mon
        var stats2;
        if (statsException.includes(pokemon2)) {
            stats2 = statsFix[statsException.indexOf(pokemon2)];
        } else {
            stats2 = jsonString.stats;
        }
        mon2stats = [];
        for (var i = 0; i < stats2.length; i++) {
            mon2stats.push(stats2[i].base_stat);
        }
        //#endregion

        //#region Abilities of 2nd mon
        var ab2;
        if (abilitiesException.includes(pokemon2)) {
            ab2 = abilitiesFix[abilitiesException.indexOf(pokemon2)];
        } else {
            ab2 = jsonString.abilities;
        }

        mon2abilities = [];
        for (var i = 0; i < ab2.length; i++) {
            mon2abilities.push([ab2[i].ability, ab2[i].is_hidden]);
        }                     
        //#endregion

        fuseBothPoke()

    }
    
}


function fuseBothPoke(){

    //TODO : factor this
    //Name of fusion
    if (!nameFix.includes(pokemon1) && !nameFix.includes(pokemon2)) {
        var fmon1 = pokemon1.charAt(0).toUpperCase() + pokemon1.slice(1);
        var fmon2 = pokemon2.charAt(0).toUpperCase() + pokemon2.slice(1);
    } else if (nameFix.includes(pokemon1) && !nameFix.includes(pokemon2)) {
        var fmon1 = nameException[nameFix.indexOf(pokemon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(pokemon1)].slice(1);
        var fmon2 = pokemon2.charAt(0).toUpperCase() + pokemon2.slice(1);
    } else if (!nameFix.includes(pokemon1) && nameFix.includes(pokemon2)) {
        var fmon1 = pokemon1.charAt(0).toUpperCase() + pokemon1.slice(1);
        var fmon2 = nameException[nameFix.indexOf(pokemon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(pokemon2)].slice(1);
    } else if (nameFix.includes(pokemon1) && nameFix.includes(pokemon2)) {
        var fmon1 = nameException[nameFix.indexOf(pokemon1)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(pokemon1)].slice(1);
        var fmon2 = nameException[nameFix.indexOf(pokemon2)].charAt(0).toUpperCase() + nameException[nameFix.indexOf(pokemon2)].slice(1);
    }

    //Dex Numbers
    var dexnum1 = Math.floor(num1 + (420 * num2));
    var dexnum2 = Math.floor(num2 + (420 * num1));
    document.getElementById("dexnumber1").innerHTML = dexnum1;
    document.getElementById("dexnumber2").innerHTML = dexnum2;
    document.getElementById("fusionid1").innerHTML = " (" + num1 + "." + num2 + ")";
    document.getElementById("fusionid2").innerHTML = " (" + num2 + "." + num1 + ")";
    
    //Name of fusions
    document.getElementById("FP1").innerHTML = fmon1+ "/" + fmon2;
    document.getElementById("FP2").innerHTML = fmon2 + "/" + fmon1;

    //Name of pictures
    var pic1 = num1 + "." + num2 + ".png";
    var pic2 = num2 + "." + num1 + ".png";

    //Stats calculation
    var hp1 = (mon2stats[0]/3) + 2*(mon1stats[0]/3);
    var atk1 = 2*(mon2stats[1]/3) + (mon1stats[1]/3);
    var def1 = 2*(mon2stats[2]/3) + (mon1stats[2]/3);
    var spatk1 = (mon2stats[3]/3) + 2*(mon1stats[3]/3);
    var spdef1 = (mon2stats[4]/3) + 2*(mon1stats[4]/3);
    var spe1 = 2*(mon2stats[5]/3) + (mon1stats[5]/3);
    var bs1 = Math.floor(hp1) + Math.floor(atk1) + Math.floor(def1) + Math.floor(spatk1) + Math.floor(spdef1) + Math.floor(spe1);

    var hp2 = (mon1stats[0]/3) + 2*(mon2stats[0]/3);
    var atk2 = 2*(mon1stats[1]/3) + (mon2stats[1]/3);
    var def2= 2*(mon1stats[2]/3) + (mon2stats[2]/3);
    var spatk2 = (mon1stats[3]/3) + 2*(mon2stats[3]/3);
    var spdef2 = (mon1stats[4]/3) + 2*(mon2stats[4]/3);
    var spe2 = 2*(mon1stats[5]/3) + (mon2stats[5]/3);
    var bs2 = Math.floor(hp2) + Math.floor(atk2) + Math.floor(def2) + Math.floor(spatk2) + Math.floor(spdef2) + Math.floor(spe2);

    var L0 = ["hp1","atk1","def1","spatk1","spdef1","spe1","bs1"];
    var L1 = ["hp2","atk2","def2","spatk2","spdef2","spe2","bs2"];
    var L2 = [Math.floor(hp1), Math.floor(atk1), Math.floor(def1), Math.floor(spatk1), Math.floor(spdef1), Math.floor(spe1), Math.floor(bs1)];
    var L3 = [Math.floor(hp2), Math.floor(atk2), Math.floor(def2), Math.floor(spatk2), Math.floor(spdef2), Math.floor(spe2), Math.floor(bs2)];
    var L4 = [];
    var L5 = [];
    for (var i = 0; i < L0.length; i++) {
        L4.push(Math.max(L2[i], L3[i])-Math.min(L2[i], L3[i]));
    }

    //Color of stats
    for (var i = 0; i < L1.length; i++) {
        if (L2[i] < L3[i]) {
            document.getElementById(L0[i]).style.color = "red";
            document.getElementById(L1[i]).style.color = "green";
            L5.push(" (+" + L4[i] + ")");
            L4[i] = " (-" + L4[i] + ")";
        } else if (L2[i] > L3[i]) {
            document.getElementById(L1[i]).style.color = "red";
            document.getElementById(L0[i]).style.color = "green";
            L5.push(" (-" + L4[i] + ")");
            L4[i] = " (+" + L4[i] + ")";
        } else {
            document.getElementById(L1[i]).style.color = "orange";
            document.getElementById(L0[i]).style.color = "orange";
            L4[i] = " (0)";
            L5.push(" (0)");
        }
        document.getElementById(L0[i]).innerHTML = L0[i].slice(-1) + ": " + L2[i];
        document.getElementById(L1[i]).innerHTML = L1[i].slice(-1) + ": " + L3[i];
    }

    //Writting stat in HTML

    /*
    if (mon1 == "shedinja" || mon2 == "shedinja") {
        document.getElementById("hp1").innerHTML = "HP: 1 (0)";
        document.getElementById("hp1").style.color = "orange";
    } else {*/
    document.getElementById("hp1").innerHTML = "HP: " + Math.floor(hp1) + L4[0];
    /*}*/

    document.getElementById("atk1").innerHTML = "ATK: " + Math.floor(atk1) + L4[1];
    document.getElementById("def1").innerHTML = "DEF: " + Math.floor(def1) + L4[2];
    document.getElementById("spatk1").innerHTML = "SPE.ATK: " + Math.floor(spatk1) + L4[3];
    document.getElementById("spdef1").innerHTML = "SPE.DEF: " + Math.floor(spdef1) + L4[4];
    document.getElementById("spe1").innerHTML = "SPEED: " + Math.floor(spe1) + L4[5];
    document.getElementById("bs1").innerHTML = "TOTAL: " + Math.floor(bs1) + L4[6];

    /*
    if (mon1 == "shedinja" || mon2 == "shedinja") {
        document.getElementById("hp2").innerHTML = "HP: 1 (0)";
        document.getElementById("hp2").style.color = "orange";
    } else {*/
    document.getElementById("hp2").innerHTML = "HP: " + Math.floor(hp2) + L5[0];
    /*}*/
    document.getElementById("atk2").innerHTML = "ATK: " + Math.floor(atk2) + L5[1];
    document.getElementById("def2").innerHTML = "DEF: " + Math.floor(def2) + L5[2];
    document.getElementById("spatk2").innerHTML = "SPE.ATK: " + Math.floor(spatk2) + L5[3];
    document.getElementById("spdef2").innerHTML = "SPE.DEF: " + Math.floor(spdef2) + L5[4];
    document.getElementById("spe2").innerHTML = "SPEED: " + Math.floor(spe2) + L5[5];
    document.getElementById("bs2").innerHTML = "TOTAL: " + Math.floor(bs2) + L5[6];

    //Abilities of fused mons
    if (abilitySwap.includes(pokemon1)) {
        [mon1abilities[0], mon1abilities[1]] = [mon1abilities[1], mon1abilities[0]];
    }
    if (abilitySwap.includes(pokemon2)) {
        [mon2abilities[0], mon2abilities[1]] = [mon2abilities[1], mon2abilities[0]];
    }

    //Type of fused mons
    var fmonres1 = null;
    var fmonres2 = null;
    if(pokemon1 == pokemon2 && selfFusionTypeException.includes(pokemon1)){
        fmonres1 = selfFusionTypeFix[selfFusionTypeException.indexOf(pokemon1)];
        fmonres2 = fmonres1
    }
    else{
        fmonres1 = fusType(mon1types, mon2types);
        fmonres2 = fusType(mon2types, mon1types);
    }

    //Types effectiveness
    if (typeComp>0) {
        c = document.getElementsByClassName('monweak');
        for( b=0; b < c.length; b++ )
        { 
            defaultValue = c[b].getAttribute('data-default');
            if (defaultValue) {
                c[b].innerText = defaultValue;
            }
        }
    }

    tyeffid1 = typeId(fmonres1);
    tyeffid2 = typeId(fmonres1);

    for (var i = 0; i < typeName.length; i++) {
        result1[i] = (types[i][tyeffid1[0]] * types[i][tyeffid1[1]]);
    }

    for (var i = 0; i < typeName.length; i++) {
        var image = new Image()
        image.src = "types/" + typeName[i] + ".png";
        
        if (result1[i] == 4) {
            document.getElementById("weak14").appendChild(image);
        }
        if (result1[i] == 2) {
            document.getElementById("weak12").appendChild(image);
        }
        if (result1[i] == 1) {
            document.getElementById("weak11").appendChild(image);
        }
        if (result1[i] == 0.5) {
            document.getElementById("weak105").appendChild(image);
        }
        if (result1[i] == 0.25) {
            document.getElementById("weak1025").appendChild(image);
        }
        if (result1[i] == 0) {
            document.getElementById("weak100").appendChild(image);
        }
    }

    tyeffid1 = typeId(fmonres2);
    tyeffid2 = typeId(fmonres2);

    for (var i = 0; i < typeName.length; i++) {
        result2[i] = (types[i][tyeffid1[0]] * types[i][tyeffid1[1]]);
    }

    for (var i = 0; i < typeName.length; i++) {
        var image = new Image();
        image.src = "types/" + typeName[i] + ".png";

        if (result2[i] == 4) {
            document.getElementById("weak24").appendChild(image);
        }
        if (result2[i] == 2) {
            document.getElementById("weak22").appendChild(image);
        }
        if (result2[i] == 1) {
            document.getElementById("weak21").appendChild(image);
        }
        if (result2[i] == 0.5) {
            document.getElementById("weak205").appendChild(image);
        }
        if (result2[i] == 0.25) {
            document.getElementById("weak2025").appendChild(image);
        }
        if (result2[i] == 0) {
            document.getElementById("weak200").appendChild(image);
        }
    }

    typeComp += 1;

    document.getElementById("p1").src = "types/" + fmonres1[0] + ".png";
    if (fmonres1.length!=1 && (fmonres1.length == 2 && fmonres1[0] != fmonres1[1])) {
        document.getElementById("p2").style.display = "inline-block";
        document.getElementById("p2").src = "types/" + fmonres1[1] + ".png";
    } else {
        document.getElementById("p2").style.display = "none";
    }

    document.getElementById("p3").src = "types/" + fmonres2[0] + ".png";

    if (fmonres2.length!=1 && (fmonres2.length == 2 && fmonres2[0] != fmonres2[1])) {
        document.getElementById("p4").style.display = "inline-block";
        document.getElementById("p4").src = "types/" + fmonres2[1] + ".png";
    } else {
        document.getElementById("p4").style.display = "none";
    }

    //Picture of fusions (if inside CustomBattlers)
    showFusion("pic1", pic1, "fusionid1");
    showFusion("pic2", pic2, "fusionid2");

    //Abilities 1
    var abilities1 = fusionAbilities(mon1abilities, mon2abilities);
    var hiddenAbilities1 = fusionHiddenAbilities(mon1abilities, mon2abilities, abilities1);
    var abilitiesText1 = "ABILITY: " + sanitizeAbilityList(abilities1);
    var hiddenAbilitiesText1 = sanitizeAbilityList(hiddenAbilities1);

    document.getElementById("ab1").innerHTML = abilitiesText1;
    document.getElementById("hab1").innerHTML = hiddenAbilitiesText1;

    //Abilities 2
    var abilties2 = fusionAbilities(mon2abilities, mon1abilities);
    var hiddenAbilities2 = fusionHiddenAbilities(mon2abilities, mon1abilities, abilties2);
    var abilitiesText2 = "ABILITY: " + sanitizeAbilityList(abilties2);
    var hiddenAbilitiesText2 = sanitizeAbilityList(hiddenAbilities2);

    document.getElementById("ab2").innerHTML = abilitiesText2;
    document.getElementById("hab2").innerHTML = hiddenAbilitiesText2;

    //Fusion done
    buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    };
}


function typeId(ftype) {
    var ty1 = typeName.indexOf(ftype[0]);
    if (ftype.length == 2) {
        var ty2 = typeName.indexOf(ftype[1]);
    } else {
        var ty2 = 18;
    }
    return [ty1, ty2];
}


//Custom sprite fusion function
function showFusion(elementId, fusionId, elementFusionId){
    
    fusionUrl = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + fusionId;
    document.getElementById(elementId).title = fusionId;

    if(doesImageExists(fusionUrl)){
        document.getElementById(elementId).src = fusionUrl;
        document.getElementById(elementFusionId).style.color = "green";
    }
    else{//Screenshot of autogen pokemon
        fallbackFusionRepository = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/"
        headId = fusionId.split(".")[0];
        fallbackFusionUrl = fallbackFusionRepository + headId + "/" + fusionId;
        document.getElementById(elementId).src = fallbackFusionUrl;
        document.getElementById(elementFusionId).style.color = "red";
    }
}

//Error detection
function doesImageExists(imageUrl){
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    
    // Can't handle error in an easy way
    http.send();
    return http.status != 404;
}

// Swaps the head with the body and viceversa
function swapPoke(){
    let auxId = headId;
    let auxFname = document.getElementById("fname1").value;

    headId = bodyId;
    document.getElementById("fname1").value = document.getElementById("fname2").value;

    bodyId = auxId;
    document.getElementById("fname2").value = auxFname;

    showShinies(false, false);
}

// Let's you pick a image from your machine
$("input[id='pic1']").click(function() {
    $("input[id='input_file']").click();
});
function readURLImage(input) {
    if (typeof headId !== 'undefined' && typeof bodyId !== 'undefined') {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                    $('#pic1').attr('src', e.target.result);
                    $('#pic2').attr('src', e.target.result);
                    document.getElementById("pic2").style.filter 
                        = "hue-rotate(" + calcShinyHue(headId, bodyId, true, false) + "deg)";
                    $('#pic3').attr('src', e.target.result);
                    document.getElementById("pic3").style.filter 
                        = "hue-rotate(" + calcShinyHue(headId, bodyId, false, true) + "deg)";
                    $('#pic4').attr('src', e.target.result);
                    document.getElementById("pic4").style.filter 
                        = "hue-rotate(" + calcShinyHue(headId, bodyId, true, true) + "deg)";
                };
                reader.readAsDataURL(input.files[0]);
            }
    } else {
        alert("Please fill the two text inputs!");
    }
}

// Shows the images for the mon and it's shinies
function showShinies(randomHead, randomBody){
    buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    };

    document.getElementById("input_file").value = ""; // To make the input work everytime, even if the input image has not changed

    if (randomHead) {
        headId = getRandomPokeID();
        var name = ids[headId][0].toLowerCase();
        if (nameFix.includes(name)) {
            name = nameException[nameFix.indexOf(name)];
        }
        document.getElementById("fname1").value = name;
    } else {
        var name = document.getElementById("fname1").value.toLowerCase();
        if (nameException.includes(name)) {
            name = nameFix[nameException.indexOf(name)];
        }
        for (let i = 0; i < ids.length; i++) {
            if (name.toUpperCase() == ids[i][0].toUpperCase()) {
                headId = i;
                break;
            }
        }
    }

    if (randomBody) {
        bodyId = getRandomPokeID();
        var name2 = ids[bodyId][0].toLowerCase();
        if (nameFix.includes(name2)) {
            name2 = nameException[nameFix.indexOf(name2)];
        }    
        document.getElementById("fname2").value = name2;
    } else {
        var name2 = document.getElementById("fname2").value.toLowerCase();
        if (nameException.includes(name2)) {
            name2 = nameFix[nameException.indexOf(name2)];
        }
        for (let i = 0; i < ids.length; i++) {
            if (name2.toUpperCase() == ids[i][0].toUpperCase()) {
                bodyId = i;
                break;
            }
        }
    }

    document.getElementById("dexnumber1").innerHTML = (bodyId + 1) * 420 + headId + 1;
    document.getElementById("fusionid1").innerHTML = " (" + (headId + 1) + "." + (bodyId + 1) + ")"
    document.getElementById("fusionid1").style.color = "green";

    picShinySrc = "https://raw.githubusercontent.com/Aegide/custom-fusion-sprites/main/CustomBattlers/" + (headId+1) + "." + (bodyId+1) + ".png";

    if (!doesImageExists(picShinySrc)) {
        picShinySrc = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/" + (headId+1) + "/" + (headId+1) + "." + (bodyId+1) + ".png";
        document.getElementById("fusionid1").style.color = "red";
    }

    document.getElementById("pic1").src = picShinySrc;

    window.hueShift = [];
    hueShift[0] = calcShinyHue(headId, bodyId, true, false)
    let picShiny = document.getElementById("pic2");
    picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[0]);

    hueShift[1] = calcShinyHue(headId, bodyId, false, true)
    picShiny = document.getElementById("pic3");
    picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[1]);

    hueShift[2] = calcShinyHue(headId, bodyId, true, true)
    picShiny = document.getElementById("pic4");
    picShiny.title = picShiny.alt = "Hue shift " + Math.trunc(hueShift[2]);

    buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    };
}

// Calculates the hue of the shiny and returns it it.
// This tries to replicate the calculation made in the game itself.
function calcShinyHue(num1, num2, hasShinyHead, hasShinyBody) {
    let offset = 0;

    if (hasShinyHead && hasShinyBody && num1 in shinyColorOffsetsDict && num2 in shinyColorOffsetsDict){
        offset = shinyColorOffsetsDict[num1] + shinyColorOffsetsDict[num2];
    } else if (hasShinyHead && num1 in shinyColorOffsetsDict) {
        offset = shinyColorOffsetsDict[num1]
    } else if (hasShinyBody && num2 in shinyColorOffsetsDict) {
        offset = shinyColorOffsetsDict[num2]
    } else {
        offset = calcShinyHueDeafult(num1, num2, hasShinyHead, hasShinyBody);
    }

    return offset;
}

// Calculates the hue of the shiny and returns it it.
// This tries to replicate the calculation made in the game itself.
function calcShinyHueDeafult(num1, num2, hasShinyHead, hasShinyBody) {
    let dexOffset = num1 + num2 * 420;
    let dexDiff = Math.abs(num2 - num1);

    if (hasShinyHead && !hasShinyBody) {
        dexOffset = num1;
    } else if (!hasShinyHead && hasShinyBody) {
        dexOffset = dexDiff > 20 ? num2 : num2 + 40
    }

    offset = dexOffset + 75;
    if (offset > 420) offset /= 360;
    if (offset < 40) offset = 40;
    if (Math.abs(360 - offset) < 40) offset = 40;

    return offset;
}


function fusionAbilities(headAbilities, bodyAbilities) {
    var B0 = bodyAbilities[0][0].name;
    var H1;
    
    //If there is only ability, pick that one
    if(headAbilities.length == 1){
        H1 = headAbilities[0][0].name;
    }

    //If the second ability is a hidden ability, pick the first ability
    else if(headAbilities[1][1] == true){
        H1 = headAbilities[0][0].name;
    }
    //Otherwise, actually take the second ability
    else{
        H1 = headAbilities[1][0].name;
    }

    return [B0, H1];
}


function fusionHiddenAbilities(headAbilities, bodyAbilities, fusionAbilities){

    var headAbility, bodyAbility;
    var allAbilities = [];

    var maxAbilities = 3;//Pokémons can't have more than 3 abilities
    for(var a = 0; a < maxAbilities; a++){
        if( a < headAbilities.length){
            headAbility = ability = headAbilities[a][0].name;
            allAbilities.push(headAbility);
        }
        if( a < bodyAbilities.length){
            bodyAbility = bodyAbilities[a][0].name;
            allAbilities.push(bodyAbility);
        }
    }

    hiddenAbilities = allAbilities.filter(n => !fusionAbilities.includes(n));

    return hiddenAbilities;
}


function removeDuplicates(list){
    return Array.from(new Set(list));
}


function sanitizeAbilityList(abilityList){

    if(abilityList.length == 0){
        return abilityList;
    }

    abilityList = removeDuplicates(abilityList);

    var listAb1 = "";
    for (var i = 0; i < abilityList.length; i++) {
        listAb1 = listAb1 + abilityList[i].charAt(0).toUpperCase() + abilityList[i].slice(1) + " / ";
    }
    listAb1 = listAb1.slice(0, listAb1.length - 1);
    listAb1 = listAb1.split("-").join(" ")
    listAb1 = listAb1.split(" ")
    for (var i = 0, x = listAb1.length; i < x; i++) {
        listAb1[i] = listAb1[i][0].toUpperCase() + listAb1[i].substr(1);
    }
    listAb1 = listAb1.join(" ").slice(0, -2);

    return listAb1;
}


//Ability fusion function
function fusAb(mon1, mon2) {
    var fabs = [];
    var H0 = mon1[0][0].name;
    if (mon1.length == 3 && mon1[2][1] == true) {
        var H1 = mon1[1][0].name;
        var HH = mon1[2][0].name;
    }else if (mon1.length == 2 && mon1[1][1] == true) {
        var HH = mon1[1][0].name;
    } else if (mon1.length == 2 && mon1[1][1] == false){
        var H1 = mon1[1][0].name;
    }
    var B0 = mon2[0][0].name;
    if (mon2.length == 3 && mon2[2][1] == true) {
        var B1 = mon2[1][0].name;
        var BH = mon2[2][0].name;  
    }else if (mon2.length == 2 && mon2[1][1] == true) {
        var BH = mon2[1][0].name;
    } else if (mon1.length == 2 && mon1[1][1] == false){
        var B1 = mon2[1][0].name;
    }
    //cas H0/null/null + B0/null/null [H0=B0] -> H0/null/null
    if (mon1.length == 1 && mon2.length == 1 && mon1[0][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
    //cas H0/null/null + B0/null/null [H0#B0] -> H0/B0/null
        } else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
        }
    //cas H0/H1/null + B0/null/null [H0=B0] -> H0/H1/null
    } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false) {
        if (H0 == B0) {
            fabs.push(H0);
            fabs.push(H1);
    //cas H0/H1/null + B0/null/null [H0#B0] -> H0/B0/H1
        } else if (H0 != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
        }
    //cas H0/null/HH + B0/null/null [H0=B0 | HH=B0] -> H0/null/HH
    } else if (mon1.length == 2 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(HH);
    //cas H0/null/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        } else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
    //cas H0/H1/HH + B0/null/null [H0=B0 | B0=HH] -> H0/H1/HH
    } else if (mon1.length == 3 && mon2.length == 1 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false) {
        if (H0 == B0 || B0 == HH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(HH);
    //cas H0/H1/HH + B0/null/null [H0#B0 & HH#B0] -> H0/B0/HH
        } else if (H0 != B0 && HH != B0) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
        }
    //cas H0/null/null + B0/B1/null [H0=B1] -> H0/B0/null
    } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
    //cas H0/null/null + B0/B1/null [H0=B0] -> H0/B1/null
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.punch(B1);
    //cas H0/null/null + B0/B1/null [H0#B0 & H0#B1] -> H0/B1/B0
        } else if (H0 != B0 && H0 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
    //cas H0/H1/null + B0/B1/null [H0=B1] -> H0/B0/H1
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
    //cas H0/H1/null + B0/B1/null [H0=B0] -> H0/B1/H1
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
    //cas H0/H1/null + B0/B1/null [H1#B0 & H1#B1] -> H0/B1/H1
        } else if (H1 != B0 && H1 != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
    //cas H0/null/HH + B0/B01/null [H0=B1 | HH=B1] -> H0/B0/HH
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/null/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        } else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(H1);
        }
    //cas H0/H1/HH + B0/B1/null [H0=B1 | HH=B1] -> H0/B0/HH
    } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1]==false && mon2[1][1] == false) {
        if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/H1/HH + B0/B1/null [H0#B1 & HH#B1] -> H0/B1/HH
        } else if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
    //cas H0/null/null + B0/null/BH [H0=BH] -> H0/null/B0
    } else if (mon1.length == 1 && mon2.length == 2 && mon1[0][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
    //cas H0/null/null + B0/null/BH [H0=B0] -> H0/null/BH
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
    //cas H0/null/null + B0/null/BH [H0#B0 & H0#BH] -> H0/B0/BH
        } else if (H0 != B0 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
        }
    //cas H0/H1/null + B0/null/BH [H0=BH] -> H0/B0/H1
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(H1);
    //cas H0/H1/null + B0/null/BH [H0=B0] -> H0/BH/H1
        } else if (H0 == B0) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(H1);
    //cas H0/H1/null + B0/null/BH [H0#BH & H1#BH] -> H0/H1/BH
        } else if (H0 != BH && H1 != BH) {
            fabs.push(H0);
            fabs.push(H1);
            fabs.push(BH);
        }
    //cas H0/null/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    } else if (mon1.length == 2 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1]==true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/null/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        } else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
    //cas H0/H1/HH + B0/null/BH [H0=BH | HH=BH] -> H0/B0/HH
    } else if (mon1.length == 3 && mon2.length == 2 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == true) {
        if (H0 == BH || HH == BH) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/H1/HH + B0/null/BH [H0#BH & HH#BH] -> H0/BH/HH
        } else if (H0 != BH && HH != BH) {
            fabs.push(H0);
            fabs.push(BH);
            fabs.push(HH);
        }
    //cas H0/null/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    } else if (mon1.length == 1 && mon2.length == 3 && mon1[0][1] == false  && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && H0 != BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
    //cas H0/null/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        } else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
    //cas H0/null/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        } else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
    //cas H0/H1/null + B0/B1/BH [H0#B1 & H0#BH] -> H0/B1/BH
    } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 == B1 || H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(BH);
    //cas H0/H1/null + B0/B1/BH [H0=B1] -> H0/B0/BH
        } else if (H0 == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(BH);
    //cas H0/H1/null + B0/B1/BH [H0=BH] -> H0/B1/B0
        } else if (H0 == BH) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(B0);
        }
    //cas H0/null/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    } else if (mon1.length == 2 && mon2.length == 3 && mon1[0][1]==false && mon1[1][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0!=B1 && HH!=B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
    //cas H0/null/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        } else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/null/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        } else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
    //cas H0/H1/HH + B0/B1/BH [H0#B1 & HH#B1] -> H0/B1/HH
    } else if (mon1.length == 3 && mon2.length == 3 && mon1[0][1] == false && mon1[1][1] == false && mon1[2][1] == true && mon2[0][1] == false && mon2[1][1] == false && mon2[2][1] == true) {
        if (H0 != B1 && HH != B1) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
    //cas H0/H1/HH + B0/B1/BH [H0=B1 | HH=B1] -> H0/B0/HH
        } else if (H0 == B1 || HH == B1) {
            fabs.push(H0);
            fabs.push(B0);
            fabs.push(HH);
    //cas H0/H1/HH + B0/B1/BH [H0=B0 | HH=B0] -> H0/B1/HH
        } else if (H0 == B0 || HH == B0) {
            fabs.push(H0);
            fabs.push(B1);
            fabs.push(HH);
        }
    }
	return fabs
}


//Type fusion function
function fusType(mon1, mon2) {
    var fmon = []

    //cas H0/null + B0/null [H0#B0] -> H0/B0
    if (mon1.length == 1 && mon2.length == 1) {
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0])

    //cas H0/null + B0/null [H0=B0] -> H0/null
        } else {
            fmon.push(mon1[0]);
        }
    } else if (mon1.length == 2 && mon2.length == 1) {

    //cas H0/H1 + B0/null [H0#B0] -> H0/B0
        if (mon1[0] != mon2[0]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);

    // Exception:
    // The body will provide its primary type
    // instead of the secondary
    // if the head is already providing that element.

    //cas H0/H1 + B0/null [H0=B0] -> H0
        } else {
            fmon.push(mon1[0]);
        }
    } else if (mon1.length == 1 && mon2.length == 2) {

    //cas H0/null + B0/B1 [H0#B1] -> H0/B1
        if (mon1[0] != mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);

    //cas H0/null + B0/B1 [H0=B1] -> H0/B0
        } else {
            fmon.push(mon1[0])
            fmon.push(mon2[0]);
        }

    //cas H0/H1 + B0/B1 [H0=B1] -> H0/B0
    } else if (mon1.length == 2 && mon2.length == 2) {
        if (mon1[0] == mon2[1]) {
            fmon.push(mon1[0]);
            fmon.push(mon2[0]);

    //cas H0/H1 + B0/B1 [H0#B1] -> H0/B1
        } else {
            fmon.push(mon1[0]);
            fmon.push(mon2[1]);
        }
    }
    return fmon
}


function isMissingNames(mon1, mon2){
    return (mon1 == "" || mon1.length == 0 || mon1 == null) || (mon2 == "" || mon2.length == 0 || mon2 == null)
}
