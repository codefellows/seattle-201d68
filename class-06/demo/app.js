'use strict';

// step .5 grab the parent element from the DOM
var babyKneeSection = document.getElementById('knees');

var babyKnees = {
  name: 'Knees of Baby',
  description: 'photograph',
  ageOfChild: function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
}

var dreamer = {
  name: 'Dreamer',
  description: 'Ilya looking out a window',
  ageOfChild: function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
}

var fence = {
  name: 'Fence',
  description: 'Two girls on a fence',
  ageOfChild: function(min, max){
    // this will return a random number between your min and your max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
}

// 1. create an element
// 2. give it content
// 3. append it to the DOM

function generateContentForBabyKnees(){
  // for the baby knees
  // 1. create an h2 for the name
  var h2Element = document.createElement('h2');
  
  // 2. give it content
  h2Element.textContent = babyKnees.name;
  
  // 3. append it to the DOM
  babyKneeSection.appendChild(h2Element);
  
  var descriptionElement = document.createElement('p');
  descriptionElement.textContent = babyKnees.description;
  babyKneeSection.appendChild(descriptionElement);
  
  // this gives us the age of the child
  var childAge = babyKnees.ageOfChild(0, 5);
  
  var ageElement = document.createElement('p');
  ageElement.textContent = `The child is ${childAge} years old`;
  babyKneeSection.appendChild(ageElement);
}

generateContentForBabyKnees();
