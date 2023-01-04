const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()

app.use(cors()); 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', function(req,res){
    res.sendFile(`${__dirname}/views/index.html`)
})

//connect to MongoDB

app.use('/api', require('./routes/users'))

const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', false);
main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(uri)
}
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const port = process.env.PORT || 5000
app.listen(port, function() {
    console.log(`Express app listening on port :${port}`);
})

