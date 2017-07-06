var database = firebase.database();

var parksData = [];
var loopObject = {};
var addressArray=[];

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
				var latitude = ' ';
				var longitude = ' ';
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
		
			parksData.push(loopObject);
		}
		if(i>=data.length-1)
			{
				getLatLong();
			}  	
	});
}

var i=0;

//function to get Latitude and Longitude using google geocode api
function getLatLong(){
	
   	var tmpAddress=[];    
    tmpAddress.push(parksData[i].address.split(' ').join('+'), parksData[i].city.split(' ').join('+'), parksData[i].state.split(' ').join('+'));
    var curAddress=tmpAddress.join(',');
    var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?address="+curAddress;
    $.ajax({
      url: getLatLng,
      method: "GET"
      }).done(function(response){
        parksData[i].lat = response.results[0].geometry.location.lat;
        parksData[i].long = response.results[0].geometry.location.lng;
        i++;
        if(i<parksData.length){
        	
        	getLatLong();
        }
        else{
			database.ref("parks").remove();
			database.ref("parks").push(parksData);        	
        }
	        
    });
	
	
  }

//getParks();