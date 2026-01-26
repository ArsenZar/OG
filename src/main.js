// Функція, яка перевіряє — ми у PWA чи в браузері
function isInStandaloneMode() {
  // iOS: special media query
  const iosStandalone = window.matchMedia('(display-mode: standalone)').matches;
  // Android / десктоп: navigator.standalone (тільки Safari)
  const safariStandalone = window.navigator.standalone === true;
  return iosStandalone || safariStandalone;
}

// Відстежуємо подію "beforeinstallprompt"
// Це коли браузер дозволяє показати попап "Встановити додаток"
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // блокуємо дефолтний попап
  const deferredPrompt = event;

  if (!isInStandaloneMode()) {
    // Якщо НЕ у PWA → показуємо свою інструкцію
    const btn = document.createElement("button");
    btn.textContent = "📲 Встановити додаток";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px 15px";
    btn.style.background = "#0a84ff";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    document.body.appendChild(btn);

    // Якщо юзер натискає → викликаємо системне вікно встановлення
    btn.addEventListener("click", () => {
      deferredPrompt.prompt(); // показуємо системний діалог
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === "accepted") {
          console.log("✅ Користувач встановив додаток");
        } else {
          console.log("❌ Користувач відхилив встановлення");
        }
      });
    });
  }
});

// Якщо ми вже в PWA → нічого не показуємо
if (isInStandaloneMode()) {
  console.log("🚀 Додаток запущений як PWA");
} else {
  console.log("🌐 Додаток запущений у браузері");
}

const backButton = document.querySelector(".backButton");
const icons = document.querySelectorAll(".ico");

icons.forEach(icon => {
  icon.addEventListener("click", () => {

    // reset
    icons.forEach(i => {
      i.src = i.dataset.default;
    });

    // active
    icon.src = icon.dataset.active;

    // indicator
    backButton.style.left = icon.dataset.offset + "px";
  });
});

// icoHome.addEventListener("click", () => {
//   backButton.style.left = "0px";
// });

// icoRaiting.addEventListener("click", () => {
//   backButton.style.left = "85px";
// });

// icoCalendar.addEventListener("click", () => {
//   backButton.style.left = "175px";
// });

// icoFolder.addEventListener("click", () => {
//   backButton.style.left = "263px";
// });
