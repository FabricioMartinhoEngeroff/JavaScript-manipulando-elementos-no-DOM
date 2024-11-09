export function atualizarTempoInstantaneamente(campoFoco, mostrarTempo) {
    const tempo = parseInt(campoFoco.value);
    if (isNaN(tempo)) {
        throw new Error('Valor inválido para o campo de tempo.');
    }
    const tempoDecorridoEmSegundos = tempo * 60;
    mostrarTempo(tempoDecorridoEmSegundos);
    return tempoDecorridoEmSegundos;
}