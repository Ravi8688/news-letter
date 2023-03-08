const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signin.html");
})

app.post("/",function(req,res){
  const firstname=req.body.fname
  const lastname=req.body.lname
  const email=req.body.mail
  // console.log(firstname , lastname , email);

  const data={
    members: [ {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }
    ]
  };

   const jsonData = JSON.stringify(data);
   const url = "https://us13.api.mailchimp.com/3.0/lists/Fa8811beb26"

  const options={
    method:"POST",
    auth:"RAVI1:dd805770714faae666a0a913b5cad2e3-us13"
  }

   const request = https.request(url, options , function(response){

     if(response.statusCode === 200){
       res.sendFile(__dirname+"/success.html");
     }else{
       res.sendFile(__dirname+"/failure.html")
     }

      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
  })

    request.write(jsonData);
    request.end();


})


app.post("/failure",function(req, res){
  res.redirect("/");
})


app.listen( process.env.PORT || 1980 ,function(){
  console.log("server started at the portal 1980");
})


//api key
//dd805770714faae666a0a913b5cad2e3-us13

//unique ID
//a8811beb26
