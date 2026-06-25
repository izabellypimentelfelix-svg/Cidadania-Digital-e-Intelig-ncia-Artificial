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

// --- Variáveis de Controle de Estado ---
let cartasViradas = [];
let movimentos = 0;
let paresFeitos = 0;
let bloqueiaTabuleiro = false;

// --- Algoritmo de Embaralhamento Seguro (Fisher-Yates) ---
function embaralhar(array) {
    let indiceAtual = array.length, indiceAleatorio;
    while (indiceAtual !== 0) {
        indiceAleatorio = Math.floor(Math.random() * indiceAtual);
        indiceAtual--;
        [array[indiceAtual], array[indiceAleatorio]] = [array[indiceAleatorio], array[indiceAtual]];
    }
    return array;
}

// --- 1. Funcionalidade de Acessibilidade (Modo Escuro) ---
btnAcessibilidade.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// --- 2. Validação e Controle do Formulário ---
configForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    
    const nome = nomeJogadorInput.value.trim();
    boasVindas.textContent = `Investigador(a) ativo: ${nome}`;
    
    // Altera visibilidade dos elementos manipulando classes do DOM
    configForm.classList.add('oculto');
    painelStatus.classList.remove('oculto');
    tabuleiro.classList.remove('oculto');
    
    inicializarTabuleiro();
});

// --- 3. Renderização Dinâmica do Tabuleiro ---
function inicializarTabuleiro() {
    tabuleiro.innerHTML = ''; // Limpa o tabuleiro de qualquer resíduo
    
    // Cria uma cópia profunda do array original e embaralha de forma justa
    const cartasProntas = embaralhar([...paresCartas]);
    
    cartasProntas.forEach((item, index) => {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.dataset.id = item.id;
        elementoCarta.dataset.index = index; // Identificador único da posição física da carta
        elementoCarta.textContent = item.texto;
        
        // Atribui o evento de clique individual
        elementoCarta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(elementoCarta);
    });
}

// --- 4. Lógica de Virada de Cartas e Proteção de Duplo Clique ---
function virarCarta() {
    if (bloqueiaTabuleiro) return;
    
    // Impede clicar em cartas já resolvidas ou na mesma que já está virada
    if (this.classList.contains('virada') || this.classList.contains('par-encontrado')) return;

    // Correção do Bug: Evita o erro se o usuário clicar duas vezes seguidas na primeira carta escolhida
    if (cartasViradas.length === 1 && cartasViradas[0].dataset.index === this.dataset.index) return;

    this.classList.add('virada');
    cartasViradas.push(this);

    // Valida as duas cartas escolhidas após o segundo movimento
    if (cartasViradas.length === 2) {
        movimentos++;
        contadorMovimentos.textContent = `Movimentos realizados: ${movimentos}`;
        verificarPar();
    }
}

// --- 5. Processamento Lógico e Verificação de Pares ---
function verificarPar() {
    const [carta1, carta2] = cartasViradas;
    
    // Verifica se os IDs lógicos guardados no HTML são idênticos
    if (carta1.dataset.id === carta2.dataset.id) {
        // Transforma o estado visual das duas cartas para acerto definitivo
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
        carta1.classList.add('par-encontrado');
        carta2.classList.add('par-encontrado');
        
        paresFeitos++;
        cartasViradas = []; // Esvazia o array para a próxima jogada
        
        // Condição de fim de jogo (Todos os 4 pares resolvidos)
        if (paresFeitos === 4) {
            mensagemVitoria.classList.remove('oculto');
        }
    } else {
        // Se errar, trava o tabuleiro e desvira as cartas após 1 segundo
        bloqueiaTabuleiro = true;
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
            bloqueiaTabuleiro = false;
        }, 1000);
    }
}
