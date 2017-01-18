'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents units orchestration trough database
 */
class Units {
  /**
   * Adds a unit to database
   *
   * @param {Object} unit - unit JSON object
   */
  add(unit){

    return new Promise((resolve, reject) => {
      db.Unit
        .create(unit)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all units from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      db.Unit
        .findAll({include: [{model: db.Page, as: 'Pages'}]})
        .then((res) => {
          console.log(res);

          resolve(res);

        })
        .catch((error) => {
          console.log("errrooor:" + error);
          reject(error);
        });
    });
  }

  /**
   * Get a specif
   * ic unit
   *
   * @param {Integer} id - unit id
   * @returns {Object}
   */
  get(unitId) {
    return new Promise((resolve, reject) => {
      db.Unit
        .findOne({
          where : {
            id : unitId
          },
          include: [{model: db.Page, as: 'Pages'}]
        })
        .then((res) => {
          resolve(res);
          res.getPages().then((res) => {console.log("PAGES============>" + res)});
          console.log(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Removes a unit from database
   *
   * @param {Integer} id - unit id
   */
  remove(unitId) {
    return new Promise((resolve, reject) => {
      db.Unit
        .destroy({
          where : {
            id : unitId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific unit on database
   *
   * @param {Integer} id - unit id
   */
  update(unitId, data) {
    return new Promise((resolve, reject) => {
      db.Unit
        .update(data, {
          where : {
            id : unitId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Units;
