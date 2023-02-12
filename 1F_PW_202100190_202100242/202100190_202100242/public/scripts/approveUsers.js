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
};

window.onload = init;