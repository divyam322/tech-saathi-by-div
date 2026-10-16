
"use strict";

const welcomeScreen = document.getElementById("welcome-screen");
const languageScreen = document.getElementById("language-screen");
const accountScreen = document.getElementById("account-screen");
const registerScreen = document.getElementById("register-screen");
const signInScreen = document.getElementById("sign-in-screen");

const getStartedButton = document.getElementById("get-started-btn");
const backButton = document.getElementById("back-to-welcome");
const backToLanguageButton = document.getElementById("back-to-language");
const createAccountButton = document.getElementById("create-account-btn");
const signInButton = document.getElementById("sign-in-btn");

const registerForm = document.getElementById("register-form");
const signInForm = document.getElementById("sign-in-form");

const languageCards = document.querySelectorAll(".language-card");

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

function showScreen(screenToShow) {
  const screens = [
    welcomeScreen,
    languageScreen,
    accountScreen,
    registerScreen,
    signInScreen
  ];

  screens.forEach((screen) => {
    if (!screen) return;

    const visible = screen === screenToShow;
    screen.hidden = !visible;
    screen.classList.toggle("active", visible);
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
  document.getElementById("language-description").textContent =
    t.description;
  document.getElementById("language-note").textContent = t.note;

  document.getElementById("account-back-label").textContent = t.back;
  document.getElementById("account-eyebrow").textContent = t.accountEyebrow;
  document.getElementById("account-title").textContent = t.accountTitle;
  document.getElementById("account-description").textContent =
    t.accountDescription;
  document.getElementById("create-account-label").textContent =
    t.createAccount;
  document.getElementById("sign-in-label").textContent = t.signIn;
  document.getElementById("account-note").textContent = t.accountNote;

  document.getElementById("register-back-label").textContent = t.back;
  document.getElementById("register-title").textContent = t.registerTitle;
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

function clearMessage(id) {
  const element = document.getElementById(id);
  if (element) element.textContent = "";
}

function setMessage(id, message) {
  const element = document.getElementById(id);
  if (element) element.textContent = message;
}

function getFirebase() {
  if (!window.techSaathiFirebase) {
    throw new Error(
      "Firebase is still loading. Please wait a moment and try again."
    );
  }

  return window.techSaathiFirebase;
}

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
      "This sign-in method is not enabled in Firebase."
  };

  return messages[error.code] ||
    "Something went wrong. Please try again. (" +
    (error.code || "unknown error") + ")";
}

function validateDateOfBirth() {
  const field = document.getElementById("register-dob");
  const value = field.value;

  if (!value) {
    field.focus();
    return false;
  }

  const dob = new Date(value + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (Number.isNaN(dob.getTime()) || dob > today) {
    setMessage("register-message", "Please enter a valid date of birth.");
    field.focus();
    return false;
  }

  return true;
}

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

/* EMAIL AND PASSWORD REGISTRATION */

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage("register-message");

  const name = document.getElementById("register-name").value.trim();
  const dob = document.getElementById("register-dob").value;
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

    // Do not retain the new user's authenticated session until verification.
    await firebase.signOut(firebase.auth);

    registerForm.reset();

    setMessage(
      "register-message",
      "Account created! Check your email for the verification link. Verify your email, then return here and sign in."
    );
  } catch (error) {
    if (createdUser) {
      try {
        await getFirebase().signOut(getFirebase().auth);
      } catch (_) {
        // Keep the original error for the user.
      }
    }

    setMessage("register-message", readableAuthError(error));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Account →";
  }
});

/* EMAIL AND PASSWORD SIGN-IN */

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

    if (!credential.user.emailVerified) {
      try {
        await firebase.sendEmailVerification(credential.user);
      } catch (_) {
        // The existing verification email may still be valid.
      }

      await firebase.signOut(firebase.auth);

      setMessage(
        "login-message",
        "Your email is not verified yet. We've attempted to send a verification email. Open it, verify your address, and then sign in again."
      );

      return;
    }

    setMessage(
      "login-message",
      "Email verified and sign-in successful! The learning dashboard will be connected in the next stage."
    );

    // Dashboard navigation will be added when that screen is built.
  } catch (error) {
    setMessage("login-message", readableAuthError(error));
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Sign In →";
  }
});

/* GOOGLE SIGN-IN */

async function handleGoogleSignIn(isRegistration) {
  clearMessage(isRegistration ? "register-message" : "login-message");

  if (isRegistration && !validateDateOfBirth()) return;

  const messageId = isRegistration
    ? "register-message"
    : "login-message";

  try {
    const firebase = getFirebase();

    const result = await firebase.signInWithPopup(
      firebase.auth,
      firebase.googleProvider
    );

    if (!result.user.emailVerified) {
      await firebase.signOut(firebase.auth);
      setMessage(messageId, "Please verify your email before continuing.");
      return;
    }

    setMessage(
      messageId,
      "Google sign-in successful! The learning dashboard will be connected in the next stage."
    );

    // Dashboard navigation will be added in the next stage.
  } catch (error) {
    setMessage(messageId, readableAuthError(error));
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

/* PASSWORD RESET */

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

    try {
      const firebase = getFirebase();

      await firebase.sendPasswordResetEmail(firebase.auth, email);

      setMessage(
        "login-message",
        "If an account exists for that address, a password-reset email will be sent. Check your inbox."
      );
    } catch (error) {
      setMessage("login-message", readableAuthError(error));
    }
  }
);

showScreen(welcomeScreen);
