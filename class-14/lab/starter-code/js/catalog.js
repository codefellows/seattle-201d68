'use strict';
// global Product, Cart




// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  selectElement.setAttribute('name', 'items');
  var smallOption;
  for (var i = 0; i < allProducts.length; i++) {
    smallOption = document.createElement('option');
    smallOption.setAttribute('value', allProducts[i].name);
    smallOption.textContent = allProducts[i].name;
    selectElement.appendChild(smallOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();
  // TODO: Prevent the page from reloading

  // Do all the things ...

  var selectedProduct = document.getElementById('items').value;
  var selectedQuantity = document.getElementById('quantity').value;

  addSelectedItemToCart(selectedProduct, selectedQuantity);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}


function addSelectedItemToCart(selectedProduct, selectedQuantity) {
  new CartItem(selectedProduct, selectedQuantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { }

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
console.log(rando);
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();
