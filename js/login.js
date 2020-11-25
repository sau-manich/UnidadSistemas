window.onload = function(){
  document.getElementById("loginForm").onsubmit = function() {
    //spara username och password i tvÃƒÂ¥ varibler med samma namn frÃƒÂ¥n formet.
    var username = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    if (username === "unidadSistemas@us.com" &&
      password === "unidadSistemas") {
        alert("Validación exitosa");
      location.href = "tablero.html";
    } else {
      alert("Fallo la validación");
      //location.href = "index1.html";
    }
    // to prevent submit
    return false;
  }
}