
var init = function() {
    getProfileImg();
};

function getProfileImg() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/Profile/getUserDataP', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var profileImg = document.getElementById('profile');

    xhr.onload = function(){
        if(xhr.status === 200)
        {
        var data = JSON.parse(xhr.responseText);
        if(data[0].genero == 'Feminino')
        {
            profileImg.src = "../images/profile-female.png";
        }
        else if(data[0].genero == 'Masculino')
        {
            profileImg.src = "../images/profile-masculino.png";
        }
        else if(data[0].genero == 'other')
        {
            profileImg.src = "../images/profile-other.png";
        }
      }
    };
    xhr.send();
  }

  window.onload = init;
