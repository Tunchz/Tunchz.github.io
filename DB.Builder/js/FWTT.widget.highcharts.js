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
	var MAX_NUM_SERIES = 3;

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
	var highchartsLineWidgetSettings = [{
		"name": "timeframe",
		"display_name": "Timeframe in SECONDS",
		"type": "number",
		"description": "Specify the last number of seconds you want to see.",
		"default_value": _default.timeframe
	}, {
		"name": "chartType",
		"display_name": "Chart Type",
		"type": "option",
		"options": [{
			"name": "Area",
			"value": "area"
		}, {
			"name": "Spline",
			"value": "spline"
		}]
	}, {
		"name": "title",
		"display_name": "Title",
		"type": "text"
	}, {
		"name": "xaxis",
		"display_name": "X-Axis",
		"type": "calculated",
		"default_value": "{\"title\":{\"text\" : \"Time\"}, \"type\": \"datetime\", \"floor\":0}"
	}, {
		"name": "yaxis",
		"display_name": "Y-Axis",
		"type": "calculated",
		"default_value": "{\"title\":{\"text\" : \"Values\"}, \"minorTickInterval\":\"auto\", \"floor\":0}"
	},
    {
        name: "blocks",
        display_name: "Height Blocks",
        type: "integer",
        default_value: 4,
        required: !0
    }, {
        name: "include_legend",
        display_name: "Include Legend",
        type: "boolean",
        default_value: 1,
    }, {
        name: "include_contextmenu",
        display_name: "Include Context Menu",
        type: "boolean",
        default_value: 1,
    }];

	for (i = 1; i <= MAX_NUM_SERIES; i++) {
		var dataSource = {
			"name": "series" + i,
			"display_name": "Series " + i + " - Datasource",
			"type": "calculated"
		};

		var xField = {
			"name": "series" + i + "label",
			"display_name": "Series " + i + " - Label",
			"type": "text",
		};

		highchartsLineWidgetSettings.push(dataSource);
		highchartsLineWidgetSettings.push(xField);
	}

	freeboard
		.loadWidgetPlugin({
			"type_name": "highcharts-timeseries",
			"display_name": "Time series (Highcharts)",
			"description": "Time series line chart.",
			"external_scripts": [
				// "https://code.highcharts.com/8.0.0/highcharts.js",
				// "https://code.highcharts.com/8.0.0/modules/exporting.js",
	            "https://code.highcharts.com/highcharts.js",
	            "https://code.highcharts.com/highcharts-more.js",
	            "https://code.highcharts.com/modules/exporting.js",
	            "https://code.highcharts.com/modules/export-data.js",
	            "https://code.highcharts.com/modules/accessibility.js",
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
		var currentSettings = settings;

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
							lineColor: '#333'
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

			// Get widget configurations
			var thisWidgetXAxis = JSON.parse(currentSettings.xaxis);
			var thisWidgetYAxis = JSON.parse(currentSettings.yaxis);
			var thisWidgetTitle = currentSettings.title;
			var thisWidgetChartType = currentSettings.chartType;
			//console.log('chartType:' + currentSettings.chartType + ' ' + thisWidgetChartType);
			var thisWidgetSeries = [];

			for (i = 1; i <= MAX_NUM_SERIES; i++) {
				var datasource = currentSettings['series' + i];
				if (datasource) {
					var serieno = "series" + i + "label";
					var label = currentSettings[serieno];
					// console.log('label: ', label);
					var newSeries = {
						id: 'series' + i,
						name: label,
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[i - 1]],
								//[1, 'rgba(2,0,0,0)']
								[1, Highcharts.Color(Highcharts.getOptions().colors[i - 1]).setOpacity(0).get('rgba')]
							]
						},

						data: [],
						connectNulls: true
					};
					
					thisWidgetSeries.push(newSeries);
				}
			}

			// Create widget
			thisWidgetContainer.css({'height': (self.getHeight()*_h-_r*2) + 'px','width': '100%'});
			// thisWidgetContainer.css('width', '100%');

			thisWidgetContainer.highcharts({
				chart: {
					type: thisWidgetChartType,
					animation: Highcharts.svg,
					marginRight: 10,
					marginBottom: 40,
					// marginTop: 10,
				},
				title: {
					text: thisWidgetTitle
				},
				xAxis: thisWidgetXAxis,
				yAxis: thisWidgetYAxis,

				plotOptions: {
					area: {
						marker: {
							enabled: false,
							symbol: 'circle',
							radius: 2,
							hover: {
								enabled: true
							}
						},
						lineWidth: 2,
						states: {
							hover: {
								lineWidth: 2
							}
						},
						threshold: null
					},
			        series: {
			            // cursor: 'pointer',
			            // className: 'popup-on-click',
			            marker: {
			                lineWidth: 1
			            }
			        }
				},

				tooltip: {
			        // shared: true,
			        crosshairs: true,
					// formatter: function() {
					// 	return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',
					// 		this.x) + '<br/>▸ ' + Highcharts.numberFormat(this.y, 1);
					// }
				},
				series: thisWidgetSeries
			});
		}

		self.render = function(containerElement) {
			// setTimeout(function() {
				$(containerElement).append(thisWidgetContainer);
				createWidget();
			// }, 1000);
		}

		self.getHeight = function() {
			return parseInt(currentSettings.blocks)+1;
		}

		self.onSettingsChanged = function(newSettings) {
			// setTimeout(function() {
				currentSettings = newSettings;
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
					var plotMqtt = [x, Number(newValue)]; //create the array+ "Y"
					series.addPoint(plotMqtt, true, shift);
				};
			}
		}

		self.onDispose = function() {
			return;
		}
	}

}());