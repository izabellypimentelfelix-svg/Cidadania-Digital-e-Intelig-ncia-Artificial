// Aguarda o carregamento do DOM antes de executar
document.addEventListener("DOMContentLoaded", function () {
    
    // --- FUNCIONALIDADE 1: Modo Escuro ---
    const toggleButton = document.getElementById("toggle-dark-mode");
    
    toggleButton.addEventListener("click", function () {
        // Altera a classe do body para disparar as variáveis do CSS
        document.body.classList.toggle("dark-mode");
    });

    // --- FUNCIONALIDADE 2: Validador do Quiz Anti-Desinformação ---
    const submitButton = document.getElementById("submit-quiz");
    const resultDiv = document.getElementById("quiz-result");

    submitButton.addEventListener("click", function () {
        // Captura a opção selecionada pelo usuário usando o seletor específico
        const selectedOption = document.querySelector('input[name="q1"]:checked');

        // Remove classes de estilizações anteriores do bloco de resultados
        resultDiv.className = "";

        // Processamento das informações usando condicionais
        if (!selectedOption) {
            resultDiv.textContent = "Por favor, selecione uma resposta antes de verificar!";
            resultDiv.classList.add("error");
        } else if (selectedOption.value === "correto") {
            resultDiv.textContent = "Excelente! Você acertou. Piscar incorreto e falhas em texturas/sombras são fortes indícios de manipulação por IA.";
            resultDiv.classList.add("success");
        } else {
            resultDiv.textContent = "Resposta incorreta. Tente analisar as piscadas de olhos e os detalhes de iluminação na próxima vez!";
            resultDiv.classList.add("error");
        }

        // Exibe a div de resultado removendo o estado oculto de forma funcional
        resultDiv.style.display = "block";
    });
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Alternar Modo Escuro
    const btnTema = document.getElementById("btn-tema");
    btnTema.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            btnTema.textContent = "☀️ Alternar Modo Claro";
        } else {
            btnTema.textContent = "🌓 Alternar Modo Escuro";
        }
    });

    // 2. Lógica do Jogo
    let pontuacao = 0;
    const btnJogar = document.getElementById("btn-jogar");
    const feedbackJogo = document.getElementById("feedback-jogo");
    const mensagemResultado = document.getElementById("mensagem-resultado");
    const spanPontos = document.getElementById("pontos");

    btnJogar.addEventListener("click", function () {
        const opcaoSelecionada = document.querySelector('input[name="decisao"]:checked');

        if (!opcaoSelecionada) {
            alert("Por favor, selecione uma opção antes de enviar seu veredito!");
            return;
        }

        const respostaUsuario = opcaoSelecionada.value;
        feedbackJogo.classList.remove("oculto", "sucesso-resultado", "erro-resultado");

        if (respostaUsuario === "fake") {
            pontuacao += 10;
            mensagemResultado.textContent = "🎯 Excelente! Você identificou os padrões da IA: áudio robótico, fundo borrado e piscadas inconsistentes são fortes indícios de deepfake.";
            feedbackJogo.classList.add("sucesso-resultado");
        } else {
            mensagemResultado.textContent = "❌ Atenção! Você caiu na armadilha. Lembre-se que notícias absurdas com áudio artificial e falhas visuais são geradas por IA.";
            feedbackJogo.classList.add("erro-resultado");
        }

        spanPontos.textContent = pontuacao;
    });
});});
