(function(){
    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        var b = $('<div class="html-widget"></div>'),
            c = a;
        this.render = function(a) {
            $(a).append(b)
        }, this.onSettingsChanged = function(a) {
            c = a
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html",
        display_name: "HTML",
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })


    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        var b = $('<div class="html-widget"></div>'),
            c = a;
        this.render = function(a) {
            $(a).append(b)
        }, this.onSettingsChanged = function(a) {
            c = a
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html_d3",
        display_name: "HTML D3",
        "external_scripts": [
            "plugins/thirdparty/d3.v3.min.js"
        ],
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML with D3 V3 support."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })

    freeboard.addStyle(".html-widget", "white-space:normal;width:100%;height:100%");
    var o = function(a) {
        var b = $('<div class="html-widget"></div>'),
            c = a;
        this.render = function(a) {
            $(a).append(b)
        }, this.onSettingsChanged = function(a) {
            c = a
        }, this.onCalculatedValueChanged = function(a, c) {
            "html" == a && b.html(c)
        }, this.onDispose = function() {}, this.getHeight = function() {
            return parseInt(c.height)
        }, this.onSettingsChanged(a)
    };
    freeboard.loadWidgetPlugin({
        type_name: "html_highchart",
        display_name: "HTML Highchart",
        "external_scripts": [
            "https://code.highcharts.com/8.0.0/highcharts.js",
            "https://code.highcharts.com/8.0.0/modules/exporting.js"
        ],
        fill_size: !0,
        settings: [{
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description: "Can be literal HTML, or javascript that outputs HTML with highchart v.8 support."
        }, {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 40 pixels"
        }],
        newInstance: function(a, b) {
            b(new o(a))
        }
    })


}());
