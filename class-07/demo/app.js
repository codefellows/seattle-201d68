// GOAL: make the exact same table that we have in the html dynamically

// grab the parent element - tbody
var parentElement = document.getElementById('table');

function generateHeaderRow(){
  // create a tr
  var trElement = document.createElement('tr');
  
  var headerArray = ['Name', 'Type', 'Color', 'Age'];
  
  for(var i=0; i<headerArray.length; i++){
    // create a th
    var thElement = document.createElement('th');
    // fill it with content - 'Name'
    thElement.textContent = headerArray[i];
    // append to the tr element
    trElement.appendChild(thElement);
  }
  
  // append the tr to the tbody
  parentElement.appendChild(trElement);
}

function generateFluffyRow(){
  // create a tr
  var trElement = document.createElement('tr');

  var fluffyArray = ['fluffy', 'cat', 'white', 1];
  
  for(var i=0; i<fluffyArray.length; i++){
    // create a td
    var tdElement = document.createElement('td');
    // fill it with content - 'fluffy'
    tdElement.textContent = fluffyArray[i];
    // append it to the tr
    trElement.appendChild(tdElement);
  }
  
  // append the tr to the parent table
  parentElement.appendChild(trElement);
}

generateHeaderRow();
generateFluffyRow();