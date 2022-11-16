/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-08-09 15:00:43
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-11-02 14:23:12
 * @FilePath: \storyline-generator\public\js\session.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */

function Session(time=null,person=null,event=null,place=null,curtime=null){
    this.time = {value:'to be determined',stroke:{pageNum:0,points:[]}}
    this.person = {value:'',entities:[]}
    this.event = {value:'',stroke:{pageNum:0,points:[]}}
    this.place = {value:'to be determined',stroke:{pageNum:0,points:[]}}
    this.curtime = curtime
    this.highlight = []
    this.keywords = []
}

