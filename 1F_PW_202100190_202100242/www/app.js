const express = require("express");
const bodyParser = require("body-parser");
const requestHandlers = require("./request-handlers");


const app = express();
app.use(bodyParser.urlencoded());

app.use(express.static("views", { 
    
    "index": "index.html",
    "joboffers": "joboffers.html",
    "team": "team.html"

}));

app.listen(8081, function() {
    console.log("Server running at http://localhost:8081");});