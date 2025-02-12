const promotions = [
  {
    cuotas: 12,
    interes: 24,
    descripcion: "Préstamo a 12 meses con 24% de interés",
    valor: 10000,
  },
  {
    cuotas: 36,
    interes: 60,
    descripcion: "Préstamo a 36 meses con 60% de interés",
    valor: 20000,
  },
  {
    cuotas: 48,
    interes: 80,
    descripcion: "Préstamo a 48 meses con 80% de interés",
    valor: 30000,
  },
];

function calcularValorFinal(valor, interes) {
  return valor + (valor * interes) / 100;
}

function displayPromotions() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  promotions.forEach((promo) => {
    const valorFinal = calcularValorFinal(promo.valor, promo.interes);
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <div class="card-body">
            <h3 class="card-title">Préstamo a ${promo.cuotas} meses</h3>
            <h4 class="card-subtitle mb-2 text-body-secondary">Valor: $${
              promo.valor
            }</h4>
            <h4 class="card-subtitle mb-2 text-body-secondary">Interés: ${
              promo.interes
            }%</h4>
            <p class="card-text">${promo.descripcion}</p>
            <h5 class="card-subtitle mb-2 text-body-secondary">Valor Final Aproximado: $${valorFinal.toFixed(
              2
            )}</h5>
            </div>
        `;

    cardContainer.appendChild(card);
  });
}

displayPromotions();
