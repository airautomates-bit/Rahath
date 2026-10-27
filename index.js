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
const heroCountdownMonth = "24 November 2026";

// Use Sri Lanka time format: YYYY-MM-DDTHH:MM:SS+05:30
const heroDepartureDate = "2026-11-24T08:00:00+05:30";

const departureMonth = document.getElementById("departureMonth");
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");

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
    countdownDays.textContent = "00";
    countdownHours.textContent = "00";
    countdownMinutes.textContent = "00";
    countdownSeconds.textContent = "00";

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

  countdownDays.textContent = String(days).padStart(2, "0");
  countdownHours.textContent = String(hours).padStart(2, "0");
  countdownMinutes.textContent = String(minutes).padStart(2, "0");
  countdownSeconds.textContent = String(seconds).padStart(2, "0");

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

// ================= MOMENTS GALLERY VIDEO =================

// The clip only loads and plays while it is on screen. Visitors who prefer
// reduced motion get the still frame with controls instead of autoplay.
const momentVideos = document.querySelectorAll(".moment-video video");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  momentVideos.forEach((video) => {
    video.controls = true;
  });
} else {
  const momentVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.35 });

  momentVideos.forEach((video) => momentVideoObserver.observe(video));
}

// ================= REVIEW WALL =================

document.querySelectorAll(".review-track").forEach((track) => {
  const reviewSet = track.querySelector(".review-set");
  if (!reviewSet || track.children.length > 1) return;

  const clone = reviewSet.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);
});

// ================= FAQ SECTION INTERACTIONS =================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const button = faq.querySelector(".faq-question");
      if (button) button.setAttribute("aria-expanded", "false");
    });

    if (!isActive) {
      item.classList.add("active");
      question.setAttribute("aria-expanded", "true");
    }
  });
});

// ================= BOOK A CALL SECTION INTERACTIONS =================

const bookingForm = document.getElementById("bookingForm");
const timeSlots = document.querySelectorAll(".time-slot");
const callTimeInput = document.getElementById("callTime");
const callDateInput = document.getElementById("callDate");
const bookingToast = document.getElementById("bookingToast");
const bookingSubmit = document.getElementById("bookingSubmit");
const leadConfirmation = document.getElementById("leadConfirmation");
const leadConfirmationDialog = document.getElementById("leadConfirmationDialog");
const leadConfirmationClose = document.getElementById("leadConfirmationClose");
const leadConfirmationDone = document.getElementById("leadConfirmationDone");

const rahathWhatsAppNumber = "94725329242";
const allowedPackages = new Set([
  "Standard Package - LKR 385,000",
  "Premium Package - LKR 600,000",
  "Not sure yet",
]);
const allowedCallTimes = new Set(["10:00 AM", "12:00 PM", "4:00 PM", "8:00 PM"]);
const allowedTravellerCounts = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]);
let bookingSubmissionLocked = false;
let confirmationPreviousFocus = null;

const getLocalISODate = (date = new Date()) => {
  const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localTime.toISOString().slice(0, 10);
};

const normalizeSingleLine = (value, maxLength) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const normalizeMessage = (value) =>
  value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 500);

const closeLeadConfirmation = () => {
  if (!leadConfirmation) return;

  leadConfirmation.hidden = true;
  document.body.classList.remove("confirmation-open");

  if (confirmationPreviousFocus instanceof HTMLElement) {
    confirmationPreviousFocus.focus();
  }
};

const showLeadConfirmation = (packageType) => {
  if (leadConfirmation) {
    confirmationPreviousFocus = document.activeElement;
    leadConfirmation.hidden = false;
    document.body.classList.add("confirmation-open");
    leadConfirmationDialog?.focus();
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      method: "WhatsApp",
      package_name: packageType,
    });

    if (window.location.protocol === "https:" || window.location.protocol === "http:") {
      const conversionURL = new URL("/requested", window.location.origin);
      window.gtag("event", "page_view", {
        page_title: "Booking request prepared",
        page_location: conversionURL.href,
        page_path: conversionURL.pathname,
      });
    }
  }

  if (window.location.protocol === "https:" || window.location.protocol === "http:") {
    window.history.pushState({ leadConfirmation: true }, "", "/requested");
  }
};

leadConfirmationClose?.addEventListener("click", closeLeadConfirmation);
leadConfirmationDone?.addEventListener("click", closeLeadConfirmation);

