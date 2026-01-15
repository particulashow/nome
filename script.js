const params = new URLSearchParams(window.location.search);

const name = params.get('name') || 'Nome';
const role = params.get('role') || '';
const align = (params.get('align') || 'left').toLowerCase();
const theme = (params.get('theme') || 'blue').toLowerCase();
const show = (params.get('show') ?? '1') === '1';
const duration = parseFloat(params.get('duration') || '0'); // segundos; 0 = não esconde

const $lt = document.getElementById('lowerThird');
const $name = document.getElementById('ltName');
const $role = document.getElementById('ltRole');

function setText() {
  $name.textContent = name;
  if (role.trim()) {
    $role.textContent = role;
    $role.style.display = 'block';
  } else {
    $role.textContent = '';
    $role.style.display = 'none';
  }
}

function setClasses() {
  $lt.classList.remove('align-left','align-center','align-right');
  $lt.classList.remove('theme-blue','theme-orange','theme-purple','theme-mint');

  $lt.classList.add(`align-${['left','center','right'].includes(align) ? align : 'left'}`);
  $lt.classList.add(`theme-${['blue','orange','purple','mint'].includes(theme) ? theme : 'blue'}`);
}

function enter() {
  $lt.classList.remove('hidden','hide');
  $lt.classList.add('show');
}

function exit() {
  $lt.classList.remove('show');
  $lt.classList.add('hide');
  // após animação, esconde mesmo
  setTimeout(() => {
    $lt.classList.add('hidden');
    $lt.classList.remove('hide');
  }, 450);
}

setText();
setClasses();

if (show) {
  enter();
  if (duration > 0) {
    setTimeout(exit, Math.max(0.5, duration) * 1000);
  }
} else {
  // começa escondido
  $lt.classList.add('hidden');
}

/*
  Extra (opcional para OBS):
  - Podes forçar re-show com refresh do Browser Source.
  - Se quiseres mais tarde controlar via hotkeys, dá para ouvir mensagens via WebSocket/localStorage.
*/
