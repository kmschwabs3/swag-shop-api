//blueprint for the product data

var mongoose = require('mongoose'); //database
var Schema = mongoose.Schema; //structure

//creates object with constructure syntax
var product = new Schema ({
	title: String,
	price: Number,
	likes: Number
});

module.exports = mongoose.model('Product', product)