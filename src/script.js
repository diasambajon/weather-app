function getLocation(event) {
  event.preventDefault();

  function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "ec8e69b1285b9aa207ab4f4d6f6be3e0";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getLocation);

function showTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#actual-temperature");
  actualTemperature.innerHTML = `${cityTemperature}°`;
  let status = response.data.weather[0].main;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${status}`;
  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `Wind: ${wind}mph`;
  console.log(response);

  
  function update(fahrenheitEvent) {
    fahrenheitEvent.preventDefault();
    actualTemperature.innerHTML = `${cityTemperature}°`;
  }

  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", update);

  function show(celsiusEvent) {
    celsiusEvent.preventDefault();
    actualTemperature.innerHTML =
      Math.round(((`${cityTemperature}` - 32) * 5) / 9) + "°";
  }

  let celsius = document.querySelector("#celsius-link");
  celsius.addEventListener("click", show);
}

function input(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");

  let apiKey = "ec8e69b1285b9aa207ab4f4d6f6be3e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enterCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemp);
}

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", input);

let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${hours}:${minutes}`;