'use strict';

var allCats = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageContainer = document.getElementById('image-container');
var recentRandomNumbers = [];


// Goal: render two cats to the DOM
  // allow users to vote on which cat they like best
  // keep track of votes
  // keep track of views

function Cat(filepath, catName){
  this.filepath = filepath;
  this.name = catName; 
  this.votes = 0;

  allCats.push(this);
}

new Cat('img/boxCat.jpg', 'snickerdoodle');
new Cat('img/chargingCat.jpg', 'chargingCat');
new Cat('img/cuddleCats.jpg', 'cuddleCats');
new Cat('img/multiTaskingCat.jpg', 'multiTaskingCat');
new Cat('img/outsideCat.jpg', 'outsideCat');
new Cat('img/sleepyCat.jpg', 'sleepCat');
new Cat('img/tomatoCat.jpg', 'tomatoCat');
new Cat('img/yogaCat.jpg', 'yogaCat');


function render(imageElement){

  // get a random index between 0 and the length of our all Cats array
  var randomIndex = getRandomNumber(0, allCats.length -1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = getRandomNumber(0, allCats.length -1);
  }

  imageElement.src = allCats[randomIndex].filepath;
  imageElement.alt = allCats[randomIndex].name;
  imageElement.title = allCats[randomIndex].name;

  recentRandomNumbers = [];
  recentRandomNumbers.push(randomIndex);


}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

imageContainer.addEventListener('click', function(event){
  render(imageOneElement);
  render(imageTwoElement);

  var chosenCat = event.target.title;

  // loop over the all Cats array and see if the title matches the title of one of the cats in the all Cats array
  for(var i=0; i<allCats.length; i++){
    if(chosenCat === allCats[i].name){
      console.log('increasing votes for ', allCats[i].name);
      allCats[i].votes++;
    }
  }

  // I need to figure out which cat was clicked on and increase the votes on that cat
})

render(imageOneElement);
render(imageTwoElement)