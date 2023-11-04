var addButton = document.getElementById("addTask");

addButton.addEventListener("click", function() {
    addTask();
});
function addTask() {
    var task = document.getElementById("task").value;
    var name = document.getElementById("name").value;
    var taskDuration = document.getElementById("taskDuration").value;
    var durationUnit = document.getElementById("durationUnit").value;
    if (task === "" ||name === "" || taskDuration === "") {
        alert("Task details cannot be empty!");
        return;
    }

    var taskList = document.getElementById("taskList");
    var taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `<b>${name}</b> - <strong>${task}</strong> - ${taskDuration} ${durationUnit} <button class="delete-button" onclick="deleteTask(this)">Delete</button>`;
    taskList.appendChild(taskItem);

    // Clear the input fields
    document.getElementById("task").value = "";
    document.getElementById("name").value = "";
    document.getElementById("taskDuration").value = "";
}

function deleteTask(buttonElement) {
    var taskList = document.getElementById("taskList");
    var taskItem = buttonElement.parentElement;
    taskList.removeChild(taskItem);
}