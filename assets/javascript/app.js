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
    $("#add-train-btn").on("click", function(event) {
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
    
        // New Train Info
        console.log("New Variables" + newName);
        console.log("&" + newDest);
        console.log("&" + newFirst);
        console.log("&" + newFreq);
    
        // Clean up the mess that is the First Train Time input (one year ago to allow math to not recalculate each day)
        var newFirstClean = moment(newFirst, "HH:mm").subtract(1, "years");
        
        // var for this very moment just in case
        var rightNow = moment();

        // how much time since the first arrival (1 year ago)
        var nowToThen = moment().diff(moment(newFirstClean), "minutes");

        console.log("Now to Then: ")

        // divide the total time since then to now by the frequency of arrival
        // whatever remains is the time that has passed while waiting for the next one.
        var timeRem = nowToThen % newFreq;

        // 
        // "30 minute intervals" - "5 minutes has passed" returns 25 minutes
        var waitTime = newFreq - timeRem;

        // next arrival time (returns an unwieldy lengthy integer)
        var nextTime = moment().add(waitTime, "minutes");

        // next arrival converted to military time (as requested)
        var nextArrival = moment(nextTime).format("HH:mm");
    
        // Add each train's data into the table
        $("#train-table-body").append("<tr><td>" + newName + "</td><td>" + newDest + "</td><td>" +
        newFreq + " minutes </td><td>" + nextArrival + "</td><td>" + waitTime + "</td>");
    });


// end ready function
});