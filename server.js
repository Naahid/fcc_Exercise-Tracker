const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer  = require('multer')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(cors()); 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
// app.use(express.static('public'))
app.use('/public', express.static(process.cwd() + '/public'))
app.use("/images", express.static(path.join(__dirname, "/images")));

app.get('/', function(req,res){
    res.sendFile(`${__dirname}/views/index.html`)
})


const upload = multer({dest: './images'})
app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
    // const {name, type, size} = req.file
    // console.log(req.body);
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
})


//connect to MongoDB

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

