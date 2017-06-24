$(document).ready(function() {

firebase code  

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

var lat = "47.59";
var lon = "-122.33"

// Park API
$.ajax({
    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json?$where=within_circle(location, 41.883811, -87.631749, 1000)",
    type: "GET",
    data: {
      "$limit" : 5,
      "$$app_token" : 
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});


