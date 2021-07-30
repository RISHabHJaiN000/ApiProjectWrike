
deployPort=process.env.PORT || 5000

console.log("sync server started");
const express = require('express')
const app = express();

const router = express.Router();

DATABASE_URL = "mongodb://localhost/users";
PORT = process.env.DB_CONNECTION||3000;


//const express = require("express");
//const app = express();
const mongoose = require("mongoose");
//mongoose.connect(DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());

//app.listen(PORT, () => console.log(`server has started at port ${PORT}`));


var axios = require('axios');



router.get('/sync', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const token = req.query.access_token
  //const token ="eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjQ4MjIyODcsXCJpXCI6Nzg0OTY5MyxcImNcIjo0NjI3NjYxLFwidlwiOlwiXCIsXCJ1XCI6MTExMDA5MjMsXCJyXCI6XCJVU1wiLFwic1wiOltcIk5cIl0sXCJ6XCI6W10sXCJ0XCI6MTYyNzEzMzEzMjAwMH0iLCJleHAiOjE2MjcxMzMxMzIsImlhdCI6MTYyNzEyOTUzM30.kwBJ1QwMLuzmTFk5KDg-Z64iBzx4DVj-NVh2fnu33HI";
  console.log(req.query.token)
  //console.log(token)
  urlFinal="https://www.wrike.com/api/v4/contacts?me=true&access_token="+token;
  //console.log(urlFinal);
  axios({
    method: 'get',
    url: urlFinal,
    headers: { 
      'Authorization': 'bearer', 
      'Cookie': 'isWhitelabel=false; wrikeLocale=en'
  }
  })
  
  .then(function (response) {

    
    //const usersRouter = require("./users");
    //app.use("/users", usersRouter);
    console.log(JSON.stringify(response.data));
    const router = express.Router();
    const User = require("./User");//
    const user=new User((response.data));
    console.log(user);
    console.log(response.data);
    console.log("now")
    //console.log(response.data["0"].id);

    const profile=response.data.data;
    //console.log(profile);
    const name=profile["0"].firstName;
    console.log(name);

    User.findOne({name:name}, function(err, found){
    if(err) console.log(err);
    if ( found){
    console.log("This has already been saved");
    } else {

      try {
      const newUser =  user.save();
      //res.status(201).json({ newUser });
    } catch (err) {
      //res.status(400).json({ message: err.message });
    }
    
    }
    console.log("SUCCESS!!")
  
  //res.redirect(`/end.html`)
})
})

.then(function(){
  Token.remove({ token: token }, function(err) {
    if (!err) {
            console.log("removed")
            //message.type = 'notification!';
    }
    else {
            console.log("Unable to remove");
            //message.type = 'error';
    }

    return;
})
  .then(function(){
    console.log("Done")
    res.redirect(`/tokens`)
  })
  
})//.then((res.redirect(`/tokens`)))
  // .then(res.redirect(`/end.html`))
.catch(function (error) {
  //console.log(urlFinal);
  console.log("f");
  console.log(error);

});
});




db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
//app.use(express.json());

const Token = require("./tokens");

router.get('/tokens', function(req, res) {
  //console.log(res);
  console.log("Button")


  Token.find({}, function(err, data){

        app.set('view engine', 'ejs');
        //console.log(">>>> " + data );
        for(var i =0;i<data.length;i++){
          console.log(data[i].name);
          console.log(data[i].token);

          //createButton(data[i].name,data[i].token);
          //console.log(values.token);
          console.log("--------------------------");
        }
        res.render("generateButtons", { data: data });

    });


});

//app.use(express.static(__dirname))
module.exports = router;