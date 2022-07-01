let tituloQuizz = document.querySelector(".titulo-quizz").value;
let urlQuizz = document.querySelector(".url-quizz").value;
let quantidadePerguntas = document.querySelector(".quantidade-perguntas").value;
let quantidadeNiveis = document.querySelector(".quantidade-niveis").value;
let i;

function imagem(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function criarPerguntas() {
  /* tituloQuizz = document.querySelector(".titulo-quizz").value;
  urlQuizz = document.querySelector(".url-quizz").value;
  quantidadePerguntas = document.querySelector(".quantidade-perguntas").value;
  quantidadeNiveis = document.querySelector(".quantidade-niveis").value; */

  tituloQuizz = "Naruto nao e tao legal";
  urlQuizz =
    "https://br.web.img2.acsta.net/c_310_420/pictures/15/07/14/23/52/533631.jpg";
  quantidadePerguntas = "4";
  quantidadeNiveis = "2";

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
    desktop9();
  }
}

function desktop9() {
  const desktop9 = document.querySelector("body");
  desktop9.innerHTML += `<div class="desktop-9">
        <h1>Crie suas perguntas</h1>
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
  ).innerHTML += `<button onclick="criarNiveis()">Prosseguir pra criar níveis</button>`;
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
                <p>Pergunta ${pegandoP.charAt(pegandoP.length - 1)}</p>
                <div>
                    <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
                    <input class="cor-pergunta" type="text" placeholder="Cor de fundo da pergunta">
                </div>

                <p>Resposta correta</p>
                <div>
                    <div class="">
                        <input class="reposta-correta" type="text" placeholder="Resposta correta">
                        <input class="url-rc-img" type="text" placeholder="URL da imagem">
                    </div>
                </div>

                <p>Respostas incorretas</p>
                <div>
                    <div>
                        <input class="reposta-incorreta" type="text" placeholder="Resposta incorreta 1">
                        <input class="url-ri-img" type="text" placeholder="URL da imagem 1">
                    </div>

                    <div>
                        <input class="reposta-incorreta" type="text" placeholder="Resposta incorreta 2">
                        <input class="url-ri-img" type="text" placeholder="URL da imagem 2">
                    </div>

                    <div>
                        <input class="reposta-incorreta" type="text" placeholder="Resposta incorreta 3">
                        <input class="url-ri-img" type="text" placeholder="URL da imagem 3">
                    </div>
                </div>
            </div>`;
}

function criarNiveis() {
  textoPergunta = document.querySelectorAll(".texto-pergunta");
  corPergunta = document.querySelectorAll(".cor-pergunta");
  repostaCorretas = document.querySelectorAll(".reposta-correta");
  urlRcImg = document.querySelectorAll(".url-rc-img");
  urlRiImg = document.querySelectorAll(".url-ri-img");
  repostaIncorreta = document.querySelectorAll(".reposta-incorreta");

  Object.keys(textoPergunta).forEach((item) => {
    const hexadecimalRc = corPergunta[item].value;

    const ValorurlRiImg = urlRiImg[item].value;

    if (textoPergunta[item].value.length < 20) {
      alert("O mínimo de uma pergunta são 20 caracteres");
    } else if (hexadecimalRc[0] != "#") {
      alert(`A cor deve começar com "#" `);
    } else if (
      Number(corPergunta[item].value) > 9 ||
      corPergunta[item].value.length !== 6
    ) {
      alert("A cor deve ter no máximo 6 caracteres");
    } else if (repostaCorretas[item].value === "") {
      alert("Cada pergunta tem que a ver 1 resposta certa");
    } else if (
      !imagem(urlRcImg[item].value) &&
      !urlRcImg[item].value.includes("https://")
    ) {
      alert("Coloque uma imagem em formato Url");
    } else if (repostaIncorreta.value === "") {
      alert("cada pergunta deve a ver pelo menos 1 resposta errada");
    } else if (
      !imagem(urlRiImg[item].value) &&
      !urlRiImg[item].value.includes("https://")
    ) {
      alert(`Coloque uma imagem em formato Url`);
    }
  });
}
