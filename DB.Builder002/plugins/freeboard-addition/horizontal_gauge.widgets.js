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
        "type_name"   : "horizontal_gauge",
        "display_name": "Horizontal Linear Gauge",
        // "description" : "A slider widget that can perform Javascript action.",
        "fill_size" : false,
        "external_scripts" : ["plugins/thirdparty/rangeslider.js"],
        "settings"  : [
            {
                "name"        : "caption",
                "display_name": "Title",
                "type"        : "text"
            },          
            {
                "name"          : "autovaluesource",
                "display_name"  : "Value",
                "type"          : "calculated",
                "description" : "Gauge will be updated upon the change of variables (e.g. other data sources)."
            },
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

        ],
        newInstance   : function(settings, newInstanceCallback) {
            newInstanceCallback(new sliderWidgetPlugin(settings));
        }
    });

    var sliderWidgetPlugin = function(settings) {
        var self = this;
        var currentSettings = settings;

        self.widgetID = randomString(16);

        var sliderContainer = $('<div class="horizontal-gauge-container slider-container"></div>');

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
