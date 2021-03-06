const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require ('knex');
const bcrypt = require ('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

////////////connnecting database
const db=knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});

 //db.select('*').from('users');
const app = express(); //server starts
app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res) =>{
res.json("its working");
});

app.post('/signin',(req,res) =>{signin.handleSignin(req, res, db, bcrypt) });
///different method used new syntax
app.post('/register', register.handleRegister(db, bcrypt) );

app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req, res, db) });

app.put('/image',(req,res) =>{image.handleImage(req, res, db )});

app.post('/imageurl', (req,res) =>{image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is listening to port ${process.env.PORT}`);
});
