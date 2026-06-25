// --- Dados do Jogo (Variáveis Estruturadas) ---
const paresCartas = [
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
const btnAcessibilidade = document.getElementById('btn-acessibilidade');
const configForm = document.getElementById('config-form');
const nomeJogadorInput = document.getElementById('nome-jogador');
const painelStatus = document.getElementById('painel-status');
const boasVindas = document.getElementById('boas-vindas');
const contadorMovimentos = document.getElementById('contador-movimentos');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const tabuleiro = document.getElementById('tabuleiro-jogo');

// --- Variáveis de Controle de Estado (Critério Nível 4) ---
let primeiraCarta = null;
let segundaCarta = null;
let movimentos = 0;
let paresFeitos = 0;
let bloqueiaTabuleiro = false;

// --- 1. Modo Escuro (Acessibilidade) ---
btnAcessibilidade.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// --- 2. Controle do Formulário Obrigatório ---
configForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    
    const nome = nomeJogadorInput.value.trim();
    boasVindas.textContent = `Investigador(a) ativo: ${nome}`;
    
    // Altera as classes do DOM para exibir o tabuleiro
    configForm.classList.add('oculto');
    painelStatus.classList.remove('oculto');
    tabuleiro.classList.remove('oculto');
    
    inicializarTabuleiro();
});

// --- 3. Criar Cartas no Tabuleiro ---
function inicializarTabuleiro() {
    tabuleiro.innerHTML = ''; // Limpa resíduos do tabuleiro
    
    // Sorteio seguro das cartas
    const cartasProntas = paresCartas.sort(function() {
        return Math.random() - 0.5;
    });
    
    cartasProntas.forEach(function(item, index) {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.setAttribute('data-id', item.id);
        elementoCarta.setAttribute('data-index', index);
        elementoCarta.textContent = item.texto;
        
        // Passa o elemento diretamente para a função de clique (evita o erro do 'this')
        elementoCarta.addEventListener('click', function() {
            tratarCliqueCarta(elementoCarta);
        });
        
        tabuleiro.appendChild(elementoCarta);
    });
}

// --- 4. Lógica de Clique Blindada contra Erros ---
function tratarCliqueCarta(cartaClicada) {
    // Se o tabuleiro estiver travado aguardando o tempo do erro, ignora o clique
    if (bloqueiaTabuleiro) return;
    
    // Se clicar em uma carta que já foi acertada ou já está virada, ignora
    if (cartaClicada.classList.contains('par-encontrado') || cartaClicada.classList.contains('virada')) return;

    // Vira a carta visualmente
    cartaClicada.classList.add('virada');

    // Se for a primeira carta escolhida da rodada
    if (primeiraCarta === null) {
        primeiraCarta = cartaClicada;
        return;
    }

    // Se for a segunda carta escolhida da rodada
    segundaCarta = cartaClicada;
    
    // Incrementa os movimentos na tela
    movimentos++;
    contadorMovimentos.textContent = `Movimentos realizados: ${movimentos}`;
    
    verificarPar();
}

// --- 5. Verificação de Acerto ou Erro ---
function verificarPar() {
    const id1 = primeiraCarta.getAttribute('data-id');
    const id2 = segundaCarta.getAttribute('data-id');
    
    // Se os IDs guardados nos atributos forem iguais, acertou o par
    if (id1 === id2) {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        
        primeiraCarta.classList.add('par-encontrado');
        segundaCarta.classList.add('par-encontrado');
        
        paresFeitos++;
        resetarRodada();
        
        // Fim de jogo (4 pares encontrados)
        if (paresFeitos === 4) {
            mensagemVitoria.classList.remove('oculto');
        }
    } else {
        // Se errou, trava o jogo por 1 segundo e desvira as duas cartas
        bloqueiaTabuleiro = true;
        
        setTimeout(function() {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            resetarRodada();
        }, 1000);
    }
}

// --- 6. Limpeza de Memória das Variáveis de Controle ---
function resetarRodada() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueiaTabuleiro = false;
}
