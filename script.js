<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Queda Livre</title>
    <style>
        #objeto {
            position: absolute;
            top: 100px;
            left: 100px;
            width: 50px;
            height: 50px;
            background-color: red;
            cursor: grab;
        }
    </style>
</head>
<body>
    <div id="objeto"></div>
    <button id="botao" onclick="Queda()">Iniciar Queda</button>
    <button id="botaoPausa" onclick="pausar()">Pausar</button>
    <div id="info"></div>

    <script>
        let intervalo;
        let emQueda = false;
        let pausado = false;
        let arrastando = false;

        const objeto = document.getElementById('objeto');

        objeto.addEventListener('mousedown', (e) => {
            arrastando = true;
            objeto.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (arrastando && !emQueda) {
                objeto.style.left = `${e.clientX - objeto.offsetWidth / 2}px`;
                objeto.style.top = `${e.clientY - objeto.offsetHeight / 2}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            arrastando = false;
            objeto.style.cursor = 'grab';
        });

        function Queda() {
            if (emQueda) {
                reiniciar();
            } else {
                iniciarQueda();
            }
        }

        function iniciarQueda() {
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
            objeto.style.top = '100px';
            document.getElementById('info').innerText = '';
            emQueda = false;
            pausado = false;
            document.getElementById('botao').innerText = 'Iniciar Queda';
            document.getElementById('botaoPausa').innerText = 'Pausar';
        }
    </script>
</body>
</html>
