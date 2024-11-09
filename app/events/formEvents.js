import { criarElementoTarefa } from '../components/ElementoTarefa.js';
import { atualizarTarefas } from '../serivices/localStorageService.js';

export const configurarFormulario = (formulario, ulTarefasExibidas, tarefas, areaDoTexto) => {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const descricao = areaDoTexto.value.trim();
        if (descricao === '') {
            alert('A descrição da tarefa não pode estar vazia.');
            return;
        }

        const tarefa = { descricao };
        tarefas.push(tarefa);
        const elementoTarefa = criarElementoTarefa(tarefa, selecionarTarefa);
        ulTarefasExibidas.append(elementoTarefa);
        atualizarTarefas(tarefas);
        areaDoTexto.value = ''; 
        formulario.classList.add('hidden'); 
    });
};