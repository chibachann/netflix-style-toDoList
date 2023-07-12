const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// ローカルストレージからタスクを読み込む
const savedTasks = JSON.parse(localStorage.getItem('tasks'));
if (savedTasks) {
    for (const task of savedTasks) {
        createTaskElement(task.text, task.completed);
    }
}

addTaskButton.addEventListener('click', function() {
    const taskText = newTaskInput.value;
    if (taskText.trim()) {
        createTaskElement(taskText, false);
        saveTasks();
        newTaskInput.value = '';
    }
});

function createTaskElement(taskText, completed) {
    const listItem = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.className = completed ? 'completed' : '';
    taskContent.addEventListener('click', function() {
        taskContent.classList.toggle('completed');
        saveTasks();
    });
    listItem.appendChild(taskContent);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        saveTasks();
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function saveTasks() {
    const tasks = [];
    for (const listItem of taskList.children) {
        tasks.push({
            text: listItem.firstChild.textContent,  // ファーストチャイルドを指定
            completed: listItem.firstChild.classList.contains('completed'),  // ファーストチャイルドを指定
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

