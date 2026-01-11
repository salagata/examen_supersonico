require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/",(req,res) => {

})

app.post("/api/v1/exam", (req,res) => {

})

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server listening at http://localhost:${PORT}`)
})