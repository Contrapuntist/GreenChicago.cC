
 // require("./gmap");
var database = firebase.database();

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

		for (var i = 0; i < data.length; i++) {
			
			if(data[i].location_zip) {
				var name = (data[i].park_name);
				var latitude = " ";
				var longitude = " ";
				var city = "CHICAGO";
				var zip = (data[i].loxcation_zip);
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
		}
		database.ref("parks").remove();
		database.ref("parks").push(stationArray);
	  	
	});
}


getParks();
