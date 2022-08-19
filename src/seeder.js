const {UserModel} = require("./model/user.js")
// const bcrypt = require("bcrypt");
var md5 = require('md5');

var listUsers = [
    {username: "admin", password: "abc@1234"},
    {username: "admin1", password: "abc@1234"},
    {username: "admin2", password: "abc@1234"}
]

async function generateUsers() {
    listUsers.forEach(async function (user) {

        user.password = md5(user.password);
        UserModel.save(user, function (err, res) { console.log("Insert successful")})
        // const salt = await bcrypt.genSalt(10);
        // user.password =  await bcrypt.hash(user.password, salt);
        // UserModel.save(user, function (err, res) { console.log("Insert successful")})
    });
    
}

generateUsers();