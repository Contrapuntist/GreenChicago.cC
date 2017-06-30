
var database = firebase.database();

var chicagoZipcodes = [60007, 60176, 60603, 60607, 60611, 60615, 60619, 60623, 60628, 60632, 
    60637, 60641, 60645, 60651, 60655, 60660, 60668, 60674, 60680, 60686, 60690, 60695,60701, 
    60804, 60018, 60290, 60604, 60608, 60612, 60616, 60620, 60624, 60629, 60633, 60638, 60642, 
    60646, 60652, 60656, 60661, 60669, 60675, 60681, 60687, 60691, 60696, 60706, 60827, 60106, 
    60601, 60605, 60609, 60613, 60617, 60621, 60625, 60630, 60634, 60639, 60643, 60647, 60653, 
    60657, 60664, 60670, 60677, 60684, 60688, 60693, 60697, 60707, 60131, 60602, 60606, 60610, 
    60614, 60618, 60622, 60626, 60631, 60636, 60640, 60644, 60649, 60654, 60659, 60666, 60673, 
    60678, 60685, 60689, 60694, 60699, 60803];

function getResults(zip) {
    // or
    // function getResults(lat, lng) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service zipSearch or locSearch.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip,
        // or
        // url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: 'jsonp'
    }).done(function(data){
        console.log(data)
        for (var key in data) {
            var results = data[key];
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                for (var key in result) {
                    //only do an alert on the first search result
                    if (i == 0) {
                        console.log(result[key]);
                    }
                }
            }
        }

    });
}

function getResultsByZip(zips) {
    for (var i = 0; i < zips.length; i++) {
        getResults(zips[i]);
    }
}

getResultsByZip(chicagoZipcodes);



