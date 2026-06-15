// ================= MOBILE NAVIGATION =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navActions = document.querySelector(".nav-actions");
const navItems = document.querySelectorAll(".nav-links a");

if (menuBtn && navLinks && navActions) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
    navActions.classList.toggle("active");
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");

    if (menuBtn && navLinks && navActions) {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      navActions.classList.remove("active");
    }
  });
});


// ================= HERO REAL-TIME COUNTDOWN =================

// Change these two values whenever the next Umrah departure changes.
const heroCountdownMonth = "July 2026";

// Use Sri Lanka time format: YYYY-MM-DDTHH:MM:SS+05:30
const heroDepartureDate = "2026-07-14T08:00:00+05:30";

const departureMonth = document.getElementById("departureMonth");
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");
const countdownStatus = document.getElementById("countdownStatus");

if (departureMonth) {
  departureMonth.textContent = heroCountdownMonth;
}

function updateHeroCountdown() {
  const now = new Date().getTime();
  const departureTime = new Date(heroDepartureDate).getTime();
  const timeLeft = departureTime - now;

  if (
    !countdownDays ||
    !countdownHours ||
    !countdownMinutes ||
    !countdownSeconds
  ) {
    return;
  }

  if (timeLeft <= 0) {
    countdownDays.textContent = "000";
    countdownHours.textContent = "00";
    countdownMinutes.textContent = "00";
    countdownSeconds.textContent = "00";

    if (countdownStatus) {
      countdownStatus.textContent =
        "This departure has started. New group details coming soon.";
    }

    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor(
    (timeLeft % (1000 * 60)) / 1000
  );

  countdownDays.textContent = String(days).padStart(3, "0");
  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMinutes.textContent = String(minutes).padStart(2, "0");
  countdownSeconds.textContent = String(seconds).padStart(2, "0");

  if (countdownStatus) {
    if (days <= 14) {
      countdownStatus.textContent = "Final days remaining for the upcoming group.";
    } else {
      countdownStatus.textContent = "Countdown active for the upcoming group.";
    }
  }
}

updateHeroCountdown();
setInterval(updateHeroCountdown, 1000);

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