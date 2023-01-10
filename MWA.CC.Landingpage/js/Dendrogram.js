// var sizeDivisor = 100;
const dendrogramViz = (jsonData, containerEl) => {
    // console.log("--- containerEl : ", containerEl)
    // var containerEl =  "viz-container"
    var width = document.getElementById(containerEl).clientWidth, 
        height = document.getElementById(containerEl).clientHeight, 
        // sizeDivisor = 100, 
        nodeRadius = 6,
        tooltipBallRadius = 15,
        nodePadding = 1.5;

    var offsetTop = document.getElementById(containerEl).offsetTop,
        offsetLeft = document.getElementById(containerEl).offsetLeft;
    
    var diameter = Math.min(width,height), //500,
    format = d3.format(",d"),
    dataSource = 0;


    var svg = d3.select("#"+containerEl).append("svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("transform",  "translate("+(width-diameter)/2+","+(height-diameter)/2+")");

    // var svg = d3.select("#lsa-svg")

    //  var svg = d3.select("#"),
    //  width = +svg.attr("width"),
    //  height = +svg.attr("height"),

     g = svg.append("g")
        .attr("class", "dendrogram")
        // .attr("width", width-50)
        .attr("height", height-50)
        .attr("transform", "translate(0,50)");       // move right 20px.

    // x-scale and x-axis
    var experienceName = ["", "Basic 1.0","Alright 2.0","Handy 3.0","Expert 4.0","Guru 5.0"];
    var formatSkillPoints = function (d) {
        return experienceName[d % 6];
    }
    var xScale =  d3.scale.linear()
        .domain([0,5])
        .range([0, 100]);

    var xAxis = d3.svg.axis()
            // .attr("width", width/5)
            .scale(xScale)
            .ticks(50)
    		.tickFormat(formatSkillPoints)
    		.orient("top");


        
    // Setting up a way to handle the data
    var tree = d3.layout.cluster()                 // This D3 API method setup the Dendrogram datum position.
        .size([width, height-200])    // Total width - bar chart width = Dendrogram chart width
        .separation(function separate(a, b) {
            return a.parent == b.parent            // 2 levels tree grouping for category
            || a.parent.parent == b.parent
            || a.parent == b.parent.parent ? 0.4 : 0.8;
        });


    var Tooltip = d3.select("#"+containerEl)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip");
    






    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
        .style("opacity", d.id=='สาขา'?0:1)
    }
    var mousemove = function(d) {
        Tooltip
        .html('<strong>' + d.id + '</strong>' + "<br>" + d.value + " ")
        .style("left", (d3.mouse(this)[0]+20) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
        .style("opacity", d.id=='สาขา'?0:1)
    }
    var mouseleave = function(d) {
        Tooltip
        .style("opacity", 0)
    }


    var diagonal = d3.svg.diagonal()    
    // .projection (function(d) { return [d.y, d.x];}); 
    .projection (function(d) { return [d.x, d.y];}); 

    var nodes = tree.nodes(jsonData);

    // Draw every datum a line connecting to its parent.
    var link = g.selectAll(".link")
            .data(tree.links(nodes))
            .enter().append("path")
            .attr("class", "link")
            .attr("d",diagonal);
            // .attr("d", elbow);

    // Setup position for every datum; Applying different css classes to parents and leafs.
    var node = g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
            // .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    // Draw every datum a small circle.
    node.append("circle")
            .attr("fill", d=>d.sla==3?"#FF4842":d.sla==2?"#FFC107":"#54D62C")
            .attr("r", d=>d.children ? nodeRadius : nodeRadius+3);

    // Setup G for every leaf datum.
    var leafNodeG = g.selectAll(".node--leaf")
            .append("g")
            .attr("class", "node--leaf-g")
            // .attr("transform", "translate(" + 8 + "," + -13 + ")");
            .attr("transform", "translate(" + -13 + "," + 8 + ")");

    leafNodeG.append("rect")
            .attr("class","shadow")
            .style("fill", function (d) {return "#31A2E2" || d.color;})
            // .attr("width", 2)
            // .attr("height", 30)
            .attr("width", 20)
            .attr("height", 2)
            .attr("rx", 2)
            .attr("ry", 2)
            // .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition()
            .duration(800)
            // .attr("width", function (d) {return xScale(d.value);});
            .attr("height", function (d) {return xScale(d.value);})
            .attr("transform", "translate(" + 3 + "," + 3 + ")");

    leafNodeG.append("text")
            .attr('class', 'label')
            // .attr("dy", 19.5)
            // .attr("x", 8)
            .attr("y", -10)
            .attr("x", 5)
            .style("text-anchor", d => d.children ? "end" : "start")
            .attr("transform", "translate(0,0), rotate(90)")
            .attr("color", "#000")
            .text(function (d) {
                return d.id.substring(d.id.lastIndexOf(".") + 1);
            });

    // node.append("text")
    // .attr("dx", function(d) { return d.children ? -8 : 8; })
    // .attr("dy", 3)
    // .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
    // .text(function(d) { return d.name; });



    // Write down text for every parent datum
    var internalNode = g.selectAll(".node--internal");
    internalNode.append("text")
            .attr("y", -10)
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.id.substring(d.id.lastIndexOf(".") + 1);
            });

    // Attach axis on top of the first leaf datum.
    var firstEndNode = g.select(".node--leaf");
        firstEndNode.insert("g")
                .attr("class","xAxis")
                // .attr("transform", "translate(" + 7 + "," + -14 + ")")
                .attr("transform", "translate(" + -14 + "," + 7 + ")")
                // .call(xAxis);

        // tick mark for x-axis
        firstEndNode.insert("g")
                .attr("class", "grid")
                // .attr("transform", "translate(7," + (height - 15) + ")")
                .attr("transform", "translate(" + (height - 15) + ",7)")
                // .call(d3.axisBottom()
                //         .scale(xScale)
                //         .ticks(5)
                //         .tickSize(-height, 0, 0)
                //         .tickFormat("")
                // );

    // Emphasize the y-axis baseline.
    svg.selectAll(".grid").select("line")
            .style("stroke-dasharray","20,1")
            .style("stroke","black");

    // The moving ball
    var ballG = svg.insert("g")
            .attr("class","ballG")
            .attr("transform", "translate(" + 1100 + "," + height/2 + ")");
    ballG.insert("circle")
            .attr("class","shadow")
            .style("fill","steelblue")
            .attr("r", nodeRadius + 1);
    ballG.insert("text")
            .style("text-anchor", "middle")
            .attr("dy",nodeRadius + 1)
            .text("0.0");

    // Animation functions for mouse on and off events.
    d3.selectAll(".node--leaf-g")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

    function handleMouseOver(d) {
        var leafG = d3.select(this);

        leafG.select("rect")
                .attr("stroke","#4D4D4D")
                .attr("stroke-width","2");


        var ballGMovement = ballG.transition()
                .duration(400)
                // .attr("transform", "translate(" + (d.y + xScale(d.value) + 90) + "," + (d.x + 1.5) + ")");
                .attr("transform", "translate(" + (d.x + 1.5) + "," + (d.y + xScale(d.value) + 90) + ")");

        ballGMovement.select("circle")
                .style("fill", d.color)
                .attr("r", tooltipBallRadius);

        ballGMovement.select("text")
                .delay(300)
                .text(Number(d.value).toFixed(1));
    }
    function handleMouseOut() {
        var leafG = d3.select(this);

        leafG.select("rect")
                .attr("stroke-width","0");
    }


    function elbow(d, i) {
        console.log("---d : ", d)
        // return "M" + d.source.y + "," + d.source.x
        // 	+ "V" + d.target.x + "H" + d.target.y;

        return "M" + d.source.y + "," + d.source.x
                + "C" + (d.target.y + 100) + "," + d.source.x
                + " " + (d.target.y + 100) + "," + d.target.x
                + " " + d.target.y + "," + d.target.x;

    }

    function row(d) {
        return {
            id: d.id,
            value: +d.value,
            color: d.color
        };
    }

 

};

