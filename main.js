// endereços de requisição.
const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

//variáveis globais

//elementos do HTML
let home = document.querySelector("#home");
let popularCarousel = document.querySelector(".popular");
let movieContainer = document.querySelector(".movie");
let searchContainer = document.querySelector(".search-container");
let searchInput = document.querySelector("#search");
// variáveis para armazenamento das respostas da API
let moviesIds = [];
let tvSeriesIds = [];

//função exibir barra de pesquisa
function showSearch(){
    searchContainer.style.border = "1px solid white" // borda branca
    searchInput.style.width = "25rem" //tamanho do input
}

function hideSearch(e){
    searchContainer.style.border = "none"
    searchInput.style.width = "0"
}

//incovação para apagar a barra de pesquisa
document.addEventListener("mouseup", hideSearch)



//função para restatar filmes com base nos parâmetros
async function getMovies(params){
    console.log(params);

    try {
        //armazena os dados dos filmes
        let data = []

        for ( let i =1; i<4; i++){
            let response = await fetch(`${BASE_URL}movie/${params}?${API_KEY}&${language}&page=${i}`)

            //converte em formato json
            response = await response.json();
            //separa os itens de cada elemento incluindo eles como itens individuais
            data.push(...response.results);
        }

        //retorna o array com 60 filmes obtidos da API
        return data ;
        
    } catch (error) {
        //lança um erro em casao de falha na obtenção dos filmes
        throw new Error (e.message); 
    }

}

//função para obter os dados de séries de tv
async function getTvSeries(params){
    console.log(params);

    try {
        //armazena os dados dos filmes
        let data = []

        for ( let i =1; i<4; i++){
            let response = await fetch(`${BASE_URL}tv/${params}?${API_KEY}&${language}&page=${i}`)

            //converte em formato json
            response = await response.json();
            //separa os itens de cada elemento incluindo eles como itens individuais
            data.push(...response.results);
        }

        //retorna o array com 60 séries de tv obtidas da API
        return data ;
        
    } catch (error) {
        //lança um erro em casao de falha na obtenção das séries
        throw new Error (e.message); 
    }

}

//função para obter um filme específico com base no id
async function getMovie (id){
   try {
        //requisição para informações de um filme com base no id
        let response = await fetch(`${BASE_URL + "movie/" + id + "?" + API_KEY}&${language}`)

        //conversão da resposta dos dados do filme para json
        let data = await response.json()

        //retorno dos dados do filme
        return data

   } catch (error) {
        throw new Error(e.message); /// lança um erro em caso de falha na comunicação com a API  
   }

}


//função para obter uma série específica com base no id
async function getTvSerie(id){
    try {
         //requisição para informações da série com base no id
         let response = await fetch(`${BASE_URL + "tv/" + id + "?" + API_KEY}&${language}`)
 
         //conversão da resposta dos dados da série para json
         let data = await response.json()
 
         //retorno dos dados da série 
         return data
 
    } catch (error) {
         throw new Error(e.message); /// lança um erro em caso de falha na comunicação com a API  
    }
 
}


async function getRandomPoster(){

    let random = Math.floor(Math.random()*30)
    let movieOrPoster= Math.floor(Math.random()*5)>2;

    let element 

    if (movieOrPoster) {
        element = await getMovie(moviesIds[random]);

        home.innerHTML= `
        <div class='poster-container'>
           <div class= 'poster-infos'>
                <h4>Filme</h4>
                <h1> ${element.title}</h1>
                <p> ${element.overview}</p>
            </div>
        </div>
        <img src= ${IMG_URL + element.backdrop_path} alt="${element.title} poster"/>
        `   

        
        return;
    }

    element= await getTvSerie(tvSeriesIds[random])

    home.innerHTML =`
    <div class='poster-container'>
        <div class= 'poster-infos'>
            <h4>Série</h4>
            <h1> ${element.name}</h1>
            <p> ${element.overview}</p>
        </div>
    </div>
    <img src= ${IMG_URL + element.backdrop_path} alt="${element.name} poster"/>
    
    `     

}


async function getCarousel(params, is_tv=false){
    let list = is_tv ? await getTvSeries(params) : await getMovies(params)

    for (let item of list){

        document.querySelector(`.${is_tv? params + "_tv":params}`).innerHTML +=`
        <img src= ${IMG_URL + item.poster_path}/>
        <div class="information-modal">
            <img src=${IMG_URL + item.backdrop_path} alt="${is_tv? item.name: item.title}"/>
            <div>
                <!-- conteúdo adicional do modal -->
            </div>
        </div>`
    }
}


async function callApiFunctions(){
    
    // chamada para filmes
    await getCarousel("popular")
    await getCarousel("top_rated")
    await getCarousel("upcoming")


    //chamada para séries

    await getCarousel("popular", true)
    await getCarousel("top_rated", true)

    await getRandomPoster();
}

callApiFunctions();







