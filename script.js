document.addEventListener('DOMContentLoaded', function() {
const weatherApi = '14ee74d51635be83d5de84e65994c4e1',
apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const startBtn = document.getElementById('start-btn')
const outerBg = document.querySelector('outer-bg')
const appMain = document.getElementById('parent')
const searchBtn= document.getElementById('search-btn')
const inputBox = document.getElementById('Input-box')
const weatherBody = document.getElementById('weather-body')
if (startBtn) {
    startBtn.addEventListener('click', function(){
        if (outerBg && mainBg) {
            outerBg.style.display = 'none';
             mainBg.style.display = 'block';
        } else{
             console.error('outerBg or mainBg is not found in the DOM.');
        }
    });
        
    
}
if (searchBtn && inputBox) {
    searchBtn.addEventListener('click', function(){
        
        const city = inputBox.value;
        if (city) {
            fetchWeatherData(city);
        }
          
    })
}
function fetchWeatherData(city) {
    fetch( `${apiUrl}?q=${city}&appid=${weatherApi}&units=metric`)
        then(Response => Response.json())
        .then(data => {
            displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                 alert('Error fetching weather data. Please try again later.');
            })
 }
 // Function to display weather data on the webpage
 function displayWeatherData(data) {
    if (data.cod === 200) {
        const location =`${data.name}, ${data.sys.country}`
        const temperature = `${data.main.temp} °C`;
        const weather = data.weather[0].description
        const minMax = `${data.main.temp_min} °C, Max: ${data.main.temp_max} °C`; 
        const todayDate = new Date();
        // Update the HTML with weather data
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
          <div class="day-details"> <div class="basic">Feels like ${data.main.feels_like}&deg;C | Humidity ${data.main.humidity}% <br> Pressure ${data.main.pressure} mb | Wind ${data.wind.speed} KMPH</div> 
          </div> `;
          weatherBody.style.display = 'block';
          changeBg(data.weather[0].main)
          reset()
          } else {
            alert('City not found. Please enter a valid city name.');
    }
 }
 // Function to format the current time
 function getTime(todayDatedate) {
    
        let hours = addZero (todayDatedate.getHours());
        let minutes = addZero (todayDatedate.getMinutes());
        return `${hours}:${minutes}`;

    
 }
 // Function to format the date
 function dateManage(dateArg){
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
    const backgrounds = { 
        'Clouds': 'url(../images/clouds.jpeg)',
         'Rain': 'url(../images/rain.jpeg)', 
         'Clear': 'url(../images/clear.jpeg)', 'Snow': 'url(../images/snow.jpeg)', 
         'Sunny': 'url(../images/sunny.jpeg)', 
         'Thunderstorm': 'url(../images/thunder.jpeg)', 
         'Drizzle': 'url(../images/drizzle.jpeg)', 
         'Mist': 'url(../images/mist.jpeg)', 
         'Haze': 'url(../images/mist.jpeg)', 
         'Fog': 'url(../images/mist.jpeg)', 
         'default': 'url(../images/bg1.jpeg)' 
        };
        document.body.style.backgroundImage = backgrounds[status] || backgrounds['default'];
     }
     // Function to get the appropriate icon class based on the weather status 
     function getIconClass(classarg) {
        const icons = {
           'Rain': 'fas fa-cloud-showers-heavy',
            'Clouds': 'fas fa-cloud', 
            'Clear': 'fas fa-cloud-sun', 
            'Snow': 'fas fa-snowman', 
            'Sunny': 'fas fa-sun', 
            'Mist': 'fas fa-smog', 'Thunderstorm': 'fas fa-thunderstorm', 
            'Drizzle': 'fas fa-thunderstorm', 
            'default': 'fas fa-cloud-sun',
            }
            return icons[classarg] || icons['default'];
            

     }
     // Function to reset the input box 
     function reset() {
        let input = document.getElementById('Input-box');
         input.value = "";
     }
     // Function to add a leading zero to numbers less than 10 
     function addZero(i) {
         if (i < 10) { 
            i = "0" + i; 
        } 
            return i;
         } 
});
        

   
        



    

// // Search Input Box Event Listener (Enter Key Press)
// let SearchIputBox = document.getElementById("input-box")
// SearchIputBox.addEventListener("keypress", (event)=> {
//     if (event.key === 13) {
//         getWeatherReport(SearchIputBox.value)

//     }
// })
// // Button Click Event Listener
// let buttonPress = document.getElementById("btn")
// buttonPress.addEventListener("click", () => {
//     getWeatherReport(SearchIputBox.value)
//     })
//     // Function to get weather data
//     function getWeatherReport(city) {
//         fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
//         .then(weather=>{
//             return weather.json()
//             .then(shownWeatherReport)
//         })
//     }
//     // Function to Display Weather Data
//     function shownWeatherReport(weather) {
//         let city_code = weather.cod;
//         if(city_code ==='400'){
//          swal("Empty Input", "please enter any city", "error")
//          reset();
//         } else if (city_code ==='404') {
//             swal("City Not Found", "Please enter a valid city", "warning")
//             reset()
//             } else {
//                 let op =document.getElementById('weather-body');
//                 op.style.display = 'block'
//                 let todayDate = new Date()
//                 let parent =document.getElementById('parent')
//                 let weather_body = document.getElementById('weather-body')
//                 weather_body.innerHTML= `
//                 <div class="location-details">
//                 <div class="city" id="city">${weather.name}, ${weather.sys.counrty}</div>
//                 <div class="date" id="data"> ${dateManage(todayDate)}</div> 
//                 </div> <div class="weather-status"> <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div> <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i> </div> <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div> <div id="updated_on">Updated as of ${getTime(todayDate)}</div> </div> <hr> <div class="day-details"> <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}% <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div> </div> `;


                

//         } 


//         }
        

