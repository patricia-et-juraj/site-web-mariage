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
      dateDisplay: "Samedi 21 mars 2027",
      location: "Ranch des Rochettes, Ceyzériat",
      ctaRsvp: "Confirmer ma présence",
      ctaSaveTheDate: "Voir le Save the Date",
    },
    essentials: [
      { icon: "📅", label: "Date", value: "21 mars 2027" },
      { icon: "⏰", label: "Heure", value: "15h00 — cérémonie" },
      { icon: "📍", label: "Lieu", value: "Ranch des Rochettes, Ceyzériat" },
      { icon: "👔", label: "Tenue", value: "Chic décontracté — pas de blanc" },
      { icon: "✉️", label: "RSVP avant le", value: "1er février 2027" },
      { icon: "🎁", label: "Cadeaux", value: "Votre présence suffit" },
    ],
    saveTheDate: {
      intro:
        "Revivez notre annonce en images et en vidéo. Merci d'être à nos côtés pour cette aventure !",
      media: [
        { caption: "Notre vidéo Save the Date" },
        { caption: "L'annonce — photo 1" },
        { caption: "L'annonce — photo 2" },
      ],
    },
    events: [
      {
        time: "14h30",
        title: "Accueil des invités",
        description: "Arrivée et installation. Un verre de bienvenue vous attend.",
        location: "Ranch des Rochettes",
      },
      {
        time: "15h00",
        title: "Cérémonie",
        description: "Cérémonie au Ranch des Rochettes.",
        location: "Ranch des Rochettes",
      },
      {
        time: "17h00",
        title: "Vin d'honneur",
        description: "Cocktail et apéritif dans la cour.",
        location: "Cour du ranch",
      },
      {
        time: "19h30",
        title: "Dîner",
        description: "Repas assis en plusieurs services.",
        location: "Grange",
      },
      {
        time: "22h00",
        title: "Soirée dansante",
        description: "Ouverture du bal et fête jusqu'au bout de la nuit !",
        location: "Grange",
      },
      {
        time: "01h00",
        title: "Fin de soirée",
        description: "Dernière danse et départ des invités.",
        location: "—",
      },
    ],
    details: [
      {
        icon: "📍",
        title: "Adresse",
        content: "Ranch des Rochettes\n01350 Ceyzériat",
        link: { label: "Ouvrir dans Google Maps" },
      },
      {
        icon: "🚗",
        title: "Accès & parking",
        content: "Parking gratuit sur place.\nCovoiturage vivement encouragé !",
      },
      {
        icon: "🚆",
        title: "Transports",
        content:
          "Gare de Bourg-en-Bresse à environ 20 min.\nNavette possible sur demande (précisez dans le RSVP).",
      },
      {
        icon: "👗",
        title: "Tenue",
        content:
          "Tenue de cérémonie souhaitée — chic décontracté.\nMerci d'éviter le blanc.",
      },
      {
        icon: "👶",
        title: "Enfants",
        content: "Les enfants sont les bienvenus !",
      },
      {
        icon: "🍽️",
        title: "Régimes alimentaires",
        content:
          "Indiquez vos allergies ou régimes (végétarien, sans gluten…) dans le formulaire RSVP.",
      },
      {
        icon: "🎁",
        title: "Cadeaux",
        content:
          "Votre présence est notre plus beau cadeau.\nUne urne discrète sera disponible sur place si vous le souhaitez.",
      },
      {
        icon: "📸",
        title: "Photos",
        content:
          "Un photographe professionnel sera présent. Partagez vos photos avec #PatriciaEtJuraj2027.",
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
        answer: "La soirée se termine vers 1h du matin.",
      },
      {
        question: "Y a-t-il une navette ?",
        answer:
          "Une navette peut être organisée depuis la gare — précisez-le dans votre RSVP pour réserver une place.",
      },
      {
        question: "Puis-je prendre des photos pendant la cérémonie ?",
        answer:
          "Nous vous demandons une cérémonie unplugged — gardez vos téléphones et profitez du moment. Le photographe s'occupe du reste !",
      },
    ],
    rsvp: {
      deadline: "1er février 2027",
      message: "Merci de confirmer votre présence avant le {deadline}.",
      successMessage: "Merci ! Votre réponse a bien été enregistrée (démo locale).",
      labels: {
        name: "Nom complet",
        email: "Email",
        attendance: "Présence",
        guests: "Nombre de personnes",
        shuttle: "Navette depuis la gare",
        dietary: "Allergies / régime alimentaire",
        message: "Message (optionnel)",
        submit: "Envoyer",
      },
      placeholders: {
        choose: "— Choisir —",
        yes: "Oui, je serai présent(e)",
        no: "Non, je ne pourrai pas venir",
        shuttle1330: "Oui — départ 13h30",
        shuttle1400: "Oui — départ 14h00",
        shuttleNo: "Non merci",
        dietary: "Végétarien, sans gluten, allergies…",
        message: "Un mot pour les mariés…",
      },
    },
    contact: {
      emailLabel: "email",
      phoneLabel: "téléphone",
      witnesses: [
        { name: "Sophie (témoin de Patricia)", phone: "+33 6 11 11 11 11" },
        { name: "Lucas (témoin de Juraj)", phone: "+33 6 22 22 22 22" },
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
      konami: "🎉 Vous avez trouvé le code secret ! On compte sur vous pour faire danser tout le monde.",
      ampersand:
        "C'est ici, entre nos deux prénoms, que tout a commencé — un sourire, une rencontre, et le reste…",
      logoClicks:
        "Psst… Juraj a mis du temps à choisir la bague. Patricia a dit oui avant qu'il finisse sa phrase.",
      secretWord: "💍 21 · 03 · 27 — marquez la date, on a hâte de vous voir !",
      footerHearts: "Merci d'être dans notre vie ❤️",
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
      dateDisplay: "Sobota 21. marca 2027",
      location: "Ranch des Rochettes, Ceyzériat",
      ctaRsvp: "Potvrdiť účasť",
      ctaSaveTheDate: "Pozrieť Save the Date",
    },
    essentials: [
      { icon: "📅", label: "Dátum", value: "21. marca 2027" },
      { icon: "⏰", label: "Čas", value: "15:00 — obrad" },
      { icon: "📍", label: "Miesto", value: "Ranch des Rochettes, Ceyzériat" },
      { icon: "👔", label: "Oblečenie", value: "Elegantné casual — nie biela" },
      { icon: "✉️", label: "RSVP do", value: "1. februára 2027" },
      { icon: "🎁", label: "Darčeky", value: "Vaša prítomnosť nám stačí" },
    ],
    saveTheDate: {
      intro:
        "Prežite znova naše oznámenie vo fotografiách a videu. Ďakujeme, že ste súčasťou nášho príbehu!",
      media: [
        { caption: "Naše Save the Date video" },
        { caption: "Oznámenie — fotografia 1" },
        { caption: "Oznámenie — fotografia 2" },
      ],
    },
    events: [
      {
        time: "14:30",
        title: "Príchod hostí",
        description: "Príchod a ubytovanie sa. Na privítanie vás čaká drink.",
        location: "Ranch des Rochettes",
      },
      {
        time: "15:00",
        title: "Obrad",
        description: "Svadobný obrad v Ranch des Rochettes.",
        location: "Ranch des Rochettes",
      },
      {
        time: "17:00",
        title: "Prípitok",
        description: "Koktail a aperitív na dvore.",
        location: "Dvorec ranchu",
      },
      {
        time: "19:30",
        title: "Večera",
        description: "Slávnostná večera v niekoľkých chodoch.",
        location: "Stodola",
      },
      {
        time: "22:00",
        title: "Zábava",
        description: "Otvorenie tanca a párty až do neskorej noci!",
        location: "Stodola",
      },
      {
        time: "01:00",
        title: "Koniec večera",
        description: "Posledný tanec a odchod hostí.",
        location: "—",
      },
    ],
    details: [
      {
        icon: "📍",
        title: "Adresa",
        content: "Ranch des Rochettes\n01350 Ceyzériat",
        link: { label: "Otvoriť v Google Maps" },
      },
      {
        icon: "🚗",
        title: "Prístup a parkovanie",
        content: "Bezplatné parkovanie na mieste.\nSpolujazda je vítaná!",
      },
      {
        icon: "🚆",
        title: "Doprava",
        content:
          "Stanica Bourg-en-Bresse cca 20 min autom.\nKyvadlová doprava možná na požiadanie (uveďte v RSVP).",
      },
      {
        icon: "👗",
        title: "Oblečenie",
        content:
          "Slávnostné oblečenie — elegantné casual.\nProsíme, vyhnite sa bielej farbe.",
      },
      {
        icon: "👶",
        title: "Deti",
        content: "Deti sú vítané!",
      },
      {
        icon: "🍽️",
        title: "Stravovacie obmedzenia",
        content:
          "Uveďte alergie alebo režim (vegetariánske, bez lepku…) vo formulári RSVP.",
      },
      {
        icon: "🎁",
        title: "Darčeky",
        content:
          "Vaša prítomnosť je pre nás ten najkrajší darček.\nDiskrétna urna bude k dispozícii, ak budete chcieť.",
      },
      {
        icon: "📸",
        title: "Fotografie",
        content:
          "Profesionálny fotograf bude prítomný. Zdieľajte fotky s #PatriciaEtJuraj2027.",
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
        answer: "Večer sa končí okolo 1:00 ráno.",
      },
      {
        question: "Je k dispozícii kyvadlová doprava?",
        answer:
          "Kyvadlová doprava zo stanice môže byť zorganizovaná — uveďte to vo vašom RSVP na rezerváciu miesta.",
      },
      {
        question: "Môžem fotiť počas obradu?",
        answer:
          "Prosíme o unplugged obrad — odložte telefóny a užite si moment. O fotografie sa postará náš fotograf!",
      },
    ],
    rsvp: {
      deadline: "1. februára 2027",
      message: "Prosíme o potvrdenie účasti do {deadline}.",
      successMessage: "Ďakujeme! Vaša odpoveď bola zaznamenaná (lokálna ukážka).",
      labels: {
        name: "Celé meno",
        email: "Email",
        attendance: "Účasť",
        guests: "Počet osôb",
        shuttle: "Kyvadlová doprava zo stanice",
        dietary: "Alergie / stravovací režim",
        message: "Správa (voliteľné)",
        submit: "Odoslať",
      },
      placeholders: {
        choose: "— Vyberte —",
        yes: "Áno, prídem",
        no: "Nie, nemôžem prísť",
        shuttle1330: "Áno — odchod 13:30",
        shuttle1400: "Áno — odchod 14:00",
        shuttleNo: "Nie, ďakujem",
        dietary: "Vegetariánske, bez lepku, alergie…",
        message: "Pár slov pre mladomanželov…",
      },
    },
    contact: {
      emailLabel: "email",
      phoneLabel: "telefón",
      witnesses: [
        { name: "Sophie (svedok Patrície)", phone: "+33 6 11 11 11 11" },
        { name: "Lucas (svedok Juraja)", phone: "+33 6 22 22 22 22" },
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
      konami: "🎉 Našli ste tajný kód! Počítame s vami, že roztočíte parket.",
      ampersand:
        "Tu, medzi našimi menami, sa všetko začalo — úsmev, stretnutie a zvyšok príbehu…",
      logoClicks:
        "Psst… Juraj dlho vyberal prsteň. Patrícia povedala áno skôr, než dohovoril.",
      secretWord: "💍 21 · 03 · 27 — poznačte si dátum, tešíme sa na vás!",
      footerHearts: "Ďakujeme, že ste v našich životoch ❤️",
      countdown100: "Už len 100 dní… stres rastie, ale aj vzrušenie!",
    },
  },

  cs,
  en,
  es,
};
