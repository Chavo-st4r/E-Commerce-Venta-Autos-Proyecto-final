const cars = [
  {id:1, brand:'Toyota', model:'Yaris Hatchback', year:2018, price:35000, img:'/img/Toyota Yaris Hatchback2.png'},
  {id:2, brand:'Peugeot', model:'208', year:2020, price:18000, img:'/img/Peugeot 208.jpg'},
  {id:3, brand:'Fiat', model:'Cronos', year:2017, price:12000, img:'/img/Fiat Cronos.jpeg'},
  {id:4, brand:'Volkswagen', model:'Polo', year:2021, price:26000, img:'/img/Volkswagen Polo.jpeg'},
  {id:5, brand:'Renault', model:'Sandero', year:2016, price:20000, img:'/img/Renault Sandero.png'},
  {id:6, brand:'Chevrolet', model:'Tracker', year:2022, price:28000, img:'/img/Chevrolet Tracker.png'}
];

const listado = document.getElementById('listado');
const searchInput = document.getElementById('searchInput');
const filtroMarca = document.getElementById('filtroMarca');
const orden = document.getElementById('orden');

function renderCars(list){
  listado.innerHTML = '';
  if(list.length === 0){ listado.innerHTML = '<p>No se encontraron autos.</p>'; return }
  list.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${c.img}" alt="${c.brand} ${c.model}">
      <h3>${c.brand} ${c.model} — ${c.year}</h3>
      <p>Detalles: excelente estado, kilometraje moderadooo.</p>
      <div class="price">$ ${c.price.toLocaleString()}</div>
      <div class="actions">
        <button class="btn-outline" onclick="viewDetails(${c.id})">Ver</button>
        <button class="btn-primary" onclick="contactSeller(${c.id})">Contactar</button>
      </div>
    `;
    listado.appendChild(div);
  });
}

function viewDetails(id){
  // Redirige a la página detalle con el id como parámetro
  window.location.href = `pages/detalle.html?id=${id}`;
}


function contactSeller(id){
  if(!isLoggedIn()){ openModal(); return }
  const car = cars.find(c=>c.id===id);
  alert('Contactando al vendedor por: ' + car.brand + ' ' + car.model);
}

// Filtrado
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const marca = filtroMarca.value;
  let results = cars.filter(c => (c.brand + ' ' + c.model + ' ' + c.year).toLowerCase().includes(q));
  if(marca) results = results.filter(r=>r.brand===marca);
  if(orden.value==='precioAsc') results.sort((a,b)=>a.price-b.price);
  if(orden.value==='precioDesc') results.sort((a,b)=>b.price-a.price);
  renderCars(results);
}

searchInput.addEventListener('input', applyFilters);
filtroMarca.addEventListener('change', applyFilters);
orden.addEventListener('change', applyFilters);

// Login simulado
const modal = document.getElementById('modal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const userArea = document.getElementById('userArea');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

function openModal(){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); }
function hideModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }

loginBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', hideModal);

loginForm.addEventListener('submit', e=>{
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  if(u==='user' && p==='pass'){
    localStorage.setItem('loggedUser', JSON.stringify({name:u}));
    setupUser();
    hideModal();
  } else alert('Usuario o contraseña incorrectos (prueba: user/pass)');
});

function setupUser(){
  const data = JSON.parse(localStorage.getItem('loggedUser'));
  if(data){
    userArea.style.display='inline-flex';
    userName.textContent=data.name;
    loginBtn.style.display='none';
  } else {
    userArea.style.display='none';
    loginBtn.style.display='inline-block';
  }
}

logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('loggedUser'); setupUser(); });
function isLoggedIn(){ return !!localStorage.getItem('loggedUser'); }

// Form contacto
document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Mensaje enviado. Gracias!');
  e.target.reset();
});

// Init
document.getElementById('year').textContent = new Date().getFullYear();
renderCars(cars);
setupUser();

// Scroll a secciones
document.getElementById('verAutos').addEventListener('click', ()=>{
  location.hash='#listado';
  window.scrollTo({top:document.getElementById('listado').offsetTop - 80, behavior:'smooth'});
});
document.getElementById('venderAuto').addEventListener('click', ()=>{
  if(!isLoggedIn()) openModal(); else alert('Formulario para publicar auto (a implementar)');
});

