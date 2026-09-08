/**
 * Données non traduites — textes dans i18n.js
 */
export const siteConfig = {
  couple: {
    person1: "Patricia",
    person2: "Juraj",
  },

  wedding: {
    date: "2027-03-21T15:00:00",
    mapsUrl: "https://maps.app.goo.gl/UHJKb2dV2LsLW7pU8",
  },

  theme: {
    colors: {
      background: "#f7f4fa",
      surface: "#ffffff",
      text: "#2e1520",
      textMuted: "#6e5a72",
      accent: "#9b87b8",
      accentDark: "#722f37",
      gold: "#a04558",
    },
  },

  sections: {
    hero: { enabled: true, id: "accueil" },
    essentials: { enabled: true, id: "essentiel" },
    saveTheDate: { enabled: true, id: "save-the-date" },
    events: { enabled: true, id: "programme" },
    details: { enabled: true, id: "infos" },
    accommodation: { enabled: true, id: "hebergement" },
    faq: { enabled: true, id: "faq" },
    rsvp: { enabled: true, id: "rsvp" },
    contact: { enabled: true, id: "contact" },
  },

  saveTheDate: {
    media: [
      {
        type: "video",
        src: "assets/save-the-date/video.mp4",
        poster: "assets/save-the-date/video-poster.svg",
        placeholder: true,
      },
      { type: "image", src: "assets/save-the-date/photo-1.svg" },
      { type: "image", src: "assets/save-the-date/photo-2.svg" },
    ],
  },

  contact: {
    email: "juraj.rosinsky@gmail.com",
    phone: "+41 76 737 40 42",
  },

  easterEggs: {
    konami: { enabled: true },
    ampersand: { enabled: true },
    logoClicks: { enabled: true, requiredClicks: 5 },
    secretWord: { enabled: true, word: "210327" },
    footerHearts: { enabled: true },
    countdown100: { enabled: true },
  },
};
