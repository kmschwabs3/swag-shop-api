//blueprint for the wishlist data

var mongoose = require('mongoose'); //database
var Schema = mongoose.Schema; //structure
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishlist = new Schema ({
	title: [{type: String, default: "cool Wish List"}],//defaults the name of the wish list
	products: [{type: ObjectId, ref:'Product'}]//refrences another collection	
});

module.exports = mongoose.model('WishList', wishlist);