function change_form() {

    if(document.getElementById('profissionalR').checked) {
        document.getElementById('profissional').style.display = "block";
        document.getElementById('empresa').style.display = "none";
      }
      else if(document.getElementById('empresaR').checked) {
        document.getElementById('empresa').style.display = "block";
        document.getElementById('profissional').style.display = "none";
      }
}

function hide(){
  document.getElementById('pop-up').style.display = "none";
}

function pop_up(){
var el = document.getElementById('sign-in-pop');
    function show() {
    document.getElementById('pop-up').style.display = "block";
    }

    el.onclick = show();
    
}








