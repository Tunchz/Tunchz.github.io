

(function()
{

//------------------- Custom Data source


    var a = function(a, b) {
        function c(a) {
            if (a && a > 0) {
                e && clearInterval(e), e = setInterval(function() {
                    d.updateNow()
                }, a)
            } else {
                e && clearInterval(e), e=null;
            }
        }

        // function d(a) {
        //     return a.replace(/\w\S*/g, function(a) {
        //         return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
        //     })
        // }

        function compileScriptText() {
            // Convert script string to function(response) { ...js script string...}
            if (!_.isUndefined(f.script_text)) {
                _.isArray(f.script_text) && (f.script_text = "[" + f.script_text.join(",") + "]"), (f.script_text.match(/;/g) || []).length <= 1 && -1 == f.script_text.indexOf("return") && (f.script_text = "return " + f.script_text);
                
                try {
                    d.scriptText = new Function("response", f.script_text)
                } catch (f) {
                    var h = f.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                    d.scriptText = new Function("response", 'return "' + h + '";')
                }

                // console.log(">>>> return result : ", f(response));
            }
        }

        var d = this,
            e = null,
            f = a,
            g = 0,
            h = !1;
        c(1e3 * f.refresh), 
        (f.script_text)&&compileScriptText(),
        this.updateNow = function() {
            if (!(g > 1 && !f.use_thingproxy || g > 2)) {
                var a = f.url;
                2 == g && f.use_thingproxy && (a = ("https:" == location.protocol ? "https:" : "http:") + "//thingproxy.freeboard.io/fetch/" + encodeURI(f.url));
                var c = f.body;
                if (c)
                    try {
                        c = JSON.parse(c)
                    } catch (e) {}
                $.ajax({
                    url: a,
                    dataType: 1 == g ? "JSONP" : "JSON",
                    type: f.method || "GET",
                    data: c,
                    beforeSend: function(a) {
                        try {
                            _.each(f.headers, function(b) {
                                var c = b.name,
                                    d = b.value;
                                _.isUndefined(c) || _.isUndefined(d) || a.setRequestHeader(c, d)
                            })
                        } catch (b) {}
                    },
                    success: function(response) {
                        h = !0, b(d.scriptText?d.scriptText(response):response)
                    },
                    error: function(a, b, c) {
                        h || (g++, d.updateNow())
                    }
                })
            }
        }, this.onDispose = function() {
            clearInterval(e), e = null
        }, this.onSettingsChanged = function(a) {
            h = !1, g = 0, f = a,
            d.scriptText=null,
            (f.script_text)&&compileScriptText(),
            c(1e3 * f.refresh), d.updateNow()
        }
    };
    freeboard.loadDatasourcePlugin({
        type_name: "Custom JSON",
        settings: [
        {
            name: "url",
            display_name: "URL",
            type: "text"
        }, 
        {
            name: "use_thingproxy",
            display_name: "Try thingproxy",
            description: 'A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href="https://github.com/Freeboard/thingproxy" target="_blank">More information</a>.',
            type: "boolean",
            default_value: !1
        }, 
        {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 5
        }, 
        {
            name: "method",
            display_name: "Method",
            type: "option",
            options: [{
                name: "GET",
                value: "GET"
            }, {
                name: "POST",
                value: "POST"
            }, {
                name: "PUT",
                value: "PUT"
            }, {
                name: "DELETE",
                value: "DELETE"
            }]
        }, 
        {
            name: "body",
            display_name: "Body",
            type: "text",
            description: "The body of the request. Normally only used if method is POST"
        }, 
        {
            name: "headers",
            display_name: "Headers",
            type: "array",
            settings: [{
                name: "name",
                display_name: "Name",
                type: "text"
            }, {
                name: "value",
                display_name: "Value",
                type: "text"
            }]
        },
        {
            name: "script_text",
            display_name: "Script Text",
            type: "jsscript",
            description: "script to extract the needed result."
        }],
        newInstance: function(b, c, d) {
            c(new a(b, d))
        }
    });













    // var z = function(a, b) {
    //     function c(a) {
    //         if (a && a > 0) {
    //             f && clearInterval(f), f = setInterval(function() {
    //                 e.updateNow()
    //             }, a)
    //         } else {
    //             f && clearInterval(f), f=null;
    //         }
    //     }

    //     function d(a) {
    //         return a.replace(/\w\S*/g, function(a) {
    //             return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
    //         })
    //     }

    //     function compileScriptText() {
    //                         // Convert script string to function(response) { ...js script string...}
    //         if (!_.isUndefined(g.script_text)) {
    //             _.isArray(g.script_text) && (g.script_text = "[" + g.script_text.join(",") + "]"), (g.script_text.match(/;/g) || []).length <= 1 && -1 == g.script_text.indexOf("return") && (g.script_text = "return " + g.script_text);
                
    //             try {
    //                 e.scriptText = new Function("response", g.script_text)
    //             } catch (g) {
    //                 var h = g.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
    //                 e.scriptText = new Function("response", 'return "' + h + '";')
    //             }

    //             // console.log(">>>> return result : ", f(response));
    //         }
    //     }

    //     var e = this,
    //         f = null,
    //         g = a,
    //         scriptText;

    //     c(1e3 * g.refresh),
    //     (g.script_text)&&compileScriptText(),
    //     this.updateNow = function() {


    //         // $.ajax({
    //         //     url: g.url_string,
    //         //     dataType: "JSONP",
    //         //     success: function(response) {

    //         //         console.log(response)

    //         //         var c = {
    //         //             field1: "value1",
    //         //             field2: "value2",
    //         //             field3: "value3",
    //         //             };
    //         //         b(c)
    //         //     },
    //         //     error: function(a, b, c) {
    //         //       console.log("error on Custom Scrape API call : ",a,b,c);
    //         //     }
    //         // })

    //         $.get( g.url_string , ( response ) => {
    //             b(e.scriptText?e.scriptText(response):response);
    //         });



    //     }, this.onDispose = function() {
    //         clearInterval(f), f = null
    //     }, this.onSettingsChanged = function(a) {
    //         g = a,
    //         e.scriptText=null,
    //         (g.script_text)&&compileScriptText(),
    //         e.updateNow(), 
    //         c(1e3 * g.refresh)
    //     }
    // };
    // freeboard.loadDatasourcePlugin({
    //     type_name: "custom_scrape_api",
    //     display_name: "Custom Scrape API",
    //     settings: [{
    //         name: "url_string",
    //         display_name: "Connection API",
    //         type: "text",
    //         description: "web url or url string for api call to return string",
    //         multi_input: "true",
    //     }, {
    //         name: "script_text",
    //         display_name: "Script Text",
    //         type: "jsscript",
    //         description: "script to extract the needed result."
    //     // }, {
    //     //     name: "units",
    //     //     display_name: "Units",
    //     //     type: "option",
    //     //     "default": "imperial",
    //     //     options: [{
    //     //         name: "Imperial",
    //     //         value: "imperial"
    //     //     }, {
    //     //         name: "Metric",
    //     //         value: "metric"
    //     //     }]
    //     }, {
    //         name: "refresh",
    //         display_name: "Refresh Every",
    //         type: "number",
    //         suffix: "seconds",
    //         default_value: 10,
    //         description: "put 0 for no refresh",
    //     }],
    //     newInstance: function(a, c, d) {
    //         c(new z(a, d))
    //     }
    // });




 
}());
