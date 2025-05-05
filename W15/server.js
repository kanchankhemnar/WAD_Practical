const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname,'public')));


app.get("/products" ,(req,res)=>{
  fs.readFile("./products.json","utf-8",(err,data)=>{
    if(err){
      res.status(500).send("Error fetching data");
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT,()=>{
  console.log("Server running at 5000");
})