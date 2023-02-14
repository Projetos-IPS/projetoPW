var userID = window.location.href.split('/').pop();

function getLoggedUserData(){
    const xhrloggedUser = new XMLHttpRequest();
    xhrloggedUser.open('GET', '/Profile/getloggedinUser', true);
    xhrloggedUser.setRequestHeader('Content-Type', 'application/json');

    xhrloggedUser.onload = function()
    {
        if(xhrloggedUser === 200)
        {
            let loggedUserData = JSON.parse(xhrloggedUser.responseText);
            document.getElementById('user-name-show').innerHTML = loggedUserData[0].nome;
        }
    }
    xhrloggedUser.send();
}

function closeEditIntro(){
    document.getElementById('pop-up-edit').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editProfile').reset();
    getLoggedUserData();
}

function openEditIntro(){
    
   
}

function submitFormDataP(){

       
}

function closeEditDescription(){
    document.getElementById('pop-up-edit-description').style.display = "none";
    document.getElementById('page-mask').style.display = "none";
    document.getElementById('editDescriptionProfileP').reset();
    getProfileData();
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
   // submitFormDataP();

};

window.onload = init;