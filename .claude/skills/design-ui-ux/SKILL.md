---
name: design-ui-ux
description: Use sempre em todos layouts e designs as leis de UI/UX, Hick, Fitts, Miller, Jakob, Doherty, Zeigarnik, Peak-End, Von Restorff, Gestalt, sobrecarga de escolha, goal-gradient, heurísticas de Nielsen, auditoria de usabilidade, carga cognitiva, progressive disclosure, aplique e teste todas as leis.
license: Unlicense
metadata:
  author: thiagoeti
  version: 1.0.0
---

# Design UI/UX

- [Laws of UX](https://lawsofux.com)

## Uso

- Leis de UI/UX aplicadas ao front
- Consulte antes de desenhar tela, fluxo ou componente
- Ache a fricção, encontre a lei na tabela e aplique a mudança da coluna No front

## Gestalt

| Lei | Resumo | No front |
|---|---|---|
| [Law of Common Region](https://lawsofux.com/law-of-common-region) | Elementos dentro da mesma borda formam grupo | Card, borda ou fundo para agrupar campos |
| [Law of Proximity](https://lawsofux.com/law-of-proximity) | Elementos próximos formam grupo | Espaço menor dentro do grupo, maior entre grupos |
| [Law of Prägnanz](https://lawsofux.com/law-of-pragnanz) | Forma complexa é lida na versão mais simples | Ícone e layout com formas simples |
| [Law of Similarity](https://lawsofux.com/law-of-similarity) | Elementos parecidos são vistos como grupo | Mesmo estilo para a mesma função |
| [Law of Uniform Connectedness](https://lawsofux.com/law-of-uniform-connectedness) | Elementos conectados visualmente parecem relacionados | Linha ou cor ligando etapas de um fluxo |

## Decisão e esforço

| Lei | Resumo | No front |
|---|---|---|
| [Fitts's Law](https://lawsofux.com/fittss-law) | Tempo até o alvo depende da distância e do tamanho | Botão grande, perto da ação; alvo de toque ≥ 44px |
| [Hick's Law](https://lawsofux.com/hicks-law) | Mais opções, decisão mais lenta | Menos opções por tela; destaque a recomendada |
| [Choice Overload](https://lawsofux.com/choice-overload) | Opções demais travam a decisão | Filtro, busca e comparação lado a lado |
| [Cognitive Load](https://lawsofux.com/cognitive-load) | Esforço mental para usar a interface | Remova o que não ajuda a tarefa |
| [Tesler's Law](https://lawsofux.com/teslers-law) | Toda tarefa tem complexidade que não some | O sistema absorve a complexidade, não o usuário |
| [Occam's Razor](https://lawsofux.com/occams-razor) | Prefira a solução com menos suposições | Corte até não restar nada a tirar |
| [Pareto Principle](https://lawsofux.com/pareto-principle) | 80% do efeito vem de 20% das causas | Priorize os fluxos mais usados |
| [Doherty Threshold](https://lawsofux.com/doherty-threshold) | Produtividade sobe com resposta < 400 ms | Feedback imediato; skeleton e UI otimista |

## Memória e atenção

| Lei | Resumo | No front |
|---|---|---|
| [Miller's Law](https://lawsofux.com/millers-law) | Memória de trabalho guarda 7 ± 2 itens | Não use como limite fixo; agrupe a informação |
| [Working Memory](https://lawsofux.com/working-memory) | Memória temporária para a tarefa atual | Mostre o dado em vez de pedir para lembrar |
| [Chunking](https://lawsofux.com/chunking) | Informação em blocos é mais fácil de reter | Telefone, CPF e cartão em grupos |
| [Serial Position Effect](https://lawsofux.com/serial-position-effect) | Primeiro e último itens são mais lembrados | Ação principal no início ou no fim |
| [Von Restorff Effect](https://lawsofux.com/von-restorff-effect) | O item diferente é o mais lembrado | Um único destaque por tela |
| [Selective Attention](https://lawsofux.com/selective-attention) | Atenção vai só ao que importa para a meta | Não ponha o essencial onde parece anúncio ou banner |
| [Zeigarnik Effect](https://lawsofux.com/zeigarnik-effect) | Tarefa incompleta é mais lembrada | Barra de progresso e checklist |

## Comportamento

| Lei | Resumo | No front |
|---|---|---|
| [Jakob's Law](https://lawsofux.com/jakobs-law) | Usuário espera que seu site funcione como os outros | Siga padrões conhecidos de navegação e formulário |
| [Mental Model](https://lawsofux.com/mental-model) | Usuário age pelo que acha que o sistema faz | Nomes e fluxos com a linguagem do usuário |
| [Paradox of the Active User](https://lawsofux.com/paradox-of-the-active-user) | Usuário não lê manual, começa usando | Ajuda contextual: tooltip e estado vazio |
| [Postel's Law](https://lawsofux.com/postels-law) | Seja liberal no que aceita, conservador no que envia | Aceite máscara, espaço e formato variado no input |
| [Goal-Gradient Effect](https://lawsofux.com/goal-gradient-effect) | Motivação cresce perto da meta | Mostre quanto falta para concluir |
| [Peak-End Rule](https://lawsofux.com/peak-end-rule) | Experiência é julgada pelo pico e pelo fim | Capriche no sucesso e na tela final |
| [Aesthetic-Usability Effect](https://lawsofux.com/aesthetic-usability-effect) | Bonito parece mais fácil de usar | Visual cuidado, sem esconder problema de uso |
| [Parkinson's Law](https://lawsofux.com/parkinsons-law) | Tarefa ocupa todo o tempo disponível | Mostre a duração esperada; autopreenchimento encurta a tarefa |
| [Flow](https://lawsofux.com/flow) | Imersão total quando desafio e habilidade se equilibram | Sem interrupção no meio da tarefa |
| [Cognitive Bias](https://lawsofux.com/cognitive-bias) | Erros sistemáticos de julgamento | Não explore o viés: padrão a favor da pessoa, recusa neutra |

## Referência visual

- `index.html`: glifos e exemplos; abra no navegador, sem build
- `examples.md`: as mesmas imagens em Markdown
- Os resumos são adaptações livres do site original

### Glifos

| Grupo | Lei | Original | Glifo |
|---|---|---|---|
| Gestalt | Lei da Região Comum | [Law of Common Region](https://lawsofux.com/law-of-common-region) | Pontos equidistantes divididos em dois grupos só pela borda |
| Gestalt | Lei da Proximidade | [Law of Proximity](https://lawsofux.com/law-of-proximity) | Dois aglomerados com 8 px dentro e 40 px entre eles |
| Gestalt | Lei de Prägnanz | [Law of Prägnanz](https://lawsofux.com/law-of-pragnanz) | Três círculos recortados lidos como um único triângulo |
| Gestalt | Lei da Similaridade | [Law of Similarity](https://lawsofux.com/law-of-similarity) | Colunas de quadrados agrupadas entre colunas de círculos |
| Gestalt | Lei da Conexão Uniforme | [Law of Uniform Connectedness](https://lawsofux.com/law-of-uniform-connectedness) | Pontos equidistantes agrupados por traços de ligação |
| Decisão e esforço | Lei de Fitts | [Fitts's Law](https://lawsofux.com/fittss-law) | Cursor, distância D e alvo de largura mínima de 44 px |
| Decisão e esforço | Lei de Hick | [Hick's Law](https://lawsofux.com/hicks-law) | Árvore de decisão e curva logarítmica do tempo de reação |
| Decisão e esforço | Sobrecarga de Escolha | [Choice Overload](https://lawsofux.com/choice-overload) | Grade de 24 opções e conversão de 30% contra 3% |
| Decisão e esforço | Carga Cognitiva | [Cognitive Load](https://lawsofux.com/cognitive-load) | Tela poluída com carga de 92% contra tela limpa com 34% |
| Decisão e esforço | Lei de Tesler | [Tesler's Law](https://lawsofux.com/teslers-law) | Complexidade presa no sistema; usuário com uma linha simples |
| Decisão e esforço | Navalha de Occam | [Occam's Razor](https://lawsofux.com/occams-razor) | Trajeto com 5 suposições contra linha reta de 1 hipótese |
| Decisão e esforço | Princípio de Pareto | [Pareto Principle](https://lawsofux.com/pareto-principle) | 20% das causas ligadas a 80% dos efeitos |
| Decisão e esforço | Limiar de Doherty | [Doherty Threshold](https://lawsofux.com/doherty-threshold) | Histograma de respostas com limiar em 400 ms |
| Memória e atenção | Lei de Miller | [Miller's Law](https://lawsofux.com/millers-law) | Sete espaços cheios e dois vazios: 7 ± 2 |
| Memória e atenção | Memória de Trabalho | [Working Memory](https://lawsofux.com/working-memory) | Buffer de 4 espaços com itens antigos decaindo |
| Memória e atenção | Agrupamento | [Chunking](https://lawsofux.com/chunking) | Telefone de 11 dígitos agrupado em 3 blocos |
| Memória e atenção | Efeito de Posição Serial | [Serial Position Effect](https://lawsofux.com/serial-position-effect) | Curva em U: primeiros e últimos itens mais lembrados |
| Memória e atenção | Efeito Von Restorff | [Von Restorff Effect](https://lawsofux.com/von-restorff-effect) | Oito botões iguais e um destaque lembrado |
| Memória e atenção | Atenção Seletiva | [Selective Attention](https://lawsofux.com/selective-attention) | Anúncio ignorado e foco no botão da meta |
| Memória e atenção | Efeito Zeigarnik | [Zeigarnik Effect](https://lawsofux.com/zeigarnik-effect) | Checklist com uma tarefa pendente e anel em 3 de 4 |
| Comportamento | Lei de Jakob | [Jakob's Law](https://lawsofux.com/jakobs-law) | Três sites com o mesmo layout e o carrinho no mesmo lugar |
| Comportamento | Modelo Mental | [Mental Model](https://lawsofux.com/mental-model) | Layout esperado no balão igual à tela real |
| Comportamento | Paradoxo do Usuário Ativo | [Paradox of the Active User](https://lawsofux.com/paradox-of-the-active-user) | Manual dormindo e clique imediato em Começar |
| Comportamento | Lei de Postel | [Postel's Law](https://lawsofux.com/postels-law) | Três formatos de data normalizados em um só |
| Comportamento | Efeito Gradiente de Meta | [Goal-Gradient Effect](https://lawsofux.com/goal-gradient-effect) | Cartão com 8 de 10 selos e ritmo crescente |
| Comportamento | Regra do Pico-Fim | [Peak-End Rule](https://lawsofux.com/peak-end-rule) | Curva de experiência com pico e fim acima da média |
| Comportamento | Efeito Estética-Usabilidade | [Aesthetic-Usability Effect](https://lawsofux.com/aesthetic-usability-effect) | Tela crua com 40% contra tela cuidada com 85% |
| Comportamento | Lei de Parkinson | [Parkinson's Law](https://lawsofux.com/parkinsons-law) | Tarefa estimada em 2 dias que ocupa o prazo de 5 |
| Comportamento | Fluxo | [Flow](https://lawsofux.com/flow) | Trajetória no canal entre ansiedade e tédio |
| Comportamento | Viés Cognitivo | [Cognitive Bias](https://lawsofux.com/cognitive-bias) | Âncora de R$ 999 faz R$ 499 parecer barato |

## Exemplos

Antes e depois de cada lei numa tela real; imagens em `examples.md`.

| Lei | Antes | Depois |
|---|---|---|
| Lei da Região Comum | Lista corrida de campos | Caixas separadas: Entrega e Pagamento |
| Lei da Proximidade | Espaço igual entre tudo | Label colado ao campo; grupos afastados entre si |
| Lei de Prägnanz | Ícone, gradiente e enfeite disputando o dado | Só rótulo, número e variação |
| Lei da Similaridade | Tag com cara de botão | Tag neutra; só a ação vira botão |
| Lei da Conexão Uniforme | Etapas soltas, sem ordem clara | Linha conecta as etapas na sequência |
| Lei de Fitts | Alvos pequenos e colados | Finalizar largo e perto; Remover pequeno e longe |
| Lei de Hick | 7 fretes com o mesmo peso | 1 frete recomendado; o resto em Ver mais |
| Sobrecarga de Escolha | 8 planos lado a lado | 3 planos; o do meio destacado |
| Carga Cognitiva | Banner, popup e selos disputando atenção | Só o essencial para a tarefa |
| Lei de Tesler | 5 campos de endereço digitados à mão | Só o CEP; o sistema preenche o resto |
| Navalha de Occam | Pausar e Trocar escondidos em 4 níveis de menu | Pausar e Trocar no próprio card |
| Princípio de Pareto | 8 ações com o mesmo peso | 2 ações mais usadas à vista; 6 em Mais |
| Limiar de Doherty | Clique sem resposta até o servidor voltar | Aplicando… e barra de progresso no clique |
| Lei de Miller | 9 campos soltos | Campos agrupados em 3 blocos de 3 |
| Memória de Trabalho | Pede de novo o CEP já informado | Mostra o CEP, com opção de alterar |
| Agrupamento | 16 dígitos do cartão corridos | Cartão em 4 blocos de 4 |
| Efeito de Posição Serial | Item-chave perdido no meio do menu | Início primeiro, Carrinho por último |
| Efeito Von Restorff | 3 selos de destaque competindo | Um único selo de destaque |
| Atenção Seletiva | Erro no topo, com cara de promoção | Erro colado ao campo que falhou |
| Efeito Zeigarnik | Lista de passos sem progresso | Barra 1 de 4 e passo feito marcado |
| Lei de Jakob | Cabeçalho inventado, carrinho fora do lugar | Logo à esquerda, carrinho à direita |
| Modelo Mental | Código do ERP e status interno | Nome do café e status que o cliente entende |
| Paradoxo do Usuário Ativo | Tour de 9 passos antes de usar | Sem tour; ajuda curta no próprio campo |
| Lei de Postel | Aceita só o formato 00000-000 | Aceita espaço e ponto; formata sozinho |
| Efeito Gradiente de Meta | Cartão fidelidade começa zerado | Cartão já começa com 2 selos |
| Regra do Pico-Fim | Susto no meio e fim seco, sem confirmação | Confirmação com prazo e rastreio no fim |
| Efeito Estética-Usabilidade | Só a pergunta “gostou?” valida a tela | Medir tempo e erro, não só a nota |
| Lei de Parkinson | Tarefa sem duração informada | Duração visível antes de começar |
| Fluxo | Popup no meio do pagamento | Nenhuma interrupção durante o pagamento |
| Viés Cognitivo | Extra pré-marcado, contra a pessoa | Desmarcado, separado e recusa neutra |
