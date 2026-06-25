// --- Seleção de Elementos do DOM ---
const btnAcessibilidade = document.getElementById('btn-acessibilidade');
const quizForm = document.getElementById('quiz-form');
const perguntaSelect = document.getElementById('pergunta');
const resultadoContainer = document.getElementById('resultado-container');
const textoResultado = document.getElementById('texto-resultado');
const contadorTentativas = document.getElementById('contador-tentativas');

// --- Variável de Controle (Processamento de Informação) ---
let totalTentativas = 0;

// --- Funcionalidade 1: Modo Escuro (Acessibilidade) ---
btnAcessibilidade.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// --- Funcionalidade 2: Validador do Quiz ---
quizForm.addEventListener('submit', function(event) {
    // Impede a página de recarregar ao enviar o formulário
    event.preventDefault(); 
    
    // Incrementa a variável de tentativas
    totalTentativas = totalTentativas + 1;
    
    // Captura o valor selecionado pelo usuário
    const respostaUsuario = perguntaSelect.value;
    
    // Exibe o container de feedback
    resultadoContainer.classList.remove('oculto');
    
    // Processa a resposta do usuário e manipula o DOM textualmente e visualmente
    if (respostaUsuario === 'correta') {
        textoResultado.textContent = "Parabéns! Você acertou. Falhas na sincronia labial e iluminação estranha são sinais clássicos de deepfakes.";
        textoResultado.className = "mensagem-sucesso";
    } else {
        textoResultado.textContent = "Resposta errada. Fique atento aos pequenos detalhes digitais falsificados! Tente novamente.";
        textoResultado.className = "mensagem-erro";
    }
    
    // Atualiza dinamicamente o contador na tela
    contadorTentativas.textContent = `Tentativas realizadas: ${totalTentativas}`;
});
