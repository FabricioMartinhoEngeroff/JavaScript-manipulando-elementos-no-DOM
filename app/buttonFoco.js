const html = document.querySelector('html');
const focoBt = document.getElementById('btn-foco');
const curtoBt = document.getElementById('btn-descanso-curto');
const longoBt = document.getElementById('btn-descanso-longo');

focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
});

curtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
});

longoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
});