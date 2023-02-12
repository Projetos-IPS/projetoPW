const jobOfferPosition = {
  SUPPORTSPECIALIST: "Support specialist",
  WEBDEVELOPER: "Web developer",
  COMPUTERPROGRAMMER: "Computer programmer",
  SYSTEMSANALYST: "Systems analyst",
  SOFTWAREENGINEER: "Software engineer",
  DATABASEADMINISTRATOR: "Database administrator",
  DATASCIENTIST: "Data scientist",
  ITDIRECTOR: "IT director"
}

var data = [
  { companyName: 'Kwalee', description: 'Senior Software Engineer - Frontend', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '39.532' },
  { companyName: 'Reaktor', description: 'Senior Frontend Engineer', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '42.000' },
  { companyName: 'Smart Consulting', description: 'Java developer Junior', position: jobOfferPosition.COMPUTERPROGRAMMER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '42.000' },
  { companyName: 'DevoTeam', description: 'Data Analyst', position: jobOfferPosition.DATASCIENTIST, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '52.000' },
  { companyName: 'ADENTIS Portugal', description: 'SQL developer', position: jobOfferPosition.DATABASEADMINISTRATOR, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '47.000' },
];

var init = function () {
  let ulListaOfertas = document.getElementById("listajobs")
  let list = "";

  for (let job of data) {
    list += "<li class='listajobs'>" + job.companyName + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
    list += "<hr class='hr-jobs'>";
  }

  ulListaOfertas.innerHTML = list;
  getProfileData();
}

window.onload = init;

function imprimirArrayValorDesc() {
  document.getElementById('listajobs').style.display = "none";
  document.getElementById('listajobsValorDesc').style.display = "block";
  document.getElementById('listajobsValorAsc').style.display = "none";
  document.getElementById('myInput2').style.display = "none";
  document.getElementById('clear').reset();
  document.getElementById('myInput').style.display = "none";
  document.getElementById('myInput3').style.display = "block";


  data.sort((a, b) => b.salary - a.salary);

  let ulListaValor = document.getElementById("listajobsValorDesc");

  list = "";

  for (let job of data) {
    list += "<li class='listajobs'>" + job.companyName + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
    list += "<hr class='hr-jobs'>";
  }

  ulListaValor.innerHTML = list;
}

function imprimirArrayValorAsc() {
  document.getElementById('listajobs').style.display = "none";
  document.getElementById('listajobsValorDesc').style.display = "none";
  document.getElementById('listajobsValorAsc').style.display = "block";
  document.getElementById('myInput2').style.display = "block";
  document.getElementById('clear').reset();
  document.getElementById('myInput').style.display = "none";
  document.getElementById('myInput3').style.display = "none";

  data.sort((a, b) => a.salary - b.salary);
  let ulListaValor = document.getElementById("listajobsValorAsc");
  list = "";

  for (let job of data) {
    list += "<li class='listajobs'>" + job.companyName + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
    list += "<hr class='hr-jobs'>";
  }

  ulListaValor.innerHTML = list;
}

function search() {
  let input, filter, ul, li, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("listajobs");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function searchASC() {
  let input, filter, ul, li, i, txtValue;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  ul = document.getElementById("listajobsValorAsc");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function searchDESC() {
  let input, filter, ul, li, i, txtValue;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  ul = document.getElementById("listajobsValorDesc");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function getProfileData() {
  const xhrUser = new XMLHttpRequest();
  xhrUser.open('GET', '/Profile/getUser', true);
  xhrUser.setRequestHeader('Content-Type', 'application/json');

  let profileImg = document.getElementById('profile');
  let menuPortfolios = document.getElementById('portfolios-menu');
  let menuJobOffers = document.getElementById('joboffers-menu');
  let menuHome = document.getElementById('home-menu');
  let menuProfile = document.getElementById('profile-menu');
  let menuApprove = document.getElementById('aprovar-utilizadores');
  let adminName = document.getElementById('admin-name-show');
  let teamMenu = document.getElementById('team-page');
  let userName = document.getElementById('user-name-show');

  xhrUser.onload = function () {
    if (xhrUser.status === 200) {
      let dataUser = JSON.parse(xhrUser.responseText);
      const xhrUserData = new XMLHttpRequest();
      xhrUserData.open('GET', '/Profile/getUserDataP', true);
      xhrUserData.setRequestHeader('Content-Type', 'application/json');

      xhrUserData.onload = function () {
        if (xhrUserData.status = 200) {
          let UserData = JSON.parse(xhrUserData.responseText);

          if (dataUser[0].tipo_utilizador == 'Profissional') {
            if (UserData[0].genero == 'Feminino') {
              profileImg.src = "../images/profile-female.png";
            }
            else if (UserData[0].genero == 'Masculino') {
              profileImg.src = "../images/profile-male.png";
            }
            else if (UserData[0].genero == 'other') {
              profileImg.src = "../images/profile-other.png";
            }

            userName.innerHTML = UserData[0].nome;
            menuApprove.style.display = "none";
            menuPortfolios.style.display = "none";
          }

          if (dataUser[0].tipo_utilizador == 'Empresa') {
            menuJobOffers.style.display = "none";
            menuPortfolios.style.display = "none";
            profileName.innerHTML = UserData[0].nome;
            menuPortfolios.style.display = "none";
            userName.innerHTML = UserData[0].nome;
          }

          if (dataUser[0].tipo_utilizador == 'Admin') {
            menuHome.style.display = "none";
            menuProfile.style.display = "none";
            menuJobOffers.style.display = "none";
            profileImg.style.display = "none";
            adminName.style.display = "block";
            teamMenu.style.display = "none";
          }
        }
      }

      xhrUserData.send();
    }
  }
  
  xhrUser.send();
}