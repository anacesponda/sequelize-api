'use strict';

const Pages = require('./lib/Page');

const pages = new Pages();

/**
 * @swagger
 * definition:
 *   Page:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       number:
 *         type: integer
 *       templateType:
 *         type: string
 *       pageObject:
 *         type: string
 *       comments:
 *         type: string
 */
module.exports = (app) => {
  /**
   * @swagger
   * /v1/pages:
   *   post:
   *     summary: Add a page
   *     description: Add a page as a JSON object
   *     tags:
   *       - Pages
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "Page object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Page"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  app.post('/v1/pages', (req, res) => {
    pages
      .add(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/pages:
   *   get:
   *     summary: List all pages
   *     description: List all pages as an JSON array
   *     tags:
   *       - Pages
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Page"
   */
  app.get('/v1/pages', (req, res) => {
    pages
      .list()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/pages/{id}:
   *   get:
   *     summary: Get a page
   *     description: Get a page
   *     tags:
   *       - Pages
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "page id"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/Page"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.get('/v1/pages/:id', (req, res) => {
    pages
      .get(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/pages/{id}:
   *   delete:
   *     summary: Removes a page
   *     description: Removes a page
   *     tags:
   *       - Pages
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "page id"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.delete('/v1/pages/:id', (req, res) => {
    pages
      .remove(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success : true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/pages/{id}:
   *   patch:
   *     summary: Update a page
   *     description: Update a page
   *     tags:
   *       - Pages
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "page id"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Page object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Page"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.patch('/v1/pages/:id', (req, res) => {
    pages
      .update(req.params.id, req.body)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success : true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};
