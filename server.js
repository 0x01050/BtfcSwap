const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const transactions = require("./routes/api/transactions")

const db = require("./config/keys").mongoURI
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client/build')))
app.use("/api/transactions", transactions)
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
