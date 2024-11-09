export function removerTarefas(tarefas, atualizarTarefas, somenteCompletas) {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item";
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
    atualizarTarefas();
}