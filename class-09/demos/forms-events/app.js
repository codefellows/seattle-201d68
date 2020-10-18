'use strict';

// box event listener

// // 1. select the element you are listening on
// var boxEl = document.getElementById('box');

// // 2. add event listener : .addEventListener(event, function-you-want-to-run-when-you-hear-event)
// // callback function: a function that another function call as a parameter
// boxEl.addEventListener('click', handleBoxClick);

// function handleBoxClick(event){
//   console.log('the event.target is ', event.target);
//   console.log('the event.target.textContent ', event.target.textContent);
//   console.log('the event.target.id is ', event.target.id)
// }





















// simple form event listener

var formEl = document.getElementById('form');
formEl.addEventListener('submit', handleClick);

function handleClick(event){
  // MUST do this if your event is submit
  // tells the browser to NOT erase the form information
  event.preventDefault();
  
  if(event.target.bananas){
    console.log('the event.target is ', event.target);
    console.log('the event.target.bananas is ', event.target.bananas);
    console.log('the event.target.textContent is ', event.target.textContent);
    // this is the name of our user
    console.log('the event.target.bananas.value is ', event.target.bananas.value);
  }
}

// contact form event listener

// var contactFormEl = document.getElementById('contact-form');
// contactFormEl.addEventListener('submit', handleFormSubmit);

// function handleFormSubmit(event){
//   event.preventDefault();
//   if(event.target){
//     console.log('the event.target is ', event.target);
//     console.log('the event.target.username is ', event.target.username);
//     console.log('the event.target.username.value is ', event.target.username.value);
//     console.log('the event.target.pets is ', event.target.pets);
//     console.log('the event.target.pets.value is', event.target.pets.value);
//     var username = event.target.username.value;
//   }
// }

