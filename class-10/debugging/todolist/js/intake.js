'use strict';

var intakeSubmit = document.getElementById('intakeForm');
var intakeModal = document.getElementById('intakeModal');
var userName = '';

//handler function for intake form
function intakeHandler(event) {
  event.preventDefault();

  userName = document.getElementById('formName').value;

  localStorage.setItem('name', userName);
  intakeModal.style.display = 'none';
}

//display intake form
function displayIntake () {
  var result = localStorage.getItem('name');
  if (result) {
    intakeModal.style.display = 'none';
  }
}

//event listener for intake form submit
intakeSubmit.addEventListener('submit', intakeHandler);

displayIntake();
