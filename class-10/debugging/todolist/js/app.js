'use strict';

var lastLookedAtName = '';

var addDaily = document.getElementById('dailyForm');
var addToDo = document.getElementById('todoForm');
var updateDailyObjectForm = document.getElementById('dailyDetails');
var updateTodoObjectForm = document.getElementById('todoDetails');
var dailyListHead = document.getElementById('dailyLegend');
var todoListHead = document.getElementById('todoLegend');
var dailyModal = document.getElementById('dailyModal');
var todoModal = document.getElementById('todoModal');
var dailyWarn = document.getElementById('dailyWarning');
var todoWarn = document.getElementById('todoWarning');
var currentPoints = 0;


//Need a task object; should use a constructor
function Task(taskName, taskDescript, taskType, dueDate, pointValue) {
  this.name = taskName;
  this.description = taskDescript;
  this.taskType = taskType;
  this.dueDate = dueDate;
  this.value = pointValue;
  this.completionState = 'open';
  Task.allTasks.push(this);
}
Task.allTasks = [];


function buildTasks() {
  let todayDate = getDate();
  new Task('Drink water', '', 'daily', todayDate, 1);
  new Task('Take 6000 steps', '', 'daily', todayDate, 3);
  new Task('Get 8 hours of sleep', '', 'daily', todayDate, 3);
  new Task('Graduate CodeFellows 201', 'Present this final project in front of the class on Friday!', 'toDo', '2018-10-05', 5);
  localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
}

function loadCurrentPoints(){
  let tempPoints = localStorage.getItem('points');
  if(tempPoints){
    currentPoints = parseInt(JSON.parse(tempPoints));
  }
  else{
    currentPoints = 0;
  }
}
loadCurrentPoints();

function saveCurrentPoints(){
  if(!currentPoints){
    currentPoints = 0;
  }
  localStorage.setItem('points', JSON.stringify(currentPoints));
  userCurrentClass();
}
function addTask(taskName, taskDescript, taskType, dueDate, pointValue) {
  //check for uniqueness for all tasks, regardless of type
  if(taskName){
    let index = getTaskIndexByName(taskName);
    let bIndexCollision = !(index || index === 0);
    if (bIndexCollision) {
      new Task(taskName, taskDescript, taskType, dueDate, pointValue);
      localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
    }
    else {
      console.log('Task name already in use, use something else');
    }
    return bIndexCollision;
  }
  return false;
}

function getTaskIndexByName(taskName) {
  for (let i = 0; i < Task.allTasks; i++) {
    if (Task.allTasks[i].name === taskName) {
      return i;
    }
  }
}

