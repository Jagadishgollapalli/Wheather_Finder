const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/city_information", function (req, res) {
  const API_KEY = "b8122a52627e66543a9d10ff7d530014";
  const City = req.body.city;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric`;

  if (!City) {
    console.log("Please enter a city");
  } else {
    https.get(URL, function (response) {
      response.on("data", (data) => {
        const WeatherData = JSON.parse(data);
        const temp = WeatherData.main.temp;
        const icon = WeatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        //for celsius use units=metric
        //for fahrenheit use units = imperial
        res.write(
          "<h1>The weather data in " +
            City +
            " is " +
            temp +
            " degree celsius</h1>"
        ); //res.write() is not working without html tags
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    });
  }
});

app.listen(3000, function () {
  console.log("server running succesfully in 3000");
});
