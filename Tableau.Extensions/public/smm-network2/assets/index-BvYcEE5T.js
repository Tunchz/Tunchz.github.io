const t = {
    name: "calendar",
    description: "",
    isPaid: !0,
    img: "./img/calendar.png",
    minDims: 1,
    requiredDims: ["DAY(date)"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [],
    tooltipConfig: [{
        name: "date",
        description: "Date Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "Overlap",
        type: "radio",
        description: "Color Palette:",
        options: [{
            value: "1",
            description: "Continuous palette"
        }, {
            value: "2",
            description: "Diverging palette"
        }]
    }, {
        order: 1,
        index: 1,
        name: "colorText",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
},
d = {
    name: "horizon-chart",
    description: "",
    isPaid: !0,
    img: "./img/horizon.png",
    minDims: 2,
    requiredDims: ["DAY(Date)", "Category"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    supportsDashboardActions: !1,
    labelConfig: [],
    tooltipConfig: [],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "Overlap",
        type: "radio",
        description: "The amount of overlapping layers:",
        options: [{
            value: "1",
            description: "1"
        }, {
            value: "2",
            description: "2"
        }, {
            value: "3",
            description: "3"
        }, {
            value: "4",
            description: "4"
        }, {
            value: "5",
            description: "5"
        }]
    }, {
        order: 1,
        index: 1,
        name: "labels",
        type: "radio",
        description: "Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 2,
        index: 2,
        name: "colorText",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
},
s = {
    name: "network-diagram",
    description: "",
    isPaid: !0,
    img: "./img/network.gif",
    minDims: 5,
    requiredDims: ["Source", "Target", "Color By", "Symbol", "Image URL"],
    optional: ["Color By", "Symbol", "Image URL"],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: ["Source", "Target"],
    labelConfig: [],
    tooltipConfig: [{
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["SourceName", "TargetName", "MeasureName", "MeasureValue"]
    }, {
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["Name", "Dimension", "Group"]
    }],
    extraSettings: [{
        id: 0,
        index: 0,
        name: "colorMode",
        type: "radio",
        description: "Color Mode",
        options: [{
            value: "1",
            description: "Color Nodes"
        }, {
            value: "0",
            description: "Color Nodes and Links"
        }]
    }, {
        id: 1,
        index: 1,
        name: "enableAnimation",
        type: "radio",
        description: "Animations",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        id: 2,
        index: 2,
        name: "curvedLines",
        type: "radio",
        description: "Curved Lines",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        id: 3,
        index: 3,
        name: "enableArrows",
        type: "radio",
        description: "Arrows",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        id: 4,
        index: 4,
        name: "sizeNode",
        type: "radio",
        description: "Size Node",
        options: [{
            value: "1",
            description: "Incoming values"
        }, {
            value: "0",
            description: "Outbound values"
        }]
    }, {
        id: 5,
        index: 5,
        name: "userDistance",
        type: "range",
        description: "Node Distance",
        min: 40,
        max: 300,
        step: 1,
        value: 75
    }, {
        id: 6,
        index: 6,
        name: "userForceCollide",
        type: "range",
        description: "Force",
        min: -100,
        max: 100,
        step: 1,
        value: 10
    }, {
        id: 7,
        index: 7,
        name: "nodeSizeMultiplier",
        type: "range",
        description: "Node Size",
        min: 1,
        max: 5,
        step: 1,
        value: 1
    }, {
        id: 8,
        index: 8,
        name: "linkSizeMultiplier",
        type: "range",
        description: "Link Size",
        min: 1,
        max: 5,
        step: 1,
        value: 1
    }, {
        id: 9,
        index: 9,
        name: "animationItterator",
        type: "range",
        description: "Number of iterations when animations are disabled",
        min: 1,
        max: 500,
        step: 1,
        value: 300
    }, {
        id: 9,
        index: 9,
        name: "animationItterator",
        type: "range",
        description: "Number of iterations when animations are disabled",
        min: 1,
        max: 500,
        step: 1,
        value: 300
    }, {
        order: 10,
        index: 10,
        name: "colorLabel",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
},
l = {
    name: "network-diagram-2.0",
    description: "",
    isPaid: !0,
    img: "./img/networkDiagram2.png",
    minDims: 2,
    requiredDims: ["From", "From Color By", "From Image URL", "To", "To Color By", "To Image URL", "Group"],
    optional: ["From Color By", "To Color By", "From Symbol", "From Image URL", "To Image URL", "Group"],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: ["Source", "Target"],
    labelConfig: [],
    tooltipConfig: [{
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["SourceName", "TargetName", "MeasureName", "MeasureValue", "FromValue", "ToValue", "SourceGroup", "TargetGroup", "TargetDimension", "SourceDimension"]
    }, {
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["Name", "Dimension", "Group", "MeasureName", "Value", "Color", "ImageURL"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "colorMode",
        type: "radio",
        description: "Color Mode",
        options: [{
            value: "0",
            description: "Color Nodes and Links"
        }, {
            value: "1",
            description: "Color Nodes"
        }]
    }, {
        order: 1,
        index: 1,
        name: "enableAnimation",
        deprecated: !0,
        type: "radio",
        description: "Animations",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 2,
        index: 2,
        name: "curvedLines",
        deprecated: !0,
        type: "radio",
        description: "Curved Lines",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 3,
        index: 3,
        name: "enableArrows",
        type: "radio",
        description: "Arrows",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 4,
        index: 4,
        name: "sizeNode",
        type: "radio",
        description: "Size Node",
        options: [{
            value: "0",
            description: "Outbound values"
        }, {
            value: "1",
            description: "Incoming values"
        }]
    }, {
        order: 5,
        index: 5,
        name: "userDistance",
        type: "range",
        description: "Node Distance",
        min: 10,
        max: 100,
        step: 1,
        value: 30
    }, {
        order: 6,
        index: 6,
        deprecated: !0,
        name: "userForceCollide",
        type: "range",
        description: "Force",
        min: -100,
        max: 100,
        step: 1,
        value: 0
    }, {
        order: 7,
        index: 7,
        id: 7,
        name: "nodeSizeMultiplier",
        type: "range",
        description: "Node Size",
        min: 1,
        max: 30,
        step: 1,
        value: 3
    }, {
        order: 8,
        index: 8,
        name: "linkSizeMultiplier",
        type: "range",
        description: "Link Size",
        min: 1,
        max: 10,
        step: 1,
        value: 1
    }, {
        order: 9,
        index: 9,
        name: "animationItterator",
        type: "range",
        deprecated: !0,
        description: "Number of iterations when animations are disabled",
        min: 1,
        max: 500,
        step: 1,
        value: 300
    }, {
        order: 10,
        index: 10,
        name: "nodeOpacity",
        type: "range",
        description: "Node opacity (%)",
        min: 1,
        max: 100,
        step: 1,
        value: 100
    }, {
        order: 11,
        index: 11,
        name: "linkOpacity",
        type: "range",
        description: "Link opacity (%)",
        min: 1,
        max: 100,
        step: 1,
        value: 30
    }, {
        order: 12,
        index: 12,
        name: "borderWidth",
        type: "range",
        description: "Border width",
        min: 0,
        max: 20,
        step: 1,
        value: 1
    }, {
        order: 13,
        index: 13,
        name: "borderOpacity",
        type: "range",
        description: "Border opacity",
        min: 0,
        max: 100,
        step: 1,
        value: 100
    }, {
        order: 14,
        index: 14,
        name: "labelOffset",
        type: "range",
        description: "Label Y offset",
        min: -100,
        max: 100,
        step: 1,
        value: 0
    }, {
        order: 15,
        index: 15,
        name: "showLabels",
        type: "radio",
        description: "Show labels",
        options: [{
            value: "selected",
            description: "When selected"
        }, {
            value: "always",
            description: "Always show"
        }, {
            value: "none",
            description: "Hidden"
        }]
    }, {
        order: 16,
        index: 16,
        name: "scale",
        type: "range",
        description: "Default zoom level (%)",
        min: 1,
        max: 100,
        step: 1,
        value: 20
    }, {
        order: 17,
        index: 17,
        name: "showSourceImageAsSymbol",
        type: "radio",
        description: "Show from image as",
        options: [{
            value: "none",
            description: "Circle filled with image"
        }, {
            value: "iconBorder",
            description: "Icon with border"
        }, {
            value: "iconNoBorder",
            description: "Icon without border"
        }]
    }, {
        order: 18,
        index: 18,
        name: "showTargetImageAsSymbol",
        type: "radio",
        description: "Show to image as",
        options: [{
            value: "none",
            description: "Circle filled with image"
        }, {
            value: "iconBorder",
            description: "Icon with border"
        }, {
            value: "iconNoBorder",
            description: "Icon without border"
        }]
    }, {
        order: 19,
        index: 19,
        name: "nodeSymbol",
        type: "radio",
        description: "Node symbol",
        options: [{
            value: "circle",
            description: "Circle"
        }, {
            value: "square",
            description: "Square"
        }]
    }, {
        order: 20,
        index: 20,
        name: "enableConvexHull",
        type: "radio",
        description: "Enable convex hull",
        options: [{
            value: "onClick",
            description: "On drill through"
        }, {
            value: "disabled",
            description: "Disabled"
        }]
    }, {
        order: 21,
        index: 21,
        name: "convexHullScale",
        type: "range",
        description: "Scale of convex hull",
        min: 1,
        max: 20,
        step: 1,
        value: 2
    }, {
        order: 22,
        index: 22,
        name: "highlightDepth",
        type: "range",
        description: "Drill through depth",
        min: 0,
        max: 4,
        step: 1,
        value: 1
    }, {
        order: 24,
        index: 23,
        name: "Actions",
        type: "radio",
        description: "Drill through actions",
        options: [{
            value: "highlightOutward",
            description: "Highlight only outward links"
        }, {
            value: "highlightInward",
            description: "Highlight only inward links"
        }, {
            value: "highlightBoth",
            description: "Highlight both links"
        }, {
            value: "highlightAll",
            description: "Shareholder structure"
        }]
    }, {
        order: 23,
        index: 24,
        name: "useQuadrantPositioning",
        type: "radio",
        description: "Position groups in quadrants",
        options: [{
            value: "0",
            description: "Use simulation"
        }, {
            value: "1",
            description: "Position in Y axis"
        }, {
            value: "2",
            description: "Position in X axis"
        }]
    }, {
        order: 4,
        index: 25,
        name: "Strength",
        type: "range",
        description: "Strength (force nodes to separate)",
        min: -100,
        max: 0,
        step: 1,
        value: -10
    }, {
        order: 19,
        index: 26,
        name: "enableGroupBtn",
        type: "radio",
        description: "Enable group button",
        options: [{
            value: "0",
            description: "Disabled"
        }, {
            value: "1",
            description: "Enabled"
        }]
    }, {
        order: 1,
        index: 27,
        name: "colorText",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#000000"
    }, {
        order: 2,
        index: 28,
        name: "colorLinks",
        description: "Links",
        type: "color",
        value: "#999"
    }]
},
p = {
    name: "orgchart",
    description: "",
    isPaid: !0,
    img: "./img/orgchart.gif",
    minDims: 2,
    expands: !0,
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "colorMode",
        type: "radio",
        description: "Color Mode",
        options: [{
            value: "1",
            description: "Color Nodes"
        }, {
            value: "0",
            description: "Color Nodes and Links"
        }]
    }, {
        order: 1,
        index: 1,
        name: "layout",
        type: "radio",
        description: "Layout",
        options: [{
            value: "1",
            description: "Horizontal layout"
        }, {
            value: "0",
            description: "Vertical Layout"
        }]
    }, {
        order: 2,
        index: 2,
        name: "Text align",
        type: "radio",
        description: "align",
        options: [{
            value: "middle",
            description: "Center"
        }, {
            value: "end",
            description: "Left"
        }, {
            value: "start",
            description: "Right"
        }]
    }, {
        order: 3,
        index: 3,
        name: "rotate",
        type: "range",
        description: "Rotate labels",
        min: 0,
        max: 360,
        step: 15,
        value: 0
    }, {
        order: 4,
        index: 4,
        name: "padding",
        type: "range",
        description: "Padding between nodes",
        min: 1,
        max: 50,
        step: 1,
        value: 20
    }, {
        order: 5,
        index: 5,
        name: "nodeSizeMultiplier",
        type: "range",
        description: "Node Size",
        min: 1,
        max: 100,
        step: 1,
        value: 15
    }, {
        order: 6,
        index: 6,
        name: "linkSizeMultiplier",
        type: "range",
        description: "Link Size",
        min: 1,
        max: 5,
        step: 1,
        value: 1
    }, {
        order: 7,
        index: 7,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity",
        min: 0,
        max: 100,
        step: 1,
        value: 100
    }, {
        order: 8,
        index: 8,
        name: "linkOpacity",
        type: "range",
        description: "Link Opacity",
        min: 0,
        max: 100,
        step: 1,
        value: 100
    }, {
        order: 9,
        index: 9,
        name: "colorLabel",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
},
u = {
    name: "radar-chart",
    isPaid: !1,
    img: "./img/radar.gif",
    minDims: 2,
    requiredDims: ["Dimension", "Axis"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["DimensionName", "DimensionName", "AxisName", "AxisValue", "MeasureName", "MeasureValue"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "color-legend",
        type: "radio",
        description: "Color Legend",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 1,
        index: 1,
        name: "axis-labels",
        type: "radio",
        description: "Axis Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 2,
        index: 2,
        name: "axis-measure-labels",
        type: "radio",
        description: "Axis Measure Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 3,
        index: 3,
        name: "numLevels",
        type: "range",
        description: "Tick Marks",
        min: 0,
        max: 30,
        step: 1,
        value: 5
    }, {
        order: 4,
        index: 4,
        name: "backgroundOpacity",
        type: "range",
        description: "Background Opacity (%)",
        min: 0,
        max: 50,
        step: 1,
        value: 10
    }, {
        order: 5,
        index: 5,
        name: "axisOpacity",
        type: "range",
        deprecated: 1,
        description: "Axis Opacity (%)",
        min: 0,
        max: 100,
        step: 1,
        value: 10
    }, {
        order: 6,
        index: 6,
        name: "groupOpacity",
        type: "range",
        description: "Area Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 20
    }, {
        order: 7,
        index: 7,
        name: "dotRadius",
        type: "range",
        description: "Circles Radius (px)",
        min: 0,
        max: 10,
        step: 1,
        value: 4
    }, {
        order: 8,
        index: 8,
        name: "strokeWidth",
        type: "range",
        description: "Stroke width (px)",
        min: 0,
        max: 10,
        step: 1,
        value: 2
    }, {
        order: 9,
        index: 9,
        name: "axisMin",
        type: "number",
        description: "Axis min value",
        hint: "Leave blank(empty) for automatlicy scale the min value. Default: 0",
        value: 0
    }, {
        order: 10,
        index: 10,
        name: "axisMax",
        type: "number",
        description: "Axis max value",
        hint: "Set any number for max value, leave blank(empty) for looking up the max value. Default: empty"
    }, {
        order: 11,
        index: 11,
        name: "reverseAxis",
        type: "radio",
        description: "Reverse Axis",
        options: [{
            value: "1",
            description: "Disabled"
        }, {
            value: "0",
            description: "Enabled"
        }]
    }, {
        order: 12,
        index: 12,
        name: "showAverage",
        type: "radio",
        description: "Show Average",
        options: [{
            value: "1",
            description: "Disabled"
        }, {
            value: "0",
            description: "Enabled"
        }]
    }, {
        order: 13,
        index: 13,
        name: "colorAxis",
        type: "color",
        description: "Axis",
        value: "#666666",
        previousValue: "textColorAxis"
    }, {
        order: 14,
        index: 14,
        name: "colorAverage",
        type: "color",
        description: "Grid",
        value: "#333333",
        previousValue: "textColorGrid"
    }, {
        order: 15,
        index: 15,
        name: "colorAverage",
        type: "color",
        description: "Average layer",
        value: "#333333",
        previousValue: "averageColor",
        conditions: [{
            name: "showAverage",
            value: "0"
        }]
    }, {
        order: 16,
        index: 16,
        name: "colorLines",
        type: "color",
        description: "Axis lines",
        value: "#eeeeee"
    }, {
        order: 17,
        index: 17,
        name: "colorLines",
        type: "color",
        description: "Axis background",
        value: "#eeeeee"
    }]
},
c = {
    name: "sankey-diagram",
    description: "A Sankey Diagram is a visualisation technique that allows to display flows.",
    isPaid: !1,
    img: "./img/sankey.gif",
    minDims: 2,
    expands: !0,
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [{
        name: "node",
        description: "Node Label",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue", "PercentageOfTotal", "PercentageOfGroup"]
    }, {
        name: "fromLink",
        description: "From Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "toLink",
        description: "To Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }],
    tooltipConfig: [{
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue", "PercentageOfTotal", "PercentageOfGroup"]
    }],
    extraSettings: [{
        order: 5,
        index: 0,
        name: "colorBy",
        type: "radio",
        description: "Color By",
        options: [{
            value: "dimension",
            description: "Color by dimension"
        }, {
            value: "value",
            description: "Same values have the same colors"
        }, {
            value: "unique",
            description: "All values have unique colors"
        }, {
            value: "tag",
            description: "Color by tag"
        }]
    }, {
        order: 6,
        index: 1,
        name: "colorMode",
        type: "radio",
        description: "Color Links By",
        options: [{
            value: "both",
            description: "Input - Output (Gradient)"
        }, {
            value: "input",
            description: "Input"
        }, {
            value: "output",
            description: "Output"
        }, {
            value: "none",
            description: "One Color"
        }]
    }, {
        order: 2,
        index: 2,
        name: "nodeWidth",
        type: "range",
        description: "Node Width",
        min: 0,
        max: 600,
        step: 1,
        value: 100
    }, {
        order: 3,
        index: 3,
        name: "nodePadding",
        type: "range",
        description: "Vertical Node Padding",
        min: 0,
        max: 100,
        step: 1,
        value: 10
    }, {
        order: 4,
        index: 4,
        name: "nodeLinkSpace",
        type: "range",
        description: "Horizontal Node Padding",
        min: 0,
        max: 40,
        step: 1,
        value: 2
    }, {
        order: 5,
        index: 5,
        name: "linkOpacity",
        type: "range",
        description: "Link Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 50
    }, {
        id: 6,
        index: 6,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 7,
        index: 7,
        name: "sankeyLayout",
        type: "radio",
        description: "Layout Mode",
        options: [{
            value: "sankeyLeft",
            description: "Left"
        }, {
            value: "sankeyRight",
            description: "Right"
        }, {
            value: "sankeyCenter",
            description: "Centered"
        }, {
            value: "sankeyJustify",
            description: "Justified"
        }]
    }, {
        order: 8,
        index: 8,
        name: "nodeBorder",
        type: "radio",
        description: "Node Border",
        options: [{
            value: "0",
            description: "Disabled"
        }, {
            value: "1",
            description: "Enabled"
        }]
    }, {
        order: 9,
        index: 9,
        name: "labels",
        type: "radio",
        deprecated: 1,
        description: "Node Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 10,
        index: 10,
        name: "labelsPosition",
        type: "radio",
        description: "Labels Position",
        options: [{
            value: "inside",
            description: "Inside Node"
        }, {
            value: "outside",
            description: "Outside Node"
        }]
    }, {
        order: 11,
        index: 11,
        name: "hideNulls",
        type: "radio",
        description: "Hide Nulls",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 12,
        index: 12,
        name: "sortBy",
        type: "radio",
        description: "Sort Nodes by",
        options: [{
            value: "auto",
            description: "Automatic"
        }, {
            value: "asc",
            description: "Name (asc)"
        }, {
            value: "desc",
            description: "Name (desc)"
        }, {
            value: "valueHighToLow",
            description: "Value (high -> low)"
        }, {
            value: "valueLowToHigh",
            description: "Value (low -> high)"
        }]
    }, {
        order: 13,
        index: 13,
        name: "sortLinksBy",
        type: "radio",
        description: "Sort Links by",
        options: [{
            value: "auto",
            description: "Automatic"
        }, {
            value: "valueHighToLow",
            description: "Value (high -> low)"
        }, {
            value: "valueLowToHigh",
            description: "Value (low -> high)"
        }]
    }, {
        order: 14,
        index: 14,
        name: "enableHeader",
        type: "radio",
        description: "Enable Header",
        options: [{
            value: "0",
            description: "Disabled"
        }, {
            value: "1",
            description: "Enabled"
        }]
    }, {
        order: 15,
        index: 15,
        name: "scaleSlider",
        type: "range",
        description: "Scale (for large complex visuals)",
        min: 1,
        max: 100,
        step: 1,
        value: 30
    }, {
        order: 0,
        index: 16,
        deprecated: 1,
        name: "labelOffsetNode",
        type: "range",
        description: "Node Label Offset",
        min: 0,
        max: 100,
        step: 1,
        value: 45
    }, {
        order: 0,
        index: 17,
        deprecated: 1,
        name: "labelOffsetLink",
        type: "range",
        description: "Link Label Offset",
        min: 0,
        max: 100,
        step: 1,
        value: 16
    }, {
        order: 17,
        index: 18,
        name: "highlightOnClick",
        type: "radio",
        description: "Highlight Mode",
        options: [{
            value: "0",
            description: "Highlight on hover and click"
        }, {
            value: "1",
            description: "Highlight on click"
        }]
    }, {
        order: 18,
        index: 19,
        name: "VerticalAlignLabels",
        type: "radio",
        description: "Horizontal label alignment",
        options: [{
            value: "0",
            description: "Left"
        }, {
            value: "1",
            description: "Center"
        }, {
            value: "2",
            description: "Right"
        }]
    }, {
        order: 19,
        index: 20,
        name: "HorizontalAlignLabels",
        type: "radio",
        description: "Vertical label alignment",
        options: [{
            value: "0",
            description: "Top"
        }, {
            value: "1",
            description: "Center"
        }, {
            value: "2",
            description: "Bottom"
        }]
    }, {
        order: 1,
        index: 21,
        name: "colorNodeLabel",
        description: "Node label",
        type: "color",
        previousValue: "textColor",
        value: "#ffffff"
    }, {
        order: 2,
        index: 22,
        name: "colorLinkLabel",
        previousValue: "textColorLinks",
        description: "Link label",
        type: "color",
        value: "#ffffff"
    }, {
        order: 3,
        index: 23,
        name: "colorHeader",
        previousValue: "textColorHeader",
        description: "Header",
        type: "color",
        value: "#000000"
    }, {
        order: 4,
        index: 24,
        name: "colorNodeBorder",
        description: "Node border",
        type: "color",
        value: "#333333"
    }, {
        order: 5,
        index: 25,
        name: "colorLinkNoColor",
        description: "Link color",
        type: "color",
        value: "#dddddd",
        conditions: [{
            name: "colorMode",
            value: "none"
        }]
    }]
},
m = {
    name: "source-target-sankey",
    description: "A Source target sankey Diagram is a visualisation technique that allows to display flows.",
    isPaid: !0,
    img: "./img/sourceTargetSankey.png",
    minDims: 2,
    requiredDims: ["Source", "Target"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [{
        name: "node",
        description: "Node Label",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }, {
        name: "fromLink",
        description: "From Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "toLink",
        description: "To Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }],
    tooltipConfig: [{
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }],
    extraSettings: [{
        order: 4,
        index: 0,
        name: "colorBy",
        type: "radio",
        description: "Color By",
        options: [{
            value: "value",
            description: "Same values have the same colors"
        }, {
            value: "unique",
            description: "All values have unique colors"
        }, {
            value: "dimension",
            description: "Color by levels"
        }]
    }, {
        order: 5,
        index: 1,
        name: "colorMode",
        type: "radio",
        description: "Color Links By",
        options: [{
            value: "both",
            description: "Input - Output (Gradient)"
        }, {
            value: "input",
            description: "Input"
        }, {
            value: "output",
            description: "Output"
        }, {
            value: "none",
            description: "No Color"
        }]
    }, {
        order: 7,
        index: 2,
        name: "nodeWidth",
        type: "range",
        description: "Node Width",
        min: 0,
        max: 600,
        step: 1,
        value: 100
    }, {
        order: 8,
        index: 3,
        name: "nodePadding",
        type: "range",
        description: "Vertical Node Padding",
        min: 0,
        max: 300,
        step: 1,
        value: 6
    }, {
        order: 9,
        index: 4,
        name: "nodeLinkSpace",
        type: "range",
        description: "Horizontal Node Padding",
        min: 0,
        max: 40,
        step: 1,
        value: 3
    }, {
        order: 10,
        index: 5,
        name: "linkOpacity",
        type: "range",
        description: "Link Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 50
    }, {
        order: 11,
        index: 6,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 12,
        index: 7,
        name: "sankeyLayout",
        type: "radio",
        description: "Layout Mode",
        options: [{
            value: "sankeyLeft",
            description: "Left"
        }, {
            value: "sankeyRight",
            description: "Right"
        }, {
            value: "sankeyCenter",
            description: "Centered"
        }, {
            value: "sankeyJustify",
            description: "Justified"
        }]
    }, {
        order: 13,
        index: 8,
        name: "nodeBorder",
        type: "radio",
        description: "Node Border",
        options: [{
            value: "0",
            description: "Disabled"
        }, {
            value: "1",
            description: "Enabled"
        }]
    }, {
        order: 14,
        index: 9,
        name: "labels",
        type: "radio",
        deprecated: 1,
        description: "Node Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 15,
        index: 10,
        name: "labelsPosition",
        type: "radio",
        description: "Labels Position",
        options: [{
            value: "inside",
            description: "Inside Node"
        }, {
            value: "outside",
            description: "Outside Node"
        }]
    }, {
        order: 16,
        index: 11,
        name: "hideNulls",
        type: "radio",
        description: "Hide Nulls",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 17,
        index: 12,
        name: "sortBy",
        type: "radio",
        description: "Sort Nodes by",
        options: [{
            value: "auto",
            description: "Automatic"
        }, {
            value: "asc",
            description: "Name (asc)"
        }, {
            value: "desc",
            description: "Name (desc)"
        }, {
            value: "valueHighToLow",
            description: "Value (high -> low)"
        }, {
            value: "valueLowToHigh",
            description: "Value (low -> high)"
        }]
    }, {
        order: 18,
        index: 13,
        name: "sortLinksBy",
        type: "radio",
        description: "Sort Links by",
        options: [{
            value: "auto",
            description: "Automatic"
        }, {
            value: "valueHighToLow",
            description: "Value (high -> low)"
        }, {
            value: "valueLowToHigh",
            description: "Value (low -> high)"
        }]
    }, {
        order: 19,
        index: 14,
        name: "scaleSlider",
        type: "range",
        description: "Scale (for large complex visuals)",
        min: 1,
        max: 200,
        step: 1,
        value: 1
    }, {
        order: 20,
        index: 15,
        name: "labelOffsetNode",
        type: "range",
        description: "Node Label Offset",
        min: 0,
        max: 100,
        step: 1,
        value: 45
    }, {
        order: 21,
        index: 16,
        name: "labelOffsetLink",
        type: "range",
        description: "Link Label Offset",
        min: 0,
        max: 100,
        step: 1,
        value: 16
    }, {
        order: 22,
        index: 17,
        name: "filterType",
        type: "radio",
        description: "Filter type",
        options: [{
            value: "0",
            description: "Only the selected node will be used as a filter"
        }, {
            value: "1",
            description: "All nodes connected to the selected node will be used as a filter"
        }]
    }, {
        order: 1,
        index: 18,
        name: "colorNodeLabel",
        description: "Node label",
        type: "color",
        previousValue: "textColor",
        value: "#ffffff"
    }, {
        order: 2,
        index: 19,
        name: "colorLinkLabel",
        previousValue: "textColorLinks",
        description: "Link label",
        type: "color",
        value: "#ffffff"
    }, {
        order: 3,
        index: 20,
        name: "colorNodeBorder",
        description: "Node border",
        type: "color",
        value: "#000000"
    }, {
        order: 6,
        index: 21,
        name: "colorLinkNoColor",
        description: "Link color",
        type: "color",
        value: "#dddddd",
        conditions: [{
            name: "colorMode",
            value: "none"
        }]
    }, {
        order: 15,
        index: 22,
        name: "VerticalAlignLabels",
        type: "radio",
        description: "Horizontal label alignment",
        options: [{
            value: "0",
            description: "Left"
        }, {
            value: "1",
            description: "Center"
        }, {
            value: "2",
            description: "Right"
        }]
    }, {
        order: 15,
        index: 23,
        name: "HorizontalAlignLabels",
        type: "radio",
        description: "Vertical label alignment",
        options: [{
            value: "0",
            description: "Top"
        }, {
            value: "1",
            description: "Center"
        }, {
            value: "2",
            description: "Bottom"
        }]
    }]
},
v = {
    name: "circular-sankey",
    isPaid: !0,
    description: "A Sankey Diagram is a visualisation technique that allows to display flows.",
    img: "./img/circular_sankey.gif",
    minDims: 2,
    requiredDims: ["Source", "Target"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [{
        name: "node",
        enabled: !0,
        description: "Node Label",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }, {
        name: "fromLink",
        enabled: !0,
        description: "From Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "toLink",
        enabled: !0,
        description: "To Link Label",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }],
    tooltipConfig: [{
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "PercentOfSource", "SourceName", "PercentOfTarget", "TargetName"]
    }, {
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["DimensionName", "DimensionValue", "MeasureName", "MeasureValue"]
    }],
    extraSettings: [{
        order: 5,
        index: 0,
        name: "colorBy",
        type: "radio",
        description: "Color By",
        options: [{
            value: "value",
            description: "Same values have the same colors"
        }, {
            value: "none",
            description: "One color"
        }]
    }, {
        order: 5,
        index: 1,
        name: "colorMode",
        type: "radio",
        description: "Color Links By",
        options: [{
            value: "circular",
            description: "Circular - None Circular"
        }, {
            value: "both",
            description: "Input - Output (Gradient)"
        }, {
            value: "input",
            description: "Input"
        }, {
            value: "output",
            description: "Output"
        }]
    }, {
        order: 2,
        index: 2,
        name: "nodeWidth",
        type: "range",
        description: "Node Width",
        min: 0,
        max: 300,
        step: 1,
        value: 100
    }, {
        order: 3,
        index: 3,
        name: "nodePadding",
        type: "range",
        description: "Vertical Node Padding",
        min: 0,
        max: 300,
        step: 1,
        value: 50
    }, {
        order: 4,
        index: 4,
        name: "nodeLinkSpace",
        type: "range",
        description: "Horizontal Node Padding",
        min: 0,
        max: 40,
        step: 1,
        value: 0
    }, {
        order: 5,
        index: 5,
        name: "linkOpacity",
        type: "range",
        description: "Link Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 50
    }, {
        order: 6,
        index: 6,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 7,
        index: 7,
        name: "nodeBorder",
        type: "radio",
        description: "Node Border",
        options: [{
            value: "0",
            description: "Disabled"
        }, {
            value: "1",
            description: "Enabled"
        }]
    }, {
        order: 8,
        index: 8,
        name: "labels",
        type: "radio",
        deprecated: 1,
        description: "Labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 9,
        index: 9,
        name: "labelsPosition",
        type: "radio",
        description: "Labels Position",
        options: [{
            value: "inside",
            description: "Inside Node"
        }, {
            value: "outside",
            description: "Outside Node"
        }]
    }, {
        order: 10,
        index: 10,
        name: "hideNulls",
        type: "radio",
        description: "Hide Nulls",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 11,
        index: 11,
        name: "paddingLeft",
        type: "range",
        description: "Padding Left",
        min: 0,
        max: 40,
        step: 1,
        value: 0
    }, {
        order: 12,
        index: 12,
        name: "paddingRight",
        type: "range",
        description: "Padding Right",
        min: 0,
        max: 40,
        step: 1,
        value: 0
    }, {
        order: 13,
        index: 13,
        name: "paddingTop",
        type: "range",
        description: "Padding Top",
        min: 0,
        max: 40,
        step: 1,
        value: 0
    }, {
        order: 14,
        index: 14,
        name: "paddingBottom",
        type: "range",
        description: "Padding Bottom",
        min: 0,
        max: 40,
        step: 1,
        value: 0
    }, {
        order: 1,
        index: 15,
        name: "colorNodeLabel",
        description: "Node label",
        type: "color",
        previousValue: "textColor",
        value: "#ffffff"
    }, {
        order: 2,
        index: 16,
        name: "colorLinkLabel",
        previousValue: "textColorLinks",
        description: "Link label",
        type: "color",
        value: "#ffffff"
    }, {
        order: 4,
        index: 17,
        name: "colorNodeBorder",
        description: "Node border",
        type: "color",
        value: "#333333"
    }, {
        order: 5,
        index: 18,
        name: "colorLinkNoColor",
        description: "Link color",
        type: "color",
        value: "#dddddd",
        conditions: [{
            name: "colorMode",
            value: "circular"
        }]
    }, {
        order: 6,
        index: 19,
        name: "colorLinkCircular",
        description: "Circular color",
        type: "color",
        value: "#ff0000",
        conditions: [{
            name: "colorMode",
            value: "circular"
        }]
    }]
},
g = {
    name: "sunburst",
    description: "",
    isPaid: !0,
    img: "./img/sunburst.gif",
    minDims: 2,
    expands: !0,
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    supportsDashboardActions: !1,
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "colorLabels",
        description: "Node label",
        type: "color",
        value: "#ffffff"
    }, {
        order: 1,
        index: 1,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }]
},
x = {
    name: "sunburst-new",
    description: "",
    isPaid: !0,
    img: "./img/sunburst_new.png",
    minDims: 1,
    expands: !0,
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    supportsDashboardActions: !0,
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Node Tooltip",
        shortcodes: ["MeasureName", "MeasureValue", "DimensionName", "DimensionValue"]
    }],
    extraSettings: [{
        order: 4,
        index: 0,
        name: "colorBy",
        type: "radio",
        description: "Color By",
        options: [{
            value: "values",
            description: "Same values have the same colors"
        }, {
            value: "level",
            description: "Layers are colored by level 1 values"
        }]
    }, {
        order: 1,
        index: 1,
        name: "values",
        type: "radio",
        description: "Show values",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 2,
        index: 2,
        name: "labels",
        type: "radio",
        description: "Show labels below values",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 3,
        index: 3,
        name: "total",
        type: "radio",
        description: "Show total in centre",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 4,
        index: 4,
        name: "totalLabelOffset",
        type: "range",
        description: "Total label offset",
        min: -100,
        max: 100,
        step: 10,
        value: -20
    }, {
        order: 0,
        index: 5,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 1,
        index: 6,
        name: "colorNodeLabel",
        description: "Node label",
        type: "color",
        previousValue: "textColor",
        value: "#ffffff"
    }, {
        order: 2,
        index: 7,
        name: "colorTotalLabel",
        description: "Total label",
        type: "color",
        value: "#000000"
    }]
},
y = {
    name: "venn-diagram",
    description: "The Venn diagram only works with Tableau SETS or Boolean dimensions.",
    isPaid: !0,
    img: "./img/venn-diagram.png",
    minDims: 1,
    expands: !0,
    requiredDims: ["Dimension"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Circle Tooltip",
        shortcodes: ["MeasureValue", "DimensionName"]
    }],
    extraSettings: [{
        id: 0,
        index: 0,
        name: "circleOpacity",
        type: "range",
        description: "Circle Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 80
    }, {
        id: 1,
        index: 1,
        name: "textOpacity",
        type: "range",
        description: "Text Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 80
    }, {
        id: 2,
        index: 2,
        name: "borderWidth",
        type: "range",
        description: "Border Width",
        min: 0,
        max: 10,
        step: 1,
        value: 2
    }, {
        id: 3,
        index: 3,
        name: "borderOpacity",
        type: "range",
        description: "Border Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }]
},
h = {
    name: "ridgeline-plot",
    isPaid: !0,
    description: "The Ridgeline plot shows the distribution of a numeric value for several categories. All aligned to the same horizontal scale and presented with a slight overlap.",
    img: "./img/ridgeline.png",
    minDims: 2,
    requiredDims: ["Series", "Category"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Area Tooltip",
        shortcodes: ["Category"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "kernelBandwidth",
        type: "range",
        description: "Kernal Bandwidth",
        min: 1,
        max: 20,
        step: 1,
        value: 7
    }, {
        order: 1,
        index: 1,
        name: "densityScale",
        type: "range",
        description: "Density Scale",
        min: 1,
        max: 20,
        step: 1,
        value: 8
    }, {
        order: 2,
        index: 2,
        name: "paddingTop",
        type: "range",
        description: "Padding Top",
        min: 50,
        max: 300,
        step: 10,
        value: 60
    }, {
        order: 3,
        index: 3,
        name: "colorBy",
        type: "radio",
        description: "Color By",
        options: [{
            value: "category",
            description: "Category"
        }, {
            value: "mean",
            description: "Mean"
        }, {
            value: "none",
            description: "One color"
        }]
    }, {
        order: 4,
        index: 4,
        name: "colorBorder",
        type: "radio",
        description: "Colorize Borders",
        options: [{
            value: "colorize",
            description: "Colorize"
        }, {
            value: "black",
            description: "Black"
        }, {
            value: "white",
            description: "White"
        }]
    }, {
        order: 5,
        index: 5,
        name: "areaOpacity",
        type: "range",
        description: "Area Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 80
    }, {
        order: 6,
        index: 6,
        name: "borderWidth",
        type: "range",
        description: "Border Width",
        min: 0,
        max: 10,
        step: 1,
        value: 2
    }, {
        order: 7,
        index: 7,
        name: "borderOpacity",
        type: "range",
        description: "Border Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 8,
        index: 8,
        name: "axisOpacity",
        type: "range",
        description: "Axis Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 1,
        index: 9,
        name: "tick",
        type: "range",
        description: "Tick",
        min: 0,
        max: 500,
        step: 1,
        value: 40
    }, {
        order: 10,
        index: 10,
        name: "colorLabel",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
},
b = {
    name: "chord-diagram",
    isPaid: !0,
    description: "This visualization requires matrix data to work. For example A -> B, B -> A, A -> A and B -> B",
    img: "./img/chord-diagram.jpg",
    minDims: 2,
    requiredDims: ["Source", "Target"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: ["Source", "Target"],
    labelConfig: [],
    tooltipConfig: [{
        name: "node",
        description: "Group Tooltip",
        shortcodes: ["Dimension", "MeasureName", "MeasureValue"]
    }, {
        name: "link",
        description: "Link Tooltip",
        shortcodes: ["SourceName", "TargetName", "MeasureName", "SourceValue", "TargetValue"]
    }],
    extraSettings: [{
        order: 10,
        index: 0,
        name: "colorBy",
        type: "radio",
        description: "Nodes",
        options: [{
            value: "colorize",
            description: "Colorize"
        }, {
            value: "none",
            description: "One color"
        }]
    }, {
        order: 20,
        index: 1,
        name: "colorBorder",
        type: "radio",
        description: "Colorize Borders",
        options: [{
            value: "white",
            description: "White"
        }, {
            value: "black",
            description: "Black"
        }, {
            value: "colorize",
            description: "Colorize"
        }]
    }, {
        order: 2,
        index: 2,
        name: "axis",
        type: "radio",
        description: "Axis",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 3,
        index: 3,
        name: "axisInterval",
        type: "range",
        description: "Axis step size",
        min: 0,
        max: 10,
        step: 1,
        value: 4
    }, {
        order: 4,
        index: 4,
        name: "linkOpacity",
        type: "range",
        description: "Link Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 60
    }, {
        order: 5,
        index: 5,
        name: "nodeOpacity",
        type: "range",
        description: "Node Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 6,
        index: 6,
        name: "borderWidth",
        type: "range",
        description: "Border Width",
        min: 0,
        max: 10,
        step: 1,
        value: 1
    }, {
        order: 7,
        index: 7,
        name: "borderOpacity",
        type: "range",
        description: "Border Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 8,
        index: 8,
        name: "axisOpacity",
        type: "range",
        description: "Axis Opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 100
    }, {
        order: 9,
        index: 9,
        name: "arcDistance",
        type: "range",
        description: "Arc Distance",
        min: 0,
        max: 100,
        step: 10,
        value: 5
    }, {
        order: 1,
        index: 10,
        name: "colorAxis",
        description: "Axis",
        type: "color",
        previousValue: "textColorAxis",
        value: "#666666"
    }, {
        order: 1,
        index: 11,
        name: "colorLabel",
        description: "Text",
        type: "color",
        previousValue: "textColorAxis",
        value: "#666666"
    }, {
        order: 12,
        index: 12,
        name: "colorLinkBy",
        type: "radio",
        description: "Links",
        options: [{
            value: "none",
            description: "One color"
        }, {
            value: "colorize",
            description: "Colorize"
        }]
    }, {
        order: 13,
        index: 13,
        name: "colorLink",
        description: "Link Color",
        type: "color",
        value: "#dddddd",
        conditions: [{
            name: "colorLinkBy",
            value: "none"
        }]
    }, {
        order: 9,
        index: 14,
        name: "labelOffset",
        type: "range",
        description: "Label offset",
        min: -100,
        max: 100,
        step: 1,
        value: -25
    }, {
        order: 2,
        index: 15,
        name: "labels",
        type: "radio",
        description: "Dimension labels",
        options: [{
            value: "1",
            description: "Enabled"
        }, {
            value: "0",
            description: "Disabled"
        }]
    }, {
        order: 2,
        index: 16,
        name: "nodeWidth",
        type: "range",
        description: "Node Width",
        min: 0,
        max: 50,
        step: 1,
        value: 10
    }, {
        order: 11,
        index: 17,
        name: "colorNode",
        description: "Node color",
        type: "color",
        value: "#4E79A7",
        conditions: [{
            name: "colorBy",
            value: "none"
        }]
    }, {
        order: 13,
        index: 18,
        name: "colorbySt",
        type: "radio",
        description: "Color links by",
        options: [{
            value: "source",
            description: "Source"
        }, {
            value: "target",
            description: "Target"
        }],
        conditions: [{
            name: "colorLinkBy",
            value: "colorize"
        }]
    }]
},
f = {
    name: "waterfall-chart",
    description: "The waterfall chart shows a running total as values are added or subtracted. It's useful for understanding how an initial value (for example, net income) is affected by a series of positive and negative values. You can use 1 measure or multiple measures using measure names/values",
    isPaid: !0,
    img: "./img/waterfall.png",
    minDims: 1,
    requiredDims: ["Category", "X axis"],
    optional: [],
    requiredMeasures: ["measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [{
        name: "node",
        description: "Node Label",
        shortcodes: ["MeasureValue", "DimensionValue"]
    }],
    enableLegend: !1,
    tooltipConfig: [{
        name: "node",
        description: "Bar Tooltip",
        shortcodes: ["MeasureValue", "DimensionName", "Start", "End"]
    }, {
        name: "total",
        description: "Totals Tooltip",
        shortcodes: ["MeasureValue", "DimensionName"]
    }],
    extraSettings: [{
        order: 0,
        index: 0,
        name: "firstRowIsTotal",
        type: "radio",
        description: "Aggregate first category to a total",
        options: [{
            value: "1",
            description: "Yes, aggregate the first category in a total and hide the underlying values"
        }, {
            value: "0",
            description: "No, show all values with a seperate total."
        }]
    }, {
        order: 1,
        index: 1,
        name: "cumulativeValues",
        type: "radio",
        description: "Show cumulative values",
        options: [{
            value: "1",
            description: "Yes, the totals should accumulate and the bars in between should show absolute values"
        }, {
            value: "0",
            description: "No, the totals should show the value and the bars in between should show the difference compared to the same value in previous category"
        }]
    }, {
        order: 2,
        index: 2,
        name: "totals",
        type: "radio",
        description: "Options for totals",
        options: [{
            value: "all",
            description: "Show total at the end of every category"
        }, {
            value: "none",
            description: "No, show no totals"
        }, {
            value: "contains",
            description: '(Only for Measure Names / Measure Values) A measure is a total when the measure name contains "total"'
        }]
    }, {
        order: 3,
        index: 3,
        name: "showLabels",
        type: "radio",
        description: "Show Labels",
        options: [{
            value: "1",
            description: "Show"
        }, {
            value: "0",
            description: "Hide"
        }]
    }, {
        order: 4,
        index: 4,
        name: "showXHeader",
        type: "radio",
        description: "Show X Axis",
        options: [{
            value: "1",
            description: "Show"
        }, {
            value: "0",
            description: "Hide"
        }]
    }, {
        order: 5,
        index: 5,
        name: "showYHeader",
        type: "radio",
        description: "Show Y Axis",
        options: [{
            value: "1",
            description: "Show"
        }, {
            value: "0",
            description: "Hide"
        }]
    }, {
        order: 6,
        index: 6,
        name: "showGrowthPerc",
        type: "radio",
        description: "Show Growth Percentages",
        options: [{
            value: "1",
            description: "Show"
        }, {
            value: "0",
            description: "Hide"
        }]
    }, {
        order: 7,
        index: 7,
        name: "xAxisRotateLabel",
        type: "range",
        description: "Rotate X-axis Label",
        min: 0,
        max: 90,
        step: 1,
        value: 15
    }, {
        order: 8,
        index: 8,
        name: "xAxisPadding",
        type: "range",
        description: "X-Axis spacing",
        min: 0,
        max: 250,
        step: 1,
        value: 40
    }, {
        order: 9,
        index: 9,
        name: "yAxisPadding",
        type: "range",
        description: "Y-Axis spacing",
        min: 0,
        max: 250,
        step: 1,
        value: 80
    }, {
        order: 2,
        index: 10,
        name: "Y-Min",
        type: "range",
        description: "Y-Axis Min (%) - if set, the minimum value of the y axis will be set from the specified percentage of the first category (first bar in the chart).",
        min: 1,
        max: 100,
        step: 1,
        value: 0
    }, {
        order: 11,
        index: 11,
        name: "colorAxisText",
        description: "Axis label",
        type: "color",
        previousValue: "textColorHeader",
        value: "#666666"
    }, {
        order: 12,
        index: 12,
        name: "colorAxis",
        description: "Axis",
        type: "color",
        value: "#666666"
    }, {
        order: 13,
        index: 13,
        name: "colorPositive",
        description: "Positive Value",
        type: "color",
        value: "#55aa00"
    }, {
        order: 14,
        index: 14,
        name: "colorNegative",
        description: "Negative Value",
        type: "color",
        value: "#e12424"
    }, {
        order: 15,
        index: 15,
        name: "colorTotal",
        description: "Total Value",
        type: "color",
        value: "#00557f"
    }]
},
N = {
    name: "geo-sankey",
    isPaid: !0,
    description: "A Geo Sankey Diagram is a visualisation technique that allows to display flows spatially.",
    img: "./img/geo-sankey.png",
    minDims: 6,
    requiredDims: ["Source", "Source latitude", "Source longitude", "Target", "Target latitude", "Target longitude"],
    optional: [],
    requiredMeasures: ["Measure"],
    requiredParameters: [],
    actionDimensions: [],
    labelConfig: [{
        name: "node",
        enabled: !1,
        description: "Node label",
        shortcodes: ["Custom labels are not available at this moment for spatial sankey"]
    }, {
        name: "fromLink",
        enabled: !1,
        description: "Node value",
        shortcodes: ["Custom labels are not available at this moment for spatial sankey"]
    }],
    tooltipConfig: [],
    extraSettings: [{
        id: 0,
        index: 0,
        name: "colorMode",
        type: "radio",
        description: "Color links by",
        options: [{
            value: "value",
            description: "Similar values have similar color"
        }, {
            value: "oneColor",
            description: "All links have same color"
        }, {
            value: "diverging",
            description: "Diverging color scheme"
        }, {
            value: "inputOutput",
            description: "Custom input output color scheme"
        }]
    }, {
        id: 1,
        index: 1,
        name: "linkWidth",
        type: "range",
        description: "Maximum link width",
        min: 0,
        max: 300,
        step: 1,
        value: 100
    }, {
        id: 2,
        index: 2,
        name: "maxNodeRadius",
        type: "range",
        description: "Maximum node radius",
        min: 1,
        max: 100,
        step: 1,
        value: 50
    }, {
        id: 3,
        index: 3,
        name: "nodeLinkSpace",
        type: "range",
        description: "Horizontal node Padding (currently not available)",
        min: 0,
        max: 40,
        step: 1,
        value: 10
    }, {
        id: 4,
        index: 4,
        name: "linkOpacity",
        type: "range",
        description: "Link opacity (%)",
        min: 0,
        max: 100,
        step: 10,
        value: 50
    }, {
        id: 5,
        index: 5,
        name: "nodeOpacity",
        type: "range",
        description: "Node opacity (%)",
        min: 1,
        max: 100,
        step: 10,
        value: 100
    }, {
        id: 6,
        index: 6,
        name: "Labels",
        type: "radio",
        description: "Node border",
        options: [{
            value: "1",
            description: "enabled"
        }, {
            value: "0",
            description: "disabled"
        }]
    }, {
        id: 7,
        index: 7,
        name: "zoomLevel",
        type: "range",
        description: "Zoom level",
        min: 0,
        max: 15,
        step: 1,
        value: 5
    }, {
        id: 8,
        index: 8,
        name: "path",
        type: "radio",
        description: "Show paths",
        options: [{
            value: "1",
            description: "Always"
        }, {
            value: "0",
            description: "Only on click"
        }]
    }, {
        order: 1,
        index: 9,
        name: "colorText",
        description: "Text",
        type: "color",
        previousValue: "textColor",
        value: "#666666"
    }]
};

function e(o) {
return o.join(`
`)
}
const L = {
"network-diagram": {
    link: e(["<SourceName> to <TargetName>", "<MeasureName>: <MeasureValue>"]),
    node: `Node: <Name>
<Dimension>: <Group>`
},
"network-diagram-2.0": {
    link: e(["<SourceName> to <TargetName>", "<MeasureName>: <MeasureValue>"]),
    node: `Node: <Name>
<Dimension>: <Group>
<MeasureName>: <Value>`
},
"sankey-diagram": {
    link: e(["<MeasureName>: <MeasureValue>", "<PercentOfSource> of <SourceName> to <PercentOfTarget> of <TargetName>"]),
    node: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"source-target-sankey": {
    link: e(["<MeasureName>: <MeasureValue>", "<PercentOfSource> of <SourceName> to <PercentOfTarget> of <TargetName>"]),
    node: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"circular-sankey": {
    link: e(["<MeasureName>: <MeasureValue>", "<PercentOfSource> of <SourceName> to <PercentOfTarget> of <TargetName>"]),
    node: e(["<DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"geo-sankey": {
    link: e(["<MeasureName>: <MeasureValue>", "<PercentOfSource> of <SourceName> to <PercentOfTarget> of <TargetName>"]),
    node: e(["<DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
calendar: {
    date: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
orgchart: {
    node: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"radar-chart": {
    node: e(["<DimensionName>: <DimensionValue>", "<AxisName>: <AxisValue>", "<MeasureName>: <MeasureValue>"])
},
"horizon-chart": {},
sunburst: {
    node: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"sunburst-new": {
    node: e(["<DimensionName>: <DimensionValue>", "<MeasureName>: <MeasureValue>"])
},
"venn-diagram": {
    node: e(["<DimensionName>: <MeasureValue>"])
},
"waterfall-chart": {
    node: e([`<DimensionName>
From: <Start>
To: <End>
Total: <MeasureValue>`]),
    total: e(["<DimensionName>: <MeasureValue>"])
},
"ridgeline-plot": {
    node: e(["<Category>"])
},
"chord-diagram": {
    node: e(["Group: <Dimension>", "<MeasureName>: <MeasureValue>"]),
    link: e(["<SourceName> to <TargetName>: <SourceValue>", "<TargetName> to <SourceName>: <TargetValue>"])
}
};

function i(o) {
return o.join(`
`)
}
const D = {
"sankey-diagram": {
    fromLink: {
        enabled: 0,
        content: i(["<PercentOfSource>"])
    },
    toLink: {
        enabled: 0,
        content: i(["<PercentOfTarget>"])
    },
    node: {
        enabled: 1,
        content: i(["<DimensionValue>"])
    }
},
"source-target-sankey": {
    fromLink: {
        enabled: 0,
        content: i(["<PercentOfSource>"])
    },
    toLink: {
        enabled: 0,
        content: i(["<PercentOfTarget>"])
    },
    node: {
        enabled: 1,
        content: i(["<DimensionValue>"])
    }
},
"circular-sankey": {
    fromLink: {
        enabled: 0,
        content: i(["<PercentOfSource>"])
    },
    toLink: {
        enabled: 0,
        content: i(["<PercentOfTarget>"])
    },
    node: {
        enabled: 1,
        content: i(["<DimensionValue>"])
    }
},
"geo-sankey": {
    nodeName: {
        enabled: 0,
        content: i(["<MeasureName>"])
    },
    nodeValue: {
        enabled: 1,
        content: i(["<Percentage>"])
    },
    fromLink: {
        enabled: 0,
        content: i(["<PercentOfSource>"])
    },
    toLink: {
        enabled: 0,
        content: i(["<PercentOfTarget>"])
    },
    node: {
        enabled: 1,
        content: i(["<DimensionValue>"])
    }
},
"sunburst-new": {
    node: {
        enabled: 1,
        content: i(["<MeasureValue>", "<DimensionValue>"])
    },
    total: {
        enabled: 1,
        content: i(["<DimensionValue>", "Total"])
    }
},
"waterfall-chart": {
    node: {
        enabled: 0,
        content: i(["<MeasureValue>"])
    }
}
};
var r = ["all"];
const k = [{
    name: "sankey-diagram",
    slug: "smm-sankey",
    value: c
}, {
    name: "waterfall-chart",
    slug: "smm-waterfall",
    value: f
}, {
    name: "source-target-sankey",
    slug: "smm-sankeystream",
    value: m
}, {
    name: "network-diagram-2.0",
    slug: "smm-network2",
    value: l
}, {
    name: "venn-diagram",
    slug: "smm-venn",
    value: y
}, {
    name: "circular-sankey",
    slug: "smm-sankeyCircular",
    value: v
}, {
    name: "radar-chart",
    slug: "smm-radar",
    value: u
}, {
    name: "sunburst-new",
    slug: "smm-sunburstNew",
    value: x
}, {
    name: "chord-diagram",
    slug: "smm-chord",
    value: b
}, {
    name: "sunburst",
    slug: "smm-sunburst",
    value: g
}, {
    name: "geo-sankey",
    slug: "smm-geosankey",
    value: N
}, {
    name: "ridgeline-plot",
    slug: "smm-ridgeline",
    value: h
}, {
    name: "horizon-chart",
    slug: "smm-horizon",
    value: d
}, {
    name: "orgchart",
    slug: "smm-orgchart",
    value: p
}, {
    name: "calendar-chart",
    slug: "smm-calendar",
    value: t
}, {
    name: "network-diagram",
    slug: "smm-network",
    value: s
}],
S = (() => {
    if (r) {
        const o = r,
            a = [];
        for (const n of k) o.includes(n.slug) && a.push(n.value), a.push(n.value);
        return a
    } else return [c, f, N, l, u, y, x, b, g, h, d, v, p, t, s, m]
})();
export {
k as a, D as l, L as t, S as v
};
//# sourceMappingURL=index-BvYcEE5T.js.map