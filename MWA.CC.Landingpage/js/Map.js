var reset;


function mapGraph() {
var containerEl = "map-container";

var width = document.getElementById(containerEl).clientWidth, 
    height = document.getElementById(containerEl).clientHeight, 
    active;

var offsetTop = document.getElementById(containerEl).offsetTop,
  offsetLeft = document.getElementById(containerEl).offsetLeft;
var color = d3.scale.category10();

var projection = d3.geo.mercator()
                .translate([width*0.66, height/2])
                .rotate([0, 0])
                .center([100.6, 13.8])
                .scale(55000);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#"+containerEl).append("svg")
    .attr("id", "map-svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("id", "map-bg")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g");



function click(d) {
  if (active === d) return reset();
  active = d;

  var b = path.bounds(d);
  g.transition().duration(750).attr("transform",
      "translate(" + projection.translate() + ")"
      + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");

  if (d.layer != 'dma') {
    g.selectAll(".active").classed("active", false);
    g.selectAll(".inactive").classed("inactive", false);
    d3.selectAll(".branch").classed("inactive", true);
    d3.select(this).classed("inactive", false).classed("active", true);
    document.getElementById("sticky-map-label").style.visibility = "visible";
    document.getElementById("selected-label").innerHTML = d.name
    document.getElementById("map-svg").classList.add("zoom")

    d3.selectAll(".dma").classed("inactive", true);
    d3.selectAll(".dma-"+d.branch).classed("inactive", false).classed("active", true);
  } else {
    d3.selectAll(".job-loc-"+d.name).classed("active", true);
    document.getElementById("map-svg").classList.add("zoom-dma")
  }
}

reset = function () {
  g.selectAll(".active").classed("active", active = false);
  g.selectAll(".inactive").classed("inactive", active = false);
  g.transition().duration(750).attr("transform", "");
  document.getElementById("sticky-map-label").style.visibility = "hidden";
  document.getElementById("selected-label").innerHTML = ""
  document.getElementById("map-svg").classList.remove("zoom")
  document.getElementById("map-svg").classList.remove("zoom-dma")

  d3.selectAll(".dma").classed("inactive", false).classed("active", false);
}

function onover(d,i) {
    d3.select(this).style("fill", "#5522aa")
    d3.selectAll("."+d.layer+"-label-"+d.branch).classed("active", true);
    d3.selectAll("."+d.layer+"-label-"+d.name).classed("active", true);
  }

function onmove(d,i) {
  // console.log("----d : ", d)
  var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );

  tooltip
    .classed("hidden", false)
    .attr("style", "left:"+(mouse[0]+25+offsetLeft)+"px;top:"+(mouse[1]+offsetTop)+"px")
    .html(d.name)

}

function onout(d,i) {
  d3.select(this).style("fill", "#31A2E2")
  tooltip.classed("hidden", true)
  d3.selectAll("."+d.layer+"-label-"+d.branch).classed("active", false);
  d3.selectAll("."+d.layer+"-label-"+d.name).classed("active", false);
}

var tooltip = d3.select("#"+containerEl).append("div")
    .attr("class", "map-tooltip");

queue()
    .defer(d3.json, "https://tunchz.github.io/CIA/geoJson/WMA_Admin_Level1_2.topojson")
    .defer(d3.json, "https://tunchz.github.io/CIA/geoJson/WMA_DMA2.topojson")
    .await(ready);

    
function ready(error, Admin, DMA) {

  // console.log("--- Admin : ", Admin, DMA)
  var branchs = topojson.object(Admin, Admin.objects.WMA_Admin_Level1).geometries;
      // neighbors = topojson.neighbors(world, branchs),
      // i = -1,
      // n = branchs.length;
      
  var job_loc = [
    {lon:100.365442, lat:13.725726, branch:"11", dma:"110704"},
    {lon:100.521297, lat:13.7633022, branch:"06", dma:"060510"},
    {lon:100.5977312, lat:13.8267977, branch:"12", dma:"120104"},
    {lon:100.6039908, lat:13.8035124, branch:"12", dma:"120206"}
  ];
  var job_stats = {
    "11":{
      request: 1,
    },
    "06":{
      request: 1,
    },
    "12":{
      request: 2,
    },
    "110704":{
      request: 1,
    },
    "060510":{
      request: 1,
    },
    "120104":{
      request: 1,
    },
    "120206":{
      request: 1,
    }

  }

  // var temp = Admin.objects.WMA_DMA.geometries.map(r,i=>!r.type&&console.log(i))
  branchs.map(function(d,i) { 
    // console.log("--- d : ", d)
    // var tryit = names.filter(function(n) { return d.id == n.id; })[0];
    var tryit = Admin.objects.WMA_Admin_Level1.geometries[i].properties
    if (typeof tryit === "undefined"){
      d.name = "Undefined";
    } else {
      d.name = tryit.NAME; 
      d.branch = tryit.DISTRICT_I;
      d.layer = "branch";
      d.stats = job_stats[d.branch]?job_stats[d.branch]:{request:0}
    }
  });
  
  var dmas = topojson.object(DMA, DMA.objects.WMA_DMA).geometries;
  dmas.map(function(d,i) { 
    // console.log("--- d : ", d)
    // var tryit = names.filter(function(n) { return d.id == n.id; })[0];
    var tryit = DMA.objects.WMA_DMA.geometries[i].properties
    // console.log("--- tryit: ", tryit)
    if (typeof tryit === "undefined"){
      d.name = "Undefined";
    } else {
      d.name = tryit.BLOCKNAME || 'unknown'
      d.dma = tryit.BLOCKNAME || 'unknown'
      d.branch = tryit.BLOCKNAME?tryit.BLOCKNAME.substring(0,2):'unknown'
      d.layer = "dma";
      d.stats = job_stats[d.name]?job_stats[d.name]:{request:0}
    }
  });
  dmas = dmas.filter(r=>r.name!='unknown')


//   console.log("--- branchs : ", branchs)
//   console.log("--- dmas : ", dmas)

var branch = g.selectAll(".branch")
      .data(branchs)
      .enter()
      .append("path")
      .attr("class", "branch")    
      .attr("title", function(d,i) { return d.name; })
      .attr("d", path)
      .on("click", click)
      // .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return branchs[n].color; }) + 1 | 0); });
      .style("fill", "#31A2E2")
      .on("mouseover", onover)
      .on("mousemove", onmove)
      .on("mouseout",  onout);

  
  var labels = g.append("g")
      .attr("id", "branch-label")
        .selectAll("text")
        .data(branchs)
        .enter()
        .append("svg:text")
        .attr("class", r=>"branch-label branch-label-"+r.branch) 
        .text(function(d){
          return d.name;
        })
        .attr("x", function(d){
            return path.centroid(d)[0];
        })
        .attr("y", function(d){
            return  path.centroid(d)[1]-5;
        })
        .attr("text-anchor","middle")
        .attr('fill', 'white');

  var branchStatsLabel = g.append("g")
        .attr("id", "branch-stats")
        .selectAll("g")
        .data(branchs)
        .enter()
        .append("g")
        .attr("class", d=>"branch-stats branch-stats-"+d.branch+ (d.stats.request==0?" hidden":""))


  branchStatsLabel.append("circle")
        // .attr("class", d=>"branch-stats branch-stats-"+d.branch)
        .attr("cx", d=>path.centroid(d)[0])
        .attr("cy", d=>path.centroid(d)[1])
        .attr("r", 14)
        .attr("fill", "#FFF")

  branchStatsLabel.append("svg:text")
        // .attr("class", d=>"branch-stats branch-stats-"+d.branch)
        .attr("x", d=>path.centroid(d)[0])
        .attr("y", d=>path.centroid(d)[1]+5)
        .text(d => d.stats.request)
        .attr("text-anchor","middle")
        .attr('fill', 'black')


  var dma = g.selectAll(".dma")
      .data(dmas)
      .enter()
      .append("path")
      .attr("class", r=>"dma dma-"+r.branch)    
      .attr("title", function(d,i) { return d.name; })
      .attr("d", path)
      .on("click", click)
      .style("stroke", "#FFF")
      .style("fill", "#31A2E200")
      .on("mouseover", onover)
      .on("mousemove", onmove)
      .on("mouseout",  onout);
  
  var dmaLabels = g.append("g")
      .attr("id", "dma-label")
      .selectAll("text")
      .data(dmas)
      .enter()
      .append("svg:text")
      .attr("class", r=>"dma-label dma-label-"+r.name) 
      .text(function(d){
        return d.name;
      })
      .attr("x", function(d){
          return path.centroid(d)[0];
      })
      .attr("y", function(d){
          return  path.centroid(d)[1]-2;
      })
      .attr("text-anchor","middle")
      .attr('fill', 'white');

  var dmaStatsLabel = g.append("g")
      .attr("id", "dma-stats")
      .selectAll("g")
      .data(dmas)
      .enter()
      .append("g")
      .attr("class", d=>"dma-stats dma-stats-"+d.dma+ (d.stats.request==0?" hidden":""))
      .attr("visibility","hidden")


  dmaStatsLabel.append("circle")
        // .attr("class", d=>"dma-stats dma-stats-"+d.dma)
        .attr("cx", d=>path.centroid(d)[0])
        .attr("cy", d=>path.centroid(d)[1])
        .attr("r", 2)
        .attr("fill", "#FFF")

  dmaStatsLabel.append("svg:text")
        // .attr("class", d=>"dma-stats dma-stats-"+d.dma)
        .attr("x", d=>path.centroid(d)[0])
        .attr("y", d=>path.centroid(d)[1]+1)
        .text(d => d.stats.request)
        .attr("text-anchor","middle")
        .attr('fill', 'black')





  // job_loc = [{lon:100.365442, lat:13.725726, branch:"11", dma:"110704"},{lon:100.521297, lat:13.7633022, branch:"06", dma:"060510"}]
  var stats = g.append("g")
    .attr("id", "job-loc")
    .selectAll("circle")
    .data(job_loc)
    .enter()
    .append("circle")
    .attr("class", d=>"job-loc job-loc-"+d.dma)
    .attr("cx", d=>projection([d.lon,d.lat])[0])
    .attr("cy", d=>projection([d.lon,d.lat])[1])
    .attr("r", 0.3)
    .attr("fill", "#F00");

}

}

mapGraph();