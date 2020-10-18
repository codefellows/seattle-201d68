'use strict';

// Goal: make it so that I can create new people instanes from a form

var formElement = document.getElementById('form');
var peopleArray = [];

// run a callback function
function handleSubmit(event){
  // tell the browser not to get rid of my data
  event.preventDefault();
  
  // collect the information from the form
  // console.log('this is my event.target.free.value', event.target.free.value);
  var personName = event.target.username.value;
  var story = event.target.story.value;
  // run my peeps through a constructor function
  new Person(personName, story);
  // I need to build a constructor function
}

function Person(name, story){
  this.personName = name;
  this.story = story;
  peopleArray.push(this);
}
// constructor function
// name
// story
// free time
  // push object instances into an array

// set up event listener on the form listening for a submit
formElement.addEventListener('submit', handleSubmit);