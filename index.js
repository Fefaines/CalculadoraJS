const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
// const resultInput = document.getElementById("result");

//Criando um array com todos os caractéres permitidos
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//Função para limpar display
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();

  const copyToClipboardButton = document.getElementById("copyToClipboard");
  const result = document.getElementById("input");

  copyToClipboardButton.innerText = "Copy";
  copyToClipboardButton.classList.remove("success");
  result.classList.remove("success");
});

//Controle de teclas permitidas
input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
  }
});

//Trazendo os botões clickados e convertendo em valor no display
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//Calcular sempre que o botão "=" for acionado
document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  try {
    const result = eval(input.value);
    input.value = result;

    // a função "eval" pode ser muito perigosa, pois ela vai avaliar qualquer código js válido e o executa. Nesse caso não há problemas, pois o input está sendo controlado
  } catch (error) {
    input.value = "ERROR";
  }
  const copyToClipboardButton = document.getElementById("copyToClipboard");
  const result = document.getElementById("input");

  copyToClipboardButton.innerText = "Copy";
  copyToClipboardButton.classList.remove("success");
  result.classList.remove("success");
}

//Adicionando um elemento que copia e cola o valor do display
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    const result = document.getElementById("input");
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      result.classList.add("success");

      navigator.clipboard.writeText(input.value); //copiando para área de transferência
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
      result.classList.remove("success");
    }
  });

// configuração do botão para mudar o tema e setando as cores de acordo com o tema.
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#fff1f5");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#199a90");
    root.style.setProperty("--second-color", "#ec7d4d");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#0b0220");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
    root.style.setProperty("--border-color", "");
  }
});
