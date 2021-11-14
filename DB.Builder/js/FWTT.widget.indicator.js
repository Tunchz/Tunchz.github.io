(function(){
        //---------- single--------------------------------------------------------------------------- 
        freeboard.addStyle(".indicator-light", "border-radius:50%;width:15px;height:15px;border:2px solid #3d3d3d;float:left;background-color:#222;transform: translateY(-50%);"),        
        freeboard.addStyle(".indicator-light.on", "background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;"), 
        freeboard.addStyle(".indicator-text", "margin:0px; height: 100%;transform: translateY(-50%);");
        var m = function(a) {
            function update() {
                g.toggleClass("on", i), i ? f.html(_.isUndefined(c) ? _.isUndefined(h.on_text) ? "" : h.on_text : c) : f.html(_.isUndefined(d) ? _.isUndefined(h.off_text) ? "" : h.off_text : d)
                g.css({height: h.size, width: h.size})
                // g.css({height: h.size, width: h.size, "background-color": "#FF9900", "box-shadow": "0px 0px 15px "+"#FFFFFF"})
                f.css({"font-size": h.font_size+"px",height: h.font_size+"px"})
            }
            var c, d, 
                // e = $('<h2 class="section-title"></h2>'),
                container = $('<div class="indicator-light-container"></div>'),
                f = $('<span class="indicator-text"></span>'),
                g = $('<div class="indicator-light"></div>'),
                h = a,
                i = !1;

            container.css({"padding-top":(_h-_r*2)/2})

            this.render = function(a) {
                // $(a).append(e).append(g).append(f)
                $(a).append(container), container.append(g).append(f)
            }, this.onSettingsChanged = function(a) {
                h = a, 
                // e.html(_.isUndefined(a.title) ? "" : a.title), 
                update()
            }, this.onCalculatedValueChanged = function(a, e) {
                "value" == a && (i = Boolean(e)), "on_text" == a && (c = e), "off_text" == a && (d = e), update()
            }, this.onDispose = function() {}, this.getHeight = function() {
                return 1
            }, this.onSettingsChanged(a)
        };
        freeboard.loadWidgetPlugin({
            type_name: "indicator",
            display_name: "Indicator Light",
            settings: [{
            //     name: "title",
            //     display_name: "Title",
            //     type: "text"
            // }, {
                name: "value",
                display_name: "Value",
                type: "calculated"
            }, {
                name: "on_text",
                display_name: "On Text",
                type: "calculated"
            }, 
            {
                name: "off_text",
                display_name: "Off Text",
                type: "calculated"
            },
            {
                name: "size",
                display_name: "Indicator Size",
                type: "integer",
                default_value: 15,
                required: !0
            },
            {
                name: "font_size",
                display_name: "Font Size",
                type: "integer",
                default_value: 16,
                required: !0
            }],
            newInstance: function(a, b) {
                b(new m(a))
            }
        });

        //---------- 1x4---------------------------------------------------------------------------
        freeboard.addStyle(".i1x4", "margin:auto;border-radius:50%;width:12px;height:12px;border:2px solid #3d3d3d;float:left;background-color:#222;transform: translateY(-50%);"); 
        var indicator1x4Plugin = function(settings) {
            function update() {
                maxWidth = ($(_self).width()/4);
                (maxWidth)?maxWidth-=4:maxWidth = (_w-_g*2)/4-4;
                if (_settings.size<1) (_settings.size = 1);
                (_settings.size>maxWidth)?size = maxWidth:size=_settings.size;

                margin = (maxWidth-size)/2;
                var attr = {height:size, width: size, margin: "0 "+margin+"px"};
                g1.css(attr),
                g2.css(attr),
                g3.css(attr),
                g4.css(attr)
            }
            var _self, maxWidth, size = 1, margin,
                container = $('<div class="indicator-light-container" style="height:50%;"></div>'),
                g1 = $('<div class="i1x4"></div>'),
                g2 = $('<div class="i1x4"></div>'),
                g3 = $('<div class="i1x4"></div>'),
                g4 = $('<div class="i1x4"></div>'),
                isOn = [!1,!1,!1,!1],
                offAttr = {"background-color": "#222", "box-shadow": "none","border-color":"#3d3d3d"};
                container.append(g1).append(g2).append(g3).append(g4)
                _settings = settings;
            container.css({"padding-top":(_h-_r*2)/2})
            this.render = function(containerElement) {
                _self = containerElement
                $(_self).append(container)
            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings
                update()
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                var newAttr = {"background-color": newValue, "box-shadow": "0px 0px 15px " + newValue,"border-color":"#FDF1DF"};
                settingName=='color1'&&isOn[0] && (newValue?g1.css(newAttr):g1.css(offAttr)), 
                settingName=='color2'&&isOn[1] && (newValue?g2.css(newAttr):g2.css(offAttr)),
                settingName=='color3'&&isOn[2] && (newValue?g3.css(newAttr):g3.css(offAttr)), 
                settingName=='color4'&&isOn[3] && (newValue?g4.css(newAttr):g4.css(offAttr)),
                settingName=='value1'&&(Boolean(newValue)&&_settings.color1? isOn[0] = !0:(isOn[0] = !1,g1.css(offAttr))), 
                settingName=='value2'&&(Boolean(newValue)&&_settings.color2? isOn[1] = !0:(isOn[1] = !1,g2.css(offAttr))),
                settingName=='value3'&&(Boolean(newValue)&&_settings.color3? isOn[2] = !0:(isOn[2] = !1,g3.css(offAttr))), 
                settingName=='value4'&&(Boolean(newValue)&&_settings.color4? isOn[3] = !0:(isOn[3] = !1,g4.css(offAttr))),
                update()
            }, this.onDispose = function() {}, this.getHeight = function() {
                return 1
            }, this.onSettingsChanged(settings)
        };
        freeboard.loadWidgetPlugin({
            type_name: "indicator_1x4",
            display_name: "Indicator Light 1x4",
            settings: [{
            //     name: "title",
            //     display_name: "Title",
            //     type: "text"
            // }, {
                name: "value1",
                display_name: "Indicator #1 On",
                type: "calculated"
            }, 
            {
                name: "color1",
                display_name: "Indicator #1 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "value2",
                display_name: "Indicator #2 On",
                type: "calculated"
            }, 
            {
                name: "color2",
                display_name: "Indicator #2 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "value3",
                display_name: "Indicator #3 On",
                type: "calculated"
            }, 
            {
                name: "color3",
                display_name: "Indicator #3 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "value4",
                display_name: "Indicator #4 On",
                type: "calculated"
            }, 
            {
                name: "color4",
                display_name: "Indicator #4 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "size",
                display_name: "Indicator Size",
                type: "integer",
                default_value: 12,
            // },
            // {
            //     name: "font_size",
            //     display_name: "Font Size",
            //     type: "integer",
            //     default_value: 16,
            //     required: !0
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new indicator1x4Plugin(settings));
            }
        });        

        //---------- 2x1---------------------------------------------------------------------------
        freeboard.addStyle(".i2x1", "display:block;border-radius:3px;width:30%;height:60%;margin: auto 5px;border:2px solid #3d3d3d;float:left;background-color:#222;");
        freeboard.addStyle(".t2x1", "width:50%;text-align:left;position:relative;top:50%;transform:translateY(-50%);font-size:12px; height:12px;padding:0 5px");
        var indicator2x1Plugin = function(settings) {
            var container = $('<div class="indicator-2x1-container" style="width:100%;height:100%; margin:0;"></div>'),
                c1 = $('<div calss="center" style="display: flex; width:100%; height: 50%;"></div>'),
                c2 = $('<div calss="center" style="display: flex; width:100%; height: 50%;"></div>'),
                g1 = $('<div class="i2x1"></div>'),
                g2 = $('<div class="i2x1"></div>'),
                t1 = $('<div class="t2x1"></div>'),
                t2 = $('<div class="t2x1"></div>')
                isOn = [!1,!1]
                offAttr = {"background-color": "#222", "box-shadow": "none","border-color":"#3d3d3d"};

                container.append(c1.append(g1).append(t1)).append(c2.append(g2).append(t2))
                _settings = settings;

            this.render = function(containerElement) {
                _self = containerElement
                $(_self).append(container)
            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings
                var attr = {'text-align':_settings.font_align,'font-size':_settings.font_size+'px', height:_settings.font_size+'px'}
                t1.html(_settings.label1).css(attr),
                t2.html(_settings.label2).css(attr),
                _settings.size=='large'?attr = {height:'60%'}:_settings.size=='small'?attr = {height:'30%'}:attr = {height:'45%'},
                g1.css(attr),g2.css(attr)
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                var newAttr = {"background-color": newValue, "box-shadow": "0px 0px 15px " + newValue,"border-color":"#FDF1DF"};
                settingName=='color1'&&isOn[0] && (newValue?g1.css(newAttr):g1.css(offAttr)), 
                settingName=='color2'&&isOn[1] && (newValue?g2.css(newAttr):g2.css(offAttr)),
                settingName=='value1'&&(Boolean(newValue)? isOn[0] = !0:(isOn[0] = !1,g1.css(offAttr))), 
                settingName=='value2'&&(Boolean(newValue)? isOn[1] = !0:(isOn[1] = !1,g2.css(offAttr)))
            }, this.onDispose = function() {}, this.getHeight = function() {
                return 1
            }, this.onSettingsChanged(settings)
        };
        freeboard.loadWidgetPlugin({
            type_name: "indicator_2x1",
            display_name: "Indicator Light 2x1",
            settings: [
            {
                name: "label1",
                display_name: "Label #1",
                type: "text"
            }, 
            {
                name: "value1",
                display_name: "Indicator #1 On",
                type: "calculated"
            }, 
            {
                name: "color1",
                display_name: "Indicator #1 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "label2",
                display_name: "Label #2",
                type: "text"
            }, 
            {
                name: "value2",
                display_name: "Indicator #2 On",
                type: "calculated"
            }, 
            {
                name: "color2",
                display_name: "Indicator #2 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "size",
                display_name: "Indicator Size",
                "type": "option",
                default_value: "medium",
                options: [
                    {
                        "name": "Small",
                        "value": "small"
                    },
                    {
                        "name": "Medium",
                        "value": "medium"
                    },
                    {
                        "name": "Large",
                        "value": "large"
                    }
                ],
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
                name: "font_size",
                display_name: "Font Size",
                type: "integer",
                default_value: 12,
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new indicator2x1Plugin(settings));
            }
        });        

        // //---------- 4x1---------------------------------------------------------------------------
        // // freeboard.addStyle(".i2x1", "display:block;border-radius:3px;width:30%;height:60%;margin: auto 5px;border:2px solid #3d3d3d;float:left;background-color:#222;");
        // // freeboard.addStyle(".t2x1", "width:50%;text-align:left;position:relative;top:50%;transform:translateY(-50%);font-size:12px; height:12px;padding:0 5px");
        // var indicator4x1Plugin = function(settings) {
        //     var container = $('<div class="indicator-2x1-container" style="width:100%;height:100%; margin:0;"></div>'),
        //         c1 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
        //         c2 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
        //         c3 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
        //         c4 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
        //         g1 = $('<div class="i2x1"></div>'),
        //         g2 = $('<div class="i2x1"></div>'),
        //         g3 = $('<div class="i2x1"></div>'),
        //         g4 = $('<div class="i2x1"></div>'),
        //         t1 = $('<div class="t2x1"></div>'),
        //         t2 = $('<div class="t2x1"></div>'),
        //         t3 = $('<div class="t2x1"></div>'),
        //         t4 = $('<div class="t2x1"></div>'),
        //         isOn = [!1,!1,!1,!1],
        //         offAttr = {"background-color": "#222", "box-shadow": "none","border-color":"#3d3d3d"};

        //         container.append(c1.append(g1).append(t1)).append(c2.append(g2).append(t2)).append(c3.append(g3).append(t3)).append(c4.append(g4).append(t4))
        //         _settings = settings;

        //     this.render = function(containerElement) {
        //         _self = containerElement
        //         $(_self).append(container)
        //     }, this.onSettingsChanged = function(newSettings) {
        //         _settings = newSettings
        //         var attr = {'text-align':_settings.font_align,'font-size':_settings.font_size+'px', height:_settings.font_size+'px'}
        //         t1.html(_settings.label1).css(attr),
        //         t2.html(_settings.label2).css(attr),
        //         t3.html(_settings.label3).css(attr),
        //         t4.html(_settings.label4).css(attr),
        //         _settings.size=='large'?attr = {height:'60%'}:_settings.size=='small'?attr = {height:'30%'}:attr = {height:'45%'},
        //         g1.css(attr),g2.css(attr),g3.css(attr),g4.css(attr)
        //     }, this.onCalculatedValueChanged = function(settingName, newValue) {
        //         var newAttr = {"background-color": newValue, "box-shadow": "0px 0px 15px " + newValue,"border-color":"#FDF1DF"};
        //         settingName=='color1'&&isOn[0] && (newValue?g1.css(newAttr):g1.css(offAttr)), 
        //         settingName=='color2'&&isOn[1] && (newValue?g2.css(newAttr):g2.css(offAttr)),
        //         settingName=='color3'&&isOn[2] && (newValue?g3.css(newAttr):g3.css(offAttr)), 
        //         settingName=='color4'&&isOn[3] && (newValue?g4.css(newAttr):g4.css(offAttr)),
        //         settingName=='value1'&&(Boolean(newValue)&&_settings.color1? isOn[0] = !0:(isOn[0] = !1,g1.css(offAttr))), 
        //         settingName=='value2'&&(Boolean(newValue)&&_settings.color2? isOn[1] = !0:(isOn[1] = !1,g2.css(offAttr))),
        //         settingName=='value3'&&(Boolean(newValue)&&_settings.color3? isOn[2] = !0:(isOn[2] = !1,g3.css(offAttr))), 
        //         settingName=='value4'&&(Boolean(newValue)&&_settings.color4? isOn[3] = !0:(isOn[3] = !1,g4.css(offAttr)))
        //     }, this.onDispose = function() {}, this.getHeight = function() {
        //         return 2
        //     }, this.onSettingsChanged(settings)
        // };
        // freeboard.loadWidgetPlugin({
        //     type_name: "indicator_4x1",
        //     display_name: "Indicator Light 4x1",
        //     settings: [
        //     {
        //         name: "label1",
        //         display_name: "Label #1",
        //         type: "text"
        //     }, 
        //     {
        //         name: "value1",
        //         display_name: "Indicator #1 On",
        //         type: "calculated"
        //     }, 
        //     {
        //         name: "color1",
        //         display_name: "Indicator #1 Color",
        //         type: "calculated",
        //         default_value: _default.mark_color,
        //     }, 
        //     {
        //         name: "label2",
        //         display_name: "Label #2",
        //         type: "text"
        //     }, 
        //     {
        //         name: "value2",
        //         display_name: "Indicator #2 On",
        //         type: "calculated"
        //     }, 
        //     {
        //         name: "color2",
        //         display_name: "Indicator #2 Color",
        //         type: "calculated",
        //         default_value: _default.mark_color,
        //     }, 
        //     {
        //         name: "label3",
        //         display_name: "Label #2",
        //         type: "text"
        //     }, 
        //     {
        //         name: "value3",
        //         display_name: "Indicator #2 On",
        //         type: "calculated"
        //     }, 
        //     {
        //         name: "color3",
        //         display_name: "Indicator #2 Color",
        //         type: "calculated",
        //         default_value: _default.mark_color,
        //     }, 
        //     {
        //         name: "label4",
        //         display_name: "Label #2",
        //         type: "text"
        //     }, 
        //     {
        //         name: "value4",
        //         display_name: "Indicator #2 On",
        //         type: "calculated"
        //     }, 
        //     {
        //         name: "color4",
        //         display_name: "Indicator #2 Color",
        //         type: "calculated",
        //         default_value: _default.mark_color,
        //     }, 
        //     {
        //         name: "size",
        //         display_name: "Indicator Size",
        //         "type": "option",
        //         default_value: "medium",
        //         options: [
        //             {
        //                 "name": "Small",
        //                 "value": "small"
        //             },
        //             {
        //                 "name": "Medium",
        //                 "value": "medium"
        //             },
        //             {
        //                 "name": "Large",
        //                 "value": "large"
        //             }
        //         ],
        //     },
        //     {
        //         "name": "font_align",
        //         "display_name": "Font Align",
        //         "type": "option",
        //         default_value: "left",
        //         options: [
        //             {
        //                 "name": "Left",
        //                 "value": "left"
        //             },
        //             {
        //                 "name": "Center",
        //                 "value": "center"
        //             },
        //             {
        //                 "name": "Right",
        //                 "value": "right"
        //             }
        //         ],
        //     }, 
        //     {
        //         name: "font_size",
        //         display_name: "Font Size",
        //         type: "integer",
        //         default_value: 12,
        //     }],
        //     newInstance : function(settings, newInstanceCallback) {
        //         newInstanceCallback(new indicator4x1Plugin(settings));
        //     }
        // });        

        //---------- 4x1---------------------------------------------------------------------------
        // freeboard.addStyle(".i2x1", "display:block;border-radius:3px;width:30%;height:60%;margin: auto 5px;border:2px solid #3d3d3d;float:left;background-color:#222;");
        // freeboard.addStyle(".t2x1", "width:50%;text-align:left;position:relative;top:50%;transform:translateY(-50%);font-size:12px; height:12px;padding:0 5px");
        var indicator4x1APlugin = function(settings) {
            var container = $('<div class="indicator-2x1-container" style="width:100%;height:100%; margin:0;"></div>'),
                c1 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
                c2 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
                c3 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
                c4 = $('<div calss="center" style="display: flex; width:100%; height: 25%;"></div>'),
                g1 = $('<div class="i2x1"></div>'),
                g2 = $('<div class="i2x1"></div>'),
                g3 = $('<div class="i2x1"></div>'),
                g4 = $('<div class="i2x1"></div>'),
                t1 = $('<div class="t2x1"></div>'),
                t2 = $('<div class="t2x1"></div>'),
                t3 = $('<div class="t2x1"></div>'),
                t4 = $('<div class="t2x1"></div>'),
                isOn = [!1,!1,!1,!1],
                offAttr = {"background-color": "#222", "box-shadow": "none","border-color":"#3d3d3d"};

                container.append(c1.append(g1).append(t1)).append(c2.append(g2).append(t2)).append(c3.append(g3).append(t3)).append(c4.append(g4).append(t4))
                _settings = settings;

            this.render = function(containerElement) {
                _self = containerElement
                $(_self).append(container)
            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings
                var attr = {'text-align':_settings.font_align,'font-size':_settings.font_size+'px', height:_settings.font_size+'px'}
                t1.css(attr),
                t2.css(attr),
                t3.css(attr),
                t4.css(attr),
                _settings.size=='large'?attr = {height:'60%'}:_settings.size=='small'?attr = {height:'30%'}:attr = {height:'45%'},
                g1.css(attr),g2.css(attr),g3.css(attr),g4.css(attr)
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                var newAttr = {"background-color": newValue, "box-shadow": "0px 0px 15px " + newValue,"border-color":"#FDF1DF"};
                settingName=='color1'&&isOn[0] && (newValue?g1.css(newAttr):g1.css(offAttr)), 
                settingName=='color2'&&isOn[1] && (newValue?g2.css(newAttr):g2.css(offAttr)),
                settingName=='color3'&&isOn[2] && (newValue?g3.css(newAttr):g3.css(offAttr)), 
                settingName=='color4'&&isOn[3] && (newValue?g4.css(newAttr):g4.css(offAttr)),
                settingName=='value1'&&(Boolean(newValue)&&_settings.color1? isOn[0] = !0:(isOn[0] = !1,g1.css(offAttr))), 
                settingName=='value2'&&(Boolean(newValue)&&_settings.color2? isOn[1] = !0:(isOn[1] = !1,g2.css(offAttr))),
                settingName=='value3'&&(Boolean(newValue)&&_settings.color3? isOn[2] = !0:(isOn[2] = !1,g3.css(offAttr))), 
                settingName=='value4'&&(Boolean(newValue)&&_settings.color4? isOn[3] = !0:(isOn[3] = !1,g4.css(offAttr))),
                settingName=='label1'&&t1.html(newValue),
                settingName=='label2'&&t2.html(newValue),
                settingName=='label3'&&t3.html(newValue),
                settingName=='label4'&&t4.html(newValue)
            }, this.onDispose = function() {}, this.getHeight = function() {
                return 2
            }, this.onSettingsChanged(settings)
        };
        freeboard.loadWidgetPlugin({
            type_name: "indicator_4x1",
            display_name: "Indicator Light 4x1",
            settings: [
            {
                name: "label1",
                display_name: "Label #1",
                type: "calculated"
            }, 
            {
                name: "value1",
                display_name: "Indicator #1 On",
                type: "calculated"
            }, 
            {
                name: "color1",
                display_name: "Indicator #1 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "label2",
                display_name: "Label #2",
                type: "calculated"
            }, 
            {
                name: "value2",
                display_name: "Indicator #2 On",
                type: "calculated"
            }, 
            {
                name: "color2",
                display_name: "Indicator #2 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "label3",
                display_name: "Label #2",
                type: "calculated"
            }, 
            {
                name: "value3",
                display_name: "Indicator #2 On",
                type: "calculated"
            }, 
            {
                name: "color3",
                display_name: "Indicator #2 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "label4",
                display_name: "Label #2",
                type: "calculated"
            }, 
            {
                name: "value4",
                display_name: "Indicator #2 On",
                type: "calculated"
            }, 
            {
                name: "color4",
                display_name: "Indicator #2 Color",
                type: "calculated",
                default_value: _default.mark_color,
            }, 
            {
                name: "size",
                display_name: "Indicator Size",
                "type": "option",
                default_value: "medium",
                options: [
                    {
                        "name": "Small",
                        "value": "small"
                    },
                    {
                        "name": "Medium",
                        "value": "medium"
                    },
                    {
                        "name": "Large",
                        "value": "large"
                    }
                ],
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
                name: "font_size",
                display_name: "Font Size",
                type: "integer",
                default_value: 12,
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new indicator4x1APlugin(settings));
            }
        });        


}());
