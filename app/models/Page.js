"use strict";

module.exports = function(sequelize, DataTypes) {
    var Page = sequelize.define("Page", {
        title: DataTypes.STRING,
        number: DataTypes.INTEGER,
        templateType: DataTypes.STRING,
        pageObject: DataTypes.TEXT,
        comments: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Page.belongsTo(models.Unit, {
                    onDelete: "CASCADE",
                    foreignKey: 'UnitId'
                });
            }
        }
    });

    return Page;
};