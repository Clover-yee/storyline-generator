//辅助函数
{
    function dragFunc(id, id2){
        var Drag = document.getElementById(id);
        var Dragout=document.getElementById(id);
        var Drag_line = document.getElementById(id2);
        var Dragout_line = document.getElementById(id2);
        Dragout.onmousedown = function(event){
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX - Drag.offsetLeft;
            var disY = ev.clientY - Drag.offsetTop;
            document.onmousemove = function(event){
                var ev = event || window.event;
                Drag.style.left = ev.clientX - disX + "px";
                Drag.style.top = ev.clientY - disY + "px";
                Drag_line.attributes.x1.value = (ev.clientX - disX)*scale*SvgTransformK  + "px";
                Drag_line.attributes.y1.value = (ev.clientY - disY)*scale*SvgTransformK  +"px";
                console.log(Drag_line.attributes.x1.value, Drag_line.attributes.y1.value)
            };
        };
        Dragout.onmouseup = function(){
            document.onmousemove = null;
            Drag.style.cursor = "default";
        };
    };
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
    function mem_rank(x, y){
        return x[0]-y[0];
    }
    //排序函数
    function data1rank(x, y){
        if(x[1] == y[1]){
            return x[2]-y[2];
        }
        else{
            return x[1]-y[1];
        }
    }
    function inrank(x, y){
        if(x[2] == y[2]){
            if(x[0] == y[0]){
                return x[3]-y[3]
            }
            else{
                return x[0]-y[0];
            }
        }
        else{
            return x[2]-y[2];
        }
    }

    function rankr(x,y){
        return x[1]-y[1];
    }
    function m_rank(x,y){
        if(x[4] == y[4]){
            if(x[7] == y[7]){
                return x[5]-y[5]; 
            }
            else{
                return x[7]-y[7];
            }
        }
        else{
            return x[4]-y[4];
        }
    }
    function ascend(x,y){
        if(x[2] == y[2]){
            return x[0]-y[0];
        }
        else{
            return x[2]-y[2]; 
        }
    }


    function straight(x, y, i, j){
        k = 0;
        x_key1 = 0;
        y_key1 = 0;
        x_key2 = 0;
        y_key2 = 0;
        for(a=1;a<x.length;a++){
            if(x[a][0] != x[a-1][0]){
                k++;
                if(k==i){
                    x_key1 = a-1;
                    x_key2 = x_key1+1;
                }
            }
        }
        k = 0;
        for(a=1;a<y.length;a++){
            if(y[a][0] != y[a-1][0]){
                k++;
                if(k==i){
                    y_key1 = a-1;
                    y_key2 = y_key1+1;
                }
            }
        }
        sum = 0;
        s = new Array();
        for(a=x_key1;a<x_key2;a++){
            for(b=y_key1;b<y_key2;b++){
                if(x[a][1] == y[b][1]){
                    sum++;
                    s.push([a, b]);
                }
            }
        }
        return sum, s;
    }
    function line_array_rank2(x, y){
        if(x[3]==y[3]){
            return x[1]-y[1];
        }
        else{
            return x[3]-y[3];
        }
    }
    function Maxn(a, b, c){
        var re = a;
        if(re = a){
            re = b;
        }
        if(c>re){
            re = c;
        }
        return re;
    }
    function drawFram(k, x, y) {
        d3.select("#centerRect")
            .attr("x", -x / scale / k)
            .attr("width", width / k / scale)
        d3.select("#leftLine")
            .attr("x", -x / scale / k)
        d3.select("#rightLine")
            .attr("x", (width - x) / scale / k)
        d3.select("#topLine")
            .attr("x", -x / scale / k)
            .attr("width", width / k / scale)
        d3.select("#bottomLine")
            .attr("x", -x / scale / k)
            .attr("width", (width + lineWidth) / k / scale)
        // d3.select("#bottomLine")
        // .attr("transform", "translate(" + [transformx - * scale * SvgTransformK, transformy] +  ")")


        leftLineX = -x / scale / k;
        rightLineX = (width - x) / scale / k;


    }
    function sessionListSLInit(x,y){
        x1=x[1];
        x2=y[1];
        y1=x[2];
        y2=y[2];
        if(x1==x2){
            return (x1+y1)-(x2+y2);
        }
        else{
            return x1-x2;
        }
    }
}

