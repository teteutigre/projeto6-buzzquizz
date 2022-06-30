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
