function getWeather(event) {
  event.preventDefault();
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27c5687a16012c8b1ba45274dda2ba7e&units=imperial`;
  axios.get(weatherApi).then(displayWeather);
}
function displayWeather(response) {
  let datapoint = response.data;
  let cityName = datapoint.name;
  let temp = Math.round(datapoint.main.temp);
  let humidity = datapoint.main.humidity;
  let wind = Math.round(datapoint.wind.speed);
  let iconId = datapoint.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  cityElement.innerHTML = cityName;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}mph`;
  tempElement.innerHTML = `${temp}º`;
  currentIcon.src = iconUrl;
}

let searchForm = document.querySelector("#searchForm");
let userInput = searchForm.querySelector("#search-input");
searchForm.addEventListener("submit", getWeather);

let conditions = document.querySelector("#col-2");
let cityElement = conditions.querySelector(".city");
let humidityElement = conditions.querySelector(".humidity");
let windElement = conditions.querySelector(".wind");
let tempElement = document.querySelector("#current-temp");

let currentIcon = document.getElementById("conditionIcon");
