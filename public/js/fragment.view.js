//data - 数据 persons_array-人物数组 page_max-最大页码数
function drawFragmentView(
    data=
    [
        {
            event_number:"i1",
            page_start:10,
            page_end:20,
            persons:"",
            place:"",
            time:"",
            event:""
        }
    ],
    persons_array=
    [
        "Bennet",
        "Bennet",
        "Bingley",
        "daughters",
        "Elizabeth",
        "Darcy",
        "Jane",
        "dkw",
        "dkw1",
        "dkw2"
    ],
    page_max=160) {

    console.log(session);
    console.log(persons_array);
    var all_width = 291;
    var all_height = 487.5;//div的宽度和高度
    // console.log(width)

    var svg_width = 291;
    var svg_height = all_height-30;

    var fragment_width = 180;

    //添加svg
    var operation_panel = document.getElementById('operation_panel')
    operation_panel.innerHTML = ''
    console.log(document.getElementById('panel_svg'));
    if(!document.getElementById('panel_svg')){
        var panel_svg = d3.select("#operation_panel")
        .append("svg")
        .attr("id", "panel_svg")
        .attr("width", svg_width)
        .attr("height", svg_height);
    }


    //存储person——click——flag
    var person_click_flag_array = new Array();
    for(i=0;i<persons_array.length;i++){
        person_click_flag_array.push(0);
    }
    
    personList = data[0].persons.split(',')
    personList.forEach(person => {
        let index = persons_array.findIndex(elem =>{
            return elem === person
        })
        person_click_flag_array[index] = 1
    });

    console.log(person_click_flag_array)

    var persons_color = [
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
    ];//人物颜色数组

    var persons_color1 = [
        "#e53935",
        "#ef6cd0",
        "#cdca33",
        "#388e3c",
        "#0097a7",
        "#1565c0",
        "#673ab7",
        "#d81b60",
        "#a1887f",
        "#757575",
    ];//人物颜色数组

    var click_flag = 1;

    var bj_flag = 0

    var transform_x = 0;

    function draw_page_last(circle_x, circle_y, circle_r, ){
        var page_g = panel_svg.append('g');
        var arc = d3.arc()
            .innerRadius(circle_r) 
            .outerRadius() 
            .startAngle(10) 
            .endAngle(8); 

        svg.append("path") 
            .attr("class", "arc") 
            .attr("d", arc) 
            .attr("fill",d3.rgb(143, 214, 221)); 
        page_g.append("")
        
    }

    var transform_flag = 0;

    //辅助函数
    function dragFunc(g, id, x){
        var Drag = document.getElementById(id);
        var Dragout = document.getElementById(id);
        Dragout.onmousedown = function (event) {
            var ev = event || window.event;
            event.stopPropagation();
            var disX = ev.clientX;
            // console.log(Drag.style.transform);
            t_x = transform_x
            document.onmousemove = function (event) {
                var ev = event || window.event;
                console.log(transform_x)
                transform_x = ev.clientX - disX + t_x;
                console.log(transform_x, -x);
                if(transform_x < -x){
                    transform_x = -x;
                }
                if(transform_x > 0){
                    transform_x = 0;
                }
                // console.log(transform_x);
                click_flag = 0;
                // console.log(click_flag)
                g.attr("transform", "translate("+transform_x+")");
            };
            // Dragout.onmouseout = function () {
            //     document.onmousemove = false;
            //     // Drag.style.cursor = "default";
            // };
        };
        Dragout.onmouseup = function () {
            document.onmousemove = null;
            
            
            console.log(click_flag)
        }; 
        setTimeout(click_flag = 1, 10)   
        Dragout.onmouseout = function () {
            document.onmousemove = false;
            // Drag.style.cursor = "default";
            setTimeout(click_flag = 1, 200)
        };
        
    }



    function wheel(g, id, x,  ){
        var Drag = document.getElementById(id);
        var Dragout = document.getElementById(id);
        var x1 = 0;
        Dragout.onmouseover = function (event) {
        window.onwheel = function(ev){
                console.log(ev.deltaY);
                x1 += ev.deltaY;
                x1 = x1 / 100;
                transform_x = -x1 * 124;
                if(transform_x < -x){
                    transform_x = -x;
                }
                if(transform_x > 0){
                    transform_x = 0;
                }
                console.log(transform_x, x);
                g.attr("transform", "translate("+transform_x+")");
                transform_flag = 1;
        }
        }
        Dragout.onmouseout = function () {
            window.onwheel = false;
            Drag.style.cursor = "default";
        };
    }

    function draw_circle(id, x, y, r, i){
        r1 = r - 5;
        panel_svg.append("circle")
                    .attr("id", "person_circle" + i)
                    .attr("r", r)
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("fill", "white")
                    .attr("stroke", persons_color[i])
                    .attr("stroke-width", 1)
                    .on("click",function(){
                        if(bj_flag == 1){
                            var id = this.id.toString();
                            var num = id.split("person_circle");
                            console.log(num);
                            person_click_flag_array[parseInt(num[1])] = 0;
                            draw_panel();
                        }
                    })
                    // .on("mouseover", function(d){
                    //     var id = this.id.toString();
                    //     var num = id.split("person_circle");
                    //     console.log(this.attributes);
                        
                    //     y =  98;
                    //     x = 15;
                    //     console.log(x, y,)
                    //     //内容显示
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(200)
                    //             .style("opacity", 1);
                    //         console.log(transform_x);
                    //         d3.select(".panel_tooltip")
                    //             .style("background", persons_color1[num[1]] + "55")
                    //             .style("color", persons_color1[num[1]])
                    //         // console.log(persons_array[num[1]])
                    //         panel_tooltip.html(persons_array[num[1]])
                    //             .style("left", x - transform_x + "px")
                    //             .style("top", y + "px");
                    //     }
                    // })
                    // .on("mouseout", function (d) {
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(500)
                    //             .style("opacity", 0);
                    //     }
                    // });
        
        panel_svg.append("circle")
                    .attr("id", "person_circle1" + i)
                    .attr("r", r1)
                    .attr("cx", x)
                    .attr("cy", y)
                    .attr("fill", persons_color[i])
                    .on("click",function(){
                        if(bj_flag== 1){
                            var id = this.id.toString();
                            var num = id.split("person_circle1");
                            console.log(num);
                            person_click_flag_array[parseInt(num[1])] = 0;
                            draw_panel();
                        }
                    })
                    // .on("mouseover", function(d){
                    //     var id = this.id.toString();
                    //     var num = id.split("person_circle1");
                    //     console.log(this.attributes);
                        
                    //     y =  98;
                    //     x = 15;
                    //     console.log(x, y)
                    //     //内容显示
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(200)
                    //             .style("opacity", 1);
                    //         console.log(num);
                    //         d3.select(".panel_tooltip")
                    //             .style("background", persons_color1[num[1]] + "55")
                    //             .style("color", persons_color1[num[1]])
                    //         console.log(persons_array[num[1]])
                    //         panel_tooltip.html(persons_array[num[1]])
                    //             .style("left", x + "px")
                    //             .style("top", y + "px");
                    //     }
                    // })
                    // .on("mouseout", function (d) {
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(500)
                    //             .style("opacity", 0);
                    //     }
                    // });
        

        panel_svg.append("text")
                    .attr("id", "circle_text" + i)
                    .attr("x", x)
                    .attr("y", y + (r1) / (persons_array[i].length + 2))
                    .attr("font-weight", 500)
                    .attr("font-size", (r1) / (persons_array[i].length + 2) * 4)
                    .attr('text-anchor',"middle")
                    .style("fill", d3.rgb(255, 255, 255))
                    .text(persons_array[i])
                    .on("click",function(){
                        if(bj_flag == 1){
                            var id = this.id.toString();
                            var num = id.split("circle_text");
                            console.log(num);
                            person_click_flag_array[parseInt(num[1])] = 0;
                            draw_panel();
                        }
                    })
                    // .on("mouseover", function(d){
                    //     var id = this.id.toString();
                    //     var num = id.split("circle_text");
                    //     console.log(this.attributes);
                        
                    //     y =  98;
                    //     x = 15;
                    //     console.log(x, y)
                    //     //内容显示
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(200)
                    //             .style("opacity", 1);
                    //         console.log(num);
                    //         d3.select(".panel_tooltip")
                    //             .style("background", persons_color1[num[1]] + "55")
                    //             .style("color", persons_color1[num[1]])
                    //         console.log(persons_array[num[1]])
                    //         panel_tooltip.html(persons_array[num[1]])
                    //             .style("left", x + "px")
                    //             .style("top", y + "px");
                    //     }
                    // })
                    // .on("mouseout", function (d) {
                    //     if (panel_tooltip) {
                    //         panel_tooltip.transition()
                    //             .duration(500)
                    //             .style("opacity", 0);
                    //     }
                    // });
        
                    
                    
    }

    function draw_total_circle(circle_x, circle_y, circle3_r){
        var circle_num = 0;
        var circle_every_angle;
        transform_x = 0;
        for(i=0;i<person_click_flag_array.length;i++){
            if(person_click_flag_array[i] == 1){
                circle_num += 1;
            }
        }
        // console.log(circle_num)
        if(circle_num != 0){
            circle_every_angle = 360 / circle_num;
            circle6_r = 190 / circle_num;
        }else{
            circle6_r = 0
        }
        console.log(person_click_flag_array);
        // console.log(circle6_r)
        if(circle6_r < 19){
            circle6_r = 19
        }
        if(circle6_r > 28){
            circle6_r = 28
        }
        angle = circle_every_angle;
        var draw_num = 0;
        for(i=0;i<person_click_flag_array.length;i++){
            if(person_click_flag_array[i] == 1){
                draw_num += 1;
                draw_x = circle_x - circle3_r * Math.sin(angle * draw_num *(Math.PI / 180));
                draw_y = circle_y - circle3_r * Math.cos(angle * draw_num *(Math.PI / 180));
                draw_circle(persons_array[i], draw_x, draw_y, circle6_r, i);
            }
        }
    }
    $('.panel_tooltip').remove()
    var panel_tooltip = d3.select("body").append("div")
            .attr("class", "panel_tooltip")
            .style("opacity", 0);

    function draw_panel(){
        console.log(panel_svg);
        d3.select("#panel_svg").selectAll('*').remove();
        var the_first_line_x = 10;
        var the_first_line_y = 10;
        var between_height = 15;
        var line_width = 27;
        var rect_height = 6;

        //绘制线
        panel_svg.append("line")
                    .attr("id", "legend_time_line")
                    .attr("x1", the_first_line_x)
                    .attr("y1", the_first_line_y)
                    .attr("x2", the_first_line_x+line_width)
                    .attr("y2", the_first_line_y)
                    .attr("stroke", d3.rgb(62,177,204))
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", "1")
                    .attr("stroke-dasharray","7 3"); 

        panel_svg.append("line")
                    .attr("id", "legend_place_line")
                    .attr("x1", the_first_line_x)
                    .attr("y1", the_first_line_y+between_height)
                    .attr("x2", the_first_line_x+line_width)
                    .attr("y2", the_first_line_y+between_height)
                    .attr("stroke", d3.rgb(93,219,161))
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", "1")
                    .attr("stroke-dasharray","7 3");

        panel_svg.append("rect")
                    .attr("id", "legend_people_rect")
                    .attr("x", the_first_line_x)
                    .attr("y", the_first_line_y+between_height*2-rect_height/2)
                    .attr("width", line_width)
                    .attr("height", rect_height)
                    .attr("fill", d3.rgb(255, 227, 227));
        
        panel_svg.append("line")
                    .attr("id", "legend_people_line")
                    .attr("x1", the_first_line_x)
                    .attr("y1", the_first_line_y+between_height*2)
                    .attr("x2", the_first_line_x+line_width)
                    .attr("y2", the_first_line_y+between_height*2)
                    .attr("stroke", d3.rgb(238,152,152))
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", "1")
                    .attr("stroke-dasharray","7 3");
        //添加文本
        between_text_line_dis = 6;//线与文本之间的距离
        var font_size = 8;
        var font_weight = 1000;
        panel_svg.append("text")
                    .attr("id", "legend_Time_text")
                    .attr("x", the_first_line_x+line_width+between_text_line_dis)
                    .attr("y", the_first_line_y)
                    .attr("font-weight", font_weight)
                    .attr("font-size", font_size)
                    .style("fill", d3.rgb(105, 105, 105))
                    .text("Time");
        panel_svg.append("text")
                    .attr("id", "legend_Time_text")
                    .attr("x", the_first_line_x+line_width+between_text_line_dis)
                    .attr("y", the_first_line_y+between_height)
                    .attr("font-weight", font_weight)
                    .attr("font-size", font_size)
                    .style("fill", d3.rgb(105, 105, 105))
                    .text("Place");
        panel_svg.append("text")
                    .attr("id", "legend_Time_text")
                    .attr("x", the_first_line_x+line_width+between_text_line_dis)
                    .attr("y", the_first_line_y+between_height*2)
                    .attr("font-weight", font_weight)
                    .attr("font-size", font_size)
                    .style("fill", d3.rgb(105, 105, 105))
                    .text("Person");

        between_text_vertical_line_dis = 32;
        var vertical_line_x = the_first_line_x + line_width +between_text_line_dis + between_text_vertical_line_dis; 
        panel_svg.append("line")
                    .attr("id", "vertical_line")
                    .attr("x1", vertical_line_x)
                    .attr("y1", the_first_line_y)
                    .attr("x2", vertical_line_x)
                    .attr("y2", the_first_line_y+between_height*2)
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", "1")
        
        var person_group_vertical_line_dis = 10;
        var person_group_x = vertical_line_x + person_group_vertical_line_dis;
        var person_group_y = the_first_line_y;
        var person_group_width = svg_width - 10 - vertical_line_x - person_group_vertical_line_dis;
        var person_group_height = between_height*2+5*2;
        panel_svg.append("rect")
                    .attr("id", "person_group")
                    .attr("x", person_group_x)
                    .attr("y", person_group_y - 5)
                    .attr("width", person_group_width)
                    .attr("height", person_group_height)
                    .attr("rx", 5)
                    .attr("ry", 5)
                    .attr("fill", d3.rgb(255, 255, 255))
                    .attr("stroke", d3.rgb(234, 162, 162))
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "10 3.5");

        var person_svg = panel_svg.append("svg")
                    .attr("id", "ellipse_svg")
                    .attr("x", person_group_x+5)
                    .attr("y", person_group_y)
                    .attr("width", person_group_width - 10)
                    .attr("height", between_height*2+5*2);
                    
        
        var person_g = person_svg.append("g").attr("id", "ellipse_g")
        // person_g.attr("transform", "translate("+transform_x+")");
        var the_ellipse_y = person_group_y + person_group_width / 39;//椭圆y
        var ellipse_text_font_size = 5;
        var ellipse_text_font_weight = 700;
        var the_ellipse_rx = 12;
        var the_ellipse_ry = 14;
        var between_ellipse_dis = the_ellipse_ry + the_ellipse_rx + 5; 
        var the_first_ellipse__x = the_ellipse_rx / 2 + 10;
        var transform_x_max = the_first_ellipse__x + between_ellipse_dis * (persons_array.length-1) - 124;
        var draw_ellipse_num = 0;

        for(i=0;i<person_click_flag_array.length;i++){
            draw_ellipse_num++;

        }

        draw_ellipse_num = 0;
        person_g.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", the_first_ellipse__x + between_ellipse_dis * draw_ellipse_num)
                .attr("height", 30)
                .attr("opacity", 0)

        for(i=0;i<person_click_flag_array.length;i++){
            if(person_click_flag_array[i] == 0){
                var the_ellipse_x = the_first_ellipse__x + between_ellipse_dis * (draw_ellipse_num);
                draw_ellipse_num++;
                person_g
                        
                        .append("ellipse")
                        .attr("id", "ellipse"+i)
                        .attr("cx", the_ellipse_x)
                        .attr("cy", the_ellipse_y - 4)
                        .attr("rx", the_ellipse_rx)
                        .attr("ry", the_ellipse_ry)
                        .attr("fill", persons_color[i])
                        .attr("transform", "rotate("+
                        60+","+ the_ellipse_x + "," + the_ellipse_y +
                        ")")
                        .on("click",function(){
                            if(bj_flag == 1 && click_flag == 1){
                                var id = this.id.toString();
                                var num = id.split("ellipse");
                                console.log(persons_array[num]);
                                if(person_click_flag_array[parseInt(num[1])] == 1){
                                    person_click_flag_array[parseInt(num[1])] = 0;
                                }
                                else{
                                    person_click_flag_array[parseInt(num[1])] = 1;
                                }
                                // this.attr("fill", "grey");
                                if (panel_tooltip) {
                                    panel_tooltip.transition()
                                        .duration(500)
                                        .style("opacity", 0);
                                }
                                draw_panel();
                            }
                            
                        })
                        .on("mouseover", function(d){
                            var id = this.id.toString();
                            var num = id.split("ellipse");
                            // console.log(this.attributes, transform_x);
                            var x = d.x - 14 ;
                            var y = parseInt(this.attributes.cy.value)
                            y = the_first_line_y + person_group_height*2 + 8 + 487.5;
                            // console.log(d.x)
                            // console.log(x, y)
                            //内容显示
                            if (panel_tooltip) {
                                panel_tooltip.transition()
                                    .duration(200)
                                    .style("opacity", 1);
                                // console.log(num);
                                d3.select(".panel_tooltip")
                                    .style("background", persons_color1[num[1]] + "55")
                                    .style("color", persons_color1[num[1]])
                                // console.log(persons_array[num[1]])
                                // console.log(persons_color1[num[1]])
                                panel_tooltip.html(persons_array[num[1]])
                                    .style("left", x + "px")
                                    .style("top", y + "px");
                            }
                        })
                        .on("mouseout", function (d) {
                            if (panel_tooltip) {
                                panel_tooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0);
                            }
                        });
                        

                // var the_ellipse_text_x = the_ellipse_x - 8;
                // person_g
                //         .append("text")
                //         .attr("id", "legend_Time_text")
                //         .attr("x", the_ellipse_x)
                //         .attr("y", the_ellipse_y + the_ellipse_ry + 2)
                //         .attr("font-weight", ellipse_text_font_weight)
                //         .attr("font-size", ellipse_text_font_size)
                //         .style("fill", d3.rgb(0, 0, 0))
                //         .attr('text-anchor',"middle")
                //         .attr("font-famiy", "system-ui")
                //         .text(persons_array[i]);

                // console.log(the_ellipse_x - 84 + 3);
                if(transform_x_max < the_ellipse_x - person_group_x - person_group_x){
                    transform_x_max = the_ellipse_x - 84 + the_ellipse_rx + 6;
                }
            }
        }
        transform_x_max = 130;
        console.log(transform_x_max);
        setTimeout(() => {
            dragFunc(person_g,"ellipse_svg", transform_x_max);
        }, 100);
        
        // wheel(person_g, "ellipse_svg", transform_x_max);
        
    


        //绘制圆
        console.log(svg_width, svg_height);
        var circle_x = svg_width / 2;
        var circle_y = svg_height / 2 - 30;
        var circle1_r = 130;
        var circle2_r = 90;
        var circle3_r = 84;
        var circle4_r = 80;
        // console.log(circle_x);
        //绘制圆刻度

        panel_svg.append("circle")
                    .attr("id", "x_circle")
                    .attr("r", circle1_r)
                    .attr("cx", circle_x)
                    .attr("cy", circle_y)
                    .attr("fill", d3.rgb(255, 255, 255))
                    .attr("stroke", d3.rgb(182, 194, 236))
                    .attr("stroke-width", 0.4)

        panel_svg.append("circle")
                    .attr("id", "red_circle")
                    .attr("r", circle2_r)
                    .attr("cx", circle_x)
                    .attr("cy", circle_y)
                    .attr("fill", d3.rgb(255, 227, 227))
                    
        panel_svg.append("circle")
                    .attr("id", "xx_circle")
                    .attr("r", circle3_r)
                    .attr("cx", circle_x)
                    .attr("cy", circle_y)
                    .attr("fill", d3.rgb(255, 227, 227))
                    .attr("opacity", 1)
                    .attr("stroke", d3.rgb(234, 162, 162))
                    .attr("strke-width", 1)
                    .attr("stroke-dasharray", "10 8")
            
                    
        panel_svg.append("circle")
                    .attr("id", "red_circle")
                    .attr("r", circle4_r)
                    .attr("cx", circle_x)
                    .attr("cy", circle_y)
                    .attr("fill", d3.rgb(255, 255, 255))


        
        panel_svg.append("line")
                        .attr("x1", circle_x)
                        .attr("y1", circle_y - circle1_r)
                        .attr("x2", circle_x)
                        .attr("y2", circle_y - circle1_r - 5)
                        .attr("stroke", d3.rgb(182, 194, 236))
                        .attr("stroke-width", "1px")
                        .attr("stroke-opacity", "1")
                        .attr("stroke-width", 1)

        var every_page = page_max / 11;

        var num = 12;

        for(i=0;i<num;i++){
            var angle = -30;
            var line_l = circle1_r - 2;
            panel_svg.append("line")
                        .attr("x1", circle_x)
                        .attr("y1", circle_y - circle1_r)
                        .attr("x2", circle_x)
                        .attr("y2", circle_y)
                        .attr("stroke", d3.rgb(182, 194, 236))
                        .attr("stroke-width", "1px")
                        .attr("stroke-opacity", "1")
                        .attr("stroke-width", 1)
                        .attr("transform", "rotate(" + -angle * i + "," + circle_x + "," + circle_y + ")")
                        .attr("stroke-dasharray",  "4 106");
            
            var page_text = parseInt(every_page * i + 0.5);
            var page_text_size1 = 9
            var circle5_r = circle1_r - 8;
            // console.log(Math.sin(1.7))
            panel_svg.append("text")
                        .attr("x", circle_x - (circle5_r - page_text_size1 / 2) * Math.sin(angle * i *(Math.PI / 180)) )
                        .attr("y", circle_y - (circle5_r - page_text_size1 / 2) * Math.cos(angle * i *(Math.PI / 180)))
                        .attr("font-weight", 400)
                        .attr("font-size", page_text_size1)
                        .style("fill",  d3.rgb(182, 194, 236))
                        .attr('text-anchor',"middle")
                        .text(page_text.toString());
        }

        
        
        //绘制Page number,页码数
        var p_text = "Page number";
        var p_text_size = 8;            
        panel_svg.append("text")
                    .attr("x", circle_x)
                    .attr("y", circle_y - circle1_r - p_text_size)
                    .attr("font-weight", 400)
                    .attr("font-size", p_text_size)
                    .style("fill",  d3.rgb(182, 194, 236))
                    .attr('text-anchor',"middle")
                    .text(p_text);
        
        //绘制起始时间和终点时间
        var angle_g = panel_svg.append("g").attr("transform", "translate(" + circle_x + "," + circle_y + ")");
        var start_page = data[0].page_start;
        var end_page = data[0].page_end;
        console.log(start_page, end_page)
        var angle_max = Math.PI * 11 / 6
        var start_angle = angle_max / page_max * start_page;
        var end_angle = angle_max / page_max * end_page;
        console.log(start_angle, end_angle)
        var arc = d3.arc()
                .innerRadius(circle1_r + 3) 
                .outerRadius(circle1_r - 3) 
                .startAngle(start_angle) 
                .endAngle(end_angle); 
        
        angle_g.append("path") 
                .attr("class", "arc") 
                .attr("d", arc) 
                .attr("fill", d3.rgb(182, 194, 236)); 


        //绘制地点和时间
        var circle_rect_dis = 10;
        var time_width = circle4_r*2 - 60;
        var time_height = circle_rect_dis*2;
        var time_x = circle_x - time_width/2;
        var time_y = circle_y - time_height - circle_rect_dis/2;
        

        var place_x = time_x;
        var place_y = circle_y  + circle_rect_dis/2;
        var place_width = time_width;
        var place_height = time_height;
        var r = 3;  
        panel_svg.append("rect")
                    .attr("id", "time_group")
                    .attr("x", time_x)
                    .attr("y", time_y)
                    .attr("width", time_width)
                    .attr("height", time_height)
                    .attr("rx", r)
                    .attr("ry", r)
                    .attr("fill", d3.rgb(255, 255, 255))
                    .attr("stroke", d3.rgb(62, 177, 204))
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "5 2");

        var time_input = document.getElementById("time_input");
        var place_input = document.getElementById("place_input");
        time_input.style.position = 'absolute'
        time_input.style.marginLeft = time_x +'px';
        time_input.style.marginTop = time_y +'px';
        time_input.style.width = time_width - 4 + 'px';
        time_input.style.height = time_height + 'px';
        time_input.value = data[0].time;
        
        place_input.style.position = 'absolute'
        place_input.style.marginLeft = place_x +'px';
        place_input.style.marginTop = place_y +'px';
        place_input.style.width = place_width - 4 + 'px';
        place_input.style.height = place_height + 'px';
        place_input.value = data[0].place;

        

        panel_svg.append("rect")
                    .attr("id", "place_group")
                    .attr("x", place_x)
                    .attr("y", place_y)
                    .attr("width", place_width)
                    .attr("height", place_height)
                    .attr("rx", r)
                    .attr("ry", r)
                    .attr("fill", d3.rgb(255, 255, 255))
                    .attr("stroke", d3.rgb(93, 219, 161))
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "5 2");

        var the_second_lien_y1 = circle_y + circle1_r + 30;
        panel_svg.append("line")
                    .attr("id", "vertical_line")
                    .attr("x1", vertical_line_x)
                    .attr("y1", the_second_lien_y1)
                    .attr("x2", vertical_line_x)
                    .attr("y2", the_second_lien_y1+between_height*2)
                    .attr("stroke", "black")
                    .attr("stroke-width", "1px")
                    .attr("stroke-opacity", "1");
        
        var event_input = document.getElementById("event_input");

        var event_x = person_group_x;
        var event_y = circle_y + circle1_r + 24 - 1 - 5;
        var event_width = person_group_width + 1;
        var event_height = between_height*2+7*2.5;


        panel_svg.append("rect")
                    .attr("id", "place_group")
                    .attr("x", event_x)
                    .attr("y", event_y)
                    .attr("width", event_width)
                    .attr("height", event_height)
                    .attr("rx", r)
                    .attr("ry", r)
                    .attr("fill", d3.rgb(255, 255, 255))
                    .attr("stroke", d3.rgb(237, 218, 110))
                    .attr("stroke-width", 1)
                    .attr("stroke-dasharray", "5 2");

        event_input.style.position = 'absolute';
        event_input.style.marginLeft = event_x +'px';
        event_input.style.marginTop = event_y +'px';
        event_input.style.width = event_width - 4 + 'px';
        event_input.style.height = event_height - 5 + 'px';
        event_input.value = data[0].event;

        if(bj_flag == 0){
            event_input.disabled = "disable";
            place_input.disabled = "disable";
            time_input.disabled = "disable";
        }
        else{
            event_input.disabled = false;
            place_input.disabled = false;
            time_input.disabled = false;
        }

        d3.select('#time_input')
            .on('keyup',function() {
                data[0].time = this.value
                session.time.value = this.value
                curSessionDetail[0].time = this.value
            })

        d3.select('#place_input')
            .on('keyup',function() {
                data[0].place = this.value
                session.place.value = this.value
                curSessionDetail[0].place = this.value
            })

        d3.select('#event_input')
            .on('keyup',function() {
                data[0].event = this.value
                session.event.value = this.value
                curSessionDetail[0].event = this.value
            })

        //导进图片
        event_img_width = 25;
        event_img_x = vertical_line_x - event_img_width ;
        event_img_y = event_y + event_height
        var event_img = document.getElementById("event_img")
        event_img.style.left = event_img_x + "px";
        event_img.style.top = event_img_y + 'px';
        panel_svg.append("text")
                    .attr("x", event_img_x + event_img_width/8 +2) 
                    .attr("y", event_y + event_img_width + 10)
                    .attr("font-weight", 800)
                    .attr("font-size", p_text_size)
                    .style("fill",  "black")
                    // .style("fill",  d3.rgb(182, 194, 236))
                    .attr('text-anchor',"middle")
                    .text("Event");

        d3.select("#bj_img")
            .on("click", function(){
                if(bj_flag == 0){
                    bj_flag = 1;
                }
                draw_panel();
                console.log(bj_flag)
            })

        d3.select("#ok_img")
            .on("click", function(){
                if(bj_flag == 1){
                    bj_flag = 0;
                }

                console.log('confirm');
                _g.clearRect(0, 0, _rc.width, _rc.height);
        
                if(curSessionID === ''){ //new session TODO
                    session.curtime = transTimestamp()
                    console.log(session);
                    saveObjectIntoDatabase(session).then((status)=>{
                        if(status === 200)	console.log('Save successfully !!!');
                        getAllObjects()
                    })
                }else{ // modify session
                                    //动画效果
                    let newPersonList = []
                    for(let index in person_click_flag_array){
                        if (person_click_flag_array[index] === 1) {
                            newPersonList.push(persons_array[index])
                        }
                    }
                    newPersonList = newPersonList.join(',')
                    curSessionDetail[0].persons = newPersonList
                    session.person.value = newPersonList
                    session.curtime = transTimestamp()

                    console.log(session);
                    console.log(curSessionDetail);

                    findByIdAndUpdateObjectIntoDatabase(session).then((status)=>{
                        if(status === 200)	console.log('Modify successfully !!!');
                        getAllObjects()
                    })
                }
                
                draw_panel();
            })
        
        draw_total_circle(circle_x, circle_y, circle3_r);
    }
    draw_panel()
}