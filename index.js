// Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

// Server Setup
const app = express();
const port = 4004;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://bandranganaffi:naffizero16@cluster0.ehndoio.mongodb.net/eCommerceAPI?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database!"));

// Backend Routes
app.use("/b4/users", userRoutes);
app.use("/b4/products", productRoutes);

// Server Start
if(require.main === module){
    app.listen(port, () => console.log(`Server running at port: ${port}`));
}

module.exports = app;