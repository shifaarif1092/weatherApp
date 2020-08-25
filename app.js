const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html");
});
  app.post("/",function(req,res){
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=297d1091eda71950f0da5894bc23d469&units=metric";
    https.get(url,function(response){
      response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const des=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in "+query+" is "+temp +".</h1>");
        res.write("<h6>The weather condition is "+des+".</h6>");
        res.write("<img src="+imgUrl+">")
        res.send();
      })
    })
  })
app.listen(process.env.PORT || 3000,function(){
  console.log("Running on port 3000");
})
