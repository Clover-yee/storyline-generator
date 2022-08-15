//辅助函数
{
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
}

function drawStoryLine(sessionListSL){
    var storylineView = document.getElementById('storyline-view')
    var width = storylineView.offsetWidth; // 画布的宽度
    var height = storylineView.offsetHeight; // 画布的高度
    var scale = 4; // 缩放
    var svg = d3.select("#storyline-view") // 选择文档中的body 元素
        .append("svg") //添加一个SVG元素
        .attr("width", width) //设定宽度
        .attr("height", height) //设定高度
        .attr("transform",`scale(${scale}) translate(550, 60)`);  
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
            console.log(dataresult1[0].event == dataresult1[1].event && dataresult1[0].name == dataresult1[1].name,"llllllllll");
            console.log(dataresult1[3].length == dataresult1[4].length)
            i=0;
            while(i<dataresult1.length){
                var start = i;
                var end = i+1;
                var flag = 0;
                if(end == dataresult1.length){
                    for(j=0;j<dataresult1[start].length;j++){
                    dataresult.push([start, end-1, dataresult1[start][j].event, dataresult1[start][j].name])
                }
                    break;
                }
                if(dataresult1[start].length == dataresult1[end].length){
                    for(j=0;j<dataresult1[end].length;j++){
                        if(dataresult1[start][j].event == dataresult1[end][j].event && dataresult1[start][j].name == dataresult1[end][j].name){
                            flag = 1;
                        }
                        else{
                            flag = 0;
                            break;
                        }
                    }
                }
                // console.log(flag)
                while(flag == 1 && end<dataresult1.length-1){
                    end = end + 1;
                    flag = 0;
                    if(dataresult1[start].length == dataresult1[end].length){
                        for(j=0;j<dataresult1[end].length;j++){
                            if(dataresult1[start][j].event == dataresult1[end][j].event && dataresult1[start][j].name == dataresult1[end][j].name){
                                flag = 1;
                            }
                            else{
                                flag = 0;
                                break;
                            }
                        }
                    } 
                }
                
                console.log(start,end-1)
                for(j=0;j<dataresult1[start].length;j++){
                    dataresult.push([start, end-1, dataresult1[start][j].event, dataresult1[start][j].name])
                }       
                i = end;
                // console.log(i)
            }
            console.log(dataresult, "ff");
            //开始绘制，按照dataresult  
            var cs = 10;//循环次数
            rob = 0;
            var color = [d3.rgb('#007AFF'),d3.rgb('#FFF500'),d3.rgb('#F08DB3'),d3.rgb('#FF00FF'),d3.rgb('#FF0000'), d3.rgb('#000000')]
            var initmember = new Array();
            var membernew = new Array();
            var number1 = 0;
            var da = dataresult.length;
            for(i=0;i<da;i++){
                k = i;
                while(dataresult[i][0] == dataresult[k][0]){//判断同一时间段
                    k++;
                    if(k == dataresult.length){
                        break;
                    }
                }
                for(j=i;j<k;j++){
                    var members = dataresult[j][3].split(',');
                    for(n=0;n<members.length;n++){
                        for(m=0;m<membering.length;m++){
                            if(members[n] == membering[m][0]){
                                membering[m][1]=1;
                            }
                        }
                    }
                }
                for(j=0;j<membering.length;j++){
                    if(membering[j][1]==0){
                        eventname = "x" + number1.toString();
                        number1++;
                        membernew.push([eventname, dataresult[i][0], dataresult[i][1], membering[j][0]]);
                        dataresult.push([dataresult[i][0], dataresult[i][1], eventname, membering[j][0]]);
                    }
                }
                for(j=0;j<membering.length;j++){
                    membering[j][1] = 0;
                }
                i = k-1;
            }
            dataresult.sort(mem_rank);
            console.log(dataresult);
            for(i=0;i<dataresult.length;i++){
                initmember.push([]);
            }
            var memberinformation = new Array();
            var events = new Array();
            for(i=0;i<dataresult.length;i++){
                memberinformation.push([]);
            }
            console.log(membercolor,"color");
            kb = 0;
            cs = 11;
            edge1 = 1250;
            var edge2 = 1250;
            updown = 0;
            line_array = new Array();
            while(kb<cs){ 
                console.log(kb%2==0, "kkkkkkkkkkkk")                           
                if(kb%2==0){
                    line_array.length=0;
                    Rank.sort(rankr);
                    d3.select('svg').selectAll('*').remove();
                    var bn = 50;//虚线数量
                    initmember.length = 0;
                    memberinformation.length = 0;
                    for(i=0;i<dataresult.length;i++){
                        initmember.push([]);
                    }
                    
                    for(i=0;i<dataresult.length;i++){
                        memberinformation.push([]);
                    }
                    // for(xx=1;xx<500;xx++){
                    //     svg.append("line")
                    //         .attr("x1", 5*xx)
                    //         .attr("y1", 10)
                    //         .attr("x2", 5*xx)
                    //         .attr("y2", 2500)
                    //         .attr("stroke", "black")
                    //         .attr("stroke-width", "2px")
                    //         .attr("stroke-opacity", "0.3")
                    //         .attr("stroke-dasharray","3 2") 
                    // } 

                    //二次处理数据，使得可以绘图
                    i = 0;
                    var number = 0;
                    while(i<dataresult.length){
                        k = i;
                        while(dataresult[i][0] == dataresult[k][0]){//判断同一时间段
                            k++;
                            if(k == dataresult.length){
                                break;
                            }
                        }
                        //二次处理数据
                        for(j=i;j<k;j++){
                            var members = dataresult[j][3].split(',');
                            // console.log(members);
                            sum = 0;
                            ran = 0;
                            for(m=0;m<members.length;m++){
                                for(n=0;n<membercolor.length;n++){
                                    // console.log("l")
                                    if(membercolor[n] == members[m]){
                                        // console.log("l")
                                        for(p=0;p<Rank.length;p++){
                                            // console.log("l")
                                            if(Rank[p][0] == members[m]){
                                                // console.log("l")
                                                memberinformation[number]
                                                .push([dataresult[j][0],
                                                       dataresult[j][1],
                                                       dataresult[j][2],
                                                       members[m],
                                                       Rank[p][2],n]);
                                                sum += Rank[p][2];
                                            }
                                        }
                                    }
                                }
                            }
                            sum = sum/members.length;
                            for(m=0;m<memberinformation[number].length;m++){
                                // console.log(dataresult[j][3] ,memberinformation[number][m][3])
                                // console.log(dataresult[j][2], memberinformation[number][m][3],"lll")
                                if(dataresult[j][2] == memberinformation[number][m][2]){
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
                        // console.log(number, "n")
                        //开始绘制图
                        memberinformation[number].sort(m_rank);
                        // console.log(memberinformation[number],"memin",i);
                        ran = 0;
                        for(m=0;m<memberinformation[number].length;m++){
                            if(m == 0){
                                y = edge2;  
                            }
                            if(m>0){
                                if(memberinformation[number][m][2] == memberinformation[number][m-1][2]){
                                    // console.log("ll")
                                    y = prey + peopledistance;
                                }
                                else{
                                    y = prey + eventdistance;
                                }
                            }
                            // console.log(initmember, "in")
                            x1 = memberinformation[number][m][0];
                            x2 = memberinformation[number][m][1];
                            c = memberinformation[number][m][6];
                            // svg.append("circle")
                            //             .attr("cx", 10*(x1+1))
                            //             .attr("cy", y)
                            //             .attr("r", "1px")
                            //             .attr("fill", color[c]);
                            // svg.append("circle")
                            //             .attr("cx", 10*(x2+1))
                            //             .attr("cy", y)
                            //             .attr("r", "1px")
                            //             .attr("fill", color[c]);  
                            prey = y;
                            // console.log(number,"number");
                           
                            initmember[number].push([memberinformation[number][m][2],
                                                memberinformation[number][m][3],
                                                5*(x1+1),y,5*(x2+1),y,c])
                            
                            line_array.push([5*(x1+1),y,c]); 
                            line_array.push([5*(x2+1),y,c]);                   

                            for(r1=0;r1<Rank.length;r1++){
                                if(Rank[r1][0] == memberinformation[number][m][3] && Rank[r1][1] != y){
                                    Rank[r1][1]= y;
                                }                              
                            }                            
                        }
                        Rank.sort(rankr);
                        Rank[0][2] = 0;
                        for(r=1;r<Rank.length;r++){
                            console.log(Rank[r][1],Rank[r-1][1],"zz")
                            if((Rank[r][1] - Rank[r-1][1]) == 20){
                                // console.log("hah")
                                Rank[r][2] = Rank[r-1][2] + 2;
                            }
                            if(Rank[r][1] == (Rank[r-1][1]+5)){
                                // console.log("haha")
                                Rank[r][2] = Rank[r-1][2] + 1;
                            }
                        }
                        if(updown == 0){
                            edge2 = randomNum(eventdistance*membercolor.length+10,eventdistance*membercolor.length*2);
                            updown = 1-updown;
                        }
                        else{
                            edge2 = randomNum(eventdistance*membercolor.length+10,eventdistance*membercolor.length*2);
                            updown = 1- updown;
                        }
                        number++;
                        i = k;
                    } 
                }
                else{
                    line_array.length = 0;
                    // console.log("llllllllllllllllllllllllll");
                    Rank.sort(rankr);
                    d3.select('svg').selectAll('*').remove();
                    var bn = 50;//虚线数量
                    initmember.length = 0;
                    memberinformation.length = 0;
                    for(i=0;i<dataresult.length;i++){
                        initmember.push([]);
                    }
                    for(i=0;i<dataresult.length;i++){
                        memberinformation.push([]);
                    }
                    for(xx=1;xx<bn;xx++){
                        svg.append("line")
                            .attr("x1", 10*xx)
                            .attr("y1", 10)
                            .attr("x2", 10*xx)
                            .attr("y2", 2500)
                            .attr("stroke", "black")
                            .attr("stroke-width", "2px")
                            .attr("stroke-opacity", "0.3")
                            .attr("stroke-dasharray","3 2") 
                    }                             
                    //二次处理数据，使得可以绘图
                    // console.log("yyyyyy");
                    i = dataresult.length-1;
                    var number = 0;
                    while(i>=0){
                        k = i;
                        // console.log(i);
                        while(dataresult[i][0] == dataresult[k][0]){//判断同一时间段
                            k--;
                            if(k == -1){
                                break;
                            }
                        }
                        //二次处理数据
                        for(j=k+1;j<=i;j++){
                            var members = dataresult[j][3].split(',');
                            // console.log(members);
                            sum = 0;
                            ran = 0;
                            for(m=0;m<members.length;m++){
                                for(n=0;n<membercolor.length;n++){
                                    // console.log("l")
                                    if(membercolor[n] == members[m]){
                                        // console.log("l")
                                        for(p=0;p<Rank.length;p++){
                                            // console.log("l")
                                            if(Rank[p][0] == members[m]){
                                                // console.log("l")
                                                memberinformation[number]
                                                .push([dataresult[j][0],
                                                    dataresult[j][1],
                                                    dataresult[j][2],
                                                    members[m],
                                                    Rank[p][2],n]);
                                                sum += Rank[p][2];
                                            }
                                        }
                                    }
                                }
                            }
                            sum = sum/members.length;
                            for(m=0;m<memberinformation[number].length;m++){
                                // console.log(dataresult[j][3] ,memberinformation[number][m][3])
                                // console.log(dataresult[j][2], memberinformation[number][m][3],"lll")
                                if(dataresult[j][2] == memberinformation[number][m][2]){
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
                        // console.log(number, "n")
                        //开始绘制图
                        memberinformation[number].sort(m_rank);
                        // console.log(memberinformation[4],"memin");
                        ran = 0;
                        for(m=0;m<memberinformation[number].length;m++){
                            if(m == 0){
                                y = edge2;
                                
                            }
                            if(m>0){
                                if(memberinformation[number][m][2] == memberinformation[number][m-1][2]){
                                    // console.log("ll")
                                    y = prey + peopledistance;
                                }
                                else{
                                    y = prey + eventdistance;
                                }
                            }
                            // console.log(initmember, "in")
                            x1 = memberinformation[number][m][0];
                            x2 = memberinformation[number][m][1];
                            c = memberinformation[number][m][6];
                            svg.append("circle")
                                            .attr("cx", 10*(x1+1))
                                            .attr("cy", y)
                                            .attr("r", "1px")
                                            .attr("fill", color[c]);
                            svg.append("circle")
                                            .attr("cx", 10*(x2+1))
                                            .attr("cy", y)
                                            .attr("r", "1px")
                                            .attr("fill", color[c]);  
                            prey = y;
                            // console.log(number,"number");
                            initmember[number].push([memberinformation[number][m][2],
                                                memberinformation[number][m][3],
                                                5*(x1+1),y,5*(x2+1),y,c])
                            line_array.push([2*(x1+1),y,c]); 
                            line_array.push([2*(x2+1),y,c]);
                            for(r1=0;r1<Rank.length;r1++){
                                if(Rank[r1][0] == memberinformation[number][m][3] && Rank[r1][1] != y){
                                    Rank[r1][1]= y;
                                }
                            }
                            
                            // console.log(Rank,"rank", number);
                            // console.log(Rank[0][1], Rank[0][0], Rank[0][2]);
                            // console.log(Rank[1][1], Rank[1][0], Rank[1][2]);
                            // console.log(Rank[2][1], Rank[2][0], Rank[2][2]);                               
                        }
                        Rank.sort(rankr);
                        Rank[0][2] = 0;
                        for(r=1;r<Rank.length;r++){
                            console.log(Rank[r][1],Rank[r-1][1],"zz")
                            if((Rank[r][1] - Rank[r-1][1]) == 20){
                                // console.log("hah")
                                Rank[r][2] = Rank[r-1][2] + 2;
                            }
                            if(Rank[r][1] == (Rank[r-1][1]+5)){
                                // console.log("haha")
                                Rank[r][2] = Rank[r-1][2] + 1;
                            }
                        }
                        if(updown == 0){
                            edge2 = randomNum(eventdistance*membercolor.length+10,eventdistance*membercolor.length*2);
                            updown = 1-updown;
                        }
                        else{
                            edge2 = randomNum(eventdistance*membercolor.length+10,eventdistance*membercolor.length*2);
                            updown = 1- updown;
                        }
                        number++;
                        i = k;
                    }                  
                }
                kb++;
            }
            console.log(memberinformation, "llsad");
            
            console.log(initmember,"inin",number)
            console.log(dataresult)
            
            console.log(line_array,"line");
            var eventnumber = new Array();
            var path = new Array();
            var straight_line = new Array();
            for(l=1;l<number;l++){
                //统计l-1和l的事件数量
                eventnumber.length = 0;
                for(p=0;p<initmember[l].length;p++){
                    flag = 1;
                    for(q=0;q<eventnumber.length;q++){
                        if(eventnumber[q]==initmember[l][p][0]){
                            flag = 0;
                        }
                    }
                    if(flag == 1){
                        eventnumber.push(initmember[l][p][0]);
                    }
                }
                var m = eventnumber.length;//l的事件数量
                eventnumber.length = 0;
                for(p=0;p<initmember[l-1].length;p++){
                    flag = 1;
                    for(q=0;q<eventnumber.length;q++){
                        if(eventnumber[q]==initmember[l-1][p][0]){
                            flag = 0;
                        }
                    }
                    if(flag == 1){
                        eventnumber.push(initmember[l-1][p][0]);
                    }
                }
                var n = eventnumber.length;//l-1的事件数量
                // console.log(n,m, "事件数量");
                alpha = 0.1;

                a1 = new Array();//记录值
                a2 = new Array();//记录路径
                for(i=0;i<m+1;i++){
                    a1[i] = new Array();
                    a2[i] = new Array();
                    for(j=0;j<n+1;j++){
                        a1[i].push(0);
                        a2[i].push(0);
                    }
                }
                // console.log(a1,"a1")
                for(i=0;i<m+1;i++){
                    for(j=0;j<n+1;j++){

                    }
                }
                for(i=0;i<m+1;i++){
                    for(j=0;j<n+1;j++){
                        if(i==0 || j==0){
                            a1[i][j]=0;
                            a2[i][j]=0;
                        }
                    }
                }
                
                
                // console.log(initmember[l], l, "l");
                // console.log(initmember[l-1], l-1, "l");

                var s = 0;
                
               
                for(i=1;i<m+1;i++){
                    for(j=1;j<n+1;j++){
                        k = 0;
                        x_key1 = 0;
                        y_key1 = 0;
                        x_key2 = 0;
                        y_key2 = 0;
                        for(a=1;a<initmember[l].length;a++){
                            if(initmember[l][a][0] != initmember[l][a-1][0]){
                                k++;
                                x_key1 = x_key2+1;
                                x_key2 = a-1;
                                if(k==i){
                                    if(x_key1==1 && i==1){
                                        x_key1=0;
                                    }
                                    break;
                                }
                            }
                        }
                        if(m==1){
                            x_key1 = 0;
                            x_key2 = initmember[l].length-1;
                        }
                        else if(m==i){
                            for(a=initmember[l].length-1;a>0;a--){
                                if(initmember[l][a][0] != initmember[l][a-1][0]){
                                    x_key2 = initmember[l].length-1;
                                    x_key1 = a;
                                    break;
                                }
                            }
                        }
                        k = 0;
                        for(a=1;a<initmember[l-1].length;a++){
                            if(initmember[l-1][a][0] != initmember[l-1][a-1][0]){
                                k++;
                                y_key1 = y_key2+1;
                                y_key2 = a-1;
                                if(k==j){
                                    if(y_key1==1 && j==1){
                                        y_key1=0;
                                    }
                                    break;
                                }
                            }
                        }
                        if(n==1){
                            y_key1 = 0;
                            y_key2 = initmember[l-1].length-1;
                        }
                        else if(n==j){
                            for(a=initmember[l-1].length-1;a>0;a--){
                                if(initmember[l-1][a][0] != initmember[l-1][a-1][0]){
                                    y_key2 = initmember[l-1].length-1;
                                    y_key1 = a;
                                    break;
                                }
                            }
                        }
                        // console.log(i, j, x_key1, x_key2, y_key1, y_key2,"key")
                        sum = 0;
                        for(a=x_key1;a<=x_key2;a++){
                            for(b=y_key1;b<=y_key2;b++){
                                if(initmember[l][a][1] == initmember[l-1][b][1]){
                                    sum++;
                                }
                            }
                        }
                        console.log(sum, straight_line,"straight")
                        var slim = sum + alpha*(1-Math.abs((i-1)/m-(j-1)/n));
                        // console.log(slim, "slim");
                        
                        var max1 = Math.max(a1[i-1][j-1]+slim, a1[i-1][j], a1[i][j-1]);
                        console.log(a1[i-1][j-1]+slim, a1[i-1][j], a1[i][j-1], "afdkjsdbklszbdflksabd");                        // a1[i][j] = max;
                        a1[i][j] = max1;
                        if(max1 == a1[i-1][j-1]+slim){
                            a2[i][j] = 1;
                        }
                        else if(max1 == a1[i-1][j]){
                            a2[i][j] = 2;
                        }
                        else if(max1 == a1[i][j-1]){
                            a2[i][j] = 3;
                        }
                    }
                }
                path.length = 0;
                k = 0;
                
                // k_i = m;
                // k_j = n;
                i = m;
                j = n;    
                while(i>0 && j>0){
                    if(a2[i][j] == 1){
                        path.push([i, j]);
                        i--;
                        j--;
                    }
                    else if(a2[i][j] == 2){
                        path.push([i, j]);
                        i--;
                    }
                    else if(a2[i][j] == 3){
                        path.push([i, j]);
                        j--;
                    }
                }         
                // for(i=k_i;i>0;i--){
                //     for(j=k_j;j>0;j--){
                //         if(a2[i][j] == 1){
                //             path.push([i, j]);
                //             k_i = i+1;
                //             k_j = j+1;
                //             break;
                //         }
                //         else if(a2[i][j] == 2){
                //             path.push([i-1, j]);
                //             k_i = i;
                //             k_j = j+1;
                //             break;
                //         }
                //         else if(a2[i][j] == 3){
                //             path.push([i, j-1]);
                //             k_i = i+1;
                //             k_j = j;
                //             break;
                //         }
                //     }
                // }
                console.log(path,"path");
                straight_line.length = 0;
                sum = 0;
                for(p=0;p<path.length;p++){
                    i = path[p][0];
                    j = path[p][1];
                    console.log(i,j,"ij", m, n, path.length)
                    k = 0;
                    x_key1 = 0;
                    y_key1 = 0;
                    x_key2 = 0;
                    y_key2 = 0;
                    for(a=1;a<initmember[l].length;a++){
                        if(initmember[l][a][0] != initmember[l][a-1][0]){
                            k++;
                            x_key1 = x_key2+1;
                            x_key2 = a-1;
                            if(k==i){
                                if(x_key1==1 && i==1){
                                    x_key1=0;
                                }
                                break;
                            }
                        }
                    }
                    if(m==1){
                        x_key1 = 0;
                        x_key2 = initmember[l].length-1;
                    }
                    else if(m==i){
                        for(a=initmember[l].length-1;a>0;a--){
                            if(initmember[l][a][0] != initmember[l][a-1][0]){
                                x_key2 = initmember[l].length-1;
                                x_key1 = a;
                                break;
                            }
                        }
                    }
                    k = 0;
                    for(a=1;a<initmember[l-1].length;a++){
                        if(initmember[l-1][a][0] != initmember[l-1][a-1][0]){
                            k++;
                            y_key1 = y_key2+1;
                            y_key2 = a-1;
                            if(k==j){
                                
                                if(y_key1==1 && j==1){
                                    y_key1=0;
                                }
                                break;
                            }
                        }
                    }
                    if(n==1){
                        y_key1 = 0;
                        y_key2 = initmember[l-1].length-1;
                    }
                    else if(n==j){
                        for(a=initmember[l-1].length-1;a>0;a--){
                            if(initmember[l-1][a][0] != initmember[l-1][a-1][0]){
                                y_key2 = initmember[l-1].length-1;
                                y_key1 = a;
                                break;
                            }
                        }
                    }
                    // console.log(i, j, x_key1, x_key2, y_key1, y_key2,"key")
                    for(a=x_key1;a<=x_key2;a++){
                        for(b=y_key1;b<=y_key2;b++){
                            if(initmember[l][a][1] == initmember[l-1][b][1]){
                                sum++;
                                straight_line.push([a, b]);
                                console.log(x_key1, x_key2,"yes",a,b);
                            }
                        }
                    }
                    
                }
                console.log(straight_line, " stresfwe", sum )
                //对齐
                var xxx = 0;
                for(i=0;i<straight_line.length;i++){
                    a = straight_line[i][0];
                    b = straight_line[i][1];
                    for(j=0;j<initmember[l].length;j++){
                        var mem = initmember[l][a][0].split('');
                        if(j == a && mem[0] == 'i'){ 
                            va = j-1;
                            initmember[l][j][3] = initmember[l-1][b][3];
                            initmember[l][j][5] = initmember[l-1][b][5];
                            while(va>=0 ){
                                if(initmember[l][va][0] != initmember[l][va+1][0]){
                                    initmember[l][va][3] = initmember[l][va+1][3]-eventdistance;
                                    initmember[l][va][5] = initmember[l][va+1][5]-eventdistance;
                                }
                                else{
                                    initmember[l][va][3] = initmember[l][va+1][3]-peopledistance;
                                    initmember[l][va][5] = initmember[l][va+1][5]-peopledistance;
                                }
                                va--;
                            }
                            va = j+1;
                            while(va <= initmember[l].length-1){
                                if(initmember[l][va][0] != initmember[l][va-1][0]){
                                    initmember[l][va][3] = initmember[l][va-1][3]+eventdistance;
                                    initmember[l][va][5] = initmember[l][va-1][5]+eventdistance;
                                }
                                else{
                                    initmember[l][va][3] = initmember[l][va-1][3]+peopledistance;
                                    initmember[l][va][5] = initmember[l][va-1][5]+peopledistance;
                                }
                                va++;
                            }
                        }
                    }
                }
                
            }

            // for(i=0;i<number;i++){
            //     for(j=0;j<initmember[i].length;j++){
            //         var eventName = initmember[i][j][0].split('');
            //         if(eventName[0] == 'x'){
            //             initmember[i].splice(j,1);
            //         }
            //     }
            // }


            line_array.length = 0;
            console.log(initmember, "ini");
            console.log(mem_end)
            for(i=0;i<number;i++){
                for(j=0;j<initmember[i].length;j++){
                    for(k=0;k<mem_end.length;k++){
                        if(mem_end[k][0] == initmember[i][j][1]){
                            
                            if(initmember[i][j][2]>=mem_end[k][1] && initmember[i][j][4] <= mem_end[k][2]){
                                line_array.push([initmember[i][j][2]+100, initmember[i][j][3], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);
                                line_array.push([initmember[i][j][4]+100, initmember[i][j][5], initmember[i][j][6], initmember[i][j][0], initmember[i][j][1]]);

                            }
                        }
                    }
                    
                }
            }
            
            
            line_array.sort(line_array_rank2); 
            var sum = 1;
            for(i=0;i<initmember.length;i++){
                for(j=1;j<initmember[i].length;j++){
                    if(initmember[i][j][0] == initmember[i][j-1][0]){
                        sum++;
                    }
                    else{
                        if(sum>=2){
                            
                        }
                        sum = 1;
                    }
                }
            }
            var tooltip = d3.select("body").append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);
            //画线
            console.log(initmember,"in");
            console.log(dataresult,"result")
            console.log(dataresult1);
            console.log(memberinformation,"meme")
            line_array.sort(ascend);
            console.log(memberfix,"fix");
            console.log(membernew,"new");
            console.log(membering,"ing")
            console.log(membercolor.length*eventdistance,"col")
            console.log(straight_line,"str")
            console.log(path, "path")
            console.log(a2);
            console.log(mem_end);
            console.log(initmember);
            console.log(line_array,"line")
            var sum = 1;
            var reline = new Array();
            for(i=1;i<line_array.length;i++){
                //画线
                if(line_array[i][2] == line_array[i-1][2]){
                    if(line_array[i][1] != line_array[i-1][1]){
                        x1 = line_array[i][0];
                        x2 = line_array[i-1][0];
                        y1 = line_array[i][1];
                        y2 = line_array[i-1][1];
                        k1 = 1/3;
                        k2 = 1/6;
                        reline.push({xpoint:x2,  ypoint:y2}); 
                        if(y1>y2){
                            new_y = y1-y2;
                            reline.push({xpoint:x2+(x1-x2)*k1,  ypoint:y2+new_y*k2});
                            reline.push({xpoint:x2+(x1-x2)*(1-k1),  ypoint:y2+new_y*(1-k2)});
                        }
                        else{
                            new_y = y2-y1;
                            reline.push({xpoint:x2+(x1-x2)*k1,  ypoint:y1+new_y*(1-k2)});
                            reline.push({xpoint:x2+(x1-x2)*(1-k1),  ypoint:y1+new_y*k2});
                        }
                        reline.push({xpoint:x1,  ypoint:y1});
                        
                    }
                    else{
                        x1 = line_array[i][0];
                        x2 = line_array[i-1][0];
                        y1 = line_array[i][1];
                        y2 = line_array[i-1][1];
                        reline.push({xpoint:x2,  ypoint:y2});
                        reline.push({xpoint:x1,  ypoint:y1});
                        
                    }
                    if(i == line_array.length-1){
                        var Gen = d3.line() 
                            .x((p) => p.xpoint) 
                            .y((p) => p.ypoint) 
                            .curve(d3.curveCardinal);          
                        svg.append("path")
                            .attr("id", line_array[i][2])
                            .attr("d", Gen(reline)) 
                            .attr("fill", "none") 
                            .attr("stroke", "black")
                            .attr("stroke-width","1px")
                            .attr("stroke-opcacity", 0.1)
                            .on("mouseover", function(){
                                this.style.stroke = "red";
                                var name = d3.select('#'+membercolor[this.id])
                                name.fill = "orange"
                            })
                            .on("mouseout",function(d){
                                this.style.stroke = "black";
                                var name = d3.select('#'+membercolor[this.id])
                                name.fill = "black";
                            }); 
                        console.log(reline,"reline")
                        reline.length=0;
                    }
                }
                else{
                    var Gen = d3.line() 
                        .x((p) => p.xpoint) 
                        .y((p) => p.ypoint) 
                        .curve(d3.curveCardinal);          
                    svg.append("path")
                        .attr("id", line_array[i-1][2])
                        .attr("d", Gen(reline)) 
                        .attr("fill", "none") 
                        .attr("stroke", "black")
                        .attr("stroke-width","1px")
                        .attr("stroke-opcacity", 0.1)
                        .on("mouseover", function(){
                            this.style.stroke = "red";
                        })
                        .on("mouseout",function(d){
                            this.style.stroke = "black";
                        });
                    console.log(reline,"reline")
                    reline.length=0;
                }
                //添加故事线人物
                if(i == 1){
                    //添加第一个故事线的名字（使用i-1）
                    var mem = line_array[i-1][4].split('');
                    svg.append("text")
                    .attr("id", line_array[i-1][4])
                    .attr("x",line_array[i-1][0]-mem.length*4)
                    .attr("y",line_array[i-1][1])
                    .style('font-weight', 1)
                    .style('font-family', 'Arial')
                    .style('font-size', 4)
                    .style('fill', color[line_array[i-1][2]])
                    .text(line_array[i-1][4])
                }
                else if(line_array[i][2] != line_array[i-1][2]){
                    //添加后面故事线的名字
                    //使用i的坐标进行把控文本的名字
                    var mem = line_array[i][4].split('');
                    svg.append("text")
                    .attr("id", line_array[i][4])
                    .attr("x",line_array[i][0]-mem.length*5)
                    .attr("y",line_array[i][1])
                    .style('font-weight', 1)
                    .style('font-family', 'Arial')
                    .style('font-size', 4)
                    .style('fill', color[line_array[i][2]])
                    .text(line_array[i][4])
                }
            }
            console.log(dataresult  )
            var sum = 1;
            var k = 1;
            var rect_event = new Array();
            for(i=0;i<dataresult.length;i++){
                var mem = dataresult[i][3].split(',');
                if(mem.length >= 2){
                    if(k == 1){
                        rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0]);
                        k = 0;
                    }
                    flag = 0;
                    for(j=0;j<rect_event.length;j++){
                        
                        if(rect_event[j][0] == dataresult[i][2]){
                            if(rect_event[j][1] > dataresult[i][0]){
                                rect_event[j][1] = dataresult[i][0]; 
                            }
                            if(rect_event[j][2] < dataresult[i][1]){
                                rect_event[j][2] = dataresult[i][1]; 
                            }
                            flag = 1;
                            break;
                        }
                    }
                    if(flag == 0){
                        rect_event.push([dataresult[i][2], dataresult[i][0], dataresult[i][1], 2500, 0]);
                    }
                }
            }
             
            console.log(initmember)
            for(i=0;i<initmember.length;i++){
                for(j=0;j<initmember[i].length;j++){
                    for(k=0;k<rect_event.length;k++){
                        if(initmember[i][j][0] == rect_event[k][0]){
                            if(initmember[i][j][3] < rect_event[k][3]){
                                rect_event[k][3] = initmember[i][j][3];
                            }
                            if(initmember[i][j][3] > rect_event[k][4]){
                                rect_event[k][4] = initmember[i][j][3];
                            }
                        }
                    }
                }
            } 
            console.log(rect_event);
            for(i=0;i<rect_event.length;i++){
                svg.append("rect")
                .attr("id", rect_event[i][0])
                .attr("x", 5*(rect_event[i][1]+1)+100-2)
                .attr("y", rect_event[i][3]-2)
                .attr("width", 5*(rect_event[i][2]+1)-5*(rect_event[i][1]+1)+4)
                .attr("height", rect_event[i][4]-rect_event[i][3]+4)
                .attr("rx", 1.5)
                .attr("ry", 1.5)
                .style("fill", "red")
                .style("opacity", 0.2)
                .on("mouseover", function(d){
                                      
                    if (tooltip) {
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 1);
                        tooltip.html(this.id)
                            .style("left", d.x + 150+ "px")
                            .style("top", d.y + "px");
                    }
                    this.style.opacity = 0.4;
                })
                .on("mouseout",function(d){
                    if (tooltip) {
                        tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    }
                    this.style.opacity = 0.2;
                });
            } 
            console.log(d3.event) 
}

