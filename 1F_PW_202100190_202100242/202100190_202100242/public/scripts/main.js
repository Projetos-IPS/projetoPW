function getLoggedUserData(){
    const xhrloggedUser = new XMLHttpRequest();
    xhrloggedUser.open('GET', '/Profile/getloggedinUser', true);
    xhrloggedUser.setRequestHeader('Content-Type', 'application/json');
    let username_show = document.getElementById('user-name-show');

    xhrloggedUser.onload = function()
    {
        if(xhrloggedUser === 200)
        {
           let loggedUserData = JSON.parse(xhrloggedUser.responseText);
           username_show.innerHTML = loggedUserData[0].nome;
           console.log(loggedUserData);
           
        }
    }
    xhrloggedUser.send();


}
    
    var init = function(){
        getLoggedUserData();
    };
    
    window.onload = init;