leadConfirmation?.addEventListener("click", (event) => {
  if (event.target === leadConfirmation) {
    closeLeadConfirmation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && leadConfirmation && !leadConfirmation.hidden) {
    closeLeadConfirmation();
  }
});

window.addEventListener("popstate", () => {
  if (leadConfirmation && !leadConfirmation.hidden) {
    closeLeadConfirmation();
  }
});

if (callTimeInput) {
  callTimeInput.value = "10:00 AM";
}

if (callDateInput) {
  const today = getLocalISODate();
  const latestDate = new Date();
  latestDate.setFullYear(latestDate.getFullYear() + 1);
  callDateInput.setAttribute("min", today);
  callDateInput.setAttribute("max", getLocalISODate(latestDate));
}

// "Reserve Standard" / "Reserve Premium" pre-select that package in the form.
document.querySelectorAll("[data-package]").forEach((button) => {
  button.addEventListener("click", () => {
    const packageSelect = document.getElementById("packageType");
    const chosenPackage = button.dataset.package;

    if (packageSelect && allowedPackages.has(chosenPackage)) {
      packageSelect.value = chosenPackage;
    }
  });
});

timeSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    timeSlots.forEach((button) => button.classList.remove("active"));
    slot.classList.add("active");

    const selectedTime = slot.dataset.time;
    if (callTimeInput && allowedCallTimes.has(selectedTime)) {
      callTimeInput.value = selectedTime;
    }
  });
});

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (bookingSubmissionLocked) {
      return;
    }

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const fullName = normalizeSingleLine(document.getElementById("fullName").value, 80);
    const phoneNumber = normalizeSingleLine(document.getElementById("phoneNumber").value, 20);
    const packageType = document.getElementById("packageType").value;
    const travellerCount = document.getElementById("travellerCount").value;
    const callDate = document.getElementById("callDate").value;
    const callTime = document.getElementById("callTime").value;
    const message = normalizeMessage(document.getElementById("message").value);
    const today = getLocalISODate();

    if (fullName.length < 2) {
      alert("Please enter a valid name.");
      return;
    }

    if (!/^[0-9+() -]{7,20}$/.test(phoneNumber)) {
      alert("Please enter a valid phone or WhatsApp number.");
      return;
    }

    if (!allowedPackages.has(packageType) || !allowedCallTimes.has(callTime)) {
      alert("Please choose a valid package and call time.");
      return;
    }

    if (!allowedTravellerCounts.has(travellerCount)) {
      alert("Please choose how many people are travelling.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(callDate) || callDate < today) {
      alert("Please choose a valid future call date.");
      return;
    }

    const whatsappMessage = [
      "Assalamu Alaikum, I would like to book a call for the November Umrah 2026 package.",
      "",
      `Name: ${fullName}`,
      `Phone: ${phoneNumber}`,
      `Interested Package: ${packageType}`,
      `Number of People: ${travellerCount}`,
      `Preferred Call Date: ${callDate}`,
      `Preferred Call Time: ${callTime}`,
      `Message: ${message || "No additional message"}`,
    ].join("\n");

    const whatsappURL = new URL(`https://wa.me/${rahathWhatsAppNumber}`);
    whatsappURL.searchParams.set("text", whatsappMessage);

    bookingSubmissionLocked = true;
    if (bookingSubmit) {
      bookingSubmit.disabled = true;
      bookingSubmit.setAttribute("aria-disabled", "true");
    }

    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappURL.toString();
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    whatsappLink.hidden = true;
    document.body.appendChild(whatsappLink);
    whatsappLink.click();
    whatsappLink.remove();

    showLeadConfirmation(packageType);

    if (bookingToast) {
      bookingToast.classList.add("show");

      setTimeout(() => {
        bookingToast.classList.remove("show");
      }, 2800);
    }

    bookingForm.reset();

    if (callTimeInput) {
      callTimeInput.value = "10:00 AM";
    }

    timeSlots.forEach((button) => button.classList.remove("active"));
    if (timeSlots[0]) {
      timeSlots[0].classList.add("active");
    }

    setTimeout(() => {
      bookingSubmissionLocked = false;
      if (bookingSubmit) {
        bookingSubmit.disabled = false;
        bookingSubmit.removeAttribute("aria-disabled");
      }
    }, 2000);
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
