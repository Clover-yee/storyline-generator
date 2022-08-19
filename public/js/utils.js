/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-07-23 13:15:25
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-07-29 11:35:41
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

/**
 * UTC时间转换
 * @returns {string}
 * @param dateSeprator 日期拼接符
 * @param timeSeprator 时间拼接符
 * @Eexample dateFormat("2021-09-03T22:42:05.659+00:00", "/", ":")
 *           dateFormat("2021-09-03T22:42:05.659+00:00")
 */
function transTimestamp(dateSeprator = '/', timeSeprator = ':') {
    const date = new Date(new Date().getTime()+(parseInt(new Date().getTimezoneOffset()/60) + 8)*3600*1000)
    const year = `${date.getUTCFullYear()}`
    let month = `${date.getUTCMonth() + 1}`
    let day = `${date.getUTCDate()}`
    let hour = `${date.getUTCHours()}`
    let minute = `${date.getUTCMinutes()}`
    let second = `${date.getUTCSeconds()}`

    if (month.length === 1) {
    month = `0${month}`
    }
    if (day.length === 1) {
    day = `0${day}`
    }
    if (day.length === 1) {
    day = `0${day}`
    }
    if (hour.length === 1) {
    hour = `0${hour}`
    }
    if (minute.length === 1) {
    minute = `0${minute}`
    }
    if (second.length === 1) {
    second = `0${second}`
    }
    return `${year}${dateSeprator}${month}${dateSeprator}${day} ${hour}${timeSeprator}${minute}${timeSeprator}${second}`
  }

  function dragFunc(dragDomId,dragoutDomId){
    var Drag = document.getElementById(dragDomId);
    var Dragout=document.getElementById(dragoutDomId);
    Dragout.onmousedown = function(event) {
        var ev = event || window.event;
        event.stopPropagation();
        var disX = ev.clientX - Drag.offsetLeft;
        var disY = ev.clientY - Drag.offsetTop;
        document.onmousemove = function(event) {
            var ev = event || window.event;
            Drag.style.left = ev.clientX - disX + "px";
            Drag.style.top = ev.clientY - disY + "px";
            Drag.style.cursor = "move";
        };
    };
    Dragout.onmouseup = function() {
        document.onmousemove = null;
        Drag.style.cursor = "default";
    };
};