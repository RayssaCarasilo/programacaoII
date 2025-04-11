Este microsserviço, desenvolvido em Node.js com Express, oferece uma API REST para manipular e processar datas de forma eficiente. Ele fornece dois endpoints principais para converter datas em diferentes formatos e calcular diferenças temporais.

Endpoints
1. Conversão de Datas
Endpoint: /api/:date?

Descrição: Recebe uma data no formato de string (ex: 11-04-2025). Se nenhuma data for fornecida, retorna a data e hora atuais em dois formatos:

unix: Número de milissegundos desde 1º de janeiro de 1970 (timestamp Unix).

utc: Data no formato UTC (padrão internacional).

Resposta: Se a data for válida, retorna os dois formatos. Caso contrário, exibe um erro: { "error": "Invalid Date" }.

2. Cálculo de Diferença Temporal
Endpoint: /api/diff/:date1/:date2

Descrição: Calcula a diferença entre duas datas fornecidas. As datas devem ser convertidas previamente para um formato reconhecido (ex: Sun, 23 Mar 2025 03:00:00).

Resposta: A resposta exibe a diferença em dias, horas, minutos e segundos.

Como Executar o Projeto
Pré-requisitos
Node.js

npm (Node Package Manager)

Instalação e Execução
Clone o repositório ou extraia o arquivo .zip.

Abra o terminal e navegue até a pasta do projeto.

Execute os seguintes comandos:

bash
npm install
npm run start
