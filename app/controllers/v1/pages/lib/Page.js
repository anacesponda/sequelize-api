'use strict';


const appRoot = require('app-root-path');
const db = require(`${appRoot}/app/models`);
const Promise = require('bluebird');


const Sequelize = require('sequelize');
const config = require(`${appRoot}/lib/config`)();
const sequelize = new Sequelize(config.db);
const Page = sequelize.import(`${appRoot}/app/models/Page`);
const Unit = sequelize.import(`${appRoot}/app/models/Unit`);
/**
 * Class that represents pages orchestration trough database
 */
class Pages {
    /**
     * Adds a page to database
     *
     * @param {Object} page - page JSON object
     */

    add(page){

    return new Promise((resolve, reject) => {
            db.Page
            .create({
                title: page.title,
                UnitId: page.UnitId,
                number: page.number,
                comments: page.comments,
                templateType: page.templateType,
                pageObject: page.pageObject
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
     * List all pages from database
     *
     * @returns {Array}
     */
    list() {
        return new Promise((resolve, reject) => {
                db.Page
                .findAll()
                .then((res) => {
                resolve(res);
    })
    .
        catch((error) => {
            reject(error);
    })
        ;
    })
        ;
    }

    /**
     * Get a specific page
     *
     * @param {Integer} id - page id
     * @returns {Object}
     */
    get(pageId) {
        return new Promise((resolve, reject) => {
                db.Page
                .findOne({
                    where: {
                        id: pageId
                    }
                })
                .then((res) => {
                resolve(res);
    })
    .
        catch((error) => {
            reject(error);
    })
        ;
    })
        ;
    }

    /**
     * Removes a page from database
     *
     * @param {Integer} id - page id
     */
    remove(pageId) {
        return new Promise((resolve, reject) => {
                db.Page
                .destroy({
                    where: {
                        id: pageId
                    }
                })
                .then((res) => {
                resolve(res);
    })
    .
        catch((error) => {
            reject(error);
    })
        ;
    })
        ;
    }

    /**
     * Update a specific page on database
     *
     * @param {Integer} id - page id
     */
    update(pageId, data) {
        return new Promise((resolve, reject) => {
                db.Page
                .update(data, {
                    where: {
                        id: pageId
                    }
                })
                .then((res) => {
                resolve(res);
    })
    .
        catch((error) => {
            reject(error);
    })
        ;
    })
        ;
    }
}

module.exports = Pages;
