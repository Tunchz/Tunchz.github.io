var reset;
const FILE_HOST = 'https://maholan.app/files'



let map_data = {};
let topoJson = true,
    // tooltipContent=(r)=>(`<div>layer : ${r.layer}</div>`),
    statusText = (sla) => sla=='onsla'?"อยู่ใน SLA":sla=='nearsla'?"ใกล์จะเกิน SLA":sla=='oversla'?"เกิน SLA":"ระบุไม่ได้",
    tooltipContent=(r)=>(     
      `<dib style="color:#08254F; text-size: 16px; text-weight: bold, text-align: left;">
        รหัสงาน : ${r.job}<br>
        สาขา   : ${r.branch_name}<br>
        dma    : ${r.dma}<br>
        ประเภทงาน :  ${r.job_type}<br>
        สถานะ SLA :  ${statusText(r.status_sla)}<br>
        lat   : ${r.lat}<br>
        lon   : ${r.lon}<br>
        <br>
        ข้อมูลติดต่อหน่วยงานที่รับผิดชอบ<br>
        ชื่อ     :  ${r.emp_name1}<br>
        ตำแหน่ง :  ${r.emp_pos_name1}<br>
        เบอร์ติดต่อ :  ${r.emp_tel1 }<br>
      </div>`
    ),
    onClick=(r)=>{
      console.log(r);
      r.job&&handleClickMap({branch:r.branch,jobCode:r.job})
    },
    // scale=30000; //400px
    scale = 55500;
