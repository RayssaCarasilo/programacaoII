const express = require('express'); //
const path = require('path'); //pastas necessárias para o funcionamento do servidor
const app = express(); //


app.get('/api/:date?', (req, res) => {  // Define qual a rota para acessar os valores com o get, contendo um parâmetro dinâmico (:date),
    //Parte fixa do caminho da URL (/api/:), e um indicador que date é opcional.


    let dateParam = req.params.date; // Pega o valor da URL que pode ser uma data ou timestamp.
    let timezone = req.query.tz || 'UTC'; // Pega o valor do timezone da url e caso não informado, por padrão vai ser UTC.
    let date;
    
    if (!dateParam) {
        date = new Date(); // Caso o usuário não informe uma data, pega a data atual.
    } else if (!isNaN(dateParam)) {
        date = new Date(parseInt(dateParam)); // Se for só numero vai converter para data.
        console.log("Else if");
    } else {
        date = new Date(dateParam); // Se for uma string irá se tornar uma data.
        console.log("Else");
    }

    if (isNaN(date.getTime())) { // Verifica se a data é inválida 
        return res.json({ error: "Data inválida." });
    }

    function getDiaDaSemana(date) {
        const diasDaSemana = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"];
        const data = new Date(date);
        const diaDaSemana = data.getDay();
        return diasDaSemana[diaDaSemana];
    }
    const diaDaSemana = getDiaDaSemana(date); // Chama a função getDiaDaSemana pra pegar o dia da semana

    const response = { // Cria um objeto com os dados que serão enviados como resposta.
        unix: date.getTime(), // Pega o timestamp
        utc: date.toUTCString(), // Pega a data no formato UTC
        diaSemana: diaDaSemana, 
        utclocal: date.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    };
    
    res.json(response); // Envia a resposta em formato JSON
    const now = new Date();
});


app.get('/api/diff/:date1/:date2', (req, res) => { // Define a rota para calcular a diferença entre duas datas.
    const parseDate = (param) => { // Função que converte o parâmetro em um objeto Date.
        const num = parseInt(param);    // Tenta converter o parametro para um número.
        return isNaN(num) ? new Date(param) : new Date(num); // Se for NaN será convertido para data, e se não for NaN também será convertido para data.
    };

    const date1 = parseDate(req.params.date1); // Cria variáveis date1 e date2, e chama a função parseDate  pra converção dos parametros em um objeto Date.
    const date2 = parseDate(req.params.date2); 

    if (isNaN(date1) && isNaN(date2)) { // Verifica se as datas são inválidas.
        return res.json({ error: "Datas inválidas." });
    }

    const diff = Math.abs(date2 - date1); // Faz a diferença das duas datas pegando o valor absoluto.
    const seconds = Math.floor(diff / 1000); // Retira os milissegundos e arredondando pra baixo.
    
    res.json({  // Faz os cálculo da diferença entre as datas e manda a resposta em JSON  
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60
    });
});

//express.static pra funcionamento.
app.use(express.static(path.join(__dirname, 'public'))); // Cria uma pasta public e coloca os arquivos dentro, assim o express.static faz funcionar.

Resumo:
app.get('/', (req, res) => { // Define a rota principal e enviará o index.html.
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envia o arquivo index.html para o navegador.
});

// Iniciar o servidor, qual a porta e da a mensagem do servidor rodando.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



