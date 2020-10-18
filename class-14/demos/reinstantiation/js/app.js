'use strict';

var allCats = []; // will hold all of my cats in an array
var catform = document.getElementById('catform'); // this gets the form
var catlist = document.getElementById('catlist'); // this is the ul in the DOM

// constructor function
function Cat(name){
  this.name = name;
  
  // creates a list of cats on the site
  this.render = function(){
    var listItem = document.createElement('li');
    listItem.textContent = this.name;
    catlist.appendChild(listItem);
  },

  // pushes each cat OI into the allCats array
  allCats.push(this);
}

function handleCatSubmit(e){
  e.preventDefault();
  var newCat = new Cat(e.target.kitteh.value);
  catform.reset();  // reset the form
  newCat.render(); // render the cat

  // put allCats into local storage
  localStorage.cats = JSON.stringify(allCats);
  console.log('this is what is in local storage', localStorage.cats);
}
