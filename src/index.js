function getWeather(event) {
  event.preventDefault();
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27c5687a16012c8b1ba45274dda2ba7e&units=metric`;
  axios.get(weatherApi).then(displayWeather);
}

function convertFar() {
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27c5687a16012c8b1ba45274dda2ba7e&units=imperial`;
  axios.get(weatherApi).then(displayWeather);
}

function convertCel() {
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27c5687a16012c8b1ba45274dda2ba7e&units=metric`;
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
  windElement.innerHTML = `Windspeed: ${wind}`;
  writtenCondition.innerHTML = description;
  tempElement.innerHTML = `${temp}`;
  currentIcon.src = iconUrl;
  hiLo.innerHTML = `Lo: ${tempLo} | Hi: ${tempHi}`;

  displayForecast();

  console.log(response);
}

let searchForm = document.querySelector("#searchForm");
let userInput = searchForm.querySelector("#search-input");
searchForm.addEventListener("submit", getWeather);

let conditions = document.querySelector("#col-2");
let cityElement = conditions.querySelector(".city");
let humidityElement = conditions.querySelector(".humidity");
let windElement = conditions.querySelector(".wind");
let tempElement = document.querySelector("#current-temp");
let hiLo = document.querySelector("#main-hi-lo");
let writtenCondition = document.querySelector(".condition-description");

let currentIcon = document.getElementById("conditionIcon");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="forecast-date">${day}</div>
              <img
                class="forecast-icon"
                src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                alt=""
              />
              <div class="forecast-temps">
                <span class="forecast-hi">80º</span>
                <span class="forecast-lo">68º</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
