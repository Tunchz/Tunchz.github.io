

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
        c(1e3 * g.refresh), this.updateNow = function() {


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

                    // console.log(response)

                    var c = {
                        field1: "value1",
                        field2: "value2",
                        field3: "value3",
                        };
                    b(c)

            });

            console.log(">>>>>>> : ", g.script_text)

        }, this.onDispose = function() {
            clearInterval(f), f = null
        }, this.onSettingsChanged = function(a) {
            g = a, e.updateNow(), c(1e3 * g.refresh)
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
            default_value: 5
        }],
        newInstance: function(a, c, d) {
            c(new z(a, d))
        }
    });




 
}());
