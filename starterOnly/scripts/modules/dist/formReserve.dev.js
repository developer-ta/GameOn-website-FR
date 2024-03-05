"use strict";

//Récupérer les champs saisis de formulaire
var $firstName_Input = document.getElementById('first');
var $name_Input = document.getElementById('last');
var $email_Input = document.getElementById('email');
var $birthDate_Input = document.getElementById('birthdate');
var $quantity_Input = document.getElementById('quantity');
var $locations_Input = document.querySelectorAll("input[name='location']");
var $condition1_Input = document.getElementById('checkbox1');
var $condition2_Input = document.getElementById('checkbox2'); //Récupérer le div contenant des checkboxes des villes

var $location_tag = document.getElementById('location'); //Récupérer le bouton de soumission du formulaire

var $submit_btn = document.querySelector("input[type='submit']"); // Objet qui représente une réservation de forme.

var dataReserve = {};
/**
 *@type {boolean[]}  */

var areAllValide = []; //regExp

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
}; // Les fonctions pour valider la valeur d'entrée du formulaire pour firstName/name/email/date/Quantity

var validateDateIn = function validateDateIn() {
  var valideVal = valideValue(regExDate, $birthDate_Input, MgErrors.date);

  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    areAllValide.push(true);
    return;
  }

  areAllValide.push(false);
};

var validateEmailIn = function validateEmailIn() {
  var valideVal = valideValue(regExEmail, $email_Input, MgErrors.email);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    areAllValide.push(true);
    return;
  }

  areAllValide.push(false);
}; //identity = name / firstName


var validateIdentity = function validateIdentity(identity) {
  var valideVal = '';

  if (identity === 'firstName') {
    valideVal = valideValue(regExName, $firstName_Input, MgErrors.firstName);

    if (valideVal !== '') {
      dataReserve.firstName = valideVal;
      areAllValide.push(true);
      return;
    }
  } else {
    valideVal = valideValue(regExName, $name_Input, MgErrors.name);

    if (valideVal !== '') {
      dataReserve.name = valideVal;
      areAllValide.push(true);
      return;
    }
  }

  areAllValide.push(false);
};

var validateQuantityIn = function validateQuantityIn() {
  var valideVAl = valideValue(regExQuantity, $quantity_Input, MgErrors.quantity);

  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    areAllValide.push(true);
    return;
  }

  areAllValide.push(false);
}; //  extension pour valider la valeur d'entrée du formulaire pour firstName/name/email/date/Quantity


var valideValue = function valideValue(regex, elementInput, errorMg) {
  var reg = new RegExp(regex);

  var _el = elementInput.value.trim();

  var errorVisible = false;
  elementInput.parentNode.setAttribute('data-error-visible', errorVisible);

  if (reg.test(_el)) {
    return _el;
  }

  elementInput.parentNode.setAttribute('data-error', "".concat(_el.length > 0 ? errorMg.invalid : errorMg.empty));
  elementInput.parentElement.dataset.errorVisible = !errorVisible;
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
};

var checkConditionAccepted = function checkConditionAccepted() {
  var errorVisible = false;
  $condition2_Input.parentNode.setAttribute('data-error-visible', errorVisible);

  if (!$condition1_Input.checked) {
    $condition2_Input.parentNode.setAttribute('data-error', "".concat(MgErrors.conditions.empty));
    $condition2_Input.parentElement.dataset.errorVisible = !errorVisible;
    return;
  }

  dataReserve.conditionsAccepted = [$condition1_Input.checked, $condition2_Input.checked];
}; // initialisation 


var initFormValidator = function initFormValidator() {
  validateIdentity('firstName');
  validateIdentity('Name');
  validateEmailIn();
  validateDateIn();
  validateQuantityIn();
  checkLocationIn();
  checkConditionAccepted();
  return areAllValide;
}; //check validité de formulaire


function validate() {
  var isValide = true;
  if (initFormValidator().includes(false)) isValide = false;
  return isValide;
} // btn submit


$submit_btn.addEventListener('click', function (ev) {
  ev.preventDefault();

  if (!validate()) {
    console.log('validate no work');
    return;
  }

  console.log(dataReserve);
});