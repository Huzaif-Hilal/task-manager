let tbody = document.querySelector("tbody");
let priorityFilterSelecter = document.getElementById("priorityFilter");
let statusFilterSelector = document.getElementById("statusFilter");
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let bin = JSON.parse(localStorage.getItem('bin')) || [];


//<Functions>
//Setting color to priority according to the priority level
const color_priority = () => {
    let priorityTexts = document.getElementsByClassName('priority-text');
    for (let i = 0; i < priorityTexts.length; i++) {
        let priority = priorityTexts[i].innerHTML;
        if (priority === 'low') {
            priorityTexts[i].style.color = 'green';
        } else if (priority === 'medium') {
            priorityTexts[i].style.color = 'blue';
        } else if (priority === 'high') {
            priorityTexts[i].style.color = 'red';
        }
    }
}

//Restoring a task from bin to LS
const restore = (rowID) => {
    let restoredEleArray = [];
    let restoredEle;
    restoredEleArray = bin.splice(rowID, 1)
    restoredEle = restoredEleArray.shift();
    getDeletedTasks();
    taskList.push(restoredEle)
    localStorage.setItem("bin", JSON.stringify(bin))
    localStorage.setItem("tasks", JSON.stringify(taskList))
}
//Removing a task from bin permenantly
const deleterow = (rowID) => {
    let deletedEleArray = [];
    let deletedEle;
    deletedEleArray = bin.splice(rowID, 1)
    deletedEle = deletedEleArray.shift();
    getDeletedTasks();
    localStorage.setItem("bin", JSON.stringify(bin))
}


//Clearing everything present in Table body then fetching rows from local storage
const getDeletedTasks = () => {
    tbody.innerHTML = '';
    for (let i = 0; i < bin.length; i++) {
        tbody.innerHTML += `
        <tr id="${i}">
        <td>${bin[i].taskname}</td>
        <td><p class="priority-text">${bin[i].priority}</p></td>
        <td>${bin[i].status}</td>
        <td><button class="restore-btn" onclick="restore(${i})">restore</button></td>
        <td><button class="delete-btn" onclick="deleterow(${i})">delete</button></td>
        </tr>
        `;
    }
    color_priority();
}

const filterRender = (tasks) => {
    tbody.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        tbody.innerHTML += `
        <tr id="${i}">
        <td>${tasks[i].taskname}</td>
        <td><p class="priority-text">${tasks[i].priority}</p></td>
        <td>${tasks[i].status}</td>
        <td><button class="restore-btn" onclick="restore(${i})">restore</button></td>
        <td><button class="delete-btn" onclick="deleterow(${i})">delete</button></td>
        </tr>
        `;
    }
    color_priority();
}

// Filter func
const filter = (priority, status) => {
    let filteredTasks;
    if(priority || status)
    {
    if(priority && status)
    {
        filteredTasks = bin.filter((task) => {
            return task.priority === priority && task.status === status
        })
    }
    else
    if(priority)
    {
        filteredTasks = bin.filter((task) => {
            return task.priority === priority
        })
    }
    else
    if(status)
    {
        filteredTasks = bin.filter((task) => {
            return task.status === status
        })
    }
    filterRender(filteredTasks);
}
else
{
    getDeletedTasks();
}
   
    
}


// Event listeners
window.addEventListener("DOMContentLoaded", getDeletedTasks);
priorityFilterSelecter.addEventListener("change", function(){
    filter(priorityFilterSelecter.value, statusFilterSelector.value)
});
statusFilterSelector.addEventListener("change", function(){
    filter(priorityFilterSelecter.value, statusFilterSelector.value)
});