// d3.csv("https://tunchz.github.io/files/data/country_gdp.csv", types, function(error,data){
//     if (error) throw error;
var jsonData = {
    id:"สาขา",
    children:[
        {
            id: "สาขา.ภาค 1",
            children:[
                {
                    id: "สาขา.ภาค 1.สุขุมวิท",
                    value: 1,
                    color: "#808080",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 1.พระโขนง",
                    value: 0.5,
                    color: "#2E2575",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 1.สมุทรปราการ",
                    value: 3,
                    color: "#D6BA33",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 1.ทุ่งมหาเมฆ",
                    value: 1.5,
                    color: "#FF9900",
                    sla: 1
                },
            ]
        },
        {
            id: "สาขา.ภาค 2",
            children: [
                {
                    id: "สาขา.ภาค 2.พญาไท",
                    value: 1.5,
                    color: "#617CBE",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 2.แม้นศรี",
                    value: 2,
                    color: "#0073AD",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 2.ลาดพร้าว",
                    value: 3,
                    color: "#E58E00",
                    sla: 1
                },

            ]
        },
        {
            id: "สาขา.ภาค 3",
            children:[
                {
                    id: "สาขา.ภาค 3.ประชาชื่น",
                    value: 1,
                    color: "#808080",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 3.บางเขน",
                    value: 0.5,
                    color: "#2E2575",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 3.มีนบุรี",
                    value: 3,
                    color: "#D6BA33",
                    sla: 3
                },
                {
                    id: "สาขา.ภาค 3.สุวรรณภูมิ",
                    value: 1.5,
                    color: "#FF9900",
                    sla: 1
                },
            ]
        },
        {
            id: "สาขา.ภาค 4",
            children:[
                {
                    id: "สาขา.ภาค 4.บางกอกน้อย",
                    value: 1,
                    color: "#808080",
                    sla: 2
                },
                {
                    id: "สาขา.ภาค 4.ตากสิน",
                    value: 0.5,
                    color: "#2E2575",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 4.สุขสวัสดิ์",
                    value: 3,
                    color: "#D6BA33",
                    sla: 1
                },
                {
                    id: "สาขา.ภาค 4.ภาษีเจริญ",
                    value: 1.5,
                    color: "#FF9900",
                    sla: 1
                },
            ]
        },
        {
            id: "สาขา.ภาค 5",
            children:[
                {
                    id: "สาขา.ภาค 5.มหาสวัสดิ์",
                    value: 2,
                    color: "#808080",
                    sla: 1
                },

                {
                    id: "สาขา.ภาค 5.บางบัวทอง",
                    value: 2.5,
                    color: "#040404",
                    sla: 2
                },
                {
                    id: "สาขา.ภาค 5.นนทบุรี",
                    value: 2.5,
                    color: "#040404",
                    sla: 1
                },
            ]
        },
    ]

};
   
    dendrogramViz(jsonData, "sla-viz-container")