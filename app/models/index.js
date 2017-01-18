"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
const appRoot   = require('app-root-path');
const config = require(`${appRoot}/lib/config`)();

const sequelize = new Sequelize(config.db);


var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

console.log(db);

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        console.log('SE ASOCIA :  ' + modelName  + db)
        db[modelName].associate(db);
        console.log("MODELO" + db[modelName]);
    }
});

// db['Page'].belongsTo(db['Unit']);
// db['Unit'].hasMany(db['Page'], {as: 'Pages'})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
