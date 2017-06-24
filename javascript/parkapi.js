firebase.initializeApp(config);
var database = firebase.database()

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
  	console.log(data[0]);

	for (var i = 0; i < 10; i++) {

		if(data[i].location_zip) {
			var name = (data[i].park_name);
			var latitude = null;
			var longitude = null;
			var city = "Chicago";
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

	database.ref("Park").push(stationArray);

});


