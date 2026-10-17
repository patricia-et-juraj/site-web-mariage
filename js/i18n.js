import { cs, en, es } from "./i18n/extra.js";

export const translations = {
  fr: {
    meta: {
      description: "Mariage de Patricia et Juraj — rejoignez-nous pour célébrer notre union.",
      titleSuffix: "Mariage",
    },
    nav: {
      aria: "Navigation principale",
      openMenu: "Ouvrir le menu",
    },
    lang: {
      switch: "Changer la langue",
      fr: "Français",
      sk: "Slovaque",
      cs: "Tchèque",
      en: "Anglais",
      es: "Espagnol",
    },
    sections: {
      essentials: "L'essentiel",
      saveTheDate: "Save the Date",
      events: "Le programme",
      details: "Infos pratiques",
      accommodation: "Hébergement",
      faq: "Questions fréquentes",
      rsvp: "Confirmer votre présence",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Nous nous marions",
      tagline: "Nous avons hâte de célébrer ce jour avec vous",
      dateDisplay: "Samedi 20 mars 2027",
      location: "Ranch des Rochettes, Ceyzériat",
      ctaRsvp: "Confirmer ma présence",
      ctaSaveTheDate: "Voir le Save the Date",
    },
    essentials: [
      { label: "Date", value: "20 mars 2027" },
      { label: "Heure", value: "15h — cérémonie" },
      { label: "Lieu", value: "Ranch des Rochettes, Ceyzériat" },
      { label: "RSVP avant le", value: "1er février 2027" },
      { label: "Cadeaux", value: "Votre présence suffit" },
    ],
    saveTheDate: {
      intro:
        "Revivez notre Save the Date en vidéo. Merci d'être à nos côtés pour cette aventure !",
      media: [{ caption: "Notre vidéo Save the Date" }],
    },
    events: [
      { kind: "day", label: "Samedi 15h" },
      {
        title: "Cérémonie",
        description: "Cérémonie au Ranch des Rochettes.",
        location: "Ranch des Rochettes",
      },
      {
        title: "Vin d'honneur",
        description: "Cocktail et apéritif dans la cour — c'est aussi le moment de la séance photo.",
        location: "Cour du ranch",
      },
      {
        title: "Dîner",
        description: "Repas assis en plusieurs services.",
        location: "Grange",
      },
      {
        title: "Soirée dansante",
        description: "Ouverture du bal et fête jusqu'au bout de la nuit !",
        location: "Grange",
      },
      { kind: "day", label: "Dimanche 9h30" },
      {
        title: "Brunch",
        description: "Brunch de 3 heures pour prolonger les retrouvailles.",
        location: "Ranch des Rochettes",
      },
    ],
    details: [
      {
        title: "Adresse",
        content: "Ranch des Rochettes\n01350 Ceyzériat",
        link: { label: "Ouvrir dans Google Maps" },
      },
      {
        title: "Accès & parking",
        content: "Parking gratuit sur place.",
      },
      {
        title: "Hébergement",
        content: "Nous vous accueillons sur place au Ranch des Rochettes pour la nuit du mariage.",
      },
      {
        title: "Transports",
        content:
          "Gare de Bourg-en-Bresse à environ 20 min en voiture.\nPas de navette : sans voiture, contactez-nous ou précisez-le dans le RSVP — nous vous mettrons en relation avec d'autres invités.",
      },
      {
        title: "Enfants",
        content: "Les enfants sont les bienvenus !",
      },
      {
        title: "Régimes alimentaires",
        content:
          "Indiquez vos allergies ou régimes (végétarien, sans gluten…) dans le formulaire RSVP.",
      },
      {
        title: "Cadeaux",
        content:
          "Votre présence est notre plus beau cadeau.\nUne urne discrète sera disponible sur place si vous le souhaitez.",
      },
      {
        title: "Photos",
        content:
          "Un photographe professionnel sera présent. C'est lui qui prendra les photos de la cérémonie.",
      },
    ],
    maps: {
      google: "Google Maps",
    },
    accommodation: {
      intro:
        "Quelques hébergements à proximité — pensez à réserver tôt, le printemps est une période chargée.",
      book: "Réserver",
      hotels: [
        {
          name: "Hôtel Le Ceyzériat",
          distance: "5 min en voiture",
          price: "À partir de 80 € / nuit",
          phone: "+33 4 00 00 00 01",
          link: "https://example.com",
        },
        {
          name: "Chambre d'hôtes du Bugey",
          distance: "10 min en voiture",
          price: "À partir de 70 € / nuit",
          phone: "+33 4 00 00 00 02",
          link: "https://example.com",
        },
        {
          name: "Bourg-en-Bresse centre",
          distance: "25 min en voiture",
          price: "À partir de 60 € / nuit",
          phone: "+33 4 00 00 00 03",
          link: "https://example.com",
        },
      ],
    },
    faq: [
      {
        question: "Puis-je venir accompagné(e) ?",
        answer:
          "Chaque invitation est nominative. Si un +1 est prévu, il est mentionné sur votre faire-part. Sinon, merci de nous contacter.",
      },
      {
        question: "Jusqu'à quelle heure dure la fête ?",
        answer:
          "Il n'y a pas d'heure de fin — profitez de la soirée et dansez tant que vous en avez envie !",
      },
      {
        question: "Y a-t-il une navette ?",
        answer:
          "Non, il n'y a pas de navette. Si vous n'avez pas de voiture, écrivez-nous ou indiquez-le dans le RSVP : nous ferons le lien avec d'autres invités pour le trajet.",
      },
      {
        question: "Puis-je prendre des photos pendant la cérémonie ?",
        answer:
          "Un photographe professionnel s'occupera des photos de la cérémonie. Profitez du moment !",
      },
    ],
    rsvp: {
      deadline: "1er février 2027",
      message: "Merci de confirmer votre présence avant le {deadline}.",
      formCta: "Répondre au formulaire Google",
      formHint:
        "Remplissez le formulaire ci-dessous ou ouvrez-le dans un nouvel onglet. Vos réponses seront enregistrées automatiquement.",
      notConfiguredMessage:
        "Le formulaire sera bientôt en ligne. En attendant, contactez-nous par email ou téléphone.",
    },
    contact: {
      emailLabel: "email",
      phoneLabel: "téléphone",
      witnesses: [
        { name: "Marina (témoin de Patricia)", phone: "+33 6 11 11 11 11" },
        { name: "Adrien (témoin de Juraj)", phone: "+33 6 22 22 22 22" },
      ],
    },
    footer: {
      text: "Avec amour, {person1} & {person2}",
    },
    countdown: {
      days: "jours",
      hours: "heures",
      min: "min",
      sec: "sec",
      today: "C'est aujourd'hui !",
      hint: "Psst… un secret se cache peut-être ici le jour J − 100",
    },
    gallery: {
      videoBadge: "Vidéo à ajouter",
      placeholderLine1: "Ajoutez votre vidéo dans",
      placeholderLine2: "Puis mettez",
      placeholderLine2b: "dans config.js",
      close: "Fermer",
      lightboxAria: "Média agrandi",
      playVideo: "Lire la vidéo",
      enlarge: "Agrandir",
    },
    easterEggs: {
      konami: "Vous avez trouvé le code secret ! On compte sur vous pour faire danser tout le monde.",
      ampersand:
        "C'est ici, entre nos deux prénoms, que tout a commencé — un sourire, une rencontre, et le reste…",
      logoClicks:
        "Psst… Juraj a mis du temps à choisir la bague. Patricia a dit oui avant qu'il finisse sa phrase.",
      secretWord: "20 · 03 · 27 — marquez la date, on a hâte de vous voir !",
      footerHearts: "Merci d'être dans notre vie",
      countdown100: "Plus que 100 jours… le stress monte, l'excitation aussi !",
    },
  },

  sk: {
    meta: {
      description: "Svadba Patrície a Juraja — pripojte sa k nám a oslávte s nami náš veľký deň.",
      titleSuffix: "Svadba",
    },
    nav: {
      aria: "Hlavná navigácia",
      openMenu: "Otvoriť menu",
    },
    lang: {
      switch: "Zmeniť jazyk",
      fr: "Francúzština",
      sk: "Slovenčina",
      cs: "Čeština",
      en: "Angličtina",
      es: "Španielčina",
    },
    sections: {
      essentials: "To najdôležitejšie",
      saveTheDate: "Save the Date",
      events: "Program",
      details: "Praktické informácie",
      accommodation: "Ubytovanie",
      faq: "Často kladené otázky",
      rsvp: "Potvrďte svoju účasť",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Berieme sa",
      tagline: "Tešíme sa, že tento deň oslávime spolu s vami",
      dateDisplay: "Sobota 20. marca 2027",
      location: "Ranch des Rochettes, Ceyzériat",
      ctaRsvp: "Potvrdiť účasť",
      ctaSaveTheDate: "Pozrieť Save the Date",
    },
    essentials: [
      { label: "Dátum", value: "20. marca 2027" },
      { label: "Čas", value: "15:00 — obrad" },
      { label: "Miesto", value: "Ranch des Rochettes, Ceyzériat" },
      { label: "RSVP do", value: "1. februára 2027" },
      { label: "Darčeky", value: "Vaša prítomnosť nám stačí" },
    ],
    saveTheDate: {
      intro:
        "Prežite znova naše Save the Date vo videu. Ďakujeme, že ste súčasťou nášho príbehu!",
      media: [{ caption: "Naše Save the Date video" }],
    },
    events: [
      { kind: "day", label: "Sobota 15:00" },
      {
        title: "Obrad",
        description: "Svadobný obrad v Ranch des Rochettes.",
        location: "Ranch des Rochettes",
      },
      {
        title: "Prípitok",
        description: "Koktail a aperitív na dvore — zároveň aj čas na spoločné fotenie.",
        location: "Dvorec ranchu",
      },
      {
        title: "Večera",
        description: "Slávnostná večera v niekoľkých chodoch.",
        location: "Stodola",
      },
      {
        title: "Zábava",
        description: "Otvorenie tanca a párty až do neskorej noci!",
        location: "Stodola",
      },
      { kind: "day", label: "Nedeľa 9:30" },
      {
        title: "Brunch",
        description: "Trojhodinový brunch na pokračovanie oslavy.",
        location: "Ranch des Rochettes",
      },
    ],
    details: [
      {
        title: "Adresa",
        content: "Ranch des Rochettes\n01350 Ceyzériat",
        link: { label: "Otvoriť v Google Maps" },
      },
      {
        title: "Prístup a parkovanie",
        content: "Bezplatné parkovanie na mieste.",
      },
      {
        title: "Ubytovanie",
        content: "Počas svadobnej noci vás ubytujeme priamo v Ranch des Rochettes.",
      },
      {
        title: "Doprava",
        content:
          "Stanica Bourg-en-Bresse cca 20 min autom.\nBez kyvadlovej dopravy: ak nemáte auto, kontaktujte nás alebo uveďte to v RSVP — spojíme vás s inými hosťami.",
      },
      {
        title: "Deti",
        content: "Deti sú vítané!",
      },
      {
        title: "Stravovacie obmedzenia",
        content:
          "Uveďte alergie alebo režim (vegetariánske, bez lepku…) vo formulári RSVP.",
      },
      {
        title: "Darčeky",
        content:
          "Vaša prítomnosť je pre nás ten najkrajší darček.\nDiskrétna urna bude k dispozícii, ak budete chcieť.",
      },
      {
        title: "Fotografie",
        content:
          "Profesionálny fotograf bude prítomný. On sa postará o fotografie z obradu.",
      },
    ],
    maps: {
      google: "Google Maps",
    },
    accommodation: {
      intro:
        "Niekoľko ubytovaní v okolí — rezervujte včas, jar býva rušná sezóna.",
      book: "Rezervovať",
      hotels: [
        {
          name: "Hôtel Le Ceyzériat",
          distance: "5 min autom",
          price: "Od 80 € / noc",
          phone: "+33 4 00 00 00 01",
          link: "https://example.com",
        },
        {
          name: "Chambre d'hôtes du Bugey",
          distance: "10 min autom",
          price: "Od 70 € / noc",
          phone: "+33 4 00 00 00 02",
          link: "https://example.com",
        },
        {
          name: "Bourg-en-Bresse centrum",
          distance: "25 min autom",
          price: "Od 60 € / noc",
          phone: "+33 4 00 00 00 03",
          link: "https://example.com",
        },
      ],
    },
    faq: [
      {
        question: "Môžem prísť s doprovodom?",
        answer:
          "Každé pozvanie je osobné. Ak je doprovod plánovaný, je uvedený na vašej pozvánke. Inak nás prosím kontaktujte.",
      },
      {
        question: "Do kedy trvá oslava?",
        answer:
          "Oslava nemá stanovený koniec — tancujte, kým vás to baví!",
      },
      {
        question: "Je k dispozícii kyvadlová doprava?",
        answer:
          "Nie, kyvadlová doprava nebude. Ak nemáte auto, napíšte nám alebo uveďte to v RSVP — spojíme vás s inými hosťami na cestu.",
      },
      {
        question: "Môžem fotiť počas obradu?",
        answer:
          "O fotografie z obradu sa postará profesionálny fotograf. Užite si chvíľu!",
      },
    ],
    rsvp: {
      deadline: "1. februára 2027",
      message: "Prosíme o potvrdenie účasti do {deadline}.",
      formCta: "Odpovedať cez Google Formulár",
      formHint:
        "Vyplňte formulár nižšie alebo ho otvorte v novom okne. Odpovede sa uložia automaticky.",
      notConfiguredMessage:
        "Formulár bude čoskoro online. Medzitým nás kontaktujte emailom alebo telefónom.",
    },
    contact: {
      emailLabel: "email",
      phoneLabel: "telefón",
      witnesses: [
        { name: "Marina (svedkyňa Patrície)", phone: "+33 6 11 11 11 11" },
        { name: "Adrien (svedok Juraja)", phone: "+33 6 22 22 22 22" },
      ],
    },
    footer: {
      text: "S láskou, {person1} & {person2}",
    },
    countdown: {
      days: "dní",
      hours: "hodín",
      min: "min",
      sec: "sek",
      today: "Je to dnes!",
      hint: "Psst… možno sa tu skrýva tajomstvo 100 dní pred svadbou",
    },
    gallery: {
      videoBadge: "Video bude doplnené",
      placeholderLine1: "Pridajte video do",
      placeholderLine2: "Potom nastavte",
      placeholderLine2b: "v config.js",
      close: "Zavrieť",
      lightboxAria: "Zväčšené médium",
      playVideo: "Prehrať video",
      enlarge: "Zväčšiť",
    },
    easterEggs: {
      konami: "Našli ste tajný kód! Počítame s vami, že roztočíte parket.",
      ampersand:
        "Tu, medzi našimi menami, sa všetko začalo — úsmev, stretnutie a zvyšok príbehu…",
      logoClicks:
        "Psst… Juraj dlho vyberal prsteň. Patrícia povedala áno skôr, než dohovoril.",
      secretWord: "20 · 03 · 27 — poznačte si dátum, tešíme sa na vás!",
      footerHearts: "Ďakujeme, že ste v našich životoch",
      countdown100: "Už len 100 dní… stres rastie, ale aj vzrušenie!",
    },
  },

  cs,
  en,
  es,
};
