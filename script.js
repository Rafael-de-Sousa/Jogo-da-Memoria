let cartas = ['img1.jpg', 'img1.jpg', 'img2.jpg', 'img2.jpg', 'img3.jpg', 'img3.jpg', 'img4.jpg', 'img4.jpg', 'img5.jpg', 'img5.jpg', 'img6.jpg', 'img6.jpg'];
let atual = [];
let adivinhando = false;
let correspondencias = 0;
let contagemMovimentos = 0;
let pontuacao = 50;
let vitorias = 0;
let derrotas = 0;
let segundos = 0;
let intervalo;

// Função para embaralhar o array de cartas
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Função para configurar as cartas no tabuleiro do jogo.
function configurarCartas() {
    let tabuleiro = document.getElementById('tabuleiro'); 
    embaralharArray(cartas);
    for (let i = 0; i < cartas.length; i++) {
        let carta = document.createElement('div');
        carta.dataset.item = cartas[i];
        carta.dataset.index = i;
        carta.innerHTML = "<img class='card-img' src='" + cartas[i] + "' alt='imagem'><div class='cover'></div>";
        carta.onclick = aoClicarCarta;
        tabuleiro.appendChild(carta);
    }
}

// Função chamada quando uma carta é clicada pelo jogador.
function aoClicarCarta(e) {
    if (adivinhando) return;
    let alvo = e.currentTarget;
    if (atual.length < 2) {
        alvo.classList.add('flipped');
        atual.push(alvo);
    }

    contagemMovimentos++;
    document.getElementById('movimentos').textContent = 'Movimentos: ' + contagemMovimentos;

    if (atual.length == 2) {
        adivinhando = true;
        if (atual[0].dataset.item == atual[1].dataset.item) {
            correspondencias++;
            adivinhando = false;
            atual = [];
            if (correspondencias == cartas.length / 2) {
                alert('Você venceu!');
                vitorias++;
                document.getElementById('vitorias').textContent = 'Vitórias: ' + vitorias;
                clearInterval(intervalo);
            }
        } else {
            setTimeout(function () {
                atual[0].classList.remove('flipped');
                atual[1].classList.remove('flipped');
                atual = [];
                adivinhando = false;
            }, 1000);
        }
    }

    pontuacao--;
    document.getElementById('pontuacao').textContent = 'Pontuação: ' + pontuacao;
    if (pontuacao <= 0) {
        alert('Você perdeu!');
        derrotas++;
        document.getElementById('derrotas').textContent = 'Derrotas: ' + derrotas;
        clearInterval(intervalo);
    }
}

// Função para reiniciar o jogo.
function reiniciarJogo() {
    atual = [];
    adivinhando = false;
    correspondencias = 0;
    contagemMovimentos = 0;
    pontuacao = 50;

    document.getElementById('tabuleiro').innerHTML = '';
    document.getElementById('movimentos').textContent = 'Movimentos: ' + contagemMovimentos;
    document.getElementById('tempo').innerHTML = 'Tempo: Não';
    document.getElementById('pontuacao').innerHTML = 'Pontuação: ' + pontuacao;

    configurarCartas();
}

configurarCartas();

//Funções para trabalhar o tempo
function tempo50segundos() {
    segundos = 50;

    cronometro();
    reiniciarJogo();
    intervalo = setInterval(cronometro, 1000);
}

function tempo40segundos() {
    segundos = 40;

    cronometro();
    reiniciarJogo();
    intervalo = setInterval(cronometro, 1000);
}

function tempo30segundos() {
    segundos = 30;

    cronometro(); 
    reiniciarJogo();
    intervalo = setInterval(cronometro, 1000);
}

function cronometro() {
    segundos--;
    document.getElementById('tempo').innerHTML = 'Tempo: ' + segundos;

    if (segundos <= 0) {
        clearInterval(intervalo);
        alert('Tempo esgotado!');
        derrotas++;
        document.getElementById('derrotas').textContent = 'Derrotas: ' + derrotas;
    }
}

