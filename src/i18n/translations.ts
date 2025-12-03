/**
 * Centralized Translation File
 * Lilja Tours Website - English & French
 *
 * Usage in components:
 * import { translations } from '../i18n/translations';
 * const t = translations[currentLang];
 * {t.nav.dayTours}
 */

export type Language = "en" | "fr";

export const translations = {
  en: {
    // Navigation
    nav: {
      dayTours: "Day tours",
      multidayTours: "Multiday tours",
      experiences: "Experiences",
      blog: "Stories",
      about: "About",
      contact: "Contact",
    },

    // Language Switcher
    lang: {
      fr: "FR",
      en: "EN",
      french: "Français",
      english: "English",
    },

    // Call-to-Action Buttons
    cta: {
      sendQuoteRequest: "SEND QUOTE REQUEST",
      bookNow: "Book Now",
      bookThisTour: "Book This Tour",
      personalizeTour: "Personalize Your Tour",
      exploreTrip: "Explore Trip",
      exploreItinerary: "Explore itinerary",
      readMore: "Read More",
      sendBookingRequest: "Send Booking Request",
      sending: "Sending...",
    },

    // Forms
    form: {
      name: "Name",
      email: "Email Address",
      phone: "Phone",
      people: "Number of People",
      message: "Message",
      send: "Send",
      departureDate: "Departure Date",
      accommodation: "Accommodation",
      selectActivities: "Select Activities",
      selectAccommodationType: "Select accommodation type",
      selectOneOrMore: "Select one or more activities",
      yourName: "Your name",
      required: "*",
    },

    // Accommodation Types
    accommodation: {
      hotel4: "4* hotel",
      hotel3: "3* hotel",
      guesthouse: "Guesthouse",
      camping: "Camping (we provide comfortable equipments)",
      other: "Other",
    },

    // Cards & Pricing
    cards: {
      from: "From",
      duration: "Duration",
      season: "Season",
      krVehicle: "Kr / vehicle",
      plusAccommodation: "Plus accommodation and activities",
      by: "By",
    },

    // Difficulty Levels
    difficulty: {
      easy: "Easy",
      moderate: "Moderate",
      challenging: "Challenging",
    },

    // Footer
    footer: {
      explore: "Explore",
      connectWithUs: "Connect With Us",
      allRightsReserved: "All rights reserved",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      dayTours: "Day tours",
      multidayTours: "Multiday tours",
      experiences: "Experiences",
      blog: "Stories",
      contact: "Contact",
    },

    // Form Messages
    messages: {
      success:
        "Thank you! Your booking request has been sent. We'll contact you within 24 hours.",
      error:
        "Sorry, there was an error. Please try again or contact us at julien@lilja-tours.com",
      sending: "Sending your request...",
    },

    // Date & Time
    date: {
      locale: "en-US",
    },

    // Common Words
    common: {
      day: "Day",
    },
  },

  fr: {
    // Navigation
    nav: {
      dayTours: "Excursions",
      multidayTours: "Circuits",
      experiences: "Expériences",
      blog: "Histoires",
      about: "À propos",
      contact: "Contact",
    },

    // Language Switcher
    lang: {
      fr: "FR",
      en: "EN",
      french: "Français",
      english: "English",
    },

    // Call-to-Action Buttons
    cta: {
      sendQuoteRequest: "DEMANDE DE DEVIS",
      bookNow: "Réserver",
      bookThisTour: "Réserver ce circuit",
      personalizeTour: "Personnaliser",
      exploreTrip: "Voir le circuit",
      exploreItinerary: "Voir l'itinéraire",
      readMore: "Lire plus",
      sendBookingRequest: "Envoyer la demande",
      sending: "Envoi en cours...",
    },

    // Forms
    form: {
      name: "Nom",
      email: "Adresse e-mail",
      phone: "Téléphone",
      people: "Nombre de personnes",
      message: "Message",
      send: "Envoyer",
      departureDate: "Date de départ",
      accommodation: "Hébergement",
      selectActivities: "Sélectionner activités",
      selectAccommodationType: "Type d'hébergement",
      selectOneOrMore: "Une ou plusieurs activités",
      yourName: "Votre nom",
      required: "*",
    },

    // Accommodation Types
    accommodation: {
      hotel4: "Hôtel 4*",
      hotel3: "Hôtel 3*",
      guesthouse: "Guesthouse",
      camping: "Camping (équipement fourni)",
      other: "Autre",
    },

    // Cards & Pricing
    cards: {
      from: "À partir de",
      duration: "Durée",
      season: "Saison",
      krVehicle: "Kr / véhicule",
      plusAccommodation: "Hébergement et activités en sus",
      by: "Par",
    },

    // Difficulty Levels
    difficulty: {
      easy: "Facile",
      moderate: "Modéré",
      challenging: "Difficile",
    },

    // Footer
    footer: {
      explore: "Explorer",
      connectWithUs: "Contactez-nous",
      allRightsReserved: "Tous droits réservés",
      privacyPolicy: "Confidentialité",
      termsConditions: "Conditions générales",
      dayTours: "Circuits journée",
      multidayTours: "Circuits multi-jours",
      experiences: "Expériences",
      blog: "Histoires",
      contact: "Contact",
    },

    // Form Messages
    messages: {
      success:
        "Merci ! Votre demande a été envoyée. Nous vous contacterons sous 24h.",
      error:
        "Désolé, une erreur s'est produite. Réessayez ou contactez-nous : julien@lilja-tours.com",
      sending: "Envoi en cours...",
    },

    // Date & Time
    date: {
      locale: "fr-FR",
    },

    // Common Words
    common: {
      day: "Jour",
    },
  },
};

/**
 * URL mapping helper - returns correct URL based on language
 */
export const urls = {
  home: { en: "/", fr: "/fr/" },
  dayTours: {
    en: "/private-day-tours-iceland/",
    fr: "/fr/circuits-prives-islande/",
  },
  multidayTours: {
    en: "/multiday-tours-iceland/",
    fr: "/fr/circuits-multi-jours-islande/",
  },
  experiences: {
    en: "/partner-experiences-iceland/",
    fr: "/fr/experiences-partenaires-islande/",
  },
  blog: { en: "/blog/", fr: "/fr/blog/" },
  about: { en: "/about/", fr: "/fr/about/" },
  contact: { en: "/contact/", fr: "/fr/contact/" },
  privacyPolicy: { en: "/privacy-policy/", fr: "/fr/privacy-policy/" },
  termsConditions: {
    en: "/terms-and-conditions/",
    fr: "/fr/terms-and-conditions/",
  },
};

/**
 * Helper function to get translations for a specific language
 * @param lang - Language code ('en' or 'fr')
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language) {
  return translations[lang];
}

/**
 * Helper function to get a nested translation value
 * @param lang - Language code ('en' or 'fr')
 * @param key - Dot-notation key (e.g., 'nav.dayTours')
 * @returns Translated string
 */
export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key} for language: ${lang}`);
      return key;
    }
  }

  return value;
}
