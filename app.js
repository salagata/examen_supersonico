require("dotenv").config();
const express = require("express");

const app = express();
const examRoutes = require("./routers/exam");

app.use(express.static("public"));

app.use("/api/v1/exam",examRoutes)

app.get("/",(req,res) => {

})

const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`Server listening at http://localhost:${PORT}`);
})