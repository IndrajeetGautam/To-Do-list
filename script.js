
function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    var ul = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = taskText;

    
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        ul.removeChild(li);
    });

    li.appendChild(deleteButton);
    ul.appendChild(li);

    
    input.value = "";

    
    updateLocalStorage();
}


function updateLocalStorage() {
    var ul = document.getElementById("taskList");
    var tasks = [];
    
    for (var i = 0; i < ul.children.length; i++) {
        var taskText = ul.children[i].textContent.replace("Delete", "").trim();
        var isCompleted = ul.children[i].classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    var ul = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function(task) {
        var li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function() {
            li.classList.toggle("completed");
            updateLocalStorage();
        });

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            ul.removeChild(li);
            updateLocalStorage();
        });

        li.appendChild(deleteButton);
        ul.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});
