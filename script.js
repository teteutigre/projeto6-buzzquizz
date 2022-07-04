let servidor = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let todosQuizz = [];
let quizzAtivo = [];
let quizzID;
let quizzesProprios = [];
let storage = [];
let embaralhamento = [];
let numeroPerguntas;
let contadorRespondidas;
let contadorAcertos;
let promise;

promise = axios.get(servidor);
promise.then((resposta) => {
  todosQuizz = resposta.data;
  telaInicial();
});
promise.catch((erro) => console.log(erro));

let quizzProprioID = JSON.parse(localStorage.getItem("id"));
for (const elementProprio of quizzProprioID) {
    promise = axios.get(`${servidor}/${elementProprio}`);
    promise.then((resposta) => {
        quizzesProprios.push(resposta.data);
    })
    promise.catch((erro) => {
        console.log(erro);
        window.location.reload();
    })
}

function telaCriarQuizz() {
  document.querySelector("body").innerHTML = `
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
    </div>`;
}

function pegarQuizz(element) {
  quizzID = element.querySelector(".quizz img").alt;
  promise = axios.get(`${servidor}/${quizzID}`);
  promise.then((resposta) => {
    quizzAtivo = resposta.data;
    telaQuizz();
  });
  promise.catch((erro) => console.log(erro));
}

function telaQuizz() {
  numeroPerguntas = quizzAtivo.questions.length;
  bubbleSort(quizzAtivo.levels);
  document.querySelector("body").innerHTML = `
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
    </div>`;
  inserirPergunta();
  document.querySelector(".main").scrollIntoView();
  contadorRespondidas = 0;
  contadorAcertos = 0;
}

