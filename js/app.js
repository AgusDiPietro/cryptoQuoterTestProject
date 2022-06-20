const criptomondasSelect = document.querySelector('#criptomonedas');

//Crear el promise
//consulta las cripto, resuelve las criptomonedas
const obtnerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas)
});

document.addEventListener('DOMContentLoaded', () =>{
    consultarCriptomonedas();
})

function consultarCriptomonedas(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    
    fetch(url)
     .then(respuesta =>respuesta.json())
     .then(resultado => obtnerCriptomonedas(resultado.Data))
     .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach( cripto => {
        const {FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomondasSelect.appendChild(option);
    })
}