"use strict";

module.exports = function(sequelize, DataTypes) {
    var Unit = sequelize.define("Unit", {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        number: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Unit.hasMany(models.Page , {as: 'Pages'})
            }
        }
    });

    return Unit;
};