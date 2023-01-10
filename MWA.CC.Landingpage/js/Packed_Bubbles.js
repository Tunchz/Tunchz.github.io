// var sizeDivisor = 100;
const packedBubbleViz = (graphData, containerEl, sizeDivisor = 120) => {
    // console.log("--- containerEl : ", containerEl)
    // var containerEl =  "viz-container"
    var width = document.getElementById(containerEl).clientWidth, 
        height = document.getElementById(containerEl).clientHeight, 
        // sizeDivisor = 100, 
        nodePadding = 1.5;

    var offsetTop = document.getElementById(containerEl).offsetTop,
        offsetLeft = document.getElementById(containerEl).offsetLeft;

    graphData = graphData.map(r=>types(r))
    
    var diameter = Math.min(width,height), //500,
    format = d3.format(",d"),
    dataSource = 0;

    var pack = d3.layout.pack()
        .size([diameter - 4, diameter - 4])
        .sort( function(a, b) {
            return (a.value - b.value);
        })
        .value(function(d) { return d.value; });

    var svg = d3.select("#"+containerEl).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("transform",  "translate("+(width-diameter)/2+","+(height-diameter)/2+")");

    var Tooltip = d3.select("#"+containerEl)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip");
    

    // var data = graphData;
    var data = {
        name: "root",
        children: graphData,
    }

    var node = svg.datum(data).selectAll(".node")
        .data(pack.nodes)
        .enter()
        .append("g");



    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        Tooltip
        .style("opacity", d.name=='root'?0:1)
    }
    var mousemove = function(d) {
        Tooltip
        .html('<strong>' + d.name + '</strong>' + "<br>" + d.value + " ")
        .style("left", (d3.mouse(this)[0]+20+offsetLeft) + "px")
        .style("top", (d3.mouse(this)[1]+offsetTop) + "px")
        .style("opacity", d.name=='root'?0:1)
    }
    var mouseleave = function(d) {
        Tooltip
        .style("opacity", 0)
    }

    // var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
    var color = d3.scale.ordinal().domain(data, (function(d) {
        return d.name
    }))
    .range(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);


    var circles = node.append("circle")
        .attr("class", d=>d.name=='root'?"packed-bubble-root":"packed-bubble")
        .attr("stroke", d=>d.name=='root'?'#fff0':'#fff0')
        .attr("stroke-width", 5)
        // .attr("opacity",0)
        // .style("fill", function(d) { return !d.children ? "tan" : "beige"; })
        .attr("fill", function(d) { return d.name=='root'?'#fff0': (!d.hideLabel?d.color:"#eee" )})//color(d.name); })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        // .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

        
    var titles = node.append("text")
        .attr("class", "packed-bubble-title")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + 0 + "," + 5 + ")"; })
        .append("tspan")
        .attr("x", d=>d.x)
        .attr("y", d=>d.y)
        // .html(d=>d.name + '/' + d.continent  + "<br>" + d.gdp + " ");
        .text(d=> d.name=='root'||d.hideLabel?'':d.name + "\n");

    // updateVis();

    function updateVis() {
        titles.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .text(function(d) { return d.name +
                (d.children ? "" : ": " + format(d.value)); });

        circles.transition()
            .duration(500)
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("r", function(d) { return d.r; });
    };






    //     // console.log("--- width,height : ", document.getElementById(containerEl), width, height)
    // var svg = d3.select("#"+containerEl)
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height);

    // var node;




    // var simulation = d3.layout.force() //d3.forceSimulation()
    //     // .force("forceX", d3.forceX().strength(.1).x(width * .5))
    //     // .forceX().strength(.1).x(width * .5)
    //     // .force("forceY", d3.forceY().strength(.1).y(height * .5))
    //     // .forceY().strength(.1).y(height * .5)
    //     // .force("center", d3.forceCenter().x(width * .5).y(height * .5))
    //     .size([(width), (height)])
    //     // .force("charge", d3.forceManyBody().strength(-15));
    //     .charge(-15)
    //     .start()






    // d3.csv("https://tunchz.github.io/files/data/country_gdp.csv", types, function(error,graph){
    //   if (error) throw error;


    // sort the nodes so that the bigger ones are at the back

    //update the simulation based on the data
    // simulation
    //     .nodes(graphData)
    //     // .force("collide", d3.forceCollide().strength(.5).radius(function(d){ return d.radius + nodePadding; }).iterations(1))
    //     .on("tick", function(d){
    //         node
    //             .attr("cx", function(d){ return d.x; })
    //             .attr("cy", function(d){ return d.y; })
    //     });

    // node = svg.append("g")
    //     .attr("class", "node")
    //     .selectAll("circle")
    //     .data(graphData)
    //     .enter().append("circle")
    //         .attr("r", function(d) { return d.radius; })
    //         .attr("fill", function(d) { return color(d.continent); })
    //         .attr("cx", function(d){ return d.x; })
    //         .attr("cy", function(d){ return d.y; })
    //         .on("mouseover", mouseover) // What to do when hovered
    //         .on("mousemove", mousemove)
    //         .on("mouseleave", mouseleave)
    //         // .call(d3.drag()
    //         //     .on("start", dragstarted)
    //         //     .on("drag", dragged)
    //         //     .on("end", dragended));

    

    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
    }

    function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    }

    function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
    }

    function types(d){
        // d.gdp = +d.gdp;
        d.size = d.value;
        d.size < 3 ? d.radius = 3 : d.radius = d.size;
        // d.name = d.name;
        return d;
    }
};

