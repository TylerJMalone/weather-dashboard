$(document).ready(function() {
    const apiKey = '90e053cb8e7dc227bd04ff0ace8dc2a3';

    $('#searchButton').on('click', function() {
        const city = $('#cityInput').val();
        if (city !== '') {
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                displayForecast(data);
            },
            error: function(error) {
                console.error('Error fetching weather data:', error);
            }
        });
    }

    function displayForecast(data) {
        const forecastContainer = $('#forecastContainer');
        forecastContainer.empty();

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const temperature = item.main.temp;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;

            const forecastCard = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${date.toLocaleDateString()}</h5>
                        <p class="card-text">Temperature: ${temperature} K</p>
                        <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
                        <p class="card-text">Humidity: ${humidity}%</p>
                    </div>
                </div>
            `;
            forecastContainer.append(forecastCard);
        });
    }
});
