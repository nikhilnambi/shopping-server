const mongoose = require("mongoose"); // Accessing the mongoose package
mongoose.connect("mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Shopping?retryWrites=true&w=majority");

// mongoose.connect("mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Library?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost:27017/Shopping"); 

// mongoose.connect("mongodb://localhost:27017/Shopping",function (err, db)
//  {
   
//     if(err) throw err;

//  })
// connecting and creating database

//Schema definition
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    
    productname:String,
    category:String,
    date:String,
    description:String,
    price:Number,
    quantity:String,
    sellerid:String,
    rating:String,
    image:String
});

// Model creation
var productdata = mongoose.model("productdata", ProductSchema);

module.exports = productdata;