'use strict';

// GOAL:  make a cat array of object insances and save them into local storage

var allCats = [];

function Cat(name = 'bob', breed = '', color = 'raindbow', sheds = true, age = 100){
  this.name = name;
  this.breed = breed;
  this.color = color;
  this.sheds = sheds;
  this.age = age;
  allCats.push(this);
}

new Cat('odin', 'american short hair', 'black', 'little', .5);
new Cat('chief', 'american short hair', ['gray', 'white'], true, 9);
new Cat('saraphina', 'american short hair', ['black', 'white'], false, 1.5);
new Cat('momo', 'american short hair', 'brown tabby', false, 12);

console.log('1. my all Cats array:', allCats);

// 1. turn my array into JSON

var stringifyCats = JSON.stringify(allCats);

// console.log('2. my all Cats array as JSON:', stringifyCats);

// [{"name":"odin","breed":"american short hair","color":"black","sheds":"little","age":0.5},{"name":"chief","breed":"american short hair","color":["gray","white"],"sheds":true,"age":9},{"name":"saraphina","breed":"american short hair","color":["black","white"],"sheds":false,"age":1.5},{"name":"momo","breed":"american short hair","color":"brown tabby","sheds":false,"age":12}]

// 2. put my JSON into local storage
  // local storage works by taking in two value - a key and value
  // the key can be whatever you want, but the value is the JSON you are putting in LS

localStorage.setItem('cats', stringifyCats);

// 3. get the cats out of local storage
  // getItems - just takes the key

var catsFromLocalStorage = localStorage.getItem('cats');

// console.log('3. cats from local storage:', catsFromLocalStorage);

// 4. parse the cat array that I got back 

var parsedCats = JSON.parse(catsFromLocalStorage);

console.log('4. parsed cats from local storage:', parsedCats);