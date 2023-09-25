// endereços de requisição.
const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

//variáveis globais
let home = document.querySelector("#home");
let containerPesquisa = document.querySelector(".search-container");
let inputPesquisar = document.querySelector("#search");
let iconePesquisar = document.querySelector("#lupa");
let idsFilmes = [];
let idsSeries = [];


function mostrarBarraPesquisa(){
    containerPesquisa.style.border = "1px solid white" // borda branca
    inputPesquisar.style.width = "25rem" //tamanho do input
    inputPesquisar.focus()
}

function esconderBarraPesquisa(){
        containerPesquisa.style.border = "none";
        inputPesquisar.style.width = "0";
    
}

iconePesquisar.addEventListener("click", mostrarBarraPesquisa)

inputPesquisar.addEventListener("focusout", esconderBarraPesquisa)



async function obterFilmes(params){
    console.log(params);

    try {
        let data = [];
        for (let i = 1; i < 4; i++) {
            let response = await fetch(`${BASE_URL}movie/${params}?${API_KEY}&${language}&page=${i}`);

            response = await response.json();  
            data.push(...response.results);
            response.results.forEach(movie => idsFilmes.push(movie.id));
        }
        
        return data;
    } catch (e) {
        throw new Error (e.message); 
    }
}

async function obterSeries(params){
    try {
        let data = [];

        for (let i = 1; i < 4; i++){
            let response = await fetch(`${BASE_URL}tv/${params}?${API_KEY}&${language}&page=${i}`)
            response = await response.json();
            data.push(...response.results);

            response.results.forEach(tvSerie => idsSeries.push(tvSerie.id));
        }

        return data ;
        
    } catch (error) {

        throw new Error (e.message); 
    }

}

async function obterUmFilme (id){
    try {
        let response = await fetch(`${BASE_URL}movie/${id}?${API_KEY}&${language}`)

        let data = await response.json()

        return data
    }
    catch (e) {
        throw new Error(e.message);   
    }

}

async function obterUmaSerie(id){
    try {

         let response = await fetch(`${BASE_URL}tv/${id}?${API_KEY}&${language}`)
      
         let data = await response.json() 
         return data
 
    } 
    catch (e) {
         throw new Error(e.message); 
    }
 
}

async function posterPrincipalAleatorio(){
    let numRandom = Math.floor(Math.random()* 30)
    let filmeOuSerie = Math.floor(Math.random()*10)%2==0
    let element

    if (filmeOuSerie) {
        element = await obterUmFilme(idsFilmes[numRandom]);

        home.innerHTML = `
        <div class="poster-container">
           <div class="poster-infos">
                <h4>Filme</h4>
                <h1>${element.title}</h1>
                <p>${element.overview}</p>
            </div>
        </div>
        <img src=${IMG_URL + element.backdrop_path} alt="${element.title} poster" />
        `   
        
        return;
    }
    else{
        element= await obterUmaSerie(idsSeries[numRandom])

        home.innerHTML =`
        <div class="poster-container">
            <div class= "poster-infos">
                <h4>Série</h4>
                <h1>${element.name}</h1>
                <p>${element.overview}</p>
            </div>
        </div>
        <img src=${IMG_URL + element.backdrop_path} alt="${element.name} poster"/>`       
    }

    

}


async function montarCarrossel(params, serie = false) {
    let list = serie ? await obterSeries(params) : await obterFilmes(params);

    for (let item of list) {

        document.querySelector(`.${serie ? params + "_tv" : params}`).innerHTML += `
        <img src=${IMG_URL + item.poster_path} />
        <div class="informations-modal">
            <img src=${IMG_URL + item.backdrop_path} alt="${serie ? item.name : item.title}"/>
            <div>
                <!-- Conteúdo adicional do modal -->
            </div>
        </div>
        `
    }
}

async function chamarFuncoesAPI() {
    await montarCarrossel("popular");
    await montarCarrossel("top_rated");
    await montarCarrossel("upcoming");
 
    await montarCarrossel("popular", true);
    await montarCarrossel("top_rated", true);

    await posterPrincipalAleatorio();
}

chamarFuncoesAPI();







