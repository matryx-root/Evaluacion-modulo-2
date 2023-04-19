// se solicita la api

const API_URL = 'https://digimon-api.vercel.app/api/digimon';

// se guarda la informacion

const listadoElement = document.getElementById('listado');
const detalleElement = document.getElementById('detalle');
const imagenElement = document.getElementById('imagen');
const btnMostrar = document.getElementById('btnMostrar');
const numElementos = document.getElementById('numElementos');


// mostrar el listado en detalle
function mostrarDetalle(digimon) {
  imagenElement.innerHTML = `<img src="${digimon.img}" alt="${digimon.name}">`;
  detalleElement.innerHTML = `
  <img src="${digimon.img}" alt="${digimon.name}">
    <h2>${digimon.name}</h2>
    <h3>Nivel: ${digimon.level}</h3>
    <button id="volver">Volver al listado</button>
  `;
  detalleElement.style.display = 'block';
  listadoElement.style.display = 'none';
  
  const volverElement = document.getElementById('volver');
  volverElement.addEventListener('click', () => {
    detalleElement.style.display = 'none';
    listadoElement.style.display = 'flex';
  });

  $('#volver').hover(function() {
    $(this).css('background-color', 'white');
  }, function() {
    $(this).css('background-color', 'black');

  });
  $('#volver').focus(function() {
    $(this).css('outline', '3px solid red');
  });
}


// mostrar el listado completo
function mostrarListado(digimones) {
  detalleElement.style.display = 'none';
  listadoElement.style.display = 'flex';
  listadoElement.innerHTML = '';
  const cantidadElementos = numElementos.value; // Obtener la cantidad de elementos a mostrar
  digimones.slice(0, cantidadElementos).forEach(digimon => { // Mostrar solo la cantidad de elementos especificada
    const digimonElement = document.createElement('div');
    digimonElement.classList.add('digimon');
    digimonElement.innerHTML = `
    <img src="${digimon.img}" alt="${digimon.name}">
    <h2>${digimon.name}</h2>
    <h3>Nivel: ${digimon.level}</h3>
  `;
  digimonElement.addEventListener('click', () => {
    mostrarDetalle(digimon);
  });
  listadoElement.appendChild(digimonElement);
});

// jquery
$('.digimon').hover(function() {
  $(this).css('background-color', 'red');
}, function() {
  $(this).css('background-color', 'white');
});

$(".digimon img").click(function() {
  mostrarDetalle(digimon);
});



}

async function cargarDigimones() {
try {
  const response = await fetch(API_URL);
  const data = await response.json();
  mostrarListado(data);
} catch (error) {
  console.log(error);
}
}

btnMostrar.addEventListener('click', cargarDigimones);
