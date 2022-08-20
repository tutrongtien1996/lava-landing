const express = require('express');
const { fileUpload } = require('../common/fileupload.js');
const {CompanyController} = require('../controller/company.js')
const CompanyRoute = express.Router();





CompanyRoute.get('/', CompanyController.getList)

CompanyRoute.get('/create', CompanyController.create)
CompanyRoute.post('/save', fileUpload.single('logo'), CompanyController.save)

CompanyRoute.get('/delete/:id', CompanyController.delete)

CompanyRoute.get('/update/:id', CompanyController.update)
CompanyRoute.post('/save-update/:id', fileUpload.single('logo'), CompanyController.saveUpdate)


CompanyRoute.post('/upload-logo/:id', fileUpload.single('logo'), async (req, res) => {
    const file = req.file
    if (file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    req.body.logo = file.path.replace("src/public/", "") ;
    CompanyController.saveUpdate(req, res)
    res.send(file)
})


module.exports = {CompanyRoute}
