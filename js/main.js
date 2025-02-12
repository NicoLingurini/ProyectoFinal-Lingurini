document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });
document
  .getElementById("calcularPagoBtn")
  .addEventListener("click", function (event) {
    calcularPago(event);
  });
document
  .getElementById("guardarPrestamoBtn")
  .addEventListener("click", function (event) {
    guardarPrestamo(event);
  });

let currentLoanData = {};

function calcularPago(event) {
  event.preventDefault();

  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const monthsInput = document.getElementById("months");

  if (!amountInput.value || !interestInput.value || !monthsInput.value) {
    Swal.fire({
      title: "Error!",
      text: "Por favor, completa todos los campos.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  let amount = parseFloat(amountInput.value);
  const annualInterest = parseFloat(interestInput.value) / 100;
  const monthlyInterest = annualInterest / 12;
  const months = parseInt(monthsInput.value);

  const payment =
    (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));

  currentLoanData = {
    amount: amount,
    annualInterest: annualInterest,
    monthlyInterest: monthlyInterest,
    months: months,
    payment: payment,
  };

  const tableBody = document
    .getElementById("paymentTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  for (let i = 1; i <= months; i++) {
    const interestPayment = amount * monthlyInterest;
    const principalPayment = payment - interestPayment;
    const capitalAlInicio = amount;

    amount -= principalPayment;

    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${i}</td>
          <td>${capitalAlInicio.toFixed(2)}</td>
          <td>${principalPayment.toFixed(2)}</td>
          <td>${interestPayment.toFixed(2)}</td>
          <td>${payment.toFixed(2)}</td>
      `;

    tableBody.appendChild(row);
  }
}

function guardarPrestamo(event) {
  event.preventDefault();

  return new Promise((resolve, reject) => {
    document.getElementById("loadingSpinner").style.display = "flex";
    if (!currentLoanData.amount) {
      Swal.fire({
        title: "Error!",
        text: "Primero calcula el préstamo antes de guardarlo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      document.getElementById("loadingSpinner").style.display = "none";
      return reject(
        new Error("Primero calcula el préstamo antes de guardarlo.")
      );
    }

    setTimeout(() => {
      let loanDataArray =
        JSON.parse(localStorage.getItem("loanDataArray")) || [];
      loanDataArray.push(currentLoanData);
      localStorage.setItem("loanDataArray", JSON.stringify(loanDataArray));
      Swal.fire({
        title: "Guardado!",
        text: "El préstamo ha sido guardado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      document.getElementById("loadingSpinner").style.display = "none";
      resolve();
    }, 2000);
  });
}
