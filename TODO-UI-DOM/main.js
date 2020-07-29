let todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function (position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    // if (completedTodos === totalTodos) {
    //   this.todos.forEach(function (todo) {
    //     todo.completed = false;
    //   });
    // } else {
    //   for (let i = 0; i < totalTodos; i++) {
    //     this.todos[i].completed = true;
    //   }
    //   this.todos.forEach(function (todo) {
    //     todo.completed = true;
    //   });
    // }

    // This code below does the same as above, but shorthand
    this.todos.forEach(function (todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  },
};

// UI

let handlers = {
  addTodo: function () {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function () {
    let changeTodoPositionInput = document.getElementById(
      'changeTodoPositionInput'
    );
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function (position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function () {
    let toggleCompletedPositionInput = document.getElementById(
      'toggleCompletedPositionInput'
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  },
};

let view = {
  displayTodos: function () {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    // for (let i = 0; i < todoList.todos.length; i++) {
    //   let todosLi = document.createElement('li');
    //   let todo = todoList.todos[i];
    //   let todoTextWithCompletion = '';

    //   if (todo.completed === true) {
    //     todoTextWithCompletion = '(X) ' + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = '( ) ' + todo.todoText;
    //   }

    //   todosLi.id = i;
    //   todosLi.textContent = todoTextWithCompletion;
    //   todosLi.appendChild(this.createDeleteButton());
    //   todosUl.appendChild(todosLi);
    // }
    //Below code is shorthand for the above^
    todoList.todos.forEach(function (todo, position) {
      let todosLi = document.createElement('li');
      let todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(X) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todosLi.id = position;
      todosLi.textContent = todoTextWithCompletion;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }, this);
  },
  createDeleteButton: function () {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function () {
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (event) {
      let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  },
};

view.setUpEventListeners();
