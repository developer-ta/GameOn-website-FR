"use strict";

// DOM Elements
var modalBg = document.querySelector('.bground');
var modalBtn = document.querySelectorAll('.modal-btn');
var closeModalIcon = document.querySelector('.close');
var formData = document.querySelectorAll('.formData');
modalBtn.forEach(function (btn) {
  return btn.addEventListener('click', launchModal);
});
closeModalIcon.addEventListener('click', launchModal); // launch modal event

function editNav() {
  var x = document.getElementById('myTopnav');

  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
} // launch modal form adb close by closeModalIcon


function launchModal() {
  console.log(modalBg.style.display);

  if (modalBg.style.display !== 'block') {
    modalBg.style.display = 'block';
    return;
  }

  modalBg.style.display = 'none';
}

console.log('modal');