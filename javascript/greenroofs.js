

$(document).ready(function() {

firebase.initializeApp(config); 

var database = firebase.database();
var greenRoofsArray = []; 
var dataObj = {};  


	$.ajax({
	    url: "https://data.cityofchicago.org/resource/tnn6-5k2t.json",
	    type: "GET",
	    data: {
	      "$limit" : 5000,
	      "$$app_token" : grToken,
	    }
	}).done(function(data) {
		alert("Retrieved " + data.length + " records from the dataset!");
		console.log(data); 
		console.log(data[0].latitude);

		for (var i = 0; i < data.length; i++ ) {
			dataObj = {
				roofID: data[i].id, 
				lat: data[i].latitude,
				long: data[i].longitude,
				address: data[i].full_address,
				city: "Chicago",
				state: "IL", 
				zip: '',
			};

			greenRoofsArray.push(dataObj);
		}
		database.ref("greenRoofs").remove();
		database.ref("greenRoofs").push(greenRoofsArray); 


	}); 
});


		// var stationArray = [];
		// var loopObject = {};

		// 	$.ajax({
		// 		url: url,
		// 		method: "GET"
		// 	}).done(function(data){
		// 		var limitNum = data.total_results;
		// 		for (var i = 0; i < limitNum; i++) {
		// 			var name = (data.fuel_stations[i].station_name);
		// 			var latitude = (data.fuel_stations[i].latitude);
		// 			var longitude = (data.fuel_stations[i].longitude);
		// 			var city = (data.fuel_stations[i].city);
		// 			var zip = (data.fuel_stations[i].zip);
		// 			var address = (data.fuel_stations[i].street_address);
		// 			var state = (data.fuel_stations[i].state);

		// 		loopObject = {
  //   				lat: latitude,
  //   				long: longitude,
  //   				zip: zip,
  //   				address: address,
  //   				city: city,
  //   				state: state,
  //   				name: name
  //   			};

  //   			//console.log(loopObject);
  //   			stationArray.push(loopObject);
		// 		};

  //   		database.ref("alt-fuel").push(stationArray);
		// 	});


