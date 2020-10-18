'use strict';

// Store hours global array.
var hours = ['Store Locations', '6:00 a.m.', '7:00 a.m.', '8:00 a.m.', '9:00 a.m.', '10:00 a.m.', '11:00 a.m.', '12:00 p.m.', '1:00 p.m.', '2:00 p.m.', '3:00 p.m.', '4:00 p.m.', '5:00 p.m.', '6:00 p.m.', '7:00 p.m.', 'Grand Total'];

// Store locations global array.
var storeLocations = [];

// Global array for the grand total across all cities. 
var dailyGrandTotalAllCities = 0;

// My parent elements for writing to the DOM
var parentElementThead = document.getElementById('hours'); //header

var parentElementTbody = document.getElementById('cityRow'); // body

var parentElementTfoot = document.getElementById('hourlyTotals'); // footer

// EVENT LISTENER
// My global variable for use in the event listener: to write new store locations to the DOM.
var formElement = document.getElementById('new-city-form');

// This is the handler function.
function handleSubmit(event){

  // This built-in JS function tells the browser not to erase my data.
  event.preventDefault();

  // These variables store the information input by the visitor.
  var storeName = event.target.newstorelocation.value;
  var minCookies = Number(event.target.dailyMin.value);
  var maxCookies = parseInt(event.target.dailyMax.value);
  var avgCookies = parseInt(event.target.AvgCookies.value);

  // This variable stores the gathered inputs the are run through the City constructor function
  var newStore = new City(storeName, minCookies, maxCookies, avgCookies);
  newStore.cookiesSoldEachHour(); // This function calculates the cookies sold each hour for the new store added by the user.
  parentElementTfoot.innerHTML = ''; // This wipes the footer clean so that the new numbers can be added to it.
  newStore.renderRows(); // This function renders the hourly data for the new store, including its daily total.
  renderFooterTotals(); // This functions re-renders the footer data to include the totals from the new store.
}

// This is the constructor function that poplulates the storeLocations array.
function City(name, minimumCustomersPerHour, maximumCustomersPerHour, averageCookiesPerCustomer) {
  this.name = name;
  this.minimumCustomersPerHour = minimumCustomersPerHour;
  this.maximumCustomersPerHour = maximumCustomersPerHour;
  this.averageCookiesPerCustomer = averageCookiesPerCustomer;
  this.totalCookiesForTheDay = 0;
  this.customersPerHour = [];
  this.cookiesSoldPerHour = [];
  // This pushes all object instances into an array called storeLocations.
  storeLocations.push(this);
}

// This prototype generates a random number to simulate the number of customers per hour.
City.prototype.generateCustomersPerHour = function(){
  // generate the customersEachHour array
  // get a random number somewhere between the min and max and put that random number into the customersEachHour array for each hour
  for(var i=0; i<hours.length - 2; i++){
    var randomNumber = Math.floor(Math.random() * (this.maximumCustomersPerHour - this.minimumCustomersPerHour + 1) + this.minimumCustomersPerHour);

    this.customersPerHour.push(randomNumber);
  }
};

// This prototype populates the array assigned to track the cookies sold per hour; and produces the grand total for the day among all cities.
City.prototype.cookiesSoldEachHour = function() {
  this.generateCustomersPerHour();
  for(var i=0; i<hours.length - 2; i++){
    var cookiesSoldThisHour = Math.ceil(this.customersPerHour[i] * this.averageCookiesPerCustomer);

    this.totalCookiesForTheDay += cookiesSoldThisHour; // Tallies the cookies throughout the day
    this.cookiesSoldPerHour.push(cookiesSoldThisHour);
  }
  dailyGrandTotalAllCities += this.totalCookiesForTheDay;
  // console.log(dailyGrandTotalAllCities);
};

// This prototype renders all of the rows: City names + then hourly totals + then daily totals and the grand total.
City.prototype.renderRows = function() {
  // this.cookiesSoldEachHour();
  var trChild = document.createElement('tr');
  var tdChild = document.createElement('td');
  tdChild.textContent = this.name;
  trChild.appendChild(tdChild);
  parentElementTbody.appendChild(trChild);

  for (var j = 0; j < hours.length - 2; j++) {
    var tdChildData = document.createElement('td');
    tdChildData.textContent = this.cookiesSoldPerHour[j];
    trChild.appendChild(tdChildData);
  }
  // This writes the total cookies to the DOM in the column "Grand Total"
  var tdChildCityTotal = document.createElement('td');
  tdChildCityTotal.textContent = this.totalCookiesForTheDay;
  trChild.appendChild(tdChildCityTotal);
};

// These are my object instances.
new City('Seattle', 23, 65, 6.3);
new City('Tokyo', 3, 24, 1.2);
new City('Dubai', 11, 38, 3.7);
new City('Paris', 20, 38, 2.3);
new City('Lima', 2, 16, 4.6);

for (var l = 0; l < storeLocations.length; l++) {
  storeLocations[l].cookiesSoldEachHour();
}

// // new City(newStoreLocation); adds the new line with NaNs as soon as the page loads.
// new City(newStoreLocation);

// This function writes the total cookies sold per hour, per location.
function renderHeaderHours() {
  var trChild = document.createElement('tr');
  for (var i = 0; i < hours.length; i++) {
    var thChild = document.createElement('th');
    thChild.textContent = hours[i];
    trChild.appendChild(thChild);
    parentElementThead.appendChild(trChild);
  }
}

// This footer row (with grand total) is a stand-alone function, because it applies to all of the object instances, not uniquely to each on.

function renderFooterTotals() {

  var trChild = document.createElement('tr');
  var tdChildFoot = document.createElement('td');
  tdChildFoot.textContent = 'Hourly Totals';
  trChild.appendChild(tdChildFoot);
  parentElementTfoot.appendChild(trChild);

  for (var i = 0; i < hours.length - 2; i++) {
    var dailyCookieSalesAllLocations = 0;

    for (var j = 0; j < storeLocations.length; j++) {
      dailyCookieSalesAllLocations += storeLocations[j].cookiesSoldPerHour[i];
      var tdFooterTotal = document.createElement('td');
      tdFooterTotal.textContent = dailyCookieSalesAllLocations;
    }
    trChild.appendChild(tdFooterTotal);
  }

  addElement('td', dailyGrandTotalAllCities, trChild);
  // var tdGrandTotal = document.createElement('td');
  // tdGrandTotal.textContent = dailyGrandTotalAllCities;
  // trChild.appendChild(tdGrandTotal);
}

function addElement(element, content, parent){
  var newElement = document.createElement(element);
  newElement.textContent = content;
  parent.appendChild(newElement);

  return newElement;
}

// Executable functions
renderHeaderHours();

function renderStoreData() {
  for (var i = 0; i < storeLocations.length; i++) {
    storeLocations[i].renderRows();
  }
}

// This establishes an event listener on the form to listen for the user's submissions.
formElement.addEventListener('submit', handleSubmit);

renderStoreData();

renderFooterTotals();

