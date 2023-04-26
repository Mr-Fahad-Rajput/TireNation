const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const Cart = require('./Models/cartSchema');
const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

require('./database/connection');



const Users = require('./Models/userSchema');
const Message = require('./Models/msgSchema');
const authenticate = require('./middleware/authenticate');


app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser());

// Registration
app.post('/register', async (req, res)=>{
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username : username,
            email : email,
            password : password
        });

        const created = await createUser.save();
        console.log( created + "was Created");
        res.status(200).send("Registered");

    } catch (error) {
        res.status(400).send(error)
    }
})


app.post('/login', async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        
        const user = await Users.findOne({email : email});
        if(user){
            
            const isMatch = await bcryptjs.compare(password, user.password);

            if(isMatch){
               
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    expires : new Date(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send("LoggedIn")
            }else{
                res.status(400).send("Invalid Credentials");
            }
        }else{
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post('/message', async (req, res)=>{
    try {
        
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const sendMsg = new Message({
            name : name,
            email : email,
            message : message
        });

      
        const created = await sendMsg.save();
        console.log(created);
        res.status(200).send("Sent");

    } catch (error) {
        res.status(400).send(error)
    }
})




app.get('/auth', authenticate, (req, res)=>{

})

app.listen(port, ()=>{

    console.log("Server Listening...")
})


//Routing
  app.get('/', authenticate, (req, res) => {
  res.render('home', { loggedIn: !!req.user });
  });

  app.get('/home', authenticate, (req, res) => {
  res.render('home', { loggedIn: !!req.user });
  });
  app.get('/register', authenticate, (req, res) => {
    res.render('register', { loggedIn: !!req.user });
  });
  
  app.get('/login', authenticate, (req, res) => {
    res.render('login', { loggedIn: !!req.user });
  });
  
  app.get('/logout', (req, res)=>{
    res.clearCookie("jwt", {path : '/'})
    res.render('home', { loggedIn: !!req.user });

})
  app.get('/contact', authenticate, (req, res) => {
    res.render('contact', { loggedIn: !!req.user });
  });
  
  app.get('/cart', authenticate, async (req, res) => {
    try {
      if (!req.user) {
        res.render('loggedOutCart', { loggedIn: false });
      } else {
        const cart = await Cart.findOne({ user: req.user._id }).populate('user');
        res.render('cart', { loggedIn: true, items: cart ? cart.items : [] });
      }
    } catch (error) {
      res.status(400).send(`Error fetching cart: ${error.message}`);
    }
  });

// Add item to the cart
app.post('/cart/add', authenticate, async (req, res) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const { tireStyle, size, price, imageUrl } = req.body;
  
      const newItem = {
        tireStyle,
        size,
        price,
        imageUrl,
      };
  
      // Find the cart for the user
      let cart = await Cart.findOne({ user: req.user._id });
  
      // If there's no cart, create a new one
      if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [newItem] });
      } else {
        // Otherwise, update the existing cart
        cart.items.push(newItem);
        await cart.save();
      }
  
      res.status(201).send(cart);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  });
  
  // Remove a tire from the cart
  app.post('/cart/remove', authenticate, async (req, res) => {
    const { itemId } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (cart) {
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();
        res.status(200).send('Tire removed from cart');
      } else {
        res.status(400).send('No cart found');
      }
    } catch (error) {
      res.status(400).send('Error removing tire from cart');
    }
  });

  app.get("/is_logged_in", authenticate, (req, res) => {
    if (req.user) {
      res.status(200).json({ isLoggedIn: true });
    } else {
      res.status(200).json({ isLoggedIn: false });
    }
  });


