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
                          window.location.href = '/Home';
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
                                }
                            }
                            xhrloggedUserinformationEmpresa.send();
                            document.getElementById('aprovar-utilizadores').style.display = "none";
                            document.getElementById('joboffers-menu').style.display = "none";
                            document.getElementById('home-menu').style.display = "none";
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

function showPortfolios(){

    const xhrloggedUserType2 = new XMLHttpRequest();
    xhrloggedUserType2.open('GET', '../Home/getloggedinUserType', true);
    xhrloggedUserType2.setRequestHeader('Content-Type', 'application/json');
    xhrloggedUserType2.onload = function () {
    if (xhrloggedUserType2.status === 200) {
        let loggedUserType = JSON.parse(xhrloggedUserType2.responseText);

    let divFriends = document.getElementById('main-side');
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Portfolios ';
    h2.id = 'h2-home';
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
                        if(userInfo[i].visualizacao_empresas == 1 && loggedUserType[0].tipo_utilizador == 'Empresa'){
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
                        let h6_userlocation = document.createElement('h6');
                        h6_userlocation.innerHTML = userInfo[i].localidade; 
                        div_userinfo.appendChild(h6_userlocation);
                        let h6_userage = document.createElement('h6');

                        //------------------idade
                        const xhrUserAge = new XMLHttpRequest();
                        xhrUserAge.open('GET', 'Home/getUsersProfissionaisAge', true);
                        xhrUserAge.setRequestHeader('Content-Type', 'application/json');
                        xhrUserAge.onload = function () {
                            if (xhrUserAge.status === 200) {
                                let ages = JSON.parse(xhrUserAge.responseText);
                                h6_userage.innerHTML = 'Age: ' + ages[i].age;
                            }
                        }
                        xhrUserAge.send();
                        //--------------------------- 
                        div.appendChild(h6_userage);
                        a_userinfo.dataset.id = listUsers[i].id;
                        a_userinfo.href = "../Profile/" + a_userinfo.dataset.id;
                       
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

                    
                        update();
                    }
                    
                    if(loggedUserType[0].tipo_utilizador == 'Admin'){


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
                        let h6_userlocation = document.createElement('h6');
                        h6_userlocation.innerHTML = userInfo[i].localidade; 
                        div_userinfo.appendChild(h6_userlocation);
                        let h6_userage = document.createElement('h6');

                        //------------------idade
                        const xhrUserAge = new XMLHttpRequest();
                        xhrUserAge.open('GET', 'Home/getUsersProfissionaisAge', true);
                        xhrUserAge.setRequestHeader('Content-Type', 'application/json');
                        xhrUserAge.onload = function () {
                            if (xhrUserAge.status === 200) {
                                let ages = JSON.parse(xhrUserAge.responseText);
                                h6_userage.innerHTML = 'Age: ' + ages[i].age;
                            }
                        }
                        xhrUserAge.send();
                        //--------------------------- 
                        div.appendChild(h6_userage);
                        a_userinfo.dataset.id = listUsers[i].id;
                        a_userinfo.href = "../Profile/" + a_userinfo.dataset.id;
                       
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

                    
                        update();

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
                } //fim do for

                }

                let input = document.createElement('input');
                input.type = 'text';
                input.id = 'myInput';
                input.onkeyup = search;
                input.className = 'input-text';
                input.placeholder = 'search';
                divFriends.appendChild(input);
                }
            }
            xhrlistUsers.send();
        }
    }
    
    xhrUserInfo.send();

    }
    }
    xhrloggedUserType2.send();



    
    
}

function search() {
    let input, filter, ul, li, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("user");
  
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

var init = function () {
    getLoggedUserData();
    showPortfolios();

};

window.onload = init;