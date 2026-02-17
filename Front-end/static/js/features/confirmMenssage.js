function show_confirmation_menssage(text, time = 3000, menu_in_production) {
    const msgBox = document.getElementById('msgSucess');
    const msgTexto = document.getElementById('text_confirmation');
    const inputs = document.querySelectorAll("input")
    let buttons_menu = document.getElementById("buttons_menu")

    msgTexto.textContent = text;
    msgBox.style.display = 'flex'; 

    menu_in_production.style.display = "none"
    msgBox.style.opacity = 0

    setTimeout(() => {
        msgBox.style.transition = 'opacity 0.5s';
        msgBox.style.opacity = 1;
        
        inputs.forEach(input => {

            if (input.classList.contains("keep-value")) return;

            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else if (
                input.type !== "button" &&
                input.type !== "submit" &&
                input.type !== "reset"
            ) {
                input.value = "";
            }
        });

    }, 10);

                                                                    //acima o algoritmo pega o id da mensagem de sucesso, o id do icone e o parametro do menu que deve ser escondido; Em seguida faz com que o menu receba uma leve transição fade-in, retorna ao menu mas limpando os botões, se um input for checkbox ou radio ou textos e senhas ele desmarca e limpa, mas se for um input de botão como cadastrar ele mantém o valor. 
    setTimeout(() => {
            msgBox.style.opacity = 0;
            setTimeout(() => {
                msgBox.style.display = 'none';
                buttons_menu.style.display = 'grid'; // volta o menu principal
                menu_in_production.style.display = 'none'; // volta o menu
            }, 500); // espera o fade-out
        }, time);
}