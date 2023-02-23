# Module 8 Server-Side APIs:

## Weather Dashboard

a weather dashboard web page. It includes various components like search box, clear history button, and weather data components like temperature, humidity, wind speed, and a 5-day forecast. The page design is built using the Bootstrap framework, and the Font Awesome library is used for the icons.

The main components of the web page are:

A jumbotron container at the top with a title and a brief description of the website.
A search box where users can enter the name of a city they want to see the weather data for.
A "Clear History" button to clear the search history.
Current weather data like the city name, temperature, humidity, wind speed, and an icon representing the weather condition.
A 5-day forecast showing the date, weather icon, temperature, wind speed, and humidity for each day.
The code also includes a link to an external stylesheet named "style.css" and two external libraries - Bootstrap and Font Awesome.
For this challenge I used JavaScript to build a weather application that allows the user to search for the current weather conditions of a city. The current date and time are displayed on the page using the moment.js library. When the user clicks the search button, an AJAX request is sent to the OpenWeatherMap API to retrieve the current weather data for the city entered in the input field. The weather data is then displayed on the page, including the city name, temperature, wind speed, and humidity. An icon is also displayed, representing the current weather condition, and is determined by the icon code returned from the API. 

The user's search history is saved to local storage and displayed in a list on the page. The user can clear the weather data and their search history using the clear button.

The page is built in HTML defining the structure of a weather dashboard web page. This includes a jumbotron section with a title, a city search section with an input field, search and clear buttons, a display area for previously searched cities, and a result section to display the current weather information of a city. The page uses Bootstrap, FontAwesome and a custom stylesheet "style.css".

I used (https://openweathermap.org/forecast5) to retrieve weather data for cities. 

```text
AS A traveler
I WANT to see the weather outlook for any chosen city
SO THAT I can pack accordingly
```


---

© 2023 Andrea Gates
