class Task {
    task;
    repeat;
    priority;
    completed;
    id;

    constructor(task, repeat, priority, id, completed) {
        this.task = task;
        this.repeat = repeat;
        this.priority = priority;
        this.id = id;
        this.completed = completed;
    }
}

class ToDoList {
    url = "https://api.m3o.com/v1/db";
    apiKey = "YmJiNmIwMzYtYzJlOC00YWMwLTk3NzctOWQxYzhmMDE4MmY5";
    tableName = "todo";
    listOfTasks = [];

    async readFromList() {
        let instance = this;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${this.url}/Read`)

        xhr.setRequestHeader("Authorization", `Bearer ${this.apiKey}`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                //Under here is where we have to actually display things!
                //let panel = document.querySelector('.pane1 ul');
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                data = data.records;
                instance.listOfTasks = [];
                for (let task of data) {
                    instance.listOfTasks.push(new Task(task.task, task.repeat, task.priority, task.id, task.completed))
                }
                console.log(instance.listOfTasks)
                instance.displayList();
            }
        };

        let data = `{
            "table" : "${this.tableName}"
        }`

        xhr.send(data);
    }

    displayList() {
        let listCount = 0;
        let panel = document.querySelector('.pane1 #task-list');
        panel.innerHTML = "";
        for (let task of this.listOfTasks) {
            //console.log(task);
            let formGroup = document.createElement('div');
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            let delButton = document.createElement('button');
            delButton.classList.add('del-button');
            delButton.type = "button";
            delButton.innerHTML = 'Remove'
            formGroup.classList.add('form-group');
            checkbox.type = 'checkbox'
            checkbox.id = 'task' + listCount;
            checkbox.name = 'task' + listCount;
            if(task.completed)
            {
                checkbox.checked = true;
            }
            label.htmlFor = 'task' + listCount;
            label.innerHTML = task.task;
            switch (task.priority) {
                case 1:
                    break;
                case 2:
                    label.style.backgroundColor = "rgba(16,255,0,0.6)";
                    break;
                case 3:
                    label.style.backgroundColor = "rgba(248,255,0,0.6)";
                    break;
                case 4:
                    label.style.backgroundColor = "rgba(255,0,0,0.6)";
                    break;
                default:
                    console.log("whoops");
            }
            panel.appendChild(formGroup);
            formGroup.appendChild(checkbox);
            formGroup.appendChild(label);
            formGroup.appendChild(delButton);
            listCount++;
        }
        let delButtons = document.getElementsByClassName('del-button');
        for (let button of delButtons) {
            button.addEventListener('click', () => {
                this.removeToDo(button);
            });
        }
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        for (let box of checkboxes) {
            box.addEventListener('change', () => {
                this.updateToDo(box);
            })
        }

        this.allChecked();
    }

    async createTask() {
        let tasks = document.querySelectorAll('#task-list .form-group');
        for (let task of tasks) {
            task.remove();
        }

        console.log("Make new task!")
        let taskDesc = document.querySelector('#task').value;
        let repeat = document.querySelector('#repeat').value;
        let priority = document.querySelector('#priority').value;

        await this.addTask(taskDesc, repeat, priority);
        await this.readFromList();
    }

    async addTask(task, repeat, priority) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${this.url}/Create`)

        xhr.setRequestHeader("Authorization", `Bearer ${this.apiKey}`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        let data = `{
            "table" : "${this.tableName}",
            "record" : {
                "task" : "${task}",
                "repeat" : "${repeat}",
                "priority" : ${priority},
                "completed" : false
            }
        }`
        const options = {
            url: `${this.url}/Create`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(options)
            .then(response => {
                console.log(response.status);
            });
        //xhr.send(data);
    }

    async removeToDo(delButton) {
        //console.log(delButton.previousSibling.previousSibling);
        let taskIndex = delButton.previousSibling.previousSibling.name;
        taskIndex = taskIndex.substring(taskIndex.length - 1);
        let taskID = this.listOfTasks[taskIndex].id;
        console.log(taskID);
        let data = `{
            "table" : "${this.tableName}",
            "id" : "${taskID}"
        }`
        const options = {
            url: `${this.url}/Delete`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(options)
            .then(response => {
                console.log(response.status);
            });

        this.readFromList();
    }

    async updateToDo(checkbox) {
        let index = checkbox.name;
        index = index.substring(index.length - 1);
        //console.log(index);
        let taskID = this.listOfTasks[index].id;
        console.log(taskID);
        let data = `{
            "table" : "${this.tableName}",
            "record" : {
                "id" : "${taskID}",
                "completed" : ${checkbox.checked ? 'true' : 'false'}
            }
        }`
        const options = {
            url: `${this.url}/Update`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(options)
            .then(response => {
                console.log(response.status);
            });
        this.allChecked();
    }

    allChecked(){
        let checkboxes = document.querySelectorAll('.form-group input[type="checkbox"]')
        let allChecked = true;
        for(let box of checkboxes)
        {
            if(box.checked)
                continue;
            else   
                allChecked = false;
        }
        if(allChecked)
        {
            console.log("all checked!");
        }
        else{
            console.log("One or more unchecked!");
        }
    }
}

export default ToDoList