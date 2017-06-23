$(document).ready(function() {

// firebase code  

  firebase.initializeApp(config);
  var database = firebase.database(); 


// App object 
	var appObj = {

		// global variables 
		database: firebase.database(); 

		// functions 
		init: function {
			console.log ('app gowri initiated')
		}

	}


// app initiate function 
appObj.init();



});


// Park API
$.ajax({
    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json?location_address=500 E 130TH ST? https://data.cityofchicago.org/resource/4xwe-2j3y.json?$where=within_circle(location, 47.59, -122.33, 1000)?location_city=FOO?location_zip=60627",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : 
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});


