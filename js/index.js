let download = document.getElementById('button-download')

const abrir = document.querySelector('.menu-moviles'); // Botón de abrir menú
const nav = document.querySelector('.nav-list'); // Menú
const cerrar = document.querySelector('#cerrar'); // Botón de cerrar menú
const form = document.getElementById("contact-form")

// Función para abrir el menú
abrir.addEventListener("click", () => {
    nav.classList.add("abrir"); // Aplica la clase con animación
});

// Función para cerrar el menú
cerrar.addEventListener("click", () => {
    nav.classList.remove("abrir"); // Oculta el menú con animación
});

console.log(download)

download.addEventListener("click", (e) => {
    download.style.background = "#333";
});

form.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    jsonData.name = `${jsonData["first-name"]} ${jsonData["last-name"]}`;
    delete jsonData["first-name"];
    delete jsonData["last-name"]

    try {
        const response = await fetch("http://localhost:3000/send-email", {
            
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(jsonData),

        });

    const result = await response.json();

    if(result.success){
        alert("Correo enviado con éxito");
        form.reset();
    }
    else{
        alert("Error al enviar el correo")
    }
        
    } catch (error) {
        console.error("Error:", error)
        alert("Ocurrió un error, intenta de nuevo")
        
    }

});