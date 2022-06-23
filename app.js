const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");


const app = express();

require("./config/passport")(passport);


mongoose.connect('mongodb+srv://vaman15033:Vaman6327@cluster0.wpwg0gb.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then( () => console.log("MongoDB Connected"))
.catch( (err) => console.log("MongoDB error"))

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs")

//Body parser
app.use(express.urlencoded( { extended: false} ));

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true 
  }))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
})

//Routes
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{  
    console.log(`server listening on port ${PORT}`);
})