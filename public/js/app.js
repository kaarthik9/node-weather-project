const input = document.getElementById('form-location');
const msg1 = document.getElementById('message-one');
const msg2 = document.getElementById('message-two');

document.getElementById('weather-form').onsubmit = getWeather;

function getWeather() {
  const location = input.value;

  msg1.textContent = 'Loading...'
  fetch(`/weather?address=${location}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      msg1.textContent = data.error;
      msg2.textContent = '';
    } else {
      msg1.innerHTML = '<b>Location</b>'
      msg2.innerHTML ='<b>'+ data.forecast +'</b>'+ '. Observed at: ' + data.observationTime;

      input.value = '';
    }
  })

  return false;
}