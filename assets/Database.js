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

//Initial Values
var nutrition = "";
var limit = "";

// Capture Button Click for food
$("add-food").on("click", function (foodEvent) {
   foodDvent.preventDefault();

   // Grabbed values from text boxes
   nutrition = $('nutrition-input').val().trim();
   // Code to handel the push
   database.ref().push({
      nutrition: nutrition,

   });
});

// Capture Button Click for desire
$("add-limit").on("click", function (desireEvent) {
   desireEvent.preventDefault();
   // Grabbed values from text boxes

   limit = $("limit-input").val().trim();

   database.ref().set({
      limit: limit
   });
});



// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {

   // storing the snapshot.val() in a variable for convenience
   var sv = snapshot.val();

   var nutritionElem = $("<h4>");
   var limitElem = $("<4>");

   nutritionElem.text(sv.nutrition);
   limitElem.text(sv.limit);

   nutritionElem.append(nutritionElem);
   limitElem.append(limitElem);

   // Handle the errors
}, function (errorObject) {
   console.log("Errors handled: :" + errorObject.code);
});