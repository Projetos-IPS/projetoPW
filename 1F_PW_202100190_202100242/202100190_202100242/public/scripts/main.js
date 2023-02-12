function getProfileData(){
    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    
    let profileImg = document.getElementById('profile');
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
                        
                        if(dataUser[0].tipo_utilizador == 'Profissional')
                        {
                            if(UserData[0].genero == 'Feminino')
                            {
                                profileImg.src = "../images/profile-female.png";
                                
                            }
                            else if(UserData[0].genero == 'Masculino')
                            {
                                profileImg.src = "../images/profile-male.png";
                               
                            }
                            else if(UserData[0].genero == 'other')
                            {
                                profileImg.src = "../images/profile-other.png";
                                
                            }
                    
                            userName.innerHTML = UserData[0].nome;
                            menuApprove.style.display = "none";
                            menuPortfolios.style.display = "none";
                        }
                        if(dataUser[0].tipo_utilizador == 'Empresa')
                        {
                            menuJobOffers.style.display = "none";
                            menuPortfolios.style.display = "none";
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
    
    var init = function(){
        getProfileData();
    };
    
    window.onload = init;