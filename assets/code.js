var foodArray = [];

// leave this commented out. the database takes care of this
// it reads the input and sets it in the db. then the child_added
//   function is called which adds the div for us
// $("#add-food").on("click", function (event) {
//     event.preventDefault();

//     var foodInput = $("#nutrition-input").val().trim();
    
//     // leave this commented out for now. it messes with the database trying to read it
//     //$("#nutrition-input").val("");

//     window.createFoodDiv(foodInput);
// });

// this syntax is needed so we can access it from Database.js
window.createFoodDiv = function(foodName)
{
    if (foodName === "")
        return;

    foodArray.push(foodName);
    var block = $("<div>");

    addGiphy(foodName, block);
    addFood(foodName, block);

    $("#blockHolder").append(block);
}

function addGiphy(foodName, divHolder)
{
    var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";
    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + foodName + "&api_key=" + key + "&limit=1";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        var results = response.data;

        var foodDiv = $("<div>");
        var foodImage = $("<img>");

        foodImage.attr("src", results.images.fixed_height.url);
        foodImage.attr("width", "250px");
        foodImage.attr("width", "250px");
        foodImage.addClass("images");
        foodImage.attr("data-name", foodName);

        foodDiv.append(foodImage);

        divHolder.prepend(foodDiv);
    });
}

function addFood(foodName, divHolder) {
    var headers = {
        "x-app-id": "810ec152",
        "x-app-key": "072685781a81b5c18868bd69bbfa9fbb",
        "Content-Type": "application/json"
    }

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
    return $("<div>").nutritionLabel({
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
        valueTotalFat: foodArr.nf_total_fat,
        valueSatFat: foodArr.nf_saturated_fat,
        valueCholesterol: foodArr.nf_cholesterol,
        valueSodium: foodArr.nf_sodium,
        valueTotalCarb: foodArr.nf_total_carbohydrate,
        valueSugars: foodArr.nf_sugars,
        valueProteins: foodArr.nf_protein,
        showLegacyVersion: false
    });
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