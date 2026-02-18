const menuBtnElement = document.getElementById("menuBtn");
const menuInfoElement = document.getElementById("menu-bar");
const menuLine1Element = document.querySelector(".line1");
const menuLine2Element = document.querySelector(".line2");
const menuLine3Element = document.querySelector(".line3");
const body = document.body;

// Menu toggle
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

// Mobile menu links close
const mobileLinks = document.querySelectorAll("#menu-bar a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuInfoElement.classList.add("-translate-x-full");
    menuLine1Element.classList.remove("rotate-45", "translate-y-1.5");
    menuLine2Element.classList.remove("opacity-0");
    menuLine3Element.classList.remove(
      "w-[39px]",
      "-rotate-45",
      "-translate-y-1.5",
    );
    body.classList.remove("no-scroll");
  });
});

// Get movie data
async function getInfo() {
  try {
    const res = await fetch("https://api.imdbapi.dev/titles");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data1 = await res.json();
    return data1.titles;
  } catch (err) {
    console.error("API xatosi:", err);
    return [];
  }
}

// Display movie details
const mainCard = document.getElementById("about-content");

async function writeProduct() {
  if (!mainCard) {
    console.error("about-content element topilmadi!");
    return;
  }

  // Loading
  mainCard.innerHTML = '<p class="text-white text-center">Yuklanmoqda...</p>';

  try {
    const cards = await getInfo();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      mainCard.innerHTML =
        '<p class="text-white text-center">Film ID topilmadi!</p>';
      return;
    }

    const currentMovie = cards.find((item) => item.id === id);

    if (!currentMovie) {
      mainCard.innerHTML =
        '<p class="text-white text-center">Film topilmadi!</p>';
      return;
    }

    // Clear loading
    mainCard.innerHTML = "";

    // Main card container
    const cardElement = document.createElement("div");
    cardElement.className =
      "relative min-h-screen bg-cover bg-top bg-no-repeat";

    if (currentMovie.primaryImage?.url) {
      cardElement.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(25,25,25,0.9)), url(${currentMovie.primaryImage.url})`;
    }

    // Content wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "container mx-auto px-4 py-20 lg:px-8 xl:px-12";

    const textWrapper = document.createElement("div");
    textWrapper.className =
      "relative z-10 flex flex-col text-white gap-5 max-w-3xl";

    // Title
    const title = document.createElement("h1");
    title.textContent = currentMovie.primaryTitle || "Unknown Title";
    title.className = "text-4xl sm:text-5xl md:text-6xl font-bold mb-4";

    // Info content (year, genres, rating)
    const infoContent = document.createElement("div");
    infoContent.className = "flex flex-wrap gap-4 items-center text-lg";

    // Year
    if (currentMovie.startYear) {
      const year = document.createElement("span");
      year.textContent = currentMovie.startYear;
      year.className = "font-semibold text-gray-300";
      infoContent.appendChild(year);
    }

    // Genres
    if (currentMovie.genres && currentMovie.genres.length > 0) {
      const genres = document.createElement("span");
      genres.textContent = currentMovie.genres.join(", ");
      genres.className = "font-semibold text-gray-300";
      infoContent.appendChild(genres);
    }

    // Rating
    if (currentMovie.rating?.aggregateRating) {
      const rating = document.createElement("span");
      rating.textContent = `⭐ ${currentMovie.rating.aggregateRating}`;
      rating.className = "font-bold text-yellow-400";
      infoContent.appendChild(rating);
    }

    // Plot/Description
    const desc = document.createElement("p");
    desc.textContent = currentMovie.plot || "No description available.";
    desc.className =
      "text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed";

    // Watch button
    const btnLink = document.createElement("a");
    btnLink.href = `https://www.imdb.com/title/${currentMovie.id}/`;
    btnLink.target = "_blank";
    btnLink.rel = "noopener noreferrer";

    const aboutBtn = document.createElement("button");
    aboutBtn.textContent = "Watch on IMDb";
    aboutBtn.className =
      "mt-4 px-8 py-3 bg-[#e13c52] text-white text-xl font-semibold rounded-full hover:bg-[#c32a3f] transition-colors duration-300";

    btnLink.appendChild(aboutBtn);

    // Append everything
    textWrapper.appendChild(title);
    textWrapper.appendChild(infoContent);
    textWrapper.appendChild(desc);
    textWrapper.appendChild(btnLink);

    wrapper.appendChild(textWrapper);
    cardElement.appendChild(wrapper);
    mainCard.appendChild(cardElement);
  } catch (err) {
    console.error("Xatolik:", err);
    mainCard.innerHTML =
      '<p class="text-white text-center">Xatolik yuz berdi!</p>';
  }
}

writeProduct();
