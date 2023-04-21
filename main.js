const task_list = document.querySelector(".tasks");
const finished_task_list = document.querySelector(".finished-tasks");
const task_input = document.querySelector("#input");
const task_description = document.querySelector("#description");
const updateBtn = document.querySelector("#updateBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const addTaskBtn = document.querySelector("#addTaskBtn");
const noTasksDiv = document.querySelector("#no-tasks");
const finished_tasksDiv = document.querySelector("#finished-tasks");
let tasks = [];
let finished_tasks = [];
let count = 0;
let taskObj = {
    id: 0,
    title: "",
    description: ""
};


if (tasks.length === 0) {
    noTasksDiv.removeAttribute('hidden')
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
    //console.log("task obj: " + taskObj);

    if (taskObj.title != "") {
        tasks.push(taskObj);
        console.log("Added " + taskObj.title + " task");
    } else {
        alert("Task title can't been null");
    }
    console.log("Tasks: " + tasks);


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

    let findy = finished_tasks.find(function (elemento) {
        return elemento.id === id;
    });

    if (findx != null) {
        console.log("Confirm delete: " + findx.id + " task");

        if (confirm("Delete " + findx.title + " task?")) {
            let arrayFilter = tasks.filter(obj => obj.id !== id);
            tasks = arrayFilter
            resetButtons();
            resetInput();
            showTasks();
            console.log("deleted " + findx.id + " x task");
        }
    } else {
        if (findy != null) {
            console.log("Confirm delete: " + findy.id + " task");

            if (confirm("Delete " + findy.title + " task?")) {
                let arrayFilter = finished_tasks.filter(obj => obj.id !== id);
                finished_tasks = arrayFilter
                resetButtons();
                resetInput();
                showTasks();
                console.log("deleted " + findy.id + " y task");
            }
        } else {
            console.log('error on delete method');
        }
    }


}
function editTask(id) {
    console.log("edit: " + id + " task");
    updateBtn.removeAttribute('hidden')
    cancelBtn.removeAttribute('hidden')
    addTaskBtn.setAttribute('hidden', '')
    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        if (id === element.id) {
            resetInput();
            task_input.value = element.title;
            task_description.value = element.description
            cancelBtn.setAttribute("onclick", "cancel()");
            updateBtn.setAttribute("onclick", "update(" + element.id + ")");
        }
    }
}
function update(id) {
    console.log("Confirm update: " + id + " task");
    if (confirm("¿Update task?")) {
        updateBtn.setAttribute('hidden', '')
        addTaskBtn.removeAttribute('hidden')
        cancelBtn.setAttribute('hidden', '')

        for (let i = 0; i < tasks.length; i++) {
            let element = tasks[i];
            if (id === element.id) {
                element.title = task_input.value;
                element.description = task_description.value;
            }
        };
        showTasks();
        console.log("updated: " + id + " task");
        resetInput();
    } else {
        console.log("Canceled update: " + id + " task");
        showTasks();
        resetInput();
        resetButtons();
    }
}
function showTasks() {
    clearTaskList();
    showFinishedTasks();
    if (tasks.length > 0) {
        noTasksDiv.setAttribute('hidden', '')
        tasks.forEach(element => {
            task_list.innerHTML += `
            <div class="task-body">
                    <div style="align-self: center;
                    padding: 3px;">
                        <input class="checkbox" type="checkbox" name="" id="check" value="${element.id}">
                    </div>
                    <div class="task-x">
                        <div class="task-header">
                            <span id="task-title" class="">${element.title}</span>
                            <span id="task-description" class="">${element.description != "" ? element.description : " "}</span>
                        </div>
                        <div class="task-buttons">
                            <button class="delete-btn" onclick="deleteTask(${element.id})">Delete</button>
                            <button onclick="editTask(${element.id})" class="edit-btn">Edit</button>
                        </div>
                    </div>
                </div>
              `;
        });
    } else {
        noTasksDiv.removeAttribute('hidden', '')
    }
    checkItems();
}
function showFinishedTasks() {
    //clearTaskList();
    if (finished_tasks.length > 0) {
        //noTasksDiv.setAttribute('hidden','')
        finished_tasks.forEach(element => {
            finished_task_list.innerHTML += `
            <div class="task-body finished">
                    <div style="align-self: center;
                    padding: 3px;">
                        <input class="checkbox" type="checkbox" name="" id="check" value="${element.id}" checked>
                    </div>
                    <div class="task-x">
                        <div class="task-header">
                            <span id="task-title" class="strike">${element.title}</span>
                            <span id="task-description" class="strike">${element.description != "" ? element.description : " "}</span>
                        </div>
                        <div class="task-buttons">
                            <button class="delete-btn" onclick="deleteTask(${element.id})">Delete</button>
                            
                        </div>
                    </div>
                </div>
              `;
        });
    } else {
        noTasksDiv.removeAttribute('hidden', '')
    }
    checkItems();
}

function cancel() {
    resetButtons();
    resetInput();
    clearTaskList();
    showTasks();
}
function resetButtons() {
    updateBtn.setAttribute('hidden', '');
    addTaskBtn.removeAttribute('hidden');
    cancelBtn.setAttribute('hidden', '');

}
function clearTaskList() {
    task_list.innerHTML = "";
    finished_task_list.innerHTML = "";
};
function checkItems() {
    let checkboxes = document.querySelectorAll('.checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', () => {
            if (checkboxes[i].checked) {
                let check_id = checkboxes[i].value;
                console.log("Checkbox " + check_id + " seleccionado");
                for (let i = 0; i < tasks.length; i++) {
                    let element = tasks[i];
                    if (element.id == check_id) {
                        finished_tasks.push(element);
                        console.log("finished task: " + element.id);

                        tasks = deleteTaskFc(tasks, element.id);
                        console.log(tasks);
                        showTasks();

                        if (finished_tasks.length > 0) {
                            finished_tasksDiv.removeAttribute('hidden')
                        }

                    }
                }

            } else {
                console.log(`Checkbox ${checkboxes[i].value} deseleccionado`);
                let check_id = checkboxes[i].value;
                for (let i = 0; i < finished_tasks.length; i++) {
                    let element = finished_tasks[i];
                    if (element.id == check_id) {
                        tasks.push(element);
                        console.log("unfinished tasks: " + element.id);


                        finished_tasks = deleteTaskFc(finished_tasks, element.id)
                        showTasks();

                        if (finished_tasks == 0) {
                            finished_tasksDiv.setAttribute('hidden', '')
                        }

                    }
                }
            }
        });
    }
}
function deleteTaskFc(array, id) {
    console.log("array: " + array, "id: " + id);
    let arrayFilter = array.filter(obj => obj.id !== id);
    return arrayFilter
}