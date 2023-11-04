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

const UserSchema = new Schema({
    name: String,
    email:String,
    phone:String,
    password:String
});

// Model creation
var sellerdata = mongoose.model("sellerdata", UserSchema);

module.exports = sellerdata;