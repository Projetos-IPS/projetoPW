
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
    { companyName: 'Kwalee', description: 'Senior Software Engineer - Frontend', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '€39,532'}, 
    { companyName: 'Reaktor', description: 'Senior Frontend Engineer', position: jobOfferPosition.SOFTWAREENGINEER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '€42,000'},
    { companyName: 'Smart Consulting', description: 'Java developer Junior', position: jobOfferPosition.COMPUTERPROGRAMMER, duration: 'Fulltime', location: 'Lisbon/Portugal', salary: '€42,000'},
    { companyName: 'DevoTeam', description: 'Data Analyst', position: jobOfferPosition.DATASCIENTIST, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '€52,000'},
   { companyName: 'ADENTIS Portugal', description: 'SQL developer', position: jobOfferPosition.DATABASEADMINISTRATOR, duration: 'Fulltime/Remote', location: 'Lisbon/Portugal', salary: '€47,000'},
];


var init = function(){


    var ulListaOfertas = document.getElementById("listajobs")

    for (let i = 0; i < data.length; i++)
    {
            var liJobOffer = document.createElement("li");
            var img = document.createElement("img");
            liJobOffer.className = "jobsinfo";
            liJobOffer.id = "jobsinfoo";
            img.className = "imgjob";
            img.src = "images/arrow.png";

            var br = document.createElement("br");
            var br2 = document.createElement("br");
            var br3 = document.createElement("br");
            var br4 = document.createElement("br");
            var br5 = document.createElement("br");
            var textLiJobOffer = document.createTextNode(data[i].companyName + " looking for " + data[i].description);
            var textLiJobOffer2 = document.createTextNode("Position: " + data[i].position);
            var textLiJobOffer5 = document.createTextNode("Duration: " + data[i].duration);
            var textLiJobOffer3 = document.createTextNode("Location: " + data[i].location);
            var textLiJobOffer4 = document.createTextNode("Yearly salary: " + data[i].salary);
            
            liJobOffer.appendChild(br);
            liJobOffer.appendChild(textLiJobOffer);
            liJobOffer.appendChild(br2);
            liJobOffer.appendChild(textLiJobOffer2);
            liJobOffer.appendChild(br3);
            liJobOffer.appendChild(textLiJobOffer5);
            liJobOffer.appendChild(br5);
            liJobOffer.appendChild(textLiJobOffer3);
            liJobOffer.appendChild(br4);
            liJobOffer.appendChild(textLiJobOffer4);
        
            liJobOffer.append(img);
            ulListaOfertas.appendChild(liJobOffer);
    }
}

window.onload = init;


