/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-09-11 15:41:54
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-09-11 15:43:20
 * @FilePath: \storyline-generator\public\js\menu.view.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
function drawMenuMap(menuArray) {
    var menuMapDom = document.getElementById('relationship-view-map');
    for (const menuItem of menuArray) {
        var contentItem = document.createElement("div")
        contentItem.classList.add('content-item')
        var itemTitle = document.createElement("span")
        itemTitle.innerHTML = menuItem.title
        itemTitle.classList.add('item-title')
        var itemPage = document.createElement("span")
        itemPage.innerHTML = menuItem.pagenum
        itemPage.classList.add('item-page')
        contentItem.appendChild(itemTitle)
        contentItem.appendChild(itemPage)
        contentItem.addEventListener('click',function(){
            page = menuItem.pagenum - 1
            jumpPage(page)
            $('.menu-content').children().each(function(){
                $(this).removeClass('content-item-active')
            });
            $(this).addClass('content-item-active')
        })
        $('.menu-content').append(contentItem)
    }
    $('#float-panel-menu').addClass('float-panel-menu-active')
    $('.content-item').first().addClass('content-item-active')
}