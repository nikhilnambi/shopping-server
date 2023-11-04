const express = require('express'); 
const path = require ('path'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const userData = require('./models/userdata');
const sellerData = require('./models/sellerdata');
const productData = require('./models/productdata');
const cartData = require('./models/cartdata');
const jwt= require('jsonwebtoken');
const { execFileSync } = require('child_process');



const app = express();
app.use(cors());
app.use(bodyParser.json());




function verifyToken(req,res,nxt){

  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request')
  }

  let token = req.headers.authorization.split('')[1]
  let t =  req.headers.authorization;
  console.log("t"+t);
  if(token=='null'){
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token,'secretKey')
  console.log(payload)

  if(!payload)
  {
    return res.status(401).send('Unauthorized request')
  }
  req.userId= payload.subject
  nxt()
  
}


//user sign up

app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
   
//    console.log(req.body.userdata.name);

   var userdata={

    name:req.body.userdata.name,
    email:req.body.userdata.email,
    phone:req.body.userdata.phone,
    password:req.body.userdata.password


   }


     var userdata = new userData(userdata);
     userdata.save()

})

//adding seller sign up data to database

app.post('/add',function(req,res){
  res.header("Access-Control-Allow-Orgin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
 


 var sellerdata={

  name:req.body.sellerdata.name,
  email:req.body.sellerdata.email,
  phone:req.body.sellerdata.phone,
  password:req.body.sellerdata.password


 }


   var sellerdata = new sellerData(sellerdata);
   sellerdata.save()

})

//user login 

app.post('/login',function(req,res){
    console.log("login checking");

    let userdata = req.body;

    console.log(userdata.email);
    console.log(userdata.password);

    userData.find().then(function(user){
        console.log(user);
        
        var userverify;
   

    for(i=0;i<user.length;i++){
        
        if (userdata.email==user[i].email && userdata.password==user[i].password){

          var user={
            username:user[i].name,
            id:user[i]._id,
          }
          
           userverify=true;
           console.log("true");
           
           break;

          } 

        else {
          userverify=false;
        }

       

           
        }
          if(userverify==true){
            
            console.log("success full login");
            let payload ={subject:userdata.email+userdata.password}
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token,user});
            
            
            
           
           
           
  
          }

          else{
            res.status(401).json({
             message: "Login Unsuccessful ! Invalid Credentials"});
          }
    
});
})

//seller login

app.post('/sellerlogin',function(req,res){
  console.log("seller login checking");

  let sellerdata = req.body;

  console.log(sellerdata.email);
  console.log(sellerdata.password);

  sellerData.find().then(function(seller){
      console.log(seller);
      
      var sellerverify;
 

  for(i=0;i<seller.length;i++){
      
      if (sellerdata.email==seller[i].email && sellerdata.password==seller[i].password){
        

        var seller={
          sellername:seller[i].name,
          id:seller[i]._id,
        }

         sellerverify=true;
         console.log("true");
         break;

        } 

      else {
        sellerverify=false;
      }

     

         
      }
        if(sellerverify==true){
          
          console.log("success full login");
          let payload ={subject:sellerdata.email+sellerdata.password}
          let token = jwt.sign(payload,'secretKey');
          res.status(200).send({token,seller});

        }

        else{
          res.status(401).json({
           message: "Login Unsuccessful ! Invalid Credentials"});
        }
  
      });

    })


    //seller adding product to database

    app.post('/add-product',function(req,res){
       
  res.header("Access-Control-Allow-Orgin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
 


 var productdata={

  productname:req.body.productdata.productname,
  price:req.body.productdata.price,
  description:req.body.productdata.description,
  image:req.body.productdata.image,
  sellerid:req.body.productdata.sellerid,
  category:req.body.productdata.category,
  date:req.body.productdata.date,
  rating:req.body.productdata.rating,
  quantity:req.body.productdata.quantity,
  


 }


   var productdata = new productData(productdata);
   productdata.save()

    })

    //retrieving seller products data from database

    app.get('/get-seller-products/:sellerid',function(req,res){
     
      const sellerid = req.params.sellerid;
      console.log(sellerid);

      productData.find({"sellerid":sellerid})
         .then(function(product){
          if(product.length==0){
          res.status(401).json({
            message: "No products added by this seller"
          })

         } 
         else{
          res.send(product);
         }
        })
         
    })

    //seller retrieving one product data

    app.get("/get-seller-product/:_id",function(req,res){

      const id = req.params._id;

      productData.findOne({"_id":id})
      .then(function(product){
       
        res.send(product);
        
      })  

    })

    //seller updating product 

    app.put("/updateProduct",function(req,res){
      console.log(req.body)
    
      id = req.body._id;
     
    productname=req.body.productname,
    category=req.body.category,
    date=req.body.date,
    description=req.body.description,
    price=req.body.price,
    quantity=req.body.quantity,
    sellerid=req.body.sellerid,
    rating=req.body.rating,
    image=req.body.image,
      
     
    
      productData.findByIdAndUpdate({"_id":id},
                          {$set:{"productname":productname,
                                "category":category,
                                "date":date,
                                "description":description,
                                "price":price,
                                "quantity":quantity,
                                "sellerid":sellerid,
                                "rating":rating,
                                "image":image
                               }})
                                
                              .then(()=>{
                                res.send();
                              })
                             
    
    })

    //seller deleting product

    app.get("/deleteProduct/:_id",function(req,res){
      const _id = req.params._id; 
      console.log(_id);

      productData.findByIdAndDelete({"_id":_id})
      .then(()=>{
         console.log("product deleted");
         res.send();
      })

    })


    //user function


    //retrieving all products to user

    app.get("/get-user-product",function(req,res){
       
      productData.find().then(function(product){
        res.send(product);
      })
    })

    //for single product

    app.get("/get-cart-product/:_id",function(req,res){
      
      const _id = req.params._id;

      productData.findOne({"_id":_id})
      .then(function(product){
        res.send(product);
  
      })

      })

      //user adding product to cart

      app.post('/add-to-cart',function(req,res){
        res.header("Access-Control-Allow-Orgin","*")
        res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
       
        var cartdata={

          productname:req.body.cartdata.productname,
          price:req.body.cartdata.price,
          description:req.body.cartdata.description,
          image:req.body.cartdata.image,
          sellerid:req.body.cartdata.sellerid,
          category:req.body.cartdata.category,
          date:req.body.cartdata.date,
          rating:req.body.cartdata.rating,
          quantity:req.body.cartdata.quantity,
          cartquantity:req.body.cartdata.cartquantity,
          userid:req.body.cartdata.userid,

        }
      
    
    
         var cartdata = new cartData(cartdata);
         cartdata.save()
    
    })


    //accessing cart products

    app.get("/cartproducts/:userid",function(req,res){
      
      const userid = req.params.userid;

      cartData.find({"userid":userid}).
      then(function(cartproduct){

        if(cartproduct.length==0){
          res.status(401).json({
            message: "No products added to the cart"
          })
    
         } 
         else{
          res.send(cartproduct);
         }
       
      })
      
    })

    app.get("/deletecartproduct/:_id",function(req,res){
      const _id = req.params._id; 
      console.log(_id);

      cartData.findByIdAndDelete({"_id":_id})
      .then(()=>{
         console.log("product deleted");
         res.send();
      })

    })
      

    
    
  


    

const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
    })