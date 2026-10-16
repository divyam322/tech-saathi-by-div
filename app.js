
"use strict";

/* =========================================
   TECH SAATHI BY DIV
   App navigation, Firebase authentication,
   language selection and student dashboard
========================================= */

/* ---------- SCREEN ELEMENTS ---------- */

const welcomeScreen = document.getElementById("welcome-screen");
const languageScreen = document.getElementById("language-screen");
const accountScreen = document.getElementById("account-screen");
const registerScreen = document.getElementById("register-screen");
const signInScreen = document.getElementById("sign-in-screen");
const dashboardScreen = document.getElementById("dashboard-screen");

/* ---------- BUTTONS AND FORMS ---------- */

const getStartedButton = document.getElementById("get-started-btn");
const backButton = document.getElementById("back-to-welcome");
const backToLanguageButton = document.getElementById("back-to-language");
const createAccountButton = document.getElementById("create-account-btn");
const signInButton = document.getElementById("sign-in-btn");

const registerForm = document.getElementById("register-form");
const signInForm = document.getElementById("sign-in-form");

const languageCards = document.querySelectorAll(".language-card");

let selectedLanguage = "en";

/* ---------- TRANSLATIONS ---------- */

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
    registerTitle: "Create your free account",
    registerDescription: "Join us to learn useful digital skills.",
    loginTitle: "Sign in to Tech Saathi"
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
    registerTitle: "अपना मुफ़्त खाता बनाएँ",
    registerDescription: "उपयोगी डिजिटल कौशल सीखने के लिए जुड़ें।",
    loginTitle: "Tech Saathi में साइन इन करें"
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
    registerTitle: "আপনার বিনামূল্যের অ্যাকাউন্ট তৈরি করুন",
    registerDescription: "প্রয়োজনীয় ডিজিটাল দক্ষতা শিখতে যোগ দিন।",
    loginTitle: "Tech Saathi-তে সাইন ইন করুন"
  }
};

/* ---------- SCREEN NAVIGATION ---------- */

function showScreen(screenToShow) {
  const screens = [
    welcomeScreen,
    languageScreen,
    accountScreen,
    registerScreen,
    signInScreen,
    dashboardScreen
  ];

  screens.forEach((screen) => {
    if (!screen) return;

    const visible = screen === screenToShow;

    screen.hidden = !visible;
    screen.classList.toggle("active", visible);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- LANGUAGE SELECTION ---------- */

function updateLanguage(languageCode) {
  if (!translations[languageCode]) return;

  selectedLanguage = languageCode;
  const t = translations[selectedLanguage];

  document.documentElement.lang = t.htmlLang;

  document.getElementById("back-label").textContent = t.back;
  document.getElementById("language-eyebrow").textContent = t.eyebrow;
  document.getElementById("language-title").textContent = t.title;
  document.getElementById("language-description").textContent =
    t.description;
  document.getElementById("language-note").textContent = t.note;

  document.getElementById("account-back-label").textContent = t.back;
  document.getElementById("account-eyebrow").textContent =
    t.accountEyebrow;
  document.getElementById("account-title").textContent =
    t.accountTitle;
  document.getElementById("account-description").textContent =
    t.accountDescription;
  document.getElementById("create-account-label").textContent =
    t.createAccount;
  document.getElementById("sign-in-label").textContent = t.signIn;
  document.getElementById("account-note").textContent = t.accountNote;

  document.getElementById("register-back-label").textContent = t.back;
  document.getElementById("register-title").textContent =
    t.registerTitle;
  document.getElementById("register-description").textContent =
    t.registerDescription;
  document.getElementById("sign-in-back-label").textContent = t.back;
  document.getElementById("login-title").textContent = t.loginTitle;
}

function openAccountScreen(languageCode) {
  updateLanguage(languageCode);
  showScreen(accountScreen);
}

function openRegisterScreen() {
  clearMessage("register-message");
  showScreen(registerScreen);
}

function openSignInScreen() {
  clearMessage("login-message");
  showScreen(signInScreen);
}

/* ---------- DASHBOARD ---------- */


function openDashboard(user) {
  const name =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Learner";

  const nameElement = document.getElementById("dashboard-user-name");
  const profileName = document.getElementById("ts-profile-name");
  const profileEmail = document.getElementById("ts-profile-email");

  if (nameElement) nameElement.textContent = name;
  if (profileName) profileName.textContent = name;
  if (profileEmail) profileEmail.textContent = user.email || "Not available";

  clearMessage("dashboard-feature-message");
  showScreen(dashboardScreen);

  if (typeof window.tsShowView === "function") {
    window.tsShowView("home");
  }
}


/* ---------- STATUS MESSAGES ---------- */

function clearMessage(id) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = "";
  }
}

function setMessage(id, message) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = message;
  }
}

