function getLoggedUserData() {
    const xhrloggedUserType = new XMLHttpRequest();
    xhrloggedUserType.open('GET', '../Home/getloggedinUserType', true);
    xhrloggedUserType.setRequestHeader('Content-Type', 'application/json');
    let username_show = document.getElementById('user-name-show');
    let profile_pic_show = document.getElementById('profile');
    let profile_hyperlink = document.getElementById('profile-hyperlink');
    let profile_hyperlink_menu = document.getElementById('profile-menu');

    xhrloggedUserType.onload = function () {
        if (xhrloggedUserType.status === 200) {
            let loggedUserType = JSON.parse(xhrloggedUserType.responseText);

                const xhrloggedUserinformationProfissional = new XMLHttpRequest();
                xhrloggedUserinformationProfissional.open('GET', '../Home/getloggedinUserInformationProfissional', true);
                xhrloggedUserinformationProfissional.setRequestHeader('Content-Type', 'application/json');
                xhrloggedUserinformationProfissional.onload = function () {

                    
                    if (xhrloggedUserinformationProfissional.status === 200) {
                        let profissionalInfo = JSON.parse(xhrloggedUserinformationProfissional.responseText);

                        if (loggedUserType[0].tipo_utilizador == 'Profissional') {

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
                        document.getElementById('aprovar-utilizadores').style.display = "none";
                        document.getElementById('portfolios-menu').style.display = "none";
                        }
                        //  profile_hyperlink.dataset.email = profissionalInfo[0].email;


                        if (loggedUserType[0].tipo_utilizador == 'Empresa') {
                            const xhrloggedUserinformationEmpresa = new XMLHttpRequest();
                            xhrloggedUserinformationEmpresa.open('GET', '../Home/getloggedinUserInformationEmpresa', true);
                            xhrloggedUserinformationEmpresa.setRequestHeader('Content-Type', 'application/json');
                            xhrloggedUserinformationEmpresa.onload = function () {
                                if (xhrloggedUserinformationEmpresa.status === 200) {
                                    let empresaInfo = JSON.parse(xhrloggedUserinformationEmpresa.responseText);
                                    username_show.innerHTML = empresaInfo[0].nome;
                                    profile_pic_show.src = '../images/profile_company.png';
            
                                    if(profissionalInfo[0].visualizacao == 0){
                                        alert('This user doesnt allow companies to see his portfolio');
                                        window.location.href('../Home');
                                    }
                                  
                                    
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

                        profile_hyperlink.href = "../Profile/" + loggedUserType[0].id;
                        profile_hyperlink.dataset.userid = loggedUserType[0].id;
            
                        profile_hyperlink_menu.href = "../Profile/" + loggedUserType[0].id;
                        username_show.href = "../Profile/" + loggedUserType[0].id;
                }
                

            }
            xhrloggedUserinformationProfissional.send();

        }

    }
    xhrloggedUserType.send();
}
 
/**
 * 
 * This is a function that adds user information and buttons to the HTML document. The function sends a GET request to the server to retrieve a list of user information and another GET request to retrieve a list of users. It then loops through the user list and creates a div element for each user, adds user information to the div element, and adds two buttons to send a friend request and cancel a friend request. 
 * The function also defines an update function to update the button's status when a friend request is sent or canceled.
 * When a user clicks the button to send a friend request, the function creates an XMLHttpRequest to send a POST request to the server to add a new friend request. When the POST request is successful, the function calls the update function to update the button's status.
 * When a user clicks the button to cancel a friend request, the function creates an XMLHttpRequest to send a POST request to the server to cancel the friend request. When the POST request is successful, the function updates the button's status by displaying the button and hiding the "Sent" status.
 */
function showAddUsers(){
    let divFriends = document.getElementById('main-side');
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Add friends';
    h2.id = "h2-home";
    divFriends.appendChild(h2);
    const xhrUserInfo = new XMLHttpRequest();
    xhrUserInfo.open('GET', 'Home/getUsersProfissionaisInformation', true);
    xhrUserInfo.setRequestHeader('Content-Type', 'application/json');
    xhrUserInfo.onload = function () {
        if (xhrUserInfo.status === 200) {
            let userInfo = JSON.parse(xhrUserInfo.responseText);

            const xhrlistUsers = new XMLHttpRequest();
            xhrlistUsers.open('GET', 'Home/getUsersProfissionais', true);
            xhrlistUsers.setRequestHeader('Content-Type', 'application/json');
            xhrlistUsers.onload = function () {
                if (xhrlistUsers.status === 200) {
                    let listUsers = JSON.parse(xhrlistUsers.responseText);
                    
                    if(listUsers.length>0){
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
                        div_buttons.id = "add-buttons";
                        let button1 = document.createElement('button');
                        button1.className = "add-icon";
                        button1.dataset.id = listUsers[i].id;
                        let button2 = document.createElement('button');
                        button2.className = "add-button-hover";
                        button2.id = "btn2";
                        let img_btn1 = document.createElement('img');
                        button1.appendChild(img_btn1);
                        let img_btn2 = document.createElement('img');
                        button2.appendChild(img_btn2);
                        button2.dataset.id = listUsers[i].id;
                        div_buttons.appendChild(button1);
                        
                        button2.addEventListener('click', function(event) {
                            const dataRQ = {
                                userid : listUsers[i].id
                               };
                        
                               const xhrSendRequest = new XMLHttpRequest();
                               xhrSendRequest.open('POST', '/Home/sendFriendRequest', true);
                               xhrSendRequest.setRequestHeader('Content-Type', 'application/json');
                               xhrSendRequest.send(JSON.stringify(dataRQ));
                               
                               xhrSendRequest.onload = function(){
                                if(xhrSendRequest.status === 200)
                                {
                                 update();
                                }
                             
                               };
                        });
                        div_buttons.appendChild(button2);
                        div.appendChild(div_buttons);
                        
                        const xhrVerifyLoggedUserType = new XMLHttpRequest();
                        xhrVerifyLoggedUserType.open('GET', '/Home/getloggedinUserType', true);
                        xhrVerifyLoggedUserType.onload = function(){
                        if(xhrVerifyLoggedUserType.status === 200){
                            let userTypeConfirm = JSON.parse(xhrVerifyLoggedUserType.responseText);
                            if(userTypeConfirm[0].tipo_utilizador == 'Empresa')
                            {
                                document.getElementById('friend-requests').style.display = "none";
                                document.getElementById('friends').style.display = "none";
                                document.getElementById('h2-home').innerHTML = "Users list";
                                div_buttons.style.display = "none";
                            }
                        }
                        }
                        xhrVerifyLoggedUserType.send();
                        
                        img_btn1.src = "../images/user-add.png";
                        img_btn2.src = "../images/user-add-hover.png";
                        divFriends.appendChild(div);
                    //----------------------------------------

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

                    //----------------------------------------

                        function update(){
                            const xhrgetRequests = new XMLHttpRequest();
                            xhrgetRequests.open('GET', 'Home/getFriendRequests', true);
                            xhrgetRequests.setRequestHeader('Content-Type', 'application/json');
                            xhrgetRequests.onload = function () {
                                if (xhrgetRequests.status === 200) {
                                    let id_origem = document.getElementById('profile-hyperlink').getAttribute('data-userid');
                                    let requests = JSON.parse(xhrgetRequests.responseText);
                                        for(let i = 0; i < requests.length; i++)
                                        {
                                            if(requests[i].id_origem == id_origem && requests[i].id_destino == button2.dataset.id && requests[i].aprovado == 0)
                                            {
                                                div_buttons.style.display = "none";
                                                let p = document.createElement('a');
                                                p.style.cursor = 'pointer';
                                                p.className = "request-status";
                                                p.innerHTML = "Sent";
                                                p.addEventListener('click', function(event) {
                                                    const dataCFQ = {
                                                        userid : button2.dataset.id
                                                       };
                                                
                                                       const xhrSendRequest = new XMLHttpRequest();
                                                       xhrSendRequest.open('POST', '/Home/cancelFriendRequest', true);
                                                       xhrSendRequest.setRequestHeader('Content-Type', 'application/json');
                                                       xhrSendRequest.send(JSON.stringify(dataCFQ));
                                                       
                                                       xhrSendRequest.onload = function(){
                                                        if(xhrSendRequest.status === 200)
                                                        {
                                                            div_buttons.style.display = "block";
                                                            p.style.display = "none";
                                                        }
                                                     
                                                       };
                                                });
                                                div.appendChild(p);
                                            }
                                            else
                                            if (requests[i].id_destino == id_origem && requests[i].id_origem == button2.dataset.id && requests[i].aprovado == 0)
                                            {
                                                div_buttons.style.display = "none";
                                                let p = document.createElement('p');
                                                p.className = "request-status";
                                                p.innerHTML = "Received";
                                                div.appendChild(p);
                                            }
                                            else
                                            if ((requests[i].id_destino == id_origem && requests[i].id_origem == button2.dataset.id && requests[i].aprovado == 1) || (requests[i].id_origem == id_origem && requests[i].id_destino == button2.dataset.id && requests[i].aprovado == 1))
                                            {
                                                div.style.display = "none";
                                            }
                                    }
                                }
                            }
                            xhrgetRequests.send();
                        }
                    //----------------------------------------//
                        update();
                       // updateList();
                    }
                }

                
                }
            }
            xhrlistUsers.send();
        }
    }
    
    xhrUserInfo.send();
    
}

function showFriendRequests(){
    let divFriends = document.getElementById('friend-requests');
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Friend requests';
    divFriends.appendChild(h2);
    const xhrUserInfo2 = new XMLHttpRequest(); //1
    xhrUserInfo2.open('GET', 'Home/getUsersProfissionaisInformation', true);
    xhrUserInfo2.setRequestHeader('Content-Type', 'application/json');
    xhrUserInfo2.onload = function () {
        if (xhrUserInfo2.status === 200) {
            let userInfo2 = JSON.parse(xhrUserInfo2.responseText);

            const xhrlistUsers2 = new XMLHttpRequest(); //2
            xhrlistUsers2.open('GET', 'Home/getFriendRequests', true);
            xhrlistUsers2.setRequestHeader('Content-Type', 'application/json');
            xhrlistUsers2.onload = function () {
                if (xhrlistUsers2.status === 200) {
                    let id_destino = document.getElementById('profile-hyperlink').getAttribute('data-userid');
                    let listUsers = JSON.parse(xhrlistUsers2.responseText);
                 //   console.log(listUsers); // imprime o id_origem e destino do pedido
                    if(listUsers.length>0){
                    for(let i = 0; i < listUsers.length; i++)
                    {
                        if(listUsers[i].id_destino == id_destino && listUsers[i].aprovado == 0){
                            const xhrlistUsers3 = new XMLHttpRequest(); //3
                            xhrlistUsers3.open('GET', 'Home/getUsers', true);
                            xhrlistUsers3.setRequestHeader('Content-Type', 'application/json');
                            xhrlistUsers3.onload = function () {
                                if (xhrlistUsers3.status === 200) {
                                    let listUsers2 = JSON.parse(xhrlistUsers3.responseText);
                                 //   console.log(listUsers2); //imprime os friend requests
                                    var foundItem = listUsers2.find(item => item.id == listUsers[i].id_origem);
                                 //   console.log(foundItem.email); // imprime os dados do email encontrado
                                    var foundItem2 = listUsers2.find(item => item.id == listUsers[i].id_destino);
                                 //   console.log(foundItem2.email);
                                    //------------------
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
                                    a_image.dataset.id = listUsers[i].id_origem;
                                    a_image.href = "../Profile/" + a_image.dataset.id;
                    
                                    let div_userinfo = document.createElement('div');
                                    div_userinfo.className = "user-info";
                                    let a_userinfo = document.createElement('a');
                                    let h3_userinfo = document.createElement('h3');
                                    h3_userinfo.innerHTML = foundItem.nome;
                                    let h6_userinfo = document.createElement('h6');
                                    div_userinfo.appendChild(a_userinfo);
                                    a_userinfo.appendChild(h3_userinfo);
                                    div_userinfo.appendChild(h6_userinfo);
                                    div.appendChild(div_userinfo);
                                    a_userinfo.dataset.id = listUsers[i].id_origem;
                                    a_userinfo.href = "../Profile/" + a_userinfo.dataset.id;
                    
                                    let div_buttons = document.createElement('div');
                                    div_buttons.className = "add-buttons";
                                    div_buttons.id = "add-buttons2";

                                    let buttonAdd = document.createElement('a');
                                    let i1 = document.createElement('i');
                                    i1.style.margin = '15px';
                                    i1.className = 'fas fa-check';
                                    buttonAdd.appendChild(i1);
                                    buttonAdd.style.cursor = 'pointer';
                                    buttonAdd.className = "accept-icon";
                                    buttonAdd.dataset.id = listUsers[i].id_origem;

                                    buttonAdd.addEventListener('click', function(event) {
                                        const dataAdd = {
                                            destino : id_destino,
                                            origem : listUsers[i].id_origem,
                                            useremail : foundItem.email,
                                            destinoemail : foundItem2.email
                                           };
                                    
                                           const xhrAcceptRequest = new XMLHttpRequest();
                                           xhrAcceptRequest.open('POST', '/Home/acceptFriend', true);
                                           xhrAcceptRequest.setRequestHeader('Content-Type', 'application/json');
                                           xhrAcceptRequest.send(JSON.stringify(dataAdd));
                                           
                                           xhrAcceptRequest.onload = function(){
                                            if(xhrAcceptRequest.status === 200)
                                            {
                                                document.getElementById('main-side').innerHTML = "";
                                                showAddUsers();
                                                divFriends.innerHTML = "";
                                                showFriendRequests();
                                                document.getElementById('friends').innerHTML = "";
                                                showFriends();
                                            }
                                         
                                           };
                                    });
                                    div_buttons.appendChild(buttonAdd);

                                    let buttonReject = document.createElement('a');
                                    let i2 = document.createElement('i');
                                    i2.className = 'fas fa-trash-alt';
                                    buttonReject.appendChild(i2);
                                    buttonReject.style.cursor = 'pointer';
                                    buttonReject.className = "reject-icon";
                                    buttonReject.dataset.id = listUsers[i].id_origem;
                                    buttonReject.addEventListener('click', function(event) {
                                        const dataRemove = {
                                            destino : id_destino,
                                            origem : listUsers[i].id_origem,
                                           };
                                    
                                           const xhrRejectRequest = new XMLHttpRequest();
                                           xhrRejectRequest.open('POST', '/Home/deleteFriendRequest', true);
                                           xhrRejectRequest.setRequestHeader('Content-Type', 'application/json');
                                           xhrRejectRequest.send(JSON.stringify(dataRemove));
                                           
                                           xhrRejectRequest.onload = function(){
                                            if(xhrRejectRequest.status === 200)
                                            {
                                                document.getElementById('main-side').innerHTML = "";
                                                showAddUsers();
                                                divFriends.innerHTML = "";
                                                showFriendRequests();
                                                document.getElementById('friends').innerHTML = "";
                                                showFriends();
                                            }
                                         
                                           };
                                    });
                                    div_buttons.appendChild(buttonReject);
                                    
                                   

                                    div.appendChild(div_buttons);
                                    divFriends.appendChild(div);

                                    for(let x = 0; x < userInfo2.length; x++){
                                        if(userInfo2[x].email == foundItem.email){
                                            if(userInfo2[x].genero == 'Feminino')
                                            {
                                                img_user.src = "../images/profile-female.png";
                                            }
                                            if(userInfo2[x].genero == 'Masculino')
                                            {
                                                img_user.src = "../images/profile-male.png";
                                            }
                                            if(userInfo2[x].genero == 'other')
                                            {
                                                img_user.src = "../images/profile-other.png";
                                            }
                                      
                                            h6_userinfo.innerHTML = userInfo2[x].headline;
                                        }
                                    }
                                    

                                //-------------------------------
                                }
                            }
                            xhrlistUsers3.send();




                    }
                  }
                }

                
                }
            }
            xhrlistUsers2.send();
        }
    }
    
    xhrUserInfo2.send();
    
}

function showFriends(){
    let divFriends = document.getElementById('friends');
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Friends List';
    divFriends.appendChild(h2);
    const xhrUserInfor = new XMLHttpRequest();
    xhrUserInfor.open('GET', '../Home/getUsersProfissionaisInformation', true);
    xhrUserInfor.setRequestHeader('Content-Type', 'application/json');
    xhrUserInfor.onload = function () {
        if (xhrUserInfor.status === 200) {
            let userInfo = JSON.parse(xhrUserInfor.responseText);
  
            const xhrFriends = new XMLHttpRequest();
            xhrFriends.open('GET', '../Home/getFriends', true);
            xhrFriends.setRequestHeader('Content-Type', 'application/json');
            xhrFriends.onload = function () {
                if (xhrFriends.status === 200) {
                   // let email_loggeduser = document.getElementById('profile-hyperlink').getAttribute('data-email');
                    let friends = JSON.parse(xhrFriends.responseText);
                    if(friends.length>0){
                        for(let i = 0; i < friends.length; i++)
                        {
                            const xhrlistUsers1 = new XMLHttpRequest();
                            xhrlistUsers1.open('GET', '../Home/getUsersProfissionais', true);
                            xhrlistUsers1.setRequestHeader('Content-Type', 'application/json');
                            xhrlistUsers1.onload = function () {
                                if (xhrlistUsers1.status === 200) {
                                    let id_destino = document.getElementById('profile-hyperlink').getAttribute('data-userid');
                                    let listUsers = JSON.parse(xhrlistUsers1.responseText);
                                    var friend_info = listUsers.find(item => item.email == friends[i].email_amigo);
                                    var friend_info2 = userInfo.find(item => item.email == friends[i].email_amigo);
                                //   console.log(id_destino);
                                //------------------
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
                                a_image.dataset.id = friend_info.id;
                                a_image.href = "../Profile/" + a_image.dataset.id;
  
                                let div_userinfo = document.createElement('div');
                                div_userinfo.className = "user-info";
                                let a_userinfo = document.createElement('a');
                                let h3_userinfo = document.createElement('h3');
                                h3_userinfo.innerHTML = friend_info.nome;
                                let h6_userinfo = document.createElement('h6');
                                div_userinfo.appendChild(a_userinfo);
                                a_userinfo.appendChild(h3_userinfo);
                                div_userinfo.appendChild(h6_userinfo);
                                div.appendChild(div_userinfo);
                                a_userinfo.dataset.id = friend_info.id;
                                a_userinfo.href = "../Profile/" + a_userinfo.dataset.id;
  
                                let div_buttons = document.createElement('div');
                                div_buttons.className = "add-buttons";
                                div_buttons.id = "add-buttons3";
  
                                let buttonReject = document.createElement('a');
                                let i2 = document.createElement('i');
                                i2.className = 'fas fa-trash-alt';
                                buttonReject.appendChild(i2);
                                buttonReject.style.cursor = 'pointer';
                                buttonReject.className = "reject-icon";
                                buttonReject.dataset.id = friend_info.id;
                                buttonReject.addEventListener('click', function(event) {
                                    const dataR = {
                                        destino : id_destino,
                                        origem : friend_info.id,
                                        emailUser : friend_info.email
                                       };
                                
                                       const xhrRejectRequest = new XMLHttpRequest();
                                       xhrRejectRequest.open('POST', '../Home/deleteFriend', true);
                                       xhrRejectRequest.setRequestHeader('Content-Type', 'application/json');
                                       xhrRejectRequest.send(JSON.stringify(dataR));
                                       
                                       xhrRejectRequest.onload = function(){
                                        if(xhrRejectRequest.status === 200)
                                        {
                                            document.getElementById('main-side').innerHTML = "";
                                            showAddUsers();
                                            document.getElementById('friend-requests').innerHTML = "";
                                            showFriendRequests();
                                            divFriends.innerHTML = "";
                                            showFriends();
                                        //    updateList();
                                        }
                                     
                                       };
                                });
                                div_buttons.appendChild(buttonReject);
  
  
  
                                div.appendChild(div_buttons);
                                divFriends.appendChild(div);
  
                                        if(friend_info2.genero == 'Feminino')
                                        {
                                            img_user.src = "../images/profile-female.png";
                                        }
                                        if(friend_info2.genero == 'Masculino')
                                        {
                                            img_user.src = "../images/profile-male.png";
                                        }
                                        if(friend_info2.genero == 'other')
                                        {
                                            img_user.src = "../images/profile-other.png";
                                        }
                                
                                        h6_userinfo.innerHTML = friend_info2.headline;
            
  
  
                                //-------------------------------
                                }
                            }
                            xhrlistUsers1.send();
                    
                                
                        }
                    }
  
                }
            }
            xhrFriends.send();
        }
    }
    xhrUserInfor.send();
  
}

function updateList(){
    const xhrVerifyLoggedUserType = new XMLHttpRequest();
    xhrVerifyLoggedUserType.open('GET', '/Home/getloggedinUserType', true);
    xhrVerifyLoggedUserType.onload = function(){
      if(xhrVerifyLoggedUserType.status === 200){
        let userTypeConfirm = JSON.parse(xhrVerifyLoggedUserType.responseText);
        if(userTypeConfirm[0].tipo_utilizador == 'Empresa')
          {
              document.getElementById('friend-requests').style.display = "none";
              document.getElementById('friends').style.display = "none";
              document.getElementById('h2-home').innerHTML = "Users list";
              document.getElementById('add-buttons').style.display = "none";
          }
      }
    }
    xhrVerifyLoggedUserType.send();
}


var init = function () {
    getLoggedUserData();
    showAddUsers();
    showFriendRequests();
    showFriends();
};

window.onload = init;

function addFriend() {
    alert("ADD");
}