

(function()
{

//------------------- Custom Data source


    var z = function(a, b) {
        function c(a) {
            if (a && a > 0) {
                f && clearInterval(f), f = setInterval(function() {
                    e.updateNow()
                }, a)
            } else {
                f && clearInterval(f), f=null;
            }
        }

        function d(a) {
            return a.replace(/\w\S*/g, function(a) {
                return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
            })
        }
        var e = this,
            f = null,
            g = a;

        (!datasourceOptions[g.name])&&(datasourceOptions[g.name]={}),
        datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
        datasourceOptions[g.name]["selectedOption"]=0,
        datasourceOptions[g.name]["datasourceInstance"]=this,

        c(1e3 * g.refresh), this.updateNow = function() {

            // console.log("-------Name : ", g.name);
            // console.log("-------datasourceOptions : ", datasourceOptions);
            // console.log("-------selected url : ", g.url_array[datasourceOptions[g.name]["selectedOption"]]["Url"]);
            // console.log("-------Url Array : ", g.url_array);


            $.get( g.url_array[datasourceOptions[g.name]["selectedOption"]]["Url"] , ( response ) => {

                // Convert script string to function(response) { ...js script string...}
                if (!_.isUndefined(g.script_text)) {
                    _.isArray(g.script_text) && (g.script_text = "[" + g.script_text.join(",") + "]"), (g.script_text.match(/;/g) || []).length <= 1 && -1 == g.script_text.indexOf("return") && (g.script_text = "return " + g.script_text);
                    var f;
                    try {
                        f = new Function(["response","option"], g.script_text)
                    } catch (g) {
                        var h = g.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                        f = new Function(["response","option"], 'return "' + h + '";')
                    }

                    // console.log(">>>> return result : ", f(response));
                }
                b({
                    "option name":datasourceOptions[g.name]["optionNameArray"][datasourceOptions[g.name]["selectedOption"]],
                    result: f?f(response,option=datasourceOptions[g.name]["selectedOption"]):response
                });
            });



        }, this.onDispose = function() {
            delete datasourceOptions[g.name],clearInterval(f), f = null
        }, this.onSettingsChanged = function(a) {
            g = a, 
            datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
            datasourceOptions[g.name]["datasourceInstance"]=e,
            e.updateNow(), 
            c(1e3 * g.refresh)
        }
    };
    freeboard.loadDatasourcePlugin({
        type_name: "custom_scrape_api_multiple_options",
        display_name: "Custom Scrape API with Multiple URL Options",
        settings: [{        
            name: "url_array",
            display_name: "Connection Url Array",
            type: "array",
            description: "web url or url string for api call, separate each url by comma; ex. urlOption1,urlOption2,urlOption3",
            settings:[{
                name: "Option Name",
                type: "text",
            },{
                name: "Url",
                type: "text",
            }]
            // multi_input: "true",
        }, {
            name: "script_text",
            display_name: "Script Text",
            type: "jsscript",
            description: "script to extract the needed result."
        // }, {
        //     name: "units",
        //     display_name: "Units",
        //     type: "option",
        //     "default": "imperial",
        //     options: [{
        //         name: "Imperial",
        //         value: "imperial"
        //     }, {
        //         name: "Metric",
        //         value: "metric"
        //     }]
        }, {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 10,
            description: "put 0 for no refresh",
        }],
        newInstance: function(a, c, d) {
            c(new z(a, d))
        }
    });

    var g = function(b) {
        function d() {
            _.isUndefined(_settings.units) || "" == _settings.units ? container.css("max-width", "100%") : container.css("max-width", f.innerWidth() - i.outerWidth(!0) + "px")
        }
        var _settings = b,
            _self,
            _data,
            container = $('<div class="url-option-container"></div>'),
            g = $('<h2 class="section-title tw-title tw-td" style="position:absolute; top:0; left:0; right: 0px;pointer-events: none;"></h2>').appendTo(container),
            s = $("<select class='minimal'></select>").appendTo($('<div class="styled-select"></div>').appendTo(container)).change(function() {
                   // console.log("selected option : ",$(this).val())
                   datasourceOptions[_settings.datasource_name].selectedOption = $(this).val()
                   datasourceOptions[_settings.datasource_name].datasourceInstance.updateNow()
                   $(this).blur()
                });

        this.render = function(a) {
            _self = a
            $(a).append(container)
            g.html(_settings.title)
            s.empty().css({color:_settings.font_color, "border-color":_settings.line_color, "background-color":_settings.background_color, "font-size":_settings.font_size+"px", "text-align": _settings.font_align, "padding-top":(26-_settings.font_size)*0.4+"px", 'margin-left':_settings.left_margin+'px', 'margin-right':_settings.right_margin+'px', 'border-bottom': _settings.line_thickness+'px solid '+_settings.line_color})

            datasourceOptions[_settings.datasource_name].optionNameArray.map((item,i)=>{
               $("<option></option>").text(item).attr("value", i).appendTo(s) 
            })
            s.val(datasourceOptions[_settings.datasource_name].defaultOption?datasourceOptions[_settings.datasource_name].defaultOption:_settings.default_option?parseInt(_settings.default_option-1):0).change()
        }, 
        this.onSettingsChanged = function(a) {
            _settings = a;
            this.render(_self)

        // }, this.onCalculatedValueChanged = function(b, d) {


        }, this.onDispose = function() {}, 
        this.getHeight = function() {
            return (parseInt((_settings.height_block)?_settings.height_block:1))
        }, this.onSettingsChanged(b)
    };
    freeboard.loadWidgetPlugin({
        type_name: "url_option_selector_widget",
        display_name: "URL Options Selector",
        // external_scripts: ["plugins/thirdparty/jquery.sparkline.min.js"],
        // external_scripts: ["plugins/thirdparty/jquery.sparkline.js"],
        settings: [{
            name: "title",
            display_name: "Title",
            type: "text"
        }, 
        {
            "name": "datasource_name",
            "display_name": "Datasource",
            "type": "urlOptionCalculated",

        // }, 
        // {
        //     name: "value",
        //     display_name: "Value",
        //     type: "calculated"
        // },
        // {
        //     name: "animate",
        //     display_name: "Animate Value Changes",
        //     type: "boolean",
        //     default_value: !0
        // }, {
        //     name: "units",
        //     display_name: "Units",
        //     type: "text"
        },
        {
            name: "default_option",
            display_name: "Default Option",
            type: "integer",
            default_value: 1,
            description: "Order of option to be default when refresh. This will be overwritten by default option passing through url parameter."
        },
        {
            name: "font_size",
            display_name: "Font Size",
            type: "integer",
            default_value: 20,
        },
        {
            "name": "font_align",
            "display_name": "Font Align",
            "type": "option",
            default_value: "left",
            options: [
                {
                    "name": "Left",
                    "value": "left"
                },
                {
                    "name": "Center",
                    "value": "center"
                },
                {
                    "name": "Right",
                    "value": "right"
                }
            ],
        }, 
        {
            name: "font_color",
            display_name: "Text Color",
            type: "text",
            default_value: _default.font_color,
        }, 
        {
            name: "line_color",
            display_name: "Line Color",
            type: "text",
            default_value: _default.line_color,
        }, 
        {
            name: "line_thickness",
            display_name: "Line Thickness",
            type: "integer",
            default_value: _default.line_thickness,
            description: "Number of pixels for line thickness."
        },
        {
            name: "background_color",
            display_name: "background Color",
            type: "text",
            default_value: _default.widget_background_color,
        },
        {
            name: "left_margin",
            display_name: "Left Margin",
            type: "integer",
            default_value: _default.right_margin,
            description: "Number of pixels for left margin."
        },
        {
            name: "right_margin",
            display_name: "Right Margin",
            type: "integer",
            default_value: _default.right_margin,
            description: "Number of pixels for right margin."
        },
        // {
        //     name: "sparkline",
        //     display_name: "Include Sparkline",
        //     type: "boolean"
        // },
        // {
        //     "name": "timeframe",
        //     "display_name": "Timeframe (s)",
        //     "type": "number",
        //     "description": "Specify the last number of seconds you want to see.",
        //     "default_value": _default.timeframe,
        // },
        // {
        //     name: "mark_color",
        //     display_name: "Sparkline Color",
        //     type: "text",
        //     default_value: _default.mark_color,
        // },
        // {
        //     name: "maxmin_color",
        //     display_name: "Max-Min Color",
        //     type: "text",
        //     default_value: _default.maxmin_color,
        // },
        {
            name: "height_block",
            display_name: "Height Blocks",
            type: "integer",
            default_value: 1,
        }],
        newInstance: function(a, b) {
            b(new g(a))
        }
    });



 
}());
