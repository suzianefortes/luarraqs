// ===========================
// MENU HAMBURGUER (MOBILE)
// ===========================

// Pega os elementos do HTML pelo ID
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Quando clicar no botão ☰
menuToggle.addEventListener('click', function () {
  // Alterna a classe "aberto" no menu (adiciona se não tem, remove se tem)
  mainNav.classList.toggle('aberto');

  // Muda o ícone entre ☰ e ✕
  if (mainNav.classList.contains('aberto')) {
    menuToggle.textContent = '✕';
  } else {
    menuToggle.textContent = '☰';
  }
});

// Fecha o menu ao clicar em qualquer link do menu (mobile)
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
  // Impede o comportamento padrão (recarregar a página)
  evento.preventDefault();

  // Limpa os erros anteriores antes de validar de novo
  limparErros();

  // Pega os valores digitados nos campos
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const produto = document.getElementById('produto').value;

  // Flag: controla se encontrou algum erro
  let temErro = false;

  // --- Valida o nome ---
  if (nome === '') {
    mostrarErro('erroNome', 'Por favor, informe seu nome.');
    temErro = true;
  }

  // --- Valida o e-mail ---
  // Regex em UMA linha só — isso é obrigatório em JavaScript
  const emailValido = /^ [^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    mostrarErro('erroEmail', 'Por favor, informe seu e-mail.');
    temErro = true;
  } else if (!emailValido.test(email)) {
    mostrarErro('erroEmail', 'Por favor, informe um e-mail válido.');
    temErro = true;
  }

  // --- Valida o produto ---
  if (produto === '') {
    mostrarErro('erroProduto', 'Por favor, selecione um produto.');
    temErro = true;
  }

  // Se não tiver nenhum erro, esconde o form e mostra a mensagem de sucesso
  if (!temErro) {
    form.style.display = 'none';
    formSucesso.style.display = 'block';
  }
});

// Mostra a mensagem de erro no campo correto
function mostrarErro(idElemento, mensagem) {
  document.getElementById(idElemento).textContent = mensagem;
}

// Apaga todas as mensagens de erro
function limparErros() {
  document.getElementById('erroNome').textContent = '';
  document.getElementById('erroEmail').textContent = '';
  document.getElementById('erroProduto').textContent = '';
}


// ===========================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ===========================

// Seleciona todos os cards de produto e de estilo
const cards = document.querySelectorAll('.card, .estilo__card');

// IntersectionObserver: fica "observando" cada card
// e dispara quando o elemento entra na área visível da tela
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // Quando o card aparece na tela, adiciona a classe que o torna visível
      entry.target.classList.add('visivel');
    }
  });
}, { threshold: 0.1 }); // 0.1 = dispara quando 10% do card está visível

// Para cada card: começa invisível e começa a ser observado
cards.forEach(function (card) {
  card.classList.add('invisivel');
  observer.observe(card);
});