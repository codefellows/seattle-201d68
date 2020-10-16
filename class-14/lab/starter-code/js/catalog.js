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
  //Created UL List for cart preview
  var ulParent = document.getElementById('cartContents');
  var ulElement = document.createElement('ul');
  ulElement.setAttribute('id', 'cart-preview');
  ulParent.appendChild(ulElement);
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
  new CartItem(selectedProduct, parseInt(selectedQuantity));
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var counter = 0;        //// May have to make global
  console.log(cart.items.length);
  for (var i = 0; i < cart.items.length; i++) {
    counter += cart.items[i].quantity;
    console.log(cart.items[i].quantity);

  }
  var parentElement = document.getElementById('itemCount');
  parentElement.textContent = `  ${counter} in the Inbox`;



}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  //cartContents


  var parentElement = document.getElementById('cart-preview');
  var ULChildArray = parentElement.children;
  var checkIDArray = [];

  for (var j = 0; j < ULChildArray.length; j++) {
    checkIDArray.push(ULChildArray[j].getAttribute('id'));
  }

  for (var i = 0; i < cart.items.length; i++) {
    // if a product is already in the Cart.  Don't make an LI.
    console.log('checkIDarray', checkIDArray, 'cart items: ', cart.items[i].product);

    if (!checkIDArray.includes(cart.items[i].product)) {
      var createLI_Element = document.createElement('li');
      createLI_Element.setAttribute('id', cart.items[i].product);
      createLI_Element.textContent = `Item: ${cart.items[i].product}  Qty: ${cart.items[i].quantity}`//The name of the item in the cart and Quantity
      parentElement.appendChild(createLI_Element);
    }
  }

}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process

var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();
