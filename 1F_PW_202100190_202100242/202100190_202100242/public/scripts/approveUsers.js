function getUsers(){
    const xhrUsers = new XMLHttpRequest();
    xhrUsers.open('GET', '/Approve/getUsers', true);
    xhrUsers.setRequestHeader('Content-Type', 'application/json');
    var users_table = document.getElementById('users-data').getElementsByTagName('tbody')[0];

    xhrUsers.onload = function(){
        
        if(xhrUsers.status === 200){
            var dataUser = JSON.parse(xhrUsers.responseText);

            if(dataUser.length > 0)
            {
            for(var count = 0; count < dataUser.length; count++)
            {
            var btnEdit = document.createElement('button');
            var btnDeactivate = document.createElement('button');
            btnDeactivate.innerText = "Deactivate";
            btnEdit.innerText = "Approve";
            btnEdit.className += "editBtn";
            btnEdit.id += "editBtn";
            var btnDelete = document.createElement('button');
            btnDelete.className += "deleteBtn";
            btnDelete.innerText = "Reject";
            var row = document.createElement("tr");
            var c = document.createElement("td");   

            c.innerText = dataUser[count].id;
            row.appendChild(c);
            users_table.appendChild(row);
            
            var c = document.createElement("td");   
            c.innerText = dataUser[count].nome;
            row.appendChild(c);

            users_table.appendChild(row);
            var c = document.createElement("td");   
            c.innerText = dataUser[count].email;
            row.appendChild(c);

            users_table.appendChild(row);
            var c = document.createElement("td");   
            if(dataUser[count].tipo_utilizador == "Empresa")
            {
                c.innerText = 'Company';
            }
            row.appendChild(c);
            users_table.appendChild(row);

            var c = document.createElement("td");   
            if(dataUser[count].approved == 0)
            {
                c.innerText = 'Not approved';
                row.appendChild(c);
                users_table.appendChild(row);
    
                
                btnEdit.dataset.userid = dataUser[count].email;
                btnDelete.dataset.userid = dataUser[count].email;
                btnDeactivate.style.display = 'none';
            } 
            if(dataUser[count].approved == 1)
            {
                c.innerText = 'Approved';
                row.appendChild(c);
                btnEdit.style.display = 'none';
                btnDelete.style.display = 'none';
                btnDeactivate.dataset.userid = dataUser[count].email;
            }
          
            
   //----------------------------------------------------------
   btnEdit.addEventListener("click", function(event){

    const clickedButton = event.target;
    var data = {
        userid : clickedButton.dataset.userid
     }
    const xhrUpdate = new XMLHttpRequest();
    xhrUpdate.open('POST', '/Approve/UpdateUser', true);
    xhrUpdate.setRequestHeader('Content-Type', 'application/json');
    xhrUpdate.send(JSON.stringify(data));
   
     xhrUpdate.onload = function(){
        if(xhrUpdate.status === 200)
      {
        var response = JSON.parse(xhrUpdate.responseText);

        if(response == 0)
        {
            location.href = "/Approve"
        }
    }
}
   })
//----------------------------------------------------------
   //----------------------------------------------------------
   btnDelete.addEventListener("click", function(event){

    const clickedButton = event.target;
    var data = {
        userid : clickedButton.dataset.userid
     }
    const xhrUpdate = new XMLHttpRequest();
    xhrUpdate.open('POST', '/Approve/RejectUser', true);
    xhrUpdate.setRequestHeader('Content-Type', 'application/json');
    xhrUpdate.send(JSON.stringify(data));
   
     xhrUpdate.onload = function(){
        if(xhrUpdate.status === 200)
      {
        var response = JSON.parse(xhrUpdate.responseText);

        if(response == 0)
        {
            location.href = "/Approve"
        }
    }
}
   })
//----------------------------------------------------------
//----------------------------------------------------------
btnDeactivate.addEventListener("click", function(event){

    const clickedButton = event.target;
    var data = {
        userid : clickedButton.dataset.userid
     }
    const xhrUpdate = new XMLHttpRequest();
    xhrUpdate.open('POST', '/Approve/DeactivateUser', true);
    xhrUpdate.setRequestHeader('Content-Type', 'application/json');
    xhrUpdate.send(JSON.stringify(data));
   
     xhrUpdate.onload = function(){
        if(xhrUpdate.status === 200)
      {
        var response = JSON.parse(xhrUpdate.responseText);

        if(response == 0)
        {
            location.href = "/Approve"
        }
    }
}
   })
//----------------------------------------------------------
            c.appendChild(btnEdit);
            c.appendChild(btnDelete);
            c.appendChild(btnDeactivate);
            row.appendChild(c);
            users_table.appendChild(row);


    


            }
           

        }
        else
        {

        }

        
     

        
    
    
        }

        
    }
    xhrUsers.send();




};




var init = function(){

    getUsers();
    
  
  
};


window.onload = init;


                


