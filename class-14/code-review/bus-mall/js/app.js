`use strict`
// global variables

var imageOneElement = document.getElementById('imageOneElement');
var imageTwoElement = document.getElementById('imageTwoElement');
var imageThreeElement = document.getElementById('imageThreeElement');
var voteCount = [];
var voteSeen = [];
var titles = [];
var imageArray = [];
var onlyThreeImages = [imageOneElement, imageTwoElement, imageThreeElement];
var onlyOnceArray = [];
var previousImages = [];
var calculateClicks = 0;
var imageList = document.getElementById('image-container');
var ctx = document.getElementById('myChart').getContext('2d');


// lets check to see if this is the first time the user has been to this site
  // lets see if there is something in LS
if(!localStorage.getItem('products')){
  constructorItemList();
} else {
  // go into LS and get my objects
  var productsFromLocalStorage = localStorage.getItem('products');
  var parsedProducts = JSON.parse(productsFromLocalStorage);

  for(var i=0; i<parsedProducts.length; i++){
    new RecentRandomItems(parsedProducts[i].src, parsedProducts[i].alt, parsedProducts[i].seen, parsedProducts[i].clicked);
  }
}

// console.log(localStorage.getItem('products'));

// image constructor

function RecentRandomItems(src, name, seen = 0, clicked = 0) {
  this.src = src;
  this.alt = name;
  this.title = name;
  this.seen = seen;
  this.clicked = clicked;

  titles.push(name);
  imageArray.push(this);

}

// helper functions- random generator and unique images from random images

function getRandomNumber(max) {
  return Math.floor(Math.random() * (max));
}

// picks three random images
function specialThreeImages() {
  var randomImageIndex = getRandomNumber(imageArray.length);
  var selectedImages = [];
  while (onlyOnceArray.length > 2) {
    onlyOnceArray.shift();
  }

  for (var i = 0; i < 3; i++) {


    while (onlyOnceArray.includes(randomImageIndex)) {
      randomImageIndex = getRandomNumber(imageArray.length);
    }
    onlyOnceArray.push(randomImageIndex);
    selectedImages.push(randomImageIndex);
    console.log('onlyOnceArray:', onlyOnceArray);
    console.log('selectedImagesArray:', selectedImages);
  }

  return selectedImages;
}
// for removing items we already chose
function removeItems() {
  for (var i = 0; i < 3; i++) {
    onlyOnceArray.shift();
  }
}
// generates random images in a unique manner
function getItems() {
  var selectedImages = specialThreeImages();
  // console.log(selectedImages);
  for (var i = 0; i < onlyThreeImages.length; i++) {
    onlyThreeImages[i].src = imageArray[selectedImages[i]].src;
    onlyThreeImages[i].alt = imageArray[selectedImages[i]].alt;
    onlyThreeImages[i].title = imageArray[selectedImages[i]].title;
    imageArray[selectedImages[i]].seen++;
  }
}


// bar chart data

function displayChart() {

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: titles, // products go here
      datasets: [{
        label: 'Number of Votes',
        data: voteCount, // number of votes
        backgroundColor: [
          'rgba(255, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(44, 44, 44, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 6
      },
      {
        label: 'Number of Views',
        data: voteSeen,
        backgroundColor: [
          'rgba(255, 255, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(44, 44, 44, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 6
      }]
    }
  });
}

// event listener for clicks

function handleClick(event) {
  var votedOn = event.target.title;
  calculateClicks++;

  for (var i = 0; i < imageArray.length; i++) {
    if (votedOn === imageArray[i].title) {
      imageArray[i].clicked++;
    }
  }
  // console.log('in handle click');
  totalClicksDone();
}

//add data to graph-stores them in local storage to keep a log

function results() {
  for (var i = 0; i < imageArray.length; i++) {
    voteCount.push(imageArray[i].clicked);
    voteSeen.push(imageArray[i].seen)
  }
}

function totalClicksDone() {
  // console.log('calculate clicks', calculateClicks);
  if (calculateClicks === 25) {

    // imageList.removeEventListener('click', handleClick);
    // it works here but why?
    results();
    displayChart();

    // put the array in local storage
    var stringifedProducts = JSON.stringify(imageArray);
    localStorage.setItem('products', stringifedProducts);

    // this else is in case we have not reached the 25 clicks yet, I wonder if this is a good place to put it? call the functions to remove, and add images from previous work. YAY FUNCTIONS! 

  } else {
    getItems();
  }
}

// putting image instantiation here, as advised..

function constructorItemList() {
  new RecentRandomItems('img/bag.jpg', 'bag');
  new RecentRandomItems('img/banana.jpg', 'banana');
  new RecentRandomItems('img/bathroom.jpg', 'bathroom');
  new RecentRandomItems('img/boots.jpg', 'boots');
  new RecentRandomItems('img/breakfast.jpg', 'breakfast');
  new RecentRandomItems('img/bubblegum.jpg', 'bubblegum');
  new RecentRandomItems('img/chair.jpg', 'chair');
  new RecentRandomItems('img/cthulhu.jpg', 'cthulhu');
  new RecentRandomItems('img/dog-duck.jpg', 'dog-duck');
  new RecentRandomItems('img/dragon.jpg', 'dragon');
  new RecentRandomItems('img/pen.jpg', 'pen');
  new RecentRandomItems('img/pet-sweep.jpg', 'pet-sweep');
  new RecentRandomItems('img/scissors.jpg', 'scissors');
  new RecentRandomItems('img/shark.jpg', 'shark');
  new RecentRandomItems('img/sweep.png', 'sweep');
  new RecentRandomItems('img/tauntaun.jpg', 'tauntaun');
  new RecentRandomItems('img/unicorn.jpg', 'unicorn');
  new RecentRandomItems('img/usb.gif', 'usb');
  new RecentRandomItems('img/water-can.jpg', 'water-can');
  new RecentRandomItems('img/wine-glass.jpg', 'wine-glass');
}

// render the and maybe add to constructor...
imageList.addEventListener('click', handleClick);

// executable code
// constructorItemList();
getItems();
// console.log('completed program');
// why do I see the constructor objects in their own function? lets see!