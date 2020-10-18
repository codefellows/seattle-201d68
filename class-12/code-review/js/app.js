'use strict';

// global variables
var totalVotes = 0;
var imageOne = document.getElementById('image-one');
var imageTwo = document.getElementById('image-two');
var imageThree = document.getElementById('image-three');
var recentRandomNumbers = [];
var allPictures = [];

function Picture(name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.views = 0;
  this.votes = 0;

  allPictures.push(this);
}

new Picture('R2-D2 Carry-On Bag', 'img/bag.jpg');
new Picture('Banana Slicer', 'img/banana.jpg');
new Picture('Bathroom Floor Stand', 'img/bathroom.jpg');
new Picture('Open-Toed Rainboots', 'img/boots.jpg');
new Picture('All-In-One Breakfast Machine', 'img/breakfast.jpg');
new Picture('Meatball Bubble Gum', 'img/bubblegum.jpg');
new Picture('Curious Chair', 'img/chair.jpg');
new Picture('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Picture('Duckbill Dog Muzzle', 'img/dog-duck.jpg');
new Picture('Canned Dragon Meat', 'img/dragon.jpg');
new Picture('Pentensils', 'img/pen.jpg');
new Picture('Pet Sweeper Booties', 'img/pet-sweep.jpg');
new Picture('Pizza Scissors', 'img/scissors.jpg');
new Picture('Shark Sleeping Bag', 'img/shark.jpg');
new Picture('Baby Sweeper Onesie', 'img/sweep.png');
new Picture('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Picture('Canned Unicorn Meat', 'img/unicorn.jpg');
new Picture('Tentacle USB Dongle', 'img/usb.gif');
new Picture('Self-Watering Can', 'img/water-can.jpg');
new Picture('Weird Wine Glass', 'img/wine-glass.jpg');

function productImageRender(imageElement){
  var randomIndex = randomProductNumber(0, allPictures.length - 1);

  // this makes sure that we have a unique image
  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = randomProductNumber(0, allPictures.length - 1);
  }

  imageElement.src = allPictures[randomIndex].filepath;
  imageElement.alt = allPictures[randomIndex].name;
  imageElement.title = allPictures[randomIndex].name;

  allPictures[randomIndex].views++;

  if(recentRandomNumbers.length > 5){
    recentRandomNumbers.shift();
  }

}

function randomProductNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleClick(event){
  var chosenTitle = event.target.title;

  for(var i=0; i<allPictures.length; i++){
    if(chosenTitle === allPictures[i].name){
      allPictures[i].votes++;
    }
  }

  productImageRender(imageOne);
  productImageRender(imageTwo);
  productImageRender(imageThree);

  // increment the total votes
  totalVotes++;
  if(totalVotes >= 25){
    document.getElementById('image-container').removeEventListener('click', handleClick);
    // display results
    var ulElement = document.getElementById('results');

    // loop over our allPicures array
    for(var i = 0; i<allPictures.length; i++){
      var liElement = document.createElement('li');
      liElement.textContent = `${allPictures[i].name} had ${allPictures[i].votes} votes and was seen ${allPictures[i].views} times.`;
      ulElement.appendChild(liElement);
    }

  }

    
}

// set up an event listener - images clicks
document.getElementById('image-container').addEventListener('click', handleClick);

productImageRender(imageOne);
productImageRender(imageTwo);
productImageRender(imageThree);


// I think I need to iterate over my allPictures array and create a products name array for my labels
  // I can do the same thing but create an array for my votes and maybe another one for my views
  // the votes would go in my data


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['banana slicer', 'baby rug', 'funny wine glass', 'Green', 'Purple', 'Orange'], // products go here
        datasets: [{
            label: '# of Bananas', // this is my title
            data: [20, 19, 18, 17, 16, 15], // number of votes
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
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
