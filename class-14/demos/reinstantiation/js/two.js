'use strict';

var catbutton = document.getElementById('catbutton');

var handleCatButtonClick = function(){
  // gets the data out of local storage and storing it in a variable
  var catsFromLS = JSON.parse(localStorage.cats);
  console.log('allCats array after retrieving from local storage', allCats);

  // looping over the data from local storage
  // making a object instance using the name from the catsFromLS array so that we can can access the render function in the constructor
  for (var i = 0; i < catsFromLS.length; i++){
    var newCat = new Cat(catsFromLS[i].name);
    newCat.render();
  }
  console.log('allCats array after reinstantiating through our Cat constructor', allCats);
};

catbutton.addEventListener('click', handleCatButtonClick);
