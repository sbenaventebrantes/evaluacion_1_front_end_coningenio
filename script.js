const actionButton = document.getElementById('actionButton');
const message = document.getElementById('message');

if (actionButton && message) {
  actionButton.addEventListener('click', () => {
    message.textContent = '¡JavaScript está funcionando correctamente!';
  });
}
