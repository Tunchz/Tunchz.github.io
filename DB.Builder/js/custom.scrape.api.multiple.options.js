

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

        datasourceOptions[g.name]={};
        datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
        datasourceOptions[g.name]["selectedOption"]=0,

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
                        f = new Function("response", g.script_text)
                    } catch (g) {
                        var h = g.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                        f = new Function("response", 'return "' + h + '";')
                    }

                    // console.log(">>>> return result : ", f(response));
                }
                b({
                    "option name":datasourceOptions[g.name]["optionNameArray"][datasourceOptions[g.name]["selectedOption"]],
                    result: f?f(response):response
                });
            });



        }, this.onDispose = function() {
            delete datasourceOptions[g.name],clearInterval(f), f = null
        }, this.onSettingsChanged = function(a) {
            g = a, 
            datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
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
            // f = $('<div class="tw-display"></div>'),
            g = $('<h2 class="section-title tw-title tw-td"></h2>').appendTo(container),
            // h_p = $('<div class="tw-value-subwrapper"></div>'),
            // h = $('<div class="tw-value"></div>'),
            // i = $('<div class="tw-unit"></div>'),
            // j = $('<div class="tw-sparkline tw-td"></div>');
            s = $("<select></select>").appendTo($('<div class="styled-select"></div>').appendTo(container)).change(function() {
                   console.log("selected option : ",$(this).val())
                   datasourceOptions[_settings.datasource_name].selectedOption = $(this).val()
                });


        this.render = function(a) {
            _self = a
                // $(a).parent().css({"margin-bottom": _r*2+"px"})
                // $(a).empty(), $(h_p).append($(h)).append($(i)), $(f).append($('<div class="tw-tr"></div>').append(g)).append($('<div class="tw-tr"></div>').append($('<div class="tw-value-wrapper tw-td"></div>').append(h_p)/*.append(h).append(i)*/)).append($('<div class="tw-tr"></div>').append(j)), $(a).append(f), d()
            $(a).append(container)
            s.empty()
            datasourceOptions[_settings.datasource_name].optionNameArray.map((item,i)=>{
               $("<option></option>").text(item).attr("value", i).appendTo(s) 
            })


            // var t = h[a.name],
            //     s = $("<select></select>").appendTo($('<div class="styled-select"></div>').appendTo(i)).change(function() {
            //         m.settings[a.name] = $(this).val()
            //     });
            // _.each(a.options, function(a) {
            //     var b, c;
            //     _.isObject(a) ? (b = a.name, c = a.value) : b = a, _.isUndefined(c) && (c = b), _.isUndefined(t) && (t = c), $("<option></option>").text(b).attr("value", c).appendTo(s)
            // }), m.settings[a.name] = t, a.name in h && s.val(h[a.name]);

        }, 
        this.onSettingsChanged = function(a) {

        console.log("////////////// ",a)
            _settings = a;
            this.render(_self)
            // if (!_.isUndefined(_settings?.mark_color) && _settings?.mark_color !== "") {_settings._color=[_settings.mark_color];} else {_settings._color=[_default.mark_color];}
            // var b = !_.isUndefined(a.title) && "" != a.title,
            //     cc = !_.isUndefined(a.units) && "" != a.units;
            // a.sparkline ? j.attr("style", null) : (delete j.data().values, j.empty(), j.hide()), b ? (g.html(_.isUndefined(a.title) ? "" : a.title), g.attr("style", null)) : (g.empty(), g.hide()), cc ? (i.html(_.isUndefined(a.units) ? "" : a.units), i.attr("style", null)) : (i.empty(), i.hide());
            // // var f = 15;//30;
            // // "big" == a.size && (f = 25/*75*/, a.sparkline && (f = 20/*60*/)), 
            // // h.css({
            // //     "font-size": f + "px"
            // // }), 
            // h_p.css({"text-align": (_settings.font_align)?_settings.font_align:"left"}), 
            // h.css({"font-size": a.font_size + "px", "color": _settings.font_color?_settings.font_color:_default.font_color}), 
            // i.css({"color": _settings.font_color?_settings.font_color:_default.font_color, "opacity":_default.font_opacity}),
            // d()
            // // _settings.sparkline && c(_settings, j, _data)
        // }, this.onSizeChanged = function() {
        //     d()
        }, this.onCalculatedValueChanged = function(b, d) {
            // _data = d;
            // "value" == b && (_settings.animate ? a(d, h, 500) : h.text(d), _settings.sparkline && c(_settings, j, d))
        }, this.onDispose = function() {}, 
        this.getHeight = function() {
            // return "big" == _settings.size || _settings.sparkline ? 2 : 1  //2 : 1
            return (parseInt((_settings.height_block)?_settings.height_block:1))
        }, this.onSettingsChanged(b)
    };
    freeboard.loadWidgetPlugin({
        type_name: "url_option_selector_widget",
        display_name: "URL Options Selector",
        external_scripts: ["plugins/thirdparty/jquery.sparkline.min.js"],
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
            // options: ()=>{return Object.keys(datasourceOptions).map((item)=>{return {name:item,value:item}})},
            // options: [
            //     {
            //         "name": "Left",
            //         "value": "left"
            //     },
            //     {
            //         "name": "Center",
            //         "value": "center"
            //     },
            //     {
            //         "name": "Right",
            //         "value": "right"
            //     }
            // ],
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
        // },
        // {
        //     name: "font_size",
        //     display_name: "Font Size",
        //     type: "integer",
        //     default_value: 20,
        //     required: !0
        // },
        // {
        //     "name": "font_align",
        //     "display_name": "Font Align",
        //     "type": "option",
        //     default_value: "left",
        //     options: [
        //         {
        //             "name": "Left",
        //             "value": "left"
        //         },
        //         {
        //             "name": "Center",
        //             "value": "center"
        //         },
        //         {
        //             "name": "Right",
        //             "value": "right"
        //         }
        //     ],
        // }, 
        // {
        //     name: "font_color",
        //     display_name: "Text Color",
        //     type: "text",
        //     default_value: _default.font_color,
        // },
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
        },
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
