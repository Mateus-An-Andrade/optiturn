import { open_menu, open_inner_option } from './openWindows.js';
import { API_BASE_URL } from "./config.js";
import { close_windows } from './closeWindows.js';
import { production } from './productionRandom.js';
import { update_UI } from './updateUI.js';
import { register_user } from './registerUser.js';
import { create_activities } from './create_activities.js';
import { turn } from './turn.js';

import "../view/mapMenuView.js";


document.addEventListener("DOMContentLoaded", function () {
   
                                                                            //acima temos a função que capta o login por meio de API.

    open_menu("production_button","menu_production","grid","/production_menu")  
    open_menu("map_button","map_menu","grid","/map_menu")


    update_UI();
    register_user();   
    create_activities();      
    production();
    turn()
});
