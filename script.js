// variables
const searchButton = document.getElementById("search-button");
var city = document.querySelector ("#city");
var currentTemp = document.querySelector("#currentcity");
var fiveDays = document.querySelector("five-days");
var searches = document.querySelector("searches");

//Declare a variable to store the searched city
var city="";


function getInfo(){
    const newCity = document.getElementById("cityInput");
    const cityName= document.getElementById("cityName");

}

// create a button
function addBtn(city,container){
    var btn = document.createElement("button");
    btn.textContent = city;
    btn.setAttribute("class", "recent");
    container.appendChild(btn);
}

// get city date
function date(){
    var time = date * 1000;
    var date = new Date(time);
}

// reset data
function reset(){
    var cities = searches.children.length;
    for (var i = 0; i < cities; i++){
    searches.children[0].remove();
}
var weather = currentTemp.children.length;
for (var i = 0; i < weather; i++){
    currentTemp.children[0].remove();
}
var days = fiveDays.children.length;
for (var i = 0; i < days; i++){
    fiveDays.children[0].remove();
}
}

// local storage
function isLocalStorage(){
    if (localStorage.getItem("recentSearches") !== null){
        return true;
    }
    else {
        return false;
    }
}

// display results
function displayResults (container){
var localStg = JSON.parse(localStorage.getItem("recentSearches"));
for (var i = 0; i < localStg.length; i++) {
    addBtn(localStg[i], container)
}
}

// save searches 
function saveSearch(){
    var tempArray = [];
    if (isLocalStorage()) {
        var storage = JSON.parse(localStorage.getItem("recentSearches"))
        if (storage.includes(city)) {
            displayResults(element);
            return;
        }
        for (var i = 0; i < storage.length; i++) {
            tempArray.push(storage[i]);
        }
        tempArray.push(city)
        if (tempArray.length > 7) {
            tempArray.shift();
        }

        localStorage.setItem("recentSearches", JSON.stringify(tempArray));
       displayResults(element)
        return
    }

    //if local storage doesnt exist 
    tempArray.push(city);
    addBtn(tempArray[0], element)
    localStorage.setItem("recentSearches", JSON.stringify(tempArray));
}

// Solution 1
// // search for city weather
// function searchCity (city, location){
//     var currentCity = document.createElement('p')
//     currentCity.textContent = city;
//     location.appendChild(currentCity)
// }

// // create data elements
// function createData(){
//     var div = document.createElement("div");
//     div.setAttribute("id", "weatherData");
// var date = document.createElement ("p");
//     date.textContent = date;
//     div.appendChild(date);


//     var tempEl = document.createElement("p");
//     tempEl.textContent = "Temperature :" + temp
//     div.appendChild(tempEl);

//     var humidityEl = document.createElement("p");
//    humidityEl.textContent = "Humidity :" + humidity
//     div.appendChild(humidityEl);

//     var windEl = document.createElement("p");
//     windEl.textContent = "Wind :" + wind
//     div.appendChild(windEl);

//     section.appendChild(div);
// }


// Solution 1 
// // fetch api and data
// function apiGrab(){
//     reset();
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=8d2f27bdcab4692704000178cb2760e4&units=imperial`
//     )
// .then(function(response){
//     return response.json();
// })
// // .then (function (data){
// //     searchCity(data[0].name, currentTemp);
// //     saveSearch(data[0].name, searches);
// // })

// .then (function(data){
//     console.log(data);
//     var weatherData = {
//         date: data.daily[0].dt,
//         temp: data.list[0].main.temp,
//         humidity : data.list[0].main.humidity,
//         wind : data.list[0].wind.speed,
//         icon : data.list[0].main.icon,
//         description : data.list[0].weather[0].description,
//     }
// })
// }


// searches.onClick = function(event){
//     var clickBtn = event.target
//     if (clickBtn.classList.contains("recent")){
//         city.value = clickBtn.textContent;
//         city.setAttribute("placeholder", clickBtn.textContent)
//         apiGrab();
//     }
// }

if (isLocalStorage()){
    displayResults(searches)
}

// searchButton.addEventListener("click", apiGrab);




// Solution 2 

let iconEl = document.querySelector("#temp-icon");
let tempEl = document.querySelector("#temp");
let humidityEl = document.querySelector("#humidity");
let iconfile;
let searchInput=document.getElementById("search-input");
const searchBtn=document.getElementById("search-button");
let weatherContainer = document.getElementById("weatherContainer")


var fetchButton = document.getElementById('search-button');
searchBtn.addEventListener('click', getWeather);

function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=8d2f27bdcab4692704000178cb2760e4&units=imperial`
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
        }
        
        
            }

    searchButton.addEventListener("click", getWeather);