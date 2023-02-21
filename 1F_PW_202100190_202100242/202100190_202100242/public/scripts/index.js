/**
 * Displays the sign up form for regular users.
 * Hides the login and company sign up forms if displayed.
*/
function showSignUp() {
  document.getElementById('login').style.display = "none";
  document.getElementById('company').style.display = "none";
  document.getElementById('profissional').style.display = "flex";
}

/**
 * Displays the sign up form for companies.
 * Hides the login and regular user sign up forms if displayed.
*/
function signUpCompany() {
  document.getElementById('login').style.display = "none";
  document.getElementById('profissional').style.display = "none";
  document.getElementById('company').style.display = "flex";
}

/**
 * Hides all sign up forms and displays the login form.
*/
function hideSignUp() {
  document.getElementById('login').style.display = "block";
  document.getElementById('profissional').style.display = "none";
  document.getElementById('company').style.display = "none";
}

/**
 * Highlights the "female" gender choice.
*/
function getChoiceFemale() {
  document.getElementById('female').style.color = "white";
  document.getElementById('male').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('other').style.color = "rgba(255, 255, 255, 0.503)";
}

/**
 * Highlights the "male" gender choice.
*/
function getChoiceMale() {
  document.getElementById('male').style.color = "white";
  document.getElementById('female').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('other').style.color = "rgba(255, 255, 255, 0.503)";
}

/**
 * Highlights the "other" gender choice.
*/
function getChoiceOther() {
  document.getElementById('other').style.color = "white";
  document.getElementById('male').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('female').style.color = "rgba(255, 255, 255, 0.503)";
}








