

//辅助函数
{
    function dragFunc(id, id2, scale, SvgTransformK) {
        var Drag = document.getElementById(id);
        var Dragout = document.getElementById(id);
        var Drag_line = document.getElementById(id2);
        var Dragout_line = document.getElementById(id2);
        Dragout.onmousedown = function (event) {
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX - Drag.offsetLeft;
            var disY = ev.clientY - Drag.offsetTop;
            document.onmousemove = function (event) {
                var ev = event || window.event;
                Y_border1 = 200;
                Y_border2 = 400;
                if(height == 380){
                    Y_border1 = 470;
                    Y_border2 = 670;
                    var DIS = 170;
                }
                var X = ev.clientX - disX;
                var Y = ev.clientY - disY;
                Drag_x = Math.max(Math.max(0, X), 1000);
                Drag_y = Math.max(Math.max(Y_border1, Y), 400);
                var X = ev.clientX - disX;
                var Y = ev.clientY - disY;
                Drag_x = Math.min(Math.max(0, X), 1000);
                Drag_y = Math.min(Math.max(Y_border1, Y), Y_border2);
                Drag.style.left = Drag_x + "px";
                Drag.style.top = Drag_y + "px";
                Drag_line.attributes.x1.value = Drag_x + 40 + "px";
                Drag_line.attributes.y1.value = Drag_y - 220 - DIS + "px";
                // console.log(
                //     Drag_line.attributes.x1.value,
                //     Drag_line.attributes.y1.value
                // );
            };
        };
        Dragout.onmouseup = function () {
            document.onmousemove = null;
            Drag.style.cursor = "default";
        };
    }
    function deletewordcloud(click_flag) {
        for (i = 0; i < click_flag.length; i++) {
            if (click_flag[i] == 1) {
                d3.select("#WordCloud" + this.id).remove();
                d3.select("#line" + this.id).remove();
                click_flag[click_key] = 0;
            }
        }
    }
    //随机函数
    function randomNum(maxNum, minNum, decimalNum) {
        var max = 0, min = 0;
        minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * (max + 1));
                break;
            case 2:
                return Math.floor(Math.random() * (max - min + 1) + min);
                break;
            case 3:
                return (Math.random() * (max - min) + min).toFixed(decimalNum);
                break;
            default:
                return Math.random();
                break;
        }
    }
    function mem_rank(x, y) {
        return x[0] - y[0];
    }
    //排序函数
    function data1rank(x, y) {
        if (x[1] == y[1]) {
            return x[2] - y[2];
        }
        else {
            return x[1] - y[1];
        }
    }
    function inrank(x, y) {
        if (x[2] == y[2]) {
            if (x[0] == y[0]) {
                return x[3] - y[3]
            }
            else {
                return x[0] - y[0];
            }
        }
        else {
            return x[2] - y[2];
        }
    }

    function rankr(x, y) {
        return x[1] - y[1];
    }
    // function m_rank(x, y) {
    //     if (x[4] == y[4]) {
    //         if (x[7] == y[7]) {
    //             return x[5] - y[5];
    //         }
    //         else {
    //             return x[7] - y[7];
    //         }
    //     }
    //     else {
    //         return x[4] - y[4];
    //     }
    // }
    function m_rank(x, y) {
        if (x[4] == y[4]) {
            var x_sum = 0;
            var y_sum = 0;
            var x_split = x[2].split('');
            var y_split = y[2].split('');
            if (x[2] == y[2]) {
                return x[5] - y[5];
            }
            else {
                if (x_split[0] == y_split[0]) {
                    for (i = 1; i < x_split.length; i++) {
                        x_sum = 10 * x_sum + parseInt(x_split[i]);
                    }
                    for (i = 1; i < y_split.length; i++) {
                        y_sum = 10 * y_sum + parseInt(y_split[i]);
                    }
                    return x_sum - y_sum;
                }
                else {
                    return x_split[0] > y_split[0];
                }
            }
        } else {
            return x[4] - y[4];
        }
    }
    function ascend(x, y) {
        if (x[2] == y[2]) {
            return x[0] - y[0];
        }
        else {
            return x[2] - y[2];
        }
    }


    function straight(x, y, i, j) {
        k = 0;
        x_key1 = 0;
        y_key1 = 0;
        x_key2 = 0;
        y_key2 = 0;
        for (a = 1; a < x.length; a++) {
            if (x[a][0] != x[a - 1][0]) {
                k++;
                if (k == i) {
                    x_key1 = a - 1;
                    x_key2 = x_key1 + 1;
                }
            }
        }
        k = 0;
        for (a = 1; a < y.length; a++) {
            if (y[a][0] != y[a - 1][0]) {
                k++;
                if (k == i) {
                    y_key1 = a - 1;
                    y_key2 = y_key1 + 1;
                }
            }
        }
        sum = 0;
        s = new Array();
        for (a = x_key1; a < x_key2; a++) {
            for (b = y_key1; b < y_key2; b++) {
                if (x[a][1] == y[b][1]) {
                    sum++;
                    s.push([a, b]);
                }
            }
        }
        return sum, s;
    }
    function line_array_rank2(x, y) {
        if (x[3] == y[3]) {
            return x[1] - y[1];
        }
        else {
            return x[3] - y[3];
        }
    }
    function Maxn(a, b, c) {
        var re = a;
        if (re = a) {
            re = b;
        }
        if (c > re) {
            re = c;
        }
        return re;
    }
    function sessionListSLInit(x, y) {
        x1 = x[1];
        x2 = y[1];
        y1 = x[2];
        y2 = y[2];
        if (x1 == x2) {
            return (x1 + y1) - (x2 + y2);
        }
        else {
            return x1 - x2;
        }
    }
}
/*data struct
    0:event id
    1:start time
    2:last time
    3:person
    4:place
    5:event
    6:time
    7:_id
*/

//故事线全局参数
/*小地图偏移量
-(SvgTransformK * transformx)
*/
var SvgTransformK = 4;
var transformx = 0;
var recommandY = -50;
var xScaleOldTransformK = 4;
var width = 1048; // 画布的宽度
var height =  380; // 画布的高度
var minMapWidth = 1066;
var minMapHeight = 90;
var liucunkongbai = 100;
var rightBoundary = width / SvgTransformK;
var leftBoundary = 0;
var scale = 1;
//初始化边框的左右边界
var startLeftLineX = 100;
var startRightLineX = 400;
var leftLineX = startLeftLineX;
var rightLineX = startRightLineX;
//缩略图边框样式数值
var topLineHeight = 10;
var dragRectWidth = 3;
var dragRectHeight = 26;
//故事线最上以及最下边的坐标
var topY = 40;
var bottomY = 80;
//故事线最左及最右边的坐标
var leftX = 0;
var rightX = 600;
var rectHeight = bottomY - topY;
var minDistance = width / (height / rectHeight);
var lineWidth = 3;
var xScaleCircleNum = 2;


//定义全局变量
var sessionListSL1 = new Array();
var sessionListSL1_flag = 0;
var sessionListSL1_flag1 = 0

var membercolor = new Array();
var color = [
    d3.rgb("#e53935"),
    d3.rgb("#ef6cd0"),
    d3.rgb("#cdca33"),
    d3.rgb("#388e3c"),
    d3.rgb("#0097a7"),
    d3.rgb("#1565c0"),
    d3.rgb("#673ab7"),
    d3.rgb("#d81b60"),
    d3.rgb("#a1887f"),
    d3.rgb("#757575"),
];
var legend_click = new Array();



