let today = document.querySelector("#date");

function isToday(timeValue) {
    let now = new Date(timeValue);
    let dayMonth = now.getTime();
    // let days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"];
    // let day = days[now.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    return `${dayMonth} ${month} ${year}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) { hours = `0${hours}` };
    let minutes = date.getMinutes();
    if (minutes < 10) { minutes = `0${minutes}` };
    return `${hours}:${minutes}`
}
///SEARCH A CITY
function citySearch(event) {
    event.preventDefault();
    let input = document.querySelector("#search-input");
    let chosenCity = input.value;
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(displayCityForecast);
    console.log(apiUrl);
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
    let longitude = `${position.coords.longitude}`;
    let actualCity = document.querySelector("#search-input");
    actualCity.innerHTML = "Atual Location";
    let key = "a34d18380688cbcca8e36a7c0180b644";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);

    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
    axios.get(url).then(displayCityForecast);
}
//  ACTUAL WEATHER

function displayWeather(response) {
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

function displayCityForecast(response) {
    let cityForecastElement = document.querySelector("#whole-forecast");
    cityForecastElement.innerHTML = null;
    cityForecast = null;
    for (index = 0; index < 6; index++) {
        let cityForecast = response.data.list[index];
        cityForecastElement.innerHTML +=
            `<div class = "col-2">
    <div id="hour">
    ${formatHours(cityForecast.dt*1000)}
    </div> 
    <img src = "http://openweathermap.org/img/wn/${cityForecast.weather[0].icon}@2x.png" alt = "img1" class = "image"/>
    <div class = "Tempe">
    <strong> ${Math.round(cityForecast.main.temp_max)}º </strong> ${Math.round(cityForecast.main.temp_min)}º
    </div> 
</div>`;
    }
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