var map, infoWindow;

var pos={
  lat: 41.8781,
  lng: -87.6298
};


var readDb=firebase.database();
var curCat='alt-fuel';
var searchZip='60606';
var markerArray=[];

// Specifies 1st node in firebase for alt-fuel
var dbChild = '-KnQWmrvNl34dXBFVzss'; 


//To read data from firebase based on category passed
function readData(curCat){
  return readDb.ref(curCat).child(dbChild).once('value').then(function(snapshot){
    var dispData = snapshot.val();

    var key=Object.keys(dispData); 
    arrayLength = dispData.length;
    placeMultiMarkers(dispData);


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
function placeMultiMarkers(dispData){
  console.log('I am in multi marker');
  //console.log(dispData);
  //arrayLength
  for (i=0; i<arrayLength  ; i++) { 

  if(dispData[i].zip===searchZip)
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(dispData[i].lat,dispData[i].long),
      map: map,
      center: pos,
      zoom: 6
    });
    pos.lat=dispData[i].lat;
    pos.lng=dispData[i].long;
    //placeMarkerAndPanTo(pos, map);


  }
  
}



//Find Lat and Long using address
function getLatitude(street, city, state){

    var tmpAddress=[];
    tmpAddress.push(street.split(' ').join('+'), city.split(' ').join('+'), state.split(' ').join('+'));
    var curAddress=tmpAddress.join(',');
    console.log(curAddress);
    var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?address="+curAddress;
    console.log(getLatLng);
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
    tmpAddress.push(location.address.split(' ').join('+'), location.city.split(' ').join('+'), location.state.split(' ').join('+'));
    var curAddress=tmpAddress.join(',');
    console.log(curAddress);
    var getLatLng="https://maps.googleapis.com/maps/api/geocode/json?address="+curAddress;
    console.log(getLatLng);
    $.ajax({
      url: getLatLng,
      method: "GET"
      }).done(function(response){
        /*pos.lat=response.results[0].geometry.location.lat;
        pos.lng=response.results[0].geometry.location.lng;
        var tmp=[];
        tmp.push(pos.lat, pos.lng);
        markerArray.push(tmp);*/
        return response.results[0].geometry.location.lng;
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
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      placeMarkerAndPanTo(pos, map);

}

/*This function will put the place markers in the map for given 
latitude and longitude*/
var marker;
function placeMarkerAndPanTo(latLng, map) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat,latLng.lng),
      map: map
    });

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


