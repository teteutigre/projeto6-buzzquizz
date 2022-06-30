/* const tituloQuizz = document.querySelector(".titulo-quizz").value;
const urlQuizz = document.querySelector(".url-quizz").value;
const quantidadePerguntas = document.querySelector(
  ".quantidade-perguntas"
).value;
const quantidadeNiveis = document.querySelector(".quantidade-niveis").value; */

function criarPerguntas() {
  /* const tituloQuizz = document.querySelector(".titulo-quizz").value;
  const urlQuizz = document.querySelector(".url-quizz").value;
  const quantidadePerguntas = document.querySelector(
    ".quantidade-perguntas"
  ).value;
  const quantidadeNiveis = document.querySelector(".quantidade-niveis").value; */

  const tituloQuizz = "Naruto nao e tao legal";
  const urlQuizz =
    "https://br.web.img2.acsta.net/c_310_420/pictures/15/07/14/23/52/533631.jpg";
  const quantidadePerguntas = "3";
  const quantidadeNiveis = "2";

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

    const desktop9 = document.querySelector("body");
    desktop9.innerHTML += `<div class="desktop-9">
        <h1>Crie suas perguntas</h1>

        <div class="barra-de-criacao">

            <p>Pergunta 1</p>
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
                    <input class="url-ri-img1" type="text" placeholder="URL da imagem 1">
                </div>

                <div>
                    <input class="reposta-incorreta2" type="text" placeholder="Resposta incorreta 2">
                    <input class="url-ri-img2" type="text" placeholder="URL da imagem 2">
                </div>

                <div>
                    <input class="reposta-incorreta3" type="text" placeholder="Resposta incorreta 3">
                    <input class="url-ri-img3" type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </div>

        <div class="add-barra-de-cricao">
            <div class="pre-barra-de-criacao">
                <p>Pergunta 2</p>
                <img onclick="barraDeCriacao(this)" src="/imgs/Vector.svg" alt="">
            </div>
        </div>

        <button onclick="criarNiveis()">
            Prosseguir pra criar níveis
        </button>
    </div>`;
  }
}

function imagem(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
/*                 desktop-8                          */

function criarNiveis() {
  const textoPergunta = document.querySelector(".texto-pergunta").value;
  const corPergunta = document.querySelector(".cor-pergunta").value;
  const repostaCorretas = document.querySelector(".reposta-correta").value;
  const urlRcImg = document.querySelector(".url-rc-img").value;

  if (textoPergunta.length < 20) {
    alert("O mínimo são 20 caracteres");
  } else if (corPergunta[0] != "#") {
    alert(`Deve começar com "#" `);
  } else if (
    !corPergunta.toUpperCase().indexOf("A") ||
    !corPergunta.toUpperCase().indexOf("B") ||
    !corPergunta.toUpperCase().indexOf("C") ||
    !corPergunta.toUpperCase().indexOf("D") ||
    !corPergunta.toUpperCase().indexOf("E") ||
    !corPergunta.toUpperCase().indexOf("F")
  ) {
    alert("Digite uma cor em hexadecimal");
  } else if (0 > Number(corPergunta) > 9 || corPergunta.length > 6) {
    alert("Digite uma cor em hexadecimal");
  } else if (repostaCorretas === "") {
    alert("Digite a reposta correta");
  } else if (!imagem(urlRcImg) && !urlRcImg.includes("https://")) {
    alert("Coloque uma imagem em formato Url");
  }
}

function barraDeCriacao(elemento) {
  const pai = elemento.parentNode;
  pai.classList.add("escoder");
  pai.classList.remove("pre-barra-de-criacao");

  console.log(pai);
  const adicionando = document.querySelector(".add-barra-de-cricao");
  adicionando.innerHTML += `
        <div class="barra-de-criacao">
            <p>Pergunta 2</p>
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
                    <input class="url-ri-img1" type="text" placeholder="URL da imagem 1">
                </div>

                <div>
                    <input class="reposta-incorreta2" type="text" placeholder="Resposta incorreta 2">
                    <input class="url-ri-img2" type="text" placeholder="URL da imagem 2">
                </div>

                <div>
                    <input class="reposta-incorreta3" type="text" placeholder="Resposta incorreta 3">
                    <input class="url-ri-img3" type="text" placeholder="URL da imagem 3">
                </div>
            </div>
        </div>`;
}
