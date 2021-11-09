(function(){
 
        freeboard.addStyle(".indicator-light", "border-radius:50%;width:15px;height:15px;border:2px solid #3d3d3d;float:left;background-color:#222;"), 
        freeboard.addStyle(".indicator-light.on", "background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;"), 
        freeboard.addStyle(".indicator-text", "margin:0px; height: 100%");
        var m = function(a) {
            function b() {
                g.toggleClass("on", i), i ? f.text(_.isUndefined(c) ? _.isUndefined(h.on_text) ? "" : h.on_text : c) : f.text(_.isUndefined(d) ? _.isUndefined(h.off_text) ? "" : h.off_text : d)
                g.css({height: h.size, width: h.size})
                // g.css({height: h.size, width: h.size, "background-color": "#FF9900", "box-shadow": "0px 0px 15px "+"#FFFFFF"})
                f.css({"font-size": h.font_size+"px"})
            }
            var c, d, 
                // e = $('<h2 class="section-title"></h2>'),
                container = $('<div class="indicator-light-container"></div>'),
                f = $('<span class="indicator-text"></span>'),
                g = $('<div class="indicator-light"></div>'),
                h = a,
                i = !1;
            this.render = function(a) {
                // $(a).append(e).append(g).append(f)
                $(a).append(container), container.append(g).append(f)
            }, this.onSettingsChanged = function(a) {
                h = a, 
                // e.html(_.isUndefined(a.title) ? "" : a.title), 
                b()
            }, this.onCalculatedValueChanged = function(a, e) {
                "value" == a && (i = Boolean(e)), "on_text" == a && (c = e), "off_text" == a && (d = e), b()
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

}());
