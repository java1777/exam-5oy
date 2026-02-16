const menuBtnElement = document.getElementById("menuBtn");
const menuInfoElement = document.getElementById("menu-bar");
const menuLine1Element = document.querySelector(".line1");
const menuLine2Element = document.querySelector(".line2");
const menuLine3Element = document.querySelector(".line3");
const body = document.body;

menuBtnElement.addEventListener("click", () => {
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
});

async function getTitles() {
  try {
    const res = await fetch("https://api.imdbapi.dev/titles");
    const data = await res.json();
    return data.titles;
  } catch (err) {
    console.log("err", err);
    return [];
  }
}

async function writeProducts() {
  const productsListElement = document.getElementById("titles-list");

  if (!productsListElement) {
    console.error("Element 'titles-list' topilmadi!");
    return;
  }

  try {
    const titles = await getTitles();

    titles.forEach((element) => {
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
      cardImage.setAttribute("alt", element.primaryTitle);
      cardImage.classList.add("w-full", "h-80", "object-cover");
      cardImageElement.appendChild(cardImage);

      const cardInfoElement = document.createElement("div");
      cardInfoElement.classList.add("mt-3", "flex", "flex-col", "gap-2");

      const cardTitle = document.createElement("h3");
      cardTitle.classList.add("text-lg", "font-semibold", "line-clamp-1");
      cardTitle.innerHTML = `<a href="./about.html?id=${element.id}" class="hover:text-[#e13c52]">${element.primaryTitle}</a>`;

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
    console.log("Error:", err);
  }
}

writeProducts();
