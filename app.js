
/* =====================================
   TECH SAATHI BY DIV
   Welcome and language navigation
   ===================================== */

"use strict";

const welcomeScreen = document.getElementById("welcome-screen");
const languageScreen = document.getElementById("language-screen");

const getStartedButton = document.getElementById("get-started-btn");
const backButton = document.getElementById("back-to-welcome");
const languageCards = document.querySelectorAll(".language-card");

let selectedLanguage = "en";

const translations = {
  en: {
    htmlLang: "en",
    back: "Back",
    eyebrow: "LET'S GET STARTED",
    title: "Choose your language",
    description: "Select the language you're most comfortable with.",
    note: "You can change your language later in Settings."
  },
  hi: {
    htmlLang: "hi",
    back: "वापस",
    eyebrow: "शुरू करें",
    title: "अपनी भाषा चुनें",
    description: "वह भाषा चुनें जिसमें आप सबसे सहज महसूस करते हैं।",
    note: "आप बाद में सेटिंग्स में अपनी भाषा बदल सकते हैं।"
  },
  bn: {
    htmlLang: "bn",
    back: "ফিরে যান",
    eyebrow: "শুরু করা যাক",
    title: "আপনার ভাষা বেছে নিন",
    description: "আপনার পছন্দের ভাষাটি নির্বাচন করুন।",
    note: "আপনি পরে সেটিংস থেকে ভাষা পরিবর্তন করতে পারবেন।"
  }
};

function showScreen(screenToShow) {
  const screens = [welcomeScreen, languageScreen];

  screens.forEach((screen) => {
    const isVisible = screen === screenToShow;

    screen.hidden = !isVisible;
    screen.classList.toggle("active", isVisible);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openLanguageScreen() {
  showScreen(languageScreen);
}

function openWelcomeScreen() {
  showScreen(welcomeScreen);
}

function selectLanguage(languageCode) {
  if (!translations[languageCode]) {
    return;
  }

  selectedLanguage = languageCode;

  const language = translations[selectedLanguage];

  document.documentElement.lang = language.htmlLang;

  document.getElementById("back-label").textContent = language.back;
  document.getElementById("language-eyebrow").textContent = language.eyebrow;
  document.getElementById("language-title").textContent = language.title;
  document.getElementById("language-description").textContent =
    language.description;
  document.getElementById("language-note").textContent = language.note;

  /*
   * The language choice is stored in memory for now.
   * Persistent language preferences can be added later.
   * The next account screen will be implemented in a later step.
   */

  console.log("Selected language:", selectedLanguage);

  // Temporary confirmation until the account screen is implemented.
  const messages = {
    en: "English selected! The account screen is coming next.",
    hi: "हिन्दी चुनी गई! अगली स्क्रीन पर खाता बनाने का विकल्प होगा।",
    bn: "বাংলা নির্বাচন করা হয়েছে! পরের ধাপে অ্যাকাউন্ট স্ক্রিন আসবে।"
  };

  window.alert(messages[selectedLanguage]);
}

getStartedButton.addEventListener("click", openLanguageScreen);

backButton.addEventListener("click", openWelcomeScreen);

languageCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectLanguage(card.dataset.language);
  });
});

// Always begin at the welcome screen.
showScreen(welcomeScreen);

