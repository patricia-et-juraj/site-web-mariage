import { siteConfig } from "./config.js";
import { getTranslations, getLocale, setLocale, onLocaleChange, initLocale, formatTemplate } from "./locale.js";
import { initGallery, openSaveTheDate } from "./gallery.js";
import { initEasterEggs, updateEasterEggMessages } from "./easter-eggs.js";
const { couple, wedding, theme, sections, saveTheDate, contact, easterEggs, bank } = siteConfig;

let countdownInterval;

function t() {
  return getTranslations();
}

function venueLink(text) {
  if (!text || !wedding.mapsUrl) return text ?? "";
  return String(text).replaceAll(
    "Ranch des Rochettes",
    `<a href="${wedding.mapsUrl}" class="venue-link" target="_blank" rel="noopener noreferrer">Ranch des Rochettes</a>`
  );
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

function getGoogleFormUrl() {
  return siteConfig.rsvp?.googleFormUrl?.trim() || "";
}

function applyRsvpLinks(formUrl) {
  const heroCta = document.getElementById("hero-cta-rsvp");
  const formLink = document.getElementById("rsvp-form-link");

  [heroCta, formLink].forEach((el) => {
    if (!el) return;
    if (formUrl) {
      el.href = formUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.href = "#rsvp";
      el.removeAttribute("target");
      el.removeAttribute("rel");
    }
  });
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
  const logo = document.getElementById("nav-logo");
  if (logo) {
    logo.textContent = `${couple.person1.charAt(0)} & ${couple.person2.charAt(0)}`;
  }

  nav.innerHTML = Object.entries(sections)
    .filter(([, s]) => s.enabled && s.nav !== false && s.id !== "accueil")
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
  document.getElementById("hero-names").innerHTML =
    `${couple.person1} <span class="hero-amp" id="hero-amp" title="?">&</span> ${couple.person2}`;
  document.getElementById("hero-date").textContent = tr.hero.dateDisplay;
  document.getElementById("hero-location").innerHTML = venueLink(tr.hero.location);
  document.getElementById("hero-tagline").textContent = tr.hero.tagline;

  const ctaRsvp = document.getElementById("hero-cta-rsvp");
  const ctaRsvpHint = document.getElementById("hero-cta-rsvp-hint");
  const ctaStd = document.getElementById("hero-cta-save-the-date");
  if (ctaRsvp) ctaRsvp.textContent = tr.hero.ctaRsvp;
  if (ctaRsvpHint) ctaRsvpHint.textContent = tr.hero.ctaRsvpHint;
  if (ctaStd) ctaStd.textContent = tr.hero.ctaSaveTheDate;

  document.title = `${couple.person1} & ${couple.person2} - ${tr.meta.titleSuffix}`;
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
        <p class="essential-label">${e.label}</p>
        <p class="essential-value">${venueLink(e.value)}</p>
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
  initGallery(mergeMediaWithCaptions(), t().gallery);
}

function renderEvents() {
  if (!sections.events.enabled) {
    removeSection("programme");
    return;
  }

  document.getElementById("events-title").textContent = t().sections.events;
  document.getElementById("events-list").innerHTML = t().events
    .map((e) => {
      if (e.kind === "day") {
        return `<div class="event-day"><p class="event-day-label">${e.label}</p></div>`;
      }
      return `
      <article class="event-card">
        <div class="event-body">
          <h3>${e.time ? `<span class="event-time">${e.time}</span> ` : ""}${e.title}</h3>
          <p>${venueLink(e.description)}</p>
          <span class="event-location">${venueLink(e.location)}</span>
        </div>
      </article>`;
    })
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
        ? `<a href="${wedding.mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary detail-maps-btn">${d.link.label}</a>`
        : "";
      const more =
        d.more && sections.gifts?.enabled
          ? `<button type="button" class="btn btn-primary detail-maps-btn" data-open-gifts>${tr.gifts.seeMore}</button>`
          : "";
      const packId = d.more && sections.gifts?.enabled ? ` id="gift-pack"` : "";
      return `
      <article class="detail-card"${packId}>
        <h3>${d.title}</h3>
        <p>${venueLink(d.content.replace(/\n/g, "<br>"))}</p>
        ${link}${more}
      </article>`;
    })
    .join("");
}

