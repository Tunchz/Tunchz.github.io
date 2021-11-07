

(function()
{

//------------------- Custom Data source


    var z = function(a, b) {
        function c(a) {
            f && clearInterval(f), f = setInterval(function() {
                e.updateNow()
            }, a)
        }

        function d(a) {
            return a.replace(/\w\S*/g, function(a) {
                return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
            })
        }
        var e = this,
            f = null,
            g = a;

        datasourceOptions[g.name]={};
        datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
        datasourceOptions[g.name]["selectedOption"]=0,

        c(1e3 * g.refresh), this.updateNow = function() {

            // console.log("-------Name : ", g.name);
            // console.log("-------datasourceOptions : ", datasourceOptions);
            // console.log("-------selected url : ", g.url_array[datasourceOptions[g.name]["selectedOption"]]["Url"]);
            // console.log("-------Url Array : ", g.url_array);


            $.get( g.url_array[datasourceOptions[g.name]["selectedOption"]]["Url"] , ( response ) => {

                // Convert script string to function(response) { ...js script string...}
                if (!_.isUndefined(g.script_text)) {
                    _.isArray(g.script_text) && (g.script_text = "[" + g.script_text.join(",") + "]"), (g.script_text.match(/;/g) || []).length <= 1 && -1 == g.script_text.indexOf("return") && (g.script_text = "return " + g.script_text);
                    var f;
                    try {
                        f = new Function("response", g.script_text)
                    } catch (g) {
                        var h = g.script_text.replace(/"/g, '\\"').replace(/[\r\n]/g, " \\\n");
                        f = new Function("response", 'return "' + h + '";')
                    }

                    // console.log(">>>> return result : ", f(response));
                }
                b({
                    "option name":datasourceOptions[g.name]["optionNameArray"][datasourceOptions[g.name]["selectedOption"]],
                    result:f(response)
                });
            });



        }, this.onDispose = function() {
            clearInterval(f), f = null
        }, this.onSettingsChanged = function(a) {
            g = a, 
            datasourceOptions[g.name]["optionNameArray"]=g.url_array.map((item)=>item["Option Name"]),
            e.updateNow(), 
            c(1e3 * g.refresh)
        }
    };
    freeboard.loadDatasourcePlugin({
        type_name: "custom_scrape_api_multiple_options",
        display_name: "Custom Scrape API with Multiple Url Options",
        settings: [{        
            name: "url_array",
            display_name: "Connection Url Array",
            type: "array",
            description: "web url or url string for api call, separate each url by comma; ex. urlOption1,urlOption2,urlOption3",
            settings:[{
                name: "Option Name",
                type: "text",
            },{
                name: "Url",
                type: "text",
            }]
            // multi_input: "true",
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
            default_value: 10
        }],
        newInstance: function(a, c, d) {
            c(new z(a, d))
        }
    });




 
}());
