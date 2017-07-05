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

    /*pos.lat=dispData[i].lat;
    pos.lng=dispData[i].long;
    placeMarkerAndPanTo(pos, map);*/
    //pos.address=dispData[i].address;

    placeMarkerAndPanTo(dispData[i],map, i);

  }
  placeMarkerCluster();
  
}



//Find Lat and Long using address
function getLatitude(street, city, state){

    var tmpAddress=[];
    tmpAddress.push(street.split(' ').join('+'), city.split(' ').join('+'), state.split(' ').join('+'));
    var curAddress=tmpAddress.join(',');
    // console.log(curAddress);
    var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?address="+curAddress;
    // console.log(getLatLng);
    $.ajax({
      url: getLatLng,
      method: "GET"
      }).done(function(response){
        /*pos.lat=response.results[0].geometry.location.lat;
        pos.lng=response.results[0].geometry.location.lng;
        var tmp=[];
        tmp.push(pos.lat, pos.lng);
        markerArray.push(tmp);*/

        console.log(response.results[0].geometry.location.lat);
        return response.results[0].geometry.location.lat;

    });
}

var tmplat = getLatitude('5501 carriageway dr', 'Rolling Meadows', 'IL');


//Find Lat and Long using address
function getLongitude(street, city, state){

    var tmpAddress=[];
    tmpAddress.push(street.split(' ').join('+'), city.split(' ').join('+'), state.split(' ').join('+'));
    var curAddress=tmpAddress.join(',');
    // console.log(curAddress);
    var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?address="+curAddress;
    // console.log(getLatLng);
    $.ajax({
      url: getLatLng,
      method: "GET"
      }).done(function(response){
        /*pos.lat=response.results[0].geometry.location.lat;
        pos.lng=response.results[0].geometry.location.lng;
        var tmp=[];
        tmp.push(pos.lat, pos.lng);
        markerArray.push(tmp);*/
        var long = response.results[0].geometry.location.lng;
        return long;
    });
}


//when location is enabled in browser and user allowed it
function geoLocSucess(position){
          pos.lat = position.coords.latitude;
          pos.lng = position.coords.longitude;
          displayMap();      
          console.log('I am in success');
//          readData(curCat); // hard coded alt-fuel key 
}

//when location is not enabled in browser or enabled but user blocked it
function geoLocFail(position){
          pos.lat = 41.8781;
          pos.lng = -87.6298;
          displayMap();    
          console.log('I am in error');
          //readData(curCat); // hard coded alt-fuel key 
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
        url: './images/Ptx.png',
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
    var marker;
    var newDiv = $("<div>"); 

    // Condition to determine content for Google Map InfoWindow
    if (curCategory == "alt-fuel") { 
  
    // Parks content for infowindow 
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Alternative Fuel Station</div>'; 

      var statName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div class="iw-scroll">' + statName + statAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Green roofs content for infowindow 
    } else if (curCategory == "greenRoofs") {
      console.log(dispData[i].name); 
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Green Roof</div>'; 

      var roofAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
   
      var winContent = '<div class="iw-scroll">' + roofAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';

    // Parks content for infowindow 
    } else if (curCategory == "parks") { 
      
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Parks</div>'; 

      var parkName = '<div class="iw-subTitle">Name</div><p>' + dispData[i].name + '</p>';
      var parkAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].address + '<br>' 
      + dispData[i].city + ', ' + dispData[i].state + '</p>';
      var winContent = '<div class="iw-scroll">' + parkName + parkAddr + '</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>';
    
    // Divvy content for infowindow 
    } else if (curCategory == "divvy") {
      
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Divvy Station</div>'; 

      var statAddr = '<div class="iw-subTitle">Address</div><p>' + dispData[i].stAddress1 + '</p>';

      var statDocks = '<div class="iw-subTitle">Dock Details</div><p>Total Docks: '+ dispData[i].totalDocks + '<br> Bikes available: ' + dispData[i].availableBikes + 
        '<br> Docks available: ' + dispData[i].availableDocks +'</p>';

      var statUpdate = '<div class="iw-subTitle">Last Update</div><p>' + dispData[i].lastCommunicationTime + '</p>';
      
      var winContent = '<div class="iw-scroll">' + statAddr + statDocks + statUpdate +'</div>';  

      contentString = '<div class="infoWinContainer iw-scroll">' + winCat + winContent + '</div>'; 

    // Divvy content for infowindow 
    } else if (curCategory == "markets") {
      
      var winCat = '<div class="iw-Title"><i class="fa fa-bolt"></i> Farmer\'s Market</div>' 

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
        //url: './images/FarmersMarket_Icon.png'
        //size: new google.maps.Size(50, 50)
        path: fontawesome.markers.CIRCLE_THIN,
        path: fontawesome.markers.CUTLERY,
        scale: 0.5,
        strokeOpacity: 1,
        fillColor: 'blue',
        fillOpacity: 1
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
  /*for(i=0; i<markerArray.length; i++){
    markerArray[i].setMap(null);
  }*/
  markerArray=[];
 if(markerCluster){
  markerCluster.clearMarkers();
  }
  

}

/*This call will only work with some synchronous call & wait because
otherwise the call always have it as null need to figure this*/
function getCurLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos={
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
          return pos;
      });

    }
    else{
      return null;
    }   
}


function altfuelWindow (val) { 

  }







