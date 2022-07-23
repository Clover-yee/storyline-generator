/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-23 13:15:25
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-07-23 13:15:28
 * @FilePath: \storyline-generator\public\js\utils.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}