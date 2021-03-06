var foodArray = [];

var calories = 0.0;
var carbs = 0.0;
var protein = 0.0;

window.createFoodDiv = function (foodName) {
    if (foodName === "")
        return;

    foodArray.push(foodName);
    var block = $("<div>");
    block.addClass("block");
    block.addClass("animated bounceIn")
    $("#blockHolder").prepend(block);

    addGiphy(foodName, block);
    addFood(foodName, block);

    this.setTimeout(calculateAndDisplayNutritionValues, 3000);
}

function calculateAndDisplayNutritionValues() {
    calories = 0.0;
    var calorieElems = $("[itemprop=calories]");
    for (var i = 0; i < calorieElems.length; i++)
        calories += parseFloat(calorieElems[i].innerText);
    $("#totalCals").text(Math.round(calories));

    carbs = 0.0;
    var carbElems = $("[itemprop=carbohydrateContent]");
    for (var i = 0; i < carbElems.length; i++)
        carbs += parseFloat(carbElems[i].innerText);
    $("#totalCarbs").text(Math.round(carbs));

    protein = 0.0;
    var proteinElems = $("[itemprop=proteinContent]");
    for (var i = 0; i < proteinElems.length; i++)
        protein += parseFloat(proteinElems[i].innerText);
    $("#totalPro").text(Math.round(protein));

    $("#goalCal").text(limit);
    if (calories >= limit)
        $("footer").addClass("red-text");
    else
        $("footer").removeClass("red-text");
}

function addGiphy(foodName, divHolder) {
    var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";
    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + foodName + "&api_key=" + key + "&limit=1";

    var foodImage = $("<img>");
    foodImage.attr("src", "assets/images/oreo-bailonga.gif");
    foodImage.attr("width", "266px");
    foodImage.attr("height", "133px");
    foodImage.addClass("images");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var foodDiv = $("<div>");

        foodImage.attr("src", response.data.images.fixed_height.url);
        foodImage.attr("data-name", foodName);

        foodDiv.append(foodImage);
        divHolder.prepend(foodDiv);
    });
}

function addFood(foodName, divHolder) {
    var headers = {
        "x-app-id": "25536362",
        "x-app-key": "81b40dac13dd0ea7dd8edd2b331d92f1",
        "Content-Type": "application/json"
    };

    $.ajax({
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        method: "POST",
        headers: headers,
        data: '{"query": "1 ' + foodName + '"}',
        error: function () {
            divHolder.remove();
            foodArray.pop();
        },
        success: function (res) {
            divHolder.append(createNutritionLabel(res.foods[0]));
        }
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

$(document).on("click", ".images", function() {
    var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";
    var oldURL = this;
    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + $(this).attr("data-name") + "&api_key=" + key + "&limit=1";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(oldURL).attr("src", response.data.images.fixed_height.url);
    });
})

$("#clear").click(function (event) {
    event.preventDefault();
    database.ref().remove();
    foodArray = [];
    limit = 2000;
    $("#blockHolder").empty();
    setTimeout(calculateAndDisplayNutritionValues, 3000);
});