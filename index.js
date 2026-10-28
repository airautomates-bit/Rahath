// ================= OLD ONE-PAGE LINKS =================

// Links shared before the site had separate pages (e.g. rahathtours.com/#faq)
// are sent to the page that now holds that section.
const movedSections = {
  "#guide": "/about#guide",
  "#testimonials": "/about#testimonials",
  "#faq": "/contact#faq",
  "#book-call": "/contact",
  "#booking-form": "/contact#booking-form",
};

if ((location.pathname === "/" || location.pathname === "/index.html") && movedSections[location.hash]) {
  location.replace(movedSections[location.hash]);
}

// ================= OPENED FROM THE FOLDER =================

// A page opened straight from the folder (file://) can't follow clean links
// like /packages, so point them at the .html files. The live site is unaffected.
if (location.protocol === "file:") {
  const pageFiles = {
    "/": "index.html",
    "/packages": "packages.html",
    "/about": "about.html",
    "/contact": "contact.html",
    "/tamil": "tamil.html",
  };

  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    const [, path, rest] = link.getAttribute("href").match(/^(\/[a-z]*)(.*)$/) || [];
    if (path in pageFiles) {
      link.setAttribute("href", pageFiles[path] + rest);
    }
  });
}

// ================= MOBILE NAVIGATION =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navActions = document.querySelector(".nav-actions");
const navItems = document.querySelectorAll(".nav-links a");

// The button tells screen readers whether the menu is open; Escape closes it.
const setMenuOpen = (open) => {
  menuBtn.classList.toggle("active", open);
  navLinks.classList.toggle("active", open);
  navActions.classList.toggle("active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

if (menuBtn && navLinks && navActions) {
  menuBtn.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("active"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      setMenuOpen(false);
      menuBtn.focus();
    }
  });
}

// Each page marks its own nav link, so a click only needs to close the menu.
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (menuBtn && navLinks && navActions) {
      setMenuOpen(false);
    }
  });
});


// ================= MOBILE BOOKING BAR =================

// Shows once the reader is past the hero; steps aside while the booking form
// or the footer is on screen, so it never covers them.
const mobileCta = document.getElementById("mobileCta");

if (mobileCta) {
  const nearbyOnScreen = new Set();
  const updateMobileCta = () => {
    mobileCta.classList.toggle("is-visible", window.scrollY > 480 && nearbyOnScreen.size === 0);
  };

  if ("IntersectionObserver" in window) {
    const nearbyWatcher = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nearbyOnScreen.add(entry.target);
        } else {
          nearbyOnScreen.delete(entry.target);
        }
      });
      updateMobileCta();
    });

    [document.getElementById("booking-form"), document.querySelector(".sky-footer")]
      .filter(Boolean)
      .forEach((element) => nearbyWatcher.observe(element));
  }

  window.addEventListener("scroll", updateMobileCta, { passive: true });
  updateMobileCta();
}

// ================= HERO REAL-TIME COUNTDOWN =================

// Change these two values whenever the next Umrah departure changes.
const heroCountdownMonth = "24 November 2026";

// Use Sri Lanka time format: YYYY-MM-DDTHH:MM:SS+05:30
const heroDepartureDate = "2026-11-24T08:00:00+05:30";

const departureMonth = document.getElementById("departureMonth");
const heroCountdownCard = document.querySelector(".hero-countdown-card");
const countdownNext = document.getElementById("countdownNext");
const countdownDays = document.getElementById("countdownDays");
const countdownHours = document.getElementById("countdownHours");
const countdownMinutes = document.getElementById("countdownMinutes");
const countdownSeconds = document.getElementById("countdownSeconds");

if (departureMonth) {
  departureMonth.textContent = heroCountdownMonth;
}

const hasDeparted = () => new Date().getTime() >= new Date(heroDepartureDate).getTime();

// Once the group has left, date-specific text swaps to a "next group" message
// until the next departure date is set above.
let departureHandled = false;

function showNextGroupMessage() {
  if (departureHandled) {
    return;
  }

  departureHandled = true;

  document.querySelectorAll("[data-after-departure]").forEach((el) => {
    el.textContent = el.dataset.afterDeparture;
  });

  document.querySelectorAll("[data-hide-after-departure]").forEach((el) => {
    el.hidden = true;
  });

  if (heroCountdownCard && countdownNext) {
    heroCountdownCard.classList.add("is-finished");
    countdownNext.hidden = false;
  }
}

