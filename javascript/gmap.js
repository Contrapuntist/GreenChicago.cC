var map, infoWindow, markerArray = [], markerCluster, curCategory, dispData;

var pos={
  lat: 41.8781,
  lng: -87.6298  
};

var zoomLevel=14;

var contentString;

var readDb=firebase.database();

//To read data from firebase based on category passed
function readData(curCat){

  curCategory=curCat;
  dispData={};
  removeMarkers();
  
  readDb.ref(curCat).once('value').then(function(snapshot){

    var curCatData = snapshot.val();
    
    var key=Object.keys(curCatData); 
    dispData = curCatData[key];
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
    }

}

//This is to display the markers based on search category and location
function placeMultiMarkers(){

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
}

//when location is not enabled in browser or enabled but user blocked it
function geoLocFail(position){
          pos.lat = 41.8781;
          pos.lng = -87.6298;
          displayMap();    
}


//function to display the map when pos object has lat and lng
function displayMap(){
    map = new google.maps.Map(document.getElementById('googlemaptest'), {
            center: pos,
            zoom: zoomLevel,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });

    var initMarker = new google.maps.Marker({
      position: new google.maps.LatLng(pos.lat,pos.lng),
      map: map,     
    });   
}


//function to set map center based on entered zip code
function zipSearch(zip){
var geocoder=new google.maps.Geocoder;
zoomLevel=15;
geocoder.geocode( { 'address': zip}, function(results, status) {
 if (status == google.maps.GeocoderStatus.OK) {
         pos.lat = results[0].geometry.location.lat();
         pos.lng = results[0].geometry.location.lng();
     }
  displayMap();
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
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i>  Alternative Fuel Station</div>'; 

      var statName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div>' + statName + statAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Green roofs content for infowindow 
    } else if (curCategory == "greenRoofs") {

      iconImg = './images/leaf.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-leaf"></i>  Green Roof</div>'; 

      var roofAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
   
      var winContent = '<div>' + roofAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Parks content for infowindow 
    } else if (curCategory == "parks") { 
      
      iconImg = './images/tree.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-tree"></i>  Parks</div>'; 

      var parkName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var parkAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div>' + parkName + parkAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';
    
    // Divvy content for infowindow 
    } else if (curCategory == "divvy") {
      
      iconImg = './images/bicycle.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-bicycle"></i>  Divvy Station</div>'; 

      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].stAddress1 + '</p>';

      var totDocks = '<div class="iw-subTitle">Dock Details</div><p>Total Docks: '+ dispData[i].totalDocks + '</p>';


      // Option to include additional dock info when/if Divvy api realtime.  

      // var statDocks = '<div class="iw-subTitle">Dock Details</div><p>Total Docks: '+ dispData[i].totalDocks + '<br> Bikes available: ' + dispData[i].availableBikes + 
      //   '<br> Docks available: ' + dispData[i].availableDocks +'</p>';

      // var statUpdate = '<div class="iw-subTitle">Last Update</div><p>' + dispData[i].lastCommunicationTime + '</p>';
      
      var winContent = '<div>' + statAddr + totDocks + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>'; 

    // Divvy content for infowindow 
    } else if (curCategory == "markets") {
      
      iconImg = './images/cutlery.png';

      var winCat = '<div class="iw-Title"><i class="fa fa-cutlery"></i>  Farmer\'s Market</div>' 

      var marketName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var marketAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var marketDate = '<div class="iw-subTitle">Dates: </div><p>' + dispData[i].startDate + ' to ' + dispData[i].endDate + '</p>';;
      var marketTime = '<div class="iw-subTitle">Name</div><p>' + dispData[i].startTime + ' to ' + dispData[i].endTime + '</p>';;

      var winContent = '<div class="iw-scroll">' + marketName + marketAddr + marketDate + marketTime + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>'; 
    }


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
              imagePath: 'markerclusterer/images/m',
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









