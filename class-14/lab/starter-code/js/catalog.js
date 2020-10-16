/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);
var cartArray = [];
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var productOption = document.createElement('option');
    productOption.innerHTML = Product.allProducts[i].name;
    productOption.setAttribute('value', Product.allProducts[i].name);
    selectElement.appendChild(productOption);
    //cartArray.push(productOption)
  }
for (var i=0;i<cartArray.length; i++){
if (productOption === Product.allProducts[i].value){
  return(productOption);
  cart.push(productOption);
}
console.log(productOption);
}

  var x = document.getElementsByTagName('select');
}
populateForm();
// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();

 // var productSelected = event.target.productOption.value;
//console.log(productSelected);

  // TODO: Prevent the page from reloading
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  //var chosenProduct = itemsLabel.event.selectedIndex;
  //itemsLabel.addEventListener('submit', addSelectedItemToCart);
  
  //console.log (itemsLabel.event.handleSubmit);
  
  // for (var i = 0; i < allProducts.length; i++) {
  //   if (chosenProduct === allProducts[i].name) {
  //     //
  //   }
  // }
 

  var itemsLabel = document.getElementsByTagName('label');
  // var att = document.createAttribute('class');
  // att.value = 'itemSelector';
  // itemsLabel.setAttributeNode(att);
  
  
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
}
//console.log(addSelectedItemToCart());
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
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
cartArray.push(allProducts.value);
console.log(cartArray);
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
