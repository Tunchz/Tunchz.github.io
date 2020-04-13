
// GET filter from url -----------
var filter = null;
filter = new URL(location.href).searchParams.get('filter');
// console.log(filter)



var file				= '../data/STI_epistat_public.csv';

// var color1	= '#F57C00';
var color1	= '#ED7925';

// http://paletton.com/#uid=13y0u0kjx++00++a1+Xsd+BQbMR
var blue2	= '#B5DDFF';
var blue3	= '#6EBDFF';  // <----
var blue4	= '#2D9FFE';

var color2	= blue3;
var color3	= blue2;
var color4	= blue4;





var svgPadding			= 0;
var transitionDuration	= 100;
var thisYear			= new Date().getFullYear();


var marginsRowChart		= {top: 5, left: 5, right: 5, bottom: 30};
var marginsBarChart		= {top: 5, left: 35, right: 15, bottom: 30};

var h5TitleHeight		=  $('h5').outerHeight(true);


var topHeight			=  $('h2').outerHeight(true) + $('#dc-data-count').outerHeight(true) + 20;
var viewportHeight		=  document.body.clientHeight;
// console.log('viewportHeight', viewportHeight);
var baseHeight			= ((viewportHeight) / 3 ) - h5TitleHeight - 20;

baseHeight			= Math.max(220, baseHeight);
// console.log('h5TitleHeight', h5TitleHeight);

// console.log('viewportHeight/3 - h5TitleHeight', viewportHeight/3 - h5TitleHeight);
// console.log('baseHeight', baseHeight);

// var gainOrLossChart = dc.pieChart('#gain-loss-chart');
// var fluctuationChart = dc.barChart('#fluctuation-chart');
// var quarterChart = dc.pieChart('#quarter-chart');
// var dayOfWeekChart = dc.rowChart('#day-of-week-chart');
// var moveChart = dc.lineChart('#monthly-move-chart');
// var volumeChart = dc.barChart('#monthly-volume-chart');
// var yearlyBubbleChart = dc.bubbleChart('#yearly-bubble-chart');
// var nasdaqCount = dc.dataCount('.dc-data-count');
// var nasdaqTable = dc.dataTable('.dc-data-table');

// var subjectChart = dc.rowChart('#subject-chart');
// var dateChart = dc.lineChart('#date-chart');
// var mapChart = dc.geoChoroplethChart('#map-chart')
// var ageChart = dc.barChart('#age-chart');

	// var clam = 0;

