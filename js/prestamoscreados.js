document.addEventListener("DOMContentLoaded", function () {
  const loanDataList = document.getElementById("loanDataList");

  function fetchLocalStorageData() {
    return new Promise((resolve, reject) => {
      const loanDataArray = JSON.parse(localStorage.getItem("loanDataArray"));
      if (loanDataArray) {
        resolve(loanDataArray);
      } else {
        reject("No hay datos almacenados.");
      }
    });
  }

  fetchLocalStorageData()
    .then((loanDataArray) => {
      if (loanDataArray.length > 0) {
        loanDataArray.forEach((loanData, index) => {
          const totalToRepay = loanData.payment * loanData.months;
          const card = document.createElement("div");
          card.className = "card mb-3";
          card.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Préstamo ${index + 1}</h5>
              <p class="card-text">
                <strong>Monto:</strong> ${loanData.amount.toFixed(2)}<br>
                <strong>Interés Anual:</strong> ${(
                  loanData.annualInterest * 100
                ).toFixed(2)}%<br>
                <strong>Interés Mensual:</strong> ${(
                  loanData.monthlyInterest * 100
                ).toFixed(2)}%<br>
                <strong>Meses:</strong> ${loanData.months}<br>
                <strong>Pago Mensual:</strong> ${loanData.payment.toFixed(
                  2
                )}<br>
                <strong>Total a Devolver:</strong> ${totalToRepay.toFixed(2)}
              </p>
            </div>
          `;
          loanDataList.appendChild(card);
        });
      } else {
        loanDataList.innerHTML =
          "<div class='alert alert-warning'>No hay datos almacenados.</div>";
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      loanDataList.innerHTML =
        "<div class='alert alert-warning'>No hay datos almacenados.</div>";
    });

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function () {
    loanDataList.innerHTML =
      "<div class='alert alert-warning'>No hay datos almacenados.</div>";
    localStorage.removeItem("loanDataArray");
  });
});
