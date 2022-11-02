/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-20 17:08:38
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-10-31 15:35:19
 * @FilePath: \storyline-generator\routes\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
const Fragment = require('../models/Fragment.js')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

let modelDict = {
  'fragment': Fragment,

}


//insert object into databse
router.post("/post/saveObject", function (req, res, next) {

    let data = req.body.data;
    var fragment = new Fragment({
          highlight:data.highlight,
          keywords:data.keywords,
          time: data.time,
          place: data.place,
          person:data.person,
          event:data.event,
          curtime:data.curtime
      })
    fragment.save(function (error, data) {

      console.log(data)
      res.send(data)

  })

})

//get allObject
router.get("/get/getObject", function (req, res, next) {

  modelDict['fragment'].find({}, function (error, data) {

      res.send(data)

  })

});

//get allObject
router.post("/post/findByIdAndUpdateObject", function (req, res, next) {

  let data = req.body.data;
  var id = data._id
  modelDict['fragment'].findByIdAndUpdate(id, data, {new: true}, (error, data) => {
     if(error) {
         console.log(error)
         return
     }
     console.log(data)
     res.send(data)
  })
 
});