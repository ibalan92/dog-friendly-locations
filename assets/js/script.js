
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

var searchBtn = document.getElementById("searchButton");

var city = document.getElementById("searchedCity");
var locationAPIkey ="07c6e2c39b20420cb9827bf457518cbc";
var longitude;
var latitude; 
var placeId;

function getLocationData(event){
    event.preventDefault();
    citySearched = city.value;
    var queryURL = "https://api.geoapify.com/v1/geocode/search?text=" + citySearched + "&format=json&apiKey=" + locationAPIkey
            
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var placeId = data.results[0].place_id;
        var category = "pet.dog_park";
        var searchURL = "https://api.geoapify.com/v2/places?categories=" + category + "&filter=place:" + placeId + "&limit=" + numberOfResults + "&apiKey=" + locationAPIkey
            
    fetch(searchURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        console.log(data);
        resultsCarItems.innerHTML="";
        createCarousel(data.features);
        
        });
               
    });
}

searchBtn.addEventListener("click", getLocationData)
// var queryURL = "https://api.geoapify.com/v2/places?categories=pet.dog_park&bias=proximity:0.1276,51.5072&limit=20&apiKey=" + APIkey

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

var carouselWidth = document.getElementById("favourites-carousel-inner").scrollWidth;
var cardWidth = $(".carousel-item").width();
var scrollPosition = 0;
var nextFavButton = document.getElementById("fav-next");
var previousFavButton = document.getElementById("fav-prev");

function next() {
    
    if (scrollPosition < (carouselWidth - cardWidth *4)) {
        scrollPosition += cardWidth;
        $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 500);
    }
}

function prev() {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".carousel-inner").animate(
        { scrollLeft: scrollPosition }, 500);
    }
}
nextFavButton.addEventListener("click", next);
previousFavButton.addEventListener("click", prev);

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
var date = day0Date;
dropdownDate.addEventListener("change",function(){
    var selectedDate = dropdownDate.value;
    date = selectedDate;
    console.log(date);
});

//Save the number of maximum results to be displayed to be used in the construction of the queryURL
var dropdownResults = document.getElementById("numberOfResultsSelected");
var numberOfResults = "5";
dropdownResults.addEventListener("change",function(){
    var selectedResults = dropdownResults.value;
    numberOfResults = selectedResults;
    console.log(numberOfResults);
});

var resultsCarItems = document.getElementById("results-carousel")
function createCarousel(data){
    var carouselInner = document.createElement("div");
    carouselInner.setAttribute("class","carousel-inner");
    carouselInner.setAttribute("id","results-carousel-inner");
    resultsCarItems.appendChild(carouselInner);
    var carouselResPrevButton = document.createElement("button");
    carouselResPrevButton.setAttribute("class","carousel-control-prev");
    carouselResPrevButton.setAttribute("id","result-prev");
    carouselResPrevButton.setAttribute("type","button");
    carouselResPrevButton.setAttribute("data-bs-slide","prev");
    var prevButtonSpanIcon = document.createElement("span");
    prevButtonSpanIcon.setAttribute("class","carousel-control-prev-icon");
    prevButtonSpanIcon.setAttribute("aria-hidden","true");
    var prevButtonSpanText = document.createElement("span");
    prevButtonSpanText.setAttribute("class","visually-hidden");
    prevButtonSpanText.textContent = "Previous";
    carouselResPrevButton.appendChild(prevButtonSpanIcon);
    carouselResPrevButton.appendChild(prevButtonSpanText);

    var carouselResNextButton = document.createElement("button");
    carouselResNextButton.setAttribute("class","carousel-control-next");
    carouselResNextButton.setAttribute("id","result-next");
    carouselResNextButton.setAttribute("type","button");
    carouselResNextButton.setAttribute("data-bs-slide","next");
    var nextButtonSpanIcon = document.createElement("span");
    nextButtonSpanIcon.setAttribute("class","carousel-control-next-icon");
    nextButtonSpanIcon.setAttribute("aria-hidden","true");
    var nextButtonSpanText = document.createElement("span");
    nextButtonSpanText.setAttribute("class","visually-hidden");
    prevButtonSpanText.textContent = "Next";
    carouselResNextButton.appendChild(nextButtonSpanIcon);
    carouselResNextButton.appendChild(nextButtonSpanText);

    resultsCarItems.appendChild(carouselResPrevButton);
    resultsCarItems.appendChild(carouselResNextButton);

    for(var i=0;i<data.length;i++){
    var carouselItem = document.createElement("div");
    carouselItem.setAttribute("class","carousel-item")
    var cardItem = document.createElement("div");
    cardItem.setAttribute("class","card")
    var cardBodyItem = document.createElement("div");
    cardBodyItem.setAttribute("class","card-body")
    var cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = data[i].properties.address_line1;
    var cardImage = document.createElement("img");
    cardImage.setAttribute("class", "card-title");
    cardImage.setAttribute("alt", "Map");
    var cardParagraph = document.createElement("p");
    cardParagraph.setAttribute("class", "card-text");
    cardParagraph.textContent = "Other info";
    cardBodyItem.appendChild(cardTitle);
    cardBodyItem.appendChild(cardImage);
    cardBodyItem.appendChild(cardParagraph);
    cardItem.appendChild(cardBodyItem);
    carouselItem.appendChild(cardItem);
    carouselInner.appendChild(carouselItem);
    }

}

carouselResNextButton.addEventListener("click", next);
carouselResPrevButton.addEventListener("click", prev);