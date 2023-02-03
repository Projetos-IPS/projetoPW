function showSignUp() {
  document.getElementById('login').style.display = "none";
  document.getElementById('company').style.display = "none";
  document.getElementById('profissional').style.display = "flex";
}

function signUpCompany() {
  document.getElementById('login').style.display = "none";
  document.getElementById('profissional').style.display = "none";
  document.getElementById('company').style.display = "flex";
}

function hideSignUp() {
  document.getElementById('login').style.display = "block";
  document.getElementById('profissional').style.display = "none";
  document.getElementById('company').style.display = "none";
}

function getChoiceFemale() {
  document.getElementById('female').style.color = "white";
  document.getElementById('male').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('other').style.color = "rgba(255, 255, 255, 0.503)";
}

function getChoiceMale() {
  document.getElementById('male').style.color = "white";
  document.getElementById('female').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('other').style.color = "rgba(255, 255, 255, 0.503)";
}

function getChoiceOther() {
  document.getElementById('other').style.color = "white";
  document.getElementById('male').style.color = "rgba(255, 255, 255, 0.503)";
  document.getElementById('female').style.color = "rgba(255, 255, 255, 0.503)";
}








