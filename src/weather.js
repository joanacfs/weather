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
///SEARCH A CITY
function citySearch(event) {
    event.preventDefault();
    let input = document.querySelector("#search-input");
    let chosenCity = input.value;
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", citySearch);

// /// OR SEARCH CURRENT POSITION
let currentLocation = document.querySelector("#AtualLocationButton");
currentLocation.addEventListener("click", determineBrowserLocation);

function determineBrowserLocation() {
    let geolocation = navigator.geolocation.getCurrentPosition(showPosition);
}

window.onload = function() {
    determineBrowserLocation();
}

function showPosition(position) {
    let latitude = `${position.coords.latitude}`;
    console.log(latitude);
    let longitude = `${position.coords.longitude}`;
    console.log(longitude);
    let actualCity = document.querySelector("#search-input");
    actualCity.innerHTML = "Atual Location";
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);
    console.log("url  " + url);

    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&daily={part}&appid=${key}&units=metric`;
    axios.get(url).then(displayForecast);
    console.log(url);
}
//  ACTUAL WEATHER

function displayWeather(response) {
    console.log(response.data);
    let description = document.querySelector("#description");
    let windSpeed = document.querySelector("#wind-speed");
    let humidity = document.querySelector("#humidity");

    let weatherMax = document.querySelector("#temp-now-max");
    let weatherMin = document.querySelector("#temp-now-min");
    let icon = document.querySelector("#weatherNowIcon");

    let wDescription = response.data.weather[0].description;
    let wSpeed = Math.round(response.data.wind.speed);
    let wHumidity = response.data.main.humidity;

    celsiusMaxTemp = response.data.main.temp_max;
    celsiusMinTemp = response.data.main.temp_min;
    let temperatureMax = Math.round(celsiusMaxTemp);
    let temperatureMin = Math.round(celsiusMinTemp);
    let weatherIcon = response.data.weather[0].icon;

    description.innerHTML = `${wDescription}`
    windSpeed.innerHTML = `Wind Speed ${wSpeed} km/h`
    humidity.innerHTML = ` Humidity ${wHumidity}%`
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`)
    weatherMax.innerHTML = `${temperatureMax}`
    weatherMin.innerHTML = `${temperatureMin}`
    return (wDescription, wSpeed, wHumidity, temperatureMax, temperatureMin, weatherIcon);
}

function displayForecast(response) {
    let forecast = document.querySelector("#whole-forecast");
    console.log(response.data.daily);
    forecast.innerHTML =
        `<div class = "col-2">
        <div id="monday">
        Monday
        </div> 
        <img src = "#" alt = "img1" class = " col-11 image"/>
        <div class = "Tempe">
        <strong> 18 </strong> 14º 
        </div> 
    </div>`;
}

///ºF AND ºC
function toFahrenheit(event) {
    event.preventDefault
    let tempFahrenheitMax = document.querySelector("#temp-now-max");
    let tempFahrenheitMin = document.querySelector("#temp-now-min");
    tempFahrenheitMax.innerHTML = Math.round(celsiusMaxTemp * 9 / 5 + 32);
    tempFahrenheitMin.innerHTML = Math.round(celsiusMinTemp * 9 / 5 + 32);
}


function toCelsius(event) {
    event.preventDefault();
    let tempCelsiusMax = document.querySelector("#temp-now-max");
    let tempCelsiusMin = document.querySelector("#temp-now-min");
    tempCelsiusMax.innerHTML = Math.round(celsiusMaxTemp);
    tempCelsiusMin.innerHTML = Math.round(celsiusMinTemp);
}

let celsiusMaxTemp = null;
let celiusMinTemp = null;

let buttonFahrenheit = document.querySelector("#fahrenheit-button");
buttonFahrenheit.addEventListener("click", toFahrenheit);

let buttonCelsius = document.querySelector("#celsius-button");
buttonCelsius.addEventListener("click", toCelsius)