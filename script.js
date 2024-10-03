let intervalo;
let emQueda = false;
let pausado = false;

function Queda() {
    if (emQueda) {
        reiniciar();
    } else {
        iniciarQueda();
    }
}

function iniciarQueda() {
    const objeto = document.getElementById('objeto');
    let altura = 0; 
    const g = 9.8;
    let tempo = 0;
    const maxAltura = 300; 
    
    intervalo = setInterval(() => {
        if (!pausado) {
            tempo += 0.05;
            altura = 0.5 * g * Math.pow(tempo, 2); 

            if (altura > maxAltura) {
                altura = maxAltura; 
            }

            const velocidade = g * tempo;
            objeto.style.top = (100 + altura) + 'px'; 
            document.getElementById('info').innerText = `Altura: ${altura.toFixed(2)} m | Tempo: ${tempo.toFixed(2)} s | Velocidade: ${velocidade.toFixed(2)} m/s`;
            
            if (altura >= maxAltura) {
                clearInterval(intervalo);
                emQueda = false;
                document.getElementById('botao').innerText = 'Reiniciar';
            }
        }
    }, 50);
    emQueda = true;
    document.getElementById('botao').innerText = 'Parar Queda';
}

function pausar() {
    pausado = !pausado;
    document.getElementById('botaoPausa').innerText = pausado ? 'Retomar' : 'Pausar';
}

function reiniciar() {
    clearInterval(intervalo);
    const objeto = document.getElementById('objeto');
    objeto.style.top = '100px'; 
    document.getElementById('info').innerText = '';
    emQueda = false;
    pausado = false;
    document.getElementById('botao').innerText = 'Iniciar Queda';
    document.getElementById('botaoPausa').innerText = 'Pausar';
}