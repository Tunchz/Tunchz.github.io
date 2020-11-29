(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var helpers = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * @module helpers
	 */
	/**
	 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
	 *
	 * @memberof helpers
	 * @type {number}
	 */
	exports.earthRadius = 6371008.8;
	/**
	 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
	 *
	 * @memberof helpers
	 * @type {Object}
	 */
	exports.factors = {
	    centimeters: exports.earthRadius * 100,
	    centimetres: exports.earthRadius * 100,
	    degrees: exports.earthRadius / 111325,
	    feet: exports.earthRadius * 3.28084,
	    inches: exports.earthRadius * 39.370,
	    kilometers: exports.earthRadius / 1000,
	    kilometres: exports.earthRadius / 1000,
	    meters: exports.earthRadius,
	    metres: exports.earthRadius,
	    miles: exports.earthRadius / 1609.344,
	    millimeters: exports.earthRadius * 1000,
	    millimetres: exports.earthRadius * 1000,
	    nauticalmiles: exports.earthRadius / 1852,
	    radians: 1,
	    yards: exports.earthRadius / 1.0936,
	};
	// *
	//  * Units of measurement factors based on 1 meter.
	//  *
	//  * @memberof helpers
	//  * @type {Object}
	 
	exports.unitsFactors = {
	    centimeters: 100,
	    centimetres: 100,
	    degrees: 1 / 111325,
	    feet: 3.28084,
	    inches: 39.370,
	    kilometers: 1 / 1000,
	    kilometres: 1 / 1000,
	    meters: 1,
	    metres: 1,
	    miles: 1 / 1609.344,
	    millimeters: 1000,
	    millimetres: 1000,
	    nauticalmiles: 1 / 1852,
	    radians: 1 / exports.earthRadius,
	    yards: 1 / 1.0936,
	};
	/**
	 * Area of measurement factors based on 1 square meter.
	 *
	 * @memberof helpers
	 * @type {Object}
	 */
	exports.areaFactors = {
	    acres: 0.000247105,
	    centimeters: 10000,
	    centimetres: 10000,
	    feet: 10.763910417,
	    inches: 1550.003100006,
	    kilometers: 0.000001,
	    kilometres: 0.000001,
	    meters: 1,
	    metres: 1,
	    miles: 3.86e-7,
	    millimeters: 1000000,
	    millimetres: 1000000,
	    yards: 1.195990046,
	};
	/**
	 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
	 *
	 * @name feature
	 * @param {Geometry} geometry input geometry
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature} a GeoJSON Feature
	 * @example
	 * var geometry = {
	 *   "type": "Point",
	 *   "coordinates": [110, 50]
	 * };
	 *
	 * var feature = turf.feature(geometry);
	 *
	 * //=feature
	 */
	function feature(geom, properties, options) {
	    if (options === void 0) { options = {}; }
	    var feat = { type: "Feature" };
	    if (options.id === 0 || options.id) {
	        feat.id = options.id;
	    }
	    if (options.bbox) {
	        feat.bbox = options.bbox;
	    }
	    feat.properties = properties || {};
	    feat.geometry = geom;
	    return feat;
	}
	exports.feature = feature;
	/**
	 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
	 * For GeometryCollection type use `helpers.geometryCollection`
	 *
	 * @name geometry
	 * @param {string} type Geometry Type
	 * @param {Array<any>} coordinates Coordinates
	 * @param {Object} [options={}] Optional Parameters
	 * @returns {Geometry} a GeoJSON Geometry
	 * @example
	 * var type = "Point";
	 * var coordinates = [110, 50];
	 * var geometry = turf.geometry(type, coordinates);
	 * // => geometry
	 */
	function geometry(type, coordinates, options) {
	    switch (type) {
	        case "Point": return point(coordinates).geometry;
	        case "LineString": return lineString(coordinates).geometry;
	        case "Polygon": return polygon(coordinates).geometry;
	        case "MultiPoint": return multiPoint(coordinates).geometry;
	        case "MultiLineString": return multiLineString(coordinates).geometry;
	        case "MultiPolygon": return multiPolygon(coordinates).geometry;
	        default: throw new Error(type + " is invalid");
	    }
	}
	exports.geometry = geometry;
	/**
	 * Creates a {@link Point} {@link Feature} from a Position.
	 *
	 * @name point
	 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<Point>} a Point feature
	 * @example
	 * var point = turf.point([-75.343, 39.984]);
	 *
	 * //=point
	 */
	function point(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    var geom = {
	        type: "Point",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.point = point;
	/**
	 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
	 *
	 * @name points
	 * @param {Array<Array<number>>} coordinates an array of Points
	 * @param {Object} [properties={}] Translate these properties to each Feature
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
	 * associated with the FeatureCollection
	 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
	 * @returns {FeatureCollection<Point>} Point Feature
	 * @example
	 * var points = turf.points([
	 *   [-75, 39],
	 *   [-80, 45],
	 *   [-78, 50]
	 * ]);
	 *
	 * //=points
	 */
	function points(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    return featureCollection(coordinates.map(function (coords) {
	        return point(coords, properties);
	    }), options);
	}
	exports.points = points;
	/**
	 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
	 *
	 * @name polygon
	 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<Polygon>} Polygon Feature
	 * @example
	 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
	 *
	 * //=polygon
	 */
	function polygon(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
	        var ring = coordinates_1[_i];
	        if (ring.length < 4) {
	            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
	        }
	        for (var j = 0; j < ring[ring.length - 1].length; j++) {
	            // Check if first point of Polygon contains two numbers
	            if (ring[ring.length - 1][j] !== ring[0][j]) {
	                throw new Error("First and last Position are not equivalent.");
	            }
	        }
	    }
	    var geom = {
	        type: "Polygon",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.polygon = polygon;
	/**
	 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
	 *
	 * @name polygons
	 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
	 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
	 * @example
	 * var polygons = turf.polygons([
	 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
	 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
	 * ]);
	 *
	 * //=polygons
	 */
	function polygons(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    return featureCollection(coordinates.map(function (coords) {
	        return polygon(coords, properties);
	    }), options);
	}
	exports.polygons = polygons;
	/**
	 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
	 *
	 * @name lineString
	 * @param {Array<Array<number>>} coordinates an array of Positions
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<LineString>} LineString Feature
	 * @example
	 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
	 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
	 *
	 * //=linestring1
	 * //=linestring2
	 */
	function lineString(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    if (coordinates.length < 2) {
	        throw new Error("coordinates must be an array of two or more positions");
	    }
	    var geom = {
	        type: "LineString",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.lineString = lineString;
	/**
	 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
	 *
	 * @name lineStrings
	 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
	 * associated with the FeatureCollection
	 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
	 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
	 * @example
	 * var linestrings = turf.lineStrings([
	 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
	 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
	 * ]);
	 *
	 * //=linestrings
	 */
	function lineStrings(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    return featureCollection(coordinates.map(function (coords) {
	        return lineString(coords, properties);
	    }), options);
	}
	exports.lineStrings = lineStrings;
	/**
	 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
	 *
	 * @name featureCollection
	 * @param {Feature[]} features input features
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {FeatureCollection} FeatureCollection of Features
	 * @example
	 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
	 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
	 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
	 *
	 * var collection = turf.featureCollection([
	 *   locationA,
	 *   locationB,
	 *   locationC
	 * ]);
	 *
	 * //=collection
	 */
	function featureCollection(features, options) {
	    if (options === void 0) { options = {}; }
	    var fc = { type: "FeatureCollection" };
	    if (options.id) {
	        fc.id = options.id;
	    }
	    if (options.bbox) {
	        fc.bbox = options.bbox;
	    }
	    fc.features = features;
	    return fc;
	}
	exports.featureCollection = featureCollection;
	/**
	 * Creates a {@link Feature<MultiLineString>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiLineString
	 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<MultiLineString>} a MultiLineString feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
	 *
	 * //=multiLine
	 */
	function multiLineString(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    var geom = {
	        type: "MultiLineString",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.multiLineString = multiLineString;
	/**
	 * Creates a {@link Feature<MultiPoint>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiPoint
	 * @param {Array<Array<number>>} coordinates an array of Positions
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<MultiPoint>} a MultiPoint feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
	 *
	 * //=multiPt
	 */
	function multiPoint(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    var geom = {
	        type: "MultiPoint",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.multiPoint = multiPoint;
	/**
	 * Creates a {@link Feature<MultiPolygon>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name multiPolygon
	 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<MultiPolygon>} a multipolygon feature
	 * @throws {Error} if no coordinates are passed
	 * @example
	 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
	 *
	 * //=multiPoly
	 *
	 */
	function multiPolygon(coordinates, properties, options) {
	    if (options === void 0) { options = {}; }
	    var geom = {
	        type: "MultiPolygon",
	        coordinates: coordinates,
	    };
	    return feature(geom, properties, options);
	}
	exports.multiPolygon = multiPolygon;
	/**
	 * Creates a {@link Feature<GeometryCollection>} based on a
	 * coordinate array. Properties can be added optionally.
	 *
	 * @name geometryCollection
	 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
	 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
	 * @param {Object} [options={}] Optional Parameters
	 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
	 * @param {string|number} [options.id] Identifier associated with the Feature
	 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
	 * @example
	 * var pt = turf.geometry("Point", [100, 0]);
	 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
	 * var collection = turf.geometryCollection([pt, line]);
	 *
	 * // => collection
	 */
	function geometryCollection(geometries, properties, options) {
	    if (options === void 0) { options = {}; }
	    var geom = {
	        type: "GeometryCollection",
	        geometries: geometries,
	    };
	    return feature(geom, properties, options);
	}
	exports.geometryCollection = geometryCollection;
	/**
	 * Round number to precision
	 *
	 * @param {number} num Number
	 * @param {number} [precision=0] Precision
	 * @returns {number} rounded number
	 * @example
	 * turf.round(120.4321)
	 * //=120
	 *
	 * turf.round(120.4321, 2)
	 * //=120.43
	 */
	function round(num, precision) {
	    if (precision === void 0) { precision = 0; }
	    if (precision && !(precision >= 0)) {
	        throw new Error("precision must be a positive number");
	    }
	    var multiplier = Math.pow(10, precision || 0);
	    return Math.round(num * multiplier) / multiplier;
	}
	exports.round = round;
	/**
	 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @name radiansToLength
	 * @param {number} radians in radians across the sphere
	 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
	 * meters, kilometres, kilometers.
	 * @returns {number} distance
	 */
	function radiansToLength(radians, units) {
	    if (units === void 0) { units = "kilometers"; }
	    var factor = exports.factors[units];
	    if (!factor) {
	        throw new Error(units + " units is invalid");
	    }
	    return radians * factor;
	}
	exports.radiansToLength = radiansToLength;
	/**
	 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @name lengthToRadians
	 * @param {number} distance in real units
	 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
	 * meters, kilometres, kilometers.
	 * @returns {number} radians
	 */
	function lengthToRadians(distance, units) {
	    if (units === void 0) { units = "kilometers"; }
	    var factor = exports.factors[units];
	    if (!factor) {
	        throw new Error(units + " units is invalid");
	    }
	    return distance / factor;
	}
	exports.lengthToRadians = lengthToRadians;
	/**
	 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
	 *
	 * @name lengthToDegrees
	 * @param {number} distance in real units
	 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
	 * meters, kilometres, kilometers.
	 * @returns {number} degrees
	 */
	function lengthToDegrees(distance, units) {
	    return radiansToDegrees(lengthToRadians(distance, units));
	}
	exports.lengthToDegrees = lengthToDegrees;
	/**
	 * Converts any bearing angle from the north line direction (positive clockwise)
	 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
	 *
	 * @name bearingToAzimuth
	 * @param {number} bearing angle, between -180 and +180 degrees
	 * @returns {number} angle between 0 and 360 degrees
	 */
	function bearingToAzimuth(bearing) {
	    var angle = bearing % 360;
	    if (angle < 0) {
	        angle += 360;
	    }
	    return angle;
	}
	exports.bearingToAzimuth = bearingToAzimuth;
	/**
	 * Converts an angle in radians to degrees
	 *
	 * @name radiansToDegrees
	 * @param {number} radians angle in radians
	 * @returns {number} degrees between 0 and 360 degrees
	 */
	function radiansToDegrees(radians) {
	    var degrees = radians % (2 * Math.PI);
	    return degrees * 180 / Math.PI;
	}
	exports.radiansToDegrees = radiansToDegrees;
	/**
	 * Converts an angle in degrees to radians
	 *
	 * @name degreesToRadians
	 * @param {number} degrees angle between 0 and 360 degrees
	 * @returns {number} angle in radians
	 */
	function degreesToRadians(degrees) {
	    var radians = degrees % 360;
	    return radians * Math.PI / 180;
	}
	exports.degreesToRadians = degreesToRadians;
	/**
	 * Converts a length to the requested unit.
	 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
	 *
	 * @param {number} length to be converted
	 * @param {Units} [originalUnit="kilometers"] of the length
	 * @param {Units} [finalUnit="kilometers"] returned unit
	 * @returns {number} the converted length
	 */
	function convertLength(length, originalUnit, finalUnit) {
	    if (originalUnit === void 0) { originalUnit = "kilometers"; }
	    if (finalUnit === void 0) { finalUnit = "kilometers"; }
	    if (!(length >= 0)) {
	        throw new Error("length must be a positive number");
	    }
	    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
	}
	exports.convertLength = convertLength;
	/**
	 * Converts a area to the requested unit.
	 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
	 * @param {number} area to be converted
	 * @param {Units} [originalUnit="meters"] of the distance
	 * @param {Units} [finalUnit="kilometers"] returned unit
	 * @returns {number} the converted distance
	 */
	function convertArea(area, originalUnit, finalUnit) {
	    if (originalUnit === void 0) { originalUnit = "meters"; }
	    if (finalUnit === void 0) { finalUnit = "kilometers"; }
	    if (!(area >= 0)) {
	        throw new Error("area must be a positive number");
	    }
	    var startFactor = exports.areaFactors[originalUnit];
	    if (!startFactor) {
	        throw new Error("invalid original units");
	    }
	    var finalFactor = exports.areaFactors[finalUnit];
	    if (!finalFactor) {
	        throw new Error("invalid final units");
	    }
	    return (area / startFactor) * finalFactor;
	}
	exports.convertArea = convertArea;
	/**
	 * isNumber
	 *
	 * @param {*} num Number to validate
	 * @returns {boolean} true/false
	 * @example
	 * turf.isNumber(123)
	 * //=true
	 * turf.isNumber('foo')
	 * //=false
	 */
	function isNumber(num) {
	    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
	}
	exports.isNumber = isNumber;
	/**
	 * isObject
	 *
	 * @param {*} input variable to validate
	 * @returns {boolean} true/false
	 * @example
	 * turf.isObject({elevation: 10})
	 * //=true
	 * turf.isObject('foo')
	 * //=false
	 */
	function isObject(input) {
	    return (!!input) && (input.constructor === Object);
	}
	exports.isObject = isObject;
	/**
	 * Validate BBox
	 *
	 * @private
	 * @param {Array<number>} bbox BBox to validate
	 * @returns {void}
	 * @throws Error if BBox is not valid
	 * @example
	 * validateBBox([-180, -40, 110, 50])
	 * //=OK
	 * validateBBox([-180, -40])
	 * //=Error
	 * validateBBox('Foo')
	 * //=Error
	 * validateBBox(5)
	 * //=Error
	 * validateBBox(null)
	 * //=Error
	 * validateBBox(undefined)
	 * //=Error
	 */
	function validateBBox(bbox) {
	    if (!bbox) {
	        throw new Error("bbox is required");
	    }
	    if (!Array.isArray(bbox)) {
	        throw new Error("bbox must be an Array");
	    }
	    if (bbox.length !== 4 && bbox.length !== 6) {
	        throw new Error("bbox must be an Array of 4 or 6 numbers");
	    }
	    bbox.forEach(function (num) {
	        if (!isNumber(num)) {
	            throw new Error("bbox must only contain numbers");
	        }
	    });
	}
	exports.validateBBox = validateBBox;
	/**
	 * Validate Id
	 *
	 * @private
	 * @param {string|number} id Id to validate
	 * @returns {void}
	 * @throws Error if Id is not valid
	 * @example
	 * validateId([-180, -40, 110, 50])
	 * //=Error
	 * validateId([-180, -40])
	 * //=Error
	 * validateId('Foo')
	 * //=OK
	 * validateId(5)
	 * //=OK
	 * validateId(null)
	 * //=Error
	 * validateId(undefined)
	 * //=Error
	 */
	function validateId(id) {
	    if (!id) {
	        throw new Error("id is required");
	    }
	    if (["string", "number"].indexOf(typeof id) === -1) {
	        throw new Error("id must be a number or a string");
	    }
	}
	exports.validateId = validateId;
	// Deprecated methods
	function radians2degrees() {
	    throw new Error("method has been renamed to `radiansToDegrees`");
	}
	exports.radians2degrees = radians2degrees;
	function degrees2radians() {
	    throw new Error("method has been renamed to `degreesToRadians`");
	}
	exports.degrees2radians = degrees2radians;
	function distanceToDegrees() {
	    throw new Error("method has been renamed to `lengthToDegrees`");
	}
	exports.distanceToDegrees = distanceToDegrees;
	function distanceToRadians() {
	    throw new Error("method has been renamed to `lengthToRadians`");
	}
	exports.distanceToRadians = distanceToRadians;
	function radiansToDistance() {
	    throw new Error("method has been renamed to `radiansToLength`");
	}
	exports.radiansToDistance = radiansToDistance;
	function bearingToAngle() {
	    throw new Error("method has been renamed to `bearingToAzimuth`");
	}
	exports.bearingToAngle = bearingToAngle;
	function convertDistance() {
	    throw new Error("method has been renamed to `convertLength`");
	}
	exports.convertDistance = convertDistance;
	});

	var invariant = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
	 *
	 * @name getCoord
	 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
	 * @returns {Array<number>} coordinates
	 * @example
	 * var pt = turf.point([10, 10]);
	 *
	 * var coord = turf.getCoord(pt);
	 * //= [10, 10]
	 */
	function getCoord(coord) {
	    if (!coord) {
	        throw new Error("coord is required");
	    }
	    if (!Array.isArray(coord)) {
	        if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
	            return coord.geometry.coordinates;
	        }
	        if (coord.type === "Point") {
	            return coord.coordinates;
	        }
	    }
	    if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
	        return coord;
	    }
	    throw new Error("coord must be GeoJSON Point or an Array of numbers");
	}
	exports.getCoord = getCoord;
	/**
	 * Unwrap coordinates from a Feature, Geometry Object or an Array
	 *
	 * @name getCoords
	 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
	 * @returns {Array<any>} coordinates
	 * @example
	 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
	 *
	 * var coords = turf.getCoords(poly);
	 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
	 */
	function getCoords(coords) {
	    if (Array.isArray(coords)) {
	        return coords;
	    }
	    // Feature
	    if (coords.type === "Feature") {
	        if (coords.geometry !== null) {
	            return coords.geometry.coordinates;
	        }
	    }
	    else {
	        // Geometry
	        if (coords.coordinates) {
	            return coords.coordinates;
	        }
	    }
	    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
	}
	exports.getCoords = getCoords;
	/**
	 * Checks if coordinates contains a number
	 *
	 * @name containsNumber
	 * @param {Array<any>} coordinates GeoJSON Coordinates
	 * @returns {boolean} true if Array contains a number
	 */
	function containsNumber(coordinates) {
	    if (coordinates.length > 1 && helpers.isNumber(coordinates[0]) && helpers.isNumber(coordinates[1])) {
	        return true;
	    }
	    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
	        return containsNumber(coordinates[0]);
	    }
	    throw new Error("coordinates must only contain numbers");
	}
	exports.containsNumber = containsNumber;
	/**
	 * Enforce expectations about types of GeoJSON objects for Turf.
	 *
	 * @name geojsonType
	 * @param {GeoJSON} value any GeoJSON object
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} if value is not the expected type.
	 */
	function geojsonType(value, type, name) {
	    if (!type || !name) {
	        throw new Error("type and name required");
	    }
	    if (!value || value.type !== type) {
	        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + value.type);
	    }
	}
	exports.geojsonType = geojsonType;
	/**
	 * Enforce expectations about types of {@link Feature} inputs for Turf.
	 * Internally this uses {@link geojsonType} to judge geometry types.
	 *
	 * @name featureOf
	 * @param {Feature} feature a feature with an expected geometry type
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} error if value is not the expected type.
	 */
	function featureOf(feature, type, name) {
	    if (!feature) {
	        throw new Error("No feature passed");
	    }
	    if (!name) {
	        throw new Error(".featureOf() requires a name");
	    }
	    if (!feature || feature.type !== "Feature" || !feature.geometry) {
	        throw new Error("Invalid input to " + name + ", Feature with geometry required");
	    }
	    if (!feature.geometry || feature.geometry.type !== type) {
	        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
	    }
	}
	exports.featureOf = featureOf;
	/**
	 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
	 * Internally this uses {@link geojsonType} to judge geometry types.
	 *
	 * @name collectionOf
	 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
	 * @param {string} type expected GeoJSON type
	 * @param {string} name name of calling function
	 * @throws {Error} if value is not the expected type.
	 */
	function collectionOf(featureCollection, type, name) {
	    if (!featureCollection) {
	        throw new Error("No featureCollection passed");
	    }
	    if (!name) {
	        throw new Error(".collectionOf() requires a name");
	    }
	    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
	        throw new Error("Invalid input to " + name + ", FeatureCollection required");
	    }
	    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
	        var feature = _a[_i];
	        if (!feature || feature.type !== "Feature" || !feature.geometry) {
	            throw new Error("Invalid input to " + name + ", Feature with geometry required");
	        }
	        if (!feature.geometry || feature.geometry.type !== type) {
	            throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
	        }
	    }
	}
	exports.collectionOf = collectionOf;
	/**
	 * Get Geometry from Feature or Geometry Object
	 *
	 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
	 * @returns {Geometry|null} GeoJSON Geometry Object
	 * @throws {Error} if geojson is not a Feature or Geometry Object
	 * @example
	 * var point = {
	 *   "type": "Feature",
	 *   "properties": {},
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [110, 40]
	 *   }
	 * }
	 * var geom = turf.getGeom(point)
	 * //={"type": "Point", "coordinates": [110, 40]}
	 */
	function getGeom(geojson) {
	    if (geojson.type === "Feature") {
	        return geojson.geometry;
	    }
	    return geojson;
	}
	exports.getGeom = getGeom;
	/**
	 * Get GeoJSON object's type, Geometry type is prioritize.
	 *
	 * @param {GeoJSON} geojson GeoJSON object
	 * @param {string} [name="geojson"] name of the variable to display in error message
	 * @returns {string} GeoJSON type
	 * @example
	 * var point = {
	 *   "type": "Feature",
	 *   "properties": {},
	 *   "geometry": {
	 *     "type": "Point",
	 *     "coordinates": [110, 40]
	 *   }
	 * }
	 * var geom = turf.getType(point)
	 * //="Point"
	 */
	function getType(geojson, name) {
	    if (geojson.type === "FeatureCollection") {
	        return "FeatureCollection";
	    }
	    if (geojson.type === "GeometryCollection") {
	        return "GeometryCollection";
	    }
	    if (geojson.type === "Feature" && geojson.geometry !== null) {
	        return geojson.geometry.type;
	    }
	    return geojson.type;
	}
	exports.getType = getType;
	});

	var distance_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	//http://en.wikipedia.org/wiki/Haversine_formula
	//http://www.movable-type.co.uk/scripts/latlong.html
	/**
	 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
	 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
	 *
	 * @name distance
	 * @param {Coord} from origin point
	 * @param {Coord} to destination point
	 * @param {Object} [options={}] Optional parameters
	 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
	 * @returns {number} distance between the two points
	 * @example
	 * var from = turf.point([-75.343, 39.984]);
	 * var to = turf.point([-75.534, 39.123]);
	 * var options = {units: 'miles'};
	 *
	 * var distance = turf.distance(from, to, options);
	 *
	 * //addToMap
	 * var addToMap = [from, to];
	 * from.properties.distance = distance;
	 * to.properties.distance = distance;
	 */
	function distance(from, to, options) {
	    if (options === void 0) { options = {}; }
	    var coordinates1 = invariant.getCoord(from);
	    var coordinates2 = invariant.getCoord(to);
	    var dLat = helpers.degreesToRadians((coordinates2[1] - coordinates1[1]));
	    var dLon = helpers.degreesToRadians((coordinates2[0] - coordinates1[0]));
	    var lat1 = helpers.degreesToRadians(coordinates1[1]);
	    var lat2 = helpers.degreesToRadians(coordinates2[1]);
	    var a = Math.pow(Math.sin(dLat / 2), 2) +
	        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	    return helpers.radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
	}
	exports.default = distance;
	});

	var distance = /*@__PURE__*/getDefaultExportFromCjs(distance_1);

	function _classCallCheck$2(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties$2(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass$2(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$2(Constructor, staticProps);
	  return Constructor;
	}

	function iconRuler() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"12\" viewBox=\"0 0 22 12\" fill=\"#505050\">\n    <path fill-rule=\"evenodd\" fill=\"none\" d=\"M-1-6h24v24H-1z\"/>\n    <path d=\"M20 0H2C.9 0 0 .9 0 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 10H2V2h2v4h2V2h2v4h2V2h2v4h2V2h2v4h2V2h2v8z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	var LAYER_LINE = 'controls-layer-line';
	var LAYER_SYMBOL = 'controls-layer-symbol';
	var SOURCE_LINE = 'controls-source-line';
	var SOURCE_SYMBOL = 'controls-source-symbol';
	var MAIN_COLOR = '#0000ff'; //'#263238';
	var HALO_COLOR = '#fff';

	function geoLineString() {
	  var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  return {
	    type: 'Feature',
	    properties: {},
	    geometry: {
	      type: 'LineString',
	      coordinates: coordinates
	    }
	  };
	}

	function geoPoint() {
	  var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  return {
	    type: 'FeatureCollection',
	    features: coordinates.map(function (c, i) {
	      return {
	        type: 'Feature',
	        properties: {
	          text: labels[i]
	        },
	        geometry: {
	          type: 'Point',
	          coordinates: c
	        }
	      };
	    })
	  };
	}

	function defaultLabelFormat(number) {
	  if (number < 1) {
	    return "".concat((number * 1000).toFixed(), " m");
	  }

	  return "".concat(number.toFixed(2), " km");
	}
	/**
	 * Fires map `ruler.on` and `ruler.off`events at the beginning and at the end of measuring.
	 * @param {Object} options
	 * @param {String} [options.units='kilometers'] - Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports
	 * @param {Function} [options.labelFormat] - Accepts number and returns label.
	 * Can be used to convert value to any measuring units
	 * @param {Array} [options.font=['Roboto Medium']] - Array of fonts.
	 * @param {String} [options.mainColor='#263238'] - Color of ruler lines.
	 * @param {String} [options.secondaryColor='#fff'] - Color of halo and inner marker background.
	 * @param {String} [options.fontSize='12'] - Label font size
	 * @param {String} [options.fontHalo='1'] - Label font halo
	 */


	var RulerControl = /*#__PURE__*/function () {
	  function RulerControl() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck$2(this, RulerControl);

	    this.isMeasuring = false;
	    this.markers = [];
	    this.coordinates = [];
	    this.labels = [];
	    this.units = options.units || 'kilometers';
	    this.font = options.font || ['Roboto Medium'];
	    this.fontSize = options.fontSize || 12;
	    this.fontHalo = options.fontHalo || 1;
	    this.labelFormat = options.labelFormat || defaultLabelFormat;
	    this.mainColor = options.mainColor || MAIN_COLOR;
	    this.secondaryColor = options.secondaryColor || HALO_COLOR;
	    this.mapClickListener = this.mapClickListener.bind(this);
	    this.styleLoadListener = this.styleLoadListener.bind(this);
	  }

	  _createClass$2(RulerControl, [{
	    key: "insertControls",
	    value: function insertControls() {
	      this.container = document.createElement('div');
	      this.container.classList.add('mapboxgl-ctrl');
	      this.container.classList.add('mapboxgl-ctrl-group');
	      this.container.classList.add('mapboxgl-ctrl-ruler');
	      this.button = document.createElement('button');
	      this.button.setAttribute('type', 'button');
	      this.button.appendChild(iconRuler());
	      this.container.appendChild(this.button);
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.map.addSource(SOURCE_LINE, {
	        type: 'geojson',
	        data: geoLineString(this.coordinates)
	      });
	      this.map.addSource(SOURCE_SYMBOL, {
	        type: 'geojson',
	        data: geoPoint(this.coordinates, this.labels)
	      });
	      this.map.addLayer({
	        id: LAYER_LINE,
	        type: 'line',
	        source: SOURCE_LINE,
	        paint: {
	          'line-color': this.mainColor,
	          'line-width': 2
	        }
	      });
	      this.map.addLayer({
	        id: LAYER_SYMBOL,
	        type: 'symbol',
	        source: SOURCE_SYMBOL,
	        layout: {
	          'text-field': '{text}',
	          'text-font': this.font,
	          'text-anchor': 'top',
	          'text-size': this.fontSize,
	          'text-offset': [0, 0.8]
	        },
	        paint: {
	          'text-color': this.mainColor,
	          'text-halo-color': this.secondaryColor,
	          'text-halo-width': this.fontHalo
	        }
	      });
	    }
	  }, {
	    key: "measuringOn",
	    value: function measuringOn() {
	      this.isMeasuring = true;
	      this.markers = [];
	      this.coordinates = [];
	      this.labels = [];
	      this.map.getCanvas().style.cursor = 'crosshair';
	      this.button.classList.add('-active');
	      this.draw();
	      this.map.on('click', this.mapClickListener);
	      this.map.on('dblclick', this.mapDblClickListener);
	      this.map.on('contextmenu', this.mapContextMenuListener);
	      this.map.on('style.load', this.styleLoadListener);
	      this.map.fire('ruler.on');
	    }
	  }, {
	    key: "measuringOff",
	    value: function measuringOff() {
	      this.isMeasuring = false;
	      this.map.getCanvas().style.cursor = '';
	      this.button.classList.remove('-active'); // remove layers, sources and event listeners

	      this.map.removeLayer(LAYER_LINE);
	      this.map.removeLayer(LAYER_SYMBOL);
	      this.map.removeSource(SOURCE_LINE);
	      this.map.removeSource(SOURCE_SYMBOL);
	      this.markers.forEach(function (m) {
	        return m.remove();
	      });
	      this.map.off('click', this.mapClickListener);
	      this.map.off('style.load', this.styleLoadListener);
	      this.map.fire('ruler.off');
	    }
	  }, {
	    key: "mapClickListener",
	    value: function mapClickListener(event) {
	      var _this = this;
	      var index = this.labels.length;
	      var markerNode = document.createElement('div');
	      markerNode.id = (index+1);
	      markerNode.style.width = '10px';
	      markerNode.style.height = '10px';
	      markerNode.style.borderRadius = '50%';
	      markerNode.style.background = this.secondaryColor;
	      markerNode.style.boxSizing = 'border-box';
	      markerNode.style.border = "2px solid ".concat(this.mainColor);
	      markerNode.style.cursor = 'pointer';
	      var marker = new mapboxgl.Marker({
	        element: markerNode,
	        draggable: true
	      }).setLngLat(event.lngLat).addTo(this.map);

	      markerNode.addEventListener('click', function(e){
	      	e.stopPropagation();
	      	// line point event
	      	console.log("click",this);
	      });

	      markerNode.addEventListener('contextmenu', function(e){
	      	// stop event sending to layer underneath
	      	e.stopPropagation();
	      	// stop context menu showing up
	      	e.preventDefault();
	      	// line point event
	      	//console.log(this.id,_this.labels.length);

	      	// check if is on the last node
	      	if (this.id == _this.labels.length) {
				this.parentElement.removeChild(this);  
				_this.coordinates.pop();
				_this.labels.pop();
				_this.map.getSource(SOURCE_LINE).setData(geoLineString(_this.coordinates));
				_this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(_this.coordinates, _this.labels));
				_this.markers.pop();
	      	}
	      });

	      //console.log(this,this.coordinates);

	      this.coordinates.push([event.lngLat.lng, event.lngLat.lat]);
	      this.labels = this.coordinatesToLabels();
	      this.map.getSource(SOURCE_LINE).setData(geoLineString(this.coordinates));
	      this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(this.coordinates, this.labels));
	      this.markers.push(marker);
	      marker.on('drag', function () {
	        var index = _this.markers.indexOf(marker);

	        var lngLat = marker.getLngLat();
	        _this.coordinates[index] = [lngLat.lng, lngLat.lat];
	        _this.labels = _this.coordinatesToLabels();

	        _this.map.getSource(SOURCE_LINE).setData(geoLineString(_this.coordinates));

	        _this.map.getSource(SOURCE_SYMBOL).setData(geoPoint(_this.coordinates, _this.labels));
	      });
	    }
	  }, {
	    key: "coordinatesToLabels",
	    value: function coordinatesToLabels() {
	      var coordinates = this.coordinates,
	          units = this.units,
	          labelFormat = this.labelFormat;
	      var sum = 0,dis = 0;
	      return coordinates.map(function (coordinate, index) {
	        if (index === 0) return "START";//labelFormat(0);
	        dis = distance(coordinates[index - 1], coordinates[index], {
	          units: units
	        });
	        sum += dis;
	        return labelFormat(sum)+ " (+" +labelFormat(dis)+")"; //labelFormat(sum);
	      });
	    }
	  }, {
	    key: "styleLoadListener",
	    value: function styleLoadListener() {
	      this.draw();
	    }
	  }, {
	    key: "onAdd",
	    value: function onAdd(map) {
	      var _this2 = this;

	      this.map = map;
	      this.insertControls();
	      this.button.addEventListener('click', function () {
	        if (_this2.isMeasuring) {
	          _this2.measuringOff();
	        } else {
	          _this2.measuringOn();
	        }
	      });
	      return this.container;
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove() {
	      if (this.isMeasuring) {
	        this.measuringOff();
	      }

	      this.map.off('click', this.mapClickListener);
	      this.container.parentNode.removeChild(this.container);
	      this.map = undefined;
	    }
	  }, {
	    key: "mapDblClickListener",
	    value: function mapDblClickListener() {
	    	// Map event
	    	console.log("double click!")

	    }
	  }, {
	    key: "mapContextMenuListener",
	    value: function mapContextMenuListener(e) {
	    	// Map event
	    	console.log("context menu!",e.lngLat)
	    }
	  }]);

	  return RulerControl;
	}();


