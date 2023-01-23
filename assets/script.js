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
    const name = {name: (nome = input.value)};
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
    setInterval(buscarParticipantes, 1000);
    setInterval(buscarMensagens, 1000);
    setInterval(manterConectado, 5000);
}
function naoEntrou(erro){
    const statusCode = erro.response.status;
    if (statusCode === 400){
        alert("Nome em uso, digite outro nome");
    }
}
// Manter conectado
function manterConectado(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario[0]);
}
// Carregar as mensagens
function buscarMensagens(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promese.then(carregarMensagens);
}
function carregarMensagens(resposta){
    const mensagens = document.querySelector(".mensagens");
    mensagens.innerHTML = "";
    for (let contador = 0; contador < resposta.data.length; contador++){
        const tipo = resposta.data[contador].type;
        const tempo = resposta.data[contador].time;
        const de = resposta.data[contador].from;
        const texto = resposta.data[contador].text;
        const para = resposta.data[contador].to;

        if (tipo === "private_message" && (para === usuario[0].name || de === usuario[0].name)){
            const li = `
            <li class="${tipo}" data-test="message">
               <p>${tempo}<strong> ${de} </strong>para<strong> ${para}: </strong>${texto}</p>
            </li>
            `;
            mensagens.innerHTML += li;
        } else if (tipo === "message"){
            const li = `
            <li class="${tipo}" data-test="message">
                <p>${tempo}<strong> ${de} </strong>para<strong> ${para}: </strong>${texto}</p>
            </li>
            `;
            mensagens.innerHTML += li;
        } else if (tipo === "status"){
            const li = `
            <li class="${tipo}" data-test="message">
                <p>${tempo}<strong> ${de} </strong>${texto}</p>
            </li>
            `;
            mensagens.innerHTML += li;
        }
    }
    mensagens.querySelector('li:last-child').scrollIntoView();
}
// Enviar mensagem com o botão enter
document.addEventListener('keypress', function(e){
    if(e.which == 13){
        enviarMensagem();
    }
}, false);
// Enviar mensagens
function enviarMensagem(){
    const mensagem = document.querySelector("#campo-enviar");
    const messageObjt = {from: usuario[0].name, to:'Todos', text: mensagem.value, type:'message'};
    const enviado  = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messageObjt);
    enviado.catch(naoEnviadoMensagem);
}
function naoEnviadoMensagem(){
    window.location.reload();
}
// Carregar os participantes
function buscarParticipantes(){
    const promese = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promese.then(carregarParticipantes);
}
function carregarParticipantes(resposta){
    const participantes = document.querySelector(".contatos");
    participantes.innerHTML = `
    <li class="todos" data-test="all" onclick="selecionar('#todos')">
        <div>
            <ion-icon name="people"></ion-icon>
            <p>Todos</p>
        </div>
        <div class="confirmacao" id = 'todos'>
            <ion-icon name="checkmark-sharp" data-test="check"></ion-icon>
        </div>
    </li>`;
    for(let contador = 0; contador < resposta.data.length; contador++){
        const participante = resposta.data[contador].name;
        const li = `
    <li class="contato" data-test="participant" onclick="selecionar('#${participante}')">
        <div>
            <ion-icon name="person-circle"></ion-icon>
            <p>${participante}</p>
        </div>
        <div class="confirmacao" id = '${participante}'>
            <ion-icon name="checkmark-sharp" data-test="check"></ion-icon>
        </div>
    </li> `;
    participantes.innerHTML += li;
    }
}
// Check no público ou reservadamente
function marcar(selecionado){
    const icone = document.querySelector("div .aparecer");
    if (icone !== null){
        icone.classList.remove("aparecer");
    }
    const confirmar = document.querySelector(selecionado);
    confirmar.classList.add("aparecer");
}
// Check no participante
function selecionar(person){
    const icone = document.querySelector(".contato .aparecer");
    if (icone !== null){
        icone.classList.remove("aparecer");
    }
    const confirmar = document.querySelector(person);
    confirmar.classList.add("aparecer");
}