function updateTask(taskName, taskDescript, taskType, dueDate, pointValue, newName) {
  let index = getTaskIndexByName(taskName);
  let bUpdatedTask = (index || index === 0);
  if (bUpdatedTask) {
    if (newName) {
      Task.allTasks[index].name = newName;
    }
    Task.allTasks[index].description = taskDescript;
    Task.allTasks[index].taskType = taskType;
    Task.allTasks[index].dueDate = dueDate;
    Task.allTasks[index].value = pointValue;
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else {
    console.log('Task does not exist; try adding a task with that name instead');
  }
  return bUpdatedTask;
}

function removeTask(taskName) {
  let index = getTaskIndexByName(taskName);
  let bUpdatedTask = (index || index === 0);
  if (bUpdatedTask) {
    let removedTask = Task.allTasks.splice(index, 1);
    console.log('removing ' + removedTask);
    localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
  }
  else {
    console.log('No task with that name exists.');
  }
  return bUpdatedTask;
}

function generateTasks() {
  var myTasks = localStorage.getItem('tasks');
  if (!myTasks || myTasks.length === 0) {
    buildTasks();
  }
  else {
    Task.allTasks = JSON.parse(myTasks);
  }
}


generateTasks();

function renderDaily() {
  while (dailyListHead.childNodes.length > 1) {
    dailyListHead.removeChild(dailyListHead.lastChild);
  }
  let fieldsetElement = addElement('fieldset', '', dailyListHead);
  for (let i = 0; i < Task.allTasks.length; i++) {
    if (Task.allTasks[i].taskType === 'daily') {
      let labelElement = addElement('label', '', fieldsetElement);
      let inputElement = addElement('input', '', labelElement);
      if(Task.allTasks[i].completionState === 'complete'){
        inputElement.setAttribute('checked', '');
      }
      addElement('span', Task.allTasks[i].name, labelElement);
      let modalElement = addElement('p', 'Click me', labelElement);
      modalElement.addEventListener('click', dailyDetailHandler);

      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
      inputElement.addEventListener('click', checkboxHandler);
    }
  }
}
renderDaily();

function renderToDo() {
  while (todoListHead.childNodes.length > 1) {
    todoListHead.removeChild(todoListHead.lastChild);
  }
  let fieldsetElement = addElement('fieldset', '', todoListHead);
  for (let i = 0; i < Task.allTasks.length; i++) {
    if (Task.allTasks[i].taskType === 'toDo') {
      let labelElement = addElement('label', '', fieldsetElement);
      let inputElement = addElement('input', '', labelElement);
      if(Task.allTasks[i].completionState === 'complete'){
        inputElement.setAttribute('checked', '');
      }
      addElement('span', Task.allTasks[i].name, labelElement);
      let modalElement = addElement('p', 'Click me for more details', labelElement);
      modalElement.addEventListener('click', todoDetailHandler);

      inputElement.setAttribute('type', 'checkbox');
      inputElement.setAttribute('value', Task.allTasks[i].name);
      inputElement.addEventListener('click', checkboxHandler);
    }
  }
}
renderToDo();

function addElement(tag, elementContent, parentElement) {
  let newElement = document.createElement(tag);
  if (elementContent) {
    let newElementContent = document.createTextNode(elementContent);
    newElement.appendChild(newElementContent);
  }
  parentElement.appendChild(newElement);
  return (newElement);
}

//need a handler to update daily task list

function updateDaily(event) {
  event.preventDefault();
  let newDailyTaskName = event.target.taskname.value;
  let taskDiff = event.target.difficulity.value;
  let taskPoints = 0;
  switch (taskDiff) {
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  let bTaskAdded = addTask(newDailyTaskName, '', 'daily', 'end of day today', taskPoints);
  if(bTaskAdded){
    dailyWarn.style.display = 'none';
    dailyWarn.innerHTML = '';
    dailyModal.style.display = 'none';
    renderDaily();
  }
  else{
    dailyWarn.style.display = 'block';
    dailyWarn.innerHTML = 'Please enter a new daily task name.';
  }
}

// //  change the object to delete the list & add the new update list.
addDaily.addEventListener('submit', updateDaily);

//need a handler to update non-daily To Do list
//  change the object to delete the list & add the new update list.
function updateToDo(event) {
  event.preventDefault();
  let newTodoTaskName = event.target.taskname.value;
  let newTodoTaskDesc = event.target.taskdescription.value;
  let taskDiff = event.target.difficulity.value;
  let taskDueDate = event.target.dueDate.value;
  let taskPoints = 0;
  switch (taskDiff) {
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  let bTaskAdded = addTask(newTodoTaskName, newTodoTaskDesc, 'toDo', taskDueDate, taskPoints);
  if(bTaskAdded){
    todoWarn.style.display = 'none';
    todoWarn.innerHTML = '';
    todoModal.style.display = 'none';
    renderToDo();
  }
  else{
    todoWarn.style.display = 'block';
    todoWarn.innerHTML = 'Please enter a new to-do task name.';
  }
}

addToDo.addEventListener('submit', updateToDo);

//event handler when a checkbox is clicked

function checkboxHandler() {
  for (var i = 0; i < Task.allTasks.length; i++) {
    if (this.value === Task.allTasks[i].name) {
      var changePoints = document.getElementById('displayedPoints');
      if (Task.allTasks[i].completionState === 'open') {
        Task.allTasks[i].completionState = 'complete';
        loadCurrentPoints();
        currentPoints += Task.allTasks[i].value;
        saveCurrentPoints();
        changePoints.innerHTML = currentPoints.toString() + ' points';
        localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
      }
      else {
        Task.allTasks[i].completionState = 'open';
        loadCurrentPoints();
        currentPoints -= Task.allTasks[i].value;
        saveCurrentPoints();
        changePoints.innerHTML = currentPoints.toString() + ' points';
        localStorage.setItem('tasks', JSON.stringify(Task.allTasks));
      }
      break;
    }
  }
}

/////////to make the daily task detail form appear//////////////
// Get the daily detail modal
var dailyDetailModal = document.getElementById('dailyDetailModal');

//event handler for when "Click Me" text area is clicked
function dailyDetailHandler(event) {
  event.preventDefault();
  let targetedValue = event.target.previousSibling.innerHTML;
  lastLookedAtName = targetedValue;
  let targetedTask = '';
  for (let i = 0; i < Task.allTasks.length; i++) {
    if (Task.allTasks[i].name === targetedValue) {
      targetedTask = Task.allTasks[i];
    }
  }
  let dailyTaskName = document.getElementById('dailyDetailTaskName');
  dailyTaskName.setAttribute('value', targetedTask.name);
  dailyDetailModal.style.display = 'block';
  let dailyTaskDifficulty = document.getElementById('dailyDetailTaskDifficulty');
  let displayDifficultyElement = 0;
  switch (targetedTask.value) {
  case 1:
    displayDifficultyElement = 0;
    break;
  case 3:
    displayDifficultyElement = 1;
    break;
  case 5:
    displayDifficultyElement = 2;
    break;
  }
  dailyTaskDifficulty.children[displayDifficultyElement].setAttribute('selected', 'selected');
}


/////////to make the todo task detail form appear//////////////
// Get the todo detail modal
var todoDetailModal = document.getElementById('todoDetailModal');

//event handler for when "Click Me" text area is clicked
function todoDetailHandler(event) {
  event.preventDefault();
  debugger;
  let targetedValue = event.target.previousSibling.innerHTML;
  lastLookedAtName = targetedValue;
  let targetedTask = '';
  for (let i = 0; i < Task.allTasks.length; i++) {
    if (Task.allTasks[i].name === targetedValue) {
      targetedTask = Task.allTasks[i];
    }
  }
  let todoTaskName = document.getElementById('todoDetailTaskName');
  todoTaskName.setAttribute('value', targetedTask.name);
  todoDetailModal.style.display = 'block';
  let todoTaskDesc = document.getElementById('todoDetailTaskDesc');
  todoTaskDesc.setAttribute('value', targetedTask.description);
  let todoDueDate = document.getElementById('todoDetailDueDate');
  todoDueDate.setAttribute('value', targetedTask.dueDate);
  let todoTaskDifficulty = document.getElementById('todoDetailTaskDifficulty');
  let displayDifficultyElement = 0;
  switch (targetedTask.value) {
  case 1:
    displayDifficultyElement = 0;
    break;
  case 3:
    displayDifficultyElement = 1;
    break;
  case 5:
    displayDifficultyElement = 2;
    break;
  }
  todoTaskDifficulty.children[displayDifficultyElement].setAttribute('selected', 'selected');
}

function updateCurrentTask() {
  event.preventDefault();
  let newDailyTaskName = event.target.taskname;
  let taskDiff = event.target.difficulity;
  let taskPoints = 0;
  switch (taskDiff) {
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  let bTaskUpdated = updateTask(lastLookedAtName, '', 'daily', 'end of day today', taskPoints, newDailyTaskName);
  if(bTaskUpdated){
    dailyDetailModal.style.display = 'none';
    renderDaily();
  }
  else{
    //TODO: write behavior for trying to update a non-existent task
  }
}

function updateToDoTask() {
  event.preventDefault();
  let newDailyTaskName = event.target.taskname;
  let taskDiff = event.target.difficulity;
  let taskPoints = 0;
  switch (taskDiff) {
  case 'easy':
    taskPoints = 1;
    break;
  case 'medium':
    taskPoints = 3;
    break;
  case 'hard':
    taskPoints = 5;
    break;
  }
  let taskDesc = event.target.taskdescription;
  let taskDue = event.target.dueDate;
  let bTaskUpdated = updateTask(lastLookedAtName, taskDesc, 'toDo', taskDue, taskPoints, newDailyTaskName);
  if(bTaskUpdated){
    todoDetailModal.style.display = 'none';
    renderToDo();
  }
  else{
    //TODO: write behavior for trying to update a non-existent task
  }
}

function deleteCurrentTask() {
  event.preventDefault();
  debugger;
  let bTaskRemoved = removeTask(lastLookedAtName);
  if(bTaskRemoved){
    dailyDetailModal.style.display = 'none';
    renderDaily();
  }
  else{
    //TODO: write behavior for a failed deletion
  }
}

function deleteToDoTask() {
  event.preventDefault();
  let bTaskRemoved = removeTask(lastLookedAtName);
  if(bTaskRemoved){
    todoDetailModal.style.display = 'none';
    renderToDo();
  }
  else{
    //TODO: write behavior for a failed deletion
  }
}

updateDailyObjectForm.addEventListener('submit', updateCurrentTask);
updateDailyObjectForm.addEventListener('reset', deleteCurrentTask);
updateTodoObjectForm.addEventListener('submit', updateToDoTask);
updateTodoObjectForm.addEventListener('reset', deleteToDoTask);

//when the date value is 12am
//look in LS for the 'tasks'
//parse JSON to access the array
//grab the tasks that have task type = 'daily'
//change status to 'open'
//clear current dailies
// renderDaily()

//get old date
//parse it to get old hour
//compare it to new date
//if not the same: run the function
//store new date to local storage


//make it possible to force a date to be saved
function forceDateExistence(){
  var savedDate = localStorage.getItem('date');
  if(!savedDate){
    saveDate(getDate());
  }
}

function getDate(){
  var newDate = new Date();
  return newDate.getDate();
}

function saveDate(dateString){
  localStorage.setItem('date', JSON.stringify(dateString));
}

function compareDateToSaved(){
  var currentDate = getDate();
  var savedDate = localStorage.getItem('date');
  savedDate = JSON.parse(savedDate);
  return (currentDate === savedDate);
}

function checkIfNewDate(){
  forceDateExistence();
  if(!compareDateToSaved()){
    repopulateDailies();
  }
}
checkIfNewDate();

function repopulateDailies() {
  var tasks = localStorage.getItem('tasks');
  var currentTasks = JSON.parse(tasks);
  for (var i=0; i < currentTasks.length; i++) {
    if (currentTasks[i].taskType === 'daily') {
      currentTasks[i].completionState = 'open';
    }
  }
  localStorage.setItem('tasks', JSON.stringify(currentTasks));
  saveDate(getDate());
  generateTasks();
  renderDaily();
}
