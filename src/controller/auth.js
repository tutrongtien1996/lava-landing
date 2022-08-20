const md5 = require('md5');
const {UserModel} = require('../model/user')
const authLayout = __dirname+"/../views/layouts/auth.handlebars";

module.exports = {
    index: function(req, res) {
        return res.render('admin/auth/login.handlebars', {layout: authLayout});
    },

    login: function(req, res) {
        let dataLogin = {
            user_name:req.body.user_name,
            password: req.body.password
        }
        dataLogin.password = md5(dataLogin.password)
        if (dataLogin.user_name && dataLogin.password) {
            UserModel.getOne(dataLogin, (err, results) => {
            console.log(dataLogin)
            if(err) throw (err);
            if(results.length > 0){
                req.session.siggedin = true;
                req.session.user_name = dataLogin.user_name;
                return res.redirect("/admin/companies") 
            }  else {
                return res.redirect("/admin/auth")
            }
                    
        })
        } else {
            return res.redirect("/admin/auth");
        }
        
    }
}