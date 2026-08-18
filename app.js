if (sessionStorage.getItem("shivaLoggedIn") !== "true") {
  window.location.href = "index.html";
}

const body = document.getElementById("itemsBody");
const discount = document.getElementById("discount");
const dateInput = document.getElementById("estimateDate");

dateInput.value = new Date().toISOString().slice(0, 10);

function addRow(description = "", qty = 1, rate = 0) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="row-number"></td>
    <td><input class="description" value="${description}" placeholder="Item / service"></td>
    <td><input class="qty" type="number" min="0" step="1" value="${qty}"></td>
    <td><input class="rate" type="number" min="0" step="0.01" value="${rate}"></td>
    <td class="amount">₹0.00</td>
    <td><button class="delete-row" type="button">✕</button></td>
  `;
  body.appendChild(row);

  row.querySelectorAll("input").forEach(input => input.addEventListener("input", calculate));
  row.querySelector(".delete-row").addEventListener("click", () => {
    row.remove();
    renumber();
    calculate();
  });
  renumber();
  calculate();
}

function renumber() {
  [...body.querySelectorAll("tr")].forEach((row, i) => {
    row.querySelector(".row-number").textContent = i + 1;
  });
}

function calculate() {
  let subtotal = 0;
  body.querySelectorAll("tr").forEach(row => {
    const qty = Number(row.querySelector(".qty").value) || 0;
    const rate = Number(row.querySelector(".rate").value) || 0;
    const amount = qty * rate;
    subtotal += amount;
    row.querySelector(".amount").textContent = "₹" + amount.toFixed(2);
  });

  const disc = Number(discount.value) || 0;
  document.getElementById("subtotal").textContent = "₹" + subtotal.toFixed(2);
  document.getElementById("grandTotal").textContent = "₹" + Math.max(0, subtotal - disc).toFixed(2);
}

for (let i = 0; i < 5; i++) addRow();
discount.addEventListener("input", calculate);

document.getElementById("addRowBtn").addEventListener("click", () => addRow());

document.getElementById("clearBtn").addEventListener("click", () => {
  if (!confirm("Clear this estimate?")) return;
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("estimateNo").value = "";
  document.getElementById("customerAddress").value = "";
  discount.value = 0;
  body.innerHTML = "";
  for (let i = 0; i < 5; i++) addRow();
});

document.getElementById("printBtn").addEventListener("click", () => window.print());

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("shivaLoggedIn");
  window.location.href = "index.html";
});
