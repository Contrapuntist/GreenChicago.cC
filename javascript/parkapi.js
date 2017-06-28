<<<<<<< HEAD

var database = firebase.database()

console.log(parkApiKey);
=======
require("./gmap");
console.log(curCat);
>>>>>>> c23fb7ac6df4ea3c060c356f297c8c6d4fbb64ef

var stationArray = [];
var loopObject = {};

// Park API
function getParks() {
	$.ajax({
	    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json",
	    type: "GET",
	    data: {
	      "$$app_token" : parkApiKey
	    }
	}).done(function(data) {
	  	console.log(data[0]);

		for (var i = 0; i < data.length; i++) {

			if(data[i].location_zip) {
				var name = (data[i].park_name);
				var latitude = getLatitude(data[i].location_address, "CHICAGO", "IL");
				var longitude = getLongitude(data[i].location_address, "CHICAGO", "IL");
				var city = "CHICAGO";
				var zip = (data[i].location_zip);
				var address = (data[i].location_address);
				var state = "IL";
				var id = (data[i].park_number);

				loopObject = {
					lat: latitude,
					long: longitude,
					zip: zip,
					address: address,
					city: city,
					state: state,
					name: name,
					id: id
				};
			}

			stationArray.push(loopObject);
		};
		database.ref("Park").remove();
		database.ref("Park").push(stationArray);

	});
}


