const mongoose = require("mongoose"); // Accessing the mongoose package
mongoose.connect("mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Shopping?retryWrites=true&w=majority");

// mongoose.connect("mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Library?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost:27017/Shopping"); 

// mongoose.connect("mongodb://localhost:27017/Shopping",function (err, db)
//  {
   
//     if(err) throw err;

//  })




const Schema = mongoose.Schema;

const CartSchema = new Schema({
    
    productname:String,
    category:String,
    date:String,
    quantity:String,
    description:String,
    price:Number,
    rating:String,
    cartquantity:String,
    sellerid:String,
    image:String,
    userid:String
});

// Model creation
var cartdata = mongoose.model("cartdata", CartSchema);

module.exports = cartdata;