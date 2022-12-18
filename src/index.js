function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function showNewCity(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#city-search").value;
  searchCity(typedCity);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showNewCity);

function searchCity(typedCity) {
  let apiKey = "e6c2364656962bdcb16bc352fc42569a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${typedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Edmonton");

function showTemperature(response) {
  let typedCity = document.querySelector("#typed-city");
  let temperatureElement = document.querySelector("#current-temperature");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let description = document.querySelector("#temperature-description");
  let feelings = document.querySelector("#feels-like");
  let maxTemp = document.querySelector("#maximum-temperature");
  let minTemp = document.querySelector("#minimum-temperature");
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  typedCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)} &degC`;
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  windElement.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  description.innerHTML = response.data.weather[0].description;
  feelings.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}&degC`;
  maxTemp.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}&degC`;
  minTemp.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}&degC`;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 23;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
