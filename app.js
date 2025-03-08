let amigos = [];
function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim(); 
    if (nombre) {
        if (amigos.includes(nombre)) {
            alert("Este nombre ya ha sido agregado. Por favor, ingrese un nombre diferente.");
            return;
        }
        amigos.push(nombre);
        actualizarLista();

        input.value = '';
    } else {
        alert("Por favor, ingrese un nombre.");
    }
}
function actualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; 

    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo; 
        listaAmigos.appendChild(li); 
    });
}
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Ingresa al menos dos amigos para sortear.");
        return;
    }

    const amigosMezclados = [...amigos];
    const resultados = {};

    for (let i = amigosMezclados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosMezclados[i], amigosMezclados[j]] = [amigosMezclados[j], amigosMezclados[i]];
    }

    for (let i = 0; i < amigos.length; i++) {
        resultados[amigos[i]] = amigosMezclados[i === amigos.length - 1 ? 0 : i + 1];
    }

    for (let i = 0; i < amigos.length; i++) {
        if (resultados[amigos[i]] === amigos[i]) {
            const temp = resultados[amigos[i]];
            resultados[amigos[i]] = resultados[amigos[i === 0 ? amigos.length - 1 : i - 1]];
            resultados[amigos[i === 0 ? amigos.length - 1 : i - 1]] = temp;
        }
    }
    mostrarResultados(resultados);
}
function mostrarResultados(resultados) {
    const listaResultados = document.getElementById('resultado');
    listaResultados.innerHTML = ''; 
    for (const [amigo, amigoSecreto] of Object.entries(resultados)) {
        const li = document.createElement('li');
        li.textContent = `${amigo} -> ${amigoSecreto}`; 
        listaResultados.appendChild(li); 
    }
}