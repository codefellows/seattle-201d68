'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var seattle = {
  name: 'seattle',
  minimumCustomersPerHour: 23,
  maximumCustomersPerHour: 65,
  averageCookiesPerCustomer: 6.3,
  totalCookiesForTheDay: 0,
  // a random number between my minimum and my maximum
  customersEachHour: [],
  // in order to get a cookies sold each hour array, we are going to need to loop over a customers each hour array and multiply that by the average cookies that they buy
  // [23, 45, 67, 24...] * 6.3
  cookiesSoldEachHour: [], // this is our money array

  generateCustomersEachHour: function(){
    // generate the customersEachHour array
    // get a random number somewhere between the min and max and put that random number into the customersEachHour array for each hour
    for(var i=0; i<hours.length; i++){
      var randomNumber = Math.floor(Math.random() * (this.maximumCustomersPerHour - this.minimumCustomersPerHour + 1) + this.minimumCustomersPerHour);
  
      this.customersEachHour.push(randomNumber);
    }
  },

  generateCookiesSoldEachHour: function(){
    this.generateCustomersEachHour(); // this generates an array of customers
    // loop over my customers each hour array
    // multiply the customers by the average cookies that they buy
    // put that number in the cookiesSoldEachHour array

    for(var i=0; i<hours.length; i++){
      var cookiesSoldThisHour = Math.ceil(this.customersEachHour[i] * this.averageCookiesPerCustomer);

      this.totalCookiesForTheDay += cookiesSoldThisHour;

      this.cookiesSoldEachHour.push(cookiesSoldThisHour);
    }
  },

  render: function(){
    // get the section with the id of seattle from the DOM - that is going to be our parent element for the h2
    var parentSection = document.getElementById('seattle');

    // create an h2
    var headingSeattle = document.createElement('h2');
    // fill it with content - this.name
    headingSeattle.textContent = this.name;
    // append it to the parent
    parentSection.appendChild(headingSeattle);

    // get the ul with the id of seattle-sales from the DOM - that is going to be our parent element 
    var salesList = document.getElementById('seattle-sales');

    // loop over our cookieSoldEachHour array
    for(var i=0; i<this.cookiesSoldEachHour.length; i++){
      // create an li
      var liElement = document.createElement('li');
      // fill it with the content from the cookies sold each hour
      liElement.textContent = `${hours[i]}: ${this.cookiesSoldEachHour[i]} cookies`;
      // append it to the parent
      salesList.appendChild(liElement);
    }
  }
}

seattle.generateCookiesSoldEachHour(); // uses that array of customers to makes an array of cookies sold each hour
seattle.render();
