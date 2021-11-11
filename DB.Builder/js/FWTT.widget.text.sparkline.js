(function(){
        function a(a, b, c) {
            var d = $(b).text();
            if (d != a)
                if ($.isNumeric(a) && $.isNumeric(d)) {
                    var e = a.toString().split("."),
                        f = 0;
                    e.length > 1 && (f = e[1].length), e = d.toString().split(".");
                    var g = 0;
                    e.length > 1 && (g = e[1].length), jQuery({
                        transitionValue: Number(d),
                        precisionValue: g
                    }).animate({
                        transitionValue: Number(a),
                        precisionValue: f
                    }, {
                        duration: c,
                        step: function() {
                            $(b).html(this.transitionValue.toFixed(this.precisionValue))
                        },
                        done: function() {
                            $(b).html(a)
                        }
                    })
                } else
                    $(b).html(a)
        }

        function b(_settings, a, b) {
            for (var c = $("<div class='sparkline-legend'></div>"), d = 0; d < b.length; d++) {
                // var f = e[d % e.length],
                var f = _settings._color[d],
                    g = b[d];
                c.append("<div class='sparkline-legend-value' style = 'width: "+(_settings.label_perrow?100/parseInt(_settings.label_perrow):100/3)+"%'><span style='color:" + f + "'>&#9679;</span>" + g + "</div>")
            }
            a.empty().append(c), freeboard.addStyle(".sparkline-legend", "margin:5px;"), freeboard.addStyle(".sparkline-legend-value", "color:white; font:10px arial,san serif; float:left; overflow:hidden; width:50%;"), freeboard.addStyle(".sparkline-legend-value span", "font-weight:bold; padding-right:5px;")
        }

        function c(_settings, a, b, c) {
            var colors = _settings._color?_settings._color:_color;

            var f = $(a).data().values,
                g = $(a).data().valueMin,
                h = $(a).data().valueMax,
                d = parseInt(_settings.timeframe?_settings.timeframe:_default.timeframe);
            f || (f = [], g = void 0, h = void 0);
            var i = function(a, b) {
                f[b] || (f[b] = []), f[b].length >= d && f[b].shift(), f[b].push(Number(a)), (void 0 === g || g > a) && (g = a), (void 0 === h || a > h) && (h = a)
            };
            _.isArray(b) ? _.each(b, i) : i(b, 0), $(a).data().values = f, $(a).data().valueMin = g, $(a).data().valueMax = h;
            var j = '<span style="color: {{color}}">&#9679;</span> {{y}}',
                k = !1;
            _.each(f, function(b, d) {
                $(a).sparkline(b, {
                    //There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
                    //'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
                    type: _settings.use_bar?"bar":"line",
                    composite: k,
                    height: "100%",
                    width: "96%",
                    fillColor: !1,
                    barColor: colors[d],
                    lineColor: colors[d],
                    lineWidth: 2,
                    spotRadius: 3,
                    spotColor: !1,
                    minSpotColor: _settings.maxmin_color?_settings.maxmin_color:_default.maxmin_color,  //"#78AB49",
                    maxSpotColor: _settings.maxmin_color?_settings.maxmin_color:_default.maxmin_color,  //"#78AB49",
                    highlightSpotColor: colors[d],  //_settings.mark_color?_settings.mark_color:_default.mark_color,  //"#9D3926",
                    highlightLineColor: colors[d],  //_settings.mark_color?_settings.mark_color:_default.mark_color,  //"#9D3926",
                    chartRangeMin: g,
                    chartRangeMax: h,
                    tooltipFormat: _settings.units ? j + " " + _settings.units : j
                }), k = !0
            })
        }
        var d = 100,
            _color = ["#FF9900", "#FFFFFF", "#B3B4B4", "#6B6B6B", "#28DE28", "#13F7F9", "#E6EE18", "#C41204", "#CA3CB8", "#0B1CFB"],
            f = freeboard.getStyleString("values");
        freeboard.addStyle(".widget-big-text", f + "font-size:25px;")/*"font-size:75px;")*/, freeboard.addStyle(".tw-display", "width: 100%; height:100%; display:table; table-layout:fixed;"), freeboard.addStyle(".tw-tr", "display:table-row;"), freeboard.addStyle(".tw-tg", "display:table-row-group;"), freeboard.addStyle(".tw-tc", "display:table-caption;"), freeboard.addStyle(".tw-td", "display:table-cell;"), freeboard.addStyle(".tw-value", f + "overflow: hidden;display: inline-block;text-overflow: ellipsis;"), freeboard.addStyle(".tw-unit", "display: inline-block;padding-left: 10px;padding-bottom: 1.1em;vertical-align: bottom;"), freeboard.addStyle(".tw-value-wrapper", "position: relative;vertical-align: middle;height:100%;"), freeboard.addStyle(".tw-sparkline", "height:20px;");
        var g = function(b) {
            function d() {
                _.isUndefined(_settings.units) || "" == _settings.units ? h.css("max-width", "100%") : h.css("max-width", f.innerWidth() - i.outerWidth(!0) + "px")
            }
            var _settings = b,
                _data,
                dom = document.createElement('div'),
                f = $('<div class="tw-display"></div>'),
                g = $('<h2 class="section-title tw-title tw-td"></h2>'),
                h_p = $('<div class="tw-value-subwrapper"></div>'),
                h = $('<div class="tw-value"></div>'),
                i = $('<div class="tw-unit"></div>'),
                j = $('<div class="tw-sparkline tw-td"></div>');
            this.render = function(a) {
                // setTimeout(function() {
                    $(a).parent().css({"margin-bottom": _r*2+"px"})
                    $(a).empty(), $(h_p).append($(h)).append($(i)), $(f).append($('<div class="tw-tr"></div>').append(g)).append($('<div class="tw-tr"></div>').append($('<div class="tw-value-wrapper tw-td"></div>').append(h_p)/*.append(h).append(i)*/)).append($('<div class="tw-tr"></div>').append(j)), $(a).append(f), d()
                // },0);
                
            }, 
            this.onSettingsChanged = function(a) {
                _settings = a;
                if (!_.isUndefined(_settings?.mark_color) && _settings?.mark_color !== "") {_settings._color=[_settings.mark_color];} else {_settings._color=[_default.mark_color];}
                var b = !_.isUndefined(a.title) && "" != a.title,
                    cc = !_.isUndefined(a.units) && "" != a.units;
                a.sparkline ? j.attr("style", null) : (delete j.data().values, j.empty(), j.hide()), b ? (g.html(_.isUndefined(a.title) ? "" : a.title), g.attr("style", null)) : (g.empty(), g.hide()), cc ? (i.html(_.isUndefined(a.units) ? "" : a.units), i.attr("style", null)) : (i.empty(), i.hide());
                // var f = 15;//30;
                // "big" == a.size && (f = 25/*75*/, a.sparkline && (f = 20/*60*/)), 
                // h.css({
                //     "font-size": f + "px"
                // }), 
                h_p.css({"text-align": (_settings.font_align)?_settings.font_align:"left"}), 
                h.css({"font-size": a.font_size + "px", "color": _settings.font_color?_settings.font_color:_default.font_color}), 
                i.css({"color": _settings.font_color?_settings.font_color:_default.font_color, "opacity":_default.font_opacity}),
                d()
                // _settings.sparkline && c(_settings, j, _data)
            }, this.onSizeChanged = function() {
                d()
            }, this.onCalculatedValueChanged = function(b, d) {
                _data = d;
                console.log("--------> ",d)
                "value" == b && (_settings.animate ? a(d, h, 500) : h.html(d), _settings.sparkline && c(_settings, j, d))
            }, this.onDispose = function() {}, 
            this.getHeight = function() {
                // return "big" == _settings.size || _settings.sparkline ? 2 : 1  //2 : 1
                return (parseInt((_settings.height_block)?_settings.height_block:1) + ((_settings.sparkline)?1:0))
            }, this.onSettingsChanged(b)
        };
        freeboard.loadWidgetPlugin({
            type_name: "text_widget",
            display_name: "Text",
            external_scripts: ["plugins/thirdparty/jquery.sparkline.min.js"],
            // external_scripts: ["plugins/thirdparty/jquery.sparkline.js"],
            settings: [{
                name: "title",
                display_name: "Title",
                type: "text"
            }, {
            //     name: "size",
            //     display_name: "Size",
            //     type: "option",
            //     options: [{
            //         name: "Regular",
            //         value: "regular"
            //     }, {
            //         name: "Big",
            //         value: "big"
            //     }]
            // }, {
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "animate",
                display_name: "Animate Value Changes",
                type: "boolean",
                default_value: !0,
            }, {
                name: "units",
                display_name: "Units",
                type: "text"
            },
            {
                name: "font_size",
                display_name: "Font Size",
                type: "integer",
                default_value: 20,
                required: !0
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
                name: "sparkline",
                display_name: "Include Sparkline",
                type: "boolean"
            },
            // {
            //     name: "use_bar",
            //     display_name: "Use Bar",
            //     "description": "Use bar graph instead of line for sparkline.",
            //     type: "boolean",
            //     default: 0,
            // },
            {
                "name": "timeframe",
                "display_name": "Timeframe (s)",
                "type": "number",
                "description": "Specify the last number of seconds you want to see.",
                "default_value": _default.timeframe,
            },
            {
                name: "mark_color",
                display_name: "Sparkline Color",
                type: "text",
                default_value: _default.mark_color,
            },
            {
                name: "maxmin_color",
                display_name: "Max-Min Color",
                type: "text",
                default_value: _default.maxmin_color,
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
        // var h = 0;
        // freeboard.addStyle(".gauge-widget-wrapper", "width: 100%;text-align: center;"), freeboard.addStyle(".gauge-widget", "width:200px;height:160px;display:inline-block;");
        // var i = function(a) {
        //     function b() {
        //         g && (f.empty(), c = new JustGage({
        //             id: d,
        //             value: _.isUndefined(i.min_value) ? 0 : i.min_value,
        //             min: _.isUndefined(i.min_value) ? 0 : i.min_value,
        //             max: _.isUndefined(i.max_value) ? 0 : i.max_value,
        //             label: i.units,
        //             showInnerShadow: !1,
        //             valueFontColor: "#fff"
        //         }))
        //     }
        //     var c, d = "gauge-" + h++,
        //         e = $('<h2 class="section-title"></h2>'),
        //         f = $('<div class="gauge-widget" id="' + d + '"></div>'),
        //         g = !1,
        //         i = a;
        //     this.render = function(a) {
        //         g = !0, $(a).append(e).append($('<div class="gauge-widget-wrapper"></div>').append(f)), b()
        //     }, this.onSettingsChanged = function(a) {
        //         a.min_value != i.min_value || a.max_value != i.max_value || a.units != i.units ? (i = a, b()) : i = a, e.html(a.title)
        //     }, this.onCalculatedValueChanged = function(a, b) {
        //         _.isUndefined(c) || c.refresh(Number(b))
        //     }, this.onDispose = function() {}, this.getHeight = function() {
        //         return 3
        //     }, this.onSettingsChanged(a)
        // };
        // freeboard.loadWidgetPlugin({
        //     type_name: "gauge",
        //     display_name: "Gauge",
        //     external_scripts: ["plugins/thirdparty/raphael.2.1.4.min.js", "plugins/thirdparty/justgage.1.0.1.js"],
        //     // external_scripts: ["plugins/thirdparty/raphael.2.1.4.min.js", "plugins/thirdparty/justgage.1.2.2.js"],
        //     settings: [{
        //         name: "title",
        //         display_name: "Title",
        //         type: "text"
        //     }, {
        //         name: "value",
        //         display_name: "Value",
        //         type: "calculated"
        //     }, {
        //         name: "units",
        //         display_name: "Units",
        //         type: "text"
        //     }, {
        //         name: "min_value",
        //         display_name: "Minimum",
        //         type: "text",
        //         default_value: 0
        //     }, {
        //         name: "max_value",
        //         display_name: "Maximum",
        //         type: "text",
        //         default_value: 100
        //     }],
        //     newInstance: function(a, b) {
        //         b(new i(a))
        //     }
        // }), 
        freeboard.addStyle(".sparkline", "width:100%;height: 75px;");
        var j = function(a) {
            var d = $('<h2 class="section-title"></h2>'),
                e = $('<div class="sparkline"></div>'),
                f = $("<div></div>"),
                _settings = a;
            this.render = function(a) {
                $(a).append(d).append(e).append(f)
            }, this.onSettingsChanged = function(a) {
                _settings = a;
                if (!_.isUndefined(_settings?.mark_color) && _settings?.mark_color !== "") {var cl = _settings.mark_color.split(','); cl.concat(_color); _settings._color=cl;}
                d.html(_.isUndefined(a.title) ? "" : a.title), a.include_legend && b(_settings, f, a.legend?a.legend.split(","):[])
                e.css({height: (_settings.include_legend?this.getHeight()-1:this.getHeight())*_h-_r*3-12-15})
            }, this.onCalculatedValueChanged = function(a, b) {
                _settings.include_legend ? c(_settings, e, b, _settings.legend.split(",")) : c(_settings, e, b )
            }, this.onDispose = function() {}, 
            this.getHeight = function() {
                // var a = 0;
                // if (_settings.include_legend && _settings.legend) {
                //     var b = _settings.legend.split(",").length;
                //     b > 4 ? a = .5 * Math.floor((b - 1) / 4) : b && (a = .5)
                // }
                // return 2 + a
                return (parseInt((_settings.height_block)?_settings.height_block:2) + ((_settings.include_legend)?1:0))
            }, this.onSettingsChanged(a)
        };
        freeboard.loadWidgetPlugin({
            type_name: "sparkline",
            display_name: "Sparkline",
            external_scripts: ["plugins/thirdparty/jquery.sparkline.min.js"],
            settings: [{
                name: "title",
                display_name: "Title",
                type: "text"
            }, {
                name: "value",
                display_name: "Value",
                type: "calculated",
                multi_input: "true"
            },{
                "name": "timeframe",
                "display_name": "Timeframe (s)",
                "type": "number",
                "description": "Specify the last number of seconds you want to see.",
                "default_value": _default.timeframe,
            // },
            // {
            //     name: "use_bar",
            //     display_name: "Use Bar",
            //     "description": "Use bar graph instead of line for sparkline.",
            //     type: "boolean",
            //     default: 0,
            }, {
                name: "include_legend",
                display_name: "Include Legend",
                type: "boolean",
                default_value: 1,
            }, {
                name: "legend",
                display_name: "Legend",
                type: "text",
                description: "Comma-separated for multiple sparklines"
            }, 
            {
                name: "label_perrow",
                display_name: "#Item Per Row",
                type: "integer",
                default_value: 3,
                description: "number of legend items to display in each row.",
            },
            // {
            //     name: "font_color",
            //     display_name: "Text Color",
            //     type: "text",
            //     default_value: _default.font_color,
            //     required: !0
            // },
            // {
            //     name: "sparkline",
            //     display_name: "Include Sparkline",
            //     type: "boolean"
            // },
            {
                name: "mark_color",
                display_name: "Sparkline Colors",
                type: "text",
                description: "Comma-separated for multiple sparklines, Leave blank for default colors",
            },
            {
                name: "maxmin_color",
                display_name: "Max-Min Color",
                type: "text",
                default_value: _default.maxmin_color,
            },
            // {
            //     name: "maxmin_color",
            //     display_name: "Max-Min Color",
            //     type: "text",
            //     default_value: _default.maxmin_color,
            //     required: !0
            // },
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
            }],
            newInstance: function(a, b) {
                b(new j(a))
            }
        })

}());
