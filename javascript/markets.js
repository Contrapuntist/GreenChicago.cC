
var database = firebase.database();

var marketArray = [];
var marketObject = {};

function getMarkets(){ 
    $.ajax({
        url: "https://data.cityofchicago.org/resource/3r5z-s68i.json",
        type: "GET",
        data: {
          "$limit" : 5000,
          "$$app_token" : parkApiKey
        }
    }).done(function(data) {

        for (var i = 0; i < data.length; i++) {

            if(data[i].start_date) {
                var name = data[i].location;
                var latitude = data[i].latitude;
                var longitude = data[i].longitude;
                var city = "CHICAGO";
                var zip = null;
                var address = data[i].intersection;
                var state = "IL";
                var day = data[i].day;
                var startTime = data[i].start_time;
                var endTime = data[i].end_time;
                var startDate = data[i].start_date.slice(5, 10);
                var endDate = data[i].end_date.slice(5, 10);
                var type = data[i].type;

                marketObject = {
                    lat: latitude,
                    long: longitude,
                    zip: zip,
                    address: address,
                    city: city,
                    state: state,
                    name: name,
                    day: day,
                    startTime: startTime,
                    endTime: endTime,
                    startDate: startDate,
                    endDate: endDate,
                    type: type,
                };
            
                marketArray.push(marketObject);
            }
        }
        database.ref("markets").remove();
        database.ref("markets").push(marketArray);
    });
}

getMarkets();








