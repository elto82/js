//variables
const resultado = document.querySelector("#resultado");
const year = document.querySelector("#year");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const marca = document.querySelector("#marca");
const modelo = document.querySelector("#modelo");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//generar un objeto con los datos de búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  //llenar select
  llenarSelect();
});

//event listeners de los select de busqueda
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtarCarro();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = Number(e.target.value);
  filtarCarro();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = Number(e.target.value);
  filtarCarro();
});
maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = Number(e.target.value);
  filtarCarro();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = Number(e.target.value);
  filtarCarro();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtarCarro();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtarCarro();
});

//funciones
function mostrarAutos(autos) {
  limpiarHTML(); //limpiar HTML previo

  autos.forEach((auto) => {
    const autoHTML = document.createElement("p");
    const { marca, modelo, year, precio, puertas, transmision, color } = auto;
    autoHTML.textContent = `
    Marca: ${marca} -
    Modelo: ${modelo} -
    Año: ${year} -
    Precio: ${precio} -
    Puertas: ${puertas} -
    Transmision: ${transmision} -
    Color: ${color}   
    `;
    //insertar en el HTML
    resultado.appendChild(autoHTML);
  });
}

//limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = maxYear; i >= minYear; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

function filtarCarro() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  //console.log(resultado);
  mostrarAutos(resultado);
  if (resultado.length <= 0) {
    noResultado();
  }
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}
function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  if (datosBusqueda.puertas) {
    return auto.puertas === datosBusqueda.puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent =
    "No se encontraron resultados, intente con otros datos";

  resultado.appendChild(noResultado);
}
