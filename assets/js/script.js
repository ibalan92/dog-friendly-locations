var searchBtn1 = document.getElementById("search-button1");
var searchBtn2 = document.getElementById("search-button2");

var city = document.getElementById("search-input")
var APIkey ="07c6e2c39b20420cb9827bf457518cbc"

searchBtn1.addEventListener("click", function(event){
    event.preventDefault();
    var city = "London"
    var queryURL = "https://api.geoapify.com/v1/geocode/search?text=" + city + "&format=json&apiKey=" + APIkey
            
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        console.log(data);

        
    });
});
searchBtn2.addEventListener("click", function(event){
    event.preventDefault();
    var category = "catering.restaurant";
    var condition = "dogs";
    var placeId = "5183f0139b18c0a1bf59b63d2d4304c24940f00101f9015dca000000000000c0020692031f4c6f6e646f6e20426f726f756768206f6620546f7765722048616d6c657473"
    var maxNumberOfPlaces ="20";
    var queryURL = "https://api.geoapify.com/v2/places?categories=" + category + "&conditions="+ condition +"&filter=place:" + placeId + "&limit=" + maxNumberOfPlaces + "&apiKey=" + APIkey
            
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        console.log(data);

        
    });
});

// var queryURL = "https://api.geoapify.com/v2/places?categories=pet.dog_park&bias=proximity:0.1276,51.5072&limit=20&apiKey=" + APIkey
