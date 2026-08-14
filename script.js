document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.text-button').forEach((button) => {
  button.addEventListener('click', () => {
    alert('Ordering will be connected after Kristi contact details are added.');
  });
});
