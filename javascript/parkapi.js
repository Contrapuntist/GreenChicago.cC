
 // require("./gmap");
var database = firebase.database();

var parkArray = [];
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
				var zip = (data[i].location_zip);
				var address = (data[i].location_address);
				var state = "IL";
				var id = (data[i].park_number);
				var tmpAddress=[];
				tmpAddress.push(address.split(' ').join('+'), city.split(' ').join('+'), state.split(' ').join('+'));
	    		var curAddress=tmpAddress.join(',');
	    		var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?key="+geoCodeKey+"&address="+curAddress;
	   $.ajax({
	      url: getLatLng,
	      method: "GET"
	      }).done(function(response){
	      	if(response.results[0].geometry){
	      	loopObject = {
					lat: response.results[0].geometry.location.lat,
					long: response.results[0].geometry.location.lng,
					zip: zip,
					address: address,
					city: city,
					state: state,
					name: name,
					id: id
				};
	     	parkArray.push(loopObject); 
	     	}  
        
    		});


		}			
		}
		console.log(parkArray);		
	  	
	}).then(function(){	
		database.ref("parks").remove();
		database.ref("parks").push(parkArray);
	});
}


//getParks();
