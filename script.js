// variables
const searchButton = document.getElementById("search-button");
var city = document.querySelector ("#city");
var currentTemp = document.querySelector("#currentcity");
var fiveDays = document.querySelector("five-days");
var searches = document.querySelector("searches");

//Declare a variable to store the searched city
var city="";




// Solution 





let iconEl = document.querySelector("#temp-icon");
let tempEl = document.querySelector("#temp");
let humidityEl = document.querySelector("#humidity");
let iconfile;
let searchInput=document.getElementById("search-input");
let citySearch = document.getElementById('citySearch');
let weatherContainer = document.getElementById("weatherContainer")


var fetchButton = document.getElementById('search-button');
fetchButton.addEventListener('click', getWeather);

// retrieve cities from local storage
function getCities(){
    let cities = localStorage.getItem("savedCities");
    if (cities === null){
        cities = [];
    } else {
        locations = JSON.parse(cities);
    } return cities;
}

// save cities
function savedCities(city){
    let currentCity = getCities();
    let cities = {
        city: city
    };
    let found = false;
    for (let i = 0; i < currentCity.length; i++) {
        if (currentCity[i].city === city) {
          found = true;
        }
      }
    
      if (!found) {
        currentCity.push(cities);
      }
    
      localStorage.setItem('savedCities', JSON.stringify(currentCity));
}

function CityList(){
    let citySearch = getCities();
}

// local storage
function addCities(){
    let citySearchesEl = document.getElementById("citySearches");
    let cityLocations = getCities();
    citySearchesEl.innerHTML="";
    for(let i = 0; i < cityLocations.length; i++){
        console.log(cityLocations[i]);
        let listEl = document.createElement("li");
        let buttonEl = document.createElement("button");
        buttonEl.classList.add("savedBtn");
        buttonEl.innerText = cityLocations[i].city;
    
        buttonEl.onclick = function() {
          document.getElementById("citySearch").value = cityLocations[i].city;
          getApi();
        };
    
        listEl.appendChild(buttonEl);
       citySearchesEl.appendChild(listEl);
      }
}

addCities();


// API

function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citySearch.value}&appid=6945638f81060c5d86b16e16bb621038
    &units=imperial`
    )
        .then(response => response.json())
      .then(function(data){
       
        fiveDays(data.list);
        console.log(searchInput.value);
        
var temp = data.list[0].main.temp;
var humidity = data.list[0].main.humidity;
var wind = data.list[0].wind.speed;

tempEl.textContent="";
var temperatureEl = document.createElement("p");
temperatureEl.textContent = `temp: ${temp} degrees`;
tempEl.appendChild(temperatureEl);


humidityEl.textContent="";
var humidityEl = document.createElement("p");
humidityEl.textContent = `humidity: ${humidity} degrees`;
humidityEl.append(humidityEl);

windEl.textContent="";
var windEl = document.createElement("p");
windEl.textContent = `wind: ${wind} degrees`;
windEl.append(windEl);

        })
    }
    function fiveDays(weather){


        for (let i=0; i<weather.length; i = i+8){
        console.log(weather[i])
        
        // var $li = $("<li>");
        // $h1.text(weather[i].main.temp);
        
        
        var fiveTemp = weather[i].main.temp;
        var fiveTempEl = document.createElement("p");
        fiveTempEl.textContent = fiveTemp;
        weatherContainer.appendChild(fiveTempEl);
        
        var fiveHumidity = weather[i].main.humidity;
        var fiveHumidityEl = document.createElement("p");
        fiveHumidityEl.textContent = fiveHumidity;
        weatherContainer.appendChild(fiveHumidityEl);
        
        var fiveWind = weather[i].wind.speed;
        var fiveWindEl = document.createElement("p");
        fiveWindEl.textContent = fiveWind;
        weatherContainer.appendChild(fiveWindEl);
        }
        
        
            }

    searchButton.addEventListener("click", getWeather);