console.log("index started");
const express = require('express')

deployPort=process.env.PORT || 5000

DATABASE_URL = "mongodb://localhost/users";
PORT = 3000;
const app = express()
const axios = require('axios')
const mongoose=require('mongoose')

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());
const router = express.Router();
app.listen(PORT, () => console.log(`server has started at port ${PORT}`));





const clientID = '4wRE9isf'
const clientSecret = 'vlzMcLjMB0jfDowREL0pcnc4MT74F7BrO7Qt0ComwZtQlfLAX6UBr6TeKJPzsyQj'



// Declare the redirect route
app.get('/oauth/redirect', (req, res) => {
  
  const requestToken = req.query.code
  console.log(req.query.code)
  axios({
    // make a POST request
    method: 'post',
    
    url: `https://login.wrike.com/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&code=${requestToken}`,
     headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    console.log("FFF");
    const accessToken = response.data.access_token;
    console.log(accessToken);
    
    //res.redirect(`/welcome.html?access_token=${accessToken}`)
    
    console.log(accessToken);
    return accessToken;
  })

  .then(function(token)
  {
    
  
    urlFinal="https://www.wrike.com/api/v4/contacts?me=true&access_token="+token;
    
    console.log(urlFinal);
    axios({
      method: 'get',
    url: urlFinal,
    headers: { 
      'Authorization': 'bearer', 
      'Cookie': 'isWhitelabel=false; wrikeLocale=en'
    }
  })
  .then(function(res)
  {

    // console.log(res.data.data);
    const profile=res.data.data;
    console.log(profile);
    const name=profile["0"].firstName;

    console.log(name);
    //console.log(profile["0"]);
    //console.log(res.data.data.profiles);
    console.log(token);
    return name

  })
  .then(function(name){

    

    console.log("IN");



    const save={token:token,name:name};

    //const express = require("express");
    //const app = express();
    //const mongoose = require("mongoose");
    

    //const usersRouter = require("./users");
    //app.use("/users", usersRouter);
    
    
    const User = require("./tokens");
    const store=new User(save);

    User.findOne({name:name}, async function(err, found){
    if(err) console.log(err);
    if ( found){
    console.log("This has already been saved");
    } else {

      try {
      const newUser =  store.save();
      //res.status(201).json({ newUser });
    } catch (err) {
      //res.status(400).json({ message: err.message });
    }
    
    }
    console.log("SUCCESS!!")
    //app.close();
    return;
    
    //res.redirect(`/end.html`)
  })
    

    return;

  })
  .then(function(){
      console.log("DONE!!!");
      res.redirect("http://localhost:8081/tokens")})
  .catch(console.log("error"))
})
    //window.location = "localhost:8081/tokens");
})

app.use(express.static(__dirname));
app.listen(deployPort);
app.listen(8080);