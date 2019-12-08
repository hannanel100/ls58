const dataModel = require('./dataModel');
function cityModel(args) {
    dataModel.call(this, args.createdDate, args.updatedDate);
    this.ID = args.ID;
    this.Name = args.Name;
    this.CountryCode = args.CountryCode;
    this.CountryCodeModel = args.CountryCodeModel;
    this.District = args.District;
    this.Population = args.Population;
}
cityModel.prototype = Object.create(dataModel.prototype);
cityModel.prototype[Symbol.iterator] = function* () {
    for (let prop in this) {
        if (prop.indexOf('sys') !== 0) {
            yield this[prop];
        }
    }
}
module.exports = cityModel;