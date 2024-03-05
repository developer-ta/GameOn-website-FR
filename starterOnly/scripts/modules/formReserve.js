//Récupérer les champs saisis de formulaire
const $firstName_Input = document.getElementById('first');
const $name_Input = document.getElementById('last');
const $email_Input = document.getElementById('email');
const $birthDate_Input = document.getElementById('birthdate');
const $quantity_Input = document.getElementById('quantity');
const $locations_Input = document.querySelectorAll("input[name='location']");
const $condition1_Input = document.getElementById('checkbox1');
const $condition2_Input = document.getElementById('checkbox2');

//Récupérer le div contenant des checkboxes des villes
const $location_tag = document.getElementById('location');

//Récupérer le bouton de soumission du formulaire
const $submit_btn = document.querySelector("input[type='submit']");

// Objet qui représente une réservation de forme.
const dataReserve = {};

/**
 *@type {boolean[]}  */
const areAllValide = [];

//regExp
const regExDate = '^0[0-9]|[12][0-9]|3[01]/(0[1-9]|1[1,2])/(19|20)d{2}$';
const regExEmail = '[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+';
const regExName = '^[a-zA-Z._-]+$';
const regExQuantity = '^[0-9]+$';

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

// Les fonctions valider la valeur d'entrée du formulaire pour firstName/name/email/date/Quantity
let validateDateIn = () => {
  

  let valideVal = valideValue(regExDate, $birthDate_Input, MgErrors.date);
  if (valideVal !== '') {
    dataReserve.birthDate = valideVal;
    areAllValide.push(true);
    return;
  }
  areAllValide.push(false);
};

let validateEmailIn = () => {
  

  let valideVal = valideValue(regExEmail, $email_Input, MgErrors.email);

  if (valideVal !== '') {
    dataReserve.email = valideVal;
    areAllValide.push(true);
    return;
  }
  areAllValide.push(false);
};

//identity = name / firstName
let validateIdentity = (identity) => {
  
  let valideVal = '';

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

let validateQuantityIn = () => {
  

  let valideVAl = valideValue(regExQuantity, $quantity_Input, MgErrors.quantity);
  if (valideVAl !== '') {
    dataReserve.quantity = valideVAl;
    areAllValide.push(true);
    return;
  }
  areAllValide.push(false);

};

//  extension pour valider la valeur d'entrée du formulaire pour firstName/name/email/date/Quantity
let valideValue = (regex, elementInput, errorMg) => {
  

  let reg = new RegExp(regex);
  let _el = elementInput.value.trim();

  let errorVisible = false;
  elementInput.parentNode.setAttribute('data-error-visible', errorVisible);

  if (reg.test(_el)) {
    return _el;
  }
  elementInput.parentNode.setAttribute(
    'data-error',
    `${_el.length > 0 ? errorMg.invalid : errorMg.empty}`
  );
  elementInput.parentElement.dataset.errorVisible = !errorVisible;
  
  return '';
};

let checkLocationIn = () => {
  let errorVisible = false;
  $location_tag.setAttribute('data-error-visible', errorVisible);
  for (const el of $locations_Input) {
    if (el.checked) {
      dataReserve.location = el.value;
      areAllValide.push(true);
      
     
       return;
    }
  }
  $location_tag.setAttribute('data-error', `${MgErrors.location.empty}`);
  $location_tag.dataset.errorVisible = !errorVisible;
  areAllValide.push(false);

};

let checkConditionAccepted = () => {

  let errorVisible = false;
  $condition2_Input.parentNode.setAttribute('data-error-visible', errorVisible);

  if (!$condition1_Input.checked) {
    $condition2_Input.parentNode.setAttribute('data-error', `${MgErrors.conditions.empty}`);
    $condition2_Input.parentElement.dataset.errorVisible = !errorVisible;
    return;
  }
  dataReserve.conditionsAccepted = [$condition1_Input.checked, $condition2_Input.checked];
};
// initialisation 
let initFormValidator = () => {
  
  validateIdentity('firstName');
  validateIdentity('Name');
  validateEmailIn();
  validateDateIn();
  validateQuantityIn();
  checkLocationIn();
  checkConditionAccepted();
  return areAllValide;
};

//check validité de formulaire
function validate() {
  
  let isValide = true;
  if (initFormValidator().includes(false)) isValide = false;
  return isValide;
}

// btn submit
$submit_btn.addEventListener('click', (ev) => {
  
  ev.preventDefault();
  if (!validate()) {
    
    console.log('validate no work');
    return;
  }
  console.log(dataReserve);
});


