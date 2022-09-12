/*
 * @Author: Clover 304363641@qq.com
 * @Date: 2022-09-08 15:37:27
 * @LastEditors: Clover 304363641@qq.com
 * @LastEditTime: 2022-09-11 16:28:35
 * @FilePath: \storyline-generator\public\js\relationship.view.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Clover 304363641@qq.com, All Rights Reserved. 
 */
function drawRelationshipMap(params) {
    var chartDom = document.getElementById('relationship-view-map');
    var myChart = echarts.init(chartDom);
    var option;
    
    myChart.showLoading();
    $.getJSON('les-miserables.json', function (graph) {
      myChart.hideLoading();
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30
        };
      });
      option = {
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    });
}


