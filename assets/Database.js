var fbConfig = {
    apiKey: "AIzaSyB8FG59wi_LDzcg8PDFBc_X-7A7e82TjHY",
    authDomain: "mission-nutrition-71ab9.firebaseapp.com",
    databaseURL: "https://mission-nutrition-71ab9.firebaseio.com",
    projectId: "mission-nutrition-71ab9",
    storageBucket: "mission-nutrition-71ab9.appspot.com",
    messagingSenderId: "876456885465"
};
firebase.initializeApp(fbConfig);

//create variable to reference the database
var database = firebase.database();

var limit = 2000;

$("#add-food").on("click", function (event) {
    event.preventDefault();

    var foodInput = $("#nutrition-input").val().trim();
    $("#nutrition-input").val("");

    database.ref().push({
        food: foodInput
    });
});

$("#add-limit").on("click", function (event) {
    event.preventDefault();

    // attempt to parse input. if it fails, do nothing
    var val = parseInt($("#limit-input").val().trim());
    if (val == NaN)
        return;

    limit = val;

    database.ref().set({
        limit: limit
    });
});

database.ref().on("value", function (snapshot) {
    // this function should only run when reading the limit
    var sv = snapshot.val();

    if (sv.limit === undefined) {
        // there's no limit defined
        limit = 2000;
    }
    else {
        console.log("Read database limit", sv.limit);
        limit = parseInt(sv.limit);
    }
});

database.ref().on("child_added", function (snapshot) {
    // this function should only be called when reading a food

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    //console.log("Read database food", sv.food);

    createFoodDiv(sv.food);
});