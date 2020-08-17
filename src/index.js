
import './estilos.css';
import {Todo, TodoLista } from './classes';
import { crearTareaHtml } from './js/componentes';


export const tareas = new TodoLista();

tareas.todos.forEach(todo => crearTareaHtml(todo));
