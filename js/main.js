import { siteConfig } from "./config.js";
import { getTranslations, getLocale, setLocale, onLocaleChange, initLocale, formatTemplate } from "./locale.js";
import { initGallery } from "./gallery.js";
import { initEasterEggs, updateEasterEggMessages } from "./easter-eggs.js";

const { couple, wedding, theme, sections, saveTheDate, contact, easterEggs } = siteConfig;

let countdownInterval;

function t() {
  return getTranslations();
}

function applyTheme() {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value);
  });
}

function removeSection(id) {
  document.getElementById(id)?.remove();
}

function mergeMediaWithCaptions() {
  return saveTheDate.media.map((item, i) => ({
    ...item,
    caption: t().saveTheDate.media[i]?.caption ?? "",
  }));
}

function renderNav() {
  const nav = document.getElementById("nav-menu");
  if (!nav) return;

  const tr = t();
  const logo = document.querySelector(".nav-logo");
  if (logo) {
    logo.textContent = `${couple.person1.charAt(0)} & ${couple.person2.charAt(0)}`;
  }

  nav.innerHTML = Object.entries(sections)
    .filter(([, s]) => s.enabled && s.id !== "accueil")
    .map(([key, s]) => {
      const title = tr.sections[key] ?? s.id;
      return `<li><a href="#${s.id}" class="nav-link">${title}</a></li>`;
    })
    .join("");

  updateLangSwitch();
}

function updateLangSwitch() {
  const tr = t();
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === getLocale();
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active);
    btn.title = tr.lang[btn.dataset.lang] ?? btn.dataset.lang;
  });

  const switcher = document.getElementById("lang-switch");
  if (switcher) switcher.setAttribute("aria-label", tr.lang.switch);
}

function renderHero() {
  const hero = document.getElementById("accueil");
  if (!hero || !sections.hero.enabled) {
    removeSection("accueil");
    return;
  }

  const tr = t();
  const eyebrow = document.getElementById("hero-eyebrow");
  if (eyebrow) eyebrow.textContent = tr.hero.eyebrow;

  document.getElementById("hero-names").innerHTML =
    `${couple.person1} <span class="hero-amp" id="hero-amp" title="?">&</span> ${couple.person2}`;
  document.getElementById("hero-date").textContent = tr.hero.dateDisplay;
  document.getElementById("hero-location").textContent = tr.hero.location;
  document.getElementById("hero-tagline").textContent = tr.hero.tagline;

  const ctaRsvp = document.getElementById("hero-cta-rsvp");
  const ctaStd = document.getElementById("hero-cta-save-the-date");
  if (ctaRsvp) ctaRsvp.textContent = tr.hero.ctaRsvp;
  if (ctaStd) ctaStd.textContent = tr.hero.ctaSaveTheDate;

  document.title = `${couple.person1} & ${couple.person2} — ${tr.meta.titleSuffix}`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", tr.meta.description);
}

function renderEssentials() {
  if (!sections.essentials.enabled) {
    removeSection("essentiel");
    return;
  }

  document.getElementById("essentials-title").textContent = t().sections.essentials;
  document.getElementById("essentials-grid").innerHTML = t().essentials
    .map(
      (e) => `
      <article class="essential-card">
        <span class="essential-icon" aria-hidden="true">${e.icon}</span>
        <p class="essential-label">${e.label}</p>
        <p class="essential-value">${e.value}</p>
      </article>`
    )
    .join("");
}

function renderSaveTheDate() {
  if (!sections.saveTheDate.enabled) {
    removeSection("save-the-date");
    return;
  }

  document.getElementById("save-the-date-title").textContent = t().sections.saveTheDate;
  document.getElementById("save-the-date-intro").textContent = t().saveTheDate.intro;
  initGallery(mergeMediaWithCaptions(), t().gallery);
}

function renderEvents() {
  if (!sections.events.enabled) {
    removeSection("programme");
    return;
  }

  document.getElementById("events-title").textContent = t().sections.events;
  document.getElementById("events-list").innerHTML = t().events
    .map(
      (e) => `
      <article class="event-card">
        <time class="event-time">${e.time}</time>
        <div class="event-body">
          <h3>${e.title}</h3>
          <p>${e.description}</p>
          <span class="event-location">${e.location}</span>
        </div>
      </article>`
    )
    .join("");
}

