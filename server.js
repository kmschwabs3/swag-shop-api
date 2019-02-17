var express = require('express'); //imports express framework
var app = express();//invokes express and access properties
var bodyParser = require('body-parser');//allows to parse info and store as JS object
var mongoose = require('mongoose');//imports mongoose database
var db = mongoose.connect('mongodb://localhost/swag-shop', {useNewUrlParser: true });//connects database in app

var cors = require('cors');

app.use(cors()); 

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

//finds products from the database
app.get('/product', function(request, response){
	//find{} pulls back all of the items in the array
	Product.find({}, function(err, products){
		if (err){
			response.status(500).send({error: "Could not fetch products."})
		} else {
			response.send(products);
		}
	});
});

//gets the one product
app.get('/wishlist', function(request, response){
	WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists){
		if (err) {
			response.status(500).send({error: "Could nget wishlist"});
		} else {
			response.status(200).send(wishLists);
		}
	}) 
});

//creates the wishlist
app.post('/wishlist', function(request,response){
	var wishList = new WishList();
	wishList.title = request.body.title;

	wishList.save(function(err, newWishList){
		if (err){
			response.status(500).send({error:"Could not create wishlist."});
		} else {
			response.send(newWishList);
		}
	});
});
//adds products to the wishlist
app.put('/wishlist/product/add', function(request,response){
	Product.findOne({_id: request.body.productId}, function(err, product){
		if (err){
			response.status(500).send({error:"Could not add into wishlist"});
		} else {
			WishList.update({_id:request.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList){
				if (err) {
					response.status(500).send({error: "Could not add into wishlist"});
				} else {
					response.send("Added item to wishlist.");
				}
			});
		}
	});
});

app.listen(3004, function() {
	console.log('Swag Shop API running on port 3004.'); //confirms that the server is running
}); 

