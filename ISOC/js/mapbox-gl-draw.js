! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("fs"), require("path")) : "function" == typeof define && define.amd ? define(["fs", "path"], e) : (t = t || self).MapboxDraw = e(t.fs, t.path)
}(this, (function(t, e) {
    "use strict";
    t = t && t.hasOwnProperty("default") ? t.default : t, e = e && e.hasOwnProperty("default") ? e.default : e;
    var n = function(t, e) {
            var n = {
                    drag: [],
                    click: [],
                    mousemove: [],
                    mousedown: [],
                    mouseup: [],
                    mouseout: [],
                    keydown: [],
                    keyup: [],
                    touchstart: [],
                    touchmove: [],
                    touchend: [],
                    tap: []
                },
                o = {
                    on: function(t, e, o) {
                        if (void 0 === n[t]) throw new Error("Invalid event type: " + t);
                        n[t].push({
                            selector: e,
                            fn: o
                        })
                    },
                    render: function(t) {
                        e.store.featureChanged(t)
                    }
                },
                r = function(t, r) {
                    for (var i = n[t], a = i.length; a--;) {
                        var s = i[a];
                        if (s.selector(r)) {
                            s.fn.call(o, r), e.store.render(), e.ui.updateMapClasses();
                            break
                        }
                    }
                };
            return t.start.call(o), {
                render: t.render,
                stop: function() {
                    t.stop && t.stop()
                },
                trash: function() {
                    t.trash && (t.trash(), e.store.render())
                },
                combineFeatures: function() {
                    t.combineFeatures && t.combineFeatures()
                },
                uncombineFeatures: function() {
                    t.uncombineFeatures && t.uncombineFeatures()
                },
                drag: function(t) {
                    r("drag", t)
                },
                click: function(t) {
                    r("click", t)
                },
                mousemove: function(t) {
                    r("mousemove", t)
                },
                mousedown: function(t) {
                    r("mousedown", t)
                },
                mouseup: function(t) {
                    r("mouseup", t)
                },
                mouseout: function(t) {
                    r("mouseout", t)
                },
                keydown: function(t) {
                    r("keydown", t)
                },
                keyup: function(t) {
                    r("keyup", t)
                },
                touchstart: function(t) {
                    r("touchstart", t)
                },
                touchmove: function(t) {
                    r("touchmove", t)
                },
                touchend: function(t) {
                    r("touchend", t)
                },
                tap: function(t) {
                    r("tap", t)
                }
            }
        },
        o = {
            RADIUS: 6378137,
            FLATTENING: 1 / 298.257223563,
            POLAR_RADIUS: 6356752.3142
        };

    function r(t) {
        var e = 0;
        if (t && t.length > 0) {
            e += Math.abs(i(t[0]));
            for (var n = 1; n < t.length; n++) e -= Math.abs(i(t[n]))
        }
        return e
    }

    function i(t) {
        var e, n, r, i, s, u, c = 0,
            l = t.length;
        if (l > 2) {
            for (u = 0; u < l; u++) u === l - 2 ? (r = l - 2, i = l - 1, s = 0) : u === l - 1 ? (r = l - 1, i = 0, s = 1) : (r = u, i = u + 1, s = u + 2), e = t[r], n = t[i], c += (a(t[s][0]) - a(e[0])) * Math.sin(a(n[1]));
            c = c * o.RADIUS * o.RADIUS / 2
        }
        return c
    }

    function a(t) {
        return t * Math.PI / 180
    }
    var s = {
            geometry: function t(e) {
                var n, o = 0;
                switch (e.type) {
                    case "Polygon":
                        return r(e.coordinates);
                    case "MultiPolygon":
                        for (n = 0; n < e.coordinates.length; n++) o += r(e.coordinates[n]);
                        return o;
                    case "Point":
                    case "MultiPoint":
                    case "LineString":
                    case "MultiLineString":
                        return 0;
                    case "GeometryCollection":
                        for (n = 0; n < e.geometries.length; n++) o += t(e.geometries[n]);
                        return o
                }
            },
            ring: i
        },
        u = {
            CONTROL_BASE: "mapboxgl-ctrl",
            CONTROL_PREFIX: "mapboxgl-ctrl-",
            CONTROL_BUTTON: "mapbox-gl-draw_ctrl-draw-btn",
            CONTROL_BUTTON_LINE: "mapbox-gl-draw_line",
            CONTROL_BUTTON_POLYGON: "mapbox-gl-draw_polygon",
            CONTROL_BUTTON_POINT: "mapbox-gl-draw_point",
            CONTROL_BUTTON_TRASH: "mapbox-gl-draw_trash",
            CONTROL_BUTTON_COMBINE_FEATURES: "mapbox-gl-draw_combine",
            CONTROL_BUTTON_UNCOMBINE_FEATURES: "mapbox-gl-draw_uncombine",
            CONTROL_GROUP: "mapboxgl-ctrl-group",
            ATTRIBUTION: "mapboxgl-ctrl-attrib",
            ACTIVE_BUTTON: "active",
            BOX_SELECT: "mapbox-gl-draw_boxselect"
        },
        c = {
            HOT: "mapbox-gl-draw-hot",
            COLD: "mapbox-gl-draw-cold"
        },
        l = {
            ADD: "add",
            MOVE: "move",
            DRAG: "drag",
            POINTER: "pointer",
            NONE: "none"
        },
        h = {
            POLYGON: "polygon",
            LINE: "line_string",
            POINT: "point"
        },
        p = {
            FEATURE: "Feature",
            POLYGON: "Polygon",
            LINE_STRING: "LineString",
            POINT: "Point",
            FEATURE_COLLECTION: "FeatureCollection",
            MULTI_PREFIX: "Multi",
            MULTI_POINT: "MultiPoint",
            MULTI_LINE_STRING: "MultiLineString",
            MULTI_POLYGON: "MultiPolygon"
        },
        d = {
            DRAW_LINE_STRING: "draw_line_string",
            DRAW_POLYGON: "draw_polygon",
            DRAW_POINT: "draw_point",
            SIMPLE_SELECT: "simple_select",
            DIRECT_SELECT: "direct_select",
            STATIC: "static"
        },
        f = {
            CREATE: "draw.create",
            DELETE: "draw.delete",
            UPDATE: "draw.update",
            SELECTION_CHANGE: "draw.selectionchange",
            MODE_CHANGE: "draw.modechange",
            ACTIONABLE: "draw.actionable",
            RENDER: "draw.render",
            COMBINE_FEATURES: "draw.combine",
            UNCOMBINE_FEATURES: "draw.uncombine"
        },
        g = "move",
        y = "change_coordinates",
        m = {
            FEATURE: "feature",
            MIDPOINT: "midpoint",
            VERTEX: "vertex"
        },
        _ = {
            ACTIVE: "true",
            INACTIVE: "false"
        },
        v = ["scrollZoom", "boxZoom", "dragRotate", "dragPan", "keyboard", "doubleClickZoom", "touchZoomRotate"],
        b = -85,
        E = 85,
        S = {
            Point: 0,
            LineString: 1,
            Polygon: 2
        };

    function T(t, e) {
        var n = S[t.geometry.type] - S[e.geometry.type];
        return 0 === n && t.geometry.type === p.POLYGON ? t.area - e.area : n
    }

    function C(t) {
        if (this._items = {}, this._nums = {}, this._length = t ? t.length : 0, t)
            for (var e = 0, n = t.length; e < n; e++) this.add(t[e]), void 0 !== t[e] && ("string" == typeof t[e] ? this._items[t[e]] = e : this._nums[t[e]] = e)
    }
    C.prototype.add = function(t) {
        return this.has(t) ? this : (this._length++, "string" == typeof t ? this._items[t] = this._length : this._nums[t] = this._length, this)
    }, C.prototype.delete = function(t) {
        return !1 === this.has(t) ? this : (this._length--, delete this._items[t], delete this._nums[t], this)
    }, C.prototype.has = function(t) {
        return ("string" == typeof t || "number" == typeof t) && (void 0 !== this._items[t] || void 0 !== this._nums[t])
    }, C.prototype.values = function() {
        var t = this,
            e = [];
        return Object.keys(this._items).forEach((function(n) {
            e.push({
                k: n,
                v: t._items[n]
            })
        })), Object.keys(this._nums).forEach((function(n) {
            e.push({
                k: JSON.parse(n),
                v: t._nums[n]
            })
        })), e.sort((function(t, e) {
            return t.v - e.v
        })).map((function(t) {
            return t.k
        }))
    }, C.prototype.clear = function() {
        return this._length = 0, this._items = {}, this._nums = {}, this
    };
    var O = [m.FEATURE, m.MIDPOINT, m.VERTEX],
        I = {
            click: function(t, e, n) {
                return x(t, e, n, n.options.clickBuffer)
            },
            touch: function(t, e, n) {
                return x(t, e, n, n.options.touchBuffer)
            }
        };

    function x(t, e, n, o) {
        if (null === n.map) return [];
        var r = t ? function(t, e) {
                return void 0 === e && (e = 0), [
                    [t.point.x - e, t.point.y - e],
                    [t.point.x + e, t.point.y + e]
                ]
            }(t, o) : e,
            i = {};
        n.options.styles && (i.layers = n.options.styles.map((function(t) {
            return t.id
        })));
        var a = n.map.queryRenderedFeatures(r, i).filter((function(t) {
                return -1 !== O.indexOf(t.properties.meta)
            })),
            u = new C,
            c = [];
        return a.forEach((function(t) {
                var e = t.properties.id;
                u.has(e) || (u.add(e), c.push(t))
            })),
            function(t) {
                return t.map((function(t) {
                    return t.geometry.type === p.POLYGON && (t.area = s.geometry({
                        type: p.FEATURE,
                        property: {},
                        geometry: t.geometry
                    })), t
                })).sort(T).map((function(t) {
                    return delete t.area, t
                }))
            }(c)
    }

    function L(t, e) {
        var n = I.click(t, null, e),
            o = {
                mouse: l.NONE
            };
        return n[0] && (o.mouse = n[0].properties.active === _.ACTIVE ? l.MOVE : l.POINTER, o.feature = n[0].properties.meta), -1 !== e.events.currentModeName().indexOf("draw") && (o.mouse = l.ADD), e.ui.queueMapClasses(o), e.ui.updateMapClasses(), n[0]
    }

    function M(t, e) {
        var n = t.x - e.x,
            o = t.y - e.y;
        return Math.sqrt(n * n + o * o)
    }
    var N = 4,
        P = 12,
        w = 500;

    function A(t, e, n) {
        void 0 === n && (n = {});
        var o = null != n.fineTolerance ? n.fineTolerance : N,
            r = null != n.grossTolerance ? n.grossTolerance : P,
            i = null != n.interval ? n.interval : w;
        t.point = t.point || e.point, t.time = t.time || e.time;
        var a = M(t.point, e.point);
        return a < o || a < r && e.time - t.time < i
    }
    var F = 25,
        k = 250;

    function R(t, e, n) {
        void 0 === n && (n = {});
        var o = null != n.tolerance ? n.tolerance : F,
            r = null != n.interval ? n.interval : k;
        return t.point = t.point || e.point, t.time = t.time || e.time, M(t.point, e.point) < o && e.time - t.time < r
    }

    function U() {
        throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
    }

    function j(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    var D = j((function(t) {
            var e = t.exports = function(t, n) {
                if (n || (n = 16), void 0 === t && (t = 128), t <= 0) return "0";
                for (var o = Math.log(Math.pow(2, t)) / Math.log(n), r = 2; o === 1 / 0; r *= 2) o = Math.log(Math.pow(2, t / r)) / Math.log(n) * r;
                var i = o - Math.floor(o),
                    a = "";
                for (r = 0; r < Math.floor(o); r++) {
                    a = Math.floor(Math.random() * n).toString(n) + a
                }
                if (i) {
                    var s = Math.pow(n, i);
                    a = Math.floor(Math.random() * s).toString(n) + a
                }
                var u = parseInt(a, n);
                return u !== 1 / 0 && u >= Math.pow(2, t) ? e(t, n) : a
            };
            e.rack = function(t, n, o) {
                var r = function(r) {
                        var a = 0;
                        do {
                            if (a++ > 10) {
                                if (!o) throw new Error("too many ID collisions, use more bits");
                                t += o
                            }
                            var s = e(t, n)
                        } while (Object.hasOwnProperty.call(i, s));
                        return i[s] = r, s
                    },
                    i = r.hats = {};
                return r.get = function(t) {
                    return r.hats[t]
                }, r.set = function(t, e) {
                    return r.hats[t] = e, r
                }, r.bits = t || 128, r.base = n || 16, r
            }
        })),
        V = function(t, e) {
            this.ctx = t, this.properties = e.properties || {}, this.coordinates = e.geometry.coordinates, this.id = e.id || D(), this.type = e.geometry.type
        };
    V.prototype.changed = function() {
        this.ctx.store.featureChanged(this.id)
    }, V.prototype.incomingCoords = function(t) {
        this.setCoordinates(t)
    }, V.prototype.setCoordinates = function(t) {
        this.coordinates = t, this.changed()
    }, V.prototype.getCoordinates = function() {
        return JSON.parse(JSON.stringify(this.coordinates))
    }, V.prototype.setProperty = function(t, e) {
        this.properties[t] = e
    }, V.prototype.toGeoJSON = function() {
        return JSON.parse(JSON.stringify({
            id: this.id,
            type: p.FEATURE,
            properties: this.properties,
            geometry: {
                coordinates: this.getCoordinates(),
                type: this.type
            }
        }))
    }, V.prototype.internal = function(t) {
        var e = {
            id: this.id,
            meta: m.FEATURE,
            "meta:type": this.type,
            active: _.INACTIVE,
            mode: t
        };
        if (this.ctx.options.userProperties)
            for (var n in this.properties) e["user_" + n] = this.properties[n];
        return {
            type: p.FEATURE,
            properties: e,
            geometry: {
                coordinates: this.getCoordinates(),
                type: this.type
            }
        }
    };
    var B = function(t, e) {
        V.call(this, t, e)
    };
    (B.prototype = Object.create(V.prototype)).isValid = function() {
        return "number" == typeof this.coordinates[0] && "number" == typeof this.coordinates[1]
    }, B.prototype.updateCoordinate = function(t, e, n) {
        3 === arguments.length ? this.coordinates = [e, n] : this.coordinates = [t, e], this.changed()
    }, B.prototype.getCoordinate = function() {
        return this.getCoordinates()
    };
    var G = function(t, e) {
        V.call(this, t, e)
    };
    (G.prototype = Object.create(V.prototype)).isValid = function() {
        return this.coordinates.length > 1
    }, G.prototype.addCoordinate = function(t, e, n) {
        this.changed();
        var o = parseInt(t, 10);
        this.coordinates.splice(o, 0, [e, n])
    }, G.prototype.getCoordinate = function(t) {
        var e = parseInt(t, 10);
        return JSON.parse(JSON.stringify(this.coordinates[e]))
    }, G.prototype.removeCoordinate = function(t) {
        this.changed(), this.coordinates.splice(parseInt(t, 10), 1)
    }, G.prototype.updateCoordinate = function(t, e, n) {
        var o = parseInt(t, 10);
        this.coordinates[o] = [e, n], this.changed()
    };
    var $ = function(t, e) {
        V.call(this, t, e), this.coordinates = this.coordinates.map((function(t) {
            return t.slice(0, -1)
        }))
    };
    ($.prototype = Object.create(V.prototype)).isValid = function() {
        return 0 !== this.coordinates.length && this.coordinates.every((function(t) {
            return t.length > 2
        }))
    }, $.prototype.incomingCoords = function(t) {
        this.coordinates = t.map((function(t) {
            return t.slice(0, -1)
        })), this.changed()
    }, $.prototype.setCoordinates = function(t) {
        this.coordinates = t, this.changed()
    }, $.prototype.addCoordinate = function(t, e, n) {
        this.changed();
        var o = t.split(".").map((function(t) {
            return parseInt(t, 10)
        }));
        this.coordinates[o[0]].splice(o[1], 0, [e, n])
    }, $.prototype.removeCoordinate = function(t) {
        this.changed();
        var e = t.split(".").map((function(t) {
                return parseInt(t, 10)
            })),
            n = this.coordinates[e[0]];
        n && (n.splice(e[1], 1), n.length < 3 && this.coordinates.splice(e[0], 1))
    }, $.prototype.getCoordinate = function(t) {
        var e = t.split(".").map((function(t) {
                return parseInt(t, 10)
            })),
            n = this.coordinates[e[0]];
        return JSON.parse(JSON.stringify(n[e[1]]))
    }, $.prototype.getCoordinates = function() {
        return this.coordinates.map((function(t) {
            return t.concat([t[0]])
        }))
    }, $.prototype.updateCoordinate = function(t, e, n) {
        this.changed();
        var o = t.split("."),
            r = parseInt(o[0], 10),
            i = parseInt(o[1], 10);
        void 0 === this.coordinates[r] && (this.coordinates[r] = []), this.coordinates[r][i] = [e, n]
    };
    var J = {
            MultiPoint: B,
            MultiLineString: G,
            MultiPolygon: $
        },
        z = function(t, e, n, o, r) {
            var i = n.split("."),
                a = parseInt(i[0], 10),
                s = i[1] ? i.slice(1).join(".") : null;
            return t[a][e](s, o, r)
        },
        Y = function(t, e) {
            if (V.call(this, t, e), delete this.coordinates, this.model = J[e.geometry.type], void 0 === this.model) throw new TypeError(e.geometry.type + " is not a valid type");
            this.features = this._coordinatesToFeatures(e.geometry.coordinates)
        };

    function q(t) {
        this.map = t.map, this.drawConfig = JSON.parse(JSON.stringify(t.options || {})), this._ctx = t
    }(Y.prototype = Object.create(V.prototype))._coordinatesToFeatures = function(t) {
        var e = this,
            n = this.model.bind(this);
        return t.map((function(t) {
            return new n(e.ctx, {
                id: D(),
                type: p.FEATURE,
                properties: {},
                geometry: {
                    coordinates: t,
                    type: e.type.replace("Multi", "")
                }
            })
        }))
    }, Y.prototype.isValid = function() {
        return this.features.every((function(t) {
            return t.isValid()
        }))
    }, Y.prototype.setCoordinates = function(t) {
        this.features = this._coordinatesToFeatures(t), this.changed()
    }, Y.prototype.getCoordinate = function(t) {
        return z(this.features, "getCoordinate", t)
    }, Y.prototype.getCoordinates = function() {
        return JSON.parse(JSON.stringify(this.features.map((function(t) {
            return t.type === p.POLYGON ? t.getCoordinates() : t.coordinates
        }))))
    }, Y.prototype.updateCoordinate = function(t, e, n) {
        z(this.features, "updateCoordinate", t, e, n), this.changed()
    }, Y.prototype.addCoordinate = function(t, e, n) {
        z(this.features, "addCoordinate", t, e, n), this.changed()
    }, Y.prototype.removeCoordinate = function(t) {
        z(this.features, "removeCoordinate", t), this.changed()
    }, Y.prototype.getFeatures = function() {
        return this.features
    }, q.prototype.setSelected = function(t) {
        return this._ctx.store.setSelected(t)
    }, q.prototype.setSelectedCoordinates = function(t) {
        var e = this;
        this._ctx.store.setSelectedCoordinates(t), t.reduce((function(t, n) {
            return void 0 === t[n.feature_id] && (t[n.feature_id] = !0, e._ctx.store.get(n.feature_id).changed()), t
        }), {})
    }, q.prototype.getSelected = function() {
        return this._ctx.store.getSelected()
    }, q.prototype.getSelectedIds = function() {
        return this._ctx.store.getSelectedIds()
    }, q.prototype.isSelected = function(t) {
        return this._ctx.store.isSelected(t)
    }, q.prototype.getFeature = function(t) {
        return this._ctx.store.get(t)
    }, q.prototype.select = function(t) {
        return this._ctx.store.select(t)
    }, q.prototype.deselect = function(t) {
        return this._ctx.store.deselect(t)
    }, q.prototype.deleteFeature = function(t, e) {
        return void 0 === e && (e = {}), this._ctx.store.delete(t, e)
    }, q.prototype.addFeature = function(t) {
        return this._ctx.store.add(t)
    }, q.prototype.clearSelectedFeatures = function() {
        return this._ctx.store.clearSelected()
    }, q.prototype.clearSelectedCoordinates = function() {
        return this._ctx.store.clearSelectedCoordinates()
    }, q.prototype.setActionableState = function(t) {
        void 0 === t && (t = {});
        var e = {
            trash: t.trash || !1,
            combineFeatures: t.combineFeatures || !1,
            uncombineFeatures: t.uncombineFeatures || !1
        };
        return this._ctx.events.actionable(e)
    }, q.prototype.changeMode = function(t, e, n) {
        return void 0 === e && (e = {}), void 0 === n && (n = {}), this._ctx.events.changeMode(t, e, n)
    }, q.prototype.updateUIClasses = function(t) {
        return this._ctx.ui.queueMapClasses(t)
    }, q.prototype.activateUIButton = function(t) {
        return this._ctx.ui.setActiveButton(t)
    }, q.prototype.featuresAt = function(t, e, n) {
        if (void 0 === n && (n = "click"), "click" !== n && "touch" !== n) throw new Error("invalid buffer type");
        return I[n](t, e, this._ctx)
    }, q.prototype.newFeature = function(t) {
        var e = t.geometry.type;
        return e === p.POINT ? new B(this._ctx, t) : e === p.LINE_STRING ? new G(this._ctx, t) : e === p.POLYGON ? new $(this._ctx, t) : new Y(this._ctx, t)
    }, q.prototype.isInstanceOf = function(t, e) {
        if (t === p.POINT) return e instanceof B;
        if (t === p.LINE_STRING) return e instanceof G;
        if (t === p.POLYGON) return e instanceof $;
        if ("MultiFeature" === t) return e instanceof Y;
        throw new Error("Unknown feature class: " + t)
    }, q.prototype.doRender = function(t) {
        return this._ctx.store.featureChanged(t)
    }, q.prototype.onSetup = function() {}, q.prototype.onDrag = function() {}, q.prototype.onClick = function() {}, q.prototype.onMouseMove = function() {}, q.prototype.onMouseDown = function() {}, q.prototype.onMouseUp = function() {}, q.prototype.onMouseOut = function() {}, q.prototype.onKeyUp = function() {}, q.prototype.onKeyDown = function() {}, q.prototype.onTouchStart = function() {}, q.prototype.onTouchMove = function() {}, q.prototype.onTouchEnd = function() {}, q.prototype.onTap = function() {}, q.prototype.onStop = function() {}, q.prototype.onTrash = function() {}, q.prototype.onCombineFeature = function() {}, q.prototype.onUncombineFeature = function() {}, q.prototype.toDisplayFeatures = function() {
        throw new Error("You must overwrite toDisplayFeatures")
    };
    var W = {
            drag: "onDrag",
            click: "onClick",
            mousemove: "onMouseMove",
            mousedown: "onMouseDown",
            mouseup: "onMouseUp",
            mouseout: "onMouseOut",
            keyup: "onKeyUp",
            keydown: "onKeyDown",
            touchstart: "onTouchStart",
            touchmove: "onTouchMove",
            touchend: "onTouchEnd",
            tap: "onTap"
        },
        H = Object.keys(W);

    function X(t) {
        var e = Object.keys(t);
        return function(n, o) {
            void 0 === o && (o = {});
            var r = {},
                i = e.reduce((function(e, n) {
                    return e[n] = t[n], e
                }), new q(n));
            return {
                start: function() {
                    var e = this;
                    r = i.onSetup(o), H.forEach((function(n) {
                        var o, a = W[n],
                            s = function() {
                                return !1
                            };
                        t[a] && (s = function() {
                            return !0
                        }), e.on(n, s, (o = a, function(t) {
                            i[o](r, t)
                        }))
                    }))
                },
                stop: function() {
                    i.onStop(r)
                },
                trash: function() {
                    i.onTrash(r)
                },
                combineFeatures: function() {
                    i.onCombineFeatures(r)
                },
                uncombineFeatures: function() {
                    i.onUncombineFeatures(r)
                },
                render: function(t, e) {
                    i.toDisplayFeatures(r, t, e)
                }
            }
        }
    }

    function Z(t) {
        return [].concat(t).filter((function(t) {
            return void 0 !== t
        }))
    }

    function K() {
        var t = this;
        if (!(t.ctx.map && void 0 !== t.ctx.map.getSource(c.HOT))) return u();
        var e = t.ctx.events.currentModeName();
        t.ctx.ui.queueMapClasses({
            mode: e
        });
        var n = [],
            o = [];
        t.isDirty ? o = t.getAllIds() : (n = t.getChangedIds().filter((function(e) {
            return void 0 !== t.get(e)
        })), o = t.sources.hot.filter((function(e) {
            return e.properties.id && -1 === n.indexOf(e.properties.id) && void 0 !== t.get(e.properties.id)
        })).map((function(t) {
            return t.properties.id
        }))), t.sources.hot = [];
        var r = t.sources.cold.length;
        t.sources.cold = t.isDirty ? [] : t.sources.cold.filter((function(t) {
            var e = t.properties.id || t.properties.parent;
            return -1 === n.indexOf(e)
        }));
        var i = r !== t.sources.cold.length || o.length > 0;

        function a(n, o) {
            var r = t.get(n).internal(e);
            t.ctx.events.currentModeRender(r, (function(e) {
                t.sources[o].push(e)
            }))
        }
        if (n.forEach((function(t) {
                return a(t, "hot")
            })), o.forEach((function(t) {
                return a(t, "cold")
            })), i && t.ctx.map.getSource(c.COLD).setData({
                type: p.FEATURE_COLLECTION,
                features: t.sources.cold
            }), t.ctx.map.getSource(c.HOT).setData({
                type: p.FEATURE_COLLECTION,
                features: t.sources.hot
            }), t._emitSelectionChange && (t.ctx.map.fire(f.SELECTION_CHANGE, {
                features: t.getSelected().map((function(t) {
                    return t.toGeoJSON()
                })),
                points: t.getSelectedCoordinates().map((function(t) {
                    return {
                        type: p.FEATURE,
                        properties: {},
                        geometry: {
                            type: p.POINT,
                            coordinates: t.coordinates
                        }
                    }
                }))
            }), t._emitSelectionChange = !1), t._deletedFeaturesToEmit.length) {
            var s = t._deletedFeaturesToEmit.map((function(t) {
                return t.toGeoJSON()
            }));
            t._deletedFeaturesToEmit = [], t.ctx.map.fire(f.DELETE, {
                features: s
            })
        }

        function u() {
            t.isDirty = !1, t.clearChangedIds()
        }
        u(), t.ctx.map.fire(f.RENDER, {})
    }

    function Q(t) {
        var e, n = this;
        this._features = {}, this._featureIds = new C, this._selectedFeatureIds = new C, this._selectedCoordinates = [], this._changedFeatureIds = new C, this._deletedFeaturesToEmit = [], this._emitSelectionChange = !1, this._mapInitialConfig = {}, this.ctx = t, this.sources = {
            hot: [],
            cold: []
        }, this.render = function() {
            e || (e = requestAnimationFrame((function() {
                e = null, K.call(n)
            })))
        }, this.isDirty = !1
    }

    function tt(t, e) {
        var n = t._selectedCoordinates.filter((function(e) {
            return t._selectedFeatureIds.has(e.feature_id)
        }));
        t._selectedCoordinates.length === n.length || e.silent || (t._emitSelectionChange = !0), t._selectedCoordinates = n
    }
    Q.prototype.createRenderBatch = function() {
        var t = this,
            e = this.render,
            n = 0;
        return this.render = function() {
                n++
            },
            function() {
                t.render = e, n > 0 && t.render()
            }
    }, Q.prototype.setDirty = function() {
        return this.isDirty = !0, this
    }, Q.prototype.featureChanged = function(t) {
        return this._changedFeatureIds.add(t), this
    }, Q.prototype.getChangedIds = function() {
        return this._changedFeatureIds.values()
    }, Q.prototype.clearChangedIds = function() {
        return this._changedFeatureIds.clear(), this
    }, Q.prototype.getAllIds = function() {
        return this._featureIds.values()
    }, Q.prototype.add = function(t) {
        return this.featureChanged(t.id), this._features[t.id] = t, this._featureIds.add(t.id), this
    }, Q.prototype.delete = function(t, e) {
        var n = this;
        return void 0 === e && (e = {}), Z(t).forEach((function(t) {
            n._featureIds.has(t) && (n._featureIds.delete(t), n._selectedFeatureIds.delete(t), e.silent || -1 === n._deletedFeaturesToEmit.indexOf(n._features[t]) && n._deletedFeaturesToEmit.push(n._features[t]), delete n._features[t], n.isDirty = !0)
        })), tt(this, e), this
    }, Q.prototype.get = function(t) {
        return this._features[t]
    }, Q.prototype.getAll = function() {
        var t = this;
        return Object.keys(this._features).map((function(e) {
            return t._features[e]
        }))
    }, Q.prototype.select = function(t, e) {
        var n = this;
        return void 0 === e && (e = {}), Z(t).forEach((function(t) {
            n._selectedFeatureIds.has(t) || (n._selectedFeatureIds.add(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0))
        })), this
    }, Q.prototype.deselect = function(t, e) {
        var n = this;
        return void 0 === e && (e = {}), Z(t).forEach((function(t) {
            n._selectedFeatureIds.has(t) && (n._selectedFeatureIds.delete(t), n._changedFeatureIds.add(t), e.silent || (n._emitSelectionChange = !0))
        })), tt(this, e), this
    }, Q.prototype.clearSelected = function(t) {
        return void 0 === t && (t = {}), this.deselect(this._selectedFeatureIds.values(), {
            silent: t.silent
        }), this
    }, Q.prototype.setSelected = function(t, e) {
        var n = this;
        return void 0 === e && (e = {}), t = Z(t), this.deselect(this._selectedFeatureIds.values().filter((function(e) {
            return -1 === t.indexOf(e)
        })), {
            silent: e.silent
        }), this.select(t.filter((function(t) {
            return !n._selectedFeatureIds.has(t)
        })), {
            silent: e.silent
        }), this
    }, Q.prototype.setSelectedCoordinates = function(t) {
        return this._selectedCoordinates = t, this._emitSelectionChange = !0, this
    }, Q.prototype.clearSelectedCoordinates = function() {
        return this._selectedCoordinates = [], this._emitSelectionChange = !0, this
    }, Q.prototype.getSelectedIds = function() {
        return this._selectedFeatureIds.values()
    }, Q.prototype.getSelected = function() {
        var t = this;
        return this._selectedFeatureIds.values().map((function(e) {
            return t.get(e)
        }))
    }, Q.prototype.getSelectedCoordinates = function() {
        var t = this;
        return this._selectedCoordinates.map((function(e) {
            return {
                coordinates: t.get(e.feature_id).getCoordinate(e.coord_path)
            }
        }))
    }, Q.prototype.isSelected = function(t) {
        return this._selectedFeatureIds.has(t)
    }, Q.prototype.setFeatureProperty = function(t, e, n) {
        this.get(t).setProperty(e, n), this.featureChanged(t)
    }, Q.prototype.storeMapConfig = function() {
        var t = this;
        v.forEach((function(e) {
            t.ctx.map[e] && (t._mapInitialConfig[e] = t.ctx.map[e].isEnabled())
        }))
    }, Q.prototype.restoreMapConfig = function() {
        var t = this;
        Object.keys(this._mapInitialConfig).forEach((function(e) {
            t._mapInitialConfig[e] ? t.ctx.map[e].enable() : t.ctx.map[e].disable()
        }))
    }, Q.prototype.getInitialConfigValue = function(t) {
        return void 0 === this._mapInitialConfig[t] || this._mapInitialConfig[t]
    };
    var et = function() {
            for (var t = arguments, e = {}, n = 0; n < arguments.length; n++) {
                var o = t[n];
                for (var r in o) nt.call(o, r) && (e[r] = o[r])
            }
            return e
        },
        nt = Object.prototype.hasOwnProperty;
    var ot = ["mode", "feature", "mouse"];

    function rt(t) {
        var e = null,
            o = null,
            r = {
                onRemove: function() {
                    return t.map.off("load", r.connect), clearInterval(o), r.removeLayers(), t.store.restoreMapConfig(), t.ui.removeButtons(), t.events.removeEventListeners(), t.ui.clearMapClasses(), t.map = null, t.container = null, t.store = null, e && e.parentNode && e.parentNode.removeChild(e), e = null, this
                },
                connect: function() {
                    t.map.off("load", r.connect), clearInterval(o), r.addLayers(), t.store.storeMapConfig(), t.events.addEventListeners()
                },
                onAdd: function(i) {
                    var a = i.fire;
                    return i.fire = function(t, e) {
                        var n = arguments;
                        return 1 === a.length && 1 !== arguments.length && (n = [et({}, {
                            type: t
                        }, e)]), a.apply(i, n)
                    }, t.map = i, t.events = function(t) {
                        var e = Object.keys(t.options.modes).reduce((function(e, n) {
                                return e[n] = X(t.options.modes[n]), e
                            }), {}),
                            o = {},
                            r = {},
                            i = {},
                            a = null,
                            s = null;
                        i.drag = function(e, n) {
                            n({
                                point: e.point,
                                time: (new Date).getTime()
                            }) ? (t.ui.queueMapClasses({
                                mouse: l.DRAG
                            }), s.drag(e)) : e.originalEvent.stopPropagation()
                        }, i.mousedrag = function(t) {
                            i.drag(t, (function(t) {
                                return !A(o, t)
                            }))
                        }, i.touchdrag = function(t) {
                            i.drag(t, (function(t) {
                                return !R(r, t)
                            }))
                        }, i.mousemove = function(e) {
                            if (1 === (void 0 !== e.originalEvent.buttons ? e.originalEvent.buttons : e.originalEvent.which)) return i.mousedrag(e);
                            var n = L(e, t);
                            e.featureTarget = n, s.mousemove(e)
                        }, i.mousedown = function(e) {
                            o = {
                                time: (new Date).getTime(),
                                point: e.point
                            };
                            var n = L(e, t);
                            e.featureTarget = n, s.mousedown(e)
                        }, i.mouseup = function(e) {
                            var n = L(e, t);
                            e.featureTarget = n, A(o, {
                                point: e.point,
                                time: (new Date).getTime()
                            }) ? s.click(e) : s.mouseup(e)
                        }, i.mouseout = function(t) {
                            s.mouseout(t)
                        }, i.touchstart = function(e) {
                            if (e.originalEvent, t.options.touchEnabled) {
                                r = {
                                    time: (new Date).getTime(),
                                    point: e.point
                                };
                                var n = I.touch(e, null, t)[0];
                                e.featureTarget = n, s.touchstart(e)
                            }
                        }, i.touchmove = function(e) {
                            if (e.originalEvent, t.options.touchEnabled) return s.touchmove(e), i.touchdrag(e)
                        }, i.touchend = function(e) {
                            if (e.originalEvent, t.options.touchEnabled) {
                                var n = I.touch(e, null, t)[0];
                                e.featureTarget = n, R(r, {
                                    time: (new Date).getTime(),
                                    point: e.point
                                }) ? s.tap(e) : s.touchend(e)
                            }
                        };
                        var u = function(t) {
                            return !(8 === t || 46 === t || t >= 48 && t <= 57)
                        };

                        function c(o, r, i) {
                            void 0 === i && (i = {}), s.stop();
                            var u = e[o];
                            if (void 0 === u) throw new Error(o + " is not valid");
                            a = o;
                            var c = u(t, r);
                            s = n(c, t), i.silent || t.map.fire(f.MODE_CHANGE, {
                                mode: o
                            }), t.store.setDirty(), t.store.render()
                        }
                        i.keydown = function(e) {
                            "mapboxgl-canvas" === (e.srcElement || e.target).classList[0] && (8 !== e.keyCode && 46 !== e.keyCode || !t.options.controls.trash ? u(e.keyCode) ? s.keydown(e) : 49 === e.keyCode && t.options.controls.point ? c(d.DRAW_POINT) : 50 === e.keyCode && t.options.controls.line_string ? c(d.DRAW_LINE_STRING) : 51 === e.keyCode && t.options.controls.polygon && c(d.DRAW_POLYGON) : (e.preventDefault(), s.trash()))
                        }, i.keyup = function(t) {
                            u(t.keyCode) && s.keyup(t)
                        }, i.zoomend = function() {
                            t.store.changeZoom()
                        }, i.data = function(e) {
                            if ("style" === e.dataType) {
                                var n = t.setup,
                                    o = t.map,
                                    r = t.options,
                                    i = t.store;
                                r.styles.some((function(t) {
                                    return o.getLayer(t.id)
                                })) || (n.addLayers(), i.setDirty(), i.render())
                            }
                        };
                        var h = {
                            trash: !1,
                            combineFeatures: !1,
                            uncombineFeatures: !1
                        };
                        return {
                            start: function() {
                                a = t.options.defaultMode, s = n(e[a](t), t)
                            },
                            changeMode: c,
                            actionable: function(e) {
                                var n = !1;
                                Object.keys(e).forEach((function(t) {
                                    if (void 0 === h[t]) throw new Error("Invalid action type");
                                    h[t] !== e[t] && (n = !0), h[t] = e[t]
                                })), n && t.map.fire(f.ACTIONABLE, {
                                    actions: h
                                })
                            },
                            currentModeName: function() {
                                return a
                            },
                            currentModeRender: function(t, e) {
                                return s.render(t, e)
                            },
                            fire: function(t, e) {
                                i[t] && i[t](e)
                            },
                            addEventListeners: function() {
                                t.map.on("mousemove", i.mousemove), t.map.on("mousedown", i.mousedown), t.map.on("mouseup", i.mouseup), t.map.on("data", i.data), t.map.on("touchmove", i.touchmove), t.map.on("touchstart", i.touchstart), t.map.on("touchend", i.touchend), t.container.addEventListener("mouseout", i.mouseout), t.options.keybindings && (t.container.addEventListener("keydown", i.keydown), t.container.addEventListener("keyup", i.keyup))
                            },
                            removeEventListeners: function() {
                                t.map.off("mousemove", i.mousemove), t.map.off("mousedown", i.mousedown), t.map.off("mouseup", i.mouseup), t.map.off("data", i.data), t.map.off("touchmove", i.touchmove), t.map.off("touchstart", i.touchstart), t.map.off("touchend", i.touchend), t.container.removeEventListener("mouseout", i.mouseout), t.options.keybindings && (t.container.removeEventListener("keydown", i.keydown), t.container.removeEventListener("keyup", i.keyup))
                            },
                            trash: function(t) {
                                s.trash(t)
                            },
                            combineFeatures: function() {
                                s.combineFeatures()
                            },
                            uncombineFeatures: function() {
                                s.uncombineFeatures()
                            },
                            getMode: function() {
                                return a
                            }
                        }
                    }(t), t.ui = function(t) {
                        var e = {},
                            n = null,
                            o = {
                                mode: null,
                                feature: null,
                                mouse: null
                            },
                            r = {
                                mode: null,
                                feature: null,
                                mouse: null
                            };

                        function i(t) {
                            r = et(r, t)
                        }

                        function a() {
                            var e, n;
                            if (t.container) {
                                var i = [],
                                    a = [];
                                ot.forEach((function(t) {
                                    r[t] !== o[t] && (i.push(t + "-" + o[t]), null !== r[t] && a.push(t + "-" + r[t]))
                                })), i.length > 0 && (e = t.container.classList).remove.apply(e, i), a.length > 0 && (n = t.container.classList).add.apply(n, a), o = et(o, r)
                            }
                        }

                        function s(t, e) {
                            void 0 === e && (e = {});
                            var o = document.createElement("button");
                            return o.className = u.CONTROL_BUTTON + " " + e.className, o.setAttribute("title", e.title), e.container.appendChild(o), o.addEventListener("click", (function(o) {
                                if (o.preventDefault(), o.stopPropagation(), o.target === n) return c(), void e.onDeactivate();
                                l(t), e.onActivate()
                            }), !0), o
                        }

                        function c() {
                            n && (n.classList.remove(u.ACTIVE_BUTTON), n = null)
                        }

                        function l(t) {
                            c();
                            var o = e[t];
                            o && o && "trash" !== t && (o.classList.add(u.ACTIVE_BUTTON), n = o)
                        }
                        return {
                            setActiveButton: l,
                            queueMapClasses: i,
                            updateMapClasses: a,
                            clearMapClasses: function() {
                                i({
                                    mode: null,
                                    feature: null,
                                    mouse: null
                                }), a()
                            },
                            addButtons: function() {
                                var n = t.options.controls,
                                    o = document.createElement("div");
                                return o.className = u.CONTROL_GROUP + " " + u.CONTROL_BASE, n ? (n[h.LINE] && (e[h.LINE] = s(h.LINE, {
                                    container: o,
                                    className: u.CONTROL_BUTTON_LINE,
                                    title: "LineString tool " + (t.options.keybindings ? "(l)" : ""),
                                    onActivate: function() {
                                        return t.events.changeMode(d.DRAW_LINE_STRING)
                                    },
                                    onDeactivate: function() {
                                        return t.events.trash()
                                    }
                                })), n[h.POLYGON] && (e[h.POLYGON] = s(h.POLYGON, {
                                    container: o,
                                    className: u.CONTROL_BUTTON_POLYGON,
                                    title: "Polygon tool " + (t.options.keybindings ? "(p)" : ""),
                                    onActivate: function() {
                                        return t.events.changeMode(d.DRAW_POLYGON)
                                    },
                                    onDeactivate: function() {
                                        return t.events.trash()
                                    }
                                })), n[h.POINT] && (e[h.POINT] = s(h.POINT, {
                                    container: o,
                                    className: u.CONTROL_BUTTON_POINT,
                                    title: "Marker tool " + (t.options.keybindings ? "(m)" : ""),
                                    onActivate: function() {
                                        return t.events.changeMode(d.DRAW_POINT)
                                    },
                                    onDeactivate: function() {
                                        return t.events.trash()
                                    }
                                })), n.trash && (e.trash = s("trash", {
                                    container: o,
                                    className: u.CONTROL_BUTTON_TRASH,
                                    title: "Delete",
                                    onActivate: function() {
                                        t.events.trash()
                                    }
                                })), n.combine_features && (e.combine_features = s("combineFeatures", {
                                    container: o,
                                    className: u.CONTROL_BUTTON_COMBINE_FEATURES,
                                    title: "Combine",
                                    onActivate: function() {
                                        t.events.combineFeatures()
                                    }
                                })), n.uncombine_features && (e.uncombine_features = s("uncombineFeatures", {
                                    container: o,
                                    className: u.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                                    title: "Uncombine",
                                    onActivate: function() {
                                        t.events.uncombineFeatures()
                                    }
                                })), o) : o
                            },
                            removeButtons: function() {
                                Object.keys(e).forEach((function(t) {
                                    var n = e[t];
                                    n.parentNode && n.parentNode.removeChild(n), delete e[t]
                                }))
                            }
                        }
                    }(t), t.container = i.getContainer(), t.store = new Q(t), e = t.ui.addButtons(), t.options.boxSelect && (i.boxZoom.disable(), i.dragPan.disable(), i.dragPan.enable()), i.loaded() ? r.connect() : (i.on("load", r.connect), o = setInterval((function() {
                        i.loaded() && r.connect()
                    }), 16)), t.events.start(), e
                },
                addLayers: function() {
                    t.map.addSource(c.COLD, {
                        data: {
                            type: p.FEATURE_COLLECTION,
                            features: []
                        },
                        type: "geojson"
                    }), t.map.addSource(c.HOT, {
                        data: {
                            type: p.FEATURE_COLLECTION,
                            features: []
                        },
                        type: "geojson"
                    }), t.options.styles.forEach((function(e) {
                        t.map.addLayer(e)
                    })), t.store.setDirty(!0), t.store.render()
                },
                removeLayers: function() {
                    t.options.styles.forEach((function(e) {
                        t.map.getLayer(e.id) && t.map.removeLayer(e.id)
                    })), t.map.getSource(c.COLD) && t.map.removeSource(c.COLD), t.map.getSource(c.HOT) && t.map.removeSource(c.HOT)
                }
            };
        return t.setup = r, r
    }

    function it(t) {
        return function(e) {
            var n = e.featureTarget;
            return !!n && (!!n.properties && n.properties.meta === t)
        }
    }

    function at(t) {
        return !!t.featureTarget && (!!t.featureTarget.properties && (t.featureTarget.properties.active === _.ACTIVE && t.featureTarget.properties.meta === m.FEATURE))
    }

    function st(t) {
        return !!t.featureTarget && (!!t.featureTarget.properties && (t.featureTarget.properties.active === _.INACTIVE && t.featureTarget.properties.meta === m.FEATURE))
    }

    function ut(t) {
        return void 0 === t.featureTarget
    }

    function ct(t) {
        var e = t.featureTarget;
        return !!e && (!!e.properties && e.properties.meta === m.VERTEX)
    }

    function lt(t) {
        return !!t.originalEvent && !0 === t.originalEvent.shiftKey
    }

    function ht(t) {
        return 27 === t.keyCode
    }

    function pt(t) {
        return 13 === t.keyCode
    }
    var dt = ft;

    function ft(t, e) {
        this.x = t, this.y = e
    }

    function gt(t, e) {
        var n = e.getBoundingClientRect();
        return new dt(t.clientX - n.left - (e.clientLeft || 0), t.clientY - n.top - (e.clientTop || 0))
    }

    function yt(t, e, n, o) {
        return {
            type: p.FEATURE,
            properties: {
                meta: m.VERTEX,
                parent: t,
                coord_path: n,
                active: o ? _.ACTIVE : _.INACTIVE
            },
            geometry: {
                type: p.POINT,
                coordinates: e
            }
        }
    }

    function mt(t, e, n) {
        void 0 === e && (e = {}), void 0 === n && (n = null);
        var o, r = t.geometry,
            i = r.type,
            a = r.coordinates,
            s = t.properties && t.properties.id,
            u = [];

        function c(t, n) {
            var o = "",
                r = null;
            t.forEach((function(t, i) {
                var a = null != n ? n + "." + i : String(i),
                    c = yt(s, t, a, l(a));
                if (e.midpoints && r) {
                    var h = function(t, e, n, o) {
                        var r = e.geometry.coordinates,
                            i = n.geometry.coordinates;
                        if (r[1] > E || r[1] < b || i[1] > E || i[1] < b) return null;
                        var a = o.project([r[0], r[1]]),
                            s = o.project([i[0], i[1]]),
                            u = o.unproject([(a.x + s.x) / 2, (a.y + s.y) / 2]);
                        return {
                            type: p.FEATURE,
                            properties: {
                                meta: m.MIDPOINT,
                                parent: t,
                                lng: u.lng,
                                lat: u.lat,
                                coord_path: n.properties.coord_path
                            },
                            geometry: {
                                type: p.POINT,
                                coordinates: [u.lng, u.lat]
                            }
                        }
                    }(s, r, c, e.map);
                    h && u.push(h)
                }
                r = c;
                var d = JSON.stringify(t);
                o !== d && u.push(c), 0 === i && (o = d)
            }))
        }

        function l(t) {
            return !!e.selectedPaths && -1 !== e.selectedPaths.indexOf(t)
        }
        return i === p.POINT ? u.push(yt(s, a, n, l(n))) : i === p.POLYGON ? a.forEach((function(t, e) {
            c(t, null !== n ? n + "." + e : String(e))
        })) : i === p.LINE_STRING ? c(a, n) : 0 === i.indexOf(p.MULTI_PREFIX) && (o = i.replace(p.MULTI_PREFIX, ""), a.forEach((function(n, r) {
            var i = {
                type: p.FEATURE,
                properties: t.properties,
                geometry: {
                    type: o,
                    coordinates: n
                }
            };
            u = u.concat(mt(i, e, r))
        }))), u
    }
    ft.prototype = {
        clone: function() {
            return new ft(this.x, this.y)
        },
        add: function(t) {
            return this.clone()._add(t)
        },
        sub: function(t) {
            return this.clone()._sub(t)
        },
        multByPoint: function(t) {
            return this.clone()._multByPoint(t)
        },
        divByPoint: function(t) {
            return this.clone()._divByPoint(t)
        },
        mult: function(t) {
            return this.clone()._mult(t)
        },
        div: function(t) {
            return this.clone()._div(t)
        },
        rotate: function(t) {
            return this.clone()._rotate(t)
        },
        rotateAround: function(t, e) {
            return this.clone()._rotateAround(t, e)
        },
        matMult: function(t) {
            return this.clone()._matMult(t)
        },
        unit: function() {
            return this.clone()._unit()
        },
        perp: function() {
            return this.clone()._perp()
        },
        round: function() {
            return this.clone()._round()
        },
        mag: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        equals: function(t) {
            return this.x === t.x && this.y === t.y
        },
        dist: function(t) {
            return Math.sqrt(this.distSqr(t))
        },
        distSqr: function(t) {
            var e = t.x - this.x,
                n = t.y - this.y;
            return e * e + n * n
        },
        angle: function() {
            return Math.atan2(this.y, this.x)
        },
        angleTo: function(t) {
            return Math.atan2(this.y - t.y, this.x - t.x)
        },
        angleWith: function(t) {
            return this.angleWithSep(t.x, t.y)
        },
        angleWithSep: function(t, e) {
            return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e)
        },
        _matMult: function(t) {
            var e = t[0] * this.x + t[1] * this.y,
                n = t[2] * this.x + t[3] * this.y;
            return this.x = e, this.y = n, this
        },
        _add: function(t) {
            return this.x += t.x, this.y += t.y, this
        },
        _sub: function(t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        _mult: function(t) {
            return this.x *= t, this.y *= t, this
        },
        _div: function(t) {
            return this.x /= t, this.y /= t, this
        },
        _multByPoint: function(t) {
            return this.x *= t.x, this.y *= t.y, this
        },
        _divByPoint: function(t) {
            return this.x /= t.x, this.y /= t.y, this
        },
        _unit: function() {
            return this._div(this.mag()), this
        },
        _perp: function() {
            var t = this.y;
            return this.y = this.x, this.x = -t, this
        },
        _rotate: function(t) {
            var e = Math.cos(t),
                n = Math.sin(t),
                o = e * this.x - n * this.y,
                r = n * this.x + e * this.y;
            return this.x = o, this.y = r, this
        },
        _rotateAround: function(t, e) {
            var n = Math.cos(t),
                o = Math.sin(t),
                r = e.x + n * (this.x - e.x) - o * (this.y - e.y),
                i = e.y + o * (this.x - e.x) + n * (this.y - e.y);
            return this.x = r, this.y = i, this
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        }
    }, ft.convert = function(t) {
        return t instanceof ft ? t : Array.isArray(t) ? new ft(t[0], t[1]) : t
    };
    var _t = function(t) {
            setTimeout((function() {
                t.map && t.map.doubleClickZoom && t._ctx && t._ctx.store && t._ctx.store.getInitialConfigValue && t._ctx.store.getInitialConfigValue("doubleClickZoom") && t.map.doubleClickZoom.enable()
            }), 0)
        },
        vt = function(t) {
            setTimeout((function() {
                t.map && t.map.doubleClickZoom && t.map.doubleClickZoom.disable()
            }), 0)
        },
        bt = function(t) {
            if (!t || !t.type) return null;
            var e = Et[t.type];
            if (!e) return null;
            if ("geometry" === e) return {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {},
                    geometry: t
                }]
            };
            if ("feature" === e) return {
                type: "FeatureCollection",
                features: [t]
            };
            if ("featurecollection" === e) return t
        },
        Et = {
            Point: "geometry",
            MultiPoint: "geometry",
            LineString: "geometry",
            MultiLineString: "geometry",
            Polygon: "geometry",
            MultiPolygon: "geometry",
            GeometryCollection: "geometry",
            Feature: "feature",
            FeatureCollection: "featurecollection"
        };
    var St = function(t) {
            if (!t) return [];
            var e = function t(e) {
                    switch (e && e.type || null) {
                        case "FeatureCollection":
                            return e.features = e.features.reduce((function(e, n) {
                                return e.concat(t(n))
                            }), []), e;
                        case "Feature":
                            return e.geometry ? t(e.geometry).map((function(t) {
                                var n = {
                                    type: "Feature",
                                    properties: JSON.parse(JSON.stringify(e.properties)),
                                    geometry: t
                                };
                                return void 0 !== e.id && (n.id = e.id), n
                            })) : e;
                        case "MultiPoint":
                            return e.coordinates.map((function(t) {
                                return {
                                    type: "Point",
                                    coordinates: t
                                }
                            }));
                        case "MultiPolygon":
                            return e.coordinates.map((function(t) {
                                return {
                                    type: "Polygon",
                                    coordinates: t
                                }
                            }));
                        case "MultiLineString":
                            return e.coordinates.map((function(t) {
                                return {
                                    type: "LineString",
                                    coordinates: t
                                }
                            }));
                        case "GeometryCollection":
                            return e.geometries.map(t).reduce((function(t, e) {
                                return t.concat(e)
                            }), []);
                        case "Point":
                        case "Polygon":
                        case "LineString":
                            return [e]
                    }
                }(bt(t)),
                n = [];
            return e.features.forEach((function(t) {
                t.geometry && (n = n.concat(function t(e) {
                    return Array.isArray(e) && e.length && "number" == typeof e[0] ? [e] : e.reduce((function(e, n) {
                        return Array.isArray(n) && Array.isArray(n[0]) ? e.concat(t(n)) : (e.push(n), e)
                    }), [])
                }(t.geometry.coordinates)))
            })), n
        },
        Tt = j((function(t) {
            var e = t.exports = function(t) {
                return new n(t)
            };

            function n(t) {
                this.value = t
            }

            function o(t, e, n) {
                var o = [],
                    a = [],
                    l = !0;
                return function t(h) {
                    var p = n ? r(h) : h,
                        d = {},
                        f = !0,
                        g = {
                            node: p,
                            node_: h,
                            path: [].concat(o),
                            parent: a[a.length - 1],
                            parents: a,
                            key: o.slice(-1)[0],
                            isRoot: 0 === o.length,
                            level: o.length,
                            circular: null,
                            update: function(t, e) {
                                g.isRoot || (g.parent.node[g.key] = t), g.node = t, e && (f = !1)
                            },
                            delete: function(t) {
                                delete g.parent.node[g.key], t && (f = !1)
                            },
                            remove: function(t) {
                                s(g.parent.node) ? g.parent.node.splice(g.key, 1) : delete g.parent.node[g.key], t && (f = !1)
                            },
                            keys: null,
                            before: function(t) {
                                d.before = t
                            },
                            after: function(t) {
                                d.after = t
                            },
                            pre: function(t) {
                                d.pre = t
                            },
                            post: function(t) {
                                d.post = t
                            },
                            stop: function() {
                                l = !1
                            },
                            block: function() {
                                f = !1
                            }
                        };
                    if (!l) return g;

                    function y() {
                        if ("object" == typeof g.node && null !== g.node) {
                            g.keys && g.node_ === g.node || (g.keys = i(g.node)), g.isLeaf = 0 == g.keys.length;
                            for (var t = 0; t < a.length; t++)
                                if (a[t].node_ === h) {
                                    g.circular = a[t];
                                    break
                                }
                        } else g.isLeaf = !0, g.keys = null;
                        g.notLeaf = !g.isLeaf, g.notRoot = !g.isRoot
                    }
                    y();
                    var m = e.call(g, g.node);
                    return void 0 !== m && g.update && g.update(m), d.before && d.before.call(g, g.node), f ? ("object" != typeof g.node || null === g.node || g.circular || (a.push(g), y(), u(g.keys, (function(e, r) {
                        o.push(e), d.pre && d.pre.call(g, g.node[e], e);
                        var i = t(g.node[e]);
                        n && c.call(g.node, e) && (g.node[e] = i.node), i.isLast = r == g.keys.length - 1, i.isFirst = 0 == r, d.post && d.post.call(g, i), o.pop()
                    })), a.pop()), d.after && d.after.call(g, g.node), g) : g
                }(t).node
            }

            function r(t) {
                if ("object" == typeof t && null !== t) {
                    var e;
                    if (s(t)) e = [];
                    else if ("[object Date]" === a(t)) e = new Date(t.getTime ? t.getTime() : t);
                    else if (function(t) {
                            return "[object RegExp]" === a(t)
                        }(t)) e = new RegExp(t);
                    else if (function(t) {
                            return "[object Error]" === a(t)
                        }(t)) e = {
                        message: t.message
                    };
                    else if (function(t) {
                            return "[object Boolean]" === a(t)
                        }(t)) e = new Boolean(t);
                    else if (function(t) {
                            return "[object Number]" === a(t)
                        }(t)) e = new Number(t);
                    else if (function(t) {
                            return "[object String]" === a(t)
                        }(t)) e = new String(t);
                    else if (Object.create && Object.getPrototypeOf) e = Object.create(Object.getPrototypeOf(t));
                    else if (t.constructor === Object) e = {};
                    else {
                        var n = t.constructor && t.constructor.prototype || t.__proto__ || {},
                            o = function() {};
                        o.prototype = n, e = new o
                    }
                    return u(i(t), (function(n) {
                        e[n] = t[n]
                    })), e
                }
                return t
            }
            n.prototype.get = function(t) {
                for (var e = this.value, n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (!e || !c.call(e, o)) {
                        e = void 0;
                        break
                    }
                    e = e[o]
                }
                return e
            }, n.prototype.has = function(t) {
                for (var e = this.value, n = 0; n < t.length; n++) {
                    var o = t[n];
                    if (!e || !c.call(e, o)) return !1;
                    e = e[o]
                }
                return !0
            }, n.prototype.set = function(t, e) {
                for (var n = this.value, o = 0; o < t.length - 1; o++) {
                    var r = t[o];
                    c.call(n, r) || (n[r] = {}), n = n[r]
                }
                return n[t[o]] = e, e
            }, n.prototype.map = function(t) {
                return o(this.value, t, !0)
            }, n.prototype.forEach = function(t) {
                return this.value = o(this.value, t, !1), this.value
            }, n.prototype.reduce = function(t, e) {
                var n = 1 === arguments.length,
                    o = n ? this.value : e;
                return this.forEach((function(e) {
                    this.isRoot && n || (o = t.call(this, o, e))
                })), o
            }, n.prototype.paths = function() {
                var t = [];
                return this.forEach((function(e) {
                    t.push(this.path)
                })), t
            }, n.prototype.nodes = function() {
                var t = [];
                return this.forEach((function(e) {
                    t.push(this.node)
                })), t
            }, n.prototype.clone = function() {
                var t = [],
                    e = [];
                return function n(o) {
                    for (var a = 0; a < t.length; a++)
                        if (t[a] === o) return e[a];
                    if ("object" == typeof o && null !== o) {
                        var s = r(o);
                        return t.push(o), e.push(s), u(i(o), (function(t) {
                            s[t] = n(o[t])
                        })), t.pop(), e.pop(), s
                    }
                    return o
                }(this.value)
            };
            var i = Object.keys || function(t) {
                var e = [];
                for (var n in t) e.push(n);
                return e
            };

            function a(t) {
                return Object.prototype.toString.call(t)
            }
            var s = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                u = function(t, e) {
                    if (t.forEach) return t.forEach(e);
                    for (var n = 0; n < t.length; n++) e(t[n], n, t)
                };
            u(i(n.prototype), (function(t) {
                e[t] = function(e) {
                    var o = [].slice.call(arguments, 1),
                        r = new n(e);
                    return r[t].apply(r, o)
                }
            }));
            var c = Object.hasOwnProperty || function(t, e) {
                return e in t
            }
        })),
        Ct = Ot;

    function Ot(t) {
        if (!(this instanceof Ot)) return new Ot(t);
        this._bbox = t || [1 / 0, 1 / 0, -1 / 0, -1 / 0], this._valid = !!t
    }
    Ot.prototype.include = function(t) {
        return this._valid = !0, this._bbox[0] = Math.min(this._bbox[0], t[0]), this._bbox[1] = Math.min(this._bbox[1], t[1]), this._bbox[2] = Math.max(this._bbox[2], t[0]), this._bbox[3] = Math.max(this._bbox[3], t[1]), this
    }, Ot.prototype.equals = function(t) {
        var e;
        return e = t instanceof Ot ? t.bbox() : t, this._bbox[0] == e[0] && this._bbox[1] == e[1] && this._bbox[2] == e[2] && this._bbox[3] == e[3]
    }, Ot.prototype.center = function(t) {
        return this._valid ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2] : null
    }, Ot.prototype.union = function(t) {
        var e;
        return this._valid = !0, e = t instanceof Ot ? t.bbox() : t, this._bbox[0] = Math.min(this._bbox[0], e[0]), this._bbox[1] = Math.min(this._bbox[1], e[1]), this._bbox[2] = Math.max(this._bbox[2], e[2]), this._bbox[3] = Math.max(this._bbox[3], e[3]), this
    }, Ot.prototype.bbox = function() {
        return this._valid ? this._bbox : null
    }, Ot.prototype.contains = function(t) {
        if (!t) return this._fastContains();
        if (!this._valid) return null;
        var e = t[0],
            n = t[1];
        return this._bbox[0] <= e && this._bbox[1] <= n && this._bbox[2] >= e && this._bbox[3] >= n
    }, Ot.prototype.intersect = function(t) {
        return this._valid ? (e = t instanceof Ot ? t.bbox() : t, !(this._bbox[0] > e[2] || this._bbox[2] < e[0] || this._bbox[3] < e[1] || this._bbox[1] > e[3])) : null;
        var e
    }, Ot.prototype._fastContains = function() {
        if (!this._valid) return new Function("return null;");
        var t = "return " + this._bbox[0] + "<= ll[0] &&" + this._bbox[1] + "<= ll[1] &&" + this._bbox[2] + ">= ll[0] &&" + this._bbox[3] + ">= ll[1]";
        return new Function("ll", t)
    }, Ot.prototype.polygon = function() {
        return this._valid ? {
            type: "Polygon",
            coordinates: [
                [
                    [this._bbox[0], this._bbox[1]],
                    [this._bbox[2], this._bbox[1]],
                    [this._bbox[2], this._bbox[3]],
                    [this._bbox[0], this._bbox[3]],
                    [this._bbox[0], this._bbox[1]]
                ]
            ]
        } : null
    };
    var It = {
            features: ["FeatureCollection"],
            coordinates: ["Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon"],
            geometry: ["Feature"],
            geometries: ["GeometryCollection"]
        },
        xt = Object.keys(It),
        Lt = function(t) {
            return Mt(t).bbox()
        };

    function Mt(t) {
        for (var e = Ct(), n = St(t), o = 0; o < n.length; o++) e.include(n[o]);
        return e
    }
    Lt.polygon = function(t) {
        return Mt(t).polygon()
    }, Lt.bboxify = function(t) {
        return Tt(t).map((function(t) {
            t && (xt.some((function(e) {
                return !!t[e] && -1 !== It[e].indexOf(t.type)
            })) && (t.bbox = Mt(t).bbox(), this.update(t)))
        }))
    };
    var Nt = -90,
        Pt = 90,
        wt = b,
        At = E,
        Ft = -270,
        kt = 270;

    function Rt(t, e) {
        var n = Nt,
            o = Pt,
            r = Nt,
            i = Pt,
            a = kt,
            s = Ft;
        t.forEach((function(t) {
            var e = Lt(t),
                u = e[1],
                c = e[3],
                l = e[0],
                h = e[2];
            u > n && (n = u), c < o && (o = c), c > r && (r = c), u < i && (i = u), l < a && (a = l), h > s && (s = h)
        }));
        var u = e;
        return n + u.lat > At && (u.lat = At - n), r + u.lat > Pt && (u.lat = Pt - r), o + u.lat < wt && (u.lat = wt - o), i + u.lat < Nt && (u.lat = Nt - i), a + u.lng <= Ft && (u.lng += 360 * Math.ceil(Math.abs(u.lng) / 360)), s + u.lng >= kt && (u.lng -= 360 * Math.ceil(Math.abs(u.lng) / 360)), u
    }

    function Ut(t, e) {
        var n = Rt(t.map((function(t) {
            return t.toGeoJSON()
        })), e);
        t.forEach((function(t) {
            var e, o = t.getCoordinates(),
                r = function(t) {
                    var e = {
                        lng: t[0] + n.lng,
                        lat: t[1] + n.lat
                    };
                    return [e.lng, e.lat]
                },
                i = function(t) {
                    return t.map((function(t) {
                        return r(t)
                    }))
                };
            t.type === p.POINT ? e = r(o) : t.type === p.LINE_STRING || t.type === p.MULTI_POINT ? e = o.map(r) : t.type === p.POLYGON || t.type === p.MULTI_LINE_STRING ? e = o.map(i) : t.type === p.MULTI_POLYGON && (e = o.map((function(t) {
                return t.map((function(t) {
                    return i(t)
                }))
            }))), t.incomingCoords(e)
        }))
    }
    var jt = {
        onSetup: function(t) {
            var e = this,
                n = {
                    dragMoveLocation: null,
                    boxSelectStartLocation: null,
                    boxSelectElement: void 0,
                    boxSelecting: !1,
                    canBoxSelect: !1,
                    dragMoving: !1,
                    canDragMove: !1,
                    initiallySelectedFeatureIds: t.featureIds || []
                };
            return this.setSelected(n.initiallySelectedFeatureIds.filter((function(t) {
                return void 0 !== e.getFeature(t)
            }))), this.fireActionable(), this.setActionableState({
                combineFeatures: !0,
                uncombineFeatures: !0,
                trash: !0
            }), n
        },
        fireUpdate: function() {
            this.map.fire(f.UPDATE, {
                action: g,
                features: this.getSelected().map((function(t) {
                    return t.toGeoJSON()
                }))
            })
        },
        fireActionable: function() {
            var t = this,
                e = this.getSelected(),
                n = e.filter((function(e) {
                    return t.isInstanceOf("MultiFeature", e)
                })),
                o = !1;
            if (e.length > 1) {
                o = !0;
                var r = e[0].type.replace("Multi", "");
                e.forEach((function(t) {
                    t.type.replace("Multi", "") !== r && (o = !1)
                }))
            }
            var i = n.length > 0,
                a = e.length > 0;
            this.setActionableState({
                combineFeatures: o,
                uncombineFeatures: i,
                trash: a
            })
        },
        getUniqueIds: function(t) {
            return t.length ? t.map((function(t) {
                return t.properties.id
            })).filter((function(t) {
                return void 0 !== t
            })).reduce((function(t, e) {
                return t.add(e), t
            }), new C).values() : []
        },
        stopExtendedInteractions: function(t) {
            t.boxSelectElement && (t.boxSelectElement.parentNode && t.boxSelectElement.parentNode.removeChild(t.boxSelectElement), t.boxSelectElement = null), this.map.dragPan.enable(), t.boxSelecting = !1, t.canBoxSelect = !1, t.dragMoving = !1, t.canDragMove = !1
        },
        onStop: function() {
            _t(this)
        },
        onMouseMove: function(t) {
            return this.stopExtendedInteractions(t)
        },
        onMouseOut: function(t) {
            if (t.dragMoving) return this.fireUpdate()
        }
    };
    jt.onTap = jt.onClick = function(t, e) {
        return ut(e) ? this.clickAnywhere(t, e) : it(m.VERTEX)(e) ? this.clickOnVertex(t, e) : function(t) {
            return !!t.featureTarget && (!!t.featureTarget.properties && t.featureTarget.properties.meta === m.FEATURE)
        }(e) ? this.clickOnFeature(t, e) : void 0
    }, jt.clickAnywhere = function(t) {
        var e = this,
            n = this.getSelectedIds();
        n.length && (this.clearSelectedFeatures(), n.forEach((function(t) {
            return e.doRender(t)
        }))), _t(this), this.stopExtendedInteractions(t)
    }, jt.clickOnVertex = function(t, e) {
        this.changeMode(d.DIRECT_SELECT, {
            featureId: e.featureTarget.properties.parent,
            coordPath: e.featureTarget.properties.coord_path,
            startPos: e.lngLat
        }), this.updateUIClasses({
            mouse: l.MOVE
        })
    }, jt.startOnActiveFeature = function(t, e) {
        this.stopExtendedInteractions(t), this.map.dragPan.disable(), this.doRender(e.featureTarget.properties.id), t.canDragMove = !0, t.dragMoveLocation = e.lngLat
    }, jt.clickOnFeature = function(t, e) {
        var n = this;
        vt(this), this.stopExtendedInteractions(t);
        var o = lt(e),
            r = this.getSelectedIds(),
            i = e.featureTarget.properties.id,
            a = this.isSelected(i);
        if (!o && a && this.getFeature(i).type !== p.POINT) return this.changeMode(d.DIRECT_SELECT, {
            featureId: i
        });
        a && o ? (this.deselect(i), this.updateUIClasses({
            mouse: l.POINTER
        }), 1 === r.length && _t(this)) : !a && o ? (this.select(i), this.updateUIClasses({
            mouse: l.MOVE
        })) : a || o || (r.forEach((function(t) {
            return n.doRender(t)
        })), this.setSelected(i), this.updateUIClasses({
            mouse: l.MOVE
        })), this.doRender(i)
    }, jt.onMouseDown = function(t, e) {
        return at(e) ? this.startOnActiveFeature(t, e) : this.drawConfig.boxSelect && function(t) {
            return !!t.originalEvent && (!!t.originalEvent.shiftKey && 0 === t.originalEvent.button)
        }(e) ? this.startBoxSelect(t, e) : void 0
    }, jt.startBoxSelect = function(t, e) {
        this.stopExtendedInteractions(t), this.map.dragPan.disable(), t.boxSelectStartLocation = gt(e.originalEvent, this.map.getContainer()), t.canBoxSelect = !0
    }, jt.onTouchStart = function(t, e) {
        if (at(e)) return this.startOnActiveFeature(t, e)
    }, jt.onDrag = function(t, e) {
        return t.canDragMove ? this.dragMove(t, e) : this.drawConfig.boxSelect && t.canBoxSelect ? this.whileBoxSelect(t, e) : void 0
    }, jt.whileBoxSelect = function(t, e) {
        t.boxSelecting = !0, this.updateUIClasses({
            mouse: l.ADD
        }), t.boxSelectElement || (t.boxSelectElement = document.createElement("div"), t.boxSelectElement.classList.add(u.BOX_SELECT), this.map.getContainer().appendChild(t.boxSelectElement));
        var n = gt(e.originalEvent, this.map.getContainer()),
            o = Math.min(t.boxSelectStartLocation.x, n.x),
            r = Math.max(t.boxSelectStartLocation.x, n.x),
            i = Math.min(t.boxSelectStartLocation.y, n.y),
            a = Math.max(t.boxSelectStartLocation.y, n.y),
            s = "translate(" + o + "px, " + i + "px)";
        t.boxSelectElement.style.transform = s, t.boxSelectElement.style.WebkitTransform = s, t.boxSelectElement.style.width = r - o + "px", t.boxSelectElement.style.height = a - i + "px"
    }, jt.dragMove = function(t, e) {
        t.dragMoving = !0, e.originalEvent.stopPropagation();
        var n = {
            lng: e.lngLat.lng - t.dragMoveLocation.lng,
            lat: e.lngLat.lat - t.dragMoveLocation.lat
        };
        Ut(this.getSelected(), n), t.dragMoveLocation = e.lngLat
    }, jt.onMouseUp = function(t, e) {
        var n = this;
        if (t.dragMoving) this.fireUpdate();
        else if (t.boxSelecting) {
            var o = [t.boxSelectStartLocation, gt(e.originalEvent, this.map.getContainer())],
                r = this.featuresAt(null, o, "click"),
                i = this.getUniqueIds(r).filter((function(t) {
                    return !n.isSelected(t)
                }));
            i.length && (this.select(i), i.forEach((function(t) {
                return n.doRender(t)
            })), this.updateUIClasses({
                mouse: l.MOVE
            }))
        }
        this.stopExtendedInteractions(t)
    }, jt.toDisplayFeatures = function(t, e, n) {
        e.properties.active = this.isSelected(e.properties.id) ? _.ACTIVE : _.INACTIVE, n(e), this.fireActionable(), e.properties.active === _.ACTIVE && e.geometry.type !== p.POINT && mt(e).forEach(n)
    }, jt.onTrash = function() {
        this.deleteFeature(this.getSelectedIds()), this.fireActionable()
    }, jt.onCombineFeatures = function() {
        var t = this.getSelected();
        if (!(0 === t.length || t.length < 2)) {
            for (var e = [], n = [], o = t[0].type.replace("Multi", ""), r = 0; r < t.length; r++) {
                var i = t[r];
                if (i.type.replace("Multi", "") !== o) return;
                i.type.includes("Multi") ? i.getCoordinates().forEach((function(t) {
                    e.push(t)
                })) : e.push(i.getCoordinates()), n.push(i.toGeoJSON())
            }
            if (n.length > 1) {
                var a = this.newFeature({
                    type: p.FEATURE,
                    properties: n[0].properties,
                    geometry: {
                        type: "Multi" + o,
                        coordinates: e
                    }
                });
                this.addFeature(a), this.deleteFeature(this.getSelectedIds(), {
                    silent: !0
                }), this.setSelected([a.id]), this.map.fire(f.COMBINE_FEATURES, {
                    createdFeatures: [a.toGeoJSON()],
                    deletedFeatures: n
                })
            }
            this.fireActionable()
        }
    }, jt.onUncombineFeatures = function() {
        var t = this,
            e = this.getSelected();
        if (0 !== e.length) {
            for (var n = [], o = [], r = function(r) {
                    var i = e[r];
                    t.isInstanceOf("MultiFeature", i) && (i.getFeatures().forEach((function(e) {
                        t.addFeature(e), e.properties = i.properties, n.push(e.toGeoJSON()), t.select([e.id])
                    })), t.deleteFeature(i.id, {
                        silent: !0
                    }), o.push(i.toGeoJSON()))
                }, i = 0; i < e.length; i++) r(i);
            n.length > 1 && this.map.fire(f.UNCOMBINE_FEATURES, {
                createdFeatures: n,
                deletedFeatures: o
            }), this.fireActionable()
        }
    };
    var Dt = it(m.VERTEX),
        Vt = it(m.MIDPOINT),
        Bt = {
            fireUpdate: function() {
                this.map.fire(f.UPDATE, {
                    action: y,
                    features: this.getSelected().map((function(t) {
                        return t.toGeoJSON()
                    }))
                })
            },
            fireActionable: function(t) {
                this.setActionableState({
                    combineFeatures: !1,
                    uncombineFeatures: !1,
                    trash: t.selectedCoordPaths.length > 0
                })
            },
            startDragging: function(t, e) {
                this.map.dragPan.disable(), t.canDragMove = !0, t.dragMoveLocation = e.lngLat
            },
            stopDragging: function(t) {
                this.map.dragPan.enable(), t.dragMoving = !1, t.canDragMove = !1, t.dragMoveLocation = null
            },
            onVertex: function(t, e) {
                this.startDragging(t, e);
                var n = e.featureTarget.properties,
                    o = t.selectedCoordPaths.indexOf(n.coord_path);
                lt(e) || -1 !== o ? lt(e) && -1 === o && t.selectedCoordPaths.push(n.coord_path) : t.selectedCoordPaths = [n.coord_path];
                var r = this.pathsToCoordinates(t.featureId, t.selectedCoordPaths);
                this.setSelectedCoordinates(r)
            },
            onMidpoint: function(t, e) {
                this.startDragging(t, e);
                var n = e.featureTarget.properties;
                t.feature.addCoordinate(n.coord_path, n.lng, n.lat), this.fireUpdate(), t.selectedCoordPaths = [n.coord_path]
            },
            pathsToCoordinates: function(t, e) {
                return e.map((function(e) {
                    return {
                        feature_id: t,
                        coord_path: e
                    }
                }))
            },
            onFeature: function(t, e) {
                0 === t.selectedCoordPaths.length ? this.startDragging(t, e) : this.stopDragging(t)
            },
            dragFeature: function(t, e, n) {
                Ut(this.getSelected(), n), t.dragMoveLocation = e.lngLat
            },
            dragVertex: function(t, e, n) {
                for (var o = t.selectedCoordPaths.map((function(e) {
                        return t.feature.getCoordinate(e)
                    })), r = Rt(o.map((function(t) {
                        return {
                            type: p.FEATURE,
                            properties: {},
                            geometry: {
                                type: p.POINT,
                                coordinates: t
                            }
                        }
                    })), n), i = 0; i < o.length; i++) {
                    var a = o[i];
                    t.feature.updateCoordinate(t.selectedCoordPaths[i], a[0] + r.lng, a[1] + r.lat)
                }
            },
            clickNoTarget: function() {
                this.changeMode(d.SIMPLE_SELECT)
            },
            clickInactive: function() {
                this.changeMode(d.SIMPLE_SELECT)
            },
            clickActiveFeature: function(t) {
                t.selectedCoordPaths = [], this.clearSelectedCoordinates(), t.feature.changed()
            },
            onSetup: function(t) {
                var e = t.featureId,
                    n = this.getFeature(e);
                if (!n) throw new Error("You must provide a featureId to enter direct_select mode");
                if (n.type === p.POINT) throw new TypeError("direct_select mode doesn't handle point features");
                var o = {
                    featureId: e,
                    feature: n,
                    dragMoveLocation: t.startPos || null,
                    dragMoving: !1,
                    canDragMove: !1,
                    selectedCoordPaths: t.coordPath ? [t.coordPath] : []
                };
                return this.setSelectedCoordinates(this.pathsToCoordinates(e, o.selectedCoordPaths)), this.setSelected(e), vt(this), this.setActionableState({
                    trash: !0
                }), o
            },
            onStop: function() {
                _t(this), this.clearSelectedCoordinates()
            },
            toDisplayFeatures: function(t, e, n) {
                t.featureId === e.properties.id ? (e.properties.active = _.ACTIVE, n(e), mt(e, {
                    map: this.map,
                    midpoints: !0,
                    selectedPaths: t.selectedCoordPaths
                }).forEach(n)) : (e.properties.active = _.INACTIVE, n(e)), this.fireActionable(t)
            },
            onTrash: function(t) {
                t.selectedCoordPaths.sort((function(t, e) {
                    return e.localeCompare(t, "en", {
                        numeric: !0
                    })
                })).forEach((function(e) {
                    return t.feature.removeCoordinate(e)
                })), this.fireUpdate(), t.selectedCoordPaths = [], this.clearSelectedCoordinates(), this.fireActionable(t), !1 === t.feature.isValid() && (this.deleteFeature([t.featureId]), this.changeMode(d.SIMPLE_SELECT, {}))
            },
            onMouseMove: function(t, e) {
                var n = at(e),
                    o = Dt(e),
                    r = 0 === t.selectedCoordPaths.length;
                n && r ? this.updateUIClasses({
                    mouse: l.MOVE
                }) : o && !r ? this.updateUIClasses({
                    mouse: l.MOVE
                }) : this.updateUIClasses({
                    mouse: l.NONE
                }), this.stopDragging(t)
            },
            onMouseOut: function(t) {
                t.dragMoving && this.fireUpdate()
            }
        };
    Bt.onTouchStart = Bt.onMouseDown = function(t, e) {
        return Dt(e) ? this.onVertex(t, e) : at(e) ? this.onFeature(t, e) : Vt(e) ? this.onMidpoint(t, e) : void 0
    }, Bt.onDrag = function(t, e) {
        if (!0 === t.canDragMove) {
            t.dragMoving = !0, e.originalEvent.stopPropagation();
            var n = {
                lng: e.lngLat.lng - t.dragMoveLocation.lng,
                lat: e.lngLat.lat - t.dragMoveLocation.lat
            };
            t.selectedCoordPaths.length > 0 ? this.dragVertex(t, e, n) : this.dragFeature(t, e, n), t.dragMoveLocation = e.lngLat
        }
    }, Bt.onClick = function(t, e) {
        return ut(e) ? this.clickNoTarget(t, e) : at(e) ? this.clickActiveFeature(t, e) : st(e) ? this.clickInactive(t, e) : void this.stopDragging(t)
    }, Bt.onTap = function(t, e) {
        return ut(e) ? this.clickNoTarget(t, e) : at(e) ? this.clickActiveFeature(t, e) : st(e) ? this.clickInactive(t, e) : void 0
    }, Bt.onTouchEnd = Bt.onMouseUp = function(t) {
        t.dragMoving && this.fireUpdate(), this.stopDragging(t)
    };
    var Gt = {};

    function $t(t, e) {
        return !!t.lngLat && (t.lngLat.lng === e[0] && t.lngLat.lat === e[1])
    }
    Gt.onSetup = function() {
        var t = this.newFeature({
            type: p.FEATURE,
            properties: {},
            geometry: {
                type: p.POINT,
                coordinates: []
            }
        });
        return this.addFeature(t), this.clearSelectedFeatures(), this.updateUIClasses({
            mouse: l.ADD
        }), this.activateUIButton(h.POINT), this.setActionableState({
            trash: !0
        }), {
            point: t
        }
    }, Gt.stopDrawingAndRemove = function(t) {
        this.deleteFeature([t.point.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT)
    }, Gt.onTap = Gt.onClick = function(t, e) {
        this.updateUIClasses({
            mouse: l.MOVE
        }), t.point.updateCoordinate("", e.lngLat.lng, e.lngLat.lat), this.map.fire(f.CREATE, {
            features: [t.point.toGeoJSON()]
        }), this.changeMode(d.SIMPLE_SELECT, {
            featureIds: [t.point.id]
        })
    }, Gt.onStop = function(t) {
        this.activateUIButton(), t.point.getCoordinate().length || this.deleteFeature([t.point.id], {
            silent: !0
        })
    }, Gt.toDisplayFeatures = function(t, e, n) {
        var o = e.properties.id === t.point.id;
        if (e.properties.active = o ? _.ACTIVE : _.INACTIVE, !o) return n(e)
    }, Gt.onTrash = Gt.stopDrawingAndRemove, Gt.onKeyUp = function(t, e) {
        if (ht(e) || pt(e)) return this.stopDrawingAndRemove(t, e)
    };
    var Jt = {
        onSetup: function() {
            var t = this.newFeature({
                type: p.FEATURE,
                properties: {},
                geometry: {
                    type: p.POLYGON,
                    coordinates: [
                        []
                    ]
                }
            });
            return this.addFeature(t), this.clearSelectedFeatures(), vt(this), this.updateUIClasses({
                mouse: l.ADD
            }), this.activateUIButton(h.POLYGON), this.setActionableState({
                trash: !0
            }), {
                polygon: t,
                currentVertexPosition: 0
            }
        },
        clickAnywhere: function(t, e) {
            if (t.currentVertexPosition > 0 && $t(e, t.polygon.coordinates[0][t.currentVertexPosition - 1])) return this.changeMode(d.SIMPLE_SELECT, {
                featureIds: [t.polygon.id]
            });
            this.updateUIClasses({
                mouse: l.ADD
            }), t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), t.currentVertexPosition++, t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat)
        },
        clickOnVertex: function(t) {
            return this.changeMode(d.SIMPLE_SELECT, {
                featureIds: [t.polygon.id]
            })
        },
        onMouseMove: function(t, e) {
            t.polygon.updateCoordinate("0." + t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), ct(e) && this.updateUIClasses({
                mouse: l.POINTER
            })
        }
    };
    Jt.onTap = Jt.onClick = function(t, e) {
        return ct(e) ? this.clickOnVertex(t, e) : this.clickAnywhere(t, e)
    }, Jt.onKeyUp = function(t, e) {
        ht(e) ? (this.deleteFeature([t.polygon.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT)) : pt(e) && this.changeMode(d.SIMPLE_SELECT, {
            featureIds: [t.polygon.id]
        })
    }, Jt.onStop = function(t) {
        this.updateUIClasses({
            mouse: l.NONE
        }), _t(this), this.activateUIButton(), void 0 !== this.getFeature(t.polygon.id) && (t.polygon.removeCoordinate("0." + t.currentVertexPosition), t.polygon.isValid() ? this.map.fire(f.CREATE, {
            features: [t.polygon.toGeoJSON()]
        }) : (this.deleteFeature([t.polygon.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT, {}, {
            silent: !0
        })))
    }, Jt.toDisplayFeatures = function(t, e, n) {
        var o = e.properties.id === t.polygon.id;
        if (e.properties.active = o ? _.ACTIVE : _.INACTIVE, !o) return n(e);
        if (0 !== e.geometry.coordinates.length) {
            var r = e.geometry.coordinates[0].length;
            if (!(r < 3)) {
                if (e.properties.meta = m.FEATURE, n(yt(t.polygon.id, e.geometry.coordinates[0][0], "0.0", !1)), r > 3) {
                    var i = e.geometry.coordinates[0].length - 3;
                    n(yt(t.polygon.id, e.geometry.coordinates[0][i], "0." + i, !1))
                }
                if (r <= 4) {
                    var a = [
                        [e.geometry.coordinates[0][0][0], e.geometry.coordinates[0][0][1]],
                        [e.geometry.coordinates[0][1][0], e.geometry.coordinates[0][1][1]]
                    ];
                    if (n({
                            type: p.FEATURE,
                            properties: e.properties,
                            geometry: {
                                coordinates: a,
                                type: p.LINE_STRING
                            }
                        }), 3 === r) return
                }
                return n(e)
            }
        }
    }, Jt.onTrash = function(t) {
        this.deleteFeature([t.polygon.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT)
    };
    var zt = {
        onSetup: function(t) {
            var e, n, o = (t = t || {}).featureId,
                r = "forward";
            if (o) {
                if (!(e = this.getFeature(o))) throw new Error("Could not find a feature with the provided featureId");
                var i = t.from;
                if (i && "Feature" === i.type && i.geometry && "Point" === i.geometry.type && (i = i.geometry), i && "Point" === i.type && i.coordinates && 2 === i.coordinates.length && (i = i.coordinates), !i || !Array.isArray(i)) throw new Error("Please use the `from` property to indicate which point to continue the line from");
                var a = e.coordinates.length - 1;
                if (e.coordinates[a][0] === i[0] && e.coordinates[a][1] === i[1]) n = a + 1, e.addCoordinate.apply(e, [n].concat(e.coordinates[a]));
                else {
                    if (e.coordinates[0][0] !== i[0] || e.coordinates[0][1] !== i[1]) throw new Error("`from` should match the point at either the start or the end of the provided LineString");
                    r = "backwards", n = 0, e.addCoordinate.apply(e, [n].concat(e.coordinates[0]))
                }
            } else e = this.newFeature({
                type: p.FEATURE,
                properties: {},
                geometry: {
                    type: p.LINE_STRING,
                    coordinates: []
                }
            }), n = 0, this.addFeature(e);
            return this.clearSelectedFeatures(), vt(this), this.updateUIClasses({
                mouse: l.ADD
            }), this.activateUIButton(h.LINE), this.setActionableState({
                trash: !0
            }), {
                line: e,
                currentVertexPosition: n,
                direction: r
            }
        },
        clickAnywhere: function(t, e) {
            if (t.currentVertexPosition > 0 && $t(e, t.line.coordinates[t.currentVertexPosition - 1]) || "backwards" === t.direction && $t(e, t.line.coordinates[t.currentVertexPosition + 1])) return this.changeMode(d.SIMPLE_SELECT, {
                featureIds: [t.line.id]
            });
            this.updateUIClasses({
                mouse: l.ADD
            }), t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), "forward" === t.direction ? (t.currentVertexPosition++, t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat)) : t.line.addCoordinate(0, e.lngLat.lng, e.lngLat.lat)
        },
        clickOnVertex: function(t) {
            return this.changeMode(d.SIMPLE_SELECT, {
                featureIds: [t.line.id]
            })
        },
        onMouseMove: function(t, e) {
            t.line.updateCoordinate(t.currentVertexPosition, e.lngLat.lng, e.lngLat.lat), ct(e) && this.updateUIClasses({
                mouse: l.POINTER
            })
        }
    };
    zt.onTap = zt.onClick = function(t, e) {
        if (ct(e)) return this.clickOnVertex(t, e);
        this.clickAnywhere(t, e)
    }, zt.onKeyUp = function(t, e) {
        pt(e) ? this.changeMode(d.SIMPLE_SELECT, {
            featureIds: [t.line.id]
        }) : ht(e) && (this.deleteFeature([t.line.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT))
    }, zt.onStop = function(t) {
        _t(this), this.activateUIButton(), void 0 !== this.getFeature(t.line.id) && (t.line.removeCoordinate("" + t.currentVertexPosition), t.line.isValid() ? this.map.fire(f.CREATE, {
            features: [t.line.toGeoJSON()]
        }) : (this.deleteFeature([t.line.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT, {}, {
            silent: !0
        })))
    }, zt.onTrash = function(t) {
        this.deleteFeature([t.line.id], {
            silent: !0
        }), this.changeMode(d.SIMPLE_SELECT)
    }, zt.toDisplayFeatures = function(t, e, n) {
        var o = e.properties.id === t.line.id;
        if (e.properties.active = o ? _.ACTIVE : _.INACTIVE, !o) return n(e);
        e.geometry.coordinates.length < 2 || (e.properties.meta = m.FEATURE, n(yt(t.line.id, e.geometry.coordinates["forward" === t.direction ? e.geometry.coordinates.length - 2 : 1], "" + ("forward" === t.direction ? e.geometry.coordinates.length - 2 : 1), !1)), n(e))
    };
    var Yt = {
            simple_select: jt,
            direct_select: Bt,
            draw_point: Gt,
            draw_polygon: Jt,
            draw_line_string: zt
        },
        qt = {
            defaultMode: d.SIMPLE_SELECT,
            keybindings: !0,
            touchEnabled: !0,
            clickBuffer: 2,
            touchBuffer: 25,
            boxSelect: !0,
            displayControlsDefault: !0,
            styles: [{
                id: "gl-draw-polygon-fill-inactive",
                type: "fill",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "fill-color": "#00ff00", //"#3bb2d0",
                    "fill-outline-color": "#00ff00", //"#3bb2d0",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-fill-active",
                type: "fill",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#ffff00",//"#fbb03b",
                    "fill-outline-color": "#ffff00",//"#fbb03b",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-midpoint",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-polygon-stroke-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Polygon"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#00ff00",//"#3bb2d0",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-stroke-active",
                type: "line",
                filter: ["all", ["==", "active", "true"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#fbb03b",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-inactive",
                type: "line",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "LineString"],
                    ["!=", "mode", "static"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#00ff00", //"#3bb2d0",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-active",
                type: "line",
                filter: ["all", ["==", "$type", "LineString"],
                    ["==", "active", "true"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#fbb03b",
                    "line-dasharray": [.2, 2],
                    "line-width": 2
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-polygon-and-line-vertex-inactive",
                type: "circle",
                filter: ["all", ["==", "meta", "vertex"],
                    ["==", "$type", "Point"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-point-point-stroke-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-opacity": 1,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-inactive",
                type: "circle",
                filter: ["all", ["==", "active", "false"],
                    ["==", "$type", "Point"],
                    ["==", "meta", "feature"],
                    ["!=", "mode", "static"]
                ],
                paint: {
                    "circle-radius": 3,
                    "circle-color": "#00ff00" //"#3bb2d0"
                }
            }, {
                id: "gl-draw-point-stroke-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["==", "active", "true"],
                    ["!=", "meta", "midpoint"]
                ],
                paint: {
                    "circle-radius": 7,
                    "circle-color": "#fff"
                }
            }, {
                id: "gl-draw-point-active",
                type: "circle",
                filter: ["all", ["==", "$type", "Point"],
                    ["!=", "meta", "midpoint"],
                    ["==", "active", "true"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#fbb03b"
                }
            }, {
                id: "gl-draw-polygon-fill-static",
                type: "fill",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                paint: {
                    "fill-color": "#2a58c3", //"#404040",
                    "fill-outline-color": "#2a58c3", //"#404040",
                    "fill-opacity": .1
                }
            }, {
                id: "gl-draw-polygon-stroke-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Polygon"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#2a58c3", //"#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-line-static",
                type: "line",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "LineString"]
                ],
                layout: {
                    "line-cap": "round",
                    "line-join": "round"
                },
                paint: {
                    "line-color": "#2a58c3", //"#404040",
                    "line-width": 2
                }
            }, {
                id: "gl-draw-point-static",
                type: "circle",
                filter: ["all", ["==", "mode", "static"],
                    ["==", "$type", "Point"]
                ],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#2a58c3" //"#404040"
                }
            }],
            modes: Yt,
            controls: {},
            userProperties: !1
        },
        Wt = {
            point: !0,
            line_string: !0,
            polygon: !0,
            trash: !0,
            combine_features: !0,
            uncombine_features: !0
        },
        Ht = {
            point: !1,
            line_string: !1,
            polygon: !1,
            trash: !1,
            combine_features: !1,
            uncombine_features: !1
        };

    function Xt(t, e) {
        return t.map((function(t) {
            return t.source ? t : et(t, {
                id: t.id + "." + e,
                source: "hot" === e ? c.HOT : c.COLD
            })
        }))
    }
    var Zt = j((function(t, e) {
        var n = 200,
            o = "__lodash_hash_undefined__",
            r = 1,
            i = 2,
            a = 9007199254740991,
            s = "[object Arguments]",
            u = "[object Array]",
            c = "[object AsyncFunction]",
            l = "[object Boolean]",
            h = "[object Date]",
            p = "[object Error]",
            d = "[object Function]",
            f = "[object GeneratorFunction]",
            g = "[object Map]",
            y = "[object Number]",
            m = "[object Null]",
            _ = "[object Object]",
            v = "[object Proxy]",
            b = "[object RegExp]",
            E = "[object Set]",
            S = "[object String]",
            T = "[object Symbol]",
            C = "[object Undefined]",
            O = "[object ArrayBuffer]",
            I = "[object DataView]",
            x = /^\[object .+?Constructor\]$/,
            L = /^(?:0|[1-9]\d*)$/,
            M = {};
        M["[object Float32Array]"] = M["[object Float64Array]"] = M["[object Int8Array]"] = M["[object Int16Array]"] = M["[object Int32Array]"] = M["[object Uint8Array]"] = M["[object Uint8ClampedArray]"] = M["[object Uint16Array]"] = M["[object Uint32Array]"] = !0, M[s] = M[u] = M[O] = M[l] = M[I] = M[h] = M[p] = M[d] = M[g] = M[y] = M[_] = M[b] = M[E] = M[S] = M["[object WeakMap]"] = !1;
        var N = "object" == typeof global && global && global.Object === Object && global,
            P = "object" == typeof self && self && self.Object === Object && self,
            w = N || P || Function("return this")(),
            A = e && !e.nodeType && e,
            F = A && t && !t.nodeType && t,
            k = F && F.exports === A,
            R = k && N.process,
            U = function() {
                try {
                    return R && R.binding && R.binding("util")
                } catch (t) {}
            }(),
            j = U && U.isTypedArray;

        function D(t, e) {
            for (var n = -1, o = null == t ? 0 : t.length; ++n < o;)
                if (e(t[n], n, t)) return !0;
            return !1
        }

        function V(t) {
            var e = -1,
                n = Array(t.size);
            return t.forEach((function(t, o) {
                n[++e] = [o, t]
            })), n
        }

        function B(t) {
            var e = -1,
                n = Array(t.size);
            return t.forEach((function(t) {
                n[++e] = t
            })), n
        }
        var G, $, J, z = Array.prototype,
            Y = Function.prototype,
            q = Object.prototype,
            W = w["__core-js_shared__"],
            H = Y.toString,
            X = q.hasOwnProperty,
            Z = (G = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "")) ? "Symbol(src)_1." + G : "",
            K = q.toString,
            Q = RegExp("^" + H.call(X).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            tt = k ? w.Buffer : void 0,
            et = w.Symbol,
            nt = w.Uint8Array,
            ot = q.propertyIsEnumerable,
            rt = z.splice,
            it = et ? et.toStringTag : void 0,
            at = Object.getOwnPropertySymbols,
            st = tt ? tt.isBuffer : void 0,
            ut = ($ = Object.keys, J = Object, function(t) {
                return $(J(t))
            }),
            ct = Ut(w, "DataView"),
            lt = Ut(w, "Map"),
            ht = Ut(w, "Promise"),
            pt = Ut(w, "Set"),
            dt = Ut(w, "WeakMap"),
            ft = Ut(Object, "create"),
            gt = Bt(ct),
            yt = Bt(lt),
            mt = Bt(ht),
            _t = Bt(pt),
            vt = Bt(dt),
            bt = et ? et.prototype : void 0,
            Et = bt ? bt.valueOf : void 0;

        function St(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var o = t[e];
                this.set(o[0], o[1])
            }
        }

        function Tt(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var o = t[e];
                this.set(o[0], o[1])
            }
        }

        function Ct(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var o = t[e];
                this.set(o[0], o[1])
            }
        }

        function Ot(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.__data__ = new Ct; ++e < n;) this.add(t[e])
        }

        function It(t) {
            var e = this.__data__ = new Tt(t);
            this.size = e.size
        }

        function xt(t, e) {
            var n = Jt(t),
                o = !n && $t(t),
                r = !n && !o && zt(t),
                i = !n && !o && !r && Xt(t),
                a = n || o || r || i,
                s = a ? function(t, e) {
                    for (var n = -1, o = Array(t); ++n < t;) o[n] = e(n);
                    return o
                }(t.length, String) : [],
                u = s.length;
            for (var c in t) !e && !X.call(t, c) || a && ("length" == c || r && ("offset" == c || "parent" == c) || i && ("buffer" == c || "byteLength" == c || "byteOffset" == c) || Vt(c, u)) || s.push(c);
            return s
        }

        function Lt(t, e) {
            for (var n = t.length; n--;)
                if (Gt(t[n][0], e)) return n;
            return -1
        }

        function Mt(t) {
            return null == t ? void 0 === t ? C : m : it && it in Object(t) ? function(t) {
                var e = X.call(t, it),
                    n = t[it];
                try {
                    t[it] = void 0;
                    var o = !0
                } catch (t) {}
                var r = K.call(t);
                o && (e ? t[it] = n : delete t[it]);
                return r
            }(t) : function(t) {
                return K.call(t)
            }(t)
        }

        function Nt(t) {
            return Ht(t) && Mt(t) == s
        }

        function Pt(t, e, n, o, a) {
            return t === e || (null == t || null == e || !Ht(t) && !Ht(e) ? t != t && e != e : function(t, e, n, o, a, c) {
                var d = Jt(t),
                    f = Jt(e),
                    m = d ? u : Dt(t),
                    v = f ? u : Dt(e),
                    C = (m = m == s ? _ : m) == _,
                    x = (v = v == s ? _ : v) == _,
                    L = m == v;
                if (L && zt(t)) {
                    if (!zt(e)) return !1;
                    d = !0, C = !1
                }
                if (L && !C) return c || (c = new It), d || Xt(t) ? Ft(t, e, n, o, a, c) : function(t, e, n, o, a, s, u) {
                    switch (n) {
                        case I:
                            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                            t = t.buffer, e = e.buffer;
                        case O:
                            return !(t.byteLength != e.byteLength || !s(new nt(t), new nt(e)));
                        case l:
                        case h:
                        case y:
                            return Gt(+t, +e);
                        case p:
                            return t.name == e.name && t.message == e.message;
                        case b:
                        case S:
                            return t == e + "";
                        case g:
                            var c = V;
                        case E:
                            var d = o & r;
                            if (c || (c = B), t.size != e.size && !d) return !1;
                            var f = u.get(t);
                            if (f) return f == e;
                            o |= i, u.set(t, e);
                            var m = Ft(c(t), c(e), o, a, s, u);
                            return u.delete(t), m;
                        case T:
                            if (Et) return Et.call(t) == Et.call(e)
                    }
                    return !1
                }(t, e, m, n, o, a, c);
                if (!(n & r)) {
                    var M = C && X.call(t, "__wrapped__"),
                        N = x && X.call(e, "__wrapped__");
                    if (M || N) {
                        var P = M ? t.value() : t,
                            w = N ? e.value() : e;
                        return c || (c = new It), a(P, w, n, o, c)
                    }
                }
                if (!L) return !1;
                return c || (c = new It),
                    function(t, e, n, o, i, a) {
                        var s = n & r,
                            u = kt(t),
                            c = u.length,
                            l = kt(e).length;
                        if (c != l && !s) return !1;
                        var h = c;
                        for (; h--;) {
                            var p = u[h];
                            if (!(s ? p in e : X.call(e, p))) return !1
                        }
                        var d = a.get(t);
                        if (d && a.get(e)) return d == e;
                        var f = !0;
                        a.set(t, e), a.set(e, t);
                        var g = s;
                        for (; ++h < c;) {
                            p = u[h];
                            var y = t[p],
                                m = e[p];
                            if (o) var _ = s ? o(m, y, p, e, t, a) : o(y, m, p, t, e, a);
                            if (!(void 0 === _ ? y === m || i(y, m, n, o, a) : _)) {
                                f = !1;
                                break
                            }
                            g || (g = "constructor" == p)
                        }
                        if (f && !g) {
                            var v = t.constructor,
                                b = e.constructor;
                            v != b && "constructor" in t && "constructor" in e && !("function" == typeof v && v instanceof v && "function" == typeof b && b instanceof b) && (f = !1)
                        }
                        return a.delete(t), a.delete(e), f
                    }(t, e, n, o, a, c)
            }(t, e, n, o, Pt, a))
        }

        function wt(t) {
            return !(!Wt(t) || function(t) {
                return !!Z && Z in t
            }(t)) && (Yt(t) ? Q : x).test(Bt(t))
        }

        function At(t) {
            if (n = (e = t) && e.constructor, o = "function" == typeof n && n.prototype || q, e !== o) return ut(t);
            var e, n, o, r = [];
            for (var i in Object(t)) X.call(t, i) && "constructor" != i && r.push(i);
            return r
        }

        function Ft(t, e, n, o, a, s) {
            var u = n & r,
                c = t.length,
                l = e.length;
            if (c != l && !(u && l > c)) return !1;
            var h = s.get(t);
            if (h && s.get(e)) return h == e;
            var p = -1,
                d = !0,
                f = n & i ? new Ot : void 0;
            for (s.set(t, e), s.set(e, t); ++p < c;) {
                var g = t[p],
                    y = e[p];
                if (o) var m = u ? o(y, g, p, e, t, s) : o(g, y, p, t, e, s);
                if (void 0 !== m) {
                    if (m) continue;
                    d = !1;
                    break
                }
                if (f) {
                    if (!D(e, (function(t, e) {
                            if (r = e, !f.has(r) && (g === t || a(g, t, n, o, s))) return f.push(e);
                            var r
                        }))) {
                        d = !1;
                        break
                    }
                } else if (g !== y && !a(g, y, n, o, s)) {
                    d = !1;
                    break
                }
            }
            return s.delete(t), s.delete(e), d
        }

        function kt(t) {
            return function(t, e, n) {
                var o = e(t);
                return Jt(t) ? o : function(t, e) {
                    for (var n = -1, o = e.length, r = t.length; ++n < o;) t[r + n] = e[n];
                    return t
                }(o, n(t))
            }(t, Zt, jt)
        }

        function Rt(t, e) {
            var n, o, r = t.__data__;
            return ("string" == (o = typeof(n = e)) || "number" == o || "symbol" == o || "boolean" == o ? "__proto__" !== n : null === n) ? r["string" == typeof e ? "string" : "hash"] : r.map
        }

        function Ut(t, e) {
            var n = function(t, e) {
                return null == t ? void 0 : t[e]
            }(t, e);
            return wt(n) ? n : void 0
        }
        St.prototype.clear = function() {
            this.__data__ = ft ? ft(null) : {}, this.size = 0
        }, St.prototype.delete = function(t) {
            var e = this.has(t) && delete this.__data__[t];
            return this.size -= e ? 1 : 0, e
        }, St.prototype.get = function(t) {
            var e = this.__data__;
            if (ft) {
                var n = e[t];
                return n === o ? void 0 : n
            }
            return X.call(e, t) ? e[t] : void 0
        }, St.prototype.has = function(t) {
            var e = this.__data__;
            return ft ? void 0 !== e[t] : X.call(e, t)
        }, St.prototype.set = function(t, e) {
            var n = this.__data__;
            return this.size += this.has(t) ? 0 : 1, n[t] = ft && void 0 === e ? o : e, this
        }, Tt.prototype.clear = function() {
            this.__data__ = [], this.size = 0
        }, Tt.prototype.delete = function(t) {
            var e = this.__data__,
                n = Lt(e, t);
            return !(n < 0) && (n == e.length - 1 ? e.pop() : rt.call(e, n, 1), --this.size, !0)
        }, Tt.prototype.get = function(t) {
            var e = this.__data__,
                n = Lt(e, t);
            return n < 0 ? void 0 : e[n][1]
        }, Tt.prototype.has = function(t) {
            return Lt(this.__data__, t) > -1
        }, Tt.prototype.set = function(t, e) {
            var n = this.__data__,
                o = Lt(n, t);
            return o < 0 ? (++this.size, n.push([t, e])) : n[o][1] = e, this
        }, Ct.prototype.clear = function() {
            this.size = 0, this.__data__ = {
                hash: new St,
                map: new(lt || Tt),
                string: new St
            }
        }, Ct.prototype.delete = function(t) {
            var e = Rt(this, t).delete(t);
            return this.size -= e ? 1 : 0, e
        }, Ct.prototype.get = function(t) {
            return Rt(this, t).get(t)
        }, Ct.prototype.has = function(t) {
            return Rt(this, t).has(t)
        }, Ct.prototype.set = function(t, e) {
            var n = Rt(this, t),
                o = n.size;
            return n.set(t, e), this.size += n.size == o ? 0 : 1, this
        }, Ot.prototype.add = Ot.prototype.push = function(t) {
            return this.__data__.set(t, o), this
        }, Ot.prototype.has = function(t) {
            return this.__data__.has(t)
        }, It.prototype.clear = function() {
            this.__data__ = new Tt, this.size = 0
        }, It.prototype.delete = function(t) {
            var e = this.__data__,
                n = e.delete(t);
            return this.size = e.size, n
        }, It.prototype.get = function(t) {
            return this.__data__.get(t)
        }, It.prototype.has = function(t) {
            return this.__data__.has(t)
        }, It.prototype.set = function(t, e) {
            var o = this.__data__;
            if (o instanceof Tt) {
                var r = o.__data__;
                if (!lt || r.length < n - 1) return r.push([t, e]), this.size = ++o.size, this;
                o = this.__data__ = new Ct(r)
            }
            return o.set(t, e), this.size = o.size, this
        };
        var jt = at ? function(t) {
                return null == t ? [] : (t = Object(t), function(t, e) {
                    for (var n = -1, o = null == t ? 0 : t.length, r = 0, i = []; ++n < o;) {
                        var a = t[n];
                        e(a, n, t) && (i[r++] = a)
                    }
                    return i
                }(at(t), (function(e) {
                    return ot.call(t, e)
                })))
            } : function() {
                return []
            },
            Dt = Mt;

        function Vt(t, e) {
            return !!(e = null == e ? a : e) && ("number" == typeof t || L.test(t)) && t > -1 && t % 1 == 0 && t < e
        }

        function Bt(t) {
            if (null != t) {
                try {
                    return H.call(t)
                } catch (t) {}
                try {
                    return t + ""
                } catch (t) {}
            }
            return ""
        }

        function Gt(t, e) {
            return t === e || t != t && e != e
        }(ct && Dt(new ct(new ArrayBuffer(1))) != I || lt && Dt(new lt) != g || ht && "[object Promise]" != Dt(ht.resolve()) || pt && Dt(new pt) != E || dt && "[object WeakMap]" != Dt(new dt)) && (Dt = function(t) {
            var e = Mt(t),
                n = e == _ ? t.constructor : void 0,
                o = n ? Bt(n) : "";
            if (o) switch (o) {
                case gt:
                    return I;
                case yt:
                    return g;
                case mt:
                    return "[object Promise]";
                case _t:
                    return E;
                case vt:
                    return "[object WeakMap]"
            }
            return e
        });
        var $t = Nt(function() {
                return arguments
            }()) ? Nt : function(t) {
                return Ht(t) && X.call(t, "callee") && !ot.call(t, "callee")
            },
            Jt = Array.isArray;
        var zt = st || function() {
            return !1
        };

        function Yt(t) {
            if (!Wt(t)) return !1;
            var e = Mt(t);
            return e == d || e == f || e == c || e == v
        }

        function qt(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= a
        }

        function Wt(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e)
        }

        function Ht(t) {
            return null != t && "object" == typeof t
        }
        var Xt = j ? function(t) {
            return function(e) {
                return t(e)
            }
        }(j) : function(t) {
            return Ht(t) && qt(t.length) && !!M[Mt(t)]
        };

        function Zt(t) {
            return null != (e = t) && qt(e.length) && !Yt(e) ? xt(t) : At(t);
            var e
        }
        t.exports = function(t, e) {
            return Pt(t, e)
        }
    }));
    var Kt = j((function(n, o) {
        var r = function() {
            var t = function(t, e, n, o) {
                    for (n = n || {}, o = t.length; o--; n[t[o]] = e);
                    return n
                },
                e = [1, 12],
                n = [1, 13],
                o = [1, 9],
                r = [1, 10],
                i = [1, 11],
                a = [1, 14],
                s = [1, 15],
                u = [14, 18, 22, 24],
                c = [18, 22],
                l = [22, 24],
                h = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        JSONString: 3,
                        STRING: 4,
                        JSONNumber: 5,
                        NUMBER: 6,
                        JSONNullLiteral: 7,
                        NULL: 8,
                        JSONBooleanLiteral: 9,
                        TRUE: 10,
                        FALSE: 11,
                        JSONText: 12,
                        JSONValue: 13,
                        EOF: 14,
                        JSONObject: 15,
                        JSONArray: 16,
                        "{": 17,
                        "}": 18,
                        JSONMemberList: 19,
                        JSONMember: 20,
                        ":": 21,
                        ",": 22,
                        "[": 23,
                        "]": 24,
                        JSONElementList: 25,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        4: "STRING",
                        6: "NUMBER",
                        8: "NULL",
                        10: "TRUE",
                        11: "FALSE",
                        14: "EOF",
                        17: "{",
                        18: "}",
                        21: ":",
                        22: ",",
                        23: "[",
                        24: "]"
                    },
                    productions_: [0, [3, 1],
                        [5, 1],
                        [7, 1],
                        [9, 1],
                        [9, 1],
                        [12, 2],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [13, 1],
                        [15, 2],
                        [15, 3],
                        [20, 3],
                        [19, 1],
                        [19, 3],
                        [16, 2],
                        [16, 3],
                        [25, 1],
                        [25, 3]
                    ],
                    performAction: function(t, e, n, o, r, i, a) {
                        var s = i.length - 1;
                        switch (r) {
                            case 1:
                                this.$ = t.replace(/\\(\\|")/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\v/g, "\v").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                                break;
                            case 2:
                                this.$ = Number(t);
                                break;
                            case 3:
                                this.$ = null;
                                break;
                            case 4:
                                this.$ = !0;
                                break;
                            case 5:
                                this.$ = !1;
                                break;
                            case 6:
                                return this.$ = i[s - 1];
                            case 13:
                                this.$ = {}, Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 14:
                            case 19:
                                this.$ = i[s - 1], Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 15:
                                this.$ = [i[s - 2], i[s]];
                                break;
                            case 16:
                                this.$ = {}, this.$[i[s][0]] = i[s][1];
                                break;
                            case 17:
                                this.$ = i[s - 2], void 0 !== i[s - 2][i[s][0]] && (this.$.__duplicateProperties__ || Object.defineProperty(this.$, "__duplicateProperties__", {
                                    value: [],
                                    enumerable: !1
                                }), this.$.__duplicateProperties__.push(i[s][0])), i[s - 2][i[s][0]] = i[s][1];
                                break;
                            case 18:
                                this.$ = [], Object.defineProperty(this.$, "__line__", {
                                    value: this._$.first_line,
                                    enumerable: !1
                                });
                                break;
                            case 20:
                                this.$ = [i[s]];
                                break;
                            case 21:
                                this.$ = i[s - 2], i[s - 2].push(i[s])
                        }
                    },
                    table: [{
                        3: 5,
                        4: e,
                        5: 6,
                        6: n,
                        7: 3,
                        8: o,
                        9: 4,
                        10: r,
                        11: i,
                        12: 1,
                        13: 2,
                        15: 7,
                        16: 8,
                        17: a,
                        23: s
                    }, {
                        1: [3]
                    }, {
                        14: [1, 16]
                    }, t(u, [2, 7]), t(u, [2, 8]), t(u, [2, 9]), t(u, [2, 10]), t(u, [2, 11]), t(u, [2, 12]), t(u, [2, 3]), t(u, [2, 4]), t(u, [2, 5]), t([14, 18, 21, 22, 24], [2, 1]), t(u, [2, 2]), {
                        3: 20,
                        4: e,
                        18: [1, 17],
                        19: 18,
                        20: 19
                    }, {
                        3: 5,
                        4: e,
                        5: 6,
                        6: n,
                        7: 3,
                        8: o,
                        9: 4,
                        10: r,
                        11: i,
                        13: 23,
                        15: 7,
                        16: 8,
                        17: a,
                        23: s,
                        24: [1, 21],
                        25: 22
                    }, {
                        1: [2, 6]
                    }, t(u, [2, 13]), {
                        18: [1, 24],
                        22: [1, 25]
                    }, t(c, [2, 16]), {
                        21: [1, 26]
                    }, t(u, [2, 18]), {
                        22: [1, 28],
                        24: [1, 27]
                    }, t(l, [2, 20]), t(u, [2, 14]), {
                        3: 20,
                        4: e,
                        20: 29
                    }, {
                        3: 5,
                        4: e,
                        5: 6,
                        6: n,
                        7: 3,
                        8: o,
                        9: 4,
                        10: r,
                        11: i,
                        13: 30,
                        15: 7,
                        16: 8,
                        17: a,
                        23: s
                    }, t(u, [2, 19]), {
                        3: 5,
                        4: e,
                        5: 6,
                        6: n,
                        7: 3,
                        8: o,
                        9: 4,
                        10: r,
                        11: i,
                        13: 31,
                        15: 7,
                        16: 8,
                        17: a,
                        23: s
                    }, t(c, [2, 17]), t(c, [2, 15]), t(l, [2, 21])],
                    defaultActions: {
                        16: [2, 6]
                    },
                    parseError: function(t, e) {
                        if (!e.recoverable) {
                            function n(t, e) {
                                this.message = t, this.hash = e
                            }
                            throw n.prototype = Error, new n(t, e)
                        }
                        this.trace(t)
                    },
                    parse: function(t) {
                        var e = this,
                            n = [0],
                            o = [null],
                            r = [],
                            i = this.table,
                            a = "",
                            s = 0,
                            u = 0,
                            c = 2,
                            l = 1,
                            h = r.slice.call(arguments, 1),
                            p = Object.create(this.lexer),
                            d = {
                                yy: {}
                            };
                        for (var f in this.yy) Object.prototype.hasOwnProperty.call(this.yy, f) && (d.yy[f] = this.yy[f]);
                        p.setInput(t, d.yy), d.yy.lexer = p, d.yy.parser = this, void 0 === p.yylloc && (p.yylloc = {});
                        var g = p.yylloc;
                        r.push(g);
                        var y = p.options && p.options.ranges;
                        "function" == typeof d.yy.parseError ? this.parseError = d.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
                        for (var m, _, v, b, E, S, T, C, O, I = function() {
                                var t;
                                return "number" != typeof(t = p.lex() || l) && (t = e.symbols_[t] || t), t
                            }, x = {};;) {
                            if (v = n[n.length - 1], this.defaultActions[v] ? b = this.defaultActions[v] : (null == m && (m = I()), b = i[v] && i[v][m]), void 0 === b || !b.length || !b[0]) {
                                var L = "";
                                for (S in O = [], i[v]) this.terminals_[S] && S > c && O.push("'" + this.terminals_[S] + "'");
                                L = p.showPosition ? "Parse error on line " + (s + 1) + ":\n" + p.showPosition() + "\nExpecting " + O.join(", ") + ", got '" + (this.terminals_[m] || m) + "'" : "Parse error on line " + (s + 1) + ": Unexpected " + (m == l ? "end of input" : "'" + (this.terminals_[m] || m) + "'"), this.parseError(L, {
                                    text: p.match,
                                    token: this.terminals_[m] || m,
                                    line: p.yylineno,
                                    loc: g,
                                    expected: O
                                })
                            }
                            if (b[0] instanceof Array && b.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + v + ", token: " + m);
                            switch (b[0]) {
                                case 1:
                                    n.push(m), o.push(p.yytext), r.push(p.yylloc), n.push(b[1]), m = null, _ ? (m = _, _ = null) : (u = p.yyleng, a = p.yytext, s = p.yylineno, g = p.yylloc);
                                    break;
                                case 2:
                                    if (T = this.productions_[b[1]][1], x.$ = o[o.length - T], x._$ = {
                                            first_line: r[r.length - (T || 1)].first_line,
                                            last_line: r[r.length - 1].last_line,
                                            first_column: r[r.length - (T || 1)].first_column,
                                            last_column: r[r.length - 1].last_column
                                        }, y && (x._$.range = [r[r.length - (T || 1)].range[0], r[r.length - 1].range[1]]), void 0 !== (E = this.performAction.apply(x, [a, u, s, d.yy, b[1], o, r].concat(h)))) return E;
                                    T && (n = n.slice(0, -1 * T * 2), o = o.slice(0, -1 * T), r = r.slice(0, -1 * T)), n.push(this.productions_[b[1]][0]), o.push(x.$), r.push(x._$), C = i[n[n.length - 2]][n[n.length - 1]], n.push(C);
                                    break;
                                case 3:
                                    return !0
                            }
                        }
                        return !0
                    }
                },
                p = {
                    EOF: 1,
                    parseError: function(t, e) {
                        if (!this.yy.parser) throw new Error(t);
                        this.yy.parser.parseError(t, e)
                    },
                    setInput: function(t, e) {
                        return this.yy = e || this.yy || {}, this._input = t, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                    },
                    input: function() {
                        var t = this._input[0];
                        return this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t, t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t
                    },
                    unput: function(t) {
                        var e = t.length,
                            n = t.split(/(?:\r\n?|\n)/g);
                        this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e), this.offset -= e;
                        var o = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                        var r = this.yylloc.range;
                        return this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === o.length ? this.yylloc.first_column : 0) + o[o.length - n.length].length - n[0].length : this.yylloc.first_column - e
                        }, this.options.ranges && (this.yylloc.range = [r[0], r[0] + this.yyleng - e]), this.yyleng = this.yytext.length, this
                    },
                    more: function() {
                        return this._more = !0, this
                    },
                    reject: function() {
                        return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    less: function(t) {
                        this.unput(this.match.slice(t))
                    },
                    pastInput: function() {
                        var t = this.matched.substr(0, this.matched.length - this.match.length);
                        return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var t = this.match;
                        return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var t = this.pastInput(),
                            e = new Array(t.length + 1).join("-");
                        return t + this.upcomingInput() + "\n" + e + "^"
                    },
                    test_match: function(t, e) {
                        var n, o, r;
                        if (this.options.backtrack_lexer && (r = {
                                yylineno: this.yylineno,
                                yylloc: {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.last_line,
                                    first_column: this.yylloc.first_column,
                                    last_column: this.yylloc.last_column
                                },
                                yytext: this.yytext,
                                match: this.match,
                                matches: this.matches,
                                matched: this.matched,
                                yyleng: this.yyleng,
                                offset: this.offset,
                                _more: this._more,
                                _input: this._input,
                                yy: this.yy,
                                conditionStack: this.conditionStack.slice(0),
                                done: this.done
                            }, this.options.ranges && (r.yylloc.range = this.yylloc.range.slice(0))), (o = t[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += o.length), this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                            }, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], n = this.performAction.call(this, this.yy, this, e, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), n) return n;
                        if (this._backtrack) {
                            for (var i in r) this[i] = r[i];
                            return !1
                        }
                        return !1
                    },
                    next: function() {
                        if (this.done) return this.EOF;
                        var t, e, n, o;
                        this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");
                        for (var r = this._currentRules(), i = 0; i < r.length; i++)
                            if ((n = this._input.match(this.rules[r[i]])) && (!e || n[0].length > e[0].length)) {
                                if (e = n, o = i, this.options.backtrack_lexer) {
                                    if (!1 !== (t = this.test_match(n, r[i]))) return t;
                                    if (this._backtrack) {
                                        e = !1;
                                        continue
                                    }
                                    return !1
                                }
                                if (!this.options.flex) break
                            } return e ? !1 !== (t = this.test_match(e, r[o])) && t : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                            text: "",
                            token: null,
                            line: this.yylineno
                        })
                    },
                    lex: function() {
                        var t = this.next();
                        return t || this.lex()
                    },
                    begin: function(t) {
                        this.conditionStack.push(t)
                    },
                    popState: function() {
                        return this.conditionStack.length - 1 > 0 ? this.conditionStack.pop() : this.conditionStack[0]
                    },
                    _currentRules: function() {
                        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules
                    },
                    topState: function(t) {
                        return (t = this.conditionStack.length - 1 - Math.abs(t || 0)) >= 0 ? this.conditionStack[t] : "INITIAL"
                    },
                    pushState: function(t) {
                        this.begin(t)
                    },
                    stateStackSize: function() {
                        return this.conditionStack.length
                    },
                    options: {},
                    performAction: function(t, e, n, o) {
                        switch (n) {
                            case 0:
                                break;
                            case 1:
                                return 6;
                            case 2:
                                return e.yytext = e.yytext.substr(1, e.yyleng - 2), 4;
                            case 3:
                                return 17;
                            case 4:
                                return 18;
                            case 5:
                                return 23;
                            case 6:
                                return 24;
                            case 7:
                                return 22;
                            case 8:
                                return 21;
                            case 9:
                                return 10;
                            case 10:
                                return 11;
                            case 11:
                                return 8;
                            case 12:
                                return 14;
                            case 13:
                                return "INVALID"
                        }
                    },
                    rules: [/^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/],
                    conditions: {
                        INITIAL: {
                            rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                            inclusive: !0
                        }
                    }
                };

            function d() {
                this.yy = {}
            }
            return h.lexer = p, d.prototype = h, h.Parser = d, new d
        }();
        o.parser = r, o.Parser = r.Parser, o.parse = function() {
            return r.parse.apply(r, arguments)
        }, o.main = function(n) {
            n[1] || (console.log("Usage: " + n[0] + " FILE"), process.exit(1));
            var r = t.readFileSync(e.normalize(n[1]), "utf8");
            return o.parser.parse(r)
        }, U.main === n && o.main(process.argv.slice(1))
    }));
    Kt.parser, Kt.Parser, Kt.parse, Kt.main;

    function Qt(t) {
        return t * Math.PI / 180
    }

    function te(t) {
        var e = 0;
        if (t.length > 2)
            for (var n, o, r = 0; r < t.length - 1; r++) n = t[r], e += Qt((o = t[r + 1])[0] - n[0]) * (2 + Math.sin(Qt(n[1])) + Math.sin(Qt(o[1])));
        return e >= 0
    }

    function ee(t) {
        if (t && t.length > 0) {
            if (te(t[0])) return !1;
            if (!t.slice(1, t.length).every(te)) return !1
        }
        return !0
    }
    var ne = function(t, e) {
        (function(t) {
            return "Polygon" === t.type ? ee(t.coordinates) : "MultiPolygon" === t.type ? t.coordinates.every(ee) : void 0
        })(t) || e.push({
            message: "Polygons and MultiPolygons should follow the right-hand rule",
            level: "message",
            line: t.__line__
        })
    };
    var oe = {
        hint: function(t, e) {
            var n = [],
                o = 0,
                r = 10,
                i = 6;

            function a(t) {
                if (e && !1 === e.noDuplicateMembers || !t.__duplicateProperties__ || n.push({
                        message: "An object contained duplicate members, making parsing ambigous: " + t.__duplicateProperties__.join(", "),
                        line: t.__line__
                    }), !u(t, "type", "string"))
                    if (f[t.type]) t && f[t.type](t);
                    else {
                        var o = g[t.type.toLowerCase()];
                        void 0 !== o ? n.push({
                            message: "Expected " + o + " but got " + t.type + " (case sensitive)",
                            line: t.__line__
                        }) : n.push({
                            message: "The type " + t.type + " is unknown",
                            line: t.__line__
                        })
                    }
            }

            function s(t, e) {
                return t.every((function(t) {
                    return null !== t && typeof t === e
                }))
            }

            function u(t, e, o) {
                if (void 0 === t[e]) return n.push({
                    message: '"' + e + '" member required',
                    line: t.__line__
                });
                if ("array" === o) {
                    if (!Array.isArray(t[e])) return n.push({
                        message: '"' + e + '" member should be an array, but is an ' + typeof t[e] + " instead",
                        line: t.__line__
                    })
                } else {
                    if ("object" === o && t[e] && t[e].constructor !== Object) return n.push({
                        message: '"' + e + '" member should be ' + o + ", but is an " + t[e].constructor.name + " instead",
                        line: t.__line__
                    });
                    if (o && typeof t[e] !== o) return n.push({
                        message: '"' + e + '" member should be ' + o + ", but is an " + typeof t[e] + " instead",
                        line: t.__line__
                    })
                }
            }

            function c(t, a) {
                if (!Array.isArray(t)) return n.push({
                    message: "position should be an array, is a " + typeof t + " instead",
                    line: t.__line__ || a
                });
                if (t.length < 2) return n.push({
                    message: "position must have 2 or more elements",
                    line: t.__line__ || a
                });
                if (t.length > 3) return n.push({
                    message: "position should not have more than 3 elements",
                    level: "message",
                    line: t.__line__ || a
                });
                if (!s(t, "number")) return n.push({
                    message: "each element in a position must be a number",
                    line: t.__line__ || a
                });
                if (e && e.precisionWarning) {
                    if (o === r) return o += 1, n.push({
                        message: "truncated warnings: we've encountered coordinate precision warning " + r + " times, no more warnings will be reported",
                        level: "message",
                        line: t.__line__ || a
                    });
                    o < r && t.forEach((function(e) {
                        var r = 0,
                            s = String(e).split(".")[1];
                        if (void 0 !== s && (r = s.length), r > i) return o += 1, n.push({
                            message: "precision of coordinates should be reduced",
                            level: "message",
                            line: t.__line__ || a
                        })
                    }))
                }
            }

            function l(t, e, o, r) {
                if (void 0 === r && void 0 !== t.__line__ && (r = t.__line__), 0 === o) return c(t, r);
                if (1 === o && e)
                    if ("LinearRing" === e) {
                        if (!Array.isArray(t[t.length - 1])) return n.push({
                            message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                            line: r
                        }), !0;
                        if (t.length < 4 && n.push({
                                message: "a LinearRing of coordinates needs to have four or more positions",
                                line: r
                            }), t.length && (t[t.length - 1].length !== t[0].length || !t[t.length - 1].every((function(e, n) {
                                return t[0][n] === e
                            })))) return n.push({
                            message: "the first and last positions in a LinearRing of coordinates must be the same",
                            line: r
                        }), !0
                    } else if ("Line" === e && t.length < 2) return n.push({
                    message: "a line needs to have two or more coordinates to be valid",
                    line: r
                });
                if (Array.isArray(t)) return t.map((function(t) {
                    return l(t, e, o - 1, t.__line__ || r)
                })).some((function(t) {
                    return t
                }));
                n.push({
                    message: "a number was found where a coordinate array should have been found: this needs to be nested more deeply",
                    line: r
                })
            }

            function h(t) {
                if (t.crs) {
                    "object" == typeof t.crs && t.crs.properties && "urn:ogc:def:crs:OGC:1.3:CRS84" === t.crs.properties.name ? n.push({
                        message: "old-style crs member is not recommended, this object is equivalent to the default and should be removed",
                        line: t.__line__
                    }) : n.push({
                        message: "old-style crs member is not recommended",
                        line: t.__line__
                    })
                }
            }

            function p(t) {
                if (t.bbox) return Array.isArray(t.bbox) ? (s(t.bbox, "number") || n.push({
                    message: "each element in a bbox member must be a number",
                    line: t.bbox.__line__
                }), 4 !== t.bbox.length && 6 !== t.bbox.length && n.push({
                    message: "bbox must contain 4 elements (for 2D) or 6 elements (for 3D)",
                    line: t.bbox.__line__
                }), n.length) : void n.push({
                    message: "bbox member must be an array of numbers, but is a " + typeof t.bbox,
                    line: t.__line__
                })
            }

            function d(t) {
                h(t), p(t), void 0 !== t.id && "string" != typeof t.id && "number" != typeof t.id && n.push({
                    message: 'Feature "id" member must have a string or number value',
                    line: t.__line__
                }), void 0 !== t.features && n.push({
                    message: 'Feature object cannot contain a "features" member',
                    line: t.__line__
                }), void 0 !== t.coordinates && n.push({
                    message: 'Feature object cannot contain a "coordinates" member',
                    line: t.__line__
                }), "Feature" !== t.type && n.push({
                    message: "GeoJSON features must have a type=feature member",
                    line: t.__line__
                }), u(t, "properties", "object"), u(t, "geometry", "object") || t.geometry && a(t.geometry)
            }
            var f = {
                    Point: function(t) {
                        var e;
                        h(t), p(t), void 0 !== (e = t).properties && n.push({
                            message: 'geometry object cannot contain a "properties" member',
                            line: e.__line__
                        }), void 0 !== e.geometry && n.push({
                            message: 'geometry object cannot contain a "geometry" member',
                            line: e.__line__
                        }), void 0 !== e.features && n.push({
                            message: 'geometry object cannot contain a "features" member',
                            line: e.__line__
                        }), u(t, "coordinates", "array") || c(t.coordinates)
                    },
                    Feature: d,
                    MultiPoint: function(t) {
                        h(t), p(t), u(t, "coordinates", "array") || l(t.coordinates, "", 1)
                    },
                    LineString: function(t) {
                        h(t), p(t), u(t, "coordinates", "array") || l(t.coordinates, "Line", 1)
                    },
                    MultiLineString: function(t) {
                        h(t), p(t), u(t, "coordinates", "array") || l(t.coordinates, "Line", 2)
                    },
                    FeatureCollection: function(t) {
                        if (h(t), p(t), void 0 !== t.properties && n.push({
                                message: 'FeatureCollection object cannot contain a "properties" member',
                                line: t.__line__
                            }), void 0 !== t.coordinates && n.push({
                                message: 'FeatureCollection object cannot contain a "coordinates" member',
                                line: t.__line__
                            }), !u(t, "features", "array")) {
                            if (!s(t.features, "object")) return n.push({
                                message: "Every feature must be an object",
                                line: t.__line__
                            });
                            t.features.forEach(d)
                        }
                    },
                    GeometryCollection: function(t) {
                        h(t), p(t), u(t, "geometries", "array") || (s(t.geometries, "object") || n.push({
                            message: "The geometries array in a GeometryCollection must contain only geometry objects",
                            line: t.__line__
                        }), 1 === t.geometries.length && n.push({
                            message: "GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type",
                            line: t.geometries.__line__
                        }), t.geometries.forEach((function(e) {
                            e && ("GeometryCollection" === e.type && n.push({
                                message: "GeometryCollection should avoid nested geometry collections",
                                line: t.geometries.__line__
                            }), a(e))
                        })))
                    },
                    Polygon: function(t) {
                        h(t), p(t), u(t, "coordinates", "array") || l(t.coordinates, "LinearRing", 2) || ne(t, n)
                    },
                    MultiPolygon: function(t) {
                        h(t), p(t), u(t, "coordinates", "array") || l(t.coordinates, "LinearRing", 3) || ne(t, n)
                    }
                },
                g = Object.keys(f).reduce((function(t, e) {
                    return t[e.toLowerCase()] = e, t
                }), {});
            return "object" != typeof t || null == t ? (n.push({
                message: "The root of a GeoJSON object must be an object.",
                line: 0
            }), n) : (a(t), n.forEach((function(t) {
                ({}).hasOwnProperty.call(t, "line") && void 0 === t.line && delete t.line
            })), n)
        }
    };
    var re = {
            hint: function(t, e) {
                var n, o = [];
                if ("object" == typeof t) n = t;
                else {
                    if ("string" != typeof t) return [{
                        message: "Expected string or object as input",
                        line: 0
                    }];
                    try {
                        n = Kt.parse(t)
                    } catch (t) {
                        var r = t.message.match(/line (\d+)/);
                        return [{
                            line: parseInt(r[1], 10) - 1,
                            message: t.message,
                            error: t
                        }]
                    }
                }
                return o = o.concat(oe.hint(n, e))
            }
        },
        ie = {
            Polygon: $,
            LineString: G,
            Point: B,
            MultiPolygon: Y,
            MultiLineString: Y,
            MultiPoint: Y
        };

    function ae(t, e) {
        return e.modes = d, e.getFeatureIdsAt = function(e) {
            return I.click({
                point: e
            }, null, t).map((function(t) {
                return t.properties.id
            }))
        }, e.getSelectedIds = function() {
            return t.store.getSelectedIds()
        }, e.getSelected = function() {
            return {
                type: p.FEATURE_COLLECTION,
                features: t.store.getSelectedIds().map((function(e) {
                    return t.store.get(e)
                })).map((function(t) {
                    return t.toGeoJSON()
                }))
            }
        }, e.getSelectedPoints = function() {
            return {
                type: p.FEATURE_COLLECTION,
                features: t.store.getSelectedCoordinates().map((function(t) {
                    return {
                        type: p.FEATURE,
                        properties: {},
                        geometry: {
                            type: p.POINT,
                            coordinates: t.coordinates
                        }
                    }
                }))
            }
        }, e.set = function(n) {
            if (void 0 === n.type || n.type !== p.FEATURE_COLLECTION || !Array.isArray(n.features)) throw new Error("Invalid FeatureCollection");
            var o = t.store.createRenderBatch(),
                r = t.store.getAllIds().slice(),
                i = e.add(n),
                a = new C(i);
            return (r = r.filter((function(t) {
                return !a.has(t)
            }))).length && e.delete(r), o(), i
        }, e.add = function(e) {
            var n = re.hint(e, {
                precisionWarning: !1
            }).filter((function(t) {
                return "message" !== t.level
            }));
            if (n.length) throw new Error(n[0].message);
            var o = JSON.parse(JSON.stringify(bt(e))).features.map((function(e) {
                if (e.id = e.id || D(), null === e.geometry) throw new Error("Invalid geometry: null");
                if (void 0 === t.store.get(e.id) || t.store.get(e.id).type !== e.geometry.type) {
                    var n = ie[e.geometry.type];
                    if (void 0 === n) throw new Error("Invalid geometry type: " + e.geometry.type + ".");
                    var o = new n(t, e);
                    t.store.add(o)
                } else {
                    var r = t.store.get(e.id);
                    r.properties = e.properties, Zt(r.getCoordinates(), e.geometry.coordinates) || r.incomingCoords(e.geometry.coordinates)
                }
                return e.id
            }));
            return t.store.render(), o
        }, e.get = function(e) {
            var n = t.store.get(e);
            if (n) return n.toGeoJSON()
        }, e.getAll = function() {
            return {
                type: p.FEATURE_COLLECTION,
                features: t.store.getAll().map((function(t) {
                    return t.toGeoJSON()
                }))
            }
        }, e.delete = function(n) {
            return t.store.delete(n, {
                silent: !0
            }), e.getMode() !== d.DIRECT_SELECT || t.store.getSelectedIds().length ? t.store.render() : t.events.changeMode(d.SIMPLE_SELECT, void 0, {
                silent: !0
            }), e
        }, e.deleteAll = function() {
            return t.store.delete(t.store.getAllIds(), {
                silent: !0
            }), e.getMode() === d.DIRECT_SELECT ? t.events.changeMode(d.SIMPLE_SELECT, void 0, {
                silent: !0
            }) : t.store.render(), e
        }, e.changeMode = function(n, o) {
            return void 0 === o && (o = {}), n === d.SIMPLE_SELECT && e.getMode() === d.SIMPLE_SELECT ? (r = o.featureIds || [], i = t.store.getSelectedIds(), r.length === i.length && JSON.stringify(r.map((function(t) {
                return t
            })).sort()) === JSON.stringify(i.map((function(t) {
                return t
            })).sort()) ? e : (t.store.setSelected(o.featureIds, {
                silent: !0
            }), t.store.render(), e)) : n === d.DIRECT_SELECT && e.getMode() === d.DIRECT_SELECT && o.featureId === t.store.getSelectedIds()[0] ? e : (t.events.changeMode(n, o, {
                silent: !0
            }), e);
            var r, i
        }, e.getMode = function() {
            return t.events.getMode()
        }, e.trash = function() {
            return t.events.trash({
                silent: !0
            }), e
        }, e.combineFeatures = function() {
            return t.events.combineFeatures({
                silent: !0
            }), e
        }, e.uncombineFeatures = function() {
            return t.events.uncombineFeatures({
                silent: !0
            }), e
        }, e.setFeatureProperty = function(n, o, r) {
            return t.store.setFeatureProperty(n, o, r), e
        }, e
    }
    var se = function(t, e) {
        var n = {
            options: t = function(t) {
                void 0 === t && (t = {});
                var e = et(t);
                return t.controls || (e.controls = {}), !1 === t.displayControlsDefault ? e.controls = et(Ht, t.controls) : e.controls = et(Wt, t.controls), (e = et(qt, e)).styles = Xt(e.styles, "cold").concat(Xt(e.styles, "hot")), e
            }(t)
        };
        e = ae(n, e), n.api = e;
        var o = rt(n);
        return e.onAdd = o.onAdd, e.onRemove = o.onRemove, e.types = h, e.options = t, e
    };

    function ue(t) {
        se(t, this)
    }
    return ue.modes = Yt, ue
}));
//# sourceMappingURL=mapbox-gl-draw.js.map