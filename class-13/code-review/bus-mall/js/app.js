'use strict';

// global variables
var productList = []; // list of all products
var memoryProducts = [];
var productGallerySize = 3; // # of pics
var surveyRounds = 25; 
var voteRounds = 0;// number of votes the uers gets
var names = [];
var votes = [];
var views = [];

// constructor function
function Product(name = '', file = '') {
  this.name = name;
  this.file = file;
  this.votes = 0;
  this.views = 0;
  productList.push(this);
}

// object instances
new Product('R2-D2 Carry-On Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Floor Stand', 'img/bathroom.jpg');
new Product('Open-Toed Rainboots', 'img/boots.jpg');
new Product('All-In-One Breakfast Machine', 'img/breakfast.jpg');
new Product('Meatball Bubble Gum', 'img/bubblegum.jpg');
new Product('Curious Chair', 'img/chair.jpg');
new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Product('Duckbill Dog Muzzle', 'img/dog-duck.jpg');
new Product('Canned Dragon Meat', 'img/dragon.jpg');
new Product('Pentensils', 'img/pen.jpg');
new Product('Pet Sweeper Booties', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Baby Sweeper Onesie', 'img/sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Canned Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle USB Dongle', 'img/usb.gif');
new Product('Self-Watering Can', 'img/water-can.jpg');
new Product('Weird Wine Glass', 'img/wine-glass.jpg');

// getting us a random unique product and displaying it
function productRender() {
  var checkProducts = [];
  for (var i = 1; i <= productGallerySize; i++) {
    var selectProduct = randomProduct(); // gives us a random number
    while (checkProducts.includes(selectProduct) || memoryProducts.includes(selectProduct)) {
      selectProduct = randomProduct();
    }

    checkProducts.push(selectProduct);
    document.getElementById(`product${i}_img`).src = productList[selectProduct].file;
    document.getElementById(`product${i}_lbl`).textContent = productList[selectProduct].name;
    productList[selectProduct].views++;
  }
  for (var j = 0; j < productGallerySize; j++) {
    memoryProducts.push(checkProducts[j]);
    if (memoryProducts.length > productGallerySize) {
      memoryProducts.shift();
    }
  }
}

function randomProduct() {
  // generates a random num between 0 and productList
  return Math.floor(Math.random() * (productList.length - 1));
}


var addVote = function (event) {
  event.preventDefault(); // so the browser doesn't delete our information
  // adds a vote to the product that is selected by user and is stored in memory
  productList[memoryProducts[event.target.select.value - 1]].votes++;

  voteRounds++;

  if (voteRounds >= surveyRounds) {
    // once we hit 25 votes, remove the button that lets us vote
    document.getElementById('selectormenu').removeChild(document.getElementById('votebutton'));
    resultsButton();
  } else {
    productRender();
  }
};

function resultsButton() {
  var buttonContainer = document.createElement('form');
  var buttonAnchor = document.createElement('fieldset');
  var resultsButton = document.createElement('input');
  buttonContainer.setAttribute('id', 'resultscheck');
  buttonAnchor.setAttribute('id', 'resultstrigger');
  resultsButton.setAttribute('id', 'resultsbutton');
  resultsButton.setAttribute('type', 'submit');
  resultsButton.setAttribute('value', 'View Results');

  // <form id="resultscheck">
  //   <fieldset id="resultstrigger">
  //     <input id="resultsbutton" type="submit" value="View Results"></input>
  //   </fieldset>
  // </form>

  buttonAnchor.appendChild(resultsButton);
  buttonContainer.appendChild(buttonAnchor);
  document.getElementById('resultsheader').appendChild(buttonContainer);
  document.getElementById('resultscheck').addEventListener('submit', resultsTabulation);
}

var resultsTabulation = function (event) {
  document.getElementById('resultstrigger').removeChild(document.getElementById('resultsbutton'));
  event.preventDefault();
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].views > 0) {
      var resultsEntry = document.createElement('li');
      resultsEntry.textContent = `${productList[i].name} had ${productList[i].votes} votes, and was seen ${productList[i].views} times.`;
      document.getElementById('resultslist').appendChild(resultsEntry);
    }
  }
  resultsChartFiller();
  resultsChartBuilder();
};

