
class pizza{
  constructor(id, nombre, ingredientes, precio, imagen){
      this.id=id;
      this.nombre=nombre, 
      this.ingredientes=ingredientes;
      this.precio=precio;
      this.imagen=imagen;
  }
}

let pizza1= new pizza(1, "Muzzarela", ["Salsa", "muzzarela", "aceitunas"], 550, "./img/mussa.png");
let pizza2= new pizza(2, "Napolitana", ["Salsa", "muzzarela", "aceitunas", "tomate"], 700, "./img/napo.png");
let pizza3= new pizza(3, "Calabresa", ["Salsa", "muzzarela", "aceitunas", "salame"], 750, "./img/calabresa.png");
let pizza4= new pizza(4, "Roquefort", ["Salsa", "muzzarela", "aceitunas", "roquefort"], 800, "./img/roquefort.png");
let pizza5= new pizza(5, "Fugazeta", ["Salsa", "muzzarela", "aceitunas", "cebolla"], 700, "./img/Fugazzeta.png");
let pizza6= new pizza(6, "Especial", ["Salsa", "muzzarela", "aceitunas", "jamon", "morron"], 750, "./img/especial.png");


const arrayPizzas = [];
arrayPizzas.push(pizza1, pizza2, pizza3, pizza4, pizza5, pizza6);

const input = document.querySelector(".input-number");
const buscarBtn = document.querySelector(".buscar-btn");
const buscarForm = document.querySelector(".buscar-form");
const renderPizzas = document.querySelector(".render-pizzas");

let ultimaPizza = JSON.parse(localStorage.getItem("ultimaPizza")) || {};

const saveLocalStorage = () => {
  localStorage.setItem("ultimaPizza", JSON.stringify(ultimaPizza));
};

const mostrarPizza = (pizza) =>
  `<div class="card ">
        <div class="card__izquierda">
          <h2 class="card__titulo"> Pizza ${pizza.nombre}</h2>
          <p class="card__ingredientes">Ingredientes: ${pizza.ingredientes.join(", ")}</p>
          <p class="card__precio">Precio: $${pizza.precio}</p>
        </div>
        <div class="card__derecha">
          <img src="${pizza.imagen}" class="imgpizza" alt="${pizza.nombre}" />
        </div>
      </div>
    `;


const renderizarPizza = (pizza) => {
  ultimaPizza=pizza;
  saveLocalStorage();
  renderPizzas.innerHTML =mostrarPizza(pizza);
};

const mostrarError= (error)=>{
  renderPizzas.innerHTML = `<h3>${error}</h3>`
}

const buscarPizza = (e) => {
  e.preventDefault();
  const pizzaId = input.value;
  if (pizzaId.length === 0) {
    mostrarError("Por favor, ingrese una ID");
  }else if(arrayPizzas.some((pizza) => pizza.id == pizzaId)){
    const pizzaEncontrada = arrayPizzas.find((pizza) => pizza.id == pizzaId)
    renderizarPizza(pizzaEncontrada);
  } else  {
    mostrarError(`No existe una pizza con el id ${pizzaId}`)
  }
  input.value=""
};


const init = () => {
  buscarForm.addEventListener("submit", buscarPizza);
  renderizarPizza(ultimaPizza);
};

init();
