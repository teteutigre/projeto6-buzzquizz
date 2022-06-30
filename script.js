const tituloQuizz = document.querySelector(".tituloQuizz");
const urlQuizz = document.querySelector(".url-quizz");
const quantidadePerguntas = document.querySelector(".quantidade-perguntas");
const quantidadeNiveis = document.querySelector(".quantidade-niveis");

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


// localStorage.setItem("id", "user");
// const user = getItem("id");
// localStorage.removeItem("id");
let servidor = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizz = [];
let quizzID;
let quizzAtivo;
const body = document.querySelector("body");


const promise = axios.get(servidor);
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
    quizzID = element.querySelector('.todos .quizz img').alt // element.data.id; pegar ID do quizz clicado
    const promise = axios.get(`${servidor}/${quizzID}`);
    promise.then((resposta) => {
        quizzAtivo = resposta.data;
        console.log(resposta.data);
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
            <div class="quizz-quadro">
                <div class="topo-quizz-1">
                    <span>${quizzAtivo.questions[0].title}</span>
                </div>
                <div class="perguntas-img">
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[0].answers[0].image}" alt="">
                        <p>${quizzAtivo.questions[0].answers[0].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[0].answers[1].image}" alt="">
                        <p>${quizzAtivo.questions[0].answers[1].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[0].answers[2].image}" alt="">
                        <p>${quizzAtivo.questions[0].answers[2].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[0].answers[3].image}" alt="">
                        <p>${quizzAtivo.questions[0].answers[3].text}</p>
                    </div>
                </div>
            </div>

            <div class="quizz-quadro">
                <div class="topo-quizz-2">
                    <span>${quizzAtivo.questions[2].title}</span>
                </div>
                <div class="perguntas-img">
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[1].answers[0].image}" alt="">
                        <p>${quizzAtivo.questions[1].answers[0].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[1].answers[1].image}" alt="">
                        <p>${quizzAtivo.questions[1].answers[1].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[1].answers[2].image}" alt="">
                        <p>${quizzAtivo.questions[1].answers[2].text}</p>
                    </div>
                    <div class="resposta">
                        <img src="${quizzAtivo.questions[1].answers[3].image}" alt="">
                        <p>${quizzAtivo.questions[1].answers[3].text}</p>
                    </div>
                </div>
            </div>

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
                <p>Voltar pra home</p>
            </div>
        </div>
    </div>`
}

function telaInicial() {
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
                    <div class="quizz" onclick="pegarQuizz(this)" onclick="telaQuizz(this)">
                        <img src="./images/teste1.png" alt="quizz1" />
                        <h4>O quão Potterhead é você?</h4>
                    </div>
                    <div class="quizz" onclick="pegarQuizz(this)">
                        <img src="./images/teste1.png" alt="quizz2">
                        <h4>O quão Potterhead é você?</h4>
                    </div>
                    <div class="quizz" onclick="pegarQuizz(this)">
                        <img src="./images/teste1.png" alt="quizz2">
                        <h4>O quão Potterhead é você?</h4>
                    </div>
                </div>
            </div>


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
    todosQuizzes();
}

function todosQuizzes() {
    for (const element of todosQuizz) {
        document.querySelector('.container-quizz.todos').innerHTML += `
            <div class="quizz" onclick="pegarQuizz(this)">
            <img src="${element.image}" alt="${element.id}">
            <h4>${element.title}</h4>
            </div>`
    }
}

