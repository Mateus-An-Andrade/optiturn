const API_BASE_URL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5000"
    : "https://optiturn.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
   
                                                                            //acima temos a função que capta o login por meio de API.

 
    update_UI();
    register_user();   
    activities();      
    production();
    map();
    turn()
});
