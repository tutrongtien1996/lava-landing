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
        if( isUserLogged(req) ){
            res.render('admin/company/form.handlebars', {layout: adminLayout })
        }else{
            return res.redirect('/admin/auth')
        }
    }

    save(req, res) {
        if( isUserLogged(req) ){
            var result = req.body;
            console.log(result.name)
            if(result && result.name){
                CompanyModel.save(result, function (err)
                {
                    if (err) {
                        alert ('loi nhap du lieu');
                    }
                    return res.redirect("/admin/companies/")
                })
            }
        }else{
            return res.redirect('/admin/auth')
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
        CompanyModel.saveUpdate(id, req.body , function(err){
            if (err) {
                alert ('co loi');
            }
            return res.redirect("/admin/companies/")
        })
    
    }
}

const CompanyController = new CompanyControllerClass();
module.exports = {CompanyController}

