
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
}

window.onload = init;


function imprimirArrayValorDesc(){
    document.getElementById('listajobs').style.display="none";
    document.getElementById('listajobsValorDesc').style.display="block";
    document.getElementById('listajobsValorAsc').style.display="none";

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