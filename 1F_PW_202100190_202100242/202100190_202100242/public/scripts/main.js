
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

    
    var init = function(){
        getLoggedUserData();
    };
    
    window.onload = init;