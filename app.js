document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#drink-table tbody");
  const form = document.getElementById("add-form");
  const nameInput = document.getElementById("name");

  // Lade gespeicherte Getränke oder leeres Array
  let drinks = JSON.parse(localStorage.getItem("drinks") || "[]");

  // Speichert die Liste in localStorage
  function saveDrinks() {
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }

  // Rendert die Tabelle neu
  function render() {
    tableBody.innerHTML = "";
    drinks.forEach((drink, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${drink.name}</td>
        <td class="status-${drink.status.toLowerCase()}">${drink.status}</td>
        <td>${drink.emptyDate || "-"}</td>
        <td>${drink.orderDate || "-"}</td>
        <td>
          <button onclick="markEmpty(${index})">🚫 Leer</button>
          <button onclick="markOrdered(${index})">📦 Bestellt</button>
          <button onclick="markAvailable(${index})">✅ Verfügbar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Funktionen global verfügbar machen für Buttons
  window.markEmpty = function (index) {
    drinks[index].status = "Leer";
    drinks[index].emptyDate = new Date().toLocaleDateString("de-DE");
    drinks[index].orderDate = "";
    saveDrinks();
    render();
  };

  window.markOrdered = function (index) {
    drinks[index].status = "Bestellt";
    drinks[index].orderDate = new Date().toLocaleDateString("de-DE");
    saveDrinks();
    render();
  };

  window.markAvailable = function (index) {
    drinks[index].status = "Verfügbar";
    drinks[index].emptyDate = "";
    drinks[index].orderDate = "";
    saveDrinks();
    render();
  };

  // Neues Getränk hinzufügen
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
      drinks.push({ name, status: "Verfügbar", emptyDate: "", orderDate: "" });
      saveDrinks();
      nameInput.value = "";
      render();
    }
  });

  // Initial rendern
  render();
});

