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

// --- Variáveis de Controle de Estado ---
var primeiraCarta = null;
var segundaCarta = null;
var movimentos = 0;
var paresFeitos = 0;
var bloqueiaTabuleiro = false;

// --- Algoritmo de Embaralhar Seguro (Fisher-Yates) ---
function embaralharSeguro(array) {
    var copia = array.slice(0); // Cria uma cópia limpa na memória sem alterar o original
    var indiceAtual = copia.length, valorTemporario, indiceAleatorio;
    while (0 !== indiceAtual) {
        indiceAleatorio = Math.floor(Math.random() * indiceAtual);
        indiceAtual -= 1;
        valorTemporario = copia[indiceAtual];
        copia[indiceAtual] = copia[indiceAleatorio];
        copia[indiceAleatorio] = valorTemporario;
    }
    return copia;
}

// --- 1. Modo Escuro (Acessibilidade) ---
if (btnAcessibilidade) {
    btnAcessibilidade.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

// --- 2. Controle do Formulário Obrigatório ---
if (configForm) {
    configForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita recarregar a página
        
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

// --- 3. Criar Cartas no Tabuleiro ---
function inicializarTabuleiro() {
    if (!tabuleiro) return;
    tabuleiro.innerHTML = ''; // Limpa completamente o tabuleiro anterior
    
    // Obtém o array embaralhado de forma segura
    var cartasProntas = embaralharSeguro(paresCartas);
    
    for (var i = 0; i < cartasProntas.length; i++) {
        var item = cartasProntas[i];
        
        var elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.setAttribute('data-id', item.id);
        elementoCarta.textContent = item.texto;
        
        configurarClique(elementoCarta);
        tabuleiro.appendChild(elementoCarta);
    }
}

// --- 4. Lógica de Clique Individual ---
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

// --- 5. Verificação de Acerto ou Erro ---
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