function renderGifts() {
  const overlay = document.getElementById("gifts-overlay");
  if (!sections.gifts.enabled) {
    overlay?.setAttribute("hidden", "");
    return;
  }
  if (!document.getElementById("gifts-title")) return;

  const tr = t().gifts;
  const label = tr.ibanCta || "IBAN";
  document.getElementById("gifts-title").textContent = t().sections.gifts;
  const intro = document.getElementById("gifts-intro");
  if (intro) {
    intro.innerHTML = tr.intro.replace(
      /IBAN/g,
      `<button type="button" class="iban-inline" data-toggle-iban aria-expanded="false" aria-controls="gifts-iban">${label}</button>`
    );
  }
  const ibanBox = document.getElementById("gifts-iban");
  if (ibanBox && bank) {
    ibanBox.innerHTML = `
      <p class="bank-name">${bank.accountName}</p>
      <p class="bank-iban">${bank.iban}</p>
      <p>${bank.bic}</p>
      <p>${bank.bankName}</p>
      <p>${bank.address.replace(/\n/g, "<br>")}</p>`;
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
          <li>${h.distance}</li>
          <li>${h.price}</li>
          <li>${h.phone}</li>
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
  const formUrl = getGoogleFormUrl();

  document.getElementById("rsvp-title").textContent = t().sections.rsvp;
  document.getElementById("rsvp-message").textContent = formatTemplate(tr.message, {
    deadline: tr.deadline,
  });
  document.getElementById("rsvp-hint").textContent = t().hero.ctaRsvpHint;

  const formLink = document.getElementById("rsvp-form-link");
  formLink.textContent = tr.formCta;

  if (formUrl) {
    formLink.hidden = false;
    applyRsvpLinks(formUrl);
  } else {
    formLink.hidden = true;
    applyRsvpLinks("");
  }
}

function renderContact() {
  if (!sections.contact.enabled) {
    removeSection("contact");
    return;
  }

  const tr = t();
  document.getElementById("contact-title").textContent = tr.sections.contact;

  const peopleEl = document.getElementById("contact-people");
  if (peopleEl) {
    peopleEl.innerHTML = (contact.people ?? [])
      .map(
        (p) => `
        <div class="contact-person">
          <span class="contact-person-name">${p.name}</span>
          <a class="contact-person-email" href="mailto:${p.email}">${p.email}</a>
          <a class="contact-person-phone" href="tel:${String(p.phone).replace(/\s+/g, "")}">${p.phone}</a>
        </div>`
      )
      .join("");
  }

  const witnessesEl = document.getElementById("contact-witnesses");
  if (witnessesEl && tr.contact.witnesses?.length) {
    witnessesEl.innerHTML = tr.contact.witnesses
      .map(
        (w) => `
        <div class="witness-card">
          <span>${w.name}</span>
          ${w.phone ? `<a href="tel:${String(w.phone).replace(/\s+/g, "")}">${w.phone}</a>` : ""}
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
  const giftsClose = document.querySelector(".gifts-overlay-close");
  if (giftsClose) giftsClose.setAttribute("aria-label", t().gallery.close);
}

function renderPage() {
  renderNav();
  renderHero();
  renderEssentials();
  renderSaveTheDate();
  renderEvents();
  renderDetails();
  renderGifts();
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

function closeMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  menu?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
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
      closeMobileNav();
    }
  });
}

function initSaveTheDateClicks() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("#hero-cta-save-the-date, a.nav-link[href='#save-the-date']");
    if (!trigger) return;
    e.preventDefault();
    closeMobileNav();
    openSaveTheDate();
  });
}

function initGiftsOverlay() {
  const overlay = document.getElementById("gifts-overlay");
  if (!overlay) return;

  const scene = overlay.querySelector(".gift-scene");
  let timers = [];

  function clearTimers() {
    timers.forEach((id) => clearTimeout(id));
    timers = [];
  }

  function placeOverCard() {
    const card = document.getElementById("gift-pack");
    if (!card || !scene) return;
    const rect = card.getBoundingClientRect();
    scene.style.top = `${rect.top}px`;
    scene.style.left = `${rect.left}px`;
    scene.style.width = `${rect.width}px`;
    scene.style.height = `${rect.height}px`;
  }

  function close() {
    clearTimers();
    overlay.classList.remove("is-dim", "is-center", "is-lid", "is-full", "is-reveal");
    overlay.hidden = true;
    const ibanBox = document.getElementById("gifts-iban");
    if (ibanBox) ibanBox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function open() {
    if (!sections.gifts.enabled || !overlay.hidden) return;
    clearTimers();
    overlay.classList.remove("is-dim", "is-center", "is-lid", "is-full", "is-reveal");
    placeOverCard();
    overlay.hidden = false;
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      scene.style.top = "";
      scene.style.left = "";
      scene.style.width = "";
      scene.style.height = "";
      overlay.classList.add("is-dim", "is-full", "is-reveal");
      return;
    }

    void scene.offsetWidth;
    overlay.classList.add("is-dim");
    scene.style.top = "";
    scene.style.left = "";
    scene.style.width = "";
    scene.style.height = "";
    overlay.classList.add("is-center");
    timers.push(setTimeout(() => overlay.classList.add("is-lid"), 560));
    timers.push(setTimeout(() => overlay.classList.add("is-full"), 1180));
    timers.push(setTimeout(() => overlay.classList.add("is-reveal"), 1880));
  }

  function toggleIban(trigger) {
    const box = document.getElementById("gifts-iban");
    if (!box) return;
    const open = !box.classList.contains("is-open");
    box.classList.toggle("is-open", open);
    overlay.querySelectorAll("[data-toggle-iban]").forEach((el) => {
      el.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  overlay.addEventListener("click", (e) => {
    const ibanTrigger = e.target.closest("[data-toggle-iban]");
    if (ibanTrigger) {
      e.preventDefault();
      e.stopPropagation();
      toggleIban(ibanTrigger);
      return;
    }
    if (e.target.closest("[data-close-gifts]")) {
      e.preventDefault();
      close();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-gifts]")) {
      e.preventDefault();
      close();
      return;
    }
    if (e.target.closest("[data-toggle-iban]")) return;
    if (e.target.closest("[data-open-gifts], #gift-pack")) open();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
}

function initLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLocale(btn.dataset.lang));
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
  initSaveTheDateClicks();
  initGiftsOverlay();
  initLangSwitch();
  initScrollReveal();
  initEasterEggs(buildEasterEggConfig());
  onLocaleChange(renderPage);

  const tr = t();
  const nav = document.querySelector(".nav");
  nav?.setAttribute("aria-label", tr.nav.aria);
  document.getElementById("nav-toggle")?.setAttribute("aria-label", tr.nav.openMenu);
}

init();
