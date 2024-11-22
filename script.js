require('dotenv').config();

document.addEventListener('DOMContentLoaded', function() {
    const weatherApi = process.env.API_KEY;
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const startBtn = document.getElementById('start-btn');
    const outerBg = document.querySelector('.outer-bg'); 
    const appMain = document.getElementById('parent');
    const searchBtn = document.getElementById('search-btn');
    const inputBox = document.getElementById('Input-box');
    const weatherBody = document.getElementById('weather-body');

    // Event listener for the start button
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            outerBg.style.display = 'none';
            appMain.style.display = 'block';
        });
    }

    // Event listener for the search button
    if (searchBtn && inputBox) {
        searchBtn.addEventListener('click', function() {
            const city = inputBox.value;
            if (city) {
                fetchWeatherData(city);
            }
        });
    }

    // Fetch weather data from API
    function fetchWeatherData(city) {
        fetch(`${apiUrl}?q=${city}&appid=${weatherApi}&units=metric`)
            .then(response => response.json()) 
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    }

    // Function to display weather data on the webpage
    function displayWeatherData(data) {
        if (data.cod === 200) {
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = `${data.main.temp} °C`;
            const weather = data.weather[0].description;
            const minMax = `Min: ${data.main.temp_min} °C / Max: ${data.main.temp_max} °C`;
            const todayDate = new Date();

            weatherBody.innerHTML = `
                <div class="location-details">
                    <div class="city">${location}</div>
                    <div class="date">${dateManage(todayDate)}</div>
                </div>
                <div class="weather-status">
                    <div class="temp">${Math.round(data.main.temp)}&deg;C</div>
                    <div class="weather">${data.weather[0].main} <i class="${getIconClass(data.weather[0].main)}"></i></div>
                    <div class="min-max">Min: ${Math.floor(data.main.temp_min)}&deg;C / Max: ${Math.ceil(data.main.temp_max)}&deg;C</div>
                    <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
                </div>
                <hr>
                <div class="day-details">
                    <div class="basic">Feels like ${data.main.feels_like}&deg;C | Humidity ${data.main.humidity}% <br> Pressure ${data.main.pressure} mb | Wind ${data.wind.speed} KMPH</div>
                </div>
            `;
            weatherBody.style.display = 'block';
            changeBg(data.weather[0].main);
            reset();
        } else {
            alert('City not found. Please enter a valid city name.');
        }
    }

    // Function to format the current time
    function getTime(todayDate) {
        let hours = addZero(todayDate.getHours());
        let minutes = addZero(todayDate.getMinutes());
        return `${hours}:${minutes}`;
    }

    // Function to format the date
    function dateManage(dateArg) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let year = dateArg.getFullYear();
        let month = months[dateArg.getMonth()];
        let day = days[dateArg.getDay()];
        let date = dateArg.getDate();
        return `${day}, ${date} ${month} ${year}`;
    }

    // Function to change the background image based on the weather status
    function changeBg(status) {
        if (status === 'Clouds') {
            document.body.style.backgroundImage = 'url(../images/clouds.jpeg)';
        } else if (status === 'Rain') {
            document.body.style.backgroundImage = 'url(../images/rain.jpeg)';
        } else if (status === 'Clear') {
            document.body.style.backgroundImage = 'url(../images/clear.jpeg)';
        } else if (status === 'Snow') {
            document.body.style.backgroundImage = 'url(../images/snow.jpeg)';
        } else if (status === 'Sunny') {
            document.body.style.backgroundImage = 'url(../images/sunny.jpeg)';
        } else if (status === 'Thunderstorm') {
            document.body.style.backgroundImage = 'url(../images/thunder.jpeg)';
        } else if (status === 'Drizzle') {
            document.body.style.backgroundImage = 'url(../images/drizzle.jpeg)';
        } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
            document.body.style.backgroundImage = 'url(../images/mist.jpeg)';
        } else {
            document.body.style.backgroundImage = 'url(../images/bg1.jpeg)';
        }
    }

    // Function to get the appropriate icon class based on the weather status
    function getIconClass(classarg) {
        if (classarg === 'Rain') {
            return 'fas fa-cloud-showers-heavy';
        } else if (classarg === 'Clouds') {
            return 'fas fa-cloud';
        } else if (classarg === 'Clear') {
            return 'fas fa-cloud-sun';
        } else if (classarg === 'Snow') {
            return 'fas fa-snowman';
        } else if (classarg === 'Sunny') {
            return 'fas fa-sun';
        } else if (classarg === 'Mist') {
            return 'fas fa-smog';
        } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
            return 'fas fa-thunderstorm';
        } else {
            return 'fas fa-cloud-sun';
        }
    }

    // Function to add a leading zero to numbers less than 10
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    // Function to reset the input box
    function reset() {
        let input = document.getElementById('Input-box');
        input.value = "";
    }
});
