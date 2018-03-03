const express = require("express");
const parser = require("body-parser");

const app = express();

const database = {
    users: [{
        id: '123',
        name: 'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date() 
    },
    {
        id: '1234',
        name: 'sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date() 
    }]
};


app.use(parser.json());

app.get('/', (req, res)=>{
    res.send(database.users);
});

app.post('/signin', (req, res)=>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json("success")
    } else{
        res.status(400).json("You are not registered");
    }
    res.json("working");
});

app.post('/register', (req, res)=>{
    let {email, name, password} = req.body;
    database.users.push({
        id: '1235',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date() 
    })
    res.json(database.users[database.users.length -1]);
});

app.listen(3000, ()=>{
    console.log("Server is running");
});