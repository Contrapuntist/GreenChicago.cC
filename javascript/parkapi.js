console.log(parkApiKey);

// Park API
$.ajax({
    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json",
    type: "GET",
    data: {
      "$$app_token" : parkApiKey
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});