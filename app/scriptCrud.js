const botaoAdicionarTarefa = document.querySelector('.app__button--add-task');
const formularioAdicionarTarefa = document.querySelector('.app__form-add-task');
const areaDoTexto = document.querySelector('.app__form-textarea');
const ulTarefasExibidas = document.querySelector('.app__section-task-list');
const descricaoDeTarefaAtiva = document.querySelector('.app__section-active-task-description');
const botaoRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const botaoRemoverTodas = document.querySelector('#btn-remover-todas');

const botaoSalvar = document.querySelector('.app__form-footer__button--confirm');
const botaoCancelar = document.querySelector('.app__form-footer__button--cancel');
const botaoDeletar = document.querySelector('.app__form-footer__button--delete');

let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
let tarefaSelecionada = null;
let liDaTarefaSelecionada = null;

const atualizarTarefas = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

const criarBotaoEditar = (itemDaTarefa, elementoNovaDescricao) => {
    const botaoGeral = document.createElement('button');
    botaoGeral.classList.add('app__task-edit-button');
    const imagemBotaoEdit = document.createElement('img');
    imagemBotaoEdit.src = 'imagens/edit.png';
    botaoGeral.append(imagemBotaoEdit);

    botaoGeral.onclick = () => {
        const novaDescricao = prompt("Qual a nova tarefa que você deseja adicionar?");
        if (novaDescricao) {
            elementoNovaDescricao.textContent = novaDescricao;
            itemDaTarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    };

    return botaoGeral;
};

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = criarBotaoEditar(tarefa, paragrafo);
    
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => selecionarTarefa(li, tarefa);
    }

    return li;
}

const selecionarTarefa = (li, tarefa) => {
    document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(element => element.classList.remove('app__section-task-list-item-active'));

    if (tarefaSelecionada === tarefa) {
        descricaoDeTarefaAtiva.textContent = '';
        tarefaSelecionada = null;
        liDaTarefaSelecionada = null;
    } else {
        tarefaSelecionada = tarefa;
        liDaTarefaSelecionada = li;
        descricaoDeTarefaAtiva.textContent = tarefa.descricao;
        li.classList.add('app__section-task-list-item-active');
    }
};

botaoAdicionarTarefa.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.toggle('hidden');
    areaDoTexto.value = ''; // Limpa o campo de texto ao abrir o formulário
});

formularioAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const descricao = areaDoTexto.value.trim();
    if (descricao === '') {
        alert('A descrição da tarefa não pode estar vazia.');
        return;
    }

    const tarefa = { descricao };
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefasExibidas.append(elementoTarefa);
    atualizarTarefas();
    areaDoTexto.value = ''; // Limpa o campo após adicionar
    formularioAdicionarTarefa.classList.add('hidden'); // Fecha o formulário
});

botaoSalvar.addEventListener('click', () => {
    if (tarefaSelecionada) {
        const novaDescricao = areaDoTexto.value.trim();
        if (novaDescricao) {
            tarefaSelecionada.descricao = novaDescricao;
            liDaTarefaSelecionada.querySelector('p').textContent = novaDescricao;
            atualizarTarefas();
            formularioAdicionarTarefa.classList.add('hidden');
            areaDoTexto.value = ''; // Limpa o campo de texto após salvar
        }
    }
});

botaoCancelar.addEventListener('click', () => {
    formularioAdicionarTarefa.classList.add('hidden');
    areaDoTexto.value = '';
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefasExibidas.append(elementoTarefa);
});

botaoDeletar.addEventListener('click', () => {
    if (formularioAdicionarTarefa) {
        areaDoTexto.value = '';
        descricaoDeTarefaAtiva.textContent = '';
        tarefaSelecionada = null;
        liDaTarefaSelecionada = null;
    }
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liDaTarefaSelecionada) {
        liDaTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liDaTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liDaTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
});

const removerTarefas = (somenteCompletas = false) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(seletor).forEach(elemento => elemento.remove());
    tarefas = tarefas.filter(tarefa => !tarefa.completa || !somenteCompletas);
};

botaoRemoverConcluidas.onclick = () => removerTarefas(true);
botaoRemoverTodas.onclick = () => removerTarefas();
