
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
var foodArray = [];

function main() {
    $("#add-food").on("click", function (event) {
        event.preventDefault();

        var foodInput = $("#nutrition-input").val().trim();
        foodArray.push(foodInput);
        $("#nutrition-input").val("");
        var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodInput + "&api_key=" + key + "&limit=1";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // $("#imageshere").empty();
            var results = response.data;


            for (var i = 0; i < foodArray.length; i++) {
                var foodDiv = $("<div>");
                var foodImage = $("<img>");

                foodImage.attr("src", results[i].images.fixed_height.url);
                foodImage.addClass("images");

                foodDiv.append(foodImage);

                $("#imageshere").append(foodDiv);
            }
        })

        getInstant(foodInput);
    })
}

var headers = {
    "x-app-id": "810ec152",
    "x-app-key": "072685781a81b5c18868bd69bbfa9fbb",
    "Content-Type": "application/json"
}
function searchFood(search) {
    console.log("Loading search: " + search);
    $.ajax({
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        method: "POST",
        headers: headers,
        data: '{"query": "1 ' + search + '"}'
    }).then(function (res) {
        console.log(res.foods[0]);
        processFood(res.foods[0]);
    });
}

function createNutritionLabel(foodArr) {
    $('#nutritionInfoGoesHere').nutritionLabel({
        showItemName: false,

        showPolyFat: false,
        showMonoFat: false,
        showTransFat: false,
        showFibers: false,
        showVitaminD: false,
        showPotassium_2018: false,
        showCalcium: false,
        showIron: false,

        valueServingUnitQuantity: 1,
        valueServingSizeUnit: foodArr.food_name,

        valueCalories: foodArr.nf_calories,
        //valueFatCalories: 220,
        valueTotalFat: foodArr.nf_total_fat,
        valueSatFat: foodArr.nf_saturated_fat,
        valueCholesterol: foodWArr.nf_cholesterol,
        valueSodium: foodArr.nf_sodium,
        valueTotalCarb: foodArr.nf_total_carbohydrate,
        valueSugars: foodArr.nf_sugars,
        valueProteins: foodArr.nf_protein,
        showLegacyVersion: false
    });
}