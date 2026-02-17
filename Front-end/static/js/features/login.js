const API_BASE_URL =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5000"
    : "https://optiturn.onrender.com";
    
 const login_user = document.getElementById("loginForm")

    login_user.addEventListener("submit",async (ev) => {
        ev.preventDefault()

        const username = document.getElementById("username").value 
        const password = document.getElementById("password").value

        const response = await fetch(`${API_BASE_URL}/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include" 
        })
            if(response.ok){
                window.location.href = 'main.html';
            }else{
                alert("Erro: Credenciais de acesso inválidas")
            }
    })
    