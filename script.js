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

// --- Variáveis de Controle de Estado (Requisito Nível 4) ---
let cartasViradas = [];
let movimentos = 0;
let paresFeitos = 0;
let bloqueiaTabuleiro = false;

// --- Algoritmo de Embaralhar Seguro ---
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// --- 1. Modo Escuro (Acessibilidade) ---
btnAcessibilidade.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// --- 2. Controle do Formulário ---
configForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real e recarregamento
    
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
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro anterior
    
    // Duplica e embaralha o array de cartas
    const cartasProntas = embaralhar([...paresCartas]);
    
    cartasProntas.forEach(function(item, index) {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.dataset.id = item.id;
        elementoCarta.dataset.index = index; // Guarda a posição física da carta
        elementoCarta.textContent = item.texto;
        
        // Adiciona o clique em cada uma delas
        elementoCarta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(elementoCarta);
    });
}

// --- 4. Lógica do Clique na Carta (CORRIGIDO) ---
function virarCarta() {
    if (bloqueiaTabuleiro) return;
    
    // Impede clicar em cartas já resolvidas ou já viradas
    if (this.classList.contains('virada') || this.classList.contains('par-encontrado')) return;

    // CORREÇÃO DO ERRO: Verifica corretamente usando o índice [0] do array
    if (cartasViradas.length === 1 && cartasViradas[0].dataset.index === this.dataset.index) return;

    this.classList.add('virada');
    cartasViradas.push(this);

    // Se virou duas cartas, faz a validação
    if (cartasViradas.length === 2) {
        movimentos++;
        contadorMovimentos.textContent = `Movimentos realizados: ${movimentos}`;
        verificarPar();
    }
}

// --- 5. Verificação de Acerto ou Erro ---
function verificarPar() {
    const carta1 = cartasViradas[0];
    const carta2 = cartasViradas[1];
    
    // Se os IDs guardados no HTML forem iguais, acertou o par
    if (carta1.dataset.id === carta2.dataset.id) {
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
        carta1.classList.add('par-encontrado');
        carta2.classList.add('par-encontrado');
        
        paresFeitos++;
        cartasViradas = []; // Reseta a lista de viradas
        
        // Fim de jogo (4 pares encontrados)
        if (paresFeitos === 4) {
            mensagemVitoria.classList.remove('oculto');
        }
    } else {
        // Se errou, trava o jogo por 1 segundo e desvira as cartas
        bloqueiaTabuleiro = true;
        setTimeout(function() {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
            bloqueiaTabuleiro = false;
        }, 1000);
    }
}
