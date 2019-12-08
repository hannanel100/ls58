const cityModel = require('../models/cityModel');
const countryBL = require('./countryBL');
const dalFunc = require('./dal');
const fetch = require('node-fetch');
const dal = dalFunc();
const TABLE_NAME = 'city';

function getOneCity(cityId, lazyLoad, callback) {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE ID  LIKE ${cityId}`;
    dal.readOne(query, (e, city) => {
        if (e) {
            callback(e);
        } else {
            city = city.map(c => new cityModel(c));
            if (lazyLoad === true) {
                countryBL.getOneCountry(city[0].CountryCode, (e, data) => {
                    if (e) {
                        callback(e)
                    }
                    else {
                        city[0].CountryCodeModel = data;
                        callback(null, city[0]);
                    }
                })

            }
            else {
                console.log(city[0]);
                callback(null, city[0]);
            }
        }
    })
}

function getAllCity(lazyLoad, callback) {
    const query = `SELECT * FROM ${TABLE_NAME}`;
    dal.readAll(query, (e, allCitys) => {
        if (e) {
            callback(e);
        } else {
            allCitys = allCitys.map(c => new cityModel(c));
            if (lazyLoad === true) {
                countryBL.getAllCountrys((e, data) => {
                    if (e) {
                        callback(e)
                    }
                    else {
                        for (let index = 0; index < allCitys.length; index++) {
                            allCitys[index].CountryCodeModel = data[index];

                        }
                        callback(null, allCitys);
                    }
                })

            }
            else {
                callback(null, allCitys);
            }

        }
    })
}
function deleteOneCity(cityId, callback) {
    const query = `DELETE FROM ${TABLE_NAME} WHERE ID LIKE ${cityId} `
    dal.deleteOne(query, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}
function createCity(city, callback) {
    const query = `INSERT INTO ${TABLE_NAME} (ID, Name, CountryCode, District, Population)
     VALUES ${city.ID}, '${city.Name}', '${city.CountryCode}', '${city.District}', ${city.Population}`
    dal.addOne(query, (e, data) => {
        if (e) {
            callback(e)
        }
        else {
            city.sysCreatedDate = city.sysUpdatedDate = new Date;
            callback(null, data);
        }
    })
}



module.exports.getOneCity = getOneCity;
module.exports.getAllCity = getAllCity;
module.exports.deleteOneCity = deleteOneCity;
module.exports.createCity = createCity;