const renderMap = function (branchs, dmas, job_locations, branch_max, dma_max) {
  // console.log("---- map_data : ", map_data)
  let width = document.getElementById(map_data.container).clientWidth,
  height = document.getElementById(map_data.container).clientHeight,
  offsetTop = document.getElementById(map_data.container).offsetTop,
  offsetLeft = document.getElementById(map_data.container).offsetLeft;

  scale = 30000 + 25500*(width-400)/(1200-400)

  document.getElementById(map_data.container).innerHTML = ""

  var areaColor = "#0078FF", //"#31A2E2",
      jobColor = "#f00",
      areaHighlightColor = "#5522aa",
      jobHighlightColor = "#5522aa",
      active;

  var branchColor = d3.scale.linear().domain([-5,branch_max])
                    .range(["white", areaColor])
  var dmaColor = d3.scale.linear().domain([-2,dma_max])
                    .range(["white", areaColor])
  
  // var color = d3.scale.category10();
  
  let projection = d3.geo.mercator()
                  .translate([(width>960?width*0.5:width/2), height/2])
                  .rotate([0, 0])
                  .center([100.6, 13.8])
                  .scale(scale);
  
  let path = d3.geo.path()
      .projection(projection);
  
  let svg = d3.select("#"+map_data.container).append("svg")
      .attr("id", "map-svg")
      .attr("width", width)
      .attr("height", height);
  
  // svg.append("rect")
  //     .attr("id", "map-bg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .on("click", reset);
  
  var g = svg.append("g");
  
  
  function click(d) {
    // console.log("--- map d : ", d)
    if (active === d) return reset();
    active = d;
  
    var b = path.bounds(d);
    if (width>500) {
      g.transition().duration(750).attr("transform",
          "translate(" + projection.translate() + ")"
          + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
          + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
    } else {
    
      g.attr("transform",
      "translate(" + projection.translate() + ")"
      + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
    }
    if (d.layer != 'dma') {
      g.selectAll(".active").classed("active", false);
      g.selectAll(".inactive").classed("inactive", false);
      d3.selectAll(".branch").classed("inactive", true);
      d3.select(this).classed("inactive", false).classed("active", true);
      document.getElementById(map_data.container+"-sticky-map-label").style.visibility = "visible";
      document.getElementById(map_data.container+"-sticky-map-label-selected-label").innerHTML = d.name
      handleClickMap({branch:d.branch})
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
    if (width>500) {
      g.transition().duration(750).attr("transform", "");
    } else {
      g.attr("transform", "");
    }
    document.getElementById(map_data.container+"-sticky-map-label").style.visibility = "hidden";
    document.getElementById(map_data.container+"-sticky-map-label-selected-label").innerHTML = ""
    handleClickMap({branch:"", jobCode:""})
    document.getElementById("map-svg").classList.remove("zoom")
    document.getElementById("map-svg").classList.remove("zoom-dma")
  
    d3.selectAll(".dma").classed("inactive", false).classed("active", false);
  }

  // document.getElementById(map_data.container+"-sticky-map-label").onclick = reset;
  
  function onover(d,i) {
      d3.select(this).style("fill", d=>d.layer=='job'?jobHighlightColor:areaHighlightColor)
      d3.selectAll("."+d.layer+"-label-"+d.branch).classed("active", true);
      d3.selectAll("."+d.layer+"-label-"+d.name).classed("active", true);
    }
  
  function onmove(d,i) {
    // console.log("----d : ", d)
    var mouse = d3.mouse(svg.node()).map(d => parseInt(d));
  
    tooltip
      .classed("hidden", false)
      .attr("style", "left:"+(mouse[0]+25+offsetLeft)+"px;top:"+(mouse[1]+offsetTop)+"px")
      .html(d.layer=='job'?tooltipContent(d):d.layer=='branch'?'สาขา'+d.name:d.layer=='dma'?'dma '+d.name:d.name)
  
  }
  
  function onout(d,i) {
    d3.select(this).style("fill", d=>d.layer=='job'?jobColor:(d.color || areaColor))
    tooltip.classed("hidden", true)
    d3.selectAll("."+d.layer+"-label-"+d.branch).classed("active", false);
    d3.selectAll("."+d.layer+"-label-"+d.name).classed("active", false);
  }
  
  var tooltip = d3.select("#"+map_data.container).append("div")
      .attr("class", "map-tooltip");
 
  //   console.log("--- branchs : ", branchs)
  //   console.log("--- dmas : ", dmas)

  var branch = g.selectAll(".branch")
    .data(branchs)
    .enter()
    .append("path")
    .attr("class", "branch")    
    .attr("title", d => d.name)
    .attr("d", path)
    .on("click", click)
    // .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return branchs[n].color; }) + 1 | 0); });
    .style("fill", d=>{d.color = branchColor(d.stats?.request); return d.color})
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
    .text(d => d.name)
    .attr("x", d => path.centroid(d)[0])
    .attr("y", d => path.centroid(d)[1]-5)
    .attr("text-anchor","middle")
    .attr('fill', 'white');

  var branchStatsLabel = g.append("g")
    .attr("id", "branch-stats")
    .selectAll("g")
    .data(branchs)
    .enter()
    .append("g")
    .attr("class", d=>"branch-stats branch-stats-"+d.branch+ (d.stats?.request==0?" hidden":""))


  branchStatsLabel.append("circle")
    // .attr("class", d=>"branch-stats branch-stats-"+d.branch)
    .attr("cx", d=>path.centroid(d)[0])
    .attr("cy", d=>path.centroid(d)[1])
    .attr("r", 10)
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
    // .style("fill", "#31A2E200")
    .style("fill", d=>{d.color = dmaColor(d.stats?.request); return d.color})
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
    .text(d => d.name)
    .attr("x", d => path.centroid(d)[0])
    .attr("y", d => path.centroid(d)[1]-2)
    .attr("text-anchor","middle")
    .attr('fill', 'white');

  var dmaStatsLabel = g.append("g")
    .attr("id", "dma-stats")
    .selectAll("g")
    .data(dmas)
    .enter()
    .append("g")
    .attr("class", d=>"dma-stats dma-stats-"+d.dma+ (d.stats?.request==0?" hidden":""))
    .attr("visibility","hidden")


  dmaStatsLabel.append("circle")
    // .attr("class", d=>"dma-stats dma-stats-"+d.dma)
    .attr("cx", d=>path.centroid(d)[0])
    .attr("cy", d=>path.centroid(d)[1])
    .attr("r", 1.7)
    .attr("fill", "#FFF")

  dmaStatsLabel.append("svg:text")
    // .attr("class", d=>"dma-stats dma-stats-"+d.dma)
    .attr("x", d=>path.centroid(d)[0])
    .attr("y", d=>path.centroid(d)[1]+1)
    .text(d => d.stats.request)
    .attr("text-anchor","middle")
    .attr('fill', 'black')

  var stats = g.append("g")
    .attr("id", "job-loc")
    .selectAll("circle")
    .data(job_locations)
    .enter()
    .append("circle")
    .attr("class", d=>"job-loc job-loc-"+d.dma)
    .attr("cx", d=>projection([d.lon,d.lat])[0])
    .attr("cy", d=>projection([d.lon,d.lat])[1])
    .attr("r", 0.2)
    .attr("fill", jobColor)
    .on("mouseover", onover)
    .on("mousemove", onmove)
    .on("mouseout",  onout)
    .on("click", onClick);

  reset&&reset()

}

const processData = (Admin,DMA,job_locations)=>{

  let job_stats = {}, branch_max=0, dma_max=0;
    job_locations.map(r=>{
      job_stats[r.branch] = job_stats[r.branch]?{...job_stats[r.branch], request: (job_stats[r.branch].request||0)+1}:{ request: 1};
      job_stats[r.dma] = job_stats[r.dma]?{...job_stats[r.dma], request: (job_stats[r.dma].request||0)+1}:{ request: 1};
      (r.branch!=null)&&(branch_max = Math.max(branch_max, job_stats[r.branch].request));
      (r.dma!=null)&&(dma_max = Math.max(dma_max, job_stats[r.dma].request));
    })

  // console.log("---- job_stats : ", job_stats)
  // console.log("---- branch_max | dma_max : ", branch_max, dma_max)

  let branchs, dmas;
  // console.log("--- Admin : ", Admin, DMA)
  if (topoJson) {
    branchs = topojson.object(Admin, Admin.objects.WMA_Admin_Level1).geometries;
    branchs.map(function(d,i) { 
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
    
    dmas = topojson.object(DMA, DMA.objects.WMA_DMA).geometries;
    dmas.map(function(d,i) { 
      var tryit = DMA.objects.WMA_DMA.geometries[i].properties
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
  } else {
    branchs = Admin.features.map(r=>({
      ...r.geometry,
      name:r.properties.NAME,
      branch: r.properties.DISTRICT_I,
      layer: "branch",
      stats: job_stats[r.properties.DISTRICT_I]?job_stats[r.properties.DISTRICT_I]:{request:0}
    }))

    dmas = DMA.features.map(r=>({
      ...r.geometry,
      name:r.properties.BLOCKNAME,
      dma:r.properties.BLOCKNAME,
      branch: r.properties.BLOCKNAME?r.properties.BLOCKNAME.substring(0,2):'unknown',
      layer: "dma",
      stats: job_stats[r.properties.BLOCKNAME]?job_stats[r.properties.BLOCKNAME]:{request:0}
    }))
    dmas = dmas.filter(r=>r.name!='unknown')
  }

  // console.log("---- branchs, dmas : ", branchs, dmas)

  // return {branchs, dmas, job_locations}
  // setMapData({branchs, dmas, job_locations})
  map_data = {...map_data, branchs, dmas, job_locations, branch_max, dma_max}

  renderMap(branchs, dmas, job_locations, branch_max, dma_max)

}




const prepData = (job_locations) => {

  job_locations = job_locations?.map((r)=>({...r, layer:"job"}));

  // console.log("---- job stats : ", job_stats)

  if (map_data.Admin && map_data.DMA) {
    processData(map_data.Admin, map_data.DMA, job_locations)
  }
  else d3.json(`${FILE_HOST}/topojson/wma_admin.topojson`, function (Admin) {
    d3.json(`${FILE_HOST}/topojson/dma.topojson`, function (DMA) {
      map_data =  {...map_data, Admin, DMA};
      processData(map_data.Admin, map_data.DMA, job_locations)
    });  
  });
}


const mapGraph = (data) => {
  if (data) {
    map_data = {...map_data, container:"map-container"};
    // console.log('---- :', map_data.container)
    prepData(data)
  } else {
    renderMap(map_data.branchs, map_data.dmas, map_data.job_locations, map_data.branch_max, map_data.dma_max)
  }
}

let temp_map_data =  [
    {lon:100.365442, lat:13.725726, branch:"11", dma:"110704"},
    {lon:100.521297, lat:13.7633022, branch:"06", dma:"060510"},
    {lon:100.5977312, lat:13.8267977, branch:"12", dma:"120104"},
    {lon:100.6041908, lat:13.8034124, branch:"12", dma:"120206"},
    {lon:100.6039908, lat:13.8035124, branch:"12", dma:"120206"}
  ]


  // mapGraph(temp_map_data)
  mapGraph([])


const handleClickMap = (r) => {
    // r.jobCode?setfilter("map", {branch:r.branch, jobCode:r.jobCode}, "map-filter"):setfilter("map", {branch:r.branch}, "map-filter");
}
