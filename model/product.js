//blueprint for the product data

var mongoose = require('mongoose'); //database
var Schema = mongoose.Schema; //structure

//creates object with constructor syntax
var product = new Schema ({
	title: String,
	price: Number,
	likes: {type: Number, default:0}
});

module.exports = mongoose.model('Product', product)