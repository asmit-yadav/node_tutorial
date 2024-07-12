// console.log("server file is running")
// function add(a, b) {
//     return a + b;
// }
// var add=function(a,b)
// {
//     return a+b;
// }
// console.log(typeof add)
// var add=(a,b)=>
// {
//     return a+b;
// }
// console.log(typeof add)
// var add=(a,b)=> a+b;
// var result = add(2, 81);
// console.log(result)


// function callback()
// {
//     console.log('asmit is calling callback function');
// }
// const add=function(a,b,callback)
// {
//     var result =a+b;
//     console.log('result =>'+result);
//     callback();
// }
// add(2,9,callback);
// const add=function(a,b,callback)
// {
//     var result =a+b;
//     console.log('result =>'+result);
//     callback();
// }
// add(3,2,()=> { console.log('add comleted')})


// var fs=require('fs');
// var os =require('os')
// var user=os.userInfo()
// console.log(user.username)
// fs.appendFile('greeting.txt','Hi '+user.username+'!\n',()=>
// {
//     console.log('File is created');
// })
// console.log(os)

// const notes=require('./notes.js');

// console.log(notes.age)
// var a=notes.add(10,90);
// console.log(a)
// var _ = require('lodash');
// var data = ["person", 'person', 1, 2, 3, 1, 2, 'name', 'age', '2'];
// var filter = _.uniq(data)
// console.log(filter)
// const express = require('express')
// const app = express();
// const db = require('./db')



// const bodyParser = require('body-parser');
// app.use(bodyParser.json());


// const Person = require('./models/Person')


// app.get('/', function (req, res) {
//     res.send('Welcome to the my hotel...!.')
// })
// app.get('/chicken', function (req, res) {
//     res.send('sure sir , i would love to serve chicken ')
// })
// app.get('/idli', function (req, res) {
//     res.send('sure sir , i would love to serve idli ')
// })

// app.post('/items',(req,res)=>{
//     res.send('data is saved');
// })
// app.post('/person',(req,res)=>{
//     res.send('data is saved');
// })



// const express = require('express');
// const app = express();
// const db = require('./db'); // Ensure this path is correct

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// const Person = require('./models/Person'); // Ensure this path is correct

// app.get('/', (req, res) => {
//     res.send('Welcome to the my hotel...!.')
// });

// Uncomment these to test basic routes
// app.get('/chicken', (req, res) => {
//     res.send('sure sir , i would love to serve chicken')
// });
// app.get('/idli', (req, res) => {
//     res.send('sure sir , i would love to serve idli')
// });

// Uncomment these to test basic POST routes
// app.post('/items', (req, res) => {
//     res.send('data is saved');
// });
// app.post('/person', (req, res) => {
//     res.send('data is saved');
// });
// const Person = require('./models/Person'); // Ensure this path is correct
// const MenuItem = require('./models/MenuItem'); // Ensure this path is correct
// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body;
//         const newPerson = new Person(data);
//         const response = await newPerson.save();
//         console.log('Data Saved');
//         res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// app.post('/MenuItem', async (req, res) => {
//     try {
//         const data = req.body;
//         const newMenuItem = new MenuItem(data);
//         const response = await newMenuItem.save();
//         console.log('Data Saved');
//         res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// app.get('/person', async (req, res) => {
//     try {
//         const data = await Person.find();
//         console.log('Data fetched Successful !');
//         res.status(200).json(data);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })
// app.get('/MenuItem', async (req, res) => {
//     try {
//         const data = await MenuItem.find();
//         console.log('Data fetched Successful !');
//         res.status(200).json(data);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// app.get('/person/:workType', async (req, res) => {
//     try {
//         const workType = req.params.workType;
//         if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
//             const response = await Person.find({ work: workType });
//             console.log("response fetched");
//             res.status(200).json(response);
//         }
//         else {
//             res.status(404).json({ error: "Invalid work Type" });
//         }
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


const express = require('express');
const app = express();
const db = require('./db'); // Ensure this path is correct

require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my hotel...!');
});

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/menuItem', menuRoutes);
app.use('/person', personRoutes);

const server = app.listen(PORT, () => {
    console.log(`Listening on port number ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying another port...`);
        PORT++;
        app.listen(PORT, () => {
            console.log(`Listening on port number ${PORT}`);
        });
    } else {
        console.error('Server error:', error);
    }
});

