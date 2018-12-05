$(document).ready(main);
var foodArray = [];


function main() {
    $("#add-food").on("click", function (event) {
        event.preventDefault();

        var foodInput = $("#nutrition-input").val().trim();
        if (foodInput === ""){
            return
        }
        foodArray.push(foodInput);
        database.ref().push({
            food: foodInput
        });
        $("#nutrition-input").val("");
        var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";

        var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + foodInput + "&api_key=" + key + "&limit=1";

        var block = $("<div>");

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                // $("#imageshere").empty();
                var results = response.data;


                var foodDiv = $("<div>");
                var foodImage = $("<img>");

                foodImage.attr("src", results.images.fixed_height.url);
                foodImage.attr("width", "266px");
                foodImage.attr("height", "133px");
                foodImage.addClass("images");
                foodImage.attr("data-name", foodInput)

                foodDiv.append(foodImage);

                block.prepend(foodDiv);
            })

        addFood(foodInput, block);

        $("#blockHolder").append(block);
    })
}

var headers = {
    "x-app-id": "810ec152",
    "x-app-key": "072685781a81b5c18868bd69bbfa9fbb",
    "Content-Type": "application/json"
}
function addFood(foodName, divHolder) {
    $.ajax({
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        method: "POST",
        headers: headers,
        data: '{"query": "1 ' + foodName + '"}'
    }).then(function (res) {
        divHolder.append(createNutritionLabel(res.foods[0]));
    });
}

function createNutritionLabel(foodArr) {
    var div = $("<div>");
    div.nutritionLabel({
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
        valueCholesterol: foodArr.nf_cholesterol,
        valueSodium: foodArr.nf_sodium,
        valueTotalCarb: foodArr.nf_total_carbohydrate,
        valueSugars: foodArr.nf_sugars,
        valueProteins: foodArr.nf_protein,
        showLegacyVersion: false
    });
    return div;
}

$(document).on("click", ".images", function(){
   var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";
   console.log(this);
  var oldURL = this;
   var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + $(this).attr("data-name")+ "&api_key=" + key + "&limit=1";
   $.ajax({
      url: queryURL,
      method: "GET"
  })
  .then(function (response) {
   var results = response.data;
   console.log(response);

  $(oldURL).attr("src", results.images.fixed_height.url);
  console.log(results.images.fixed_height.url);
  console.log(this);

  })})