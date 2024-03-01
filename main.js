const grade = document.querySelector(".grade");
const botaoApagar = document.querySelector(".bttApagador"); 
const botaoDesenhar = document.querySelector(".bttDesenhar"); 
const botaoReiniciar = document.querySelector(".bttReiniciar");

document.addEventListener("DOMContentLoaded", () => {
    criarGrade(16);
    receberEscolhaDoUsuario();
});

function receberEscolhaDoUsuario() {
    const selecionaGrade = document.querySelector("select");
    selecionaGrade.addEventListener("change", () => {
        const escolhaDoUsuario = Number(selecionaGrade.value);

        criarGrade(escolhaDoUsuario);
    });
}

function criarGrade(dimensao) {
    grade.innerHTML = "";

    const tamanhoCelula = 500 / dimensao;

    for(let i = 0; i < dimensao; i++) {
        const linha = document.createElement("div");
        linha.classList.add("linha");
        linha.style.display = "flex";

        for(let j = 0; j < dimensao; j++) {
            const celula = document.createElement("div");
            celula.classList.add("celula");
            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;

            botaoDesenhar.addEventListener("click", adicionarEventoNaCelula(celula));

            linha.appendChild(celula);
        }
        grade.appendChild(linha);
    }
}

function adicionarEventoNaCelula(celula) {
    // Aqui o evento 'mouseenter' será disparado e a propriedade e.buttons dirá qual botão do mouse causou o disparo
    celula.addEventListener("mouseenter", (e) => {
        if(e.buttons === 1|| e.buttons === 3) {
            celula.style.backgroundColor = mudarCorDeFundo();
        }
    });
}

function mudarCorDeFundo() {
    const corAleatoria = document.getElementById("cor");
    return corAleatoria.value;
}

let apagador = false;

function habilitarApagador() {
    apagador = true;
    botaoApagar.classList.toggle("apagador");
    grade.addEventListener("mousemove", apagar);
}

function apagar(e) {
    if(e.buttons === 1 && apagador) {
        e.target.style.backgroundColor = "inherit";
    }
}

function desabilitarApagador() {
    apagador = false;
    botaoApagar.classList.toggle("apagador", false);
}



botaoApagar.addEventListener("click", habilitarApagador);

grade.addEventListener("mouseup", desabilitarApagador);

botaoReiniciar.addEventListener("click", () => {
    desabilitarApagador();
    criarGrade(16);
});


