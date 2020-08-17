import '../css/componentes.css';
import { Todo, TodoLista } from '../classes';
import { tareas } from '../index';

// Referencias HTML

const listaHtml = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnborrar = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const enlaceFiltros = document.querySelectorAll('.filtro');

export const crearTareaHtml = (todo) => {

    const tareaHtml = `
                    <li class=" ${ (todo.completado)? 'completed' : '' }" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(todo.completado)? 'checked' : ''} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `;

    const div = document.createElement('div');

    div.innerHTML = tareaHtml;
    listaHtml.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos 

txtInput.addEventListener ('keyup', (event) => {
     if(event.keyCode === 13 &&  txtInput.value.length > 0 ){
        const nuevoTodo = new Todo(txtInput.value);
        tareas.nuevoTodo(nuevoTodo);
        crearTareaHtml(nuevoTodo);
        // console.log(tareas);
        txtInput.value = '';
     }

});

listaHtml.addEventListener ('click', (event)=>{

    console.log('click');
    const nombreElemento = event.target.localName;
    const tareaElemento = event.target.parentElement.parentElement;
    const tareaId = tareaElemento.getAttribute('data-id');


    if (nombreElemento.includes('input')) {
        tareas.estado(tareaId);  
        tareaElemento.classList.toggle('completed');

    }
    else if (nombreElemento.includes('button')) { // Borrar la tarea -- todo

        tareas.eliminarTodo(tareaId);
        listaHtml.removeChild(tareaElemento);
    }

});

btnborrar.addEventListener ('click', () => {
    tareas.eliminarCompletados();

    for(let i = listaHtml.children.length-1; i >=0; i-- ){

        const elemento = listaHtml.children[i];
        console.log(elemento);
        if (elemento.classList.contains('completed')){
            listaHtml.removeChild(elemento);
        }
    }
});

filtros.addEventListener('click', (event)=> {
    
    const filtro = event.target.text;

    if (!filtro){return;}

    enlaceFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of listaHtml.children){
         elemento.classList.remove('hidden');
         const completado = elemento.classList.contains('completed');
         switch (filtro) {
             case 'Pendientes':
                 if(completado){
                     elemento.classList.add('hidden');
                 }
                 break;
            case 'Completados':
                if(!completado){

                    elemento.classList.add('hidden');
                }
                 break;
         

             default:
                 break;
         }
    }

});

