const { Router } = require('express');

const { query } = require('express');
const express = require('express');
const multer = require('multer');


const {CompanyController} = require('../controller/company.js')

const CompanyRoute = express.Router();





CompanyRoute.get('/', CompanyController.getList)

CompanyRoute.get('/create', CompanyController.create)
CompanyRoute.post('/save', CompanyController.save)

CompanyRoute.get('/delete/:id', CompanyController.delete)

CompanyRoute.get('/update/:id', CompanyController.update)
CompanyRoute.post('/save-update/:id', CompanyController.saveUpdate)

CompanyRoute.post()


module.exports = {CompanyRoute}
