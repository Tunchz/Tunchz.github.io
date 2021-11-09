(function(){
 
         freeboard.addStyle("div.pointer-value", "position:absolute;height:100%;margin: auto;top: 0px;bottom: 0px;width: 100%;text-align:center;");
        var k = function(a) {
            function b(a) {
                if (!a || a.length < 2)
                    return [];
                var b = [];
                b.push(["m", a[0], a[1]]);
                for (var c = 2; c < a.length; c += 2)
                    b.push(["l", a[c], a[c + 1]]);
                return b.push(["z"]), b
            }
            var self=this,
                _settings = a,
                _direction = 0,
                _element ,_svg, _svgContainer, _circle, _pointer,
                d, e, f, g = 3,
                h = 0,
                _svgContainer = $('<div class="svg-container" style="width:100%; height: 100%;padding:10px 0; overflow:hidden"></div>');
                _value = $('<div class="widget-big-text"></div>');
                _unit = $("<div></div>");
            this.render = function(element,callback) {
                _element= element;
                // console.log("-------------- rener width : ", $(_element).width())

                    // console.log("-------------- rener width in 2000: ", $(_element).width())
                    e = $(_element).width(), f = /*$(a).height();*/  self.getHeight()*_h-_r*3-20;  // fixing inproper render of widget pointer
                    var h = Math.min(e, f) / 2 - 2 * g;
                    $(_element).empty()
                    $(_element).append(_svgContainer);
                    // _svg = Raphael($(_element).get()[0], e, f);
                    _svg = Raphael($(_svgContainer).get()[0], e, f),
                    _circle = _svg.circle(e / 2, f / 2, h),
                    _circle.attr("stroke", _settings.mark_color?_settings.mark_color:_default.mark_color), 
                    _circle.attr("stroke-width", g), 
                    _pointer = _svg.path(b([e / 2, f / 2 - h + g, 0.15*h, 0.2*h, -0.3*h, 0])), 
                    _pointer.attr("stroke-width", 0), 
                    _pointer.attr("fill", _settings.pointer_color?_settings.pointer_color:_default.pointer_color), 
                    $(_element).append($('<div class="pointer-value"></div>').append(_value).append(_unit)),
                    _value.css({"color": _settings.font_color?_settings.font_color:_default.font_color}),
                    _unit.css({"color": _settings.font_color?_settings.font_color:_default.font_color, "opacity" : _default.font_opacity}),
                    callback&&(callback("direction",_direction))


            }, this.onSettingsChanged = function(a) {
                _settings = a;
                if (_element) {
                    // console.log("*********** width|height : ",$(_element).width(), self.getHeight()*_h-_r*3)
                    $(_element).css({"width":$(_element).width()+"px", "height": self.getHeight()*_h-_r*3-10 +"px"})
                    setTimeout(()=>{
                        self.render(_element, (a,b)=>(self.onCalculatedValueChanged(a,b)))
                    },1000)     
                                       
                }
                _unit.html(_settings.units);

            }, this.onCalculatedValueChanged = function(a, b) {
                if ("direction" == a) {
                    _direction = b;
                    if (!_.isUndefined(_pointer)) {
                        _pointer.animate({
                            transform: "r" + b + "," + e / 2 + "," + f / 2
                        }, 250, "bounce")
                    }
                    // h = b
                } else "value_text" == a && (_value.html(b),_value.css({"padding-top":(f/2-0.13*Math.min(e, f))+'px',"font-size": 0.25*Math.min(e, f)+'px'}))
            }, this.onDispose = function() {}, 
            this.getHeight = function() {
                return parseInt((_settings.height_block)?_settings.height_block:2)
            }, this.onSettingsChanged(a)
        };
        freeboard.loadWidgetPlugin({
            type_name: "pointer",
            display_name: "Pointer",
            external_scripts: ["plugins/thirdparty/raphael.2.1.4.min.js"],
            settings: [{
                name: "direction",
                display_name: "Direction",
                type: "calculated",
                description: "In degrees"
            }, {
                name: "value_text",
                display_name: "Value Text",
                type: "calculated"
            }, {
                name: "units",
                display_name: "Units",
                type: "text"
            },
            {
                name: "font_color",
                display_name: "Text Color",
                type: "text",
                default_value: _default.font_color,
                required: !0
            },
            {
                name: "mark_color",
                display_name: "Circle Color",
                type: "text",
                default_value: _default.mark_color,
                required: !0
            },
            {
                name: "pointer_color",
                display_name: "Pointer Color",
                type: "text",
                default_value: _default.pointer_color,
                required: !0
            },
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
                required: !0
            }],
            newInstance: function(a, b) {
                b(new k(a))
            }
        });


}());
