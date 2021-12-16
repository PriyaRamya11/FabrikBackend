const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('express-fileupload')
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(upload());
app.use(cors())


app.set('view engine', 'ejs');
app.set('views', 'views');
//  making the upload folder as static
app.use('/upload', express.static(path.join(__dirname, 'uploads')));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, UPDATE, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
    next();
})


//  import all the routes here
const modelRoutes = require('./routes/ModelRoutes');

//  assign all the routes here
app.use(modelRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port : 8000`)
})