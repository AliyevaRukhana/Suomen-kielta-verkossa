document.getElementById('viesti').addEventListener('input', function () {
    const maxLength = 800;
    const currentLength = this.value.length;
    document.getElementById('char-count').textContent = `${currentLength}/${maxLength} merkkiä käytetty`;
});
