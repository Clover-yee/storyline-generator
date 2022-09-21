/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-09-08 15:37:27
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-09-20 14:09:33
 * @FilePath: \storyline-generator\public\js\entity.view.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */


function drawPageEntity(entityDict,entityNLP) {
    var entityStr = ''
    var placeStr = ''
    entityDict.forEach(entity => {
        entityStr += `<div class="entity entity-person-dict">${entity}</div>`
    });
    entityNLP.forEach(entity => {
        switch (entity.entity_group) {
            case 'PER':
                entityStr += `<div class="entity entity-person-nlp">${entity.word}</div>`
                break;
            case 'LOC':
                placeStr += `<div class="entity entity-place-nlp">${entity.word}</div>`
                break;
            default:
                break;c
        }
    });
    $('#person-entity-container').html(entityStr)
    $('#person-place-container').html(placeStr)

}


