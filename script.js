let tasks = [];

let saveTask = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

let newTask = () => {
    let taskInput = document.getElementById('taskInput');
    let text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        updateStatus();
        saveTask();
    }
};

let updateTaskList = () => {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square" onclick="edit(${index})"></i>
                <i class="fa-solid fa-trash-can" onclick="deleteTask(${index})"></i>
            </div>
        </div>`;
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

let toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStatus();
    saveTask();
};

let edit = (index) => {
    let newText = prompt('Edita tu tarea:', tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        updateTaskList();
        updateStatus();
        saveTask();
    }
};

let deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStatus();
    saveTask();
};

let updateStatus = () => {
    let completeTasks = tasks.filter(task => task.completed).length;
    let totalTasks = tasks.length;
    let progress = (completeTasks / totalTasks) * 100;
    let progressLine = document.getElementById('progress');

    progressLine.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`
}

document.getElementById('addTask').addEventListener('click', function (e) {
    e.preventDefault();
    newTask();
});

