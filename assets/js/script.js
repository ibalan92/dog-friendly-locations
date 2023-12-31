var iconURL = "";
var temp = "";
var lat;
var lon;
var titlesFavorites = [];
var imagesFavorites = [];
var favCarouselItemEl = document.getElementById("favorites-carousel-inner")

init();

function getWeatherData (event) {
    // * The data for the place name input by the user is accessed to produce the URL to use.
    event.preventDefault();
    var stateCode = "";
    var countryCode = "";
    var limit = "";
    searchInput = city.value;
    var queryURLplace = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "," + stateCode + "," + countryCode + "&limit=" + limit + "&appid=573d86dc171ce289692f18783224bf7c";
    // * Then the latitude and longitude for the place are found and assigned to the variables lat and lon to give the JSON output for that city's current weather and a 5-day weather forecast.
            if(searchInput !==""){
                fetch (queryURLplace)
                .then (function getResponse (response) {
                    return response.json();
                })
                .then (function getURL (data) {
                    lat = data[0].lat;
                    console.log(lat);
                    lon = data[0].lon;
                    console.log(lon);
                    queryURLcoordinates = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=573d86dc171ce289692f18783224bf7c";
                    fetch (queryURLcoordinates)
                    .then (function getResponse (response) {
                        return response.json();
                    }).then (function getData (data) {
                        console.log(data);
                        var info = data.list;
                        var chosenDay = parseInt(date.slice(0,2));
                        for(var i=0; i< info.length;i++){
                            var weatherDay = parseInt((info[i].dt_txt).slice(8,10));
                            if (chosenDay === weatherDay){
                                iconURL = "https://openweathermap.org/img/w/" + info[i].weather[0].icon + ".png"
                                var celsius = Math.round(info[i].main.temp - 273.15);
                                temp = "Temperature in " + searchInput + " on " + date + " will be: " + celsius + " °C";
                                console.log(temp);
                                var weatherTextEl = document.getElementById("weatherText");
                                weatherTextEl.textContent = temp;
                                var weatherIconEl = document.getElementById("weatherIcon");
                                weatherIconEl.setAttribute("src", iconURL);
                                break;
                            }
                        }
                    });
                });
            } else{
                var weatherTextEl = document.getElementById("weatherText");
                weatherTextEl.textContent = "Please input your desired destination";
                var weatherIconEl = document.getElementById("weatherIcon");
                weatherIconEl.setAttribute("src", "");
            }
            
};

var searchBtn = document.getElementById("searchButton");

var city = document.getElementById("searchedCity");
var locationAPIkey ="07c6e2c39b20420cb9827bf457518cbc";
var placeId;

function getLocationData(event){
    event.preventDefault();
    citySearched = city.value;
    var queryURL = "https://api.geoapify.com/v1/geocode/search?text=" + citySearched + "&format=json&apiKey=" + locationAPIkey
    if(citySearched !== ""){
        fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var placeId = data.results[0].place_id;
        console.log(lat);
        console.log(lon); 
        var category = "pet.dog_park";
        // var searchURL = "https://api.geoapify.com/v2/places?categories=" + category + "&filter=place:" + placeId + "&limit=" + numberOfResults + "&apiKey=" + locationAPIkey
        var searchURL = "https://api.geoapify.com/v2/places?categories=pet.dog_park&bias=proximity:" + lon + "," + lat + "&limit=" + numberOfResults + "&apiKey=" + locationAPIkey    
       fetch(searchURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        console.log(data);
        resultsCarItems.innerHTML="";
        // data.features = []; //Test the no locations available scenario
        if((data.features).length > 0){
            createCarousel(data.features);
        } else {
            var noResultMessage = document.createElement("h3");
            noResultMessage.setAttribute("class", "text-center");
            noResultMessage.textContent = "No dogpark available in a 50km radius from your search";
            resultsCarItems.appendChild(noResultMessage);
            }
        
        });
               
    });
    } else {
        resultsCarItems.innerHTML="";
    }      
    
}

searchBtn.addEventListener("click", getLocationData);
searchBtn.addEventListener("click", getWeatherData);
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

// * Favorites carousel scroll functionality

var carouselWidth = document.getElementById("favorites-carousel-inner").scrollWidth;
var cardWidth = $(".carousel-item").width();
var scrollPosition = 0;
var nextFavButton = document.getElementById("fav-next");
var previousFavButton = document.getElementById("fav-prev");

function next() {
    if (scrollPosition < (carouselWidth - cardWidth *4)) {
        scrollPosition += cardWidth;
        $("#favorites-carousel-inner").animate({ scrollLeft: scrollPosition }, 500);
    }
}