function renderDetails() {
  if (!sections.details.enabled) {
    removeSection("infos");
    return;
  }

  const tr = t();
  document.getElementById("details-title").textContent = tr.sections.details;
  document.getElementById("details-grid").innerHTML = tr.details
    .map((d) => {
      const link = d.link
        ? `<a href="${wedding.mapsUrl}" target="_blank" rel="noopener" class="detail-link">${d.link.label}</a>`
        : "";
      return `
      <article class="detail-card">
        <span class="detail-icon" aria-hidden="true">${d.icon}</span>
        <h3>${d.title}</h3>
        <p>${d.content.replace(/\n/g, "<br>")}</p>
        ${link}
      </article>`;
    })
    .join("");

  const mapLinks = document.getElementById("map-links");
  if (mapLinks) {
    mapLinks.innerHTML = `
      <a href="${wedding.mapsUrl}" target="_blank" rel="noopener" class="btn btn-outline">${tr.maps.google}</a>`;
  }
}

function renderAccommodation() {
  if (!sections.accommodation.enabled) {
    removeSection("hebergement");
    return;
  }

  const tr = t();
  document.getElementById("accommodation-title").textContent = tr.sections.accommodation;
  document.getElementById("accommodation-intro").textContent = tr.accommodation.intro;
  document.getElementById("accommodation-list").innerHTML = tr.accommodation.hotels
    .map(
      (h) => `
      <article class="hotel-card">
        <h3>${h.name}</h3>
        <ul class="hotel-meta">
          <li>📍 ${h.distance}</li>
          <li>💶 ${h.price}</li>
          <li>📞 <a href="tel:${h.phone.replace(/\s/g, "")}">${h.phone}</a></li>
        </ul>
        ${h.link ? `<a href="${h.link}" target="_blank" rel="noopener" class="detail-link">${tr.accommodation.book}</a>` : ""}
      </article>`
    )
    .join("");
}

function renderFaq() {
  if (!sections.faq.enabled) {
    removeSection("faq");
    return;
  }

  document.getElementById("faq-title").textContent = t().sections.faq;
  document.getElementById("faq-list").innerHTML = t().faq
    .map(
      (f) => `
      <details class="faq-item">
        <summary>${f.question}</summary>
        <p>${f.answer}</p>
      </details>`
    )
    .join("");
}

function renderRsvp() {
  if (!sections.rsvp.enabled) {
    removeSection("rsvp");
    return;
  }

  const tr = t().rsvp;
  document.getElementById("rsvp-title").textContent = t().sections.rsvp;
  document.getElementById("rsvp-message").textContent = formatTemplate(tr.message, {
    deadline: tr.deadline,
  });

  document.getElementById("label-rsvp-name").textContent = tr.labels.name;
  document.getElementById("label-rsvp-email").textContent = tr.labels.email;
  document.getElementById("label-rsvp-attendance").textContent = tr.labels.attendance;
  document.getElementById("label-rsvp-guests").textContent = tr.labels.guests;
  document.getElementById("label-rsvp-shuttle").textContent = tr.labels.shuttle;
  document.getElementById("label-rsvp-dietary").textContent = tr.labels.dietary;
  document.getElementById("label-rsvp-message").textContent = tr.labels.message;
  document.getElementById("rsvp-submit").textContent = tr.labels.submit;

  const optChoose = document.getElementById("opt-choose");
  const optYes = document.getElementById("opt-yes");
  const optNo = document.getElementById("opt-no");
  const optShuttle1330 = document.getElementById("opt-shuttle-1330");
  const optShuttle1400 = document.getElementById("opt-shuttle-1400");
  const optShuttleNo = document.getElementById("opt-shuttle-no");

  if (optChoose) {
    optChoose.textContent = tr.placeholders.choose;
    optChoose.value = "";
  }
  if (optYes) optYes.textContent = tr.placeholders.yes;
  if (optNo) optNo.textContent = tr.placeholders.no;
  if (optShuttle1330) optShuttle1330.textContent = tr.placeholders.shuttle1330;
  if (optShuttle1400) optShuttle1400.textContent = tr.placeholders.shuttle1400;
  if (optShuttleNo) optShuttleNo.textContent = tr.placeholders.shuttleNo;

  document.getElementById("rsvp-dietary").placeholder = tr.placeholders.dietary;
  document.getElementById("rsvp-message-field").placeholder = tr.placeholders.message;
}

