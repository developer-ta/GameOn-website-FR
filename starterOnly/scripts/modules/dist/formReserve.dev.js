"use strict";

var _console_Log = function _console_Log(str) {
  return console.log(str);
}; //Récupérer les champs saisis de formulaire


var $firstName_Input = document.getElementById('first');
var $name_Input = document.getElementById('last');
var $email_Input = document.getElementById('email');
var $birthDate_Input = document.getElementById('birthdate');
var $quantity_Input = document.getElementById('quantity');
var $locations_Input = document.querySelectorAll("input[name='location']");
var $condition1_Input = document.getElementById('checkbox1');
var $condition2_Input = document.getElementById('checkbox2'); //Récupérer le div contenant des checkboxes des villes

var $location_tag = document.getElementById('location'); //Récupérer le bouton de soumission du formulaire

var $submit_btn = document.querySelector("input[type='submit']"); // Ajax data

/** @type {object} 
/**
 * Objet qui représente une réservation de forme.
 * @typedef {Object} Inscription
 * @property {string} firstName - Le nom complet de la personne effectuant la réservation.
 * @property {string} Name - Le nom complet de la personne effectuant la réservation.
 * @property {string} email - L'adresse e-mail de la personne effectuant la réservation.
 * @property {string} date - La date de la réservation.
 * @property {number} numberOfPeople - Le nombre de personnes pour la réservation.
 * @property {string[]} cities - Les villes sélectionnées pour la réservation.
 */

var dataReserve = {}; //validation form by condition

/** 
*
@type {boolean[]} */

var areAllValide = []; //var regExp

var regExDate = '^0[0-9]|[12][0-9]|3[01]/(0[1-9]|1[1,2])/(19|20)d{2}$';
var regExEmail = '[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+';
var regExName = '^[a-zA-Z._-]+$';
var regExQuantity = '^[0-9]+$'; //message errors

var MgErrors = {
  name: {
    empty: 'Veuillez entrer votre nom.',
    invalid: 'Le nom que vous avez saisi est invalide. Veuillez réessayer.'
  },
  firstName: {
    empty: 'Veuillez entrer votre prénom.',
    invalid: 'Le prénom que vous avez saisi est invalide. Veuillez réessayer.'
  },
  email: {
    empty: 'Veuillez entrer une adresse email valide.',
    invalid: "L'adresse email que vous avez saisie est invalide. Veuillez réessayer."
  },
  date: {
    empty: 'Veuillez entrer votre date de naissance.',
    invalid: 'la date de naissance que vous avez saisie est invalide. Veuillez réessayer.'
  },
  quantity: {
    empty: 'Veuillez indiquer combien de tournois GameOn vous avez déjà participé.',
    invalid: 'Veuillez saisir un nombre valide pour le nombre de tournois GameOn auxquels vous avez participé.'
  },
  location: {
    empty: 'Veuillez sélectionner une ville.'
  },
  conditions: {
    empty: "Veuillez accepter les conditions d'utilisation pour continuer."
  }
}; // Les fonctions validation input name/email/date

var validateDateIn = function validateDateIn() {
  debugger;
  var valideVal = valideValue(regExDate, $birthDate_Input, MgErrors.date);

  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    areAllValide.push(true);
    return;
  }

  _console_Log('validateDateIn no valide!');

  areAllValide.push(false);
};

var validateEmailIn = function validateEmailIn() {
  debugger;
  var valideVal = valideValue(regExEmail, $email_Input, MgErrors.email);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    areAllValide.push(true);
    return;
  }

  _console_Log('email no valide!');

  areAllValide.push(false);
}; //name or firstName


var validateIdentity = function validateIdentity(identity) {
  debugger;
  var valideVal = '';

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

var validateQuantityIn = function validateQuantityIn() {
  debugger;
  var valideVAl = valideValue(regExQuantity, $quantity_Input, MgErrors.quantity);

  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    areAllValide.push(true);
    return;
  }

  areAllValide.push(false);

  _console_Log('quantity no valide!');
}; // extension for validate form input value


var valideValue = function valideValue(regex, elementInput, errorMg) {
  debugger;
  var reg = new RegExp(regex);

  var _el = elementInput.value.trim();

  var errorVisible = false;
  elementInput.parentNode.setAttribute('data-error-visible', errorVisible);

  if (reg.test(_el)) {
    return _el;
  }

  elementInput.parentNode.setAttribute('data-error', "".concat(_el.length > 0 ? errorMg.invalid : errorMg.empty));
  elementInput.parentElement.dataset.errorVisible = !errorVisible;

  _console_Log(elementInput);

  return '';
};

var checkLocationIn = function checkLocationIn() {
  var errorVisible = false;
  $location_tag.setAttribute('data-error-visible', errorVisible);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = $locations_Input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (el.checked) {
        dataReserve.location = el.value;
        areAllValide.push(true);
        debugger;

        _console_Log(el);

        return;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $location_tag.setAttribute('data-error', "".concat(MgErrors.location.empty));
  $location_tag.dataset.errorVisible = !errorVisible;
  areAllValide.push(false);

  _console_Log('Location no checked!');
};

var checkConditionAccepted = function checkConditionAccepted() {
  debugger;
  var errorVisible = false;
  $condition2_Input.parentNode.setAttribute('data-error-visible', errorVisible);

  if (!$condition1_Input.checked) {
    $condition2_Input.parentNode.setAttribute('data-error', "".concat(MgErrors.conditions.empty));
    $condition2_Input.parentElement.dataset.errorVisible = !errorVisible;
    return;
  }

  dataReserve.conditionsAccepted = [$condition1_Input.checked, $condition2_Input.checked];
};

var initFormValidator = function initFormValidator() {
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
  var isValide = true;
  if (initFormValidator().includes(false)) isValide = false;
  return isValide;
} // on click submit


$submit_btn.addEventListener('click', function (ev) {
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