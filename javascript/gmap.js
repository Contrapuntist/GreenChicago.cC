
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('googlemaptest'), {
          center: {lat: 41.659, lng: -87.609},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;
        var curAdd;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos.lat);
            console.log(pos.lng);

            var getAddress = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.lat+','+pos.lng+'&key=AIzaSyDDQHNuQGJDBCpnNF01rMuywnHNYkW2hCY';
            
            $.ajax({
              url: getAddress,
              method: 'GET'

            }).done(function(response){
              console.log(response);
              curAdd = response.results[0].formatted_address;
              console.log(curAdd);
                          infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.'+curAdd);
            console.log(pos);
            infoWindow.open(map);
            map.setCenter(pos);
          });


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
   /* <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDQHNuQGJDBCpnNF01rMuywnHNYkW2hCY&callback=initMap">
    </script>*/
