const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navActions = document.querySelector(".nav-actions");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
  navActions.classList.toggle("active");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");

    menuBtn.classList.remove("active");
    navLinks.classList.remove("active");
    navActions.classList.remove("active");
  });
});

const buttons = document.querySelectorAll(".btn, .search-btn");

buttons.forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.96)";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

const tiltCards = document.querySelectorAll("[data-tilt]");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains("featured-package")) {
      card.style.transform = "translateY(-18px)";
    } else {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  });
});
