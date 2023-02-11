
function getProfileData(){
const xhrUser = new XMLHttpRequest();
xhrUser.open('GET', '/Profile/getUser', true);
xhrUser.setRequestHeader('Content-Type', 'application/json');

    var profileImg = document.getElementById('profile');
    var profileImgProfile = document.getElementById('profile-img');
    var profileName = document.getElementById('profile-name');
    var profileLocation = document.getElementById('profile-address');
    var profileHeadline = document.getElementById('profile-headline');
    var profileDescription = document.getElementById('profile-description');
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

                        menuPortfolios.style.display = "none";
                    }
                    if(dataUser[0].tipo_utilizador == 'Empresa')
                    {
                        menuJobOffers.style.display = "none";
                        profileName.innerHTML = UserData[0].nome;
                        menuPortfolios.style.display = "none";
                        
                    
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

function closeEdit(){
    document.getElementById('pop-up-edit').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editProfile').reset();
    getProfileData();
}

function openEdit(){
    var inputEditName = document.getElementById('nameUser');
    var inputDescription = document.getElementById('descriptionUser');
    var inputLocation = document.getElementById('locationUser');
    var inputHeadline = document.getElementById('headlineUser');

    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    

    xhrUser.onload = function(){
        
        if(xhrUser.status === 200)
        {
            document.getElementById('pop-up-edit').style.display = 'block';
            document.getElementById('page-mask').style.display = 'block';
            var dataUser = JSON.parse(xhrUser.responseText);

           const xhrUserData = new XMLHttpRequest();
           xhrUserData.open('GET', '/Profile/getUserDataP', true);
           xhrUserData.setRequestHeader('Content-Type', 'application/json');

            xhrUserData.onload = function(){
                if(xhrUserData.status = 200){

                    var UserData = JSON.parse(xhrUserData.responseText);
                    if(dataUser[0].tipo_utilizador == 'Profissional')
                    {
                        inputEditName.value = UserData[0].nome;
                
                        if(UserData[0].descricao != "")
                        {
                            inputDescription.value = UserData[0].descricao;
                        }
                        if(UserData[0].headline != "")
                        {
                            inputHeadline.value = UserData[0].headline;
                        }
                        if(UserData[0].localidade != "")
                        {
                            inputLocation.value = UserData[0].localidade;
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


   
}

var init = function(){
    getProfileData();

};

window.onload = init;