/**
 * Données non traduites — textes dans i18n.js
 */
export const siteConfig = {
  couple: {
    person1: "Patricia",
    person2: "Juraj",
  },

  wedding: {
    date: "2027-03-20T15:00:00",
    mapsUrl: "https://maps.app.goo.gl/UHJKb2dV2LsLW7pU8",
  },

  theme: {
    colors: {
      background: "#f4efe6",
      surface: "#fffcf7",
      text: "#4a1a20",
      textMuted: "#7a5055",
      accent: "#6b2830",
      accentDark: "#4a1a20",
      gold: "#8f3d45",
    },
  },

  sections: {
    hero: { enabled: true, id: "accueil" },
    essentials: { enabled: true, id: "essentiel" },
    saveTheDate: { enabled: true, id: "save-the-date" },
    events: { enabled: true, id: "programme" },
    details: { enabled: true, id: "infos" },
    gifts: { enabled: true, id: "liste-mariage", nav: false },
    accommodation: { enabled: false, id: "hebergement" },
    faq: { enabled: false, id: "faq" },
    rsvp: { enabled: true, id: "rsvp" },
    contact: { enabled: true, id: "contact" },
  },

  saveTheDate: {
    media: [
      {
        type: "video",
        src: "assets/save-the-date/save-the-date.mp4",
        poster: "assets/save-the-date/video-poster.jpg",
        placeholder: false,
      },
    ],
  },

  contact: {
    people: [
      {
        name: "Juraj",
        email: "juraj.rosinsky@gmail.com",
        phone: "+41 76 737 40 42",
      },
      {
        name: "Patricia",
        email: "patricia.maizc@hotmail.com",
        phone: "+41 78 861 67 15",
      },
    ],
  },

  rsvp: {
    googleFormUrl: "https://forms.gle/LcBeSZZspYXHG2uT9",
  },

  bank: {
    accountName: "Patricia Maiz Calle",
    iban: "CH71 0878 1000 2317 8220 0",
    bic: "SWQBCHZZXXX",
    bankName: "Swissquote Bank SA",
    address: "Chemin de la Crétaux 33 Case postale 319\n1196 Gland\nSWITZERLAND",
  },

  easterEggs: {
    konami: { enabled: true },
    ampersand: { enabled: true },
    logoClicks: { enabled: true, requiredClicks: 5 },
    secretWord: { enabled: true, word: "200327" },
    footerHearts: { enabled: true },
    countdown100: { enabled: true },
  },
};
