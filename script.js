let studentData = [
  {
    name: "Ahmet Turay",
    class: "10A",
    number: 123,
    city: "İstanbul",
  },
  {
    name: "Ayşe Turan",
    class: "9B",
    number: 456,
    city: "Ankara",
  },
];

$(document).ready(function () {
  //StudentData objesindeki veriyi tabloya ekliyor.
  function renderTable() {
    const tbody = $("#studentTable tbody");
    tbody.empty();
    studentData.forEach((student, index) => {
      const row = `
        <tr data-index="${index}">
          <td>${student.name}</td>
          <td>${student.class}</td>
          <td>${student.number}</td>
          <td>${student.city}</td>
          <td><button class="delete-btn">Delete</button></td>
        </tr>
      `;
      tbody.append(row);
    });
  }

  renderTable();

  // tabloya eklenen satırda bulunan delete için görev eklendi.
  $("#studentTable").on("click", ".delete-btn", function () {
    const row = $(this).closest("tr");
    const index = row.data("index");
    studentData.splice(index, 1);
    renderTable();
  });

  //yeni veri eklemek ve listede göstermek için.

  $("form").submit(function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const className = $("#class").val().trim();
    const number = $("#number").val().trim();
    const city = $("#city").val().trim();

    //tüm alanlar dolu olmasını sağlıyor
    if (!name || !className || !number || !city) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    // Burada öğrenciye verilen numara unique olmasını sağlıyor.
    if (studentData.some((s) => String(s.number) === number)) {
      alert("Bu numara zaten mevcut! Lütfen başka bir numara girin.");
      return;
    }

    const newStudent = {
      name,
      class: className,
      number: Number(number),
      city,
    };

    studentData.push(newStudent);

    renderTable();

    this.reset();
  });

  $("#studentTable").on(
    {
      mouseenter: function () {
        $(this).css("background-color", "#7ACEF4");
      },
      mouseleave: function () {
        $(this).css("background-color", "white");
      },
    },
    "tr"
  );

  $("#studentTable").on(
    {
      mouseenter: function () {
        $(this).css("background-color", "red");
      },
      mouseleave: function () {
        $(this).css("background-color", "white");
      },
    },
    ".delete-btn"
  );

  $("input").on({
    mouseenter: function () {
      $(this).css("background-color", "#3EB249");
    },
    mouseleave: function () {
      $(this).css("background-color", "white");
    },
  });
});
