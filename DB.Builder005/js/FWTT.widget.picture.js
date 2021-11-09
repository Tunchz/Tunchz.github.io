(function(){
 
        var l = function(a) {

            var _settings = a,
                _element, _refresh, _imgurl;

            function onDispose() {
                _refresh && (clearInterval(_refresh), _refresh = null)
            }

            function refresh() {
                if (_element && _imgurl) {
                    var imgurl = _imgurl + (-1 == _imgurl.indexOf("?") ? "?" : "&") + Date.now();
                    // console.log("----------- imgurl ",_imgurl, imgurl)
                    $(_element).css({
                        "background-image": "url(" + imgurl + ")"
                    })
                }
            }
            this.render = function(element) {
                _element=element,
                $(_element).css({
                    width: "100%",
                    height: "100%",
                    "background-repeat": "no-repeat",
                    "background-size": "contain", //"cover",
                    "background-position": "center"
                })
            }, this.onSettingsChanged = function(a) {
                _settings = a,
                onDispose(), _settings.refresh && _settings.refresh > 0 && (_refresh = setInterval(refresh, 1e3 * Number(_settings.refresh)))
                // l(a)
            }, this.onCalculatedValueChanged = function(a, b) {
                "src" == a && (_imgurl = b), refresh()
            }, this.onDispose = function() {
                onDispose()
            }, this.getHeight = function() {
                return parseInt((_settings?.height_block)?_settings.height_block:2)
            }, this.onSettingsChanged(a)
        };
        freeboard.loadWidgetPlugin({
            type_name: "picture",
            display_name: "Picture",
            fill_size: !0,
            settings: [{
                name: "src",
                display_name: "Image URL",
                type: "calculated",
                default_value: "https://tunchz.github.io/Covid-19/img/icons/Mholan_Logo.png"
            }, {
                type: "number",
                display_name: "Refresh every",
                name: "refresh",
                suffix: "seconds",
                description: "Leave blank if the image doesn't need to be refreshed",
                default_value: 0
            },
            {
                name: "height_block",
                display_name: "Height Blocks",
                type: "integer",
                default_value: 2,
                required: !0
            }],
            newInstance: function(a, b) {
                b(new l(a))
            }
        });

}());
