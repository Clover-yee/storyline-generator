/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-08-09 15:00:43
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-10-26 13:42:31
 * @FilePath: \storyline-generator\public\js\session.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */

function Session(time=null,person=null,event=null,place=null,start=null,end=null,curtime=null){
    this.time = {value:'',stroke:{pageNum:0,points:[]}}
    this.person = {value:'',entities:[]}
    this.event = {value:'',stroke:{pageNum:0,points:[]}}
    this.place = {value:'',stroke:{pageNum:0,points:[]}}
    this.curtime = curtime
}

