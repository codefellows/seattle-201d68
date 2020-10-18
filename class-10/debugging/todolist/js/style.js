/////////to make the daily form appear//////////////
// Get the daily modal
var dailyModal = document.getElementById('dailyModal');

// Get the button that opens the modal
var dailyButton = document.getElementById('addDaily');

// Get the <span> element that closes the modal
var closeDaily = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
dailyButton.onclick = function() {
  event.preventDefault();
  dailyModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeDaily.onclick = function() {
  dailyModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === dailyModal) {
    dailyModal.style.display = 'none';
  }
  else if (event.target === todoModal) {
    todoModal.style.display = 'none';
  }
  else if (event.target === dailyDetailModal) {
    dailyDetailModal.style.display = 'none';
  }
  else if (event.target === todoDetailModal) {
    todoDetailModal.style.display = 'none';
  }
};

////////////to make the todo form appear////////////////
// Get the todo modal
var todoModal = document.getElementById('todoModal');

// Get the button that opens the modal
var todoButton = document.getElementById('addTodo');

// Get the <span> element that closes the modal
var closeOne = document.getElementsByClassName('close')[2];

// When the user clicks on the button, open the modal
todoButton.onclick = function() {
  event.preventDefault();
  todoModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeOne.onclick = function() {
  todoModal.style.display = 'none';
};

/////////to make the daily task detail form appear//////////////
// Get the daily detail modal
var dailyDetailModal = document.getElementById('dailyDetailModal');

// Get the <span> element that closes the modal
var closeDailyDetail = document.getElementsByClassName('close')[1];

//event handler for when "Click Me" text area is clicked

// When the user clicks on <span> (x), close the modal
closeDailyDetail.onclick = function() {
  dailyDetailModal.style.display = 'none';
};

/////////to make the daily task detail form appear//////////////
// Get the todo detail modal
var todoDetailModal = document.getElementById('todoDetailModal');

// Get the <span> element that closes the modal
var closeToDoDetail = document.getElementsByClassName('close')[4];

// When the user clicks on <span> (x), close the modal
closeToDoDetail.onclick = function() {
  todoDetailModal.style.display = 'none';
};
