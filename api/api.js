import { ids } from '../script/infiniteFusionData.js';
const INDEX_MAX = ids.length;
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
let ANALYZED = 0;
const content = document.getElementById('results');
const loading = document.getElementById('loading');
const checker_btn = document.getElementById('checker');
loading.style.color = 'orange';
checker_btn.addEventListener('click', function () {
    startAPICheck();
});
function startAPICheck() {
    loading.innerHTML = '0%';
    for (var i = 0; i < INDEX_MAX; i++) {
        let element = ids[i][0].toString().toLowerCase();
        const url_A = BASE_URL + element;
        const url_B = BASE_URL + element + '/';
        urlExists(url_A, someCallback);
        urlExists(url_B, someCallback);
    }
}
async function urlExists(url, callback) {
    const response = await fetch(url)
        .then((r) => r)
        .catch((e) => console.log(e));
    // @ts-ignore
    if (response.ok) {
        callback(url, true);
    }
    else {
        callback(url, false);
    }
}
function someCallback(url, isSuccess) {
    const new_span = document.createElement('span');
    if (isSuccess) {
        new_span.innerHTML = '[ OK ] ' + url;
        new_span.style.color = 'lightgreen';
    }
    else {
        new_span.innerText = '[ ER ] ' + url;
        new_span.style.color = 'lightcoral';
    }
    content.appendChild(new_span);
    ANALYZED++;
    let progress = parseFloat(((100 * ANALYZED) / (INDEX_MAX * 2)).toFixed(2));
    let text = progress + ' %';
    document.getElementById('loading').innerHTML = text;
    if (progress == 100) {
        document.getElementById('loading').style.color = 'green';
    }
}
