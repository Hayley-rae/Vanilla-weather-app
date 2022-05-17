let now = new Date();

function showWeather(response) {
  console.log(response);
}

function findData(event) {
  event.preventDefault();
  console.log(response);
}
let searchForm = document.querySelector("#searchForm");
let userInput = searchForm.querySelector("#search-input");
searchForm.addEventListener("submit", findData);

let rightCol = document.querySelector("#col-2");
let cityElement = rightCol.querySelector(".city");

let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=&appid=27c5687a16012c8b1ba45274dda2ba7e&units=metric`;
axios.get(weatherApi).then(showWeather);