function drawStoryLine(sessionListSL){
    var SvgTransformK = 1;
    var minMapFramX = 0;
    var minMapFramY = 0;
    var storyLineGX = 0;
    var storyLineGY = 0;
    var width = 1000; // 画布的宽度
    var height = 300; // 画布的高度
    var minMapWidth = 1000;
    var minMapHeight = 100;
    var liucunkongbai = 100;

    var recommandY = -50;

    var storylineView = document.getElementById('storyline-view')
    // var width = storylineView.offsetWidth; // 画布的宽度
    // var height = storylineView.offsetHeight; // 画布的高度
    // var scale = 4; // 缩放

    d3.select("#storyline-view")
    .append("svg")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", 1)

    var mainSvg = d3.select("#storyline-view")
    .attr("id", "mainMap")
    .append("svg")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 0)
    .attr("height", 0);

    var Svg = d3 // 选择文档中的body 元素
        .select("#mainMap")
        .append("svg") //添加一个SVG元素
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width) //设定宽度
        .attr("height", height) //设定高度
    var minMapSvg = d3
        .select("#mainMap")
        .append("svg")
        .attr("x", 0)
        .attr("y", height)
        .attr("width", minMapWidth) //设定宽度
        .attr("height", minMapHeight); //设定高度


    // var svg = d3.select("#storyline-view") // 选择文档中的body 元素
    //     .append("svg") //添加一个SVG元素
    //     .attr("width", width) //设定宽度
    //     .attr("height", height) //设定高度
    //     .attr("transform",`scale(${scale}) translate(300, 120)`);  //TODO

    var scale = 1;
    var storyLineG = Svg.append("g");
    //初始化边框的左右边界
    var startLeftLineX = 100;
    var startRightLineX = 400;
    var leftLineX = startLeftLineX;
    var rightLineX = startRightLineX;
    //故事线最上以及最下边的坐标
    var topY = 40;
    var bottomY = 80;
    //故事线最左及最右边的坐标
    var leftX = 0;
    var rightX = 600;
    var rectHeight = bottomY - topY;
    var minDistance = rectHeight / height * width;
    var lineWidth = 3;
    //记录故事线偏移位置,缩放比例
    var transformk = 0;
    var transformx = 0;
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
        //处理数据
        sessionListSL.sort(sessionListSLInit)
        var membercolor = new Array();
        var Rank = new Array();
        for(i=0;i<sessionListSL.length;i++){
            x1 = parseInt(sessionListSL[i][1]);
            x2 = parseInt(sessionListSL[i][2]);
            // data1.push([data[i].event, x1, x2, data[i].members]);
            if(parseInt(sessionListSL[i][1])+parseInt(sessionListSL[i][2]) > max){
                max = parseInt(sessionListSL[i][1])+parseInt(sessionListSL[i][2])
            }
            var members=sessionListSL[i][3].split(',');
            for(k=0;k<members.length;k++){
            //console.log(members[i]);
                flag=0;
                for(j=0;j<membercolor.length;j++){
                    if(membercolor[j] == members[k]){
                        flag = 1;
                    }
                }
                if(flag == 0){               
                    membercolor.push(members[k]);
                    Rank.push([members[k], Rank.length, Rank.length]);
                    memberfix.push([members[k], 0, 0]);
                    membering.push([members[k], 0]);
                    member_c.push([members[k], 0, 0]);
                    mem_end.push([members[k], 5*(x1+1), (x2+x1+1)*5]);
                }
                for(m=0;m<mem_end.length;m++){
                    if(mem_end[m][0] == members[k]){
                        if((x2+x1+1)*5 > mem_end[m][2]){
                            mem_end[m][2] = (x2+x1+1)*5;
                        }
                    }
                }
            }
        }
        //生成处理后的数据
        for(i=0;i<=max;i++){
            dataresult1.push([]);
        }  
        sessionListSL.sort(data1rank);
        console.log(sessionListSL,"sessionListSL");
        for(i=0;i<sessionListSL.length;i++){
            for(j=sessionListSL[i][1];j<=sessionListSL[i][1]+sessionListSL[i][2];j++){                    
                var object = {};
                object.event = sessionListSL[i][0];
                object.name = sessionListSL[i][3];
                dataresult1[j].push(object);
            }
        }
        console.log(dataresult1,"result1");
        console.log(Rank,"rank");
        console.log(membercolor,"color");
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
                    dataresult.push([start, end - 1, dataresult1[start][j].event, dataresult1[start][j].name])
                }
                i = end;
            }
            //开始绘制，按照dataresult  
            var cs = 10;//循环次数
            rob = 0;
            var color = [d3.rgb('#007AFF'), d3.rgb('#FFF500'), d3.rgb('#F08DB3'), d3.rgb('#FF00FF'), d3.rgb('#FF0000'), d3.rgb('#000000')]
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
                    // for (xx = 1; xx < 500; xx++) {
                    //     svg.append("line")
                    //         .attr("x1", 5 * xx)
                    //         .attr("y1", 10)
                    //         .attr("x2", 5 * xx)
                    //         .attr("y2", 2500)
                    //         .attr("stroke", "black")
                    //         .attr("stroke-width", "2px")
                    //         .attr("stroke-opacity", "0.3")
                    //         .attr("stroke-dasharray", "3 2")
                    // }

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
                                        members.length];
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
                            5 * (x1 + 1), y, 5 * (x2 + 1), y, c])

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
                            if ((Rank[r][1] - Rank[r - 1][1]) == 20) {
                                Rank[r][2] = Rank[r - 1][2] + 2;
                            }
                            if (Rank[r][1] == (Rank[r - 1][1] + 5)) {
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
                                        members.length];
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
                            5 * (x1 + 1), y, 5 * (x2 + 1), y, c])
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
                            if ((Rank[r][1] - Rank[r - 1][1]) == 20) {
                                Rank[r][2] = Rank[r - 1][2] + 2;
                            }
                            if (Rank[r][1] == (Rank[r - 1][1] + 5)) {
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
            //画线

            line_array.sort(ascend);

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
                            .curve(d3.curveCardinal);
                        storyLineG.append("path")
                            .attr("id", line_array[i][2])
                            .attr("d", Gen(reline))
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", "1px")
                            .attr("stroke-opcacity", 0.1)
                            .on("mouseover", function () {
                                this.style.stroke = "red";
                                var name = d3.select('#' + membercolor[this.id])
                                name.fill = "orange"
                            })
                            .on("mouseout", function (d) {
                                this.style.stroke = "black";
                                var name = d3.select('#' + membercolor[this.id])
                                name.fill = "black";
                            });
                        minMapSvg.append("path")
                            .attr("d", Gen(reline))
                            .attr("fill", "none")
                            .attr("stroke", "black")
                            .attr("stroke-width", 1 / scale + "px")
                            .attr("stroke-opcacity", 0.1)

                        reline.length = 0;
                    }
                }
                else {
                    var Gen = d3.line()
                        .x((p) => p.xpoint)
                        .y((p) => p.ypoint)
                        .curve(d3.curveBasis);
                    storyLineG.append("path")
                        .attr("id", line_array[i - 1][2])
                        .attr("d", Gen(reline))
                        .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", "1px")
                        .attr("stroke-opcacity", 0.1)
                        .on("mouseover", function () {
                            this.style.stroke = "red";
                        })
                        .on("mouseout", function (d) {
                            this.style.stroke = "black";
                        });
                    minMapSvg.append("path")
                        .attr("d", Gen(reline))
                        .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1 / scale + "px")
                        .attr("stroke-opcacity", 0.1)
                    reline.length = 0;
                }
                //添加故事线人物
                if (i == 1) {
                    //添加第一个故事线的名字（使用i-1）
                    var mem = line_array[i - 1][4].split('');
                    storyLineG.append("text")
                        .attr("id", line_array[i - 1][4])
                        .attr("x", line_array[i - 1][0] - mem.length * 4)
                        .attr("y", line_array[i - 1][1])
                        .style('font-weight', 1)
                        .style('font-family', 'Arial')
                        .style('font-size', 4)
                        .style('fill', color[line_array[i - 1][2]])
                        .text(line_array[i - 1][4])
                    minMapSvg.append("text")
                        .attr("x", (line_array[i - 1][0] - mem.length * 4) / scale)
                        .attr("y", (line_array[i - 1][1]) / scale)
                        .style('font-weight', 1 / scale)
                        .style('font-family', 'Arial')
                        .style('font-size', 4 / scale)
                        .style('fill', color[line_array[i - 1][2]])
                        .text(line_array[i - 1][4])
                }
                else if (line_array[i][2] != line_array[i - 1][2]) {
                    //添加后面故事线的名字
                    //使用i的坐标进行把控文本的名字
                    var mem = line_array[i][4].split('');
                    storyLineG.append("text")
                        .attr("id", line_array[i][4])
                        .attr("x", line_array[i][0] - mem.length * 5)
                        .attr("y", line_array[i][1])
                        .style('font-weight', 1)
                        .style('font-family', 'Arial')
                        .style('font-size', 4)
                        .style('fill', color[line_array[i][2]])
                        .text(line_array[i][4])
                    minMapSvg.append("text")
                        .attr("x", (line_array[i][0] - mem.length * 5) / scale)
                        .attr("y", (line_array[i][1]) / scale)
                        .style('font-weight', 1 / scale)
                        .style('font-family', 'Arial')
                        .style('font-size', 4 / scale)
                        .style('fill', color[line_array[i][2]])
                        .text(line_array[i][4])
                }
            }
            var sum = 1;
            var k = 1;
            var rect_event = new Array();
            
                for (i = 0; i < dataresult.length; i++) {
                    var mem = dataresult[i][3].split(',');
                    if (mem.length >= 2) {
                        if (k == 1) {
                            for (m = 0; m < sessionListSL.length; m++) {
                                if (sessionListSL[m][0] == dataresult[i][2]) {
                                    rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0, sessionListSL[m][5]]);
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
                                    rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0, sessionListSL[m][5]]);
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
                //存储每个点击事件
                var click_flag = new Array();
                for(i=0;i<rect_event.length;i++){
                    click_flag.push(0);
                }
                //事件框生成
                for (i = 0; i < rect_event.length; i++) {
                    storyLineG.append("rect")
                        .attr("id", i)
                        .attr("x", 5 * (rect_event[i][1] + 1) + 100 - 2)
                        .attr("y", rect_event[i][3] - 2)
                        .attr("width", 5 * (rect_event[i][2] + 1) - 5 * (rect_event[i][1] + 1) + 4)
                        .attr("height", rect_event[i][4] - rect_event[i][3] + 4)
                        .attr("rx", 1.5)
                        .attr("ry", 1.5)
                        .style("fill", "red")
                        .style("opacity", 0.2)
                        .on("click", function(d){
                            var click_key = parseInt(this.id);//记录被点击的rect值
                            if(click_flag[click_key] == 0){  
                                d3.select("body")
                                .append("div")
                                .attr("id", "WordCloud"+this.id)
                                .attr("class", "WordCloud")
                                .style("opacity", 0)
                                .style("width", "100px")
                                .style("height", "100px");
                                d3.select("#WordCloud"+this.id)
                                .style("opacity", 1)
                                .style("left", d.x - 35 + "px")
                                .style("top", d.y - 120 +"px")
                                .style("position",'fixed');
                                var line_x = d.x-35;
                                var line_y = d.y-120;
                                var str = rect_event[parseInt(this.id)][5];//输入字符串
                                var expression = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\n|\t|\，|\。|\！|\？|\：|\；|\“|\”]/g;
                                str = str.replace(expression, ",");
                                var wordList = str.split(',').filter(Boolean);
                                var length = wordList.length;
                                var ArrayWithUniqueValues = [];
                                var newObj = new Array();
                                console.log(wordList,"word")
                                for (i = 0; i < length; i++) {
                                    var objectCounter = {};
                                    objectCounter.name = wordList[i];
                                    objectCounter.value = (i+1)/length+2;
                                    newObj.push(objectCounter);
                                }
                                console.log(newObj);
                                //开始画图
                                // var propView_Content = d3.select("WordCloud");; 
                                
                                // let wordCloudDiv = propView_Content.select("#wordCloudDiv").remove();
                                // wordCloudDiv = WordCloud.insert("div", ".newObj")
                                //     .attr("id", "wordCloudDiv")
                                //     .style("height", "100%")
                                //     .style("width", wordCloudDivWidthPer + "%");
                                var myChart = echarts.init(document.getElementById("WordCloud"+this.id));
                                var option = {
                                    tooltip:{
                                        show:false
                                    },
                                    series: [{
                                        type: 'wordCloud',
                                    //maskImage: maskImage,
                                        sizeRange: [3, 10],
                                        rotationRange: [0, 0],
                                        rotationStep: 45,
                                        gridSize: 2,
                                        shape: 'pentagon',
                                        width: '100%',
                                        height: '80%',
                                        left : 'center',
                                        top : 'center',
                                        textStyle: {
                                            normal: {
                                                color: function () {
                                                    return 'rgb(' + [
                                                        Math.round(Math.random() * 160),
                                                        Math.round(Math.random() * 160),
                                                        Math.round(Math.random() * 160)
                                                    ].join(',') + ')';
                                                },
                                                fontFamily: 'sans-serif',
                                                fontWeight: 'normal'
                                            },
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowColor: '#333'
                                            }
                                        },
                                        data: newObj
                                    }]
                                };
                                // 使用刚指定的配置项和数据显示图表。
                                myChart.setOption(option);
                                var defs = storyLineG.append("defs");
                                var arrowMarker = defs.append("marker")
                                    .attr("id","arrow")
                                    .attr("markerUnits","strokeWidth")
                                    .attr("markerWidth",12)
                                    .attr("markerHeight",12)
                                    .attr("viewBox","0 0 12 12")
                                    .attr("refX",6)
                                    .attr("refY",6)
                                    .attr("orient","auto");
                                x2=parseInt(this.attributes.x.value)+parseInt(this.attributes.width.value);
                                y2=parseInt(this.attributes.y.value);
                                console.log(this.attributes);
                                console.log(d);
                                var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
                                arrowMarker.append("path")
                                    .attr("d",arrow_path)
                                    .attr("fill","#000");
                                //指向词云的线
                                var line = Svg.append("line")
                                    .attr("id", "line" + this.id)
                                    .attr("x1",line_x+100)
                                    .attr("y1",line_y)
                                    .attr("x2",x2)
                                    .attr("y2",y2)
                                    .attr("stroke","blue")
                                    .attr("stroke-width",1)
                                    // .attr("marker-start","url(#arrow)")
                                    .attr("marker-end","url(#arrow)");
                                click_flag[click_key] = 1;
                                dragFunc("WordCloud"+this.id, "line" + this.id);   
                            }
                            else{
                                d3.select("#WordCloud"+this.id)
                                .remove();
                                d3.select("#line"+this.id)
                                .remove();
                                click_flag[click_key] = 0;
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
                    minMapSvg.append("rect")
                        .attr("id", i)
                        .attr("x", (5 * (rect_event[i][1] + 1) + 100 - 2) / scale)
                        .attr("y", (rect_event[i][3] - 2) / scale)
                        .attr("width", (5 * (rect_event[i][2] + 1) - 5 * (rect_event[i][1] + 1) + 4) / scale)
                        .attr("height", (rect_event[i][4] - rect_event[i][3] + 4) / scale)
                        .attr("rx", 1.5 / scale)
                        .attr("ry", 1.5 / scale)
                        .style("fill", "red")
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
            leftX = keytips[0];
            rightX = keytips[1];
            topY = keytips[2] - 10;
            bottomY = keytips[3] + 10;
            leftLineX = leftX;
            rightLineX = rightX;
            const storyLineGZoom = d3.zoom()
                .scaleExtent([1, height / rectHeight])
                .translateExtent([[-300, -300], [width * 20, height * 20]])
                .on("start", zoomStart)
                .on("zoom", storyLineGZoomed)
                .on("end", writeTransform)

            var transformx1 = 0;
            var transformy1 = 0;
            var transformStartX = 0;
            // var transformStartY = 0;
            //记录当前鼠标导致的倍率变化
            var OldTransformK = 1;
            function zoomStart() {
                transformStartX = event.x;
                transformStartY = event.y;
            }
            function storyLineGZoomed({ transform }) {
                //放大状况
                if (transform.k > SvgTransformK && transform.k > OldTransformK) { SvgTransformK = transform.k; }
                else if (transform.k < SvgTransformK && transform.k < OldTransformK) { SvgTransformK = transform.k; }
                storyLineG
                    .attr("transform", "translate(" + [transformx + event.x - transformStartX, recommandY] + ")scale(" + SvgTransformK + ")")
                drawFram(SvgTransformK, transformx + event.x - transformStartX, transformy + event.y - transformStartY)

                transformx1 = event.x;
                OldTransformK = transform.k

            }
            function writeTransform() {
                transformx += transformx1 - transformStartX
                console.log("Zoom:" + transformx)

            }

            Svg.call(storyLineGZoom);

            var drag = d3.drag()
                .on("start", writeStartRect)
                .on("drag", dragged)
                .on("end", writeEndTransform)
            //记录初始框左右两边的位置
            var leftRectX = 0;
            var rightRectX = 0;
            //记录框变化信息
            var FramTranformX = 0;
            function writeStartRect() {
                if (leftLineX > rightLineX) {
                    rightRectX = leftLineX;
                    leftRectX = rightLineX;
                }
                else {
                    rightRectX = rightLineX;
                    leftRectX = leftLineX;
                }
            }
            function dragged() {
                if (event.x >= leftX && event.x <= rightX) {
                    if (this.id == "leftLine" && Math.abs(event.x - rightLineX) >= minDistance) {
                        d3.select(this)
                            .attr("x", event.x);
                        leftLineX = event.x;
                    }

                    else if (Math.abs(event.x - leftLineX) >= minDistance) {
                        d3.select(this)
                            .attr("x", event.x);
                        rightLineX = event.x;
                    }
                    reDrawFram()
                }
            }
            function writeEndTransform() {
                transformx = FramTranformX;
                console.log("drag:" + transformx)
            }
            //记录框开始及结束的位置
            var startFramX = 0;
            var startFramY = 0;
            var endFramX = 0;
            var endFramY = 0;
            var Framdrag = d3.drag()
                .on("start", writeStartPosition)
                .on("drag", dragFram)
                .on("end", writeEndPosition)
            function dragFram() {
                d3.select("#leftLine")
                    .attr("x", leftLineX + event.x - startFramX)
                d3.select("#rightLine")
                    .attr("x", rightLineX + event.x - startFramX)
                d3.select("#topLine")
                    .attr("x", leftLineX + event.x - startFramX)
                d3.select("#bottomLine")
                    .attr("x", leftLineX + event.x - startFramX)
                d3.select("#centerRect")
                    .attr("x", leftLineX + event.x - startFramX)
                endFramX = event.x;
                endFramY = event.y;
                storyLineG
                    .attr("transform", "translate(" + [transformx - (event.x - startFramX) * scale * SvgTransformK, recommandY] + ")scale(" + SvgTransformK + ")")

            }
            function writeStartPosition() {
                startFramX = event.x;
                startFramY = event.y;
            }
            function writeEndPosition() {
                leftLineX += endFramX - startFramX;
                rightLineX += endFramX - startFramX;
                transformx = transformx - (event.x - startFramX) * scale * SvgTransformK
                console.log("draw Fram:" + transformx)

            }
            function reDrawFram() {
                d3.select("#topLine").remove()
                d3.select("#bottomLine").remove()
                d3.select("#centerRect").remove()
                var max = 0;
                var min = 0;
                if (leftLineX > rightLineX) {
                    max = leftLineX;
                    min = rightLineX;
                }
                else {
                    max = rightLineX;
                    min = leftLineX;
                }
                minMapSvg.append("rect")
                    .attr("id", "topLine")
                    .attr("width", Math.abs(max - min))
                    .attr("height", 1)
                    .attr("x", min)
                    .attr("y", topY)
                    .attr("fill", "black")
                minMapSvg.append("rect")
                    .attr("id", "bottomLine")
                    .attr("width", Math.abs(max - min))
                    .attr("height", 1)
                    .attr("x", min)
                    .attr("y", bottomY)
                    .attr("fill", "black")

                minMapSvg.append("rect")
                    .attr("id", "centerRect")
                    .attr("width", Math.abs(max - min - 2 * lineWidth))
                    .attr("height", rectHeight)
                    .attr("x", min + 2 * lineWidth)
                    .attr("y", topY)
                    .attr("fill", "white")
                    .attr('fill-opacity', 0.1)
                    .call(Framdrag)
                SvgTransformK = (width / Math.abs(max - min))
                storyLineG
                    .attr("transform", "translate(" + [- min * SvgTransformK * scale, recommandY] + ")scale(" + (SvgTransformK) + ")")
                FramTranformX = - min * SvgTransformK * scale;
            }
            reDrawFram()
            transformx = FramTranformX;

            minMapSvg.append("rect")
                .attr("id", "leftLine")
                .attr("width", lineWidth)
                .attr("height", rectHeight)
                .attr("x", leftX)
                .attr("y", topY)
                .attr("fill", "black")
                .call(drag)

            minMapSvg.append("rect")
                .attr("id", "rightLine")
                .attr("width", lineWidth)
                .attr("height", rectHeight)
                .attr("x", rightX)
                .attr("y", topY)
                .attr("fill", "black")
                .call(drag)

}