function resultsChartBuilder() {
  // document.createElement('canvas');
  // document.getElementById('main').appendChild(ctx);
  var ctx = document.getElementById('resultschart').getContext('2d');
  // var elementTest = document.createElement('canvas');
  // var ctx = document.createElement('canvas').getContext('2d');
  var resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Votes',
        data: votes
      }, {
        label: 'Views',
        data: views,
      }],
      labels: names
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
  console.log(ctx);
  // document.getElementById('main').appendChild(ctx);

}


function resultsChartFiller(chart) {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].views > 0) {
      names.push(productList[i].name);
      votes.push(productList[i].votes);
      views.push(productList[i].views);
      };
      // chart.update();
    }
  
}

// event listener
document.getElementById('productselector').addEventListener('submit', addVote);

productRender();

// function resultsChartBuilder {
//   // document.createElement('canvas');
//   // document.getElementById('main').appendChild(ctx);
//   // var ctx = document.getElementById('resultschart').getContext('2d');
//   var ctx = document.createElement('canvas').getContext('2d');
//   var resultsChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       datasets: [{
//         label: 'Votes',
//         data: []
//       }, {
//         label: 'Views',
//         data: [],
//       }],
//       labels: []
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
//   document.getElementById('main').appendChild(ctx);
//   resultsChartFiller(ctx);
// }

// function resultsChartFiller(chart) {
//   for (var i = 0; i < productList.length; i++) {
//     if (productList[i].views > 0) {
//       chart.data.labels.push(productList[i].name);
//       chart.data.datasets.forEach((dataset) => {
//         if (chart.data.datasets.label === 'Votes') {
//           dataset.data.push(productList[i].votes);
//         } else if (chart.data.datasets.label === 'Views') {
//           dataset.data.push(productList[i].views);
//         }
//       });
//       chart.update();
//     }
//   }
// }

// var ctx = document.getElementById('resultschart').getContext('2d');
// var resultsChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     datasets: [{
//       label: 'Votes',
//       data: [10]
//     }, {
//       label: 'Views',
//       data: [50],
//     }],
//     labels: []
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });

// resultsChartFiller(resultsChart);


// TEST FRAMEWORK ===========================================================

// var testLabelsArray = ['a', 'b', 'c', 'd', 'e', 'f'];
// var testVotesArray = [12, 7, 3, 5, 2, 3];
// var testViewsArray = [18, 19, 22, 30, 6, 13];

// function resultsChartFiller(chart) {
//   for (var i = 0; i < productList.length; i++) {
//     if (productList[i].views > 0) {
//       chart.data.labels.push(productList[i].name);
//       chart.data.datasets.forEach((dataset) => {
//         if (chart.data.datasets.label === 'Votes') {
//           dataset.data.push(productList[i].votes);
//         } else if (chart.data.datasets.label === 'Views') {
//           dataset.data.push(productList[i].views);
//         }
//       });
//       chart.update();
//     }
//   }
// }

// chart.data.datasets.forEach((dataset) => {
//   if (chart.data.datasets.label === 'Votes') {
//     dataset.data.push(array2[i].votes);
//   } else if (chart.data.datasets.label === 'Views') {
//     dataset.data.push(array3[i].views);
//   }
// });

// for (var i = 0; i < data.length; i++) {
//   dataset.data.push(data[i]);
// }

// function addChartLabels(chart, array1, array2) {
//   for (var i = 0; i < array1.length; i++) {
//     chart.data.labels.push(array1[i]);
//     chart.data.datasets.forEach((dataset) => {
//       dataset.data.push(array2[i].votes);
//     });
//   }
//   console.log(chart.data.datasets.label.data);
//   chart.update();
// }


// function addData(chart, label, data) {
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.push(data);
//   });
//   chart.update();
// }

// var testData = [15, 18];

// // var ctx = document.getElementById('resultschart').getContext('2d');
// // var resultsChart = new Chart(ctx, {
// //   type: 'bar',
// //   data: {
// //     datasets: [{
// //       label: 'Votes',
// //       data: []
// //     }, {
// //       label: 'Views',
// //       data: testVotesArray
// //     }],
// //     labels: []
// //   },
// //   options: {
// //     scales: {
// //       yAxes: [{
// //         ticks: {
// //           beginAtZero: true
// //         }
// //       }]
// //     }
// //   }
// // });

// // addData(resultsChart, 'Votes', testViewsArray);

// // addChartLabels(resultsChart, testLabelsArray, testVotesArray, testViewsArray);
