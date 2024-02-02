let numeroSecreto = 0;
let intentos = 0;
let listaNumSorteados = [];
let numeroMax = 10;

function asignarTextoElem(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento () {
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (intentos < 4)
        if(numeroUsuario === numeroSecreto){
            asignarTextoElem('p',`Acertaste el numero en ${intentos} ${(intentos === 0) ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
        if (numeroUsuario > numeroSecreto){
            asignarTextoElem('p', 'El numero secreto es menor');
        } else {
            asignarTextoElem('p', 'El numero secreto es mayor'); 
        }
        intentos++;
        limpiarNumero();
    } else {
        asignarTextoElem('p', `¡Lo siento, has agotado tus 4 intentos! El número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
}

function limpiarNumero() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMax)+1;
    //Si ya se sortearon todos los numeros
    if(listaNumSorteados.length == numeroMax){
        asignarTextoElem('p', 'Ya salieron todos los numeros posibles');
    } else {
        //Si el numero generado esta incluido en la lista
        if (listaNumSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
                listaNumSorteados.push(numeroGenerado);
                return numeroGenerado;
        }
    }   
}

function instanciasIniciales() {
    asignarTextoElem('h1', 'JUEGO DEL NUMERO SECRETO'); 
    asignarTextoElem('p', `Indica un numero del 1 al ${numeroMax}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar Caja
    limpiarNumero();
    //Indicar mensajes de intervalo de numeros
    //Generar el numero aleatorio
    //Inicializar el numero de intentos
    instanciasIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

instanciasIniciales();
