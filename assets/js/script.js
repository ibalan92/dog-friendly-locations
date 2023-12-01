
var searchInput;

// ! Test place name for console.log(data) only:
searchInput = "London";

function getWeatherData () {
    // * The data for the place name input by the user is accessed to produce the URL to use.
    var stateCode = "";
    var countryCode = "";
    var limit = "";
    var queryURLplace = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";
    // * Then the latitude and longitude for the place are found and assigned to the variables lat and lon to give the JSON output for that city's current weather and a 5-day weather forecast.
            fetch (queryURLplace)
                .then (function getResponse (response) {
                    return response.json();
                })
                .then (function getURL (data) {
                    var lat = data[0].lat;
                    console.log(lat);
                    var lon = data[0].lon;
                    console.log(lon);
                    queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";
                    fetch (queryURLcoordinates)
                    .then (function getResponse (response) {
                        return response.json();
                    }).then (function getData (data) {
                        console.log(data);
                    })
                })
};

getWeatherData();



// * Carousel scroll functionality

var carouselWidth = document.getElementsByClassName("carousel-inner")[0].scrollWidth;
var cards = document.querySelectorAll(".carousel-item");
var cardWidth = $(".carousel-item").width();
var scrollPosition = 0;

var nextButton = document.querySelector(".carousel-control-next")
nextButton.addEventListener("click", function () {
    if (scrollPosition < (carouselWidth - cardWidth *4)) {
        scrollPosition += cardWidth;
        $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 500);
    }
});

var previousButton = document.querySelector(".carousel-control-prev")
previousButton.addEventListener("click", function () {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".carousel-inner").animate(
        { scrollLeft: scrollPosition }, 500);
    }
});