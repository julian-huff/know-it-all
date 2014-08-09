var xhrRequest = function (url, type, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        callback(this.responseText);
    };
    xhr.open(type, url);
    xhr.send();
};

function locationSuccess(pos) {
    //Construct URL
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
    
    //Send request
    xhrRequest(url, "GET", function(responseText) {
       //responeText containst a JSON object with weather info
        var json = JSON.parse(responseText);
        
        //Temperature in Kelvin requires adjustment
        var temperature = Math.round(json.main.temp - 273.15);
        console.log("The temperature is " + temperature);
        
        //Conditions
        var conditions = json.weather[0].main;
        console.log("Conditions are " + conditions);
    });
}

function locationError(err) {
    console.log("Error requestion location!");
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(
        locationSuccess,
        locationError,
        {timerout: 15000, maximumAge: 60000}
    );
}

//Listen for when the watchface is opened
Pebble.addEventListener("ready", function(e) {
   console.log("PebbleKit JS ready!");
    
    //Get the initial weather
    getWeather();
});

//Listen for when an AppMessage is received
Pebble.addEventListener("appmessage", function(e) {
    console.log("AppMessage received!");
});