# Portal Consciência IA 🌐🤖

## 📋 Escopo e Objetivo do Projeto
Este portal é uma aplicação Web estática projetada com o objetivo de servir como uma central de conscientização comunitária. Alinhado com as discussões contemporâneas sobre segurança cibernética, o site capacita os cidadãos a reconhecer e mitigar os efeitos das **Deepfakes** e de ecossistemas automatizados de **Desinformação**, promovendo uma postura ética e cidadã no espaço digital.

Desenvolvido para atender aos critérios de recuperação da disciplina de **Educação Digital e IA (Ensino Médio)**.

---

## 🚀 Arquitetura Técnica e Recursos Implementados
* **Acessibilidade Nativa (Subcategoria B):** Alternância em tempo real entre interfaces clara e escura utilizando herança de escopo em variáveis `:root` do CSS.
* **Design Responsivo Avançado:** Utilização de arquitetura Flexbox e regras baseadas em Media Queries para adaptação perfeita em dispositivos móveis.
* **Validação Interativa (Subcategoria A):** Script dinâmico em JavaScript puro (Vanilla JS) que extrai dados capturados em inputs de formulário, processa matrizes de acertos e falhas e injeta feedbacks customizados no DOM.

---

## 🤖 Prompts de Engenharia de IA Aplicados
Em conformidade com a **Subcategoria D** e diretrizes éticas, a estruturação técnica contou com o suporte estruturado dos seguintes prompts lógicos:
1.  *\"Gere um template de formulário semântico HTML5 com tags input de tipo radio estruturadas sob rótulos organizados para uma aplicação de quiz educacional sobre IA.\"*
2.  *\"Crie regras CSS modernas usando Flexbox para centralização estrutural e adicione variáveis nativas para chaveamento dinâmico de classe dark-theme.\"*
3.  *\"Escreva um script que leia estados
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Cidadania Digital 2026</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <div class="container-header">
            <h1>Cidadania Digital & IA</h1>
            <p>O Impacto das Deepfakes e da Desinformação na Sociedade</p>
            <button id="btn-tema" class="btn-interativo">🌓 Alternar Modo Escuro</button>
        </div>
    </header>

    <main>
        
        <section id="artigos">
            <h2>📰 Artigos em Destaque</h2>
            <div class="grid-artigos">
                <article class="card-artigo">
                    <h3>O que são Deepfakes?</h3>
                    <p>Deepfakes são vídeos, áudios ou imagens adulterados digitalmente por inteligência artificial para imitar pessoas reais. Elas desafiam a nossa perceção da verdade na era digital.</p>
                </article>

                <article class="card-artigo">
                    <h3>A Desinformação Automatizada</h3>
                    <p>Com o uso de bots e IA generativa, notícias falsas são criadas e espalhadas em segundos, alcançando milhares de pessoas antes mesmo de serem checadas por especialistas.</p>
                </article>

                <article class="card-artigo">
                    <h3>O Papel do Cidadão Digital</h3>
                    <p>Ser um cidadão digital significa ter responsabilidade: verificar fontes, desconfiar de conteúdos absurdos e nunca partilhar informações sem ter a certeza de que são reais.</p>
                </article>
            </div>
        </section>

        <section id="galeria" class="card">
            <h2>📸 Galeria de Análise: Real vs IA</h2>
            <p>Veja abaixo exemplos visuais de como elementos gerados por IA costumam apresentar falhas de renderização.</p>
            
            <div class="container-galeria">
                <div class="item-galeria">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" alt="Exemplo de distorção digital de fundo">
                    <p class="legenda-foto"><strong>Ponto de Atenção:</strong> Fundos excessivamente borrados ou com linhas geométricas tortas revelam manipulação.</p>
                </div>
                <div class="item-galeria">
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500" alt="Exemplo de reflexo e iluminação artificial">
                    <p class="legenda-foto"><strong>Ponto de Atenção:</strong> Iluminação dupla ou reflexos nos olhos que não condizem com o cenário real.</p>
                </div>
            </div>
        </section>

        <section id="jogo-container" class="card">
            <h2>🕹️ Jogo: Detetive da Verdade</h2>
            <p>Analise o caso abaixo e use seus conhecimentos para decidir se a mídia é real ou uma deepfake!</p>
            
            <div class="cenario-jogo">
                <p class="enunciado-caso"><strong>Caso Atual:</strong> Circula um vídeo de um cientista famoso anunciando que a Lua é feita de queijo. O áudio está ligeiramente robótico, o fundo do cenário parece borrado e os olhos dele piscam em momentos estranhos.</p>
                
                <form id="form-jogo">
                    <div class="opcoes-grupo">
                        <label class="opcao-resposta">
                            <input type="radio" name="decisao" value="fake"> 
                            <span class="label-texto">🚨 É FAKE / DEEPFAKE! Vou denunciar e não compartilhar.</span>
                        </label>
                        
                        <label class="opcao-resposta">
                            <input type="radio" name="decisao" value="real"> 
                            <span class="label-texto">✅ É REAL! Parece legítimo, vou passar adiante.</span>
                        </label>
                    </div>
                    
                    <button type="button" id="btn-jogar" class="btn-enviar">Enviar Veredito</button>
                </form>
            </div>

            <div id="feedback-jogo" class="oculto">
                <p id="mensagem-resultado"></p>
                <div class="placar">
                    Pontuação Atual: <span id="pontos">0</span> pontos
                </div>
            </div>
        </section>

    </main>

    <footer>
        <p>&copy; 2026 Portal de Consciência Comunitária. Criado para fins educativos.</p>
        <p class="tag-projeto">Tag do Projeto: <strong>#cidadaniadigital2026</strong></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
