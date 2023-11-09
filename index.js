let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskList(taskList, taskArray) {
    if (taskList) {
        taskList.html("");
    }
    taskArray.forEach(function (task, index) {
        let taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = `<b>${task.assignedTo}</b> - <strong>${task.taskName}</strong> - ${task.description} for ${task.taskDuration} ${task.durationUnit} finish before ${task.deadLine} <button class='delete-button' onclick='deleteTask(${index})'> Delete </button> <button class='edit-button' onclick='editTask(${index})'> Edit </button>`;
        taskList.append(taskItem);
    });
}

function addTask(taskArray, editIndex) {
    const assignedTo = $("#assignedTo").val();
    const taskName = $("#taskName").val();
    const description = $("#description").val();
    const deadLine = $("#deadLine").val();
    const taskDuration = $("#taskDuration").val();
    const durationUnit = $("#durationUnit").val();

    if (taskName === "" || assignedTo === "" || description === "" || taskDuration === "" || deadLine === "") {
        alert("Task details cannot be empty!");
        return;
    }

    if (isNaN(parseFloat(taskDuration))) {
        alert("Task duration must be a numerical value!");
        return;
    }

    const task = {
        assignedTo: assignedTo,
        taskName: taskName,
        description: description,
        deadLine: deadLine,
        taskDuration: taskDuration,
        durationUnit: durationUnit,
    };

    if (typeof editIndex === "number" && editIndex >= 0) {
        // Editing an existing task
        taskArray[editIndex] = task;
    } else {
        // Adding a new task
        taskArray.push(task);
    }

    // Clear the input fields
    $("#assignedTo").val("");
    $("#taskName").val("");
    $("#description").val("");
    $("#deadLine").val("");
    $("#taskDuration").val("");

    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    updateTaskList($("#taskList"), taskArray);
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList($("#taskList"), tasks);
}

function editTask(index) {

    // Extract the task details from the selected task
    const selectedTask = tasks[index];

    // Populate the input fields with the task details for editing
    $("#assignedTo").val(selectedTask.assignedTo);
    $("#taskName").val(selectedTask.taskName);
    $("#description").val(selectedTask.description);
    $("#deadLine").val(selectedTask.deadLine);
    $("#taskDuration").val(selectedTask.taskDuration);
    $("#durationUnit").val(selectedTask.durationUnit);

    // Remove the existing task item from the task list
    tasks.splice(index, 1);

    // Update the task list
    updateTaskList($("#taskList"), tasks);
}

function searchTasks(searchQuery, taskList) {
    const taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = []
    const searchFilter = $("#search-filter").val();
    if (searchFilter == "taskNameSearch") {
        filteredTasks = taskArray.filter(task => {
            return task.taskName.includes(searchQuery)
        })
    } else if (searchFilter == "assignedToSearch") {
        filteredTasks = taskArray.filter(task => {
            return task.assignedTo.includes(searchQuery)
        }) 
    } else if (searchFilter == "descriptionSearch") {
        filteredTasks = taskArray.filter(task => {
            return task.description.includes(searchQuery)
        }) 
    } else {
        filteredTasks = taskArray.filter(task => {
            return task.taskName.includes(searchQuery) || task.assignedTo.includes(searchQuery) || task.description.includes(searchQuery)
        })
    }
    updateTaskList(taskList, filteredTasks);
}

$(document).ready(() => {
    let searchInput = $("#search");
    let taskList = $("#taskList");

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    updateTaskList(taskList, tasks);

    $("#addTask").click(() => {
        addTask(tasks);
    });

    $("#searchTask").click(() => {
        const searchQuery = $("#searchText").val().trim();
        searchTasks(searchQuery, taskList)
    })
});
