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
