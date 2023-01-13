function change_form() {

    form_professional = document.getElementById('profissional');
    form_empresa = document.getElementById('empresa');

    if(document.getElementById('profissionalR').checked) {
        document.getElementById('profissional').style.display = "block";
        document.getElementById('empresa').style.display = "none";
      }
      else if(document.getElementById('empresaR').checked) {
        document.getElementById('empresa').style.display = "block";
        document.getElementById('profissional').style.display = "none";
      }
}