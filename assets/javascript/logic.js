
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAc1j9joAsp-tHjmKDCmA4QA-I1mKIhVGo",
    authDomain: "train-times-6395a.firebaseapp.com",
    databaseURL: "https://train-times-6395a.firebaseio.com",
    projectId: "train-times-6395a",
    storageBucket: "",
    messagingSenderId: "966917918482",
    appId: "1:966917918482:web:c10d88407d54a01d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

//values from html
var submitB = $("#submitBtn");
var submitC = $("#clearBtn");
var addTrain = $("#trains");
var name = "";
var destination = "";
var time = 0;
var frequency = 0;



//adding train on submit click
submitB.on("click", function(event){
  event.preventDefault();
  //makes user input an object
  var submitTrain = $("#train-name").val().trim();
  var submitDes = $("#destination").val().trim();
  var submitFirstTime = $("#first-train-time").val().trim();
  var submitFrequency = $("#frequency").val().trim();
  var newTrain = {
    name: submitTrain,
    destination : submitDes,
    time: submitFirstTime,
    frequency: submitFrequency
  };
  //push train to database
  database.ref().push(newTrain);
  console.log("train added");
  //clears form 
  submitTrain.val(" ");
  submitDes.val(" ");
  submitFirstTime.val(" ");
  submitFrequencyt.val(" ");
});

//clearing form on click
submitC.on("click", function(event){
  event.preventDefault();
  //clears values
  submitTrain.val(" ");
  submitDes.val(" ");
  submitFirstTime.val(" ");
  submitFrequencyt.val(" ");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  
	   // Declare variable
     var trainFreq;

     // Time is to be entered on the entry form
       var firstTime = 0;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);

   // Current Time
     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
     var tRemainder = diffTime % trainFreq;
     console.log(tRemainder);

     // Minute Until Train
     var tMinutesTillTrain = trainFreq - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     // Next Train
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


   // Add each train's data into the table
   $("#trains").append(`<tr><td>${trainName}</td><td>${trainDes}</td><td>${trainFreq}</td><td>${moment(nextTrain).format("HH:mm")}</td><td>${tMinutesTillTrain}</td>`);
 });