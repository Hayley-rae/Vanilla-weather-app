let apiKey = "48c409140c55a35fe67d11e333255b1a";
let now = new Date();
let day = now.getDay();

let date = now.getDate();
let hour = now.getHours();
let amPm = hour >= 12 ? "pm" : "am";
hour = hour % 12 || 12;
let minute = String(now.getMinutes()).padStart(2, "0");

let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = weekDay[day];
console.log(day);

function getWeather(event) {
  event.preventDefault();
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(weatherApi).then(displayWeather);
}

function displayWeather(response) {
  let datapoint = response.data;
  let cityName = datapoint.name;
  let temp = Math.round(datapoint.main.temp);
  let humidity = datapoint.main.humidity;
  let wind = Math.round(datapoint.wind.speed);
  let tempHi = Math.round(datapoint.main.temp_max);
  let tempLo = Math.round(datapoint.main.temp_min);
  let iconId = datapoint.weather[0].icon;
  let description = datapoint.weather[0].description;
  let iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  cityElement.innerHTML = cityName;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Windspeed: ${wind} mph`;
  writtenCondition.innerHTML = description;
  tempElement.innerHTML = `${temp}`;
  tempUnit.innerHTML = "ºF";
  currentIcon.src = iconUrl;
  hiLo.innerHTML = `Hi: ${tempHi} | Lo: ${tempLo}`;

  getForecast(response);

  console.log(response);
}

let searchForm = document.querySelector("#searchForm");
let userInput = searchForm.querySelector("#search-input");
searchForm.addEventListener("submit", getWeather);

let dayTime = document.querySelector(".day-time");
dayTime.innerHTML = `${day} ${date} - ${hour}:${minute} ${amPm}`;

let conditions = document.querySelector("#col-2");
let cityElement = conditions.querySelector(".city");
let humidityElement = conditions.querySelector(".humidity");
let windElement = conditions.querySelector(".wind");
let tempElement = document.querySelector("#current-temp");
let tempUnit = document.querySelector("#temp-unit");
let hiLo = document.querySelector("#main-hi-lo");
let writtenCondition = document.querySelector(".condition-description");

let currentIcon = document.getElementById("conditionIcon");

function getForecast(response) {
  let data = response.data;
  let coords = data.coord;
  let lat = Math.round(coords.lat);
  let lon = Math.round(coords.lon);
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(forecastApi).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let days = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  days.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                class="forecast-icon"
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
              />
              <div class="forecast-temps">
                <span class="forecast-hi">${Math.round(
                  forecastDay.temp.max
                )}</span>
                <span class="forecast-lo">${Math.round(
                  forecastDay.temp.min
                )}</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(days);
}
