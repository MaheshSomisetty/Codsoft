function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasksToLocalStorage();
    }
}
function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newTaskText = prompt("Edit task:", span.textContent);

    if (newTaskText !== null) {
        span.textContent = newTaskText;
        saveTasksToLocalStorage();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    for (const li of taskList.children) {
        const span = li.querySelector("span");
        tasks.push(span.textContent);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const taskText of tasks) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    }
}
window.onload = loadTasksFromLocalStorage;