function inserirPergunta() {
  for (let i = 0; i < quizzAtivo.questions.length; i++) {
    document.querySelector(".telaQuizz").innerHTML += `
        <div class="quizz-quadro p${i + 1}">
            <div class="topo-quizz p${i + 1}" style="background-color: ${
      quizzAtivo.questions[i].color
    }">
                <span>${quizzAtivo.questions[i].title}</span>
            </div>
            <div class="perguntas-img p${i + 1}">
            </div>
        </div>`;
    for (const element of quizzAtivo.questions[i].answers) {
      embaralhamento.push(`
                <div class="resposta p${i + 1} ${
        element.isCorrectAnswer
      }" onclick="conferirResposta(this)">
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
  if (!resposta.classList.contains("revelada")) {
    resposta.classList.add("escolhida");
    resposta.classList.add("revelada");
    contadorRespondidas += 1;
    if (resposta.classList.contains(true)) {
      contadorAcertos += 1;
    }
    let paiTemp = resposta.parentNode;
    let respTemp = paiTemp.children;
    for (const element of respTemp) {
      if (!element.classList.contains("escolhida")) {
        element.classList.add("ocultada");
        element.classList.add("revelada");
      }
    }
    if (contadorRespondidas < numeroPerguntas) {
      setTimeout(scrollResposta, 2000);
    }
    mostrarResultado();
  }
}

function scrollResposta() {
  document
    .querySelector(`.quizz-quadro.p${contadorRespondidas + 1}`)
    .scrollIntoView({ block: "center", behavior: "smooth" });
}

function aleatorio() {
  return Math.random() - 0.5;
}

function bubbleSort(items) {
  let length = items.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
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
    if (
      resultado >=
      Number(quizzAtivo.levels[quizzAtivo.levels.length - 1].minValue)
    ) {
      document.querySelector(".telaQuizz").innerHTML += `
                <div class="resultado">
                    <div class="topo-resultado">
                        <span>${resultado}% de acerto: ${
        quizzAtivo.levels[quizzAtivo.levels.length - 1].title
      }</span>
                    </div>

                    <div class="resultado-msg">
                        <img src="${
                          quizzAtivo.levels[quizzAtivo.levels.length - 1].image
                        }" alt="">
                        <h3>${
                          quizzAtivo.levels[quizzAtivo.levels.length - 1].text
                        }</h3>
                    </div>
                </div>

                <div class="home">
                    <button onclick="telaQuizz()">Reiniciar Quizz</button>
                    <button onclick="telaInicial()">Voltar pra home</button>
                </div>`;
    } else {
      for (let i = 0; i < quizzAtivo.levels.length; i++) {
        if (
          resultado >= quizzAtivo.levels[i].minValue &&
          resultado < quizzAtivo.levels[i + 1].minValue
        ) {
          document.querySelector(".telaQuizz").innerHTML += `
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
                 </div>`;
        }
      }
    }
    setTimeout(scrollResultado, 2000);
  }
}

function scrollResultado() {
  document
    .querySelector(".resultado")
    .scrollIntoView({ block: "center", behavior: "smooth" });
}

function telaInicial() {
  if (localStorage.getItem("id") === null) {
    document.querySelector("body").innerHTML = `
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
    </div >`;
  } else {
    document.querySelector("body").innerHTML = `
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
        </div >`;
  }
  carregarQuizzes();
  document.querySelector(".main").scrollIntoView();
}

function carregarQuizzes() {
  if (quizzProprioID !== null) {
    for (const elementTodos of todosQuizz) {
      if (!quizzProprioID.includes(elementTodos.id)) {
        document.querySelector(".container-quizz.todos").innerHTML += `
                    <div class="quizz" onclick="pegarQuizz(this)">
                        <img src="${elementTodos.image}" alt="${elementTodos.id}"/>
                        <div class="degrade"></div>
                        <h4>${elementTodos.title}</h4>
                    </div>`;
      }
    }
    for (const elementProprio of quizzesProprios) {
      document.querySelector(".container-quizz.proprio").innerHTML += `
                <div class="quizz" onclick="pegarQuizz(this)">
                    <img src="${elementProprio.image}" alt="${elementProprio.id}"/>
                    <div class="degrade"></div>
                    <h4>${elementProprio.title}</h4>
                </div>`;
    }
  } else {
    for (const elementTodos of todosQuizz) {
      document.querySelector(".container-quizz.todos").innerHTML += `
                <div class="quizz" onclick="pegarQuizz(this)">
                    <img src="${elementTodos.image}" alt="${elementTodos.id}"/>
                    <div class="degrade"></div>
                    <h4>${elementTodos.title}</h4>
                </div>`;
    }
  }
}

//_____________________________________________________________________________________________
let tituloQuizz = document.querySelector(".titulo-quizz").value;
let urlQuizz = document.querySelector(".url-quizz").value;
let quantidadePerguntas = document.querySelector(".quantidade-perguntas").value;
let quantidadeNiveis = document.querySelector(".quantidade-niveis").value;
let i;

function imagem(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const quizzInformacoes = {};
function criarPerguntas() {
  tituloQuizz = document.querySelector(".titulo-quizz").value;
  urlQuizz = document.querySelector(".url-quizz").value;
  quantidadePerguntas = document.querySelector(".quantidade-perguntas").value;
  quantidadeNiveis = document.querySelector(".quantidade-niveis").value;

  if (tituloQuizz.length < 20) {
    alert("O mínimo são 20 caracteres");
  } else if (tituloQuizz.length > 65) {
    alert("O máximo são 65 caracteres");
  } else if (!imagem(urlQuizz) && !urlQuizz.includes("https://")) {
    alert("Coloque uma imagem em formato Url");
  } else if (Number(quantidadePerguntas) < 3) {
    alert("O mínimo são 3 perguntas");
  } else if (isNaN(quantidadePerguntas)) {
    alert("Quantidades de perguntas deve ser um numero");
  } else if (Number(quantidadeNiveis) < 2) {
    alert("O mínimo são 2 níveis");
  } else if (isNaN(quantidadeNiveis)) {
    alert("Quantidades de níveis deve ser um numero");
  } else {
    const add = document.querySelector(".gaveta-desktop-8");
    add.classList.add("escoder");

    quizzInformacoes.title = tituloQuizz;
    quizzInformacoes.image = urlQuizz;
    quizzInformacoes.questions = [];
    desktop9();
  }
}
function desktop9() {
  const desktop9 = document.querySelector("body");
  desktop9.innerHTML += `
    <div class="main">
      <div class="desktop-9">
        <h1>Crie suas perguntas</h1>
      </div>
    </div>`;

  for (i = 0; quantidadePerguntas > i; i++) {
    const addPerguntas = document.querySelector(".desktop-9");
    addPerguntas.innerHTML += `
            <div class="add-barra-de-cricao">
                <div class="pre-barra-de-criacao">
                    <p>Pergunta ${i + 1}</p>
                    <img onclick="barraDeCriacao(this)" src="/imgs/Vector.svg" alt="">
                </div>
            </div>`;
  }
  document.querySelector(
    ".desktop-9"
  ).innerHTML += `<button onclick="criarNiveis(this)">Prosseguir pra criar níveis</button>`;
}

/*                 desktop-8                          */

function barraDeCriacao(elemento) {
  const escoderElemento = elemento.parentNode;
  escoderElemento.classList.add("escoder");
  escoderElemento.classList.remove("pre-barra-de-criacao");

  const pegaElemento = elemento.parentNode.parentNode;

  const pegandoP = pegaElemento.querySelector("p").innerHTML;

  pegaElemento.innerHTML += `
            <div class="barra-de-criacao">
            <div class="formular-perguntas">
                <p>
                 Pergunta ${pegandoP.charAt(pegandoP.length - 1)}
                </p>
                <div>
                    <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
                    <input class="cor-pergunta" type="text" placeholder="Cor de fundo da pergunta">
                </div>
            </div>


            <div class="resposta-correta">
                <p>Resposta correta</p>
                <div>
                    <input class="reposta-correta-input" type="text" placeholder="Resposta correta">
                    <input class="url-rc-img" type="text" placeholder="URL da imagem">
                </div>

            </div>


            <div class="resposta-incorreta">
                <p>Respostas incorretas</p>
                <div>
                    <input class="reposta-incorreta-input" type="text" placeholder="Resposta incorreta 1">
                    <input class="url-ri-img" type="text" placeholder="URL da imagem 1">
                </div>

                <div>
                    <input class="reposta-incorreta-input2" type="text" placeholder="Resposta incorreta 2">
                    <input class="url-ri-img" type="text" placeholder="URL da imagem 2">
                </div>

                <div>
                    <input class="reposta-incorreta-input3" type="text" placeholder="Resposta incorreta 3">
                    <input class="url-ri-img" type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </div>`;
}

function criarNiveis(criarNiveis) {
  const percorrerPai = document.querySelectorAll(".barra-de-criacao");
  percorrerPai.forEach((element) => {
    const hexadecimal = /[0-9A-Fa-f]{6}/g;

    const inputsPerguntas = element
      .querySelector(".formular-perguntas")
      .querySelectorAll("input");

    const inputsCorreta = element
      .querySelector(".resposta-correta")
      .querySelectorAll("input");
    const inputsIncorretas = element
      .querySelector(".resposta-incorreta")
      .querySelectorAll("input");

    if (!inputsPerguntas[0] || inputsPerguntas[0].value.length < 20) {
      alert("O mínimo de uma pergunta são 20 caracteres");
    } else if (
      !inputsPerguntas[1] ||
      !hexadecimal.test(inputsPerguntas[1].value)
    ) {
      alert(`Digite uma cor em hexadecimal`);
    } else if (
      Number(inputsPerguntas[1].value) > 9 ||
      inputsPerguntas[1].value.length !== 7
    ) {
      alert("A cor deve ter no máximo 7 caracteres");
    } else if (!inputsCorreta[0].value) {
      alert("Cada pergunta tem que a ver 1 resposta certa");
    } else if (
      !imagem(inputsCorreta[1].value) &&
      !inputsCorreta[1].value.includes("https://")
    ) {
      alert(`Coloque uma imagem em formato Url na reposta certa`);
    } else {
      const questoes = {
        title: inputsPerguntas[0].value,
        color: inputsPerguntas[1].value,
        answers: [
          {
            text: inputsCorreta[0].value,
            image: inputsCorreta[1].value,
            isCorrectAnswer: true,
          },
        ],
      };
      let verificador = false;
      inputsIncorretas.forEach((element, indice, array) => {
        if (indice % 2 === 0) {
          if (element.value) {
            verificador = true;
            if (!array[indice + 1].value) {
              alert("insira uma imagem");
            } else if (!array[indice + 1].value.includes("https://")) {
              alert(`Coloque uma imagem em formato Url na reposta incorreta`);
            }
          }
        } else {
          if (element.value && !array[indice - 1].value) {
            alert("Coloque um nome na reposta");
          }
        }
      });
      if (!verificador) {
        alert("tem que a ver pelo menos 1 reposta errada");
        return;
      } else {
        let objIncorreto = {};
        inputsIncorretas.forEach((element, indice) => {
          if (indice % 2 === 0 && element.value) {
            objIncorreto = {
              text: element.value,
              isCorrectAnswer: false,
            };
          } else if (indice % 2 === 1 && element.value) {
            objIncorreto.image = element.value;
            questoes.answers.push(objIncorreto);
          }
        });
      }
      quizzInformacoes.questions.push(questoes);
    }
  });
  const esconderDesktop9 = criarNiveis.parentNode;
  esconderDesktop9.classList.add("escoder");
  esconderDesktop9.classList.remove("desktop-9");
  desktop10();
}

function desktop10() {
  const desktop10 = document.querySelector("body");
  desktop10.innerHTML += `
    <div class="main">
      <div class="desktop-10">
        <h1>Agora, decida os níveis</h1>
      </div>
    </div>`;

  for (i = 0; quantidadeNiveis > i; i++) {
    const addNiveis = document.querySelector(".desktop-10");
    addNiveis.innerHTML += `
            <div class="add-barra-de-cricao">
                <div class="pre-barra-de-criacao">
                    <p>Nível ${i + 1}</p>
                    <img onclick="BarraDeNiveis(this)" src="/imgs/Vector.svg" alt="">
                </div>
            </div>`;
  }
  document.querySelector(
    ".desktop-10"
  ).innerHTML += `<button onclick="FinalizarQuizz(this)">Finalizar Quizz</button>`;
}

function BarraDeNiveis(elemento) {
  const escoderElemento = elemento.parentNode;
  escoderElemento.classList.add("escoder");
  escoderElemento.classList.remove("pre-barra-de-criacao");

  const seguir = elemento.parentNode.parentNode;
  seguir.classList.add("verificado");

  const pegaElemento = elemento.parentNode.parentNode;

  const pegandoP = pegaElemento.querySelector("p").innerHTML;

  pegaElemento.innerHTML += `
          <div class="barra-de-criacao2">
            <div>
                <p>
                 Nível ${pegandoP.charAt(pegandoP.length - 1)}
                </p>
                <div class="formular-niveis">
                    <input class="titulo-nivel" type="text" placeholder="Título do nível">
                    <input class="porcentagem-acerto" type="text" placeholder="% de acerto mínima">
                    <input class="url-imagem-nivel" type="text" placeholder="URL da imagem do nível">
                    <input class="descricao-do-nivel" type="text" placeholder="Descrição do nível">
                </div>
            </div>`;
}

function FinalizarQuizz(esconderDesktop10) {
  const percorrerPai = document.querySelectorAll(".barra-de-criacao2");
  const porcentagemAcerto = document.querySelectorAll(".porcentagem-acerto");

  let contador = 0;

  quizzInformacoes.levels = [];

  percorrerPai.forEach((element) => {
    const inputsNiveis = element
      .querySelector(".formular-niveis")
      .querySelectorAll("input");

    if (inputsNiveis[0].value.length < 10) {
      alert("Titulo tem que possuir 10 ou mais caracteres");
    } else if (parseFloat(inputsNiveis[1].value) > 100) {
      alert("A porcentagem de acerto deve ser um numero entre 0 e 100");
    } else if (parseFloat(inputsNiveis[1].value) < 0) {
      alert("A porcentagem de acerto deve ser um numero entre 0 e 100");
    } else if (
      !imagem(inputsNiveis[2].value) &&
      !inputsNiveis[2].value.includes("https://")
    ) {
      alert("A url tem que ser uma imagem");
    } else if (inputsNiveis[3].value.length < 30) {
      alert("A descricao deve ter no minimo 30 caracteres");
    } else if (Number(inputsNiveis[1].value) !== 0) {
      contador += 1;

      if (porcentagemAcerto.length === contador) {
        alert(
          "É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%"
        );
      } else {
        const obj1 = {
          title: inputsNiveis[0].value,
          image: inputsNiveis[2].value,
          text: inputsNiveis[3].value,
          minValue: Number(inputsNiveis[1].value),
        };

        quizzInformacoes.levels.push(obj1);
      }
    } else {
      const obj2 = {
        title: inputsNiveis[0].value,
        image: inputsNiveis[2].value,
        text: inputsNiveis[3].value,
        minValue: Number(inputsNiveis[1].value),
      };
      quizzInformacoes.levels.push(obj2);

      const esconder = esconderDesktop10.parentNode;
      esconder.classList.add("escoder");
      esconder.classList.remove("desktop-10");
      desktop11();
    }
  });

  promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    quizzInformacoes
  );
  promise.then(() => console.log(promise));
}

function desktop11() {
  document.querySelector("body").innerHTML += `
  <div class="main">
    <div class="desktop-11">
      <h1>Seu quizz está pronto!</h1>
      <div class="seu-quizz">
        <img src=${urlQuizz} alt="">
        <p>${tituloQuizz}</p>
      </div>

      <button onclick="telaQuizz()">Acessar Quizz</button>

      <span onclick="telaInicial()">Voltar pra home</span>
    </div>
  </div>`;
}
