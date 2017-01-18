'use strict';

const Units = require('./lib/Unit');

const units = new Units();

/**
 * @swagger
 * definition:
 *   Unit:
 *     type: object
 *     required:
 *       - title
 *       - category
 *       - price
 *     properties:
 *       title:
 *         type: string
 *       category:
 *         type: string
 *       price:
 *         type: integer
 */
module.exports = (app) => {
  /**
   * @swagger
   * /v1/units:
   *   post:
   *     summary: Add a unit
   *     description: Add a unit as a JSON object
   *     tags:
   *       - Units
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "Unit object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Unit"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  app.post('/v1/units', (req, res) => {
    units
      .add(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /v1/units:
   *   get:
   *     summary: List all units
   *     description: List all units as an JSON array
   *     tags:
   *       - Units
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Unit"
   */
  app.get('/v1/units', (req, res) => {
    units
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
   * /v1/units/{id}:
   *   get:
   *     summary: Get a unit
   *     description: Get a unit
   *     tags:
   *       - Units
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "unit id"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/Unit"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.get('/v1/units/:id', (req, res) => {
    units
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
   * /v1/units/{id}:
   *   delete:
   *     summary: Removes a unit
   *     description: Removes a unit
   *     tags:
   *       - Units
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "unit id"
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
  app.delete('/v1/units/:id', (req, res) => {
    units
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
   * /v1/units/{id}:
   *   patch:
   *     summary: Update a unit
   *     description: Update a unit
   *     tags:
   *       - Units
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "unit id"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "Unit object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Unit"
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
  app.patch('/v1/units/:id', (req, res) => {
    units
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
