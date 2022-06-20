const criptomondasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const objBusqueda = {
    moneda:'',
    criptomoneda:''
}

//Crear el promise
//consulta las cripto, resuelve las criptomonedas
const obtnerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas)
});

document.addEventListener('DOMContentLoaded', () =>{
    consultarCriptomonedas();
    formulario.addEventListener('submit',submitFormulario);

    criptomondasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
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

function leerValor(e){
    e.preventDefault();
    objBusqueda[e.target.name] = e.target.value
}

function submitFormulario(e){
    e.preventDefault();
   const {moneda, criptomoneda} = objBusqueda;

   if(moneda==='' || criptomoneda===''){
      mostrarAlerta('Ambos campos son obligatorios');
      return;
   }

   consultarApi();

}

function mostrarAlerta(mensaje){

   const existeError = document.querySelector('.error');

    if(!existeError){
       const divMensaje = document.createElement('div');
       divMensaje.classList.add('error');

       divMensaje.textContent = mensaje;

       formulario.appendChild(divMensaje);
    
       setTimeout(() => {
         divMensaje.remove()
       }, 3000);
    }
}

function consultarApi(){
    const {moneda, criptomoneda} = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    fetch(url)
      .then(respuesta=>respuesta.json())
      .then(cotizacion => {
         mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
    })
}

function mostrarCotizacionHTML(cotizacion){
    console.log(cotizacion);
}
