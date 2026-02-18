const menuBtnElement = document.getElementById("menuBtn");
const menuInfoElement = document.getElementById("menu-bar");
const menuLine1Element = document.querySelector(".line1");
const menuLine2Element = document.querySelector(".line2");
const menuLine3Element = document.querySelector(".line3");
const body = document.body;

function toggleMenu() {
  menuLine1Element.classList.toggle("rotate-45");
  menuLine1Element.classList.toggle("translate-y-1.5");
  menuLine2Element.classList.toggle("opacity-0");
  menuLine3Element.classList.toggle("w-[39px]");
  menuLine3Element.classList.toggle("-rotate-45");
  menuLine3Element.classList.toggle("-translate-y-1.5");
  menuInfoElement.classList.toggle("-translate-x-full");

  if (menuInfoElement.classList.contains("-translate-x-full")) {
    body.classList.remove("no-scroll");
  } else {
    body.classList.add("no-scroll");
  }
}

menuBtnElement.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

menuInfoElement.addEventListener("click", (e) => {
  if (e.target === menuInfoElement) {
    toggleMenu();
  }
});

const menuLinks = menuInfoElement.querySelectorAll("a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu();
  });
});

async function getTitles() {
  try {
    const res = await fetch("https://api.imdbapi.dev/titles");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.titles || [];
  } catch (err) {
    console.error("API xatosi:", err);
    return [];
  }
}

async function writeProducts() {
  const productsListElement = document.getElementById("titles-list");

  if (!productsListElement) {
    console.error("Element 'titles-list' topilmadi!");
    return;
  }

  productsListElement.innerHTML =
    '<p class="text-white text-center col-span-full">Yuklanmoqda...</p>';

  try {
    const titles = await getTitles();

    if (titles.length === 0) {
      productsListElement.innerHTML =
        '<p class="text-white text-center col-span-full">Ma\'lumot topilmadi!</p>';
      return;
    }

    productsListElement.innerHTML = "";

    titles.forEach((element) => {
      if (!element.primaryImage || !element.primaryImage.url) {
        console.warn("Rasm yo'q:", element.primaryTitle);
        return;
      }

      if (!element.genres || !Array.isArray(element.genres)) {
        element.genres = ["Unknown"];
      }

      if (!element.rating || !element.rating.aggregateRating) {
        element.rating = { aggregateRating: "N/A" };
      }

      const cardElement = document.createElement("div");
      cardElement.classList.add(
        "cursor-pointer",
        "transition-transform",
        "hover:scale-105",
      );

      const cardImageElement = document.createElement("div");
      cardImageElement.classList.add("overflow-hidden", "rounded-lg");

      const cardImage = document.createElement("img");
      cardImage.setAttribute("src", element.primaryImage.url);
      cardImage.setAttribute("alt", element.primaryTitle || "Film");
      cardImage.classList.add("w-full", "h-80", "object-cover");

      cardImage.onerror = function () {
        this.src = "https://via.placeholder.com/300x400?text=No+Image";
      };

      cardImageElement.appendChild(cardImage);

      const cardInfoElement = document.createElement("div");
      cardInfoElement.classList.add("mt-3", "flex", "flex-col", "gap-2");

      const cardTitle = document.createElement("h3");
      cardTitle.classList.add("text-lg", "font-semibold", "line-clamp-1");
      cardTitle.innerHTML = `<a href="./about.html?id=${element.id}" class="hover:text-[#e13c52]">${element.primaryTitle || "Unknown"}</a>`;

      const cardGenres = document.createElement("span");
      cardGenres.classList.add("text-sm", "text-[#8D8D8D]");
      cardGenres.textContent = element.genres.join(", ");

      const cardRating = document.createElement("span");
      cardRating.classList.add("text-sm", "font-medium");
      cardRating.textContent = `⭐ ${element.rating.aggregateRating}`;

      cardInfoElement.appendChild(cardTitle);
      cardInfoElement.appendChild(cardGenres);
      cardInfoElement.appendChild(cardRating);

      cardElement.appendChild(cardImageElement);
      cardElement.appendChild(cardInfoElement);
      productsListElement.appendChild(cardElement);
    });
  } catch (err) {
    console.error("Xatolik:", err);
    productsListElement.innerHTML = `<p class="text-white text-center col-span-full">Xatolik: ${err.message}</p>`;
  }
}

writeProducts();
