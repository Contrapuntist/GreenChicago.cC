

    // Here we are building the URL we need to query the database
    var queryURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?" +
      "q=Chicago,Illinois&units=imperial&appid=" + weatherKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        //$(".city").html("<h1>" + response.name + " Weather Details</h1>");
        //$(".wind").html("Wind Speed: " + response.wind.speed);
        //$(".humidity").html("Humidity: " + response.main.humidity);
        //$(".temp").html("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);

        $("#temp-now").html(parseInt(response.main.temp));
        $("#temp-hi").html(parseInt(response.main.temp_max));
        $("#temp-lo").html(parseInt(response.main.temp_min));


    });