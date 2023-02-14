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
 getLoggedUserData();
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

function getLoggedUserData(){
  const xhrloggedUser = new XMLHttpRequest();
  xhrloggedUser.open('GET', '/Home/getloggedinUser', true);
  xhrloggedUser.setRequestHeader('Content-Type', 'application/json');
  let username_show = document.getElementById('user-name-show');
  let profile_pic_show = document.getElementById('profile');
  let profile_hyperlink = document.getElementById('profile-hyperlink');
  let profile_hyperlink_menu = document.getElementById('profile-menu');

  xhrloggedUser.onload = function () {
      if (xhrloggedUser.status === 200) {
         let loggedUserData = JSON.parse(xhrloggedUser.responseText);
         username_show.innerHTML = loggedUserData[0].nome;
         if(loggedUserData[0].genero == 'Feminino')
         {
          profile_pic_show.src = "../images/profile-female.png";
         }
         else if(loggedUserData[0].genero == 'Masculino')
         {
          profile_pic_show.src = "../images/profile-male.png";
         }
         else if(loggedUserData[0].genero == 'other')
         {
          profile_pic_show.src = "../images/profile-other.png";
         }
         else
         {
          profile_pic_show.src = "../images/profile_company.png";
         }

         const xhrloggedUserID = new XMLHttpRequest();
         xhrloggedUserID.open('GET', '/Home/getloggedinUserID', true);
         xhrloggedUserID.setRequestHeader('Content-Type', 'application/json');
         xhrloggedUserID.onload = function () {
          if (xhrloggedUserID.status === 200) {
                  let idUser = JSON.parse(xhrloggedUserID.responseText);
                  profile_hyperlink.href = "Profile/" + idUser[0].id;
                  profile_hyperlink_menu.href = "Profile/" + idUser[0].id;
              }
          }
      xhrloggedUserID.send();
      }
  }
  xhrloggedUser.send();
}