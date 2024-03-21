const express = require('express')
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')));  // for show  image to back-end
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

const Users = mongoose.model('Users', { usernamename: String, password: String });

const Products = mongoose.model('Products', { pname: String, pdesc: String, price: String, Category: String, pimage: String });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add-product', upload.single('pimage'),(req,res)=>{
  const pname= req.body.pname;
  const pdesc= req.body.pdesc;
  const price= req.body.price;
  const Category= req.body.Category;
  const pimage = req.file.path;

  const Product = new Products({pname, pdesc,price,Category,pimage});
  Product.save()
  .then(() => {
    res.send({message: 'saved sucessed.'} )
  
  })
.catch (() =>{
    res.send({message : 'Server Error'})
})
});

app.get('/get-products',(req,res)=>{
  Products.find()
  .then((result)=>{
    res.send({message: 'sucessed.', products:result} )
  })
  .catch((err)=>{
    res.send({message : 'Server Error'})
  })
})


app.post("/signup",(req,res)=>{
  const username= req.body.username;
  const password = req.body.password;
  const user = new Users({ username: username, password: password });
  user.save()
  .then(() =>{
    res.send({message: 'saved sucessed.'} )
  } )
  
  .catch(() =>{
    res.send({message : 'Server Error'})
  })
  
})

  app.post("/login",(req,res)=>{
    const username= req.body.username;
    const password = req.body.password;

      Users.findOne({ username: username })
    user.save()
    .then((result) => {
      console.log(result,"user data")
      if(!result){
        res.send({message: 'User not found.'} )
      }
      else{
        if(result.password==password){
          const token  =jwt.sign({
            data: result
          }, 'MYKEY', { expiresIn: 60 * 60 });
          res.send({message: 'find sucessed.', token : token} )
        }
        if(result.password!=password){
          res.send({message: 'Password not match.'} )
        }
        
      }
      
    })
    .catch (() =>{
      res.send({message : 'Server Error'})
    })
  
 })
  
  



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})