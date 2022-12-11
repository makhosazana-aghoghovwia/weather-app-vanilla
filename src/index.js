let now = new Date();
let h3 = document.querySelector("h3");

let date = now.getDate();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${date} ${month} ${year}`;

let h4 = document.querySelector("h4");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h4.innerHTML = `${hours}:${minutes}`;

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

function showTemperature(response) {
  let typedCity = document.querySelector("#typed-city");
  typedCity.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)} &degC`;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let feelings = document.querySelector("#feels-like");
  feelings.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}&degC`;
  let maxTemp = document.querySelector("#maximum-temperature");
  maxTemp.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}&degC`;
  let minTemp = document.querySelector("#minimum-temperature");
  minTemp.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}&degC`;
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
