'use strict';
// Global Variables
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allStores = [];
var parentElement = document.getElementById('cookieSales');
var hourlyRunningTotal = [];
var grandTotal = 0;
var formElement = document.getElementById('form');
// Constructor
function Store(name, minCustomersPerHour, maxCustomersPerHour, avgCookiePerCustomer, hourlyCookies = [], totalCookiesPerDay = 0) {
    this.name = name
    this.minCustomersPerHour = minCustomersPerHour;
    this.maxCustomersPerHour = maxCustomersPerHour;
    this.avgCookiePerCustomer = avgCookiePerCustomer;
    this.hourlyCookies = hourlyCookies;
    this.totalCookiesPerDay = totalCookiesPerDay;
    allStores.push(this);
}
// Objects
new Store('Seattle', 23, 65, 6.3, [], this.totalCookiesPerDay);
new Store('Tokyo', 3, 24, 1.2, [], this.totalCookiesPerDay);
new Store('Dubai', 11, 38, 3.7, [], this.totalCookiesPerDay);
new Store('Paris', 20, 38, 2.3, [], this.totalCookiesPerDay);
new Store('Lima', 2, 16, 4.6, [], this.totalCookiesPerDay);
// Prototypes
Store.prototype.generateCustomersPerHour = function (min, max) {
    min = Math.ceil(this.minCustomersPerHour);
    max = Math.floor(this.maxCustomersPerHour);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Store.prototype.calcCookiesPerHour = function () {
    for (var i = 0; i < hoursOfOperation.length; i++) {
        var cookiesSoldInThisOneHour = Math.round(this.generateCustomersPerHour(this.minCustomersPerHour, this.maxCustomersPerHour) * this.avgCookiePerCustomer);
        this.hourlyCookies.push(cookiesSoldInThisOneHour);
        this.totalCookiesPerDay += cookiesSoldInThisOneHour;
    }
};
Store.prototype.generateContentRow = function () {
    var trElement = document.createElement('tr')
    parentElement.appendChild(trElement);
    this.hourlyCookies.unshift(this.name);

    for (var i = 0; i < this.hourlyCookies.length + 1; i++) {

        if (i === 15) {
            var thElement = document.createElement('th');

            thElement.textContent = `${this.totalCookiesPerDay}`;
            trElement.appendChild(thElement);
        } else {
            var thElement = document.createElement('th');
            thElement.textContent = `${this.hourlyCookies[i]}`;
            trElement.appendChild(thElement);
        };
    }
}
// Helper Functions
function generateTotalsRow() {
    var trElement = document.createElement('tr');
    parentElement.appendChild(trElement);
    hourlyRunningTotal.unshift('Totals');
    for (var i = 0; i < hourlyRunningTotal.length + 1; i++) {
        if (i === 15) {
            var thElement = document.createElement('th');
            thElement.textContent = grandTotal;
            trElement.appendChild(thElement);
        } else {
            var thElement = document.createElement('th');
            thElement.textContent = `${hourlyRunningTotal[i]}`;
            trElement.appendChild(thElement);
        }
    }
}
function generateHeaderRow() {
    hoursOfOperation.push('Daily Location Total')
    hoursOfOperation.unshift('');
    var trElement = document.createElement('tr');
    parentElement.appendChild(trElement);
    var headerArray = hoursOfOperation;
    for (var i = 0; i < hoursOfOperation.length; i++) {
        var thElement = document.createElement('th');
        thElement.textContent = hoursOfOperation[i];
        trElement.appendChild(thElement);
    }
}
function generateTotalHourlyCookies() {
    var newTotalThisHour = 0;
    for (var k = 0; k < allStores.length; k++) {
        allStores[k].calcCookiesPerHour();
    }

    for (var i = 0; i < allStores[0].hourlyCookies.length; i++) {
        for (var j = 0; j < allStores.length; j++) {

            newTotalThisHour += allStores[j].hourlyCookies[i];
        }
        hourlyRunningTotal.push(newTotalThisHour);
        grandTotal += newTotalThisHour;
        newTotalThisHour = 0
    }
}
function handleSubmit(event) {
    event.preventDefault();
    var city = event.target.city.value;
    var minCustomersPerHour = parseInt(event.target.minCustomersPerHour.value);
    var maxCustomersPerHour = parseInt(event.target.maxCustomersPerHour.value);
    var avgCookiePerCustomer = parseInt(event.target.avgCookiesSoldPerCustomer.value);

    var newStore = new Store(city, minCustomersPerHour, maxCustomersPerHour, avgCookiePerCustomer);

    newStore.calcCookiesPerHour();
    parentElement.innerHTML = '';
    hoursOfOperation.pop();
    hoursOfOperation.shift();

    debugger;
    for (var i = 0; i < allStores.length; i++) {
        allStores[i].hourlyCookies.shift();
    }
    hourlyRunningTotal.shift();

    generateHeaderRow();
    generateAllContentRows();
    generateTotalsRow();
}
function generateAllContentRows() {
    for (var i = 0; i < allStores.length; i++) {
        allStores[i].generateContentRow();
    }
}
// Executable Code
formElement.addEventListener('submit', handleSubmit);
generateTotalHourlyCookies();
generateHeaderRow();
generateAllContentRows();
generateTotalsRow();
