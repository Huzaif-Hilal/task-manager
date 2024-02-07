let taskNameInput = document.getElementById("taskName");
let prioritySelect = document.getElementById("priority");
let submitBtn = document.getElementById("submitBtn");
let tbody = document.querySelector("tbody");
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let bin = JSON.parse(localStorage.getItem('bin')) || [];

const createTask = (task) =>{
    //ROW
    let row = document.createElement("tr")

    //NAME
    let name = document.createElement("td")
    name.innerText = task.taskname

    //PRIORITY
    let priority = document.createElement("td")
    priority.innerText = task.priority
    if(task.priority === "low"){
        priority.style.color = "green"
    } else if(task.priority === "medium"){
        priority.style.color = "blue"
    } else if(task.priority === "high"){
        priority.style.color = "red";
    }

    //STATUS
    let status = document.createElement("td")
    let statusBtn = document.createElement("button")
    statusBtn.innerText = task.status
    if(task.status === 'pending'){
        statusBtn.style.background ="orange";
        statusBtn.style.border ="0px";
    } else if(task.status === 'in-progress'){
        statusBtn.style.background ="#4caf50";
        statusBtn.style.border ="0px";
    } else if(task.status === 'complete'){
        statusBtn.style.background ="pink";
        statusBtn.style.border ="2px solid black";
    }
    statusBtn.addEventListener("click", (e)=>{
        toggleStatus(e, task)
    })
    status.append(statusBtn)

    //Remove
    let remove = document.createElement("td")
    let removeBtn = document.createElement("button")
    removeBtn.innerText = "remove";
    removeBtn.addEventListener("click", (e)=>{
        removeTask(e, task)
    })
    remove.append(removeBtn)

    //Appending all td's to TR
    row.append(name, priority, status, remove)

    //Appending Row to Table Body
    tbody.append(row)
}

const RenderItems = (tasks = taskList)=>{
    tbody.innerHTML = "";
    tasks.forEach(task => {
        createTask(task)
    });
}

const toggleStatus = (e, task) =>{
    if(e.target.innerText === "pending"){
        task.status = "in-progress";
        e.target.style.background ="#4caf50"
        e.target.style.border = "0px"
    } else if(e.target.innerText === "in-progress"){
        task.status = "complete";
        e.target.style.background ="pink"
        e.target.style.border ="2px solid black"
    } else if(e.target.innerText === "complete"){
        task.status = "pending";
        e.target.style.background ="orange"
        e.target.style.border ="0px"
    }
    localStorage.setItem("tasks", JSON.stringify(taskList))
    e.target.innerText = task.status
}

const removeTask =(e, task) =>{
    taskList.splice(taskList.indexOf(task), 1)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    e.target.parentNode.parentNode.remove();
    bin.push(task)
    localStorage.setItem("bin", JSON.stringify(bin))
}
RenderItems()

submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(!prioritySelect.value || !taskNameInput.value)
    {
        return alert("Invalid Task Details!")
    }
    let newTask = {
        'taskname': taskNameInput.value,
        'priority': prioritySelect.value,
        'status': 'pending'
    }
    taskList.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    createTask(newTask)
    e.target.parentNode.reset();
})