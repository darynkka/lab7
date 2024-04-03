let task_list = [];

let hero_container = document.getElementById("hero-container");
hero_container.className = "tasks-container";

let container_title = document.createElement("h1");
container_title.textContent = "To do list";
container_title.className = "hero-title";
hero_container.appendChild(container_title);

let add_btn = document.createElement("button");
add_btn.className = "add-button";
add_btn.textContent = "Add task";
hero_container.appendChild(add_btn);

let sort_btn = document.createElement("button");
sort_btn.className = "sort-button";
sort_btn.textContent = "Sort tasks";
hero_container.appendChild(sort_btn);

let btn_container = document.createElement("div");
btn_container.className = "btn-container";
btn_container.appendChild(add_btn);
btn_container.appendChild(sort_btn);
hero_container.appendChild(btn_container);

function addTask() {
  const task_name = prompt("Enter task name:");
  const task_deadline = prompt("Enter deadline (YYYY-MM-DD):");

  const date = new Date(task_deadline);
  if (isNaN(date.getTime())) {
    alert("Invalid date format. Please use the format YYYY-MM-DD ");
    return;
  }

  if (task_name && task_deadline) {
    addTaskToList(task_name, task_deadline);
    task_list.push({
      name: task_name,
      deadline: task_deadline,
      completed: false
    });
  } else {
    alert("Fill the fields!");
  }
}

function addTaskToList(task_name, task_deadline) {
  let task_card = document.createElement("div");
  task_card.className = "task-card";

  const item_name = document.createElement("p");
  item_name.className = "task-name";
  item_name.textContent = task_name;

  const del_btn = document.createElement("button");
  del_btn.className = "delete-task-button";
  del_btn.textContent = "Delete task";

  const item_deadline = document.createElement("p");
  item_deadline.className = "task-deadline";
  item_deadline.textContent = task_deadline;

  const wrapper = document.createElement("div");
  wrapper.className = "deadline-wrapper";
  wrapper.appendChild(item_deadline);
  wrapper.appendChild(del_btn);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  checkbox.addEventListener("change", function () {
    task_card.classList.toggle("card-completed");
    item_name.classList.toggle("name-completed");
  });

  task_card.appendChild(checkbox);
  task_card.appendChild(item_name);
  task_card.appendChild(wrapper);

  hero_container.appendChild(task_card);
  task_card.style.display = "block";

}

hero_container.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-task-button")) {
    const task_card = event.target.closest(".task-card");
    const task_name = task_card.querySelector(".task-name").textContent;
    const task_deadline = task_card.querySelector(".task-deadline").textContent;

    task_card.remove();
    const taskIndex = task_list.findIndex(
      (task) => task.name === task_name && task.deadline === task_deadline
    );
    if (taskIndex !== -1) {
      task_list.splice(taskIndex, 1);
    }
  }
});

add_btn.addEventListener("click", addTask);

hero_container.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("task-name")) {
    const task_card = target.closest(".task-card");
    const taskNameElement = task_card.querySelector(".task-name");
    const newName = prompt("Введіть нову назву:", taskNameElement.textContent);

    if (newName !== null) {
      taskNameElement.textContent = newName;
    }
  } else if (target.classList.contains("task-deadline")) {
    const task_card = target.closest(".task-card");
    const taskDeadlineElement = task_card.querySelector(".task-deadline");
    const newDeadline = prompt("Введіть нову дату:", taskDeadlineElement.textContent);

    const date = new Date(newDeadline);
    if (isNaN(date.getTime())) {
      alert("Invalid date format. Please use the format YYYY-MM-DD ");
    } else if (newDeadline !== null) {
      taskDeadlineElement.textContent = newDeadline;
    }
  }
});

sort_btn.addEventListener("click", sortTasks);

function sortTasks() {
  const sortOption = prompt("Choose sort option: 1 - by deadline, 2 - by name");

  if (sortOption === "1") {
    sortByDeadline();
  } else if (sortOption === "2") {
    sortByTaskName();
  } else {
    alert("Invalid input. Please enter the number from 1 to 3");
  }
}

function sortByDeadline() {
  task_list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  renderTasks();
}

function sortByTaskName() {
  task_list.sort((a, b) => a.name.localeCompare(b.name));
  renderTasks();
}

function renderTasks() {
  hero_container.innerHTML = "";
  hero_container.appendChild(container_title);
  hero_container.appendChild(btn_container);

  task_list.forEach((task) => {
    addTaskToList(task.name, task.deadline);
    const taskCard = hero_container.lastElementChild;
    if (task.completed) {
      taskCard.classList.add("card-completed");
      taskCard.querySelector(".task-name").classList.add("name-completed");
      taskCard.querySelector(".task-checkbox").checked = true;
    }
  });
}
