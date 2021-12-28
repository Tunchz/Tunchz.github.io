// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ freeboard-dynamic-highcharts-plugin                                │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ http://blog.onlinux.fr/?tag=freeboard                              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT license.                                    │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Freeboard widget plugin for Highcharts.                            │ \\
// └────────────────────────────────────────────────────────────────────┘ \\
(function() {

	//
	// DECLARATIONS
	//
	var HIGHCHARTS_ID = 0;
	var ONE_SECOND_IN_MILIS = 1000;
	var MAX_NUM_SERIES = 4;

	//
	// HELPERS
	//

	// Get coordinates of point
	function xy(obj, x, y) {
		return [obj[x], obj[y]]
	}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	//
	// TIME SERIES CHARTS
	//
	var highchartsLineWidgetSettings = [
	{
		name: "title",
		display_name: "Title",
		type: "text"
	}, 
	{
		name: "timeframe",
		display_name: "Timeframe in SECONDS",
		type: "number",
		description: "Specify the last number of seconds you want to see.",
		default_value: _default.timeframe
	}, 
	{
		name: "chart_style",
		display_name: "Chart Style",
		type: "calculated",
		default_value: "{\"marginTop\" : null,\"marginBottom\" : null,\"marginLeft\" : null,\"marginRight\" : null}"
	}, 
	{
		name: "xaxis",
		display_name: "X-Axis",
		type: "calculated",
		// default_value: "{\"title\":{\"text\" : \"Time\"}, \"type\": \"datetime\", \"floor\":0}",
		default_value: "{\"title\": {\"text\": \"time\", \"type\": \"datetime\", \"y\":-10,\"align\": \"middle\",\"enabled\": true,\"style\": {\"color\":\"#ffffff\"}},\"tickInterval\": 3600000,\"tickWidth\": 0,\"gridLineWidth\": 0,\"labels\": {\"align\": \"right\",\"x\": -2,\"y\": 10,\"style\": {\"color\":\"#ffffff\",\"fontSize\": \"8px\"}}}"

	}, 
    {        
        name: "yaxis",
        display_name: "Y-Axis",
        type: "array",
        description: "style to format each y axis",
		default_value: [{"style_object":"{\"linkedTo\":null,\"gridLineWidth\": 0,\"showFirstLabel\": false,\"opposite\": false, \"title\": {\"text\": \"yaxis_name\",\"x\":7,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\"}},\"labels\": {\"align\": \"right\",\"x\": 3,\"y\": 16,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\"},\"format\": \"{value:.,0f}\"}}"}],
        settings:[{
            name: "style_object",
            display_name: "Style Object",
            type: "calculated",
			// default_value: "{\"title\":{\"text\" : \"Values\"}, \"minorTickInterval\":\"auto\", \"floor\":0}",
			default_value: "{\"linkedTo\":null,\"gridLineWidth\": 0,\"showFirstLabel\": false,\"opposite\": false, \"title\": {\"text\": \"yaxis_name\",\"x\":7,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\"}},\"labels\": {\"align\": \"right\",\"x\": 3,\"y\": 16,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\"},\"format\": \"{value:.,0f}\"}}"



        }]
    },
    {        
        name: "series_sources_array",
        display_name: "Series Sources Array",
        type: "array",
        description: "datasource of each series corresponding to y axis",
        settings:[{
            name: "source",
            display_name: "Source",
            type: "calculated",
        }]
    },
    {        
        name: "series_propeties",
        display_name: "Series Properties",
        type: "array",
        description: "Properties for each series in Series Source Array",
        settings:[{
            name: "name",
            type: "text",
            default_value: "test"
        },
        {
			name: "chartType",
			display_name: "Chart Type",
			type: "option",
			default_value: "line",
			options: [
			{
				"name": "Area",
				"value": "area"
			}, 
			{
				"name": "Line",
				"value": "line"
			}, 
			{
				"name": "Spline",
				"value": "spline"
			}, 
			{
				"name": "Column",
				"value": "column"
			}]
		},
		{
			name: "dashStyle",
			display_name: "Dash Style",
			type: "option",
			default_value: "Solid",
			options: [{
				"name": "Solid",
				"value": "Solid"
			}, {
				"name": "Dot",
				"value": "Dot"
			}, {
				"name": "Dash",
				"value": "Dash"
			}, {
				"name": "Short Dot",
				"value": "ShortDot"
			}, {
				"name": "Short Dash",
				"value": "ShortDash"
			}, {
				"name": "Short Dash Dot",
				"value": "ShortDashDot"
			}, {
				"name": "Dash Dot",
				"value": "DashDot"
			}]
		},
		{
            name: "source",
            display_name: "Source",
            type: "boolean",
        	default_value: !1,
        },
		{
            name: "axis_num",
            display_name: "#axis",
            type: "number",
        	// default_value: !1,
        }]
        // multi_input: "true",
    },
    {
        name: "include_legend",
        display_name: "Include Legend",
        type: "boolean",
        default_value: !0,
    }, 
    {
        name: "include_contextmenu",
        display_name: "Include Context Menu",
        type: "boolean",
        default_value: !0,
	}, 
	{
        name: "enabled_fullscreen",
        display_name: "Fullscreenable",
        type: "boolean",
        default_value: !0,
        description: "Enable widget fullscreen toggle"
    }, 
    {
        name: "blocks",
        display_name: "Height Blocks",
        type: "integer",
        default_value: 4,
        required: !0
    }];

	// for (i = 1; i <= MAX_NUM_SERIES; i++) {
	// 	var dataSource = {
	// 		"name": "series" + i,
	// 		"display_name": "Series " + i + " - Datasource",
	// 		"type": "calculated"
	// 	};

	// 	var xField = {
	// 		"name": "series" + i + "label",
	// 		"display_name": "Series " + i + " - Label",
	// 		"type": "text",
	// 	};

	// 	highchartsLineWidgetSettings.push(dataSource);
	// 	highchartsLineWidgetSettings.push(xField);
	// }

	freeboard
		.loadWidgetPlugin({
			"type_name": "highcharts_custom_timeseries",
			"display_name": "Custom Time series (Highcharts)",
			"description": "Time series line chart.",
			"external_scripts": [
				// "https://code.highcharts.com/8.0.0/highcharts.js",
				// "https://code.highcharts.com/8.0.0/modules/exporting.js",
	            "plugins/thirdparty/highcharts/highcharts.js",
	            // "plugins/thirdparty/highcharts/highcharts-more.js",
	            "plugins/thirdparty/highcharts/exporting.js",
	            // "plugins/thirdparty/highcharts/export-data.js",
            	"plugins/thirdparty/highcharts/data.js",
	            // "plugins/thirdparty/highcharts/accessibility.js",
			],
			"fill_size": true,
			"settings": highchartsLineWidgetSettings,
			newInstance: function(settings, newInstanceCallback) {
				newInstanceCallback(new highchartsTimeseriesWidgetPlugin(
					settings));
			}
		});

	var highchartsTimeseriesWidgetPlugin = function(settings) {

		var self = this;
		var currentSettings = settings,
			fscreen = $('<ul class="widget-fullscreen"><li><div class="icon-widget-fullscreen icon-white" ></div></li></ul>'),
            _container,
            _id="fullscreen-"+Date.now();

		var thisWidgetId = "highcharts-widget-timeseries-" + HIGHCHARTS_ID++;
		var thisWidgetContainer = $('<div class="highcharts-widget" id="' + thisWidgetId + '"></div>');

		function createWidget() {

			Highcharts.theme = {
				global: {
					useUTC: false
				},
				colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee",
					"#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
				],
				chart: {
					backgroundColor: null,
					style: {
						fontFamily: "'Open Sans', sans-serif",
					},
					plotBorderColor: '#606063',
					// height: (46*self.getHeight()-6)+"px",
				},
                plotShadow: false,
				title: {
					style: {
						color: '#8b8b8b',
						fontSize: '12px',
					},
					align: "left",
				},
				subtitle: {
					style: {
						color: '#E0E0E3',
						textTransform: 'uppercase'
					}
				},
				xAxis: {
					gridLineColor: '#707073',
					labels: {
						style: {
							color: '#E0E0E3',
							fontSize: '8px',
						}
					},
					lineColor: '#707073',
					minorGridLineColor: '#505053',
					tickColor: '#707073',
					title: {
						style: {
							color: '#A0A0A3',
							fontSize: '10px',
						}
					}
				},





				yAxis: {
					gridLineColor: '#70707377',
					// gridLineDashStyle: "dash",
					labels: {
						style: {
							color: '#E0E0E3',
							fontSize: '8px',
						}
					},
					lineColor: '#707073',
					minorGridLineColor: '#505053aa',
					minorGridLineDashStyle: "dot",
					tickColor: '#707073',
					tickWidth: 0,
					title: {
						style: {
							color: '#A0A0A3',
							fontSize: '10px',
						}
					}
				},
				tooltip: {
					backgroundColor: 'rgba(0, 0, 0, 0.85)',
					style: {
						color: '#F0F0F0'
					}
				},
				plotOptions: {
					series: {
						dataLabels: {
							color: '#B0B0B3'
						},
						marker: {
							lineColor: '#3330'
						}
					},
					boxplot: {
						fillColor: '#505053'
					},
					candlestick: {
						lineColor: 'white'
					},
					errorbar: {
						color: 'white'
					}
				},
				legend: {
					enabled: currentSettings.include_legend,
					padding: 0,
			        align: 'left',
			        verticalAlign: 'top',
			        borderWidth: 0,
					// maxHeight: "5px",
					itemStyle: {
						color: '#E0E0E3'
					},
					itemHoverStyle: {
						color: '#FFF'
					},
					itemHiddenStyle: {
						color: '#606063'
					}
				},
				credits: {
                    enabled: false,
					style: {
						color: '#666'
					}
				},
				labels: {
					style: {
						color: '#707073'
					}
				},

				drilldown: {
					activeAxisLabelStyle: {
						color: '#F0F0F3'
					},
					activeDataLabelStyle: {
						color: '#F0F0F3'
					}
				},

				navigation: {
					buttonOptions: {
						symbolStroke: '#DDDDDD',
						theme: {
							fill: '#505053'
						}
					}
				},

				// scroll charts
				rangeSelector: {
					buttonTheme: {
						fill: '#505053',
						stroke: '#000000',
						style: {
							color: '#CCC'
						},
						states: {
							hover: {
								fill: '#707073',
								stroke: '#000000',
								style: {
									color: 'white'
								}
							},
							select: {
								fill: '#000003',
								stroke: '#000000',
								style: {
									color: 'white'
								}
							}
						}
					},
					inputBoxBorderColor: '#505053',
					inputStyle: {
						backgroundColor: '#333',
						color: 'silver'
					},
					labelStyle: {
						color: 'silver'
					}
				},

				navigator: {
					handles: {
						backgroundColor: '#666',
						borderColor: '#AAA'
					},
					outlineColor: '#CCC',
					maskFill: 'rgba(255,255,255,0.1)',
					series: {
						color: '#7798BF',
						lineColor: '#A6C7ED'
					},
					xAxis: {
						gridLineColor: '#505053'
					}
				},

				scrollbar: {
					barBackgroundColor: '#808083',
					barBorderColor: '#808083',
					buttonArrowColor: '#CCC',
					buttonBackgroundColor: '#606063',
					buttonBorderColor: '#606063',
					rifleColor: '#FFF',
					trackBackgroundColor: '#404043',
					trackBorderColor: '#404043'
				},

				exporting: {
					buttons : {
						contextButton:{
						enabled: currentSettings.include_contextmenu,
						menuItems:["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG", "separator", "downloadCSV", "downloadXLS"],
						//position relative to align option
						// menuClassName: "highcharts-custom-contextenu",
						// x: -10,
						// y:-5,
				
						}
					}
				},

				// special colors for some of the
				legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
				background2: '#505053',
				dataLabelsColor: '#B0B0B3',
				textColor: '#C0C0C0',
				contrastTextColor: '#F0F0F3',
				maskColor: 'rgba(255,255,255,0.3)'
			};

			Highcharts.setOptions(Highcharts.theme);

Highcharts.addEvent(Highcharts.Point, 'click', function () {
    if (this.series.options.className.indexOf('popup-on-click') !== -1) {
        const chart = this.series.chart;
        const date = Highcharts.dateFormat('%A, %b %e, %Y', this.x);
        const text = `<b>${date}</b><br/>${this.y} ${this.series.name}`;

        const anchorX = this.plotX + this.series.xAxis.pos;
        const anchorY = this.plotY + this.series.yAxis.pos;
        const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
        const x = align === 'left' ? anchorX + 10 : anchorX - 10;
        const y = anchorY - 30;
        if (!chart.sticky) {
            chart.sticky = chart.renderer
                .label(text, x, y, 'callout',  anchorX, anchorY)
                .attr({
                    align,
                    fill: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    zIndex: 7 // Above series, below tooltip
                })
                .css({
                    color: 'white'
                })
                .on('click', function () {
                    chart.sticky = chart.sticky.destroy();
                })
                .add();
        } else {
            chart.sticky
                .attr({ align, text })
                .animate({ anchorX, anchorY, x, y }, { duration: 250 });
        }
    }
});

			// // Get widget configurations
			// var thisWidgetXAxis = JSON.parse(currentSettings.xaxis);
			// var thisWidgetYAxis = JSON.parse(currentSettings.yaxis);
			var thisWidgetTitle = currentSettings.title;
			// var thisWidgetChartType = currentSettings.chartType;
			//console.log('chartType:' + currentSettings.chartType + ' ' + thisWidgetChartType);
			var colors = ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee","#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"];
			var chartStyle = JSON.parse(currentSettings.chart_style);
			var xAxis = JSON.parse(currentSettings.xaxis);
			var yAxis = currentSettings.yaxis?.length>0?currentSettings.yaxis?.map((item)=>JSON.parse(item.style_object)):JSON.parse("{\"gridLineWidth\": 0,\"showFirstLabel\": false,\"opposite\": false, \"title\": {\"text\": \"yaxis_name\",\"x\":7,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\", \"height\":10}},\"labels\": {\"align\": \"right\",\"x\": 3,\"y\": 16,\"style\": {\"color\": \"#ffffff\",\"fontSize\": \"8px\"},\"format\": \"{value:.,0f}\"}}");

			var thisWidgetSeries = [];

			// for (i = 1; i <= MAX_NUM_SERIES; i++) {
			// 	var datasource = currentSettings['series' + i];
			// 	if (datasource) {
			// 		var serieno = "series" + i + "label";
			// 		var label = currentSettings[serieno];
			// 		// console.log('label: ', label);
			// 		var newSeries = {
			// 			id: 'series' + i,
			// 			name: abel,
			// 			fillColor: {
			// 				linearGradient: {
			// 					x1: 0,
			// 					y1: 0,
			// 					x2: 0,
			// 					y2: 1
			// 				},
			// 				stops: [
			// 					[0, Highcharts.getOptions().colors[i - 1]],
			// 					//[1, 'rgba(2,0,0,0)']
			// 					[1, Highcharts.Color(Highcharts.getOptions().colors[i - 1]).setOpacity(0).get('rgba')]
			// 				]
			// 			},

			// 			data: [],
			// 			connectNulls: true,
   //          			dashStyle: currentSettings.dashStyle?currentSettings.dashStyle:"Solid", //Short, Dash, Dot, ShortDash, ShortDot, ShortDashDot, DashDot
			// 		};
					
			// 		thisWidgetSeries.push(newSeries);
			// 	}
			// }

			// Create widget
			thisWidgetContainer.css({'height': '100%'/*(self.getHeight()*_h-_r*2) + 'px'*/,'width': '100%'});
			// thisWidgetContainer.css('width', '100%');

			// thisWidgetContainer.highcharts({
			// 	chart: {
			// 		type: thisWidgetChartType,
			// 		animation: Highcharts.svg,
			// 		marginRight: 10,
			// 		marginBottom: 40,
			// 		// marginTop: 10,
			// 	},
			// 	title: {
			// 		text: thisWidgetTitle
			// 	},
			// 	xAxis: thisWidgetXAxis,
			// 	yAxis: thisWidgetYAxis,

			// 	plotOptions: {
			// 		area: {
			// 			marker: {
			// 				enabled: false,
			// 				symbol: 'circle',
			// 				radius: 2,
			// 				hover: {
			// 					enabled: true
			// 				}
			// 			},
			// 			lineWidth: 2,
			// 			states: {
			// 				hover: {
			// 					lineWidth: 2
			// 				}
			// 			},
			// 			threshold: null
			// 		},
			//         series: {
			//             // cursor: 'pointer',
			//             // className: 'popup-on-click',
			//             marker: {
			//                 lineWidth: 1,
			// 				radius: 3,
			// 				lineStyle: 'dot',
			//             },
			//             line: {
			//             	dashStyle: "dot",
			//             },
			// 			lineWidth: 1,
			// 			states: {
			// 				hover: {
			// 					lineWidth: 2
			// 				}
			// 			},
			//         }
			// 	},

			// 	tooltip: {
			//         // shared: true,
			//         crosshairs: true,
			// 		// formatter: function() {
			// 		// 	return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',
			// 		// 		this.x) + '<br/>▸ ' + Highcharts.numberFormat(this.y, 1);
			// 		// }
			// 	},
			// 	series: thisWidgetSeries
			// });

//---------------------------------------------------------
thisWidgetContainer.highcharts({

    plotOptions: {
        series: {
            cursor: 'pointer',
            className: 'popup-on-click',
            marker: {
                lineWidth: 1
            }
        }
    },

    colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee","#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    
    chart: {
//        type: 'spline',
        backgroundColor: null,
        style: {
            fontFamily: "'Open Sans', sans-serif",
        },
        plotBorderColor: '#60606300',
//        scrollablePlotArea: {
//            minWidth: 700
//        },
        animation: Highcharts.svg, // don't animate in old IE

        ...chartStyle,
        // marginTop: 30,
        // marginLeft: 20,
        // marginRight: 20,
        // marginBottom: 40
    },

    data: {
        csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/analytics.csv',
        beforeParse: function (csv) {
            return csv.replace(/\n\n/g, '\n');
        }
    },

    title: {
        text: thisWidgetTitle, //null,
        style: {
            color:"#ffffff",
            //fontSize: "8px",
        }
    },

    subtitle: {
        text: null,
        style: {
            color:"#ffffff",
            //fontSize: "8px",
        }
    },

    xAxis: xAxis,

    // xAxis: {
    //     title: {
    //         text: "time",
    //         y:-10,
    //         align: "middle",
    //         enabled: true,
    //         style: {
    //             color:"#ffffff"
    //         }
    //     },
    //     tickInterval: null, //3600 * 1000, // one week  7 * 24 * 3600 * 1000
    //     tickWidth: 0,
    //     gridLineWidth: 0,
    //     labels: {
    //         align: 'right',
    //         x: -2,
    //         y: 10,
    //         style: {
    //             color:"#ffffff",
    //         	fontSize: "8px",
    //         }
    //     }
    // },
 
    yAxis: yAxis,

    // yAxis: [{ // left y axis
    //     //linkedTo: 1,
    //     title: {
    //         text: "User",
    //         x:7,
    //         style: {
    //             color: colors[0],
    //             fontSize: '8px',
    //             height:10
    //         }
    //     },
    //     opposite: false,
    //     labels: {
    //         align: 'right',
    //         x: 3,
    //         y: 16,
    //         style: {
    //             color: colors[0],
    //             fontSize: '8px'
    //         },
    //         format: '{value:.,0f}'
    //     },
    //     gridLineWidth: 0,
    //     showFirstLabel: false
    // }, { // right y axis
    //     // linkedTo: 0,
    //     gridLineWidth: 0,
    //     opposite: true,
    //     title: {
    //         text: "Session",
    //         x:-7,
    //         style: {
    //             color: colors[1],
    //             fontSize: '8px'
    //         }
    //     },
    //     labels: {
    //         align: 'left',
    //         x: -3,
    //         y: 16,
    //         style: {
    //             color: colors[1],
    //             fontSize: '8px'
    //         },
    //         format: '{value:.,0f}'
    //     },
    //     showFirstLabel: false
    // }],
    
    legend: {
        layout: 'horizontal',
        align: 'left',
        verticalAlign: 'top',
        //x: 80,
        //y: 55,
        //floating: true,
        borderWidth: 0,
        itemStyle:{
            color: "#ffffff",
            fontSize: "8px"
        },
        //backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
    },

    tooltip: {
        shared: true,
        crosshairs: true,
		style: {
			zIndex: 400
		},
        //valueSuffix: '%'
    },
    
    credits: {
        enabled: false
    },
    
    series: [{
        name: 'user',
        type: 'line',
        //yAxis: 0,
        tooltip: {
            valueSuffix: ' x1'
        },
        dashStyle: 'ShortDashDot',
        lineWidth: 1,
        marker: {
            enabled: true,
            radius: 2
        }
    }, 
    {
        name: 'session',
        type: 'line',
        //yAxis: 1,
        tooltip: {
            valueSuffix: ' x2'
        },
        dashStyle: 'ShortDot',
        lineWidth: 1,
        marker: {
            enabled: true,
            radius: 2
        }
    }]
});

		//----------------------------------------------------------------	
		}

		self.render = function(containerElement) {
            _container=containerElement;
            $(_container).attr("id",_id).append(thisWidgetContainer).append(fscreen.on("click",()=>{fullscreenById(_id)}));
            (currentSettings.enabled_fullscreen)&&($(_container).addClass("fullscreenable"))
			setTimeout(function() {
				createWidget();
			}, 1000);
		}

		self.getHeight = function() {
			return parseInt(currentSettings.blocks)+1;
		}

		self.onSettingsChanged = function(newSettings) {
			// console.log("----- newSetting : ",newSettings)
			// setTimeout(function() {
				currentSettings = newSettings;
            	currentSettings.enabled_fullscreen?$(_container).addClass("fullscreenable"):$(_container).removeClass("fullscreenable")
				createWidget();
			// }, 1000);
		}

		self.onCalculatedValueChanged = function(settingName, newValue) {
			// console.log(settingName, 'newValue:', newValue);

			var chart = thisWidgetContainer.highcharts();
			var series = chart.get(settingName);
			if (series) {
				var timeframeMS = currentSettings.timeframe * ONE_SECOND_IN_MILIS;
				var seriesno = settingName;
				var len = series.data.length;
				var shift = false;

				// Check if it should shift the series
				if (series.data.length > 1) {

					var first = series.data[0].x;
					//var last = series.data[series.data.length-1].x;
					var last = new Date().getTime();
					// Check if time frame is complete
					var diff = last - first;
					//                                         console.log('last :', last);
					//                                         console.log('first:', first);
					//                                         console.log('diff :', diff);

					if (last - first > timeframeMS) {
						shift = true;
					}
				}

				if (isNumber(newValue)) { //check if it is a real number and not text
					var x = (new Date()).getTime();
					// console.log('addPoint:', x,currentSettings[seriesno], Number(newValue));
					var point = [x, Number(newValue)]; //create the array+ "Y"
					series.addPoint(point, true, shift);
				};
			}
		}

		self.onDispose = function() {
			return;
		}
	}

}());
