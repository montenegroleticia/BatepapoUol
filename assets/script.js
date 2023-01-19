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
    }
}
function entrarNoChat(){
    const logado = document.querySelector("section");
    logado.classList.add("esconder");
    setInterval(manterConectado, 5000);
    buscarMensagens();
    buscarParticipantes();
}
function naoEntrou(erro){
    const statusCode = erro.response.status;
    if (statusCode === 409){
        alert("Nome em uso, digite outro nome");
    }
}
/* Manter conectado
function manterConectado(){
    const input = document.querySelector("#usuario");
    const name = {name: (nome = input.value)};
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", name);
} */
// Carregar as mensagens
function buscarMensagens(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promese.then(carregarMensagens);
    promese.catch(naoCarregou);
}
function carregarMensagens(resposta){
    console.log("FOII");
    console.log(resposta);
}
// Carregar os participantes
function buscarParticipantes(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promese.then(carregarParticipantes);
    promese.catch(naoCarregou);
}
function carregarParticipantes(resposta){
    console.log("FOII");
    console.log(resposta);
}
function naoCarregou(erro){
    console.log("DEU RUIM");
    console.log(erro);
}