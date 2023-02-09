
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
    { companyName: 'Kwalee', description: 'Senior Software Engineer - Frontend', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '39.532'}, 
    { companyName: 'Reaktor', description: 'Senior Frontend Engineer', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '42.000'},
    { companyName: 'Smart Consulting', description: 'Java developer Junior', position: jobOfferPosition.COMPUTERPROGRAMMER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '42.000'},
    { companyName: 'DevoTeam', description: 'Data Analyst', position: jobOfferPosition.DATASCIENTIST, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '52.000'},
   { companyName: 'ADENTIS Portugal', description: 'SQL developer', position: jobOfferPosition.DATABASEADMINISTRATOR, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '47.000'},
];

var init = function(){
    var ulListaOfertas = document.getElementById("listajobs")
    var list = "";
    for(let job of data)
    {
        list += "<li class='listajobs'>"  + job.companyName  + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
        list += "<hr class='hr-jobs'>";
    }

    ulListaOfertas.innerHTML = list;

    getProfileData();
}

window.onload = init;


function imprimirArrayValorDesc(){
    document.getElementById('listajobs').style.display="none";
    document.getElementById('listajobsValorDesc').style.display="block";
    document.getElementById('listajobsValorAsc').style.display="none";
    document.getElementById('myInput2').style.display="none";
    document.getElementById('clear').reset();
    document.getElementById('myInput').style.display="none";
    document.getElementById('myInput3').style.display="block";
  

    data.sort((a, b) => b.salary - a.salary);

       var ulListaValor = document.getElementById("listajobsValorDesc");

       list="";

       for(let job of data)
       {
        list += "<li class='listajobs'>"  + job.companyName  + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
        list += "<hr class='hr-jobs'>";
       }

       ulListaValor.innerHTML=list;

}

function imprimirArrayValorAsc(){
    document.getElementById('listajobs').style.display="none";
    document.getElementById('listajobsValorDesc').style.display="none";
    document.getElementById('listajobsValorAsc').style.display="block";
    document.getElementById('myInput2').style.display="block";
    document.getElementById('clear').reset();
    document.getElementById('myInput').style.display="none";
    document.getElementById('myInput3').style.display="none";
    

    data.sort((a, b) => a.salary - b.salary);

       var ulListaValor = document.getElementById("listajobsValorAsc");

       list="";

       for(let job of data)
       {
        list += "<li class='listajobs'>"  + job.companyName  + " Looking for " + job.description + "<br>" + "<b> Position: </b>" + job.position + "<br>" + "<b> Duration: </b>" + job.duration + "<br>" + "<b>Location: </b>" + job.location + "<br>" + "<b>Yearly salary: </b>" + job.salary + "€" + "<br>" + "<img alt='arrowRedirect' src='images/arrow.png' class='arrow'> ";
        list += "<hr class='hr-jobs'>";
       }

       ulListaValor.innerHTML=list;

}

function search() {
    var input, filter, ul, li, i, txtValue;
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
    var input, filter, ul, li, i, txtValue;
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
    var input, filter, ul, li, i, txtValue;
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

  
  function getProfileData(){
    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    
        var profileImg = document.getElementById('profile');
        var menuPortfolios = document.getElementById('portfolios-menu');
        var menuJobOffers = document.getElementById('joboffers-menu');
        var menuHome = document.getElementById('home-menu');
        var menuProfile = document.getElementById('profile-menu');
        var menuApprove = document.getElementById('aprovar-utilizadores');
        var adminName = document.getElementById('admin-name-show');
    
        xhrUser.onload = function(){
            
            if(xhrUser.status === 200)
            {
                var dataUser = JSON.parse(xhrUser.responseText);
    
               const xhrUserData = new XMLHttpRequest();
               xhrUserData.open('GET', '/Profile/getUserDataP', true);
               xhrUserData.setRequestHeader('Content-Type', 'application/json');
    
                xhrUserData.onload = function(){
                    if(xhrUserData.status = 200){
    
                        var UserData = JSON.parse(xhrUserData.responseText);
                        
                      
    
                        if(dataUser[0].tipo_utilizador == 'Profissional')
                        {
                            if(UserData[0].genero == 'Feminino')
                            {
                                profileImg.src = "../images/profile-female.png";
                                
                            }
                            else if(UserData[0].genero == 'Masculino')
                            {
                                profileImg.src = "../images/profile-male.png";
                               
                            }
                            else if(UserData[0].genero == 'other')
                            {
                                profileImg.src = "../images/profile-other.png";
                                
                            }
                    
    
                            menuPortfolios.style.display = "none";
                        }
                        if(dataUser[0].tipo_utilizador == 'Empresa')
                        {
                            menuJobOffers.style.display = "none";
                            profileName.innerHTML = UserData[0].nome;
                        
                        }
                        if(dataUser[0].tipo_utilizador == 'Admin')
                        {
                            menuHome.style.display = "none";
                            menuProfile.style.display = "none";
                            menuApprove.style.display = "inline";
                            menuJobOffers.style.display = "none";
                            profileImg.style.display = "none";
                            adminName.style.display = "block";
                        }
    
    
                    }
                   
                } 
    
                xhrUserData.send();

             }
        }  
        xhrUser.send();
    }