const {mysqlConnection} = require('../common/conect');

class User {
    id
    username
    password

    getOne(dataLogin, callback) {
        var query = `SELECT * FROM users WHERE user_name = '${dataLogin.user_name}' AND password = '${dataLogin.password}'`
        mysqlConnection.query(query, callback)
    }

    save(input, callback) {
        var query = `INSERT INTO users (user_name, password) VALUES ('${input.username}', '${input.password}')`
        mysqlConnection.query(query, callback)
    }
}

const UserModel = new User();
module.exports = { UserModel }