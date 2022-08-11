const express = require('express');
const exphbs = require('express-handlebars');
const {featureData} = require('./data/db.js');
require('dotenv').config();

const app = express();

app.engine('handlebars', exphbs.engine({
    defaultLayout: __dirname+'/views/layouts/main'
}));
app.use(express.static('src/public'))
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    return res.render(__dirname+'/views/pages/home', {features: featureData})
})

app.listen(process.env.PORT, () => {
    console.log("server run at: http://localhost:"+process.env.PORT)
})