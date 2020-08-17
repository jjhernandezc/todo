
export class TodoLista {

    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){

        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();

    }
    estado(id){ 

        for (const tarea of this.todos) {

            console.log(id, tarea.id);

            if (tarea.id == id) {
                this.todos.completado = !this.todos.completado;
                this.guardarLocalStorage();
                break;
            }
            
        }

    }
    eliminarCompletados(){

        this.todos = this.todos.filter( todo =>  !todo.completado);
        this.guardarLocalStorage();
        
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ?JSON.parse(localStorage.getItem('todo')) : [];
    }
}