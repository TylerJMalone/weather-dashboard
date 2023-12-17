var apiKey = '90e053cb8e7dc227bd04ff0ace8dc2a3';
var city = document.querySelector('#city-name');
var searchCity = document.querySelector('#search-btn');    
var cityList = document.getElementById('user-search');
var forcastTitle = document.querySelector('.title');
var weatherContainer = document.getElementById('weatherResults');
var forcastContainer = document.getElementById('forcastResults');
var recentCity = [];

function getCity() {
    var cityName = city.value;
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;

    fetch(apiUrl)
    .then(function (response) {
         return response.json();
     })
     .then(function (data) {
        var recentCity = document.createElement('button');
        recentCity.textContent = cityName;
        cityListContainer(data[0]);
        cityList.appendChild(recentCity);

        let lat = data[0].lat;
        let lon = data[0].lon;

        getLocation(lat, lon);
     });
}

function getLocation(lat, lon) {
    var locationQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
    fetch(locationQuery)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
        forcastContainer.innerHTML = '';

        let city = data.city.name;
        let forecastToday = data.list[0];
        let forecastTodayEl = document.querySelector('.today-weather');
        let weatherIcon = forecastToday.weather[0].icon;
        let weatherImg = document.createElement('img');
        weatherImg.src = `https://openweathermap.org/img/w/${weatherIcon}.png`;

        let date = dayjs(forecastToday.dt_txt).day(0, 'day');
        let dateFormat = date.format('MMM DD, YYYY');

        let todayWeather = document.createElement('div');
        todayWeather.innerHTML = 
        `<h2>${city}` +
        `(${dateFormat})` +
        `</h2>` +
        `<p>Temperature: ${forecastToday.main.temp} F</p>` +
        `<p>Humidity: ${forecastToday.main.humidity} %</p>` +
        `<p>Wind Speed: ${forecastToday.wind.speed} MPH</p>`;

        forecastTodayEl.innerHTML = '';
        forecastTodayEl.appendChild(weatherImg);
        forecastTodayEl.appendChild(todayWeather);

        for (let i = 1; i < 6; i++) {
            let forecastDay = data.list[i];
            let forecastDayEl = document.querySelector('.forcast-weather');
            let weatherIcon = forecastDay.weather[0].icon;
            let dailyWeatherImg = document.createElement('img');
            weatherImg.src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
            let date = dayjs(forecastDay.dt_txt).day(0, 'day');
            let dailyDateFormat = date.format('MMM DD, YYYY');

            let forcastWeather = document.createElement('div');
            forcastWeather.classList.add = 'forcast-week';

            var locationSearch = document.createElement('li');
            forecastTitle.textContent = '5-Day Forecast';
            locationSearch.innerHTML = 
            `${dailyDateFormat}` +
					'<br>' +
					'<br>' +
					'Temp.: ' +
					temp +
					'\xB0 F' +
					'<br>' +
					'Humidity: ' +
					humidity +
					'%' +
					'<br>' +
					'Wind: ' +
					wind +
					' Mph';

            locationSearch.appendChild(dailyWeatherImg);
            dailyWeatherImg.style.alignSelf = 'flex-start';

            forecastDayEl.appendChild(forcastWeather);
            forcastWeather.appendChild(locationSearch);
        }
    });
}

function cityListContainer(recent) {
    var pageRefresh = JSON.parse(localStorage.getItem('cities')) || [];
    pageRefresh.push({ lat: recent[0].lat, lon: recent[0].lon });
    localStorage.setItem('cities', JSON.stringify(pageRefresh));
}

function reportContainer(lat, lon) {
    var weatherNow = JSON.parse(localStorage.getItem('weather')) || [];
    weatherNow.push({lat: lat, lon: lon});
    localStorage.setItem('weather', JSON.stringify(weatherNow));
}
function savedCities() {
    var cityListEl = JSON.parse(localStorage.getItem('cities')) || [];
    for (let i = 0; i < cityListEl.length; i++) {
        var newSearch = document.createElement('button');
        newSearch.textContent = cityListEl[i];
        cityList.appendChild(newSearch);
    }
}

window.addEventListener('load', function () {
    savedCities();
});

searchCity.addEventListener('click', function (event) {
    event.preventDefault();
    getCity();
});

document.getElementById('user-search').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const cityName = event.target.textContent;
        getSearhedCity(cityName);
    }
});

function getSearhedCity(cityName) {
    const cityQuery = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey;
    fetch(cityQuery)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
        weatherContainer.innerHTML = '';
        let lat = data[0].lat;
        let lon = data[0].lon;
        getLocation(lat, lon);
     });
    }