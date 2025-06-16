class Dish {
  constructor(name, price, category, description, image) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
  }
  getInfo() {
    return `${this.name} - ${this.price} - ${this.category}`;
  }
  displayInfo() {
    console.log(
      `Название: ${this.name}, Цена: ${this.price}, Категория: ${this.category}`
    );
  }
}

const allDishes = new Map();

function loadAllDishes() {
  const dishes = [
    new Dish(
      "Chicken Manjoori",
      15,
      "chicken",
      "Dish relished by all age groups as a starter dish at parties.",
      "/popular_dishes/chicken_manjoori.svg"
    ),
    new Dish(
      "Fresh Salmon",
      15,
      "drinks",
      "Beat the health blues with our Super Immune Blue Juice.",
      "/popular_dishes/fresh_salmon.svg"
    ),
    new Dish(
      "Veg Burger",
      35,
      "vegetarian",
      "Burgers may be made from ingredients like beans.",
      "/popular_dishes/veg_burger.svg"
    ),
    new Dish(
      "Hotdog",
      55,
      "fast-food",
      "Grilled sausage served in the slit of a partially sliced bun.",
      "/popular_dishes/hotdog.svg"
    ),
    new Dish(
      "Spicy Chicken",
      17,
      "chicken",
      "Spicy grilled chicken with herbs.",
      "/popular_dishes/chicken_manjoori.svg"
    ),
    new Dish(
      "Garlic Chicken",
      10,
      "chicken",
      "Juicy garlic-marinated chicken.",
      "/popular_dishes/chicken_manjoori.svg"
    ),
    new Dish(
      "Honey Glazed Chicken",
      13,
      "chicken",
      "Sweet and savory honey-glazed chicken.",
      "/popular_dishes/chicken_manjoori.svg"
    ),
    new Dish(
      "Butter Chicken",
      19,
      "chicken",
      "Rich Indian-style butter chicken.",
      "/popular_dishes/chicken_manjoori.svg"
    ),
    new Dish(
      "Chili Hotdog",
      8,
      "fast-food",
      "Hotdog with spicy chili sauce.",
      "/popular_dishes/hotdog.svg"
    ),
    new Dish(
      "Crispy Chicken Burger",
      120,
      "fast-food",
      "Crispy fried chicken burger with fresh veggies.",
      "/popular_dishes/hotdog.svg"
    ),
    new Dish(
      "Classic Cheeseburger",
      105,
      "fast-food",
      "Beef patty with cheddar cheese.",
      "/popular_dishes/hotdog.svg"
    ),
    new Dish(
      "French Fries",
      10,
      "fast-food",
      "Crispy golden French fries.",
      "/popular_dishes/hotdog.svg"
    ),
    new Dish(
      "Grilled Veg Wrap",
      14,
      "vegetarian",
      "Grilled vegetable wrap with spicy sauce.",
      "/popular_dishes/veg_burger.svg"
    ),
    new Dish(
      "Tofu Stir-Fry",
      16,
      "vegetarian",
      "Healthy stir-fried tofu with vegetables.",
      "/popular_dishes/veg_burger.svg"
    ),
    new Dish(
      "Quinoa Salad",
      19,
      "vegetarian",
      "Refreshing quinoa and vegetable salad.",
      "/popular_dishes/veg_burger.svg"
    ),
    new Dish(
      "Vegan Pasta",
      15,
      "vegetarian",
      "Delicious pasta with vegan sauce.",
      "/popular_dishes/veg_burger.svg"
    ),
    new Dish(
      "Mango Smoothie",
      9,
      "drinks",
      "Refreshing mango smoothie.",
      "/popular_dishes/fresh_salmon.svg"
    ),
    new Dish(
      "Iced Coffee",
      7,
      "drinks",
      "Cold brew iced coffee.",
      "/popular_dishes/fresh_salmon.svg"
    ),
    new Dish(
      "Strawberry Shake",
      10,
      "drinks",
      "Creamy strawberry milkshake.",
      "/popular_dishes/fresh_salmon.svg"
    ),
    new Dish(
      "Green Tea",
      26,
      "drinks",
      "Soothing green tea.",
      "/popular_dishes/fresh_salmon.svg"
    ),
  ];

  dishes.forEach((dish) => allDishes.set(dish.name, dish));
}

function loadFavoritesFromStorage() {
  const stored = localStorage.getItem("favoriteDishes");
  return stored ? JSON.parse(stored) : [];
}

