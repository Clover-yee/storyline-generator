/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-20 17:08:38
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-07-21 15:50:49
 * @FilePath: \storyline-generator\routes\users.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
