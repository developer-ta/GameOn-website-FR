// DOM Elements
const modalBg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const closeModalIcon = document.querySelector('.close');
const formData = document.querySelectorAll('.formData');

modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
closeModalIcon.addEventListener('click', launchModal);

// launch modal event
function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// launch modal form adb close by closeModalIcon / open modal
function launchModal() {
  console.log(modalBg.style.display);
  if (modalBg.style.display !== 'block') {
    modalBg.style.display = 'block';
    return;
  }
  modalBg.style.display = 'none';
}


