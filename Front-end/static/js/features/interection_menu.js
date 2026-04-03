import { open_menu, open_inner_option } from './openWindows.js';
import { API_BASE_URL } from "./config.js";
import { close_windows } from './closeWindows.js';
import { production } from './productionRandom.js';
import { productionDirectionSpecific } from './productionSpecific.js';
import { update_UI } from './updateUI.js';
import { featureRegisterUser } from './registerUser.js';
import { register_user } from "../view/registerUserView.js"
import { create_activities } from './create_activities.js';
import { turn } from './turn.js';



import "../view/mapMenuView.js";
import "../view/shiftViewMenu.js"


document.addEventListener("DOMContentLoaded", function () {
   
                                                                            //acima temos a função que capta o login por meio de API.

    open_menu("register_button", "menu_register", "flex", "/register_user")
    open_inner_option("opt_register_worker01", "register_leader", "flex")
    open_inner_option("opt_register_worker02", "register_operator", "flex")
    close_windows("menu_register",menu_register)
    register_user()


    open_menu("production_button","menu_production","grid","/production_menu")
    close_windows("menu_production",menu_production)
    
    open_menu("map_button","map_menu","grid","/map_menu")
    close_windows("map_menu", map_menu) 

    open_menu("shift_change","turn_menu","grid","/report")
    close_windows("turn_menu", turn_menu)

    update_UI();  
    create_activities();      
    production();
    productionDirectionSpecific();

});
