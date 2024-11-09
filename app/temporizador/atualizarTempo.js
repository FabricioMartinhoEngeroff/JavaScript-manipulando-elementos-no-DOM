export function mostrarTempo(tempoNaTela, tempoDecorridoEmSegundos) {
    const minutos = Math.floor(tempoDecorridoEmSegundos / 60);
    const segundos = tempoDecorridoEmSegundos % 60;
    tempoNaTela.textContent = `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
}