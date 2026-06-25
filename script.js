// Garante que o JavaScript só vai rodar APÓS o HTML carregar completamente na tela
window.addEventListener('DOMContentLoaded', function() {

    // --- Dados do Jogo (Variáveis Estruturadas) ---
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

    // --- Mapeamento de Elementos do DOM ---
    var btnAcessibilidade = document.getElementById('btn-acessibilidade');
    var configForm = document.getElementById('config-form');
    var nomeJogadorInput = document.getElementById('nome-jogador');
    var painelStatus = document.getElementById('painel-status');
    var boasVindas = document.getElementById('boas-vindas');
    var contadorMovimentos = document.getElementById('contador-movimentos');
    var mensagemVitoria = document.getElementById('mensagem-vitoria');
    var tabuleiro = document.getElementById('tabuleiro-jogo');

    // --- Variáveis de Controle de Estado (Exigência do Nível 4) ---
    var primeiraCarta = null;
    var segundaCarta = null;
    var movimentos = 0;
    var paresFeitos = 0;
    var bloqueiaTabuleiro = false;

    // --- 1. Modo Escuro (Acessibilidade) ---
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
        });
    }

    // --- 2. Controle do Formulário Obrigatório ---
    if (configForm) {
        configForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página
            
            var nome = nomeJogadorInput.value.trim();
            if (boasVindas) {
                boasVindas.textContent = "Investigador(a) ativo: " + nome;
            }
            
            // Transição visual mudando as classes no DOM
            configForm.classList.add('oculto');
            if (painelStatus) painelStatus.classList.remove('oculto');
            if (tabuleiro) tabuleiro.classList.remove('oculto');
            
            inicializarTabuleiro();
        });
    }

    // --- 3. Criar Cartas no Tabuleiro ---
    function inicializarTabuleiro() {
        if (!tabuleiro) return;
        
        tabuleiro.innerHTML = ''; // Limpa o tabuleiro antes de começar
        
        // Embaralha o array usando um método simples e compatível
        paresCartas.sort(function() {
            return Math.random() - 0.5;
        });
        
        // Gera cada carta dinamicamente usando laço de repetição padrão
        for (var i = 0; i < paresCartas.length; i++) {
            var item = paresCartas[i];
            
            var elementoCarta = document.createElement('div');
            elementoCarta.classList.add('carta');
            elementoCarta.setAttribute('data-id', item.id);
            elementoCarta.setAttribute('data-index', i);
            elementoCarta.textContent = item.texto;
            
            // Evento de clique seguro repassando o elemento criado
            configurarClique(elementoCarta);
            
            tabuleiro.appendChild(elementoCarta);
        }
    }

    // Função auxiliar para evitar problemas de escopo de variáveis no clique
    function configurarClique(carta) {
        carta.addEventListener('click', function() {
            tratarCliqueCarta(carta);
        });
    }

    // --- 4. Lógica de Clique Blindada contra Erros ---
    function tratarCliqueCarta(cartaClicada) {
        if (bloqueiaTabuleiro) return;
        
        // Evita clicar em cartas resolvidas ou na mesma carta duas vezes
        if (cartaClicada.classList.contains('par-encontrado') || cartaClicada.classList.contains('virada')) return;

        // Vira a carta visualmente na tela
        cartaClicada.classList.add('virada');

        // Primeira escolha da rodada
        if (primeiraCarta === null) {
            primeiraCarta = cartaClicada;
            return;
        }

        // Segunda escolha da rodada
        segundaCarta = cartaClicada;
        
        // Atualiza a quantidade de movimentos realizados
        movimentos++;
        if (contadorMovimentos) {
            contadorMovimentos.textContent = "Movimentos realizados: " + movimentos;
        }
        
        verificarPar();
    }

    // --- 5. Verificação de Acerto ou Erro ---
    function verificarPar() {
        var id1 = primeiraCarta.getAttribute('data-id');
        var id2 = segundaCarta.getAttribute('data-id');
        
        if (id1 === id2) {
            // Se acertou, marca as cartas como resolvidas permanentemente
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            primeiraCarta.classList.add('par-encontrado');
            segundaCarta.classList.add('par-encontrado');
            
            paresFeitos++;
            resetarRodada();
            
            // Condição de Vitória (4 pares encontrados no total)
            if (paresFeitos === 4 && mensagemVitoria) {
                mensagemVitoria.classList.remove('oculto');
            }
        } else {
            // Se errou, trava novos cliques por 1 segundo e depois desvira as duas cartas
            bloqueiaTabuleiro = true;
            
            setTimeout(function() {
                primeiraCarta.classList.remove('virada');
                segundaCarta.classList.remove('virada');
                resetarRodada();
            }, 1000);
        }
    }

    // --- 6. Limpeza de Variáveis de Controle ---
    function resetarRodada() {
        primeiraCarta = null;
        segundaCarta = null;
        bloqueiaTabuleiro = false;
    }
});
