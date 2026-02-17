function open_menu(id_btn,id_menu, displayType = "grid", url){
    const button_menu = document.getElementById(id_btn)
    const menu_in_work = document.getElementById(id_menu)
    const main_menu = document.getElementById("buttons_menu")


    button_menu.addEventListener("click",function(){
        menu_in_work.style.display = displayType
        main_menu.style.display = "none"
         if (url) {
            history.replaceState({}, "", url)
        }
    })

}


function open_inner_option(id_btn,id_menu, displayType = "grid", group_class = "inner_menu"){
    const button_menu = document.getElementById(id_btn)
    const menu_in_work = document.getElementById(id_menu)

    button_menu.addEventListener("click",function(){
        document.querySelectorAll(`.${group_class}`).forEach(all =>{
            all.style.display = "none"
        })

        menu_in_work.style.display = displayType
    })
}

