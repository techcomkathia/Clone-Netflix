
// Função para ir para a esquerda no carrossel
function goLeft(nomeDaClasse) {
    let carrossel = document.querySelector(`.${nomeDaClasse}`);
    // Obtém o elemento do carrossel com base na classe fornecida
  
    carrossel.scrollLeft -= carrossel.offsetWidth - 500;
    // Realiza o deslocamento para a esquerda no carrossel subtraindo a largura do carrossel menos 500 pixels
  
    alterarBotaoDireita(carrossel);
    // Chama a função alterarBotaoDireita para ocultar ou exibir o botão de ir para a direita do carrossel
}

  
  
  
  // Função para ir para a direita no carrossel
function goRight(nomeDaClasse) {
    let carrossel = document.querySelector(`.${nomeDaClasse}`);
    // Obtém o elemento do carrossel com base na classe fornecida
  
    carrossel.scrollLeft += carrossel.offsetWidth - 500;
    // Realiza o deslocamento para a direita no carrossel somando a largura do carrossel menos 500 pixels
  
    alterarBotaoDireita(carrossel);
    // Chama a função alterarBotaoDireita para ocultar ou exibir o botão de ir para a direita do carrossel
}

function alterarBotaoDireita(carrossel) {
    if (carrossel.scrollLeft === 0) {
      // Verifica se o carrossel está na posição inicial (scrollLeft igual a 0)
      carrossel.previousElementSibling.style.display = "none";
      // Se estiver na posição inicial, oculta o elemento anterior (botão de ir para a esquerda)
  
      return;
    }
  
    carrossel.previousElementSibling.style.display = "block";
    // Caso contrário, exibe o elemento anterior (botão de ir para a esquerda)
}

function ajustarMenuPlanoFundo() {
    let navigation = document.querySelector("#navigation");
    // Obtém o elemento de navegação com base no seletor "#navigation"
  
    if (scrollY > 0) {
      // Verifica se a posição vertical do scroll é maior que 0
      navigation.classList.add('scroll');
      // Se for maior que 0, adiciona a classe 'scroll' ao elemento de navegação
    } else {
      navigation.classList.remove('scroll');
      // Caso contrário, remove a classe 'scroll' do elemento de navegação
    }
  }
  
  // Event listener para exibir a navegação quando ocorrer o scroll na página
  window.addEventListener('scroll', ajustarMenuPlanoFundo);
