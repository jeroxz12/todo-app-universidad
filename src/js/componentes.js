import { Todo } from '../assets/classes/todo.class'

import { todoList  } from '../index';

// Referencias HTML 

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearCompleted = document.querySelector('.clear-completed');
const ulFilters =  document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll('.filtro')
export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''  }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
         <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append ( div.firstElementChild );
}

// Eventos 
txtInput.addEventListener('keyup', ( evento ) => {

    if( evento.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo( txtInput.value);
        console.log(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml ( nuevoTodo );

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (evento) => {
    const nombreElemento = (evento.target.localName); // input label btn 
    const todoElement = evento.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado( todoId );
        todoElement.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { // hay que borrar el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild ( todoElement );
    }

})
btnClearCompleted.addEventListener('click', () => {
    todoList.eliminarCompletados();
    
    for (let i = divTodoList.children.length-1; i>=-0; i--) {
        
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

})

ulFilters.addEventListener('click',(evento) => {
    
    const filtro = evento.target.text;

    if(!filtro){
        return;
    }

anchorFiltros.forEach(element => element.classList.remove('selected'));
evento.target.classList.add('selected');

    for ( const elemento of divTodoList.children) {

            elemento.classList.remove('hidden');
            const estaCompletado = elemento.classList.contains('completed');
            
            switch (filtro) {
                case 'Pendientes':
                    if(estaCompletado) {
                        elemento.classList.add('hidden');
                        
                    }
                    break;
                case 'Completados':
                        if(!estaCompletado) {
                            elemento.classList.add('hidden');
                        }
                        break;    
            }

    }
})
