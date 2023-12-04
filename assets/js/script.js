
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


// * About section close option (clicking the close button in the About section)

var closeButton = document.getElementById("close-button");
closeButton.addEventListener('click', (closeAboutSection));

function closeAboutSection() {
    var aboutSection = document.getElementById("about");
    if (aboutSection.style.display === "none") {
        aboutSection.style.display = "block";
    } else {
        aboutSection.style.display = "none";
    }
}

// * About section show option (clicking on the About button in the NavBar)

var aboutButton = document.getElementById("about-button");
aboutButton.addEventListener('click', (openAboutSection));

function openAboutSection() {
    var aboutSection = document.getElementById("about");
    if (aboutSection.style.display = "block") {
        aboutSection.style.display === "none";
}
};

// * Favorites section show option (clicking on the Favorites button in the NavBar)

var favoritesButton = document.getElementById("favorites-button");
favoritesButton.addEventListener('click', (openFavoritesSection));

function openFavoritesSection() {
    var favoritesSection = document.getElementById("favorites-carousel");
    if (favoritesSection.style.display = "block") {
        favoritesSection.style.display === "none";
}
};

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

// * Date display to access current day and next five dates from day.js to use when getting weather information
    //* Current date
    var day0Date = dayjs().format("DD/MM/YYYY");
    var day1Date = dayjs().add((day0Date+1), 'day').format("DD/MM/YYYY");
    var day0 = document.getElementById("current-date");
    day0.setAttribute("value", day0Date);
    day0.textContent = day0Date;
    //* Next five dates
    for (var i = 0; i < 5; i++) {
        var dateOption = dayjs().add((i+1), 'day').format("DD/MM/YYYY");
        var dateText = document.querySelectorAll(".chosenDate");
        dateText[i].setAttribute("value", dateOption)
        dateText[i].textContent = dateOption;
    }

//Save the date selected into date variable to be used for the weather 
var dropdownDate = document.getElementById("dateSelect");

dropdownDate.addEventListener("change",function(){
    var selectedDate = dropdownDate.value;
    var date = selectedDate;
    console.log(date);
});

//Save the number of maximum results to be displayed to be used in the construction of the queryURL
var dropdownResults = document.getElementById("numberOfResultsSelected");

dropdownResults.addEventListener("change",function(){
    var selectedResults = dropdownResults.value;
    var numberOfResults = selectedResults;
    console.log(numberOfResults);
});

    