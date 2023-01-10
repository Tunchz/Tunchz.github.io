
// function SankeyGraph() {
  var containerEl = "job-viz-container"
  var width = document.getElementById(containerEl).clientWidth, 
      height = document.getElementById(containerEl).clientHeight, 
      active;

  var offsetTop = document.getElementById(containerEl).offsetTop,
    offsetLeft = document.getElementById(containerEl).offsetLeft;

  var units = "คำร้อง";

  var margin = {top: 30, right: 30, bottom: 30, left: 30},
      width = width - margin.left - margin.right,
      height = height - margin.top - margin.bottom;

  var formatNumber = d3.format(",.0f"),    // zero decimal places
      format = function(d) { return formatNumber(d) + " " + units; },
      color = d3.scale.category10();

  // append the svg canvas to the page
  var svg = d3.select("#"+containerEl).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
      .nodeWidth(70)
      .nodePadding(10)
      .size([width, height]);

  var path = sankey.link();



  var graph = {
  "nodes":[
  {"node":0,"level":0,"name":"ซ่อมท่อ",color:"#31a2e2"},
  {"node":1,"level":0,"name":"ร้องเรียน",color:"#dddddd"},
  {"node":2,"level":1,"name":"PB-200mm",color: "#1976d2"},
  {"node":3,"level":1,"name":"AC-300mm",color: "#0097a7"},
  {"node":4,"level":1,"name":"PVC-150mm",color: "#388e3c"},
  {"node":5,"level":1,"name":"ST-300mm",color: "#0081B4"},
  {"node":6,"level":1,"name":"PC-150mm",color: "#7b1fa2"},
  {"node":7,"level":0.5,"name":"",color:"#eee0"},
  {"node":8,"level":1,"name":"",color:"#eee0"},
  ],
  "links":[
  {"source":0,"target":2,"value":42},
  {"source":0,"target":3,"value":23},
  {"source":0,"target":4,"value":11},
  {"source":0,"target":5,"value":3},
  {"source":0,"target":6,"value":2},
  {"source":1,"target":7,"value":45},
  {"source":7,"target":8,"value":1}
  ]}

  // {
  //             "name": "PB-20mm",
  //             "value": 42,
  //             "continent": "Americas",
  //             color: "#1976d2"
  //         },
  //         {
  //             "name": "AC-300mm",
  //             "value": 23,
  //             "continent": "Asia",
  //             color: "#0097a7"
              
  //         },
  //         {
  //             "name": "PVC-300mm",
  //             "value": 11,
  //             "continent": "Asia",
  //             color: "#388e3c"
              
  //         },
  //         {
  //             "name": "ST-400mm",
  //             "value": 3,
  //             "continent": "Europe",
  //             color: "#0081B4"
  //         },
  //         {
  //             "name": "GV-400mm",
  //             "value": 2,
  //             "continent": "Europe",
  //             color: "#7b1fa2"
  //         },


  // load the data
  // d3.json("sankey-formatted.json", function(error, graph) {

    sankey
        .nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

  // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .style("stroke", d=>d.target.color)
        .sort(function(a, b) { return b.dy - a.dy; });

  // add the link titles
    link.append("title")
          .text(function(d) {
          return d.source.name + " → " + 
                  d.target.name + "\n" + format(d.value); });

  // add in the nodes
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("dragstart", function() { 
        this.parentNode.appendChild(this); })
        .on("drag", dragmove));

  // add the rectangles for the nodes
    node.append("rect")
        .attr("height", d=>d.level==0?d.dy:d.dy)
        .attr("width", sankey.nodeWidth())
        // .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
        .style("fill", d=>d.color)
        // .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
        .style("stroke", d=>d.color)
      .append("title")
        .text(function(d) { 
        return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

  // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform", 
          "translate(" + d.x + "," + (
                  d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
              ) + ")");
      sankey.relayout();
      link.attr("d", path);
    }
// }

// SankeyGraph();