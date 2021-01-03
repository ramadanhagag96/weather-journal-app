// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };
      // making get request
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};
   //making post request 
app.post('/post', callBack);

function callBack(req,res){
     projectData={
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    };
  res.send(projectData);
    
};
