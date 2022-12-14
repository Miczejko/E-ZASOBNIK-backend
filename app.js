//mongodb+srv://admin:<password>@cluster0.oycco0o.mongodb.net/?retryWrites=true&w=majority

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

// create out express app
const app = express()

// Handle CORS + middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// database stuff
const uri = "mongodb+srv://admin:g3TjsBcCs5lRd2cv@cluster0.oycco0o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected")
})
.catch(err => console.log(err))

app.use(bodyParser.json())

// routes
app.get("/", (req, res) => {
  res.send("yay home page")
})

const PalletsRoute = require('./routes/pallets');
  app.use('/pallets', PalletsRoute)

const ItemsRoute = require('./routes/items');
  app.use('/items', ItemsRoute)

  const UserRoute = require('./routes/user');
  app.use('/user', UserRoute)

// start server
app.listen(3000, () => {
  console.log("Listening at port 3000")
})