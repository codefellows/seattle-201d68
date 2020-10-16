/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart = new Cart([]);

function loadCart() {  //Retrieve items from local strorage, and convert back to instances.
  // add if statement to deterime if data exsists.  If not output a message.
  var cartItems = JSON.parse(localStorage.getItem('shoppingCart'));
  for (var i = 0; i < cartItems.length; i++) {
    new CartItem(cartItems[i].product, cartItems[i].quantity);
  }
  console.log(cart);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {

  var tagArray = document.getElementsByTagName('tbody');
  tagArray[0].innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tagArray = document.getElementsByTagName('tbody'); //at index[0]
  var trElement;
  var tdDelete;
  var tdQuantity;
  var tdItem;
  for (var i = 0; i < cart.items.length; i++) {
    trElement = document.createElement('tr');

    tdDelete = document.createElement('td');
    tdDelete.setAttribute('id', 'deleteBox');

    tdQuantity = document.createElement('td');
    tdQuantity.textContent = cart.items[i].quantity;

    tdItem = document.createElement('td');
    tdItem.textContent = cart.items[i].product;

    trElement.appendChild(tdDelete);
    trElement.appendChild(tdQuantity);
    trElement.appendChild(tdItem);
    tagArray[0].appendChild(trElement);

  }
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
