let now = moment();
let displayDateTime = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#displayDateTime").text(displayDateTime);

// OpenWeatherMap API key
const API_KEY = "8069459a7756ef7bdd8a06ec8a382c04";

// define DOM elements by jQuery selectors
const $searchInput = $("#search-city");
const $searchButton = $("#search-button");
const $currentCity = $("#current-city");
const $temperature = $("#temperature");
const $humidity = $("#humidity");
const $windSpeed = $("#wind-speed");
const $icon = $("#icon");

// search button
$searchButton.on("click", function () {
  const cityName = $searchInput.val().trim();

  // AJAX request to OpenWeatherMap API for current weather
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      $currentCity.text(`${data.name}, ${data.sys.country}`);
      $temperature.text(`${data.main.temp}°C`);
      $humidity.text(`${data.main.humidity}%`);
      $windSpeed.text(`${data.wind.speed} m/s`);
      $icon.html(
        `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`
      );
      const today = moment().format("YYYY-MM-DD");

      // AJAX request for five-day forecast
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&cnt=5&start=${today}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          const $forecastList = $("#forecast-list");
          $forecastList.empty();
          for (let i = 0; i < data.list.length; i++) {
            const forecastData = data.list[i];
            const forecastDate = new Date(forecastData.dt * 1000);
            const forecastDateString = forecastDate.toLocaleDateString();
            const forecastIcon = forecastData.weather[0].icon;
            const forecastTemp = forecastData.main.temp;
            const forecastHumidity = forecastData.main.humidity;
            const forecastWindSpeed = forecastData.wind.speed;

            $forecastList.append(`
    <li>
      <p>${forecastDateString}</p>
      <img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="">
      <p>Temp:  ${forecastTemp}°C</p>
      <p>Humidity:  ${forecastHumidity}%</p>
      <p>Wind Speed:  ${forecastWindSpeed} m/s</p>
    </li>
  `);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(`AJAX error: ${textStatus} (${errorThrown})`);
        },
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(`AJAX error: ${textStatus} (${errorThrown})`);
    },
  });
});

// Save searched city to local storage
let cityName = "cities";
let cities = localStorage.getItem("cities")
  ? JSON.parse(localStorage.getItem("cities"))
  : [];
cities.push(cityName);
localStorage.setItem("cities", JSON.stringify(cities));

// Render button for searched city
$("#search-history").append(`<button class="city-button">${cityName}</button>`);

//Clear the search history from the page
function clearHistory(event) {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

let displayWeather = "data";
//Click Handlers
$("#search-button").on("click", displayWeather);
// $(document).on("click", invokePastSearch);
// $(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);
