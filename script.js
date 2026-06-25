// --- Dados do Jogo (Pares Correspondentes pelo ID) ---
const itensOriginais = [
    { id: 1, texto: "👁️ Olhar Fixo / Sem Piscar" },
    { id: 1, texto: "🔍 Alerta de Deepfake Visual" },
    { id: 2, texto: "🗣️ Voz Robótica / Sem Emoção" },
    { id: 2, texto: "🎧 Alerta de Deepfake de Áudio" },
    { id: 3, texto: "🧱 Fundo Borrado / Falhas" },
    { id: 3, texto: "🖼️ Erro de Cenário por IA" },
    { id: 4, texto: "📰 Notícia Bombástica" },
    { id: 4, texto: "🔗 Sempre Checar a Fonte" }
];

// Embaralha os itens de forma simples para reiniciar o jogo aleatoriamente
const cartasEmbaralhadas = itensOriginais.sort(() => Math.random() - 0.5);

// --- Seleção de Elementos e Estado Global (Uso de Variáveis) ---
const tabuleiro = document.getElementById('tabuleiro-jogo');
const contadorMovimentos = document.getElementById('contador-movimentos');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const btnAcessibilidade = document.getElementById('btn-acessibilidade');

let cartasViradas = [];
let movimentos = 0;
let paresFeitos = 0;
let bloqueiaTabuleiro = false;

// --- Funcionalidade 1: Modo Escuro ---
btnAcessibilidade.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// --- Funcionalidade 2: Construção Dinâmica do Tabuleiro (DOM Avançado) ---
cartasEmbaralhadas.forEach(item => {
    const elementoCarta = document.createElement('div');
    elementoCarta.classList.add('carta');
    elementoCarta.dataset.id = item.id;
    elementoCarta.textContent = item.texto;
    
    // Adiciona o evento de clique para cada carta gerada
    elementoCarta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(elementoCarta);
});

// --- Funcionalidade 3: Lógica do Jogo da Memória ---
function virarCarta() {
    if (bloqueiaTabuleiro) return;
    if (this.classList.contains('virada') || this.classList.contains('par-encontrado')) return;

    this.classList.add('virada');
    cartasViradas.push(this);

    // Se o jogador virou duas cartas, executa a verificação
    if (cartasViradas.length === 2) {
        movimentos++;
        contadorMovimentos.textContent = `Movimentos: ${movimentos}`;
        verificarPar();
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    
    // Se o dataset.id for igual, as duas cartas formam um par correto
    if (carta1.dataset.id === carta2.dataset.id) {
        carta1.classList.add('par-encontrado');
        carta2.classList.add('par-encontrado');
        paresFeitos++;
        
        cartasViradas = [];
        
        // Verifica condição de vitória (4 pares no total)
        if (paresFeitos === 4) {
            mensagemVitoria.classList.remove('oculto');
        }
    } else {
        // Se errou, bloqueia temporariamente e desvira as duas cartas após 1 segundo
        bloqueiaTabuleiro = true;
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
            bloqueiaTabuleiro = false;
        }, 1000);
    }
}
