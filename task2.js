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
  const task_name = prompt("ВEnter task name:");
  const task_deadline = prompt("Enter deadline (YYYY-MM-DDTHH):");

  if (task_name && task_deadline) {
    addTaskToList(task_name, task_deadline);
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

  const edit_btn = document.createElement("button");
  edit_btn.className = "edit-task-button";
  edit_btn.textContent = "Edit task";

  const item_deadline = document.createElement("p");
  item_deadline.className = "task-deadline";
  item_deadline.textContent = task_deadline;

  const wrapper = document.createElement("div");
  wrapper.className = "deadline-wrapper";
  wrapper.appendChild(item_deadline);
  wrapper.appendChild(edit_btn);

  task_card.appendChild(item_name);
  task_card.appendChild(wrapper);

  hero_container.appendChild(task_card);
  task_card.style.display = "block";
}


add_btn.addEventListener("click", addTask);
