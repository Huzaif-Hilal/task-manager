let taskNameInput = document.getElementById("taskName");
let prioritySelect = document.getElementById("priority");
let submitBtn = document.getElementById("submitBtn");
let tbody = document.querySelector("tbody");
let statusBtns;
let removeBtns;
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let bin = JSON.parse(localStorage.getItem('bin')) || [];

//  <Functions>

// Getting available id to be assigned to next task
const get_id = () => {
    if (JSON.parse(localStorage.getItem('tasks')) !== null) {
        let availaible_id = JSON.parse(localStorage.getItem('tasks')).length;
        return availaible_id;
    }
    return 0;
}


//Setting colors of status button according to its status
const def_status = (btn) => {
    if (btn.innerHTML == 'pending') {
        btn.style.background = 'orange'
        btn.style.border = '0px'
    }
    else
        if (btn.innerHTML == 'in-progress') {
            btn.style.background = '#4caf50'
            btn.style.border = '0px'
        }
        else
            if (btn.innerHTML == 'complete') {
                btn.style.background = 'pink'
                btn.style.border = '2px solid black'
            }
}

//Setting color to priority according to the priority level
const color_priority = () => {
    let priority = Array.from(document.getElementsByClassName('priority-text'))
    for (let i = 0; i < taskList.length; i++) {
        if (priority[i].innerHTML === 'low') {
            priority[i].style.color = 'green'
        }
        if (priority[i].innerHTML === 'medium') {
            priority[i].style.color = 'blue'
        }
        if (priority[i].innerHTML === 'high') {
            priority[i].style.color = 'red'
        }
    }
}

//Changing InnerHtml of status button when it is clicked
const change_status = (btn, id) => {
    if (btn.innerHTML == 'pending') {
        taskList[id].status = 'in-progress';
    }
    else
        if (btn.innerHTML == 'in-progress') {
            taskList[id].status = 'complete'
        }
        else
            if (btn.innerHTML == 'complete') {
                taskList[id].status = 'pending'
            }
    localStorage.setItem("tasks", JSON.stringify(taskList))
    get_tasks();

}


//Getting all status buttons present in table and sending every button individualy to set its color according to its inner HTML 
const get_status_btns = () => {
    statusBtns = Array.from(document.getElementsByClassName('status-btn'))
    for (let i = 0; i < statusBtns.length; i++) {
        def_status(statusBtns[i])
    }
}
//Getting all remove buttons present in table 
const get_remove_btns = () => {
    removeBtns = Array.from(document.getElementsByClassName('remove-btn'))
}

//removing a task from LS to bin
const remove_task = (rowID) => {
    let deletedEleArray = [];
    let deletedEle;
    deletedEleArray = taskList.splice(rowID, 1)
    deletedEle = deletedEleArray.shift();
    get_tasks();
    bin.push(deletedEle)
    localStorage.setItem("bin", JSON.stringify(bin))
    localStorage.setItem("tasks", JSON.stringify(taskList))
}
//Clearing everything present in Table body then fetching rows from local storage
const get_tasks = () => {
    tbody.innerHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        tbody.innerHTML += `
        <tr id="${i}">
        <td>${taskList[i].taskname}</td>
        <td><p class="priority-text">${taskList[i].priority}</p></td>
        <td><button class="status-btn">${taskList[i].status}</button></td>
        <td><button class="remove-btn">remove</button></td>
        </tr>
        `
    }

    color_priority();
    get_status_btns();
    get_remove_btns();
    for (let i = 0; i < taskList.length; i++) {
        statusBtns[i].addEventListener("click", function () {
            change_status(statusBtns[i], i);
        });
        removeBtns[i].addEventListener("click", function () {
            remove_task(i);
        });
    }
}

//Inserting new task to localstorage
const add_task = (TaskName, priority) => {
    if (TaskName.trim() === '' || priority === '') {
        alert('Invalid taskname or priority');
    }
    else {
        let newTask = {
            'id': get_id(),
            'taskname': TaskName,
            'priority': priority,
            'status': 'pending'
        }
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        get_tasks();
    }
}

//  </Functions>



//<Events>
//Auto fetching data from localstorage when page is opened
window.addEventListener("DOMContentLoaded", function () {
    get_tasks();
})

//Adding Event listner to every submit button
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    add_task(taskNameInput.value, prioritySelect.value)
    taskNameInput.value = '';
    prioritySelect.value = '';
})


//</Events>