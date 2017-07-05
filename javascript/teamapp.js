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

// console.log (database.ref("greenRoofs").orderByChild(""));

	$('#searchbtn').on('click', function() { 
		var adr = null;
		console.log('search button clicked');
		adr = $("#address").val().trim();  
		appObj.address = adr.split().join("+");
		console.log(appObj.address);
		verifyAddress(appObj.address);

	// *** Possible option to check for valid input. But need method to sift through firebase too.  
    
    // if (inpObj.checkValidity() == false) {
    //     document.getElementById("demo").innerHTML = inpObj.validationMessage;
    // } 

    // ref.child("users").orderByChild("ID").equalTo("U1EL5623").once("value", function(snapshot) {
    // var userData = snapshot.val();
    // if (userData){
    //   console.log("exists!");
    // }
	// });



	});


	// prepping USPS ajax call for address validation on search input.    
	// var uspsurl = 'https://servername/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="'+ username + '"><Address ID="0"><Address2>661 Hapsfield Lane</Address2><City>Buffalo Grove</City><State>IL</State><Zip5>60089</Zip5><Zip4></Zip4></Address></AddressValidateRequest>';
	// console.log(uspsurl);

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


function clearStates() {
	$("#charger-button").removeClass("active-button");
	$("#greenroof-button").removeClass("active-button");
	$("#parks-button").removeClass("active-button");
	$("#bikeshare-button").removeClass("active-button");
	$("#farmersmarket-button").removeClass("active-button");
	$("#recycling-button").removeClass("active-button");
}

function addActive(button) {
	$(button).addClass("active-button");
}


