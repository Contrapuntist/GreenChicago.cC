var map, infoWindow, markerArray = [], markerCluster, curCategory, dispData;

var pos={
  lat: 41.8781,
  lng: -87.6298  
};

var contentString;

var readDb=firebase.database();
//var curCat='alt-fuel';
var searchZip='60606';


// Specifies 1st node in firebase for alt-fuel
//var dbChild = '-KnQWmrvNl34dXBFVzss'; 


//To read data from firebase based on category passed
/*function readData(curCat){
  return readDb.ref(curCat).child(dbChild).once('value').then(function(snapshot){
    var dispData = snapshot.val();

    var key=Object.keys(dispData); 
    arrayLength = dispData.length;
    placeMultiMarkers(dispData);

  });
}*/


//To read data from firebase based on category passed
function readData(curCat){
  map.setCenter(pos);
  map.setZoom(10);
  curCategory=curCat;
  dispData={};
  console.log(curCategory);
  removeMarkers();
  
  readDb.ref(curCat).once('value').then(function(snapshot){

    var curCatData = snapshot.val();
    
    var key=Object.keys(curCatData); 
    dispData = curCatData[key];
    //var arrayLength = dispData[key].length;
    console.log(dispData);
    //console.log(arrayLength);
    console.log(key);
    placeMultiMarkers();

  });
}


//This is the initialize the map on load
function initMap() {  
    /*user HTML5 geolocation to get browser location if success calls
    the function to get coords and display map, else calls function
    that will display with chicago as marker*/
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoLocSucess, geoLocFail);
    
    }
    //this is for old browsers if it does not support geolocation
    else{
          pos.lat = 41.8781;
          pos.lng = -87.6298;
          displayMap();
          console.log('I am in old browser');
    }

}

//This is to display the markers based on search category and location
function placeMultiMarkers(){


  console.log('I am in multi marker');

  for (i=0; i< dispData.length; i++) { 
    placeMarkerAndPanTo(dispData[i],map, i);

  }
  placeMarkerCluster();
  
}



//when location is enabled in browser and user allowed it
function geoLocSucess(position){
          pos.lat = position.coords.latitude;
          pos.lng = position.coords.longitude;
          displayMap();      
          console.log('I am in success');
}

//when location is not enabled in browser or enabled but user blocked it
function geoLocFail(position){
          pos.lat = 41.8781;
          pos.lng = -87.6298;
          displayMap();    
          console.log('I am in error');
}


//function to display the map when pos object has lat and lng
function displayMap(){
    map = new google.maps.Map(document.getElementById('googlemaptest'), {
            center: pos,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });

    var initMarker = new google.maps.Marker({
      position: new google.maps.LatLng(pos.lat,pos.lng),
      map: map,     
      icon: {
        url: './images/home.png',
        size: new google.maps.Size(50, 50)
    }
    });   
}


/*This function will put the place markers in the map for given 
latitude and longitude*/

var i=0;

// *********************************** 
// Google Map Infobox customization 
// ***********************************




function placeMarkerAndPanTo(data, map, i) {
    var marker, iconImg;
    var newDiv = $("<div>"); 


    // Condition to determine content for Google Map InfoWindow
    if (curCategory == "alt-fuel") { 
      iconImg = './images/bolt.png';
    
    // Parks content for infowindow 
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Alternative Fuel Station</div>'; 

      var statName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div class="iw-scroll">' + statName + statAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Green roofs content for infowindow 
    } else if (curCategory == "greenRoofs") {

      iconImg = './images/leaf.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Green Roof</div>'; 

      var roofAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
   
      var winContent = '<div class="iw-scroll">' + roofAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Parks content for infowindow 
    } else if (curCategory == "parks") { 
      
      iconImg = './images/tree.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-tree"></i> Parks</div>'; 

      var parkName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var parkAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div class="iw-scroll">' + parkName + parkAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';
    
    // Divvy content for infowindow 
    } else if (curCategory == "divvy") {
      
      iconImg = './images/bicycle.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-bicycle"></i> Divvy Station</div>'; 

      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].stAddress1 + '</p>';

      // var statDocks = '<div class="iw-subTitle">Dock Details</div><p>Total Docks: '+ dispData[i].totalDocks + '<br> Bikes available: ' + dispData[i].availableBikes + 
      //   '<br> Docks available: ' + dispData[i].availableDocks +'</p>';

      // var statUpdate = '<div class="iw-subTitle">Last Update</div><p>' + dispData[i].lastCommunicationTime + '</p>';
      
      var winContent = '<div class="iw-scroll">' + statAddr +'</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>'; 

    // Divvy content for infowindow 
    } else if (curCategory == "markets") {
      
      iconImg = './images/cutlery.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-cutlery"></i> Farmer\'s Market</div>' 

      var marketName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var marketAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var marketDate = '<div class="iw-subTitle">Dates: </div><p>' + dispData[i].startDate + ' to ' + dispData[i].endDate + '</p>';;
      var marketTime = '<div class="iw-subTitle">Name</div><p>' + dispData[i].startTime + ' to ' + dispData[i].endTime + '</p>';;

      var winContent = '<div class="iw-scroll">' + marketName + marketAddr + marketDate + marketTime + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>'; 
    }

    // other categories divvy, markets, parks  

    var infowindow = new google.maps.InfoWindow({
          content: contentString,
        });


    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat,data.long),
      map: map,
      id: i,
      icon: {
        url: iconImg,
        size: new google.maps.Size(30, 30)

    }
    });
    
    markerArray.push(marker);
      
    google.maps.event.addListener(marker, 'click', function(e){

      map.setCenter(marker.getPosition());
      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });

      infowindow.open(map, marker);
      
    });

}

//place marker cluster
function placeMarkerCluster(){
   markerCluster = new MarkerClusterer(map, markerArray, 
            {
              imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
              minimumClusterSize: 5
            });
      
}

/*Remove markers from the map*/
function removeMarkers(){

   if(markerCluster){
    markerCluster.clearMarkers();
    }
    else{
      for(i=0; i<markerArray.length; i++){
      markerArray[i].setMap(null);
      }
    }
    markerArray=[];

}

function altfuelWindow (val) { 

  }