/* ---------- FIREBASE ACCESS ---------- */

function getFirebase() {
  if (!window.techSaathiFirebase) {
    throw new Error(
      "Firebase is still loading. Please wait a moment and try again."
    );
  }

  return window.techSaathiFirebase;
}

/* ---------- AUTHENTICATION ERROR MESSAGES ---------- */

function readableAuthError(error) {
  const messages = {
    "auth/email-already-in-use":
      "An account already exists with this email. Please sign in instead.",

    "auth/invalid-email":
      "Please enter a valid email address.",

    "auth/weak-password":
      "Please choose a stronger password.",

    "auth/invalid-credential":
      "The email or password is incorrect. Please try again.",

    "auth/user-not-found":
      "No account was found with these details.",

    "auth/wrong-password":
      "The email or password is incorrect. Please try again.",

    "auth/popup-closed-by-user":
      "The Google sign-in window was closed before finishing.",

    "auth/popup-blocked":
      "Your browser blocked the sign-in window. Allow pop-ups and try again.",

    "auth/unauthorized-domain":
      "This website domain is not authorized in Firebase Authentication.",

    "auth/network-request-failed":
      "Network error. Check your internet connection and try again.",

    "auth/too-many-requests":
      "Too many attempts. Please wait a while and try again.",

    "auth/operation-not-allowed":
      "This sign-in method is not enabled in Firebase.",

    "auth/account-exists-with-different-credential":
      "An account already exists with this email using a different sign-in method."
  };

  return (
    messages[error.code] ||
    "Something went wrong. Please try again. (" +
      (error.code || "unknown error") +
      ")"
  );
}

/* ---------- DATE OF BIRTH VALIDATION ---------- */

function validateDateOfBirth() {
  const field = document.getElementById("register-dob");

  if (!field) return true;

  const value = field.value;

  if (!value) {
    field.focus();
    return false;
  }

  const dob = new Date(value + "T00:00:00");
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(dob.getTime()) || dob > today) {
    setMessage(
      "register-message",
      "Please enter a valid date of birth."
    );

    field.focus();
    return false;
  }

  return true;
}

/* ---------- MAIN NAVIGATION EVENTS ---------- */

getStartedButton.addEventListener("click", () => {
  showScreen(languageScreen);
});

backButton.addEventListener("click", () => {
  showScreen(welcomeScreen);
});

backToLanguageButton.addEventListener("click", () => {
  showScreen(languageScreen);
});

languageCards.forEach((card) => {
  card.addEventListener("click", () => {
    openAccountScreen(card.dataset.language);
  });
});

createAccountButton.addEventListener("click", openRegisterScreen);
signInButton.addEventListener("click", openSignInScreen);

document.getElementById("back-to-account").addEventListener("click", () => {
  showScreen(accountScreen);
});

document.getElementById("back-from-sign-in").addEventListener("click", () => {
  showScreen(accountScreen);
});

document.getElementById("show-sign-in").addEventListener("click", () => {
  openSignInScreen();
});

document.getElementById("show-register").addEventListener("click", () => {
  openRegisterScreen();
});

/* ---------- EMAIL AND PASSWORD REGISTRATION ---------- */

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage("register-message");

  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;
  const confirmPassword =
    document.getElementById("register-confirm-password").value;

  if (!name) {
    setMessage("register-message", "Please enter your full name.");
    return;
  }

  if (!validateDateOfBirth()) return;

  if (password !== confirmPassword) {
    setMessage("register-message", "Your passwords do not match.");
    return;
  }

  const submitButton = document.getElementById("register-submit");

  submitButton.disabled = true;
  submitButton.textContent = "Creating account...";

  let createdUser = null;

  try {
    const firebase = getFirebase();

    const credential = await firebase.createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    createdUser = credential.user;

    await firebase.updateProfile(createdUser, {
      displayName: name
    });

    await firebase.sendEmailVerification(createdUser);

    // Keep email/password users signed out until email verification.
    await firebase.signOut(firebase.auth);

    registerForm.reset();

    setMessage(
      "register-message",
      "Account created! Check your email for the verification link. Verify your email, then return here and sign in."
    );
  } catch (error) {
    if (createdUser) {
      try {
        const firebase = getFirebase();
        await firebase.signOut(firebase.auth);
      } catch (_) {
        // Preserve the original error message.
      }
    }

    setMessage("register-message", readableAuthError(error));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Account →";
  }
});

