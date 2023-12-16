var apiKey = '90e053cb8e7dc227bd04ff0ace8dc2a3';
var city = document.querySelector('#city-name');
var citySearch = document.querySelector('#search-button');    
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
        cityContainer.appendChild(recentCity);

        let lat = data[0].lat;
        let lon = data[0].lon;

        getLocation(lat, lon);
     });
}

