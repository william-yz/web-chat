'use strict'
const bodyParser = require('body-parser')
const glob = require('glob')
const path = require('path')
const restify = require('express-restify-mongoose')
const mongoose = require('mongoose')
const express = require('express')


function initMiddleware(app) {
  app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Headers', 'Content-Type')

      next()
  });

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json({
    limit: 1024 * 1024 * 5
  }))

}

function initRouters(app) {
  glob.sync('routers/**/*.js').forEach(file => {
    require(path.resolve(path.join(file)))(app)
  })
}

function initModels(app) {
  glob.sync('models/**/*.js').forEach(file => {
    require(path.resolve(path.join(file)))
  })
}

function initRestifyMongoose(app) {
  var router = express.Router()
  restify.serve(router,mongoose.model('User'))
  app.use(router)
}

function connectMongodb(cb) {
  mongoose.connect('146.222.81.162:27017/chat', {}, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required

      // Call callback FN
      if (cb) cb(db);
    }
  });
}
function init(app, io) {
  connectMongodb()
  initMiddleware(app)
  initModels(app)
  initRestifyMongoose(app)
  initRouters(app, io)
}

module.exports = {
  initMiddleware,
  initRouters,
  init
}
