

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/" , function(req ,res){

    res.sendFile(__dirname + "/index.html");

});


app.post("/" , function(req , res){

const query = req.body.cityName;
const apiKey = "746de2c29dd54e25acdf4ca350bb9163";
//const unit = "metric";

 const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query + "&appid=" + apiKey + "&units=metric";
 https.get(url , function(reponse){
     console.log(reponse.statusCode);

     reponse.on("data" , function(data){

         const weatherData = JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
         const icon = weatherData.weather[0].icon
         const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
         console.log(weatherDescription);
         console.log(temp);
         res.write("<p> the wheather is currently  " + weatherDescription + "<P>");
         res.write("<h1> the temperature in " + query + " is " + temp + " degree celcius.</h1>");
         res.write("<img src=" + imageURL + ">");



         res.send()
     })
 })

})

app.listen(3000 , function(){
    console.log("server is runninng at port 3000");
})