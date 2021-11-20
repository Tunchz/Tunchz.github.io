(function(){

        //---------- Circular Progress---------------------------------------------------------------------------
        // freeboard.addStyle(".pie_progress", "text-align: center;position: relative;transform-style: preserve-3d;");
        // freeboard.addStyle(".pie_progress svg", "stroke-linecap: round;");
        // var circularProgressPlugin = function(settings) {
        //     var progressContainer = $('<div style="width:100%;height:100%;margin:0px auto;"></div>'),
        //         innerContainer = $('<div style="width:100%;height:100%;margin:0px;"></div>'),
        //         // container = $('<div class="pie_progress" style="width:100%; height:100%;" role="progressbar" size="40" data-goal="0" data-barcolor="#FF9900" data-barsize="5" aria-valuemin="0" aria-valuemax="100"></div>'),
        //         container = $('<div class="pie_progress" style="width:100%; height:100%;"></div>'),
        //         label_top = $('<div class="pie_progress__label" style="top:25%;"></div>'),
        //         label= $('<div class="pie_progress__label"></div>'),
        //         label_bottom = $('<div class="pie_progress__label" style="top:75%;"></div>'),
        //         _settings = settings,
        //         _self=this,
        //         _containerElement;


        //     this.render = function(containerElement) {
        //         _containerElement = containerElement

        //         $(_containerElement).append(innerContainer.append(progressContainer.append(container.append(label_top).append(label).append(label_bottom))))

        //     }, this.onSettingsChanged = function(newSettings) {
        //         _settings = newSettings;
        //         container.asPieProgress('destroy');
        //         setTimeout(()=>{
        //             // container.empty()
        //             // container.append(label_top).append(label).append(label_bottom)
        //         var circle_size = Math.min($(_containerElement).width(),$(_containerElement).height())-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
        //             margin = ($(_containerElement).height()-circle_size)/2;
        //         innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding: margin+"px 0px"})
        //         progressContainer.css({width:circle_size+"px", height:circle_size+"px"})
        //         container.asPieProgress({
        //             namespace: 'FWTT', 
        //             size: circle_size, 
        //             min: 0,
        //             max: 100,
        //             goal: parseInt(_settings.value),
        //             speed: 15, // speed of 1/100
        //             barcolor: _settings.color_bar,
        //             barsize: parseInt(_settings.bar_size),
        //             trackcolor: _settings.color_track
        //         });
        //         setTimeout(()=>{ container.asPieProgress('go',_settings.value*100)},500)
        //         },0)

        //         label_top.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel}).html(_settings.label_top)
        //         label.css({"font-size":_settings.font_size_label+'px', "color": _settings.color_label}).html(_settings.label)
        //         label_bottom.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel}).html(_settings.label_bottom)
        //         container.attr("data-barcolor", _settings.color_bar)
        //         container.attr("data-barsize", _settings.bar_size)
        //     }, this.onCalculatedValueChanged = function(settingName, newValue) {
        //         settingName=='value'&&(container.asPieProgress('go',newValue*100)),
        //         // settingName=='value_max'&&(container.attr("aria-valuemax", newValue)),
        //         // settingName=='value_min'&&(container.attr("aria-valuemin", newValue)),
        //         settingName=='label_top'&&(label_top.html(newValue)),
        //         settingName=='label'&&(label.html(newValue)),
        //         settingName=='label_bottom'&&(label_bottom.html(newValue))
        //     }, this.onDispose = function() {

        //     }, this.onSizeChanged = function() { 
        //         var circle_size = Math.min($(_containerElement).width(),$(_containerElement).height())-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
        //             margin = ($(_containerElement).height()-circle_size)/2;
        //         innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding: margin+"px 0px"})
        //         progressContainer.css({width:circle_size+"px", height:circle_size+"px"})
        //     }, this.getHeight = function() {
        //         return (parseInt((_settings.height_block)?_settings.height_block:2))
        //     }, this.onSettingsChanged(settings)
        // };

        var circularProgressPlugin = function(settings) {
            var progressContainer = $('<div style="width:100%;height:100%;margin:0px auto;"></div>'),
                innerContainer = $('<div style="width:100%;height:100%;margin:0px;"></div>'),
                // container = $('<div class="pie_progress" style="width:100%; height:100%;" role="progressbar" size="40" data-goal="0" data-barcolor="#FF9900" data-barsize="5" aria-valuemin="0" aria-valuemax="100"></div>'),
                container = $('<div class="pie_progress" style="width:100%; height:100%;"></div>'),
                label_top = $('<div class="pie_progress__label" style="top:30%;left:50%;transform:translateX(-50%) translateY(-50%);"></div>'),
                label= $('<div class="pie_progress__label" style="top:55%;left:50%;transform:translateX(-50%) translateY(-50%);"></div>'),
                label_bottom = $('<div class="pie_progress__label" style="top:70%;left:50%;transform:translateX(-50%) translateY(-50%);"></div>'),
                _settings = settings,
                _self=this,
                _containerElement,
                _bar,
                _id="cicleContainer"+Date.now();
                container.attr("id",_id)


            this.render = function(containerElement) {
                _containerElement = containerElement

                $(_containerElement).append(innerContainer.append(progressContainer.append(container).append(label_top).append(label).append(label_bottom)))

            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings;
                setTimeout(()=>{

                var circle_size = Math.min($(_containerElement).width(),$(_containerElement).height())-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
                    margin = ($(_containerElement).height()-circle_size)/2;
                innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding: margin+"px 0px"})
                progressContainer.css({width:circle_size+"px", height:circle_size+"px"})
                container.empty();


                _bar = new ProgressBar.Circle("#"+_id, {
                  strokeWidth: _settings.bar_size,
                  color: _settings.color_bar,
                  trailColor: _settings.color_track,
                  trailWidth: _settings.track_size,
                  easing: 'easeInOut',
                  duration: 1400,
                  svgStyle: null,
                  text: {
                    value: '',
                    alignToBottom: false
                  },

                  // Set default step function for all animate calls
                  step: (state, _bar) => {
                    _bar.path.setAttribute('stroke', _settings.color_bar);
                    var value = Math.round(_bar.value() * 100);
                    if (value === 0) {
                      _bar.setText('');
                    } else {
                      // put here database value eg. 8/10 
                      // bar.setText(value + "/" + stepsize);
                      // bar.setText(value+"%");
                    }

                    _bar.text.style.color = state.color;
                  }
                });
                // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                // bar.text.style.fontSize = '2rem';

                _bar.animate(_settings.value);

                },0)

                label_top.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel})//.html(_settings.label_top)
                label.css({"font-size":_settings.font_size_label+'px', "color": _settings.color_label})//.html(_settings.label)
                label_bottom.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel})//.html(_settings.label_bottom)
                container.attr("data-barcolor", _settings.color_bar)
                container.attr("data-barsize", _settings.bar_size)
                _settings.round_bar?freeboard.addStyle("#"+_id+" svg", "stroke-linecap: round;"):freeboard.addStyle("#"+_id+" svg", "stroke-linecap: square;");
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                settingName=='value'&&(_bar.animate(newValue)),
                // settingName=='value_max'&&(container.attr("aria-valuemax", newValue)),
                // settingName=='value_min'&&(container.attr("aria-valuemin", newValue)),
                settingName=='label_top'&&(label_top.html(newValue?newValue:"-")),
                settingName=='label'&&(label.html(newValue?newValue:"-"),!_settings.label_top&&_settings.label_bottom?label.css({top:"45%"}):!_settings.label_bottom&&_settings.label_top?label.css({top:"55%"}):label.css({top:"50%"})),
                settingName=='label_bottom'&&(label_bottom.html(newValue?newValue:"-"))
            }, this.onDispose = function() {

            }, this.onSizeChanged = function() { 
                var circle_size = Math.min($(_containerElement).width(),$(_containerElement).height())-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
                    margin = ($(_containerElement).height()-circle_size)/2;
                innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding: margin+"px 0px"})
                progressContainer.css({width:circle_size+"px", height:circle_size+"px"})
            }, this.getHeight = function() {
                return (parseInt((_settings.height_block)?_settings.height_block:2))
            }, this.onSettingsChanged(settings)
        };

        freeboard.loadWidgetPlugin({
            type_name: "circular_progress",
            display_name: "Circle Progress Bar",
            external_scripts:  ["plugins/thirdparty/progressbar.js"], //["plugins/thirdparty/jquery-asPieProgress.js"],
            settings: [
            {
                name: "label_top",
                display_name: "Top Sub Label",
                type: "calculated"
            }, 
            {
                name: "label",
                display_name: "Main Label",
                type: "calculated"
            }, 
            {
                name: "label_bottom",
                display_name: "Bottom Sub Label",
                type: "calculated"
            }, 
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            }, 
            // {
            //     name: "value_min",
            //     display_name: "Min Value",
            //     type: "calculated"
            // }, 
            // {
            //     name: "value_max",
            //     display_name: "Max Value",
            //     type: "calculated"
            // }, 
            {
                name: "color_bar",
                display_name: "Bar Color",
                type: "text",
                default_value: _default.mark_color,
            }, 
            {
                name: "color_track",
                display_name: "Track Color",
                type: "text",
                default_value: _default.track_color,
            }, 
            {
                name: "color_label",
                display_name: "Main Label Color",
                type: "text",
                default_value: _default.mark_color,
            }, 
            {
                name: "color_sublabel",
                display_name: "Sub Label Color",
                type: "text",
                default_value: _default.font_color,
            }, 
            {
                name: "bar_size",
                display_name: "Progress Bar Size",
                type: "integer",
                default_value: 5,
            }, 
            {
                name: "track_size",
                display_name: "Track Size",
                type: "integer",
                default_value: 5,
            }, 
            {
                name: "round_bar",
                display_name: "Round Bar",
                type: "boolean",
                default_value: !1,
            }, 
            {
                name: "font_size_label",
                display_name: "Main Label Font Size",
                type: "integer",
                default_value: 18,
            }, 
            {
                name: "font_size_sublabel",
                display_name: "Sub Label Font Size",
                type: "integer",
                default_value: 10,

            }, 
            {
                name: "progress_margin",
                display_name: "Margin",
                type: "integer",
                default_value: 2,

            }, 
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new circularProgressPlugin(settings));
            }
        });        


        //---------- Semi Circular Progress---------------------------------------------------------------------------
        // freeboard.addStyle(".semiCicleContainer svg", "stroke-linecap: round;overflow:visible;");

        
        var semiCircularProgressPlugin = function(settings) {

            var progressContainer = $('<div style="width:100%;height:100%;margin:auto;overflow:visible;"></div>'),
                innerContainer = $('<div style="width:100%;height:100%;margin:0px;overflow:visible;"></div>'),
                // container = $('<div class="pie_progress" style="width:100%; height:100%;" role="progressbar" size="40" data-goal="0" data-barcolor="#FF9900" data-barsize="5" aria-valuemin="0" aria-valuemax="100"></div>'),
                container = $('<div class="semiCicleContainer" class="semicicle_progress" style="overflow:visible;width:100%; height:100%;overflow:visible;text-align:center;"></div>'),
                label_top = $('<div class="semicicle_progress__label pie_progress__label" style="display:absolute;top:50%; left:50%;transform:translateY(-50%) translateX(-50%);"></div>'),
                label= $('<div class="semicicle_progress__label pie_progress__label" style="display:absolute;top:100%; left:50%;transform:translateY(-100%) translateX(-50%);"></div>'),
                label_bottom = $('<div class="semicicle_progress__label pie_progress__label" style="display:absolute;top:62%; left:50%;transform:translateY(-50%) translateX(-50%);"></div>'),
                _settings = settings,
                _self=this,
                _containerElement,
                _bar,
                _id = "semiCicleContainer_"+Date.now();
                container.attr("id",_id)


            this.render = function(containerElement) {
                _containerElement = containerElement

                $(_containerElement).append(innerContainer.append(progressContainer.append(container).append(label_top).append(label).append(label_bottom)))
                    var range = _settings.value_max - _settings.value_min

            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings;
                // container.asPieProgress('destroy');
                setTimeout(()=>{
                    // container.empty()
                    // container.append(label_top).append(label).append(label_bottom)
                var circle_size = Math.min($(_containerElement).width()/2,$(_containerElement).height()-15)-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
                    margin = ($(_containerElement).height()-circle_size)/2;
                // console.log("---> circle_size : ",circle_size);
                innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding:  margin+"px 0px"})
                progressContainer.css({width:2*circle_size+"px", height:(circle_size+15)+"px"})
                container.empty();

                _bar = new ProgressBar.SemiCircle("#"+_id/*container.attr('id')*/, {
                  strokeWidth: _settings.bar_size,
                  color: _settings.color_bar,
                  trailColor: _settings.color_track,
                  trailWidth: _settings.track_size,
                  easing: 'easeInOut',
                  duration: 1400,
                  svgStyle: null,
                  text: {
                    value: '',
                    alignToBottom: false
                  },

                  // Set default step function for all animate calls
                  step: (state, _bar) => {
                    _bar.path.setAttribute('stroke', _settings.color_bar);
                    var value = Math.round(_bar.value() * 100);
                    if (value === 0) {
                      _bar.setText('');
                    } else {
                      // put here database value eg. 8/10 
                      // bar.setText(value + "/" + stepsize);
                      // bar.setText(value+"%");
                    }

                    _bar.text.style.color = state.color;
                  }
                });
                // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
                // bar.text.style.fontSize = '2rem';

                _bar.animate(_settings.value);

                },100)

                label_top.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel})//.html(_settings.label_top)
                label_bottom.css({"font-size":(_settings.font_size_sublabel-2)+'px', "color": _settings.color_sublabel,/* opacity:0.7*/})//.html(_settings.label_bottom)
                label.css({"font-size":_settings.font_size_label+'px', "color": _settings.color_label})//.html(_settings.label)
                // label_bottom.css({"font-size":_settings.font_size_sublabel+'px', "color": _settings.color_sublabel}).html(_settings.label_bottom)
                // container.attr("data-barcolor", _settings.color_bar)
                // container.attr("data-barsize", _settings.bar_size)
                _settings.round_bar?freeboard.addStyle("#"+_id+" svg", "stroke-linecap: round;overflow:visible;"):freeboard.addStyle("#"+_id+" svg", "stroke-linecap: square;overflow:visible;");
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                settingName=='value'&&(_bar.animate(newValue)),
                // settingName=='value_max'&&(container.attr("aria-valuemax", newValue)),
                // settingName=='value_min'&&(container.attr("aria-valuemin", newValue)),
                settingName=='label_top'&&(label_top.html(newValue?newValue:"-")),
                settingName=='label'&&(label.html(newValue?newValue:"-"))
                settingName=='label_bottom'&&(label_bottom.html(newValue?newValue:"-"))
            }, this.onDispose = function() {
                
            }, this.onSizeChanged = function() { 
                var circle_size = Math.min($(_containerElement).width()/2,$(_containerElement).height()-15)-(2*parseInt(_settings.progress_margin?_settings.progress_margin:2)),
                    margin = ($(_containerElement).height()-circle_size)/2;
                innerContainer.css({height: "calc(100% - "+margin*2+"px)", padding:  margin+"px 0px"})
                progressContainer.css({width:2*circle_size+"px", height:(circle_size+15)+"px"})
            }, this.getHeight = function() {
                return (parseInt((_settings.height_block)?_settings.height_block:2))
            }, this.onSettingsChanged(settings)
        };
        freeboard.loadWidgetPlugin({
            type_name: "semi_circular_progress",
            display_name: "Semi Circle Progress Bar",
            external_scripts: ["plugins/thirdparty/progressbar.js"],
            settings: [
            {
                name: "label_top",
                display_name: "Top Sub Label",
                type: "calculated"
            }, 
            {
                name: "label_bottom",
                display_name: "Middle Sub Label",
                type: "calculated"
            }, 
            {
                name: "label",
                display_name: "Main Label",
                type: "calculated"
            }, 
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            }, 
            // {
            //     name: "value_min",
            //     display_name: "Min Value",
            //     type: "calculated"
            // }, 
            // {
            //     name: "value_max",
            //     display_name: "Max Value",
            //     type: "calculated"
            // }, 
            {
                name: "color_bar",
                display_name: "Bar Color",
                type: "text",
                default_value: _default.mark_color,
            }, 
            {
                name: "color_track",
                display_name: "Track Color",
                type: "text",
                default_value: _default.track_color,
            }, 
            {
                name: "color_label",
                display_name: "Main Label Color",
                type: "text",
                default_value: _default.mark_color,
            }, 
            {
                name: "color_sublabel",
                display_name: "Sub Label Color",
                type: "text",
                default_value: _default.font_color,
            }, 
            {
                name: "bar_size",
                display_name: "Progress Bar Size",
                type: "integer",
                default_value: 5,
            }, 
            {
                name: "track_size",
                display_name: "Track Size",
                type: "integer",
                default_value: 5,
            }, 
            {
                name: "round_bar",
                display_name: "Round Bar",
                type: "boolean",
                default_value: !1,
            }, 
            {
                name: "font_size_label",
                display_name: "Main Label Font Size",
                type: "integer",
                default_value: 18,
            }, 
            {
                name: "font_size_sublabel",
                display_name: "Sub Label Font Size",
                type: "integer",
                default_value: 10,

            }, 
            {
                name: "progress_margin",
                display_name: "Margin",
                type: "integer",
                default_value: 2,

            }, 
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new semiCircularProgressPlugin(settings));
            }
        });        


}());