/* ---------- EMAIL AND PASSWORD SIGN-IN ---------- */

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage("login-message");

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const submitButton = document.getElementById("login-submit");

  submitButton.disabled = true;
  submitButton.textContent = "Signing in...";

  try {
    const firebase = getFirebase();

    const credential = await firebase.signInWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );

    // Email verification is required before dashboard access.
    if (!credential.user.emailVerified) {
      try {
        await firebase.sendEmailVerification(credential.user);
      } catch (_) {
        // An earlier verification email may still be valid.
      }

      await firebase.signOut(firebase.auth);

      setMessage(
        "login-message",
        "Your email is not verified yet. We've attempted to send a verification email. Open it, verify your address, and then sign in again."
      );

      return;
    }

    openDashboard(credential.user);
  } catch (error) {
    setMessage("login-message", readableAuthError(error));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Sign In →";
  }
});

/* ---------- GOOGLE SIGN-IN ---------- */

async function handleGoogleSignIn(isRegistration) {
  clearMessage(isRegistration ? "register-message" : "login-message");

  if (isRegistration && !validateDateOfBirth()) return;

  const messageId = isRegistration
    ? "register-message"
    : "login-message";

  const buttonId = isRegistration
    ? "google-register-btn"
    : "google-login-btn";

  const googleButton = document.getElementById(buttonId);

  googleButton.disabled = true;
  googleButton.textContent = "Connecting to Google...";

  try {
    const firebase = getFirebase();

    const result = await firebase.signInWithPopup(
      firebase.auth,
      firebase.googleProvider
    );

    if (!result.user.emailVerified) {
      await firebase.signOut(firebase.auth);

      setMessage(
        messageId,
        "Please verify your email before continuing."
      );

      return;
    }

    openDashboard(result.user);
  } catch (error) {
    setMessage(messageId, readableAuthError(error));
  } finally {
    googleButton.disabled = false;
    googleButton.textContent = "Continue with Google";
  }
}

document.getElementById("google-register-btn").addEventListener(
  "click",
  () => handleGoogleSignIn(true)
);

document.getElementById("google-login-btn").addEventListener(
  "click",
  () => handleGoogleSignIn(false)
);

/* ---------- PASSWORD RESET ---------- */

document.getElementById("forgot-password-btn").addEventListener(
  "click",
  async () => {
    clearMessage("login-message");

    const email = document.getElementById("login-email").value.trim();

    if (!email) {
      setMessage(
        "login-message",
        "Enter your email address above first, then select Forgot password."
      );

      document.getElementById("login-email").focus();
      return;
    }

    const resetButton = document.getElementById("forgot-password-btn");

    resetButton.disabled = true;

    try {
      const firebase = getFirebase();

      await firebase.sendPasswordResetEmail(firebase.auth, email);

      setMessage(
        "login-message",
        "If an account exists for that address, a password-reset email will be sent. Check your inbox."
      );
    } catch (error) {
      setMessage("login-message", readableAuthError(error));
    } finally {
      resetButton.disabled = false;
    }
  }
);

/* ---------- DASHBOARD FEATURE CARDS ---------- */


/* ---------- TECH SAATHI DASHBOARD INTERACTIONS ---------- */

