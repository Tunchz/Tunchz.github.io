(function() {
    var apikey = '36c688d02da345cda677e862f7319f37';
    var server = {
        map: 'https://api.longdo.com/map/',
        coreLayer: 'https://ms.longdo.com/map/msn-server/img.php',
        layer: 'https://ms.longdo.com/mmmap/img.php',
        tomtom: 'https://mstomtom.longdo.com/mmmap/img.php',
        traffic: 'https://mstraffic1.longdo.com/mmmap/img.php',
        search: 'https://search.longdo.com/mapsearch',
        address: 'https://api.longdo.com/map/services/address',
        object: 'https://api.longdo.com/map/services/object',
        longdo: 'https://map.longdo.com/',
        camera: 'https://camera.longdo.com/',
        event: 'https://event.longdo.com/',
        tag: 'https://clusterer.longdo.com/ClusterService/json/cluster',
        route: 'https://mmmap15.longdo.com/mmroute',
        transit: 'https://mslb1.longdo.com/map/mmroute-transit',
        poi: 'https://mmmap15.longdo.com/POIService',

        usertile: 'https://usertiles.longdo.com/',
        mapg: 'https://maps.googleapis.com/maps/api/js',
        mapb: 'https://api.tiles.mapbox.com/v4/',
        gistda: 'https://go-tiles1.gistda.or.th/map/msn-server/img.php',
    };
    var debug = false;
    var cap = {
        poi: !0
    };
    var copyright = ['', ''];
    var defaultHd = undefined;
    var defaultMap = 'POI';
    cap.marginOverflow = !0;
    if (!window.Element || !window.addEventListener || !window.requestAnimationFrame) throw alert("Your browser isn't supported or use invalid document mode"), "Unsupported browser";
    var EARTH_DIAMETER = 12742018,
        BIG_NUM = 1 << 30,
        SCRIPT_TIMEOUT = 1e4,
        RATE_LIMIT = 1100,
        TILEEXP = 8,
        TILESIZE = 1 << TILEEXP,
        TAG_REGEX = /(<[^>]+>)/ig,
        IMAGE_SUFFIX_SD = ".png",
        IMAGE_SUFFIX_HD = "-2x.png",
        MARKER_ICON = {
            url: server.map + "images/pin.png",
            urlHD: server.map + "images/pin-2x.png",
            offset: {
                x: 13,
                y: 44
            }
        },
        TRAFFIC_RANGE = {
            min: 7,
            max: 16
        },
        TRAFFIC_REFRESH = 180,
        SATELLITE_RANGE = {
            min: 1,
            max: 18
        },
        DEFAULT_RANGE = {
            min: 1,
            max: 99
        },
        CAMERA_RANGE = {
            motion: {
                min: 13,
                max: 99
            },
            city: {
                min: 14,
                max: 99
            },
            country: {
                min: 10,
                max: 99
            },
            highway: {
                min: 9,
                max: 99
            }
        },
        CAMERA_ICON_STILL = {
            url: server.map + "images/camera-still.png",
            urlHD: server.map + "images/camera-still-2x.png",
            offset: {
                x: 12,
                y: 12
            }
        },
        CAMERA_ICON_MOTION = {
            url: server.map + "images/camera-motion.png",
            urlHD: server.map + "images/camera-motion-2x.png",
            offset: {
                x: 12,
                y: 12
            }
        },
        CAMERA_SIZE = {
            width: cap.marginOverflow ? 343 : 328,
            height: 270
        },
        EVENT_RANGE = {
            all: {
                min: 11,
                max: 99
            },
            construction: {
                min: 8,
                max: 99
            },
            flood: {
                min: 8,
                max: 99
            },
            information: {
                min: 8,
                max: 99
            },
            trafficjam: {
                min: 14,
                max: 99
            },
            misc: {
                min: 13,
                max: 99
            },
            event: {
                min: 8,
                max: 99
            },
            sale: {
                min: 14,
                max: 99
            }
        },
        EVENT_OFFSET = {
            x: 13,
            y: 13
        },
        EVENT_REFRESH = 180,
        SPATIAL_DATA_MAX = 16,
        PAINT_DELAY = 5,
        OVERLAY_PAINT_DELAY = 120,
        ANIMATION_INTERVAL = 150,
        DROP_SPEED = 40,
        BOUNCE_HEIGHT = 20,
        MONTH = {
            th: [null, " ม.ค. ", " ก.พ. ", " มี.ค. ", " เม.ย. ", " พ.ค. ", " มิ.ย. ", " ก.ค. ", " ส.ค. ", " ก.ย. ", " ต.ค. ", " พ.ย. ", " ธ.ค. "],
            en: [null, " jan ", " feb ", " mar ", " apr ", " may ", " jun ", " jul ", " aug ", " sep ", " oct ", " nov ", " dec "]
        },
        UNIT = {
            th: {
                km: " กม.",
                m: " ม.",
                sqkm: " ตร.กม.",
                sqm: " ตร.ม.",
                rai: " ไร่",
                ngan: " งาน",
                sqwa: " ตร.ว.",
                min: " นาที",
                hr: " ช.ม."
            },
            en: {
                km: " km",
                m: " m",
                sqkm: " sq.km",
                sqm: " sq.m",
                rai: " rai",
                ngan: " ngan",
                sqwa: " sq.wa",
                min: " min",
                hr: " hr"
            }
        },
        DOW = {
            th: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
            en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
    window.longdo = window.longdo || {}, longdo.callback = longdo.callback || {}, longdo.objectcount = longdo.objectcount || 0, (new Image).src = MARKER_ICON.url, longdo.MapTheme = {}, longdo.Util = {
        append: function(a, b, c) {
            var d = document.createElement(b);
            for (var e in c) d[e] = c[e];
            return a.appendChild(d), d
        },
        prepend: function(a, b, c, d) {
            var e = document.createElement(b);
            for (var f in c) e[f] = c[f];
            return a.insertBefore(e, d || a.firstChild), e
        },
        empty: function(a) {
            while (a.firstChild) a.removeChild(a.firstChild);
            return a
        },
        addClass: function(a, b) {
            return a.className = a.className ? a.className + " " + b : b, a
        },
        removeClass: function(a, b) {
            var c = (" " + a.className + " ").replace(" " + b + " ", " ");
            return a.className = c.substring(1, c.length - 1), a
        },
        hasClass: function(a, b) {
            return (" " + a.className + " ").indexOf(" " + b + " ") >= 0
        },
        transformOrigin: function(a, b) {
            a.style.transformOrigin = a.style.webkitTransformOrigin = a.style.msTransformOrigin = b.x + "px " + b.y + "px"
        },
        transform: cap.notransform ? function(a, b, c, d) {
            a.style.transform = a.style.webkitTransform = a.style.msTransform = b + "(" + c + ")", a.style.left = d.x + "px", a.style.top = d.y + "px"
        } : function(a, b, c, d) {
            a.style.transform = a.style.webkitTransform = a.style.msTransform = "translate(" + d.x + "px, " + d.y + "px) " + b + "(" + c + ")"
        },
        translate: cap.notransform ? function(a, b) {
            a.style.transform = a.style.webkitTransform = a.style.msTransform = "", a.style.left = b.x + "px", a.style.top = b.y + "px"
        } : function(a, b, c) {
            a.style.transform = a.style.webkitTransform = a.style.msTransform = "translate(" + b.x + "px, " + b.y + "px)"
        },
        transition: function(a, b) {
            a.style.transition = b ? ANIMATION_INTERVAL + "ms" : "none"
        },
        transitionEnd: function(a, b) {
            a.addEventListener("transitionend", b)
        },
        loadStyle: function(a, b) {
            $.append(document.head, "link", {
                rel: "stylesheet",
                type: "text/css",
                media: b || "all",
                href: a
            })
        },
        loadScript: function(a, b) {
            var c = {
                src: a
            };
            if (b) {
                var d = setTimeout(b, SCRIPT_TIMEOUT, !1);
                c.onload = function() {
                    clearTimeout(d), b(!0)
                }, c.onerror = function() {
                    clearTimeout(d), b(!1)
                }, c.onreadystatechange = function() {
                    if (this.readyState != "loaded") return;
                    clearTimeout(d), setTimeout(b, 42, !0)
                }
            }
            $.append(document.head, "script", c)
        },
        getJson: function(a, b) {
            var c = new XMLHttpRequest,
                d = function(a) {
                    b(a.type == "load" && a.target.status == 200 ? JSON.parse(a.target.response) : null)
                };
            return c.onload = d, c.ontimeout = d, c.onerror = d, c.timeout = SCRIPT_TIMEOUT, c.open("GET", a), c.send(), c
        },
        isHD: function() {
            return defaultHd == undefined && (window.devicePixelRatio ? defaultHd = devicePixelRatio > 1.2 ? 1 : 0 : navigator.userAgent.indexOf("IEMobile/") > 0 || navigator.userAgent.indexOf("WPDesktop") > 0 ? defaultHd = 1 : window.matchMedia ? defaultHd = matchMedia("(min-resolution: 115dpi)").matches ? 1 : 0 : defaultHd = 0), defaultHd
        },
        onMap: function(a) {
            if ($.hasClass(a.target, "ldmap_maparea") || cap.vml && a.target.scopeName == "g_vml_") return !0;
            var b = a.target;
            while (b && !$.hasClass(b, "ldmap_overlay")) b = b.parentElement;
            return b ? $.hasClass(b, "ldmap_markerholder") ? (a.activeElement = b, !0) : !1 : !1
        },
        fastClick: function(a, b) {
            if ("ontouchstart" in window) {
                var c = !1,
                    d = null;
                a.addEventListener("touchstart", function() {
                    clearTimeout(d), c = !0
                }), a.addEventListener("touchend", function(a) {
                    x = Date.now(), b(a), d = setTimeout(function() {
                        c = !1
                    }, 400)
                })
            }
            a.addEventListener("click", function(a) {
                if (c) return;
                b(a)
            })
        },
        validateLocation: function(a) {
            return a && m.isPointInRect(a.lon, a.lat, -180, -90, 180, 90)
        },
        pointToLocation: function(a, b) {
            return {
                lon: a.minLon + b.x / a.pointPerDegree,
                lat: a.normToLat(a.maxLat - b.y / a.pointPerDegree)
            }
        },
        locationToPoint: function(a, b) {
            return {
                x: Math.round((b.lon - a.minLon) * a.pointPerDegree),
                y: Math.round((a.maxLat - a.latToNorm(b.lat)) * a.pointPerDegree)
            }
        },
        pointToTile: function(a) {
            return {
                u: a.x >> TILEEXP >> a.z,
                v: a.y >> TILEEXP >> a.z,
                w: a.z
            }
        },
        tileToPoint: function(a) {
            return {
                x: a.ux << TILEEXP << a.w,
                y: a.v << TILEEXP << a.w
            }
        },
        boundOfTile: function(a, b) {
            b.ux == undefined && (b.ux = b.u);
            var c = $.pointToLocation(a, $.tileToPoint(b)),
                d = $.pointToLocation(a, $.tileToPoint({
                    ux: b.ux + 1,
                    v: b.v + 1,
                    w: b.w
                }));
            return {
                minLon: c.lon,
                minLat: d.lat,
                maxLon: d.lon,
                maxLat: c.lat
            }
        },
        addLocation: function(a, b) {
            return {
                lon: a.lon + b.lon,
                lat: a.lat + b.lat
            }
        },
        subLocation: function(a, b) {
            return {
                lon: a.lon - b.lon,
                lat: a.lat - b.lat
            }
        },
        makeLocation: function(a) {
            return {
                lon: a.x,
                lat: a.y
            }
        },
        copyLocation: function(a) {
            return {
                lon: a.lon,
                lat: a.lat
            }
        },
        centerOfBound: function(a) {
            return {
                lon: (+a.minLon + +a.maxLon) / 2,
                lat: (+a.minLat + +a.maxLat) / 2
            }
        },
        sizeOfBound: function(a) {
            return {
                width: +a.maxLon - +a.minLon,
                height: +a.maxLat - +a.minLat
            }
        },
        polygonPivot: function(a) {
            var b = a[0],
                c = b.lat,
                d = c;
            for (var e = 1, b; b = a[e]; ++e) {
                if (b === !0) break;
                b.lat < c ? c = b.lat : b.lat > d && (d = b.lat)
            }
            var f = (c + d) / 2,
                g = 181,
                h = null;
            for (var e = 1, i, j = a[0]; i = j, j = a[e]; ++e) {
                if (j === !0) break;
                var k = m.lineIntersectPoint(-181, f, 181, f, i.lon, i.lat, j.lon, j.lat, !0);
                k && k.b && k.b < 1 && (k.x < g ? (h = g, g = k.x) : k.x < h && (h = k.x))
            }
            return {
                lon: (g + h) / 2,
                lat: f
            }
        },
        polylinePivot: function(a) {
            var b = a.length >> 1,
                c = a[b],
                d = a[b - 1];
            return {
                lon: (3 * c.lon + d.lon) / 4,
                lat: (3 * c.lat + d.lat) / 4
            }
        },
        locationBound: function(a) {
            var b = a[0],
                c = b.lon,
                d = c,
                e = b.lat,
                f = e;
            for (var g = 1, b; b = a[g]; ++g) b.lon < c ? c = b.lon : b.lon > d && (d = b.lon), b.lat < e ? e = b.lat : b.lat > f && (f = b.lat);
            return {
                minLon: c,
                minLat: e,
                maxLon: d,
                maxLat: f
            }
        },
        averageLocation: function(a, b, c) {
            var d = $.locationToPoint(a, b),
                e = $.locationToPoint(a, c),
                f = {
                    x: (d.x + e.x) / 2,
                    y: (d.y + e.y) / 2
                };
            return $.pointToLocation(a, f)
        },
        distance: function(a, b) {
            var c = 0;
            for (var d = 1, e, f = a[0]; e = f, f = a[d]; ++d) {
                var g = f.lat * RAD,
                    h = e.lat * RAD,
                    i = g - h,
                    j = (f.lon - e.lon) * RAD,
                    k = m.square(Math.sin(i / 2)) + Math.cos(g) * Math.cos(h) * m.square(Math.sin(j / 2));
                c += Math.atan2(Math.sqrt(k), Math.sqrt(1 - k)) * EARTH_DIAMETER
            }
            return b ? $.formatDistance(c, b) : c
        },
        area: function(a, b) {
            var c = 0,
                d = a[0].lat,
                e = d;
            for (var f = 1, g, h = a[0]; g = h, h = a[f]; ++f) h === !0 ? h = a[++f] : (c += g.lon * h.lat - h.lon * g.lat, h.lat < d ? d = h.lat : h.lat > e && (e = h.lat));
            if (b === !0) return c / 2;
            var i = (d + e) / 2;
            return c = Math.abs(c) / 2 * $.longitudeLength(i) * $.latitudeLength(i), $.formatAllArea(c, b)
        },
        areaCircle: function(a, b) {
            var c = Math.PI * m.square(a[1] * ($.longitudeLength(a[0].lat) + $.latitudeLength(a[0].lat)) / 2);
            return $.formatAllArea(c, b)
        },
        contains: function(a, b) {
            var c = !1;
            for (var d = 1, e, f = b[0]; e = f, f = b[d]; ++d)
                if (f === !0) f = b[++d];
                else {
                    var g = m.closestPointOnLine(a.lon, a.lat, e.lon, e.lat, f.lon, f.lat);
                    if (g.x == a.lon && g.y == a.lat) return null;
                    m.isPointCrossLine(a.lon, a.lat, e.lon, e.lat, f.lon, f.lat) && (c = !c)
                } return c
        },
        translateGeom: function(a, b) {
            var c = [];
            for (var d = 0, e; e = a[d]; ++d) c.push(e.lon ? this.addLocation(e, b) : e);
            return c
        },
        rotateGeom: function(a, b, c) {
            var d = [];
            for (var e = 0, f; f = a[e]; ++e) {
                var g = f.lon - b.lon,
                    h = f.lat - b.lat,
                    i = m.distance(g, h),
                    j = Math.atan2(h, g) + c;
                d.push(f.lon ? {
                    lon: b.lon + i * Math.cos(j),
                    lat: b.lat + i * Math.sin(j)
                } : f)
            }
            return d
        },
        longitudeLength: function(a) {
            var b = a * RAD;
            return 111412.84 * Math.cos(b) + -93.5 * Math.cos(3 * b)
        },
        latitudeLength: function(a) {
            var b = a * RAD;
            return 111132.92 + -559.82 * Math.cos(2 * b) + 1.175 * Math.cos(4 * b)
        },
        sameLocation: function(a, b) {
            return $.isAbsInRange(a.lon - b.lon, 1e-6) && $.isAbsInRange(a.lat - b.lat, 1e-6)
        },
        overlayFromWkt: function(a, b, c) {
            function d(a) {
                if (c) return c;
                switch (a) {
                    case "POINT":
                    case "MULTIPOINT":
                        return longdo.Dot;
                    case "LINESTRING":
                    case "MULTILINESTRING":
                        return longdo.Polyline;
                    case "POLYGON":
                    case "MULTIPOLYGON":
                        return longdo.Polygon;
                    case "GEOMETRYCOLLECTION":
                        return;
                    default:
                        throw "Unsupported WKT"
                }
            }
            var e = [],
                f = a.split(/\s*[\(\)]\s*/);
            f[0] == "MULTIPOINT" && f[1] && (f = a.replace(",", "),(").split(/\s*[\(\)]\s*/));
            var g = [];
            for (var h = 0; h < f.length; ++h) {
                var i = f[h];
                if (!i || i == ",") {
                    g.length && (i == "," && j == longdo.Polygon ? g.push(!0) : (e.push(new j(g, b)), g = []));
                    continue
                }
                if (i[0] == ",") {
                    var j = d(i.substring(1));
                    continue
                }
                if (i.charCodeAt(0) > 57) {
                    var j = d(i);
                    continue
                }
                var k = i.split(/,\s*/);
                for (var l = 0; l < k.length; ++l) {
                    var m = k[l].split(" ");
                    g.push({
                        lon: parseFloat(m[0]),
                        lat: parseFloat(m[1])
                    })
                }
            }
            return e
        },
        overlayToWkt: function(a) {
            var b = "",
                c = a[0];
            if (c instanceof longdo.Dot || c instanceof longdo.Circle) var d = "POINT";
            else if (c instanceof longdo.Polyline) var d = "LINESTRING";
            else {
                if (!(c instanceof longdo.Polygon)) throw "Unsupported Geometry";
                var e = !0,
                    d = "POLYGON"
            }
            for (var f = 0; f < a.length; ++f) {
                b += e ? ",((" : ",(";
                var g = a[f].location();
                if (g.length) {
                    for (var h = 0; h < g.length; ++h) {
                        var i = g[h];
                        i === !0 ? b = b.substring(0, b.length - 1) + "),(" : i.lon && (b += i.lon + " " + i.lat + ",")
                    }
                    b = b.substring(0, b.length - 1) + (e ? "))" : ")")
                } else b += g.lon + " " + g.lat + ")"
            }
            return b = b.substring(1), a.length > 1 ? "MULTI" + d + "(" + b + ")" : d + b
        },
        wktFromWkB: function(a) {
            function b(a) {
                return a
            }
            if (a.substring(0, 2) != "01") return !1;
            switch (a.substring(2, 6)) {
                case "0100":
                    if (a.length < 50) return !1;
                    return "POINT(" + b(a.substring(18, 34)) + " " + b(a.substring(34, 50)) + ")"
            }
            return !1
        },
        locationToDMS: function(a) {
            var b = Math.abs(a.lon),
                c = a.lon < 0 ? "W" : "E",
                d = Math.floor(b),
                e = (b - d).toFixed(6),
                f = Math.floor(60 * e),
                g = Math.round(3600 * (e - f / 60)),
                h = Math.abs(a.lat),
                i = a.lat < 0 ? "S" : "N",
                j = Math.floor(h),
                k = (h - j).toFixed(6),
                l = Math.floor(60 * k),
                m = Math.round(3600 * (k - l / 60));
            return {
                lonDegree: d,
                lonMinute: f,
                lonSecond: g,
                lonHemisphere: c,
                latDegree: j,
                latMinute: l,
                latSecond: m,
                latHemisphere: i
            }
        },
        locationToUTMZone: function(a) {
            return $.isInRange(a.lat, {
                min: -80,
                max: 84
            }) ? {
                zone: Math.floor((a.lon + 180) / 6) + 1,
                hemisphere: a.lat < 0 ? "S" : "N"
            } : null
        },
        locationToGeohash: function(a, b) {
            var c = 0,
                d = 0,
                e = !0,
                f = "",
                g = -180,
                h = -90,
                i = 180,
                j = 90;
            while (f.length < b) {
                if (e) {
                    var k = (g + i) / 2;
                    a.lon > k ? (c = (c << 1) + 1, g = k) : (c = c << 1, i = k)
                } else {
                    var k = (h + j) / 2;
                    a.lat > k ? (c = (c << 1) + 1, h = k) : (c = c << 1, j = k)
                }
                e = !e, ++d == 5 && (f += BASE32.charAt(c), c = 0, d = 0)
            }
            return f
        },
        boundOfGeohash: function(a) {
            if (!a.length) throw "Invalid geohash";
            a = a.toLowerCase();
            var b = !0,
                c = -180,
                d = -90,
                e = 180,
                f = 90;
            for (var g = 0, h; h = a.charAt(g); ++g) {
                var i = BASE32.indexOf(h);
                if (i < 0) throw "Invalid geohash";
                for (var j = 4; j >= 0; --j) {
                    var k = i >> j & 1;
                    if (b) {
                        var l = (c + e) / 2;
                        k ? c = l : e = l
                    } else {
                        var l = (d + f) / 2;
                        k ? d = l : f = l
                    }
                    b = !b
                }
            }
            return {
                minLon: c,
                minLat: d,
                maxLon: e,
                maxLat: f
            }
        },
        isInRange: function(a, b) {
            return a >= b.min && a <= b.max
        },
        isAbsInRange: function(a, b) {
            return a >= -b && a <= b
        },
        bound: function(a, b, c) {
            return a < b ? b : a > c ? c : a
        },
        boundAngle: function(a) {
            var b = a % 360;
            return b < 0 ? b + 360 : b
        },
        lastItem: function(a) {
            return a[a.length - 1]
        },
        pushOrder: function(a, b, c) {
            var d = 0,
                e = a.length - 1;
            while (d <= e) {
                var f = d + e >> 1,
                    g = c(b, a[f]);
                if (!g) {
                    d = f;
                    break
                }
                g < 0 ? d = f + 1 : e = f - 1
            }
            return a.splice(d, 0, b), d
        },
        capFirst: function(a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        },
        formatDate: function(a, b) {
            var c = a.split("-");
            return +c[2] + MONTH[b][+c[1]] + (c[0] - 1957)
        },
        formatTime: function(a) {
            var b = a.split(":");
            return b[0] + ":" + b[1]
        },
        formatDateTimeRange: function(a, b, c) {
            var d = a.split(" "),
                e = b.split(" "),
                f = $.formatDate(d[0], c);
            return d[1] && (f += " " + $.formatTime(d[1])), f += " -", d[0] != e[0] && ([
                [
                    []
                ]
            ], f += " " + $.formatDate(e[0], c)), e[1] && (f += " " + $.formatTime(e[1])), f
        },
        formatInterval: function(a, b) {
            var c = UNIT[b];
            return a >= 3600 ? Math.floor(a / 3600) + c.hr + " " + $.formatInterval(a % 3600, b) : Math.ceil(a / 60) + c.min
        },
        formatDistance: function(a, b) {
            var c = UNIT[b];
            return a >= 1e5 ? $.numberWithCommas(Math.floor(a / 1e3)) + c.km : a >= 1e4 ? (a / 1e3).toFixed(1) + c.km : a >= 1e3 ? (a / 1e3).toFixed(2) + c.km : Math.ceil(a) + c.m
        },
        formatArea: function(a, b) {
            var c = UNIT[b];
            return a >= 1e5 ? $.numberWithCommas((a / 1e6).toFixed(a < 1e10 ? 1 : 0)) + c.sqkm : Math.floor(a) + c.sqm
        },
        formatThaiArea: function(a, b) {
            var c = UNIT[b],
                d = "",
                e = Math.floor(a / 1600);
            e && (d += $.numberWithCommas(e) + c.rai);
            var f = Math.floor(a % 1600 / 400);
            f && (d += " " + f + c.ngan);
            var g = Math.floor(a % 400 / 4);
            return g && (d += " " + g + c.sqwa), d
        },
        formatAllArea: function(a, b) {
            return b ? $.formatArea(a, b) + (a < 16e8 ? "<br />" + $.formatThaiArea(a, b) : "") : a
        },
        formatPoi: function(a, b, c) {
            var d = poiTheme.poiLabel[b],
                e = document.createDocumentFragment();
            a.obsoleted ? $.append(e, "div", {
                className: "ldmap_poi_warning ldmap_poi_obsoleted",
                innerHTML: '<img src="' + d.obsoleted + '" />'
            }) : a.verified || $.append(e, "div", {
                className: "ldmap_poi_warning ldmap_poi_unverified",
                innerHTML: '<img src="' + d.unverified + '" />'
            }), a.address && $.append(e, "div", {
                className: "ldmap_poi_item ldmap_poi_address",
                innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.addressIcon + '" /><div class="ldmap_poi_info">' + a.address + "</div>"
            }), a.tel && $.append(e, "div", {
                className: "ldmap_poi_item ldmap_poi_tel",
                innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.telIcon + '" /><div class="ldmap_poi_info">' + a.tel + "</div>"
            });
            if (a.working_hours) {
                var f = new Date,
                    g = f.toTimeString().substring(0, 5),
                    h = DOW.en[f.getDay()],
                    i = DOW[b],
                    j = d.close,
                    k = a.working_hours.hours,
                    l = "";
                for (var m = 1, n = 0, o, p; o = k[n], p = DOW.en[m]; ++m) o && o.day == p.toLowerCase() ? (++n, l += '<span class="ldmap_poi_dow">' + i[m] + "</span>" + o.start + " - " + o.end + "<br />", p == h && (j = (g >= o.start && g <= o.end ? d.open : d.after) + o.start + " - " + o.end)) : l += '<span class="ldmap_poi_dow">' + i[m] + "</span>" + d.close + "<br />";
                var q = $.append(e, "div", {
                    className: "ldmap_poi_item ldmap_poi_open",
                    innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.openIcon + '" /><div class="ldmap_poi_info">' + j + ' <img class="ldmap_arrow" src="' + uiTheme.arrowDown + '" /></div><div class="ldmap_poi_info_hidden">' + l + a.working_hours.remark + "</div>"
                });
                q.addEventListener("click", function() {
                    q.lastChild.className == "ldmap_poi_info_hidden" ? (q.children[1].className = "ldmap_poi_info_hidden", q.lastChild.className = "ldmap_poi_info") : (q.children[1].className = "ldmap_poi_info", q.lastChild.className = "ldmap_poi_info_hidden")
                })
            }
            a.url && $.append(e, "div", {
                className: "ldmap_poi_item ldmap_poi_url",
                innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.urlIcon + '" /><div class="ldmap_poi_info"><a href="' + a.url + '" target="_blank">' + a.url + "</a></div>"
            });
            if (a.line)
                for (var m = 0; p = a.line[m]; ++m) $.append(e, "div", {
                    className: "ldmap_poi_i[tem ldmap_poi_line",
                    innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.lineIcon + '" /><div class="ldmap_poi_info"><a href="' + p.line_link + '" target="_blank">' + (p.line_id || p.line_link) + "</a></div>"
                });
            if (poiTheme.tagCount && a.tag) {
                var r = a.tag[0],
                    s = Math.min(a.tag.length, poiTheme.tagCount);
                for (var m = 1; m < s; ++m) r += ", " + a.tag[m];
                a.tag.length > poiTheme.tagCount && (r += ", ..."), $.append(e, "div", {
                    className: "ldmap_poi_item ldmap_poi_tag",
                    innerHTML: '<img class="ldmap_poi_icon" src="' + poiTheme.tagIcon + '" /><div class="ldmap_poi_info">' + r + "</div>"
                })
            }
            return !c && a.type == "poi" && $.append(e, "div", {
                className: "ldmap_poi_menu",
                innerHTML: '<a class="ldmap_poi_detail" href="https://map.longdo.com/p/' + a.id + '/info" target="_blank">' + d.detail + '</a>        <a class="ldmap_poi_edit" href="https://map.longdo.com/p/' + a.id + '/edit" target="_blank">' + d.edit + '</a>        <a class="ldmap_poi_snippet" href="https://map.longdo.com/createsnippet?snippetpoi=' + a.id + '" target="_blank">snippet</a>'
            }), e
        },
        labelOptions: function(a, b, c) {
            var d = 0,
                e = (a + "").split(/<br\s*\/?>/);
            for (var f = 0, g; g = e[f]; ++f) g.length > d && (d = g.length);
            var h = geometryTheme.labelCharSize,
                i = {
                    icon: {
                        html: '<div class="ldmap_geomlabel">' + a + "</div>",
                        offset: {
                            x: d * h.width,
                            y: c.editable && (c.draggable || c.rotatable) ? -9 : e.length * h.height
                        }
                    }
                };
            for (var j in b) i[j] = b[j];
            return i
        },
        numberWithCommas: function(a) {
            return (a + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        hexToRgba: function(a) {
            var b = a.length > 7 ? parseInt(a.substring(7, 9), 16) / 255 : 1;
            return "rgba(" + parseInt(a.substring(1, 3), 16) + "," + parseInt(a.substring(3, 5), 16) + "," + parseInt(a.substring(5, 7), 16) + "," + b + ")"
        },
        radianToDir: function(a) {
            return a ? Math.floor(a * 2 / Math.PI + .5) % 4 : 0
        },
        noop: function() {}
    }, longdo.Server = server;
    var $ = longdo.Util,
        IMAGE_SUFFIX = $.isHD() ? IMAGE_SUFFIX_HD : IMAGE_SUFFIX_SD;

    function booleanOperation(a, b, c, d, e) {
        function n(a, b, c, d) {
            o(a, !0), o(b, !1);
            while (i.length) {
                var e = i.pop();
                e.left ? (u(e), w(e), x(e, e.next), x(e, e.prev)) : (e = e.other, (!e.type && (e.source && e.inside == c || !e.source && e.inside == d) || e.type == g && c == d || e.type == h && c != d) && z(e), v(e), x(e.prev, e.next))
            }
        }

        function o(a, b) {
            for (var c = 1, d, e = a[0]; d = e, e = a[c]; ++c)
                if (e === !0) e = a[++c];
                else {
                    var f = p(e, b),
                        g = p(d, b);
                    f.other = g, g.other = f, (q(f, g) < 0 ? f : g).left = !0, $.pushOrder(i, f, q), $.pushOrder(i, g, q)
                }
        }

        function p(a, b) {
            return {
                lon: a.lon,
                lat: a.lat,
                source: b
            }
        }

        function q(a, b) {
            return a.lon - b.lon || a.lat - b.lat || (a.left == b.left ? -r(a, b.other) : a.left ? 1 : -1)
        }

        function r(a, b) {
            return (a.left ? s(a, a.other, b) : s(a.other, a, b)) > 0 ? 1 : -1
        }

        function s(a, b, c) {
            return (a.lon - c.lon) * (b.lat - c.lat) - (a.lat - c.lat) * (b.lon - c.lon)
        }

        function t(a, b) {
            return s(a, a.other, b) != 0 || s(a, a.other, b.other) != 0 ? $.sameLocation(a, b) ? r(a, b.other) : q(a, b) ? -r(b, a) : r(a, b) : $.sameLocation(a, b) ? -1 : q(a, b)
        }

        function u(a) {
            var b = j;
            while (b && t(a, b) < 0) {
                var c = b;
                b = b.next
            }
            c ? (a.prev = c, c.next = a) : j = a, b && (a.next = b, b.prev = a)
        }

        function v(a) {
            a.prev ? a.prev.next = a.next : j = a.next, a.next && (a.next.prev = a.prev)
        }

        function w(a) {
            var b = a.prev;
            if (!b) a.inside = !1, a.inOut = !1;
            else if (b.type)
                if (b.prev) a.source == b.source ? (a.inside = !b.prev.inOut, a.inOut = !b.inOut) : (a.inside = !b.inOut, a.inOut = !b.prev.inOut);
                else {
                    var c = a.source == b.source;
                    a.inside = !c, a.inOut = c
                }
            else a.source == b.source ? (a.inside = b.inside, a.inOut = !b.inOut) : (a.inside = !b.inOut, a.inOut = b.inside)
        }

        function x(a, b) {
            if (!a || !b) return;
            var c = m.lineIntersectPoint(a.lon, a.lat, a.other.lon, a.other.lat, b.lon, b.lat, b.other.lon, b.other.lat, a.source == b.source);
            if (!c)
                if ($.sameLocation(a, b))
                    if ($.sameLocation(a.other, b.other)) c = [0, 1];
                    else return;
            else {
                if (!$.sameLocation(a.other, b)) return;
                if ($.sameLocation(a, b.other)) c = [0, 1];
                else return
            }
            c.a > 1e-6 && c.a < .999999 && y(a, $.makeLocation(c)), c.b > 1e-6 && c.b < .999999 && y(b, $.makeLocation(c));
            if (!c.length) return;
            if (c[0] <= 0) {
                var d = c[0] < 0 ? y(b, a) : b;
                a.type = f, d.type = a.inOut == b.inOut ? g : h, c[1] < .999999 ? y(a, d.other) : c[1] > 1.000001 && y(d, a.other)
            }
        }

        function y(a, b) {
            var c = p(b, a.source),
                d = p(b, a.source),
                e = a.other;
            return d.left = !0, a.other = c, c.other = a, d.other = e, e.other = d, $.pushOrder(i, c, q), $.pushOrder(i, d, q), d
        }

        function z(a) {
            var b = a.other;
            for (var c = 0, d; d = k[c]; ++c) {
                if ($.sameLocation(d.first, a)) {
                    A(d, c, b);
                    return
                }
                if ($.sameLocation(d.last, a)) {
                    B(d, c, b);
                    return
                }
                if ($.sameLocation(d.first, b)) {
                    A(d, c, a);
                    return
                }
                if ($.sameLocation(d.last, b)) {
                    B(d, c, a);
                    return
                }
            }
            a.chain = b, k.push({
                first: a,
                last: b
            })
        }

        function A(a, b, c) {
            $.sameLocation(a.last, c) ? C(b) : D(a, b, c, !0) || (c.chain = a.first, a.first = c)
        }

        function B(a, b, c) {
            $.sameLocation(a.first, c) ? C(b) : D(a, b, c, !1) || (a.last.chain = c, a.last = c)
        }

        function C(a) {
            var b = [],
                c = k.splice(a, 1)[0].first,
                d = c;
            do b.push($.copyLocation(d)), d = d.chain; while (d);
            b.push($.copyLocation(c)), b.cw = $.area(b, !0) > 0;
            for (var e = 0, f; f = l[e]; ++e) $.contains(f[0], b) && f.cw == b.cw && (f.reverse(), f.cw = !f.cw);
            l.push(b)
        }

        function D(a, b, c, d) {
            for (var e = b + 1, f; f = k[e]; ++e) {
                if ($.sameLocation(f.first, c)) return d && E(a), F(a, f, e), !0;
                if ($.sameLocation(f.last, c)) return d || E(a), F(f, a, b), !0
            }
            return !1
        }

        function E(a) {
            a.last = a.first;
            var b = a.first,
                c = b.chain;
            delete b.chain;
            var d = c.chain;
            while (d) c.chain = b, b = c, c = d, d = d.chain;
            a.first = c, c.chain = b
        }

        function F(a, b, c) {
            a.last.chain = b.first, a.last = b.last, k.splice(c, 1)
        }
        var f = 1,
            g = 2,
            h = 3,
            i = [],
            j = null,
            k = [],
            l = [];
        n(a.location(), b.location(), c, d), locationList = l[0];
        if (!locationList) return null;
        for (var G = 1; G < l.length; ++G) locationList.push(!0), locationList = locationList.concat(l[G]);
        return new longdo.Polygon(locationList, e)
    }
    var LOG2 = Math.log(2),
        PI2 = Math.PI * 2,
        RAD = Math.PI / 180,
        PIh = Math.PI / 2,
        PIq = Math.PI / 4;
    longdo.Math = {
        square: function(a) {
            return a * a
        },
        distance: function(a, b) {
            return Math.sqrt(a * a + b * b)
        },
        isPointInRect: function(a, b, c, d, e, f) {
            return a >= c && a <= e && b >= d && b <= f
        },
        isPointInPolygon: function(a, b) {
            var c = !1;
            for (var d = 1, e, f = b[0]; e = f, f = b[d]; ++d) f === !0 ? f = b[++d] : m.isPointCrossLine(a.x, a.y, e.x, e.y, f.x, f.y) && (c = !c);
            return c
        },
        isPointOnPolyline: function(a, b, c) {
            c = c || 0;
            for (var d = 1, e, f = b[0]; e = f, f = b[d]; ++d)
                if (f === !0) f = b[++d];
                else {
                    var g = m.closestPointOnLine(a.x, a.y, e.x, e.y, f.x, f.y);
                    if ($.isAbsInRange(a.x - g.x, c) && $.isAbsInRange(a.y - g.y, c)) return !0
                } return !1
        },
        isPointCrossLine: function(a, b, c, d, e, f) {
            return d > b != f > b && a < (c - e) / (d - f) * (b - f) + e
        },
        closestPointOnLine: function(a, b, c, d, e, f) {
            var g = e - c,
                h = f - d;
            if (!g && !h) return {
                x: c,
                y: d
            };
            var i = ((a - c) * g + (b - d) * h) / (g * g + h * h);
            return i < 0 ? {
                x: c,
                y: d
            } : i > 1 ? {
                x: e,
                y: f
            } : {
                x: c + i * g,
                y: d + i * h
            }
        },
        lineIntersectPoint: function(a, b, c, d, e, f, g, h, i) {
            var j = e - a,
                k = f - b,
                l = c - a,
                m = d - b,
                n = g - e,
                o = h - f,
                p = l * o - m * n,
                q = l * l + m * m,
                r = n * n + o * o;
            if (p * p > 1e-12 * q * r) {
                var s = (o * j - n * k) / p;
                if (s < -0.000001 || s > 1.000001) return null;
                var t = (m * j - l * k) / p;
                return t < -0.000001 || t > 1.000001 ? null : {
                    x: a + s * l,
                    y: b + s * m,
                    a: s,
                    b: t
                }
            }
            if (i) return null;
            var u = j * j + k * k;
            p = j * m - k * l;
            if (p * p > 1e-12 * q * u) return null;
            var v = (l * j + m * k) / q,
                w = v + (l * n + m * o) / q;
            if (v < w) var x = v,
                y = w;
            else var x = w,
                y = v;
            return x < .999999 && y > 1e-6 ? [x, y] : null
        },
        rotateVector: function(a, b) {
            var c = Math.cos(b),
                d = Math.sin(b);
            return {
                x: a.x * c + a.y * d,
                y: a.y * c - a.x * d
            }
        }
    };
    var m = longdo.Math;
    var LAYER_BLANK = server.map + "images/layer-blank.png",
        LAYER_CLEAR = server.map + "images/layer-clear.png";
    longdo.LayerType = {
        WMS: "WMS",
        TMS: "TMS",
        WMTS: "WMTS",
        WMTS_REST: "WMTS_REST",
        ArcGIS_REST: "ArcGIS_REST",
        Mapbox: "Mapbox",
        Custom: "Custom",
        Longdo: "Longdo"
    }, longdo.Layer = function(a, b) {
        var c = null,
            d = {
                min: 1,
                max: 99
            },
            e = null;
        this.name = function() {
            return a
        }, this.image = function(a, b, c) {
            var f = a.maxZoom - b.w;
            if (f < d.min || f > d.max) return null;
            if (this.tile && (b.u < this.tile.minU >> b.w || b.u > this.tile.maxU >> b.w || b.v < this.tile.minV >> b.w || b.v > this.tile.maxV >> b.w)) return null;
            var g = e(a, b, f, c);
            return g && this.refresh && (g += "&time=" + (Date.now() / this.refresh | 0)), g
        }, a = a || "", b = b || {}, c = b.url || server.layer;
        switch (b ? b.type : null) {
            case longdo.LayerType.WMS:
                if (!b.url) throw "Invalid URL";
                var f = b.styles || "",
                    g = b.format || "image/png",
                    h = b.extraQuery ? "&" + b.extraQuery : "";
                e = function(d, e, i, j) {
                    var k = d.normSize / (1 << i),
                        l = d.minX + e.u * k,
                        m = d.maxY - e.v * k,
                        n = TILESIZE;
                    return c + "?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&SRS=" + (b.srs || d.srs) + "&BBOX=" + l + "," + (m - k) + "," + (l + k) + "," + m + "&WIDTH=" + n + "&HEIGHT=" + n + "&LAYERS=" + a + "&STYLES=" + f + "&TRANSPARENT=true&TILED=true&FORMAT=" + g + "&EXCEPTIONS=BLANK" + h
                };
                break;
            case longdo.LayerType.TMS:
                if (!b.url) throw "Invalid URL";
                var g = b.format || "png",
                    i = isFinite(b.zoomOffset) ? b.zoomOffset : -1,
                    j = c;
                a && (j += "/" + a), e = function(a, b, c, d) {
                    return j + "/" + (c + i) + "/" + b.u + "/" + ((1 << c) - 1 - b.v) + "." + g
                };
                break;
            case longdo.LayerType.WMTS:
                if (!b.url) throw "Invalid URL";
                var f = b.styles || "default",
                    g = b.format || "image/png",
                    h = b.extraQuery ? "&" + b.extraQuery : "",
                    k = b.tileMatrix || function(a) {
                        return a
                    };
                e = function(d, e, i, j) {
                    var l = b.srs || d.srs;
                    return c + "?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + a + "&STYLE=" + f + "&TILEMATRIXSET=" + l + "&TILEMATRIX=" + k(i) + "&TILEROW=" + e.v + "&TILECOL=" + e.u + "&FORMAT=" + g + h
                };
                break;
            case longdo.LayerType.WMTS_REST:
                if (!b.url) throw "Invalid URL";
                var j = c;
                a && (j += "/" + a), b.styles && (j += "/" + b.styles);
                var g = b.format || "png";
                e = function(a, c, d, e) {
                    return j + "/" + (b.srs || a.srs) + "/" + d + "/" + c.u + "/" + c.v + "." + g
                };
                break;
            case longdo.LayerType.ArcGIS_REST:
                if (!b.url) throw "Invalid URL";
                var j = c;
                a && (j += "/" + a + "/MapServer");
                var l = b.key ? "?token=" + b.key : "";
                e = function(a, b, c, d) {
                    return j + "/tile/" + c + "/" + b.v + "/" + b.u + l
                };
                break;
            case longdo.LayerType.Mapbox:
                var g = b.format || "png";
                e = function(c, d, e, f) {
                    return server.mapb + a + "/" + e + "/" + d.u + "/" + d.v + "." + g + "?access_token=" + b.key
                };
                break;
            case longdo.LayerType.Custom:
                if (!b.url) throw "Invalid URL";
                e = b.url;
                break;
            default:
                e = function(b, d, e, f) {
                    var g = 1 << e;
                    return c + "?c=1&proj=" + b.longdoName + "&mode=" + a + "&res=" + g + "&imgid=" + (d.v * g + d.u) * 923456789 + (f ? "&HD=" + f : "") + "&key=" + apikey
                }
        }
        if (b.zoomRange) {
            if (b.zoomRange.min < 1 || b.zoomRange.min > b.zoomRange.max) throw "Invalid range";
            d = b.zoomRange
        }
        if (b.refresh) {
            if (b.refresh < 0) throw "Invalid refresh";
            this.refresh = b.refresh * 1e3
        }
        this.opacity = b.opacity || 1, b.weight && (this.weight = b.weight), b.bound && (this.bound = b.bound)
    }, longdo.Layers = {
        NORMAL: new longdo.Layer("normal", {
            url: server.coreLayer
        }),
        NORMAL_EN: new longdo.Layer("normal-en", {
            url: server.coreLayer
        }),
        GRAY: new longdo.Layer("gray", {
            url: server.coreLayer
        }),
        GRAY_EN: new longdo.Layer("gray-en", {
            url: server.coreLayer
        }),
        POI: new longdo.Layer("icons", {
            url: server.coreLayer
        }),
        POI_EN: new longdo.Layer("icons-en", {
            url: server.coreLayer
        }),
        POLITICAL: new longdo.Layer("politicalwhite", {
            url: server.coreLayer
        }),
        POLITICAL_EN: new longdo.Layer("politicalwhite-en", {
            url: server.coreLayer
        }),
        POLITICAL_NOLABEL: new longdo.Layer("politicalwhitenolabel"),
        BASE: new longdo.Layer("base", {
            url: server.coreLayer
        }),
        HYDRO: new longdo.Layer("hydro", {
            url: server.coreLayer
        }),
        OSM: new longdo.Layer("osm", {
            url: server.coreLayer
        }),
        LONGDO_OSM: new longdo.Layer("longdo_osm", {
            url: server.coreLayer
        }),
        OPENCYCLE: new longdo.Layer("osm_opencycle", {
            url: server.coreLayer
        }),
        TERRAIN: new longdo.Layer("bluemarble_terrain"),
        GISTDA_SPOT5: new longdo.Layer("gistda_spot5"),
        THAICHOTE: new longdo.Layer("thaichote", {
            url: server.gistda,
            zoomRange: SATELLITE_RANGE
        }),
        TOMTOM_NORMAL: new longdo.Layer("tomnormal", {
            url: server.tomtom
        }),
        TOMTOM_POI: new longdo.Layer("tomicons", {
            url: server.tomtom
        }),
        TOMTOM_HYDRO: new longdo.Layer("tomhydro", {
            url: server.tomtom
        }),
        BLANK: new longdo.Layer("blank", {
            type: longdo.LayerType.Custom,
            url: function(a, b, c, d) {
                return LAYER_BLANK
            }
        }),
        CLEAR: new longdo.Layer("clear", {
            type: longdo.LayerType.Custom,
            url: function(a, b, c, d) {
                return LAYER_CLEAR
            }
        }),
        CHECKERED: new longdo.Layer("checkered", {
            type: longdo.LayerType.Custom,
            url: function(a, b, c, d) {
                return b.u % 2 ^ b.v % 2 ? LAYER_BLANK : LAYER_CLEAR
            }
        }),
        POI_TRANSPARENT: new longdo.Layer("iconstransp", {
            url: server.coreLayer,
            zoomRange: SATELLITE_RANGE
        }),
        POI_TRANSPARENT_EN: new longdo.Layer("iconstransp-en", {
            url: server.coreLayer,
            zoomRange: SATELLITE_RANGE
        }),
        TRAFFIC: new longdo.Layer("trafficoverlay", {
            url: server.traffic,
            zoomRange: TRAFFIC_RANGE,
            refresh: TRAFFIC_REFRESH
        }),
        GOOGLE_ROADMAP: new longdo.Layer("google.ROADMAP"),
        GOOGLE_TRAFFIC: new longdo.Layer("google.ROADMAP.traffic"),
        GOOGLE_SATELLITE: new longdo.Layer("google.SATELLITE"),
        GOOGLE_HYBRID: new longdo.Layer("google.HYBRID"),
        byName: function(a) {
            for (var b in this) {
                var c = this[b];
                if (c.name && c.name() == a) return c
            }
            return null
        }
    }, longdo.Projections = {
        EPSG3857: {
            srs: "EPSG:3857",
            minLon: -180,
            maxLat: 180,
            size: 360,
            minX: -20037508.342789,
            maxY: 20037508.342789,
            normSize: 40075016.685578,
            maxZoom: 20,
            maxResolution: 1 << 20,
            maxPointX: 1 << 20 << TILEEXP,
            maxPointY: 1 << 20 << TILEEXP,
            ratio: 1,
            pointPerDegree: (1 << 20 << TILEEXP) / 360,
            normToLat: function(a) {
                return (Math.atan(Math.exp(a * RAD)) - PIq) * 360 / Math.PI
            },
            latToNorm: function(a) {
                return Math.log(Math.tan(Math.PI * (.25 + a / 360))) / RAD
            },
            longdoName: "epsg3857"
        },
        EPSG4326: {
            srs: "EPSG:4326",
            minLon: -180,
            maxLat: 90,
            size: 360,
            minX: -180,
            maxY: 90,
            normSize: 360,
            maxZoom: 20,
            maxResolution: 1 << 20,
            maxPointX: 1 << 20 << TILEEXP,
            maxPointY: 1 << 19 << TILEEXP,
            ratio: .5,
            pointPerDegree: (1 << 20 << TILEEXP) / 360,
            normToLat: function(a) {
                return a
            },
            latToNorm: function(a) {
                return a
            },
            longdoName: "epsg4326"
        },
        getBound: function(a) {
            return {
                minLon: a.minLon,
                minLat: a.normToLat(a.maxLat - a.size * a.ratio),
                maxLon: a.minLon + a.size,
                maxLat: a.normToLat(a.maxLat)
            }
        }
    };
    longdo.LayerCollection = function(a) {
        function e(b) {
            b.refresh && (b.timer = setInterval(a.repaint, b.refresh, b));
            if (b.bound) {
                var c = $.locationToPoint(a.projection(), {
                        lon: b.bound.minLon,
                        lat: b.bound.maxLat
                    }),
                    d = $.locationToPoint(a.projection(), {
                        lon: b.bound.maxLon,
                        lat: b.bound.minLat
                    });
                b.tile = {
                    minU: c.x >> TILEEXP,
                    minV: c.y >> TILEEXP,
                    maxU: d.x >> TILEEXP,
                    maxV: d.y >> TILEEXP
                }
            }
            a.repaint("M").Event.fire("layerChange", b)
        }

        function f(b) {
            c.name = b.split(".");
            if (c.placeholder) {
                longdo.callback["externalmap" + a.id()]();
                return
            }
            longdo.callback["externalmap" + a.id()] = function() {
                c.placeholder || (c.placeholder = $.append(a.placeholder().getElementsByClassName("ldmap_frameholder")[0], "div", {
                    className: "ldmap_externalmap"
                }), c.location = function() {
                    var b = a.location();
                    c.map.setCenter(new google.maps.LatLng(b.lat, b.lon))
                }, c.zoom = function() {
                    var b = a.zoom();
                    c.placeholder.style.display = b > 19 ? "none" : "block", c.map.setZoom(b), c.location()
                }, c.resize = function() {
                    google.maps.event.trigger(c.map, "resize"), c.location()
                });
                var b = a.location();
                if (c.name[0] == "google") c.map = new google.maps.Map(c.placeholder, {
                    zoom: a.zoom(),
                    center: new google.maps.LatLng(b.lat, b.lon),
                    mapTypeId: google.maps.MapTypeId[c.name[1]],
                    disableDefaultUI: !0,
                    disableDoubleClickZoom: !0,
                    draggable: !1,
                    keyboardShortcuts: !1,
                    scrollwheel: !1
                }), c.name[2] == "traffic" && (new google.maps.TrafficLayer).setMap(c.map);
                else throw "Unsupport map provider";
                $.addClass(a.Ui.BottomLeft, "ldmap_external_bottom"), $.addClass(a.Ui.BottomRight, "ldmap_external_bottom"), a.Event.bind("location", c.location), a.Event.bind("zoom", c.zoom), a.Event.bind("resize", c.resize)
            };
            if (window.google && google.maps && google.maps.version[0] >= "3") {
                longdo.callback["externalmap" + a.id()]();
                return
            }
            $.loadScript(server.mapg + "?language=" + a.language() + "&callback=longdo.callback.externalmap" + a.id() + (d.googleQuery ? "&" + d.googleQuery : ""))
        }

        function g() {
            $.empty(c.placeholder), c.map = null, c.name = null, $.removeClass(a.Ui.BottomLeft, "ldmap_external_bottom"), $.removeClass(a.Ui.BottomRight, "ldmap_external_bottom"), a.Event.unbind("location", c.location), a.Event.unbind("zoom", c.zoom), a.Event.unbind("resize", c.resize)
        }
        var b = [],
            c = {},
            d = {};
        this.setBase = function(a) {
            if (a instanceof longdo.Layer) return c.map && g(), a.name().indexOf("google.") || (f(a.name()), a = longdo.Layers.CLEAR), b[0] = a, e(a), this;
            throw "Not layer"
        }, this.add = function(a) {
            if (a instanceof longdo.Layer) {
                if (!a.name().indexOf("google.")) throw "External map must be base layer, user setBase instead";
                var c = b.length;
                for (var d = c - 1; d; --d) {
                    var f = b[d];
                    if (a == f) return this;
                    a.weight > f.weight && (c = d)
                }
                return b.splice(c, 0, a), e(a), this
            }
            throw "Not layer"
        }, this.insert = function(a, c) {
            if (a <= 0) throw "Invalid index";
            if (c instanceof longdo.Layer) return b.indexOf(c) > 0 ? this : (b.splice(a, 0, c), e(c), this);
            throw "Not layer"
        }, this.remove = function(c) {
            if (c instanceof longdo.Layer) {
                var d = b.indexOf(c);
                return d > 0 && (c.timer && (clearInterval(c.timer), delete c.timer), b.splice(d, 1), a.repaint("M").Event.fire("layerChange", c)), this
            }
            return this
        }, this.clear = function() {
            if (b.length == 1) return this;
            for (var c = 1, d; d = b[c]; ++c) d.timer && (clearInterval(d.timer), delete d.timer);
            return b = [b[0]], a.repaint("M").Event.fire("layerChange"), this
        }, this.list = function() {
            return b
        }, this.size = function() {
            return b.length
        }, this.contains = function(a) {
            return b.indexOf(a) >= 0
        }, this.externalMap = function() {
            return c.name
        }, this.externalOptions = function(a) {
            return a == undefined ? d : (d = a, this)
        }, b = [longdo.Layers[defaultMap]]
    };

    function LongdoOverlay(a, b, c, d) {
        var e = "L" + ++longdo.objectcount;
        this.location = function() {
            return a
        }, this.element = function() {
            return b
        }, this.offset = function() {
            return c
        }, this.visibleRange = function() {
            return d
        }, this.toString = function() {
            return e
        }, this.setImageOffset = function() {
            var a = this.hd ? 2 : 1;
            c = {
                x: b.width >> a,
                y: b.height >> a
            }
        }, this.getElementOffset = function() {
            return {
                x: b.offsetWidth >> 1,
                y: b.offsetHeight >> 1
            }
        }, this.setLocation = function(b) {
            a = b
        }, this.active = function() {
            return this.collection ? !0 : !1
        }, this.pop = function(a) {
            return this.collection && this.collection.pop(this, a), this
        }, this.move = function(a, b) {
            return this.collection ? this.collection.move(this, a, b) : (this.setLocation(a), this.locationChange && this.locationChange()), this
        }, b && !c && b instanceof Image && b.complete && this.setImageOffset(), d = d || DEFAULT_RANGE
    }
    var POPUP_OFFSET = 25,
        POPUP_WIDTH_MIN = 120,
        POPUP_WIDTH_MAX = 320,
        POPUP_CLOSE = server.map + "images/close" + IMAGE_SUFFIX,
        POPUP_CALLOUT = server.map + "images/callout" + IMAGE_SUFFIX,
        POPUP_FOCUS_BUFFER = 5,
        NOTICE_HEIGHT = 28;
    (new Image).src = POPUP_CALLOUT, longdo.OverlayWeight = {
        Top: 1
    }, longdo.ObjectLabel = {
        Title: {}
    }, longdo.Marker = function(a, b) {
        var c = null;
        this.popup = function() {
            return c === !0 && (c = new longdo.Popup(this.location(), b.popup, !0), c.marker = this), c
        }, this.peekPopup = function() {
            return c && c !== !0
        }, this.destroyPopup = function() {
            return this.peekPopup() && (c = !0), self
        }, this.update = function(a) {
            return a.rotate !== undefined && (this.rotate = $.boundAngle(a.rotate) * RAD), this.collection && this.collection.repaint(this.element() instanceof Image ? "O" : "E"), this
        }, b = b || {};
        var d = null,
            e = b.icon || MARKER_ICON;
        e.html ? (d = document.createElement("div"), d.className = "ldmap_overlay ldmap_markerholder", b.title && (d.title = b.title.replace(TAG_REGEX, "")), d.innerHTML = e.html) : (this.hd = ($.isHD() || !e.url) && e.urlHD ? 1 : 0, d = new Image, d.src = this.hd ? e.urlHD : e.url, b.title && (this.title = b.title.replace(TAG_REGEX, ""))), b.rotate !== undefined && (this.rotate = $.boundAngle(b.rotate) * RAD);
        if (b.popup || b.detail || b.clickable || b.draggable) {
            this.clickable = !0, e.html && (d.className += " ldmap_clickable");
            if (b.popup || b.detail) c = !0, b.popup ? b.popup.visibleRange = b.visibleRange : b.popup = b;
            b.draggable && (this.draggable = !0)
        }
        b.weight && (this.weight = b.weight), LongdoOverlay.call(this, a, d, e.offset, b.visibleRange)
    }, longdo.Marker.prototype = Object.create(LongdoOverlay.prototype), longdo.Popup = function(a, b) {
        function e(a) {
            var b = a.target;
            while (b && !$.hasClass(b, "ldmap_popupholder")) {
                if (b.scrollHeight > b.clientHeight && !d[getComputedStyle(b).overflowY]) return;
                b = b.parentNode
            }
            a.preventDefault()
        }
        var c = null,
            d = {
                hidden: !0,
                visible: !0
            };
        this.title = function(a) {
            return a == undefined ? c ? c.children[1] : null : (c && (c.children[1].innerHTML = a), this)
        }, this.detail = function(a) {
            return a == undefined ? c ? c.lastChild : null : (c && (c.lastChild.innerHTML = a, this.focus()), this)
        }, this.fit = function() {
            var a = this.title();
            a.style.maxWidth = "none", a.style.whiteSpace = "nowrap";
            var b = this.detail();
            b.style.whiteSpace = "nowrap";
            var c = Math.min(Math.max(b.offsetWidth, a.offsetWidth + POPUP_OFFSET, POPUP_WIDTH_MIN), POPUP_WIDTH_MAX);
            a.style.maxWidth = c - 22 + "px", a.style.whiteSpace = null, b.style.minWidth = c - 20 + "px", b.style.whiteSpace = null;
            var d = this.element().firstChild;
            return d.style.minWidth = c + "px", this
        }, this.focus = function() {
            return this.autoFocus = !0, this.collection && this.collection.repaint("E"), this
        }, b = b || {};
        var f = document.createElement("div");
        f.className = "ldmap_overlay ldmap_popupholder";
        if (b.html) f.className += " ldmap_selectable", f.innerHTML = b.html, b.loadHtml && b.loadHtml(f);
        else {
            var g = b.detail || "",
                h = b.title || "";
            f.innerHTML = '<div class="ldmap_popup ldmap_selectable">' + (b.closable === !1 ? "" : '<img class="ldmap_popup_close" src="' + POPUP_CLOSE + '" alt="X" />') + '<div class="ldmap_popup_title"' + (h.indexOf("<") < 0 ? ' title="' + h + '"' : "") + ">" + h + '</div><div class="ldmap_popup_detail">' + g + '</div></div><img class="ldmap_popup_callout" src="' + POPUP_CALLOUT + '" alt="" />', "onwheel" in window ? f.addEventListener("wheel", e) : (f.addEventListener("mousewheel", e), f.addEventListener("DOMMouseScroll", e)), c = f.firstChild, b.closable !== !1 && (this.closeButton = c.firstChild), b.loadDetail && (this.loadDetail = b.loadDetail);
            if (b.size) {
                var i = b.size,
                    j = c.style;
                i.width ? (j.minWidth = j.maxWidth = i.width + "px", this.title().style.maxWidth = this.detail().style.width = i.width - 20 + "px") : (j.minWidth = i.minWidth + "px", j.maxWidth = i.maxWidth + "px", this.title().style.maxWidth = i.minWidth - 20 + "px"), j = this.detail().style, i.height ? j.minHeight = j.maxHeight = i.height - POPUP_OFFSET + "px" : (j.minHeight = i.minHeight - POPUP_OFFSET + "px", j.maxHeight = i.maxHeight - POPUP_OFFSET + "px")
            } else !b.loadDetail && g.indexOf("<img ") < 0 && (this.autoFit = !0);
            b.autoFocus && (this.autoFocus = !0)
        }
        this.weight = longdo.OverlayWeight.Top, LongdoOverlay.call(this, a, f, null, b.visibleRange)
    }, longdo.Popup.prototype = Object.create(LongdoOverlay.prototype), longdo.Overlays = {
        cameras: {
            id: "cameras",
            url: server.camera + "feed/?command=json",
            overlayType: "O",
            popup: !0,
            motion: !0,
            createOverlays: function(a, b) {
                this.items = a;
                var c = null,
                    d = [];
                for (var e = 0, f; f = a[e]; ++e) {
                    var g = this.motion && f.motion == "Y",
                        h = {
                            icon: g ? CAMERA_ICON_MOTION : CAMERA_ICON_STILL,
                            visibleRange: CAMERA_RANGE[f.incity == "Y" ? g ? "motion" : "city" : f.camid.indexOf("DOHBHS") ? "country" : "highway"]
                        };
                    if (this.popup) {
                        var i = g && cap.nomjpeg;
                        h.popup = {
                            title: f.title,
                            size: i ? {
                                width: CAMERA_SIZE.width,
                                height: CAMERA_SIZE.height + NOTICE_HEIGHT
                            } : CAMERA_SIZE,
                            detail: '<a href="' + f.link + '" target="_blank"><img class="ldmap_overlay_camera" src="' + (g && !cap.nomjpeg ? f.vdourl : f.imgurl) + '" alt="' + f.title + '" /></a>' + (i ? '<span class="ldmap_overlay_info">Your browser is not supported. Please use Chrome or Firefox to view streaming cameras.</span>' : "")
                        }
                    } else h.clickable = "true";
                    c = new longdo.Marker({
                        lon: f.longitude,
                        lat: f.latitude
                    }, h), c.type = "c", c.index = e, c.data = f, g && (c.motion = cap.nomjpeg ? "N/A" : !0), d.push(c)
                }
                return d
            }
        },
        events: {
            id: "events",
            url: server.event + "feed/json",
            overlayType: "O",
            popup: !0,
            refresh: EVENT_REFRESH,
            createOverlays: function(a, b) {
                language = b.language();
                var c = language.substring(0, 2) == "th";
                this.items = a;
                var d = null,
                    e = [];
                for (var f = 0, g; g = a[f]; ++f) {
                    var h = server.event + "sites/default/files/icons/" + g.icon,
                        i = {
                            title: c || !g.title_en ? g.title : g.title_en,
                            icon: {
                                url: h + ".png",
                                urlHD: h + "-2x.png",
                                offset: EVENT_OFFSET
                            },
                            visibleRange: EVENT_RANGE[g.icon] || EVENT_RANGE.all
                        };
                    this.popup ? i.detail = '<span class="ldmap_overlay_info">' + $.formatDateTimeRange(g.start, g.stop, "th") + " โดย " + g.contributor + '</span><div class="ldmap_overlay_description">' + (c || !g.description_en ? g.description : g.description_en) + "</div>" : i.clickable = "true", d = new longdo.Marker({
                        lon: g.longitude,
                        lat: g.latitude
                    }, i), d.type = "e", d.index = f, d.data = g, e.push(d)
                }
                return e
            }
        },
        Object: function(a, b, c) {
            function f(a) {
                var b = a.name_t ? a.name_t : a.myid;
                return STOCK_COLOR[(b.charCodeAt() - b.length) % STOCK_COLOR.length]
            }

            function g(a, b) {
                a.detail = '<div id="' + d.id + "-" + b + '" class="ldmap_poi_load">Loading...</div>', a.loadDetail = function(a) {
                    $.loadScript(server.search + "/json/search?keyword=" + b + "&locale=" + e + "&limit=1&key=" + apikey + "&version=2&callback=longdo.callback." + d.id + "Detail")
                }
            }
            var d = this,
                e = "th";
            d.popup = !0, d.createOverlays = function(h, i) {
                e = i.language();
                var j = e.substring(0, 2) == "th";
                d.items = h;
                var k = [];
                for (var l = 0, m; m = h[l]; ++l) {
                    var n = m.linearray;
                    if (!n) {
                        var o = {
                            title: j ? m.name : m.name_en
                        };
                        for (var p in c) o[p] = c[p];
                        c.icon ? c.icon == "big" && (o.icon = {
                            url: server.map + "images/icons_2x/" + m.iconimagefile,
                            urlHD: server.map + "images/icons_4x/" + m.iconimagefile
                        }) : o.icon = {
                            url: server.map + "images/icons/" + m.iconimagefile,
                            urlHD: server.map + "images/icons_2x/" + m.iconimagefile
                        }, d.popup ? b == "LONGDO" ? g(o, m.id) : o.detail = m.name_en : o.clickable = "true";
                        var q = new longdo.Marker(m, o);
                        q.type = b, q.index = l, q.data = m, k.push(q)
                    } else if (m.objecttype == "ooi_layer")
                        for (var r = 0, s; s = n[r]; ++r) {
                            var t = s.myid,
                                o = {
                                    type: longdo.LayerType.TMS,
                                    url: server.usertile + t[0] + "/" + t[1] + t[2] + "/" + t[3] + t[4] + "/" + t[5] + t[6] + "/" + t[7] + t[8],
                                    zoomOffset: 0,
                                    zoomRange: {
                                        min: 7,
                                        max: 99
                                    },
                                    bound: s.data
                                };
                            for (var p in c) o[p] = c[p];
                            var q = new longdo.Layer("", o);
                            q.type = b, q.index = a + "," + l + "," + r, q.data = s, k.push(q)
                        } else
                            for (var r = 0, u; u = n[r]; ++r) {
                                switch (u.mode) {
                                    case "polygon":
                                        var v = longdo.Polygon;
                                        break;
                                    case "line":
                                        var v = longdo.Polyline;
                                        break;
                                    default:
                                        continue
                                }
                                var w = j ? u.name_t : u.name_e,
                                    o = {
                                        title: w,
                                        pivot: {
                                            lon: u.centerlong,
                                            lat: u.centerlat
                                        }
                                    };
                                for (var p in c) o[p] = c[p];
                                o.label === longdo.ObjectLabel.Title && (o.label = w), o.detail || (d.popup ? b == "LONGDO" ? g(o, u.myid) : (o.detail = j ? u.desc_t : u.desc_e, o.detail || (o.detail = u.name_e)) : o.clickable = "true"), o.lineColor === undefined && (o.lineColor = u.linecolor ? $.hexToRgba("#" + u.linecolor) : "rgba(" + f(u) + "," + GEOMETRY_LINEALPHA + ")"), o.fillColor === undefined && (o.fillColor = u.fillcolor ? $.hexToRgba("#" + u.fillcolor) : "rgba(" + f(u) + "," + GEOMETRY_FILLALPHA + ")"), o.lineWidth === undefined && u.linewidth && (o.lineWidth = u.linewidth), o.pivot === undefined && u.centerlong && (o.pivot = {
                                    lon: u.centerlong,
                                    lat: u.centerlat
                                });
                                var m = u.data[0];
                                for (var x = 1; x < u.data.length; ++x) m.push(!0), m = m.concat(u.data[x]);
                                var q = new v(m, o);
                                q.type = b, q.index = a + "," + l + "," + r, q.data = u, k.push(q)
                            }
                }
                return b == "LONGDO" && (longdo.callback[d.id + "Detail"] = function(a) {
                    var b = document.getElementById(d.id + "-" + a.meta.keyword);
                    b && (a.data.length ? $.empty(b.parentNode).appendChild($.formatPoi(a.data[0], e, i.Ui.popup)) : $.empty(b))
                }), k
            }, c = c || {}, d.id = b + ++longdo.objectcount, d.url = server.object + "?id=" + (a.join ? a.join(";") : a) + "&dataset=" + b + "&key=" + apikey, c.simplify && (d.url += "&simplify=" + c.simplify), c.combine && (d.url += "&combine=" + c.combine), c.ignorefragment && (d.url += "&ignorefragment=" + c.ignorefragment), d.overlayType = b != "LONGDO" || a[0] == "G" || a[0] == "M" ? c.label ? "C" : "G" : a[0] == "Y" ? "M" : "O"
        }
    };
    var GEOMETRY_LINEWIDTH = 4,
        GEOMETRY_LINEALPHA = .8,
        GEOMETRY_FILLALPHA = .4,
        STOCK_COLOR = ["255,0,255", "0,255,255", "255,0,0", "0,255,0", "0,0,255", "255,102,187", "136,0,255", "68,255,187", "0,136,255", "255,136,0", "136,68,17", "119,136,153"],
        nextColor = 0;
    longdo.LineStyle = {
        Solid: "SOLID",
        Dashed: "DASHED",
        Dot: "DOT"
    };
    var geometryTheme = {
        editableRange: {
            min: 7,
            max: 99
        },
        editNodeColor: "rgba(63, 63, 63, 1)",
        editNodeSize: 12,
        addNodeColor: "rgba(63, 63, 63, 0.5)",
        addNodeSize: 12,
        translateNodeColor: "rgba(0, 0, 255, 1)",
        translateNodeSize: 12,
        rotateNodeColor: "rgba(255, 255, 0, 0.5)",
        rotateNodeSize: 32,
        guideOptions: {
            lineColor: "rgba(0, 0, 0, 0.2)",
            fillColor: !1
        },
        pointerColor: "rgba(63, 63, 63, 0.5)",
        pointerSize: 12,
        labelCharSize: {
            width: 2.7,
            height: 6.5
        }
    };
    longdo.MapTheme.geometry = geometryTheme;
    var editGuide = null;
    longdo.Polyline = function(a, b) {
        function k(a, b, c, d) {
            var e = new longdo.Dot(b, {
                lineColor: geometryTheme.editNodeColor,
                lineWidth: geometryTheme.editNodeSize,
                popup: {
                    loadDetail: function(b) {
                        $.append(b, "span", {
                            className: "ldmap_link",
                            innerHTML: "Remove",
                            onclick: function() {
                                a.removeNode(d, e)
                            }
                        })
                    }
                },
                draggable: !0,
                weight: -1
            });
            return p(a, e, c)
        }

        function l(a, b, c) {
            var d = new longdo.Dot(b, {
                lineColor: geometryTheme.addNodeColor,
                lineWidth: geometryTheme.addNodeSize,
                draggable: !0,
                weight: -1
            });
            return d.half = !0, p(a, d, c)
        }

        function n(a, b) {
            var c = new longdo.Dot(b, {
                title: "Move",
                lineColor: geometryTheme.translateNodeColor,
                lineWidth: geometryTheme.translateNodeSize,
                draggable: !0,
                weight: -1
            });
            return c.center = !0, p(a, c, 0)
        }

        function o(a, b) {
            var c = new longdo.Dot(b, {
                title: "Rotate",
                lineColor: geometryTheme.rotateNodeColor,
                lineWidth: geometryTheme.rotateNodeSize,
                draggable: !0,
                weight: -1
            });
            return c.shaft = !0, p(a, c, 0)
        }

        function p(a, b, c) {
            return b.type = "n", b.index = c, b.geometry = a, b
        }

        function q(a, b) {
            switch (a) {
                case longdo.LineStyle.Dashed:
                    return [b * 2, b * 3];
                case longdo.LineStyle.Dot:
                    return [1, b * 2];
                default:
                    return a instanceof Array ? a : null
            }
        }

        function r(a, b, c, d, e) {
            var f = $.subLocation(a[d], a[c]),
                g = Math.atan2(f.lat, f.lon),
                h = $.rotateGeom([{
                    lon: -180,
                    lat: b.lat
                }, {
                    lon: 180,
                    lat: b.lat
                }], b, g),
                i = m.closestPointOnLine(a[d].lon, a[d].lat, h[0].lon, h[0].lat, h[1].lon, h[1].lat);
            a[d] = $.makeLocation(i), h = $.rotateGeom(h, b, PIh), i = m.closestPointOnLine(a[e].lon, a[e].lat, h[0].lon, h[0].lat, h[1].lon, h[1].lat), a[e] = $.makeLocation(i), a[c] = b
        }
        var c = null,
            d = null,
            e = null,
            f = null,
            g = null,
            h = !1,
            i = null,
            j = null;
        this.popup = function() {
            return c === !0 && (c = new longdo.Popup(this.pivot(), b.popup, !0), c.marker = this), c
        }, this.peekPopup = function() {
            return c && c !== !0
        }, this.pivot = function(a) {
            if (!d || a) typeof b.pivot == "function" ? d = b.pivot(this.location()) : d = b.pivot;
            return d
        }, this.linkEditing = function(a) {
            return this.collection && this.collection.linkEditing(this, a), this
        }, this.node = function(a) {
            if (e) return e;
            var b = this.location(),
                c = a.projection(),
                d = this.pivot(!0);
            if (this instanceof longdo.Circle) e = [k(this, {
                lon: d.lon + b[1],
                lat: d.lat
            }, 0, c), k(this, {
                lon: d.lon - b[1],
                lat: d.lat
            }, 0, c)], e[0].radius = !0, e[1].radius = !0;
            else {
                if (this instanceof longdo.Rectangle) e = [k(this, b[0], 0, c), k(this, b[2], 0, c)], e[0].topLeft = !0, e[1].bottomRight = !0;
                else {
                    e = [], i = [];
                    for (var h = 0, j, m = b[0]; j = m, m = b[h + 1]; ++h) m === !0 ? (m = b[++h + 1], m && (i.push(h), e.push(!0), e.push(!0), e.push(!0), e.push(!0))) : (e.push(k(this, j, h, c)), e.push(l(this, $.averageLocation(c, j, m), h)));
                    this instanceof longdo.Polyline || this instanceof longdo.Polycurve ? e.push(k(this, j, h, c)) : (i.unshift(-1), i.push(b.length))
                }
                this.rotatable && (g = o(this, d))
            }
            return this.translatable && (f = n(this, d)), e
        }, this.showNode = function(a) {
            if (h) return this;
            h = !0, this.node(a);
            var b = a.pause();
            a.pause(!0);
            for (var c = 0, d; d = e[c]; ++c) d !== !0 && this.collection.add(d);
            return f && this.collection.add(f), g && this.collection.add(g), a.pause(b).repaint("G"), this
        }, this.hideNode = function(a) {
            if (!h) return this;
            h = !1;
            if (e && this.collection) {
                var b = a.pause();
                a.pause(!0);
                for (var c = 0; c < e.length; ++c) this.collection.remove(e[c]);
                this.collection.remove(f).remove(g), a.pause(b).repaint("G")
            }
            return this
        }, this.updateNode = function(a, b, c) {
            var d = this.location(),
                h = b.location(),
                j = b.index << 1;
            if (b.half) {
                var n = k(this, h, b.index + 1, a),
                    o = b.index + 1,
                    p = l(this, $.averageLocation(a, h, d[o]), o);
                b.move($.averageLocation(a, h, d[b.index]));
                for (var q = j + 2, s; s = e[q]; ++q) s !== !0 && ++s.index;
                e.splice(j + 2, 0, n, p), d.splice(b.index + 1, 0, h);
                if (this instanceof longdo.Polygon)
                    for (var q = i.length - 1, t = o; i[q] >= t; --q) ++i[q]
            } else if (b.radius) {
                var u = d[0];
                d[1] = m.distance(h.lon - u.lon, h.lat - u.lat), e[0].move({
                    lon: u.lon + d[1],
                    lat: u.lat
                }), e[1].move({
                    lon: u.lon - d[1],
                    lat: u.lat
                })
            } else if (b.topLeft) r(d, h, 0, 3, 1), d[4] = h;
            else if (b.bottomRight) r(d, h, 2, 1, 3);
            else if (b.center) {
                var v = $.subLocation(h, this instanceof longdo.Circle ? d[0] : this.pivot());
                d = $.translateGeom(d, v)
            } else if (b.shaft) {
                var w = this.pivot(),
                    x = $.subLocation(h, w);
                d = $.rotateGeom(d, w, Math.atan2(x.lat, x.lon))
            } else {
                d[b.index] = h;
                var y = b.index - 1,
                    z = d[y],
                    A = d[b.index + 1];
                if (this instanceof longdo.Polygon && !z || z === !0) y = i[i.indexOf(y) + 1] - 1, d[y--] = h, z = d[y];
                z && e[(y << 1) + 1].move($.averageLocation(a, z, h)), A && e[j + 1].move($.averageLocation(a, h, A))
            }
            b.center || b.shaft ? (this.hideNode(map), e = null) : (f && f.move(this.pivot(!0)), g && g.move(this.pivot())), this.collection.move(this, d, "m");
            if (c) {
                if (b.half) {
                    delete b.link, delete c.half1.link, this.collection.linkNode(n, c.node);
                    if ($.sameLocation(b.location(), c.half1.location())) var B = c.half1,
                        C = c.half2;
                    else var B = c.half2,
                        C = c.half1;
                    this.collection.linkNode(b, B).linkNode(p, C)
                }
            } else if (b.link) {
                var D = b.link;
                for (var q = 0, E; E = D[q]; ++q) E != b && E.geometry.updateNode(a, E.move(h), b.half ? {
                    node: n,
                    half1: b,
                    half2: p
                } : !0)
            }
            return this
        }, this.removeNode = function(a, b, c) {
            var d = this.location(),
                f = this instanceof longdo.Polyline;
            if (d.length <= (f ? 2 : 4) || this instanceof longdo.Rectangle) this.collection.remove(this);
            else {
                var g = b.index << 1,
                    h = b.index - 1,
                    j = d[h],
                    k = d[b.index + 1];
                if (f) {
                    if (j && k) {
                        var l = e[g - 1];
                        l.move($.averageLocation(a, j, k))
                    }
                } else {
                    if (!j || j === !0) h = i[i.indexOf(h) + 1] - 1, d[h--] = k, j = d[h];
                    var l = e[(h << 1) + 1];
                    l.move($.averageLocation(a, j, k));
                    for (var m = i.length - 1, n = b.index + 1; i[m] >= n; --m) --i[m]
                }
                for (var m = g + 1, o; o = e[m]; ++m) o !== !0 && --o.index;
                this.collection.remove(b), k ? (this.collection.remove(e[g + 1]), e.splice(g, 2)) : (this.collection.remove(e[g - 1]), e.splice(g - 1, 2)), d.splice(b.index, 1), this.collection.move(this, d, "m"), this.event.fire("beforeOverlayDrop", b), this.event.fire("overlayDrop", b)
            }
            if (c) l && c.location && ($.sameLocation(l.location(), c.location()) ? this.collection.linkNode(l, c) : (delete l.link, delete c.link));
            else if (b.link)
                for (var m = 0, p; p = b.link[m]; ++m) p != b && p.geometry.removeNode(a, p, l || !0);
            return this
        }, this.showGuide = function(a) {
            var b = this.location(),
                c = a.location();
            if (a.half) editGuide ? b[a.index + 1] = c : b.splice(a.index + 1, 0, c);
            else if (a.radius) {
                var d = b[0];
                b[1] = m.distance(c.lon - d.lon, c.lat - d.lat), e[0].move({
                    lon: d.lon + b[1],
                    lat: d.lat
                }), e[1].move({
                    lon: d.lon - b[1],
                    lat: d.lat
                })
            } else if (a.topLeft) r(b, c, 0, 3, 1), b[4] = c;
            else if (a.bottomRight) r(b, c, 2, 1, 3);
            else if (a.center) {
                var f = $.subLocation(c, this.pivot());
                b = $.translateGeom(b, f)
            } else if (a.shaft) {
                var g = this.pivot(),
                    h = $.subLocation(c, g);
                b = $.rotateGeom(b, g, Math.atan2(h.lat, h.lon))
            } else {
                b[a.index] = c;
                if (this instanceof longdo.Polygon) {
                    var i = b[a.index - 1];
                    if (!i || i === !0) {
                        var j = b.indexOf(!0, a.index);
                        b[(j > 0 ? j : b.length) - 1] = c
                    }
                }
            }
            if (editGuide) editGuide.move(b);
            else {
                var k = longdo.Polygon;
                this instanceof longdo.Polyline || this instanceof longdo.Polycurve ? k = longdo.Polyline : this instanceof longdo.Circle && (k = longdo.Circle), editGuide = new k(b, geometryTheme.guideOptions), this.collection.add(editGuide)
            }
            return this
        }, this.saveGuide = function(a) {
            return this.hideNode(a), e = null, this.collection.move(this, editGuide.location(), "m"), this.collection.remove(editGuide), editGuide = null, this
        }, this.showPointer = function(a, b) {
            var c = this.location(),
                d = this.lineWidth << b.z;
            for (var e = 1, f, g = $.locationToPoint(a, c[0]); f = g, g = c[e]; ++e) {
                g = $.locationToPoint(a, g);
                var h = m.closestPointOnLine(b.x, b.y, f.x, f.y, g.x, g.y);
                if ($.isAbsInRange(b.x - h.x, d) && $.isAbsInRange(b.y - h.y, d)) {
                    var i = $.pointToLocation(a, h);
                    j ? this.collection.move(j, i) : (j = new longdo.Dot(i, {
                        lineColor: geometryTheme.pointerColor,
                        lineWidth: geometryTheme.pointerSize,
                        draggable: !0,
                        weight: -1
                    }), j.type = "d", j.geometry = this, this.collection.add(j));
                    break
                }
            }
            return this
        }, this.hidePointer = function() {
            return j && this.collection && (this.collection.remove(j), j = null), this
        }, this.update = function(a) {
            var b = null;
            a.lineWidth && (this.lineWidth = a.lineWidth, b = "G"), a.lineColor && (this.lineColor = a.lineColor, b = "G"), a.fillColor && (this.fillColor = a.fillColor, b = "G"), a.lineStyle && (this.lineStyle = q(a.lineStyle, this.lineWidth), b = "G");
            if (a.label && this.label) {
                this.label.element().firstChild.innerHTML = a.label;
                var c = this.label.offset(),
                    d = $.labelOptions(a.label, {}, {}).icon.offset;
                c.x = d.x, c.y > 0 && (c.y = d.y), b = b == "G" ? "C" : "E"
            }
            return this.collection && b && (this.collection.paintNow = !0, this.collection.repaint(b), delete this.collection.paintNow), this
        }, this.locationChange = function(a) {
            return a || (e = null), this.label && (this.defaultLabel && (this.label.element().firstChild.innerHTML = this.size()), this.label.move(this.pivot(!0))), this
        }, this.shift = function(a) {
            return this.move($.translateGeom(this.location(), a))
        }, this.rotate = function(a) {
            return this.move($.rotateGeom(this.location(), this.pivot(), a * RAD))
        }, this.size = function() {
            return (this instanceof longdo.Polygon ? $.area : this instanceof longdo.Circle ? $.areaCircle : $.distance)(this.location(), this.defaultLabel)
        };
        if (a.length < 2) throw "Not enough vertices";
        b = b || {}, b.pivot = b.pivot || $.polylinePivot;
        var s = null,
            t = null;
        this.lineWidth = b.lineWidth || GEOMETRY_LINEWIDTH, this.lineColor = b.lineColor === undefined ? "rgba(" + STOCK_COLOR[nextColor] + "," + GEOMETRY_LINEALPHA + ")" : b.lineColor, this.fillColor = b.fillColor === undefined ? "rgba(" + STOCK_COLOR[nextColor] + "," + GEOMETRY_FILLALPHA + ")" : b.fillColor;
        if (b.lineColor === undefined || !(this instanceof longdo.Dot) && b.fillColor === undefined) nextColor = (nextColor + 1) % STOCK_COLOR.length;
        b.lineStyle && (this.lineStyle = q(b.lineStyle, this.lineWidth)), b.linePattern && (this.linePattern = b.linePattern), b.title && (this.title = b.title.replace(TAG_REGEX, "")), b.popup || b.detail ? (this.clickable = !0, c = !0, b.popup ? b.popup.visibleRange = b.visibleRange : b.popup = b) : b.clickable && (this.clickable = !0);
        if (b.editable) {
            var u = b.editable === !0 ? geometryTheme.editableRange : b.editable;
            this.editable = b.visibleRange ? {
                min: Math.max(u.min, b.visibleRange.min),
                max: Math.min(u.max, b.visibleRange.max)
            } : u, b.draggable && (this.translatable = !0), b.rotatable && (this.rotatable = !0)
        }
        b.pointer && this instanceof longdo.Polyline && (this.pointer = !0), b.weight && (this.weight = b.weight), LongdoOverlay.call(this, a, null, null, b.visibleRange);
        if (b.label) {
            var v = b.label;
            v === !0 && (this.defaultLabel = "th", v = this.size()), this.label = new longdo.Marker(this.pivot(), $.labelOptions(v, b.labelOptions || {
                visibleRange: b.visibleRange
            }, b)), this.label.geometry = this
        }
    }, longdo.Polyline.prototype = Object.create(LongdoOverlay.prototype), longdo.Polygon = function(a, b) {
        this.contains = function(a) {
            var b = a.lon ? a : a.location();
            return $.contains(b, this.location())
        }, this.union = function(a, b) {
            return booleanOperation(this, a, !1, !1, b)
        }, this.intersection = function(a, b) {
            return booleanOperation(this, a, !0, !0, b)
        }, this.difference = function(a, b) {
            return booleanOperation(this, a, !1, !0, b)
        }, this.split = function(a, b) {
            if (a instanceof longdo.Polyline) {
                var c = this.location(),
                    d = null;
                for (var e = 4; e < c.length; ++e)
                    if (c[e] === !0) {
                        d = c.slice(e, c.length), c = c.slice(0, e);
                        break
                    } var f = a.location(),
                    g = null,
                    h = null;
                for (var e = 1, i, j = c[0]; i = j, j = c[e]; ++e)
                    for (var k = 1, l, n = f[0]; l = n, n = f[k]; ++k) {
                        var o = m.lineIntersectPoint(j.lon, j.lat, i.lon, i.lat, n.lon, n.lat, l.lon, l.lat);
                        if (o && o.a > 1e-6 && o.a < .999999 && o.b > 1e-6 && o.b < .999999) {
                            if (h) return null;
                            o.index = e, o.split = k;
                            if (g) {
                                var p = c.slice(0, g.index);
                                p.push($.makeLocation(g));
                                var q = c.slice(g.index, o.index);
                                q.unshift($.makeLocation(g)), q.push($.makeLocation(o));
                                var r = c.slice(o.index);
                                r.unshift($.makeLocation(o));
                                if (g.split < o.split) {
                                    var s = f.slice(g.split, o.split),
                                        t = f.slice(g.split, o.split);
                                    t.reverse()
                                } else {
                                    var s = f.slice(o.split, g.split);
                                    s.reverse();
                                    var t = f.slice(o.split, g.split)
                                }
                                d && (r = r.concat(d)), h = [new longdo.Polygon(p.concat(s).concat(r), b), new longdo.Polygon(q.concat(t), b)]
                            }
                            g = o
                        }
                    }
                return h
            }
            return [this.difference(a, b), this.intersection(a, b)]
        };
        for (var c = 1, d, e = 0, f = a[e]; d = a[c], c <= a.length; ++c) {
            d === null && (a[c] = !0);
            if (!d || d === !0) {
                $.sameLocation(a[c - 1], f) || a.splice(c++, 0, $.copyLocation(f));
                if (c - e < 4) throw "Not enough vertices";
                e = ++c, f = a[e]
            }
        }
        b = b || {}, b.pivot = b.pivot || $.polygonPivot, longdo.Polyline.call(this, a, b)
    }, longdo.Polygon.prototype = Object.create(LongdoOverlay.prototype), longdo.Circle = function(a, b, c) {
        this.contains = function(a) {
            var b = this.location(),
                c = a.lon ? a : a.location();
            return m.distance(c.lon - b[0].lon, c.lat - b[0].lat) < b[1]
        }, a.length && (c = b, b = a[1] || c.radius || 1, a = a[0]), c = c || {}, c.pivot = c.pivot || function(a) {
            return a[0]
        };
        var d = [a, b];
        longdo.Polyline.call(this, d, c)
    }, longdo.Circle.prototype = Object.create(LongdoOverlay.prototype), longdo.Polycurve = function(a, b) {
        b = b || {}, b.pivot = b.pivot || $.polylinePivot, longdo.Polyline.call(this, a, b)
    }, longdo.Polycurve.prototype = Object.create(LongdoOverlay.prototype), longdo.Dot = function(a, b) {
        b = b || {}, b.pivot = b.pivot || function(a) {
            return a
        }, b.draggable && (this.clickable = !0, this.draggable = !0), a.length && (a = a[0]), longdo.Polyline.call(this, a, b)
    }, longdo.Dot.prototype = Object.create(LongdoOverlay.prototype), longdo.Rectangle = function(a, b, c) {
        this.divide = function(a, b, c) {
            var d = this.location();
            if (m.distance(d[1], d[0]) < m.distance(d[3], d[0]) ^ b === !1) var e = 3,
                f = 1;
            else var e = 1,
                f = 3;
            var g = $.subLocation(d[e], d[0]),
                h = $.subLocation(d[f], d[0]),
                i = Math.atan2(g.lat, g.lon),
                j = m.distance(g.lon, g.lat) / a,
                k = {
                    lon: Math.cos(i) * j,
                    lat: Math.sin(i) * j
                },
                l = [];
            for (var n = $.copyLocation(d[0]); a--; n = o) {
                var o = $.addLocation(n, k);
                l.push(new longdo.Rectangle([n, o, $.addLocation(o, h), $.addLocation(n, h)], c))
            }
            return l
        };
        if (a.length) {
            var d = a;
            c = b
        } else if (a.minLon) {
            var d = [{
                lon: a.minLon,
                lat: a.minLat
            }, {
                lon: a.maxLon,
                lat: a.minLat
            }, {
                lon: a.maxLon,
                lat: a.maxLat
            }, {
                lon: a.minLon,
                lat: a.maxLat
            }];
            c = b
        } else {
            b.width && (b = {
                lon: a.lon + b.width,
                lat: a.lat - b.height
            });
            var d = [a, {
                lon: b.lon,
                lat: a.lat
            }, b, {
                lon: a.lon,
                lat: b.lat
            }]
        }
        c = c || {}, c.texture && (this.texture = new Image, this.texture.src = c.texture, this.textureAlpha = c.textureAlpha, c.lineColor === undefined && (c.lineColor = !1), c.fillColor === undefined && (c.fillColor = !1)), longdo.Polygon.call(this, d, c)
    }, longdo.Rectangle.prototype = Object.create(longdo.Polygon.prototype);

    function SpatialDb(a) {
        function c(a, b, c, d, e) {
            if (c <= e.x) {
                if (d <= e.y) return e.nw;
                if (b > e.y) return e.sw
            } else if (a > e.x) {
                if (d <= e.y) return e.ne;
                if (b > e.y) return e.se
            }
            return !1
        }

        function d(a, b, c, e, f, g, h, i, j) {
            j = j || a <= g.x - h + 1 && b <= g.y - h + 1 && c >= g.x + h && e >= g.y + h;
            for (var k in g.data) {
                var l = g.data[k];
                if (!j && (l.minX > c || l.minY > e || l.maxX < a || l.maxY < b)) continue;
                if (f !== undefined && (f < l.minZ || f > l.maxZ)) continue;
                (l.value.weight ? l.value.weight < 0 ? i.over : i.top : i.normal).push(l)
            }
            if (!g.nw) return;
            h = h >> 1, a <= g.x && (b <= g.y && d(a, b, c, e, f, g.nw, h, i, j), e > g.y && d(a, b, c, e, f, g.sw, h, i, j)), c > g.x && (b <= g.y && d(a, b, c, e, f, g.ne, h, i, j), e > g.y && d(a, b, c, e, f, g.se, h, i, j))
        }
        var b = {
            x: a >> 1,
            y: a >> 1,
            data: {},
            size: 0
        };
        this.add = function(d, e, f, g, h, i, j, k) {
            var l = d >> TILEEXP,
                m = e >> TILEEXP,
                n = g >> TILEEXP,
                o = h >> TILEEXP,
                p = b;
            for (var q = a >> 1; q; q = q >> 1) {
                if (!p.nw) {
                    if (p.data[j]) return !1;
                    if (p.size >= SPATIAL_DATA_MAX) {
                        var r = q >> 1,
                            s = r ? r : 1;
                        p.nw = {
                            x: p.x - r,
                            y: p.y - r,
                            data: {},
                            size: 0
                        }, p.ne = {
                            x: p.x + s,
                            y: p.y - r,
                            data: {},
                            size: 0
                        }, p.sw = {
                            x: p.x - r,
                            y: p.y + s,
                            data: {},
                            size: 0
                        }, p.se = {
                            x: p.x + s,
                            y: p.y + s,
                            data: {},
                            size: 0
                        };
                        var t = {};
                        for (var u in p.data) {
                            var v = p.data[u],
                                w = c(v.minX, v.minY, v.maxX, v.maxY, p);
                            if (w) {
                                w.data[v.value] = v, ++w.size, --p.size;
                                continue
                            }
                            t[v.value] = v
                        }
                        p.data = t
                    }
                }
                if (p.nw) {
                    var w = c(l, m, n, o, p);
                    if (w) {
                        p = w;
                        continue
                    }
                }
                break
            }
            return p.data[j] = {
                minX: l,
                minY: m,
                minZ: f,
                maxX: n,
                maxY: o,
                maxZ: i,
                value: j,
                extra: k,
                bound: {
                    minX: d,
                    minY: e,
                    maxX: g,
                    maxY: h
                }
            }, ++p.size, !0
        }, this.remove = function(a, d, e, f, g) {
            var h = b;
            while (h) {
                if (h.nw) {
                    var i = c(a, d, e, f, h);
                    if (i) {
                        h = i;
                        continue
                    }
                }
                if (h.data[g]) return delete h.data[g], --h.size, !0;
                break
            }
            return !1
        }, this.get = function(c, e, f, g, h) {
            var i = {
                normal: [],
                top: [],
                over: []
            };
            return d(c, e, f, g, h, b, a >> 1, i), i
        }
    }
    longdo.OverlayCollection = function(a, b) {
        function u(b, e, g, h, i) {
            b.closeButton && (b.closeButton.onclick = function() {
                c.remove(b), a.Event.fire("popupClose", b)
            });
            var j = $.locationToPoint(d, b.location());
            if (!f.add(j.x, j.y, h, j.x, j.y, g - 1, b, j)) return;
            if (i >= h && i < g) {
                var k = $.pointToTile({
                    x: j.x,
                    y: j.y,
                    z: i
                });
                c.repaint({
                    u: k.u,
                    v: k.v,
                    w: i,
                    mode: "E"
                })
            }++l
        }

        function v(a, b, e, f, h) {
            var i = $.locationToPoint(d, a.location()),
                j = a.offset(),
                k = Math.max(j.x, j.y, b.width - j.x, b.height - j.y);
            k > c.maxImageSize && (c.maxImageSize = k);
            if (!g.add(i.x, i.y, f, i.x, i.y, e - 1, a, i)) return;
            if (h >= f && h < e) {
                var m = i.x - (j.x << h),
                    n = i.y - (j.y << h),
                    o = m + (b.width >> a.hd << h),
                    p = n + (b.height >> a.hd << h),
                    q = $.pointToTile({
                        x: m,
                        y: n,
                        z: h
                    }),
                    r = $.pointToTile({
                        x: o,
                        y: p,
                        z: h
                    });
                for (var s = q.v; s <= r.v; ++s)
                    for (var t = q.u; t <= r.u; ++t) c.repaint({
                        u: t,
                        v: s,
                        w: h,
                        mode: "O"
                    })
            }++l
        }

        function w(b, e, f, g) {
            var i = b.location(),
                j = b.lineWidth >> 1;
            j > c.maxGeometrySize && (c.maxGeometrySize = j);
            if (b instanceof longdo.Circle) var k = $.locationToPoint(d, i[0]),
                m = i[1] * d.pointPerDegree,
                n = k.x - m,
                o = k.y - m,
                p = k.x + m,
                q = k.y + m,
                r = [k, m];
            else {
                var s = $.locationToPoint(d, b instanceof longdo.Dot ? i : i[0]),
                    n = s.x,
                    p = n,
                    o = s.y,
                    q = o,
                    r = [s];
                for (var t = 1, u; u = i[t]; ++t) u === !0 ? r.push(!0) : (s = $.locationToPoint(d, u), r.push(s), s.x < n ? n = s.x : s.x > p && (p = s.x), s.y < o ? o = s.y : s.y > q && (q = s.y));
                b instanceof longdo.Dot || (b.bound = {
                    minX: n,
                    minY: o,
                    maxX: p,
                    maxY: q
                })
            }
            if (!h.add(n, o, f, p, q, e - 1, b, r)) return;
            g >= f && g < e && c.repaint("G"), ++l, b.defaultLabel && b.defaultLabel != a.language() && (b.defaultLabel = a.language(), b.label.element().firstChild.innerHTML = b.size()), b.label && c.add(b.label)
        }

        function x(c, e, g, h, i) {
            var j = $.locationToPoint(d, c.location()),
                k = j.x >> TILEEXP,
                m = j.y >> TILEEXP;
            if (!f.remove(k, m, k, m, c)) return;
            if (i >= h && i < g) {
                b.removeElement(e, $.pointToTile({
                    x: j.x,
                    y: j.y,
                    z: i
                }));
                if (c.marker)
                    if (c.marker.geometry) c.marker.geometry.hideNode(a);
                    else if (c.marker.motion) {
                    var n = e.firstChild.lastChild.firstChild.firstChild;
                    n.src = "#", c.marker.destroyPopup()
                }
            }--l, setTimeout(a.Event.fire, PAINT_DELAY, "overlayChange", c)
        }

        function y(a, b, e, f, h) {
            var i = $.locationToPoint(d, a.location()),
                j = i.x >> TILEEXP,
                k = i.y >> TILEEXP;
            if (!g.remove(j, k, j, k, a)) return;
            if (h >= f && h < e) {
                var m = a.offset(),
                    n = i.x - (m.x << h),
                    o = i.y - (m.y << h),
                    p = n + (b.width >> a.hd << h),
                    q = o + (b.height >> a.hd << h),
                    r = $.pointToTile({
                        x: n,
                        y: o,
                        z: h
                    }),
                    s = $.pointToTile({
                        x: p,
                        y: q,
                        z: h
                    });
                for (var t = r.v; t <= s.v; ++t)
                    for (var u = r.u; u <= s.u; ++u) c.repaint({
                        u: u,
                        v: t,
                        w: h,
                        mode: "O"
                    })
            }--l
        }

        function z(b, e, f, g) {
            var i = b.location();
            if (b instanceof longdo.Circle) var j = $.locationToPoint(d, i[0]),
                k = i[1] * d.pointPerDegree,
                m = j.x - k,
                n = j.y - k,
                o = j.x + k,
                p = j.y + k;
            else if (b instanceof longdo.Dot) var q = $.locationToPoint(d, i),
                m = q.x,
                o = m,
                n = q.y,
                p = n;
            else {
                if (!b.bound) return;
                var r = b.bound,
                    m = r.minX,
                    n = r.minY,
                    o = r.maxX,
                    p = r.maxY
            }
            if (!h.remove(m >> TILEEXP, n >> TILEEXP, o >> TILEEXP, p >> TILEEXP, b)) return;
            g >= f && g < e && c.repaint("G"), --l, b.label && c.remove(b.label), b.editable && b.hideNode(a), b.pointer && b.hidePointer()
        }

        function A(b, c) {
            function j() {
                var k = Date.now() - d;
                if (k > h) {
                    a.Event.pause(i), b.move(c), delete b.animationInterval;
                    return
                }
                requestAnimationFrame(j);
                var l = k / h;
                b.move({
                    lon: e.lon + f * l,
                    lat: e.lat + g * l
                })
            }
            var d = Date.now() - TIME_LEAP,
                e = b.location(),
                f = c.lon - e.lon,
                g = c.lat - e.lat,
                h = b.animationInterval || ANIMATION_INTERVAL,
                i = a.Event.pause();
            a.Event.pause(!0), requestAnimationFrame(j)
        }

        function B(a) {
            return p == a && (a.offset().y = a.originalY, delete a.originalY, p = null), a
        }

        function C(b) {
            if (b) return;
            a.Event.fire("connectionError", "overlays")
        }

        function D(b) {
            b.id = o, o == b.id ? a.Ui.FloorSelector.visible(o, b.result) : a.Ui.FloorSelector.visible(!1)
        }

        function E(b) {
            b.type == "n" && b.active() && (editGuide ? b.geometry.saveGuide(a) : b.geometry.updateNode(a.projection(), b))
        }

        function F(a) {
            a.type == "n" && a.active() && a.geometry.showGuide(a)
        }
        var c = this,
            d = a.projection(),
            e = 0,
            f = null,
            g = null,
            h = null,
            i = !0,
            j = !0,
            k = null,
            l = 0,
            n = !1,
            o = null,
            p = null,
            q = null,
            r = null,
            s = [],
            t = [function(a, b) {
                return b.extra.y - a.extra.y
            }, function(a, b) {
                return b.extra.x - a.extra.x || b.extra.y - a.extra.y
            }, function(a, b) {
                return a.extra.y - b.extra.y || b.extra.x - a.extra.x
            }, function(a, b) {
                return a.extra.x - b.extra.x || a.extra.y - b.extra.y
            }];
        c.hit = function(a, d, e) {
            var f = a.x >> TILEEXP,
                g = a.y >> TILEEXP,
                h = b.getZoom(),
                i = Math.ceil((c.maxImageSize << h) / TILESIZE),
                j = c.image(f - i, g - i, f + i, g + i, h, e);
            for (var k = 0, l; l = j[k]; ++k) {
                var n = l.value,
                    o = l.extra,
                    p = n.element(),
                    q = n.offset(),
                    r = n.hd,
                    s = o.x - (q.x << h),
                    t = o.y - (q.y << h),
                    u = s + (p.width >> r << h),
                    v = t + (p.height >> r << h);
                if (a.x >= s && a.x < u && a.y >= t && a.y < v) return n
            }
            var w = b.hitGeometry(d);
            if (!w) return null;
            w = w << h >> TILEEXP >> 1;
            var j = c.geometry(f - w, g - w, f + w, g + w, h);
            for (var k = 0, l; l = j[k]; ++k) {
                var n = l.value;
                w = (n.lineWidth << h) / 2;
                if (n instanceof longdo.Circle || n instanceof longdo.Dot) {
                    var x = l.extra[0],
                        y = l.extra[1];
                    y || (y = 0);
                    var z = m.distance(a.x - x.x, a.y - x.y);
                    if ((n.fillColor || z < y - w) && z > y + w) continue
                } else if (!(n instanceof longdo.Polygon && n.fillColor && m.isPointInPolygon(a, l.extra)) && !m.isPointOnPolyline(a, l.extra, w)) continue;
                return n
            }
            return null
        }, c.element = function(a, b, c, d, e, g) {
            var h = f.get(a, b, c, d, e);
            if (g !== undefined) {
                var i = t[g];
                h.top.sort(i), h.normal.sort(i)
            }
            return h.top.concat(h.normal)
        }, c.image = function(a, b, c, d, e, f) {
            var h = g.get(a, b, c, d, e);
            if (f !== undefined) {
                var i = t[f];
                h.top.sort(i), h.normal.sort(i)
            }
            return h.top.concat(h.normal)
        }, c.geometry = function(a, b, c, d, e) {
            var f = h.get(a, b, c, d, e);
            return f.over.concat(f.top).concat(f.normal)
        }, c.add = function(e) {
            if (e instanceof LongdoOverlay) {
                if (e instanceof longdo.Popup) {
                    if (a.Ui.popup) return a.Ui.popup.set(e, !0), c;
                    j && e.detail() && (e.autoFocus = !0), i && k && k != e && c.remove(k), k = e, e.loadDetail && (a.Event.fire("popupLoadDetail", e) && setTimeout(e.loadDetail, OVERLAY_PAINT_DELAY, e.detail()), delete e.loadDetail)
                }
                var f = Math.min(d.maxZoom, d.maxZoom - e.visibleRange().min + 1),
                    g = Math.max(0, d.maxZoom - e.visibleRange().max);
                if (f <= g) return c;
                c.paintNow || s.push(e), e.collection = c, e.event = a.Event;
                var h = b.getZoom(),
                    l = e.element();
                if (!l) {
                    if (e.texture && !e.texture.complete) return e.texture.onload = function() {
                        w(e, f, g, h)
                    }, c;
                    w(e, f, g, h)
                } else if (l instanceof Image) {
                    if (!l.complete) return l.onload = function() {
                        e.offset() || e.setImageOffset(), v(e, l, f, g, b.getZoom())
                    }, c;
                    v(e, l, f, g, h)
                } else if (l instanceof Element) u(e, l, f, g, h);
                else throw "Invalid overlay";
                return c
            }
            throw "Not overlay"
        }, c.remove = function(e) {
            if (e instanceof LongdoOverlay) {
                e.peekPopup && e.peekPopup() && (a.Ui.popup ? a.Ui.popup.set(e.popup(), !1) : c.remove(e.popup())), e == k && (k = null);
                var f = Math.min(d.maxZoom, d.maxZoom - e.visibleRange().min + 1),
                    g = Math.max(0, d.maxZoom - e.visibleRange().max);
                if (f <= g) return c;
                var h = b.getZoom(),
                    i = e.element();
                if (!i) c.paintNow || s.push(e), z(e, f, g, h);
                else if (i instanceof Image) c.paintNow || s.push(e), y(e, i, f, g, h);
                else if (i instanceof Element) x(e, i, f, g, h);
                else return c;
                return delete e.collection, delete e.event, c
            }
            return c
        }, c.clear = function() {
            if (l) {
                var b = c.list();
                for (var e = 0, i; i = b[e]; ++e) delete i.collection, delete i.event
            }
            return f = new SpatialDb(d.maxResolution), g = new SpatialDb(d.maxResolution), h = new SpatialDb(d.maxResolution), c.maxImageSize = 0, c.maxGeometrySize = 0, l && (l = 0, a.repaint("C").Event.fire("overlayChange")), a.Ui && a.Ui.popup && a.Ui.popup.visible(!1), c
        }, c.list = function() {
            if (!l) return [];
            var a = c.element(0, 0, d.maxPointX, d.maxPointY).concat(c.image(0, 0, d.maxPointX, d.maxPointY)).concat(c.geometry(0, 0, d.maxPointX, d.maxPointY));
            for (var b = 0; b < a.length; ++b) a[b] = a[b].value;
            return a
        }, c.size = function() {
            return l
        }, c.move = function(b, d, e) {
            if (e === !0 || e > 0 && b.location().lon) return B(b), e === !0 ? delete b.animationInterval : b.animationInterval = e, A(b, d), c;
            var f = a.Event.pause();
            a.Event.pause(!0), c.paintNow = !0;
            var g = l;
            return c.remove(b), g == l ? (delete c.paintNow, a.Event.pause(f), c) : (b.setLocation(d), b.peekPopup && b.peekPopup() && b.popup().setLocation(d.length ? b.pivot() : d), c.add(b), delete c.paintNow, a.Event.pause(f).fire("overlayMove", b), b.locationChange && b.locationChange(e == "m"), c)
        }, c.load = function(b) {
            var d = longdo.callback[b.id];
            if (!d || d == $.noop) longdo.callback[b.id] = function(d) {
                b.overlays && c.unload(b), b.overlays = b.createOverlays(d, a);
                var e = a.pause();
                a.pause(e);
                if (b.overlayType == "M")
                    for (var f = 0; f < b.overlays.length; ++f) a.Layers.add(b.overlays[f]);
                else
                    for (var f = 0; f < b.overlays.length; ++f) c.add(b.overlays[f]);
                setTimeout(function() {
                    a.pause(e).Event.fire("overlayLoad", d)
                }, OVERLAY_PAINT_DELAY), c.repaint(b.overlayType), b.refresh && (b.timeout = setTimeout(c.load, b.refresh * 1e3, b))
            };
            return $.loadScript(b.url + "&callback=longdo.callback." + b.id, C), c
        }, c.unload = function(b) {
            longdo.callback[b.id] = $.noop;
            if (!b.overlays) return c;
            var d = a.pause();
            a.pause(!0);
            if (b.overlayType == "M")
                for (var e = 0; e < b.overlays.length; ++e) a.Layers.remove(b.overlays[e]);
            else {
                clearTimeout(b.timeout);
                for (var e = 0; e < b.overlays.length; ++e) a.Overlays.remove(b.overlays[e])
            }
            return a.pause(d).repaint(b.overlayType), delete b.items, delete b.overlays, c
        }, c.pop = function(b, d, e) {
            var f = b.popup();
            if (!f) return c;
            if (a.Ui.popup) return a.Ui.popup.set(f, d), c;
            var g = a.Event.pause();
            a.Event.pause(!0);
            var h = l;
            if (d) h = -1;
            else {
                c.paintNow = !0, c.remove(f), a.Event.fire("overlayChange", f), delete c.paintNow;
                if (d !== undefined) return a.Event.pause(g), l < h && a.Event.fire("overlayChange", f), c
            }
            return a.Event.pause(g), l < h ? (a.Event.fire("overlayChange", f), c) : (e && f.setLocation(a.location(longdo.LocationMode.Pointer)), c.paintNow = !0, c.add(f), a.Event.fire("overlayChange", f), delete c.paintNow, c.floorPlan(b))
        }, c.floorPlan = function(b) {
            return n && b.data && b.data.id && b.data.id[0] == "A" ? (o = b.data.id, $.loadScript(server.longdo + "webservice/json/getfloor?ooiid=" + b.data.id + "&key=" + apikey + "&callback=longdo.callback.floor" + a.id())) : o = null, c
        }, c.drop = function(b) {
            function j() {
                c.remove(b), i.y -= DROP_SPEED, c.add(b);
                if (i.y <= b.dropTo) {
                    delete b.dropTo, delete c.paintNow, a.Event.pause(k);
                    return
                }
                requestAnimationFrame(j)
            }
            if (b.dropTo) return c;
            B(b);
            var e = b.element();
            if (e instanceof Image && !e.complete) return e.onload = function() {
                b.offset() || b.setImageOffset(), c.drop(b)
            }, c;
            var f = d.latToNorm(a.bound().maxLat),
                g = d.latToNorm(b.location().lat),
                h = (f - g) * d.pointPerDegree >> d.maxZoom - a.zoom();
            h = Math.floor(h / DROP_SPEED) * DROP_SPEED;
            var i = b.offset();
            b.dropTo = i.y, i.y += h;
            var k = a.Event.pause();
            return a.Event.pause(!0), c.paintNow = !0, c.add(b), requestAnimationFrame(j), c
        }, c.bounce = function(a) {
            function f() {
                a.originalY && (c.remove(a), b.y += d, c.add(a), ++e > BOUNCE_HEIGHT && (e = 0, d = -d), requestAnimationFrame(f))
            }
            if (p) return c.remove(p).add(B(p)), setTimeout(c.bounce, 100, a), c;
            if (!a) return c;
            p = a;
            var b = a.offset();
            a.originalY = b.y;
            var d = 1,
                e = 0;
            return requestAnimationFrame(f), c
        }, c.repaint = function(b) {
            if (a.pause()) return c;
            if (c.paintNow || p) return a.repaint(b), c;
            q && (clearTimeout(q), q = null);
            if (!r) r = b;
            else if (r != b)
                if (b.mode && r.mode == b.mode) {
                    if (r.u != b.u || r.v != b.v || r.w != b.w) r = b.mode
                } else r.mode == b || r == b.mode ? r = b.mode || r.mode : r = "C";
            return q = setTimeout(function() {
                a.repaint(r), r = null;
                for (var b = 0, c; c = s[b]; ++b) a.Event.fire("overlayChange", c);
                s = []
            }, OVERLAY_PAINT_DELAY), c
        }, c.enableAutoClosePopup = function(a) {
            return a == undefined ? i : (i = a, c)
        }, c.enableAutoFocusPopup = function(a) {
            return a == undefined ? j : (j = a, c)
        }, c.enableFloorPlan = function(a) {
            return a == undefined ? n : (n = a, c)
        }, c.enableEditGuide = function(b) {
            return a.Event[b ? "bind" : "unbind"]("overlayDrag", F), c
        }, c.lastOpenPopup = function() {
            return a.Ui.popup ? a.Ui.popup.get() : k
        }, c.linkEditing = function(b, d) {
            c.enableEditGuide(!1);
            var e = b.node(a),
                f = d.node(a);
            for (var g = 0, h; h = e[g]; ++g) {
                if (h === !0 || h.radius) continue;
                var i = h.location();
                for (var j = h.half ? 1 : 0, k; k = f[j]; j += 2) {
                    if (k === !0 || k.radius) continue;
                    $.sameLocation(i, k.location()) && c.linkNode(h, k)
                }
            }
            return c
        }, c.linkNode = function(a, b) {
            var d = (a.link || [a]).concat(b.link || [b]);
            for (var e = 0; e < d.length; ++e) d[e].link = d;
            return c
        }, c.pathAnimation = function(b, c, d) {
            function h(c) {
                if (b == c) {
                    var i = e[++g];
                    if (i) {
                        var j = m.distance(i.lon - f.lon, i.lat - f.lat) / d;
                        f = i, b.move(i, j)
                    } else a.Event.unbind("overlayMove", h).fire("pathAnimationEnd", b)
                }
            }
            d = d || 1 / (1 << a.zoom());
            var e = c.location(),
                f = e[0],
                g = 0;
            return a.Event.bind("overlayMove", h), b.move(f), this
        }, e = $.isHD(), c.clear(), longdo.callback["floor" + a.id()] = D, a.Event.bind("overlayDrop", E), c.enableEditGuide(!0)
    };

    function LongdoControl(a) {
        this.element = function() {
            return a
        }, this.visible = function(b) {
            return b == undefined ? a.style.display != "none" && document.body.contains(a) : (a.style.display = b ? "inline-block" : "none", this)
        }
    }
    var UI_LEGEND_NONE = server.map + "images/empty.gif",
        ICON_CC = server.map + "images/cc-by-sa.png",
        DPAD_MOVE = 300,
        ZOOMBAR_HEIGHT = 200,
        GEOLOCATION_TIMEOUT = 15e3,
        NOTIFY_TIMEOUT = 5e3,
        DEFAULT_TAG = ["travel", "restaurant", "gas_station", "bank"],
        CONTEXTMENU_BUFFER_X = 5,
        CONTEXTMENU_BUFFER_Y = 15,
        CONTEXTMENU_MAX_POI = 5,
        DROPDOWN_BUFFER = 30,
        DROPDOWN_MIN = 15,
        DROPDOWN_CLOSE_DELAY = 1e3,
        GUIDE_POINT_SIZE = 15,
        POPUP_MINI_OFFSET_X = 30,
        POPUP_MINI_OFFSET_Y = 60,
        FLOOR_MIN_ZOOM = 17;
    longdo.ButtonType = {
        Radio: "RADIO",
        Toggle: "TOGGLE",
        Push: "PUSH",
        Reset: "RESET",
        Group: "GROUP",
        Custom: "CUSTOM"
    };
    var uiTheme = {
        dpad: server.map + "images/ui/dpad" + IMAGE_SUFFIX,
        zoomIn: server.map + "images/ui/zoom-in" + IMAGE_SUFFIX,
        zoomOut: server.map + "images/ui/zoom-out" + IMAGE_SUFFIX,
        zoomBar: server.map + "images/ui/zoom-bar" + IMAGE_SUFFIX,
        zoomSlider: server.map + "images/ui/zoom-slider" + IMAGE_SUFFIX,
        zoomInMini: server.map + "images/ui/zoom-in-mobile" + IMAGE_SUFFIX,
        zoomOutMini: server.map + "images/ui/zoom-out-mobile" + IMAGE_SUFFIX,
        geolocation: server.map + "images/ui/geolocation" + IMAGE_SUFFIX,
        geolocationTip: "Your location",
        geolocationLabel: {
            th: {
                req: "กำลังหาตำแหน่ง...",
                res: "พบตำแหน่ง (ในระยะ ~",
                err: "ไม่สามารถหาตำแหน่งได้"
            },
            en: {
                req: "Locating...",
                res: "Location found (Accuracy ~",
                err: "Cannot find location"
            }
        },
        geolocationMarkerIcon: {
            url: server.map + "images/current-location.png",
            urlHD: server.map + "images/current-location-2x.png",
            offset: {
                x: 28,
                y: 42
            }
        },
        measureOff: server.map + "images/ui/measure-off" + IMAGE_SUFFIX,
        measureOn: server.map + "images/ui/measure-on" + IMAGE_SUFFIX,
        measureTip: "Measurement",
        measureBeginTip: "Click to create line/polygon<br />Double click to create circle",
        measureDistanceTip: "Double Click to end",
        measureAreaTip: "Click to create polygon",
        measureColorList: !1,
        measureOptions: {
            label: !0,
            editable: !0,
            draggable: !0,
            rotatable: !0
        },
        rangeOff: server.map + "images/ui/range-off" + IMAGE_SUFFIX,
        rangeOn: server.map + "images/ui/range-on" + IMAGE_SUFFIX,
        rangeTip: "Zoom to selection",
        rangeOptions: {
            lineColor: "rgba(0,0,127,0.3)",
            lineWidth: 2,
            fillColor: !1
        },
        clearOff: server.map + "images/ui/clear-off" + IMAGE_SUFFIX,
        clearOn: server.map + "images/ui/clear-on" + IMAGE_SUFFIX,
        clearTip: "Clear measurement",
        tagPanelLabel: {
            th: {
                title: "Tag: ",
                more: "หมวดหมู่เพิ่มเติม",
                less: "ย่อหมวดหมู่",
                clear: "ลบ tag"
            },
            en: {
                title: "Tag: ",
                more: "More categories",
                less: "Less categories",
                clear: "Clear tags"
            }
        },
        layerSelectorOption: {
            th: {
                button: [{
                    label: "สถานที่",
                    value: longdo.Layers.POI
                }, {
                    label: "จราจร",
                    value: longdo.Layers.GRAY,
                    value2: longdo.Layers.TRAFFIC
                }, {
                    label: "ดาวเทียม (กูเกิล)",
                    value: longdo.Layers.GOOGLE_HYBRID
                }],
                more: "เพิ่มเติม",
                dropdownTitle: "เลือกแผนที่"
            },
            en: {
                button: [{
                    label: "Map",
                    value: longdo.Layers.POI_EN
                }, {
                    label: "Traffic",
                    value: longdo.Layers.GRAY_EN,
                    value2: longdo.Layers.TRAFFIC
                }, {
                    label: "Satellite (Google)",
                    value: longdo.Layers.GOOGLE_HYBRID
                }],
                more: "More",
                dropdownTitle: "Select Map"
            }
        },
        layerSelectorDropdown: [{
            label: "ภาษาไทย",
            type: longdo.ButtonType.Group
        }, {
            label: "ดาวเทียม (ไทยโชต)",
            value: longdo.Layers.THAICHOTE,
            value2: longdo.Layers.POI_TRANSPARENT
        }, {
            label: "ถนน",
            value: longdo.Layers.NORMAL
        }, {
            label: "สีเทา",
            value: longdo.Layers.GRAY
        }, {
            label: "เขตการปกครอง",
            value: longdo.Layers.POLITICAL
        }, {
            label: "English",
            type: longdo.ButtonType.Group
        }, {
            label: "Satellite (Thaichote)",
            value: longdo.Layers.THAICHOTE,
            value2: longdo.Layers.POI_TRANSPARENT_EN
        }, {
            label: "Street",
            value: longdo.Layers.NORMAL_EN
        }, {
            label: "Gray",
            value: longdo.Layers.GRAY_EN
        }, {
            label: "Political",
            value: longdo.Layers.POLITICAL_EN
        }, {
            label: "etc.",
            type: longdo.ButtonType.Group
        }, {
            label: "ภูมิประเทศ",
            value: longdo.Layers.TERRAIN
        }, {
            label: "OpenStreetMap",
            value: longdo.Layers.OSM
        }, {
            label: "Longdo OSM",
            value: longdo.Layers.LONGDO_OSM
        }, {
            label: "Non-free",
            type: longdo.ButtonType.Group
        }, {
            label: "TomTom - สถานที่",
            value: longdo.Layers.TOMTOM_POI
        }, {
            label: "TomTom - ถนน",
            value: longdo.Layers.TOMTOM_NORMAL
        }, {
            label: "Google - ถนน",
            value: longdo.Layers.GOOGLE_ROADMAP
        }, {
            label: "Google - จราจร",
            value: longdo.Layers.GOOGLE_TRAFFIC
        }, {
            label: "Google - ดาวเทียม",
            value: longdo.Layers.GOOGLE_HYBRID
        }],
        fullscreenUp: server.map + "images/ui/fullscreen-up" + IMAGE_SUFFIX,
        fullscreenDown: server.map + "images/ui/fullscreen-down" + IMAGE_SUFFIX,
        fullscreenTip: "Fullscreen",
        arrowDown: server.map + "images/ui/arrow-down" + IMAGE_SUFFIX,
        arrowUp: server.map + "images/ui/arrow-up" + IMAGE_SUFFIX,
        arrowActive: server.map + "images/ui/arrow-active" + IMAGE_SUFFIX,
        legendTraffic: {
            th: server.map + "images/ui/legend-traffic-th" + IMAGE_SUFFIX,
            en: server.map + "images/ui/legend-traffic-en" + IMAGE_SUFFIX
        },
        popupMiniMarkerIcon: {
            url: server.map + "images/icon-marker.png",
            urlHD: server.map + "images/icon-marker-2x.png",
            offset: {
                x: 8,
                y: 25
            }
        },
        contextMenuTip: "Right click for<br />more functions"
    };
    longdo.MapTheme.ui = uiTheme, longdo.MenuBar = function(a) {
        function j(b) {
            var c = $.hasClass(b.target, "ldmap_button_active"),
                d = l();
            o(), g = b.target.index;
            var e = a.button[g];
            switch (e.type) {
                case longdo.ButtonType.Toggle:
                    c ? (g = -1, e = null, $.removeClass(b.target, "ldmap_button_active")) : $.addClass(b.target, "ldmap_button_active");
                    break;
                case longdo.ButtonType.Push:
                    g = -1;
                    break;
                case longdo.ButtonType.Reset:
                    g = -1, e = null;
                    break;
                default:
                    $.addClass(b.target, "ldmap_button_active")
            }
            a.change && a.change(e, d)
        }

        function k(b) {
            var e = l();
            o(), h = b.target.index;
            var f = a.dropdown[h];
            f.type == longdo.ButtonType.Reset ? (h = -1, d.innerHTML = a.dropdownLabel, $.removeClass(c, "ldmap_button_active"), f = null) : (d.innerHTML = f.label, $.addClass(b.target, "ldmap_option_active"), $.addClass(c, "ldmap_button_active")), a.change && a.change(f, e)
        }

        function l() {
            if (g >= 0) {
                var b = a.button[g];
                return g = -1, $.removeClass(b.element, "ldmap_button_active"), b
            }
            if (h >= 0) {
                var b = a.dropdown[h];
                return h = -1, d.innerHTML = a.dropdownLabel, $.removeClass(c, "ldmap_button_active"), $.removeClass(b.element, "ldmap_option_active"), e.src = uiTheme.arrowDown, b
            }
            return null
        }

        function m() {
            (f.style.maxHeight != "0px" ? o : n)()
        }

        function n() {
            e.src = uiTheme.arrowUp, f.style.maxHeight = Math.max(b.placeholder().offsetHeight - f.offsetTop - DROPDOWN_BUFFER, DROPDOWN_MIN) + "px"
        }

        function o() {
            f && (e.src = $.hasClass(c, "ldmap_button_active") ? uiTheme.arrowActive : uiTheme.arrowDown, f.style.maxHeight = "0px")
        }

        function p(a) {
            if (a.relatedTarget && ($.hasClass(a.relatedTarget, "ldmap_option") || $.hasClass(a.relatedTarget, "ldmap_group"))) return;
            i = setTimeout(o, DROPDOWN_CLOSE_DELAY)
        }

        function q() {
            i && (clearTimeout(i), i = null)
        }
        var b = null,
            c = null,
            d = null,
            e = null,
            f = null,
            g = -1,
            h = -1,
            i = null;
        this.map = function(a) {
            return b = a, this
        }, this.selectIndex = function(b) {
            if (b < 0) return l(), this;
            var c = a.button ? a.button.length : 0;
            return b < c ? j({
                target: a.button[b].element
            }) : a.dropdown && (k({
                target: a.dropdown[b - c].element
            }), o()), this
        }, this.selectValue = function(b) {
            if (a.button)
                for (var c = 0, d; d = a.button[c]; ++c)
                    if (d.value == b) return j({
                        target: d.element
                    }), this;
            if (a.dropdown)
                for (var c = 0, d; d = a.dropdown[c]; ++c)
                    if (d.value == b) return k({
                        target: d.element
                    }), o(), this;
            return l(), this
        };
        var r = document.createElement("span");
        r.className = "ldmap_menubar";
        if (a.button)
            for (var s = 0, t; t = a.button[s]; ++s) t.value || (t.value = t.label), t.element = $.append(r, "span", {
                className: "ldmap_item ldmap_button ",
                innerHTML: t.label,
                index: s
            }), t.element.addEventListener("click", j);
        if (a.dropdown) {
            a.dropdownLabel || (a.dropdownLabel = "...");
            var u = $.append(r, "span", {
                className: "ldmap_dropdown"
            });
            c = $.append(u, "div", {
                className: "ldmap_dropdown_head",
                onclick: m,
                onmouseover: q
            }), c.addEventListener("mouseout", p), e = $.append(c, "img", {
                className: "ldmap_arrow",
                src: uiTheme.arrowDown
            }), d = $.append(c, "span", {
                innerHTML: a.dropdownLabel
            }), f = $.append(u, "div", {
                className: "ldmap_dropdown_body",
                onmouseover: q
            }), f.addEventListener("mouseout", p), f.style.maxHeight = "0px";
            for (var s = 0, t; t = a.dropdown[s]; ++s) {
                if (t.type == longdo.ButtonType.Group) {
                    t.element = $.append(f, "div", {
                        className: "ldmap_group",
                        innerHTML: t.label
                    });
                    continue
                }
                if (t.type == longdo.ButtonType.Custom) {
                    t.element = $.append(f, "div", {
                        innerHTML: t.label
                    });
                    continue
                }
                t.value || (t.value = t.label), t.element = $.append(f, "div", {
                    className: "ldmap_option",
                    innerHTML: t.label,
                    index: s
                }), t.element.addEventListener("click", k)
            }
        }
        LongdoControl.call(this, r)
    }, longdo.MenuBar.prototype = Object.create(LongdoControl.prototype), longdo.TagPanel = function(a) {
        function m() {
            (i.style.display == "block" ? o : n)()
        }

        function n() {
            if (i.innerHTML == "N/A") return;
            h.src = uiTheme.arrowUp, $.addClass(f, "ldmap_tagpanel_down"), i.style.display = "block", i.style.maxHeight = Math.max(e.placeholder().offsetHeight - i.offsetTop - DROPDOWN_BUFFER, DROPDOWN_MIN) + "px";
            if (cap.notransform) return;
            $.translate(i, {
                x: f.offsetWidth - i.offsetWidth,
                y: -1
            })
        }

        function o() {
            h.src = uiTheme.arrowDown, $.removeClass(f, "ldmap_tagpanel_down"), i.style.display = "none", u()
        }

        function p(a) {
            if (a.relatedTarget && ($.hasClass(a.relatedTarget, "ldmap_option") || $.hasClass(a.relatedTarget, "ldmap_group"))) return;
            l = setTimeout(o, DROPDOWN_CLOSE_DELAY)
        }

        function q() {
            if (!l) return;
            clearTimeout(l), l = null
        }

        function r(a) {
            e.Tags.set(a.target.title), a.stopPropagation(), o()
        }

        function s(a) {
            a.stopPropagation(), (j.style.display == "block" ? u : t)()
        }

        function t() {
            k.firstChild.innerHTML = d.less, k.lastChild.src = uiTheme.arrowUp, j.style.display = "block"
        }

        function u() {
            k.firstChild.innerHTML = d.more, k.lastChild.src = uiTheme.arrowDown, j.style.display = "none"
        }
        var b = "tagpanel" + ++longdo.objectcount,
            c = "th",
            d = null,
            e = null,
            f = null,
            g = null,
            h = null,
            i = null,
            j = null,
            k = null,
            l = null;
        this.map = function(a) {
            return e = a, $.loadScript(server.longdo + "mmmap/gen_icontag_table_2.php?map=longdo.map" + e.id() + "&locale=" + c + "&callback=longdo.callback." + b), this
        }, a = a || {}, c = a.language || c, d = uiTheme.tagPanelLabel[c];
        var v = document.createElement("span");
        v.className = "ldmap_tagpanel ldmap_menubar", v.onclick = m, f = $.append(v, "div", {
            className: "ldmap_dropdown_head",
            onmouseover: q
        }), f.addEventListener("mouseout", p), h = $.append(f, "img", {
            className: "ldmap_arrow",
            src: uiTheme.arrowDown
        }), g = $.append(f, "span", {
            innerHTML: d.title,
            className: "ldmap_tagpanel_head"
        }), i = $.append(v, "div", {
            className: "ldmap_tagpanel_body ldmap_dropdown_body",
            innerHTML: "N/A",
            onmouseover: q
        }), i.addEventListener("mouseout", p), i.style.display = "none";
        var w = a.tag || DEFAULT_TAG;
        for (var x = 0, y; y = w[x]; ++x) {
            var z = $.append(g, "img", {
                src: server.map + "images/icons_2x/" + y + ".png",
                title: $.capFirst(y)
            });
            z.addEventListener("click", r)
        }
        longdo.callback[b] = function(a) {
            var b = "";
            for (var c = 0; c < a.length; ++c) c == 3 && (i.innerHTML = b, b = "", j = $.append(i, "div"), j.style.display = "none", k = $.append(i, "div", {
                className: "ldmap_morecategory",
                innerHTML: "<span>" + d.more + '</span> <img src="' + uiTheme.arrowDown + '" />'
            }), k.addEventListener("click", s)), b += a[c];
            (a.length > 3 ? j : i).innerHTML = b;
            var f = $.append(i, "div", {
                className: "ldmap_command"
            });
            $.append(f, "span", {
                className: "ldmap_link",
                innerHTML: d.clear,
                onclick: e.Tags.clear
            })
        }, LongdoControl.call(this, v)
    }, longdo.TagPanel.prototype = Object.create(LongdoControl.prototype), longdo.CustomControl = function(a) {
        var b = document.createElement("span");
        b.className = "ldmap_customcontrol", b.innerHTML = a.html, LongdoControl.call(this, b)
    }, longdo.CustomControl.prototype = Object.create(LongdoControl.prototype), longdo.DPad = function(a, b) {
        function e() {
            d.innerHTML = b.zoom()
        }
        var c = null,
            d = null;
        this.visible = function(a) {
            return a == undefined ? c.style.display != "none" : (c.style.display = a ? "block" : "none", b.Ui.updateStyle(), this)
        }, c = $.append(a, "div", {
            className: "ldmap_dpad"
        }), c.style.backgroundImage = "url(" + uiTheme.dpad + ")", d = $.append(c, "div", {
            className: "ld_zoomlabel"
        }), $.append(c, "div", {
            className: "ld_goleft"
        }).addEventListener("click", function() {
            b.move({
                x: -DPAD_MOVE,
                y: 0
            }, !0)
        }), $.append(c, "div", {
            className: "ld_goright"
        }).addEventListener("click", function() {
            b.move({
                x: DPAD_MOVE,
                y: 0
            }, !0)
        }), $.append(c, "div", {
            className: "ld_gotop"
        }).addEventListener("click", function() {
            b.move({
                x: 0,
                y: -DPAD_MOVE
            }, !0)
        }), $.append(c, "div", {
            className: "ld_gobottom"
        }).addEventListener("click", function() {
            b.move({
                x: 0,
                y: DPAD_MOVE
            }, !0)
        }), b.Event.bind("pinch", e).bind("zoom", e), e()
    }, longdo.Zoombar = function(a, b) {
        function i() {
            e.style.top = (1 - b.zoom() / g) * ZOOMBAR_HEIGHT + "px"
        }

        function j() {
            b.zoom(!0, !0)
        }

        function k() {
            b.zoom(!1, !0)
        }

        function l(a) {
            if (a.target != e) return;
            a.preventDefault(), h = a.clientY
        }

        function m(a) {
            if (!h) return;
            a.preventDefault();
            var c = $.bound(a.clientY - h, -e.offsetTop, d.offsetHeight - e.offsetTop - e.offsetHeight + 2),
                f = $.bound(b.zoom() - Math.round((a.clientY - h) / d.offsetHeight * g), 1, g);
            $.isInRange(f, b.zoomRange()) ? $.translate(e, {
                x: 0,
                y: c
            }) : f = !1, b.Ui.Tooltip.set(f)
        }

        function n(a) {
            if (!h) {
                if (a.target != d) return;
                f || (f = d.getBoundingClientRect().top);
                var c = 1 + ((1 - (a.clientY - f) / d.offsetHeight) * g >> 0);
                b.zoom(c, !0);
                return
            }
            a.preventDefault();
            var i = b.zoomRange(),
                c = $.bound(b.zoom() - Math.round((a.clientY - h) / d.offsetHeight * g), i.min, i.max);
            h = null, b.zoom(c, !0), $.translate(e, {
                x: 0,
                y: 0
            }), b.Ui.Tooltip.set(!1)
        }
        var c = null,
            d = null,
            e = null,
            f = 0,
            g = b.projection().maxZoom,
            h = null;
        this.visible = function(a) {
            return a == undefined ? c.style.display != "none" : (c.style.display = a ? "inline-block" : "none", this)
        }, this.element = function() {
            return c
        }, c = $.append(a, "div", {
            className: "ldmap_zoom"
        }), $.append(c, "img", {
            className: "ldmap_zoomin ldmap_button",
            src: uiTheme.zoomIn
        }).addEventListener("click", j);
        var o = $.append(c, "div", {
            className: "ldmap_zoombargroup"
        });
        d = $.append(o, "img", {
            className: "ldmap_zoombar",
            src: uiTheme.zoomBar
        }), d.onload = i, e = $.append(o, "img", {
            className: "ldmap_zoomslider",
            src: uiTheme.zoomSlider
        }), setTimeout($.transition, 1e3, e, !0), $.append(c, "img", {
            className: "ldmap_zoomout ldmap_button",
            src: uiTheme.zoomOut
        }).addEventListener("click", k), document.addEventListener("mousedown", l), document.addEventListener("mousemove", m), document.addEventListener("mouseup", n), b.Event.bind("pinch", i).bind("zoom", i), i()
    }, longdo.ZoombarMini = function(a, b) {
        var c = null;
        this.visible = function(a) {
            return a == undefined ? c.style.display != "none" : (c.style.display = a ? "block" : "none", this)
        }, this.element = function() {
            return c
        }, c = $.append(a, "div", {
            className: "ldmap_zoombar_mini"
        }), $.fastClick($.append(c, "img", {
            className: "ldmap_button ldmap_zoomin",
            src: uiTheme.zoomInMini
        }), function() {
            b.zoom(!0, !0)
        }), $.fastClick($.append(c, "img", {
            className: "ldmap_button ldmap_zoomout",
            src: uiTheme.zoomOutMini
        }), function() {
            b.zoom(!1, !0)
        })
    }, longdo.Geolocation = function(a, b) {
        function i(a) {
            if (a == "hide") {
                f.style.display = "none";
                return
            }
            if (a) {
                clearTimeout(h), b.Overlays.remove(g);
                if (a.coords) {
                    var e = a.coords.accuracy,
                        j = b.projection().maxZoom;
                    e < 100 ? j -= 4 : e < 500 ? j -= 5 : e < 1e3 ? j -= 6 : e < 2500 ? j -= 7 : e < 1e4 ? j -= 8 : e < 25001 ? j -= 9 : j -= 10, j > b.zoom() && b.zoom(j), f.innerHTML = d.res + $.formatDistance(e, c) + ")", g = new longdo.Marker({
                        lon: a.coords.longitude,
                        lat: a.coords.latitude
                    }, {
                        icon: uiTheme.geolocationMarkerIcon
                    }), b.Overlays.add(g)
                } else f.innerHTML = '<span class="ldmap_alert_error">' + d.err + "</span>";
                setTimeout(i, NOTIFY_TIMEOUT, "hide")
            } else f.innerHTML = d.req, h = setTimeout(i, GEOLOCATION_TIMEOUT, !0);
            f.style.display = "inline"
        }
        var c = "th",
            d = uiTheme.geolocationLabel[c],
            e = null,
            f = null,
            g = null,
            h = null;
        this.language = function(a) {
            return a == undefined ? c : (c = a.substring(0, 2) == "th" ? "th" : "en", d = uiTheme.geolocationLabel[c], this)
        }, this.visible = function(a) {
            return a == undefined ? e.style.display != "none" : (e.style.display = a ? "inline" : "none", this)
        }, this.forceCurrentLocation = function() {
            b.Overlays.remove(g), g = new longdo.Marker(b.location(), {
                icon: uiTheme.geolocationMarkerIcon
            }), b.Overlays.add(g)
        }, e = $.append(a, "img", {
            className: "ldmap_button ldmap_geolocation",
            src: uiTheme.geolocation,
            title: uiTheme.geolocationTip
        }), $.fastClick(e, function() {
            b.location(longdo.LocationMode.Geolocation, !0)
        }), f = $.append(a, "span", {
            className: "ldmap_alert"
        }), $.append(a, "br"), b.Event.bind("beforeGeolocation", i).bind("geolocation", i).bind("geolocationError", i)
    }, longdo.Toolbar = function(a, b, c) {
        function p() {
            s(), o = "M", f.src = uiTheme.measureOn, b.Event.bind("click", v).bind("overlayClick", v).bind("doubleClick", w).fire("toolbarChange", o), b.Ui.Tooltip.set(uiTheme.measureBeginTip), b.Ui.Mouse.overlayDoubleClick(!0)
        }

        function q() {
            o = null, f.src = uiTheme.measureOff, b.Event.unbind("mousemove", u).unbind("click", v).unbind("overlayClick", v).unbind("doubleClick", w).fire("toolbarChange", o), b.Overlays.remove(m).remove(n), m = null, n = null, l = null, b.Ui.Tooltip.set(!1), b.Ui.Mouse.overlayDoubleClick(!1)
        }

        function r() {
            if (o == "R") return;
            q(), o = "R", g.src = uiTheme.rangeOn, b.Event.fire("toolbarChange", o), document.addEventListener("mousedown", x)
        }

        function s() {
            o = null, g.src = uiTheme.rangeOff, b.Event.fire("toolbarChange", o), document.removeEventListener("mousedown", x), b.Ui.Tooltip.set(!1)
        }

        function t() {
            h.src = uiTheme.clearOff;
            for (var a = 0; a < k.length; ++a) b.Overlays.remove(k[a]);
            k = [], b.Event.fire("clearMeasure")
        }

        function u() {
            var a = b.location(longdo.LocationMode.Pointer);
            l[l.length - 1] = a, m ? m.move(l) : (m = new longdo.Polyline(l, {
                lineColor: "rgba(" + j + ", 0.3)",
                fillColor: !1,
                label: !0
            }), m.guide = !0, m.label.guide = !0, b.Overlays.add(m)), b.Ui.Tooltip.set(uiTheme.measureDistanceTip);
            if (l.length < 4) return;
            var c = 10 / (1 << b.zoom());
            $.isAbsInRange(a.lon - l[0].lon, c) && $.isAbsInRange(a.lat - l[0].lat, c) ? (n || (n = new longdo.Dot(l[0], {
                lineColor: "rgba(" + j + ", 1)",
                lineWidth: GUIDE_POINT_SIZE
            }), n.guide = !0, b.Overlays.add(n)), b.Ui.Tooltip.set(uiTheme.measureAreaTip)) : (b.Overlays.remove(n), n = null)
        }

        function v() {
            var a = b.location(longdo.LocationMode.Pointer);
            if (l) {
                if (n) return l.pop(), w();
                u(), l.push(a)
            } else uiTheme.measureColorList ? (j = uiTheme.measureColorList[i], i = (i + 1) % uiTheme.measureColorList.length) : j = STOCK_COLOR[nextColor], b.Event.bind("mousemove", u), l = [a, a];
            return !1
        }

        function w(a) {
            a && l && u();
            var c = uiTheme.measureOptions;
            uiTheme.measureColorList ? (c.lineColor = "rgba(" + j + ", " + GEOMETRY_LINEALPHA + ")", c.fillColor = "rgba(" + j + ", " + GEOMETRY_FILLALPHA + ")") : (delete c.lineColor, delete c.fillColor);
            var d = l ? new(a ? longdo.Polyline : longdo.Polygon)(l, c) : new longdo.Circle(b.location(longdo.LocationMode.Pointer), 100 / (1 << b.zoom()), c);
            return b.Ui.Tooltip.set(!1), b.Overlays.add(d), k.push(d), h.src = uiTheme.clearOn, q(), !1
        }

        function x(a) {
            if (!$.onMap(a) || !b.pageToScreen({
                    x: a.pageX,
                    y: a.pageY
                })) return;
            b.Ui.Mouse.enableDrag(!1);
            var c = b.location(longdo.LocationMode.Pointer);
            l = [c, {
                lat: c.lat
            }, null, {
                lon: c.lon
            }, c], document.removeEventListener("mousedown", x), document.addEventListener("mousemove", y), document.addEventListener("mouseup", z)
        }

        function y() {
            if (!l || l.length != 5) {
                if (!m) return;
                l = m.location()
            }
            l[2] = b.location(longdo.LocationMode.Pointer), l[1].lon = l[2].lon, l[3].lat = l[2].lat, m ? m.move(l) : (m = new longdo.Polygon(l, uiTheme.rangeOptions), m.guide = !0, b.Overlays.add(m))
        }

        function z() {
            if (l[2] != null) {
                var a = {};
                l[0].lon < l[2].lon ? (a.minLon = l[0].lon, a.maxLon = l[2].lon) : (a.minLon = l[2].lon, a.maxLon = l[0].lon), l[0].lat < l[2].lat ? (a.minLat = l[0].lat, a.maxLat = l[2].lat) : (a.minLat = l[2].lat, a.maxLat = l[0].lat), b.bound(a)
            }
            document.removeEventListener("mousemove", y), document.removeEventListener("mouseup", z), b.Ui.Mouse.enableDrag(!0), b.Overlays.remove(m), m = null, l = null, s()
        }
        var d = "th",
            e = null,
            f = null,
            g = null,
            h = null,
            i = 0,
            j = null,
            k = [],
            l = null,
            m = null,
            n = null,
            o = null;
        this.language = function(a) {
            return a == undefined ? d : (d = a.substring(0, 2) == "th" ? "th" : "en", this)
        }, this.visible = function(a) {
            return a == undefined ? e.style.display != "none" : (e.style.display = a ? "inline" : "none", b.Ui.updateStyle(), this)
        }, this.measureToggle = function(a) {
            ((typeof a == "boolean" ? a : f.src == uiTheme.measureOff) ? p : q)()
        }, this.rangeToggle = function(a) {
            ((typeof a == "boolean" ? a : g.src == uiTheme.rangeOff) ? r : s)()
        }, this.measureList = function() {
            return k
        }, this.activeTool = function() {
            return o
        }, e = $.append(a, "span", {
            className: "ldmap_toolbar"
        }), f = $.append(e, "img", {
            className: "ldmap_button",
            src: uiTheme.measureOff,
            title: uiTheme.measureTip
        }), f.addEventListener("click", this.measureToggle), g = $.append(e, "img", {
            className: "ldmap_button",
            src: uiTheme.rangeOff,
            title: uiTheme.rangeTip
        }), g.addEventListener("click", this.rangeToggle), h = $.append(e, "img", {
            className: "ldmap_button",
            src: uiTheme.clearOff,
            title: uiTheme.clearTip
        }), h.addEventListener("click", t)
    }, longdo.LayerSelector = function(a, b, c) {
        function h(a) {
            if (g) return;
            g = !0, b.Layers.clear().setBase(a.value), a.value2 && b.Layers.add(a.value2), g = !1
        }

        function i() {
            if (g) return;
            var a = b.Layers.externalMap();
            a && (a = a.join("."));
            var c = b.Layers.list();
            g = !0;
            var f = uiTheme.layerSelectorOption[e].button.concat(uiTheme.layerSelectorDropdown);
            for (var h = 0, i; i = f[h]; ++h) {
                if (!i.value) continue;
                if (a) {
                    if (a == i.value.name() && c[0] == longdo.Layers.CLEAR && !c[1]) {
                        d.selectIndex(h), g = !1;
                        break
                    }
                } else if (c[0] == i.value && c[1] == i.value2) {
                    d.selectIndex(h), g = !1;
                    break
                }
            }
            if (!g) return;
            d.selectIndex(-1), g = !1
        }

        function j(a) {
            for (var b = 0, c; c = a[b]; ++b) c.value && c.value.name().substring(0, 7) == "google." && a.splice(b--, 1)
        }
        var d = null,
            e = "th",
            f = null,
            g = !1;
        this.language = function(a) {
            if (a == undefined) return e;
            e = a.substring(0, 2) == "th" ? "th" : "en";
            var b = uiTheme.layerSelectorOption[e],
                g = d.element().children;
            if (c == "dropdown") {
                g = g[0].lastChild.children;
                for (var h = 0, j; j = b.button[h]; ++h) g[h].innerHTML = j.label, j.element = g[h], f.dropdown[h] = j
            } else {
                f.button = b.button;
                for (var h = 0, j; j = b.button[h]; ++h) g[h].innerHTML = j.label, j.element = g[h]
            }
            return c || (g[b.button.length].firstChild.lastChild.innerHTML = b.more, f.dropdownLabel = b.more), i(), this
        }, this.visible = function(a) {
            return a == undefined ? d.visible() : (d.visible(a), this)
        }, uiTheme.layerSelectorGoogle == !1 && (j(uiTheme.layerSelectorOption.en.button), j(uiTheme.layerSelectorOption.th.button), j(uiTheme.layerSelectorDropdown));
        var k = uiTheme.layerSelectorOption[e];
        f = {
            button: c == "dropdown" ? null : k.button,
            dropdown: c == "button" ? null : c == "dropdown" ? k.button.concat(uiTheme.layerSelectorDropdown) : uiTheme.layerSelectorDropdown,
            dropdownLabel: c == "dropdown" ? k.dropdownTitle : k.more,
            change: h
        }, d = new longdo.MenuBar(f), d.map(b), a.appendChild(d.element()), b.Event.bind("layerChange", i), i(), (new Image).src = uiTheme.arrowUp, (new Image).src = uiTheme.arrowActive
    }, longdo.Fullscreen = function(a, b) {
        function e() {
            c.toggle()
        }
        var c = this,
            d = null;
        c.visible = function(a) {
            return a == undefined ? d.style.display != "none" : (d.style.display = a ? "inline" : "none", c)
        }, c.toggle = function(e) {
            var f = e === undefined ? $.hasClass(a.parentNode, "ldmap_placeholder_fullscreen") : !e;
            return f ? ($.removeClass(a.parentNode, "ldmap_placeholder_fullscreen"), d.src = uiTheme.fullscreenUp) : ($.addClass(a.parentNode, "ldmap_placeholder_fullscreen"), d.src = uiTheme.fullscreenDown), b.resize(), b.Event.fire("fullscreen", !f), c
        }, d = $.append(a, "img", {
            className: "ldmap_button ldmap_fullscreen",
            src: uiTheme.fullscreenUp,
            title: uiTheme.fullscreenTip
        }), d.addEventListener("click", e), (new Image).src = uiTheme.fullscreenDown
    }, longdo.Crosshair = function(a, b) {
        var c = null,
            d = null;
        this.visible = function(a) {
            return a == undefined ? c.style.display != "none" : (c.style.display = d.style.display = a ? "block" : "none", this)
        }, c = $.append(a, "div", {
            className: "ldmap_crosshair ldmap_maparea",
            style: "height: " + (b ? 10 : 20) + "px"
        }), d = $.append(a, "div", {
            className: "ldmap_crosshair ldmap_maparea",
            style: "width: " + (b ? 10 : 20) + "px"
        })
    }, longdo.Scale = function(a) {
        var b = null,
            c = null,
            d = 3779.52,
            e = !1,
            f = !0;
        this.repaint = function(a, g, h) {
            var i = a.normToLat(a.maxLat - g.y / a.pointPerDegree),
                j = (a.maxPointY >> g.z) / a.size / $.longitudeLength(i),
                k = 8e6;
            if (j > 100) return b.style.width = "100px", c.innerHTML = "unscale" + j, self;
            j > 25 ? k = 1 : j > 5 ? k = 10 : j > 2.5 ? k = 50 : j > .5 ? k = 100 : j > .25 ? k = 500 : j > .05 ? k = 1e3 : j > .025 ? k = 5e3 : j > .005 ? k = 1e4 : j > .0025 ? k = 5e4 : j > 5e-4 ? k = 1e5 : j > 25e-5 ? k = 5e5 : j > 125e-6 ? k = 1e6 : j > 625e-7 ? k = 2e6 : j > 3125e-8 && (k = 4e6), b.style.width = (j * k | 0) + "px";
            var l = "";
            if (e) {
                var m = d / j,
                    n = m < 1e3 ? m < 100 ? 1 : 100 : 1e3;
                l = "1:" + $.numberWithCommas(parseInt(m / n) * n), f && (l += "<br />")
            }
            return f && (l += k < 1e3 ? k + " m" : k / 1e3 + " km"), c.innerHTML = l, self
        }, this.visible = function(a) {
            return a == undefined ? b.style.display != "none" : (b.style.display = a ? "block" : "none", this)
        }, this.enableAbsolute = function(a) {
            return a == undefined ? e : (e = a, this)
        }, this.enableRelative = function(a) {
            return a == undefined ? f : (f = a, this)
        }, this.ppi = function(a) {
            return a == undefined ? d / 39.37 : (d = a * 39.37, this)
        }, b = $.append(a, "div", {
            className: "ldmap_scale"
        }), c = $.append(b, "div", {
            className: "ldmap_scalecaption"
        }), setTimeout($.transition, 1e3, b, !0)
    }, longdo.Legend = function(a, b) {
        function h() {
            b.Layers.contains(longdo.Layers.TRAFFIC) ? (c.visible(uiTheme.legendTraffic[d]), f && setTimeout(b.Overlays.load, 100, longdo.Overlays.events), g && setTimeout(b.Overlays.load, 200, longdo.Overlays.cameras)) : (c.visible(!1), f && b.Overlays.unload(longdo.Overlays.events), g && b.Overlays.unload(longdo.Overlays.cameras))
        }
        var c = this,
            d = "th",
            e = null,
            f = !1,
            g = !1;
        c.language = function(a) {
            return a == undefined ? d : (d = a.substring(0, 2) == "th" ? "th" : "en", h(), c)
        }, c.visible = function(a) {
            return a == undefined ? e.style.display != "none" : (a ? (e.src = a, e.style.display = "inline") : e.style.display = "none", c)
        }, c.enableLoadEvents = function(a) {
            return a == undefined ? f : (f = a, c)
        }, c.enableLoadCameras = function(a) {
            return a == undefined ? g : (g = a, c)
        }, e = $.append(a, "img", {
            src: UI_LEGEND_NONE,
            className: "ldmap_legend"
        }), b.Event.bind("layerChange", h), h()
    }, longdo.Notice = function(a, b) {
        var c = ["", " HD", " QHD", " OHD"];
        $.append(a, "div", {
            className: "ldmap_notice",
            innerHTML: (b ? copyright[1] || '&copy; <a href="https://map.longdo.com/terms" target="_blank">Longdo Map</a>' : copyright[0] || '<a href="https://map.longdo.com/" target="_blank">Longdo Map</a> &copy; <a href="https://www.mm.co.th/" target="_blank">MM</a>, <a href="https://www.numap.co.th/" target="_blank">NuMAP</a>, <a href="https://www.openstreetmap.org/" target="_blank">OSM</a> <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank"><img src="' + ICON_CC + '"></a> - <a href="https://map.longdo.com/terms/" target="_blank">Terms</a>') + (c[$.isHD()] || "")
        })
    }, longdo.ContextMenu = function(a, b) {
        function p(a) {
            a instanceof Element ? e.appendChild(a) : $.append(e, "div", {
                innerHTML: a
            })
        }

        function q(a) {
            if (!l) return;
            if (a && !a.error) {
                var c = b.Search.language() == "th" ? " " : ", ";
                h.innerHTML = (a.road ? a.road + c : "") + a.subdistrict + c + a.district + c + a.province + " " + (a.postcode ? a.postcode : "");
                if (a.elevation) {
                    var d = UNIT[b.Search.language()];
                    k.innerHTML += " " + $.numberWithCommas(a.elevation) + d.m
                }
            } else $.empty(h);
            s()
        }

        function r(a) {
            if (!l || !$.sameLocation(g, a.meta) || !i) return;
            j = {};
            if (!a.data.length) return;
            var b = document.createDocumentFragment();
            for (var c = 0, e; e = a.data[c]; ++c) {
                j[e.id] = e;
                var f = $.append(b, "div");
                $.append(f, "img", {
                    className: "ldmap_contextmenu_icon",
                    src: server.map + "images/icons" + ($.isHD() ? "_2x/" : "/") + (e.icon ? e.icon : "greydot.png")
                }), $.append(f, "span", {
                    id: d + e.id,
                    className: "ldmap_contextmenu_poi ldmap_link",
                    innerHTML: e.name,
                    title: e.name
                }).addEventListener("click", t)
            }
            $.append(b, "hr"), $.empty(i).appendChild(b), s()
        }

        function s() {
            var d = l.x + c.offsetWidth + CONTEXTMENU_BUFFER_X,
                e = l.y + c.offsetHeight + CONTEXTMENU_BUFFER_Y,
                f = d > a.offsetWidth ? d - a.offsetWidth : 0,
                g = e > a.offsetHeight ? e - a.offsetHeight : 0;
            if (f || g) m = !0, l.y -= g, l.x -= f, b.move({
                x: f,
                y: g
            }, !1), c.style.display = "block", c.style.top = l.y + "px", c.style.left = l.x + "px", setTimeout(function() {
                m = !1
            }, 0)
        }

        function t(a) {
            data = j[a.target.id.substring(d.length)], longdo.callback["detailNearPoi" + b.id()] = function(c) {
                var d = c.data[0],
                    e = document.getElementById("detail" + a.target.id);
                if (!e) return;
                e = e.parentNode, $.empty(e).appendChild($.formatPoi(d, b.language(), b.Ui.popup))
            };
            var c = new longdo.Marker(data, {
                title: data.name,
                detail: '<div id="detail' + a.target.id + '" class="ldmap_poi_load">Loading...</div>',
                loadDetail: function() {
                    $.loadScript(server.search + "/json/search?keyword=" + data.id + "&locale=" + b.language() + "&limit=1&key=" + apikey + "&version=2&callback=longdo.callback.detailNearPoi" + b.id())
                }
            });
            c.type = "p", c.data = data, b.Overlays.add(c), c.pop()
        }
        var c = null,
            d = "ldcontext" + b.id() + "-",
            e = null,
            f = null,
            g = null,
            h = null,
            i = null,
            j = {},
            k = null,
            l = null,
            m = !1,
            n = !0,
            o = !0;
        this.visible = function(a, d) {
            if (a == undefined) return c.style.display != "none";
            if (m) return this;
            if (a) {
                l = a, g = d, $.empty(c);
                var j = $.append(c, "div", {
                    className: "ldmap_contextmenu_info"
                });
                if (n) {
                    var q = b.zoom();
                    server.poi && q >= 13 && (i = $.append(j, "div"), b.Search.nearPoi(d, {
                        span: .01,
                        zoom: q + 1,
                        limit: CONTEXTMENU_MAX_POI
                    }))
                }
                o && (h = $.append(j, "div", {
                    innerHTML: "Loading..."
                }), b.Search.address(d)), k = $.append(j, "div", {
                    className: "ldmap_contextmenu_location",
                    innerHTML: Number(d.lat).toFixed(6) + ", " + Number(d.lon).toFixed(6)
                }), e = document.createElement("div"), e.className = "ldmap_contextmenu_extra";
                if (!b.Event.fire("beforeContextmenu", {
                        location: d,
                        add: p
                    })) return this;
                (!e.children || !e.children.length) && p(f), c.appendChild(e), c.style.display = "block", c.style.top = l.y + "px", c.style.left = l.x + "px", s(), b.Event.fire("contextmenu")
            } else c.style.display = "none";
            return this
        }, this.enableNearPoi = function(a) {
            return a == undefined ? n : (n = a, this)
        }, this.enableAddress = function(a) {
            return a == undefined ? o : (o = a, this)
        }, c = $.append(a, "div", {
            className: "ldmap_contextmenu ldmap_selectable"
        }), b.Event.bind("address", q), b.Event.bind("nearPoi", r), f = document.createElement("div"), f.className = "ldmap_link", f.innerHTML = "Move here", f.onclick = function() {
            b.Ui.ContextMenu.visible(!1), b.location(g)
        }
    }, longdo.Tooltip = function(a, b) {
        function e() {
            c.style.display = "block", c.style.top = d.y + 20 + "px", c.style.left = d.x + "px"
        }
        var c = null,
            d = null;
        this.visible = function(a) {
            if (a == undefined) return c.style.display != "none";
            if (a) {
                d = a;
                if (!c.innerHTML) return this;
                e()
            } else c.style.display = "none";
            return this
        }, this.set = function(a) {
            return a ? (c.innerHTML = a, d && e()) : ($.empty(c).style.display = "none", this.type = undefined), b.Event.fire("tooltipChange", a), this
        }, this.get = function(a) {
            return c.innerHTML
        }, c = $.append(a, "div", {
            className: "ldmap_tooltip"
        })
    }, longdo.PopupMini = function(a, b) {
        var c = null,
            d = null,
            e = null;
        this.set = function(f, g) {
            if (!f && !d) return this;
            var h = f != d && f != undefined;
            if (g === undefined) g = h;
            else if (g != h) return this;
            if (d) {
                var i = d.element();
                i.insertBefore(c.firstChild, i.firstChild), d = null, c.setAttribute("style", "")
            }
            if (g) {
                c.appendChild(f.element().firstChild), f.closeButton && (f.closeButton.onclick = function() {
                    b.Ui.popup.set(), b.Event.fire("popupClose", b.Ui.popup)
                }), c.firstChild.setAttribute("style", "");
                var j = f.detail();
                if (j) {
                    var k = j.style.width,
                        l = 1;
                    k && (l = a.offsetWidth / (+k.replace("px", "") + POPUP_MINI_OFFSET_X), j.style.transformOrigin = j.style.webkitTransformOrigin = j.style.msTransformOrigin = "0 0", j.style.transform = j.style.webkitTransform = j.style.msTransform = "scale(" + l + ")");
                    var m = j.style.minHeight;
                    m && (c.style.height = (+m.replace("px", "") + POPUP_MINI_OFFSET_Y) * l + "px")
                }
                f.loadDetail && (b.Event.fire("popupLoadDetail", f) && f.loadDetail(f.detail()), delete f.loadDetail), d = f, e && b.Overlays.remove(e), e = new longdo.Marker(f.location(), {
                    icon: uiTheme.popupMiniMarkerIcon,
                    weight: longdo.OverlayWeight.Top
                }), b.Overlays.add(e), this.visible(!0)
            } else b.Overlays.remove(e), e = null, this.visible(!1);
            return this
        }, this.get = function() {
            return d
        }, this.visible = function(a) {
            return a == undefined ? c.style.display != "none" : (c.style.display = a ? "block" : "none", this)
        }, c = $.append(a, "div", {
            className: "ldmap_popup_mini"
        })
    }, longdo.FloorSelector = function(a, b) {
        function h(a) {
            f && $.removeClass(f, "ldmap_floor_item_active"), j(), f = a.target, $.addClass(f, "ldmap_floor_item_active");
            var c = f.id.split("-");
            $.loadScript(server.longdo + "webservice/json/getooichildren?ooiid=" + c[1] + "&floor=" + c[2] + "&key=" + apikey + "&callback=longdo.callback.floorplan" + b.id())
        }

        function i() {
            b.zoom() >= FLOOR_MIN_ZOOM && d.innerHTML ? d.style.display = "block" : d.style.display = "none"
        }

        function j() {
            var a = b.pause();
            b.pause(!0);
            for (var c = 0; c < g.length; ++c) b.Overlays.remove(g[c].marker);
            b.pause(a).repaint("C"), g = []
        }

        function k(a) {
            var d = f.id.split("-");
            a.id = d[1], a.floor = d[2];
            if (a.id != d[1] || a.floor != d[2]) return;
            var h = b.pause();
            b.pause(!0);
            for (var i = 0; i < a.result.length; ++i) {
                var j = a.result[i];
                j.id = j.pid, j.lon = j.longitude, j.lat = j.latitude, j.status_ooi == "O" && (j.obsoleted = !0), j.status_ooi == "A" && (j.verified = !0), j.tel = j.telephone, j.tag = j.tag.split(", "), j.type = "poi", j.icon = "reddot.png", g.push(j), j.marker = new longdo.Marker(j, {
                    title: j["title_" + c],
                    detail: '<div id="' + e + "d" + i + '" class="ldmap_poi_load">Loading...</div>',
                    icon: {
                        url: server.map + "images/icons/" + j.icon,
                        urlHD: server.map + "images/icons_2x/" + j.icon
                    },
                    loadDetail: l
                }), b.Overlays.add(j.marker)
            }
            b.pause(h).repaint("C")
        }

        function l(a) {
            var d = $.formatPoi(g[a.firstChild.id.substring(e.length + 1)], c, b.Ui.popup);
            $.empty(a).appendChild(d)
        }
        var c = "th",
            d = null,
            e = "ldfloor" + b.id() + "-",
            f = null,
            g = [];
        this.language = function(a) {
            return a == undefined ? c : (c = a.substring(0, 2) == "th" ? "th" : "en", this)
        }, this.visible = function(a, b) {
            if (a == undefined) return d.style.display != "none";
            $.empty(d), f = null, j();
            if (a) {
                var c = document.createDocumentFragment();
                for (var g = 0, k; k = b[g]; ++g) $.append(c, "div", {
                    id: e + a + "-" + k,
                    className: "ldmap_floor_item",
                    innerHTML: k
                }).addEventListener("click", h);
                d.appendChild(c)
            }
            return i(), this
        }, d = $.append(a, "div", {
            className: "ldmap_floor"
        }), b.Event.bind("pinch", i).bind("zoom", i), longdo.callback["floorplan" + b.id()] = k
    };
    var KEYSPEED_MIN = 4,
        KEYSPEED_MAX = 16,
        KEY_ACCEL = 1.1,
        KEY_BREAK = .9,
        CONTINUOUS_KEY = 600,
        INERTIA = .9,
        INERTIA_DISTANCE = 48,
        CONTINUOUS_CLICK = 300,
        HOLD_TOUCH = 800,
        CLICK_SIZE = 4,
        FRAMERATE = .06,
        FRAMESKIP_MAX = 3,
        MAX_WHEEL = 10,
        WHEEL_ZOOM = {
            min: .125,
            max: 8
        },
        TRACK_ZOOM = {
            min: 1,
            max: 1
        };
    longdo.Keyboard = function(a, b, c) {
        function k(a) {
            if (!d || document.activeElement != c.anchor || a.keyCode != 17 && (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey)) return;
            switch (a.keyCode) {
                case 37:
                    e ? m(-KEYSPEED_MIN, 0) : c.drag({
                        x: -KEYSPEED_MAX << 1,
                        y: 0
                    });
                    break;
                case 38:
                    e ? m(0, -KEYSPEED_MIN) : c.drag({
                        x: 0,
                        y: -KEYSPEED_MAX << 1
                    });
                    break;
                case 39:
                    e ? m(KEYSPEED_MIN, 0) : c.drag({
                        x: KEYSPEED_MAX << 1,
                        y: 0
                    });
                    break;
                case 40:
                    e ? m(0, KEYSPEED_MIN) : c.drag({
                        x: 0,
                        y: KEYSPEED_MAX << 1
                    });
                    break;
                case 107:
                case 187:
                case 61:
                case 90:
                    c.wheel(!0);
                    break;
                case 109:
                case 189:
                case 173:
                case 88:
                    c.wheel(!1);
                    break;
                case 17:
                    b.Ui.Toolbar && c.getPointer() && b.Ui.Toolbar.rangeToggle(!0)
            }
        }

        function l(a) {
            if (!d) return;
            switch (a.keyCode) {
                case 37:
                    h < 0 && (j = KEY_BREAK);
                    break;
                case 38:
                    i < 0 && (j = KEY_BREAK);
                    break;
                case 39:
                    h > 0 && (j = KEY_BREAK);
                    break;
                case 40:
                    i > 0 && (j = KEY_BREAK);
                    break;
                case 17:
                    b.Ui.Toolbar && b.Ui.Toolbar.rangeToggle(!1)
            }
        }

        function m(a, b) {
            j = KEY_ACCEL;
            if (a > 0 && h <= 0 || a < 0 && h >= 0 || b > 0 && i <= 0 || b < 0 && i >= 0) h = a, i = b;
            g || (f = Date.now(), requestAnimationFrame(n)), g = Date.now()
        }

        function n() {
            var a = Date.now(),
                b = Math.min((a - f) * FRAMERATE, FRAMESKIP_MAX);
            f = a;
            if ($.isAbsInRange(h, 1) && $.isAbsInRange(i, 1)) {
                h = 0, i = 0, g = null;
                return
            }
            requestAnimationFrame(n), a - g > CONTINUOUS_KEY && (j = KEY_BREAK), c.drag({
                x: h * b | 0,
                y: i * b | 0
            });
            var d = Math.pow(j, b);
            h = $.bound(h * d, -KEYSPEED_MAX, KEYSPEED_MAX), i = $.bound(i * d, -KEYSPEED_MAX, KEYSPEED_MAX)
        }
        var d = !0,
            e = !0,
            f = null,
            g = null,
            h = 0,
            i = 0,
            j = 0;
        this.enable = function(a) {
            return a == undefined ? d : (d = a, this)
        }, this.enableInertia = function(a) {
            return a == undefined ? e : (e = a, this)
        }, document.addEventListener("keydown", k), document.addEventListener("keyup", l)
    }, longdo.Mouse = function(a, b, c) {
        function A(a) {
            if (!$.onMap(a) || document.activeElement != c.anchor) return;
            k = F(a);
            var d = b.pageToScreen(k);
            if (!d) return;
            a.preventDefault(), v = 0, w = 0, a.touches && a.touches.length > 1 ? (j = [E(a.touches[0]), E(a.touches[1])], r && (clearTimeout(r), r = null)) : (j = k, i && (r = setTimeout(c.click, HOLD_TOUCH, !1, d))), a.activeElement ? (q = c.overlayByElement(a.activeElement), q && q.geometry && !q.clickable && (q = c.down(d))) : q = c.down(d), q && q.draggable && b.Event.fire("overlaySelect", q)
        }

        function B(d) {
            var f = F(d);
            if (j) {
                r && p && (clearTimeout(r), r = null);
                if (!e) {
                    if ($.onMap(d)) {
                        var g = b.pageToScreen(f);
                        c.dragWhenDisable(g)
                    }
                    return
                }
                d.preventDefault();
                if (d.touches && d.touches.length > 1) {
                    var h = E(d.touches[0]),
                        i = E(d.touches[1]);
                    if (h && i) {
                        var u = m.distance(h.x - i.x, h.y - i.y);
                        l && (b.pinch(u / l, b.pageToScreen(f)), k = f), n = l, l = u
                    } else l = null, n = null;
                    return
                }
                l = null, n = null, o = {
                    x: k.x - f.x,
                    y: k.y - f.y
                };
                if (!o.x && !o.y) return;
                k = f, p = Date.now(), a.style.cursor = "move", q && q.draggable ? (c.dragOverlay(q, o), b.Ui.Tooltip && q.title && b.Ui.Tooltip.get() == q.title && b.Ui.Tooltip.set(!1)) : c.drag(o), d.srcElement && !d.srcElement.dragEvent && (d.srcElement.addEventListener("drag", B), d.srcElement.dragEvent = !0);
                return
            }
            s && (f.x != k.x || f.y != k.y) && (clearTimeout(s), s = null, t()), k = f, c.move(b.pageToScreen(k), $.onMap(d))
        }

        function C(a) {
            s && cap.mouseDoubleUp && A(a);
            if (!j) return;
            r && (clearTimeout(r), r = null), a.preventDefault();
            if (d && !n && (!p || $.isAbsInRange(j.x - k.x, CLICK_SIZE) && $.isAbsInRange(j.y - k.y, CLICK_SIZE)))
                if (j.length) c.doubleClick(!1, b.pageToScreen({
                    x: (j[0].x + j[1].x) / 2,
                    y: (j[0].y + j[1].y) / 2
                }));
                else {
                    var e = (i || a.which == 1) && a.which != 3,
                        f = b.pageToScreen(j);
                    s ? (clearTimeout(s), s = null, c.doubleClick(e, f)) : e && !h && q ? c.hit(q) : (t = function() {
                        s = null, e && q ? c.hit(q) : c.click(e, f)
                    }, s = setTimeout(t, CONTINUOUS_CLICK))
                }
            else if (l) b.pinchEnd(b.pageToScreen(k)), l = null, n = null;
            else if (o) {
                var m = Date.now() - p + 10;
                if (q) c.dropOverlay(q);
                else {
                    if (g && m > 0 && m < CONTINUOUS_CLICK) {
                        var x = 30 / m;
                        v = $.bound(o.x * x, -INERTIA_DISTANCE, INERTIA_DISTANCE), w = $.bound(o.y * x, -INERTIA_DISTANCE, INERTIA_DISTANCE), u = p, G(Date.now()), requestAnimationFrame(G)
                    }
                    c.drop()
                }
                o = null
            }
            j = null
        }

        function D(a) {
            if (!f || !$.onMap(a)) return;
            a.preventDefault();
            var d = b.pageToScreen(E(a));
            if (!d) return;
            var e = a.deltaY !== undefined ? a.deltaY : a.wheelDeltaY !== undefined ? -a.wheelDeltaY : a.wheelDelta ? -a.wheelDelta : a.detail;
            if (!e) return;
            var g = e < 0;
            g != x && c.wheelEnd(), x = g, c.wheel(g, d);
            if (WHEEL_ZOOM == TRACK_ZOOM) return;
            z ? ++y : z = setTimeout(function() {
                y > MAX_WHEEL && (WHEEL_ZOOM = TRACK_ZOOM), y = 0, z = null
            }, 2e3)
        }

        function E(a) {
            return {
                x: a.pageX,
                y: a.pageY
            }
        }

        function F(a) {
            if (a.pageX || a.pageY || !a.touches) return E(a);
            if (a.touches.length == 1) return E(a.touches[0]);
            var b = a.touches[0],
                c = a.touches[1];
            return {
                x: (b.pageX + c.pageX) / 2,
                y: (b.pageY + c.pageY) / 2
            }
        }

        function G() {
            var a = Date.now(),
                b = Math.min((a - u) * FRAMERATE, FRAMESKIP_MAX);
            u = a;
            if ($.isAbsInRange(v, 1) && $.isAbsInRange(w, 1)) return;
            requestAnimationFrame(G), c.drag({
                x: v * b | 0,
                y: w * b | 0
            }), coef = Math.pow(INERTIA, b), v *= coef, w *= coef
        }
        var d = !0,
            e = !0,
            f = !0,
            g = !0,
            h = !1,
            i = !1,
            j = null,
            k = null,
            l = null,
            n = null,
            o = null,
            p = null,
            q = null,
            r = null,
            s = null,
            t = null,
            u = null,
            v = 0,
            w = 0,
            x = !1,
            y = 0,
            z = null;
        this.enable = function(a) {
            return d = a, e = a, f = a, this
        }, this.enableClick = function(a) {
            return a == undefined ? d : (d = a, this)
        }, this.enableDrag = function(a) {
            return a == undefined ? e : (e = a, this)
        }, this.enableWheel = function(a) {
            return a == undefined ? f : (f = a, this)
        }, this.enableInertia = function(a) {
            return a == undefined ? g : (g = a, this)
        }, this.overlayDoubleClick = function(a) {
            return a == undefined ? h : (h = a, this)
        };
        if (navigator.msPointerEnabled && navigator.msMaxTouchPoints > 1) {
            i = !0, document.addEventListener("MSPointerDown", A), document.addEventListener("MSPointerMove", B), document.addEventListener("MSPointerUp", C), a.addEventListener("wheel", D), ieTouch(a, b, c, E);
            return
        }
        "ontouchstart" in window && (i = !0, document.addEventListener("touchstart", function(a) {
            i = !0, A(a)
        }, {
            passive: !1
        }), document.addEventListener("touchmove", B, {
            passive: !1
        }), document.addEventListener("touchend", C)), document.addEventListener("mousedown", function(a) {
            if (i) return;
            A(a)
        }), document.addEventListener("mousemove", function(a) {
            i = !1, B(a)
        }), document.addEventListener("mouseup", C), "onwheel" in window ? a.addEventListener("wheel", D) : (a.addEventListener("mousewheel", D), a.addEventListener("DOMMouseScroll", D))
    };
    var SMALL_WIDTH = 600,
        SMALL_HEIGHT = 360;
    longdo.UiPosition = {
        Left: !1,
        Right: !0
    }, longdo.UiComponent = {
        Full: "FULL",
        Compact: "COMPACT",
        Mobile: "MOBILE",
        None: !1
    }, longdo.UiCollection = function(a, b, c, d) {
        function j() {
            g.offsetWidth == (window.innerWidth || document.documentElement.offsetWidth) && e.Fullscreen.visible(!1)
        }
        var e = this,
            f = "th",
            g = a.placeholder(),
            h = null,
            i = !1;
        e.resize = function() {
            if (!i) return;
            return e.Zoombar.visible() && (g.offsetHeight < SMALL_HEIGHT ? e.Zoombar instanceof longdo.Zoombar && (h.removeChild(e.Zoombar.element()), e.Zoombar = new longdo.ZoombarMini(h, a)) : e.Zoombar instanceof longdo.ZoombarMini && (h.removeChild(e.Zoombar.element()), e.Zoombar = new longdo.Zoombar(h, a))), e
        }, e.language = function(a) {
            return a == undefined ? f : (f = a.substring(0, 2) == "th" ? "th" : "en", e.Geolocation && e.Geolocation.language(a), e.LayerSelector && e.LayerSelector.language(a), e.Legend && e.Legend.language(a), e.Toolbar && e.Toolbar.language(a), e)
        }, e.add = function(b, c) {
            if (b instanceof LongdoControl) return e.TopRight.insertBefore(b.element(), c ? e.TopRight.lastChild : e.TopRight.firstChild), b.map && b.map(a), e;
            throw "Not control"
        }, e.remove = function(a) {
            try {
                e.TopRight.removeChild(a.element())
            } finally {
                return e
            }
        }, e.updateStyle = function() {
            return e.TopRight.style.marginLeft = e.TopLeft.offsetWidth + 56 + "px", e.Fullscreen && e.Fullscreen.visible && j(), e
        }, e.TopLeft = null, e.TopRight = null, e.BottomLeft = null, e.BottomRight = null, e.DPad = null, e.Geolocation = null, e.Zoombar = null, e.Toolbar = null, e.LayerSelector = null, e.Fullscreen = null, e.Scale = null, e.Legend = null, e.Notice = null, e.ContextMenu = null, e.Tooltip = null, e.FloorSelector = null, e.Crosshair = null, e.Keyboard = null, e.Mouse = null, g.addEventListener("contextmenu", function(a) {
            var b = a.target;
            while (b && !$.hasClass(b, "ldmap_selectable")) b = b.parentElement;
            b || a.preventDefault()
        }), h = $.append(g, "div", {
            className: "ldmap_navigation ldmap_maparea"
        }), e.TopLeft = $.append(g, "div", {
            className: "ldmap_topleft ldmap_maparea"
        }), e.TopRight = $.append(g, "div", {
            className: "ldmap_topright ldmap_maparea"
        }), e.BottomLeft = $.append(g, "div", {
            className: "ldmap_bottomleft ldmap_maparea"
        }), e.BottomRight = $.append(g, "div", {
            className: "ldmap_bottomright ldmap_maparea"
        });
        var k = (innerWidth || document.documentElement.offsetWidth) < SMALL_WIDTH,
            l = g.offsetWidth > 0 && g.offsetWidth < SMALL_WIDTH;
        c == longdo.UiComponent.Mobile ? (k = !0, l = !0) : c == longdo.UiComponent.Full && (k = !1, l = !1);
        if (c !== longdo.UiComponent.None) {
            var m = {
                language: function() {},
                visible: function() {},
                rangeToggle: function() {}
            };
            k ? (e.DPad = m, e.Geolocation = navigator.geolocation ? new longdo.Geolocation(h, a) : m, e.Zoombar = new longdo.ZoombarMini(h, a), e.Toolbar = m, e.popup = new longdo.PopupMini(g, a)) : (e.DPad = new longdo.DPad(h, a), e.Geolocation = navigator.geolocation ? new longdo.Geolocation(h, a) : m, e.Zoombar = g.offsetHeight < SMALL_HEIGHT ? new longdo.ZoombarMini(h, a) : new longdo.Zoombar(h, a), e.Toolbar = new longdo.Toolbar(e.TopLeft, a, b), i = !0);
            var n;
            c == longdo.UiComponent.Compact ? n = "dropdown" : l && (n = "button"), e.LayerSelector = new longdo.LayerSelector(e.TopRight, a, n), e.Fullscreen = new longdo.Fullscreen(e.TopRight, a), j(), e.Scale = new longdo.Scale(e.BottomLeft), e.ContextMenu = new longdo.ContextMenu(g, a), e.Tooltip = new longdo.Tooltip(g, a), e.FloorSelector = new longdo.FloorSelector(e.BottomRight, a), e.Legend = l ? m : new longdo.Legend(e.BottomRight, a)
        }
        e.Notice = new longdo.Notice(e.BottomRight, l), e.Crosshair = new longdo.Crosshair(g, k), d !== !1 && (e.Keyboard = new longdo.Keyboard(g, a, b), e.Mouse = new longdo.Mouse(g, a, b))
    };

    function LongdoRenderer(a, b, c) {
        function H() {
            $.empty(j), q = [];
            for (var a = 0; a < o.v; ++a) {
                q[a] = [];
                for (var b = 0; b < o.u; ++b) {
                    var c = $.append(j, "div", {
                        className: "ldmap_tile"
                    });
                    q[a][b] = {
                        holder: c,
                        map: $.append(c, "div", {
                            className: "ldmap_tile"
                        }),
                        element: $.append(j, "div", {
                            className: "ldmap_tile_element"
                        })
                    }
                }
            }
        }

        function I(a) {
            var b = (a.overlay ? $.prepend : $.append)(a.holder, "canvas", {
                className: "ldmap_tile_canvas ldmap_maparea"
            }, a.holder.lastChild);
            b.getContext || G_vmlCanvasManager.initElement(b), b.width = b.height = TILESIZE << g;
            var c = b.getContext("2d");
            cap.nocanvas || (c.globalCompositeOperation = "copy"), c.lineCap = c.lineJoin = "round", a.geometry = c
        }

        function J(a) {
            var b = $.append(a.holder, "canvas", {
                className: "ldmap_tile_canvas ldmap_maparea"
            });
            b.getContext || G_vmlCanvasManager.initElement(b), b.width = b.height = TILESIZE << g;
            var c = b.getContext("2d");
            cap.nocanvas || (c.globalCompositeOperation = "copy"), a.overlay = c
        }

        function L() {
            var a = (s.x >> s.z) - n.x - h,
                b = (s.y >> s.z) - n.y - h;
            while (a < 0) a += f.maxPointX >> s.z;
            return w = {
                u: a >> TILEEXP,
                v: b >> TILEEXP,
                w: s.z
            }, {
                x: a,
                y: b,
                z: s.z
            }
        }

        function M() {
            y = {
                x: (w.u << TILEEXP) - h,
                y: (w.v << TILEEXP) - h,
                z: s.z
            }
        }

        function N(a) {
            return {
                x: y.x - a.x,
                y: y.y - a.y
            }
        }

        function O() {
            s = b.getCenter(), s.x = $.bound(s.x, 0, f.maxPointX), s.y = $.bound(s.y, 0, f.maxPointY), b.setCenter(s), t = 1 << f.maxZoom - s.z, u = f.ratio * t, v = Math.ceil(q[0].length / (t << 1)) - 1;
            var a = L();
            x = N(a);
            if (s.z - y.z) {
                R(a);
                return
            }
            var c = q.length << TILEEXP;
            if (x.x > c - TILESIZE || x.x <= -c) {
                R(a);
                return
            }
            c = q[0].length << TILEEXP;
            if (x.y > c - TILESIZE || x.y <= -c) {
                R(a);
                return
            }
            var d = -h,
                e = -TILESIZE - h;
            if (x.x > d) {
                do {
                    for (var g = 0, i; i = q[g]; ++g) {
                        var j = i.pop();
                        i.unshift(j), Q(j)
                    }
                    x.x -= TILESIZE, y.x -= TILESIZE
                } while (x.x > d)
            } else if (x.x <= e)
                do {
                    for (var g = 0, i; i = q[g]; ++g) {
                        var j = i.shift();
                        i.push(j), Q(j)
                    }
                    x.x += TILESIZE, y.x += TILESIZE
                } while (x.x <= e);
            if (x.y > d) {
                do {
                    var i = q.pop();
                    q.unshift(i);
                    for (var k = 0; k < i.length; ++k) Q(i[k]);
                    x.y -= TILESIZE, y.y -= TILESIZE
                } while (x.y > d)
            } else if (x.y <= e)
                do {
                    var i = q.shift();
                    q.push(i);
                    for (var k = 0; k < i.length; ++k) Q(i[k]);
                    x.y += TILESIZE, y.y += TILESIZE
                } while (x.y <= e)
        }

        function P(a) {
            a.w = undefined
        }

        function Q(a) {
            a.w = undefined, K(a.geometry)
        }

        function R(a) {
            var b = a ? Q : P;
            for (var c = 0; c < o.v; ++c)
                for (var d = 0; d < o.u; ++d) b(q[c][d]);
            a && (M(), x = N(a))
        }

        function S(a) {
            $.translate(j, x), l && ($.isAbsInRange(l.u - w.u, o.u - 1) && $.isAbsInRange(l.v - w.v, o.v - 1) && !cap.notransform ? k.style.transform = k.style.webkitTransform = k.style.msTransform = "translate(" + (x.x + l.x + (l.u - w.u << TILEEXP)) + "px, " + (x.y + l.y + (l.v - w.v << TILEEXP)) + "px) scale(" + l.s + ")" : d.clearBackFrame());
            var b = [],
                c = G[B];
            for (var e = 0; e < o.v; ++e)
                for (var f = 0; f < o.u; ++f) {
                    var g = q[e][f],
                        h = {
                            x: f << TILEEXP,
                            y: e << TILEEXP
                        };
                    $.translate(g.holder, h), $.translate(g.element, h), g.element.style.zIndex = c(f, e);
                    if (g.w != undefined) continue;
                    var i = w.v + e;
                    if (i < 0 || i >= u) {
                        $.append(g.map, "div", {
                            className: "ldmap_tile_offworld"
                        });
                        continue
                    }
                    g.ux = w.u + f, g.u = g.ux % t, g.u < 0 && (g.u += t), g.v = i, g.w = w.w;
                    var m = Math.abs(f - p.u) + Math.abs(e - p.v);
                    b[m] || (b[m] = []), b[m].push(g)
                }
            if (!b.length) return;
            setTimeout(function() {
                for (var c = 0; c < b.length; ++c) {
                    var d = b[c];
                    if (!d) continue;
                    if (d[0].w != w.w) return;
                    for (var e = 0, f; f = d[e]; ++e)(!a || a == "M") && Z(f), (!a || a == "O" || a == "C") && U(f, B), (!a || a == "E" || a == "C") && T(f, B), (!a || a == "G" || a == "C") && W(f)
                }
            }, 0)
        }

        function T(b, c) {
            $.empty(b.element);
            var d = b.w;
            if (b.ux >> f.maxZoom - d != v) return;
            var e = b.u << d,
                g = b.v << d,
                h = 1 << d,
                i = a.Overlays.element(e, g, e + h - 1, g + h - 1, d, c);
            if (!i.length) return;
            var j = -b.u << TILEEXP,
                k = -b.v << TILEEXP,
                l = document.createDocumentFragment();
            for (var m = i.length - 1; m >= 0; --m) l.appendChild(i[m].value.element());
            b.element.appendChild(l);
            for (var m = 0, n; n = i[m]; ++m) {
                var o = n.value,
                    p = n.extra,
                    q = o.element(),
                    r = o.offset() || o.getElementOffset();
                $.transformOrigin(q, r);
                var s = {
                        x: (p.x >> d) + j - r.x,
                        y: (p.y >> d) + k - r.y
                    },
                    t = o.rotate === undefined ? -A : o.rotate;
                t ? $.transform(q, "rotate", t + "rad", s) : $.translate(q, s), o.autoFit && (o.fit(), delete o.autoFit);
                if (o.autoFocus) {
                    var u = o,
                        w = s;
                    delete u.autoFocus
                }
            }
            u && _(b, u, w)
        }

        function U(b, c) {
            a.Tags.load(b);
            var d = b.w,
                e = b.u << d,
                f = b.v << d,
                g = Math.ceil((a.Overlays.maxImageSize << d) / TILESIZE),
                h = (1 << d) + g,
                i = a.Overlays.image(e - g, f - g, e + h, f + h, d, c);
            if (!i.length) {
                K(b.overlay);
                return
            }
            b.overlay || J(b), cap.nocanvas && (D = b.overlay);
            var j = -b.u << TILEEXP,
                k = -b.v << TILEEXP;
            for (var l = i.length - 1, m; m = i[l]; --l) V(b, j, k, d, m.value, m.extra);
            if (cap.nocanvas) return;
            b.overlay.drawImage(C, 0, 0), K(D)
        }

        function V(a, b, c, d, e, f) {
            var g = e.element(),
                h = e.offset(),
                i = g.width >> e.hd,
                j = g.height >> e.hd,
                k = e.rotate === undefined ? -A : e.rotate;
            k ? (D.save(), D.translate((f.x >> d) + b, (f.y >> d) + c), D.rotate(k), D.drawImage(g, -h.x, -h.y, i, j), D.restore()) : D.drawImage(g, (f.x >> d) + b - h.x, (f.y >> d) + c - h.y, i, j)
        }

        function W(b) {
            var c = b.w,
                d = b.u << c,
                e = b.v << c,
                f = Math.ceil((a.Overlays.maxGeometrySize << c) / TILESIZE),
                g = (1 << c) + f,
                h = a.Overlays.geometry(d - f, e - f, d + g, e + g, c);
            if (!h.length) {
                K(b.geometry);
                return
            }
            b.geometry || I(b), cap.nocanvas && (F = b.geometry);
            var i = -b.u << TILEEXP,
                j = -b.v << TILEEXP;
            b.lineWidth = 0;
            for (var k = h.length - 1, l; l = h[k]; --k) X(b, i, j, c, l.value, l.extra, l.bound);
            if (cap.nocanvas) return;
            b.geometry.drawImage(E, 0, 0), K(F)
        }

        function X(a, b, c, d, e, f, g) {
            F.save(), e.lineStyle && F.setLineDash && F.setLineDash(e.lineStyle), F.beginPath();
            if (e instanceof longdo.Circle) {
                var h = f[0];
                F.arc((h.x >> d) + b, (h.y >> d) + c, Math.max(f[1] >> d, .1), 0, PI2, !0), e.fillColor && (F.fillStyle = e.fillColor, F.fill())
            } else {
                var h = f[0],
                    i = (h.x >> d) + b,
                    j = (h.y >> d) + c;
                if (e.texture) {
                    e.textureAlpha < 1 && (F.globalAlpha = e.textureAlpha);
                    var k = (f[2].x >> d) + b,
                        l = (f[2].y >> d) + c;
                    F.drawImage(e.texture, i, j, k - i, l - j), e.textureAlpha < 1 && (F.globalAlpha = 1)
                }
                F.moveTo(i, j);
                if (e instanceof longdo.Dot || g.minX >> d == g.maxX >> d && g.minY >> d == g.maxY >> d) F.lineTo(i + .1, j + .1);
                else if (e instanceof longdo.Polycurve)
                    for (var m = 1; m < f.length; m += 3) {
                        h = f[m];
                        var n = f[m + 1],
                            o = f[m + 2];
                        F.bezierCurveTo((h.x >> d) + b, (h.y >> d) + c, (n.x >> d) + b, (n.y >> d) + c, (o.x >> d) + b, (o.y >> d) + c)
                    } else if (e.lineStyle && !F.setLineDash) {
                        var p = {
                            start: 0,
                            size: 1,
                            x: i,
                            y: j
                        };
                        for (var m = 1; h = f[m]; ++m) h === !0 ? (h = f[++m], F.moveTo((h.x >> d) + b, (h.y >> d) + c)) : p = Y((h.x >> d) + b, (h.y >> d) + c, p, e.lineStyle)
                    } else if (e.linePattern)
                    for (var m = 1; h = f[m]; ++m)
                        if (h === !0) h = f[++m], i = (h.x >> d) + b, j = (h.y >> d) + c;
                        else {
                            var k = (h.x >> d) + b,
                                l = (h.y >> d) + c;
                            e.linePattern(F, m, i, j, k, l), i = k, j = l
                        }
                else
                    for (var m = 1; h = f[m]; ++m) h === !0 ? (h = f[++m], F.moveTo((h.x >> d) + b, (h.y >> d) + c)) : F.lineTo((h.x >> d) + b, (h.y >> d) + c);
                e instanceof longdo.Polygon && e.fillColor && (F.fillStyle = e.fillColor, F.fill())
            }
            e.lineColor && (F.lineWidth = e.lineWidth, e.lineWidth > a.lineWidth && (a.lineWidth = e.lineWidth), F.strokeStyle = e.lineColor, F.stroke()), F.restore()
        }

        function Y(a, b, c, d) {
            var e = a - c.x,
                f = b - c.y,
                g = m.distance(e, f);
            e = e / g, f = f / g, g = g + (1 - c.size);
            var h = Math.floor(g),
                i = g - h,
                j = d[0],
                k = d[0] + d[1];
            if (a < 0 && c.x < 0 || b < 0 && c.y < 0 || a >= TILESIZE && c.x >= TILESIZE || b >= TILESIZE && c.y >= TILESIZE) return {
                start: (c.start + h) % k,
                size: 1 - i,
                x: a,
                y: b
            };
            var l = c.start;
            l < j && F.moveTo(c.x, c.y);
            var n = c.x + e * c.size,
                o = c.y + f * c.size;
            while (h--) l >= j ? F.moveTo(n, o) : F.lineTo(n, o), l = (l + 1) % k, n += e, o += f;
            return l < j && F.lineTo(a, b), {
                start: l,
                size: 1 - i,
                x: a,
                y: b
            }
        }

        function Z(b) {
            $.empty(b.map);
            for (var c = 0, d; d = r[c]; ++c) {
                var e = d.image(f, b, g);
                if (!e) continue;
                z++ || a.Event.fire("loadTile", "start"), $.append(b.map, "img", {
                    className: "ldmap_tile_canvas ldmap_maparea",
                    src: e,
                    onload: function() {
                        --z || setTimeout(a.Event.fire, PAINT_DELAY, "loadTile", "finish"), this.style.opacity = this.opacity
                    },
                    onerror: function() {
                        --z || setTimeout(a.Event.fire, PAINT_DELAY, "loadTile", "finish"), this.style.opacity = 0
                    },
                    opacity: d.opacity
                })
            }
        }

        function _(b, c, d) {
            var f = c.element().firstChild.getBoundingClientRect(),
                g = e.getBoundingClientRect(),
                h = a.Ui ? a.Ui.TopRight.offsetHeight : 0,
                i = Math.max(f.right - g.right + POPUP_FOCUS_BUFFER, 0),
                j = Math.min(f.top - g.top - POPUP_FOCUS_BUFFER - h, 0);
            (i || j) && a.move({
                x: i,
                y: j
            })
        }

        function ba(a) {
            var b = q[a.y - x.y >> TILEEXP][a.x - x.x >> TILEEXP];
            return b.geometry ? b.lineWidth : !1
        }
        var d = this,
            e = a.placeholder(),
            f = a.projection(),
            g = 0,
            h = 0,
            i = null,
            j = null,
            k = null,
            l = !1,
            n = null,
            o = {
                u: 0,
                v: 0
            },
            p = null,
            q = null,
            r = null,
            s = null,
            t = null,
            u = null,
            v = 0,
            w = null,
            x = {
                x: 0,
                y: 0
            },
            y = null,
            z = 0,
            A = 0,
            B = 0,
            C = null,
            D = null,
            E = null,
            F = null,
            G = [function(a, b) {
                return b * o.u + o.u - a
            }, function(a, b) {
                return a * o.v + b + 1
            }, function(a, b) {
                return (o.v - b - 1) * o.u + a + 1
            }, function(a, b) {
                return (o.u - a - 1) * o.v + o.v - b
            }],
            K = cap.noclearcanvas ? function(a) {
                if (!a) return;
                a.clearRect(0, 0, a.canvas.width, a.canvas.height), a.canvas.style.visibility = "hidden", a.canvas.offsetHeight, a.canvas.style.visibility = "inherit"
            } : function(a) {
                if (!a) return;
                a.clearRect(0, 0, a.canvas.width, a.canvas.height)
            };
        d.resize = function() {
            n = {
                x: e.offsetWidth >> 1,
                y: e.offsetHeight >> 1
            }, A && $.transformOrigin(i, n), s = b.getCenter(), L();
            var c = y;
            M();
            var f = (e.offsetWidth + h + h - 2 >> TILEEXP) + 2,
                g = (e.offsetHeight + h + h - 2 >> TILEEXP) + 2;
            if (!o || f != o.u || g != o.v) o = {
                u: f,
                v: g
            }, p = {
                u: f - 1 >> 1,
                v: g - 1 >> 1
            }, r = a.Layers.list(), H();
            return d.repaint(!c || y.x != c.x || y.y != c.y)
        }, d.repaint = function(b) {
            if (!w) return d;
            if (!b) O(), S();
            else if (b == "M") r = a.Layers.list(), R(), d.clearBackFrame(), S("M");
            else if (b instanceof longdo.Layer) {
                for (var c = 0, e; e = r[c]; ++c)
                    if (b == e) {
                        for (var h = 0; h < o.v; ++h)
                            for (var i = 0; i < o.u; ++i) {
                                var j = q[h][i],
                                    k = e.image(f, j, g);
                                if (!k) continue;
                                var l = new Image;
                                l.onload = function() {
                                    this.updateTo.src = this.src
                                }, l.updateTo = j.map.children[c], l.src = k
                            }
                        break
                    }
            } else if (b == "O" || b == "E" || b == "G" || b == "C") R(), S(b);
            else if (b.w == w.w) {
                var m = q[b.v - w.v];
                if (m)
                    for (var n = b.u - w.u, j; j = m[n]; n += t)(!b.mode || b.mode == "O") && U(j, B), (!b.mode || b.mode == "E") && T(j, B), (!b.mode || b.mode == "G") && W(j)
            } else b === !0 && (R(L()), O(), S());
            return a.Ui.Scale && a.Ui.Scale.repaint(f, s), a.Ui.ContextMenu && a.Ui.ContextMenu.visible(!1), d
        }, d.scale = function(a, b) {
            if (A && b) var c = m.rotateVector({
                    x: b.x - n.x,
                    y: b.y - n.y
                }, A),
                e = {
                    x: c.x + n.x - x.x,
                    y: c.y + n.y - x.y
                };
            else {
                b = b || n;
                var e = {
                    x: b.x - x.x,
                    y: b.y - x.y
                }
            }
            return $.transformOrigin(j, e), $.transform(j, "scale", a, x), d
        }, d.rotate = function(a) {
            return A = a, B = $.radianToDir(A), $.transformOrigin(i, n), $.transform(i, "rotate", A + "rad", {
                x: 0,
                y: 0
            }), h && A ? d.repaint("C") : (h = A ? Math.ceil(Math.max(o.u, o.v) / 5) << TILEEXP : 0, d.resize())
        }, d.removeElement = function(a, b) {
            if (b.w != w.w) return d;
            var c = q[b.v - w.v];
            if (!c) return d;
            for (var e = b.u - w.u, f; f = c[e]; e += t) try {
                return f.element.removeChild(a), d
            } catch (g) {}
            return d
        }, d.hitGeometry = function(a) {
            if (A) var b = m.rotateVector({
                    x: a.x - n.x,
                    y: a.y - n.y
                }, A),
                c = b.x + n.x - x.x,
                d = b.y + n.y - x.y;
            else var c = a.x - x.x,
                d = a.y - x.y;
            var e = q[d >> TILEEXP][c >> TILEEXP];
            return e.geometry && e.geometry.getImageData(c % TILESIZE << g, d % TILESIZE << g, 1, 1).data[3] ? e.lineWidth : !1
        }, d.switchFrame = function() {
            for (var a = 0; a < o.v; ++a)
                for (var b = 0; b < o.u; ++b) {
                    var e = q[a][b];
                    e.element && j.removeChild(e.element), e.overlay && e.holder.removeChild(e.holder.lastChild), e.geometry && e.holder.removeChild(e.holder.lastChild)
                }
            var f = k;
            k = j, j = f, j.style.zIndex = 1, k.style.zIndex = 0, H(), l = !1, d.repaint();
            if (c === !1) return setTimeout(function() {
                $.empty(k)
            }, PAINT_DELAY), d;
            if (cap.notransform) return l = !0, d;
            var g = !1,
                h = !1;
            if (j.style.transform) g = j.style.transform, h = k.style.transform;
            else if (j.style.webkitTransform) g = j.style.webkitTransform, h = k.style.webkitTransform;
            else if (j.style.msTransform) g = j.style.msTransform, h = k.style.msTransform;
            else return l = !0, d;
            var i = g.match(/translate\((-?\d+)px, (-?\d+)px\)/),
                m = h.match(/translate\((-?\d+)px, (-?\d+)px\) scale\((\d*.?\d+)\)/);
            return l = {
                x: m[1] - i[1],
                y: m[2] - i[2],
                s: m[3],
                u: w.u,
                v: w.v
            }, d
        }, d.clearBackFrame = function() {
            return l && ($.empty(k), l = !1), d
        }, d.loadingTile = function() {
            return z
        }, g = $.isHD(), i = $.append(e, "div", {
            className: "ldmap_frameholder"
        }), j = $.append(i, "div", {
            className: "ldmap_frame"
        }), j.style.zIndex = 1, k = $.append(i, "div", {
            className: "ldmap_frame"
        }), k.style.zIndex = 0;
        if (cap.nocanvas) {
            d.hitGeometry = ba;
            return
        }
        var bb = {
            className: "ldmap_backbuffer",
            width: TILESIZE << g,
            height: TILESIZE << g
        };
        C = $.append(e, "canvas", bb), E = $.append(e, "canvas", bb), C.getContext || (G_vmlCanvasManager.initElement(C), G_vmlCanvasManager.initElement(E)), D = C.getContext("2d"), F = E.getContext("2d");
        if (g) {
            var bc = 1 << g;
            D.scale(bc, bc), F.scale(bc, bc)
        }
        F.lineCap = F.lineJoin = "round", d.resize()
    };
    longdo.Event = function(a) {
        var b = this,
            c = {
                ready: [],
                beforeResize: [],
                resize: [],
                repaint: [],
                zoom: [],
                zoomRange: [],
                location: [],
                fullscreen: [],
                rotate: [],
                suggest: [],
                search: [],
                address: [],
                nearPoi: [],
                toolbarChange: [],
                clearMeasure: [],
                tooltipChange: [],
                beforeContextmenu: [],
                contextmenu: [],
                mousemove: [],
                click: [],
                doubleClick: [],
                wheel: [],
                pinch: [],
                pinchEnd: [],
                drag: [],
                drop: [],
                idle: [],
                layerChange: [],
                loadTile: [],
                overlayChange: [],
                overlaySelect: [],
                overlayClick: [],
                overlayLoad: [],
                overlayDrag: [],
                beforeOverlayDrop: [],
                overlayDrop: [],
                overlayMove: [],
                overlayHover: [],
                overlayLeave: [],
                pathAnimationEnd: [],
                popupLoadDetail: [],
                popupClose: [],
                guideError: [],
                guideComplete: [],
                pathError: [],
                pathComplete: [],
                beforeGeolocation: [],
                geolocation: [],
                geolocationError: [],
                connectionError: []
            },
            d = !1;
        b.bind = function(a, d) {
            var e = c[a];
            if (!e) throw "Unsupported event";
            return e.indexOf(d) < 0 && e.push(d), b
        }, b.unbind = function(a, d) {
            var e = c[a];
            if (!e) return b;
            var f = e.indexOf(d);
            return f >= 0 && e.splice(f, 1), b
        }, b.fire = function(a, b) {
            if (d) return undefined;
            var e = c[a],
                f = !1;
            for (var g = 0; g < e.length; ++g) f = f || e[g](b) === !1;
            return !f
        }, b.pause = function(a) {
            return a == undefined ? d : (d = a, b)
        }, b.bindAll = function(a, d) {
            if (console) {
                var e = b.fire;
                b.fire = function(a, b) {
                    return c[a].length && console.log(a, b), e(a, b)
                }
            }
            for (var f in c) d.indexOf(f) < 0 && b.bind(f, a);
            return b
        }, b.register = function(a) {
            return c[a] || (c[a] = []), b
        }
    };
    var searchTheme = {
        searchLabel: {
            th: {
                load: "กำลังค้นหา...",
                zoom: "ซูมไปยังสถานที่นี้",
                empty: "ไม่พบผลลัพธ์การค้นหา",
                more: "เพิ่มเติม"
            },
            en: {
                load: "Loading...",
                zoom: "Zoom to this location",
                empty: "No result found",
                more: "more"
            }
        },
        zoomIcon: server.map + "images/search/zoom" + IMAGE_SUFFIX,
        zoomResult: 14,
        showRegion: !0,
        showRoad: cap.vector,
        showLayer: !0
    };
    longdo.MapTheme.search = searchTheme;
    var poiTheme = {
        addressIcon: server.map + "images/search/address" + IMAGE_SUFFIX,
        telIcon: server.map + "images/search/tel" + IMAGE_SUFFIX,
        openIcon: server.map + "images/search/open" + IMAGE_SUFFIX,
        urlIcon: server.map + "images/search/url" + IMAGE_SUFFIX,
        lineIcon: server.map + "images/search/line" + IMAGE_SUFFIX,
        tagIcon: server.map + "images/search/tag" + IMAGE_SUFFIX,
        tagCount: 0,
        poiLabel: {
            th: {
                open: "เปิดให้บริการวันนี้ ",
                close: "ปิดบริการ",
                after: "นอกเวลาทำการ ",
                detail: "รายละเอียด",
                edit: "แก้ไข",
                unverified: server.map + "images/search/unverified-th" + IMAGE_SUFFIX,
                obsoleted: server.map + "images/search/obsoleted-th" + IMAGE_SUFFIX
            },
            en: {
                open: "Open today ",
                close: "Closed",
                after: "Open at ",
                detail: "detail",
                edit: "edit",
                unverified: server.map + "images/search/unverified-en" + IMAGE_SUFFIX,
                obsoleted: server.map + "images/search/obsoleted-en" + IMAGE_SUFFIX
            }
        }
    };
    longdo.MapTheme.poi = poiTheme, longdo.Search = function(a, b) {
        function k(b) {
            if (b) return;
            a.Event.fire("connectionError", "search")
        }

        function l(b) {
            if (!f) return;
            var d = b.meta.start;
            if (d) {
                var k = f.firstChild;
                b.meta.hasmore ? (f.lastChild.innerHTML = e.more, f.lastChild.onclick = function() {
                    this.innerHTML = e.load, h.offset = b.meta.end + 1, h.limit = b.meta.end - d + 1, a.Search.search(b.meta.keyword, h)
                }) : f.removeChild(f.lastChild)
            } else {
                d = 0;
                var l = document.createDocumentFragment(),
                    k = $.append(l, "ol", {
                        className: "ldsearch_list"
                    });
                b.data.length ? b.meta.hasmore && $.append(l, "div", {
                    className: "ldsearch_more",
                    innerHTML: e.more,
                    onclick: function() {
                        this.innerHTML = e.load, h.offset = b.meta.end + 1, h.limit = b.meta.end - d + 1, a.Search.search(b.meta.keyword, h)
                    }
                }) : $.append(l, "div", {
                    className: "ldsearch_empty",
                    innerHTML: e.empty
                }), i = []
            }
            for (var o = 0, p; p = b.data[o]; ++o) {
                var q = d + o;
                if (p.icon) var r = "images/icons/" + p.icon;
                else if (p.type == "khet") var r = "images/search/type-area.png";
                else if (p.type == "road") var r = "images/search/type-road.png";
                else var r = "images/icons/reddot.png";
                var s = $.append(k, "li", {
                    className: "ldsearch_item",
                    innerHTML: '<img class="ldsearch_icon" src="' + server.map + r + '" />',
                    id: g + "i" + q
                });
                $.append(s, "img", {
                    className: "ldsearch_zoom",
                    src: searchTheme.zoomIcon,
                    title: e.zoom
                }), s.innerHTML += p.name + '<div class="ldsearch_address">' + (p.address || "&nbsp;") + "</div>", s.addEventListener("click", m), i.push(p);
                if (j.icon === !1 || p.type == "khet" && searchTheme.showRegion || p.type == "road" && searchTheme.showRoad || p.type == "layer" && searchTheme.showLayer) continue;
                p.marker = new longdo.Marker(p, c.popup === !1 ? {
                    title: p.name,
                    clickable: !0
                } : {
                    title: p.name,
                    detail: '<div id="' + g + "d" + q + '" class="ldmap_poi_load">Loading...</div>',
                    icon: j.icon,
                    loadDetail: n
                }), p.marker.type = "s", p.marker.index = i.length, p.marker.data = p, a.Overlays.add(p.marker)
            }
            if (d) return;
            $.empty(f).appendChild(l), b.data.length && a.bound($.locationBound(b.data))
        }

        function m(b) {
            $.hasClass(b.target, "ldsearch_zoom") && a.zoom() < searchTheme.zoomResult && a.zoom(searchTheme.zoomResult);
            var c = i[b.currentTarget.id.substring(g.length + 1)],
                d = {
                    title: c.name,
                    detail: c.address
                };
            a.location(c, !0);
            if (c.marker) {
                a.Overlays.pop(c.marker, !0);
                return
            }
            c.object || (c.type == "khet" && searchTheme.showRegion ? c.object = new longdo.Overlays.Object(c.address.split(" ")[1], "IG", d) : c.type == "road" && searchTheme.showRoad ? c.object = new longdo.Overlays.Object(c.id.substring(1), "RID", d) : c.type == "layer" && searchTheme.showLayer && (c.object = new longdo.Overlays.Object(c.id, "LONGDO")), c.popup = new longdo.Popup(c, d)), a.Overlays.load(c.object), a.Overlays.add(c.popup)
        }

        function n(b) {
            var c = $.formatPoi(i[b.firstChild.id.substring(g.length + 1)], d, a.Ui.popup);
            $.empty(b).appendChild(c)
        }
        var c = this,
            d = "th",
            e = searchTheme.searchLabel[d],
            f = null,
            g = "ldsearch" + a.id() + "-",
            h = null,
            i = null,
            j = null;
        c.language = function(a) {
            return a == undefined ? d : (d = a.substring(0, 2) == "th" ? "th" : "en", e = searchTheme.searchLabel[d], c)
        }, c.placeholder = function(a, b) {
            return a == undefined ? f : (f = a, j = b || {}, $.addClass(f, "ldsearch_placeholder"), c)
        }, c.suggest = function(b, d) {
            d = d || {};
            var e = "";
            return d.area && (e += "&area=" + d.area), d.offset && (e += "&offset=" + d.offset), d.limit && (e += "&limit=" + d.limit), d.dataset && (e += "&dataset=" + d.dataset), $.loadScript(server.search + "/json/suggest?keyword=" + encodeURIComponent(b) + e + "&key=" + apikey + "&version=2&callback=longdo.callback.suggest" + a.id()), c
        }, c.search = function(b, g) {
            h = g || {}, !h.offset && f && (c.clear(), f.innerHTML = '<div class="ldsearch_load">' + e.load + "</div>");
            var i = a.location(),
                j = "&lon=" + i.lon + "&lat=" + i.lat;
            return b && (j += "&keyword=" + encodeURIComponent(b)), h.area && (j += "&area=" + h.area), h.tag && (j += "&tag=" + h.tag), h.span && (j += "&span=" + h.span), h.offset && (j += "&offset=" + h.offset), h.limit && (j += "&limit=" + h.limit), h.dataset && (j += "&dataset=" + h.dataset), $.loadScript(server.search + "/json/search?locale=" + d + j + "&key=" + apikey + "&version=2&callback=longdo.callback.search" + a.id(), k), c
        }, c.address = function(b, e) {
            e = e || {};
            var f = server.address;
            return b.lon && b.lat ? f += "?lon=" + b.lon + "&lat=" + b.lat : b.length == 9 && isFinite(b.substring(1)) ? f += "?id=" + b : b.length <= 6 && isFinite(b) ? f = server.poi + "/json/address?" + (b.length == 5 ? "postcode=" : "geocode=") + b : f = server.poi + "/json/geocoding?address=" + b, e.limit && (f += "&limit=" + e.limit), e.dataset && (f += "&dataset=" + e.dataset), $.loadScript(f + "&locale=" + d + "&key=" + apikey + "&callback=longdo.callback.address" + a.id(), k), c
        }, c.nearPoi = function(b, e) {
            e = e || {};
            var f = server.poi + "/json/search?lon=" + b.lon + "&lat=" + b.lat;
            return e.span && (f += "&span=" + e.span), e.zoom && (f += "&zoom=" + e.zoom), e.limit && (f += "&limit=" + e.limit), $.loadScript(f + "&locale=" + d + "&key=" + apikey + "&status=A,N&callback=longdo.callback.nearPoi" + a.id(), k), c
        }, c.clear = function() {
            if (!f || !i) return c;
            var b = "O",
                d = a.pause();
            a.pause(!0);
            for (var e = 0, g; g = i[e]; ++e) a.Overlays.remove(g.marker), g.object && (a.Overlays.unload(g.object), a.Overlays.remove(g.popup), b = g.type == "layer" ? !0 : "C");
            return a.pause(d).repaint(b), $.empty(f), c
        };
        if (b) {
            c.setResult = l;
            return
        }
        longdo.callback["suggest" + a.id()] = function(b) {
            a.Event.fire("suggest", b)
        }, longdo.callback["search" + a.id()] = function(b) {
            l(b), a.Event.fire("search", b)
        }, longdo.callback["address" + a.id()] = function(b) {
            a.Event.fire("address", b)
        }, longdo.callback["nearPoi" + a.id()] = function(b) {
            a.Event.fire("nearPoi", b)
        }
    };
    longdo.TagCollection = function(a) {
        function l(a) {
            var b = {};
            for (var c in g) {
                var d = g[c];
                if (a < d.visibleRange.min || a > d.visibleRange.max) continue;
                if (d.source.substring(0, 8) == "function") {
                    b[d.source] = d.tag;
                    continue
                }
                var e = b[d.source];
                e || (e = {
                    query: "?",
                    count: 0
                }, b[d.source] = e), e.query += "tag[" + e.count + "]=" + encodeURIComponent(c) + "&", d.icon == "big" ? e.query += "iconmode[" + e.count + "]=big&" : d.icon && (e.query += "iconmode[" + e.count + "]=custom:" + c + "&"), ++e.count
            }
            return b
        }

        function m() {
            j = {};
            var b = "O",
                d = a.pause();
            a.pause(!0);
            for (var e in k) {
                var f = k[e];
                f.overlayType ? (a.Overlays.unload(f), b = "C") : a.Overlays.remove(f)
            }
            a.pause(d).repaint(b), k = {}, iconDb = {}, c && (longdo.callback[c] = $.noop), c = "tag" + ++longdo.objectcount, h && (longdo.callback[c] = n)
        }

        function n(b) {
            if (!h || !b.data.length) return;
            var c = {
                    min: b.meta.z,
                    max: b.meta.z
                },
                d = b.meta.iconpath || server.map + "images/icons/",
                e = b.meta.iconpathhd || server.map + "images/icons_2x/",
                f = a.pause();
            a.pause(!0);
            for (var i = 0, j; j = b.data[i]; ++i) {
                var l = j.id[0];
                if (l == "G" || l == "Y") {
                    if (k[j.id]) continue;
                    var m = new longdo.Overlays.Object(j.id, "LONGDO");
                    k[j.id] = m, a.Overlays.load(m)
                } else {
                    var n = j.id + "-" + b.meta.z;
                    if (k[n]) continue;
                    var o = new longdo.Marker(j, {
                        icon: j.icon.indexOf("custom:") ? {
                            url: d + j.icon,
                            urlHD: e + j.icon
                        } : g[j.icon.substring(7)].icon,
                        visibleRange: c,
                        clickable: !0
                    });
                    k[n] = o, o.type = "t", o.data = j, b.meta.detailpath && (j.detailpath = b.meta.detailpath), a.Overlays.add(o);
                    var p = !0
                }
            }
            a.pause(f), p && a.Overlays.repaint("O")
        }

        function o(c) {
            if (b.popup === !1 || c.type != "t") return;
            b.pop(c.data), a.Overlays.floorPlan(c)
        }

        function p(b) {
            var c = document.getElementById(f + b.meta.keyword);
            c && (b.data.length ? $.empty(c.parentNode).appendChild($.formatPoi(b.data[0], d, a.Ui.popup)) : $.empty(c))
        }

        function q(b) {
            if (b) return;
            a.Event.fire("connectionError", "tags")
        }
        var b = this,
            c = !1,
            d = "th",
            e = a.projection(),
            f = "ldtag" + a.id() + "-",
            g = {},
            h = 0,
            i = [],
            j = {},
            k = {};
        b.language = function(a) {
            return a == undefined ? d : (d = a.substring(0, 2) == "th" ? "th" : "en", b)
        }, b.set = function(a, c) {
            b.clear().add(a, c)
        }, b.add = function(c, d) {
            if (c.split) {
                var e = c.split("|");
                if (e.length > 1) {
                    for (var f = 0; f < e.length; ++f) b.add(e[f], d);
                    return b
                }
            }
            return g[c] ? b : (d = d || {}, typeof c == "function" && (d.source = "function" + ++longdo.objectcount), g[c] = {
                tag: c,
                source: d.source || server.tag,
                visibleRange: d.visibleRange || DEFAULT_RANGE,
                icon: d.icon
            }, i = [], h || a.Event.bind("overlayClick", o), ++h, m(), b)
        }, b.remove = function(c) {
            if (c.split) {
                var d = c.split("|");
                if (d.length > 1) {
                    for (var e = 0; e < d.length; ++e) b.remove(d[e]);
                    return b
                }
            }
            return delete g[c], i = [], ++h, h || a.Event.unbind("overlayClick", o), m(), b
        }, b.clear = function() {
            return g = {}, h = 0, loadMap = {}, m(), a.Event.unbind("overlayClick", o), b
        }, b.list = function() {
            var a = [];
            for (var b in g) a.push(b);
            return a
        }, b.size = function() {
            return h
        }, b.load = function(a) {
            if (!h) return b;
            var f = a.u + "-" + a.v + "-" + a.w;
            if (j[f]) return b;
            var g = e.maxZoom - a.w;
            j[f] = !0, loadMap = i[a.w], loadMap || (loadMap = l(g), i[a.w] = loadMap);
            var k = "/" + e.longdoName + "/" + g + "/" + (a.v * (1 << g) + a.u) + "/" + d;
            for (var m in loadMap) m.substring(0, 8) == "function" ? loadMap[m](a, g) : $.loadScript(m + k + loadMap[m].query + "key=" + apikey + "&callback=longdo.callback." + c, q);
            return b
        }, b.pop = function(c) {
            if (document.getElementById(f + c.id)) a.Overlays.remove(a.Overlays.lastOpenPopup());
            else {
                var e = new longdo.Popup(c, {
                    title: c.name,
                    detail: '<div id="' + f + c.id + '" class="ldmap_poi_load">Loading...</div>',
                    loadDetail: function() {
                        $.loadScript((c.detailpath || server.search + "/json/search") + "?keyword=" + c.id + "&locale=" + d + "&limit=1&key=" + apikey + "&version=2&callback=longdo.callback.tagDetail" + a.id())
                    }
                });
                e.data = c, a.Overlays.add(e)
            }
            return b
        }, longdo.callback["tagDetail" + a.id()] = p
    };
    var MAX_MARKER = 50,
        MARKER_DISTANCE_MIN = 100,
        MARKER_POI_OPTION = {
            span: .001,
            limit: 1
        },
        UNKNOWN_ROAD = {
            th: "ถนนเชื่อมต่อ",
            en: "Connecting road"
        },
        routeTheme = {
            markerPrefix: server.route + "/images/dest",
            markerOffset: {
                x: 16,
                y: 41
            },
            routeLabel: {
                th: {
                    insert: "เดินทางจากจุดนี้",
                    add: "เดินทางมาจุดนี้",
                    remove: "ลบจุดหมาย",
                    origin: "จุดเริ่มต้น",
                    dest: "จุดหมายที่ ",
                    guide: {
                        depart: "ออกจาก ",
                        arrive: "ถึง ",
                        fromroad: " จากถนน"
                    },
                    menu: {
                        clear: "ลบ",
                        reverse: "กลับ",
                        animate: "วิ่ง",
                        stop: "หยุด",
                        pref: "ตั้งค่า",
                        t: "หลบรถติด",
                        c: "ถนนหลัก",
                        d: "ทางลัด",
                        w: "ขนส่งมวลชน",
                        reload: "หาใหม่",
                        walk: "เดิน",
                        road: "รถ",
                        air: "เครื่องบิน",
                        rail: "รถไฟ",
                        ferry: "เรือ",
                        toll: "ทางด่วน",
                        bus: "รถเมล์ (beta)",
                        metro: "รถไฟฟ้า"
                    },
                    menuTip: {
                        clear: "ลบเส้นทางทั้งหมด",
                        reverse: "กลับทิศทางการเดินทาง",
                        animate: "แสดงหรือหยุดการเดินทางบนเส้นทาง",
                        pref: "ตั้งค่า",
                        t: "เดินทางไปตามถนนหลักโดยหลบรถติด",
                        c: "เดินทางไปตามถนนหลัก",
                        d: "ลัดเข้าซอยเพิ่อให้ใช้ระยะทางสั้นที่สุด",
                        w: "ใช้รถสาธารณะ",
                        reload: "หาเส้นทางใหม่โดยใช้จุดหมายเดิม"
                    },
                    about: '<div class="ldroute_head">บริการแนะนำเส้นทาง</div><div class="ldroute_indent ldroute_warn">*บริการแนะนำเส้นทางนี้ยังอยู่ในขั้นทดลอง ผลลัพธ์ต่างๆ อาจไม่ถูกต้อง</div>        <div class="ldroute_road">วิธีใช้งาน</div>        <div class="ldroute_indent"><span class="ldroute_poi">เพิ่มจุดหมาย</span> คลิกขวาที่ตำแหน่งที่ต้องการ แล้วเลือกคำสั่ง "เดินทางจากจุดนี้" หรือ "เดินทางมาจุดนี้"</div>        <div class="ldroute_indent"><span class="ldroute_poi">ลบจุดหมาย</span> คลิกที่จุดหมาย แล้วเลือกคำสั่ง "ลบจุดหมาย"</div>        <div class="ldroute_indent"><span class="ldroute_poi">ย้ายจุดหมาย</span> ลากจุดหมายไปยังตำแหน่งที่ต้องการ</div>        <!-- div class="ldroute_indent"><span class="ldroute_poi">แทรกจุดหมาย</span> ลากเส้นทางไปยังตำแหน่งที่ต้องการ</div -->',
                    turn: ["เลี้ยวซ้ายสู่", "เลี้ยวขวาสู่", "เบี่ยงซ้ายสู่", "เบี่ยงขวาสู่", "ไปตาม", "ตรงไปตาม", "เข้าสู่", , , "ถึง", "", "", "", "", ""],
                    guideError: "ไม่พบเส้นทางไปยังจุดหมาย"
                },
                en: {
                    insert: "Direction from here",
                    add: "Direction to here",
                    remove: "Remove destination",
                    origin: "starting position",
                    dest: "destination #",
                    guide: {
                        depart: "Depart from ",
                        arrive: "Arrive at ",
                        fromroad: " from road"
                    },
                    menu: {
                        clear: "clear",
                        reverse: "rev.",
                        animate: "go",
                        stop: "stop",
                        pref: "pref.",
                        t: "Traffic",
                        c: "Main road",
                        d: "Shortcut",
                        w: "Transit",
                        reload: "reload",
                        walk: "Walk",
                        road: "Road",
                        air: "Air",
                        rail: "Rail",
                        ferry: "Ferry",
                        toll: "Toll",
                        bus: "Bus (beta)",
                        metro: "Metro"
                    },
                    menuTip: {
                        clear: "All clear",
                        reverse: "Reverse direction",
                        animate: "Start/Stop animation",
                        pref: "Preferences",
                        t: "Use main road, avoid traffic jam",
                        c: "Use main road",
                        d: "Use shortcut",
                        w: "Use public transport",
                        reload: "Reload result"
                    },
                    about: '<div class="ldroute_head">Route service</div><div class="ldroute_indent ldroute_warn">*BETA version, we do not guarantee validity of the result</div>        <div class="ldroute_road">Instruction</div>        <div class="ldroute_indent"><span class="ldroute_poi">Add destination</span> right click and choose "Direction from here" or "Direction to here"</div>        <div class="ldroute_indent"><span class="ldroute_poi">Remove destination</span> click at destination and choose "Remove destination"</div>        <div class="ldroute_indent"><span class="ldroute_poi">Move destination</span> drag destination to prefer location</div>        <!-- div class="ldroute_indent"><span class="ldroute_poi">Insert destination</span> drag route to prefer location</div -->',
                    turn: ["Turn left to", "Turn right to", "Slight left to", "Slight right to", "Head toward", "Continue straight onto", "Enter", , , "Arrive at", "", "", "", "", ""],
                    guideError: "No route to destination"
                }
            }
        };
    longdo.MapTheme.route = routeTheme, longdo.RouteType = {
        Road: 1,
        Air: 2,
        Railway: 4,
        Ferry: 8,
        Tollway: 16,
        Bus: 32,
        Metro: 64,
        All: 127,
        AllDrive: 25,
        AllTransit: 111
    }, longdo.RouteMode = {
        Traffic: "t",
        Cost: "c",
        Distance: "d",
        Walk: "w",
        Both: "b",
        Fly: "f"
    }, longdo.RouteLabel = {
        Distance: "d",
        Time: "t",
        Hide: !1
    }, longdo.RouteRestrict = {
        Bike: 1,
        Wheelchair: 1
    }, longdo.Route = function(a) {
        function v() {
            f && (f.innerHTML = '<div class="ldroute_about"><br />' + d.about + "</div>")
        }

        function w(c) {
            var e = document.createElement("div");
            e.className = "ldmap_link", e.innerHTML = d.insert, e.onclick = function() {
                a.Ui.ContextMenu.visible(!1), b.insert(0, c.location)
            }, c.add(e);
            var e = document.createElement("div");
            e.className = "ldmap_link", e.innerHTML = d.add, e.onclick = function() {
                a.Ui.ContextMenu.visible(!1), b.add(c.location)
            }, c.add(e)
        }

        function x(c) {
            if (c.type == "r") {
                var d = m.indexOf(c);
                d >= 0 && (c.poi = undefined, server.poi && a.Search.nearPoi(c.location(), MARKER_POI_OPTION), K(d))
            } else c.type == "d" && c.geometry.type == "g" && b.insert(c.geometry.index + 1, c.location(), b.modeOf(c.geometry.index))
        }

        function y(a) {
            if (!a.data.length) return;
            for (var b = 0, c; c = m[b]; ++b) {
                if (!$.sameLocation(c.location(), a.meta)) continue;
                c.poi = a.data[0].name, o === 0 && U();
                return
            }
        }

        function z(a) {
            return a.currentTarget.id.substring(g.length + 1)
        }

        function A(b) {
            var c = m[z(b)];
            c && a.location(c.location(), !0)
        }

        function B(b) {
            var c = z(b).split("-"),
                d = n[c[0]];
            if (d && d.path) {
                var e = d.path[c[1]];
                e.normalLineColor = e.lineColor, e.lineColor = h.focus.lineColor, a.repaint("G")
            }
        }

        function C(b) {
            var c = z(b).split("-"),
                d = n[c[0]];
            if (d && d.path) {
                var e = d.path[c[1]];
                e.lineColor = e.normalLineColor, delete e.normalLineColor, a.repaint("G")
            }
        }

        function D(b) {
            var c = z(b).split("-"),
                d = n[c[0]];
            if (d && d.path) {
                var e = d.path[c[1]];
                a.bound($.locationBound(e.location()))
            }
        }

        function E(c, e) {
            if (!(e instanceof longdo.Marker)) {
                c = $.bound(c, 0, m.length);
                var f = routeTheme.markerPrefix + (q && c && c == m.length ? "Last" : c > MAX_MARKER ? "" : c);
                e = new longdo.Marker(e, {
                    icon: {
                        url: f + IMAGE_SUFFIX_SD,
                        urlHD: f + IMAGE_SUFFIX_HD,
                        offset: routeTheme.markerOffset
                    },
                    popup: {
                        title: c ? d.dest + c : d.origin,
                        loadDetail: function(a) {
                            $.append(a, "span", {
                                className: "ldmap_link",
                                innerHTML: d.remove,
                                onclick: function() {
                                    b.remove(e)
                                }
                            })
                        },
                        size: {
                            width: 100
                        }
                    },
                    draggable: !0
                }), e.type = "r"
            }
            return a.Overlays.add(e), server.poi && a.Search.nearPoi(e.location(), MARKER_POI_OPTION), e
        }

        function F(b) {
            var c = function() {
                a.repaint("O")
            };
            for (var e = b, f; f = m[e]; ++e) {
                if (f.type != "r") continue;
                var g = f.element();
                g.onload = c, g.src = routeTheme.markerPrefix + (q && e && e == m.length - 1 ? "Last" : e > MAX_MARKER ? "" : e) + IMAGE_SUFFIX, f.popup().title(e ? d.dest + e : d.origin)
            }
        }

        function G() {
            if (!i || m.length < 2) return;
            b.search()
        }

        function H(a) {
            if (!i || !a) return;
            a == 1 ? b.search() : (M(1), N(a - 1))
        }

        function I(a) {
            if (!i || m.length < 2) return;
            if (m.length == 2) b.search();
            else if (a) {
                var c = a - 1;
                X(c), n.splice(c, 1, null, null), M(2), N(c), N(a, 1)
            } else n.unshift(null), M(1), N(a)
        }

        function J(c) {
            if (!i) return;
            m.length < 2 && (b.clearPath(), v());
            if (c && c < m.length) {
                var d = c - 1;
                X(d), X(c), n.splice(d, 2, null), M(1), N(d)
            } else {
                var d = c ? c - 1 : 0;
                X(d), n.splice(d, 1), U(), W(), a.Event.fire("guideComplete", n), a.Event.fire("pathComplete", null)
            }
        }

        function K(a) {
            if (!i || m.length < 2) return;
            var b = a < m.length - 1;
            M((a ? 1 : 0) + (b ? 1 : 0));
            if (a) {
                var c = a - 1;
                X(c), n[c] = null, N(c)
            }
            b && (X(a), n[a] = null, N(a, a ? 1 : 0))
        }

        function L(a) {
            if (!i || m.length < 2 || a == m.length - 1) return;
            M(1), X(a), n[a] = null, N(a, 0)
        }

        function M(a) {
            o = a, p = a
        }

        function N(b, d) {
            var e = m[b],
                f = e.routeMode || j,
                g = e.location(),
                h = m[b + 1].location();
            n[b] = {
                from: g,
                to: h
            };
            if (f == longdo.RouteMode.Fly) {
                setTimeout(longdo.callback["guide" + a.id()], 1, {
                    meta: {
                        from: g,
                        to: h
                    },
                    data: [{
                        id: 0,
                        interval: 0,
                        guide: [{
                            name: "?",
                            turn: 4,
                            distance: $.distance([g, h])
                        }]
                    }]
                }), setTimeout(longdo.callback["path" + a.id()], 2, {
                    meta: {
                        id: 0
                    },
                    data: [
                        [g, h]
                    ]
                });
                return
            }
            var i = (f == longdo.RouteMode.Walk || f == longdo.RouteMode.Both ? server.transit : server.route) + "/json/route/guide?flon=" + g.lon + "&flat=" + g.lat + "&tlon=" + h.lon + "&tlat=" + h.lat + "&mode=" + f + "&type=" + k + "&restrict=" + l + "&locale=" + c + "&maxresult=1" + (a.placeholder() ? "" : "&geom=0") + (debug ? "&debug=1" : "") + "&key=" + apikey + "&callback=longdo.callback.guide" + a.id();
            cap.nolimit || !d ? $.loadScript(i, R) : setTimeout($.loadScript, RATE_LIMIT * d, i, R)
        }

        function O(b) {
            var e = b.meta;
            if (e.status) {
                f && (f.innerHTML = '<div class="ldroute_error"><br />' + d.guideError + "</div>"), --o, --p, a.Event.fire("guideError", e.status);
                return
            }
            for (var g = 0, h; h = n[g]; ++g) {
                if (h.guide || !$.sameLocation(h.from, e.from) || !$.sameLocation(h.to, e.to)) continue;
                var i = m[g].routeMode || j;
                if (e.config && e.config != i + k + c + l) return;
                h = b.data[0], h.id >= 0 && P(h.id, i), h.distance = S(h.guide), h.fdistance > MARKER_DISTANCE_MIN && (h.distance += h.fdistance), h.tdistance > MARKER_DISTANCE_MIN && (h.distance += h.tdistance), h.from = e.from, h.to = e.to, n[g] = h, e.debug && console && console.log(g + ": " + e.config + ", cost: " + e.debug);
                if (--o > 0) return;
                U(), a.Event.fire("guideComplete", n);
                return
            }
        }

        function P(b, c) {
            $.loadScript((c == longdo.RouteMode.Walk || c == longdo.RouteMode.Both ? server.transit : server.route) + "/json/route/path?id=" + b + "&key=" + apikey + "&callback=longdo.callback.path" + a.id(), R)
        }

        function Q(b) {
            var c = b.meta;
            if (c.status) {
                --p, a.Event.fire("pathError", c.status);
                return
            }
            for (var d = 0, e; e = n[d]; ++d) {
                if (e.path || e.id != c.id) continue;
                e.path = b.data, V(d);
                if (--p > 0) return;
                W(), a.Event.fire("pathComplete", b);
                return
            }
        }

        function R(b) {
            if (b) return;
            a.Event.fire("connectionError", "route")
        }

        function S(a) {
            var b = 0;
            for (var c = 0; c < a.length; ++c) b += a[c].distance;
            return b
        }

        function T(a, b) {
            var c = b / 2,
                d = 0;
            for (var e = 0; e < a.length; ++e) {
                d += a[e].distance;
                if (d > c) return e
            }
            return 0
        }

        function U() {
            if (!f) return;
            $.empty(f);
            var a = b.guide(!0);
            a && f.appendChild(a)
        }

        function V(a) {
            var b = n[a],
                d = b.guide,
                e = b.path;
            if (u) {
                var f = T(b.guide, b.distance),
                    g = u == longdo.RouteLabel.Distance ? $.formatDistance(b.distance, c) : $.formatInterval(b.interval, c);
                b.label = new longdo.Marker($.polylinePivot(e[f]), $.labelOptions(g, {}, {}))
            }
            var i = 0;
            if (h.destination) {
                var j = new longdo.Polyline([m[a].location(), e[0][0]], h.destination),
                    k = new longdo.Polyline([$.lastItem($.lastItem(e)), m[a + 1].location()], h.destination);
                e.push(k), e.push(j), i = 2
            }
            for (var l = 0; l < e.length - i; ++l) {
                var o = d[l].turn;
                e[l] = new longdo.Polyline(e[l], h[Y(o)]), e[l].type = "g", e[l].index = a
            }
            for (var l = a + 2; l < n.length; ++l) {
                e = n[l].path;
                if (!e) continue;
                for (var p = 0; p < e.length; ++p) e[p].index = l
            }
        }

        function W() {
            var b = a.pause();
            a.pause(!0);
            for (var c = 0, d; d = n[c]; ++c) {
                var e = d.path;
                if (!e) continue;
                for (var f = 0; f < e.length; ++f) a.Overlays.add(e[f]);
                d.label && a.Overlays.add(d.label)
            }
            a.pause(b).repaint("G").repaint("E")
        }

        function X(b) {
            var c = n[b];
            if (!c || !c.path) return;
            var d = c.path,
                e = a.pause();
            a.pause(!0);
            for (var f = 0; f < d.length; ++f) a.Overlays.remove(d[f]);
            a.Overlays.remove(c.label), a.pause(e).repaint("G").repaint("E")
        }

        function Y(a) {
            return a < 10 ? "road" : a == 10 ? "air" : a == 11 ? "ferry" : "rail"
        }

        function Z() {
            preference.style.display == "none" ? preference.style.display = "block" : preference.style.display = "none"
        }
        var b = this,
            c = "th",
            d = routeTheme.routeLabel[c],
            e = UNKNOWN_ROAD[c],
            f = null,
            g = "ldroute" + a.id() + "-",
            h = {
                destination: {
                    lineColor: "rgba(136,68,255," + GEOMETRY_LINEALPHA + ")"
                },
                road: {
                    lineColor: "rgba(136,68,255," + GEOMETRY_LINEALPHA + ")",
                    pointer: !0
                },
                air: {
                    lineColor: "rgba(68,255,255," + GEOMETRY_LINEALPHA + ")",
                    pointer: !0
                },
                rail: {
                    lineColor: "rgba(68,68,68," + GEOMETRY_LINEALPHA + ")",
                    pointer: !0,
                    lineStyle: longdo.LineStyle.Dashed
                },
                ferry: {
                    lineColor: "rgba(255,255,68," + GEOMETRY_LINEALPHA + ")",
                    pointer: !0
                },
                focus: {
                    lineColor: "rgba(255,68,136," + GEOMETRY_LINEALPHA + ")"
                }
            },
            i = !1,
            j = longdo.RouteMode.Traffic,
            k = longdo.RouteType.All,
            l = 0,
            m = [],
            n = [],
            o = null,
            p = null,
            q = !0,
            r = !0,
            s = !1,
            t = !1,
            u = longdo.RouteLabel.Distance;
        b.language = function(a) {
            return a == undefined ? c : (c = a.substring(0, 2) == "th" ? "th" : "en", d = routeTheme.routeLabel[c], e = UNKNOWN_ROAD[c], b)
        }, b.placeholder = function(a) {
            return a == undefined ? f : (f = a, $.addClass(f, "ldroute_placeholder"), v(), b)
        }, b.enableContextMenu = function() {
            return a.Event.bind("beforeContextmenu", w), b
        }, b.line = function(a, c) {
            return c == undefined ? h[a] : (h[a] = c, b)
        }, b.auto = function(a) {
            return a == undefined ? i : (i = a, i && G(), b)
        }, b.mode = function(a) {
            return a == undefined ? j : (j = a, G(), b)
        }, b.enableRoute = function(a, b) {
            return a == undefined ? k : b == undefined ? (k & a) == a ? !0 : !1 : (k = b ? k | a : k & ~a, G(), this)
        }, b.enableRestrict = function(a, b) {
            return a == undefined ? l : b == undefined ? (l & a) == a ? !0 : !1 : (l = b ? l | a : l & ~a, G(), this)
        }, b.modeOf = function(a, c) {
            return c === undefined ? m[a].routeMode : (m[a].routeMode = c, L(a), b)
        }, b.useStopMarker = function(a) {
            return a == undefined ? q : (q = a, b)
        }, b.usePoiName = function(c) {
            return c == undefined ? r : (c != r && (r = c, r ? a.Event.bind("nearPoi", y) : a.Event.unbind("nearPoi", y)), b)
        }, b.useCumulativeDistance = function(a) {
            return a == undefined ? s : (s = a, b)
        }, b.showUnknownRoad = function(a) {
            return a == undefined ? t : (t = a, b)
        }, b.label = function(a) {
            return a == undefined ? u : (u = a, G(), b)
        }, b.add = function(a, c) {
            return m.push(E(m.length, a)), c && ($.lastItem(m).routeMode = c), q && m.length > 2 && F(m.length - 2), H(m.length - 1), b
        }, b.insert = function(a, c, d) {
            return a = +a, m.splice(a, 0, E(a, c)), d && (m[a].routeMode = d), F(a + 1), I(a), b
        }, b.remove = function(a) {
            var c = m.indexOf(a);
            return c >= 0 && b.removeAt(c), b
        }, b.removeAt = function(c) {
            return a.Overlays.remove(m[c]), m.splice(c, 1), F(c ? c - 1 : 0), J(c), b
        }, b.clearDestination = function() {
            var c = a.pause();
            a.pause(!0);
            for (var d = 0; d < m.length; ++d) a.Overlays.remove(m[d]);
            return m = [], a.pause(c).repaint("O"), b
        }, b.clearPath = function() {
            if (!n.length) return b;
            var c = a.pause();
            a.pause(!0);
            for (var d = 0, e; e = n[d]; ++d) {
                var f = e.path;
                if (!f) continue;
                for (var g = 0; g < f.length; ++g) a.Overlays.remove(f[g]);
                a.Overlays.remove(e.label)
            }
            return n = [], a.pause(c).repaint("G").repaint("E"), b
        }, b.clear = function() {
            return b.clearDestination(), b.clearPath(), M(null), v(), b
        }, b.list = function() {
            return m
        }, b.size = function() {
            return m.length
        }, b.reverse = function() {
            for (var a = 1, c, d = m[0]; c = d, d = m[a]; ++a) d.routeMode = c.routeMode;
            return delete m[0].routeMode, m.reverse(), F(0), G(), b
        }, b.search = function() {
            var a = m.length - 1;
            if (a < 1) return b;
            b.clearPath(), n = [], M(a);
            for (var c = 0; c < a; ++c) N(c, c);
            return b
        }, b.distance = function(a) {
            var b = 0;
            for (var d = 0; d < n.length; ++d) b += n[d].distance;
            return a ? $.formatDistance(b, c) : b
        }, b.interval = function(a) {
            var b = 0;
            for (var d = 0; d < n.length; ++d) b += n[d].interval;
            return a ? $.formatInterval(b, c) : b
        }, b.guide = function(f) {
            if (!n.length) return null;
            if (!f) return n;
            var h = longdo.RouteMode,
                i = longdo.RouteType,
                l = document.createDocumentFragment(),
                o = $.append(l, "div");
            $.append(o, "span", {
                className: "ldroute_menu",
                innerHTML: "&nbsp;"
            }), $.append(o, "span", {
                className: "ldroute_menu",
                innerHTML: d.menu.reverse,
                title: d.menuTip.reverse,
                onclick: b.reverse
            }), $.append(o, "span", {
                className: "ldroute_menu",
                innerHTML: d.menu.clear,
                title: d.menuTip.clear,
                onclick: b.clear
            }), $.append(o, "span", {
                className: "ldroute_menu",
                innerHTML: d.menu.pref,
                title: d.menuTip.pref,
                onclick: Z
            }), preference = $.append(o, "div", {
                className: "ldroute_pref"
            }), preference.style.display = "none";
            var p = $.append(preference, "div", {
                className: "ldroute_pref_right"
            });
            j == h.Walk ? ($.prepend($.append(p, "label", {
                innerHTML: d.menu.walk
            }), "input", {
                type: "checkbox",
                checked: k & i.Road,
                onchange: function() {
                    b.enableRoute(i.Road, this.checked)
                }
            }), $.prepend($.append(p, "label", {
                innerHTML: d.menu.bus
            }), "input", {
                type: "checkbox",
                checked: k & i.Bus,
                onchange: function() {
                    b.enableRoute(i.Bus, this.checked)
                }
            }), $.prepend($.append(p, "label", {
                innerHTML: d.menu.ferry
            }), "input", {
                type: "checkbox",
                checked: k & i.Ferry,
                onchange: function() {
                    b.enableRoute(i.Ferry, this.checked)
                }
            })) : ($.prepend($.append(p, "label", {
                innerHTML: d.menu.road
            }), "input", {
                type: "checkbox",
                checked: k & i.Road,
                onchange: function() {
                    b.enableRoute(i.Road, this.checked)
                }
            }), $.prepend($.append(p, "label", {
                innerHTML: d.menu.toll
            }), "input", {
                type: "checkbox",
                checked: k & i.Tollway,
                onchange: function() {
                    b.enableRoute(i.Tollway, this.checked)
                }
            }), $.prepend($.append(p, "label", {
                innerHTML: d.menu.ferry
            }), "input", {
                type: "checkbox",
                checked: k & i.Ferry,
                onchange: function() {
                    b.enableRoute(i.Ferry, this.checked)
                }
            }));
            var q = $.append(preference, "div", {
                className: "ldroute_pref_left"
            });
            $.prepend($.append(q, "label", {
                innerHTML: d.menu.t,
                title: d.menuTip.t
            }), "input", {
                type: "radio",
                name: a.id() + "-routemode",
                checked: j == h.Traffic,
                onchange: function() {
                    b.mode(h.Traffic)
                }
            }), $.prepend($.append(q, "label", {
                innerHTML: d.menu.c,
                title: d.menuTip.c
            }), "input", {
                type: "radio",
                name: a.id() + "-routemode",
                checked: j == h.Cost,
                onchange: function() {
                    b.mode(h.Cost)
                }
            }), $.prepend($.append(q, "label", {
                innerHTML: d.menu.d,
                title: d.menuTip.d
            }), "input", {
                type: "radio",
                name: a.id() + "-routemode",
                checked: j == h.Distance,
                onchange: function() {
                    b.mode(h.Distance)
                }
            }), server.transit && $.prepend($.append(q, "label", {
                innerHTML: d.menu.w,
                title: d.menuTip.w
            }), "input", {
                type: "radio",
                name: a.id() + "-routemode",
                checked: j == h.Walk,
                onchange: function() {
                    b.mode(h.Walk)
                }
            }), $.append(preference, "button", {
                innerHTML: d.menu.reload,
                onclick: b.search
            });
            var r = $.append(l, "div", {
                    className: "ldroute_info"
                }),
                u = $.append(l, "ol", {
                    className: "ldroute_list"
                }),
                v = n[0],
                w = $.append(u, "li", {
                    className: "ldroute_item ldroute_dest",
                    innerHTML: '<img class="ldroute_icon" src="' + server.route + "/images/turn4" + IMAGE_SUFFIX + '" alt="" />' + (v.fdistance > MARKER_DISTANCE_MIN ? '<span class="ldroute_dist">' + $.formatDistance(v.fdistance, c) + d.guide.fromroad + "</span>" : "") + d.guide.depart + '<span class="ldroute_poi">' + (m[0].poi || d.origin) + "</span>",
                    id: g + "d0"
                });
            w.addEventListener("click", A);
            var x = 0,
                y = 0;
            for (var z = 0, v; v = n[z]; ++z) {
                var E = v.guide;
                if (E) {
                    var F = E.length - 1,
                        G = x;
                    for (var H = 0, I; I = E[H]; ++H) {
                        if (H && H < F && (I.turn < 10 && I.distance < MARKER_DISTANCE_MIN || !t && I.name == e) && !v.raw) continue;
                        s ? G += I.distance : G = I.distance, w = $.append(u, "li", {
                            className: "ldroute_item ldroute_type_" + Y(I.turn),
                            innerHTML: '<img class="ldroute_icon" src="' + server.route + "/images/turn" + I.turn + IMAGE_SUFFIX + '" alt="" />' + (I.turn < 10 || G > MARKER_DISTANCE_MIN ? '<span class="ldroute_dist">' + (I.turn < 10 ? $.formatDistance(G, c) : $.formatInterval(I.interval, c)) + "</span>" + d.turn[I.turn] + ' <span class="ldroute_road">' + I.name + "</span>" : I.name),
                            id: g + "g" + z + "-" + H
                        }), w.addEventListener("mouseover", B), w.addEventListener("mouseout", C), w.addEventListener("click", D)
                    }
                }
                w = $.append(u, "li", {
                    className: "ldroute_item ldroute_dest",
                    innerHTML: '<img class="ldroute_icon" src="' + server.route + "/images/turn9" + IMAGE_SUFFIX + '" alt="" />' + (v.tdistance > MARKER_DISTANCE_MIN ? '<span class="ldroute_dist">' + $.formatDistance(v.tdistance, c) + d.guide.fromroad + "</span>" : "") + d.guide.arrive + '<span class="ldroute_poi">' + (m[z + 1].poi || d.dest + (z + 1)) + "</span>",
                    id: g + "d" + (z + 1)
                }), w.addEventListener("click", A), x += v.distance, y += v.interval
            }
            return r.innerHTML = '<span class="ldroute_distance">' + $.formatDistance(x, c) + '</span><span class="ldroute_interval">' + $.formatInterval(y, c) + "</span>", l
        }, b.exportRouteLine = function(a) {
            var b = [];
            for (var c = 0; c < n.length; ++c) {
                var d = n[c].path,
                    e = $.lastItem(d),
                    f = 0;
                e.type == undefined && (b = b.concat(e.location()), f = 1);
                for (var g = 0; g < d.length - f; ++g) b = b.concat(d[g].location().slice(1))
            }
            return new longdo.Polyline(b, a)
        }, longdo.callback["guide" + a.id()] = O, longdo.callback["path" + a.id()] = Q, a.Event.bind("overlayDrop", x), a.Event.bind("nearPoi", y)
    };
    var CENTER = {
            x: 209182721,
            y: 123881006,
            z: 13
        },
        ZOOM_NO_SCALE = 1,
        TIME_LEAP = 50,
        SAVE_INTERVAL = 5e3,
        WHEEL_END = 300,
        MIN_PINCH = {
            min: 1 / Math.sqrt(2),
            max: Math.sqrt(2)
        },
        TOOLTIP_DELAY = 500,
        IDLE_DELAY = 4e3;
    longdo.LocationMode = {
        Pointer: "POINTER",
        Geolocation: "GEOLOCATION"
    }, longdo.Map = function(a) {
        function A(a) {
            var b = {
                x: a.x - n.x << g.z,
                y: a.y - n.y << g.z
            };
            i && (b = m.rotateVector(b, i));
            var c = {
                x: (g.x + b.x) % e.maxPointX,
                y: g.y + b.y,
                z: g.z
            };
            return c.x < 0 && (c.x += e.maxPointX), c
        }

        function B() {
            var a = g.x + "," + g.y + "," + g.z;
            if (a == r) return;
            try {
                localStorage.setItem("ldmap_center_" + e.longdoName, a)
            } catch (b) {}
            r = a
        }

        function C() {
            try {
                r = localStorage.getItem("ldmap_center_" + e.longdoName)
            } catch (a) {}
            if (!r) return;
            var b = r.split(",");
            b = {
                x: +b[0],
                y: +b[1],
                z: +b[2]
            };
            if (!b.x || !b.y || !b.z) return;
            g = b
        }

        function D(a) {
            function c() {
                var d = Date.now() - b,
                    e = Math.abs(Math.log(t) / LOG2);
                if (d > ANIMATION_INTERVAL * e) {
                    p.scale(t, a).switchFrame(), u && (t > 2 || t < .5) ? (t = BIG_NUM, clearTimeout(u), u = setTimeout(y.wheelEnd, WHEEL_END)) : t = null;
                    return
                }
                requestAnimationFrame(c);
                var f = d / ANIMATION_INTERVAL / e;
                p.scale(t > 1 ? 1 + f * (t - 1) : 1 - f * (1 - t), a)
            }
            var b = Date.now() - TIME_LEAP;
            p.clearBackFrame(), requestAnimationFrame(c)
        }

        function E(a, c) {
            function h() {
                var i = Date.now() - d;
                if (i > ANIMATION_INTERVAL) {
                    g.x = e + a, g.y = f + c, p.repaint(), b.Event.fire("location");
                    return
                }
                requestAnimationFrame(h);
                var j = i / ANIMATION_INTERVAL;
                g.x = e + a * j | 0, g.y = f + c * j | 0, p.repaint()
            }
            var d = Date.now() - TIME_LEAP,
                e = g.x,
                f = g.y;
            requestAnimationFrame(h)
        }

        function F() {
            clearTimeout(v), v = setTimeout(b.Event.fire, IDLE_DELAY, "idle")
        }

        function G(a) {
            if (!$.onMap(a)) return;
            b.focus()
        }
        var b = this,
            c = ++longdo.objectcount,
            d = null,
            e = longdo.Projections.EPSG3857,
            f = {
                min: 1,
                max: cap.maxZoom ? cap.maxZoom : e.maxZoom
            },
            g = CENTER,
            h = 1,
            i = 0,
            j = 0,
            k = {
                focus: function() {}
            },
            l = {
                x: 0,
                y: 0
            },
            n = {
                x: 0,
                y: 0
            },
            o = !1,
            p = {
                resize: function() {},
                repaint: function() {},
                scale: function() {
                    return this
                },
                removeElement: function() {},
                switchFrame: function() {},
                clearBackFrame: function() {}
            },
            q = !0,
            r = null,
            s = null,
            t = null,
            u = null,
            v = null,
            w = null,
            x = {
                getZoom: function() {
                    return g.z
                },
                removeElement: function(a, b) {
                    return p.removeElement(a, b)
                },
                hitGeometry: function(a) {
                    return p.hitGeometry(a)
                }
            },
            y = {
                down: function(a) {
                    return o = A(a), b.Ui.ContextMenu && b.Ui.ContextMenu.visible(!1), F(), b.Overlays.hit(o, a, j)
                },
                click: function(a, c) {
                    o = A(c), a ? b.Event.fire("click", c) : b.Ui.ContextMenu && b.Ui.ContextMenu.visible(c, $.pointToLocation(e, o))
                },
                hit: function(a) {
                    b.Event.fire("overlayClick", a) && a.popup && b.Overlays.pop(a, undefined, a.element() == null)
                },
                move: function(a, c) {
                    b.Ui.Tooltip && b.Ui.Tooltip.visible(a);
                    if (!a) {
                        o = !1;
                        return
                    }
                    o = A(a), b.Event.fire("mousemove", a), F();
                    if (!c) {
                        w && (clearTimeout(w), b.Ui.Tooltip.set(!1));
                        return
                    }
                    var f = b.Event.pause();
                    b.Event.pause(!0);
                    var g = b.Overlays.hit(o, a, j);
                    b.Event.pause(f);
                    if (g != s) {
                        if (s) {
                            s.clickable && (d.style.cursor = "default", b.Ui.Tooltip && s.title && (clearTimeout(w), w = null, b.Ui.Tooltip.set(!1)), b.Event.fire("overlayLeave", s));
                            var h = s.geometry || s;
                            if (h.pivot && (!g || g.geometry != h)) {
                                if (h.editable) {
                                    var i = b.Overlays.lastOpenPopup();
                                    (!i || !i.marker || !i.marker.geometry || i.marker != s && i.marker.geometry != s) && h.hideNode(b)
                                }
                                h.pointer && h.hidePointer()
                            }
                        }
                        if (g) {
                            g.clickable && (d.style.cursor = g.draggable ? "all-scroll" : "pointer", b.Ui.Tooltip && g.title && (w = setTimeout(b.Ui.Tooltip.set, TOOLTIP_DELAY, g.title)), b.Event.fire("overlayHover", g)), g.pointer && g.showPointer(e, o);
                            if (g.editable && $.isInRange(b.zoom(), g.editable)) {
                                var i = b.Overlays.lastOpenPopup();
                                if (i && i.marker) {
                                    var h = i.marker.geometry;
                                    h && h.editable && h != g && h.hideNode(b)
                                }
                                g.showNode(b)
                            }
                        }
                        s = g
                    }
                },
                dragWhenDisable: function(a) {
                    o = A(a)
                },
                drag: function(a) {
                    if (t || !b.Event.fire("drag", a)) return;
                    F(), a = {
                        x: a.x << g.z,
                        y: a.y << g.z
                    }, i && (a = m.rotateVector(a, i)), g.x = (g.x + a.x) % e.maxPointX, g.x < 0 && (g.x += e.maxPointX), g.y += a.y, b.repaint(), b.Event.fire("location")
                },
                drop: function() {
                    d.style.cursor = "default", b.Event.fire("drop")
                },
                dragOverlay: function(a, c) {
                    c = {
                        x: c.x << g.z,
                        y: c.y << g.z
                    }, i && (c = m.rotateVector(c, i)), F();
                    var d = $.locationToPoint(e, a.location());
                    d.x -= c.x, d.y -= c.y, a.move($.pointToLocation(e, d)), b.Event.fire("overlayDrag", a)
                },
                dropOverlay: function(a) {
                    b.Event.fire("beforeOverlayDrop", a), d.style.cursor = a.element() instanceof Image ? "pointer" : "default", b.Event.fire("overlayDrop", a)
                },
                doubleClick: function(a, c) {
                    if (!b.Event.fire("doubleClick", c)) return;
                    b.zoom(a, !0, c)
                },
                wheel: function(a, c) {
                    u && clearTimeout(u), u = setTimeout(this.wheelEnd, WHEEL_END), F();
                    if (t && !$.isInRange(t, WHEEL_ZOOM)) return;
                    b.zoom(a, !0, c), b.Event.fire("wheel", c)
                },
                wheelEnd: function() {
                    u = null;
                    if (t != BIG_NUM) return;
                    t = null
                },
                getPointer: function() {
                    return o
                },
                overlayByElement: function(a) {
                    var c = n.x << g.z,
                        d = n.y << g.z,
                        e = b.Overlays.element(g.x - c >> TILEEXP, g.y - d >> TILEEXP, g.x + c >> TILEEXP, g.y + d >> TILEEXP, g.z, j);
                    for (var f = 0; f < e.length; ++f) {
                        var h = e[f].value;
                        if (h.element() == a) return h
                    }
                    return null
                }
            },
            z = {
                getCenter: function() {
                    return g
                },
                setCenter: function(a) {
                    g = a
                }
            };
        b.id = function() {
            return c
        }, b.resize = function() {
            if (!b.Event.fire("beforeResize")) return b;
            if (d) {
                n = {
                    x: d.offsetWidth >> 1,
                    y: d.offsetHeight >> 1
                };
                var a = d.getBoundingClientRect();
                l = {
                    x: a.left + (pageXOffset || document.body.scrollLeft),
                    y: a.top + (pageYOffset || document.body.scrollTop)
                }
            }
            return p.resize(), b.Ui.resize && b.Ui.resize(), b.Event.fire("resize"), b
        }, b.repaint = function(a) {
            return q ? b : (p.repaint(a), b.Event.fire("repaint", a), b)
        }, b.pause = function(a) {
            return a == undefined ? q : (q = a, b)
        }, b.placeholder = function() {
            return d
        }, b.projection = function() {
            return e
        }, b.zoom = function(a, c, d) {
            if (a == undefined) return h == 1 ? e.maxZoom - g.z : $.bound(Math.round((e.maxZoom - g.z + Math.log(h) / LOG2) * 10) / 10, .1, f.max + .9);
            c = (c === undefined || c) && p, d = d || n;
            var j = d.x - n.x,
                k = d.y - n.y,
                l = 1;
            if (a > 0)
                if (a === !0) {
                    if (g.z <= e.maxZoom - f.max) return b;
                    --g.z;
                    var o = {
                        x: j << g.z,
                        y: k << g.z
                    };
                    i && (o = m.rotateVector(o, i)), g.x += o.x, g.y += o.y, c ? t ? t *= 2 : (t = 2, D(d)) : p.clearBackFrame().scale(2, d).switchFrame()
                } else {
                    if (!$.isInRange(a, f)) return b;
                    var q = Math.round(a);
                    l += (a - q) * (a > q ? 1 : .5);
                    var r = g.z;
                    g.z = e.maxZoom - q;
                    var o = r > g.z ? {
                        x: j << g.z,
                        y: k << g.z
                    } : {
                        x: -j << r,
                        y: -k << r
                    };
                    i && (o = m.rotateVector(o, i)), r -= g.z, g.x += o.x * r, g.y += o.y * r, $.isAbsInRange(r, ZOOM_NO_SCALE) ? p.scale(Math.pow(2, r), d).switchFrame() : b.repaint()
                }
            else {
                if (g.z >= e.maxZoom - f.min) return b;
                var o = {
                    x: j << g.z,
                    y: k << g.z
                };
                i && (o = m.rotateVector(o, i)), g.x -= o.x, g.y -= o.y, ++g.z, c ? t ? t /= 2 : (t = .5, D(d)) : p.clearBackFrame().scale(.5, d).switchFrame()
            }
            if (h != 1 || l != 1) h = l, c || p.scale(h);
            return s && s.editable && ($.isInRange(b.zoom(), s.editable) ? s.showNode(b) : s.hideNode(b)), b.Event.fire("zoom"), b
        }, b.zoomRange = function(a) {
            if (a == undefined) return f;
            if (a.min < 1 || a.max > (cap.maxZoom ? cap.maxZoom : e.maxZoom) || a.min > a.max) throw "Invalid range";
            f = a;
            var c = b.zoom();
            return c < f.min ? b.zoom(f.min) : c > f.max && b.zoom(f.max), b.Event.fire("zoomRange", a), b
        }, b.location = function(a, c) {
            if (a == undefined) return $.pointToLocation(e, g);
            if (a == longdo.LocationMode.Pointer) return o ? $.pointToLocation(e, o) : !1;
            if (isFinite(a.x) && isFinite(a.y)) return $.pointToLocation(e, A(a));
            if (a == longdo.LocationMode.Geolocation) {
                if (!navigator.geolocation) throw "Browser not supported";
                return b.Event.fire("beforeGeolocation"), navigator.geolocation.getCurrentPosition(function(a) {
                    b.location({
                        lon: a.coords.longitude,
                        lat: a.coords.latitude
                    }, c), b.Event.fire("geolocation", a)
                }, function(a) {
                    b.Event.fire("geolocationError", a)
                }, {
                    maximumAge: GEOLOCATION_TIMEOUT,
                    timeout: GEOLOCATION_TIMEOUT,
                    enableHighAccuracy: !0
                }), b
            }
            if (!$.validateLocation(a)) throw "Invalid location";
            var d = $.locationToPoint(e, a);
            return d.z = g.z, (c === undefined || c) && p ? E(d.x - g.x, d.y - g.y) : (g = d, b.repaint(), b.Event.fire("location")), b
        }, b.bound = function(a, c) {
            if (a == undefined) {
                var f = {
                    x: n.x << g.z,
                    y: n.y << g.z
                };
                if (i) {
                    var h = Math.abs(Math.cos(i)),
                        j = Math.abs(Math.sin(i));
                    f = {
                        x: f.x * h + f.y * j,
                        y: f.y * h + f.x * j
                    }
                }
                var k = $.pointToLocation(e, {
                        x: g.x - f.x,
                        y: g.y + f.y
                    }),
                    l = $.pointToLocation(e, {
                        x: g.x + f.x,
                        y: g.y - f.y
                    });
                return {
                    minLat: k.lat,
                    minLon: k.lon,
                    maxLat: l.lat,
                    maxLon: l.lon
                }
            }
            if (!d) return b;
            var o = $.locationToPoint(e, {
                    lon: a.minLon,
                    lat: a.maxLat
                }),
                p = $.locationToPoint(e, {
                    lon: a.maxLon,
                    lat: a.minLat
                });
            if (o.x > p.x || o.y > p.y) throw "Invalid bounding box";
            if (c) {
                var q = $.locationToPoint(e, c),
                    r = Math.max(p.x - q.x, q.x - o.x),
                    s = Math.max(p.y - q.y, q.y - o.y);
                o = {
                    x: q.x - r,
                    y: q.y - s
                }, p = {
                    x: q.x + r,
                    y: q.y + s
                }
            } else c = $.centerOfBound(a);
            var r = p.x - o.x,
                s = p.y - o.y;
            if (i) {
                var f = m.distance(r, s);
                r = f, s = f
            }
            return b.location(c).zoom($.bound(b.zoom() + Math.floor(Math.min(Math.log((d.offsetWidth << g.z) / r) / LOG2, Math.log((d.offsetHeight << g.z) / s) / LOG2)), 1, e.maxZoom)), b
        }, b.move = function(a, c) {
            return c === undefined || c ? (a = {
                x: a.x << g.z,
                y: a.y << g.z
            }, i && (a = m.rotateVector(a, i)), E(a.x, a.y)) : y.drag(a), b
        }, b.pinch = function(a, c) {
            return h *= a, p.clearBackFrame().scale(h, c), b.Event.fire("pinch", c), b
        }, b.pinchEnd = function(a) {
            return $.isInRange(h, MIN_PINCH) && (a = undefined), b.zoom($.bound(Math.round(b.zoom()), f.min, f.max), !1, a), p.scale(1, a), h = 1, b.Event.fire("pinchEnd"), b
        }, b.language = function(a) {
            return a == undefined ? b.Ui.language() : (b.Ui.language(a), b.Search.language(a), b.Tags.language(a), b.Route.language(a), b)
        }, b.focus = function() {
            return k.focus(), b
        }, b.pageToScreen = function(a) {
            var b = a.x - l.x;
            if (b < 0 || b >= d.offsetWidth) return !1;
            var c = a.y - l.y;
            return c < 0 || c >= d.offsetHeight ? !1 : {
                x: b,
                y: c
            }
        }, b.loadingTile = function() {
            return p.loadingTile()
        }, b.rotate = function(a) {
            return a == undefined ? i / RAD : (a = $.boundAngle(a), i = a * RAD, j = $.radianToDir(i), p.rotate(i), b.Event.fire("rotate", a), b)
        }, this.enableNightMode = function(a) {
            return a == undefined ? d.style.filter ? !0 : !1 : (d.style.filter = a ? "invert(100%)" : "", this)
        }, b.exportImage = function() {
            var b = d.offsetWidth,
                c = d.offsetHeight,
                e = document.createElementNS("https://www.w3.org/2000/svg", "svg");
            e.setAttribute("width", b), e.setAttribute("height", c);
            var f = document.createElementNS(e.namespaceURI, "foreignObject");
            f.setAttribute("width", b), f.setAttribute("height", c), f.appendChild(d), e.appendChild(f), a.placeholder.appendChild(e);
            var g = $.append(a.placeholder, "canvas", {
                    width: b,
                    height: c
                }),
                h = g.getContext("2d"),
                i = new Image;
            i.onload = function() {
                URL.revokeObjectURL(i.src), a.placeholder.appendChild(d), a.placeholder.removeChild(e), a.placeholder.removeChild(g), h.drawImage(i, 0, 0), location = g.toDataURL("image/png").replace("image/png", "image/octet-stream")
            }, i.src = URL.createObjectURL(new Blob([(new XMLSerializer).serializeToString(e)], {
                type: "image/svg+xml"
            }))
        }, b.Event = new longdo.Event(b), b.Layers = new longdo.LayerCollection(b), b.Overlays = new longdo.OverlayCollection(b, x), b.Ui = {
            language: function(a) {
                return a ? (this.code = a, this) : this.code
            },
            code: "th"
        }, b.Search = new longdo.Search(b), b.Tags = new longdo.TagCollection(b), b.Route = new longdo.Route(b);
        if (!a) return;
        longdo["map" + c] = b;
        var H = a.language && a.language.substring(0, 2) != "th";
        e = a.projection || e;
        if (a.layer)
            if (a.layer instanceof Array) {
                b.Layers.setBase(a.layer[0]);
                for (var I = 1; I < a.layer.length; ++I) b.Layers.add(a.layer[I])
            } else b.Layers.setBase(a.layer);
        else H && defaultMap == "POI" && b.Layers.setBase(longdo.Layers.POI_EN);
        isFinite(a.zoom) && b.zoom(a.zoom, !1), a.lastView === !1 ? b.location(a.location, !1) : C(), b.zoomRange(a.zoomRange), setInterval(B, SAVE_INTERVAL);
        if (a.placeholder instanceof Element) $.empty(a.placeholder), d = $.append(a.placeholder, "div", {
            className: "ldmap_placeholder"
        }), b.Ui = new longdo.UiCollection(b, y, a.ui, a.input), p = new LongdoRenderer(b, z, a.smoothZoom), d.addEventListener("mousedown", G), d.addEventListener("touchstart", G), H && b.language("en"), k = $.append(d, "button", {
            className: "ldmap_anchor"
        }), y.anchor = k, a.autoResize !== !1 && addEventListener("resize", b.resize), b.pause(!1), cap.dragFail && cap.dragFail(), IMAGE_SUFFIX = $.isHD() ? IMAGE_SUFFIX_HD : IMAGE_SUFFIX_SD, setTimeout(function() {
            b.resize(), b.Ui.updateStyle();
            var a = d.getBoundingClientRect();
            window.self == top && a.top < innerHeight && a.left < innerWidth && b.focus(), b.Event.fire("ready")
        }, 100);
        else return
    };
    $.append(document.head, 'style', {
        type: 'text/css',
        innerHTML: '.ldmap_placeholder{position:relative;width:100%;height:100%;min-width:100px;min-height:100px;background:#eee;font:12px/1.2 Tahoma,sans-serif;overflow:hidden;z-index:0;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-webkit-touch-callout:none}.ldmap_placeholder *{box-sizing:content-box}.ldmap_placeholder_fullscreen{position:fixed!important;top:0!important;left:0!important;width:100%!important;height:100%!important;z-index:255}.ldmap_placeholder a:link,.ldmap_placeholder a:visited{color:#069;outline:0;text-decoration:none}.ldmap_placeholder a:hover,.ldmap_placeholder a:active{color:#e80;outline:0;text-decoration:underline}.ldmap_placeholder .ldmap_selectable{user-select:text;-moz-user-select:text;-webkit-user-select:text;-ms-user-select:text;-webkit-touch-callout:default}.ldmap_placeholder .ldmap_frame{position:absolute}.ldmap_placeholder .ldmap_frame .ldmap_tile{position:absolute;top:0;left:0;width:256px;height:256px;z-index:0}.ldmap_placeholder .ldmap_frame .ldmap_tile_canvas{position:absolute;top:0;left:0;width:256px;height:256px;z-index:0}.ldmap_placeholder .ldmap_frame img.ldmap_tile_canvas{opacity:0;transition:opacity .3s}.ldmap_placeholder .ldmap_frame .ldmap_tile_offworld{position:absolute;top:0;left:0;width:256px;height:256px;background:#eee;z-index:0}.ldmap_placeholder .ldmap_frame .ldmap_tile_element{position:absolute;top:0;left:0}.ldmap_placeholder .ldmap_backbuffer{display:none}.ldmap_placeholder .ldmap_frame .ldmap_overlay{position:absolute;z-index:2}.ldmap_placeholder .ldmap_frame .ldmap_clickable{cursor:pointer}.ldmap_placeholder .ldmap_frame .ldmap_popupholder{z-index:3}.ldmap_placeholder .ldmap_frame .ldmap_popup{position:absolute;bottom:46px;min-height:60px;min-width:120px;max-width:320px;padding:10px;border:1px solid #a0a0a0;background:#fff;border-radius:16px;box-shadow:2px 2px 6px #888}.ldmap_placeholder .ldmap_frame .ldmap_popup_title{height:20px;max-width:92%;font-size:14px;font-weight:bold;vertical-align:bottom;line-height:1.5;overflow:hidden;display:inline-block}.ldmap_placeholder .ldmap_frame .ldmap_popup_close{width:17px;height:17px;float:right;cursor:pointer}.ldmap_placeholder .ldmap_frame .ldmap_popup_detail{max-width:94%;max-height:240px;padding:6px 18px 4px 0;word-wrap:break-word;overflow-y:auto;display:inline-block}.ldmap_placeholder .ldmap_frame .ldmap_popup_callout{position:absolute;bottom:-6px;left:-6px;width:80px;height:54px;pointer-events:none}.ldmap_placeholder .ldmap_frame .ldmap_overlay_info{color:#888;font-size:11px}.ldmap_placeholder .ldmap_frame .ldmap_overlay_description{margin:4px 0 4px 0}.ldmap_placeholder .ldmap_frame .ldmap_overlay_camera{width:320px;height:240px;border:0}.ldmap_placeholder .ldmap_frame .ldmap_geomlabel{padding:1px 2px 1px 2px;background:#ffc;font-size:10px;font-weight:bold;box-shadow:2px 2px 4px #444;white-space:nowrap;opacity:.8}.ldmap_placeholder .ldmap_frame .ldmap_geomlabel sup{font-size:.5em}.ldmap_placeholder .ldmap_anchor{width:1px;height:1px;border:0}.ldmap_placeholder .ldmap_navigation{position:absolute;top:4px;left:4px;text-align:left;z-index:10}.ldmap_placeholder .ldmap_dpad{position:relative;width:50px;height:50px;margin:0 4px 0 0;background-size:50px 50px;vertical-align:top}.ldmap_placeholder .ldmap_dpad .ld_goleft{position:absolute;left:2px;top:0;bottom:0;width:16px;height:16px;margin:auto;cursor:pointer}.ldmap_placeholder .ldmap_dpad .ld_goright{position:absolute;right:2px;top:0;bottom:0;width:16px;height:16px;margin:auto;cursor:pointer}.ldmap_placeholder .ldmap_dpad .ld_gotop{position:absolute;left:0;right:0;top:2px;width:16px;height:16px;margin:auto;cursor:pointer}.ldmap_placeholder .ldmap_dpad .ld_gobottom{position:absolute;left:0;right:0;bottom:2px;width:16px;height:16px;margin:auto;cursor:pointer}.ldmap_placeholder .ldmap_dpad .ld_zoomlabel{position:absolute;left:0;right:0;top:0;bottom:0;height:16px;margin:auto;color:#288fde;font-weight:bold;text-align:center}.ldmap_placeholder .ldmap_zoom{margin:4px 4px 0 15px;vertical-align:top;display:inline-block}.ldmap_placeholder .ldmap_zoom img{display:block}.ldmap_placeholder .ldmap_zoomin{width:20px;height:23px}.ldmap_placeholder .ldmap_zoomout{width:20px;height:25px}.ldmap_placeholder .ldmap_zoombargroup{position:relative}.ldmap_placeholder .ldmap_zoombar{width:6px;height:200px;margin:0 0 0 7px;cursor:pointer}.ldmap_placeholder .ldmap_zoomslider{position:absolute;width:20px;height:13px;cursor:ns-resize}.ldmap_placeholder .ldmap_zoombar_mini{margin:8px 0 0 3px;width:44px;height:86px;vertical-align:top;line-height:0}.ldmap_placeholder .ldmap_zoombar_mini .ldmap_zoomin{width:44px;height:40px}.ldmap_placeholder .ldmap_zoombar_mini .ldmap_zoomout{width:44px;height:46px}.ldmap_placeholder .ldmap_geolocation{width:20px;height:20px;margin:4px 4px 0 15px;vertical-align:middle}.ldmap_placeholder .ldmap_topleft{position:absolute;top:4px;left:60px;text-align:left;z-index:9}.ldmap_placeholder .ldmap_toolbar{margin:0 4px 0 0;vertical-align:top}.ldmap_placeholder .ldmap_toolbar .ldmap_button{width:24px;height:24px;margin:0 2px 0 0}.ldmap_placeholder .ldmap_topright{position:absolute;top:4px;right:4px;margin:0 0 0 110px;text-align:right;z-index:8}.ldmap_placeholder .ldmap_fullscreen{width:24px;height:24px;margin:0 0 0 4px;vertical-align:top}.ldmap_placeholder .ldmap_crosshair{position:absolute;top:0;bottom:0;left:0;right:0;width:0;height:0;margin:auto;border:1px solid #f00;background:#f00;z-index:4}.ldmap_placeholder .ldmap_bottomleft{position:absolute;bottom:4px;left:6px;z-index:7}.ldmap_placeholder .ldmap_scale{height:5px;width:100px;margin:0 0 2px 0;padding:5px 0 0 0;border:1px solid #333;border-top:0;pointer-events:none}.ldmap_placeholder .ldmap_scale .ldmap_scalecaption{position:absolute;bottom:12px;width:100%;color:#333;text-align:center}.ldmap_placeholder .ldmap_scale .ldmap_scaleouter{width:60%;height:7px;margin:auto;border-left:1px solid #333;border-right:1px solid #000}.ldmap_placeholder .ldmap_scale .ldmap_scaleinner{width:33%;height:7px;margin:auto;border-left:1px solid #333;border-right:1px solid #000}.ldmap_placeholder .ldmap_bottomright{position:absolute;bottom:4px;right:6px;text-align:right;z-index:6}.ldmap_placeholder .ldmap_notice{font-size:10px}.ldmap_placeholder .ldmap_notice img{border:0}.ldmap_placeholder .ldmap_floor{position:absolute;bottom:40px;right:4px;border:1px solid #a6a6a6;background:#fff;text-align:center;z-index:11;display:none}.ldmap_placeholder .ldmap_floor_item{padding:3px 8px 3px 8px;cursor:pointer}.ldmap_placeholder .ldmap_floor_item:hover{background:#cee}.ldmap_placeholder .ldmap_floor_item_active{background:#feb}.ldmap_placeholder .ldmap_contextmenu{position:absolute;width:180px;border:1px solid #a6a6a6;background:#ffa;display:none;z-index:5}.ldmap_placeholder .ldmap_contextmenu .ldmap_contextmenu_info{padding:6px;background:#def}.ldmap_placeholder .ldmap_contextmenu .ldmap_contextmenu_location{color:#777}.ldmap_placeholder .ldmap_contextmenu .ldmap_contextmenu_extra{padding:6px}.ldmap_placeholder .ldmap_contextmenu .ldmap_contextmenu_icon{border:0;width:14px;max-height:14px;margin:0 6px 2px 0;vertical-align:top}.ldmap_placeholder .ldmap_contextmenu .ldmap_contextmenu_poi{display:inline-block;height:14px;width:146px;overflow:hidden}.ldmap_placeholder .ldmap_tooltip{position:absolute;padding:3px 4px 3px 4px;border:1px solid #444;background:#fff;font-size:11px;white-space:nowrap;display:none;z-index:13}.ldmap_placeholder .ldmap_popup_mini{position:absolute;bottom:0;width:100%;height:30%;background:#fff;border-top:2px solid #2a97eb;display:none;z-index:12;overflow-y:auto}.ldmap_placeholder .ldmap_popup_mini .ldmap_popup_title{height:22px;padding:4px 8px 4px 8px;font-size:16px;font-weight:bold;vertical-align:bottom;line-height:1.5;overflow:hidden}.ldmap_placeholder .ldmap_popup_mini .ldmap_popup_close{width:17px;height:17px;padding:6px;float:right;cursor:pointer}.ldmap_placeholder .ldmap_popup_mini .ldmap_popup_detail{color:#666;padding:0 16px 8px 8px;word-wrap:break-word}.ldmap_placeholder .ldmap_popup_mini .ldmap_overlay_info{color:#888;font-size:11px}.ldmap_placeholder .ldmap_popup_mini .ldmap_overlay_camera{width:320px;height:240px;border:0}.ldmap_placeholder .ldmap_button{border:0;cursor:pointer;font-size:11px}.ldmap_placeholder .ldmap_button:hover{background:#cee;box-shadow:0 0 2px #8cc}.ldmap_placeholder .ldmap_menubar{margin:2px 4px 2px 4px;border-right:1px solid #a6a6a6;font-size:11px;cursor:default;display:inline-block;white-space:nowrap}.ldmap_placeholder .ldmap_menubar .ldmap_item{padding:3px 8px 3px 8px;border-top:1px solid #a6a6a6;border-bottom:1px solid #a6a6a6;border-left:1px solid #a6a6a6;background:#fff;vertical-align:top;display:inline-block;transition:.1s}.ldmap_placeholder .ldmap_menubar .ldmap_button:hover{background:#cee;box-shadow:none}.ldmap_placeholder .ldmap_menubar .ldmap_button_active{background:#2085f3;color:#fff}.ldmap_placeholder .ldmap_menubar .ldmap_button_active:hover{background:#69f!important}.ldmap_placeholder .ldmap_menubar .ldmap_arrow{float:right;margin:6px 2px 0 4px;width:6px;height:6px}.ldmap_placeholder .ldmap_menubar .ldmap_dropdown{border-top:1px solid #a6a6a6;border-bottom:1px solid #a6a6a6;border-left:1px solid #a6a6a6;background:#fff;vertical-align:top;display:inline-block}.ldmap_placeholder .ldmap_menubar .ldmap_dropdown_head{padding:3px 4px 3px 8px;text-align:center;cursor:pointer;transition:.1s}.ldmap_placeholder .ldmap_menubar .ldmap_dropdown_head:hover{background:#cee}.ldmap_placeholder .ldmap_menubar .ldmap_dropdown_body{background:#fff;text-align:left;overflow-y:auto}.ldmap_placeholder .ldmap_menubar .ldmap_group{padding:3px 14px 3px 14px;background:#eee;text-align:center}.ldmap_placeholder .ldmap_menubar .ldmap_option{padding:3px 20px 3px 8px;cursor:pointer;transition:.1s}.ldmap_placeholder .ldmap_menubar .ldmap_option:hover{background:#cee}.ldmap_placeholder .ldmap_menubar .ldmap_option_active{background:#feb}.ldmap_placeholder .ldmap_menubar .ldmap_command{padding:3px 14px 3px 14px;background:#f3f6f9}.ldmap_placeholder .ldmap_tagpanel{border:0;background:#fff;text-align:right;vertical-align:top}.ldmap_placeholder .ldmap_tagpanel .ldmap_dropdown_head{border:1px solid #a6a6a6;display:inline-block}.ldmap_placeholder .ldmap_tagpanel .ldmap_tagpanel_down{padding-bottom:8px;border-bottom:0}.ldmap_placeholder .ldmap_tagpanel .ldmap_tagpanel_head img{height:14px;margin:0 2px 0 0;vertical-align:top}.ldmap_placeholder .ldmap_tagpanel .ldmap_tagpanel_head img:hover{opacity:.5}.ldmap_placeholder .ldmap_tagpanel .ldmap_tagpanel_body{position:absolute;width:306px;padding:8px 0 0 0;border:1px solid #a6a6a6;z-index:-1}.ldmap_placeholder .ldmap_tagcategory{padding:0 6px 0 6px;color:#3f230c}.ldmap_placeholder .ldmap_tagcategory table{width:99%;margin:2px 0 6px 4px;border-collapse:separate;vertical-align:middle}.ldmap_placeholder .ldmap_tagcategory tr{height:18px}.ldmap_placeholder .ldmap_tagcategory td{padding:0;width:29px}.ldmap_placeholder .ldmap_category_icon{cursor:pointer;margin:auto}.ldmap_placeholder .ldmap_category_icon:hover{opacity:.5}.ldmap_placeholder .ldmap_morecategory{cursor:pointer;background:#fff9df;font-size:11px;color:#3f230c;text-align:center;padding:3px 0 3px 0;border:1px dashed #efdfb3}.ldmap_placeholder .ldmap_customcontrol{vertical-align:top;display:inline-block;white-space:nowrap}.ldmap_placeholder .ldmap_alert{padding:2px 6px 2px 6px;border:1px solid #a6a6a6;background:#fff;font-size:11px;vertical-align:middle;display:none}.ldmap_placeholder .ldmap_alert_error{color:#f00}.ldmap_placeholder .ldmap_legend{width:115px}.ldmap_placeholder .ldmap_externalmap{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}.ldmap_placeholder .ldmap_external_bottom{bottom:25px}.ldmap_placeholder .ldmap_link{color:#069;cursor:pointer}.ldmap_placeholder .ldmap_link:hover{color:#e80;text-decoration:underline}.ldmap_placeholder .ldmap_poi_load{width:252px;padding:20px;text-align:center}.ldmap_placeholder .ldmap_poi_warning{margin:8px 0 0 0;border-radius:4px;text-align:center}.ldmap_placeholder .ldmap_poi_warning img{width:144px;height:20px}.ldmap_placeholder .ldmap_poi_unverified{background:#ffa60c}.ldmap_placeholder .ldmap_poi_obsoleted{background:#e13209}.ldmap_placeholder .ldmap_poi_icon{width:24px;height:24px;margin:-4px 0 0 0;border:0;float:left}.ldmap_placeholder .ldmap_poi_info{margin:8px 0 0 34px;min-height:24px}.ldmap_placeholder .ldmap_poi_info .ldmap_arrow{width:6px;height:6px}.ldmap_placeholder .ldmap_poi_info_hidden{display:none}.ldmap_placeholder .ldmap_poi_open{cursor:pointer}.ldmap_placeholder .ldmap_poi_dow{width:40px;display:inline-block}.ldmap_placeholder .ldmap_poi_menu{width:292px;margin:8px 0 0 0;padding:4px 0 4px 0;border-top:1px solid #ccc}.ldsearch_placeholder{min-width:240px;font:12px/1.2 Tahoma,sans-serif}.ldsearch_placeholder .ldsearch_list{margin:0;padding:0;list-style:none;cursor:pointer}.ldsearch_placeholder .ldsearch_item{margin:0;padding:8px 4px 8px 6px;border-bottom:1px solid #ddd;background:#fff;font-size:14px}.ldsearch_placeholder .ldsearch_item:hover{background:#eee}.ldsearch_placeholder .ldsearch_zoom{width:16px;height:16px;float:right;margin:0 0 0 2px}.ldsearch_placeholder .ldsearch_icon{border:0;width:14px;max-height:14px;margin:4px 6px 20px 0;float:left}.ldsearch_placeholder .ldsearch_address{margin:2px 0 0 20px;color:#999;font-size:11px}.ldsearch_placeholder .ldsearch_empty{padding:6px 0 6px 0;color:#888;text-align:center}.ldsearch_placeholder .ldsearch_more{padding:6px 0 6px 0;text-align:center;color:#fff;background:#59b3f8;cursor:pointer}.ldsearch_placeholder .ldsearch_load{margin:8px;text-align:center}.ldroute_placeholder{min-width:240px;font:12px/1.2 Tahoma,sans-serif}.ldroute_placeholder .ldroute_about{height:100%;padding:0 8px 0 8px;background:#fff}.ldroute_placeholder .ldroute_head{color:#393;font-size:14px;font-weight:bold}.ldroute_placeholder .ldroute_warn{color:#f00}.ldroute_placeholder .ldroute_indent{margin:4px 0 8px 16px}.ldroute_placeholder .ldroute_error{color:#f00;text-align:center}.ldroute_placeholder .ldroute_menu{width:21%;padding:2%;font-weight:bold;background:#eef;cursor:pointer;text-align:center;display:inline-block}.ldroute_placeholder .ldroute_menu:hover{background:#eff}.ldroute_placeholder .ldroute_pref{padding:8px;background:#eff}.ldroute_placeholder .ldroute_pref_right{float:right;width:50%}.ldroute_placeholder .ldroute_pref label{display:block}.ldroute_placeholder button{margin:12px 0 4px 20px}.ldroute_placeholder .ldroute_info{height:16px;padding:8px;border-bottom:1px solid #ddd;color:#fff;background:#888;font-size:16px}.ldroute_placeholder .ldroute_distance{float:left;margin:0 0 0 2px}.ldroute_placeholder .ldroute_interval{float:right}.ldroute_placeholder .ldroute_list{margin:0;padding:0;list-style:none}.ldroute_placeholder .ldroute_item{padding:8px 4px 8px 6px;border-bottom:1px solid #ddd;background:#efe}.ldroute_placeholder .ldroute_type_air{background:#edf}.ldroute_placeholder .ldroute_type_rail{background:#ffd}.ldroute_placeholder .ldroute_type_ferry{background:#def}.ldroute_placeholder .ldroute_item:hover{background:#eee;cursor:pointer}.ldroute_placeholder .ldroute_dest{background:#fed!important}.ldroute_placeholder .ldroute_icon{border:0;margin:0 6px 10px 0;height:16px;float:left}.ldroute_placeholder .ldroute_road{color:#39c}.ldroute_placeholder .ldroute_poi{color:#c30;cursor:pointer}.ldroute_placeholder .ldroute_dist{color:#888;font-size:11px;margin:0 0 0 2px;float:right}@media print{.ldmap_placeholder .ldmap_button,.ldmap_placeholder .ldmap_menubar,.ldmap_placeholder .ldmap_dpad,.ldmap_placeholder .ldmap_zoom{display:none!important}}'
    });
})()