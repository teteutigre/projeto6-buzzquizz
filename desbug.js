let API = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let todosQuizz = [];

const promise = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);

promise.then((elemento) => {
  console.log(elemento);
});

promise.catch(obterQuizzNOK);

function obterQuizzNOK(erro) {
  console.log(erro);
}

function telaCriarQuizz() {
  document.querySelector(".main").innerHTML = `
tela de criação de um quizz
`;
}

function telaQuizz() {
  document.querySelector(".main").innerHTML = `
tela do quizz selecionado
    `;
}

function formatarQuizz() {
  for (let i = 0; i < todosQuizz.length; i++) {
    document.querySelector(".main").innerHTML += `
        <div class="quizz" onclick="telaQuizz(this)">
        <img src="${todosQuizz[i].image}" alt="quizz${i + 1}">
            <h4>${todosQuizz[i].title}</h4>
    </div>`;
  }
}

function telaInicial() {
  document.querySelector(".main").innerHTML = `
    <div class="main">
    <div class="homepage">
    <div class="container-proprio">
        <div class="titulo">
            <h2>Seus Quizzes</h2>
            <ion-icon name="add-circle" onclick="telaCriarQuizz()"></ion-icon>
        </div>
        <div class="container-quizz">
            <div class="quizz" onclick="telaQuizz(this)" onclick="telaQuizz(this)">
                <img src="./images/teste1.png" alt="quizz1" />
                <h4>O quão Potterhead é você?</h4>
            </div>
            <div class="quizz" onclick="telaQuizz(this)">
                <img src="./images/teste1.png" alt="quizz2">
                <h4>O quão Potterhead é você?</h4>
            </div>
        </div>
    </div>
    <div class="container-vazio">
        <h3>Você não criou nenhum <br> quizz ainda :(</h3>
        <button onclick="telaCriarQuizz()">Criar Quizz</button>
    </div>
    <div class="container-todos">
        <div class="titulo">
            <h2>Todos os Quizzes</h2>
        </div>
        <div class="container-quizz">`;

  formatarQuizz;
  document.querySelector(".main").innerHTML += `</div >
    </div >
</div>
</div>`;
}
