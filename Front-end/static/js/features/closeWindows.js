function close_windows (id, menu_in_production){
    const window_to_close = document.getElementById(id)

    if (window_to_close){
        window_to_close.querySelector(".fechar_janela").addEventListener("click", function(){
            window_to_close.style.display = "none"; 
            history.replaceState({},"","/main")
            buttons_menu.style.display = "grid";
            menu_in_production.style.display = "none"
        });
    }
}