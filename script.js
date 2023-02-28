const API_KEY = "7b35b25c06f5ba186bd9f9a5682e4eed";

const $searchInput = $("#search-city");
const $searchButton = $("#search-button");
const $currentCity = $("#current-city");
const $temperature = $("#temperature");
const $humidity = $("#humidity");
const $windSpeed = $("#wind-speed");
const $icon = $("#icon");
const $forecastList = $("#forecast-list");

let citySearches = [];
const storedSearches = localStorage.getItem("citySearches");

if (storedSearches) {
  citySearches = JSON.parse(storedSearches);

  for (let i = 0; i < citySearches.length; i++) {
    createButton(citySearches[i]);
  }
}

$searchButton.on("click", function () {
  const cityName = $searchInput.val().trim();
  addToList(cityName);
  searchWeather(cityName);
});

$("#clear-history").on("click", function () {
  localStorage.removeItem("citySearches");
  $(".city-search-append").empty();
  citySearches = [];
});

function createButton(cityName) {
  const button = $("<button>")
    .attr("type", "button")
    .addClass("btn btn-secondary")
    .text(cityName);
  button.on("click", function () {
    searchWeather(cityName);
  });
  $(".city-search-append").append(button);
}

function addToList(cityName) {
  if (cityName) {
    citySearches.push(cityName);
    localStorage.setItem("citySearches", JSON.stringify(citySearches));
    createButton(cityName);
    $searchInput.val("");
  }
}

function searchWeather(cityName) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      const currentDate = moment().format("dddd, MMMM Do YYYY");
      $("#current-date").text(currentDate);
      $currentCity.text(`${data.name}, ${data.sys.country}`);
      $temperature.text(`${data.main.temp.toFixed(1)}°C`);
      $humidity.text(`${data.main.humidity}%`);
      $windSpeed.text(`${data.wind.speed.toFixed(1)} m/s`);
      $icon.html(
        `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`
      );
      const today = moment().format("YYYY-MM-DD");

      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          const forecast = data.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );
          $forecastList.empty();

          for (let i = 0; i < forecast.length; i++) {
            const forecastDate = moment(forecast[i].dt_txt).format(
              "dddd, MMMM Do"
            );
            const forecastTemp = forecast[i].main.temp.toFixed(1);
            const forecastHumidity = forecast[i].main.humidity;
            const forecastIcon = forecast[i].weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${forecastIcon}.png`;

            const $li = $("<li>").addClass(
              "list-group-item flex-column align-items-start"
            );
            const $div = $("<div>").addClass("d-flex w-100 justify");
          }
        },
      });

      // AJAX request for five-day forecast
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          // $forecastList.empty();
          for (let i = 0; i < data.list.length; i++) {
            const forecastData = data.list[i];
            if (forecastData.dt_txt.includes("12:00:00")) {
              const date = moment(forecastData.dt_txt).format("M/DD/YYYY");
              const temp = forecastData.main.temp;
              const humidity = forecastData.main.humidity;
              const icon = forecastData.weather[0].icon;
              const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
              const forecastCard = $("<div>").addClass("card forecast-card");
              const cardBody = $("<div>").addClass("card-body");
              const dateEl = $("<h5>").addClass("card-title").text(date);
              const iconEl = $("<img>").attr("src", iconUrl);
              const tempEl = $("<p>")
                .addClass("card-text")
                .text(`Temp: ${temp.toFixed(1)}°C`);
              const humidityEl = $("<p>")
                .addClass("card-text")
                .text(`Humidity: ${humidity}%`);

              cardBody.append(dateEl, iconEl, tempEl, humidityEl);
              forecastCard.append(cardBody);
              $forecastList.append(forecastCard);
            }
          }
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
        },
      });
    },
  });
}

