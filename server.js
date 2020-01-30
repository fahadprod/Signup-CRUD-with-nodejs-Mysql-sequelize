var express = require('express');
// var passport   = require('passport');
// var session    = require('express-session');
var bodyParser = require('body-parser');
var db = require('./models');
const Role = db.role;
// var authRoute = require('./routes/auth.js');
const cors = require("cors");
var app = express();
// var authController = require('./controller/authController.js')
// var exphbs = require('express-handlebars')
// var env = require('dotenv').config();

// initial the user roles

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

  db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    // initial();
});

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// for bodyParser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});
 
// app.post('/signup', authController.signup);
 
require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});