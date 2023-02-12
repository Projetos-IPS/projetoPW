
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

function closeEdit(){
    document.getElementById('pop-up-edit').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editProfile').reset();
    getProfileData();
}

function openEdit(){
    let inputEditName = document.getElementById('nameUser');
    let inputDescription = document.getElementById('descriptionUser');
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