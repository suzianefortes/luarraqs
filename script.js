// ===========================
// MENU HAMBURGUER (MOBILE)
// ===========================
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', function () {
  mainNav.classList.toggle('aberto');
  menuToggle.textContent = mainNav.classList.contains('aberto') ? '✕' : '☰';
});

const navLinks = document.querySelectorAll('.nav__list a');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    mainNav.classList.remove('aberto');
    menuToggle.textContent = '☰';
  });
});

// ===========================
// VALIDAÇÃO DO FORMULÁRIO
// ===========================
const form = document.getElementById('contatoForm');
const formSucesso = document.getElementById('formSucesso');

form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  limparErros();

  const nome    = document.getElementById('nome').value.trim();
  const email   = document.getElementById('email').value.trim();
  const produto = document.getElementById('produto').value;

  let temErro = false;

  if (nome === '') {
    mostrarErro('erroNome', 'Por favor, informe seu nome.');
    temErro = true;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    mostrarErro('erroEmail', 'Por favor, informe seu e-mail.');
    temErro = true;
  } else if (!emailValido.test(email)) {
    mostrarErro('erroEmail', 'Por favor, informe um e-mail válido.');
    temErro = true;
  }

  if (produto === '') {
    mostrarErro('erroProduto', 'Por favor, selecione um produto.');
    temErro = true;
  }

  if (!temErro) {
    form.style.display = 'none';
    formSucesso.style.display = 'block';
  }
});

function mostrarErro(idElemento, mensagem) {
  document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
  document.getElementById('erroNome').textContent    = '';
  document.getElementById('erroEmail').textContent   = '';
  document.getElementById('erroProduto').textContent = '';
}

// ===========================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===========================
const cards = document.querySelectorAll('.card, .estilo__card');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.1 });

cards.forEach(function (card) {
  card.classList.add('invisivel');
  observer.observe(card);
});

// ===========================
// MODAL DE IMAGEM AMPLIADA
// ===========================
const modal       = document.getElementById('modal-imagem');
const modalFoto   = document.getElementById('modal-imagem__foto');
const fecharModal = document.querySelector('.modal-img__fechar');
const imgsCards   = document.querySelectorAll('.card__img-wrapper img');

imgsCards.forEach(img => {
  img.addEventListener('click', () => {
    modalFoto.src = img.src;
    modalFoto.alt = img.alt;
    modal.classList.add('ativo');
  });
});

fecharModal.addEventListener('click', () => {
  modal.classList.remove('ativo');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('ativo');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('ativo');
});