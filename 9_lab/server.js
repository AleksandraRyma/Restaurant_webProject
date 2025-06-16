const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "messages.json");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Статическая папка (всё отдается из /public)
app.use(express.static(path.join(__dirname, "public")));

// // Главная страница (index.html)

// app.get("/contact", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "9lab.html"));
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "9lab.html"));
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// Обработка формы обратной связи
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("Все поля должны быть заполнены.");
  }

  let messages = [];
  if (fs.existsSync(DATA_FILE)) {
    messages = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  }

  messages.push({
    name,
    email,
    message,
    date: formatDate(new Date()),
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
  res.send(`
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Сообщение отправлено</title>
  <link rel="stylesheet" href="/9style.css" />
  <style>
    body {
      font-family: "Josefin Sans", sans-serif;
      background-color: #f9f9f9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 0 20px;
      color: #34495e;
      text-align: center;
    }
    .message-box {
      background: white;
      padding: 30px 40px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 100%;
      border: 1px solid #e1b168;
    }
    .message-box h2 {
      margin-bottom: 20px;
      color: #e1b168;
    }
    .message-box a {
      display: inline-block;
      margin-top: 20px;
      background-color: #e1b168;
      color: black;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .message-box a:hover {
      background-color: #d09c40;
    }
  </style>
</head>
<body>
  <div class="message-box">
    <h2>Отзыв сохранен!</h2>
    <p>Спасибо за ваш отзыв.</p>
    <a href="/">Назад</a>
  </div>
</body>
</html>
`);
});

app.get("/messages", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.send("Сообщений пока нет.");
  }

  const messages = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  let html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Отзывы</title>
  <link rel="stylesheet" href="/9style.css">
  <style>
    body {
      font-family: "Josefin Sans", sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }

    h1 {
      text-align: center;
      color: #34495e;
      margin-top: 30px;
    }

    table {
      width: 90%;
      margin: 30px auto;
      border-collapse: collapse;
      border: 2px solid #e1b168;
      background-color: #f9f9f9;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      color: #34495e;
    }

    th {
      background-color: #e1b168;
      color: #000000;
      font-weight: bold;
      font-size: 16px;
    }

    td {
      font-size: 15px;
    }

    .back-link {
      display: flex;
      justify-content: center;
      margin: 20px;
    }

    .back-link a {
      background-color: #e1b168;
      color: black;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .back-link a:hover {
      background-color: #d09c40;
    }
  </style>
</head>
<body>
  <h1>Отзывы пользователей</h1>
  <table>
    <thead>
      <tr>
        <th>Имя</th>
        <th>Email</th>
        <th>Сообщение</th>
        <th>Дата</th>
      </tr>
    </thead>
    <tbody>
`;

  for (const msg of messages) {
    html += `
      <tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
        <td>${msg.date}</td>
      </tr>
    `;
  }

  html += `
    </tbody>
  </table>
  <div class="back-link">
    <a href="/">Назад к форме</a>
  </div>
</body>
</html>
`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(
    2,
    "0"
  )}:${String(d.getMinutes()).padStart(2, "0")}:${String(
    d.getSeconds()
  ).padStart(2, "0")}`;
}
