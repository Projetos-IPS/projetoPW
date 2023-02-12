
function getProfileData(){
    const xhrUser = new XMLHttpRequest();
    xhrUser.open('GET', '/Profile/getUser', true);
    xhrUser.setRequestHeader('Content-Type', 'application/json');
    
<<<<<<< HEAD
    let profileImg = document.getElementById('profile');
    let menuPortfolios = document.getElementById('portfolios-menu');
    let menuJobOffers = document.getElementById('joboffers-menu');
    let menuHome = document.getElementById('home-menu');
        let menuProfile = document.getElementById('profile-menu');
        let menuApprove = document.getElementById('aprovar-utilizadores');
        let adminName = document.getElementById('admin-name-show');
        let teamMenu = document.getElementById('team-page');
=======
        var profileImg = document.getElementById('profile');
        var menuPortfolios = document.getElementById('portfolios-menu');
        var menuJobOffers = document.getElementById('joboffers-menu');
        var menuHome = document.getElementById('home-menu');
        var menuProfile = document.getElementById('profile-menu');
        var menuApprove = document.getElementById('aprovar-utilizadores');
        var adminName = document.getElementById('admin-name-show');
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
    
        xhrUser.onload = function(){
            
            if(xhrUser.status === 200)
            {
<<<<<<< HEAD
                let dataUser = JSON.parse(xhrUser.responseText);
=======
                var dataUser = JSON.parse(xhrUser.responseText);
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
    
               const xhrUserData = new XMLHttpRequest();
               xhrUserData.open('GET', '/Profile/getUserDataP', true);
               xhrUserData.setRequestHeader('Content-Type', 'application/json');
    
                xhrUserData.onload = function(){
                    if(xhrUserData.status = 200){
    
<<<<<<< HEAD
                        let UserData = JSON.parse(xhrUserData.responseText);
=======
                        var UserData = JSON.parse(xhrUserData.responseText);
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
                        
                       
    
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
                    
    
<<<<<<< HEAD
                            menuApprove.style.display = "none";
=======
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
                            menuPortfolios.style.display = "none";
                        }
                        if(dataUser[0].tipo_utilizador == 'Empresa')
                        {
                            menuJobOffers.style.display = "none";
                            profileName.innerHTML = UserData[0].nome;
<<<<<<< HEAD
                            menuPortfolios.style.display = "none";
=======
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
                        
                        }
                        if(dataUser[0].tipo_utilizador == 'Admin')
                        {
                            menuHome.style.display = "none";
                            menuProfile.style.display = "none";
<<<<<<< HEAD
                            menuJobOffers.style.display = "none";
                            profileImg.style.display = "none";
                            adminName.style.display = "block";
                            teamMenu.style.display = "none";
                        }

                    }

                    if(dataUser[0].tipo_utilizador == 'Empresa') {
                        menuJobOffers.style.display = "none";
                        profileName.innerHTML = UserData[0].nome;
                    }
                        
                    if(dataUser[0].tipo_utilizador == 'Admin') {
                        menuHome.style.display = "none";
                        menuProfile.style.display = "none";
                        menuApprove.style.display = "inline";
                        menuJobOffers.style.display = "none";
                        profileImg.style.display = "none";
                        adminName.style.display = "block";
                    }
                }
            } 
=======
                            menuApprove.style.display = "inline";
                            menuJobOffers.style.display = "none";
                            profileImg.style.display = "none";
                            adminName.style.display = "block";
                        }
>>>>>>> parent of e1ec7aa (alinhamentos e quês)
    
    
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