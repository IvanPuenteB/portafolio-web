let download = document.getElementById('button-download')

const abrir = document.querySelector('.menu-moviles'); // Botón de abrir menú
const nav = document.querySelector('.nav-list'); // Menú
const cerrar = document.querySelector('#cerrar'); // Botón de cerrar menú

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
})
