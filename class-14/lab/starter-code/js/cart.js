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
function clearCart() {
  
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  var tableBody = document.getElementById('cart').getElements('tbody');
  for(var i = 0; i < cart.length; i++){
    var trElement = document.createElement('tr');
  // TODO: Create a TD for the delete link, quantity,  and the item
    var tdElement1 = document.createElement('td');
    tdElement1.textContent = cart[i].product;
    var tdElement2 = document.createElement('td');
    tdElement2.textContent = cart[i].quantity;
    var tdElement3 = document.createElement('td');
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    tableBody.appendChild(trElement);
  }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
