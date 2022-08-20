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
        return "id, name, logo, email, phone_number, address, created_at";
    }

    getList(callback) {
        var query = "SELECT "+this.toSelectedFile()+" FROM companies`"
        mysqlConnection.query(query, callback)
    }

    save(input, callback){
        var query = "";
        var valueInput = "";
        for (const field in input) {
            if (query !== "") {
                query += " ,"
                valueInput += " ,"
            }
            query += `${field}`;
            valueInput = valueInput + `'${input[field]}'`
        }
        query = `INSERT INTO companies (${query}) VALUES (${valueInput})`
        console.log(query);
        // var query = `INSERT INTO companies (name, address, phone_number, email) VALUES ('${result.name}', '${result.address}', '${result.phone_number}', '${result.email}')`
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
    
    saveUpdate(id, input, callback){
        var query = "";
        for (const field in input) {
            if (query !== "") {
                query += " ,"
            }
            query +=` ${field}='${input[field]}'`
        }
        query = `UPDATE  companies SET ${query} WHERE id = ${id}`
        mysqlConnection.query(query, callback)
    }

}

const CompanyModel = new Company();
module.exports = { CompanyModel }