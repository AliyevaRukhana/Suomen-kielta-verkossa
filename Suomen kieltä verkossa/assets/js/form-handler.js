// Merkkien laskeminen tekstikentässä
const messageField = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageField.addEventListener('input', () => {
  const currentLength = messageField.value.length;

  // Rajoitetaan tekstin pituus 800 merkkiin
  if (currentLength > 800) {
    messageField.value = messageField.value.substring(0, 800);
    charCount.textContent = `800/800 merkkiä käytetty`;
  } else {
    charCount.textContent = `${currentLength}/800 merkkiä käytetty`;
  }
});

// Lomake - näytetään lähetysstatus
const form = document.getElementById('contact-form');
const loading = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const sentMessage = document.querySelector('.sent-message');

// Tarkistetaan pakolliset kentät
function validateForm() {
  const nameField = document.querySelector('input[name="name"]');
  const emailField = document.querySelector('input[name="email"]');
  const messageField = document.getElementById('message');

  if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
    errorMessage.textContent = 'Täytä kaikki pakolliset kentät.';
    errorMessage.style.display = 'block';
    return false;
  }

  // Tarkistetaan sähköpostin muoto
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailField.value)) {
    errorMessage.textContent = 'Anna kelvollinen sähköpostiosoite.';
    errorMessage.style.display = 'block';
    return false;
  }

  errorMessage.style.display = 'none';
  return true;
}

// Lomakkeen lähetys
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Lomakkeen validointi
  if (!validateForm()) {
    return;
  }

  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        form.reset();
        charCount.textContent = '0/800 merkkiä käytetty';
      } else {
        throw new Error('Lomakkeen lähetys epäonnistui.');
      }
    })
    .catch(() => {
      loading.style.display = 'none';
      errorMessage.textContent = 'Lomakkeen lähetys epäonnistui. Yritä uudelleen.';
      errorMessage.style.display = 'block';
    });
});

