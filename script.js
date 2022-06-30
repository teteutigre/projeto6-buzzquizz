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
let servidor = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let todosQuizz = [];
let quizzID;


const promise = axios.get(servidor);
promise.then((resposta) => {
    todosQuizz = resposta.data;
    console.log(resposta.data);
    telaInicial();
})
promise.catch((erro) => console.log(erro));


function telaCriarQuizz() {
    document.querySelector('.main').innerHTML = `
tela de criação de um quizz
`
}

function pegarQuizz() {
    quizzID = element.data.id;
    const promise = axios.get(`${servidor}/${idQuizz}`);
    promise.then((resposta) => {
        console.log(resposta.data);
        telaQuizz();
    })
    promise.catch((erro) => console.log(erro));
}

function telaQuizz() {
    document.querySelector('.main').innerHTML = `
tela do quizz selecionado
    `
}

function telaInicial() {
    let main = document.querySelector('.main');
    main.innerHTML = `
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
    </div >`
    todosQuizzes();
}

function todosQuizzes() {
    for (let i = 0; i < todosQuizz.length; i++) {
        document.querySelector('.container-quizz.todos').innerHTML += `
            <div class="quizz" onclick="pegarQuizz(this)">
            <img src="${todosQuizz[i].image}" alt="quizz${i + 1}">
            <h4>${todosQuizz[i].title}</h4>
            </div>`
    }
}

