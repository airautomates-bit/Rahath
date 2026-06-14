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

// ================= JOURNEY SECTION INTERACTIONS =================

// ================= JOURNEY SECTION INTERACTIONS =================

const journeyThumbs = document.querySelectorAll(".journey-thumb");
const journeySteps = document.querySelectorAll(".journey-step");
const journeyMainImage = document.getElementById("journeyMainImage");
const journeyImageTitle = document.getElementById("journeyImageTitle");
const journeyImageSmall = document.getElementById("journeyImageSmall");

const journeyTitles = [
  {
    small: "Recent Trip",
    title: "Preparation & group briefing",
  },
  {
    small: "On the Journey",
    title: "Travelling with the group",
  },
  {
    small: "In the Haramain",
    title: "Ziyarat and spiritual reminders",
  },
];

function updateJourney(index) {
  const selectedThumb = journeyThumbs[index];
  const selectedStep = journeySteps[index];

  if (!selectedThumb || !journeyMainImage) return;

  const thumbImage = selectedThumb.querySelector("img");

  if (!thumbImage) return;

  journeyThumbs.forEach((thumb) => thumb.classList.remove("active"));
  journeySteps.forEach((step) => step.classList.remove("active"));

  selectedThumb.classList.add("active");

  if (selectedStep) {
    selectedStep.classList.add("active");
  }

  journeyMainImage.style.opacity = "0";
  journeyMainImage.style.transform = "scale(1.04)";

  setTimeout(() => {
    journeyMainImage.src = thumbImage.getAttribute("src");

    journeyImageSmall.textContent = selectedThumb.getAttribute("data-small") || journeyTitles[index].small;
    journeyImageTitle.textContent = selectedThumb.getAttribute("data-title") || journeyTitles[index].title;

    journeyMainImage.style.opacity = "1";
    journeyMainImage.style.transform = "scale(1)";
  }, 180);
}

journeyThumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateJourney(index);
  });

  thumb.addEventListener("mouseenter", () => {
    updateJourney(index);
  });
});

journeySteps.forEach((step, index) => {
  step.addEventListener("click", () => {
    updateJourney(index);
  });

  step.addEventListener("mouseenter", () => {
    updateJourney(index);
  });
});

// ================= GUIDE SECTION INTERACTIONS =================

const guideVisual = document.querySelector(".guide-visual");
const guideImageWrap = document.querySelector(".guide-image-wrap");
const guideNotes = document.querySelectorAll(".guide-floating-note");

if (guideVisual && guideImageWrap) {
  guideVisual.addEventListener("mousemove", (event) => {
    const rect = guideVisual.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 28;
    const moveY = (y - rect.height / 2) / 28;

    guideImageWrap.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-1deg)`;

    guideNotes.forEach((note, index) => {
      const speed = index === 0 ? 1.4 : -1.2;
      note.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
    });
  });

  guideVisual.addEventListener("mouseleave", () => {
    guideImageWrap.style.transform = "";
    guideNotes.forEach((note) => {
      note.style.transform = "";
    });
  });
}

// ================= TESTIMONIAL SECTION INTERACTIONS =================

const testimonialCards = document.querySelectorAll(".testimonial-card");
const featuredInitial = document.getElementById("featuredInitial");
const featuredName = document.getElementById("featuredName");
const featuredMeta = document.getElementById("featuredMeta");
const featuredReview = document.getElementById("featuredReview");
const featuredTag = document.getElementById("featuredTag");
const featuredCount = document.getElementById("featuredCount");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

let currentTestimonial = 0;

function updateTestimonial(index) {
  const selectedCard = testimonialCards[index];

  if (!selectedCard) return;

  testimonialCards.forEach((card) => card.classList.remove("active"));
  selectedCard.classList.add("active");

  currentTestimonial = index;

  featuredReview.style.opacity = "0";
  featuredReview.style.transform = "translateY(12px)";

  setTimeout(() => {
    featuredInitial.textContent = selectedCard.dataset.initial;
    featuredName.textContent = selectedCard.dataset.name;
    featuredMeta.textContent = selectedCard.dataset.meta;
    featuredReview.textContent = selectedCard.dataset.review;
    featuredTag.textContent = selectedCard.dataset.tag;
    featuredCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(testimonialCards.length).padStart(2, "0")}`;

    featuredReview.style.opacity = "1";
    featuredReview.style.transform = "translateY(0)";
  }, 180);
}

testimonialCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    updateTestimonial(index);
  });

  card.addEventListener("mouseenter", () => {
    updateTestimonial(index);
  });
});

if (testimonialNext) {
  testimonialNext.addEventListener("click", () => {
    const nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonial(nextIndex);
  });
}

if (testimonialPrev) {
  testimonialPrev.addEventListener("click", () => {
    const prevIndex =
      (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonial(prevIndex);
  });
}

// ================= FAQ SECTION INTERACTIONS =================

const faqItems = document.querySelectorAll(".faq-item");
const faqTabs = document.querySelectorAll(".faq-tab");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => faq.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

faqTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;

    faqTabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");

    faqItems.forEach((item) => {
      item.classList.remove("active");

      if (category === "all" || item.dataset.category === category) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });

    const firstVisibleItem = document.querySelector(".faq-item:not(.hide)");

    if (firstVisibleItem) {
      firstVisibleItem.classList.add("active");
    }
  });
});

// ================= BOOK A CALL SECTION INTERACTIONS =================

const bookingForm = document.getElementById("bookingForm");
const timeSlots = document.querySelectorAll(".time-slot");
const callTimeInput = document.getElementById("callTime");
const callDateInput = document.getElementById("callDate");
const bookingToast = document.getElementById("bookingToast");

const rahathWhatsAppNumber = "94725329242";

if (callTimeInput) {
  callTimeInput.value = "10:00 AM";
}

if (callDateInput) {
  const today = new Date().toISOString().split("T")[0];
  callDateInput.setAttribute("min", today);
}

timeSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    timeSlots.forEach((button) => button.classList.remove("active"));
    slot.classList.add("active");

    callTimeInput.value = slot.dataset.time;
  });
});

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const packageType = document.getElementById("packageType").value;
    const callDate = document.getElementById("callDate").value;
    const callTime = document.getElementById("callTime").value;
    const message = document.getElementById("message").value.trim();

    if (!fullName || !phoneNumber || !packageType || !callDate || !callTime) {
      alert("Please fill all required details before sending.");
      return;
    }

    const whatsappMessage =
      `Assalamu Alaikum, I would like to book a call for the July Umrah 2026 package.%0A%0A` +
      `Name: ${fullName}%0A` +
      `Phone: ${phoneNumber}%0A` +
      `Interested Package: ${packageType}%0A` +
      `Preferred Call Date: ${callDate}%0A` +
      `Preferred Call Time: ${callTime}%0A` +
      `Message: ${message || "No additional message"}`;

    const whatsappURL = `https://wa.me/${rahathWhatsAppNumber}?text=${whatsappMessage}`;

    if (bookingToast) {
      bookingToast.classList.add("show");

      setTimeout(() => {
        bookingToast.classList.remove("show");
      }, 2800);
    }

    window.open(whatsappURL, "_blank");
    bookingForm.reset();

    if (callTimeInput) {
      callTimeInput.value = "10:00 AM";
    }

    timeSlots.forEach((button) => button.classList.remove("active"));
    if (timeSlots[0]) {
      timeSlots[0].classList.add("active");
    }
  });
}

// ================= FOOTER INTERACTIONS =================

const footerYear = document.getElementById("footerYear");
const backToTop = document.getElementById("backToTop");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}