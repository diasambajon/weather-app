function getLocation(event) {
  event.preventDefault();

  function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "ec8e69b1285b9aa207ab4f4d6f6be3e0";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    
    axios.get(apiUrl).then(displayForecast);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getLocation);

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
  }

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#actual-temperature");
  actualTemperature.innerHTML = `${cityTemperature}°`;
  let status = response.data.weather[0].description;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${status}`;
  let humidity = response.data.main.humidity;
  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `Wind: ${wind}mph`;
  let dateElement = document.querySelector("h4");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);


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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
    <p class="hour">
      ${formatHours(forecast.dt * 1000)}
    </p>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="#" class="forecast-icon">
    <div class="forecast-temperature">
    <strong>
      ${Math.round(forecast.main.temp_max)}°
    </strong>
      ${Math.round(forecast.main.temp_min)}°
    </div>
    </div>
    `;
  }
}

function search(city) {
  let apiKey = "ec8e69b1285b9aa207ab4f4d6f6be3e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemp)

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function input(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enter-city");
  search(enterCity.value);
}


search("Los Angeles");

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", input);

