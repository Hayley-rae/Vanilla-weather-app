let now = new Date();

function getWeather(event) {
  event.preventDefault();
  let city = userInput.value;
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27c5687a16012c8b1ba45274dda2ba7e&units=metric`;
  axios.get(weatherApi).then(displayWeather);
}
function displayWeather(response) {
  let datapoint = response.data;
  let cityName = datapoint.name;
  let humidity = datapoint.main.humidity;
  let wind = Math.round(datapoint.wind.speed);
  cityElement.innerHTML = cityName;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind}kh`;
}

let searchForm = document.querySelector("#searchForm");
let userInput = searchForm.querySelector("#search-input");
searchForm.addEventListener("submit", getWeather);

let conditions = document.querySelector("#col-2");
let cityElement = conditions.querySelector(".city");
let humidityElement = conditions.querySelector(".humidity");
let windElement = conditions.querySelector(".wind");