d3.csv(file, function (data) {
	// var dateFormat = d3.time.format('%m/%d/%Y');
	var dateFormat = d3.time.format('%Y-%m-%d');
	// var numberFormat = d3.format('.2f');
	
	// console.log(data.length)
	if(filter) data = data.filter(d => d.u == filter);
	// console.log(data.length)
	
	data.forEach(function(d,i) {
		// console.log(d)
		// console.log(filter)
			
		// console.log(d.Germ);
		// d.Germ = d.Germ.substring(1);
		// if (d.Germ.indexOf('Chlamydia') !== -1) clam++;
		if (d.Germ === '') { d.Germ = []; } else { d.Germ = d.Germ.replace(/\s/g,'').split('_'); }
		
		// if (d.Germ.indexOf('Chlamydia') !== -1) clam++;
		
		// console.log(d.Germ);
		
		d.Age	= +d.Age;
		
		// d.DateOfBirth	= dateFormat.parse(d.DateOfBirth);
		// d.DateOfConsultation	= dateFormat.parse(d.DateOfConsultation);
		// d.YearOfConsultation	= d3.time.year(d.doc).getFullYear();
		
		d.YearOfConsultation	= +d.YearOfConsultation;
			if (d.YearOfConsultation<2000) d.YearOfConsultation = 0;
			else if (d.YearOfConsultation>thisYear) d.YearOfConsultation = 0;
		
		switch (d.Gender) {
			case 'M': d.Gender = 'Male'; break;
			case 'F': d.Gender = 'Female'; break;
			case 'T': d.Gender = 'Transgender'; break;
			default: d.Gender = 'Unknown';
		}
			
		if (d.SexualOrientation === 'Homosexual'){
			if (d.Gender === 'Male'){
				d.SexualOrientation = 'MSM';
			}
			else if (d.Gender === 'Female'){
				d.SexualOrientation = 'WSW';
			}
			else{
				d.SexualOrientation = 'Unknown';
			}
			// d.SexualOrientation = 'ssssss';
		}
	});
	// console.log(clam);
	// console.log(data[0]);
	
	
	
	// DIMENSIONS
	//============================================================================
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	
	
	
	// CHARTS
	//============================================================================
	
	var titlesRoundedPercentagesF = function(name, value, chart, separator){
		var percentage = (value / all.value() * 100);
		var text = name + separator + percentage.toFixed(1) + "%";
		if (percentage>9) text = name + separator + percentage.toFixed(0) + "%";
		if (chart.hasFilter() && !chart.hasFilter(name)) text = name + " - " + "0%";
		return text;
	}
	
	var rowChartF = function(name, dimension, group, height){
		var width = $('#'+name+'-chart').parent().width() - svgPadding;
		
		var chart = dc.rowChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsRowChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.colors(color2)
			.label(function (d) {
				return d.key;
			})
			.title(function (d) {
				return titlesRoundedPercentagesF(d.key, d.value, chart, ': ');
			})
			.elasticX(true)
			.xAxis().ticks(3)
			;
			
		return chart;
		
	}
	var barChartF_centered = function(name, dimension, group, height, min, max){
		var width = $('#'+name+'-chart').parent().width() - svgPadding;
		
		var chart = dc.barChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsBarChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.elasticY(true)
			
			.centerBar(true)
			.gap(1)
			.colors(color2)
			
			// .round(dc.round.floor)
			// .alwaysUseRounding(true)
			// If your bar chart has the property .centerBar(true), you should use the following instead:
			.round(function(n) { return Math.floor(n) + 0.5 })
			.alwaysUseRounding(true)
			// .alwaysUseRounding(1)
			
			.x(d3.scale.linear().domain([min, max]))
			.renderHorizontalGridLines(true)
			// .xAxisLabel(['Year'])
			.yAxis().ticks(3)
			;
		chart.xAxis().tickFormat(
			function (v) { return v ; }
		);
		return chart;
	}
	var barChartF_notcentered = function(name, dimension, group, height, min, max){
		var width = $('#'+name+'-chart').parent().width() - svgPadding;
		
		var chart = dc.barChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsBarChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.elasticY(true)
			.centerBar(false)
			.gap(1)
			.colors(color2)
			.round(dc.round.floor)
			.alwaysUseRounding(true)
			.x(d3.scale.linear().domain([min, max]))
			.renderHorizontalGridLines(true)
			// .xAxisLabel(['Age'])
			.yAxis().ticks(3)
			;
		chart.xAxis().tickFormat(
			function (v) { return v ; }
		);
		return chart;
	}
	var pieChartF = function(name, dimension, group, height, colorScale){
		var width = $('#'+name+'-chart').parent().width() - svgPadding;
		var chart = dc.pieChart('#'+name+'-chart');
		var legendWidth = 125;
		// var maxLegendTextLength=0;
		
		// correct for mobile mode, widdth >> height
		var radius = Math.min( width/2 - legendWidth/2, height/2);
		width = 2*radius + legendWidth; // = width in first case, otherwise shorter
	
		chart
			// .width(width) // it's overridden by css  100%, this is a hack for having the pie on the left
			// .height(height)
			// .radius(width/2 - legendWidth/2)
			// .cx(width/2 - legendWidth/2)
			// .cy(width/2 - legendWidth/2)
			// .innerRadius( (width/2 - legendWidth/2) / 2.5)
			
			.width(width) // it's overridden by css  100%, this is a hack for having the pie on the left
			.height(height)
			.radius(radius)
			.cx(radius)
			.cy(radius)
			.innerRadius( radius / 2.5)
			
			.dimension(dimension)
			.group(group)
			// .margins(marginsRowChart)
			.transitionDuration(transitionDuration)
			.colors(colorScale)
			// .colorAccessor(function(d, i){return d.value;})
			
			.label(function (d) {
				return d.key.substring(0, 3) + '.';
			})
			.title(function (d) {
				return titlesRoundedPercentagesF(d.key, d.value, chart, ': ');
			})
			// .title(function (d) {
			// 	var percentage = (d.value / all.value() * 100);
			// 	var text = d.key + ': ' + percentage.toFixed(1) + "%";
			// 	if (percentage>9) text = d.key + " - " + percentage.toFixed(0) + "%";
			// 	if (chart.hasFilter() && !chart.hasFilter(d.key)) text = d.key + " - " + "0%";
			// 	return text;
			// })
			.legend(dc.legend()
				.x(width - legendWidth + 5)
				.y(0)
				.itemHeight(12)
				.gap(5)
				.legendText(function (d) {
					// var percentage = (d.data / all.value() * 100);
					// var text = d.name + " - " + percentage.toFixed(1) + "%";
					// if (percentage>9) text = d.name + " - " + percentage.toFixed(0) + "%";
					// if (chart.hasFilter() && !chart.hasFilter(d.name)) text = d.name + " - " + "0%";
					// return text;
					return titlesRoundedPercentagesF(d.name, d.data, chart, ' - ');
				})
				// .autoItemWidth(1).horizontal(1)
				.maxItems(10)
			)
			
			;
		return chart;
		
	}
	
	
	
	var colorScale = d3.scale.ordinal()
		.domain(["Heterosexual", "Homosexual", 'Bisexual', 'Unknown', 'Missing', 'Male', 'Female', 'Transgender', 'MSM', 'WSW'])
		// .range([blue3, blue5, blue1, 'lightgrey', 'grey', blue3, blue5, blue1])
		.range([color2, color3, color4, 'grey', 'grey', color2, color3, color4, color3, color3])
		// .range([color3, color4, color5, 'lightgrey', 'grey', color3, color4, color5])
		;	
	
	
	// DEFAULT DCJS BLUE COLORS
	// 3182BD
	// 6BAED6
	// 9ECAE1
	// C6DBEF
	
	
	// Germ
	//---------------------------------------------------
	var germDimension = ndx.dimension(function (d) { return d.Germ; });
	
	// var germGroup = germDimension.group();
	// https://stackoverflow.com/questions/17524627/is-there-a-way-to-tell-crossfilter-to-treat-elements-of-array-as-separate-record/17529113#17529113
	var germGroup = germDimension.groupAll().reduce(reduceAddGerm, reduceRemoveGerm, reduceInitialGerm).value();
	// Germ aggregation
	function reduceAddGerm(p, v) {
		v.Germ.forEach (function(val, idx) {
			p[val] = (p[val] || 0) + 1; //increment counts
		});
		return p;
	}
	function reduceRemoveGerm(p, v) {
		v.Germ.forEach (function(val, idx) {
			p[val] = (p[val] || 0) - 1; //decrement counts
		});
		return p;
	}
	function reduceInitialGerm() {
		return {};
	}
	// Germ add key property
	germGroup.all = function() {
	  var newObject = [];
	  for (var key in this) {
		if (this.hasOwnProperty(key) && key != "all") {
		  newObject.push({
			key: key,
			value: this[key]
		  });
		}
	  }
	  return newObject;
	};
	
	germChart = rowChartF('germ', germDimension, germGroup, baseHeight);
	// https://stackoverflow.com/questions/17524627/is-there-a-way-to-tell-crossfilter-to-treat-elements-of-array-as-separate-record/17529113#17529113
	germChart
		// .filterHandler(function(dimension, filter){
		// 	console.log(filter)
		// 	dimension.filter(function(d) {return germChart.filter() != null ? d.indexOf(germChart.filter()) >= 0 : true;}); // perform filtering
		// 	return filter; // return the actual filter value
		// })
		// chart_genre
			.filterHandler (function (dimension, filters) {
				dimension.filter(null);   
				if (filters.length === 0)
					dimension.filter(null);
				else
					dimension.filterFunction(function (d) {
						count = d.length;
						// for (var i=0; i < count; i++) {
						for (var i=count; i--;) { // faster
							if (filters.indexOf(d[i]) >= 0) return true;
						}
						return false; 
					});
				return filters; 
				})
			;
	
	// Year
	//---------------------------------------------------
	var yearDimension = ndx.dimension(function (d) { return d.YearOfConsultation; });
	var yearGroup = yearDimension.group();
	yearChart = barChartF_centered('year', yearDimension, yearGroup, baseHeight , 2000 - 1, thisYear + 0);
	// baseHeight/2 - h5TitleHeight/2 - 3
	
	// Age
	//---------------------------------------------------
	var ageDimension = ndx.dimension(function (d) { return d.Age; });
	var ageGroup = ageDimension.group();
	ageChart = barChartF_notcentered('age', ageDimension, ageGroup, baseHeight * 0.7 , 0, 100);
	
	// Gender
	//---------------------------------------------------
	var genderDimension = ndx.dimension(function (d) { return d.Gender; });
	var genderGroup = genderDimension.group();
	// genderChart = rowChartF('gender', genderDimension, genderGroup, baseHeight);
	genderChart = pieChartF('gender', genderDimension, genderGroup, baseHeight, colorScale);
	
	
	// SexualOrientation
	//---------------------------------------------------
	var SexualOrientationDimension = ndx.dimension(function (d) { return d.SexualOrientation; });
	var SexualOrientationGroup = SexualOrientationDimension.group();
	// SexualOrientationChart = rowChartF('sexor', SexualOrientationDimension, SexualOrientationGroup, baseHeight);
	SexualOrientationChart = pieChartF('sexor', SexualOrientationDimension, SexualOrientationGroup, baseHeight, colorScale);
	
	// // CenterSpecialisation
	// //---------------------------------------------------
	// var CenterSpecialisationDimension = ndx.dimension(function (d) { return d.CenterSpecialisation; });
	// var CenterSpecialisationGroup = CenterSpecialisationDimension.group();
	// CenterSpecialisationChart = rowChartF('center', CenterSpecialisationDimension, CenterSpecialisationGroup, baseHeight);
	
	// ConsultationMotive
	//---------------------------------------------------
	var ConsultationMotiveDimension = ndx.dimension(function (d) { return d.ConsultationMotive; });
	var ConsultationMotiveGroup = ConsultationMotiveDimension.group();
	ConsultationMotiveChart = rowChartF('motive', ConsultationMotiveDimension, ConsultationMotiveGroup, baseHeight * 1.1);
	
	// // ConsultationSymptom
	// //---------------------------------------------------
	// var ConsultationSymptomDimension = ndx.dimension(function (d) { return d.ConsultationSymptom; });
	// var ConsultationSymptomGroup = ConsultationSymptomDimension.group();
	// ConsulationSymptomChart = rowChartF('symptom', ConsultationSymptomDimension, ConsultationSymptomGroup, baseHeight);
	
	
	
	
	// DATA COUNT
	//----------------------------------------------------------------------------
	
	dc.dataCount('#dc-data-count')
		.dimension(ndx)
		.group(all)
		.html({
			// some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
			// 	' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
			some: '<strong>%filter-count</strong> cases selected | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
			all: 'All records are selected. Please click on the graphs to apply filters.'
		});
		;
	
	// dc.renderlet(function(chart) {
	// 	dc.events.trigger(function() {
	// 		// console.log(subjectChart.filters());
	// 		$('#viewFilters').html('');
	// 		if(subjectChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Pathogen</span>=<span class="text-md">' + subjectChart.filters() + '</span> ' );}
	// 		if(dateChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Date</span>=<span class="text-md">[' + formatDate(dateChart.filters()[0][0]) +', '+formatDate(dateChart.filters()[0][1]) + '[</span> ' );}
	// 		if(mapChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Province</span>=<span class="text-md">' + mapChart.filters() + '</span> ' );}
	// 		if(ageChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Age</span>=<span class="text-md">' + ageChart.filters() + '</span> ' );}
	// 		if(genderChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Gender</span>=<span class="text-md">' + genderChart.filters() + '</span> ' );}
	// 		if(subjectChart.filters().length != 0 || dateChart.filters().length != 0 || mapChart.filters().length != 0 || ageChart.filters().length != 0 || genderChart.filters().length != 0){$('#viewFilters').append( '<a href="javascript:dc.filterAll();dc.redrawAll();"><strong>RESET</strong></a>' );}
	// 	});
	// })
	
	
	
	
		// dc.renderlet(function(chart) {
		// 	dc.events.trigger(function() {
		// 		// console.log(subjectChart.filters());
		// 		$('#viewFilters').html('ffff');
				
		// 		if(germChart.filters().length != 0 ){
		// 			console.log('filter')
		// 			$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Pathogen</span>=<span class="text-md">' + germChart.filters() + '</span> ' );
		// 		}
		// 		if(yearChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Date</span>=<span class="text-md">[' + formatDate(yearChart.filters()[0][0]) +', '+formatDate(yearChart.filters()[0][1]) + '[</span> ' );}
		// 		if(SexualOrientationChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Province</span>=<span class="text-md">' + SexualOrientationChart.filters() + '</span> ' );}
		// 		if(ageChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Age</span>=<span class="text-md">' + ageChart.filters() + '</span> ' );}
		// 		if(genderChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Gender</span>=<span class="text-md">' + genderChart.filters() + '</span> ' );}
				
		// 		if(germChart.filters().length != 0 || yearChart.filters().length != 0 || SexualOrientationChart.filters().length != 0 || ageChart.filters().length != 0 || genderChart.filters().length != 0) {
		// 			$('#viewFilters').append( '<a href="javascript:dc.filterAll();dc.redrawAll();"><strong>RESET</strong></a>' );
		// 		}
		// 	});
		// })
		
	// LIST FILTERS
	// for (var chart of dc.chartRegistry.list()) { console.log(chart.anchor(), chart.filters())}
	
		
	// RENDER
	//----------------------------------------------------------------------------
	dc.renderAll();
});


function filterChart3(){
	// ageChart.filter(dc.filters.RangedFilter(7, 50));
	dc.filterAll();
	germChart.filter("Gonorrhea");
	yearChart.filter(dc.filters.RangedFilter(2014.5, 2015.5));
	dc.renderAll();
	// $('#graphs-anchor-link').click();
	sweetScroll.toElement(document.getElementById("germ-chart"));
}
function filterChart4(){
	dc.filterAll();
	ageChart.filter(dc.filters.RangedFilter(0, 1));
	dc.renderAll();
	// scrollTo($('#age-chart'));
	// $('#graphs-anchor-link').click();
	sweetScroll.toElement(document.getElementById("age-chart"));
	
}