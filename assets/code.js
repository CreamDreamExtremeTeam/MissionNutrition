
// var fbConfig = {
//    apiKey: "AIzaSyB8FG59wi_LDzcg8PDFBc_X-7A7e82TjHY",
//    authDomain: "mission-nutrition-71ab9.firebaseapp.com",
//    databaseURL: "https://mission-nutrition-71ab9.firebaseio.com",
//    projectId: "mission-nutrition-71ab9",
//    storageBucket: "mission-nutrition-71ab9.appspot.com",
//    messagingSenderId: "876456885465"
// };
// firebase.initializeApp(fbConfig);

$(document).ready(main);

function main() {
   $("#add-food").on("click", function (event) {
      event.preventDefault();

      var foodArray = [];
      var foodInput = $("#nutrition-input").val().trim();
      foodArray.push(foodInput);
      $("#nutrition-input").val("");
      var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodInput + "&api_key=" + key + "&limit=1";


      $.ajax({
         url: queryURL,
         method: "GET"
      })
         .then(function (response) {
            console.log(response);
            // $("#imageshere").empty();
            var results = response.data;


            for (var i = 0; i < foodArray.length; i++) {
               var foodDiv = $("<div>");
               var foodImage = $("<img>");

               foodImage.attr("src", results[i].images.fixed_height.url);
               foodImage.attr("width", "250");
               foodImage.attr("height", "125");
               foodImage.addClass("images");

               foodDiv.append(foodImage);

               $("#imageshere").append(foodDiv);


            }


         })





   })
}
