$( document ).ready(function() {

    // Pulling in some firebase
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBk9MGzyAFDwGkKQ8WZMI8KP9cOw66IiRI",
        authDomain: "train-time-e582e.firebaseapp.com",
        databaseURL: "https://train-time-e582e.firebaseio.com",
        projectId: "train-time-e582e",
        storageBucket: "",
        messagingSenderId: "297470116723"
    };
      
    firebase.initializeApp(config);

    
    
    var database = firebase.database();

    // 2. Button for adding Employees
    $("#add-employee-btn").on("click", function(event) {
      event.preventDefault();
    
      // Grabs user input
      var newName = $("#train-input").val().trim();
      var newDest = $("#destination-input").val().trim();
      var newFirst = moment($("#first-input").val().trim(), "HH:mm").format("X");
      var newFreq = $("#frequency-input").val().trim();
    
      // Creates local "temporary" object for holding employee data
      var newTrain = {
        name: newName,
        dest: newDest,
        first: newFirst,
        freq: newFreq
      };
    
      // Uploads employee data to the database
      database.ref().push(newTrain);
    
      // Logs everything to console
      console.log("Submit: " + newTrain.name);
      console.log("Submit: " + newTrain.dest);
      console.log("Submit: " + newTrain.first);
      console.log("Submit: " + newTrain.freq);
    
      // Clears all of the text-boxes
      $("#train-input").val("");
      $("#destination-input").val("");
      $("#first-input").val("");
      $("#frequency-input").val("");
    });
    
    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
      console.log(childSnapshot.val());
    
      // Store everything into a variable.
      var newName = childSnapshot.val().name;
      var newDest = childSnapshot.val().dest;
      var newFirst = childSnapshot.val().first;
      var newFreq = childSnapshot.val().freq;
    
      // Employee Info
      console.log("New Variables" + newName);
      console.log("&" + newDest);
      console.log("&" + newFirst);
      console.log("&" + newFreq);
    
      // Clean up the mess that is the First Train Time input
      var newFirstClean = moment.unix(empStart).format("HH:mm");

    //   remnants of an old timesheet. Here we're making a new train sheet...
    //   // Calculate the months worked using hardcore math
    //   // To calculate the months worked
    //   var empMonths = moment().diff(moment(empStart, "X"), "months");
    //   console.log(empMonths);
    
    //   // Calculate the total billed rate
    //   var empBilled = empMonths * empRate;
    //   console.log(empBilled);
    
      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + newName + "</td><td>" + newDest + "</td><td>" +
      newFirstClean + "</td><td>" + newFreq + "</td><td>STAND IN FOR NOW</td>");
    });
    
    // Example Time Math
    // -----------------------------------------------------------------------------
    // Assume Employee start date of January 1, 2015
    // Assume current date is March 1, 2016
    
    // We know that this is 15 months.
    // Now we will create code in moment.js to confirm that any attempt we use meets this test case
    




// end ready function
});