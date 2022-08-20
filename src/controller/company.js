const adminLayout = __dirname+"/../views/layouts/admin.handlebars";
const {CompanyModel} = require("../model/company")
const {isUserLogged} = require("../common/auth")

class CompanyControllerClass {
    getList(req, res) {
        if( isUserLogged(req) ){
            CompanyModel.getList(function (err, results) {
                if (err) {
                    results = [];
                }
                return res.render('admin/company/index.handlebars', {layout: adminLayout, companies: results, username: "Danh"})
            })
        }else{
            return res.redirect('/admin/auth')
        }
    } 

    create(req, res) {
       
            res.render('admin/company/form.handlebars', {layout: adminLayout })
        }
    

    save(req, res) {
        
            var input = req.body;
            const file = req.file
            if (file) {
                input.logo = file.path.replace("src/public/", "");
            }
            console.log(input)
            if(input && input.name){
                CompanyModel.save(input, function (err)
                {
                    if (err) {
                        console.log(input)
                    }
                    return res.redirect("/admin/companies/")
                })
            }
        }
       
     

    delete(req, res) {
        const {id} = req.params;
        CompanyModel.delete(id, function (err){
            if(err){
                return res.send('xoa khong thanh cong')
            }
            return res.redirect("/admin/companies/")
        })
    }

    update(req, res){
        const {id} = req.params;
        CompanyModel.update(id, function (err, results){
            if(err){
                results = []
            }
            if(results.length > 0){
                return res.render('admin/company/form.handlebars', {layout: adminLayout, item: results[0] });
            }
            return res.redirect("/admin/companies/")
        })

    }


    saveUpdate (req, res){
        const {id} = req.params;
        const file = req.file
        var input = req.body
        if (file) {
            input.logo = file.path.replace("src/public/", "");
        }
        CompanyModel.saveUpdate(id, input , function(err){
            if (err) {
                console.log(err)
            }
            return res.redirect("/admin/companies/")
        })
    
    }
}

const CompanyController = new CompanyControllerClass();
module.exports = {CompanyController}

