var _console_Log = (str) => console.log(str);
// DOM Elements from form
let $firstName_Input = document.getElementById('first');
let $name_Input = document.getElementById('last');
let $email_Input = document.getElementById('email');
let $birthDate_Input = document.getElementById('birthdate');

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
  let valideVal = valideValue(regExDate, $birthDate_Input);
  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    return areAllValide.push(true);
  }
  _console_Log('validateDateIn no valide!');
  return areAllValide.push(false);
};

let validateEmailIn = () => {
  debugger;
  let valideVal = valideValue(regExEmail, $email_Input);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    return areAllValide.push(true);
  }
  _console_Log('email no valide!');
  return areAllValide.push(false);
};

let validateFirstName = (identity) => {
  debugger;
  let valideVal = '';

  if (identity === 'firstName') {
    valideVal = valideValue(regExName, $firstName_Input);
    if (valideVal !== '') {
      dataReserve.firstName = valideVal;
      return areAllValide.push(true);
    }
  } else {
    valideVal = valideValue(regExName, $name_Input);
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
  let valideVAl = valideValue(regExQuantity, $quantity_Input);
  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    return areAllValide.push(true);
  }
  _console_Log('quantity no valide!');
  return areAllValide.push(false);
};
// extension
let valideValue = (regex, elementInput) => {
  debugger;
  let reg = new RegExp(regex);
  let _el = elementInput.value.trim();
  if (reg.test(_el)) {
    elementInput.classList.remove('error');
    return _el;
  }
  elementInput.classList.add('error');
  return '';
};

let isLocalChecked = () => {
  debugger;
  $locations_Input.forEach((el) => {
    if (el.checked) {
      dataReserve.location = el.value;
      return areAllValide.push(true);
    }
  });
  _console_Log('Location no checked!');
  return areAllValide.push(false);
};

let checkConditionAccepted = () => {
  debugger;
  if (!$condition1_Input.checked) {
    return;
  }
  dataReserve.conditionsAccepted = [$condition1_Input.checked, $condition2_Input.checked];
};

let initFormValidator = () => {
  debugger;
  validateFirstName('firstName');
  validateFirstName('Name');
  validateDateIn();
  validateQuantityIn();
  isLocalChecked();
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
  }
});

console.log('formReserve');
