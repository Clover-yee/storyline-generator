/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-09-08 15:37:27
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-09-26 20:20:32
 * @FilePath: \storyline-generator\public\js\entity.view.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
var entityStr = ''
var placeStr = ''
var type = 'person'
function drawPageEntity(entityDict,entityNLP) {
    entityStr = ''
    placeStr = ''
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
                break;
        }
    });
    onChangeEntityClick(type)
}

function onChangeEntityClick(typeName) {
    type = typeName;
    switch (type) {
        case 'person':
            $('#personEntity').removeClass('unchosen-person')
            $('#placeEntity').addClass('unchosen-place')
            $('#entity-container').html(entityStr)
            break;
        case 'place':
            $('#personEntity').addClass('unchosen-person')
            $('#placeEntity').removeClass('unchosen-place')
            $('#entity-container').html(placeStr)
            break;
    }
}
