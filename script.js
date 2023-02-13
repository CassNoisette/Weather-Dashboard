// variables
const searchButton = document.getElementById("search-button");
var city = document.querySelector ("#city");
var currentTemp = document.querySelector("#currentcity");
var fiveDays = document.querySelector("five-days");
var searches = document.querySelector("searches");

//Declare a variable to store the searched city
var city="";

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


// search for city weather
function searchCity (city, location){
    var currentCity = document.createElement('p')
    currentCity.textContent = city;
    location.appendChild(currentCity)
}

// create data elements
function createData(){
    var div = document.createElement("div");
    div.setAttribute("id", "weatherData");
var date = document.createElement ("p");
    date.textContent = date;
    div.appendChild(date);


    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature :" + temp
    div.appendChild(tempEl);

    var humidityEl = document.createElement("p");
   humidityEl.textContent = "Humidity :" + humidity
    div.appendChild(humidityEl);

    var windEl = document.createElement("p");
    windEl.textContent = "Wind :" + wind
    div.appendChild(windEl);

    section.appendChild(div);
}

// fetch api and data
function apiGrab(){
    reset();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=8d2f27bdcab4692704000178cb2760e4&units=imperial`
    )
.then(function(response){
    return response.json();
})
// .then (function (data){
//     searchCity(data[0].name, currentTemp);
//     saveSearch(data[0].name, searches);
// })

.then (function(data){
    console.log(data);
    var weatherData = {
        date: data.daily[0].dt,
        temp = data.list[0].main.temp
        humidity = data.list[0].main.humidity
        wind = data.list[0].wind.speed
        icon = data.list[0].main.icon
        description = data.list[0].weather[0].description
    }
})
}


searches.onClick = function (event){
    var clickBtn = event.target
    if (clickBtn.classList.contains("recent")){
        city.value = clickBtn.textContent;
        city.setAttribute("placeholder", clickBtn.textContent)
        apiGrab();
    }
}

if (isLocalStorage()){
    displayResults(searches)
}

searchButton.addEventListener("click", apiGrab);

//         .then(response => response.json())
//       .then(function(data){
       
//         fiveDays(data.list);
//         console.log(searchInput.value);
        
// var temp = data.list[0].main.temp;
// var humidity = data.list[0].main.humidity;
// var wind = data.list[0].wind.speed;

// tempEl.textContent="";
// var temperatureEl = document.createElement("p");
// temperatureEl.textContent = `temp: ${temp} degrees`;
// tempEl.appendChild(temperatureEl);


// humidityEl.textContent="";
// var HumidityEl = document.createElement("p");
// HumidityEl.textContent = `humidity: ${humidity} degrees`;
// HumidityEl.append(HumidityEl);

//         })
    