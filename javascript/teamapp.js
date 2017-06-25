$(document).ready(function() {

// firebase code  
 


// App object 
  var appObj = {

    // global variables 
    database: firebase.database(),
    searchInput: null,

    // functions 
    init: function () {
      console.log ('app gowri initiated')
    } 

  };


// app initiate function 
appObj.init();


$('#searchbtn').on('click', function() { 
	console.log('search button clicked');
	appObj.searchInput = $("#srchinput").val().trim();
	console.log(appObj.searchInput);


	// *** Possible option to check for valid input. But need method to sift through firebase too.  
    
    // if (inpObj.checkValidity() == false) {
    //     document.getElementById("demo").innerHTML = inpObj.validationMessage;
    // }
})


});