function renderContact() {
  if (!sections.contact.enabled) {
    removeSection("contact");
    return;
  }

  const tr = t();
  document.getElementById("contact-title").textContent = tr.sections.contact;
  document.getElementById("contact-email").href = `mailto:${contact.email}`;
  document.getElementById("contact-email").textContent = contact.email;
  document.getElementById("contact-phone").href = `tel:${contact.phone.replace(/\s/g, "")}`;
  document.getElementById("contact-phone").textContent = contact.phone;

  const witnessesEl = document.getElementById("contact-witnesses");
  if (witnessesEl && tr.contact.witnesses?.length) {
    witnessesEl.innerHTML = tr.contact.witnesses
      .map(
        (w) => `
        <div class="witness-card">
          <span>${w.name}</span>
          <a href="tel:${w.phone.replace(/\s/g, "")}">${w.phone}</a>
        </div>`
      )
      .join("");
  }
}

function renderFooter() {
  document.getElementById("footer-text").textContent = formatTemplate(t().footer.text, {
    person1: couple.person1,
    person2: couple.person2,
  });
}

function renderLightboxAria() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = lightbox?.querySelector(".lightbox-close");
  if (lightbox) lightbox.setAttribute("aria-label", t().gallery.lightboxAria);
  if (closeBtn) closeBtn.setAttribute("aria-label", t().gallery.close);
}

function renderPage() {
  renderNav();
  renderHero();
  renderEssentials();
  renderSaveTheDate();
  renderEvents();
  renderDetails();
  renderAccommodation();
  renderFaq();
  renderRsvp();
  renderContact();
  renderFooter();
  renderLightboxAria();
  updateCountdown();
  updateEasterEggMessages(buildEasterEggConfig());
}

function buildEasterEggConfig() {
  const tr = t().easterEggs;
  return {
    wedding: { date: wedding.date },
    easterEggs: {
      konami: { enabled: easterEggs.konami.enabled, message: tr.konami },
      ampersand: { enabled: easterEggs.ampersand.enabled, message: tr.ampersand },
      logoClicks: {
        enabled: easterEggs.logoClicks.enabled,
        requiredClicks: easterEggs.logoClicks.requiredClicks,
        message: tr.logoClicks,
      },
      secretWord: {
        enabled: easterEggs.secretWord.enabled,
        word: easterEggs.secretWord.word,
        message: tr.secretWord,
      },
      footerHearts: { enabled: easterEggs.footerHearts.enabled, message: tr.footerHearts },
      countdown100: { enabled: easterEggs.countdown100.enabled, message: tr.countdown100 },
    },
  };
}

function updateCountdown() {
  const el = document.getElementById("countdown");
  if (!el) return;

  const tr = t().countdown;
  const target = new Date(wedding.date).getTime();
  const diff = target - Date.now();

  if (diff <= 0) {
    el.innerHTML = `<span class="countdown-label">${tr.today}</span>`;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  el.innerHTML = `
    <div class="countdown-item"><span class="countdown-value">${days}</span><span class="countdown-unit">${tr.days}</span></div>
    <div class="countdown-item"><span class="countdown-value">${hours}</span><span class="countdown-unit">${tr.hours}</span></div>
    <div class="countdown-item"><span class="countdown-value">${minutes}</span><span class="countdown-unit">${tr.min}</span></div>
    <div class="countdown-item"><span class="countdown-value">${seconds}</span><span class="countdown-unit">${tr.sec}</span></div>`;
  el.title = tr.hint;
}

function initCountdown() {
  clearInterval(countdownInterval);
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });

  menu?.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      menu.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
}

function initLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLocale(btn.dataset.lang));
  });
}

function initRsvpForm() {
  const form = document.getElementById("rsvp-form");
  const feedback = document.getElementById("rsvp-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    feedback.textContent = t().rsvp.successMessage;
    feedback.hidden = false;
    form.reset();
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function init() {
  initLocale();
  applyTheme();
  renderPage();
  initCountdown();
  initNav();
  initLangSwitch();
  initRsvpForm();
  initScrollReveal();
  initEasterEggs(buildEasterEggConfig());
  onLocaleChange(renderPage);

  const tr = t();
  const nav = document.querySelector(".nav");
  nav?.setAttribute("aria-label", tr.nav.aria);
  document.getElementById("nav-toggle")?.setAttribute("aria-label", tr.nav.openMenu);
}

init();
