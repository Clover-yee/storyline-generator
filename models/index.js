/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-21 13:16:26
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-07-21 13:27:38
 * @FilePath: \storyline-generater\models\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const database = 'Generator'

mongoose.connect(`mongodb://localhost:27017/${database}`).then((res) => {

    console.log(`Connected to database ${database} successfully !`)

}).catch((err) => {
    console.log('Connecttion to mongodb failed')
    console.log(err);
})