

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

        function compileScriptText() {
                            // Convert script string to function(response) { ...js script string...}
            if (!_.isUndefined(g.script_text)) {
                _.isArray(g.script_text) && (g.script_text = "[" + g.script_text.join(",") + "]"), (g.script_text.match(/;/g) || []).length <= 1 && -1 == g.script_text.indexOf("return") && (g.script_text = "return " + g.script_text);
                
                try {
                    e.scriptText = new Function("response", g.script_text)
                } catch (g) {
                    var h = g.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                    e.scriptText = new Function("response", 'return "' + h + '";')
                }

                // console.log(">>>> return result : ", f(response));
            }
        }

        var e = this,
            f = null,
            g = a,
            scriptText;

        c(1e3 * g.refresh),
        (g.script_text)&&compileScriptText(),
        this.updateNow = function() {


            // $.ajax({
            //     url: g.url_string,
            //     dataType: "JSONP",
            //     success: function(response) {

            //         console.log(response)

            //         var c = {
            //             field1: "value1",
            //             field2: "value2",
            //             field3: "value3",
            //             };
            //         b(c)
            //     },
            //     error: function(a, b, c) {
            //       console.log("error on Custom Scrape API call : ",a,b,c);
            //     }
            // })

            $.get( g.url_string , ( response ) => {
                b(e.scriptText?e.scriptText(response):response);
            });



        }, this.onDispose = function() {
            clearInterval(f), f = null
        }, this.onSettingsChanged = function(a) {
            g = a,
            e.scriptText=null,
            (g.script_text)&&compileScriptText(),
            e.updateNow(), 
            c(1e3 * g.refresh)
        }
    };
    freeboard.loadDatasourcePlugin({
        type_name: "custom_scrape_api",
        display_name: "Custom Scrape API",
        settings: [{
            name: "url_string",
            display_name: "Connection API",
            type: "text",
            description: "web url or url string for api call to return string",
            multi_input: "true",
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




 
}());
