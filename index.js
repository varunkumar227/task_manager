let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTaskList(taskList, tasks) {
    taskList.html("");
    tasks.forEach(function (task, index) {
        let taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = "<b>" + task.assignedTo + "</b> - <strong>" + task.taskName + "</strong> - " + task.description + " for " + task.taskDuration + " " + task.durationUnit + " finish before " + task.deadLine + "  <button class='delete-button' onclick='deleteTask(" + index + ")'> Delete </button> <button class='edit-button' onclick='editTask(" + index + ")'> Edit </button>";
        taskList.append(taskItem);
    });
}

function addTask(tasks) {
    const assignedTo = $("#assignedTo").val();
    const taskName = $("#taskName").val();
    const description = $("#description").val();
    const deadLine = $("#deadLine").val();
    const taskDuration = $("#taskDuration").val();
    const durationUnit = $("#durationUnit").val();

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
    $("#assignedTo").val("");
    $("#taskName").val("");
    $("#description").val("");
    $("#deadLine").val("");
    $("#taskDuration").val("");


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
    console.log("///////////////////////////", index)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}


function searchTasks(searchQuery, taskList){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    let filteredTasks = tasks.filter(task => {
        return task.taskName.includes(searchQuery) || task.assignedTo.includes(searchQuery) || task.description.includes(searchQuery)
    })
    updateTaskList(taskList, filteredTasks);
}


$(document).ready( () => {
    let searchInput = $("#search");
    let taskList = $("#taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    updateTaskList(taskList, tasks);

    $("#addTask").click(() => {
        addTask(tasks);
    });

    $("#searchTask").click(()=> {
        const searchQuery = $("#searchText").val().trim();
        searchTasks(searchQuery, taskList)
    })
});
