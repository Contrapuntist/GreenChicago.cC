$(document).ready(function() {




// App object 
  var appObj = {

    // global variables 
    database: firebase.database(),
    address: null,

    // functions 
    init: function () {
      console.log ('app gowri initiated')
    } 

  };


// app initiate function 
appObj.init();

console.log (database.ref("greenRoofs").orderByChild(""));

	$('#searchbtn').on('click', function() { 
		console.log('search button clicked');
		appObj.address = $("#srchinput").val().trim();
		console.log(appObj.address);


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

var uspsurl = null;  

// AddressValidateRequest USERID=uspsID 

$.$.ajax({
	url: uspsurl, 
	type: 'default GET (Other values: POST)',
	dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
	data: {param1: 'value1'},
})
.done(function() {
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});



});





