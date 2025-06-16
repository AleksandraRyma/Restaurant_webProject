let circle = document.querySelector(".circle");
let slider = document.querySelector(".slider");
let list = document.querySelector(".list");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let items = document.querySelectorAll(".list .item");

let count = items.length;
let active = 1;
let leftTransform = 0;
let width_item = items[active].offsetWidth;

next.onclick = () => {
  active = active >= count - 1 ? count - 1 : active + 1;
  runCarousel();
};

prev.onclick = () => {
  active = active <= 0 ? active : active - 1;
  runCarousel();
};

function runCarousel() {
  prev.style.display = active == 0 ? "none" : "block";
  next.style.display = active == count - 1 ? "none" : "block";

  let old_active = document.querySelector(".item.active");
  if (old_active) old_active.classList.remove("active");
  items[active].classList.add("active");

  leftTransform = width_item * (active - 1) * -1;
  list.style.transform = `translateX(${leftTransform}px)`;
}

runCarousel();

let textCircle = circle.innerText.split("");
circle.innerText = "";
textCircle.forEach((value, key) => {
  let newSpan = document.createElement("span");
  newSpan.innerText = value;
  let rotateThisSpan = (360 / textCircle.length) * (key + 1);
  newSpan.style.setProperty("--rotate", rotateThisSpan + "deg");
  circle.appendChild(newSpan);
});

///////////////////////////////////////////////

class Dish {
  constructor(name, price, category, description, image) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
  }
}

class Menu {
  constructor() {
    this.dishes = new Map();
  }

  addDish(dish) {
    this.dishes.set(dish.name, dish);
  }

  getDishesByCategory(category) {
    return Array.from(this.dishes.values()).filter(
      (dish) => category === "all" || dish.category === category
    );
  }
}

const menu = new Menu();

//  блюда
menu.addDish(
  new Dish(
    "Chicken Manjoori",
    15,
    "chicken",
    "Dish relished by all age groups as a starter dish at parties.",
    "/popular_dishes/chicken_manjoori.svg"
  )
);
menu.addDish(
  new Dish(
    "Fresh Salmon",
    15,
    "drinks",
    "Beat the health blues with our Super Immune Blue Juice.",
    "/popular_dishes/fresh_salmon.svg"
  )
);
menu.addDish(
  new Dish(
    "Veg Burger",
    35,
    "vegetarian",
    "Burgers may be made from ingredients like beans.",
    "/popular_dishes/veg_burger.svg"
  )
);
menu.addDish(
  new Dish(
    "Hotdog",
    55,
    "fast-food",
    "Grilled sausage served in the slit of a partially sliced bun.",
    "/popular_dishes/hotdog.svg"
  )
);

menu.addDish(
  new Dish(
    "Spicy Chicken",
    17,
    "chicken",
    "Spicy grilled chicken with herbs.",
    "/popular_dishes/chicken_manjoori.svg"
  )
);
menu.addDish(
  new Dish(
    "Garlic Chicken",
    10,
    "chicken",
    "Juicy garlic-marinated chicken.",
    "/popular_dishes/chicken_manjoori.svg"
  )
);
menu.addDish(
  new Dish(
    "Honey Glazed Chicken",
    13,
    "chicken",
    "Sweet and savory honey-glazed chicken.",
    "/popular_dishes/chicken_manjoori.svg"
  )
);
menu.addDish(
  new Dish(
    "Butter Chicken",
    19,
    "chicken",
    "Rich Indian-style butter chicken.",
    "/popular_dishes/chicken_manjoori.svg"
  )
);

//  блюда для категории "Fast Food"
menu.addDish(
  new Dish(
    "Chili Hotdog",
    8,
    "fast-food",
    "Hotdog with spicy chili sauce.",
    "/popular_dishes/hotdog.svg"
  )
);
menu.addDish(
  new Dish(
    "Crispy Chicken Burger",
    120,
    "fast-food",
    "Crispy fried chicken burger with fresh veggies.",
    "/popular_dishes/hotdog.svg"
  )
);
menu.addDish(
  new Dish(
    "Classic Cheeseburger",
    105,
    "fast-food",
    "Beef patty with cheddar cheese.",
    "/popular_dishes/hotdog.svg"
  )
);
menu.addDish(
  new Dish(
    "French Fries",
    10,
    "fast-food",
    "Crispy golden French fries.",
    "/popular_dishes/hotdog.svg"
  )
);

