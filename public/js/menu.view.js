/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-09-11 15:41:54
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-09-16 16:40:51
 * @FilePath: \storyline-generator\public\js\menu.view.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
function drawMenuMap(menuArray) {
    initMenu(menuArray)
    // var menuContentDomHeight = $('#menu-content').height(),menuContentDomWidth = $('#menu-content').width();
    
    // var lineArray = new Array()
    // var yIterators = 0
    // menuArray.forEach(item => {
    //     lineArray.push({x:20*item.sessionNum,y:yIterators,num:item.sessionNum})
    //     yIterators+=40
    // });

    // console.log(lineArray,'lineArray');
    // console.log(menuContentDomHeight,'menuContentDomHeight');
    // console.log(menuContentDomWidth,'menuContentDomWidth');

    // setTimeout(() => {        
    //     var menuContentSvg = d3
    //         .select('#menu-map')
    //         .attr('id','menu-map-svg')
    //         .append('svg')
    //         .attr('x',0)        
    //         .attr("y", 0)
    //         .attr("width", menuContentDomWidth)
    //         .attr("height", menuContentDomHeight);
    //     var x=80,y=15
    //     var menuContentG = menuContentSvg.append("g").attr('transform',`translate(${x},${y})`).attr('id','menu-map-g')
    //     document.getElementById('menu-map-svg').addEventListener('mousewheel',(e)=>{
    //         let oldY = y
    //         if( y -  e.deltaY * 0.1 <= 15){
    //             y -= e.deltaY * 0.1
    //             $('.menu-content').scrollTop(-y+15)
    //             while (oldY !== y) {
    //                 menuContentG.attr('transform',`translate(${x},${oldY})`)
    //                 oldY -= e.deltaY * 0.01
    //             }
    //         }
    //     })

    //     console.log(menuContentSvg,menuContentG);
    
    //     var Gen = d3.line()
    //                 .x((p) => p.x)
    //                 .y((p) => p.y)
    //                 .curve(d3.curveCardinal);
    //     menuContentG.append("path")
    //         .attr("id", 'menuContent')
    //         .attr("d", Gen(lineArray))
    //         .attr("fill", "none")
    //         .attr("stroke", '#5470c6')
    //         .attr("stroke-width", "2px")
    //         .attr("stroke-opacity", 1)
    //         .attr("opacity", 0.8);

    //     menuContentG.selectAll('circle')
    //         .data(lineArray)
    //         .enter()
    //         .append('circle')
    //         .attr("cx",p => p.x)
    //         .attr("cy",p => p.y)
    //         .attr("r","3px")
    //         .attr("fill","#fff")
    //         .attr("stroke", '#5470c6')
    //         .attr("stroke-width", "1px");


    //     menuContentG.selectAll('text')
    //         .data(lineArray)
    //         .enter()
    //         .append("text")
    //         .attr("x", p => p.x + 10)
    //         .attr("y", p => p.y)
    //         .style('font-weight', 1)
    //         .style('font-family', 'Arial')
    //         .style('font-size', '10px')
    //         .style('fill', "black")
    //         .text(p => p.num);
    
    // }, 200);


}

function initMenu(menuArray) {
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
        $('.menu-content').on('mousewheel',(e)=>{
            console.log($('.menu-content').scrollTop()+15);
            d3.select('#menu-map-g').attr('transform',`translate(80,${-$('.menu-content').scrollTop()+15})`)
        })
        // document.getElementById('menu-content').addEventListener('mousewheel')
    }
    $('#float-panel-menu').addClass('float-panel-menu-active')
    $('.content-item').first().addClass('content-item-active')
}