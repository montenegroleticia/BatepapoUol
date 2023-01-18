// Painel lateral
function aparecerPainelLateral(){
    const painel = document.querySelector("aside");
    painel.classList.remove("esconder");
}
function esconderPainelLateral(){
    const painel = document.querySelector("aside");
    painel.classList.add("esconder");
}
// Login
function entrar(){
    const input = document.querySelector("#usuario");
    const nome = input.value;
    console.log(nome);
    if (nome !== ''){
        const logado = document.querySelector("section");
        logado.classList.add("esconder");
    }
}