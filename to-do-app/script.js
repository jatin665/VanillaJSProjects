// Selectors
const form = document.querySelector('form');
const toDoBtn = document.querySelector('.to-do-button');
const toDoInput = document.querySelector('.to-do-input');
const listContainer = document.querySelector('.to-do-list');
const filterDropdown = document.querySelector('#filter');

// Event Listeners
toDoBtn.addEventListener('click', addTask);
filterDropdown.addEventListener('change', filterTasks);

// Variables
const toDoList = [];
// Functions
function addTask(event) {
    event.preventDefault();
    event.stopPropagation();
    const task = {
        name: '',
        status: false // False - Not Completed, True - Completed
    }
    if (form['to-do-input'].value) {
        task.name = form['to-do-input'].value;
        toDoList.push(task);
        renderTask(task, toDoList.length - 1);
        toDoInput.value = null;
    }
}

function filterTasks(event) {
    const filterChosen = event.target.value;
    const taskList = document.querySelectorAll('.to-do');
    switch(filterChosen) {
        case '1':
            showAllTasks(taskList);
            taskList.forEach(task => {
                if(!task.classList.contains('task-done')) {
                    task.classList.add('hide');
                }
            })
            break;
        case '2': // incomplete tasks
            showAllTasks(taskList);
            taskList.forEach(task => {
                if(task.classList.contains('task-done')) {
                    task.classList.add('hide');
                }
            })
            break;
        case '0': // all
            showAllTasks(taskList);
            break;
    }
}
function showAllTasks(taskList) {
    taskList.forEach(task => {
        task.classList.remove('hide');
    })
}

function renderTask(task, index) {
    // Todo DIV
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('to-do');
    // Todo LI
    const taskLi = document.createElement('li');
    taskLi.textContent = task.name;
    // Making task editable
    taskLi.setAttribute('contenteditable', true);
    taskLi.addEventListener('change', editTask.bind(task));

    // Check BUTTON
    const checkBtn = getIconButton('fas fa-check');
    checkBtn.classList.add('check-button');

    const delBtn = getIconButton('fas fa-trash');
    delBtn.classList.add('del-button');
    // Delete Buttons

    // putting all the elements together
    taskDiv.appendChild(taskLi);
    taskDiv.appendChild(checkBtn);
    taskDiv.appendChild(delBtn);
    listContainer.appendChild(taskDiv);

    // Adding event listeners to check and delete buttons
    delBtn.addEventListener('click', deleteTask.bind(this, index, taskDiv));
    checkBtn.addEventListener('click', completeTask(index, taskDiv));
    if (filterDropdown.value === '1') {
        taskDiv.classList.add('hide');
    }
}
function editTask(e) {
    this.name = e.srcElement.innerText;
}

function getIconButton(iconClass) {
    const btn =  document.createElement('button');
    btn.classList.add('icon-button');
    
    btn.innerHTML = `<i class="${iconClass}"></i>`
    return btn;
}

function deleteTask(index, taskDiv) {
    taskDiv.classList.add('fall');
    taskDiv.addEventListener('transitionend', () => {
        toDoList.splice(index, 1);
        taskDiv.remove();
    });
}

// Function currying is used to remove eventListener -> curriedFunction
// if we use bind, to pass extra arguements, that won't remove the listener
function completeTask(index, taskDiv) {
    return function curriedFunction(e) {
        toDoList[index].status = true;
        taskDiv.classList.add('task-done');
        e.currentTarget.removeEventListener('click', curriedFunction);
    }
}
