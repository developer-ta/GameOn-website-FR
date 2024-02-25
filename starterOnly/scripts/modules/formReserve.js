var _console_Log = (str) => console.log(str);
// DOM Elements from form
let $firstName_Input = document.getElementById('first');
let $name_Input = document.getElementById('last');
let $email_Input = document.getElementById('email');
let $birthDate_Input = document.getElementById('birthdate');
let $location_tag = document.getElementById('location');

//label =>À combien de tournois GameOn avez-vous déjà participé ?
let $quantity_Input = document.getElementById('quantity');

//A quel tournoi souhaitez-vous participer cette année ?
let $locations_Input = document.querySelectorAll("input[name='location']");

//J'ai lu et accepté les conditions d'utilisation.

let $condition1_Input = document.getElementById('checkbox1');
let $condition2_Input = document.getElementById('checkbox2');

//submit
let $submit_btn = document.querySelector("input[type='submit']");
// Ajax data
let dataReserve = {};

//validation form by condition
let areAllValide = [];

//var regExp
let regExDate = '^0[0-9]|[12][0-9]|3[01]/(0[1-9]|1[1,2])/(19|20)d{2}$';
let regExEmail = '[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+';
let regExName = '[a-z0-9._-]+';
let regExQuantity = '[0-9]+';

// Les fonctions validation input name/email/date

let validateDateIn = () => {
  debugger;
  let errorMg = 'validateDateIn no valide!';
  let valideVal = valideValue(regExDate, $birthDate_Input, errorMg);
  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    return areAllValide.push(true);
  }
  _console_Log('validateDateIn no valide!');
  return areAllValide.push(false);
};

let validateEmailIn = () => {
  debugger;
  let errorMg = 'email no valide!';
  let valideVal = valideValue(regExEmail, $email_Input, errorMg);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    return areAllValide.push(true);
  }
  _console_Log('email no valide!');
  return areAllValide.push(false);
};

let validateIdentity = (identity) => {
  debugger;
  let valideVal = '';
  let errorMg = `${identity} no valide no valide!`;
  if (identity === 'firstName') {
    valideVal = valideValue(regExName, $firstName_Input, errorMg);
    if (valideVal !== '') {
      dataReserve.firstName = valideVal;
      return areAllValide.push(true);
    }
  } else {
    debugger;
    valideVal = valideValue(regExName, $name_Input, errorMg);
    if (valideVal !== '') {
      dataReserve.name = valideVal;
      return areAllValide.push(true);
    }
  }
  _console_Log('name no valide!');
  return areAllValide.push(false);
};

let validateQuantityIn = () => {
  debugger;
  let errorMg = 'quantity no valide!';
  let valideVAl = valideValue(regExQuantity, $quantity_Input, errorMg);
  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    return areAllValide.push(true);
  }
  _console_Log('quantity no valide!');
  return areAllValide.push(false);
};
// extension for validate form input value
let valideValue = (regex, elementInput, errorMg) => {
  debugger;
  let errorVisible = false;
  elementInput.parentNode.setAttribute('data-error', `${errorMg}`);
  elementInput.parentNode.setAttribute('data-error-visible', errorVisible);
  let reg = new RegExp(regex);
  let _el = elementInput.value.trim();
  if (reg.test(_el)) {
    elementInput.classList.remove('error');
    return _el;
  }
  //elementInput.insertAdjacentHTML('afterend', `<span id="errorMg">${errorMg}</span>`);
  elementInput.parentElement.dataset.errorVisible = !errorVisible;
  _console_Log(elementInput);
  //elementInput.classList.add('error');

  return '';
};

let checkLocationIn = () => {
  debugger;
  let errorMg = 'Location no checked!';
  let errorVisible = false;
  $location_tag.setAttribute('data-error', `${errorMg}`);
  $location_tag.setAttribute('data-error-visible', errorVisible);

  $locations_Input.forEach((el) => {
    if (el.checked) {
      dataReserve.location = el.value;
      return areAllValide.push(true);
    }
  });
  // $location_tag.insertAdjacentHTML('afterend', `<span id="errorMg">${errorMg}</span>`);
  $location_tag.dataset.errorVisible = !errorVisible;
  _console_Log('Location no checked!');
  return areAllValide.push(false);
};

let checkConditionAccepted = () => {
  debugger;
  let errorMg = 'no check condition ';
  let errorVisible = false;
  $condition2_Input.parentNode.setAttribute('data-error', `${errorMg}`);
  $condition2_Input.parentNode.setAttribute('data-error-visible', errorVisible);

  if (!$condition1_Input.checked) {
    //$condition2_Input.insertAdjacentHTML('afterend', `<span id="errorMg">${errorMg}</span>`);
    $condition2_Input.parentElement.dataset.errorVisible = !errorVisible;
    return;
  }
  dataReserve.conditionsAccepted = [$condition1_Input.checked, $condition2_Input.checked];
};

let initFormValidator = () => {
  debugger;
  validateIdentity('firstName');
  validateIdentity('Name');
  validateEmailIn();
  validateDateIn();
  validateQuantityIn();
  checkLocationIn();
  checkConditionAccepted();
  return areAllValide;
};
function validate() {
  debugger;
  let isValide = true;
  initFormValidator().forEach((bool) => {
    if (!bool) isValide = false;
  });
  return isValide;
}

// on click submit
$submit_btn.addEventListener('click', (ev) => {
  debugger;
  ev.preventDefault();
  if (!validate()) {
    debugger;
    _console_Log('validate no work');
    return;
  }
  _console_Log(dataReserve);
});

console.log('formReserve');
_console_Log('_____________________' + $birthDate_Input);
