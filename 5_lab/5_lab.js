class Booking {
  constructor(id, clientName, phone, bookingDate, bookingTime, guestCount) {
    this.id = id;
    this.clientName = clientName;
    this.phone = phone;
    this.bookingDate = `${bookingDate} ${bookingTime}`;
    this.guestCount = guestCount;
    this.additionalProperties = {};
  }

  addProperty(key, value) {
    this.additionalProperties[key] = value;
  }
}

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function updateStorage() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function addBooking(booking) {
  bookings.push(booking);
  updateStorage();
  renderTable();
  updateDropdown();
}

function deleteBooking(id) {
  const index = bookings.findIndex((bk) => bk.id == id);
  if (index !== -1) {
    bookings.splice(index, 1);
    updateStorage();
    renderTable();
    updateDropdown();
  }
}

function clearTable() {
  bookings.length = 0;
  updateStorage();
  renderTable();
  updateDropdown();
}

function renderTable() {
  const tableBody = document.getElementById("booking-table-body");
  tableBody.innerHTML = "";
  bookings.forEach((bk) => {
    const additionalProps = Object.entries(bk.additionalProperties)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    const row = `<tr>
          <td>${bk.id}</td>
          <td>${bk.clientName}</td>
          <td>${bk.phone}</td>
          <td>${bk.bookingDate}</td>
          <td>${bk.guestCount}</td>
          <td>${additionalProps}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

function updateDropdown() {
  const idDropdown = document.getElementById("id-select");
  const propertyIdDropdown = document.getElementById("property-id-select");

  idDropdown.innerHTML = "";
  propertyIdDropdown.innerHTML = "";

  bookings.forEach((bk) => {
    const option = document.createElement("option");
    option.value = bk.id;
    option.textContent = bk.id;
    idDropdown.appendChild(option);

    const propertyOption = document.createElement("option");
    propertyOption.value = bk.id;
    propertyOption.textContent = bk.id;
    propertyIdDropdown.appendChild(propertyOption);
  });
}

function generateId() {
  return Math.floor(100 + Math.random() * 90000);
}

function init() {
  renderTable();
  updateDropdown();

  document.getElementById("add-btn").addEventListener("click", () => {
    const id = generateId();
    const clientName = document.getElementById("clientName").value;
    const phone = document.getElementById("phone").value;
    const bookingDate = document.getElementById("bookingDate").value;
    const bookingTime = document.getElementById("bookingTime").value;

    const guestCount = document.getElementById("guestCount").value;
    if (!clientName || !phone || !bookingDate || !bookingTime || !guestCount) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    const newBooking = new Booking(
      id,
      clientName,
      phone,
      bookingDate,
      bookingTime,
      guestCount
    );
    addBooking(newBooking);
    const form = document.getElementById("form");
    form.reset();
  });

  document.getElementById("delete-btn").addEventListener("click", () => {
    const id = document.getElementById("id-select").value;
    deleteBooking(id);
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("form").reset();
  });

  document.getElementById("clear-table-btn").addEventListener("click", () => {
    if (confirm("Вы действительно хотите удалить все записи?")) {
      clearTable();
    }
  });
  document.getElementById("add-property-btn").addEventListener("click", () => {
    const id = document.getElementById("property-id-select").value;
    const property = document.getElementById("property-name").value;
    const value = document.getElementById("property-value").value;

    const bk = bookings.find((b) => b.id == id);
    if (bk) {
      bk.addProperty(property, value);
      updateStorage();
      renderTable();
    }
  });

  document
    .getElementById("show-customers-btn")
    .addEventListener("click", () => {
      const maxGuestsBooking = bookings.reduce(
        (max, bk) => (bk.guestCount > max.guestCount ? bk : max),
        bookings[0]
      );
      const minGuestsBooking = bookings.reduce(
        (min, bk) => (bk.guestCount < min.guestCount ? bk : min),
        bookings[0]
      );

      const customerInfo = document.getElementById("customer-info");
      customerInfo.innerHTML = `
          <p>Клиент с максимальным количеством человек за столиком: ${maxGuestsBooking.clientName} (${maxGuestsBooking.guestCount} человек)</p>
          <p>Клиент с минимальным количеством человек за столиком: ${minGuestsBooking.clientName} (${minGuestsBooking.guestCount} человек)</p>
      `;
    });
}

const showCustomer = document.getElementById("show-customers-btn");
const customerInfo = document.getElementById("customer-info");

showCustomer.addEventListener("click", () => {
  if (customerInfo.classList.contains("visible")) {
    customerInfo.classList.remove("visible");
  } else {
    customerInfo.classList.add("visible");
  }
});

window.onload = init;

document.getElementById("phone").addEventListener("input", function () {
  const phoneNumber = this.value;
  const errorMessage = document.getElementById("error-message");
  const cleanedInput = phoneNumber.replace("+", "");
  const isValid = /^\d*$/.test(cleanedInput);

  if (!isValid) {
    errorMessage.style.display = "inline";
  } else {
    errorMessage.style.display = "none";
  }
});

document.getElementById("clientName").addEventListener("input", function () {
  const Name = this.value;
  let regex = /[а-я]+$/i;
  const errorMessage = document.getElementById("error-message_name");
  const isValid = Name.match(regex);

  if (!isValid) {
    errorMessage.style.display = "inline";
  } else {
    errorMessage.style.display = "none";
  }
});
