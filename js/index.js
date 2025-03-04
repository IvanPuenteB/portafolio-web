let download = document.getElementById('button-download')

const abrir = document.querySelector('.menu-moviles'); // Botón de abrir menú
const nav = document.querySelector('.nav-list'); // Menú
const cerrar = document.querySelector('#cerrar'); // Botón de cerrar menú
const form = document.getElementById("contact-form")
const phidden = document.querySelector('.hidden')
const btnSeeMore = document.querySelector('#button-seeMore') 
const proyectos = document.querySelectorAll(".error-404")
const botones = document.querySelectorAll(".button")


proyectos.forEach(proyecto => {
    proyecto.addEventListener("click", (e)=>{
        e.preventDefault()
        alert("Se actualizará pronto")
    })
})

botones.forEach(button => {
    button.addEventListener("click", function() {
        const card = this.closest(".card"); // Encuentra la tarjeta contenedora del botón
        const hiddenText = card.querySelector(".hidden"); // Busca el párrafo oculto en esa tarjeta
        
        if (hiddenText) {
            hiddenText.classList.toggle("show");
        }
    });
});

btnSeeMore.addEventListener("click", () => {
    phidden.classList.toggle("show")
})

// Función para abrir el menú
abrir.addEventListener("click", () => {
    nav.classList.add("abrir"); // Aplica la clase con animación
});

// Función para cerrar el menú
cerrar.addEventListener("click", () => {
    nav.classList.remove("abrir"); // Oculta el menú con animación
});


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
        const response = await fetch("https://backend-emailjs.vercel.app/send-email", {
            
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