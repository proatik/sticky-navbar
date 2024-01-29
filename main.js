// dom elements.
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".section");
const itemsContainer = document.getElementById("items");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// move horizontal scrollbar left or right.
function handleNavigation() {
  leftButton.addEventListener("click", () => {
    itemsContainer.scrollBy({ left: -100 });
  });
  rightButton.addEventListener("click", () => {
    itemsContainer.scrollBy({ left: 100 });
  });
}

// scroll to the respective section on click.
function handleScrollToSection() {
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const sectionId = e.target.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        const scrollAmount = section.offsetTop - navbar.offsetHeight + 1;
        window.scrollTo({ top: scrollAmount });
      }
    });
  });
}

// helper debounce function.
function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// set the active nav item/link on vertical scroll.
function handleOnScroll() {
  let activeSectionIndex = -1;

  sections.forEach((section, index) => {
    let top = window.scrollY;
    let offset = section.offsetTop - navbar.offsetHeight - 1;
    let height = section.offsetHeight;

    if (top >= offset && top < offset + height) {
      activeSectionIndex = index;
    }
  });

  navLinks.forEach((link, index) => {
    if (index === activeSectionIndex) {
      const scrollAmount =
        link.offsetLeft - itemsContainer.offsetWidth / 2 + link.offsetWidth / 4;

      itemsContainer.scrollLeft = scrollAmount;
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// initiate all the functions.
document.addEventListener("DOMContentLoaded", () => {
  handleNavigation();
  handleScrollToSection();
  window.addEventListener("scroll", debounce(handleOnScroll, 30));
});
