import Countdown from './src/countdown.js'
import Giphy from './src/giphy.js'
import Movie from './src/mcu.js'
import Weather from './src/weather.js'
import Calendar from './src/calendar.js'
import ToDoList from './src/todo.js'
import Quote from './src/quote.js'

console.log("I made it this far");

//let countdown = new Countdown(1,2);
//countdown.render();

//let gifpane = new Giphy();
//gifpane.render();

let mcu = new Movie();
mcu.render()

let ww = new Weather();
ww.render();

let calendar = new Calendar();
//calendar.render();

let todo = new ToDoList();
let form = document.querySelector(".task-form");
let taskButton = document.querySelector('.pane1 button');
let submitTask = document.querySelector('.task-form .submit-button')
taskButton.addEventListener("click", () =>
{
    if(taskButton.classList.contains('make-task'))
    {
        taskButton.classList.remove('make-task');
        taskButton.classList.add('back-menu');
        taskButton.innerHTML = "Back to menu";
        let taskList = document.querySelector('.pane1 .task-list')
        let taskForm = document.querySelector('.pane1 .task-form')
        taskList.style.display = "none";
        taskForm.style.display = "flex";
    }
    else if(taskButton.classList.contains('back-menu'))
    {
        taskButton.classList.remove('back-menu');
        taskButton.classList.add('make-task');
        taskButton.innerHTML = "Create Task";
        let taskList = document.querySelector('.pane1 .task-list')
        let taskForm = document.querySelector('.pane1 .task-form')
        taskList.style.display = "flex";
        taskForm.style.display = "none";
    }
})
submitTask.addEventListener("click", () =>
{
    todo.createTask();
    form.reset();
})
//await todo.addToList("buy milk", "none", 1, false)
await todo.readFromList();

let quote = new Quote();
quote.render();
