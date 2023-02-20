function getUsers() {
    const xhrUsers = new XMLHttpRequest();
    xhrUsers.open('GET', '/Approve/getUsers', true);
    xhrUsers.setRequestHeader('Content-Type', 'application/json');
    let users_table = document.getElementById('users-data').getElementsByTagName('tbody')[0];

    xhrUsers.onload = function() {
        if(xhrUsers.status === 200) {
            let dataUser = JSON.parse(xhrUsers.responseText);

            if(dataUser.length > 0) {
                for(let count = 0; count < dataUser.length; count++) {
                    let btnEdit = document.createElement('button');
                    let btnDeactivate = document.createElement('button');

                    btnDeactivate.innerText = "Deactivate";
                    btnDeactivate.className = "deactivateBtn";
                    btnDeactivate.id = "deactivateBtn";
                    btnEdit.innerText = "Approve";
                    btnEdit.className += "editBtn";
                    btnEdit.id += "editBtn";

                    let btnDelete = document.createElement('button');

                    btnDelete.className += "deleteBtn";
                    btnDelete.innerText = "Reject";

                    let row = document.createElement("tr");
                    let c = document.createElement("td");   

                    c.innerText = dataUser[count].id;
                    row.appendChild(c);
                    users_table.appendChild(row);
            
                    c = document.createElement("td");   
                    c.innerText = dataUser[count].nome;
                    row.appendChild(c);

                    users_table.appendChild(row);
                    c = document.createElement("td");   
                    c.innerText = dataUser[count].email;
                    row.appendChild(c);

                    users_table.appendChild(row);
                    c = document.createElement("td"); 

                    if(dataUser[count].tipo_utilizador == "Empresa") {
                        c.innerText = 'Company';
                    }

                    row.appendChild(c);
                    users_table.appendChild(row);
                    c = document.createElement("td");   

                    if(dataUser[count].approved == 0) {
                        c.innerText = 'Not approved';
                        row.appendChild(c);
                        users_table.appendChild(row);
                        btnEdit.dataset.userid = dataUser[count].email;
                        btnDelete.dataset.userid = dataUser[count].email;
                        btnDeactivate.style.display = 'none';
                    } 

                    if(dataUser[count].approved == 1) {
                        c.innerText = 'Approved';
                        row.appendChild(c);
                        users_table.appendChild(row);
                        btnEdit.style.display = 'none';
                        btnDelete.style.display = 'none';
                        btnDeactivate.dataset.userid = dataUser[count].email;
                    }
            
                    //----------------------------------------------------------
                    btnEdit.addEventListener("click", function(event) {
                        const clickedButton = event.target;
                        let data = {
                            userid : clickedButton.dataset.userid
                        }

                        const xhrUpdate = new XMLHttpRequest();
                        xhrUpdate.open('POST', '/Approve/UpdateUser', true);
                        xhrUpdate.setRequestHeader('Content-Type', 'application/json');
                        xhrUpdate.send(JSON.stringify(data));
   
                        xhrUpdate.onload = function() {
                            if(xhrUpdate.status === 200) {
                                let response = JSON.parse(xhrUpdate.responseText);

                                if(response == 0) {
                                    users_table.innerHTML="";
                                    getUsers();
                                }
                            }
                        }
                    })
                    //----------------------------------------------------------

                    //----------------------------------------------------------
                    btnDelete.addEventListener("click", function(event) {
                        const clickedButton = event.target;
                        let data = {
                            userid : clickedButton.dataset.userid
                        }

                        const xhrUpdate = new XMLHttpRequest();
                        xhrUpdate.open('POST', '/Approve/RejectUser', true);
                        xhrUpdate.setRequestHeader('Content-Type', 'application/json');
                        xhrUpdate.send(JSON.stringify(data));
   
                        xhrUpdate.onload = function() {
                            if(xhrUpdate.status === 200) {
                                let response = JSON.parse(xhrUpdate.responseText);

                                if(response == 0) {
                                    users_table.innerHTML="";
                                    getUsers();
                                }
                            }
                        }
                    })
                    //----------------------------------------------------------

                    //----------------------------------------------------------
                    btnDeactivate.addEventListener("click", function(event) {
                        const clickedButton = event.target;
                        let data = {
                            userid : clickedButton.dataset.userid
                        }

                        const xhrUpdate = new XMLHttpRequest();
                        xhrUpdate.open('POST', '/Approve/DeactivateUser', true);
                        xhrUpdate.setRequestHeader('Content-Type', 'application/json');
                        xhrUpdate.send(JSON.stringify(data));
   
                        xhrUpdate.onload = function() {
                            if(xhrUpdate.status === 200) {
                                let response = JSON.parse(xhrUpdate.responseText);

                                if(response == 0) {
                                    users_table.innerHTML="";
                                    getUsers();
                                }
                            }
                        }
                    })
                    //----------------------------------------------------------

                    c = document.createElement("td");   
                    c.appendChild(btnEdit);
                    c.appendChild(btnDelete);
                    c.appendChild(btnDeactivate);
                    row.appendChild(c);
                    users_table.appendChild(row);
                  
                }
            } else {

            }
        }   
    }
    xhrUsers.send();
};

var init = function() {
    getUsers();
    getLoggedUserData();
};

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

window.onload = init;