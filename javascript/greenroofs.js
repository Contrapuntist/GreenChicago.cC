$(document).ready(function() {


var database = firebase.database();

function getGreenRoofsData () { 

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

	}

//getGreenRoofsData ();


database.ref().on("child_added", function(snap) {
  var name = snap.name();
  console.log ('key name is' + name);
});

});





