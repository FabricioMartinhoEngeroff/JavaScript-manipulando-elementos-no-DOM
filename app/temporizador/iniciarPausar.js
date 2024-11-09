export function iniciarOuPausar(intervaloId, contagemRegressiva, audioPlay, audioPausa, iniciarOuPausarBt, iniciarOuPausarBtIcone) {
    try {
        if (intervaloId) {
            audioPausa.play();
            zerar(intervaloId, iniciarOuPausarBt, iniciarOuPausarBtIcone);
            return;
        }
        audioPlay.play();
        intervaloId = setInterval(contagemRegressiva, 1000);
        iniciarOuPausarBt.textContent = "Pausar";
        iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
        return intervaloId;
    } catch (error) {
        console.error("Erro ao iniciar ou pausar o temporizador:", error);
        throw new Error("Erro ao tentar reproduzir áudio ou iniciar contagem regressiva.");
    }
}