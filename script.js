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

// let searchHistoryArray = loadSearchHistory;

// Define an empty array to store the city searches
let citySearches = [];

// Retrieve the city searches from localStorage, if any
let storedSearches = localStorage.getItem("citySearches");
if (storedSearches) {
  // If there are saved searches, parse the JSON string into an array
  citySearches = JSON.parse(storedSearches);
  // Loop through the array to create the buttons
  for (let i = 0; i < citySearches.length; i++) {
    let button = $("<button>")
      .attr("type", "button")
      .addClass("btn btn-secondary")
      .text(citySearches[i]);
    $(".city-search-append").append(button);
  }
}

// Add a click event listener to the search button

// Get the input value
function addToList() {
  let city = $("#search-city").val().trim();
  console.log(city);
  if (city) {
    // If the input value is not empty, add it to the array
    citySearches.push(city);
    // Save the updated array to localStorage
    localStorage.setItem("citySearches", JSON.stringify(citySearches));
    // Create a button for the new search
    let button = $("<button>")
      .attr("type", "button")
      .addClass("btn btn-secondary")
      .text(city);

    $(button).on("click", function (event) {
      console.log(event.target.innerHTML);
    });
    $(".city-search-append").append(button);
    // Clear the input field
    $("#search-city").val("");
  }
}

// Add a click event listener to the clear history button
$("#clear-history").on("click", function () {
  // Remove the saved searches from localStorage
  localStorage.removeItem("citySearches");
  // Remove the buttons from the page
  $(".city-search-append").empty();
  // Clear the citySearches array
  citySearches = [];
});

// search button
$searchButton.on("click", function () {
  const cityName = $searchInput.val().trim();
  addToList();

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

      // AJAX request for five-day forecast
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`,
        method: "GET",
        dataType: "json",
        success: function (data) {
          // $forecastList.empty();
          for (let i = 0; i < 5; i++) {
            // get the forecast date
            let date = new Date(data.list[i * 8].dt * 1000);
            let dayOfWeek = moment(date).format("dddd");
            let formattedDate = moment(date).format("MMMM Do");
            // get the forecast icon
            let iconCode = data.list[i * 8].weather[0].icon;
            let iconURL =
              "https://openweathermap.org/img/w/" + iconCode + ".png";
            // get the forecast temperature, wind speed, and humidity
            let temp = data.list[i * 8].main.temp;
            let wind = data.list[i * 8].wind.speed;
            let humidity = data.list[i * 8].main.humidity;

            document.getElementById("fDate" + (i + 1)).textContent =
              dayOfWeek + ", " + formattedDate;
            document.getElementById("fImg" + (i + 1)).innerHTML =
              "<img src='" + iconURL + "'>";
            document.getElementById("fTemp" + (i + 1)).textContent =
              temp + " °C";
            document.getElementById("fWind" + (i + 1)).textContent =
              wind + " m/s";
            document.getElementById("fHumidity" + (i + 1)).textContent =
              humidity + " %";
          }
        },
      }),
        function titleCase(str) {
          let splitStr = str.toLowerCase().split(" ");
          for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] =
              splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
          }
          return splitStr.join(" ");
        };
    },
  });
});