//блюда для категории "Vegetarian"
menu.addDish(
  new Dish(
    "Grilled Veg Wrap",
    14,
    "vegetarian",
    "Grilled vegetable wrap with spicy sauce.",
    "/popular_dishes/veg_burger.svg"
  )
);
menu.addDish(
  new Dish(
    "Tofu Stir-Fry",
    16,
    "vegetarian",
    "Healthy stir-fried tofu with vegetables.",
    "/popular_dishes/veg_burger.svg"
  )
);
menu.addDish(
  new Dish(
    "Quinoa Salad",
    19,
    "vegetarian",
    "Refreshing quinoa and vegetable salad.",
    "/popular_dishes/veg_burger.svg"
  )
);
menu.addDish(
  new Dish(
    "Vegan Pasta",
    15,
    "vegetarian",
    "Delicious pasta with vegan sauce.",
    "/popular_dishes/veg_burger.svg"
  )
);

//  блюда для категории "Drinks"
menu.addDish(
  new Dish(
    "Mango Smoothie",
    9,
    "drinks",
    "Refreshing mango smoothie.",
    "/popular_dishes/fresh_salmon.svg"
  )
);
menu.addDish(
  new Dish(
    "Iced Coffee",
    7,
    "drinks",
    "Cold brew iced coffee.",
    "/popular_dishes/fresh_salmon.svg"
  )
);
menu.addDish(
  new Dish(
    "Strawberry Shake",
    10,
    "drinks",
    "Creamy strawberry milkshake.",
    "/popular_dishes/fresh_salmon.svg"
  )
);
menu.addDish(
  new Dish(
    "Green Tea",
    26,
    "drinks",
    "Soothing green tea.",
    "/popular_dishes/fresh_salmon.svg"
  )
);

// Объект для хранения избранных блюд
const favorites = new Set();

/*const toggleFavorite = (dishName) => {
  if (favorites.has(dishName)) {
    favorites.delete(dishName);
  } else {
    favorites.add(dishName);
  }
  displayDishes(document.getElementById("category").value);
  displayFavorites();
};
*/
const displayDishes = (category, searchQuery = "") => {
  const menuContainer = document.querySelector(".datail-wrapper");
  menuContainer.innerHTML = "";

  const searchLower = searchQuery.toLowerCase();
  const dishesToDisplay = menu.getDishesByCategory(category).filter(
    (dish) => dish.name.toLowerCase().includes(searchLower) //содержится ли подстрока в названии
  );

  // Для сортировки
  const sortOrder = document.getElementById("sortOrder").value;
  if (sortOrder === "asc") {
    dishesToDisplay.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    dishesToDisplay.sort((a, b) => b.price - a.price);
  }

  if (dishesToDisplay.length === 0) {
    menuContainer.innerHTML = "<p>Нет доступных блюд по вашему запросу.</p>";
    return;
  }

  dishesToDisplay.forEach((dish) => {
    const dishElement = document.createElement("div");
    dishElement.classList.add("detail-card");

    const isFavorite = favorites.has(dish.name) ? "active" : "";

    dishElement.innerHTML = `
      <img class="detail-img" src="${dish.image}" alt="${dish.name}" />
      <div class="detail-desk">
        <div class="detail-name">
          <h4>${dish.name}</h4>
          <hr class="divider-menu-desk" />
          <p class="detail-sub">${dish.description}</p>
          <p class="price">${dish.price}$</p>
        </div>
        <div class="heart-icon ${isFavorite}" title="Add to favorites" onclick="toggleFavorite('${dish.name}')">&#10084;</div>
      </div>
    `;

    menuContainer.appendChild(dishElement);
    setTimeout(() => {
      dishElement.classList.add("visible");
    }, 10);
  });
};

const displayFavorites = () => {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  favorites.forEach((dishName) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${dishName} 
      <button onclick="toggleFavorite('${dishName}')">Удалить</button>
    `;
    favoritesList.appendChild(li);
  });
};

const searchDishes = () => {
  const searchQuery = document.getElementById("search").value;
  const selectedCategory = document.getElementById("category").value;
  displayDishes(selectedCategory, searchQuery);
};

document.getElementById("search").addEventListener("input", searchDishes);

document.getElementById("category").addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  displayDishes(selectedCategory);
});

document.getElementById("sortOrder").addEventListener("change", () => {
  const selectedCategory = document.getElementById("category").value;
  const searchQuery = document.getElementById("search").value;
  displayDishes(selectedCategory, searchQuery);
});

// Загружаем все блюда при старте

function saveFavoritesToStorage(favoritesSet) {
  const favoritesArray = Array.from(favoritesSet);
  localStorage.setItem("favoriteDishes", JSON.stringify(favoritesArray));
}

const toggleFavorite = function (dishName) {
  if (favorites.has(dishName)) {
    favorites.delete(dishName);
  } else {
    favorites.add(dishName);
  }
  // Сохраняем в localStorage
  saveFavoritesToStorage.call(this, favorites);

  displayDishes(document.getElementById("category").value);
  displayFavorites();
};
function loadFavoritesFromStorage() {
  const stored = localStorage.getItem("favoriteDishes");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach((name) => favorites.add(name));
  }
}

loadFavoritesFromStorage();
displayDishes("all");
