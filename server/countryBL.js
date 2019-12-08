const countryModel = require('../models/countryModel');
const dalFunc = require('./dal');
const fetch = require('node-fetch');
const dal = dalFunc();
const TABLE_NAME = 'country';

function getOneCountry(Code, callback) {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE Code  LIKE '${Code}'`;
    dal.readOne(query, (e, country) => {
        if (e) {
            callback(e);
        } else {
            country = country.map(c => new countryModel(c));
            console.log(country[0]);
            callback(null, country[0]);
        }
    })
}

function getAllCountrys(callback) {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    dal.readAll(query, (e, allCountrys) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allCountrys);
        }
    })
}



module.exports.getOneCountry = getOneCountry;
module.exports.getAllCountrys = getAllCountrys;