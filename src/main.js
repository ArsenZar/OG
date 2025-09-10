if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("✅ Service Worker зареєстрований"))
    .catch(err => console.error("❌ Помилка SW:", err));
}
