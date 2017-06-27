
// firebase.initializeApp(altFuelConfig);
var database = firebase.database();


function getStations() {
		

		var url = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=ELEC&state=IL&api_key=kB2SaaDEdXCxCix259XMS6pGe9xe0ReaQAcBmkp8&format=JSON";


		console.log(url);

		var stationArray = [];
		var loopObject = {};

			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data){
				var limitNum = data.total_results;
				for (var i = 0; i < limitNum; i++) {
					var name = (data.fuel_stations[i].station_name);
					var latitude = (data.fuel_stations[i].latitude);
					var longitude = (data.fuel_stations[i].longitude);
					var city = (data.fuel_stations[i].city);
					var zip = (data.fuel_stations[i].zip);
					var address = (data.fuel_stations[i].street_address);
					var state = (data.fuel_stations[i].state);
					var id = (data.fuel_stations[i].id);

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

    			console.log(loopObject);
    			stationArray.push(loopObject);
    			//console.log(stationArray);
    			//database.ref("alt-fuel").push(loopObject);
				};
    			database.ref("alt-fuel").push(stationArray);
			});
};

getStations();


