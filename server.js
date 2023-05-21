const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));  // tis is used to render static website with image and css file
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {    // to respond browser request when it hot to 3000
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, function () {      // to listen radio channel at 3000
    console.log("server running at 3000");
});

app.post("/", function (req, res) {
    const place = req.body.cityname
    const unit = req.body.unit;
    const appid = "59a28423f7db9bf7f3a9acbcf59b86bb"
    const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + appid + "&units=" + unit;

    https.get(apiLink, function (response) {

        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descp = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature in " + place + " is " + temp + " degree clecius.</h1>");
            res.write("The Weather Mood is : " + descp);
            res.write("<img src =" + imgURL + ">");
            res.send();
        });

    });
})