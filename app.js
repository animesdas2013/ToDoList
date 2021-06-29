let todoList  = document.querySelector('.todo-list')
let addBtn    = document.querySelector('.todo-btn')
let todoInput = document.querySelector('.todo-input')
let filterBtn = document.querySelector('.filter-todo')


//EVENTLISTENERS:-
//add to the todo event
addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    //create div.todo
    let todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //create li inside div.todo
    let newTodo           = document.createElement('li')
        newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)

    //create button.check-btn
    let checkBtn           = document.createElement('button')
        checkBtn.innerHTML = '<i class="fas fa-check"></i>'
    checkBtn.classList.add('check-btn')
    todoDiv.appendChild(checkBtn)

    //create button.check-btn
    let dltBtn           = document.createElement('button')
        dltBtn.innerHTML = '<i class="fas fa-trash"></i>'
    dltBtn.classList.add('trash-btn')
    todoDiv.appendChild(dltBtn)

    //put div.todo in ul.todo-list  
    todoList.appendChild(todoDiv)

    //add todos to local storage
    saveLocalTodos(todoInput.value)

    todoInput.value = ''
})

//delete and check event
todoList.addEventListener('click', (e) => {
    let item = e.target
    if (item.classList[0] === 'trash-btn') {
        removeLocalTodos(item.parentElement)
        //animation
        item.parentElement.classList.add('fall')
        item.parentElement.addEventListener('transitionend', () => {
            // console.log(item.parentElement)
            item.parentElement.remove()
        })
    }

    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle('completed')
    }
})

//Filter the todos
filterBtn.addEventListener('change', (e) => {
    let todos = todoList.childNodes;
    // console.log(todos)
    todos.forEach(function (todo) {
        // console.log(e.target.value)
        switch (e.target.value) {
            case 'all': 
                todo.style.display = 'flex'
                break;
            case 'completed': 
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted': 
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
})



//load todos from localStorage
document.addEventListener('DOMContentLoaded', getTodos)


//FUNCTIONS
//save todos to the localStorage
function saveLocalTodos(todo) {
    let todos

    //Check if there are things in localstorage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

//get todos to UI from the localStorage
function getTodos(todo) {
    let todos

    //Check if there are things in localstorage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => {
        //create div.todo
        let todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //create li inside div.todo
        let newTodo           = document.createElement('li')
            newTodo.innerText = todo
        todoDiv.appendChild(newTodo)

        //create button.check-btn
        let checkBtn           = document.createElement('button')
            checkBtn.innerHTML = '<i class="fas fa-check"></i>'
        checkBtn.classList.add('check-btn')
        todoDiv.appendChild(checkBtn)

        //create button.check-btn
        let dltBtn           = document.createElement('button')
            dltBtn.innerHTML = '<i class="fas fa-trash"></i>'
        dltBtn.classList.add('trash-btn')
        todoDiv.appendChild(dltBtn)

        //put div.todo in ul.todo-list  
        todoList.appendChild(todoDiv)
    });
}

//delete todos from localStorage
function removeLocalTodos(todo) {
    let todos

    //Check if there are things in localstorage
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    console.log(todo.children[0].innerText)
    console.log(todos.indexOf(todo.children[0].innerText))
    todos.splice(todos.indexOf(todo.children[0].innerText), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}
