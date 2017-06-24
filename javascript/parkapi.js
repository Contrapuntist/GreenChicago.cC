console.log(parkApiKey);

var stationArray = [];
var loopObject = {};

// Park API
$.ajax({
    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json",
    type: "GET",
    data: {
      "$$app_token" : parkApiKey
    }
}).done(function(data) {
  	alert("Retrieved " + data.length + " records from the dataset!");
  	console.log(data);
  	
		// for (var i = 0; i < 10; i++) {
		// 	//object = [];
		// 	var name = (data.fuel_stations[i].station_name);
		// 	var latitude = (data.fuel_stations[i].latitude);
		// 	var longitude = (data.fuel_stations[i].longitude);
		// 	var city = (data.fuel_stations[i].city);
		// 	var zip = (data.fuel_stations[i].zip);
		// 	var address = (data.fuel_stations[i].street_address);
		// 	var state = (data.fuel_stations[i].state);

		// loopObject = {
		// 	lat: latitude,
		// 	long: longitude,
		// 	zip: zip,
		// 	address: address,
		// 	city: city,
		// 	state: state,
		// 	name: name
		// };


		// stationArray.push(loopObject);
		// };
		// database.ref().push(stationArray);

});


