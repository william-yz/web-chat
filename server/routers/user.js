'use strict'
const storage = require('../storage')
const User = require('mongoose').model('User')

module.exports = function (app, io) {
  app.route('/backend/login')
      .post((req, res) => {
        User.find(req.body)
            .then(result => {
              console.log(result)
              res.json(result._id)
            })
      })

  app.route('/backend/register')
      .post((req, res) => {
        new User(req.body).save()
          .then(result => {
            console.log(result)
            res.json(result._id)
          })
      })

}
