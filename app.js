if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        document.getElementById('status').innerText = 'Service Worker registrado com sucesso!';
      })
      .catch((err) => {
        document.getElementById('status').innerText = 'Erro ao registrar Service Worker: ' + err;
      });
  });
} else {
  document.getElementById('status').innerText = 'Service Worker não é suportado neste navegador.';
}

let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', () => {
  installBtn.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      deferredPrompt = null;
    });
  }
});
