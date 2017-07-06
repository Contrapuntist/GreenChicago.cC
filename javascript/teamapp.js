$(document).ready(function() {


// App object 
  var appObj = {

    // global variables 
    //database: firebase.database(),
    address: null,

    // functions 
    init: function () {
      console.log ('app gowri initiated')
    } 



  };

var goodaddress = null; 

//call the function to load map on page load
initMap();

// app initiate function 
appObj.init();



	$('#searchbtn').on('click', function() { 
		var adr = null;
		console.log('search button clicked');
		adr = $("#address").val().trim();  
		appObj.address = adr.split().join("+");
		console.log(appObj.address);
		verifyAddress(appObj.address);

	});


	function verifyAddress (address) { 

		var googleGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + macgoogAPI ;

		// AddressValidateRequest USERID=uspsID 

		$.ajax({
			url: googleGeoURL, 
			type: 'Get',
		})
		.done(function(data) {
			console.log(data);
			console.log("success");
			console.log(data.status); 
			if (data.status === "ok") { 
				return goodaddress = true;
			} else { 
				alert("you didn't enter a real address");
			}
			console.log(goodaddress)
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	}	

});


// Click events on buttons: triggers mapping of objects, clears all button states, and adds active state to clicked button
$("#charger-button").on("click", function() {
        readData("alt-fuel");
        clearStates();
        addActive("#charger-button");
      });

$("#greenroof-button").on("click", function() {
        readData("greenRoofs");
        clearStates();
        addActive("#greenroof-button");
      });

$("#parks-button").on("click", function() {
        readData("parks");
        clearStates();
        addActive("#parks-button");
      });

$("#bikeshare-button").on("click", function() {
        readData("divvy");        
        clearStates();
        addActive("#bikeshare-button");
      });

$("#farmersmarket-button").on("click", function() {
        readData("markets");
        clearStates();
        addActive("#farmersmarket-button");
      });

$("#recycling-button").on("click", function() {
        readData("recycling");
        clearStates();
        addActive("#recycling-button");
      });

$('#aboutUs').on('click', function() { 
	$("#aboutModal").modal("show");
}) 
// Clears active state from all buttons
function clearStates() {
	$("#charger-button").removeClass("active-button");
	$("#greenroof-button").removeClass("active-button");
	$("#parks-button").removeClass("active-button");
	$("#bikeshare-button").removeClass("active-button");
	$("#farmersmarket-button").removeClass("active-button");
	$("#recycling-button").removeClass("active-button");
}

// Adds active state to clicked button
function addActive(button) {
	$(button).addClass("active-button");
}

var chicagoZipcodes = [60007, 60176, 60603, 60607, 60611, 60615, 60619, 60623, 60628, 60632, 60637, 60641, 60645, 60651, 60655, 60660, 60668, 60674, 60680, 60686, 60690, 60695,60701, 60804, 60018, 60290, 60604, 60608, 60612, 60616, 60620, 60624, 60629, 60633, 60638, 60642, 60646, 60652, 60656, 60661, 60669, 60675, 60681, 60687, 60691, 60696, 60706, 60827, 60106, 60601, 60605, 60609, 60613, 60617, 60621, 60625, 60630, 60634, 60639, 60643, 60647, 60653, 60657, 60664, 60670, 60677, 60684, 60688, 60693, 60697, 60707, 60131, 60602, 60606, 60610, 60614, 60618, 60622, 60626, 60631, 60636, 60640, 60644, 60649, 60654, 60659, 60666, 60673, 60678, 60685, 60689, 60694, 60699, 60803];

// Functions for submitting and checking zip codes
$("#zip-button").on("click", function(event) {
	event.preventDefault();
	var zipInput = $("#zip-input").val().trim();
	var zipNumber = parseInt(zipInput);
	checkZip(zipNumber)
	});

function checkZip(zipCode) {
	if (chicagoZipcodes.indexOf(zipCode) === -1) {
		alert("Please enter a valid Chicago zip code.")
	}
	
	else {
	alert("Zip verified");
	return true;
	}
}


