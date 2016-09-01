'use strict'
const uuid = require('node-uuid')
const storage = require('../storage')

module.exports = function (app, io) {
  app.route('/api/login')
      .post((req, res) => {
        const user = storage.findUser(req.body)
        res.json({
          success: true,
          response: user[0].id
        })
      })

  app.route('/api/register')
      .post((req, res) => {
        const id = uuid.v1()
        req.body.id = id
        storage.saveUser(req.body)
        res.json({
          success: true,
          response: id
        })
      })

}
