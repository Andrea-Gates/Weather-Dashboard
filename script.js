let displayDateTime = document.getElementById("displayDateTime");
setInterval(function () {
  let now = moment();
  displayDateTime.textContent = now.format("MMMM Do YYYY, h:mm:ss a");
}, 1000);

let currentDay = moment().format("M/DD/YYYY");
// OpenWeatherMap API key
const API_KEY = "7b35b25c06f5ba186bd9f9a5682e4eed";
// define DOM elements by jQuery selectors
const $searchInput = $("#search-city");
const $searchButton = $("#search-button");
const $currentCity = $("#current-city");
const $temperature = $("#temperature");
const $humidity = $("#humidity");
const $windSpeed = $("#wind-speed");
const $icon = $("#icon");
const $forecastList = $("#forecast-list");

let searchHistoryArray = loadSearchHistory;

// search button
$searchButton.on("click", function () {
  const cityName = $searchInput.val().trim();

  // AJAX request to OpenWeatherMap API for current weather
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

      function displayForecast(data) {
        // loop through the forecast data and display it on the webpage
        for (let i = 0; i < 5; i++) {
          // get the forecast date
          let date = newDate(data.list[i * 8].dt * 1000);
          let dayOfWeek = moment(date).format("dddd");
          let formattedDate = moment(date).format("MMMM Do");
          // get the forecast icon
          let iconCode = data.list[i * 8].weather[0].icon;
          let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
          // get the forecast temperature, wind speed, and humidity
          let temp = data.list[i * 8].main.temp;
          let wind = data.list[i * 8].wind.speed;
          let humidity = data.list[i * 8].main.humidity;
          // display the forecast data on the webpage
          document.getElementById("fDate" + (i + 1)).textContent =
            dayOfWeek + ", " + formattedDate;
          document.getElementById("fImg" + (i + 1)).innerHTML =
            "<img src='" + iconURL + "'>";
          document.getElementById("fTemp" + (i + 1)).textContent = temp + " °C";
          document.getElementById("fWind" + (i + 1)).textContent =
            wind + " m/s";
          document.getElementById("fHumidity" + (i + 1)).textContent =
            humidity + " %";
        }
      }

      // AJAX request for five-day forecast
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          $forecastList.empty();
          for (let i = 0; i < 5; i++) {
            const forecastData = data.list[i];
            const forecastDate = moment(forecastData.dt_txt);
            const forecastDateString = forecastDate.format("llll");
            const forecastIcon = forecastData.weather[0].icon;
            const forecastTemp = forecastData.main.temp.toFixed(1);
            const forecastHumidity = forecastData.main.humidity;
            const forecastWindSpeed = forecastData.wind.speed.toFixed(1);
            $forecastList.append(`
        <li>
          <p>${forecastDateString}</p>
          <img src="https://openweathermap.org/img/w/${forecastIcon}.png" alt="">
          <p>Temp: ${forecastTemp}°C</p>
          <p>Humidity: ${forecastHumidity}%</p>
          <p>Wind Speed: ${forecastWindSpeed} m/s</p>
        </li>
      `);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(`AJAX error: ${textStatus} (${errorThrown})`);
        },
      });
    },
  });
});

function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

//load cities from local storage and create history buttons
function loadSearchHistory() {
  let searchHistoryArray = JSON.parse(localStorage.getItem("search history"));

  // if localStorage empty, create a search array to keep user input
  if (!searchHistoryArray) {
    searchHistoryArray = {
      searchedCity: [],
    };
  } else {
    //add search history buttons to page
    for (let i = 0; i < searchHistoryArray.searchedCity.length; i++) {
      searchHistory(searchHistoryArray.searchedCity[i]);
    }
  }

  return searchHistoryArray;
}

//save to local storage
function saveSearchHistory() {
  localStorage.setItem("search history", JSON.stringify(searchHistoryArray));
}

//create history buttons
function searchHistory(city) {
  let searchHistoryBtn = $("<button>")
    .addClass("btn")
    .text(city)
    .on("click", function () {
      $("#current-weather").remove();
      $("#five-day").empty();
      $("#five-day-header").remove();
      getWeather(city);
    })
    .attr({
      type: "button",
    });

  // append btn to search history div
  searchHistoryEl.append(searchHistoryBtn);
}
