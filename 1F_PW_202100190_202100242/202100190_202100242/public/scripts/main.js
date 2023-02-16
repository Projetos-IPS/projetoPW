

function getLoggedUserData() {
    const xhrloggedUserType = new XMLHttpRequest();
    xhrloggedUserType.open('GET', '/Home/getloggedinUserType', true);
    xhrloggedUserType.setRequestHeader('Content-Type', 'application/json');
    let username_show = document.getElementById('user-name-show');
    let profile_pic_show = document.getElementById('profile');
    let profile_hyperlink = document.getElementById('profile-hyperlink');
    let profile_hyperlink_menu = document.getElementById('profile-menu');

    xhrloggedUserType.onload = function () {
        if (xhrloggedUserType.status === 200) {
            let loggedUserType = JSON.parse(xhrloggedUserType.responseText);

            if (loggedUserType[0].tipo_utilizador == 'Profissional') {
                const xhrloggedUserinformationProfissional = new XMLHttpRequest();
                xhrloggedUserinformationProfissional.open('GET', '/Home/getloggedinUserInformationProfissional', true);
                xhrloggedUserinformationProfissional.setRequestHeader('Content-Type', 'application/json');
                xhrloggedUserinformationProfissional.onload = function () {
                    if (xhrloggedUserinformationProfissional.status === 200) {
                        let profissionalInfo = JSON.parse(xhrloggedUserinformationProfissional.responseText);
                        username_show.innerHTML = profissionalInfo[0].nome;
                        if (profissionalInfo[0].genero == 'Feminino') {
                            profile_pic_show.src = '../images/profile-female.png';
                        }
                        else if (profissionalInfo[0].genero == 'Masculino') {
                            profile_pic_show.src = '../images/profile-male.png';
                        }
                        else if (profissionalInfo[0].genero == 'other') {
                            profile_pic_show.src = '../images/profile-other.png';
                        }

                    }
                }
                xhrloggedUserinformationProfissional.send();
                document.getElementById('aprovar-utilizadores').style.display = "none";
                document.getElementById('portfolios-menu').style.display = "none";

            }
            if (loggedUserType[0].tipo_utilizador == 'Empresa') {
                const xhrloggedUserinformationEmpresa = new XMLHttpRequest();
                xhrloggedUserinformationEmpresa.open('GET', '/Home/getloggedinUserInformationEmpresa', true);
                xhrloggedUserinformationEmpresa.setRequestHeader('Content-Type', 'application/json');
                xhrloggedUserinformationEmpresa.onload = function () {
                    if (xhrloggedUserinformationEmpresa.status === 200) {
                        let empresaInfo = JSON.parse(xhrloggedUserinformationEmpresa.responseText);
                        username_show.innerHTML = empresaInfo[0].nome;
                        profile_pic_show.src = '../images/profile_company.png';
                    }
                }
                xhrloggedUserinformationEmpresa.send();
                document.getElementById('aprovar-utilizadores').style.display = "none";
                document.getElementById('joboffers-menu').style.display = "none";
            }

            if (loggedUserType[0].tipo_utilizador == 'Admin') {
                document.getElementById('home-menu').style.display = "none";
                document.getElementById('joboffers-menu').style.display = "none";
                document.getElementById('profile-menu').style.display = "none";
                document.getElementById('team-page').style.display = "none";
                profile_pic_show.style.display = "none";
                document.getElementById('admin-name-show').style.display = 'inline';
            }

            const xhrloggedUserID = new XMLHttpRequest();
            xhrloggedUserID.open('GET', '/Home/getloggedinUserID', true);
            xhrloggedUserID.setRequestHeader('Content-Type', 'application/json');
            xhrloggedUserID.onload = function () {
                if (xhrloggedUserID.status === 200) {
                    let idUser = JSON.parse(xhrloggedUserID.responseText);
                    profile_hyperlink.href = "Profile/" + idUser[0].id;
                    profile_hyperlink_menu.href = "Profile/" + idUser[0].id;
                    username_show.href = "Profile/" + idUser[0].id;
                }
            }
            xhrloggedUserID.send();


        }
    }
    xhrloggedUserType.send();
}

