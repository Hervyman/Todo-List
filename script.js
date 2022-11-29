const taskManager = new TaskManager();
const taskTextInput = document.getElementById("task-text-input");
const todoList = document.getElementById("todo-list");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => {
  if (taskTextInput.value.length < 2) {
    alert(`Must add a valid task`);
  } else {
    taskManager.add(taskTextInput.value);
    resetInput();
    render();
  }
});

taskTextInput.addEventListener(`keypress`, (e) => {
  if (e.key === `Enter`) {
    addTaskBtn.click();
  }
});

function resetInput() {
  taskTextInput.value = "";
}

function render() {
  todoList.innerHTML = "";
  taskManager.tasks.map((task) => {
    const taskLi = document.createElement(`li`);
    const deleteBtn = document.createElement(`button`);
    const editBtn = document.createElement(`button`);
    const completeBtn = document.createElement(`button`);

    deleteBtn.innerHTML = `delete`;
    editBtn.innerHTML = `Edit`;
    completeBtn.innerHTML = `Done`;

    taskLi.classList.add(`list-group-item`, "btn-group", "m-auto");
    deleteBtn.classList.add("btn", "btn-primary", "ms-5");
    editBtn.classList.add("btn", "btn-primary");
    completeBtn.classList.add("btn", "btn-primary");

    taskLi.dataset.todoId = task.id;
    if (task.complete === `completed`) {
      const strike = document.createElement(`s`);
      taskLi.appendChild(strike);
      strike.innerHTML = task.text;
    } else {
      taskLi.innerHTML = task.text;
    }

    deleteBtn.addEventListener(`click`, (e) => {
      const todoId = Number(
        e.target.closest(`li[data-todo-id]`).dataset.todoId
      );
      taskManager.delete(todoId);
      render();
    });

    editBtn.addEventListener(`click`, (e) => {
      const editInput = document.createElement(`input`);
      const saveBtn = document.createElement(`button`);

      const todoId = Number(
        e.target.closest(`li[data-todo-id]`).dataset.todoId
      );
      const text = taskManager.tasks.find((task) => task.id === todoId).text;

      saveBtn.classList.add("btn", "btn-primary");
      saveBtn.innerHTML = `Save`;
      editInput.value = text;

      editBtn.replaceWith(saveBtn);
      saveBtn.parentNode.appendChild(editInput);
      editInput.focus();

      saveBtn.addEventListener(`click`, () => {
        taskManager.edit(editInput.value, todoId);
        render();
      });
    });

    completeBtn.addEventListener(`click`, (e) => {
      const todoId = Number(
        e.target.closest(`li[data-todo-id]`).dataset.todoId
      );
      if (task.complete === `uncompleted`) {
        taskManager.isComplete(todoId);
        render();
      } else {
        // const undoBtn = document.createElement(`button`);
        // undoBtn.classList.add("btn", "btn-primary");
        // undoBtn.innerHTML = `Undo`;
        // completeBtn.replaceWith(undoBtn);

        taskManager.undoComplete(todoId);
        render();
      }
    });

    taskLi.appendChild(deleteBtn);
    taskLi.appendChild(completeBtn);
    taskLi.appendChild(editBtn);
    todoList.appendChild(taskLi);
  });
}
