const mysql = require('mysql');
const _connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'world'
});


function readOne(query, callback) {
    _connection.query(query, function (error, results, fields) {
        if (error) {
            callback("query error" + error, null)
        }
        else {

            callback(null, results);
        }
    });

}
function readAll(query, callback) {
   
    _connection.query(query, function (error, results, fields) {

        if (error) {
            console.log('query error')
            callback("query error" + error)
        }
        else {

            callback(null, results);
        }
    });

}
function deleteOne(query, callback){
    _connection.query(query, function (error, results, fields) {
        if (error) {
            callback("query error" + error, null)
        }
        else {
            callback(null, results);
        }
    });
}
function addOne(query, callback){
    _connection.query(query, function (error, results, fields) {
        if (error) {
            callback("query error" + error, null)
        }
        else {
            callback(null, results);
        }
    });
}
const dalModule = () => {
    return {
        readOne: readOne,
        readAll: readAll,
        deleteOne: deleteOne,
        addOne: addOne
    }
}
module.exports = dalModule;