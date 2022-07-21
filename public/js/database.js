/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-21 14:59:27
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-07-21 16:35:46
 * @FilePath: \storyline-generator\public\js\database.js
 * @Description: 数据库接口表
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
/**
 * @description: 添加入数据库
 * @param {*} object
 * @return {*}
 */
function saveObjectIntoDatabase(object) {

    return new Promise((resolve, reject) => {

        axios.post('/post/saveObject', {
            data: object
        }).then((res) => {
            console.log("🚀 ~ file: Database.js ~ line 33 ~ returnnewPromise ~ res", res)

            resolve(res.status)

        })

    })

}

function getObjectFromDatabase() {

    return new Promise((resolve, reject) => {

        //send get request
        axios.get('/get/getObject').then((res) => {

            if (res.data.length > 0) {

                resolve(res)

            }

        })

    })

}
