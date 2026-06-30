// 1. Controle do Modo Escuro (Acessibilidade)
const botaoDarkMode = document.getElementById('toggle-dark-mode');
botaoDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 2. Dados do Jogo da Memória (Conceito e Par correspondente)
const dadosCards = [
    { id: 1, texto: "Deepfake", par: "IA de Áudio/Vídeo Falso" },
    { id: 1, texto: "IA de Áudio/Vídeo Falso", par: "Deepfake" },
    { id: 2, texto: "Desinformação", par: "Notícias Falsas Lucrativas" },
    { id: 2, texto: "Notícias Falsas Lucrativas", par: "Desinformação" },
    { id: 3, texto: "Checagem de Fatos", par: "Verificar Fontes Oficiais" },
    { id: 3, texto: "Verificar Fontes Oficiais", par: "Checagem de Fatos" },
    { id: 4, texto: "Cidadania Digital", par: "Uso Ético da Internet" },
    { id: 4, texto: "Uso Ético da Internet", par: "Cidadania Digital" }
];

// Embaralhar os cards usando algoritmo simples
dadosCards.sort(() => Math.random() - 0.5);

const gridMemoria = document.getElementById('grid-memoria');
const contadorAcertosDOM = document.getElementById('contador-acertos');

let cardsVirados = [];
let acertos = 0;

// Inicializar os cards no DOM
dadosCards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card-memoria');
    card.dataset.id = item.id;
    card.dataset.index = index;
    card.innerText = "?"; // Esconde o texto inicialmente
    
    card.addEventListener('click', virarCard);
    gridMemoria.appendChild(card);
});

function virarCard() {
    const cardSelecionado = this;

    // Evita clicar no mesmo card ou em cards já combinados
    if (cardsVirados.length >= 2 || cardSelecionado.classList.contains('virado') || cardSelecionado.classList.contains('par-encontrado')) {
        return;
    }

    // Altera dinamicamente o texto e estilo do card (Manipulação do DOM)
    cardSelecionado.classList.add('virado');
    cardSelecionado.innerText = dadosCards[cardSelecionado.dataset.index].texto;
    cardsVirados.push(cardSelecionado);

    if (cardsVirados.length === 2) {
        checarPar();
    }
}

function checarPar() {
    const [card1, card2] = cardsVirados;

    if (card1.dataset.id === card2.dataset.id) {
        // Se acertou o par
        card1.classList.add('par-encontrado');
        card2.classList.add('par-encontrado');
        acertos++;
        contadorAcertosDOM.innerText = acertos; // Atualiza o contador na tela
        cardsVirados = [];

        if (acertos === 4) {
            setTimeout(() => { alert("Parabéns! Você identificou todas as ameaças digitais!"); }, 300);
        }
    } else {
        // Se errou, desvira após 1.5 segundos
        setTimeout(() => {
            card1.classList.remove('virado');
            card2.classList.remove('virado');
            card1.innerText = "?";
            card2.innerText = "?";
            cardsVirados = [];
        }, 1500);
    }
}

// 3. Validação e Interação com o Formulário
const formContato = document.getElementById('form-contato');
const feedbackFormulario = document.getElementById('feedback-formulario');

formContato.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede a página de recarregar
    
    // Captura e processa as informações das variáveis antes de exibir
    const nomeUsuario = document.getElementById('nome').value;
    
    // Altera o DOM para exibir a mensagem de sucesso limpa
    feedbackFormulario.innerText = `Obrigado, ${nomeUsuario}! Relatório enviado para análise com sucesso.`;
    feedbackFormulario.classList.remove('escondido');
    
    formContato.reset(); // Limpa os campos do formulário
});
