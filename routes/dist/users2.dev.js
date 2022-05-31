"use strict";

var admin = require('firebase-admin');

var functions = require('firebase-functions');

var sys = require('util');

var express = require('express');

var router = express.Router(); // setup firestore

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();
/* Get user list */

router.get('/', function (req, res, next) {
  db.collection('users').get().then(function (snapshot) {
    var users = new Array();
    snapshot.forEach(function (doc) {
      users.push(doc.data());
    });
    res.json(users);
  })["catch"](function (err) {
    next(err);
  });
});
/* Post new user*/

router.post('/', function (req, res, next) {
  var newData = req.body;
  var docRef = db.collection('users').doc(newData.name);
  docRef.set(newData).then(function (ref) {
    console.log('success');
    res.send('success');
  })["catch"](function (error) {
    console.log(error);
    next(error);
  });
});
module.exports = router;