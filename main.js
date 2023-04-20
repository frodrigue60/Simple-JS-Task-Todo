const task_list = document.querySelector(".tasks");
const task_input = document.querySelector("#input");
const task_description = document.querySelector("#description");
const updateBtn = document.querySelector("#updateBtn");
const addTaskBtn = document.querySelector("#addTaskBtn");
let tasks = [];
let count = 0;
let taskObj = {
    id: 0,
    title: "",
    description: ""
};

function emptyTasks() {
    if (tasks.length > 0) {
        updateBtn.setAttribute('hidden',)
        addTaskBtn.removeAttribute('hidden')
    }
}
function addTask() {
    let task_title = task_input.value;
    let task_desc = task_description.value;
    count++;

    taskObj = {
        id: count,
        title: task_title.trim(),
        description: task_desc.trim()
    }
    console.log("task obj: " + taskObj);

    if (taskObj.title != "") {
        tasks.push(taskObj);
    } else {
        alert("Task title can't been null");
    }

    console.log(tasks);

    showTasks();
    resetInput();
}

function resetInput() {
    task_input.value = "";
    task_description.value = "";
}

function deleteTask(id) {

    let findx = tasks.find(function (elemento) {
        return elemento.id === id;
    });
    console.log("Selected element: " + findx.id);


    if (confirm("Delete " + findx.title + " task?")) {
        let arrayFilter = tasks.filter(obj => obj.id !== id);

        tasks = arrayFilter
        resetButtons();
        resetInput();
        showTasks();
    }
}
function editTask(id) {
    console.log("edit: " + id + " task");
    updateBtn.toggleAttribute('hidden')
    addTaskBtn.toggleAttribute('hidden')
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        if (id === element.id) {
            resetInput();
            task_input.value = element.title;
            task_description.value = element.description

            updateBtn.setAttribute("onclick", "update(" + element.id + ")")
        }
    }
    ;
}
function update(id) {
    if (confirm("¿Update task?")) {
        updateBtn.toggleAttribute('hidden')
        addTaskBtn.toggleAttribute('hidden')

        for (let i = 0; i < tasks.length; i++) {
            let element = tasks[i];
            if (id === element.id) {
                element.title = task_input.value;
                element.description = task_description.value;
            }
        };
        showTasks();
        console.log("updated " + id + " task");
        resetInput();
    } else {
        showTasks();
        resetInput();
    }
}
function showTasks() {
    clearTaskList();
    if (tasks.length > 0) {
        tasks.forEach(element => {
            task_list.innerHTML += `
            <div class="task-body">
                    <div class="task-header">
                        <span>title: ${element.title}</span>
                        <span>description: ${element.description}</span>
                    </div>
                    <div class="task-buttons">
                        <button onclick="deleteTask(${element.id})">Delete</button>
                        <button onclick="editTask(${element.id})">Edit</button>
                    </div>
                </div>
              `;
        });
    }
}
function checked(id) {
    console.log(id);
}
function resetButtons() {
    updateBtn.setAttribute('hidden', '');
    addTaskBtn.removeAttribute('hidden');
}
function clearTaskList() {
    task_list.innerHTML = "";
};