
function getProfileData(){
    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    
        var profileImg = document.getElementById('profile');
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
                    
    
                            menuPortfolios.style.display = "none";
                        }
                        if(dataUser[0].tipo_utilizador == 'Empresa')
                        {
                            menuJobOffers.style.display = "none";
                            profileName.innerHTML = UserData[0].nome;
                        
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
    
    var init = function(){
        getProfileData();
    };
    
    window.onload = init;