let now = moment();
let displayDateTime = now.format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#displayDateTime").text(displayDateTime);

$(document).ready(function () {
  let city = "city";
  let APIKey = "8069459a7756ef7bdd8a06ec8a382c04";
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

});

$("#search-button").on("click", function () {
  let city = $("#city-input").val();
  getWeather(city);
});

// function to find if search data exist (i.e., is this a real city: "Tokyo", not "tokyo")
function find(c) {
  for (let i = 0; i < sCity.length; i++) {
    if (c.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

// display weather according to city text input into search box
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}
// Create ajax call to get weather data
function getWeather(city) {}
$.ajax({
  url: queryURL,
  method: "GET",
}).then(data);
{
  let iconCode = data.weather[0].icon;
  document.getElementById(
    "icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png"></img>`;
  let date = new Date(response.dt * 1000).toLocaleDateString();
  $("#current-city").text(data.name + " " + data.sys.country);
  // $("#icon").text(data.weather[0].main + "" + "icon");
  let tempF = (data.main.temp - 273.15) * 1.8 + 32;
  $(currentTemperature).html(tempF.toFixed(2) + "&#8457");
  $(currentHumidity).html(response.main.humidity + "%");
  let ws = response.wind.speed;
  let windsmph = (ws * 2.237).toFixed(1);
  $(currentWSpeed).html(windsmph + "MPH");
}

if (response.cod == 200) {
  sCity = JSON.parse(localStorage.getItem("cityname"));
  console.log(sCity);
  if (sCity == null) {
    sCity = [];
    sCity.push(city.toUpperCase());
    localStorage.setItem("cityname", JSON.stringify(sCity));
    addToList(city);
  } else {
    if (find(city) > 0) {
      sCity.push(city.toUpperCase());
      localStorage.setItem("cityname", JSON.stringify(sCity));
      addToList(city);
    }
  }
}

function addToList(c) {
  let listEl = $("<li>" + c.toUpperCase() + "</li>");
  $(listEl).attr("class", "list-group-item");
  $(listEl).attr("data-value", c.toUpperCase());
  $(".list-group").append(listEl);
}

// display the past search again when the list group item is clicked in search history
function invokePastSearch(event) {
  let liEl = event.target;
  if (event.target.matches("li")) {
    city = liEl.textContent.trim();
    currentWeather(city);
  }
}

function loadlastCity() {
  $("ul").empty();
  let sCity = JSON.parse(localStorage.getItem("cityname"));
  if (sCity !== null) {
    sCity = JSON.parse(localStorage.getItem("cityname"));
    for (i = 0; i < sCity.length; i++) {
      addToList(sCity[i]);
    }
    city = sCity[i - 1];
    currentWeather(city);
  }
}

//Clear the search history from the page
function clearHistory(event) {
  event.preventDefault();
  sCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

//Click Handlers
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);

// Save search to local storage
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
// displaySearches();{
// }

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