(function setupTechSaathiDashboard() {
  const sidebar = document.getElementById("ts-sidebar");
  const menuToggle = document.getElementById("ts-menu-toggle");
  const backdrop = document.getElementById("ts-backdrop");
  const languageSelect = document.getElementById("ts-language");

  const views = {
    home: document.getElementById("ts-home-view"),
    topics: document.getElementById("ts-topics-view"),
    learning: document.getElementById("ts-learning-view"),
    help: document.getElementById("ts-help-view"),
    profile: document.getElementById("ts-profile-view")
  };

  let currentDevice = "mobile";
  let currentLanguage = "en";

  const words = {
    en: {
      home: "Home",
      mobile: "Mobile Phone",
      computer: "Laptop & Computer",
      learning: "My Learning",
      language: "Language",
      signout: "Sign Out",
      help: "Help",
      profile: "Profile",
      choose: "Choose your device",
      chooseDescription: "Select what you would like to learn today.",
      explore: "Explore →",
      start: "Start Learning",
      coming: "Lessons are being prepared. Please check back soon!",
      mobileDescription: "Start with the basics and learn at your own pace.",
      computerDescription: "Build computer confidence, one step at a time.",
      back: "← Back to dashboard",
      welcome: "Your journey to becoming more confident with technology starts here."
    },
    hi: {
      home: "होम",
      mobile: "मोबाइल फ़ोन",
      computer: "लैपटॉप और कंप्यूटर",
      learning: "मेरी पढ़ाई",
      language: "भाषा",
      signout: "साइन आउट",
      help: "मदद",
      profile: "प्रोफ़ाइल",
      choose: "अपना डिवाइस चुनें",
      chooseDescription: "आज आप क्या सीखना चाहते हैं?",
      explore: "देखें →",
      start: "सीखना शुरू करें",
      coming: "पाठ तैयार किए जा रहे हैं। कृपया जल्द फिर आएँ!",
      mobileDescription: "मोबाइल की बुनियादी बातें अपनी गति से सीखें।",
      computerDescription: "धीरे-धीरे कंप्यूटर चलाना सीखें।",
      back: "← डैशबोर्ड पर वापस जाएँ",
      welcome: "तकनीक का आत्मविश्वास बढ़ाने की आपकी यात्रा यहाँ से शुरू होती है।"
    },
    bn: {
      home: "হোম",
      mobile: "মোবাইল ফোন",
      computer: "ল্যাপটপ ও কম্পিউটার",
      learning: "আমার শেখা",
      language: "ভাষা",
      signout: "সাইন আউট",
      help: "সাহায্য",
      profile: "প্রোফাইল",
      choose: "আপনার ডিভাইস বেছে নিন",
      chooseDescription: "আজ আপনি কী শিখতে চান?",
      explore: "দেখুন →",
      start: "শেখা শুরু করুন",
      coming: "পাঠ তৈরি হচ্ছে। অনুগ্রহ করে পরে আবার আসুন!",
      mobileDescription: "নিজের গতিতে মোবাইলের প্রাথমিক বিষয়গুলি শিখুন।",
      computerDescription: "ধাপে ধাপে কম্পিউটার ব্যবহার শিখুন।",
      back: "← ড্যাশবোর্ডে ফিরে যান",
      welcome: "প্রযুক্তি ব্যবহারে আত্মবিশ্বাসী হওয়ার যাত্রা এখান থেকেই শুরু।"
    }
  };

  const topicData = {
    mobile: [
      {
        title: {
          en: "Getting to Know Your Phone",
          hi: "अपने फ़ोन को जानें",
          bn: "আপনার ফোনকে চিনুন"
        },
        description: {
          en: "Learn the buttons, touchscreen, volume, charging and basic settings.",
          hi: "बटन, टचस्क्रीन, आवाज़, चार्जिंग और बुनियादी सेटिंग्स सीखें।",
          bn: "বোতাম, টাচস্ক্রিন, ভলিউম, চার্জিং ও প্রাথমিক সেটিংস শিখুন।"
        }
      },
      {
        title: {
          en: "Calling and Contacts",
          hi: "कॉल और कॉन्टैक्ट",
          bn: "কল ও কনট্যাক্ট"
        },
        description: {
          en: "Make calls, save numbers and find your contacts.",
          hi: "कॉल करें, नंबर सेव करें और कॉन्टैक्ट खोजें।",
          bn: "কল করুন, নম্বর সেভ করুন এবং কনট্যাক্ট খুঁজুন।"
        }
      },
      {
        title: {
          en: "WhatsApp and Messages",
          hi: "व्हाट्सऐप और संदेश",
          bn: "হোয়াটসঅ্যাপ ও মেসেজ"
        },
        description: {
          en: "Understand messages, photos, voice notes and video calls.",
          hi: "मैसेज, फ़ोटो, वॉइस नोट और वीडियो कॉल समझें।",
          bn: "মেসেজ, ছবি, ভয়েস নোট ও ভিডিও কল শিখুন।"
        }
      },
      {
        title: {
          en: "Internet and Browsing",
          hi: "इंटरनेट और ब्राउज़िंग",
          bn: "ইন্টারনেট ও ব্রাউজিং"
        },
        description: {
          en: "Connect to the internet and find useful information safely.",
          hi: "इंटरनेट से जुड़ें और सुरक्षित तरीके से जानकारी खोजें।",
          bn: "ইন্টারনেটে যুক্ত হন এবং নিরাপদে তথ্য খুঁজুন।"
        }
      },
      {
        title: {
          en: "Camera and Photos",
          hi: "कैमरा और फ़ोटो",
          bn: "ক্যামেরা ও ছবি"
        },
        description: {
          en: "Take photos, record videos and find saved pictures.",
          hi: "फ़ोटो लें, वीडियो बनाएँ और सेव की गई तस्वीरें खोजें।",
          bn: "ছবি তুলুন, ভিডিও করুন এবং সংরক্ষিত ছবি খুঁজুন।"
        }
      },
      {
        title: {
          en: "Apps and App Stores",
          hi: "ऐप और ऐप स्टोर",
          bn: "অ্যাপ ও অ্যাপ স্টোর"
        },
        description: {
          en: "Understand apps and learn safer ways to install them.",
          hi: "ऐप समझें और उन्हें सुरक्षित तरीके से इंस्टॉल करना सीखें।",
          bn: "অ্যাপ বুঝুন এবং নিরাপদে ইনস্টল করতে শিখুন।"
        }
      },
      {
        title: {
          en: "Online Services and Payments",
          hi: "ऑनलाइन सेवाएँ और भुगतान",
          bn: "অনলাইন পরিষেবা ও পেমেন্ট"
        },
        description: {
          en: "Understand digital services and essential payment safety.",
          hi: "डिजिटल सेवाएँ और भुगतान की ज़रूरी सुरक्षा समझें।",
          bn: "ডিজিটাল পরিষেবা ও পেমেন্টের প্রয়োজনীয় নিরাপত্তা জানুন।"
        }
      },
      {
        title: {
          en: "Privacy and Digital Safety",
          hi: "गोपनीयता और डिजिटल सुरक्षा",
          bn: "গোপনীয়তা ও ডিজিটাল নিরাপত্তা"
        },
        description: {
          en: "Recognise scams and protect passwords, OTPs and personal details.",
          hi: "धोखाधड़ी पहचानें और पासवर्ड, OTP व निजी जानकारी सुरक्षित रखें।",
          bn: "প্রতারণা চিনুন এবং পাসওয়ার্ড, OTP ও ব্যক্তিগত তথ্য সুরক্ষিত রাখুন।"
        }
      }
    ],
    computer: [
      {
        title: {
          en: "Getting to Know Your Computer",
          hi: "अपने कंप्यूटर को जानें",
          bn: "আপনার কম্পিউটারকে চিনুন"
        },
        description: {
          en: "Understand the desktop, windows, taskbar and basic controls.",
          hi: "डेस्कटॉप, विंडो, टास्कबार और बुनियादी नियंत्रण समझें।",
          bn: "ডেস্কটপ, উইন্ডো, টাস্কবার ও প্রাথমিক নিয়ন্ত্রণ জানুন।"
        }
      },
      {
        title: {
          en: "Mouse and Keyboard",
          hi: "माउस और कीबोर्ड",
          bn: "মাউস ও কীবোর্ড"
        },
        description: {
          en: "Practise clicking, scrolling, typing and useful keyboard keys.",
          hi: "क्लिक, स्क्रॉल, टाइप और उपयोगी कीबोर्ड कुंजियों का अभ्यास करें।",
          bn: "ক্লিক, স্ক্রল, টাইপ ও দরকারি কীবোর্ড কী অনুশীলন করুন।"
        }
      },
      {
        title: {
          en: "Files and Folders",
          hi: "फ़ाइल और फ़ोल्डर",
          bn: "ফাইল ও ফোল্ডার"
        },
        description: {
          en: "Create, save, find, rename and organise files.",
          hi: "फ़ाइल बनाएँ, सेव करें, खोजें, नाम बदलें और व्यवस्थित करें।",
          bn: "ফাইল তৈরি, সংরক্ষণ, খোঁজা, নাম বদল ও সাজানো শিখুন।"
        }
      },
      {
        title: {
          en: "Internet and Browsing",
          hi: "इंटरनेट और ब्राउज़िंग",
          bn: "ইন্টারনেট ও ব্রাউজিং"
        },
        description: {
          en: "Use a browser, search for information and recognise unsafe sites.",
          hi: "ब्राउज़र चलाएँ, जानकारी खोजें और असुरक्षित वेबसाइट पहचानें।",
          bn: "ব্রাউজার ব্যবহার, তথ্য খোঁজা ও অনিরাপদ সাইট চেনা শিখুন।"
        }
      },
      {
        title: {
          en: "Typing and Documents",
          hi: "टाइपिंग और दस्तावेज़",
          bn: "টাইপিং ও ডকুমেন্ট"
        },
        description: {
          en: "Type text and understand the basics of editing a document.",
          hi: "टाइप करें और दस्तावेज़ में बदलाव करना सीखें।",
          bn: "টাইপ করুন এবং ডকুমেন্ট সম্পাদনার প্রাথমিক বিষয় শিখুন।"
        }
      },
      {
        title: {
          en: "Email Basics",
          hi: "ईमेल की बुनियादी बातें",
          bn: "ইমেলের প্রাথমিক বিষয়"
        },
        description: {
          en: "Understand inboxes, attachments and sending messages.",
          hi: "इनबॉक्स, अटैचमेंट और ईमेल भेजना समझें।",
          bn: "ইনবক্স, অ্যাটাচমেন্ট ও ইমেল পাঠানো শিখুন।"
        }
      },
      {
        title: {
          en: "Downloads and Applications",
          hi: "डाउनलोड और ऐप्लिकेशन",
          bn: "ডাউনলোড ও অ্যাপ্লিকেশন"
        },
        description: {
          en: "Understand downloads and safer ways to install software.",
          hi: "डाउनलोड और सॉफ़्टवेयर इंस्टॉल करने के सुरक्षित तरीके समझें।",
          bn: "ডাউনলোড ও সফটওয়্যার ইনস্টলের নিরাপদ পদ্ধতি জানুন।"
        }
      },
      {
        title: {
          en: "Privacy and Digital Safety",
          hi: "गोपनीयता और डिजिटल सुरक्षा",
          bn: "গোপনীয়তা ও ডিজিটাল নিরাপত্তা"
        },
        description: {
          en: "Protect accounts, passwords and personal information online.",
          hi: "ऑनलाइन खातों, पासवर्ड और निजी जानकारी को सुरक्षित रखें।",
          bn: "অনলাইনে অ্যাকাউন্ট, পাসওয়ার্ড ও ব্যক্তিগত তথ্য সুরক্ষিত রাখুন।"
        }
      }
    ]
  };

  function closeMobileMenu() {
    if (sidebar) sidebar.classList.remove("is-open");
    if (backdrop) backdrop.hidden = true;
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMobileMenu() {
    if (sidebar) sidebar.classList.add("is-open");
    if (backdrop) backdrop.hidden = false;
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
  }

  function setActiveNavigation(target) {
    document.querySelectorAll(".ts-nav").forEach((button) => {
      button.classList.remove("active");
    });

    const matchingButton = document.querySelector(
      '.ts-nav[data-view="' + target + '"], ' +
      '.ts-nav[data-device="' + target + '"]'
    );

    if (matchingButton) matchingButton.classList.add("active");
  }

  function showView(target) {
    Object.values(views).forEach((view) => {
      if (view) view.hidden = true;
    });

    if (target === "language") {
      if (languageSelect) languageSelect.focus();
      setActiveNavigation("language");
      closeMobileMenu();
      return;
    }

    if (views[target]) {
      views[target].hidden = false;
    }

    setActiveNavigation(target);
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDevice(device) {
    if (!topicData[device]) return;

    currentDevice = device;

    const titleElement = document.getElementById("ts-topics-title");
    const descriptionElement = document.getElementById("ts-topics-description");
    const grid = document.getElementById("ts-topics-grid");
    const t = words[currentLanguage];

    if (titleElement) {
      titleElement.textContent =
        device === "mobile" ? t.mobile : t.computer;
    }

    if (descriptionElement) {
      descriptionElement.textContent =
        device === "mobile"
          ? t.mobileDescription
          : t.computerDescription;
    }

    if (grid) {
      grid.replaceChildren();

      topicData[device].forEach((topic) => {
        const card = document.createElement("article");
        card.className = "ts-topic-card";

        const heading = document.createElement("h3");
        heading.textContent = topic.title[currentLanguage];

        const description = document.createElement("p");
        description.textContent = topic.description[currentLanguage];

        const button = document.createElement("button");
        button.className = "ts-primary";
        button.type = "button";
        button.textContent = t.start;

        button.addEventListener("click", () => {
          setMessage("dashboard-feature-message", t.coming);
        });

        card.append(heading, description, button);
        grid.appendChild(card);
      });
    }

    const message = document.getElementById("dashboard-feature-message");
    if (message) message.textContent = "";

    Object.values(views).forEach((view) => {
      if (view) view.hidden = true;
    });

    if (views.topics) views.topics.hidden = false;

    setActiveNavigation(device);
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyDashboardLanguage(languageCode) {
    if (!words[languageCode]) return;

    currentLanguage = languageCode;
    const t = words[currentLanguage];

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll(".ts-nav").forEach((button) => {
      const label = button.querySelector("span");
      if (!label) return;

      if (button.dataset.device) {
        label.textContent = t[button.dataset.device];
      } else if (button.dataset.view) {
        label.textContent = t[button.dataset.view] || label.textContent;
      } else if (button.dataset.action === "signout") {
        label.textContent = t.signout;
      }
    });

    const signOutButton = document.getElementById("dashboard-logout");
    if (signOutButton) signOutButton.textContent = t.signout;

    const chooseHeading = document.querySelector(
      "#ts-home-view .ts-section h2"
    );
    const chooseDescription = document.querySelector(
      "#ts-home-view .ts-section .ts-subtitle"
    );

    if (chooseHeading) chooseHeading.textContent = t.choose;
    if (chooseDescription) {
      chooseDescription.textContent = t.chooseDescription;
    }

    const welcomeDescription = document.querySelector(
      "#ts-home-view .ts-welcome > p:last-child"
    );
    if (welcomeDescription) {
      welcomeDescription.textContent = t.welcome;
    }

    document.querySelectorAll("#ts-home-view [data-device]").forEach((button) => {
      button.textContent = t.explore;
    });

    const backButton = document.querySelector(".ts-back");
    if (backButton) backButton.textContent = t.back;

    if (views.topics && !views.topics.hidden) {
      openDevice(currentDevice);
    }
  }

  window.tsShowView = showView;

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (sidebar && sidebar.classList.contains("is-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileMenu);
  }

  document.querySelectorAll("[data-device]").forEach((button) => {
    button.addEventListener("click", () => {
      openDevice(button.dataset.device);
    });
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.view);
    });
  });

  document.querySelectorAll('[data-action="signout"]').forEach((button) => {
    button.addEventListener("click", () => {
      const signOutButton = document.getElementById("dashboard-logout");
      if (signOutButton) signOutButton.click();
    });
  });

  document.querySelectorAll(".ts-back").forEach((button) => {
    button.addEventListener("click", () => showView("home"));
  });

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      applyDashboardLanguage(languageSelect.value);
    });
  }

  // Keep the dashboard's language selector in sync with the language
  // chosen before signing in, without changing the existing auth flow.
  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
})();


/* ---------- SIGN OUT ---------- */

document.getElementById("dashboard-logout").addEventListener(
  "click",
  async () => {
    const logoutButton = document.getElementById("dashboard-logout");

    logoutButton.disabled = true;
    logoutButton.textContent = "Signing out...";

    try {
      const firebase = getFirebase();

      await firebase.signOut(firebase.auth);

      showScreen(welcomeScreen);
    } catch (error) {
      setMessage(
        "dashboard-feature-message",
        "Could not sign out. Please try again."
      );
    } finally {
      logoutButton.disabled = false;
      logoutButton.textContent = "Sign Out";
    }
  }
);

/* ---------- INITIAL SCREEN ---------- */

showScreen(welcomeScreen);
