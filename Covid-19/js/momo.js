
// URL FILTERS

function getSearchParameters() {
	var prmstr = window.location.search.substr(1);
	return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray( prmstr ) {
	var params = {};
	var prmarr = prmstr.split("&");
	for ( var i = 0; i < prmarr.length; i++) {
		var tmparr = prmarr[i].split(/=(.+)/); // bug when === is in the value, RESOLVED
		if(!tmparr[1]) tmparr[1]='';
		// console.log(tmparr)
		params[tmparr[0]] = tmparr[1].toUpperCase() ;
	}
	return params;
}
var urlparams = getSearchParameters();
//   console.log('urlparams', urlparams);

var selectRegion = 'Belgium'; // default
if (urlparams.region === "BRU") {selectRegion = 'Brussels';}
else if (urlparams.region === "WAL") {selectRegion = 'Wallonia';}
else if (urlparams.region === "VLA") {selectRegion = 'Flanders';}
//   console.log('selectRegion', selectRegion)

// var allowedRegions = ['Brussels', 'Wallonie', 'Vlaanderen', '', 'UNK'];
// if (urlparams.region === "BRU") {allowedRegions = ['Brussels'];}
// else if (urlparams.region === "WAL") {allowedRegions = ['Wallonie'];}
// else if (urlparams.region === "VLA") {allowedRegions = ['Vlaanderen'];}


// DIPLAY FILTER
$('#selectRegion').find('a').removeClass('active')
$('#selectRegion').find('a:contains('+selectRegion+')').addClass('active')

	
	
  
  
  // SIZE
  $('#dygraph1').width('100%');
  
  // console.log('ping1');
  
  
  // DYGRAPH
  function drawDygraph1(){
	  g1 = new Dygraph(
		  document.getElementById("dygraph1"),
		  "../data/"+selectRegion+"_DailyepistatPub.csv?"+(new Date()).toISOString().split('T')[0], // force reload every day
		  {
			  // title: 'Daily mortality numbers',
			  ylabel: 'Daily deaths <small>(7-day moving average)</small>',
			  // ylabel: 'Daily Deaths',
			  legend: 'always',
			  // legend: 'never',
			  labels: [ 'Date', 'Expected ± 99% P.I.*', 'Observed'/*, 'Excess mortality'*/ ], // ± 95% CI
			  // labels: ['Date', 'null', 'null'],
			  // labelsDivStyles: { 'textAlign': 'right' },
			  labelsDiv: document.getElementById('dygraphLegend'),
			  customBars: true,
			  // errorBars: true,
			  rollPeriod: 1,
			  // showRoller: true,
			  // showRangeSelector: true,
			  // rangeSelectorPlotStrokeColor: 'orange',
			  // rangeSelectorPlotFillColor: 'white',
			  digitsAfterDecimal:0,
			  'Expected ± 99% P.I.*': {
				  color: 'grey',
				  strokeWidth: 1,
				  drawPoints: false,
				  // pointSize: 3
			  },
			  'Observed': {
				  color: 'orange',
				  strokeWidth: 1.2,
				  drawPoints: false,
				  pointSize: 3,
				  highlightCircleSize: 4
			  },
			  // 'Excess mortality': {
			  // 	color: 'red',
			  // 	strokeWidth: 0.7,
			  // 	drawPoints: false,
			  // 	// pointSize: 3
			  // 	hideOverlayOnMouseOut : false,
			  // },
				  // hideOverlayOnMouseOut : false,
  
			  axes: {
				  y: {
					  // independentTicks:true,
					  // axisTickSize:7,
					  // pixelsPerLabel :50,
					  axisLineWidth:0.00001,
					  drawAxis: true,
					  drawGrid: true,
					  valueFormatter: function (x) {return ''},
				  },
				  x: {
					  // independentTicks:false,
					  // pixelsPerLabel :80,
					  axisLineWidth:0.00001,
					  drawAxis: true,
					  drawGrid: false,
					  // valueFormatter: function (x) {return ''},
				  }
			  },
			  // axes: {
			  // 	x: {
			  // 		valueFormatter: function (x) {return ''},
			  // 	},
			  // 	y: {valueFormatter: function (y) {return 'bb'}},
			  // 	y2: {valueFormatter: function (y2) {return 'cc'}}
			  // },
			  gridLineColor:'#ddd',
			  // includeZero: true,
			  drawAxesAtZero: true,
			  width: '1890px',
			  
			  xRangePad: 20,
  
		  }
	  );
  }
  drawDygraph1();
  
  
  
  // GOOGLE CHART
  String.prototype.insertAt=function(index, string) { 
	return this.substr(0, index) + string + this.substr(index);
  }
  
  // google.charts.load('current', {'packages':['line']}); // the new material charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawRiskFactors);
  
  var maxAxis1 = 450;
  
  function drawRiskFactors() {
  
	  $.get("../data/"+selectRegion+"_DailyepistatPub_Riskfactors.csv", function(csvString) {
		  
		  // PREPARE DATA --------------------------------------------------------------
		  // transform the CSV string into a 2-dimensional array
		  var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
		  
		  
		  
		  
		  
  
		  // DEFINE LABELS ---------------------------------------
		  // newArrayData = [];
		  // // normal values
		  // newArrayData[0] = ['date','Tmax','Tmin','Ozone','PM10','Obs. Mort.','Exp. Mort.', 'Excess Mortality'];
		  // // constants reflines
		  // newArrayData[0][8] = "25 °C";
		  // newArrayData[0][9] = "0 °C";
		  // newArrayData[0][10] = "120 µg/m³";
		  // newArrayData[0][11] = "50 µg/m³";
		  
		  
		  // HEADERS ------------------------------------
		  headers = arrayData[0]; // date,tmax,tmin,o3,pm10,pm25,observed,predicted,isExcess
		  // console.log(arrayData[0].toString())
		  // renaming -----
		  arrayData[0][arrayData[0].indexOf('tmax')] = 'Tmax';
		  arrayData[0][arrayData[0].indexOf('tmin')] = 'Tmin';
		  arrayData[0][arrayData[0].indexOf('o3')] = 'Ozone';
		  arrayData[0][arrayData[0].indexOf('pm10')] = 'PM10';
		  arrayData[0][arrayData[0].indexOf('pm25')] = 'PM2.5';
		  arrayData[0][arrayData[0].indexOf('observed')] = 'Obs. Mort.';
		  arrayData[0][arrayData[0].indexOf('predicted')] = 'Exp. Mort.';
		  arrayData[0][arrayData[0].indexOf('isExcess')] = 'Excess Mortality';
		  // adding -----
		  arrayData[0].push("25 °C");
		  arrayData[0].push("0 °C");
		  arrayData[0].push("120 µg/m³");
		  arrayData[0].push("50 µg/m³");
		  // store -----
		  headers = arrayData[0];
		  // console.log(headers.toString())
		  // constants reflines
		  
		  
		  // ASSIGN COLORS ORDER ---------------------------------------
		  // DEFINE COLORS ---------------------------------------
		  var colors = {
			  tmax : '#1c91c0'
			  ,tmin : '#A3CCFF'
			  ,ozone : '#6f9654'
			  ,pm10 : '#AA4FC8'
			  ,obs : 'orange'
			  ,exp : 'grey'
			  // ,excess : '#FBF2EB'
			  // ,excess : '#FAE9DD'
			  ,excess : 'orangered' // +opacity
		  }
		  var seriesColors=[
			  colors.tmax,
			  colors.tmin,
			  colors.ozone,
			  colors.pm10,
			  colors.pm10,
			  colors.obs,
			  colors.exp,
			  colors.excess,
			  colors.tmax,
			  colors.tmin,
			  colors.ozone,
			  colors.pm10
		  ];
		  var seriesColors=[];
		  // ASSIGN COLORS ORDER ---------------------------------------
		  headers.forEach(function(d) {
			  switch (d) {
				  case 'Tmax': seriesColors.push(colors.tmax); break;
				  case 'Tmin': seriesColors.push(colors.tmin); break;
				  case 'Ozone': seriesColors.push(colors.ozone); break;
				  case 'PM10': seriesColors.push(colors.pm10); break;
				  case 'PM2.5': seriesColors.push(colors.pm10); break;
				  case 'Obs. Mort.': seriesColors.push(colors.obs); break;
				  case 'Exp. Mort.': seriesColors.push(colors.exp); break;
				  case 'Excess Mortality': seriesColors.push(colors.excess); break;
				  case "25 °C": seriesColors.push(colors.tmax); break;
				  case "0 °C": seriesColors.push(colors.tmin); break;
				  case "120 µg/m³": seriesColors.push(colors.ozone); break;
				  case "50 µg/m³": seriesColors.push(colors.pm10); break;
				  default: seriesColors.push(undefined);
			  }
		  });
		  // console.log(seriesColors);
		  // console.log(seriesColors.toString());
		  
// find the maxAxis1
maxAxis1 = 0;
for (var ii = 1; ii < arrayData.length; ii++) { // loop each line / record
	var thisobs = arrayData[ii][arrayData[0].indexOf('Obs. Mort.')];
	if(thisobs>maxAxis1) maxAxis1=thisobs;
	var thisobs = arrayData[ii][arrayData[0].indexOf('Ozone')];
	if(thisobs>maxAxis1) maxAxis1=thisobs;
	var thisobs = arrayData[ii][arrayData[0].indexOf('PM10')];
	if(thisobs>maxAxis1) maxAxis1=thisobs;
	var thisobs = arrayData[ii][arrayData[0].indexOf('PM2.5')];
	if(thisobs>maxAxis1) maxAxis1=thisobs;
}
// round to ~10% upper of max
// console.log(maxAxis1)
maxAxis1 = Math.ceil( (maxAxis1+10)/10 ) * 10
// console.log(maxAxis1)

		  // DATA TRANSFORMATIONS ----------------------------------
		  for (var ii = 1; ii < arrayData.length; ii++) { // loop each line / record
		  
			  // // newArrayData[ii] = [];
			  // newArrayData[ii] = arrayData[ii];
		  
			  // // STRING TO DATE -----------------------
			  // // arrayData[ii][0] = arrayData[ii][0].toString().insertAt(6, "-").insertAt(4, "-");
			  // // arrayData[ii][0] = new Date(arrayData[ii][0]);
			  
			  // 	//clone data in new Array
			  // 	newArrayData[ii][0] = arrayData[ii][0].toString().insertAt(6, "-").insertAt(4, "-");
			  // 	newArrayData[ii][0] = new Date(newArrayData[ii][0]);
			  
			  
			  // 	// // MOVING AVERAGE -----------------------
			  // 	// for (var vv=1;vv<=6;vv++){ // loop each variable from 2 to 6
			  // 	// 	// console.log(arrayData.length);
			  // 	// 	// console.log(ii + '-' + arrayData[ii][vv]);
					  
			  // 	// 	var maWindow=7;
			  // 	// 	var sum=0, count=0, ave;
					  
			  // 	// 	for (var jj=1;jj<=maWindow;jj++){ // loop through moving average window
			  // 	// 		// var kk = ii - Math.ceil(maWindow/2) + jj; // centered moving average
			  // 	// 		var kk = ii - maWindow + jj; // lagging moving average
			  // 	// 		if ( kk>0 && kk<arrayData.length && arrayData[kk][vv] ){ // check if not null
			  // 	// 			sum += arrayData[kk][vv];
			  // 	// 			count++;
			  // 	// 		}
						  
			  // 	// 	}
			  // 	// 		ave = Math.round(sum/count);
			  // 	// 	if (!isNaN(ave) && arrayData[ii][vv] ) { 
			  // 	// 		newArrayData[ii][vv] = ave;
			  // 	// 	}
			  // 	// }
  
			  
			  // // // bands = over-mortality -----------------------
			  // // if (newArrayData[ii][5] > newArrayData[ii][6] + 50) {
			  // // 	// newArrayData[ii][7] = newArrayData[ii][2];
			  // // 	newArrayData[ii][7] = maxAxis1;
			  // // } else {
			  // // 	newArrayData[ii][7] = 0;
			  // // }
			  
			  // // REFLINES -----------------------
			  // newArrayData[ii][8] = 25;
			  // newArrayData[ii][9] = 0;
			  // newArrayData[ii][10] = 120;
			  // newArrayData[ii][11] = 50;
			  
			  
			  
			  
			  // STRING TO DATE -----------------------
			  arrayData[ii][0] = arrayData[ii][0].toString().insertAt(6, "-").insertAt(4, "-");
			  arrayData[ii][0] = new Date(arrayData[ii][0]);
			  // REFLINES -----------------------
			  arrayData[ii][headers.indexOf("25 °C")] = 25;
			  arrayData[ii][headers.indexOf("0 °C")] = 0;
			  arrayData[ii][headers.indexOf("120 µg/m³")] = 120;
			  arrayData[ii][headers.indexOf("50 µg/m³")] = 50;
			  
			  // bands = over-mortality -----------------------
			  if (arrayData[ii][headers.indexOf("Excess Mortality")] > 0) {
				  // console.log(maxAxis1, arrayData[ii][headers.indexOf("Excess Mortality")])
				  arrayData[ii][headers.indexOf("Excess Mortality")] = maxAxis1;
				  // arrayData[ii][headers.indexOf("Excess Mortality")] = arrayData[ii][5];
				  // arrayData[ii][headers.indexOf("Excess Mortality")] = arrayData[ii][6];
			  } else {
				  // arrayData[ii][headers.indexOf("Excess Mortality")] = 0;
				  // arrayData[ii][headers.indexOf("Excess Mortality")] = arrayData[ii][6];
				  arrayData[ii][headers.indexOf("Excess Mortality")] = NaN;
			  }
			  
			  
			  // if (ii < 4) {
			  // 	// console.log('newArrayData[ii][0]', newArrayData[ii][0]);
			  // 	// console.log('newArrayData[ii]', newArrayData[ii]);
			  // 	console.log('arrayData[ii]', arrayData[ii]);
			  // }
		  }
		  
		  
  // console.log(arrayData);
		  var data = new google.visualization.arrayToDataTable(arrayData);
		  
		  
		  // format date tooltip --------------------------------------------------------------
		  var date_formatter = new google.visualization.DateFormat({ pattern: "dd MMM yyyy" });
		  date_formatter.format(data, 0);
		  
		  
		  // options --------------------------------------------------------------
		  var fontsize=16;
		  
		  var options = {
			  theme: 'material' ,
			  // title: 'Mortality Risk Factors',
			  titleTextStyle: { fontSize: fontsize+4},
			  // width: '100%',
			  height: 500,
			  lineWidth: 1,
			  hAxis: { gridlines: {color: 'transparent' }, textStyle: {fontSize: fontsize-2}},
			  vAxes: {
				  0: {
					  title: 'Mortality (deaths/day), \n PM (µg/m³) & Ozone (µg/m³)',
					  textStyle: {fontSize: fontsize-2},
					  // viewWindow: {max: maxAxis1},
					  viewWindowMode: 'maximized',
					  gridlines: {color: '#efefef'},
					  baselineColor: 'transparent',
					  ticks: [50, 120, maxAxis1] ,
				  },
				  1: {
					  title: 'Temperature (Celsius)',
					  textStyle: {fontSize: fontsize-2},
					  viewWindow: {max: 80, min: -20},
					  gridlines: {color: 'transparent'},
					  baselineColor: 'transparent',
					  viewWindowMode: 'pretty',
					  ticks: [{'v':0, 'f':'0°C'}, {'v':25, 'f':'25°C'}] ,
				  },
			  },
			  series: {
				  
				  0: { color: seriesColors[0+1] , targetAxisIndex:1, lineWidth: 0.5 }, // tmax 
				  1: { color: seriesColors[1+1] , targetAxisIndex:1, lineWidth: 0.5 }, // tmin
				  
				  2: { color: seriesColors[2+1], targetAxisIndex:0 }, // ozone
				  3: { color: seriesColors[3+1], targetAxisIndex:0 }, // pm10
				  4: { color: seriesColors[4+1], targetAxisIndex:0 }, // pm10
				  
				  // 4: { color: '#f1ca3a', targetAxisIndex:0 },
				  5: { color: seriesColors[5+1], targetAxisIndex:0, lineWidth: 1 },
				  6: { color: seriesColors[6+1], targetAxisIndex:0 },
				  
				  // bands
				  7: { color: seriesColors[7+1], targetAxisIndex:0
					  , type: 'bars', dataOpacity: 0.1
					  , enableInteractivity: false
				  },
				  // 6: { color: colors.excess, targetAxisIndex:0, lineWidth: 2},
				  
				  
				  // reference lines
				  // arrayData[0][8] = "TmaxRefline";
				  // arrayData[0][9] = "TminRefline";
				  // arrayData[0][10] = "ozoneRefline";
				  // arrayData[0][11] = "pmRefline";			
				  8: { color: seriesColors[8+1], targetAxisIndex:1, lineDashStyle: [4, 4]
					  , visibleInLegend: true, enableInteractivity: false
				  },
				  9: { color: seriesColors[9+1], targetAxisIndex:0, lineDashStyle: [4, 4]
					  , visibleInLegend: true, enableInteractivity: false
				  },
				  10: { color: seriesColors[10+1], targetAxisIndex:0, lineDashStyle: [4, 4]
					  , visibleInLegend: true, enableInteractivity: false
				  },
				  11: { color: seriesColors[11+1], targetAxisIndex:0, lineDashStyle: [4, 4]
					  , visibleInLegend: true, enableInteractivity: false
				  },
			  },
			  legend:{position: 'top', textStyle: {fontSize: fontsize -2}},
			  chartArea: {'width': '80%'},
			  seriesType: 'line',
			  
			  explorer: { // cf. https://developers.google.com/chart/interactive/docs/gallery/linechart
					  actions: ['dragToZoom', 'rightClickToReset'],
					  axis: 'horizontal',
					  // keepInBounds: true,
					  // maxZoomOut: 2,
					  maxZoomIn: 0.1,
			  }
	  
		  };
		  
		  
		  // DRAW THE CHART --------------------------------------------------------------
		  // var chart = new google.charts.Line(document.getElementById('RiskFactors_googlechart')); // the new material charts
		  // var chart = new google.visualization.LineChart(document.getElementById('RiskFactors_googlechart'));
		  var chart = new google.visualization.ComboChart(document.getElementById('RiskFactors_googlechart'));
		  chart.draw(data, options);
		  
		  
		  // HIDE & SHOW LINES --------------------------------------------------------------
		  var columns = [];
		  var series = {};
		  for (var i = 0; i < data.getNumberOfColumns(); i++) {
			  columns.push(i);
			  if (i > 0) {
				  series[i - 1] = {};
			  }
		  }
		  function hideCol(col){ // hide the data series
			  columns[col] = {
				  label: data.getColumnLabel(col),
				  type: data.getColumnType(col),
				  calc: function () {
					  return null;
				  }
			  };
			  options.series[col - 1].color = '#CCCCCC'; // grey out the legend entry
		  }
		  function showCol(col){ // show the data series
			  columns[col] = col;
			  options.series[col - 1].color = seriesColors[col];
			  // options.series[col - 1].color = 'red';
		  }
		  google.visualization.events.addListener(chart, 'select', function () {
			  var sel = chart.getSelection();
			  if (sel.length > 0) { // if selection length is 0, we clicked an element
				  if (sel[0].row === null) { // if row is null, we clicked on the legend, otherwise we clicked somewhere else
					  var col = sel[0].column;
					  if (columns[col] == col) {
						  hideCol(col);
						  // hide reflines too
				  // arrayData[0][8] = "TmaxRefline";
				  // arrayData[0][9] = "TminRefline";
				  // arrayData[0][10] = "ozoneRefline";
				  // arrayData[0][11] = "pmRefline";
						  if (col===1) hideCol(8);
						  if (col===2) hideCol(9);
						  if (col===3) hideCol(10);
						  if (col===4) hideCol(11);
					  }
					  else {
						  showCol(col);
						  if (col===1) showCol(8);
						  if (col===2) showCol(9);
						  if (col===3) showCol(10);
						  if (col===4) showCol(11);
					  }
					  var view = new google.visualization.DataView(data);
					  view.setColumns(columns);
					  chart.draw(view, options);
				  }
			  }
		  });
		  // end HIDE & SHOW LINES
	  });
  }