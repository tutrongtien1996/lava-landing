const {mysqlConnection} = require('../common/conect');
class Company {
    id
    name
    email 
    phone_number 
    address
    created_at
    updated_at

    toSelectedFile() {
        return "id, name, email, phone_number, address, created_at";
    }

    getList(callback) {
        var query = "SELECT "+this.toSelectedFile()+" FROM companies`"
        mysqlConnection.query(query, callback)
    }

    save(result, callback){
        var query = `INSERT INTO companies (name, address, phone_number, email) VALUES ('${result.name}', '${result.address}', '${result.phone_number}', '${result.email}')`
        mysqlConnection.query(query, callback)
    }

    delete(id, callback){
        var query = "DELETE FROM companies WHERE id = " + id;
        mysqlConnection.query(query, callback)
    }

    update(id, callback){
       
        var query = `SELECT * FROM companies WHERE id = ${id} LIMIT 1`;
        mysqlConnection.query(query, callback)
    }
    
    saveUpdate(id, result, callback){
        var query = ` UPDATE  companies SET name = '${result.name}', email = '${result.address}', phone_number = '${result.phone_number}', address = '${result.email}' WHERE id = ${id}`;
        mysqlConnection.query(query, callback)
    }

}

const CompanyModel = new Company();
module.exports = { CompanyModel }