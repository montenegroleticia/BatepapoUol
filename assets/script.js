const usuario = [];
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
    let name = {name: (nome = input.value)};
    usuario.push(name);
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
    if (statusCode === 400){
        alert("Nome em uso, digite outro nome");
    }
}
// Manter conectado
function manterConectado(){
    console.log(usuario[0]);
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario[0]);
} 
// Carregar as mensagens
function buscarMensagens(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promese.then(carregarMensagens);
    promese.catch(naoCarregou);
}
function carregarMensagens(resposta){
    console.log("FOII");
    console.log(resposta);
    console.log(resposta.data);
    const mensagens = document.querySelector(".mensagens");
    mensagens.innerHTML = "";
    for (let contador = 0; contador < resposta.data.length; contador++){
        const li = `
        <li class="${type}" data-test="message">
            <p>${time}<strong>${from}</strong>${text}</p>
        </li>
        `;
        mensagens.innerHTML += li;
    }
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