function createshowUsers(){
    const xhrUserInfo = new XMLHttpRequest();
    xhrUserInfo.open('GET', 'Home/getUsersProfissionaisInformation', true);
    xhrUserInfo.setRequestHeader('Content-Type', 'application/json');
    xhrUserInfo.onload = function () {
        if (xhrUserInfo.status === 200) {
            let userInfo = JSON.parse(xhrUserInfo.responseText);

            const xhrlistUsers = new XMLHttpRequest();
            xhrlistUsers.open('GET', 'Home/getUsersProfissionais', true);
            xhrlistUsers.setRequestHeader('Content-Type', 'application/json');
            let divFriends = document.getElementById('main-side');
            xhrlistUsers.onload = function () {
                if (xhrlistUsers.status === 200) {
                    let listUsers = JSON.parse(xhrlistUsers.responseText);
        
                    for(let i = 0; i < listUsers.length; i++)
                    {
                        let div = document.createElement('div');
                        div.id = "user";
                        div.className = "user";
                        let div_image = document.createElement('div');
                        div_image.className = "user-image";
                        let a_image = document.createElement('a');
                        a_image.id = "profile-user";
                        let img_user = document.createElement('img');
                        img_user.id = "img_user";
                        a_image.appendChild(img_user);
                        div_image.appendChild(a_image);
                        div.appendChild(div_image);
                        a_image.dataset.id = listUsers[i].id;
                        a_image.href = "../Profile/" + a_image.dataset.id;
        
                        
                        let div_userinfo = document.createElement('div');
                        div_userinfo.className = "user-info";
                        let a_userinfo = document.createElement('a');
                        let h3_userinfo = document.createElement('h3');
                        h3_userinfo.innerHTML = listUsers[i].nome;
                        let h6_userinfo = document.createElement('h6');
                        div_userinfo.appendChild(a_userinfo);
                        a_userinfo.appendChild(h3_userinfo);
                        div_userinfo.appendChild(h6_userinfo);
                        div.appendChild(div_userinfo);
                        a_userinfo.dataset.id = listUsers[i].id;
                        a_userinfo.href = "../Profile/" + a_userinfo.dataset.id;
        
                        let div_buttons = document.createElement('div');
                        div_buttons.className = "add-buttons";
                        let button1 = document.createElement('button');
                        button1.className = "add-icon";
                        let button2 = document.createElement('button');
                        button2.className = "add-button-hover";
                        let img_btn1 = document.createElement('img');
                        button1.appendChild(img_btn1);
                        let img_btn2 = document.createElement('img');
                        button2.appendChild(img_btn2);
                        div_buttons.appendChild(button1);
                        div_buttons.appendChild(button2);
                        div.appendChild(div_buttons);
                        img_btn1.src = "../images/user-add.png";
                        img_btn2.src = "../images/user-add-hover.png";
                        divFriends.appendChild(div);
        
        
                        //-------------------------------

                        if(listUsers[i].email == userInfo[i].email)
                        {
                            if(userInfo[i].genero == 'Feminino')
                            {
                                img_user.src = "../images/profile-female.png";
                            }
                            if(userInfo[i].genero == 'Masculino')
                            {
                                img_user.src = "../images/profile-male.png";
                            }
                            if(userInfo[i].genero == 'other')
                            {
                                img_user.src = "../images/profile-other.png";
                            }
                            
                            h6_userinfo.innerHTML = userInfo[i].headline;
                        }
                    }
                }
            }
            xhrlistUsers.send();
        }

        
    }
    xhrUserInfo.send();

}



var init = function () {
    getLoggedUserData();
    createshowUsers();
};

window.onload = init;

function addFriend() {
    alert("ADD");
}