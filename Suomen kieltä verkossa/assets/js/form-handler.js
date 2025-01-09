// Подсчет символов в текстовом поле
const messageField = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageField.addEventListener('input', () => {
  const currentLength = messageField.value.length;
  charCount.textContent = `${currentLength}/800 merkkiä käytetty`;
});

// Форма - показываем статус отправки
const form = document.getElementById('contact-form');
const loading = document.querySelector('.loading');
const errorMessage = document.querySelector('.error-message');
const sentMessage = document.querySelector('.sent-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
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
        throw new Error('Ошибка отправки формы');
      }
    })
    .catch(() => {
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
    });
});
