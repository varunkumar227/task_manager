var addButton = document.getElementById("addTask");

addButton.addEventListener("click", function() {
    addTask();
});

function addTask() {
    var taskName = document.getElementById("taskName").value.trim();
    var name = document.getElementById("name").value.trim();
    var description = document.getElementById("description").value.trim();
    var deadLine = document.getElementById("deadLine").value;
    var taskDuration = document.getElementById("taskDuration").value.trim();
    var durationUnit = document.getElementById("durationUnit").value;
    if (taskName === "" || name === "" || description === "" || taskDuration === "" || deadLine === "") {
        alert("Task details cannot be empty!");
        return;
    }

    if (isNaN(parseFloat(taskDuration))) {
        alert("Task duration must be a numerical value!");
        return;
    }

    var taskList = document.getElementById("taskList");
    var taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `<b>${name}</b> - <strong>${taskName}</strong> - ${description} for ${taskDuration} ${durationUnit} finish before ${deadLine}  <button class="delete-button" onclick="deleteTask(this)"> Delete </button> <button class="edit-button" onclick="editTask(this)"> Edit </button>`;
    taskList.appendChild(taskItem);

    // Clear the input fields
    document.getElementById("taskName").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("deadLine").value = "";
    document.getElementById("taskDuration").value = "";
}

function deleteTask(buttonElement) {
    var taskList = document.getElementById("taskList");
    var taskItem = buttonElement.parentElement;
    taskList.removeChild(taskItem);
}

function editTask(buttonElement) {
    var taskItem = buttonElement.parentElement;

    // Extract the details from the task item
    var name = taskItem.querySelector("b").textContent;
    var taskName = taskItem.querySelector("strong").textContent;
    var description = taskItem.textContent.split('-')[2].split('for')[0].trim();
    var taskDuration = taskItem.textContent.match(/\d+\s\w+/)[0].split(' ')[0];
    var durationUnit = taskItem.textContent.match(/\d+\s\w+/)[0].split(' ')[1];
    var deadLine = taskItem.textContent.match(/\d{4}-\d{2}-\d{2}/)[0];

    // Populate the input fields with the existing details for editing
    document.getElementById("taskName").value = taskName;
    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("deadLine").value = deadLine;
    document.getElementById("taskDuration").value = taskDuration;
    document.getElementById("durationUnit").value = durationUnit;

    // Remove the existing task item
    var taskList = document.getElementById("taskList");
    taskList.removeChild(taskItem);
}