function drawStoryLine(sessionListSL,menuArray) {
    var storylineView = document.getElementById('storyline-view')
    // var width = storylineView.offsetWidth; // 画布的宽度
    // var height = storylineView.offsetHeight; // 画布*的高度
    storylineView.innerText = ''
    var scale = 1; // 缩放
    var color1 = ["red", "blue", "pink", "green"];
    var FramColor = "#DFE6F3"
    var mouseOverColor = "#c1d1f7"
    var dragRectColor = "#adb9d2"   
    var backgroundColor = "#f2f2f2"
    
    var mainSvg = d3.select("#storyline-view")
        .attr("id", "storyline-view")
        .append("svg")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", 0);

    var Svg = d3 // 选择文档中的body 元素
        .select("#storyline-view")
        .append("svg") //添加一个SVG元素
        .attr("id", "Svg")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width) //设定宽度
        .attr("height", height) //设定高度
    var minMapSvg = d3
        .select("#storyline-view")
        .append("svg")
        .attr("id", "minMapSvg")
        .attr("x", 0)
        .attr("y", height)
        .attr("width", minMapWidth)
        .attr("height", minMapHeight)
    var minMapG = minMapSvg.append("g").attr("transform", `translate(0, -28)`)
    var storyLineG = Svg.append("g");

    // var svg = d3.select("#storyline-view") // 选择文档中的body 元素
    //     .append("svg") //添加一个SVG元素
    //     .attr("width", width) //设定宽度
    //     .attr("height", height) //设定高度
    //     .attr("transform",`scale(${scale}) translate(300, 120)`);  //TODO


    //记录故事线偏移位置,缩放比例
    var transformk = 0;
    var transformy = 0;
    //old start
    var dataresult1 = new Array();//处理的最终结果
    var dataresult = new Array();
    var max = 0
    var memberfix = new Array();
    var peopledistance = 2;
    var eventdistance = 5;
    var membering = new Array();
    var member_c = new Array();
    var mem_end = new Array();
    var place_array = new Array();
    var time_array = new Array();
    //处理数据
    sessionListSL.sort(sessionListSLInit);
    var Rank = new Array();
    if(sessionListSL1_flag == 0){
        for (i = 0; i < sessionListSL.length; i++) {
            x1 = parseInt(sessionListSL[i][1]);
            x2 = parseInt(sessionListSL[i][2]);
            // data1.push([data[i].event, x1, x2, data[i].members]);
            if (parseInt(sessionListSL[i][1]) + parseInt(sessionListSL[i][2]) > max) {
                max = parseInt(sessionListSL[i][1]) + parseInt(sessionListSL[i][2])
            }
            var members = sessionListSL[i][3].split(',');
            for (k = 0; k < members.length; k++) {
                //console.log(members[i]);
                flag = 0;
                for (j = 0; j < membercolor.length; j++) {
                    if (membercolor[j] == members[k]) {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    membercolor.push(members[k]);
                    Rank.push([members[k], Rank.length, Rank.length]);
                    memberfix.push([members[k], 0, 0]);
                    membering.push([members[k], 0]);
                    member_c.push([members[k], 0, 0]);
                    mem_end.push([members[k], 5 * (x1 + 1), (x2 + x1 + 1) * 5]);
                }
                for (m = 0; m < mem_end.length; m++) {
                    if (mem_end[m][0] == members[k]) {
                        if ((x2 + x1 + 1) * 5 > mem_end[m][2]) {
                            mem_end[m][2] = (x2 + x1 + 1) * 5;
                        }
                    }
                }
            }
        }
    }
    else{
        for (i = 0; i < sessionListSL.length; i++) {
            x1 = parseInt(sessionListSL[i][1]);
            x2 = parseInt(sessionListSL[i][2]);
            // data1.push([data[i].event, x1, x2, data[i].members]);
            if (parseInt(sessionListSL[i][1]) + parseInt(sessionListSL[i][2]) > max) {
                max = parseInt(sessionListSL[i][1]) + parseInt(sessionListSL[i][2])
            }
            var members = sessionListSL[i][3].split(',');
            for (k = 0; k < members.length; k++) {
                //console.log(members[i]);
                flag = 0;
                for (j = 0; j < membering.length; j++) {
                    if (membering[j][0] == members[k]) {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    Rank.push([members[k], Rank.length, Rank.length]);
                    memberfix.push([members[k], 0, 0]);
                    membering.push([members[k], 0]);
                    member_c.push([members[k], 0, 0]);
                    mem_end.push([members[k], 5 * (x1 + 1), (x2 + x1 + 1) * 5]);
                }
                for (m = 0; m < mem_end.length; m++) {
                    if (mem_end[m][0] == members[k]) {
                        if ((x2 + x1 + 1) * 5 > mem_end[m][2]) {
                            mem_end[m][2] = (x2 + x1 + 1) * 5;
                        }
                    }
                }
            }
        }
    }
    
    //生成处理后的数据
    for (i = 0; i <= max; i++) {
        dataresult1.push([]);
    }
    sessionListSL.sort(data1rank);
    if(sessionListSL1_flag == 0){
        for(i = 0;i < sessionListSL.length;i++){
            sessionListSL1[i] = sessionListSL[i];
        }
        sessionListSL1_flag = 1;
    }
    
    console.log(sessionListSL1, "sessionListSL1");
    console.log(sessionListSL, "sessionListSL");
    for (i = 0; i < sessionListSL.length; i++) {
        for (j = sessionListSL[i][1]; j <= sessionListSL[i][1] + sessionListSL[i][2]; j++) {
            var object = {};
            object.event = sessionListSL[i][0];
            object.name = sessionListSL[i][3];
            object.place = sessionListSL[i][4];
            object.time = sessionListSL[i][6];
            //生出时间数组
            var time_flag = 0;
            for(k=0;k<time_array.length;k++){
                if(time_array[k] == object.time){
                    time_flag = 1;
                }
            }
            if(time_flag == 0){
                time_array.push(object.time)
            }
            //生成地点数组
            var place_flag = 0;
            for(k=0;k<place_array.length;k++){
                if(place_array[k] == object.place){
                    place_flag = 1;
                }
            }
            if(place_flag == 0){
                place_array.push(object.place)
            }
            dataresult1[j].push(object);
        }
    }
    // console.log(dataresult1, "result1");
    // console.log(Rank, "rank");
    // console.log(membercolor, "color");
    // 进行二次处理
    i = 0;
    while (i < dataresult1.length) {
        var start = i;
        var end = i + 1;
        var flag = 0;
        if (end == dataresult1.length) {
            for (j = 0; j < dataresult1[start].length; j++) {
                dataresult.push([start, end - 1, dataresult1[start][j].event, dataresult1[start][j].name])
            }
            break;
        }
        if (dataresult1[start].length == dataresult1[end].length) {
            for (j = 0; j < dataresult1[end].length; j++) {
                if (dataresult1[start][j].event == dataresult1[end][j].event && dataresult1[start][j].name == dataresult1[end][j].name) {
                    flag = 1;
                }
                else {
                    flag = 0;
                    break;
                }
            }
        }
        while (flag == 1 && end < dataresult1.length - 1) {
            end = end + 1;
            flag = 0;
            if (dataresult1[start].length == dataresult1[end].length) {
                for (j = 0; j < dataresult1[end].length; j++) {
                    if (dataresult1[start][j].event == dataresult1[end][j].event && dataresult1[start][j].name == dataresult1[end][j].name) {
                        flag = 1;
                    }
                    else {
                        flag = 0;
                        break;
                    }
                }
            }
        }

        for (j = 0; j < dataresult1[start].length; j++) {
            dataresult.push([start, end - 1, dataresult1[start][j].event, dataresult1[start][j].name, dataresult1[start][j].place, dataresult1[start][j].time])
        }
        i = end;
    }
    //开始绘制，按照dataresult  
    var cs = 10;//循环次数
    rob = 0;
    // var color = [
    //     d3.rgb("#336633"),
    //     d3.rgb("#0099CC"),
    //     d3.rgb("#003399"),
    //     d3.rgb("#99CC00"),
    //     d3.rgb("#990033"),
    //     d3.rgb("#84c8ff"),
    //     d3.rgb("#666666"),
    //     d3.rgb("#663366"),
    //     d3.rgb("#003300"),
    //     d3.rgb("#FF9966"),
    // ];
    // var RectFilledColor = 'red'

    
    var RectFilledColor = '#78909c'
    //时间颜色
    var time_color = [
        d3.rgb("#336633"),
        d3.rgb("#0099CC"),
        d3.rgb("#FF8C00"),
        d3.rgb("#FFD700"),
        d3.rgb("#556B2F"),
        d3.rgb("#7FFF00"),
        d3.rgb("#008000"),
        d3.rgb("#00FA9A"),
        d3.rgb("#008080"),
        d3.rgb("#00FFFF"),
        d3.rgb("#4682B4"),
        d3.rgb("#8A2BE2"),
        d3.rgb("#8B008B"),
        d3.rgb("#BA55D3"),
        d3.rgb("#D8BFD8"),
        d3.rgb("#FF00FF"),
        d3.rgb("#FF1493"),
        d3.rgb("#FFB6C1"),
        d3.rgb("#F5DEB3"),
        d3.rgb("#8B4513"),
        d3.rgb("#D2691E"),
        d3.rgb("#BC8F8F"),
        d3.rgb("#F0FFF0"),
        d3.rgb("#006400"),
        d3.rgb("#1E90FF"),
        d3.rgb("#9400D3"),
        d3.rgb("#808000"),
        d3.rgb("#FFFF00"),
        d3.rgb("#000080"),
        d3.rgb("#FF0000"),
    ]
    // var place_color = [
    //     d3.rgb("#EBF1E5"),
    //     d3.rgb("#E7E4F9"),
    //     d3.rgb("#FCF0E6"),
    //     d3,rgb("#FCF5D8"),
    //     d3.rgb("#E8F9FC"),
    // ]
    var initmember = new Array();
    var membernew = new Array();
    var number1 = 0;
    var da = dataresult.length;
    for (i = 0; i < da; i++) {

        k = i;
        while (dataresult[i][0] == dataresult[k][0]) {//判断同一时间段
            k++;
            if (k == dataresult.length) {
                break;
            }
        }
        for (j = i; j < k; j++) {
            var members = dataresult[j][3].split(',');
            for (n = 0; n < members.length; n++) {
                for (m = 0; m < membering.length; m++) {
                    if (members[n] == membering[m][0]) {
                        membering[m][1] = 1;
                    }
                }
            }
        }
        for (j = 0; j < membering.length; j++) {
            if (membering[j][1] == 0) {
                eventname = "x" + number1.toString();
                number1++;
                membernew.push([eventname, dataresult[i][0], dataresult[i][1], membering[j][0]]);
                dataresult.push([dataresult[i][0], dataresult[i][1], eventname, membering[j][0]]);
            }
        }
        for (j = 0; j < membering.length; j++) {
            membering[j][1] = 0;
        }
        i = k - 1;
    }

    dataresult.sort(mem_rank);
    for (i = 0; i < dataresult.length; i++) {
        initmember.push([]);
    }
    
    var memberinformation = new Array();
    var events = new Array();
    for (i = 0; i < dataresult.length; i++) {
        memberinformation.push([]);
    }
    kb = 0;
    cs = 11;
    edge1 = 1250;
    var edge2 = 1250;
    updown = 0;
    line_array = new Array();
    while (kb < cs) {

        if (kb % 2 == 0) {
            line_array.length = 0;
            Rank.sort(rankr);
            d3.select('svg').selectAll('*').remove();
            var bn = 50;//虚线数量
            initmember.length = 0;
            memberinformation.length = 0;
            for (i = 0; i < dataresult.length; i++) {
                initmember.push([]);
            }

            for (i = 0; i < dataresult.length; i++) {
                memberinformation.push([]);
            }

            //二次处理数据，使得可以绘图
            i = 0;
            var number = 0;
            while (i < dataresult.length) {
                k = i;
                while (dataresult[i][0] == dataresult[k][0]) {//判断同一时间段
                    k++;
                    if (k == dataresult.length) {
                        break;
                    }
                }
                //二次处理数据
                for (j = i; j < k; j++) {
                    var members = dataresult[j][3].split(',');
                    sum = 0;
                    ran = 0;
                    for (m = 0; m < members.length; m++) {
                        for (n = 0; n < membercolor.length; n++) {
                            if (membercolor[n] == members[m]) {
                                for (p = 0; p < Rank.length; p++) {
                                    if (Rank[p][0] == members[m]) {
                                        memberinformation[number]
                                            .push([dataresult[j][0],
                                            dataresult[j][1],
                                            dataresult[j][2],
                                            members[m],
                                            Rank[p][2], n]);
                                        sum += Rank[p][2];
                                    }
                                }
                            }
                        }
                    }
                    sum = sum / members.length;
                    for (m = 0; m < memberinformation[number].length; m++) {

                        if (dataresult[j][2] == memberinformation[number][m][2]) {
                            memberinformation[number][m] = [
                                memberinformation[number][m][0],
                                memberinformation[number][m][1],
                                memberinformation[number][m][2],
                                memberinformation[number][m][3],
                                sum,//事件的平均 
                                memberinformation[number][m][4],//
                                memberinformation[number][m][5],
                                members.length, dataresult[j][4],
                                dataresult[j][5]
                                ];
                        }
                    }
                }
                //开始绘制图
                memberinformation[number].sort(m_rank);
                ran = 0;
                edge2 = 50;
                for (m = 0; m < memberinformation[number].length; m++) {
                    if (m == 0) {
                        y = edge2;
                    }
                    if (m > 0) {
                        if (memberinformation[number][m][2] == memberinformation[number][m - 1][2]) {
                            y = prey + peopledistance;
                        }
                        else {
                            y = prey + eventdistance;
                        }
                    }
                    x1 = memberinformation[number][m][0];
                    x2 = memberinformation[number][m][1];
                    c = memberinformation[number][m][6];

                    prey = y;

                    initmember[number].push([memberinformation[number][m][2],
                    memberinformation[number][m][3],
                    5 * (x1 + 1), y, 5 * (x2 + 1), y, c, memberinformation[number][m][8], memberinformation[number][m][9]])

                    line_array.push([5 * (x1 + 1), y, c]);
                    line_array.push([5 * (x2 + 1), y, c]);

                    for (r1 = 0; r1 < Rank.length; r1++) {
                        if (Rank[r1][0] == memberinformation[number][m][3] && Rank[r1][1] != y) {
                            Rank[r1][1] = y;
                        }
                    }
                }
                Rank.sort(rankr);
                Rank[0][2] = 0;
                for (r = 1; r < Rank.length; r++) {
                    if ((Rank[r][1] - Rank[r - 1][1]) == eventdistance) {
                        Rank[r][2] = Rank[r - 1][2] + 2;
                    }
                    if (Rank[r][1] == (Rank[r - 1][1] + peopledistance)) {
                        Rank[r][2] = Rank[r - 1][2] + 1;
                    }
                }
                if (updown == 0) {
                    edge2 = randomNum(eventdistance * membercolor.length + 10, eventdistance * membercolor.length * 2);
                    updown = 1 - updown;
                }
                else {
                    edge2 = randomNum(eventdistance * membercolor.length + 10, eventdistance * membercolor.length * 2);
                    updown = 1 - updown;
                }
                number++;
                i = k;
            }
        }
        else {
            line_array.length = 0;
            Rank.sort(rankr);
            d3.select('svg').selectAll('*').remove();
            var bn = 50;//虚线数量
            initmember.length = 0;
            memberinformation.length = 0;
            for (i = 0; i < dataresult.length; i++) {
                initmember.push([]);
            }
            for (i = 0; i < dataresult.length; i++) {
                memberinformation.push([]);
            }
            // for (xx = 1; xx < bn; xx++) {
            //     storyLineG.append("line")
            //         .attr("x1", 10 * xx / scale)
            //         .attr("y1", 10 / scale)
            //         .attr("x2", 10 * xx / scale)
            //         .attr("y2", 2500 / scale)
            //         .attr("stroke", "black")
            //         .attr("stroke-width", "2px")
            //         .attr("stroke-opacity", "0.3")
            //         .attr("stroke-dasharray", "3 2")
            // }
            //二次处理数据，使得可以绘图
            i = dataresult.length - 1;
            var number = 0;
            while (i >= 0) {
                k = i;
                while (dataresult[i][0] == dataresult[k][0]) {//判断同一时间段
                    k--;
                    if (k == -1) {
                        break;
                    }
                }
                //二次处理数据
                for (j = k + 1; j <= i; j++) {
                    var members = dataresult[j][3].split(',');
                    sum = 0;
                    ran = 0;
                    for (m = 0; m < members.length; m++) {
                        for (n = 0; n < membercolor.length; n++) {
                            if (membercolor[n] == members[m]) {
                                for (p = 0; p < Rank.length; p++) {
                                    if (Rank[p][0] == members[m]) {
                                        memberinformation[number]
                                            .push([dataresult[j][0],
                                            dataresult[j][1],
                                            dataresult[j][2],
                                            members[m],
                                            Rank[p][2], n]);
                                        sum += Rank[p][2];
                                    }
                                }
                            }
                        }
                    }
                    sum = sum / members.length;
                    for (m = 0; m < memberinformation[number].length; m++) {

                        if (dataresult[j][2] == memberinformation[number][m][2]) {
                            memberinformation[number][m] = [
                                memberinformation[number][m][0],
                                memberinformation[number][m][1],
                                memberinformation[number][m][2],
                                memberinformation[number][m][3],
                                sum,//事件的平均 
                                memberinformation[number][m][4],//
                                memberinformation[number][m][5],
                                members.length, 
                                dataresult[j][4],
                                dataresult[j][5]];
                        }
                    }
                }
                //开始绘制图
                memberinformation[number].sort(m_rank);
                ran = 0;
                edge2 = 50;
                for (m = 0; m < memberinformation[number].length; m++) {
                    if (m == 0) {
                        y = edge2;

                    }
                    if (m > 0) {
                        if (memberinformation[number][m][2] == memberinformation[number][m - 1][2]) {
                            y = prey + peopledistance;
                        }
                        else {
                            y = prey + eventdistance;
                        }
                    }
                    x1 = memberinformation[number][m][0];
                    x2 = memberinformation[number][m][1];
                    c = memberinformation[number][m][6];
                    // storyLineG.append("circle")
                    //     .attr("cx", 10 * (x1 + 1))
                    //     .attr("cy", y)
                    //     .attr("r", "1px")
                    //     .attr("fill", color[c]);
                    // minMapSvg.append("circle")
                    //     .attr("cx", 10 * (x1 + 1) / scale)
                    //     .attr("cy", y / scale)
                    //     .attr("r", "1px")
                    //     .attr("fill", color[c]);
                    // storyLineG.append("circle")
                    //     .attr("cx", 10 * (x2 + 1))
                    //     .attr("cy", y)
                    //     .attr("r", "1px")
                    //     .attr("fill", color[c]);
                    // minMapSvg.append("circle")
                    //     .attr("cx", 10 * (x2 + 1) / scale)
                    //     .attr("cy", y / scale)
                    //     .attr("r", "1px")
                    //     .attr("fill", color[c]);
                    prey = y;
                    initmember[number].push([memberinformation[number][m][2],
                    memberinformation[number][m][3],
                    5 * (x1 + 1), y, 5 * (x2 + 1), y, c, memberinformation[number][m][8], memberinformation[number][m][9]])
                    line_array.push([2 * (x1 + 1), y, c]);
                    line_array.push([2 * (x2 + 1), y, c]);
                    for (r1 = 0; r1 < Rank.length; r1++) {
                        if (Rank[r1][0] == memberinformation[number][m][3] && Rank[r1][1] != y) {
                            Rank[r1][1] = y;
                        }
                    }


                }
                Rank.sort(rankr);
                Rank[0][2] = 0;
                for (r = 1; r < Rank.length; r++) {
                    if ((Rank[r][1] - Rank[r - 1][1]) == eventdistance) {
                        Rank[r][2] = Rank[r - 1][2] + 2;
                    }
                    if (Rank[r][1] == (Rank[r - 1][1] + peopledistance)) {
                        Rank[r][2] = Rank[r - 1][2] + 1;
                    }
                }
                if (updown == 0) {
                    edge2 = randomNum(eventdistance * membercolor.length + 10, eventdistance * membercolor.length * 2);
                    updown = 1 - updown;
                }
                else {
                    edge2 = randomNum(eventdistance * membercolor.length + 10, eventdistance * membercolor.length * 2);
                    updown = 1 - updown;
                }
                number++;
                i = k;
            }
        }
        kb++;
    }

    var eventnumber = new Array();
    var path = new Array();
    var straight_line = new Array();
    for (l = 1; l < number; l++) {
        //统计l-1和l的事件数量
        eventnumber.length = 0;
        for (p = 0; p < initmember[l].length; p++) {
            flag = 1;
            for (q = 0; q < eventnumber.length; q++) {
                if (eventnumber[q] == initmember[l][p][0]) {
                    flag = 0;
                }
            }
            if (flag == 1) {
                eventnumber.push(initmember[l][p][0]);
            }
        }
        var m = eventnumber.length;//l的事件数量
        eventnumber.length = 0;
        for (p = 0; p < initmember[l - 1].length; p++) {
            flag = 1;
            for (q = 0; q < eventnumber.length; q++) {
                if (eventnumber[q] == initmember[l - 1][p][0]) {
                    flag = 0;
                }
            }
            if (flag == 1) {
                eventnumber.push(initmember[l - 1][p][0]);
            }
        }
        var n = eventnumber.length;//l-1的事件数量
        alpha = 0.1;

        a1 = new Array();//记录值
        a2 = new Array();//记录路径
        for (i = 0; i < m + 1; i++) {
            a1[i] = new Array();
            a2[i] = new Array();
            for (j = 0; j < n + 1; j++) {
                a1[i].push(0);
                a2[i].push(0);
            }
        }
        for (i = 0; i < m + 1; i++) {
            for (j = 0; j < n + 1; j++) {

            }
        }
        for (i = 0; i < m + 1; i++) {
            for (j = 0; j < n + 1; j++) {
                if (i == 0 || j == 0) {
                    a1[i][j] = 0;
                    a2[i][j] = 0;
                }
            }
        }



        var s = 0;


        for (i = 1; i < m + 1; i++) {
            for (j = 1; j < n + 1; j++) {
                k = 0;
                x_key1 = 0;
                y_key1 = 0;
                x_key2 = 0;
                y_key2 = 0;
                for (a = 1; a < initmember[l].length; a++) {
                    if (initmember[l][a][0] != initmember[l][a - 1][0]) {
                        k++;
                        x_key1 = x_key2 + 1;
                        x_key2 = a - 1;
                        if (k == i) {
                            if (x_key1 == 1 && i == 1) {
                                x_key1 = 0;
                            }
                            break;
                        }
                    }
                }
                if (m == 1) {
                    x_key1 = 0;
                    x_key2 = initmember[l].length - 1;
                }
                else if (m == i) {
                    for (a = initmember[l].length - 1; a > 0; a--) {
                        if (initmember[l][a][0] != initmember[l][a - 1][0]) {
                            x_key2 = initmember[l].length - 1;
                            x_key1 = a;
                            break;
                        }
                    }
                }
                k = 0;
                for (a = 1; a < initmember[l - 1].length; a++) {
                    if (initmember[l - 1][a][0] != initmember[l - 1][a - 1][0]) {
                        k++;
                        y_key1 = y_key2 + 1;
                        y_key2 = a - 1;
                        if (k == j) {
                            if (y_key1 == 1 && j == 1) {
                                y_key1 = 0;
                            }
                            break;
                        }
                    }
                }
                if (n == 1) {
                    y_key1 = 0;
                    y_key2 = initmember[l - 1].length - 1;
                }
                else if (n == j) {
                    for (a = initmember[l - 1].length - 1; a > 0; a--) {
                        if (initmember[l - 1][a][0] != initmember[l - 1][a - 1][0]) {
                            y_key2 = initmember[l - 1].length - 1;
                            y_key1 = a;
                            break;
                        }
                    }
                }
                sum = 0;
                for (a = x_key1; a <= x_key2; a++) {
                    for (b = y_key1; b <= y_key2; b++) {
                        if (initmember[l][a][1] == initmember[l - 1][b][1]) {
                            sum++;
                        }
                    }
                }
                var slim = sum + alpha * (1 - Math.abs((i - 1) / m - (j - 1) / n));

                var max1 = Math.max(a1[i - 1][j - 1] + slim, a1[i - 1][j], a1[i][j - 1]);
                a1[i][j] = max1;
                if (max1 == a1[i - 1][j - 1] + slim) {
                    a2[i][j] = 1;
                }
                else if (max1 == a1[i - 1][j]) {
                    a2[i][j] = 2;
                }
                else if (max1 == a1[i][j - 1]) {
                    a2[i][j] = 3;
                }
            }
        }
        path.length = 0;
        k = 0;


        i = m;
        j = n;
        while (i > 0 && j > 0) {
            if (a2[i][j] == 1) {
                path.push([i, j]);
                i--;
                j--;
            }
            else if (a2[i][j] == 2) {
                path.push([i, j]);
                i--;
            }
            else if (a2[i][j] == 3) {
                path.push([i, j]);
                j--;
            }
        }

        straight_line.length = 0;
        sum = 0;
        for (p = 0; p < path.length; p++) {
            i = path[p][0];
            j = path[p][1];
            k = 0;
            x_key1 = 0;
            y_key1 = 0;
            x_key2 = 0;
            y_key2 = 0;
            for (a = 1; a < initmember[l].length; a++) {
                if (initmember[l][a][0] != initmember[l][a - 1][0]) {
                    k++;
                    x_key1 = x_key2 + 1;
                    x_key2 = a - 1;
                    if (k == i) {
                        if (x_key1 == 1 && i == 1) {
                            x_key1 = 0;
                        }
                        break;
                    }
                }
            }
            if (m == 1) {
                x_key1 = 0;
                x_key2 = initmember[l].length - 1;
            }
            else if (m == i) {
                for (a = initmember[l].length - 1; a > 0; a--) {
                    if (initmember[l][a][0] != initmember[l][a - 1][0]) {
                        x_key2 = initmember[l].length - 1;
                        x_key1 = a;
                        break;
                    }
                }
            }
            k = 0;
            for (a = 1; a < initmember[l - 1].length; a++) {
                if (initmember[l - 1][a][0] != initmember[l - 1][a - 1][0]) {
                    k++;
                    y_key1 = y_key2 + 1;
                    y_key2 = a - 1;
                    if (k == j) {

                        if (y_key1 == 1 && j == 1) {
                            y_key1 = 0;
                        }
                        break;
                    }
                }
            }
            if (n == 1) {
                y_key1 = 0;
                y_key2 = initmember[l - 1].length - 1;
            }
            else if (n == j) {
                for (a = initmember[l - 1].length - 1; a > 0; a--) {
                    if (initmember[l - 1][a][0] != initmember[l - 1][a - 1][0]) {
                        y_key2 = initmember[l - 1].length - 1;
                        y_key1 = a;
                        break;
                    }
                }
            }
            for (a = x_key1; a <= x_key2; a++) {
                for (b = y_key1; b <= y_key2; b++) {
                    if (initmember[l][a][1] == initmember[l - 1][b][1]) {
                        sum++;
                        straight_line.push([a, b]);
                    }
                }
            }

        }
        //对齐
        var xxx = 0;
        for (i = 0; i < straight_line.length; i++) {
            a = straight_line[i][0];
            b = straight_line[i][1];
            for (j = 0; j < initmember[l].length; j++) {
                var mem = initmember[l][a][0].split('');
                if (j == a && mem[0] == 'i') {
                    va = j - 1;
                    initmember[l][j][3] = initmember[l - 1][b][3];
                    initmember[l][j][5] = initmember[l - 1][b][5];
                    while (va >= 0) {
                        if (initmember[l][va][0] != initmember[l][va + 1][0]) {
                            initmember[l][va][3] = initmember[l][va + 1][3] - eventdistance;
                            initmember[l][va][5] = initmember[l][va + 1][5] - eventdistance;
                        }
                        else {
                            initmember[l][va][3] = initmember[l][va + 1][3] - peopledistance;
                            initmember[l][va][5] = initmember[l][va + 1][5] - peopledistance;
                        }
                        va--;
                    }
                    va = j + 1;
                    while (va <= initmember[l].length - 1) {
                        if (initmember[l][va][0] != initmember[l][va - 1][0]) {
                            initmember[l][va][3] = initmember[l][va - 1][3] + eventdistance;
                            initmember[l][va][5] = initmember[l][va - 1][5] + eventdistance;
                        }
                        else {
                            initmember[l][va][3] = initmember[l][va - 1][3] + peopledistance;
                            initmember[l][va][5] = initmember[l][va - 1][5] + peopledistance;
                        }
                        va++;
                    }
                }
            }
        }

    }

    for (i = 1; i < number; i++) {
        for (j = 0; j < initmember[i].length; j++) {
            for (k = 0; k < initmember[i - 1].length; k++) {
                if (initmember[i][j][0] == initmember[i - 1][k][0]) {
                    if (initmember[i][j][1] == initmember[i - 1][k][1]) {
                        initmember[i - 1][k][3] = initmember[i][j][3];
                        initmember[i - 1][k][5] = initmember[i][j][5];
                    }
                }
            }
        }
    }

    line_array.length = 0;

    for (i = 0; i < number; i++) {
        for (j = 0; j < initmember[i].length; j++) {
            for (k = 0; k < mem_end.length; k++) {
                if (mem_end[k][0] == initmember[i][j][1]) {

                    if (initmember[i][j][2] >= mem_end[k][1] && initmember[i][j][4] <= mem_end[k][2]) {
                        line_array.push([initmember[i][j][2] + liucunkongbai, initmember[i][j][3], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);
                        line_array.push([initmember[i][j][4] + liucunkongbai, initmember[i][j][5], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);

                    }
                }
            }

        }
    }


    line_array.sort(line_array_rank2);
    var sum = 1;
    for (i = 0; i < initmember.length; i++) {
        for (j = 1; j < initmember[i].length; j++) {
            if (initmember[i][j][0] == initmember[i][j - 1][0]) {
                sum++;
            }
            else {
                if (sum >= 2) {

                }
                sum = 1;
            }
        }
    }
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

        line_array.sort(ascend);
            //去重
            for(i=1;i<line_array.length;i++){
                line_flag = 0;
                for(j=0;j<5;j++){
                    if(line_array[i][j] != line_array[i-1][j]){
                        line_flag = 1;
                        j = 5;
                    }
                }
                if(line_flag == 0){
                    line_array.splice(i, 1);
                }
            }
            
            //去掉尖尖的地方bug
            for(i=1;i<line_array.length-1;i++){
                var line1_mem = line_array[i-1][3];
                var line2_mem = line_array[i][3];
                var line3_mem = line_array[i+1][3];
                
                    if(line_array[i][1] > line_array[i-1][1] && line_array[i][1] > line_array[i+1][1]){
                        line_array.splice(i, 1);
                    }
                    if(line_array[i][1] < line_array[i-1][1] && line_array[i][1] < line_array[i+1][1]){
                        line_array.splice(i, 1);
                    }
                
            }
        
            //解决重合的bug
            line_array.sort(function(x, y){
                if(x[0] == y[0]){
                    return x[1] - y[1];
                }
                else{
                    return x[0] - y[0];
                }
            })
            for(i=1;i<line_array.length;i++){
                if(line_array[i-1][0] == line_array[i][0]){
                    if(line_array[i-1][1] == line_array[i][1]){
                        // console.log("x")
                        if(line_array[i-1][3] == line_array[i][3]){
                            line_array[i][1] = line_array[i-1][1] + peopledistance;
                        }
                        else{
                            line_array[i][1] = line_array[i-1][1] + eventdistance;
                        }
                    }
                }
            }

    var new_middle_array = new Array();
    var old_middle_array = new Array();
    var middle_key = line_array[0][0];
    var new_middle_flag_start = membercolor.length;
    var old_middle_flag_start = membercolor.length;
    var new_middle_flag_end = 0;
    var old_middle_flag_end = 0;
    var middle_k = 0;
    
    var needing_array = new Array();
    new_middle_array.push([line_array[0][0], line_array[0][1], line_array[0][2], line_array[0][3], line_array[0][4]]);
    //解决最上面最下面的bug
    for(i=1;i<line_array.length-1;i++){
        if(line_array[i][0] == line_array[i-1][0]){
            new_middle_array.push([line_array[i][0], line_array[i][1], line_array[i][2], line_array[i][3], line_array[i][4]]);
            // //
            // for(j=0;j<old_middle_array.length;j++){
            //     if(old_middle_array[j][4] == new_middle_array[0][4]){
            //         if(new_middle_array[1][3] != new_middle_array[0][3]){
            //             if(new_middle_array[1][1]-old_middle_array[j][1] > eventdistance){
            //                 line_array[i]
            //             }
            //         }
            //     }
            // }
        }
        else if(line_array[i-1][0] != line_array[i][0]){
            //判断最上面
            new_middle_array.length -= 1;
            // console.log(new_middle_array);
            if(line_array[i-1][3] != line_array[i-2][3]){

                for(j=0;j<new_middle_array.length;j++){
                    if(new_middle_array[j][4] == line_array[i-1][4]){
                        // console.log("aaa", new_middle_array[j][4], new_middle_array[j][1], line_array[i-2][1], line_array[i-2][4]);
                        if(new_middle_array[j][1] - line_array[i-2][1] >= eventdistance){
                            
                            line_array[i-1][1] = new_middle_array[j][1]; 
                        }
                    }
                }
            }

            //判断最下面
            if(line_array[i+1][3] != line_array[i][3]){
                for(j=0;j<new_middle_array.length;j++){
                    if(new_middle_array[j][4] == line_array[i][4]){
                        if(line_array[i+1][1] - new_middle_array[j][1] >= eventdistance){
                            // console.log("xajsda");
                            line_array[i][1] = new_middle_array[j][1]; 
                        }
                    }
                }
            }
            new_middle_array.length = 0;
            new_middle_array.push([line_array[i-1][0], line_array[i-1][1], line_array[i-1][2], line_array[i-1][3], line_array[i-1][4]])
            new_middle_array.push([line_array[i][0], line_array[i][1], line_array[i][2], line_array[i][3], line_array[i][4]])
    
        }
    }
    // console.log(initmember, "initmember")
    for(i=0;i<initmember.length;i++){
        for(j=0;j<initmember[i].length;j++){
            for(k=0;k<line_array.length;k++){
                if(line_array[k][3] == initmember[i][j][0] && initmember[i][j][1] == line_array[k][4]){
                    initmember[i][j][3] = line_array[k][1];
                    initmember[i][j][5] = line_array[k][1];
                }
            }
        }
    }

    for (i = 1; i < number; i++) {
        for (j = 0; j < initmember[i].length; j++) {
            for (k = 0; k < initmember[i - 1].length; k++) {
                if (initmember[i][j][0] == initmember[i - 1][k][0]) {
                    if (initmember[i][j][1] == initmember[i - 1][k][1]) {
                        initmember[i - 1][k][3] = initmember[i][j][3];
                        initmember[i - 1][k][5] = initmember[i][j][5];
                    }
                }
            }
        }
    }

    line_array.length = 0;

    for (i = 0; i < number; i++) {
        for (j = 0; j < initmember[i].length; j++) {
            for (k = 0; k < mem_end.length; k++) {
                if (mem_end[k][0] == initmember[i][j][1]) {

                    if (initmember[i][j][2] >= mem_end[k][1] && initmember[i][j][4] <= mem_end[k][2]) {
                        line_array.push([initmember[i][j][2] + liucunkongbai, initmember[i][j][3], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);
                        line_array.push([initmember[i][j][4] + liucunkongbai, initmember[i][j][5], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);

                    }
                }
            }

        }
    }
    line_array.sort(ascend);
      
    //画线

    console.log(line_array);
    for(i=1;i<line_array.length-1;i++){
        if(line_array[i-1][3] == line_array[i][3] && line_array[i+1][3]){
            if(line_array[i][1] > line_array[i-1][1] && line_array[i][1] > line_array[i+1][1] && line_array[i-1][1] == line_array[i+1][1]){
                line_array[i][1] = line_array[i-1][1];
            }
            if(line_array[i][1] < line_array[i-1][1] && line_array[i][1] < line_array[i+1][1] && line_array[i-1][1] == line_array[i+1][1]){
                // console.log(line_array[i][1], line_array[i][4]);
                line_array[i][1] = line_array[i-1][1];
            }
        }
    }

    //去重
    for(i=1;i<line_array.length;i++){
        line_flag = 0;
        for(j=0;j<5;j++){
            if(line_array[i][j] != line_array[i-1][j]){
                line_flag = 1;
                j = 5;
            }
        }
        if(line_flag == 0){
            line_array.splice(i, 1);
        }
    }

    //去掉尖尖的地方bug
    
    for(i=1;i<line_array.length-1;i++){
            
            
        if(line_array[i][1] > line_array[i-1][1] && line_array[i][1] > line_array[i+1][1] ){
            line_array.splice(i, 1);
        }
        if(line_array[i][1] < line_array[i-1][1] && line_array[i][1] < line_array[i+1][1]){
            console.log(line_array[i][1], line_array[i][4]);
            line_array.splice(i, 1);
        }
    
    } 

    //绘制图例

    

    

    if(sessionListSL1_flag1 == 0){
        for(i=0;i<membercolor.length;i++){
            legend_click[i] = [membercolor[i], 0];
        }
        d3.select("body")
        .append("div")
        .attr("id", "legend");
        update1(legend_click);
        sessionListSL1_flag1 = 1;
    }

    
        
    // console.log(line_array, "line")
    //小地图背景
    minMapG.append("rect")
        .attr("id", "minMapBackGround")
        .attr("x", 0)
        .attr("y", topY)
        .attr("width", rightX)
        .attr("height", rectHeight)
        .attr("fill", backgroundColor)
        .attr("stroke", '#e9edf7')
        .attr("stroke-width", "3px")

    // console.log(dataresult, "dataresult");
    
    var sum = 1;
    var reline = new Array();
    for (i = 1; i < line_array.length; i++) {
        //画线
        if (line_array[i][2] == line_array[i - 1][2]) {
            if (line_array[i][1] != line_array[i - 1][1]) {
                x1 = line_array[i][0];
                x2 = line_array[i - 1][0];
                y1 = line_array[i][1];
                y2 = line_array[i - 1][1];
                k1 = 1 / 3;
                k2 = 1 / 6;
                reline.push({ xpoint: x2, ypoint: y2 });
                if (y1 > y2) {
                    new_y = y1 - y2;
                    reline.push({ xpoint: x2 + (x1 - x2) * k1, ypoint: y2 + new_y * k2 });
                    reline.push({ xpoint: x2 + (x1 - x2) * (1 - k1), ypoint: y2 + new_y * (1 - k2) });
                }
                else {
                    new_y = y2 - y1;
                    reline.push({ xpoint: x2 + (x1 - x2) * k1, ypoint: y1 + new_y * (1 - k2) });
                    reline.push({ xpoint: x2 + (x1 - x2) * (1 - k1), ypoint: y1 + new_y * k2 });
                }
                reline.push({ xpoint: x1, ypoint: y1 });

            }
            else {
                x1 = line_array[i][0];
                x2 = line_array[i - 1][0];
                y1 = line_array[i][1];
                y2 = line_array[i - 1][1];
                reline.push({ xpoint: x2, ypoint: y2 });
                reline.push({ xpoint: x1, ypoint: y1 });

            }
            if (i == line_array.length - 1) {
                var Gen = d3.line()
                    .x((p) => p.xpoint)
                    .y((p) => p.ypoint)
                    .curve(d3.curveBasis);
                storyLineG.append("path")
                    .attr("id", "path" + line_array[i][2])
                    .attr("d", Gen(reline))
                    .attr("fill", "none")
                    .attr("stroke", color[line_array[i - 1][2]])
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", 1)
                    .attr("opacity", 0.8)
                    .on("mouseover", function () {
                        this.style.opacity = 1;
                        var name = d3.select('#' + membercolor[this.id])
                        name.fill = "orange"
                    })
                    .on("mouseout", function (d) {
                        this.style.stroke = color[parseInt(this.id)];
                        this.style.opacity = 0.8;
                        var name = d3.select('#' + membercolor[this.id])
                        name.fill = "black";
                    });
                minMapG.append("path")
                    .attr("d", Gen(reline))
                    .attr("fill", "none")
                    .attr("stroke", color[line_array[i - 1][2]])
                    .attr("stroke-width", 1 / scale + "px")
                    .attr("stroke-opacity", 1)

                reline.length = 0;
            }
        }
        else {
            var Gen = d3.line()
                .x((p) => p.xpoint)
                .y((p) => p.ypoint)
                .curve(d3.curveBasis);
            storyLineG.append("path")
                .attr("id", "path" + line_array[i - 1][2])
                .attr("d", Gen(reline))
                .attr("fill", "none")
                .attr("stroke", color[line_array[i - 1][2]])
                .attr("stroke-width", "1px")
                .attr("stroke-opacity", 1)
                .attr("opacity", 0.8)
                .on("mouseover", function () {
                    this.style.opacity = 1;
                })
                .on("mouseout", function (d) {
                    this.style.stroke = color[parseInt(this.id)];
                    this.style.opacity = 0.8;
                });
            minMapG.append("path")
                .attr("d", Gen(reline))
                .attr("fill", "none")
                .attr("stroke", color[line_array[i - 1][2]])
                .attr("stroke-width", 1 / scale + "px")
                .attr("stroke-opacity", 1)
            reline.length = 0;
        }
        // 添加故事线人物
        if (i == 1) {
            //添加第一个故事线的名字（使用i-1）
            var mem = line_array[i - 1][4].split('');
            storyLineG.append("text")
                .attr("id", line_array[i - 1][4])
                .attr("x", line_array[i - 1][0] - 10)
                .attr("y", line_array[i - 1][1])
                .style('font-weight', 1)
                .style('font-family', 'Arial')
                .style('font-size', 2)
                .style('fill', color[line_array[i - 1][2]])
                .text(line_array[i - 1][4])
            minMapG.append("text")
                .attr("x", (line_array[i - 1][0] - 10) / scale)
                .attr("y", (line_array[i - 1][1]) / scale)
                .style('font-weight', 1 / scale)
                .style('font-family', 'Arial')
                .style('font-size', 2 / scale)
                .style('fill', color[line_array[i - 1][2]])
                .text(line_array[i - 1][4])
        }
        else if (line_array[i][2] != line_array[i - 1][2]) {
            //添加后面故事线的名字
            //使用i的坐标进行把控文本的名字
            var mem = line_array[i][4].split('');
            storyLineG.append("text")
                .attr("id", line_array[i][4])
                .attr("x", line_array[i][0] - 10)
                .attr("y", line_array[i][1])
                .style('font-weight', 1)
                .style('font-family', 'Arial')
                .style('font-size', 2)
                .style('fill', color[line_array[i][2]])
                .text(line_array[i][4])
            minMapG.append("text")
                .attr("x", (line_array[i][0] - 10) / scale)
                .attr("y", (line_array[i][1]) / scale)
                .style('font-weight', 1 / scale)
                .style('font-family', 'Arial')
                .style('font-size', 2 / scale)
                .style('fill', color[line_array[i][2]])
                .text(line_array[i][4])
        }
    }

    //添加人物名字
    var line_name_dis = 50;
    var pre_line = line_array[0][0];
    // for(i=1;i<line_array.length;i++){
    //     if(line_array[i][4] != line_array[i-1][4]){
    //         pre_line = line_array[i][0];
    //     }
    //     while(line_array[i][0] - pre_line >= line_name_dis){
    //         storyLineG.append("rect")
    //                 .attr("x", line_array[i][0] - 0.3)
    //                 .attr("y", line_array[i][1] - 1)
    //                 .attr("width", line_array[i][4].length * 1.1)
    //                 .attr("height", 2)
    //                 .attr("rx", 0.3)
    //                 .attr("ry", 0.3)
    //                 // .attr("rect-anchor", "middle")
    //                 .attr("fill", d3.rgb(242, 242, 242));
    //         storyLineG.append("text")
    //                 .attr("x", line_array[i][0])
    //                 .attr("y", line_array[i][1]+1)
    //                 .style('font-size', 2)
    //                 .style('fill', "black")
    //                 // .attr('text-anchor',"middle")
    //                 .text(line_array[i][4])
    //                 .attr("fill", "white");

    //         pre_line += line_array[i][0];
    //         if(line_array[i][0] - pre_line < line_name_dis){
    //             break;
    //         }
    //     }         
        
    // }
    var dis1 = line_array[0][0];
    var dis2, dis3, dis4;
    for(i=1;i<line_array.length;i++){
        if(line_array[i][4] != line_array[i-1][4]){
            var text_num = line_array[i-1][0] / 50;
            dis2 = line_array[i-1][0]
            console.log(dis2, dis1, line_array[i-1][4], (dis2 - dis1) / 5, line_array[i-1][4].length*1.1);



            for(j=0;j<text_num;j++){
                dis4 = line_array[i-1][4].length*1.2
                dis3 = 50 - dis4;

                storyLineG.append("text")
                            .attr("dy", 0.75)
                            .style("background-color", "white")
                            .append("textPath")
                            .attr("xlink:href", "#path" + line_array[i-1][2])
                            .style("text-anchor", "middle") 
                            .attr("startOffset", (j + 1)*50 - dis4/2)
                            .attr("dy", 0.75)
                            .style('font-size', 2)
                            .style('fill', color[line_array[i-1][2]])
                            .text(line_array[i-1][4])
                            .style("background-color", "white")

                
               
                d3.select("#path" + line_array[i-1][2])
                    .attr("stroke-dasharray", dis3.toString() + " " + dis4.toString())
                // storyLineG.append("rect")
                //             .append("rectPath")
                //             .attr("xlink:href", "#" + line_array[i-1][2])
                //             // .style("text-anchor","middle") 
                //             .attr("startOffset", (j + 1)*24 + "%")
                //             .attr("width", )
                //             .attr("width", )
                //             .text(line_array[i-1][4]);
            }
            dis1 = line_array[i][0]
        }
        else if(i == line_array.length - 1){
            var text_num = line_array[i][0] / 50;
            dis2 = line_array[i][0]
            console.log(dis2, dis1, line_array[i-1][4], (dis2 - dis1) / 5, line_array[i][4].length *1.1);
            for(j=0;j<text_num;j++){
                dis4 = line_array[i][4].length * 1.2
                dis3 = 50 - dis4
                storyLineG.append("text")
                            .attr("dy", 0.75)
                            .append("textPath")
                            .attr("xlink:href", "#path" + line_array[i][2])
                            .style("text-anchor","middle") 
                            .attr("dy", 1)
                            .attr("startOffset", (j + 1)*50 - dis4/2)
                            .style('font-size', 2)
                            .style('fill', color[line_array[i][2]])
                            .text(line_array[i][4]);
                
             
                dis4 = line_array[i][4].length * 1.1
                dis3 = 50 - dis4
                d3.select("#path" + line_array[i][2]).attr("stroke-dasharray", dis3.toString() + " " + dis4.toString())
            }
        }
    }


    var sum = 1;
    var k = 1;
    var rect_event = new Array();

    for (i = 0; i < dataresult.length; i++) {
        var mem = dataresult[i][3].split(',');
        if (mem.length >= 1) {
            if (k == 1) {
                for (m = 0; m < sessionListSL.length; m++) {
                    if (sessionListSL[m][0] == dataresult[i][2]) {
                        rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0, sessionListSL[m][5], sessionListSL[m][4], sessionListSL[m][6]]);
                    }
                }

                k = 0;
            }
            flag = 0;
            for (j = 0; j < rect_event.length; j++) {
                if (rect_event[j][0] == dataresult[i][2]) {
                    if (rect_event[j][1] > dataresult[i][0]) {
                        rect_event[j][1] = dataresult[i][0];
                    }
                    if (rect_event[j][2] < dataresult[i][1]) {
                        rect_event[j][2] = dataresult[i][1];
                    }
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                for (m = 0; m < sessionListSL.length; m++) {
                    if (sessionListSL[m][0] == dataresult[i][2]) {
                        rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0, sessionListSL[m][5], sessionListSL[m][4], sessionListSL[m][6]]);
                    }
                }
            }
        }
    }

    for (i = 0; i < initmember.length; i++) {
        for (j = 0; j < initmember[i].length; j++) {
            for (k = 0; k < rect_event.length; k++) {
                if (initmember[i][j][0] == rect_event[k][0]) {
                    if (initmember[i][j][3] < rect_event[k][3]) {
                        rect_event[k][3] = initmember[i][j][3];
                    }
                    if (initmember[i][j][3] > rect_event[k][4]) {
                        rect_event[k][4] = initmember[i][j][3];
                    }
                }
            }
        }
    }

    //更新rect_event的数据
    for(i=0;i<rect_event.length;i++){
        for(j=0;j<line_array.length;j++){
            if(rect_event){

            }
        }
    }

    // console.log(rect_event, "rect_event");
    //存储每个点击事件
    var click_flag = new Array();
    for (i = 0; i < rect_event.length; i++) {
        click_flag.push(0);
    }


    // console.log(place_array);
    var place_group = new Array();//粗春地点相同的数组
    var points = new Array();//存储多边形的各个坐标
    for(i=0;i<place_array.length;i++){
        place_group.push([]);
    }
    //对已有的数据来进行地点分类
    for(i=0;i<place_array.length;i++){
        for(j=0;j<rect_event.length;j++){
            if(place_array[i] == rect_event[j][6]){
                place_group[i].push([rect_event[j][0], rect_event[j][1], rect_event[j][2], rect_event[j][3], rect_event[j][4], rect_event[j][5], rect_event[j][6], rect_event[j][7]]);
                place_group[i].sort(function(x, y){
                    if(x[1] - y[2] > 1){
                        return x[1] - y[1];
                    }
                    else{
                        return x[3] - y[3];
                    }
                });
            }
        }
    }

    var place_group_result = new Array();
    var place_group_result_num = 0;
    for(i=0;i<place_group.length;i++){
        if(place_group[i].length > 1){
            place_group_result[place_group_result_num] = new Array();
            place_group_result[place_group_result_num].push(place_group[i][0]);
            for(j=1;j<place_group[i].length;j++){
                if(place_group[i][j][1] > place_group[i][j-1][2] + 5){//判断条件可以优化成中间是否隔着其他事件
                    place_group_result_num++;
                    place_group_result[place_group_result_num] = new Array();
                    place_group_result[place_group_result_num].push(place_group[i][j]);
                }
                else{
                    place_group_result[place_group_result_num].push(place_group[i][j]);
                }
            }
            place_group_result_num++;
        }
        
    }

    // console.log(place_group_result, "place_group_result")
    place_group.length = 0;

    for(i=0;i<place_group_result.length;i++){
        place_group.push(place_group_result[i]);
    }
    // console.log(place_group, "place_group");
    // console.log(time_array, "time");
    
    var point = new Array();//存储多边形的各个坐标
    //添加地点,绘制地点背景
    for(i=1;i<place_group.length;i++){
        //判断两个矩形的位置情况
        //主要根据x坐标进行判断，找出交叉的点
        if(place_group[i].length >= 1){
            //开始绘制，开始判断两个矩形的位置情况
            for(j=1;j<place_group[i].length;j++){
                var x1 = eventdistance * (place_group[i][j][1] + 1) + 100 - 2;
                var y1 = place_group[i][j][3] - 2;
                var w1 = eventdistance * (place_group[i][j][2] + 1) - eventdistance * (place_group[i][j][1] + 1) + 4;
                var h1 = place_group[i][j][4] - place_group[i][j][3] + 4;

                var x2 = eventdistance * (place_group[i][j-1][1] + 1) + 100 - 2;   
                var y2 = place_group[i][j-1][3] - 2;
                var w2 = eventdistance * (place_group[i][j-1][2] + 1) - eventdistance * (place_group[i][j-1][1] + 1) + 4;
                var h2 = place_group[i][j-1][4] - place_group[i][j-1][3] + 4;
                
                // console.log(x1, y1, w1, h1, x2, y2, h2, w2, "dekajd");
                  
                if(x1 - (x2+w2) > 1){
                    point.push([{xpoint:x2, ypoint:y2, name:place_group[i][j][6], t:1},
                        {xpoint: x2, ypoint:y2+h2}, 
                        {xpoint:x2+w2, ypoint:y2+h2},
                        {xpoint:x1, ypoint:y1+h1},
                        {xpoint:x1+w1, ypoint:y1+h1},
                        {xpoint:x1+w1, ypoint:y1},
                        {xpoint:x1, ypoint:y1},
                        {xpoint:x1, ypoint:y1+h1},
                        {xpoint:x2+w2, ypoint:y2+h2},
                        {xpoint:x2+w2, ypoint:y2},
                        {xpoint:x2, ypoint:y2},

                    ]);
                }
                else if(x2 - (x1+w1) > 1){
                    point.push([{xpoint:x1, ypoint:y1, name:place_group[i][j][6]},
                        {xpoint: x1, ypoint:y1+h1}, 
                        {xpoint:x1+w1, ypoint:y1+h1},
                        {xpoint:x2, ypoint:y2+h2},
                        {xpoint:x2+w2, ypoint:y2+h2},
                        {xpoint:x2+w2, ypoint:y2},
                        {xpoint:x2, ypoint:y2},
                        {xpoint:x2, ypoint:y2+h2},
                        {xpoint:x1+w1, ypoint:y1+h1},
                        {xpoint:x1+w1, ypoint:y1},
                        {xpoint:x1, ypoint:y1},

                    ]);
                }
                else if(x1 - (x2+w2) == 1){ 

                    // if(x1<x2){
                    //     point.push([{xpoint:x1, ypoint:y1, name:place_group[i][j][6]},
                    //         {xpoint: x1, ypoint:y1+h1}, 
                    //         {xpoint:x1+w1, ypoint:y1+h1},
                    //         {xpoint:x2, ypoint:y2+h2},
                    //         {xpoint:x2+w2, ypoint:y2+h2},
                    //         {xpoint:x2+w2, ypoint:y2},
                    //         {xpoint:x2, ypoint:y2},
                    //         {xpoint:x1+w1, ypoint:y1},
                    //         {xpoint:x1, ypoint:y1},
    
                    //     ])
                    // }
                    // else if(x1>x2){
                        point.push([{xpoint:x2, ypoint:y2, name:place_group[i][j][6], t:1},
                            {xpoint: x2, ypoint:y2+h2}, 
                            {xpoint:x2+w2, ypoint:y2+h2},
                            {xpoint:x1, ypoint:y1+h1},
                            {xpoint:x1+w1, ypoint:y1+h1},
                            {xpoint:x1+w1, ypoint:y1},
                            {xpoint:x1, ypoint:y1},
                            {xpoint:x2+w2, ypoint:y2},
                            {xpoint:x2, ypoint:y2},
    
                        ])
                    // }
                    // points.push([[x1, y1], [x1, y1+h1],[x1+w1, y1+h1], [x2, y2+h2], [x2+w2, y2+h2], [x2+w2, y2], [x2, y2], [x1+w1, y1], [x1, y1]]);
                }
                else if(x2 - (x1+w1) == 1){
                    point.push([{xpoint:x1, ypoint:y1, name:place_group[i][j][6]},
                        {xpoint: x1, ypoint:y1+h1}, 
                        {xpoint:x1+w1, ypoint:y1+h1},
                        {xpoint:x2, ypoint:y2+h2},
                        {xpoint:x2+w2, ypoint:y2+h2},
                        {xpoint:x2+w2, ypoint:y2},
                        {xpoint:x2, ypoint:y2},
                        {xpoint:x1+w1, ypoint:y1},
                        {xpoint:x1, ypoint:y1},

                    ])
                }
                else{
                    if(y1<y2){
                        point.push([{xpoint:x1, ypoint:y1, name:place_group[i][j][6], t:2},
                            {xpoint: x1, ypoint:y1+h1},
                            {xpoint:x2, ypoint:y2},
                            {xpoint:x2, ypoint:y2+h2},
                            {xpoint:x2+w2, ypoint:y2+h2},
                            {xpoint:x2+w2, ypoint:y2},
                            {xpoint:x1+w1, ypoint:y1+h1},
                            {xpoint:x1+w1, ypoint:y1},
                            {xpoint:x1, ypoint:y1},

                        ])
                        // points.push([[x1, y1], [x1, y1+h1], [x2, y2], [x2, y2+h2], [x2+w2, y2+h2], [x2+w2, y2], [x1+w1, y1+h1], [x1+w1, y1], [x1, y1]]);
                    }
                    else{
                        point.push([{xpoint:x2, ypoint:y2, name:place_group[i][j][6], t:3},
                            {xpoint: x2, ypoint:y2+h2},
                            {xpoint:x1, ypoint:y1},
                            {xpoint:x1, ypoint:y1+h1},
                            {xpoint:x1+w1, ypoint:y1+h1},
                            {xpoint:x1+w1, ypoint:y1},
                            {xpoint:x2+w2, ypoint:y2+h2},
                            {xpoint:x2+w2, ypoint:y2},
                            {xpoint:x2, ypoint:y2},

                        ])
                        // points.push([[x2, y2], [x2, y2+h2], [x1, y1], [x1, y1+h1], [x1+w1, y1+h1], [x1+w1, y1], [x2+w2, y2+h2], [x2+w2, y2], [x2, y2]]);
                    }
                }
            }
        }
    }

    for(i=0;i<place_group.length;i++){
        points.push([]);
    }
  
    //尝试新的思路绘制路线
    let points_num = 0;
    for(i=0;i<place_group.length;i++){
        if(place_group[i].length > 1){
            var x1 = eventdistance * (place_group[i][0][1] + 1) + 100 - 2;
            var y1 = place_group[i][0][3] - 2;
            var w1 = eventdistance * (place_group[i][0][2] + 1) - eventdistance * (place_group[i][0][1] + 1) + 4;
            var h1 = place_group[i][0][4] - place_group[i][0][3] + 4;
            points[points_num].push({xpoint: x1, ypoint: y1, name:place_group[i][0][6]});
            points[points_num].push({xpoint: x1, ypoint:y1+h1});

            for(j=1;j < place_group[i].length;j++){

                var x1 = eventdistance * (place_group[i][j][1] + 1) + 100 - 2;
                var y1 = place_group[i][j][3] - 2;
                var w1 = eventdistance * (place_group[i][j][2] + 1) - eventdistance * (place_group[i][j][1] + 1) + 4;
                var h1 = place_group[i][j][4] - place_group[i][j][3] + 4;

                var x2 = eventdistance * (place_group[i][j-1][1] + 1) + 100 - 2;   
                var y2 = place_group[i][j-1][3] - 2;
                var w2 = eventdistance * (place_group[i][j-1][2] + 1) - eventdistance * (place_group[i][j-1][1] + 1) + 4;
                var h2 = place_group[i][j-1][4] - place_group[i][j-1][3] + 4;
                
                if(x1 > x2){
                    
                    if(x1 - x2 - w2 > 5){  //判断是否中间夹杂着事件， 使用check_event函数进行检查
                        points[points_num].push({xpoint: x2+w2, ypoint:y2+h2});
                        points[points_num].push({xpoint: x1, ypoint: y1+h1});
                        points[points_num].push({xpoint: x1+w1, ypoint:y1+h1});
                    }
                    else{
                        points[points_num].push({xpoint: x2+w2, ypoint:y2+h2});
                        points[points_num].push({xpoint: x1, ypoint: y1});
                        points[points_num].push({xpoint: x1, ypoint: y1+h1});
                    }
                                        
                }
                else{
                    if(x2- x1 - w1 > 5){
                        points[points_num].push({xpoint: x1+w1, ypoint:y1+h1});
                        points[points_num].push({xpoint: x1, ypoint: y1+h1});
                        points[points_num].push({xpoint: x1+w1, ypoint:y1+h1});
                    }
                    else{
                        points[points_num].push({xpoint: x1, ypoint: y1});
                        points[points_num].push({xpoint: x1, ypoint: y1+h1}); 
                    }
                    
                }
                if(j == place_group[i].length-1){
                    points[points_num].push({xpoint: x1+w1, ypoint: y1+h1});
                    points[points_num].push({xpoint: x1+w1, ypoint: y1}); 
                }   
            }
            for(j=place_group[i].length-2;j >= 0;j--){
                var x1 = eventdistance * (place_group[i][j][1] + 1) + 100 - 2;
                var y1 = place_group[i][j][3] - 2;
                var w1 = eventdistance * (place_group[i][j][2] + 1) - eventdistance * (place_group[i][j][1] + 1) + 4;
                var h1 = place_group[i][j][4] - place_group[i][j][3] + 4;

                var x2 = eventdistance * (place_group[i][j+1][1] + 1) + 100 - 2;   
                var y2 = place_group[i][j+1][3] - 2;
                var w2 = eventdistance * (place_group[i][j+1][2] + 1) - eventdistance * (place_group[i][j+1][1] + 1) + 4;
                var h2 = place_group[i][j+1][4] - place_group[i][j+1][3] + 4;
                
                if(x2 > x1+w1){
                    // console.log(x2, x1, w1);
                    if(x2 - x1 - w1 > 5){
                        points[points_num].push({xpoint: x1+w1, ypoint: y1});
                        points[points_num].push({xpoint: x1, ypoint: y1});
                        points[points_num].push({xpoint: x1, ypoint: y1+h1});
                        points[points_num].push({xpoint: x2+w2, ypoint:y2+h2});
                    }
                    else{
                        points[points_num].push({xpoint: x2, ypoint:y2});
                        points[points_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points[points_num].push({xpoint: x1+w1, ypoint: y1}); 
                    }                   
                }
                else{
                    points[points_num].push({xpoint: x1+w1, ypoint: y1+h1});
                    points[points_num].push({xpoint: x1+w1, ypoint: y1}); 
                }   
            }
            var x1 = eventdistance * (place_group[i][0][1] + 1) + 100 - 2;
            var y1 = place_group[i][0][3] - 2;
            var w1 = eventdistance * (place_group[i][0][2] + 1) - eventdistance * (place_group[i][0][1] + 1) + 4;
            var h1 = place_group[i][0][4] - place_group[i][0][3] + 4;
            points[points_num].push({xpoint: x1, ypoint: y1});
            points_num++;
        }
    }

    //尝试新思路绘制多边形 
    var points1 = new Array();   
    var points1_num = 0;
    for(i=0;i<place_group.length;i++){
        if(place_group[i].length > 1){
            points1[points1_num] = new Array();
        
            var x1 = eventdistance * (place_group[i][0][1] + 1) + 100 - 2;
            var y1 = place_group[i][0][3] - 2;
            var w1 = eventdistance * (place_group[i][0][2] + 1) - eventdistance * (place_group[i][0][1] + 1) + 4;
            var h1 = place_group[i][0][4] - place_group[i][0][3] + 4;
            points1[points1_num].push({xpoint: x1, ypoint: y1, name: place_group[i][0][6]});
            points1[points1_num].push({xpoint: x1, ypoint: y1+h1});

            for(j=1;j<place_group[i].length;j++){

                var x2 = eventdistance * (place_group[i][j][1] + 1) + 100 - 2;
                var y2 = place_group[i][j][3] - 2;
                var w2 = eventdistance * (place_group[i][j][2] + 1) - eventdistance * (place_group[i][j][1] + 1) + 4;
                var h2 = place_group[i][j][4] - place_group[i][j][3] + 4;

                var x1 = eventdistance * (place_group[i][j-1][1] + 1) + 100 - 2;   
                var y1 = place_group[i][j-1][3] - 2;
                var w1 = eventdistance * (place_group[i][j-1][2] + 1) - eventdistance * (place_group[i][j-1][1] + 1) + 4;
                var h1 = place_group[i][j-1][4] - place_group[i][j-1][3] + 4;

                if(y2 < y1+h1){
                    
                    points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                    points1[points1_num].push({xpoint: x2, ypoint: y2+h2});

                }
                else{
                    if(x2 - (x1+w1) <= 0){
                        points1[points1_num].push({xpoint: x2, ypoint: y2});
                        points1[points1_num].push({xpoint: x2, ypoint: y2+h2});
                        
                    }
                    else{
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points1[points1_num].push({xpoint: x2, ypoint: y2});
                        points1[points1_num].push({xpoint: x2, ypoint: y2+h2});

                    }
                }
                if(j == place_group[i].length-1){
                    points1[points1_num].push({xpoint: x2+w2, ypoint: y2+h2});
                    points1[points1_num].push({xpoint: x2+w2, ypoint:y2});
                } 
            }
            
            for(j = place_group[i].length-2;j>=0;j--){
                var x2 = eventdistance * (place_group[i][j+1][1] + 1) + 100 - 2;
                var y2 = place_group[i][j+1][3] - 2;
                var w2 = eventdistance * (place_group[i][j+1][2] + 1) - eventdistance * (place_group[i][j+1][1] + 1) + 4;
                var h2 = place_group[i][j+1][4] - place_group[i][j+1][3] + 4;

                var x1 = eventdistance * (place_group[i][j][1] + 1) + 100 - 2;   
                var y1 = place_group[i][j][3] - 2;
                var w1 = eventdistance * (place_group[i][j][2] + 1) - eventdistance * (place_group[i][j][1] + 1) + 4;
                var h1 = place_group[i][j][4] - place_group[i][j][3] + 4;

                if(y2 < y1+h1){
                    // if(x1 > x2){

                    // }
                    // else{

                    // }
                    if(Math.abs(x2 - (x1+w1)) > 5){
                        points1[points1_num].push({xpoint: x2, ypoint: y2});
                        points1[points1_num].push({xpoint: x2, ypoint: y2+h2});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1});


                    }
                    else{
                        points1[points1_num].push({xpoint: x2, ypoint: y2});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1});

                    }
                }
                else{
                    // console.log(x1+w1, x2)
                    if(x2 <= (x1+w1)){
                        // console.log(1);
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1});
                        
                    }
                    else{
                        points1[points1_num].push({xpoint: x2, ypoint: y2})
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
                        points1[points1_num].push({xpoint: x1+w1, ypoint: y1});
                    }
                }
                if(j == 0){
                    points1[points1_num].push({xpoint: x1, ypoint: y1});
                }
            }
            points1_num++;
        }
        else if(place_group[i].length == 1){
            points1[points1_num] = new Array();
            var x1 = eventdistance * (place_group[i][0][1] + 1) + 100 - 2;
            var y1 = place_group[i][0][3] - 2;
            var w1 = eventdistance * (place_group[i][0][2] + 1) - eventdistance * (place_group[i][0][1] + 1) + 4;
            var h1 = place_group[i][0][4] - place_group[i][0][3] + 4;
            points1[points1_num].push({xpoint: x1, ypoint: y1, name: place_group[i][0][6]});
            points1[points1_num].push({xpoint: x1, ypoint: y1+h1});
            points1[points1_num].push({xpoint: x1+w1, ypoint: y1+h1});
            points1[points1_num].push({xpoint: x1+w1, ypoint: y1});
            points1[points1_num].push({xpoint: x1, ypoint: y1});
            points1_num++
        }
    }

    // console.log(points, "points");
    // console.log(point, "point");
    // console.log(points1, "points1");
    var points_result = new Array();

    for(i=0;i<points_num;i++){
        points_result[i] = points[i];
    }
    // console.log(points_result, "points_result");
    points.length = points_num;
    var Gen1 = d3.line()
                .x((p) => p.xpoint)
                .y((p) => p.ypoint)
                .curve(d3.curveCardinal.tension(0.75));

    let place_color_num = 0;
    for(i=0;i<points1.length;i++){
        storyLineG.append("path")
                .attr("id", i)
                .attr("d", Gen1(points1[i]))
                .attr("stroke", "black")
                .attr("stroke-width", "0px")
                .attr("stroke-opacity", 1)
                .attr("fill", function(d){
                    if(i > 1){
                        if(points1[i][0].name != points1[i-1][0].name){
                            place_color_num++;
                        }
                        console.log(place_color_num);
                        return time_color[place_color_num];
                    }
                    else{
                        return time_color[0];
                    }
                })
                .attr("opacity", 0.2);
        storyLineG.append("rect")
            .attr("id", 12)
            .attr("x", points1[i][0].xpoint)
            .attr("y", points1[i][0].ypoint)
            .attr("width", points1[i][0].name.length * 0.7)
            .attr("rx", 0.3)
            .attr("ry", 0.3)
            .attr("height", 1.5)
            .attr("fill", "white")
            .attr("opacity", 0.9)
        storyLineG.append("text")
            .attr("id", rect_event[i][7])
            .attr("x", points1[i][0].xpoint + 0.1)
            .attr("y", points1[i][0].ypoint + 1)
            .style('font-weight', 1)
            .style('font-family', 'Arial')
            .style('font-size', 1.5)
            .style('fill', "black")
            .text(points1[i][0].name);
        
        
    // }
    }
    
    // for(i=0;i<points1.length;i++){
    //     for(j=0;j<points1[i].length;j++){
    //         storyLineG.append("path")
    //         .attr("id", points1[i][0].name)
    //         .attr("d", Gen1(points1[i]))
    //         // .attr("x1", points1[i][j-1].xpoint)
    //         // .attr("x2", points1[i][j].xpoint)
    //         // .attr("y1", points1[i][j-1].ypoint)
    //         // .attr("y2", points1[i][j].ypoint)
    //         .attr("stroke", "black")
    //         .attr("stroke-width", "0px")
    //         .attr("stroke-opacity", 0.5)
    //         .attr("fill", time_color[i])
    //         .attr("opacity", 0.6);
    //     }

    

    // for(i=0;i<point.length;i++){
    //     storyLineG.append("path")
    //             .attr("id", i)
    //             .attr("d", Gen1(point[i]))
    //             .attr("fill", "none")
    //             .attr("stroke", "black")
    //             .attr("stroke-width", "0px")
    //             .attr("stroke-opacity", 1)
    //             .attr("fill", function(d){
    //                 for(j=0;j<place_array.length;j++){
    //                     if(place_array[j] == point[i][0].name){
    //                         return time_color[j];
    //                     }
    //                 }
    //                 // if(i>1){
    //                 //     if(points_result[i][0].name == point[i-1][0].name){
    //                 //         return time_color[i-1];
    //                 //     }
    //                 // }
    //                 // return time_color[i];
    //             })
    //             .attr("opacity", 0.6);
    // }
    var font_weight = 400;
    var font_size = 2;

    //事件框生成
    for (i = 0; i < rect_event.length; i++) {
        
        storyLineG.append("text")
                    // .attr("id", "legend_Time_text")
                    .attr("x", eventdistance * (rect_event[i][1] + 1) + 100)
                    .attr("y", rect_event[i][3] - 2)
                    .attr("text-anchor", "start")
                    .attr("font-weight", font_weight)
                    .attr("font-size", font_size)
                    .style("fill", "black")
                    .text(rect_event[i][0]);
        
        
        storyLineG.append("rect")
            .attr("id", i)
            .attr("x", eventdistance * (rect_event[i][1] + 1) + 100 - 2)
            .attr("y", rect_event[i][3] - 2)
            .attr("width", eventdistance * (rect_event[i][2] + 1) - eventdistance * (rect_event[i][1] + 1) + 4)
            .attr("height", rect_event[i][4] - rect_event[i][3] + 4)
            .attr("rx", 1.5)
            .attr("ry", 1.5)
            .style("fill", function(d){
                if(rect_event[i][7] == "one day" || rect_event[i][7] == " one day"){
                    
                    storyLineG.append("rect")
                        .attr("id", 12)
                        .attr("x", eventdistance * (rect_event[i][2] + 1) + 100 - 0.5 * rect_event[i][7].length)
                        .attr("y", rect_event[i][4]-1.1)
                        .attr("width", rect_event[i][7].length*0.8)
                        .attr("rx", 0.3)
                        .attr("ry", 0.3)
                        .attr("height", 1.5)
                        .attr("fill", "white")
                        .attr("opacity", 0.9)
                    storyLineG.append("text")
                        .attr("id", rect_event[i][7])
                        .attr("x", eventdistance * (rect_event[i][2] + 1) + 100 - 0.5 * rect_event[i][7].length)
                        .attr("y", rect_event[i][4])
                        .style('font-weight', 1)
                        .style('font-family', 'Arial')
                        .style('font-size', 1.5)
                        .style('fill', "black")
                        .text(rect_event[i][7]); 
                    
                    // storyLineG.append("rect")
                    //     .attr("id", 1)
                    //     .attr("x", eventdistance * (rect_event[i][2] + 1) + 100 -2)
                    //     .attr("y", rect_event[i][4] + 2)
                    //     .attr("width", )
                    //     .attr("height", )
                    //     .attr("rx", 1)
                    //     .attr("ry", 1)
                    //     .style("fill", );
                    return "red";
                }
                else{
                    return RectFilledColor;
                }
            })
            .style("opacity", 0.2)
            .on("click", function (d) {
                var click_key = parseInt(this.id);//记录被点击的rect值
                if (click_flag[click_key] == 0) {
                    //词云
                    // {
                    //     d3.select("body")
                    //         .append("div")
                    //         .attr("id", "WordCloud" + this.id)
                    //         .attr("class", "WordCloud")
                    //         .style("opacity", 0)
                    //         .style("width", "150px")
                    //         .style("height", "150px");
                    //     d3.select("#WordCloud" + this.id)
                    //         .style("opacity", 1)
                    //         .style("left", d.x - 60 + "px")
                    //         .style("top", d.y - 180 + "px")
                    //         .style("position", 'fixed');
                    //     var line_x = d.x - 35;
                    //     var line_y = d.y - 120;


                    //     var newObj = new Array();
                    //     //划线字符串
                    //     CreateWordCloudData(rect_event[parseInt(this.id)][5], 20, 20)
                    //     //全文字符串
                    //     var pageStr = ''
                    //     for (i = rect_event[parseInt(this.id)][1]; i <= rect_event[parseInt(this.id)][2]; i++) {
                    //         pageStr += textArray[i]
                    //     }
                    //     CreateWordCloudData(pageStr, 10, 0)
                    //     function CreateWordCloudData(str, weight, offset) {
                    //         var expression = /[\　|\/\r|\/\n\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\n|\t|\，|\。|\！|\？|\：|\；|\“|\”]/g;
                    //         str = str.replace(expression, ",");
                    //         var wordList = str.split(',').filter(Boolean);
                    //         var length = wordList.length;
                    //         for (i = 0; i < length; i++) {
                    //             var objectCounter = {};
                    //             objectCounter.name = wordList[i];
                    //             objectCounter.value = Math.random() * weight + offset;
                    //             newObj.push(objectCounter);
                    //         }
                    //     }
                    //     var myChart = echarts.init(document.getElementById("WordCloud" + this.id));
                    //     var option = {
                    //         tooltip: {
                    //             show: false
                    //         },
                    //         series: [{
                    //             type: 'wordCloud',
                    //             //maskImage: maskImage,
                    //             sizeRange: [14, 24],
                    //             rotationRange: [0, 0],
                    //             rotationStep: 45,
                    //             gridSize: 2,
                    //             shape: 'pentagon',
                    //             width: '100%',
                    //             height: '80%',
                    //             left: 'center',
                    //             top: 'center',
                    //             textStyle: {
                    //                 normal: {
                    //                     color: function () {
                    //                         return 'rgb(' + [
                    //                             Math.round(Math.random() * 160),
                    //                             Math.round(Math.random() * 160),
                    //                             Math.round(Math.random() * 160)
                    //                         ].join(',') + ')';
                    //                     },
                    //                     fontFamily: 'sans-serif',
                    //                     fontWeight: 'normal'
                    //                 },
                    //                 emphasis: {
                    //                     shadowBlur: 10,
                    //                     shadowColor: '#333'
                    //                 }
                    //             },
                    //             data: newObj.slice(0, 20)
                    //         }]
                    //     };
                    //     // 使用刚指定的配置项和数据显示图表。
                    //     myChart.setOption(option);
                    //     var defs = storyLineG.append("defs");
                    //     var arrowMarker = defs.append("marker")
                    //         .attr("id", "arrow")
                    //         .attr("markerUnits", "strokeWidth")
                    //         .attr("markerWidth", 12)
                    //         .attr("markerHeight", 12)
                    //         .attr("viewBox", "0 0 12 12")
                    //         .attr("refX", 6)
                    //         .attr("refY", 6)
                    //         .attr("orient", "auto");
                    //     x2 = parseInt(this.attributes.x.value) + parseInt(this.attributes.width.value);
                    //     y2 = parseInt(this.attributes.y.value);
                    //     // console.log(this.attributes);
                    //     // console.log(d);
                    //     var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
                    //     arrowMarker.append("path")
                    //         .attr("d", arrow_path)
                    //         .attr("fill", "#000");
                    //     //指向词云的线
                    //     var line_append_X = 40;
                    //     svg_height1 = 0;
                    //     if(height == 370){
                    //         svg_height1 = 170;
                    //     }

                    //     var line = Svg.append("line")
                    //         .attr("id", "line" + this.id)
                    //         .attr("x1", line_x + 40)
                    //         .attr("y1", line_y - 220 - svg_height1)
                    //         .attr("x2", event.x)
                    //         .attr("y2", event.y - 313 - svg_height1)
                    //         .attr("stroke", "blue")
                    //         .attr("stroke-width", 1)
                    //         // .attr("marker-start","url(#arrow)")
                    //         .attr("marker-end", "url(#arrow)");
                        
                    //     dragFunc("WordCloud" + this.id, "line" + this.id, scale, SvgTransformK);
                    // }
                    //fragment panel
                    {
                        // closeFragmentPanel()
                        var fragment = sessionListSL.find((elem) => {
                            return elem[0] === rect_event[parseInt(this.id)][0]
                        })
                        console.log(fragment);
                        curSessionID = fragment[7]
                        session = sessionList.find(elem => {
                            return elem._id === curSessionID
                        })
                        page = fragment[1]
                        jumpPage(page)
                        var data = [
                            {
                                event_number:fragment[0],
                                page_start:page = fragment[1],
                                page_end:page = fragment[1]+fragment[2],
                                persons:fragment[3],
                                place:fragment[4],
                                time:fragment[6],
                                event:fragment[5]
                            }
                        ]
                        var persons_array = entityDict 
                        var page_max = totalPageNum
                        drawFragmentView(data,persons_array,page_max)
                        // openFragmentPanel()
                    }
                    //text summarization
                    {
                        if(isTsEnable){
                            var summarizationText = ''
                            for(var i = fragment[1]; i <= fragment[1]+fragment[2]; i++){
                                summarizationText+=textArray[i]
                            }
                            var summarizationRes = summarization(summarizationText)
                            console.log(summarizationRes);
                        }
                    }
                    // console.log('openFragmentPanel');
                    click_flag[click_key] = 1;
                    // console.log(click_flag,click_key);

                }
                else {
                    d3.select("#WordCloud" + this.id)
                        .remove();
                    d3.select("#line" + this.id)
                        .remove();
                    click_flag[click_key] = 0;
                    // clear canvas
                    _g.clearRect(0, 0, _rc.width, _rc.height);
                    // clear textdom bg
                    var textdoms = document.getElementsByClassName('text-bg')
                    var textdomsNum = textdoms.length
                    for (var i = 0; i < textdomsNum; i++) {
                        textdoms[0].classList.remove('text-bg')
                    }

                    session = new Session()
                    // closeFragmentPanel()
                }
            })
            .on("mouseover", function (d) {
                var x = d.x;
                var y = d.y;
                //内容显示
                if (tooltip) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                    tooltip.html(rect_event[parseInt(this.id)][0])
                        .style("left", x + "px")
                        .style("top", y + "px");
                }
                this.style.opacity = 0.4;

            })
            .on("mouseout", function (d) {
                if (tooltip) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                }
                this.style.opacity = 0.2;
            });
        minMapG.append("rect")
            .attr("id", i)
            .attr("x", (5 * (rect_event[i][1] + 1) + 100 - 2) / scale)
            .attr("y", (rect_event[i][3] - 2) / scale)
            .attr("width", (5 * (rect_event[i][2] + 1) - 5 * (rect_event[i][1] + 1) + 4) / scale)
            .attr("height", (rect_event[i][4] - rect_event[i][3] + 4) / scale)
            .attr("rx", 1.5 / scale)
            .attr("ry", 1.5 / scale)
            .style("fill", RectFilledColor)
            .style("opacity", 0.2)
    }


    ////////////////////////////////////////////////////////////////////////////////
    //
    //
    //
    //
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    //
    //
    //
    //
    ////////////////////////////////////////////////////////////////////////////////

    var keytips = new Array();
    keytips.push(2500, 0, 2500, 0);
    for (i = 0; i < line_array.length; i++) {
        if (line_array[i][0] < keytips[0]) {
            keytips[0] = line_array[i][0];
        }
        if (line_array[i][0] > keytips[1]) {
            keytips[1] = line_array[i][0];
        }
        if (line_array[i][1] < keytips[2]) {
            keytips[2] = line_array[i][1];
        }
        if (line_array[i][1] > keytips[3]) {
            keytips[3] = line_array[i][1];
        }
    }
    //leftX,rightX表故事线左右两边
    // var framEdgeWidth = keytips[0] / 2
    leftX = 0;
    rightX = keytips[1] + keytips[0];
    topY = keytips[2] - 10;
    bottomY = keytips[3] + 10;
    // leftLineX = leftX;
    // transformx = -leftX * SvgTransformK
    rightLineX = rightX;
    transformx = -leftX * SvgTransformK
    leftBoundary = leftX
    var rectHeight = bottomY - topY;
    d3.select("#minMapBackGround")
        .attr("x", leftX)
        .attr("width", minMapWidth)
        .attr('y', topY).attr('height', rectHeight)
    const storyLineGZoom = d3.zoom()
        .scaleExtent([(width / (Math.max(rightBoundary, rightX) - leftBoundary)), height / rectHeight])
        .translateExtent([[-300, -300], [width * height / rectHeight, height * height / rectHeight]])
        .on("start", zoomStart)
        .on("zoom", storyLineGZoomed)
        .on("end", writeTransform)

    var transformx1 = 0;
    var transformStartX = 0;
    var transformStartY = 0;
    //记录当前鼠标导致的倍率变化
    var OldTransformK = 1;
    //移动限制变量
    var storylineMoveX = 0;
    //适应修改 0-未修改 1-已修改
    var fixBool = 0;
    function zoomStart() {
        transformStartX = event.x;
        transformStartY = event.y;
        transformx1 = transformStartX;
    }
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    var OldFramWidth = 0
    var PercentTranform = 0
    var transformFix = 0
    var mode = 0;
    function storyLineGZoomed({ transform }) {
        //缩放状况下，保证比例不突变
        storylineMoveX = event.x;

        if ((transform.k > SvgTransformK && transform.k > OldTransformK || transform.k < SvgTransformK && transform.k < OldTransformK && (mode == 0 || mode == 1))
        ) {
            mode = 1
            OldFramWidth = rightLineX - leftLineX
            PercentTranform = event.x / width
            SvgTransformK = transform.k;
            transformFix = PercentTranform * OldFramWidth * (1 - OldTransformK / transform.k);
            computeY()
            storylineMoveX = event.x;
            //中心放大
            // if ((leftLineX + transformFix)) {
            // storyLineG
            //     .attr("transform", "translate(" + [-(leftLineX + transformFix) * SvgTransformK, recommandY] + ")scale(" + SvgTransformK + ")")
            drawFramAndStoryLineMove(SvgTransformK, -(leftLineX + transformFix) * SvgTransformK)
            // transformx1 = -(leftLineX + transformFix) * SvgTransformK
            // }
            for (i = 0; i < click_flag.length; i++) {
                if (click_flag[i] == 1) {
                    d3.select("#WordCloud" + i).remove();
                    d3.select("#line" + i).remove();
                    click_flag[i] = 0;
                }
            }
        }

        //限制移动范围
        else if ((mode == 0 || mode == 2) && (storylineMoveX != transformStartX)) {
            mode = 2
            if ((width - (transformx + storylineMoveX - transformStartX) > Math.max(rightBoundary, rightX) * SvgTransformK)
                || -(transformx + storylineMoveX - transformStartX) < leftBoundary * SvgTransformK
                || -(transformx + storylineMoveX - transformStartX) > rightX * SvgTransformK) {
                storylineMoveX = transformx1;
                console.log("something wrong");
            }
            drawFramAndStoryLineMove(SvgTransformK, transformx + storylineMoveX - transformStartX)
            transformx1 = storylineMoveX;
            for (i = 0; i < click_flag.length; i++) {
                if (click_flag[i] == 1) {
                    d3.select("#WordCloud" + i).remove();
                    d3.select("#line" + i).remove();
                    click_flag[i] = 0;
                }
            }
        }
        zoomFix()

        OldTransformK = transform.k


    }
    function zoomFix() {
        if (rightLineX > Math.max(rightBoundary, rightX)) {
            // console.log("rightLineX, transformx")
            // console.log(rightLineX, transformx);

            leftLineX = Math.max(rightBoundary, rightX) - (rightLineX - leftLineX)
            rightLineX = Math.max(rightBoundary, rightX)

            drawFramAndStoryLineMove(SvgTransformK, -leftLineX * SvgTransformK)
        }
        if (leftLineX < leftBoundary) {
            // console.log("leftLineX, transformx")
            // console.log(leftLineX, transformx);

            leftLineX = leftBoundary
            rightLineX = rightLineX - leftLineX
            drawFramAndStoryLineMove(SvgTransformK, -leftLineX * SvgTransformK)
        }

        if (leftLineX > rightX) {
            leftLineX = rightX
            rightLineX = rightLineX - leftLineX
            drawFramAndStoryLineMove(SvgTransformK, -leftLineX * SvgTransformK)
        }
    }
    function writeTransform() {
        transformx = -leftLineX * SvgTransformK
        mode = 0;
        // console.log("Zoom:" + transformx)
    }
    function drawFramAndStoryLineMove(k, x) {
        leftLineX = -x / k;
        rightLineX = (width - x) / k;
        d3.select("#leftLine")
            .attr("x", -x / k)
        d3.select("#rightLine")
            .attr("x", (width - x) / k)
        d3.select("#leftDragRect")
            .attr("x", leftLineX - dragRectWidth)
        d3.select("#rightDragRect")
            .attr("x", rightLineX - dragRectWidth)
        d3.select("#topLine")
            .attr("x", -x / k)
            .attr("width", width / k + lineWidth)
        d3.select("#bottomLine")
            .attr("x", -x / k)
            .attr("width", (width + lineWidth) / k + lineWidth)
        d3.select("#centerRect")
            .attr("x", -x / k)
            .attr("width", (width + lineWidth) / k + lineWidth)
        computeY()
        storyLineG
            .attr("transform", "translate(" + [x, recommandY] + ")scale(" + SvgTransformK + ")")
        adjustAxes()
        xScaleG
            .attr("transform", "translate(" + [x,] + ")")

    }

    Svg.call(storyLineGZoom)


    var drag = d3.drag()
        .on("drag", dragged)
        .on("end", writeEndTransform)
    minMapG.append("rect")
        .attr("id", "leftLine")
        .attr("width", lineWidth)
        .attr("height", rectHeight)
        .attr("x", leftX)
        .attr("y", topY)
        .attr("fill", FramColor)
        .on("mouseover", function () {
            this.style.cursor = "e-resize";
            d3.select(this).style("stroke", mouseOverColor)
        })
        .on("mouseout", function () {
            this.style.cursor = "default";
            d3.select(this).style("stroke", dragRectColor)
        })
        .call(drag)

    minMapG.append("rect")
        .attr("id", "rightLine")
        .attr("width", lineWidth)
        .attr("height", rectHeight)
        .attr("x", rightX)
        .attr("y", topY)
        .attr("fill", FramColor)
        .on("mouseover", function () {
            this.style.cursor = "e-resize";
            d3.select(this).style("stroke", mouseOverColor)
        })
        .on("mouseout", function () {
            this.style.cursor = "default";
            d3.select(this).style("stroke", dragRectColor)
        })
        .call(drag)


    //记录框变化信息
    var FramTranformX = 0;

    function dragged(event) {
        minDistance = width / (height / rectHeight)
        {
            if ((this.id == "leftLine" || this.id == "leftDragRect") && rightLineX - event.x >= minDistance
                && event.x >= leftBoundary && event.x < Math.max(rightBoundary, rightX)) {
                this.style.cursor = "e-resize"
                d3.select("#leftLine")
                    .attr("x", event.x);
                d3.select("#leftDragRect")
                    .attr("x", event.x);

                leftLineX = event.x;
            }
            else if ((this.id == "rightLine" || this.id == "rightDragRect") && event.x - leftLineX >= minDistance
                && event.x <= Math.max(rightBoundary, rightX)) {
                this.style.cursor = "e-resize"
                d3.select("#rightLine")
                    .attr("x", event.x);
                d3.select("#rightDragRect")
                    .attr("x", event.x);
                rightLineX = event.x;
            }
            // console.log("leftLineX: ", leftLineX)
            // console.log("rightLineX: ", rightLineX);
            reDrawFram()
        }
    }
    function writeEndTransform() {
        transformx = FramTranformX;
        this.style.cursor = "default"
        console.log("drag:" + transformx)
    }
    //记录框开始及结束的位置
    var startFramX = 0;
    var endFramX = 0;
    var Framdrag = d3.drag()
        .on("start", writeStartPosition)
        .on("drag", dragFram)
        .on("end", writeEndPosition)
    var moveX = 0;
    function writeStartPosition() {
        startFramX = event.x;
        startFramY = event.y;
        endFramX = startFramX;
    }
    function dragFram() {
        moveX = event.x
        var hypoLeftX = leftLineX + moveX - startFramX
        var hypoRightX = rightLineX + moveX - startFramX

        if (hypoLeftX < leftBoundary || hypoLeftX > rightX || hypoRightX > Math.max(rightBoundary, rightX)) {
            moveX = endFramX
            hypoLeftX = leftLineX + moveX - startFramX
            hypoRightX = rightLineX + moveX - startFramX
        }
        d3.select("#leftLine")
            .attr("x", hypoLeftX)
        d3.select("#leftDragRect")
            .attr("x", hypoLeftX - dragRectWidth)
        d3.select("#rightDragRect")
            .attr("x", hypoRightX - dragRectWidth)
        d3.select("#rightLine")
            .attr("x", hypoRightX)
        d3.select("#topLine")
            .attr("x", hypoLeftX)
            .attr("width", rightLineX - leftLineX + lineWidth)
        d3.select("#bottomLine")
            .attr("x", hypoLeftX)
            .attr("width", rightLineX - leftLineX + lineWidth)
        d3.select("#centerRect")
            .attr("width", rightLineX - leftLineX + lineWidth)
            .attr("x", hypoLeftX - dragRectWidth)
        endFramX = moveX;
        computeY()
        storyLineG
            .attr("transform", "translate(" + [transformx - (moveX - startFramX) * scale * SvgTransformK, recommandY] + ")scale(" + SvgTransformK + ")")

        adjustAxes()
        xScaleG
            .attr("transform", "translate(" + [transformx - (moveX - startFramX) * scale * SvgTransformK,] + ")")

        for (i = 0; i < click_flag.length; i++) {
            if (click_flag[i] == 1) {
                d3.select("#WordCloud" + i).remove();
                d3.select("#line" + i).remove();
                click_flag[i] = 0;
            }
        }
    }
    function writeEndPosition() {
        leftLineX += endFramX - startFramX;
        rightLineX += endFramX - startFramX;
        transformx = transformx - (moveX - startFramX) * scale * SvgTransformK
        console.log("draw Fram:" + transformx)
    }
    function reDrawFram() {
        d3.select("#topLine").remove()
        d3.select("#bottomLine").remove()
        d3.select("#leftDragRect").remove()
        d3.select("#rightDragRect").remove()
        d3.select("#centerRect").remove()
        var centerRectWidth = rightLineX - leftLineX;
        minMapG.append("rect")
            .attr("id", "topLine")
            .attr("width", centerRectWidth + lineWidth)
            .attr("height", topLineHeight)
            .attr("x", leftLineX)
            .attr("y", topY - topLineHeight)
            .attr("fill", FramColor)
            .attr('fill-opacity', 0.7)
            .on("mouseover", function () {
                d3.select(this).style("fill", mouseOverColor)
                this.style.cursor = "e-resize"
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", FramColor)
                this.style.cursor = "default"
            })
            .call(Framdrag)
        minMapG.append("rect")
            .attr("id", "bottomLine")
            .attr("width", centerRectWidth + lineWidth)
            .attr("height", lineWidth)
            .attr("x", leftLineX)
            .attr("y", bottomY)
            .attr("fill", FramColor)
            .attr('fill-opacity', 0.7)

        minMapG.append("rect")
            .attr("id", "centerRect")
            .attr("width", centerRectWidth + lineWidth)
            .attr("height", rectHeight)
            .attr("x", leftLineX)
            .attr("y", topY)
            .attr("fill", mouseOverColor)
            .attr('fill-opacity', 0.1)

        minMapG.append("rect")
            .attr("id", "leftDragRect")
            .attr("width", 2 * dragRectWidth + lineWidth)
            .attr("height", dragRectHeight)
            .attr("x", leftLineX - dragRectWidth)
            .attr("y", topY + (rectHeight - dragRectHeight) / 2)
            .attr("fill", "white")
            .attr("stroke", dragRectColor)
            .on("mouseover", function () {
                this.style.cursor = "e-resize";
                d3.select(this).style("stroke", mouseOverColor)
            })
            .on("mouseout", function () {
                this.style.cursor = "default";
                d3.select(this).style("stroke", dragRectColor)
            })
            .call(drag)

        minMapG.append("rect")
            .attr("id", "rightDragRect")
            .attr("width", 2 * dragRectWidth + lineWidth)
            .attr("height", dragRectHeight)
            .attr("x", rightLineX - dragRectWidth)
            .attr("y", topY + (rectHeight - dragRectHeight) / 2)
            .attr("fill", "white")
            .attr("stroke", dragRectColor)
            .on("mouseover", function () {
                this.style.cursor = "e-resize";
                d3.select(this).style("stroke", mouseOverColor)
            })
            .on("mouseout", function () {
                this.style.cursor = "default";
                d3.select(this).style("stroke", dragRectColor)
            })
            .call(drag)

        SvgTransformK = ((width) / centerRectWidth)
        computeY()
        storyLineG
            .attr("transform", "translate(" + [- leftLineX * SvgTransformK * scale, recommandY] + ")scale(" + (SvgTransformK) + ")")
        FramTranformX = - leftLineX * SvgTransformK * scale;

        adjustAxes()
        xScaleG
            .attr("transform", "translate(" + [- leftLineX * SvgTransformK * scale,] + ")")

        for (i = 0; i < click_flag.length; i++) {
            if (click_flag[i] == 1) {
                d3.select("#WordCloud" + i).remove();
                d3.select("#line" + i).remove();
                click_flag[i] = 0;
            }
        }

    }
    function computeY() {
        // recommandY = - (bottomY - topY) * SvgTransformK / 2
        recommandY = ((height - rectHeight * SvgTransformK) / 2 - topY * SvgTransformK)
    }
    var xScaleG = Svg.append("g")
    function adjustAxes() {

        if (xScaleOldTransformK != SvgTransformK) {
            reSizeXScale()
        }
        xScaleOldTransformK = SvgTransformK
    }
    function reSizeXScale() {

        xScaleG.selectAll("*").remove()
        
        var cy = height - 30;
        // var cy = height - 330;
        var fontSize = 12
        var textY = cy - 5
        var cr = 5
        var xScaleColor = "#879bd7"
        var unitDistance = 30
        var rectLineHeight = 5
        var endPageNum = dataresult1.length;
        // console.log(endPageNum, "endPageNum");
        xScaleG.append("rect")
            .attr("id", "xScaleLine")
            .attr("height", 1)
            .attr("width", (keytips[1] - keytips[0]) * SvgTransformK)
            .attr("x", keytips[0] * SvgTransformK)
            .attr("y", cy + cr)
            .attr("fill", xScaleColor)
            .attr('fill-opacity', 0.8)


        // var xScaleCircleNum = Math.round(((keytips[1] - keytips[0]) * SvgTransformK) / unitDistance);
        // console.log("((keytips[1] - keytips[0]) * SvgTransformK)", ((keytips[1] - keytips[0]) * SvgTransformK));
        // console.log("num", xScaleCircleNum);
        var circleDistance = (keytips[1] - keytips[0]) * SvgTransformK / endPageNum;
        // console.log("circleDistance", circleDistance);
        // console.log(keytips);
        // console.log(menuArray);
        var jiange = 10 - Math.round(SvgTransformK);
        if(jiange >= 3){
            jiange = 3;
        }
        else if(jiange > 1){
            jiange -= 1;
        }
        // console.log(SvgTransformK, "TT");
        // console.log(jiange);
        // console.log(circleDistance);
        var menuArray_num  = 1;
        var menuArray_num1 = 0;
        for (var i = 0; i < endPageNum + 1; i++) {
            if(i % jiange == 0){
                xScaleG.append("rect")
                .attr("id", "xScaleCircle" + i)
                .attr("height", rectLineHeight)
                .attr("width", 1)
                .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
                .attr("y", cy)
                .attr("fill", xScaleColor)
                .attr('fill-opacity', 0.8)

                xScaleG.append("text")
                .attr("id", "text" + i)
                .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
                .attr("y", textY)
                .attr('text-anchor', 'middle')
                .text(i)
                .attr("fill", xScaleColor)
                .attr("font-size", fontSize + "px")
            }

            if(i == Math.round((menuArray[menuArray_num1 + 1].pagenum - menuArray[menuArray_num1].pagenum) / 2) + menuArray[menuArray_num1].pagenum){
                xScaleG.append("text")
                .attr("id", "text" + i)
                .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
                .attr("y", textY + fontSize * 2)
                .attr('text-anchor', 'middle')
                .text(menuArray[menuArray_num1].title)
                .attr("fill", xScaleColor)
                .attr("font-size", fontSize / 1.1 + "px");
                menuArray_num1++;
            }

            if(i == 0){
                xScaleG.append("rect")
                .attr("id", "xScaleCircle" + i)
                .attr("height", rectLineHeight)
                .attr("width", 1)
                .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
                .attr("y", cy + rectLineHeight)
                .attr("fill", xScaleColor)
                .attr('fill-opacity', 1);
                menuArray_num++;
            }

            if(i == menuArray[menuArray_num].pagenum){
                xScaleG.append("rect")
                .attr("id", "xScaleCircle" + i)
                .attr("height", rectLineHeight)
                .attr("width", 1)
                .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
                .attr("y", cy + rectLineHeight)
                .attr("fill", xScaleColor)
                .attr('fill-opacity', 1);
                menuArray_num++;
            }

            // xScaleG.append("rect")
            //     .attr("id", "xScaleCircle" + i)
            //     .attr("height", rectLineHeight)
            //     .attr("width", 1)
            //     .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
            //     .attr("y", cy)
            //     .attr("fill", xScaleColor)
            //     .attr('fill-opacity', 0.8)

            // xScaleG.append("text")
            //     .attr("id", "text" + i)
            //     .attr("x", keytips[0] * SvgTransformK + i * circleDistance)
            //     .attr("y", textY)
            //     .attr('text-anchor', 'middle')
            //     .text(i)
            //     .attr("fill", xScaleColor)
            //     .attr("font-size", fontSize + "px")
        }
    }
    drawFramAndStoryLineMove(SvgTransformK, transformx)
    transformx = -leftLineX * SvgTransformK
    reDrawFram()
    reSizeXScale()

} 



