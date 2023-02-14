var userID = window.location.href.split('/').pop();

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

function getProfileInformation(){
    let profileImg = document.getElementById('profile-img');
    let profileName = document.getElementById('profile-name');
    let profileHeadline = document.getElementById('profile-headline');
    let profileAddress = document.getElementById('profile-address');
    let profileDescription = document.getElementById('profile-description');

    const xhrprofiletype = new XMLHttpRequest();
    xhrprofiletype.open('GET', '/Profile/getProfileType/' + userID, true);
    xhrprofiletype.setRequestHeader('Content-Type', 'application/json');
    xhrprofiletype.onload = function () {
        if (xhrprofiletype.status === 200) {
            profileType = JSON.parse(xhrprofiletype.responseText);
            if(profileType[0].tipo_utilizador == 'Profissional')
            {
                const xhrprofileprofissional = new XMLHttpRequest();
                xhrprofileprofissional.open('GET', '/Profile/getProfileInformationProfissional/' + userID, true);
                xhrprofileprofissional.setRequestHeader('Content-Type', 'application/json');
                xhrprofileprofissional.onload = function () {
                    if (xhrprofileprofissional.status === 200) {
                        informationProfile = JSON.parse(xhrprofileprofissional.responseText);
                        
                        if(informationProfile[0].genero == 'Feminino')
                        {
                            profileImg.src = '../images/profile-female.png';
                        }
                        else if(informationProfile[0].genero == 'Masculino')
                        {
                            profileImg.src = '../images/profile-male.png';
                        }
                        else if(informationProfile[0].genero == 'other')
                        {
                            profileImg.src = '../images/profile-other.png';
                        }
                        profileName.innerHTML = informationProfile[0].nome;
                        profileDescription.innerHTML = informationProfile[0].descricao;
                        profileHeadline.innerHTML = informationProfile[0].headline;
                        profileAddress.innerHTML = informationProfile[0].localidade;
                    }
                }
                xhrprofileprofissional.send();
            }
        }

    }
    xhrprofiletype.send();
}

function closeEditIntro(){
    document.getElementById('pop-up-edit').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editProfile').reset();
    getLoggedUserData();
}

function openEditIntro(){
    const xhruserprofileData= new XMLHttpRequest();
    xhruserprofileData.open('GET', '/Profile/getUserProfileData/' + userID, true);
    xhruserprofileData.setRequestHeader('Content-Type', 'application/json');
    xhruserprofileData.onload = function () {
        if (xhruserprofileData.status === 200) {
            userprofiledata = JSON.parse(xhruserprofileData.responseText);
            console.log(userprofiledata[0].nome);
        }

    }
    xhruserprofileData.send();
}

function submitFormDataP(){

       
}

function closeEditDescription(){
    document.getElementById('pop-up-edit-description').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editDescriptionProfileP').reset();
    getLoggedUserData();
}

function openEditDescription(){
    

   
}

/*function openEditDescription(){
    let inputDescription = document.getElementById('descriptionUser');

    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    

    xhrUser.onload = function(){
        
        if(xhrUser.status === 200)
        {
            document.getElementById('pop-up-edit').style.display = 'block';
            document.getElementById('page-mask').style.display = 'block';
            let dataUser = JSON.parse(xhrUser.responseText);

           const xhrUserData = new XMLHttpRequest();
           xhrUserData.open('GET', '/Profile/getUserDataP', true);
           xhrUserData.setRequestHeader('Content-Type', 'application/json');

            xhrUserData.onload = function(){
                if(xhrUserData.status = 200){

                    let UserData = JSON.parse(xhrUserData.responseText);
                    if(dataUser[0].tipo_utilizador == 'Profissional')
                    {
                        inputEditName.value = UserData[0].nome;
                
                        if(UserData[0].descricao != "")
                        {
                            inputDescription.value = UserData[0].descricao;
                        }
                    }
                    if(dataUser[0].tipo_utilizador == 'Empresa')
                    {
                     
                    }
                    if(dataUser[0].tipo_utilizador == 'Admin')
                    {
                        
                    }
                }
               
            } 

            xhrUserData.send();
            console.log(dataUser[0]);
         }
    }  
    xhrUser.send();


   
}*/

var init = function(){
    getLoggedUserData();
    getProfileInformation();
   // submitFormDataP();

};

window.onload = init;