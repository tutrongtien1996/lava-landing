const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const {featureData} = require('./data/db.js');
require('dotenv').config();

const {CompanyRoute} = require('./routes/company.js');
const {AuthRoute} = require('./routes/auth.js');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 600000000, expires: new Date(Date.now() + (30 * 86400 * 1000)) },
    maxAge: Date.now() + (30 * 86400 * 1000),
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    resave: false,
    rolling: false,
    saveUninitialized: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', exphbs.engine({
    defaultLayout: __dirname+'/views/layouts/main'
}));


app.use(express.static('src/public'))
app.set('view engine', 'handlebars');
app.set('views',__dirname + '/views/pages');

app.get('/', (req, res) => {
    return res.render('home.handlebars', {features: featureData})
})

app.listen(process.env.PORT, () => {
    console.log("server run at: http://localhost:"+process.env.PORT)
})


app.use('/admin/companies', CompanyRoute);
app.use('/admin/auth', AuthRoute);