let servidor = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizz = [];
let quizzID;
let quizzAtivo = [];
const body = document.querySelector("body");
let embaralhamento = [];
let numeroPerguntas;
let contadorRespondidas;
let contadorAcertos;


let promise = axios.get(servidor);
promise.then((resposta) => {
    todosQuizz = resposta.data;
    telaInicial();
})
promise.catch((erro) => console.log(erro));


function telaCriarQuizz() {
    body.innerHTML = `
    <div class="top-bar">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="main">
        <div class="desktop-8">
            <div>
                <h2>Comece pelo começo</h2>
                <div class="criando-quizz">
                    <input class="titulo-quizz" placeholder="Título do seu quizz" type="">
                    <input class="url-quizz" placeholder="URL da imagem do seu quizz" type="">
                    <input class="quantidade-perguntas" placeholder="Quantidade de perguntas do quizz" type="">
                    <input class="quantidade-niveis" placeholder="Quantidade de níveis do quizz" type="">
                </div>
            </div>

            <button onclick="criarPerguntas()">
                Prosseguir pra criar perguntas
            </button>
        </div>
    </div>`
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
    numeroPerguntas = quizzAtivo.questions.length;
    bubbleSort(quizzAtivo.levels);
    body.innerHTML = `
    <div class="top-bar">
        <h1>BuzzQuizz</h1>
    </div>
    
    <div class="main">
        <div class="tema">
            <img src="${quizzAtivo.image}"alt="">
            <div class="degrade"></div>
            <h2>${quizzAtivo.title}</h2>
        </div>
            <div class="telaQuizz">
            </div>
    </div>`
    inserirPergunta();
    document.querySelector('.main').scrollIntoView();
    contadorRespondidas = 0;
    contadorAcertos = 0;
}

/* function inserirPergunta() {
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
                <div class="resposta ${element.isCorrectAnswer}" onclick="conferirResposta()">
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
} */

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
                <div class="resposta p${i + 1} ${element.isCorrectAnswer}" onclick="conferirResposta(this)">
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

function conferirResposta(resposta) {
    if (!resposta.classList.contains('revelada')) {
        console.log('conferi')
        resposta.classList.add('escolhida');
        resposta.classList.add('revelada');
        contadorRespondidas += 1;
        if (resposta.classList.contains(true)) {
            contadorAcertos += 1;
        }
        let paiTemp = resposta.parentNode
        let respTemp = paiTemp.children;
        for (const element of respTemp) {
            if (!element.classList.contains('escolhida')) {
                element.classList.add('ocultada')
                element.classList.add('revelada')
            }
        }
        if (contadorRespondidas < numeroPerguntas) {
            setTimeout(scrollResposta, 2000);
        }
        mostrarResultado();
    }
}


function scrollResposta() {
    document.querySelector(`.quizz-quadro.p${contadorRespondidas + 1}`).scrollIntoView({ block: "center", behavior: "smooth" })
}

function aleatorio() {
    return Math.random() - 0.5;
}

function bubbleSort(items) {
    let length = items.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < (length - i - 1); j++) {
            if (items[j].minValue >= items[j + 1].minValue) {
                let tmp = items[j];
                items[j] = items[j + 1];
                items[j + 1] = tmp;
            }
        }
    }
}

function mostrarResultado() {
    if (contadorRespondidas === numeroPerguntas) {
        let resultado = ((contadorAcertos / numeroPerguntas) * 100).toFixed(0);
        if (resultado >= Number(quizzAtivo.levels[quizzAtivo.levels.length - 1].minValue)) {
            document.querySelector('.telaQuizz').innerHTML += `
                <div class="resultado">
                    <div class="topo-resultado">
                        <span>${resultado}% de acerto: ${quizzAtivo.levels[quizzAtivo.levels.length - 1].title}</span>
                    </div>

                    <div class="resultado-msg">
                        <img src="${quizzAtivo.levels[quizzAtivo.levels.length - 1].image}" alt="">
                        <h3>${quizzAtivo.levels[quizzAtivo.levels.length - 1].text}</h3>
                    </div>
                </div>

                <div class="home">
                    <button onclick="telaQuizz()">Reiniciar Quizz</button>
                    <button onclick="telaInicial()">Voltar pra home</button>
                </div>`
        } else {
            for (let i = 0; i < quizzAtivo.levels.length; i++) {
                if (resultado >= quizzAtivo.levels[i].minValue && resultado < quizzAtivo.levels[i + 1].minValue) {
                    document.querySelector('.telaQuizz').innerHTML += `
                 <div class="resultado">
                     <div class="topo-resultado">
                         <span>${resultado}% de acerto: ${quizzAtivo.levels[i].title}</span>
                     </div>

                     <div class="resultado-msg">
                         <img src="${quizzAtivo.levels[i].image}" alt="">
                         <h3>${quizzAtivo.levels[i].text}</h3>
                     </div>
                 </div>

                 <div class="home">
                     <button onclick="telaQuizz()">Reiniciar Quizz</button>
                     <button onclick="telaInicial()">Voltar pra home</button>
                 </div>`
                }
            }
        }
        setTimeout(scrollResultado, 2000);
    }
}

function scrollResultado() {
    document.querySelector('.resultado').scrollIntoView({ block: "center", behavior: "smooth" })
}

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
        quizzesProprios();
    }
    todosQuizzes();
    document.querySelector('.main').scrollIntoView();
}

function quizzesProprios() {
    console.log('function ok')
    for (let i = 0; i < localStorage.length; i++) {
        console.log('iteração localStorage ok')
        for (const element2 of todosQuizz) {
            console.log('iteração todosQuizz ok')
            if (Number(localStorage.getItem(i)) === element2.id) {
                console.log('não tá entrando aqui')
                document.querySelector('.container-quizz.proprio').innerHTML += `
                <div class="quizz" onclick="pegarQuizz(this)">
                    <img src="${element2.image}" alt="${element2.id}"/>
                    <div class="degrade"></div>
                    <h4>${element2.title}</h4>
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
                <div class="degrade"></div>
                <h4>${element.title}</h4>
            </div>`
    }
}