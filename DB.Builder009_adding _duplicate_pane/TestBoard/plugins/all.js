(function() {
    var pluginSource = "/plugins/all";
    var instanceCallbacks = [];
    var typeLoaderTimer = null;

    function typeLoader(allowDelay) {
        if (allowDelay && typeLoaderTimer) return;
        var length = instanceCallbacks.length;
        for (var index = 0; index < length; index++) {
            var callbackInfo = instanceCallbacks.shift();
            if (window[callbackInfo.typeName]) {
                callbackInfo.newInstanceCallback(new window[callbackInfo.typeName](callbackInfo.settings, callbackInfo.updateCallback));
            } else if (callbackInfo.tries && callbackInfo.tries > 10) {
                console.log("Unable to load type " + callbackInfo.typeName);
            } else {
                callbackInfo.tries++;
                instanceCallbacks.push(callbackInfo);
            }
        }
        if (instanceCallbacks.length) {
            typeLoaderTimer = setTimeout(typeLoader, 100);
        } else {
            typeLoaderTimer = null;
        }
    }

    function processNewInstance(typeName, pluginID, settings, newInstanceCallback, updateCallback, tries) {
        if (window[typeName]) {
            newInstanceCallback(new window[typeName](settings, updateCallback));
        } else {
            head.js("/plugins/script/" + pluginID);
            instanceCallbacks.push({
                tries: tries,
                typeName: typeName,
                newInstanceCallback: newInstanceCallback,
                settings: settings,
                updateCallback: updateCallback
            });
            typeLoader(true);
        }
    };
    freeboard.loadDatasourcePlugin({
        "type_name": "plugin5319f8297df9e78c73000006",
        "display_name": "Clock",
        "description": "A datasource which refreshes at a specific interval and returns the current time in different formats. This datasource can be used to display a timer on the screen or to cause widgets to refresh at certain intervals.",
        "settings": [{
            "name": "refresh",
            "display_name": "Refresh Every",
            "type": "number",
            "suffix": "seconds",
            "default_value": 1
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin5319f8297df9e78c73000006", "5319f8297df9e78c73000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "required": true,
            "type": "text",
            "description": "MUST be a locked thing.  See <a href='https://dweet.io/locks'>https://dweet.io/locks</a> for more info",
            "display_name": "Thing Name",
            "name": "thing_id"
        }, {
            "required": true,
            "name": "key",
            "description": "Master or Read-only key for the locked thing ",
            "display_name": "Key",
            "type": "text"
        }, {
            "required": true,
            "description": "The calendar date (YYYY-MM-DD) from which you'd like to start your query. The response will be a maximum of one day.",
            "type": "text",
            "display_name": "Date",
            "name": "date"
        }, {
            "description": "(Optional) The hour of the day represented in the date parameter in 24-hour (00-23) format. If this parameter is included, a maximum of 1 hour will be returned starting at this hour.",
            "type": "text",
            "display_name": "Hour",
            "name": "hour"
        }],
        "type_name": "dweetStorageDatasource",
        "display_name": "Dweet Storage",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("dweetStorageDatasource", "56b8e56e8aa1c89c420011a9", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "display_name": "Dweet V2 Storage",
        "type_name": "plugin5823c8161f6d6a2948312f68",
        "settings": [{
            "name": "thing_name",
            "display_name": "Thing Name",
            "description": "MUST be a locked thing.  See <a href='https://dweet.io/locks'>https://dweet.io/locks</a> for more info",
            "type": "text",
            "required": "true"
        }, {
            "name": "start_date",
            "display_name": "Start Date",
            "type": "text",
            "description": "The calendar date (YYYY-MM-DD) from which you'd like to start your query."
        }, {
            "name": "end_date",
            "display_name": "End Date",
            "type": "text",
            "description": "The calendar date (YYYY-MM-DD) from which you'd like to end your query."
        }, {
            "name": "return_all",
            "display_name": "Return All Dweets?",
            "type": "boolean",
            "description": "Retrieves all dweets, or only dweets in range specified above."
        }, {
            "name": "return_object_type",
            "display_name": "Return Type",
            "description": "Select how the dweet data series is returned to subscribing widgets.  NOTE: Choose the default 'Array' for use with the DweetV2 Historical Chart Widget",
            "type": "option",
            "options": [{
                "name": "Array",
                "value": "array"
            }, {
                "name": "JSON Object",
                "value": "json"
            }]
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin5823c8161f6d6a2948312f68", "5823c8161f6d6a2948312f68", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "type_name": "dweet_io",
        "display_name": "Dweet.io",
        "description": "A datasource for connecting to things at <a target=\"_blank\" href=\"http://dweet.io\">dweet.io</a>.",
        "external_scripts": ["//dweet.io/client/dweet.io.min.js"],
        "settings": [{
            "name": "thing_id",
            "description": "Example: salty-dog-1",
            "display_name": "Thing Name",
            "type": "text"
        }, {
            "name": "key",
            "description": "If the thing is not locked, you can ignore this field",
            "display_name": "Key",
            "type": "text"
        }, {
            "default_value": false,
            "name": "show_full",
            "description": "If on, gives access to the full Dweet payload (used to obtain timestamp).  If not, only the Content object is captured",
            "display_name": "Show Full Payload",
            "type": "boolean"
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("dweet_io", "52d873931ef1b0ec09000005", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "external_scripts": ["https://rawgit.com/mpeddi/freeboard-plugins-widgets/master/dweet.io.js"],
        "settings": [{
            "type": "text",
            "display_name": "Thing Name",
            "name": "thing_name"
        }, {
            "type": "text",
            "display_name": "Read Key",
            "name": "read_key"
        }, {
            "type": "text",
            "display_name": "Account Token",
            "name": "account_token"
        }],
        "display_name": "Dweet V2",
        "type_name": "plugin581295cc535ce49631d8c42f",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin581295cc535ce49631d8c42f", "581295cc535ce49631d8c42f", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "settings": [{
            "default_value": "Line",
            "options": ["Line"],
            "type": "option",
            "display_name": "Chart Type",
            "name": "type"
        }, {
            "type": "calculated",
            "display_name": "JSON Data Array",
            "name": "data"
        }, {
            "type": "calculated",
            "display_name": "Target Data Field",
            "name": "target"
        }, {
            "default_value": "All",
            "options": ["All", "Hour", "Day", "Week", "Month"],
            "type": "option",
            "display_name": "Time Frame",
            "name": "timeframe"
        }, {
            "type": "text",
            "display_name": "Y-Min",
            "name": "ymin"
        }, {
            "type": "text",
            "display_name": "Y-Max",
            "name": "ymax"
        }, {
            "default_value": "Small",
            "options": ["Small", "Medium", "Large", "X-Wide"],
            "type": "option",
            "description": "Small: 300x180, Medium: 600x420, Large: 900x600.<br><strong>NOTE: You must also set the containing Pane's COLUMNS value to 1 (Small), 2 (Medium) or 3 (Large)</strong>",
            "display_name": "Size",
            "name": "size"
        }, {
            "default_value": false,
            "type": "boolean",
            "display_name": "Include Axis?",
            "name": "include_axis"
        }],
        "fill_size": false,
        "external_scripts": ["https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js", "https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.js", "https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.6/nv.d3.min.css"],
        "description": "Creates a multi-series line chart from DweetPro Datasource data.",
        "display_name": "DweetPro Historical Chart",
        "type_name": "plugin59efc1b05333e91109002309",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin59efc1b05333e91109002309", "59efc1b05333e91109002309", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "type": "text",
            "display_name": "Host:port",
            "name": "cbhost"
        }, {
            "default_value": true,
            "type": "boolean",
            "description": "A CORS Proxy (JSONP connection) will be used",
            "display_name": "Thingproxy",
            "name": "use_thingproxy"
        }, {
            "type": "text",
            "display_name": "Fiware-Service",
            "name": "service"
        }, {
            "type": "text",
            "display_name": "Fiware-ServicePath",
            "name": "servicepath"
        }, {
            "type": "text",
            "display_name": "X-Auth-Token",
            "name": "xauthtoken"
        }, {
            "type": "text",
            "display_name": "Type",
            "name": "type"
        }, {
            "type": "text",
            "display_name": "Id",
            "name": "id"
        }, {
            "type": "boolean",
            "description": "Advanced mode permits access to all JSON request",
            "display_name": "Advanced",
            "name": "advanced"
        }, {
            "default_value": 5,
            "suffix": "seconds",
            "type": "number",
            "display_name": "Refresh Every",
            "name": "refresh"
        }],
        "description": "Connects to an Orion Context Broker, an implementation of the NGSI9/10 REST API binding developed as a part of the FI-WARE platform.  See <a href=\"https://github.com/telefonicaid/fiware-orion\">https://github.com/telefonicaid/fiware-orion</a> for more details.",
        "type_name": "plugin54ef6ceb2fa817c07d000035",
        "display_name": "FIWARE Orion",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin54ef6ceb2fa817c07d000035", "54ef6ceb2fa817c07d000035", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "settings": [{
            "type": "calculated",
            "display_name": "Latitude",
            "name": "lat"
        }, {
            "type": "calculated",
            "display_name": "Longitude",
            "name": "lon"
        }, {
            "type": "boolean",
            "display_name": "Draw Path",
            "name": "drawPath"
        }, {
            "default_value": "Small",
            "options": ["Small", "Medium", "Large"],
            "type": "option",
            "description": "Small: 300x180 (1 column), Medium: 600x420 (2 columns), Large: 900x600 (3 columns).<br><strong>NOTE: You must also set the containing Pane's COLUMNS value to 1 (Small), 2 (Medium) or 3 (Large)</strong>",
            "display_name": "Size",
            "name": "size"
        }, {
            "type": "text",
            "description": "Paste your custom google map javascript style array here.  For examples and inspiration, check out <a href='https://snazzymaps.com' target='_blank'>https://snazzymaps.com</a>",
            "display_name": "Custom Gmap Style",
            "name": "customStyle"
        }],
        "fill_size": true,
        "display_name": "Google Map",
        "type_name": "plugin52d961293239abe64b000005",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin52d961293239abe64b000005", "52d961293239abe64b000005", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "settings": [{
            "description": "Can be literal HTML, or javascript that outputs HTML.",
            "type": "calculated",
            "display_name": "HTML",
            "name": "html"
        }, {
            "description": "A height block is around 60 pixels",
            "default_value": 4,
            "type": "text",
            "display_name": "Height Blocks",
            "name": "height"
        }],
        "fill_size": true,
        "display_name": "HTML",
        "type_name": "plugin531a3b2b7df9e78c7300000f",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin531a3b2b7df9e78c7300000f", "531a3b2b7df9e78c7300000f", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "name": "url",
            "display_name": "URL",
            "type": "text"
        }, {
            "name": "use_thingproxy",
            "display_name": "Try thingproxy",
            "description": "A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href=\"https: //github.com/Freeboard/thingproxy\" target=\"_blank\">More information</a>.",
            "type": "boolean",
            "default_value": true
        }, {
            "name": "refresh",
            "display_name": "Refresh Every",
            "type": "number",
            "suffix": "seconds",
            "default_value": 5
        }, {
            "name": "method",
            "display_name": "Method",
            "type": "option",
            "options": [{
                "name": "GET",
                "value": "GET"
            }, {
                "name": "POST",
                "value": "POST"
            }, {
                "name": "PUT",
                "value": "PUT"
            }, {
                "name": "DELETE",
                "value": "DELETE"
            }]
        }, {
            "name": "body",
            "display_name": "Body",
            "type": "text",
            "description": "The body of the request. Normally only used if method is POST"
        }, {
            "name": "headers",
            "display_name": "Headers",
            "type": "array",
            "settings": [{
                "name": "name",
                "display_name": "Name",
                "type": "text"
            }, {
                "name": "value",
                "display_name": "Value",
                "type": "text"
            }]
        }],
        "type_name": "plugin52b0be5c88ca16c9ae000005",
        "description": "A datasource to load JSON data from a url.",
        "display_name": "JSON",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin52b0be5c88ca16c9ae000005", "52b0be5c88ca16c9ae000005", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "default_value": "iot-2/type/+/id/DEVICEID/evt/+/fmt/json",
            "required": true,
            "description": "For IBM quickstart, replace only DEVICEID with the device id string found in the upper right corner. For Watson IoT platform, replace DEVICEID with your specific device mac address or with '+' to listen to all devices in your organization. For all other MQTT servers, enter your own topic search string.",
            "type": "text",
            "display_name": "Topic",
            "name": "topic"
        }, {
            "default_value": "quickstart.messaging.internetofthings.ibmcloud.com",
            "required": true,
            "description": "For IBM quickstart use 'quickstart.internetofthings.ibmcloud.com', or type '[OrganizationID].messaging.internetofthings.ibmcloud.com' for Watson IoT, or enter any other MQTT server available",
            "type": "text",
            "display_name": "Server",
            "name": "server"
        }, {
            "default_value": 8883,
            "required": true,
            "description": "Typically either 8883 or 443 for secure, or 1883 for insecure communication",
            "type": "number",
            "display_name": "Port",
            "name": "port"
        }, {
            "default_value": true,
            "description": "Use TLS encryption to connect to the MQTT Server securely (recommended)",
            "type": "boolean",
            "display_name": "Use Encryption",
            "name": "use_encryption"
        }, {
            "description": "For IBM quickstart, use default 'quickstart'. For Watson IoT, enter your Organization ID. For all other MQTT servers, set a clientID which will be passed as 'a:clientID:ApiKey:Timestamp'",
            "required": true,
            "default_value": "quickstart",
            "type": "text",
            "display_name": "Client Id",
            "name": "client_id"
        }, {
            "default_value": "",
            "required": false,
            "type": "text",
            "description": "Not required for IBM quickstart, required for Watson IoT Platform connections",
            "display_name": "API Key/Username",
            "name": "api_key"
        }, {
            "default_value": "",
            "required": false,
            "type": "text",
            "description": "Not required for IBM quickstart, required for Watson IoT Platform connections",
            "display_name": "API Auth Token/Password",
            "name": "api_auth_token"
        }, {
            "default_value": true,
            "description": "If the messages on your topic are in JSON format they will be parsed so the individual fields can be used in freeboard widgets",
            "type": "boolean",
            "display_name": "JSON messages?",
            "name": "json_data"
        }],
        "external_scripts": ["https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js"],
        "description": "MQTT 3.1.1 is an ISO standard publish-subscribe based message protocol for fast and secure IoT communication over TCP/IP.<br><br>For a quick demo, try the <a href='https://quickstart.internetofthings.ibmcloud.com/iotsensor/' target='_blank'>IBM Watson IoT Quickstart</a>. Enter any name for this plugin, substitute the DEVICEID shown in the upper right of the quickstart in the topic setting, save, and then add a pane and text widget in freeboard to show the data returned from your datasource.<br><br>This opensource plugin is community supported with help from <a href='https://www.clearobject.com' target='_blank'>ClearObject</a>, <a href='https://www.eclipse.org/paho/' target='_blank'>Eclipse Paho</a>, and <a href='https://internetofthings.ibmcloud.com' target='_blank'>IBM Watson IoT</a>. Contact <a href='mailto:benjamin.chodroff@clearobject.com'>Benjamin Chodroff</a> for IoT assistance.",
        "display_name": "MQTT",
        "type_name": "plugin59ea43265333e91109001e18",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin59ea43265333e91109001e18", "59ea43265333e91109001e18", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "type_name": "plugin52d968dc3239abe64b000006",
        "display_name": "Picture",
        "fill_size": true,
        "settings": [{
            "name": "src",
            "display_name": "Image URL",
            "type": "calculated"
        }, {
            "description": "Leave blank if the image doesn't need to be refreshed",
            "suffix": "seconds",
            "name": "refresh",
            "display_name": "Refresh every",
            "type": "number"
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin52d968dc3239abe64b000006", "52d968dc3239abe64b000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "description": "A link to a JSON array of data.",
            "type": "text",
            "display_name": "Data File URL",
            "name": "datafile"
        }, {
            "type": "boolean",
            "display_name": "Is JSONP",
            "name": "is_jsonp"
        }, {
            "description": "Rewind and loop when finished",
            "type": "boolean",
            "display_name": "Loop",
            "name": "loop"
        }, {
            "default_value": 5,
            "suffix": "seconds",
            "type": "number",
            "display_name": "Move next every",
            "name": "refresh"
        }],
        "display_name": "Playback",
        "description": "This datasource will playback a series of data at a given interval. It expects a valid JSON file containing an array of objects.",
        "type_name": "plugin5315029a87c8882c6500000a",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin5315029a87c8882c6500000a", "5315029a87c8882c6500000a", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "type": "text",
            "display_name": "Subscribe Key",
            "name": "subscribe_key"
        }, {
            "type": "text",
            "display_name": "Channel",
            "name": "channel"
        }],
        "external_scripts": ["https://cdn.pubnub.com/pubnub.min.js"],
        "description": "PubNub is a realtime messaging network. See <a href=\"http://www.pubnub.com\">http://www.pubnub.com</a> for more details.",
        "display_name": "PubNub",
        "type_name": "plugin5376758af1776c1c2e000326",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin5376758af1776c1c2e000326", "5376758af1776c1c2e000326", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "settings": [{
            "type": "text",
            "display_name": "Title",
            "name": "title"
        }, {
            "options": [{
                "value": "regular",
                "name": "Regular"
            }, {
                "value": "big",
                "name": "Big"
            }],
            "type": "option",
            "display_name": "Size",
            "name": "size"
        }, {
            "type": "calculated",
            "display_name": "Value",
            "name": "value"
        }, {
            "type": "boolean",
            "display_name": "Include Sparkline",
            "name": "sparkline"
        }, {
            "default_value": true,
            "type": "boolean",
            "display_name": "Animate Value Changes",
            "name": "animate"
        }, {
            "type": "text",
            "display_name": "Units",
            "name": "units"
        }],
        "external_scripts": ["/freeboard-ui/plugins/thirdparty/jquery.sparkline.min.js"],
        "display_name": "Text",
        "type_name": "text_widget",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("text_widget", "52b1454985fd386ebb000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "settings": [{
            "type": "text",
            "display_name": "Title",
            "name": "title"
        }, {
            "type": "calculated",
            "display_name": "Value",
            "name": "value"
        }, {
            "type": "text",
            "display_name": "Units",
            "name": "units"
        }, {
            "default_value": 0,
            "type": "text",
            "display_name": "Minimum",
            "name": "min_value"
        }, {
            "default_value": 100,
            "type": "text",
            "display_name": "Maximum",
            "name": "max_value"
        }],
        "external_scripts": ["/freeboard-ui/plugins/thirdparty/raphael.2.1.0.min.js", "/freeboard-ui/plugins/thirdparty/justgage.1.0.1.js"],
        "display_name": "Gauge",
        "type_name": "gauge_widget",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("gauge_widget", "52b1454985fd386ebb000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "type_name": "sparkline_widget",
        "display_name": "Sparkline",
        "external_scripts": ["/freeboard-ui/plugins/thirdparty/jquery.sparkline.min.js"],
        "settings": [{
            "name": "title",
            "display_name": "Title",
            "type": "text"
        }, {
            "multi_input": "true",
            "name": "value",
            "display_name": "Value",
            "type": "calculated"
        }, {
            "type": "boolean",
            "display_name": "Include Legend",
            "name": "include_legend"
        }, {
            "description": "Input comma-separated text to name each sparkline (e.g. sparkline 1, sparkline 2)",
            "type": "text",
            "display_name": "Sparkline Labels",
            "name": "legend"
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("sparkline_widget", "52b1454985fd386ebb000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "type_name": "pointer_widget",
        "display_name": "Pointer",
        "fill_size": true,
        "external_scripts": ["/freeboard-ui/plugins/thirdparty/raphael.2.1.0.min.js"],
        "settings": [{
            "name": "direction",
            "display_name": "Direction",
            "type": "calculated",
            "description": "In degrees"
        }, {
            "name": "value_text",
            "display_name": "Value Text",
            "type": "calculated"
        }, {
            "name": "units",
            "display_name": "Units",
            "type": "text"
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("pointer_widget", "52b1454985fd386ebb000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadWidgetPlugin({
        "type_name": "indicator_widget",
        "display_name": "Indicator Light",
        "settings": [{
            "name": "title",
            "display_name": "Title",
            "type": "text"
        }, {
            "name": "value",
            "display_name": "Value",
            "type": "calculated"
        }, {
            "name": "on_text",
            "display_name": "On Text",
            "type": "calculated"
        }, {
            "name": "off_text",
            "display_name": "Off Text",
            "type": "calculated"
        }],
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("indicator_widget", "52b1454985fd386ebb000006", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "description": "You can also try a city name.",
            "type": "text",
            "display_name": "Zip / Postal Code",
            "name": "location"
        }, {
            "options": [{
                "value": "imperial",
                "name": "Imperial"
            }, {
                "value": "metric",
                "name": "Metric"
            }],
            "default": "imperial",
            "type": "option",
            "display_name": "Units",
            "name": "units"
        }],
        "external_scripts": ["https://cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.1.0/jquery.simpleWeather.min.js"],
        "description": "Retrieve live weather data at a specific location, updated once per minute.<br>Built with the simpleWeather jQuery plugin: <a href='http://simpleweatherjs.com'>http://simpleweatherjs.com</a>",
        "display_name": "Weather",
        "type_name": "plugin52b0c2e89c8dea1faf000005",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin52b0c2e89c8dea1faf000005", "52b0c2e89c8dea1faf000005", settings, newInstanceCallback, updateCallback);
        }
    });
    freeboard.loadDatasourcePlugin({
        "settings": [{
            "name": "apiKey",
            "display_name": "API Key",
            "type": "text"
        }, {
            "name": "deviceKey",
            "display_name": "Feed Id",
            "type": "text"
        }, {
            "name": "use_thingproxy",
            "display_name": "Try thingproxy",
            "description": "A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href=\"https: //github.com/Freeboard/thingproxy\" target=\"_blank\">More information</a>.",
            "type": "boolean",
            "default_value": true
        }, {
            "name": "refresh",
            "display_name": "Refresh Every",
            "type": "number",
            "suffix": "seconds",
            "default_value": 3
        }],
        "type_name": "plugin560312ad53c310ce098b32ca",
        "description": "A datasource that pulls data streams from Xively's platform.",
        "display_name": "Xively Datasource",
        "source": pluginSource,
        "newInstance": function(settings, newInstanceCallback, updateCallback) {
            processNewInstance("plugin560312ad53c310ce098b32ca", "560312ad53c310ce098b32ca", settings, newInstanceCallback, updateCallback);
        }
    });
}());