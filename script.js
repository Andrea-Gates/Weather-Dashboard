let now = moment().format('MMMM Do YYYY, h:mm:ss a');
document.getElementById("displayDateTime").innerHTML = now;

let cityCounter = 0; // Add a counter to create unique keys
let APIKey = "db96798e36648272b771c43556b2105a";

// search for city weather
$("#search-button").on("click", function () {
  let city = $("#city-input").val();
  getWeather(city);
});

function getWeather(city) {
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=db96798e36648272b771c43556b2105a",
    dataType: "json",
    success: function (data) {
      // display current weather data
      $("#current-city").text(data.name + " " + data.sys.country);
$("#icon").text(data.weather[0].main + "icon");
$("#temperature").text(data.main.temp + "°F");
$("#wind-speed").text(data.wind.speed + " mph");
$("#humidity").text(data.main.humidity + "%");

      let weatherCondition = data.weather[0].main;


      if (weatherCondition === "clear") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-sun"></i>';
      } else if (weatherCondition === "rain") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-umbrella"></i>';
      } else if (weatherCondition === "clouds") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-cloud"></i>';
      } else if (weatherCondition === "snow") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-snowflake"></i>';
      }
    },
  });

  // get previous searches
  let prevSearches = JSON.parse(localStorage.getItem("prevSearches")) || [];

  // add current city to previous searches if it's not already there
  if (!prevSearches.includes(city)) {
    prevSearches.push(city);
    // limit the number of stored previous searches to 5
    if (prevSearches.length > 5) {
      prevSearches.shift();
    }
    localStorage.setItem("prevSearches", JSON.stringify(prevSearches));
  }

  // display previous searches
  $("#prevSearches").empty();
  for (let i = 0; i < prevSearches.length; i++) {
    let cityBtn = $("<button>").text(prevSearches[i]);
    cityBtn.on("click", function () {
      getWeather(this.textContent);
    });
    $("#prevSearches").append(cityBtn);
  }
}

// clear weather data
$("#clear-button").on("click", function () {
  $("#current-city").empty();
  $("#icon").empty();
  $("#temperature").empty();
  $("#wind-speed").empty();
  $("#humidity").empty();
  });

// Five-day forecast

// let forecast = [
//   { day: "Monday", temperature: 78},
//   { day: "Tuesday", temperature: 75 },
//   { day: "Wednesday", temperature: 80 },
//   { day: "Thursday", temperature: 78 },
//   { day: "Friday", temperature: 72 }
// ];

// for (let i = 0; i < forecast.length; i++) {
//   let card = document.getElementById(`card${i + 1}`);
//   card.innerHTML = `<p>${forecast[i].day}</p><p>${forecast[i].temperature}°F</p>`;
// }
