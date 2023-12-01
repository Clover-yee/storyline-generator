/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-21 14:15:18
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2023-05-15 22:05:54
 * @FilePath: \storyline-generator\models\Fragment.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FragmentSchema = new Schema({
    
    highlight:Array,
    keywords:Array,
    time:Object,
    place: Object,
    person: Object,
    event: Object,
    curtime:Object

}, {
    minimize: false,
    collection:'fragments-hali'
});

var Fragment = mongoose.model('Fragment', FragmentSchema);


module.exports = Fragment;