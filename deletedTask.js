let tbody = document.querySelector("tbody");
let priorityFilterSelecter = document.getElementById("priorityFilter");
let statusFilterSelector = document.getElementById("statusFilter");
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
    status.innerText = task.status

    //Restore
    let restore = document.createElement("td")
    let restoreBtn = document.createElement("button")
    restoreBtn.innerText = "restore";
    restoreBtn.addEventListener("click", (e)=>{
        restoreTask(e, task)
    })
    restore.append(restoreBtn)

    //Delete
    let deleete = document.createElement("td")
    let deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", (e)=>{
        deleteTask(e, task)
    })
    deleete.append(deleteBtn)

    //Appending all td's to TR
    row.append(name, priority, status, restore, deleete)

    //Appending Row to Table Body
    tbody.append(row)
}

const RenderItems = (tasks = bin)=>{
    tbody.innerHTML = "";
    tasks.forEach(task => {
        createTask(task)
    });
}
RenderItems();

const restoreTask = (e, task) =>{
    bin.splice(bin.indexOf(task), 1)
    localStorage.setItem("bin", JSON.stringify(bin))
    e.target.parentNode.parentNode.remove();
    taskList.push(task)
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

const deleteTask = (e, task) => {
    bin.splice(bin.indexOf(task), 1)
    localStorage.setItem("bin", JSON.stringify(bin))
    e.target.parentNode.parentNode.remove();
}

const filter = () =>{
    let filteredTasks = [];
    if(priorityFilterSelecter.value && statusFilterSelector.value){
        filteredTasks = bin.filter((task) =>{
            return task.priority === priorityFilterSelecter.value && task.status === statusFilterSelector.value
        })
        RenderItems(filteredTasks)
    } else if(priorityFilterSelecter.value){
        filteredTasks = bin.filter((task) =>{
            return task.priority === priorityFilterSelecter.value
        })
        RenderItems(filteredTasks)
    } else if(statusFilterSelector.value){
        filteredTasks = bin.filter((task) =>{
            return task.status === statusFilterSelector.value
        })
        RenderItems(filteredTasks)
    }
    else{
        RenderItems();
    }
}

priorityFilterSelecter.addEventListener("change", filter)
statusFilterSelector.addEventListener("change", filter)