// d3.csv("https://tunchz.github.io/files/data/country_gdp.csv", types, function(error,data){
//     if (error) throw error;
    var dataPipeType = [
        {
            "name": "PB-20mm",
            "value": 42,
            "continent": "Americas",
            color: "#1976d2"
        },
        {
            "name": "AC-300mm",
            "value": 23,
            "continent": "Asia",
            color: "#0097a7"
            
        },
        {
            "name": "PVC-300mm",
            "value": 11,
            "continent": "Asia",
            color: "#388e3c"
            
        },
        {
            "name": "ST-400mm",
            "value": 3,
            "continent": "Europe",
            color: "#0081B4"
        },
        {
            "name": "GV-400mm",
            "value": 2,
            "continent": "Europe",
            color: "#7b1fa2"
        },
    ];

    var dataComplainType = [
        {
            "name": "น้ำขุ่นมีกลิ่น",
            "value": 225,
            "continent": "Americas",
            color: "#1976d2"
        },
        {
            "name": "งานซ่อมท่อ",
            "value": 105,
            "continent": "Asia",
            color: "#0097a7"
        },
        {
            "name": "งานวางท่อ",
            "value": 42,
            "continent": "Asia",
            color: "#388e3c"
        },
        {
            "name": "ใบแจ้งหนี้ค่าน้ำ",
            "value": 60,
            "continent": "Europe",
            color: "#0081B4"
        },
        {
            "name": "ค่าน้ำผิดปกติ",
            "value": 16,
            "continent": "Europe",
            color: "#7b1fa2"
        },
    ];

    var dataComplain = [
        {
            "name": "น้ำขุ่นมีกลิ่น",
            "value": 225,
            "continent": "Americas",
            color: "#1976d2",
            hideLabel: true,
            children: [
                {
                    name: "unit A",
                    value: 125,
                    color: "#1976d2",
                },
                {
                    name: "unit B",
                    value: 25,
                    color: "#1976d2",
                },
                {
                    name: "unit C",
                    value: 75,
                    color: "#1976d2",
                },
            ]
        },
        {
            "name": "งานซ่อมท่อ",
            "value": 105,
            "continent": "Asia",
            color: "#0097a7",
            hideLabel: true,
            children: [
                {
                    name: "unit B",
                    value: 13,
                    color: "#0097a7",
                },
                {
                    name: "unit D",
                    value: 50,
                    color: "#0097a7",
                },
                {
                    name: "unit J",
                    value: 42,
                    color: "#0097a7",
                },
            ]
        },
        {
            "name": "งานวางท่อ",
            "value": 42,
            "continent": "Asia",
            color: "#388e3c",
            hideLabel: true,
            children: [
                {
                    name: "",
                    value: 22,
                    color: "#388e3c",
                },
                {
                    name: "",
                    value: 7,
                    color: "#388e3c",
                },
                {
                    name: "",
                    value: 6,
                    color: "#388e3c",
                },
                {
                    name: "",
                    value: 4,
                    color: "#388e3c",
                },
                {
                    name: "",
                    value: 3,
                    color: "#388e3c",
                },
            ]
        },
        {
            "name": "ใบแจ้งหนี้ค่าน้ำ",
            "value": 60,
            "continent": "Europe",
            color: "#0081B4",
            hideLabel: true,
            children: [
                {
                    name: "",
                    value: 30,
                    color: "#0081B4",
                },
                {
                    name: "",
                    value: 17,
                    color: "#0081B4",
                },
                {
                    name: "",
                    value: 6,
                    color: "#0081B4",
                },
                {
                    name: "",
                    value: 4,
                    color: "#0081B4",
                },
                {
                    name: "",
                    value: 3,
                    color: "#0081B4",
                },
            ]
        },
        {
            "name": "ค่าน้ำผิดปกติ",
            "value": 16,
            "continent": "Europe",
            color: "#7b1fa2",
            hideLabel: true,
            children: [
                {
                    name: "",
                    value: 6,
                    color: "#7b1fa2",
                },
                {
                    name: "",
                    value: 3,
                    color: "#7b1fa2",
                },
                {
                    name: "",
                    value: 3,
                    color: "#7b1fa2",
                },
                {
                    name: "",
                    value: 2,
                    color: "#7b1fa2",
                },
                {
                    name: "",
                    value: 2,
                    color: "#7b1fa2",
                },
            ]
        },
    ];
   
    // data = data.sort((a,b)=>{ return a.gdp - b.gdp; }).slice(0,5);

    // console.log("--- data : ", data)
    // packedBubbleViz(data, "job-viz-container")
    // function onResize() {
    //     console.log("---- onResize")
    //     packedBubbleViz(dataPipeType, "job-viz-container")
    // }
    // document.getElementById("job-viz-container").onresize = onResize();
    // document.getElementById("job-viz-container").setAttribute("onresize","onResize()");
    // document.getElementById("job-viz-container").addEventListener("resize", onResize);

    packedBubbleViz(dataComplainType, "complain-viz-container")
    packedBubbleViz(dataComplain, "complain2-viz-container")