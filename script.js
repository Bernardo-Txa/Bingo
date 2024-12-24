// script.js
document.addEventListener("DOMContentLoaded", () => {
  const bingoTable = document.querySelector("#bingoTable tbody");
  const currentNumberDisplay = document.getElementById("currentNumber");
  const currentLetterDisplay = document.getElementById("currentLetter");
  const drawButton = document.getElementById("drawNumber");
  const resetButton = document.getElementById("resetGame");

  const numbers = Array.from({ length: 75 }, (_, i) => i + 1); // Números de 1 a 75
  let drawnNumbers = [];

  // Preenche a tabela com os números
  function generateBingoTable() {
    for (let i = 0; i < 15; i++) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${i + 16}</td>
        <td>${i + 31}</td>
        <td>${i + 46}</td>
        <td>${i + 61}</td>
      `;
      bingoTable.appendChild(tr);
    }
  }

  // Função para determinar a letra baseada no número
  function getLetterForNumber(number) {
    if (number >= 1 && number <= 15) return "B";
    if (number >= 16 && number <= 30) return "I";
    if (number >= 31 && number <= 45) return "N";
    if (number >= 46 && number <= 60) return "G";
    if (number >= 61 && number <= 75) return "O";
    return "-";
  }

  // Sorteia um número aleatório
  function drawNumber() {
    if (drawnNumbers.length === numbers.length) {
      alert("Todos os números já foram sorteados!");
      return;
    }

    let number;
    do {
      number = numbers[Math.floor(Math.random() * numbers.length)];
    } while (drawnNumbers.includes(number));

    drawnNumbers.push(number);
    highlightNumber(number);

    const letter = getLetterForNumber(number);
    currentLetterDisplay.textContent = letter;
    currentNumberDisplay.textContent = number;
  }

  // Destaca o número sorteado na tabela
  function highlightNumber(number) {
    const cells = Array.from(bingoTable.querySelectorAll("td"));
    cells.forEach((cell) => {
      if (parseInt(cell.textContent) === number) {
        cell.classList.add("marked");
      }
    });
  }

  // Reseta o jogo
  function resetGame() {
    drawnNumbers = [];
    currentLetterDisplay.textContent = "-";
    currentNumberDisplay.textContent = "---";
    const cells = Array.from(bingoTable.querySelectorAll("td"));
    cells.forEach((cell) => {
      cell.classList.remove("marked");
    });
  }

  // Eventos de clique
  drawButton.addEventListener("click", drawNumber);
  resetButton.addEventListener("click", resetGame);

  // Gera a tabela ao carregar a página
  generateBingoTable();
});
