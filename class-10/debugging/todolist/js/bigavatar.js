'use strict';

var userName = localStorage.getItem('name');
//adding big character to character page

// make a function where I generate an image element and attach it to characterAvatar then call the function each time
function generateImage(targetImage) {
  if (generateImage){
    var img = document.createElement('img');
    img.setAttribute('src', targetImage);
    var characterAvatar = document.getElementById('bigCharacter');
    characterAvatar.appendChild(img);
  }
}

function characterAvatar() {
  if (characterAvatar){
    if (currentPoints < 10){
      generateImage('img/sick-girl.png');
    } else if (currentPoints < 20) {
      generateImage('img/farmer.png');
    } else if (currentPoints < 50) {
      generateImage('img/masterfarmer.png');
    } else if (currentPoints < 100) {
      generateImage('img/artist.png');
    } else if (currentPoints < 200) {
      generateImage('img/leader.png');
    } else if (currentPoints < 400) {
      generateImage('img/lord.png');
    } else if (currentPoints < 1000) {
      generateImage('img/magician.png');
    } else if (currentPoints < 2500) {
      generateImage('img/queen.png');
    } else {
      generateImage('img/zues.png');
    }
  }
}

//adding character name to character page
//userName = a variable to hold the users name and store in local storage.
function characterName() {
  var characterName = document.getElementById('characterName');
  if (characterName) {
    characterName.innerHTML = userName + ' the ' + avatarClass;
  }
}

//populating the users current experience points to character page
function characterPoints() {
  var characterPoints = document.getElementById('characterPoints');
  if (characterPoints) {
    characterPoints.innerHTML = currentPoints;
  }
}

//populating the Next Character Level in the character page
function characterNext() {
  var characterNext = document.getElementById('characterNext');
  var points = 0;
  var avatarNext = 'Peasant';

  if (characterNext) {

    if (currentPoints < 10){
      avatarNext = 'Farmer';
      points = 10 - currentPoints;
    } else if (10 <= currentPoints < 20) {
      avatarNext = 'Master Farmer';
      points = 20 - currentPoints;
    } else if (20 <= currentPoints < 50) {
      avatarNext = 'Craftsperson';
      points = 50 - currentPoints;
    } else if (50 <= currentPoints < 100) {
      avatarNext = 'Artisan';
      points = 100 - currentPoints;
    } else if (100 <= currentPoints < 200) {
      avatarNext = 'Lord';
      points = 200 - currentPoints;
    } else if (200 <= currentPoints < 400) {
      avatarNext = 'Mage';
      points = 400 - currentPoints;
    } else if (400 <= currentPoints < 1000) {
      avatarNext = 'Royalty';
      points = 1000 - currentPoints;
    } else if (1000 <= currentPoints < 2500) {
      avatarNext = 'God';
      points = 2500 - currentPoints;
    } else {
      avatarNext = 'Ruler Of Everything';
      points = 100000000;
    }

    characterNext.innerHTML = 'Only ' + points + ' points until ' + avatarNext + '!';
  }
}

characterPoints();
characterAvatar();
characterName();
characterNext();
