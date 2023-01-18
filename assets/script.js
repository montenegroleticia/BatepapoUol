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
    const name = {name: (nome = input.value)};
    if (nome !== ''){
        const login = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", name);
        login.then(entrarNoChat);
        login.catch(naoEntrou);
        setInterval(conectado, 5000);
    }
}
function entrarNoChat(){
    const logado = document.querySelector("section");
    logado.classList.add("esconder");
}
function naoEntrou(){
    alert("Nome em uso, digite outro nome");
}
// Carregar as mensagens
function buscarMensagens(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promese.then(carregarMensagens);
}
function carregarMensagens(resposta){
    console.log(resposta);
}
// Manter conectado
function conectado(){
}