(function(){
    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        var b = $('<div class="html-widget"></div>'),
            c = a;
        this.render = function(a) {
            $(a).append(b)
        }, this.onSettingsChanged = function(a) {
            c = a
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html",
        display_name: "HTML",
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })


    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        var b = $('<div class="html-widget"></div>'),
            c = a;
        this.render = function(a) {
            $(a).append(b)
        }, this.onSettingsChanged = function(a) {
            c = a
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html_d3",
        display_name: "HTML D3",
        "external_scripts": [
            "plugins/thirdparty/d3.v3.min.js"
        ],
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML with D3 V3 support."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })

    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        function initTheme() {
            Highcharts.theme = {
                global: {
                    useUTC: false
                },
                colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee",
                    "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
                ],
                chart: {
                    backgroundColor: "#fff0",
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
                    enabled: true,
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
                        enabled: true,
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
            console.log("--- Highchart theme initialize")
        }
        var b = $('<div class="html-widget"></div>'),
            c = a,
            _self;
        this.render = function(a) {
            _self=a;
            $(_self).append(b);
            // setTimeout(()=>{b.html(c.html)},100);
            // b.html(c.html);
            setTimeout(()=>{b.empty()},1000);
        }, this.onSettingsChanged = function(a) {
            c = a
            // setTimeout(()=>{
                b.empty();
                // b.html(c.html);
            // },2000);
            // initTheme();
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html_highchart",
        display_name: "HTML Highchart",
        "external_scripts": [
            // "https://code.highcharts.com/8.0.0/highcharts.js",
            // "https://code.highcharts.com/8.0.0/modules/exporting.js",
            "plugins/thirdparty/highcharts/highcharts.js",
            "plugins/thirdparty/highcharts/highcharts-more.js",
            "plugins/thirdparty/highcharts/exporting.js",
            "plugins/thirdparty/highcharts/export-data.js",
            "plugins/thirdparty/highcharts/accessibility.js",
            "plugins/thirdparty/highcharts/sonification.js",
            "plugins/thirdparty/highcharts/data.js",
            "plugins/thirdparty/highcharts/solid-gauge.js",
        ],
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML with highchart v.8 support."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })


}());
