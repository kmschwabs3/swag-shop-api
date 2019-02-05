var express = require('express'); //imports express framework
var app = express();//invokes express and access properties
var bodyParser = require('body-parser');//allows to parse info and store as JS object
var mongoose = require('mongoose');//imports mongoose database
var db = mongoose.connect('mongodb://localhost/swag-shop', {useNewUrlParser: true });//connects database in app

var Product = require('./model/product'); //connects to the product.js blueprint
var WishList = require('./model/wishlist'); //connects to the wishlist.js blueprint 

app.use(bodyParser.json()); //tells the system to use json
app.use(bodyParser.urlencoded({extended: false}));//tells the system whether you want to use a simple algorithm for shallow parsing

//req is an object containing info about the HTTP request made. res sends back desired HTTP status
//this post request makes new product objects

app.post('/product', function(request, response){
	//constructor method to make a new object based on the bluerpint in products.js
	var product = new Product();
	product.title = request.body.title;
	product.price = request.body.price;
	//this function saves the product data
	product.save(function(err, saveProduct){
		if (err) {
			response.status(500).send({error: "Could not save product."});
		} else {
			response.status(200).send(saveProduct);
		}
	});
});

app.listen(3000, function() {
	console.log('Swag Shop API running on port 3000.'); //confirms that the server is running
});