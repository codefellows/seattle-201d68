'use strict';

var curAvatarElement = document.getElementById('slideimg0');
var nextAvatarElement = document.getElementById('slideimg1');
var userName = localStorage.getItem('name');
var avatarClass = 'Peasant';
var avatarName = 'Peasant';
var avatarURL = 'img/sick-girl.png';
var currentPoints = 0;
loadCurrentPoints();
loadClassName();
loadAvatarName();
loadAvatarURL();

function loadClassName() {
  let className = localStorage.getItem('class');
  if (className){
    avatarClass = className;
  }
}

function loadAvatarName(){
  let avName = localStorage.getItem('avatarName');
  if(avName){
    avatarName = avName;
    curAvatarElement.alt = avName;
  }
}

function loadAvatarURL(){
  let avURL = localStorage.getItem('avatarURL');
  if(avURL){
    avatarURL = avURL;
    curAvatarElement.src = avURL;
  }
}

function saveAvatarName(){
  localStorage.setItem('avatarName',avatarName);
}

function saveAvatarURL(){
  localStorage.setItem('avatarURL',avatarURL);
}

//figures out the current class of user
function userCurrentClass() {
  if (currentPoints < 10){
    avatarClass = 'Peasant';
  } else if (currentPoints < 20) {
    avatarClass = 'Farmer';
  } else if (currentPoints < 50) {
    avatarClass = 'Master Farmer';
  } else if (currentPoints < 100) {
    avatarClass = 'Craftsperson';
  } else if (currentPoints < 200) {
    avatarClass = 'Artisan';
  } else if (currentPoints < 400) {
    avatarClass = 'Lord';
  } else if (currentPoints < 1000) {
    avatarClass = 'Mage';
  } else if (currentPoints < 2500) {
    avatarClass = 'Royalty';
  } else {
    avatarClass = 'God';
  }

  var oldClass = localStorage.getItem('class');
  if (oldClass !== avatarClass) {
    levelUpClass();
    levelUpAvatar();
    levelUpFireworks();
  }
}

function levelUpClass(){
  localStorage.setItem('class', avatarClass);
  let currentClassElement = document.getElementById('currentClass');
  currentClassElement.innerHTML = avatarClass;
}

function levelUpFireworks() {
  document.getElementById('fireSentence').classList.add('fire');
  setTimeout(fireOff, 4000);
}

function fireOff () {
  document.getElementById('fireSentence').classList.remove('fire');
}

function levelUpAvatar(){
  let newAvPair = lookupAvatar();
  let newAvURL = newAvPair[0];
  let newAvName = newAvPair[1];
  nextAvatarElement.src = newAvURL;
  nextAvatarElement.alt = newAvName;
  curAvatarElement.classList.remove('forceShow');
  curAvatarElement.classList.add('hideMe');
  nextAvatarElement.classList.add('showMe');
  nextAvatarElement.classList.remove('forceHide');
  setTimeout(resetAvatarAnim, 1000);
}

function resetAvatarAnim(){
  curAvatarElement.src = nextAvatarElement.src;
  curAvatarElement.alt = nextAvatarElement.alt;
  curAvatarElement.classList.remove('hideMe');
  curAvatarElement.classList.add('forceShow');
  nextAvatarElement.classList.remove('showMe');
  nextAvatarElement.classList.add('forceHide');
  avatarName = curAvatarElement.alt;
  avatarURL = curAvatarElement.src;
  saveAvatarName();
  saveAvatarURL();
}

//adding points below the header avatar
var getAvatar = document.getElementById('avatar');
var addedElement = addElement('p', currentPoints.toString(), getAvatar);
var pScore = document.createTextNode('  points');
addedElement.setAttribute('id', 'displayedPoints');
displayedPoints.appendChild(pScore);

//adding class above the header avatar
var className = document.createTextNode(avatarClass);
var classNameElement = document.createElement('p');
classNameElement.appendChild(className);
getAvatar = document.getElementById('avatar');
addedElement = getAvatar.insertBefore(classNameElement, getAvatar.firstChild);
addedElement.setAttribute('id', 'currentClass');
userCurrentClass();

//adding big character to character page

// make a function where I generate an image element and attach it to characterAvatar then call the function each time
function generateImage(targetImage) {
  if (generateImage){
    var img = document.createElement('img');
    img.setAttribute('src', targetImage);
    // var characterAvatar = document.getElementById('bigCharacter');
    // characterAvatar.appendChild(img);
  }
}

function lookupAvatar() {
  let tempAv = 'img/sick-girl.png';
  let tempName = 'Peasant';
  if (currentPoints < 10){
    tempAv = 'img/sick-girl.png';
    tempName = 'Peasant';
  } else if (currentPoints < 20) {
    tempAv = 'img/farmer.png';
    tempName = 'Farmer';
  } else if (currentPoints < 50) {
    tempAv = 'img/masterfarmer.png';
    tempName = 'Master Farmer';
  } else if (currentPoints < 100) {
    tempAv = 'img/artist.png';
    tempName = 'Craftsperson';
  } else if (currentPoints < 200) {
    tempAv = 'img/leader.png';
    tempName = 'Artisan';
  } else if (currentPoints < 400) {
    tempAv = 'img/king.png';
    tempName = 'Lord';
  } else if (currentPoints < 1000) {
    tempAv = 'img/magician.png';
    tempName = 'Mage';
  } else if (currentPoints < 2500) {
    tempAv = 'img/queen.png';
    tempName = 'Royalty';
  } else {
    tempAv = 'img/zeus.png';
    tempName = 'God';
  }
  return [tempAv,tempName];
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
      generateImage('img/king.png');
    } else if (currentPoints < 1000) {
      generateImage('img/magician.png');
    } else if (currentPoints < 2500) {
      generateImage('img/queen.png');
    } else {
      generateImage('img/zeus.png');
    }
  }
}

// adding character name to character page
// userName = a variable to hold the users name and store in local storage.
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
    } else if (currentPoints < 20) {
      avatarNext = 'Master Farmer';
      points = 20 - currentPoints;
    } else if (currentPoints < 50) {
      avatarNext = 'Craftsperson';
      points = 50 - currentPoints;
    } else if (currentPoints < 100) {
      avatarNext = 'Artisan';
      points = 100 - currentPoints;
    } else if (currentPoints < 200) {
      avatarNext = 'Lord';
      points = 200 - currentPoints;
    } else if (currentPoints < 400) {
      avatarNext = 'Mage';
      points = 400 - currentPoints;
    } else if (currentPoints < 1000) {
      avatarNext = 'Royalty';
      points = 1000 - currentPoints;
    } else if (currentPoints < 2500) {
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



