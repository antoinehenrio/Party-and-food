var express = require("express");
var log = require("morgan")("dev");
var bodyParser = require("body-parser");
var path = require('path')

var properties = require("./config/properties");
var db = require("./config/database");
//hero routes
var categorieRoutes = require('./routes/routeCategorie');
var groupeRoutes = require('./routes/routeGroupe');
var ingredientRoutes = require('./routes/routeIngredient');
var platRoutes = require('./routes/routePlat');
var recetteRoutes = require('./routes/routeRecette');
var soireeRoutes = require('./routes/routeSoiree');
var userRoutes = require('./routes/routeUser');
var preferenceRoutes = require('./routes/routePreference');
var voteRoutes = require('./routes/routeVote');
var app = express();

//configure bodyparser
var bodyParserJSON = bodyParser.json({limit: '50mb', extended: true });
var bodyParserURLEncoded = bodyParser.urlencoded({limit: '50mb', extended: true });

//initialise express router
var router = express.Router();

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// Error handling
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
	);
	next();
});

// use express router
app.use("/api", router);
categorieRoutes(router)
groupeRoutes(router)
ingredientRoutes(router)
platRoutes(router)
recetteRoutes(router)
soireeRoutes(router)
userRoutes(router)
preferenceRoutes(router)
voteRoutes(router)

app.use(express.static(path.join(__dirname, '../client')));

// intialise server
app.listen(properties.PORT, (req, res) => {
	console.log(`Server is running on ${properties.PORT} port.`);
});

module.exports = app
