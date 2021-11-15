(function(){

        //---------- Circular Progress---------------------------------------------------------------------------
        // freeboard.addStyle(".pie_progress", "text-align: center;position: relative;transform-style: preserve-3d;");
        
        var circularProgressPlugin = function(settings) {
            var container = $('<div class="pie_progress" style="width:100%; height:100%;margin: auto;" role="progressbar" size="40" data-goal="0" data-barcolor="#FF9900" data-barsize="5" aria-valuemin="0" aria-valuemax="100"></div>'),
                label_top = $('<div class="pie_progress__label" style="top:25%;"></div>'),
                label= $('<div class="pie_progress__label"></div>'),
                label_bottom = $('<div class="pie_progress__label" style="top:75%;"></div>'),
                _settings = settings,
                _self=this,
                _containerElement;

            this.render = function(containerElement) {
                _containerElement = containerElement
                $(_containerElement).append(container).append(label_top).append(label).append(label_bottom)

                // var size = Math.min(container.width(),container.height());
                // container.css({width:size+"px", height:size+"px"})
                // container.asPieProgress({namespace: 'FWTT', size: Math.min(container.width(),parseInt(_settings.height_block)*_w-_g)});

            }, this.onSettingsChanged = function(newSettings) {
                _settings = newSettings;
                setTimeout(()=>{
                var circle_size = Math.min($(_containerElement).width(),$(_containerElement).height());
                // container.css({width:circle_size+"px", height:circle_size+"px"})
                container.asPieProgress({namespace: 'FWTT', size: circle_size, trackcolor: '#f2f2f2'});                    
                },100)

                label_top.css({"font-size":_settings.font_size_sublabel, "color": _settings.color_sublabel})//.html(_settings.label_top)
                label.css({"font-size":_settings.font_size_label, "color": _settings.color_label})//.html(_settings.label)
                label_bottom.css({"font-size":_settings.font_size_sublabel, "color": _settings.color_sublabel})//.html(_settings.label_bottom)
                container.attr("data-barcolor", _settings.color_bar)
                container.attr("data-barsize", _settings.bar_size)
            }, this.onCalculatedValueChanged = function(settingName, newValue) {
                settingName=='value'&&(container.asPieProgress('go',newValue)),
                settingName=='value_max'&&(container.attr("aria-valuemax", newValue)),
                settingName=='value_min'&&(container.attr("aria-valuemin", newValue)),
                settingName=='label_top'&&(label_top.html(newValue)),
                settingName=='label'&&(label.html(newValue)),
                settingName=='label_bottom'&&(label_bottom.html(newValue))
            }, this.onDispose = function() {}, this.getHeight = function() {
                return (parseInt((_settings.height_block)?_settings.height_block:1))
            }, this.onSettingsChanged(settings)
        };
        freeboard.loadWidgetPlugin({
            type_name: "circular_progress",
            display_name: "Circular Progress",
            external_scripts: ["plugins/thirdparty/jquery-asPieProgress.js"],
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
            {
                name: "value_max",
                display_name: "Max Value",
                type: "calculated"
            }, 
            {
                name: "value_min",
                display_name: "Min Value",
                type: "calculated"
            }, 
            {
                name: "color_bar",
                display_name: "Bar Color",
                type: "text",
                default_value: _default.mark_color,
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
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
            }],
            newInstance : function(settings, newInstanceCallback) {
                newInstanceCallback(new circularProgressPlugin(settings));
            }
        });        


}());
