/*  NETPIE widget plugin for Freeboard                            */
/*  Developed by Chavee Issariyapat                               */
/*  More information about NETPIE please visit https://netpie.io  */

if (typeof sliderObject == "undefined") {
    sliderObject = {};
}

(function() {
    var bcolor = {red:["#FFF","#e74c3c"],green:["#FFF","#2ecc71"],blue:["#FFF","#3498db"],yellow:["#FFF","#f1c40f"],white:["#454545","#ecf0f1"],grey:["#FFF","#bdc3c7"]};

    $('head').append('<link href="plugins/thirdparty/rangeslider.css" rel="stylesheet" />');

    freeboard.loadWidgetPlugin({
        "type_name"   : "Slider",
        "display_name": "Range Slider",
        "description" : "A slider widget that can perform Javascript action.",
        "fill_size" : false,
        "external_scripts" : ["plugins/thirdparty/rangeslider.js"],
        "settings"  : [
            {
                "name"        : "caption",
                "display_name": "Slider Caption",
                "type"        : "text"
            },
            // {
            //     "name"        : "color",
            //     "display_name": "Filled Color",
            //     "type"        : "option",
            //     "options"     : [
            //         {
            //             "name" : "Red",
            //             "value": "red"
            //         },
            //         {
            //             "name" : "Green",
            //             "value": "green"
            //         },
            //         {
            //             "name" : "Blue",
            //             "value": "blue"
            //         },
            //         {
            //             "name" : "Yellow",
            //             "value": "yellow"
            //         },
            //         {
            //             "name" : "White",
            //             "value": "white"
            //         },
            //         {
            //             "name" : "Grey",
            //             "value": "grey"
            //         }

            //     ],
            //     "default_value" : "grey"
            // },
            {
                "name"        : "color",
                "display_name": "Filled Color",
                "type"        : "text",
                "default_value" : "#FF9900",
                "required"    : 1
            },
            {
                "name"        : "bg_color",
                "display_name": "Unfilled Color",
                "type"        : "text",
                "default_value" : "#222222",
                "required"    : 1
            },
            {
                "name"          : "showvalue",
                "display_name"  : "Display value",
                "type"          : "boolean",
                "default_value" : 1
            },
            {
                "name"          : "min",
                "display_name"  : "Min Value",
                "type"          : "text",
                "default_value" : 0
            },
            {
                "name"          : "max",
                "display_name"  : "Max Value",
                "type"          : "text",
                "default_value" : 100
            },
            {
                "name"          : "step",
                "display_name"  : "Step",
                "type"          : "text",
                "default_value" : 1
            },
            {
                "name"          : "initialvalue",
                "display_name"  : "Initial Value",
                "type"          : "text",
                "default_value" : "0",
                "description"   : "The default value set only the first time the widget is loaded."
            },                      
            {
                "name"          : "autovaluesource",
                "display_name"  : "Auto Updated Value",
                "type"          : "calculated",
                "description" : "Slider will be updated upon the change of variables (e.g. other data sources)."
            },                      
            {
                "name"        : "onStart",
                "display_name": "onStart action",
                "type"        : "calculated",
                "description" : "Add some Javascript here. You can access to a slider attribute using variables 'value' and 'percent'."
            },
            {
                "name"        : "onSlide",
                "display_name": "onSlide action",
                "type"        : "calculated",
                "description" : "Add some Javascript here. You can access to a slider attribute using variables 'value' and 'percent'."
            },
            {
                "name"        : "onStop",
                "display_name": "onStop action",
                "type"        : "calculated",
                "description" : "Add some Javascript here. You can access to a slider attribute using variables 'value' and 'percent'."
            },
            {
                "name"          : "onCreatedAction",
                "display_name"  : "onCreated Action",
                "type"          : "text",
                "description"   : "JS code to run after a button is created"
            },
            // {
            //     "name"          : "height_block",
            //     "display_name"  : "Height Blocks",
            //     "type"          : "integer",
            //     "default_value" : 2,
            //     "required"      : !0
            // }

        ],
        newInstance   : function(settings, newInstanceCallback) {
            newInstanceCallback(new sliderWidgetPlugin(settings));
        }
    });

    var sliderWidgetPlugin = function(settings) {
        var self = this;
        var currentSettings = settings;

        self.widgetID = randomString(16);

        var sliderContainer = $('<div class="slider-container"></div>');

        var sliderElement = $("<input id=\""+self.widgetID+"\" type=\"range\" min=\""+settings.min+"\" max=\""+settings.max+"\" step=\""+settings.step+"\" value=\""+(settings.initialvalue || 0)+"\" />");
        self.autoValue = 0;

        var t = settings.initialvalue || 0;
        if (t > settings.max) t = settings.max;
        else if (t < settings.min) t = settings.min;

        var textElement = $("<span class='rangeSlider-title' style=\"float:left;\">"+(settings.caption?settings.caption:"")+"</span>");
        var valueElement = $("<div class='rangeSlider-value' style=\"float:right;\">"+t+"</div>");

        if (settings.showvalue) valueElement.show();
        else valueElement.hide();

        self.linkAutoValue = (settings.autovaluesource && settings.autovaluesource.length > 0);

        globalStore[self.widgetID] = {};

        globalStore[self.widgetID]['onStart'] = settings.onStart;
        globalStore[self.widgetID]['onStop'] = settings.onStop;
        globalStore[self.widgetID]['onSlide'] = settings.onSlide;

        function updateSliderColor(color,bg_color) {
            if (color) {
                if (document.getElementById(self.widgetID)) {
                    sliderObject[self.widgetID].setFillColor(color);
                    sliderObject[self.widgetID].setBackgroundColor(bg_color);
                    // valueElement.css({color: color})
                }
            }
        }

        self.render = function(containerElement) {
            $(containerElement).append(sliderContainer);sliderContainer.append(textElement).append(valueElement).append(sliderElement);

            self.lastSlideCallback = 0;
            self.nextSlideCallbackTimer = 0;
            self.maxCallbackDuration = 200;  //ms

            (function () {
                var elements = document.getElementById(self.widgetID);
                // Basic rangeSlider initialization
                sliderObject[self.widgetID] = rangeSlider.create(elements, {
                    // Callback function
                    onInit: function () {
                        self.controlling = false;
                    },

                    // Callback function
                    onSlideStart: function (value, percent, position) {
                        self.controlling = true;
                        valueElement.text(value);
                        if (globalStore[self.widgetID]['onStart'])
                            eval('var value='+value+'; var percent='+percent+';'+globalStore[self.widgetID]['onStart']);
                        //console.info('onSlideStart', 'value: ' + value, 'percent: ' + percent, 'position: ' + position);
                    },

                    // Callback function
                    onSlide: function (value, percent, position) {
                        self.controlling = true;
                        valueElement.text(value);
                        if (globalStore[self.widgetID]['onSlide']) {
                            if (Date.now() - self.lastSlideCallback > self.maxCallbackDuration) {
                                eval('var value='+value+'; var percent='+percent+';'+globalStore[self.widgetID]['onSlide']);
                                self.lastSlideCallback = Date.now();
                            }
                            else {
                                if (self.nextSlideCallbackTimer==0) {
                                    self.nextSlideCallbackTimer = setTimeout( function() {
                                        eval('var value='+sliderObject[self.widgetID].value+'; var percent='+percent+';'+globalStore[self.widgetID]['onSlide']);
                                        self.lastSlideCallback = Date.now();
                                        self.nextSlideCallbackTimer=0;
                                    },self.maxCallbackDuration-(Date.now()-self.lastSlideCallback));
                                }
                            }   
                        }
                    },

                    // Callback function
                    onSlideEnd: function (value, percent, position) {
                        valueElement.text(value);
                        if (globalStore[self.widgetID]['onStop'])
                            eval('var value='+value+'; var percent='+percent+';'+globalStore[self.widgetID]['onStop']);

                            if (self.linkAutoValue) {
                                setTimeout(function() {
                                    sliderObject[self.widgetID].update({value: self.autoValue});
                                    valueElement.text(sliderObject[self.widgetID].value);
                                    self.controlling = false;
                                },500);
                            }
                            else {
                                self.controlling = false;
                            }
                    }
                });
            })();

            updateSliderColor(settings.color, settings.bg_color);
        }

        self.getHeight = function() {
            return 1; //parseInt(currentSettings.height_block?currentSettings.height_block:2);
        }

        self.onSettingsChanged = function(newSettings) {
            currentSettings = newSettings;
            updateSliderColor(newSettings.color,newSettings.bg_color);
            textElement.text(newSettings.caption?newSettings.caption:"");

            if (newSettings.showvalue) valueElement.show();
            else valueElement.hide();

            globalStore[self.widgetID]['onStart'] = newSettings.onStart;
            globalStore[self.widgetID]['onStop'] = newSettings.onStop;
            globalStore[self.widgetID]['onSlide'] = newSettings.onSlide;

            var oldvalue = sliderObject[self.widgetID].value;

            /* have to update in 2 steps */
            sliderObject[self.widgetID].update({min: Number(newSettings.min||0), max: Number(newSettings.max||100), step: Number(newSettings.step||1)});
            sliderObject[self.widgetID].update({value: oldvalue});

            valueElement.text(sliderObject[self.widgetID].value);

            self.linkAutoValue = (newSettings.autovaluesource && newSettings.autovaluesource.length > 0);
            if (self.linkAutoValue) {
                sliderObject[self.widgetID].update({value: self.autoValue});
                valueElement.text(sliderObject[self.widgetID].value);
            }
        }

        self.onCalculatedValueChanged = function(settingName, newValue) {
            if(settingName == "autovaluesource") {
                if (self.controlling) {
                    self.autoValue = newValue;
                }
                else {
                    self.autoValue = newValue;
                    sliderObject[self.widgetID].update({value: newValue});
                    valueElement.text(sliderObject[self.widgetID].value);
                }
            }
        }

        self.onDispose = function() {
        }

        if (settings.onCreatedAction) {
            var timer = setInterval(function() {
                if (Object.getOwnPropertyNames(microgear).length > 0) {
                    clearInterval(timer);
                    eval(settings.onCreatedAction);
                }
            },200);
        }
    }



}());
