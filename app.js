
"use strict";

const welcomeScreen = document.getElementById("welcome-screen");
const languageScreen = document.getElementById("language-screen");
const accountScreen = document.getElementById("account-screen");

const getStartedButton = document.getElementById("get-started-btn");
const backButton = document.getElementById("back-to-welcome");
const backToLanguageButton = document.getElementById("back-to-language");

const languageCards = document.querySelectorAll(".language-card");
const createAccountButton = document.getElementById("create-account-btn");
const signInButton = document.getElementById("sign-in-btn");

let selectedLanguage = "en";

const translations = {
  en: {
    htmlLang: "en",
    back: "Back",
    eyebrow: "LET'S GET STARTED",
    title: "Choose your language",
    description: "Select the language you're most comfortable with.",
    note: "You can change your language later in Settings",
    accountEyebrow: "YOUR DIGITAL JOURNEY",
    accountTitle: "Your journey starts here!",
    accountDescription:
      "Create your free account to learn digital skills and keep track of your progress.",
    createAccount: "Create Account",
    signIn: "Sign In",
    accountNote: "Free to use · Learn at your own pace",
    accountNotice: "The registration form is coming next!",
    signInNotice: "The sign-in screen is coming next!"
  },

  hi: {
    htmlLang: "hi",
    back: "वापस",
    eyebrow: "शुरू करें",
    title: "अपनी भाषा चुनें",
    description: "वह भाषा चुनें जिसमें आप सबसे सहज महसूस करते हैं।",
    note: "आप बाद में सेटिंग्स में अपनी भाषा बदल सकते हैं",
    accountEyebrow: "आपकी डिजिटल यात्रा",
    accountTitle: "आपकी यात्रा यहाँ से शुरू होती है!",
    accountDescription:
      "डिजिटल कौशल सीखने और अपनी प्रगति देखने के लिए अपना मुफ़्त खाता बनाएँ।",
    createAccount: "खाता बनाएँ",
    signIn: "साइन इन करें",
    accountNote: "मुफ़्त उपयोग · अपनी गति से सीखें",
    accountNotice: "पंजीकरण फ़ॉर्म अगला आएगा!",
    signInNotice: "साइन-इन स्क्रीन अगली आएगी!"
  },

  bn: {
    htmlLang: "bn",
    back: "ফিরে যান",
    eyebrow: "শুরু করা যাক",
    title: "আপনার ভাষা বেছে নিন",
    description: "আপনার পছন্দের ভাষাটি নির্বাচন করুন।",
    note: "আপনি পরে সেটিংস থেকে ভাষা পরিবর্তন করতে পারবেন",
    accountEyebrow: "আপনার ডিজিটাল যাত্রা",
    accountTitle: "আপনার যাত্রা শুরু হোক এখান থেকে!",
    accountDescription:
      "ডিজিটাল দক্ষতা শিখতে এবং আপনার অগ্রগতি দেখতে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন।",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    signIn: "সাইন ইন",
    accountNote: "বিনামূল্যে ব্যবহার · নিজের গতিতে শিখুন",
    accountNotice: "রেজিস্ট্রেশন ফর্ম পরের ধাপে আসবে!",
    signInNotice: "সাইন-ইন স্ক্রিন পরের ধাপে আসবে!"
  }
};

function showScreen(screenToShow) {
  const screens = [welcomeScreen, languageScreen, accountScreen];

  screens.forEach((screen) => {
    const isVisible = screen === screenToShow;
    screen.hidden = !isVisible;
    screen.classList.toggle("active", isVisible);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateLanguage(languageCode) {
  if (!translations[languageCode]) return;

  selectedLanguage = languageCode;
  const t = translations[selectedLanguage];

  document.documentElement.lang = t.htmlLang;

  document.getElementById("back-label").textContent = t.back;
  document.getElementById("language-eyebrow").textContent = t.eyebrow;
  document.getElementById("language-title").textContent = t.title;
  document.getElementById("language-description").textContent = t.description;
  document.getElementById("language-note").textContent = t.note;

  document.getElementById("account-back-label").textContent = t.back;
  document.getElementById("account-eyebrow").textContent = t.accountEyebrow;
  document.getElementById("account-title").textContent = t.accountTitle;
  document.getElementById("account-description").textContent =
    t.accountDescription;
  document.getElementById("create-account-label").textContent = t.createAccount;
  document.getElementById("sign-in-label").textContent = t.signIn;
  document.getElementById("account-note").textContent = t.accountNote;
}

function openLanguageScreen() {
  showScreen(languageScreen);
}

function openWelcomeScreen() {
  showScreen(welcomeScreen);
}

function openAccountScreen(languageCode) {
  updateLanguage(languageCode);
  showScreen(accountScreen);
}

getStartedButton.addEventListener("click", openLanguageScreen);
backButton.addEventListener("click", openWelcomeScreen);

backToLanguageButton.addEventListener("click", () => {
  showScreen(languageScreen);
});

languageCards.forEach((card) => {
  card.addEventListener("click", () => {
    openAccountScreen(card.dataset.language);
  });
});

createAccountButton.addEventListener("click", () => {
  window.alert(translations[selectedLanguage].accountNotice);
});

signInButton.addEventListener("click", () => {
  window.alert(translations[selectedLanguage].signInNotice);
});

showScreen(welcomeScreen);