function updateHeroCountdown() {
  const now = new Date().getTime();
  const departureTime = new Date(heroDepartureDate).getTime();
  const timeLeft = departureTime - now;

  if (timeLeft <= 0) {
    showNextGroupMessage();
  }

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

// "Reserve Standard" / "Reserve Premium" link to /contact?package=standard
// (or premium); pre-select that package in the form.
const packageFromLink = {
  standard: "Standard Package - LKR 385,000",
  premium: "Premium Package - LKR 600,000",
}[new URLSearchParams(location.search).get("package")];
const packageSelect = document.getElementById("packageType");

if (packageSelect && packageFromLink && allowedPackages.has(packageFromLink)) {
  packageSelect.value = packageFromLink;
}

// Problems are shown under each field instead of in pop-ups, and clear as
// soon as the field is changed.
const showFieldError = (field, text) => {
  let note = document.getElementById(`${field.id}-error`);
  if (!note) {
    note = document.createElement("p");
    note.className = "field-error";
    note.id = `${field.id}-error`;
    field.closest(".form-group").appendChild(note);
  }
  note.textContent = text;
  field.setAttribute("aria-invalid", "true");
  field.setAttribute("aria-describedby", note.id);
};

const clearFieldError = (field) => {
  const note = document.getElementById(`${field.id}-error`);
  if (note) {
    note.remove();
  }
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
};

timeSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    timeSlots.forEach((button) => button.classList.remove("active"));
    slot.classList.add("active");

    const selectedTime = slot.dataset.time;
    if (callTimeInput && allowedCallTimes.has(selectedTime)) {
      callTimeInput.value = selectedTime;
      clearFieldError(callTimeInput);
    }
  });
});

if (bookingForm) {
  // The form checks itself so every problem gets the same plain message.
  bookingForm.noValidate = true;

  ["fullName", "phoneNumber", "packageType", "travellerCount", "callDate"].forEach((id) => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", () => clearFieldError(field));
      field.addEventListener("change", () => clearFieldError(field));
    }
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (bookingSubmissionLocked) {
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

    const latestCallDate = callDateInput ? callDateInput.max : "";
    const problems = [];

    if (fullName.length < 2) {
      problems.push(["fullName", "Please type your name."]);
    }

    if (!/^[0-9+() -]{7,20}$/.test(phoneNumber)) {
      problems.push(["phoneNumber", "Please type a phone or WhatsApp number, like +94 77 123 4567."]);
    }

    if (!allowedPackages.has(packageType)) {
      problems.push(["packageType", "Please choose a package, or pick Not sure yet."]);
    }

    if (!allowedTravellerCounts.has(travellerCount)) {
      problems.push(["travellerCount", "Please choose how many people are travelling."]);
    }

    if (!callDate) {
      problems.push(["callDate", "Please choose a day for our call."]);
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(callDate) || callDate < today || (latestCallDate && callDate > latestCallDate)) {
      problems.push(["callDate", "Please choose a day from today up to a year ahead."]);
    }

    if (!allowedCallTimes.has(callTime)) {
      problems.push(["callTime", "Please choose a time for our call."]);
    }

    bookingForm.querySelectorAll("[aria-invalid]").forEach(clearFieldError);

    if (problems.length) {
      problems.forEach(([id, text]) => showFieldError(document.getElementById(id), text));
      const firstField = document.getElementById(problems[0][0]);
      (firstField.type === "hidden" ? bookingForm.querySelector(".time-slot") : firstField).focus();
      return;
    }

    const whatsappMessage = [
      hasDeparted()
        ? "Assalamu Alaikum, I would like to book a call about your next Umrah group."
        : "Assalamu Alaikum, I would like to book a call for the November Umrah 2026 package.",
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

// The privacy note is folded away; links to it open it before scrolling.
const privacyNote = document.getElementById("privacy");

if (privacyNote) {
  if (window.location.hash === "#privacy") {
    privacyNote.open = true;
  }

  document.querySelectorAll('a[href="#privacy"]').forEach((link) => {
    link.addEventListener("click", () => {
      privacyNote.open = true;
    });
  });
}
