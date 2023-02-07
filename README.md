# Module 8 Server-Side APIs:

## Weather Dashboard

For this challenge I used JavaScript to build a weather application that allows the user to search for the current weather conditions of a city. The current date and time are displayed on the page using the moment.js library. When the user clicks the search button, an AJAX request is sent to the OpenWeatherMap API to retrieve the current weather data for the city entered in the input field. The weather data is then displayed on the page, including the city name, temperature, wind speed, and humidity. An icon is also displayed, representing the current weather condition, and is determined by the icon code returned from the API. 

The user's search history is saved to local storage and displayed in a list on the page. The user can clear the weather data and their search history using the clear button.

The page is built in HTML defining the structure of a weather dashboard web page. This includes a jumbotron section with a title, a city search section with an input field, search and clear buttons, a display area for previously searched cities, and a result section to display the current weather information of a city. The page uses Bootstrap, FontAwesome and a custom stylesheet "style.css".

I used (https://openweathermap.org/forecast5) to retrieve weather data for cities. 


**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```text
AS A traveler
I WANT to see the weather outlook for any chosen city
SO THAT I can pack accordingly
```


---

© 2023 Andrea Gates
