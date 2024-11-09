export function criarBotaoEditar(itemDaTarefa, elementoNovaDescricao, atualizarTarefas) {
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
}