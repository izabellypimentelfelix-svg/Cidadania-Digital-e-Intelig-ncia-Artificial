// 1. Controle do Modo Escuro (Acessibilidade)
const botaoDarkMode = document.getElementById('toggle-dark-mode');
botaoDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 2. Banco de dados do Jogo da Memória (Pares Correspondentes pelo ID)
const dadosCards = [
    { id: 1, texto: "Deepfake" },
    { id: 1, texto: "Vídeo Falso criado por IA" },
    { id: 2, texto: "Desinformação" },
    { id: 2, texto: "Notícias falsas para enganar" },
    { id: 3, texto: "Checagem de Fatos" },
    { id: 3, texto: "Verificar fontes oficiais" },
    { id: 4, texto: "Cidadania Digital" },
    { id: 4, texto: "Uso seguro e ético da web" }
];

// Algoritmo para embaralhar os itens de forma aleatória
dadosCards.sort(() => Math.random() - 0.5);

const gridMemoria = document.getElementById('grid-memoria');
const contadorAcertosDOM = document.getElementById('contador-acertos');

let cardsVirados = [];
let acertos = 0;

// Função que constrói os elementos visuais do jogo
function iniciarJogo() {
    dadosCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card-memoria');
        card.dataset.id = item.id;
        card.dataset.index = index;
        card.innerText = "Clique para revelar"; // Texto do verso
        
        card.addEventListener('click', virarCard);
        gridMemoria.appendChild(card);
    });
}

function virarCard() {
    const cardSelecionado = this;

    // Proteções: impede clicar no mesmo, em cards já certos ou se já existirem 2 abertos
    if (cardsVirados.length >= 2 || cardSelecionado.classList.contains('virado') || cardSelecionado.classList.contains('par-encontrado')) {
        return;
    }

    // Modifica o DOM para exibir o texto real correspondente ao index
    cardSelecionado.classList.add('virado');
    cardSelecionado.innerText = dadosCards[cardSelecionado.dataset.index].texto;
    cardsVirados.push(cardSelecionado);

    if (cardsVirados.length === 2) {
        checarPar();
    }
}

function checarPar() {
    const [card1, card2] = cardsVirados;

    // Se os IDs forem idênticos, encontramos um par conceitual
    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add('par-encontrado');
        card2.classList.add('par-encontrado');
        
        acertos++;
        contadorAcertosDOM.innerText = acertos; // Atualiza contador na tela
        cardsVirados = []; // Limpa o cache de escolha

        if (acertos === 4) {
            setTimeout(() => { 
                alert("Excelente! Você dominou os conceitos de Cidadania Digital!"); 
            }, 300);
        }
    } else {
        // Se errar, volta ao estado original após 1,5 segundos
        setTimeout(() => {
            card1.classList.remove('virado');
            card2.classList.remove('virado');
            card1.innerText = "Clique para revelar";
            card2.innerText = "Clique para revelar";
            cardsVirados = [];
        }, 1500);
    }
}

// Executa a montagem do jogo assim que o script carrega
iniciarJogo();

// 3. Validação do Formulário com Manipulação do DOM
const formContato = document.getElementById('form-contato');
const feedbackFormulario = document.getElementById('feedback-formulario');

formContato.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita recarregar a tela
    
    const nomeUsuario = document.getElementById('nome').value;
    
    // Altera propriedades do DOM dinamicamente
    feedbackFormulario.innerText = `Obrigado, ${nomeUsuario}! Relatório enviado com sucesso.`;
    feedbackFormulario.classList.remove('escondido');
    
    formContato.reset(); // Limpa as caixas de texto
});
