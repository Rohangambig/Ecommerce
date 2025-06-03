const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
app.use(cors());
const fs = require('fs'); 
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(express.json());
app.use('/cart',express.static('images'))
const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'ecom',
    port: 3308 
});

db.connect(function (err) {
    if(err){
        console.log(err)
        console.log("error occurred while connecting");
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

// Signup API
app.post('/signup',(req,res)=>{
    const sql = "insert into signup(`fname`,`lname`,`phonenumber`,`email`,`password`) values(?,?,?,?,?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.phonenumber,
        req.body.email,
        req.body.password
    ];
    console.log(values);
    db.query(sql,values,(err,data)=>{
        if(err){
            return res.json('Error found')
        }
        return res.json(data)
    })
})
// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM signup WHERE email = ? AND password = ?";
    const values = [email, password];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.json({ success: false, message: "Error occurred" });
      }
      if (data.length > 0) {
        const user = data[0]; // Assuming the email is unique, so we take the first result
        const { id } = user;
        return res.json({ success: true, message: "Login successful",id:id});
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    });
  });

//  search
app.post("/search", (req, res) => {
    const { productname } = req.body;
    const sql = "SELECT * FROM product WHERE pame LIKE ?";
    const values = [productname+'%'];
  
    db.query(sql, values,(err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
  }); 
  

//   Cart
app.get('/cart', (req, res) => {
    const sql = "SELECT  distinct p.* FROM product p,cart_table c where c.id = p.id";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});


//   get user name
app.get('/username', (req, res) => {
    const sql = "SELECT  * from signup";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});
//API to insert into cart
app.post('/cartinsert', (req, res) => {
    const { id, img1, img2Base64, img3Base64, img4Base64, img5Base64, brand, details, price, discount, rating } = req.body;
    
    const sql = "INSERT INTO cart_table(`id`) VALUES (?)";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Data inserted successfully', result });
    });
});

app.post('/cartdelete', (req, res) => {
    const { id } = req.body;
    
    const sql = "DELETE FROM cart_table WHERE id = ? ";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Data deleted successfully', result });
    });
});

// Define a GET endpoint to fetch image data
app.get('/product', (req, res) => {
    const sql = "SELECT * FROM product";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

app.get('/ordereditem', (req, res) => {
    const sql = "SELECT  * FROM product p,orderedtable o where o.id = p.id";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

app.post('/order', (req, res) => {
    const { id, img1, img2Base64, img3Base64, img4Base64, img5Base64, brand, details, price, discount, rating } = req.body;
    
    const sql = "INSERT INTO orderedtable(`id`) VALUES (?)";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Data inserted successfully', result });
    });
});

// Send message


app.listen(8081,()=>{
    console.log('Listening')
})