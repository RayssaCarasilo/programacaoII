const dateInput = document.querySelector('#dateInput');
const dateOutput = document.querySelector('#dateOutput');
const btnConv = document.querySelector('#btnConv');             // Pega os elementos do html e coloca no js
const date1 = document.querySelector('#date1');
const date2 = document.querySelector('#date2');
const btnCompare = document.querySelector('#btnCompare');
const diffResult = document.querySelector('#diffResult');

btnConv.addEventListener('click', () => { // Função para converter data/timestamp.
    const input = dateInput.value;          // Pega o valor digitado pelo usuário.
    fetch(`/api/${(input)}`)                // Faz uma requisição pra API.
        .then(response => response.json())      //Transforma o arquivo que esta no servidor em um arquivo que o navegador consiga entender.
        .then(data => {                         // Aqui ta pegando a resposta e transforma em um objeto JS.
            dateOutput.innerHTML = data.error ?     // Aqui ta verificando se há erro
                `<span class="error">${data.error}</span>` :  // Transforma os dados para HTML o (${} é para colocar o valor da variável dentro do HTML)
                `<strong>Unix:</strong> ${data.unix}<br>
                 <strong>UTC:</strong> ${data.utc}<br>
                 <strong>Data Local:</strong> ${data.diaSemana}, ${data.utclocal}`;
        })
        .catch(() => {
            dateOutput.innerHTML = `<span class="error">Erro ao processar a requisição</span>`;  // Mensagem de erro caso houver.
        });
});

btnCompare.addEventListener('click', () => { // Função que compara as datas.
    const d1 = date1.value;
    const d2 = date2.value;
    fetch(`/api/diff/${d1}/${d2}`)
        .then(response => response.json())
        .then(data => {
            diffResult.innerHTML = data.error ? 
                `<span class="error">${data.error}</span>` : // Mesmo processo.
                `<strong>Diferença:</strong><br>
                 ${data.days} dias, ${data.hours} horas,
                 ${data.minutes} minutos, ${data.seconds} segundos`;
        })
        .catch(() => {
            diffResult.innerHTML = `<span class="error">Erro ao processar a requisição</span>`;
        });
});
