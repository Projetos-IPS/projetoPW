
function getProfileData(){
const xhrImage = new XMLHttpRequest();
    xhrImage.open('GET', '/Profile/getUserDataP', true);
    xhrImage.setRequestHeader('Content-Type', 'application/json');

    var profileImg = document.getElementById('profile');
    var profileImgProfile = document.getElementById('profile-img');
    var profileName = document.getElementById('profile-name');
    var profileLocation = document.getElementById('profile-address');
    var profileOccupation = document.getElementById('profile-occupation');
    var profileDescription = document.getElementById('profile-description');

    xhrImage.onload = function(){
        if(xhrImage.status === 200)
        {
        var data = JSON.parse(xhrImage.responseText);
        if(data[0].genero == 'Feminino')
        {
            profileImg.src = "../images/profile-female.png";
            profileImgProfile.src = "../images/profile-female.png";
        }
        else if(data[0].genero == 'Masculino')
        {
            profileImg.src = "../images/profile-male.png";
            profileImgProfile.src = "../images/profile-male.png";
        }
        else if(data[0].genero == 'other')
        {
            profileImg.src = "../images/profile-other.png";
            profileImgProfile.src = "../images/profile-other.png";
        }

        profileName.innerHTML = data[0].nome;
        profileLocation.innerHTML = data[0].localidade;
        profileOccupation.innerHTML = data[0].occupation;
        
        if(data[0].descricao == "")
        {
            profileDescription.innerHTML = "No description"
        }
        else
        {
        profileDescription.innerHTML = data[0].descricao;
        }
      
    



        console.log(data[0]);
      }
    };
    xhrImage.send();
}
var init = function(){
    getProfileData();
};

window.onload = init;