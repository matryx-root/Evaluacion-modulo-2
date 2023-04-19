const API_URL = 'https://digimon-api.vercel.app/api/digimon';

const listadoElement = document.getElementById('listado');
const detalleElement = document.getElementById('detalle');
const imagenElement = document.getElementById('imagen');

function mostrarDetalle(digimon) {
  imagenElement.innerHTML = `<img src="${digimon.img}" alt="${digimon.name}">`;
  detalleElement.innerHTML = 
  `<img src="${digimon.img}" alt="${digimon.name}">
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
}

function mostrarListado(digimones) {
  detalleElement.style.display = 'none';
  listadoElement.style.display = 'flex';
  listadoElement.innerHTML = '';
  digimones.forEach(digimon => {
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

cargarDigimones();






