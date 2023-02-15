

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


var init = function () {
    getLoggedUserData();
};

window.onload = init;

function addFriend() {
    alert("ADD");
}