function prev() {
    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#favorites-carousel-inner").animate(
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

// * Create results carousel
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
    carouselResPrevButton.addEventListener("click", prevResults);
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
    carouselResNextButton.addEventListener("click", nextResults);
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

        var lat = (data[i].properties.lat).toFixed(6);
        var lon = (data[i].properties.lon).toFixed(6);
        var cardImageUrl = "https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=150&height=150&center=lonlat:" + lon + "," + lat +"&zoom=15.0247&scaleFactor=2&apiKey=" + locationAPIkey

        var carouselItem = document.createElement("div");
        carouselItem.setAttribute("class","carousel-item active")
        carouselItem.setAttribute("id","results-carousel-item")
        var cardItem = document.createElement("div");
        cardItem.setAttribute("class","card")
        var cardBodyItem = document.createElement("div");
        cardBodyItem.setAttribute("class","card-body")
        var cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = data[i].properties.address_line1;

        // * Favorites button
        var favoriteResultButton = document.createElement("button");
        favoriteResultButton.setAttribute("id","star-button");
        favoriteResultButton.setAttribute("type","button");
        var favoritesButtonShape = document.createElement("img");
        favoritesButtonShape.setAttribute("src","assets/img/star.svg");
        favoriteResultButton.appendChild(favoritesButtonShape);
        
        var cardImage = document.createElement("img");
        cardImage.setAttribute("class", "card-image");
        cardImage.setAttribute("alt", "Map");
        cardImage.setAttribute("src", cardImageUrl);
        cardBodyItem.appendChild(cardTitle);
        cardBodyItem.appendChild(cardImage);
        cardBodyItem.appendChild(favoriteResultButton);
        cardItem.appendChild(cardBodyItem);
        carouselItem.appendChild(cardItem);
        carouselInner.appendChild(carouselItem);

        // * Function to handle favorites click
        favoriteResultButton.addEventListener('click', (addToFavorites));

        function addToFavorites (clickedCard) {
            var card = clickedCard.target.closest(".card-body");
            
            // * Capture which save button was clicked by the user.
            var button = clickedCard.target.parentElement;
            console.log(button);
            console.log("user clicks to add card to favorites")
            var cardTitleEl = card.querySelector('.card-title');
            var cardTitle = cardTitleEl.textContent;
            console.log(cardTitle)
            var imgEl = card.querySelector('.card-image');
            var image = imgEl.getAttribute("src");
            console.log(image)
            if(imagesFavorites.includes(image) !== true){
            createFavoriteCard(cardTitle,image);
            titlesFavorites.push(cardTitle);
            localStorage.setItem("titles", JSON.stringify(titlesFavorites));
            imagesFavorites.push(image);
            localStorage.setItem("images", JSON.stringify(imagesFavorites));
            }
        }
       
    }

// * Results carousel scroll functionality

var cardWidthResults = $("#results-carousel-item").width();
var scrollPositionResults = 0;

function nextResults() {
    if (scrollPositionResults < (carouselWidth - cardWidthResults *4)) {
        scrollPositionResults += cardWidthResults;
        $("#results-carousel-inner").animate({ scrollLeft: scrollPositionResults }, 500);
    }
}

function prevResults() {
    if (scrollPositionResults > 0) {
        scrollPositionResults -= cardWidth;
        $("#results-carousel-inner").animate(
        { scrollLeft: scrollPositionResults }, 500);
    }
}

}
function createFavoriteCard(title,imageURL){
        var carouselItem = document.createElement("div");
        carouselItem.setAttribute("class","carousel-item active")
        carouselItem.setAttribute("id","results-carousel-item")
        var cardItem = document.createElement("div");
        cardItem.setAttribute("class","card")
        var cardBodyItem = document.createElement("div");
        cardBodyItem.setAttribute("class","card-body")
        var cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = title;       
        var cardImage = document.createElement("img");
        cardImage.setAttribute("class", "card-image");
        cardImage.setAttribute("alt", "Map");
        cardImage.setAttribute("src", imageURL);
        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("id","delete-button");
        deleteButton.setAttribute("class","btn btn-danger");
        deleteButton.textContent = "X"
        cardBodyItem.appendChild(cardTitle);
        cardBodyItem.appendChild(cardImage);
        cardBodyItem.appendChild(deleteButton);
        cardItem.appendChild(cardBodyItem);
        carouselItem.appendChild(cardItem);
        favCarouselItemEl.appendChild(carouselItem);
        deleteButton.addEventListener('click', (removeFavorites));
        function removeFavorites (clickedCard) {
            var card = clickedCard.target.closest(".card");
            
            // * Capture which save button was clicked by the user.
            
            var cardTitleEl = card.querySelector('.card-title');
            var cardTitle = cardTitleEl.textContent;
            var indexOfTitle = titlesFavorites.indexOf(cardTitle)
            titlesFavorites.splice(indexOfTitle,1);
            var imgEl = card.querySelector('.card-image');
            var image = imgEl.getAttribute("src");
            var indexOfImage = imagesFavorites.indexOf(image)
            imagesFavorites.splice(indexOfImage,1);
            localStorage.setItem("titles", JSON.stringify(titlesFavorites));
            localStorage.setItem("images", JSON.stringify(imagesFavorites));
            card.remove();
            }

}

function init(){
    var cardTitles = JSON.parse(localStorage.getItem("titles"));
    var cardImages = JSON.parse(localStorage.getItem("images"));
    console.log(cardTitles)
    console.log(cardImages)
    if (cardTitles !== null && cardImages !== null){
        titlesFavorites = cardTitles;
        imagesFavorites = cardImages;
        for(var i = 0; i< cardImages.length;i++){
            var title = cardTitles[i];
            var images = cardImages[i];
            createFavoriteCard(title,images)
        }
          
    }
}