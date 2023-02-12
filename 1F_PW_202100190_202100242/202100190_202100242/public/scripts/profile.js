function getProfileData(){
const xhrUser = new XMLHttpRequest();
xhrUser.open('GET', '/Profile/getUser', true);
xhrUser.setRequestHeader('Content-Type', 'application/json');

let profileImg = document.getElementById('profile');
let profileImgProfile = document.getElementById('profile-img');
let profileName = document.getElementById('profile-name');
let profileLocation = document.getElementById('profile-address');
let profileHeadline = document.getElementById('profile-headline');
let profileDescription = document.getElementById('profile-description');
let menuPortfolios = document.getElementById('portfolios-menu');
let menuJobOffers = document.getElementById('joboffers-menu');
let menuHome = document.getElementById('home-menu');
let menuProfile = document.getElementById('profile-menu');
let menuApprove = document.getElementById('aprovar-utilizadores');
let adminName = document.getElementById('admin-name-show');
let teamMenu = document.getElementById('team-page');
let userName = document.getElementById('user-name-show');
  
    xhrUser.onload = function(){
        
        if(xhrUser.status === 200)
        {
            let dataUser = JSON.parse(xhrUser.responseText);

           const xhrUserData = new XMLHttpRequest();
           xhrUserData.open('GET', '/Profile/getUserDataP', true);
           xhrUserData.setRequestHeader('Content-Type', 'application/json');

            xhrUserData.onload = function(){
                if(xhrUserData.status = 200){

                    let UserData = JSON.parse(xhrUserData.responseText);
                    
                    console.log(UserData[0]);

                    if(dataUser[0].tipo_utilizador == 'Profissional')
                    {
                        if(UserData[0].genero == 'Feminino')
                        {
                            profileImg.src = "../images/profile-female.png";
                            profileImgProfile.src = "../images/profile-female.png";
                        }
                        else if(UserData[0].genero == 'Masculino')
                        {
                            profileImg.src = "../images/profile-male.png";
                            profileImgProfile.src = "../images/profile-male.png";
                        }
                        else if(UserData[0].genero == 'other')
                        {
                            profileImg.src = "../images/profile-other.png";
                            profileImgProfile.src = "../images/profile-other.png";
                        }
                

                        userName.innerHTML = UserData[0].nome;
                        profileName.innerHTML = UserData[0].nome;
                        profileLocation.innerHTML = UserData[0].localidade;
                        profileHeadline.innerHTML = UserData[0].headline;
                
                        if(UserData[0].descricao == "")
                        {
                            profileDescription.innerHTML = "No description"
                        }
                        else
                        {
                            profileDescription.innerHTML = UserData[0].descricao;
                        }

                        menuApprove.style.display = "none";
                        menuPortfolios.style.display = "none";
                    }
                    if(dataUser[0].tipo_utilizador == 'Empresa')
                    {
                        menuJobOffers.style.display = "none";
                        profileName.innerHTML = UserData[0].nome;
                        menuPortfolios.style.display = "none";
                        userName.innerHTML = UserData[0].nome;
                        
                    
                    }
                    if(dataUser[0].tipo_utilizador == 'Admin')
                    {
                        menuHome.style.display = "none";
                        menuProfile.style.display = "none";
                        menuJobOffers.style.display = "none";
                        profileImg.style.display = "none";
                        adminName.style.display = "block";
                        teamMenu.style.display = "none";
                        
                    }


                }
               
            } 

            xhrUserData.send();
         }
    }  
    xhrUser.send();
}

function closeEditIntro(){
    document.getElementById('pop-up-edit').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editProfileP').reset();
    getProfileData();
}

function openEditIntro(){
    let inputEditName = document.getElementById('nameUser');
    let inputLocation = document.getElementById('locationUser');
    let inputHeadline = document.getElementById('headlineUser');

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
                
                        if(UserData[0].headline != "")
                        {
                            inputHeadline.value = UserData[0].headline;
                        }
                        if(UserData[0].localidade != "")
                        {
                            inputLocation.value = UserData[0].localidade;
                        }
                        if(UserData[0].visualizacao == 1 )
                        {
                            document.getElementById('radio1').checked = true;
                        }
                        if(UserData[0].visualizacao == 0)
                        {
                            document.getElementById('radio0').checked = true;
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
         }
    }  
    xhrUser.send();


   
}

function submitFormDataP(){
const xhrUserType = new XMLHttpRequest();
xhrUserType.open('GET', '/Profile/getUser', true);
xhrUserType.setRequestHeader('Content-Type', 'application/json');

xhrUserType.onload = function(){
  if(xhrUserType.status === 200){

    let userType = JSON.parse(xhrUserType.responseText);

    if(userType[0].tipo_utilizador == 'Profissional')
    {     
          var formEditP = document.getElementById('editProfileP');
          formEditP.addEventListener('submit', function(event){
          event.preventDefault();

          const dataEdit = {
          nameUser: formEditP.nameUser.value,
          headlineUser : formEditP.headlineUser.value,
          locationUser : formEditP.locationUser.value,
          portfolioUser : formEditP.portfolioUser.value,
          portfolioApproval: formEditP.portfolioApproval.value
         };

         const editUserInfo = new XMLHttpRequest();
         editUserInfo.open('POST', '/Profile/editUserIntro', true);
         editUserInfo.setRequestHeader('Content-Type', 'application/json');
         editUserInfo.send(JSON.stringify(dataEdit));
         
         editUserInfo.onload = function(){
          if(editUserInfo.status === 200)
          {
            closeEditIntro();
          }
         };
        });

        var formEditDescriptionP = document.getElementById('editDescriptionProfileP');
        formEditDescriptionP.addEventListener('submit', function(event){
            event.preventDefault();

            const dataEdit2 = {
                descriptionUser : formEditDescriptionP.descriptionUser.value
            };

            const editUserDescription = new XMLHttpRequest();
            editUserDescription.open('POST', '/Profile/editUserDescription', true);
            editUserDescription.setRequestHeader('Content-Type', 'application/json');
            editUserDescription.send(JSON.stringify(dataEdit2));
            editUserDescription.onload = function(){
                if(editUserDescription.status === 200)
                {
                    closeEditDescription();
                }
            };
        });


    }
    else if(userType[0].tipo_utilizador == 'Empresa'){



    }

    else if(userType[0].tipo_utilizador == 'Admin'){


      
    }
}

}
xhrUserType.send();

       
}



function closeEditDescription(){
    document.getElementById('pop-up-edit-description').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editDescriptionProfileP').reset();
    getProfileData();
}

function openEditDescription(){
    let inputEditDescription = document.getElementById('descriptionUser');

    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    
    xhrUser.onload = function(){
        
        if(xhrUser.status === 200)
        {
            document.getElementById('pop-up-edit-description').style.display = 'block';
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
                        if(UserData[0].descricao != "")
                        {
                            inputEditDescription.value = UserData[0].descricao;
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
         }
    }  
    xhrUser.send();


   
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
    getProfileData();
    submitFormDataP();

};

window.onload = init;