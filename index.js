const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/mailchimp.html");

})

app.post("/",function(req,res){

    let firstname = req.body.firstName;
    let lastname = req.body.lastName;
    let email = req.body.email;

    let data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
             
        ]
    }
    let jsonData=JSON.stringify(data);
    let options ={
        method:"POST",
        auth: "vansh_7071:your api key"
    }
    const url = "https://us14.api.mailchimp.com/3.0/lists/18a5541c62";

    const request=https.request(url,options,function(request){
         if(response.statusCode===200){
                res.sendFile(__dirname+"/public/success.html");
            }
            else{
                res.sendFile(__dirname+"/public/failiure.html");
            }
            
          response.on("data",function(data){ 
             console.log(JSON.parse(data));
          })

    })
    request.write(jsonData);
    request.end();
})
app.post("/success",function(req,res){
    res.redirect("/");
})
app.post("/failiure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server has started on port 3000");
})