//---------------------------------------------------------------------------------



	function _classCallCheck$5(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties$5(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass$5(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$5(Constructor, staticProps);
	  return Constructor;
	}

	function iconInspect() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	function iconLeft() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M14 7l-5 5 5 5V7z\"/>\n    <path fill=\"none\" d=\"M24 0v24H0V0h24z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	function iconRight() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M10 17l5-5-5-5v10z\"/>\n    <path fill=\"none\" d=\"M0 24V0h24v24H0z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	function featureData(feature) {
	  var props = feature.properties;
	  var data = [{
	    key: '$id',
	    value: feature.layer.id
	  }, {
	    key: '$type',
	    value: feature.layer.type
	  }, {
	    key: 'source',
	    value: feature.layer.source
	  }, {
	    key: 'source-layer',
	    value: feature.layer['source-layer']
	  }];
	  Object.keys(props).forEach(function (key) {
	    data.push({
	      key: key,
	      value: props[key]
	    });
	  });
	  return data;
	}

	function popup(features) {
	  var current = 0;
	  var root = document.createElement('div');
	  root.classList.add('mapboxgl-ctrl-inspect-popup');
	  var content = document.createElement('div');
	  content.classList.add('mapboxgl-ctrl-inspect-content');

	  var templatePrev = function templatePrev() {
	    var button = document.createElement('div');
	    button.setAttribute('type', 'button');
	    button.classList.add('mapboxgl-ctrl-inspect-prev');
	    button.appendChild(iconLeft());
	    button.addEventListener('click', function () {
	      return goTo('-1');
	    });
	    return button;
	  };

	  var templateNext = function templateNext() {
	    var button = document.createElement('div');
	    button.setAttribute('type', 'button');
	    button.classList.add('mapboxgl-ctrl-inspect-next');
	    button.appendChild(iconRight());
	    button.addEventListener('click', function () {
	      return goTo('+1');
	    });
	    return button;
	  };

	  var templateTitle = function templateTitle() {
	    var title = document.createElement('div');
	    title.classList.add('mapboxgl-ctrl-inspect-current');
	    title.textContent = "".concat(current + 1, " / ").concat(features.length);
	    return title;
	  };

	  var templateHeader = function templateHeader() {
	    var header = document.createElement('div');
	    header.classList.add('mapboxgl-ctrl-inspect-header');
	    header.appendChild(templatePrev());
	    header.appendChild(templateTitle());
	    header.appendChild(templateNext());
	    return header;
	  };

	  var templateFeature = function templateFeature(feature) {
	    var table = document.createElement('table');
	    table.classList.add('mapboxgl-ctrl-inspect-feature');
	    var data = featureData(feature);
	    data.forEach(function (prop) {
	      var row = document.createElement('tr');
	      var key = document.createElement('th');
	      var value = document.createElement('td');
	      key.textContent = prop.key;
	      value.textContent = prop.value;
	      row.appendChild(key);
	      row.appendChild(value);
	      table.append(row);
	    });
	    return table;
	  };

	  function goTo(dir) {
	    if (dir === '-1') {
	      current = current !== 0 ? current - 1 : features.length - 1;
	    } else if (dir === '+1') {
	      current = current !== features.length - 1 ? current + 1 : 0;
	    }

	    content.innerHTML = '';
	    content.appendChild(templateHeader());
	    content.appendChild(templateFeature(features[current]));
	  }

	  root.appendChild(content);

	  if (!features.length) {
	    content.textContent = 'No features';
	  } else {
	    if (features.length > 1) {
	      content.appendChild(templateHeader());
	    }

	    content.appendChild(templateFeature(features[current]));
	  }

	  return root;
	}
	/**
	 * Inspect control to debug style layers and source
	 */


	var InspectControl = /*#__PURE__*/function () {
	  function InspectControl() {
	    _classCallCheck$5(this, InspectControl);
	  }

	  _createClass$5(InspectControl, [{
	    key: "insertControls",
	    value: function insertControls() {
	      this.container = document.createElement('div');
	      this.container.classList.add('mapboxgl-ctrl');
	      this.container.classList.add('mapboxgl-ctrl-group');
	      this.container.classList.add('mapboxgl-ctrl-inspect');
	      this.button = document.createElement('button');
	      this.button.setAttribute('type', 'button');
	      this.button.appendChild(iconInspect());
	      this.container.appendChild(this.button);
	      this.popup = null;
	      this.lngLat = null;
	      this.clickListener = this.clickListener.bind(this);
	      this.updatePosition = this.updatePosition.bind(this);
	    }
	  }, {
	    key: "inspectingOn",
	    value: function inspectingOn() {
	      this.isInspecting = true;
	      this.button.classList.add('-active');
	      this.map.on('click', this.clickListener);
	      this.map.on('move', this.updatePosition);
	      this.map.getCanvas().style.cursor = 'pointer';
	    }
	  }, {
	    key: "inspectingOff",
	    value: function inspectingOff() {
	      this.removePopup();
	      this.isInspecting = false;
	      this.button.classList.remove('-active');
	      this.map.off('click', this.clickListener);
	      this.map.off('move', this.updatePosition);
	      this.map.getCanvas().style.cursor = '';
	    }
	  }, {
	    key: "getFeatures",
	    value: function getFeatures(event) {
	      var selectThreshold = 3;
	      var queryBox = [[event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
	      [event.point.x + selectThreshold, event.point.y - selectThreshold] // top right (NE)
	      ];
	      return this.map.queryRenderedFeatures(queryBox);
	    }
	  }, {
	    key: "addPopup",
	    value: function addPopup(features) {
	      this.popup = popup(features);
	      this.mapContainer.appendChild(this.popup);
	      this.updatePosition();
	    }
	  }, {
	    key: "removePopup",
	    value: function removePopup() {
	      if (!this.popup) return;
	      this.mapContainer.removeChild(this.popup);
	      this.popup = null;
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition() {
	      if (!this.lngLat) return;
	      var canvasRect = this.canvas.getBoundingClientRect();
	      var pos = this.map.project(this.lngLat);
	      this.popup.style.left = "".concat(pos.x - canvasRect.left, "px");
	      this.popup.style.top = "".concat(pos.y - canvasRect.top, "px");
	    }
	  }, {
	    key: "clickListener",
	    value: function clickListener(event) {
	      this.lngLat = event.lngLat;
	      var features = this.getFeatures(event);
	      this.removePopup();
	      this.addPopup(features);
	    }
	  }, {
	    key: "onAdd",
	    value: function onAdd(map) {
	      var _this = this;

	      this.map = map;
	      this.mapContainer = this.map.getContainer();
	      this.canvas = this.map.getCanvas();
	      this.isInspecting = false;
	      this.insertControls();
	      this.button.addEventListener('click', function () {
	        if (_this.isInspecting) {
	          _this.inspectingOff();
	        } else {
	          _this.inspectingOn();
	        }
	      });
	      return this.container;
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove() {
	      this.inspectingOff();
	      this.container.parentNode.removeChild(this.container);
	      this.map = undefined;
	    }
	  }]);

	  return InspectControl;
	}();

	function _classCallCheck$6(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties$6(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass$6(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$6(Constructor, staticProps);
	  return Constructor;
	}

	var defaultGetContent = function defaultGetContent(event) {
	  var coords = event.lngLat;
	  return "LngLat: ".concat(coords.lng.toFixed(6), ", ").concat(coords.lat.toFixed(6));
	};

	var mouseMoveEvent = 'mousemove';
	var mapMoveEvent = 'move';
	/**
	 * Shows tooltip on hover on some layer or whole map.
	 * @param {Object} options
	 * @param {String} options.layer - Layer id to show the tooltip on hover.
	 * If not specified, tooltip will be shown for whole map container
	 * @param {Function} [options.getContent] - Triggered each time mouse moved over `layer` option.
	 * Accepts `event` object
	 */

	var TooltipControl = /*#__PURE__*/function () {
	  function TooltipControl() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck$6(this, TooltipControl);

	    this.layer = options.layer;
	    this.getContent = options.getContent || defaultGetContent;
	    this.container = document.createElement('div');
	    this.eventShow = this.layer ? 'mouseenter' : 'mouseover';
	    this.eventHide = this.layer ? 'mouseleave' : 'mouseout';
	    this.node = document.createElement('div');
	    this.node.classList.add('mapboxgl-ctrl-tooltip');
	    this.lngLat = null;
	    this.cursorStyle = '';
	    this.show = this.show.bind(this);
	    this.move = this.move.bind(this);
	    this.hide = this.hide.bind(this);
	    this.updatePosition = this.updatePosition.bind(this);
	  }

	  _createClass$6(TooltipControl, [{
	    key: "show",
	    value: function show() {
	      this.mapContainer.appendChild(this.node);
	      this.cursorStyle = this.canvas.style.cursor;
	      this.canvas.style.cursor = 'pointer';
	      this.map.on(mapMoveEvent, this.updatePosition);
	    }
	  }, {
	    key: "hide",
	    value: function hide() {
	      this.node.innerHTML = '';
	      this.mapContainer.removeChild(this.node);
	      this.canvas.style.cursor = this.cursorStyle;
	      this.map.off(mapMoveEvent, this.updatePosition);
	    }
	  }, {
	    key: "move",
	    value: function move(event) {
	      this.node.innerHTML = this.getContent(event);
	      this.lngLat = event.lngLat;
	      this.updatePosition();
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition() {
	      if (!this.lngLat) return;
	      var pos = this.map.project(this.lngLat);
	      this.node.style.left = "".concat(pos.x, "px");
	      this.node.style.top = "".concat(pos.y, "px");
	    }
	  }, {
	    key: "onAdd",
	    value: function onAdd(map) {
	      this.map = map;
	      this.mapContainer = this.map.getContainer();
	      this.canvas = this.map.getCanvas();

	      if (this.layer) {
	        this.map.on(this.eventShow, this.layer, this.show);
	        this.map.on(mouseMoveEvent, this.layer, this.move);
	        this.map.on(this.eventHide, this.layer, this.hide);
	      } else {
	        this.map.on(this.eventShow, this.show);
	        this.map.on(mouseMoveEvent, this.move);
	        this.map.on(this.eventHide, this.hide);
	      }

	      return this.container;
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove() {
	      if (this.layer) {
	        this.map.off(this.eventShow, this.layer, this.show);
	        this.map.off(mouseMoveEvent, this.layer, this.move);
	        this.map.off(this.eventHide, this.layer, this.hide);
	      } else {
	        this.map.off(this.eventShow, this.show);
	        this.map.off(mouseMoveEvent, this.move);
	        this.map.off(this.eventHide, this.hide);
	      }

	      this.hide();
	      this.map = undefined;
	    }
	  }]);

	  return TooltipControl;
	}();


//===========================================================================================================================


	function _classCallCheck$7(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties$7(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass$7(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties$7(Constructor, staticProps);
	  return Constructor;
	}

	function iconMaptools() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path d=\"M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	function iconUpArrow() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M7 14l 5-5 5 5H7z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	function iconDownArrow() {
	  return (new DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#505050\">\n    <path d=\"M7 9l5 5 5-5H7z\"/>\n</svg>", 'image/svg+xml')).firstChild;
	}

	var MaptoolsControl = /*#__PURE__*/function () {
	  function MaptoolsControl() {
	    _classCallCheck$7(this, MaptoolsControl);
	  }

	  _createClass$7(MaptoolsControl, [{
	    key: "MaptoolsControls",
	    value: function MaptoolsControls() {
	      this.container = document.createElement('div');
	      this.container.classList.add('mapboxgl-ctrl');
	      this.container.classList.add('mapboxgl-ctrl-group');
	      this.container.classList.add('mapboxgl-ctrl-maptools');
	      this.button = document.createElement('button');
	      this.button.setAttribute('type', 'button');
	      this.button.classList.add('maptools-btn');
	      this.button.appendChild(iconDownArrow());
	      this.container.appendChild(this.button);
	      this.draw = new MapboxDraw({displayControlsDefault: false,controls: {point: true,line_string: true,polygon: true,trash: true,combine_features: false,uncombine_features: false}});

	      // this.popup = null;
	      // this.lngLat = null;
	      // this.clickListener = this.clickListener.bind(this);
	      // this.updatePosition = this.updatePosition.bind(this);
	    }
	  }, {
	    key: "MaptoolsOn",
	    value: function MaptoolsOn() {
	      this.isMaptools = true;
	      this.button.classList.add('-active');
	      // this.map.on('click', this.clickListener);
	      // this.map.on('move', this.updatePosition);
	      // this.map.getCanvas().style.cursor = 'pointer';
	      this.button.innerHTML = '';
	      this.button.appendChild(iconUpArrow());
	      this.map.addControl(this.draw, "top-left");
	      //this.draw.appendChild(this.button);
	      document.getElementsByClassName('mapbox-gl-draw_ctrl-draw-btn')[0].parentElement.appendChild(this.button);
	      this.container.style.display = 'none';
	      this.map.fire('maptools.on');
	    }
	  }, {
	    key: "MaptoolsOff",
	    value: function MaptoolsOff() {
	      this.removePopup();
	      this.isMaptools = false;
	      this.button.classList.remove('-active');
	      // this.map.off('click', this.clickListener);
	      // this.map.off('move', this.updatePosition);
	      // this.map.getCanvas().style.cursor = '';
	      this.button.innerHTML = '';
	      this.button.appendChild(iconDownArrow());
	      this.container.style.display = 'block';
	      this.container.appendChild(this.button);
	      this.map.removeControl(this.draw);
	      this.map.fire('maptools.off');
	    }
	  }, {
	    key: "getFeatures",
	    value: function getFeatures(event) {
	      var selectThreshold = 3;
	      var queryBox = [[event.point.x - selectThreshold, event.point.y + selectThreshold], // bottom left (SW)
	      [event.point.x + selectThreshold, event.point.y - selectThreshold] // top right (NE)
	      ];
	      return this.map.queryRenderedFeatures(queryBox);
	    }
	  }, {
	    key: "addPopup",
	    value: function addPopup(features) {
	      this.popup = popup(features);
	      this.mapContainer.appendChild(this.popup);
	      this.updatePosition();
	    }
	  }, {
	    key: "removePopup",
	    value: function removePopup() {
	      if (!this.popup) return;
	      this.mapContainer.removeChild(this.popup);
	      this.popup = null;
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition() {
	      if (!this.lngLat) return;
	      var canvasRect = this.canvas.getBoundingClientRect();
	      var pos = this.map.project(this.lngLat);
	      this.popup.style.left = "".concat(pos.x - canvasRect.left, "px");
	      this.popup.style.top = "".concat(pos.y - canvasRect.top, "px");
	    }
	  }, {
	    key: "clickListener",
	    value: function clickListener(event) {
	      this.lngLat = event.lngLat;
	      var features = this.getFeatures(event);
	      this.removePopup();
	      this.addPopup(features);
	    }
	  }, {
	    key: "onAdd",
	    value: function onAdd(map) {
	      var _this = this;

	      this.map = map;
	      this.mapContainer = this.map.getContainer();
	      this.canvas = this.map.getCanvas();
	      this.isMaptools = false;
	      this.MaptoolsControls();
	      this.button.addEventListener('click', function () {
	        if (_this.isMaptools) {
	          _this.MaptoolsOff();
	        } else {
	          _this.MaptoolsOn();
	        }
	      });
	      return this.container;
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove() {
	      this.MaptoolsOff();
	      this.container.parentNode.removeChild(this.container);
	      this.map = undefined;
	    }
	  }]);

	  return MaptoolsControl;
	}();

//===========================================================================================================================

	// mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmVjb3ciLCJhIjoiY2o1ODEwdWljMThwbTJ5bGk0a294ZmVybiJ9.kErON3w2kwEVxU5aNa-EqQ';

	// const map = new mapboxgl.Map({
	//   container: 'map',
	//   style: 'mapbox://styles/mapbox/streets-v11',
	//   zoom: 14,
	//   center: [30.5234, 50.4501],
	// });
	// const geoJSON = {
	//   type: 'Feature',
	//   geometry: {
	//     type: 'Polygon',
	//     coordinates: [
	//       [
	//         [30.51611423492432, 50.452667766971196],
	//         [30.514655113220215, 50.449006093706274],
	//         [30.516843795776367, 50.44862351447756],
	//         [30.518345832824707, 50.45217591688964],
	//         [30.51611423492432, 50.452667766971196],
	//       ],
	//     ],
	//   },
	// };

	// map.doubleClickZoom.disable();


	let ruler = new RulerControl();
	/* Ruler */
	map.addControl(ruler, 'top-left');

	/* Inspect */
	map.addControl(new InspectControl(), 'top-left');

	// /* Compass */
	// map.addControl(new CompassControl(), 'bottom-right');


	/* Maptools */
	map.addControl(new MaptoolsControl(), 'top-left');



	map.on('load', () => {
	  map.addLayer({
	    id: '$fill',
	    type: 'fill',
	    source: {
	      type: 'geojson',
	      data: geoJSON,
	    },
	    paint: {
	      'fill-opacity': 0.3,
	      'fill-color': '#4264fb',
	    },
	  });
	  map.addLayer({
	    id: '$line',
	    type: 'line',
	    source: {
	      type: 'geojson',
	      data: geoJSON,
	    },
	    paint: {
	      'line-width': 2,
	      'line-color': '#4264fb',
	    },
	  });
	  map.addControl(new TooltipControl({
	    layer: '$fill',
	  }));
	});

map.on('maptools.on', () => {
	console.log("maptools.on",ruler);
	ruler.measuringOff();
});
map.on('maptools.off', () => {
	console.log("maptools.off");
});

map.on('ruler.off', () => {
	console.log("ruler.off");
});

}());



//# sourceMappingURL=docs.bundle.js.map
