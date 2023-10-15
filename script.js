document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");
  const tableBody = document.getElementById("tableBody");
  const sortIcons = document.querySelectorAll(".sort-icon");
  const sortDirections = Array.from(sortIcons).fill(0);
  let selectedVoice = null;

  const customerData = [
    { name: "John Doe", location: "New York", orderAmount: 500 },
    { name: "Jane Smith", location: "Los Angeles", orderAmount: 800 },
    { name: "Robert Johnson", location: "Chicago", orderAmount: 600 },
    // Add more customer data as needed
  ];

  function populateTable(data) {
    tableBody.innerHTML = "";
    data.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.location}</td>
                <td>${customer.orderAmount}</td>
            `;
      tableBody.appendChild(row);
    });
  }

  populateTable(customerData);

  function sortTable(columnIndex) {
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    sortDirections[columnIndex] = 1 - sortDirections[columnIndex];
    const sortOrder = sortDirections[columnIndex] === 1 ? 1 : -1;
    rows.sort((a, b) => {
      const aValue = a.cells[columnIndex].textContent;
      const bValue = b.cells[columnIndex].textContent;
      return aValue.localeCompare(bValue) * sortOrder;
    });

    rows.forEach((row) => tableBody.appendChild(row));
    sortIcons.forEach((icon) => (icon.textContent = ""));

    const columnHeader = table.querySelector(
      "thead th:nth-child(" + (columnIndex + 1) + ")"
    );
    const columnName = columnHeader.textContent;
    const direction =
      sortDirections[columnIndex] === 1 ? "ascending" : "descending";
    const speechMessage = `Sorted by ${columnName} in ${direction} order.`;
    speak(speechMessage);
  }

  function preloadVoice() {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      selectedVoice = voices.find(
        (voice) => voice.name === "Your Selected Voice Name"
      );
    }
  }

  preloadVoice();

  function speak(message) {
    if (selectedVoice && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = selectedVoice;
      synth.speak(utterance);
    }
  }

  table.querySelectorAll("thead th").forEach((th, index) => {
    th.addEventListener("click", () => {
      sortTable(index);
    });
  });
});

function showHintOnHover(event) {
  const tooltip = document.getElementById("hint-tooltip");
  const tooltipContent = document.getElementById("hint-tooltip-content");

  const hintContent = event.currentTarget.getAttribute("data-tooltip");
  tooltipContent.textContent = hintContent;

  const hintIcon = event.currentTarget;
  const iconRect = hintIcon.getBoundingClientRect();
  tooltip.style.left = iconRect.right + 5 + "px";
  tooltip.style.top = iconRect.top + "px";

  tooltip.style.display = "block";
}

function hideHintOnHover(event) {
  const tooltip = document.getElementById("hint-tooltip");
  tooltip.style.display = "none";
}

const hintIcons = document.querySelectorAll(".hint-icon");

hintIcons.forEach((hintIcon) => {
  hintIcon.addEventListener("mouseenter", showHintOnHover);
  hintIcon.addEventListener("mouseleave", hideHintOnHover);
});
