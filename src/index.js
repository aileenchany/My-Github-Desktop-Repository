//In your project, display the current date and time using JavaScript

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let month = now.getMonth() + 1;
let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let amOrPM = now.getHours() < 12 ? "am" : "pm";

let newDateUpdate = document.querySelector("#date");

newDateUpdate.innerHTML = `${
  days[now.getDay()]
}, ${month}/${date}, ${hour}:${minutes}${amOrPM}`;


//Week 5 - I want my current temperature already updated upon loading the page

function refreshUponLoad () {

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=f9ed2779c7a88244e3c6c97a1ad830b5&units=imperial`;

  axios.get(apiUrl).then(displayWeatherConditions); 
}  

refreshUponLoad();

//Week 5 - challenge - when user does a city search, city name is displayed , along with temperature & curent weather description
//First - I tell the search form to listen for a submit and trigger the changeCity function
//Second - The function will access the city input & add this value into the apiUrl & trigger the showCityTemp function
//Third - The function takes temperature data and displays it back to the user

function displayWeatherConditions(response) {

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#temp-max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#temp-min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  
}

function handleSubmit(event) {
  event.preventDefault();
  
  let city = document.querySelector("#city-input").value;
  let units = "imperial";

  let apiKey = "f9ed2779c7a88244e3c6c97a1ad830b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayWeatherConditions);
}


let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);


//Week 5 - challenge - get temperature by geolocation
//First - I tell the button to listen for a click and if so, trigger a getCurrentPosition function
//Second - The function access data from the navigation geolocation from the browser and trigger the showCurrentPostiion function
//Third - the function fetches the latitude and longitude & tell axios to use the apiUrl and trigger showCurrentCityTemp function
//Fourth - the function access the dcoument & creates a query & should display the new data to the user

function showCurrentPosition(position) {
  let units = "imperial";
  let apiKey = "f9ed2779c7a88244e3c6c97a1ad830b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

//Temperature change between Fahrenheit and Celcius - current temperature is in Fahrenheit
//First - I'm telling the celcius link to listen for a click  & if so, trigger the convertToCelcius function
//Second - In the function I'm accessing the city element & using the innerHTML as the city for the URL
//This triggers axios to fetch data again, but this time in metric system
//Third - I call the showCelciusTemp function which rounds out the temperature to be displayed to the user
//Inversely, I followed the same steps to fetch back the Fahrenheit temperature

function showCelciusTemp(response) {
  let celciusTemp = document.querySelector("#temperature");
  celciusTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToCelcius() {

  let cityElement = document.querySelector("#city");
  
  let city = cityElement.innerHTML;
  let units = "metric";
  let apiKey = "f9ed2779c7a88244e3c6c97a1ad830b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showCelciusTemp);
}
function showFahrenheitTemp(response) {
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = Math.round(response.data.main.temp);
}
function convertToFahrenheit() {
  let cityElement = document.querySelector("#city");
  
  let city = cityElement.innerHTML;
  let units = "imperial";
  let apiKey = "f9ed2779c7a88244e3c6c97a1ad830b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showFahrenheitTemp);
  
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

