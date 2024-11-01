const botaoDescansoLongo = document.getElementById("btn-foco");

botaoDescansoLongo.addEventListener('click', () => {
    botaoDescansoLongo.setAttribute('data-contexto', 'descanso-longo');
    console.log('Botão de descanso longo ativado');
});