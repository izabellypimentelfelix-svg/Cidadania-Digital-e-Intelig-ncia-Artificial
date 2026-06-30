// 1. Modo Escuro
const botaoDarkMode = document.getElementById('toggle-dark-mode');
botaoDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 2. Banco de Dados do Jogo da Memória Expandido (6 Pares / 12 Cards)
const dadosCards = [
    { id: 1, texto: "Deepfake" },
    { id: 1, texto: "Manipulação de vídeo/áudio com IA" },
    { id: 2, texto: "Desinformação" },
    { id: 2, texto: "Espalhar mentiras intencionais" },
    { id: 3, texto: "Fact-checking" },
    { id: 3, texto: "Checagem e validação de notícias" },
    { id: 4, texto: "Cidadania Digital" },
    { id: 4, texto: "Uso seguro, ético e crítico da web" },
    { id: 5, texto: "Phishing" },
    { id: 5, texto: "Golpes virtuais para roubar dados" },
    { id: 6, texto: "Algoritmo" },
    { id: 6, texto: "Regras de IA que controlam o feed" }
];

dadosCards.sort(() => Math.random() - 0.5);

const gridMemoria = document.getElementById('grid-memoria');
const contadorAcertosDOM = document.getElementById('contador-acertos');

let cardsVirados = [];
let acertos = 0;

function iniciarJogoMemoria() {
    dadosCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card-memoria');
        card.dataset.id = item.id;
        card.dataset.index = index;
        card.innerText = "Revelar Conceito";
        
        card.addEventListener('click', virarCard);
        gridMemoria.appendChild(card);
    });
}

function virarCard() {
    const cardSelecionado = this;

    if (cardsVirados.length >= 2 || cardSelecionado.classList.contains('virado') || cardSelecionado.classList.contains('par-encontrado')) {
        return;
    }

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
        card1.classList.add('par-encontrado');
        card2.classList.add('par-encontrado');
        acertos++;
        contadorAcertosDOM.innerText = acertos;
        cardsVirados = [];

        if (acertos === 6) {
            setTimeout(() => { alert("Incrível! Você concluiu o Jogo da Memória!"); }, 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('virado');
            card2.classList.remove('virado');
            card1.innerText = "Revelar Conceito";
            card2.innerText = "Revelar Conceito";
            cardsVirados = [];
        }, 1500);
    }
}

// 3. Lógica do Novo Jogo (Quiz)
const botoesQuiz = document.querySelectorAll('.btn-quiz');
const feedbackQuiz = document.getElementById('feedback-quiz');

botoesQuiz.forEach(botao => {
    botao.addEventListener('click', function() {
        const eCorreto = this.getAttribute('data-correto') === 'true';
        
        feedbackQuiz.classList.remove('escondido');
        if (eCorreto) {
            feedbackQuiz.style.backgroundColor = 'var(--cor-sucesso)';
            feedbackQuiz.innerText = "Resposta Correta! Quebrar a corrente de compartilhamento impede que as fake news cresçam.";
        } else {
            feedbackQuiz.style.backgroundColor = 'var(--cor-erro)';
            feedbackQuiz.innerText = "Resposta Errada. Compartilhar sem checar ou aceitar mídias cegamente alimenta a desinformação.";
        }
    });
});

// 4. Formulário de Contato / Relatórios
const formContato = document.getElementById('form-contato');
const feedbackFormulario = document.getElementById('feedback-formulario');

formContato.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const nomeUsuario = document.getElementById('nome').value;
    
    feedbackFormulario.style.backgroundColor = 'var(--cor-sucesso)';
    feedbackFormulario.innerText = `Obrigado, ${nomeUsuario}! Relatório encaminhado com sucesso à nossa central de checagem.`;
    feedbackFormulario.classList.remove('escondido');
    
    formContato.reset();
});

// Inicialização automática das cartas
iniciarJogoMemoria();
