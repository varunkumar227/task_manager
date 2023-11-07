var addButton = document.getElementById("addTask");
var searchInput = document.getElementById("search");
var taskList = document.getElementById("taskList");

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        var taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = "<b>" + task.name + "</b> - <strong>" + task.taskName + "</strong> - " + task.description + " for " + task.taskDuration + " " + task.durationUnit + " finish before " + task.deadLine + "  <button class='delete-button' onclick='deleteTask(" + index + ")'> Delete </button> <button class='edit-button' onclick='editTask(" + index + ")'> Edit </button>";
        taskList.appendChild(taskItem);
    });
}

updateTaskList();

addButton.addEventListener("click", function() {
    addTask();
});

function addTask() {
    var name = document.getElementById("assignedTo").value;
    var taskName = document.getElementById("taskName").value;
    var description = document.getElementById("description").value;
    var deadLine = document.getElementById("deadLine").value;
    var taskDuration = document.getElementById("taskDuration").value;
    var durationUnit = document.getElementById("durationUnit").value;

    tasks.push({
        assignedTo: assignedTo,
        taskName: taskName,
        description: description,
        deadLine: deadLine,
        taskDuration: taskDuration,
        durationUnit: durationUnit,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the input fields
    document.getElementById("assignedTo").value = "";
    document.getElementById("taskName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("deadLine").value = "";
    document.getElementById("taskDuration").value = "";

    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function editTask(index) {
    // Edit the task at the specified index
    // ...

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

searchInput.addEventListener("input", function() {
    var searchTerm = searchInput.value.toLowerCase();
    var filteredTasks = tasks.filter(function(task) {
        return task.assignedTo.toLowerCase().includes(searchTerm) || task.taskName.toLowerCase().includes(searchTerm);
    });
    taskList.innerHTML = "";
    filteredTasks.forEach(function (task, index) {
        // Display filtered tasks
        // ...
    });
});
