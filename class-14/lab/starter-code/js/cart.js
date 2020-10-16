/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() { }

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var parentElement = document.getElementById('cart');
  // TODO: Iterate over the items in the cart
  for (var i = 0; i < itemsInCart.length; i++) {
    // TODO: Create a TR
    var trElement = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    var deleteLinkTdElement = document.createElement('td');
    var quantityTdElement = document.createElement('td');
    var itemTdElement = document.createElement('td');
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    trElement.appendChild(deleteLinkTdElement);
    trElement.appendChild(quantityTdElement);
    trElement.appendChild(itemTdElement);
  }
  parentElement.appendChild(trElement);

}
showCart();
function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