//更新图例
function update1(legend_click){

    var legend_scale = 1;
    if (height == 380) {
        legend_scale = 2;//控制缩放比例
    }

    var legend = d3.select("#legend");
    var legendSvg_width = 150;
    var legendSvg_height = 60;
    if(sessionListSL1_flag1 == 0){
        var legendSvg = legend.append("svg")
        .attr("id", "legendSvg")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", legendSvg_width * legend_scale)
        .attr("height", legendSvg_height * legend_scale)
        .attr('transform', 'translate(20,0)');
    }
    else{
        var legendSvg = d3.select("#legendSvg");
        
    }
    //添加图例
    var sessionListSL2 = new Array();
    for(i=0;i<sessionListSL.length;i++){
        sessionListSL2[i] = sessionListSL[i];
    }
    var legendSvg = d3.select("#legendSvg");

    var legend_distancex = 60;
    var legend_distancey = 9;
    var legend_x = 0;
    var legend_y = 9;

    console.log(legend_click, "legend_click")
    for (i = 0; i < membercolor.length; i++) {
        var id1 = membercolor[i].replace(/\./g, 'z');
        legendSvg.append("rect")
            .attr("id", "l_rect" + id1)
            .attr("name", membercolor[i])
            .attr("x", legend_x * legend_scale)
            .attr("y", legend_y * legend_scale)
            .attr("width", 10 * legend_scale)
            .attr("height", 6 * legend_scale)
            .attr("fill", color[i])
            .attr("rx", 4)
            .attr("ry", 4)
            .on("click", function(d){
                //判断状态
                var classname = this.id.split('l_rect')[1];
                // console.log(classname,"classname");
                for(i=0;i<legend_click.length;i++){
                    if(legend_click[i][0] == classname){
                        if(legend_click[i][1] == 0){
                            legend_click[i][1] = 1;
                            var id1 = legend_click[i][0].replace(/\./g, 'z');
                            d3.select('#l_rect' + id1)
                                .attr("fill", "grey");
                            d3.select("#l_rect" + id1 + "text")
                                .style("fill", "grey");
                        }
                        else{
                            
                            legend_click[i][1] = 0;
                            var id1 = legend_click[i][0].replace(/\./g, 'z');
                            d3.select('#l_rect' + id1)
                                .attr("fill", color[i]);
                            d3.select("#l_rect" + id1 + "text")
                                .style("fill", color[i]);
                        }
                    }
                }
                console.log(legend_click, "lc");
                console.log(sessionListSL1, "sessionListSL1");
                for(i=0;i<sessionListSL1.length;i++){
                    sessionListSL2[i] = [sessionListSL1[i][0],
                    sessionListSL1[i][1],
                    sessionListSL1[i][2],
                    sessionListSL1[i][3],
                    sessionListSL1[i][4],
                    sessionListSL1[i][5],
                    sessionListSL1[i][6],
                    sessionListSL1[i][7],
                ]
                }

                //删除数据
                for(i=0;i<legend_click.length;i++){
                    if(legend_click[i][1] == 1){
                        var key_tips = legend_click[i][0];
                        
                        for(j=0;j<sessionListSL2.length;j++){
                            var text_results = '';
                            let text_flag = 0;
                            var text_tips = sessionListSL2[j][3].split(',');
                            for(k=0;k<text_tips.length;k++){
                                if(text_tips[k] != key_tips){
                                    if(text_flag == 0){
                                        text_results = text_results + text_tips[k];
                                        text_flag = 1;
                                    }
                                    else{
                                        text_results = text_results + ',' + text_tips[k];
                                    }
                                }
                            }
                            if(text_results != ''){
                                sessionListSL2[j][3] = text_results;
                            }
                            else{
                                sessionListSL2.splice(j, 1);
                            }
                        }
                        
                    }
                }
                console.log(legend_click, "cl");
                console.log(sessionListSL2,"sessionListSL2");

                //开始重新渲染
                drawStoryLine(sessionListSL2);

            });


        legendSvg.append("text")
            .attr("id", "l_rect" + membercolor[i] + "text")
            .attr("x", (legend_x + 12) * legend_scale)
            .attr("y", (legend_y + 5) * legend_scale)
            .style('font-weight', 1)
            .style('font-family', 'Arial')
            .style('font-size', 6 * legend_scale)
            .style('fill', color[i])
            .text(membercolor[i]);
        legend_x += 45;
        if (legend_x >= 45 * 2) {
            legend_x = 0;
            legend_y += 9
        }
    }
}
