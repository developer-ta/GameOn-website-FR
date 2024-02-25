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
let regExName = '^[a-zA-Z._-]+$';
let regExQuantity = '^[0-9]+$';

//message errors
const MgErrors = {
  name: {
    empty: 'Veuillez entrer votre nom.',
    invalid: 'Le nom que vous avez saisi est invalide. Veuillez réessayer.',
  },
  firstName: {
    empty: 'Veuillez entrer votre prénom.',
    invalid: 'Le prénom que vous avez saisi est invalide. Veuillez réessayer.',
  },
  email: {
    empty: 'Veuillez entrer une adresse email valide.',
    invalid: "L'adresse email que vous avez saisie est invalide. Veuillez réessayer.",
  },
  date: {
    empty: 'Veuillez entrer votre date de naissance.',
    invalid: 'la date de naissance que vous avez saisie est invalide. Veuillez réessayer.',
  },
  quantity: {
    empty: 'Veuillez indiquer combien de tournois GameOn vous avez déjà participé.',
    invalid:
      'Veuillez saisir un nombre valide pour le nombre de tournois GameOn auxquels vous avez participé.',
  },
  location: {
    empty: 'Veuillez sélectionner une ville.',
  },
  conditions: { empty: "Veuillez accepter les conditions d'utilisation pour continuer." },
};
// Les fonctions validation input name/email/date
let validateDateIn = () => {
  debugger;

  let valideVal = valideValue(regExDate, $birthDate_Input, MgErrors.date);
  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    areAllValide.push(true);
    return;
  }
  _console_Log('validateDateIn no valide!');
  areAllValide.push(false);
};

let validateEmailIn = () => {
  debugger;

  let valideVal = valideValue(regExEmail, $email_Input, MgErrors.email);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    areAllValide.push(true);
    return;
  }
  _console_Log('email no valide!');
  areAllValide.push(false);
};
//name or firstName
let validateIdentity = (identity) => {
  debugger;
  let valideVal = '';

  if (identity === 'firstName') {
    valideVal = valideValue(regExName, $firstName_Input, MgErrors.firstName);
    if (valideVal !== '') {
      dataReserve.firstName = valideVal;
      areAllValide.push(true);
      return;
    }
  } else {
    debugger;
    valideVal = valideValue(regExName, $name_Input, MgErrors.name);
    if (valideVal !== '') {
      dataReserve.name = valideVal;
      areAllValide.push(true);
      return;
    }
  }
  areAllValide.push(false);
  _console_Log('name no valide!');
};

let validateQuantityIn = () => {
  debugger;

  let valideVAl = valideValue(regExQuantity, $quantity_Input, MgErrors.quantity);
  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    areAllValide.push(true);
    return;
  }
  areAllValide.push(false);
  _console_Log('quantity no valide!');
};
// extension for validate form input value
let valideValue = (regex, elementInput, errorMg) => {
  debugger;
  let reg = new RegExp(regex);
  let _el = elementInput.value.trim();
  let errorVisible = false;
  elementInput.parentNode.setAttribute(
    'data-error',
    `${_el.length > 0 ? errorMg.invalid : errorMg.empty}`
  );
  elementInput.parentNode.setAttribute('data-error-visible', errorVisible);

  if (reg.test(_el)) {
    // elementInput.classList.remove('error');
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

  let errorVisible = false;
  $location_tag.setAttribute('data-error', `${MgErrors.location.empty}`);
  $location_tag.setAttribute('data-error-visible', errorVisible);
  for (const el of $locations_Input) {
    if (el.checked) {
      dataReserve.location = el.value;
      areAllValide.push(true);
      debugger;
      _console_Log(el);
      return;
    }
  }
  // $location_tag.insertAdjacentHTML('afterend', `<span id="errorMg">${errorMg}</span>`);
  $location_tag.dataset.errorVisible = !errorVisible;
  areAllValide.push(false);
  _console_Log('Location no checked!');
};

let checkConditionAccepted = () => {
  debugger;

  let errorVisible = false;
  $condition2_Input.parentNode.setAttribute('data-error', `${MgErrors.conditions.empty}`);
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
  if (initFormValidator().includes(false)) isValide = false;
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

