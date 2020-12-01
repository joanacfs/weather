let today = document.querySelector("#date");

function isToday() {
    let now = new Date();
    let dayMonth = now.getDate();
    let days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];
    let day = days[now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];
    return (today.innerHTML = `${day}, ${dayMonth} ${month}`);
}
///CHOOSE A CITY
function citySearch(event) {
    event.preventDefault();
    let input = document.querySelector("#search-input");
    let actualCity = document.querySelector("#actual-city");
    let chosenCity = input.value;
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let cityNameUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${key}&units=metric`;
    actualCity.innerHTML = chosenCity;
    axios.get(cityNameUrl).then(displayWeather);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", citySearch);

// /// OR SEARCH CURRENT POSITION
let currentLocation = document.querySelector("#AtualLocationButton");
currentLocation.addEventListener("click", determineLocation);

function determineLocation() {
    let geolocation = navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    let actualCity = document.querySelector("#actual-city");
    actualCity.innerHTML = `Your coordinates are ${position.coords.latitude} and ${position.coords.longitude}`;
    let latitude = `${position.coords.latitude}`;
    console.log(latitude);
    let longitude = `${position.coords.longitude}`;
    console.log(longitude);
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);
    console.log("url  " + url);
}
//  ACTUAL WEATHER

function displayWeather(response) {
    let weatherMax = document.querySelector("#temp-now-max");
    let weatherMin = document.querySelector("#temp-now-min");
    console.log("1");
    let temperatureMax = Math.round(response.data.main.temp_max);
    let temperatureMin = Math.round(response.data.main.temp_min);
    weatherMax.innerHTML = `${temperatureMax}`
    weatherMin.innerHTML = `${temperatureMin}`
    return (temperatureMax, temperatureMin);

}

///ºF AND ºC
function toFahrenheit(event) {
    event.preventDefault
    let tempFahrenheitMax = document.querySelector("#temp-now-max");
    let tempFahrenheitMin = document.querySelector("#temp-now-min");
    tempFahrenheitMax.innerHTML = (22 * 9 / 5 + 32);
    tempFahrenheitMin.innerHTML = (14 * 9 / 5 + 32);
}
let buttonFahrenheit = document.querySelector("#fahrenheit-button");
buttonFahrenheit.addEventListener("click", toFahrenheit);

function toCelsius(event) {
    event.preventDefault();
    let tempCelsiusMax = document.querySelector("#temp-now-max");
    let tempCelsiusMin = document.querySelector("#temp-now-min");
    tempCelsiusMax.innerHTML = 22;
    tempCelsiusMin.innerHTML = 14;
}
// var someVar; 
// someVar = some_other_function();
// alert(someVar);
// someObj.addEventListener("click", function(){
//     some_function(someVar);
// }, false);

let buttonCelsius = document.querySelector("#celsius-button");
buttonCelsius.addEventListener("click", toCelsius)