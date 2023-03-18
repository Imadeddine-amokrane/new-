console.log('JS Client side');

const form = document.getElementById('weatherForm');
const forecastParagraphe = document.querySelector('.forecast');
const errorParagraphe = document.querySelector('.error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value;
  console.log(address);

  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        forecastParagraphe.innerText = '';
        errorParagraphe.innerText = data.error.code
          ? 'No internet connexion'
          : data.error;
      } else {
        errorParagraphe.innerText = '';
        forecastParagraphe.innerText = `Hi ${data.location}, ${data.forecast}`;
      }
    });
});
