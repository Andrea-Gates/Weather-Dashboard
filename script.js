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
      $("#icon").text(data.weather[0].main + "" + "icon");
      let temperature = (data.main.temp -273.15) * 9/5 + 32;
      $("#temperature").text(temperature.toFixed(2) + "°F");
      $("#wind-speed").text(data.wind.speed + " mph");
      $("#humidity").text(data.main.humidity + "%");

      let weatherCondition = data.weather[0].main;
      let iconCode = data.weather[0].icon;

      if (iconCode === "01d") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-sun"></i>';
      } else if (iconCode === "10d" || iconCode === "09d") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-umbrella"></i>';
      } else if (iconCode === "03d" || iconCode === "04d") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-cloud"></i>';
      } else if (iconCode === "13d") {
        document.getElementById("icon").innerHTML = '<i class="fas fa-snowflake"></i>';
      }      
      },
    });
  }
  
// // Save search to local storage
// const saveSearch = (city) => {
//   let searches;
//   if (localStorage.getItem("searches") === null) {
//     searches = [];
//   } else {
//     searches = JSON.parse(localStorage.getItem("searches"));
//   }
//   searches.push(city);
//   localStorage.setItem("searches", JSON.stringify(searches));
// };

// // Search button click event
// const searchButton = document.querySelector("#search-button");
// searchButton.addEventListener("click", () => {
//   const cityInput = document.querySelector("#city-input");
//   saveSearch(cityInput.value);
//   displaySearches();
// });

// // Clear button click event
// const clearButton = document.querySelector("#clear-button");
// clearButton.addEventListener("click", () => {
//   localStorage.removeItem("searches");
//   displaySearches();

// // clear weather data
//    $("#current-city").empty();
//    $("#icon").empty();
//    $("#temperature").empty();
//    $("#wind-speed").empty();
//    $("#humidity").empty();
// });

// // Display revious searches on page load
// displaySearches(){

// const displaySearches = () => {
//   let searches;
//   if (localStorage.getItem("searches") === null) {
//     searches = [];
//   } else {
//     searches = JSON.parse(localStorage.getItem("searches"));
//   }
//   const historyList = document.querySelector(".history");
//   historyList.innerHTML = "";
//   searches.forEach((search) => {
//     const li = document.createElement("li");
//     li.className = "list-group-item";
//     li.appendChild(document.createTextNode(search));
//     historyList.appendChild(li);
//   });
// };

// }


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
