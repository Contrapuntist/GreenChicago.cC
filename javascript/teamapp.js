$(document).ready(function() {

// firebase code  

  firebase.initializeApp(config);
  var database = firebase.database(); 


// App object 
	var appObj = {

		// global variables 
		database: firebase.database(); 

		// functions 
		init: function {
			console.log ('app initiated')
		}

	}


// app initiate function 
appObj.init();



});


