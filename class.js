let currentId = 1;

class Task {
  constructor(text) {
    this.id = currentId++;
    this.text = text;
    this.complete = "uncompleted";
  }
}

class TaskManager {
  tasks = [];

  add(text) {
    const task = new Task(text);
    this.tasks.push(task);

    return task;
  }

  delete(idInput) {
    this.tasks = this.tasks.filter((task) => task.id !== idInput);
    return this.tasks;
  }

  isComplete(idInput) {
    let obj = this.tasks.find((task) => task.id === idInput);
    obj.complete = `completed`;
    return this.tasks;
  }
  undoComplete(idInput) {
    let obj = this.tasks.find((task) => task.id === idInput);
    obj.complete = `uncompleted`;
    return this.tasks;
  }
  edit(newText, idInput) {
    let obj = this.tasks.find((task) => task.id === idInput);
    obj.text = newText;
    return this.tasks;
  }
}
