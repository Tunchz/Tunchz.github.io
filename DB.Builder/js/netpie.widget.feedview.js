/*  NETPIE widget plugin for Freeboard                            */
/*  Developed by Chavee Issariyapat                               */
/*  More information about NETPIE please visit https://netpie.io  */

if (typeof feedview === "undefined") {
    feedview = [];
}

(function() {

    freeboard.loadWidgetPlugin({
        "type_name"   : "FeedView",
        "display_name": "FeedView",
        "description" : "",
        "fill_size" : true,
        "external_scripts" : [
            "js/netpie.feedview.js"
        ],
        "settings"  : [
            {
                 "name"        : "title",
                 "display_name": "Title",
                 "type"        : "text"
            },
            {
                "name"          : "datasource",
                "display_name"  : "Data Source",
                "type"          : "calculated",
                "description"   : ""
            },
            {
                name: "filter",
                display_name: "Filter",
                type: "text",
                "description" : "Data fields separated with comma e.g. temp,humid,light. Blank means display all fields."
            },
            {
                "name": "timeframe",
                "display_name": "Time Steps",
                "type": "number",
                "description": "Specify the number of data points you want to see.",
                "default_value": _default.timeframe,
            },
            {
                name: "type",
                display_name: "Type of Chart",
                type: "option",
                options:[
                    {
                        name: "Line",
                        value: "line"
                    },
                     {
                        name: "Step",
                        value: "step"
                    }
                ]
            },
            {
                name: "xaxis",
                display_name: "X axis title",
                type: "text",
            },
            {
                name: "yaxis",
                display_name: "Y axis title",
                type: "text",
            },
            {
                name: "yzero",
                display_name: "begin at 0",
                type: "boolean",
            },
            {
                name: "color",
                display_name: "Line Colors",
                type: "text",
                default_value: "",
                "description": "enter the color set separated by comma e.g. #ff0000,#00ff00,#0000ff or leave blank for the default color set"
            },
            {
                name: "marker",
                display_name: "Maker",
                type: "boolean",
                default_value: true
            },
            {
                name: "multipleaxis",
                display_name: "Multiple Axis",
                type: "boolean",
                default_value: true
            },
            {
                name: "autogap",
                display_name: "Auto Gap",
                type: "boolean",
                default_value: false
            },
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 4,
            },
            // {
            //     name: "window_size",
            //     display_name: "Window Size",
            //     type: "integer",
            //     default_value: 1,
            // },
            // {
            //     name: "window_unit",
            //     display_name: "Window Unit",
            //     type: "option",
            //     default_value: "hours",
            //     options:[
            //         {
            //             name: "seconds",
            //             value: "seconds"
            //         },
            //          {
            //             name: "minutes",
            //             value: "minutes"
            //         },
            //         {
            //             name: "hours",
            //             value: "hours"
            //         },
            //         {
            //             name: "days",
            //             value: "days"
            //         },
            //         {
            //             name: "months",
            //             value: "months"
            //         },
            //         {
            //             name: "years",
            //             value: "years"
            //         },
            //     ],
            // },
            // {
            //     name: "granularity_size",
            //     display_name: "Granularity Size",
            //     type: "integer",
            //     default_value: 1,
            // },
            // {
            //     name: "granularity_unit",
            //     display_name: "Granularity Unit",
            //     type: "option",
            //     default_value: "minutes",
            //     options:[
            //         {
            //             name: "seconds",
            //             value: "seconds"
            //         },
            //          {
            //             name: "minutes",
            //             value: "minutes"
            //         },
            //         {
            //             name: "hours",
            //             value: "hours"
            //         },
            //         {
            //             name: "days",
            //             value: "days"
            //         },
            //         {
            //             name: "months",
            //             value: "months"
            //         },
            //         {
            //             name: "years",
            //             value: "years"
            //         },
            //     ]
            // },

        ],
        newInstance   : function(settings, newInstanceCallback) {
            newInstanceCallback(new feedviewWidgetPlugin(settings));
        }
    });

    var feedviewWidgetPlugin = function(settings) {
        var self = this;
        self.dataArray = {};
        // var sizeWidth = {"240":"4","300":"5","360":"6","420":"7","480":"8","540":"9","600":"10"};
        self.widgetID = randomString(16);
        var currentSettings = settings;
        var feedviewElement = $("<div id=\"chart"+self.widgetID+"\"></div>");
        self.render = function(containerElement) {
            // currentSettings.height = sizeWidth[currentSettings.height_block];
            $(containerElement).append(feedviewElement);
            feedviewElement.css({
                height:(46*currentSettings.height_block - 6) +"px",
                // width: 100%
            });
        }

        this.getHeight = function () {
            // if(currentSettings.height===undefined){
            //     currentSettings.height = 4;
            // }
            return Number(currentSettings.height_block?currentSettings.height_block:4);
        }

        self.onSettingsChanged = function(newSettings) {
            currentSettings = newSettings;

            // currentSettings.height = sizeWidth[currentSettings.height_block];
            $("#"+'chart'+self.widgetID).css({
                height:(46*currentSettings.height_block - 6) +"px",
                // width: 100%
            });

            insertFeedView();
        }

        self.onCalculatedValueChanged = function(settingName, newValue) {
            // self.dataArray = newValue;
            newValue.map((item,i)=>{
                if (self.dataArray[item.attr]) {
                    self.dataArray[item.attr].values = self.dataArray[item.attr].values.concat(item.values)
                    if (self.dataArray[item.attr].values.length > (Number(currentSettings.timeframe)+1)) self.dataArray[item.attr].values.shift()
                } else {
                    self.dataArray[item.attr] = item;
                }
            })
            insertFeedView();
        }

        self.onDispose = function() {
            for (var i = feedview.length - 1; i >= 0; i--) {
                if(self.widgetID==feedview[i].id){
                    check = true;
                    index = i;
                }
            }
            if(!check){
                feedview.remove(i);
            }
        }

        //this.onSettingsChanged(settings);

        freeboard.on('theme_changed',function() {
            updateChart('chart'+self.widgetID,self.dataArray,self.option,currentSettings);
        });

        var insertFeedView =function() {
            if(self.dataArray!==undefined){
                self.option = {
                    title : currentSettings.title,
                    xaxis : currentSettings.xaxis,
                    yaxis : currentSettings.yaxis,
                    multipleaxis : currentSettings.multipleaxis,
                    yzero:currentSettings.yzero,
                    color:currentSettings.color,
                    type : currentSettings.type, //line,step
                    marker : currentSettings.marker, //true,false
                    filter : currentSettings.filter,
                    autogap : currentSettings.autogap
                }
                // jQuery(window).ready(function() {
                updateChart('chart'+self.widgetID,self.dataArray,self.option,currentSettings);
                // });
            }
        }        
    }
}());
