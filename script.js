// Garante que o código só roda depois que o HTML estiver pronto na tela
window.addEventListener('DOMContentLoaded', function() {

    var paresCartas = [
        { id: 1, texto: "👁️ Olhar Fixo / Sem Piscar" },
        { id: 1, texto: "🔍 Alerta de Deepfake Visual" },
        { id: 2, texto: "🗣️ Voz Robótica / Sem Emoção" },
        { id: 2, texto: "🎧 Alerta de Deepfake de Áudio" },
        { id: 3, texto: "🧱 Fundo Borrado / Falhas" },
        { id: 3, texto: "🖼️ Erro de Cenário por IA" },
        { id: 4, texto: "📰 Notícia Muito Bombástica" },
        { id: 4, texto: "🔗 Sempre Checar a Fonte" }
    ];

    var btnAcessibilidade = document.getElementById('btn-acessibilidade');
    var configForm = document.getElementById('config-form');
    var nomeJogadorInput = document.getElementById('nome-jogador');
    var painelStatus = document.getElementById('painel-status');
    var boasVindas = document.getElementById('boas-vindas');
    var contadorMovimentos = document.getElementById('contador-movimentos');
    var mensagemVitoria = document.getElementById('mensagem-vitoria');
    var tabuleiro = document.getElementById('tabuleiro-jogo');

    var primeiraCarta = null;
    var segundaCarta = null;
    var movimentos = 0;
    var paresFeitos = 0;
    var bloqueiaTabuleiro = false;

    // Ação do Modo Escuro
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });
    }

    // Ação do Formulário para Iniciar o Jogo
    if (configForm) {
        configForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var nome = nomeJogadorInput.value.trim();
            if (boasVindas) {
                boasVindas.textContent = "Investigador(a) ativo: " + nome;
            }
            
            configForm.classList.add('oculto');
            if (painelStatus) painelStatus.classList.remove('oculto');
            if (tabuleiro) tabuleiro.classList.remove('oculto');
            
            inicializarTabuleiro();
        });
    }

    function inicializarTabuleiro() {
        if (!tabuleiro) return;
        tabuleiro.innerHTML = '';
        
        // Embaralhar seguro
        paresCartas.sort(function() {
            return Math.random() - 0.5;
        });
        
        for (var i = 0; i < paresCartas.length; i++) {
            var item = paresCartas[i];
            
            var elementoCarta = document.createElement('div');
            elementoCarta.classList.add('carta');
            elementoCarta.setAttribute('data-id', item.id);
            elementoCarta.textContent = item.texto;
            
            configurarClique(elementoCarta);
            tabuleiro.appendChild(elementoCarta);
        }
    }

    function configurarClique(carta) {
        carta.addEventListener('click', function() {
            if (bloqueiaTabuleiro) return;
            if (carta.classList.contains('par-encontrado') || carta.classList.contains('virada')) return;

            carta.classList.add('virada');

            if (primeiraCarta === null) {
                primeiraCarta = carta;
                return;
            }

            segundaCarta = carta;
            movimentos++;
            if (contadorMovimentos) {
                contadorMovimentos.textContent = "Movimentos realizados: " + movimentos;
            }
            
            verificarPar();
        });
    }

    function verificarPar() {
        var id1 = primeiraCarta.getAttribute('data-id');
        var id2 = segundaCarta.getAttribute('data-id');
        
        if (id1 === id2) {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            primeiraCarta.classList.add('par-encontrado');
            segundaCarta.classList.add('par-encontrado');
            
            paresFeitos++;
            primeiraCarta = null;
            segundaCarta = null;
            
            if (paresFeitos === 4 && mensagemVitoria) {
                mensagemVitoria.classList.remove('oculto');
            }
        } else {
            bloqueiaTabuleiro = true;
            setTimeout(function() {
                primeiraCarta.classList.remove('virada');
                segundaCarta.classList.remove('virada');
                primeiraCarta = null;
                segundaCarta = null;
                bloqueiaTabuleiro = false;
            }, 1000);
        }
    }
});
