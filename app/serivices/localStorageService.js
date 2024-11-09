export const atualizarTarefas = (tarefas) => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

export const carregarTarefas = () => {
    try {
        return JSON.parse(localStorage.getItem('tarefas') || '[]');
    } catch (error) {
        throw new Error('Erro ao carregar tarefas do localStorage: formato inválido.');
    }
};