function calculateTotalPrice(favorites) {
  return favorites.reduce((total, dish) => total + dish.price, 0);
}

function displayFavorites() {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  const favorites = loadFavoritesFromStorage();

  if (favorites.length === 0) {
    favoritesList.innerHTML = `<p>Нет избранных блюд.</p>`;
    document.getElementById("totalPrice").innerText = "Общая стоимость: 0$";
    return;
  }
  const favoriteDishes = [];
  favorites.forEach((name) => {
    const dish = allDishes.get(name);
    if (!dish) return;

    const card = document.createElement("div");
    card.classList.add("simple-card");

    card.innerHTML = `
  <img class="detail-img" src="${dish.image}" alt="${dish.name}" />
  <hr class="card-divider" />
  <div class="detail-desk">
    <div class="detail-name">
      <h4>${dish.name}</h4>
      <p class="price">Цена: ${dish.price}$</p>
    </div>
    <button class="delete-btn" onclick="removeFavorite('${dish.name}'); displayFavorites();">Удалить</button>
  </div>
`;
    favoritesList.appendChild(card);
    favoriteDishes.push(dish);
  });
  const totalPrice = calculateTotalPrice.apply(null, [favoriteDishes]);
  document.getElementById(
    "totalPrice"
  ).innerText = `Общая стоимость: ${totalPrice}$`;

  favoriteDishes.forEach((dish) => {
    const infoGet = dish.getInfo.bind(dish);
    console.log(infoGet());
  });
}
function removeFavorite(nameToRemove) {
  let favorites = loadFavoritesFromStorage();
  favorites = favorites.filter((name) => name !== nameToRemove);
  localStorage.setItem("favoriteDishes", JSON.stringify(favorites));
}
loadAllDishes();
displayFavorites();

console.log("All dishes loaded:", allDishes);
console.log("Favorites from storage:", loadFavoritesFromStorage());

////////////////////////лаба8

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);

  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Форматируется в формат 00:00:00
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateDish(dish) {
  const oldPrice = dish.price;
  const discount = 0.8;
  const newPrice = Math.round(oldPrice * discount);

  const imgElement = document.getElementById("deal-img");
  imgElement.style.opacity = "0";

  setTimeout(() => {
    imgElement.src = dish.image; //поменяла изображение
    document.getElementById("deal-name").textContent = dish.name;
    document.getElementById("deal-old-price").textContent = `${oldPrice}$`;
    document.getElementById("deal-new-price").textContent = `${newPrice}$`;

    imgElement.style.opacity = "1"; //чтобы стало видно
  }, 800);
}

// выбирает 3 рандомных блюда для ежедневной акции
function getRandomDishes(allDishes) {
  const allValues = Array.from(allDishes.values());
  const randomDishes = [];

  while (randomDishes.length < 3) {
    const randomDish = allValues[Math.floor(Math.random() * allValues.length)];
    if (!randomDishes.includes(randomDish)) {
      randomDishes.push(randomDish);
    }
  }
  return randomDishes;
}

function showDailyDeal(allDishes) {
  let randomDishes = getRandomDishes(allDishes);
  let currentDishIndex = 0;

  updateDish(randomDishes[currentDishIndex]);

  const dailyDealElement = document.getElementById("dailyDeal");
  dailyDealElement.style.display = "block";

  setTimeout(() => {
    dailyDealElement.classList.add("show");
  }, 10);

  // меняет след блюдо через 7 секунд
  function changeDish() {
    currentDishIndex = (currentDishIndex + 1) % randomDishes.length;
    updateDish(randomDishes[currentDishIndex]);

    setTimeout(changeDish, 7000);
  }

  setTimeout(changeDish, 7000);

  // Таймер акции до полуночи
  const timeUntilMidnight = getTimeUntilMidnight();
  const timeUntilMidnightInSeconds = Math.floor(timeUntilMidnight / 1000); // Время до полуночи в секундах
  let seconds = timeUntilMidnightInSeconds;
  const timerElement = document.getElementById("deal-timer");

  const countdown = setInterval(() => {
    seconds--;
    timerElement.textContent = `До конца акции: ${formatTime(seconds)}`;

    if (seconds <= 0) {
      clearInterval(countdown);
      document.getElementById("dailyDeal").style.display = "none";

      // Сразу после завершения акции, будут показываться новые блюда
      showDailyDeal(allDishes);
    }
  }, 1000);
}

setTimeout(() => {
  showDailyDeal(allDishes);
}, 2000);
