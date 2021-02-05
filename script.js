const newTaskField = document.querySelector('#new_task');
const filterTaskField = document.querySelector('#filter_task');
const addTaskButton = document.querySelector('.task-input .btn');
const deleteAllTasksButton = document.querySelector('.task-list .btn');
const errorNotification = document.querySelector('.error-notification');
const ul = document.querySelector('.task-collection');


function addNewTask(field) {

    if (field) {
        if (ul.firstElementChild.classList.contains('default')) {
            ul.firstElementChild.remove();
        }
        
        localStorage.setItem(`task#${localStorage.length + 1}`, field);

        let li = document.createElement('li');
        let div = document.createElement('div');
        div.classList.add('delete-task');
        div.textContent = 'X';
        li.classList.add('task-collection__item');
        li.textContent = localStorage.getItem(`task#${localStorage.length}`);
        li.appendChild(div);
        ul.appendChild(li);
    
        newTaskField.value = '';
    } else {
        errorNotification.style.display = 'block';
        setTimeout(() => {
            errorNotification.style.display = 'none';
        }, 3000);
    }
}

function displayStoredTasks(list) {
    if (localStorage.length) {
        for (let i = 0; i < localStorage.length; i++) {
            let li = document.createElement('li');
            let div = document.createElement('div');
            div.classList.add('delete-task');
            div.textContent = 'X';
            li.classList.add('task-collection__item');
            li.textContent = localStorage.getItem(`task#${i + 1}`);
            li.appendChild(div);
            list.appendChild(li);
        }
    } else {
        list.innerHTML = `
            <li class="task-collection__item default">Add new task</li>
        `;
    }
}

function displayFilteredTasks(value) {
    let list = document.querySelectorAll('li');
    console.log(list);

    if (value) {
        list.forEach(item => {
            if (item.textContent.indexOf(value) === -1) {
                item.style.display = 'none'
            }
        });
    } else {
        list.forEach(item => {
            item.style.display = 'block';
        });
    }
}

function onEmptyList(list) {
    if (list.childElementCount === 0)
    list.innerHTML = `
        <li class="task-collection__item default">Add new task</li>
    `;
}

function clearTasks(list) {
    list.innerHTML = `
        <li class="task-collection__item default">Add new task</li>
    `;
    localStorage.clear();
}

addTaskButton.addEventListener('click', () => {
    addNewTask(newTaskField.value);
});

deleteAllTasksButton.addEventListener('click', () => {
    clearTasks(ul);
});

filterTaskField.addEventListener('keyup', () => {
    displayFilteredTasks(filterTaskField.value);
});

ul.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('delete-task')) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (localStorage.getItem(key) === target.parentNode.textContent.slice(0, -1)) {
                localStorage.removeItem(key);
                break;
            }
        }
        target.parentNode.remove();
    }
    onEmptyList(ul);
});

displayStoredTasks(ul);