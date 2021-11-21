(function(){



    var charticulatorPlugin = function(settings) {
        var _container = $('<div class="charticulator" style="width:calc(100% - 1px); height:calc(100% - 1px);"></div>'),
            fscreen = $('<ul class="widget-fullscreen"><li><div class="icon-widget-fullscreen icon-white" ></div></li></ul>'),
            _settings = settings,
            _self=this,
            _containerElement,
            _id=Date.now(),
            _chartId="charticulator-"+_id;
            _container.attr("id",_chartId)

        function draw(dataset, template, containerName, fixAbnormalStart) {
            // console.log("---> chart update!!!")
            CharticulatorContainer.initialize().then(function() {
                const chartTemplate = new CharticulatorContainer.ChartTemplate(
                  template
                );
                // chartTemplate.reset();
                const defaultTable = dataset.tables[0];
                const columns = defaultTable.columns;
                chartTemplate.assignTable(defaultTable.name, defaultTable.name);
                for (const column of columns) {
                  chartTemplate.assignColumn(
                    defaultTable.name,
                    column.name,
                    column.name
                  );
                }
                // links table
                const linksTable = dataset.tables[1];
                const links = linksTable && (linksTable.columns);
                if (links) {
                  chartTemplate.assignTable(linksTable.name, linksTable.name);
                  for (const column of links) {
                    chartTemplate.assignColumn(
                      linksTable.name,
                      column.name,
                      column.name
                    );
                  }
                }
                const instance = chartTemplate.instantiate(dataset);

                const { chart } = instance;
                // for (const property of template.properties) {
                //   if (property.target.attribute) {
                //     CharticulatorContainer.ChartTemplate.SetChartAttributeMapping(
                //       chart,
                //       property.objectID,
                //       property.target.attribute,
                //       {
                //         type: "value",
                //         value: property.default,
                //       }
                //     );
                //   }
                // }


                if (fixAbnormalStart) {
                    const chartContainer = new CharticulatorContainer.ChartContainer({ chart: chart }, dataset);
                    const width = document.getElementById(containerName).getBoundingClientRect().width;
                    const height = document.getElementById(containerName).getBoundingClientRect().height;

                    // console.log(">>> width : "+width+" | height : "+height)
                    document.getElementById(containerName).style.visibility = "hidden";
                    $("#"+containerName).empty();
                    chartContainer.mount(containerName, width-1, height);
                    window.addEventListener("resize", function() {
                      chartContainer.resize(
                        document.getElementById(containerName).getBoundingClientRect().width,
                        document.getElementById(containerName).getBoundingClientRect().height
                      );
                    });

                    setTimeout(function(){ 
                        // console.log(">>> container resize");
                        chartContainer.resize(
                            document.getElementById(containerName).getBoundingClientRect().width,
                            document.getElementById(containerName).getBoundingClientRect().height
                        );
                        // document.getElementById("container").style.visibility = "visible";

                        setTimeout(function(){
                            document.getElementById(containerName).style.visibility = "visible";
                        },500);
                    }, 50);
                } else {
                    const chartContainer = new CharticulatorContainer.ChartContainer({ chart: chart }, dataset);
                    $("#"+containerName).empty();
                    chartContainer.mount(containerName, document.getElementById(containerName).getBoundingClientRect().width, document.getElementById(containerName).getBoundingClientRect().height);
                    window.addEventListener("resize", function() {
                      chartContainer.resize(
                        document.getElementById(containerName).getBoundingClientRect().width,
                        document.getElementById(containerName).getBoundingClientRect().height
                      );
                    });                    
                }






            });
        }

        this.render = function(containerElement) {
            _containerElement = containerElement;
            $(_containerElement).append(_container).attr("id",_id).append(fscreen.on("click",()=>{fullscreenById(_id)}));
            (_settings.enabled_fullscreen)&&($(_containerElement).addClass("fullscreenable"))
            // (_settings.dat&&_settings.template)&&(draw(_settings.data,_settings.template,_chartId))
        }, this.onSettingsChanged = function(newSettings) {
            _settings = newSettings;
            _settings.enabled_fullscreen?$(_containerElement).addClass("fullscreenable"):$(_containerElement).removeClass("fullscreenable")
        }, this.onCalculatedValueChanged = function(settingName, newValue) {
            (settingName=="data")&&(draw(newValue,JSON.parse(_settings.template),_chartId,_settings.fix_abnomalstart))
        }, this.onDispose = function() {

        }, this.onSizeChanged = function() { 
            // (_settings.data&&_settings.template)&&(draw(JSON.parse(_settings.data),JSON.parse(_settings.template),_chartId));
        }, this.getHeight = function() {
            return (parseInt((_settings.height_block)?_settings.height_block:4))
        }, this.onSettingsChanged(settings)
    };

    freeboard.loadWidgetPlugin({
        type_name: "charticulator",
        display_name: "Charticulator",
        external_scripts:  ["plugins/thirdparty/TunchzChartBuilder210x.js"], 
        settings: [
        {
            name: "title",
            display_name: "Title",
            type: "text"
        }, 
        {
            name: "data",
            display_name: "Data",
            type: "calculated",
        }, 
        {
            name: "template",
            display_name: "Template",
            type: "jsscript",
        }, 
        {
            name: "margin",
            display_name: "Margin",
            type: "integer",
            default_value: 2,

        }, 
        {
            name: "enabled_fullscreen",
            display_name: "Fullscreenable",
            type: "boolean",
            default_value: _default.fullscreenable,
            description: "Enable widget fullscreen toggle"
        },
        {
            name: "fix_abnomalstart",
            display_name: "Fix Abnomal Start",
            type: "boolean",
            default_value: !1,
            description: "Enable for some complicated chart that first start has abnormal display."
        },
        {
            name: "height_block",
            display_name: "Height Blocks",
            type: "integer",
            default_value: 4,
        }],
        newInstance : function(settings, newInstanceCallback) {
            newInstanceCallback(new charticulatorPlugin(settings));
        }
    });        


}());
