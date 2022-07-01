let tituloQuizz = document.querySelector(".tituloQuizz");
let urlQuizz = document.querySelector(".url-quizz");
let quantidadePerguntas = document.querySelector(".quantidade-perguntas");
let quantidadeNiveis = document.querySelector(".quantidade-niveis");

function proseguirParaCriar() {
    tituloQuizz = tituloQuizz.innerHTML
    if (
        tituloQuizz ||
        urlQuizz ||
        quantidadePerguntas ||
        quantidadeNiveis !== ""
    ) {
        console.log(tituloQuizz);
        console.log(urlQuizz);
        console.log(quantidadePerguntas);
        console.log(quantidadeNiveis);
    } else {
        console.log("tudo ok");
    }
}



//localStorage.setItem(`quizzProprio${localStorage.length}`,quizzCriado.id); 
localStorage.getItem("id");
localStorage.removeItem("id");
let servidor = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizz = [];
let quizzID;
let quizzAtivo = [];
const body = document.querySelector("body");
let embaralhamento = [];
let numeroRespostas;


let promise = axios.get(servidor);
promise.then((resposta) => {
    todosQuizz = resposta.data;
    telaInicial();
})
promise.catch((erro) => console.log(erro));


function telaCriarQuizz() {
    document.querySelector('.main').innerHTML = `
tela de criação de um quizz
`
}

function pegarQuizz(element) {
    quizzID = element.querySelector('.todos .quizz img').alt
    promise = axios.get(`${servidor}/${quizzID}`);
    promise.then((resposta) => {
        quizzAtivo = resposta.data;
        telaQuizz();
    })
    promise.catch((erro) => console.log(erro));
}

function telaQuizz() {
    body.innerHTML = `
    <div class="top-bar">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="tema">
        <img src="${quizzAtivo.image}"
        alt="">
        <h2>${quizzAtivo.title}</h2>
    </div>
    
    <div class="main">
        <div class="telaQuizz">
        </div>
    </div>`
    inserirPergunta();
}

function inserirPergunta() {
    for (let i = 0; i < quizzAtivo.questions.length; i++) {
        document.querySelector('.telaQuizz').innerHTML += `
        <div class="quizz-quadro p${i + 1}">
            <div class="topo-quizz p${i + 1}">
                <span>${quizzAtivo.questions[i].title}</span>
            </div>
            <div class="perguntas-img p${i + 1}">
            </div>
        </div>`
        for (const element of quizzAtivo.questions[i].answers) {
            embaralhamento.push(`
                <div class="resposta">
                    <img src="${element.image}" alt="">
                    <p>${element.text}</p>
                </div>`);
        }
        embaralhamento.sort(aleatorio);
        for (const element of embaralhamento) {
            document.querySelector(`.perguntas-img.p${i + 1}`).innerHTML += element;
        }
        embaralhamento = [];
    }
}

function aleatorio() {
    return Math.random() - 0.5;
}

/* PRECISA SER FINALIZADO
if (numeroRespostas === quizzAtivo.questions.length) {
    "conferir numero de acertos vs niveis e determinar qual exibir"
    mostrarResultado();
}

function mostrarResultado() {
    body.innerHTML += `
    <div class="resultado">
        <div class="topo-resultado">
            <span>88% de acerto: ${quizzAtivo.levels[0].title}</span>
        </div>

        <div class="resultado-msg">
            <div>
                <img src="${quizzAtivo.levels[0].image}" alt="">
            </div>

            <h3>${quizzAtivo.levels[0].text}</h3>

        </div>
    </div>

    <div class="home">
        <button>Reiniciar Quizz</button>
        <button onclick="telaInicial()">Voltar pra home</button>
    </div>`
} */

function telaInicial() {
    if (localStorage.length === 0) {
        body.innerHTML = `
    <div class="top-bar">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="main">
        <div class="homepage">
            <div class="container-vazio">
                <h3>Você não criou nenhum <br> quizz ainda :(</h3>
                <button onclick="telaCriarQuizz()">Criar Quizz</button>
            </div>

            <div class="container todos">
                <div class="titulo">
                    <h2>Todos os Quizzes</h2>
                </div>
                <div class="container-quizz todos">
                </div >
            </div>
        </div >
    </div >`
    } else {
        //quizzesProprios();
        body.innerHTML = `
    <div class="top-bar">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="main">
        <div class="homepage">
            <div class="container proprio">
                <div class="titulo">
                    <h2>Seus Quizzes</h2>
                    <ion-icon name="add-circle" onclick="telaCriarQuizz()"></ion-icon>
                </div>
                <div class="container-quizz proprio">
                </div>
            </div>

            <div class="container todos">
                <div class="titulo">
                    <h2>Todos os Quizzes</h2>
                </div>
                <div class="container-quizz todos">
                </div >
            </div>
        </div >
    </div >`
    }
    todosQuizzes();
}

function quizzesProprios() {
    for (let i = 0; i < localStorage.length; i++) {
        for (let j = 0; j < todosQuizz.length; j++) {
            if (localStorage[i] === todosQuizz[j].id) {
                document.querySelector('.container-quizz.proprio').innerHTML += `
                <div class="quizz" onclick="pegarQuizz(this)">
                <img src="${todosQuizz[j].image}" alt="${todosQuizz[j].id}"/>
                <h4>${todosQuizz[j].title}</h4>
                </div>`
            }
        }
    }
}

function todosQuizzes() {
    for (const element of todosQuizz) {
        document.querySelector('.container-quizz.todos').innerHTML += `
            <div class="quizz" onclick="pegarQuizz(this)">
            <img src="${element.image}" alt="${element.id}"/>
            <h4>${element.title}</h4>
            </div>`
    }
}