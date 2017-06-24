

$(document).ready(function() {

firebase.initializeApp(config); 

var database = firebase.database();



	$.ajax({
	    url: "https://data.cityofchicago.org/resource/tnn6-5k2t.json",
	    type: "GET",
	    data: {
	      "$limit" : 5,
	      "$$app_token" : grToken,
	    }
	}).done(function(data) {
		alert("Retrieved " + data.length + " records from the dataset!");
		console.log(data); 
		console.log(data[0].latitude);

	database.ref().push({ 

		for (var i = 0; )
		Latitude: data[0].latitude,
		Longitude: data[0].longitude,
		}); 
	}); 
});



