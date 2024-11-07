const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const atividadeEmAndamento = document.querySelector('.app__section-active-task-description');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 30;
let intervaloId = null;

musica.loop = true;

const campoFoco = document.querySelector('#foco-time');
const campoCurto = document.querySelector('#short-time');
const campoLongo = document.querySelector('#long-time');
const todosCamposDeTempo = document.querySelectorAll('input[type="number"]');

const atualizarTempoInstantaneamente = () => {
    tempoDecorridoEmSegundos = parseInt(campoFoco.value) * 60; 
    mostrarTempo();
};

const mostrarTempo = () => {
    const minutos = Math.floor(tempoDecorridoEmSegundos / 60);
    const segundos = tempoDecorridoEmSegundos % 60;
    tempoNaTela.textContent = `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
};

campoFoco.addEventListener('input', () => {
    tempoDecorridoEmSegundos = parseInt(campoFoco.value) * 60;
    mostrarTempo(); 
});

campoCurto.addEventListener('input', () => {
    tempoDecorridoEmSegundos = parseInt(campoCurto.value) * 60;
    mostrarTempo();
});

campoLongo.addEventListener('input', () => {
    tempoDecorridoEmSegundos = parseInt(campoLongo.value) * 60;
    mostrarTempo();
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = parseInt(campoFoco.value) * 60;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = parseInt(campoCurto.value) * 60;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = parseInt(campoLongo.value) * 60;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        finalizarTempo();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

const finalizarTempo = () => {
    try {
        audioTempoFinalizado.play();
    } catch (error) {
        console.error("Erro ao tentar tocar o áudio:", error);
    }
    
    alert('Tempo finalizado!');
    if (document.querySelector('[data-contexto="foco"]')) {
        const evento = new CustomEvent('FocoFinalizado');
        document.dispatchEvent(evento);
    }

    atividadeEmAndamento.textContent = '';
    zerar();
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() {
    clearInterval(intervaloId); 
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

mostrarTempo(); 