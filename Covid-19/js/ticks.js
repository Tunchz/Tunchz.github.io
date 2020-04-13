

// LOADING
//-----------------------------------------------------------------------

// var csvFile				= '../data/public_epiticks.csv'; 
// created by EPITICKS_CLEANING.egp
var csvFile				= '../data/public_epiticks_v2.csv';

// var geojsonFile				= '../data/commune_polygon_1perc.json';

var geojsonFile				= '../data/be-provinces-unk.geo.json';

var geojson, data;
var loading = 2;

d3.json(geojsonFile, function (json) {
	geojson = json;
	if (!--loading) whenLoaded();
});

d3.csv(csvFile, function(csv) { // we should accept ; separated values too
	data = csv;
	if (!--loading) whenLoaded();
});


// $('.tooltip').tooltip();
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})




// WHILE LOADING
//-----------------------------------------------------------------------

// var dateFormat = d3.time.format('%m/%d/%Y');
var dateFormat = d3.time.format('%Y-%m-%d');
// var numberFormat = d3.format('.2f');


/*
RainbowVis-JS 
Released under Eclipse Public License - v 1.0
*/
function Rainbow(){"use strict";var gradients=null;var minNum=0;var maxNum=100;var colours=['ff0000','ffff00','00ff00','0000ff'];setColours(colours);function setColours(spectrum){if(spectrum.length<2){throw new Error('Rainbow must have two or more colours.')}else{var increment=(maxNum-minNum)/(spectrum.length-1);var firstGradient=new ColourGradient();firstGradient.setGradient(spectrum[0],spectrum[1]);firstGradient.setNumberRange(minNum,minNum+increment);gradients=[firstGradient];for(var i=1;i<spectrum.length-1;i+=1){var colourGradient=new ColourGradient();colourGradient.setGradient(spectrum[i],spectrum[i+1]);colourGradient.setNumberRange(minNum+increment*i,minNum+increment*(i+1));gradients[i]=colourGradient}colours=spectrum}}this.setSpectrum=function(){setColours(arguments);return this};this.setSpectrumByArray=function(array){setColours(array);return this};this.colourAt=function(number){if(isNaN(number)){throw new TypeError(number+' is not a number')}else if(gradients.length===1){return gradients[0].colourAt(number)}else{var segment=(maxNum-minNum)/(gradients.length);var index=Math.min(Math.floor((Math.max(number,minNum)-minNum)/segment),gradients.length-1);return gradients[index].colourAt(number)}};this.colorAt=this.colourAt;this.setNumberRange=function(minNumber,maxNumber){if(maxNumber>minNumber){minNum=minNumber;maxNum=maxNumber;setColours(colours)}else{throw new RangeError('maxNumber ('+maxNumber+') is not greater than minNumber ('+minNumber+')')}return this}}function ColourGradient(){"use strict";var startColour='ff0000';var endColour='0000ff';var minNum=0;var maxNum=100;this.setGradient=function(colourStart,colourEnd){startColour=getHexColour(colourStart);endColour=getHexColour(colourEnd)};this.setNumberRange=function(minNumber,maxNumber){if(maxNumber>minNumber){minNum=minNumber;maxNum=maxNumber}else{throw new RangeError('maxNumber ('+maxNumber+') is not greater than minNumber ('+minNumber+')')}};this.colourAt=function(number){return calcHex(number,startColour.substring(0,2),endColour.substring(0,2))+calcHex(number,startColour.substring(2,4),endColour.substring(2,4))+calcHex(number,startColour.substring(4,6),endColour.substring(4,6))};function calcHex(number,channelStart_Base16,channelEnd_Base16){var num=number;if(num<minNum){num=minNum}if(num>maxNum){num=maxNum}var numRange=maxNum-minNum;var cStart_Base10=parseInt(channelStart_Base16,16);var cEnd_Base10=parseInt(channelEnd_Base16,16);var cPerUnit=(cEnd_Base10-cStart_Base10)/numRange;var c_Base10=Math.round(cPerUnit*(num-minNum)+cStart_Base10);return formatHex(c_Base10.toString(16))}function formatHex(hex){if(hex.length===1){return '0'+hex}else{return hex}}function isHexColour(string){var regex=/^#?[0-9a-fA-F]{6}$/i;return regex.test(string)}function getHexColour(string){if(isHexColour(string)){return string.substring(string.length-6,string.length)}else{var name=string.toLowerCase();if(colourNames.hasOwnProperty(name)){return colourNames[name]}throw new Error(string+' is not a valid colour.')}}var colourNames={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgreen:"006400",darkgrey:"A9A9A9",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",green:"008000",greenyellow:"ADFF2F",grey:"808080",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgreen:"90EE90",lightgrey:"D3D3D3",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370DB",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"DB7093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"}}if(typeof module!=='undefined'){module.exports=Rainbow}


// var color1	= '#F57C00';
var colorPrimary	= '#ED7925';

// http://paletton.com/#uid=13y0u0kjx++00++a1+Xsd+BQbMR
var blue2	= '#B5DDFF';
var blue3	= '#6EBDFF';
var blue4	= '#2D9FFE';
var blue5	= '#0578D7';
var blue1	= '#F2F9FF';

var color1	= blue1;
var color2	= blue3;
var color3	= blue2;
var color4	= blue4;
var color5	= blue5;

	// DEFAULT DCJS BLUE COLORS
	// 3182BD
	// 6BAED6
	// 9ECAE1
	// C6DBEF

// var color2	= '#253746';

var numberOfItems = 11;
var rainbow = new Rainbow()
	.setNumberRange(1, numberOfItems)
	.setSpectrum(color1, blue4);
var colorSpectrum = [];
for (var i = 1; i <= numberOfItems; i++) {
    colorSpectrum.push('#'+rainbow.colourAt(i));
}
// console.log('colorSpectrum', colorSpectrum);
// gives:
// #ff0000, #db0000, #b60000, #920000, #6d0000, #490000, #240000, #000000, 

	
	var colorScale = d3.scale.ordinal()
		.domain(['Unknown', 'Missing', 'Other', 'Garden', 'Forest', 'Reserve', 'Field', 'Park'])
		// .range([blue3, blue5, color1, 'lightgrey', 'grey', blue3, blue5, color1])
		.range(['grey', 'grey', 'grey', color2, color3, color4, color5, color3])
		// .range([color3, color4, color5, 'lightgrey', 'grey', color3, color4, color5])
		;

	// var mapColorScale = d3.scale.quantize()
	// 	// .range(["#FFE1CC","#FFD5B7","#FFC9A3","#FFBD8E","#FFB17A","#FFA566","#FF9951","#FF8D3D","#FF8128","#FF7514","#FF6900"])
	// 	.range(colorSpectrum)
	// 	;
	var mapColorScale = d3.scale.linear()
		.range([color1, blue4])
		;


var svgPadding			= 0;
var transitionDuration	= 100;
var thisYear			= new Date().getFullYear();


var marginsRowChart		= {top: 5, left: 5, right: 5, bottom: 20};
var marginsBarChart		= {top: 5, left: 35, right: 15, bottom: 20};

var h5TitleHeight		=  $('h5').outerHeight(true);

var bigMultiplicator = 999999999;
var incidenceround = 1;

/*
188 * 100000/1119088 =
16.79939379209

var bigMultiplicator = 999999;
var incidenceround = 1;
16.799320799320835

var bigMultiplicator = 9999999;
var incidenceround = 1;
16.79939967993995

var bigMultiplicator = 999999999;
var incidenceround = 1;
16.79939388079944

var bigMultiplicator = 1;
var incidenceround = 1000;
16.732000000000042
*/


var baseWidth = $('#graphs').parent().width() - svgPadding;

var topHeight			=  $('h2').outerHeight(true) + $('#dc-data-count').outerHeight(true) + 20;
var viewportHeight		=  document.body.clientHeight;
// console.log('viewportHeight', viewportHeight);
var baseHeight			= ((viewportHeight) / 3 ) - h5TitleHeight - 20;

baseHeight			= Math.max(220, baseHeight);
// console.log('h5TitleHeight', h5TitleHeight);

// console.log('viewportHeight/3 - h5TitleHeight', viewportHeight/3 - h5TitleHeight);
// console.log('baseHeight', baseHeight);

String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};




// AFTER LOADING
//-----------------------------------------------------------------------

function whenLoaded(){
	
	// Environment,Distance,NIS5,Date,ng
	
	data.forEach(function(d,i) {
		d.Distance = +d.Distance;
		d.NIS5 = +d.NIS5;
		
		// d.Env = d.Env.capitalize(true);
		// if (d.Env=="") d.Env="Unknown";
		switch (d.Env) {
			case 'd': d.Env	='Field'		; break;
			case 't': d.Env	='Forest'		; break;
			case 'G': d.Env	='Garden'		; break;
			case 'P': d.Env	='Park'			; break;
			case 'R': d.Env	='Reserve'	; break;
			case 'O': d.Env	='Other'		; break;
			case 'U': d.Env	='Unknown'	; break;
			default: d.Env	='Unknown';
		}
		
		
		d.Date = dateFormat.parse(d.Date);
		d.Date.setTime( d.Date.getTime() + 7 * 86400000 );
		
		switch (d.ng) {
			case 'i': d.ng = 'Anonymous Individuals'; break;
			case 'g': d.ng = 'Anonymous Groups'; break;
			case 'r': d.ng = 'Registered Individuals'; break;
			default: d.ng = 'Unknown';
		}
		
			
		if (d.Distance < 1) { d.dGroup = ' <1km' }
		else if (d.Distance < 5) { d.dGroup = '01–05km' }
		else if (d.Distance < 10) { d.dGroup = '05–10km' }
		else if (d.Distance < 50) { d.dGroup = '10–50km' }
		else if (d.Distance < 100) { d.dGroup = '50–100km' }
		else { d.dGroup = '>100km' }
		
		
		
		d.NIS2 = +d.NIS5.toString().substring(0,2);
		switch (d.NIS2) {
			case 11: d.Province = "Antwerp"; break;
			case 12: d.Province = "Antwerp"; break;
			case 13: d.Province = "Antwerp"; break;
			case 25: d.Province = "Walloon Brabant"; break;
			case 21: d.Province = "Brussels"; break;
			case 51: d.Province = "Hainaut"; break;
			case 52: d.Province = "Hainaut"; break;
			case 53: d.Province = "Hainaut"; break;
			case 54: d.Province = "Hainaut"; break;
			case 55: d.Province = "Hainaut"; break;
			case 56: d.Province = "Hainaut"; break;
			case 57: d.Province = "Hainaut"; break;
			case 71: d.Province = "Limburg"; break;
			case 72: d.Province = "Limburg"; break;
			case 73: d.Province = "Limburg"; break;
			case 61: d.Province = "Liege"; break;
			case 62: d.Province = "Liege"; break;
			case 63: d.Province = "Liege"; break;
			case 64: d.Province = "Liege"; break;
			case 81: d.Province = "Luxembourg"; break;
			case 82: d.Province = "Luxembourg"; break;
			case 83: d.Province = "Luxembourg"; break;
			case 84: d.Province = "Luxembourg"; break;
			case 85: d.Province = "Luxembourg"; break;
			case 91: d.Province = "Namur"; break;
			case 92: d.Province = "Namur"; break;
			case 93: d.Province = "Namur"; break;
			case 41: d.Province = "East Flanders"; break;
			case 42: d.Province = "East Flanders"; break;
			case 43: d.Province = "East Flanders"; break;
			case 44: d.Province = "East Flanders"; break;
			case 45: d.Province = "East Flanders"; break;
			case 46: d.Province = "East Flanders"; break;
			case 23: d.Province = "Flemish Brabant"; break;
			case 24: d.Province = "Flemish Brabant"; break;
			case 31: d.Province = "West Flanders"; break;
			case 32: d.Province = "West Flanders"; break;
			case 33: d.Province = "West Flanders"; break;
			case 34: d.Province = "West Flanders"; break;
			case 35: d.Province = "West Flanders"; break;
			case 36: d.Province = "West Flanders"; break;
			case 37: d.Province = "West Flanders"; break;
			case 38: d.Province = "West Flanders"; break;
			default: d.Province = "Unknown";
		}
		// d.Province = (d.Province).replace('�','è');
		
		
		// d.Region = 'Unknown';
		switch (d.Province) {
			case "Brussels" : d.Region = 'Brussels' ; break;
			case "Antwerp" : d.Region = 'Flemish Region' ; break;
			case "Limburg" : d.Region = 'Flemish Region' ; break;
			case "East Flanders" : d.Region = 'Flemish Region' ; break;
			case "Flemish Brabant" : d.Region = 'Flemish Region' ; break;
			case "West Flanders" : d.Region = 'Flemish Region' ; break;
			case "Walloon Brabant" : d.Region = 'Walloon Region' ; break;
			case "Hainaut" : d.Region = 'Walloon Region' ; break;
			case "Liege" : d.Region = 'Walloon Region' ; break;
			case "Luxembourg" : d.Region = 'Walloon Region' ; break;
			case "Namur" : d.Region = 'Walloon Region' ; break;
			default: d.Region = 'Unknown';
		}
		
		
		// incidence
		switch (d.Province) {
			case "Brussels" : d.incidence = bigMultiplicator * 100000/1119088 ; break;
			case "Antwerp" : d.incidence = bigMultiplicator * 100000/1764773 ; break;
			case "Limburg" : d.incidence = bigMultiplicator * 100000/844621 ; break;
			case "East Flanders" : d.incidence = bigMultiplicator * 100000/1445831 ; break;
			case "Flemish Brabant" : d.incidence = bigMultiplicator * 100000/1086446 ; break;
			case "West Flanders" : d.incidence = bigMultiplicator * 100000/1164967 ; break;
			case "Walloon Brabant" : d.incidence = bigMultiplicator * 100000/382866 ; break;
			case "Hainaut" : d.incidence = bigMultiplicator * 100000/1317284 ; break;
			case "Liege" : d.incidence = bigMultiplicator * 100000/1077203 ; break;
			case "Luxembourg" : d.incidence = bigMultiplicator * 100000/271352 ; break;
			case "Namur" : d.incidence = bigMultiplicator * 100000/476835 ; break;
			default: d.incidence = bigMultiplicator * 1/10;
		}
		// var incidenceround=10000;
		d.incidence = Math.round(incidenceround*d.incidence)/incidenceround;
		
			
			// console.log(d.NIS5.toString().substring(0,2), d.Province);
		// if (i<20) {
		// // if (d.Province=="Unknown") {
		// // 	console.log(d.NIS2, d.NIS5);
		// // 	// console.log(d);
		// 	console.log(d.incidence);
		//  	// console.log(d.NIS5, d.NIS5.toString().substring(0,2));
		// }
		
		switch (d.NIS5) {
			case 11001: d.m = "Aartselaar"; break;	
			case 11002: d.m = "Antwerpen"; break;
			case 11004: d.m = "Boechout"; break;
			case 11005: d.m = "Boom"; break;
			case 11007: d.m = "Borsbeek"; break;
			case 11008: d.m = "Brasschaat"; break;
			case 11009: d.m = "Brecht"; break;
			case 11013: d.m = "Edegem"; break;
			case 11016: d.m = "Essen"; break;
			case 11018: d.m = "Hemiksem"; break;
			case 11021: d.m = "Hove"; break;
			case 11022: d.m = "Kalmthout"; break;
			case 11023: d.m = "Kapellen"; break;
			case 11024: d.m = "Kontich"; break;
			case 11025: d.m = "Lint"; break;
			case 11029: d.m = "Mortsel"; break;
			case 11030: d.m = "Niel"; break;
			case 11035: d.m = "Ranst"; break;
			case 11037: d.m = "Rumst"; break;
			case 11038: d.m = "Schelle"; break;
			case 11039: d.m = "Schilde"; break;
			case 11040: d.m = "Schoten"; break;
			case 11044: d.m = "Stabroek"; break;
			case 11050: d.m = "Wijnegem"; break;
			case 11052: d.m = "Wommelgem"; break;
			case 11053: d.m = "Wuustwezel"; break;
			case 11054: d.m = "Zandhoven"; break;
			case 11055: d.m = "Zoersel"; break;
			case 11056: d.m = "Zwijndrecht"; break;
			case 11057: d.m = "Malle"; break;
			case 12002: d.m = "Berlaar"; break;
			case 12005: d.m = "Bonheiden"; break;
			case 12007: d.m = "Bornem"; break;
			case 12009: d.m = "Duffel"; break;
			case 12014: d.m = "Heist-op-den-Berg"; break;
			case 12021: d.m = "Lier"; break;
			case 12025: d.m = "Mechelen"; break;
			case 12026: d.m = "Nijlen"; break;
			case 12029: d.m = "Putte"; break;
			case 12030: d.m = "Puurs"; break;
			case 12034: d.m = "Sint-Amands"; break;
			case 12035: d.m = "Sint-Katelijne-Waver"; break;
			case 12040: d.m = "Willebroek"; break;
			case 13001: d.m = "Arendonk"; break;
			case 13002: d.m = "Baarle-Hertog"; break;
			case 13003: d.m = "Balen"; break;
			case 13004: d.m = "Beerse"; break;
			case 13006: d.m = "Dessel"; break;
			case 13008: d.m = "Geel"; break;
			case 13010: d.m = "Grobbendonk"; break;
			case 13011: d.m = "Herentals"; break;
			case 13012: d.m = "Herenthout"; break;
			case 13013: d.m = "Herselt"; break;
			case 13014: d.m = "Hoogstraten"; break;
			case 13016: d.m = "Hulshout"; break;
			case 13017: d.m = "Kasterlee"; break;
			case 13019: d.m = "Lille"; break;
			case 13021: d.m = "Meerhout"; break;
			case 13023: d.m = "Merksplas"; break;
			case 13025: d.m = "Mol"; break;
			case 13029: d.m = "Olen"; break;
			case 13031: d.m = "Oud-Turnhout"; break;
			case 13035: d.m = "Ravels"; break;
			case 13036: d.m = "Retie"; break;
			case 13037: d.m = "Rijkevorsel"; break;
			case 13040: d.m = "Turnhout"; break;
			case 13044: d.m = "Vorselaar"; break;
			case 13046: d.m = "Vosselaar"; break;
			case 13049: d.m = "Westerlo"; break;
			case 13053: d.m = "Laakdal"; break;
			case 21001: d.m = "Anderlecht"; break;
			case 21002: d.m = "Oudergem"; break;
			case 21003: d.m = "St-Agatha-Berchem"; break;
			case 21004: d.m = "Bruxelles"; break;
			case 21005: d.m = "Etterbeek"; break;
			case 21006: d.m = "Evere"; break;
			case 21007: d.m = "Forest"; break;
			case 21008: d.m = "Ganshoren"; break;
			case 21009: d.m = "Ixelles"; break;
			case 21010: d.m = "Jette"; break;
			case 21011: d.m = "Koekelberg"; break;
			case 21012: d.m = "St-Jan-Molenbeek"; break;
			case 21013: d.m = "St-Gillis"; break;
			case 21014: d.m = "Saint-Josse-ten-Noode"; break;
			case 21015: d.m = "Schaerbeek"; break;
			case 21016: d.m = "Uccle"; break;
			case 21017: d.m = "Watermael-Boitsfort"; break;
			case 21018: d.m = "St-Lambrechts-Woluwe"; break;
			case 21019: d.m = "St-Pieters-Woluwe"; break;
			case 23002: d.m = "Asse"; break;
			case 23003: d.m = "Beersel"; break;
			case 23009: d.m = "Bever"; break;
			case 23016: d.m = "Dilbeek"; break;
			case 23023: d.m = "Galmaarden"; break;
			case 23024: d.m = "Gooik"; break;
			case 23025: d.m = "Grimbergen"; break;
			case 23027: d.m = "Halle"; break;
			case 23032: d.m = "Herne"; break;
			case 23033: d.m = "Hoeilaart"; break;
			case 23038: d.m = "Kampenhout"; break;
			case 23039: d.m = "Kapelle-op-den-Bos"; break;
			case 23044: d.m = "Liedekerke"; break;
			case 23045: d.m = "Londerzeel"; break;
			case 23047: d.m = "Machelen"; break;
			case 23050: d.m = "Meise"; break;
			case 23052: d.m = "Merchtem"; break;
			case 23060: d.m = "Opwijk"; break;
			case 23062: d.m = "Overijse"; break;
			case 23064: d.m = "Pepingen"; break;
			case 23077: d.m = "Sint-Pieters-Leeuw"; break;
			case 23081: d.m = "Steenokkerzeel"; break;
			case 23086: d.m = "Ternat"; break;
			case 23088: d.m = "Vilvoorde"; break;
			case 23094: d.m = "Zaventem"; break;
			case 23096: d.m = "Zemst"; break;
			case 23097: d.m = "Roosdaal"; break;
			case 23098: d.m = "Drogenbos"; break;
			case 23099: d.m = "Kraainem"; break;
			case 23100: d.m = "Linkebeek"; break;
			case 23101: d.m = "Sint-Genesius-Rode"; break;
			case 23102: d.m = "Wemmel"; break;
			case 23103: d.m = "Wezembeek-Oppem"; break;
			case 23104: d.m = "Lennik"; break;
			case 23105: d.m = "Affligem"; break;
			case 24001: d.m = "Aarschot"; break;
			case 24007: d.m = "Begijnendijk"; break;
			case 24008: d.m = "Bekkevoort"; break;
			case 24009: d.m = "Bertem"; break;
			case 24011: d.m = "Bierbeek"; break;
			case 24014: d.m = "Boortmeerbeek"; break;
			case 24016: d.m = "Boutersem"; break;
			case 24020: d.m = "Diest"; break;
			case 24028: d.m = "Geetbets"; break;
			case 24033: d.m = "Haacht"; break;
			case 24038: d.m = "Herent"; break;
			case 24041: d.m = "Hoegaarden"; break;
			case 24043: d.m = "Holsbeek"; break;
			case 24045: d.m = "Huldenberg"; break;
			case 24048: d.m = "Keerbergen"; break;
			case 24054: d.m = "Kortenaken"; break;
			case 24055: d.m = "Kortenberg"; break;
			case 24059: d.m = "Landen"; break;
			case 24062: d.m = "Leuven"; break;
			case 24066: d.m = "Lubbeek"; break;
			case 24086: d.m = "Oud-Heverlee"; break;
			case 24094: d.m = "Rotselaar"; break;
			case 24104: d.m = "Tervuren"; break;
			case 24107: d.m = "Tienen"; break;
			case 24109: d.m = "Tremelo"; break;
			case 24130: d.m = "Zoutleeuw"; break;
			case 24133: d.m = "Linter"; break;
			case 24134: d.m = "Scherpenheuvel-Zichem"; break;
			case 24135: d.m = "Tielt-Winge"; break;
			case 24137: d.m = "Glabbeek"; break;
			case 25005: d.m = "Beauvechain"; break;
			case 25014: d.m = "Braine-l'Alleud"; break;
			case 25015: d.m = "Braine-le-Château"; break;
			case 25018: d.m = "Chaumont-Gistoux"; break;
			case 25023: d.m = "Court-Saint-Etienne"; break;
			case 25031: d.m = "Genappe"; break;
			case 25037: d.m = "Grez-Doiceau"; break;
			case 25043: d.m = "Incourt"; break;
			case 25044: d.m = "Ittre"; break;
			case 25048: d.m = "Jodoigne"; break;
			case 25050: d.m = "La Hulpe"; break;
			case 25068: d.m = "Mont-Saint-Guibert"; break;
			case 25072: d.m = "Nivelles"; break;
			case 25084: d.m = "Perwez"; break;
			case 25091: d.m = "Rixensart"; break;
			case 25105: d.m = "Tubize"; break;
			case 25107: d.m = "Villers-la-Ville"; break;
			case 25110: d.m = "Waterloo"; break;
			case 25112: d.m = "Wavre"; break;
			case 25117: d.m = "Chastre"; break;
			case 25118: d.m = "Hélécine"; break;
			case 25119: d.m = "Lasne"; break;
			case 25120: d.m = "Orp-Jauche"; break;
			case 25121: d.m = "Ottignies-Louvain-la-Neuve"; break;
			case 25122: d.m = "Ramillies"; break;
			case 25123: d.m = "Rebecq"; break;
			case 25124: d.m = "Walhain"; break;
			case 31003: d.m = "Beernem"; break;
			case 31004: d.m = "Blankenberge"; break;
			case 31005: d.m = "Brugge"; break;
			case 31006: d.m = "Damme"; break;
			case 31012: d.m = "Jabbeke"; break;
			case 31022: d.m = "Oostkamp"; break;
			case 31033: d.m = "Torhout"; break;
			case 31040: d.m = "Zedelgem"; break;
			case 31042: d.m = "Zuienkerke"; break;
			case 31043: d.m = "Knokke-Heist"; break;
			case 32003: d.m = "Diksmuide"; break;
			case 32006: d.m = "Houthulst"; break;
			case 32010: d.m = "Koekelare"; break;
			case 32011: d.m = "Kortemark"; break;
			case 32030: d.m = "Lo-Reninge"; break;
			case 33011: d.m = "Ieper"; break;
			case 33016: d.m = "Mesen"; break;
			case 33021: d.m = "Poperinge"; break;
			case 33029: d.m = "Wervik"; break;
			case 33037: d.m = "Zonnebeke"; break;
			case 33039: d.m = "Heuvelland"; break;
			case 33040: d.m = "Langemark-Poelkapelle"; break;
			case 33041: d.m = "Vleteren"; break;
			case 34002: d.m = "Anzegem"; break;
			case 34003: d.m = "Avelgem"; break;
			case 34009: d.m = "Deerlijk"; break;
			case 34013: d.m = "Harelbeke"; break;
			case 34022: d.m = "Kortrijk"; break;
			case 34023: d.m = "Kuurne"; break;
			case 34025: d.m = "Lendelede"; break;
			case 34027: d.m = "Menen"; break;
			case 34040: d.m = "Waregem"; break;
			case 34041: d.m = "Wevelgem"; break;
			case 34042: d.m = "Zwevegem"; break;
			case 34043: d.m = "Spiere-Helkijn"; break;
			case 35002: d.m = "Bredene"; break;
			case 35005: d.m = "Gistel"; break;
			case 35006: d.m = "Ichtegem"; break;
			case 35011: d.m = "Middelkerke"; break;
			case 35013: d.m = "Oostende"; break;
			case 35014: d.m = "Oudenburg"; break;
			case 35029: d.m = "De Haan"; break;
			case 36006: d.m = "Hooglede"; break;
			case 36007: d.m = "Ingelmunster"; break;
			case 36008: d.m = "Izegem"; break;
			case 36010: d.m = "Ledegem"; break;
			case 36011: d.m = "Lichtervelde"; break;
			case 36012: d.m = "Moorslede"; break;
			case 36015: d.m = "Roeselare"; break;
			case 36019: d.m = "Staden"; break;
			case 37002: d.m = "Dentergem"; break;
			case 37007: d.m = "Meulebeke"; break;
			case 37010: d.m = "Oostrozebeke"; break;
			case 37011: d.m = "Pittem"; break;
			case 37012: d.m = "Ruiselede"; break;
			case 37015: d.m = "Tielt"; break;
			case 37017: d.m = "Wielsbeke"; break;
			case 37018: d.m = "Wingene"; break;
			case 37020: d.m = "Ardooie"; break;
			case 38002: d.m = "Alveringem"; break;
			case 38008: d.m = "De Panne"; break;
			case 38014: d.m = "Koksijde"; break;
			case 38016: d.m = "Nieuwpoort"; break;
			case 38025: d.m = "Veurne"; break;
			case 41002: d.m = "Aalst"; break;
			case 41011: d.m = "Denderleeuw"; break;
			case 41018: d.m = "Geraardsbergen"; break;
			case 41024: d.m = "Haaltert"; break;
			case 41027: d.m = "Herzele"; break;
			case 41034: d.m = "Lede"; break;
			case 41048: d.m = "Ninove"; break;
			case 41063: d.m = "Sint-Lievens-Houtem"; break;
			case 41081: d.m = "Zottegem"; break;
			case 41082: d.m = "Erpe-Mere"; break;
			case 42003: d.m = "Berlare"; break;
			case 42004: d.m = "Buggenhout"; break;
			case 42006: d.m = "Dendermonde"; break;
			case 42008: d.m = "Hamme"; break;
			case 42010: d.m = "Laarne"; break;
			case 42011: d.m = "Lebbeke"; break;
			case 42023: d.m = "Waasmunster"; break;
			case 42025: d.m = "Wetteren"; break;
			case 42026: d.m = "Wichelen"; break;
			case 42028: d.m = "Zele"; break;
			case 43002: d.m = "Assenede"; break;
			case 43005: d.m = "Eeklo"; break;
			case 43007: d.m = "Kaprijke"; break;
			case 43010: d.m = "Maldegem"; break;
			case 43014: d.m = "Sint-Laureins"; break;
			case 43018: d.m = "Zelzate"; break;
			case 44001: d.m = "Aalter"; break;
			case 44011: d.m = "Deinze"; break;
			case 44012: d.m = "De Pinte"; break;
			case 44013: d.m = "Destelbergen"; break;
			case 44019: d.m = "Evergem"; break;
			case 44020: d.m = "Gavere"; break;
			case 44021: d.m = "Gent"; break;
			case 44029: d.m = "Knesselare"; break;
			case 44034: d.m = "Lochristi"; break;
			case 44036: d.m = "Lovendegem"; break;
			case 44040: d.m = "Melle"; break;
			case 44043: d.m = "Merelbeke"; break;
			case 44045: d.m = "Moerbeke"; break;
			case 44048: d.m = "Nazareth"; break;
			case 44049: d.m = "Nevele"; break;
			case 44052: d.m = "Oosterzele"; break;
			case 44064: d.m = "Sint-Martens-Latem"; break;
			case 44072: d.m = "Waarschoot"; break;
			case 44073: d.m = "Wachtebeke"; break;
			case 44080: d.m = "Zomergem"; break;
			case 44081: d.m = "Zulte"; break;
			case 45017: d.m = "Kruishoutem"; break;
			case 45035: d.m = "Oudenaarde"; break;
			case 45041: d.m = "Ronse"; break;
			case 45057: d.m = "Zingem"; break;
			case 45059: d.m = "Brakel"; break;
			case 45060: d.m = "Kluisbergen"; break;
			case 45061: d.m = "Wortegem-Petegem"; break;
			case 45062: d.m = "Horebeke"; break;
			case 45063: d.m = "Lierde"; break;
			case 45064: d.m = "Maarkedal"; break;
			case 45065: d.m = "Zwalm"; break;
			case 46003: d.m = "Beveren"; break;
			case 46013: d.m = "Kruibeke"; break;
			case 46014: d.m = "Lokeren"; break;
			case 46020: d.m = "Sint-Gillis-Waas"; break;
			case 46021: d.m = "Sint-Niklaas"; break;
			case 46024: d.m = "Stekene"; break;
			case 46025: d.m = "Temse"; break;
			case 51004: d.m = "Ath"; break;
			case 51008: d.m = "Beloeil"; break;
			case 51009: d.m = "Bernissart"; break;
			case 51012: d.m = "Brugelette"; break;
			case 51014: d.m = "Chièvres"; break;
			case 51017: d.m = "Ellezelles"; break;
			case 51019: d.m = "Flobecq"; break;
			case 51065: d.m = "Frasnes-lez-Anvaing"; break;
			case 52010: d.m = "Chapelle-lez-Herlaimont"; break;
			case 52011: d.m = "Charleroi"; break;
			case 52012: d.m = "Châtelet"; break;
			case 52015: d.m = "Courcelles"; break;
			case 52018: d.m = "Farciennes"; break;
			case 52021: d.m = "Fleurus"; break;
			case 52022: d.m = "Fontaine-l'Evèque"; break;
			case 52025: d.m = "Gerpinnes"; break;
			case 52043: d.m = "Manage"; break;
			case 52048: d.m = "Montigny-le-Tilleul"; break;
			case 52055: d.m = "Pont-à-Celles"; break;
			case 52063: d.m = "Seneffe"; break;
			case 52074: d.m = "Aiseau-Presles"; break;
			case 52075: d.m = "Les Bons Villers"; break;
			case 53014: d.m = "Boussu"; break;
			case 53020: d.m = "Dour"; break;
			case 53028: d.m = "Frameries"; break;
			case 53039: d.m = "Hensies"; break;
			case 53044: d.m = "Jurbise"; break;
			case 53046: d.m = "Lens"; break;
			case 53053: d.m = "Mons"; break;
			case 53065: d.m = "Quaregnon"; break;
			case 53068: d.m = "Quiévrain"; break;
			case 53070: d.m = "Saint-Ghislain"; break;
			case 53082: d.m = "Colfontaine"; break;
			case 53083: d.m = "Honnelles"; break;
			case 53084: d.m = "Quévy"; break;
			case 54007: d.m = "Mouscron"; break;
			case 54010: d.m = "Comines-Warneton"; break;
			case 55004: d.m = "Braine-le-Comte"; break;
			case 55010: d.m = "Enghien"; break;
			case 55022: d.m = "La Louvière"; break;
			case 55023: d.m = "Lessines"; break;
			case 55035: d.m = "Le Roeulx"; break;
			case 55039: d.m = "Silly"; break;
			case 55040: d.m = "Soignies"; break;
			case 55050: d.m = "Ecaussinnes"; break;
			case 56001: d.m = "Anderlues"; break;
			case 56005: d.m = "Beaumont"; break;
			case 56011: d.m = "Binche"; break;
			case 56016: d.m = "Chimay"; break;
			case 56022: d.m = "Erquelinnes"; break;
			case 56029: d.m = "Froidchapelle"; break;
			case 56044: d.m = "Lobbes"; break;
			case 56049: d.m = "Merbes-le-Château"; break;
			case 56051: d.m = "Momignies"; break;
			case 56078: d.m = "Thuin"; break;
			case 56085: d.m = "Estinnes"; break;
			case 56086: d.m = "Ham-sur-Heure-Nalinnes"; break;
			case 56087: d.m = "Morlanwelz"; break;
			case 56088: d.m = "Sivry-Rance"; break;
			case 57003: d.m = "Antoing"; break;
			case 57018: d.m = "Celles"; break;
			case 57027: d.m = "Estaimpuis"; break;
			case 57062: d.m = "Pecq"; break;
			case 57064: d.m = "Péruwelz"; break;
			case 57072: d.m = "Rumes"; break;
			case 57081: d.m = "Tournai"; break;
			case 57093: d.m = "Brunehaut"; break;
			case 57094: d.m = "Leuze-en-Hainaut"; break;
			case 57095: d.m = "Mont-de-l'Enclus"; break;
			case 61003: d.m = "Amay"; break;
			case 61010: d.m = "Burdinne"; break;
			case 61012: d.m = "Clavier"; break;
			case 61019: d.m = "Ferrières"; break;
			case 61024: d.m = "Hamoir"; break;
			case 61028: d.m = "Héron"; break;
			case 61031: d.m = "Huy"; break;
			case 61039: d.m = "Marchin"; break;
			case 61041: d.m = "Modave"; break;
			case 61043: d.m = "Nandrin"; break;
			case 61048: d.m = "Ouffet"; break;
			case 61063: d.m = "Verlaine"; break;
			case 61068: d.m = "Villers-le-Bouillet"; break;
			case 61072: d.m = "Wanze"; break;
			case 61079: d.m = "Anthisnes"; break;
			case 61080: d.m = "Engis"; break;
			case 61081: d.m = "Tinlot"; break;
			case 62003: d.m = "Ans"; break;
			case 62006: d.m = "Awans"; break;
			case 62009: d.m = "Aywaille"; break;
			case 62011: d.m = "Bassenge"; break;
			case 62015: d.m = "Beyne-Heusay"; break;
			case 62022: d.m = "Chaudfontaine"; break;
			case 62026: d.m = "Comblain-au-Pont"; break;
			case 62027: d.m = "Dalhem"; break;
			case 62032: d.m = "Esneux"; break;
			case 62038: d.m = "Fléron"; break;
			case 62051: d.m = "Herstal"; break;
			case 62060: d.m = "Juprelle"; break;
			case 62063: d.m = "Liege"; break;
			case 62079: d.m = "Oupeye"; break;
			case 62093: d.m = "Saint-Nicolas"; break;
			case 62096: d.m = "Seraing"; break;
			case 62099: d.m = "Soumagne"; break;
			case 62100: d.m = "Sprimont"; break;
			case 62108: d.m = "Visé"; break;
			case 62118: d.m = "Grâce-Hollogne"; break;
			case 62119: d.m = "Blégny"; break;
			case 62120: d.m = "Flémalle"; break;
			case 62121: d.m = "Neupré"; break;
			case 62122: d.m = "Trooz"; break;
			case 63001: d.m = "Amel"; break;
			case 63003: d.m = "Aubel"; break;
			case 63004: d.m = "Baelen"; break;
			case 63012: d.m = "Büllingen"; break;
			case 63013: d.m = "Bütgenbach"; break;
			case 63020: d.m = "Dison"; break;
			case 63023: d.m = "Eupen"; break;
			case 63035: d.m = "Herve"; break;
			case 63038: d.m = "Jalhay"; break;
			case 63040: d.m = "Kelmis"; break;
			case 63045: d.m = "Lierneux"; break;
			case 63046: d.m = "Limbourg"; break;
			case 63048: d.m = "Lontzen"; break;
			case 63049: d.m = "Malmedy"; break;
			case 63057: d.m = "Olne"; break;
			case 63058: d.m = "Pepinster"; break;
			case 63061: d.m = "Raeren"; break;
			case 63067: d.m = "Sankt Vith"; break;
			case 63072: d.m = "Spa"; break;
			case 63073: d.m = "Stavelot"; break;
			case 63075: d.m = "Stoumont"; break;
			case 63076: d.m = "Theux"; break;
			case 63079: d.m = "Verviers"; break;
			case 63080: d.m = "Waimes"; break;
			case 63084: d.m = "Welkenraedt"; break;
			case 63086: d.m = "Trois-Ponts"; break;
			case 63087: d.m = "Burg-Reuland"; break;
			case 63088: d.m = "Plombières"; break;
			case 63089: d.m = "Thimister-Clermont"; break;
			case 64008: d.m = "Berloz"; break;
			case 64015: d.m = "Braives"; break;
			case 64021: d.m = "Crisnée"; break;
			case 64023: d.m = "Donceel"; break;
			case 64025: d.m = "Fexhe-le-Haut-Clocher"; break;
			case 64029: d.m = "Geer"; break;
			case 64034: d.m = "Hannut"; break;
			case 64047: d.m = "Lincent"; break;
			case 64056: d.m = "Oreye"; break;
			case 64063: d.m = "Remicourt"; break;
			case 64065: d.m = "Saint-Georges-sur-Meuse"; break;
			case 64074: d.m = "Waremme"; break;
			case 64075: d.m = "Wasseiges"; break;
			case 64076: d.m = "Faimes"; break;
			case 71002: d.m = "As"; break;
			case 71004: d.m = "Beringen"; break;
			case 71011: d.m = "Diepenbeek"; break;
			case 71016: d.m = "Genk"; break;
			case 71017: d.m = "Gingelom"; break;
			case 71020: d.m = "Halen"; break;
			case 71022: d.m = "Hasselt"; break;
			case 71024: d.m = "Herk-de-Stad"; break;
			case 71034: d.m = "Leopoldsburg"; break;
			case 71037: d.m = "Lummen"; break;
			case 71045: d.m = "Nieuwerkerken"; break;
			case 71047: d.m = "Opglabbeek"; break;
			case 71053: d.m = "Sint-Truiden"; break;
			case 71057: d.m = "Tessenderlo"; break;
			case 71066: d.m = "Zonhoven"; break;
			case 71067: d.m = "Zutendaal"; break;
			case 71069: d.m = "Ham"; break;
			case 71070: d.m = "Heusden-Zolder"; break;
			case 72003: d.m = "Bocholt"; break;
			case 72004: d.m = "Bree"; break;
			case 72018: d.m = "Kinrooi"; break;
			case 72020: d.m = "Lommel"; break;
			case 72021: d.m = "Maaseik"; break;
			case 72025: d.m = "Neerpelt"; break;
			case 72029: d.m = "Overpelt"; break;
			case 72030: d.m = "Peer"; break;
			case 72037: d.m = "Hamont-Achel"; break;
			case 72038: d.m = "Hechtel-Eksel"; break;
			case 72039: d.m = "Houthalen-Helchteren"; break;
			case 72040: d.m = "Meeuwen-Gruitrode"; break;
			case 72041: d.m = "Dilsen-Stokkem"; break;
			case 73001: d.m = "Alken"; break;
			case 73006: d.m = "Bilzen"; break;
			case 73009: d.m = "Borgloon"; break;
			case 73022: d.m = "Heers"; break;
			case 73028: d.m = "Herstappe"; break;
			case 73032: d.m = "Hoeselt"; break;
			case 73040: d.m = "Kortessem"; break;
			case 73042: d.m = "Lanaken"; break;
			case 73066: d.m = "Riemst"; break;
			case 73083: d.m = "Tongeren"; break;
			case 73098: d.m = "Wellen"; break;
			case 73107: d.m = "Maasmechelen"; break;
			case 73109: d.m = "Voeren"; break;
			case 81001: d.m = "Arlon"; break;
			case 81003: d.m = "Attert"; break;
			case 81004: d.m = "Aubange"; break;
			case 81013: d.m = "Martelange"; break;
			case 81015: d.m = "Messancy"; break;
			case 82003: d.m = "Bastogne"; break;
			case 82005: d.m = "Bertogne"; break;
			case 82009: d.m = "Fauvillers"; break;
			case 82014: d.m = "Houffalize"; break;
			case 82032: d.m = "Vielsalm"; break;
			case 82036: d.m = "Vaux-sur-Sûre"; break;
			case 82037: d.m = "Gouvy"; break;
			case 82038: d.m = "Sainte-Ode"; break;
			case 83012: d.m = "Durbuy"; break;
			case 83013: d.m = "Erezée"; break;
			case 83028: d.m = "Hotton"; break;
			case 83031: d.m = "La Roche-en-Ardenne"; break;
			case 83034: d.m = "Marche-en-Famenne"; break;
			case 83040: d.m = "Nassogne"; break;
			case 83044: d.m = "Rendeux"; break;
			case 83049: d.m = "Tenneville"; break;
			case 83055: d.m = "Manhay"; break;
			case 84009: d.m = "Bertrix"; break;
			case 84010: d.m = "Bouillon"; break;
			case 84016: d.m = "Daverdisse"; break;
			case 84029: d.m = "Herbeumont"; break;
			case 84033: d.m = "Léglise"; break;
			case 84035: d.m = "Libin"; break;
			case 84043: d.m = "Neufchâteau"; break;
			case 84050: d.m = "Paliseul"; break;
			case 84059: d.m = "Saint-Hubert"; break;
			case 84068: d.m = "Tellin"; break;
			case 84075: d.m = "Wellin"; break;
			case 84077: d.m = "Libramont-Chevigny"; break;
			case 85007: d.m = "Chiny"; break;
			case 85009: d.m = "Etalle"; break;
			case 85011: d.m = "Florenville"; break;
			case 85024: d.m = "Meix-devant-Virton"; break;
			case 85026: d.m = "Musson"; break;
			case 85034: d.m = "Saint-Léger"; break;
			case 85039: d.m = "Tintigny"; break;
			case 85045: d.m = "Virton"; break;
			case 85046: d.m = "Habay"; break;
			case 85047: d.m = "Rouvroy"; break;
			case 91005: d.m = "Anhée"; break;
			case 91013: d.m = "Beauraing"; break;
			case 91015: d.m = "Bièvre"; break;
			case 91030: d.m = "Ciney"; break;
			case 91034: d.m = "Dinant"; break;
			case 91054: d.m = "Gedinne"; break;
			case 91059: d.m = "Hamois"; break;
			case 91064: d.m = "Havelange"; break;
			case 91072: d.m = "Houyet"; break;
			case 91103: d.m = "Onhaye"; break;
			case 91114: d.m = "Rochefort"; break;
			case 91120: d.m = "Somme-Leuze"; break;
			case 91141: d.m = "Yvoir"; break;
			case 91142: d.m = "Hastière"; break;
			case 91143: d.m = "Vresse-sur-Semois"; break;
			case 92003: d.m = "Andenne"; break;
			case 92006: d.m = "Assesse"; break;
			case 92035: d.m = "Eghezée"; break;
			case 92045: d.m = "Floreffe"; break;
			case 92048: d.m = "Fosses-la-Ville"; break;
			case 92054: d.m = "Gesves"; break;
			case 92087: d.m = "Mettet"; break;
			case 92094: d.m = "Namur"; break;
			case 92097: d.m = "Ohey"; break;
			case 92101: d.m = "Profondeville"; break;
			case 92114: d.m = "Sombreffe"; break;
			case 92137: d.m = "Sambreville"; break;
			case 92138: d.m = "Fernelmont"; break;
			case 92140: d.m = "Jemeppe-sur-Sambre"; break;
			case 92141: d.m = "La Bruyère"; break;
			case 92142: d.m = "Gembloux"; break;
			case 93010: d.m = "Cerfontaine"; break;
			case 93014: d.m = "Couvin"; break;
			case 93018: d.m = "Doische"; break;
			case 93022: d.m = "Florennes"; break;
			case 93056: d.m = "Philippeville"; break;
			case 93088: d.m = "Walcourt"; break;
			case 93090: d.m = "Viroinval"; break;
			default: d.m = "Unknown";
		}
	});
	
	
	
	// DIMENSIONS
	//============================================================================
	var ndx = crossfilter(data);
	var all = ndx.groupAll();
	
	
	
	// CHART FUNCTIONS
	//============================================================================
	
	var titlesRoundedPercentagesF = function(name, value, chart, separator){
		// console.log(name, value, chart, separator);
		var percentage = (value / all.value() * 100);
		var text = name + separator + percentage.toFixed(1) + "%";
		if (percentage>9) text = name + separator + percentage.toFixed(0) + "%";
		if (chart.hasFilter() && !chart.hasFilter(name)) text = name + " - " + "0%";
		return text;
	}
	
	var rowChartF = function(name, dimension, group, width, height){
		var chart = dc.rowChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsRowChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.colors(color2)
			.label(function (d) {
				return d.key;
			})
			.title(function (d) {
				return titlesRoundedPercentagesF(d.key, d.value, chart, ': ');
			})
			.elasticX(true)
			.xAxis().ticks(3)
			;
			
		return chart;
	}
	
	var barChartF_centered = function(name, dimension, group, width, height, min, max){
		var chart = dc.barChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsBarChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.elasticY(true)
			
			.centerBar(true)
			.gap(1)
			.colors(color2)
			
			// .round(dc.round.floor)
			// .alwaysUseRounding(true)
			// If your bar chart has the property .centerBar(true), you should use the following instead:
			.round(function(n) { return Math.floor(n) + 0.5 })
			.alwaysUseRounding(true)
			// .alwaysUseRounding(1)
			
			.x(d3.scale.linear().domain([min, max]))
			.renderHorizontalGridLines(true)
			// .xAxisLabel(['Year'])
			.yAxis().ticks(3)
			;
		chart.xAxis().tickFormat(
			function (v) { return v ; }
		);
		return chart;
	}
	
	var barChartF_categories = function(name, dimension, group, width, height){
		// console.log(name, dimension, group.all(), width, height);
		
		var chart = dc.barChart('#'+name+'-chart');
		
		// https://codepen.io/Tardigrad/pen/MOXgRd
		chart
			.width(width)
			.height(height)
			.margins(marginsBarChart)
			
			.dimension(dimension)
			.group(group)
			
			.x(d3.scale.ordinal())
			.xUnits(dc.units.ordinal)
			
			.transitionDuration(transitionDuration)
			.elasticY(true)
			.colors(color2)
			.brushOn(false)
			.barPadding(0.1)
			.outerPadding(0.05)
			// .xAxisLabel('Fruit')
			// .yAxisLabel('Quantity Sold')
			.title(function (d) {
				return titlesRoundedPercentagesF(d.key, d.value, chart, ': ');
			})
			.renderHorizontalGridLines(true)
			.yAxis().ticks(3)
			
			
			;

      
		return chart;
	}
	
	var barChartF_notcentered = function(name, dimension, group, width, height, min, max){
		// var width = $('#'+name+'-chart').parent().width() - svgPadding;
		
		var chart = dc.barChart('#'+name+'-chart');
		chart
			.width(width)
			.height(height - svgPadding)
			.margins(marginsBarChart)
			.dimension(dimension)
			.group(group)
			.transitionDuration(transitionDuration)
			.elasticY(true)
			// .elasticX(true)
			.centerBar(false)
			.gap(1)
			.colors(color2)
			.round(dc.round.floor)
			.alwaysUseRounding(true)
			.x(d3.scale.linear())
			// .x(d3.scale.linear().domain([min, max]))
			// .x(d3.scale.log().nice().domain([min+0.1, max]))
			.renderHorizontalGridLines(true)
			// .xAxisLabel(['Age'])
			.yAxis().ticks(3)
			// .xAxis().ticks(3)
			;
		chart.xAxis().tickFormat(
			function (v) { return v ; }
		);
		return chart;
	}
	
	var pieChartF = function(name, dimension, group, width, height, colorScale){
		var chart = dc.pieChart('#'+name+'-chart');
		
		var legendWidth = 125;
		// var maxLegendTextLength=0;
		
		// correct for mobile mode, widdth >> height
		var radius = Math.min( width/2 - legendWidth/2, height/2);
		width = 2*radius + legendWidth; // = width in first case, otherwise shorter
	
		chart
			// .width(width) // it's overridden by css  100%, this is a hack for having the pie on the left
			// .height(height)
			// .radius(width/2 - legendWidth/2)
			// .cx(width/2 - legendWidth/2)
			// .cy(width/2 - legendWidth/2)
			// .innerRadius( (width/2 - legendWidth/2) / 2.5)
			
			.width(width) // it's overridden by css  100%, this is a hack for having the pie on the left
			.height(height)
			.radius(radius)
			.cx(radius)
			.cy(radius)
			.innerRadius( radius / 2.5)
			
			.dimension(dimension)
			.group(group)
			// .margins(marginsRowChart)
			.transitionDuration(transitionDuration)
			.colors(colorScale)
			// .colors(d3.scale.quantize().range(["#FFE1CC","#FFD5B7","#FFC9A3","#FFBD8E","#FFB17A","#FFA566","#FF9951","#FF8D3D","#FF8128","#FF7514","#FF6900"]))
			
			// .colorAccessor(function(d, i){return d.value;})
			
			.label(function (d) {
				return d.key.substring(0, 3) + '.';
			})
			.title(function (d) {
				return titlesRoundedPercentagesF(d.key, d.value, chart, ': ');
			})
			// .title(function (d) {
			// 	var percentage = (d.value / all.value() * 100);
			// 	var text = d.key + ': ' + percentage.toFixed(1) + "%";
			// 	if (percentage>9) text = d.key + " - " + percentage.toFixed(0) + "%";
			// 	if (chart.hasFilter() && !chart.hasFilter(d.key)) text = d.key + " - " + "0%";
			// 	return text;
			// })
			.legend(dc.legend()
				.x(width - legendWidth + 5)
				.y(0)
				.itemHeight(12)
				.gap(5)
				.legendText(function (d) {
					// var percentage = (d.data / all.value() * 100);
					// var text = d.name + " - " + percentage.toFixed(1) + "%";
					// if (percentage>9) text = d.name + " - " + percentage.toFixed(0) + "%";
					// if (chart.hasFilter() && !chart.hasFilter(d.name)) text = d.name + " - " + "0%";
					// return text;
					return titlesRoundedPercentagesF(d.name, d.data, chart, ' - ');
				})
				// .autoItemWidth(1).horizontal(1)
				.maxItems(10)
			);
		return chart;
	}
	
	var mapChartF = function(name, dimension, group, width, height){
		// var width = $('#'+name+'-chart').parent().width() - svgPadding;
		
		var chart = dc.geoChoroplethChart('#'+name+'-chart');
		
		chart
			.width(width)
			.height(height)
			.dimension(dimension) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
			.group(group, 'boom xxxx') // set crossfilter group
			.transitionDuration(transitionDuration)
			
			// https://github.com/d3/d3-geo/blob/master/src/projection/conicEqualArea.js
			
			// .projection(d3.geoConicEqualArea()
			// 	.translate([width/2,width/2])
			// 	.center([-1.481, 0.01])
			// 	.scale(4000*(Math.min(width,height))) // changed on 2017-02-17 from .scale(3500*width3)
			// )
			
			// provincies
			.overlayGeoJson(geojson.features, 'province', function(d) {
				return d.properties.name;
			})
			.projection(d3.geo.mercator()
				.translate([width/2,height/2])
				.center([-1.481, 0.01])
				.scale(4000*(Math.min(width,height))) // changed on 2017-02-17 from .scale(3500*width3)
			)

			// municipalities
			// .overlayGeoJson(geojson.features, 'municip', function(d) {
			// 	return d.properties.NAME1;
			// })
			// .projection(d3.geo.mercator()
			// 	.translate([width/2,height/2])
			// 	.center([-1.481, 0.01])
			// 	.scale(0.004*(Math.min(width,height))) // changed on 2017-02-17 from .scale(3500*width3)
			// )
			
// .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
// .legend(dc.legend().x(10).y(10))
			
			// .colors(colorbrewer.RdYlGn[11])
			// http://www.perbang.dk/rgbgradient/
			.colors(mapColorScale)
			// .colors(d3.scale.quantize().range(["#fc8d59","#ffffbf","#99d594"]))
			.title(function(d) {
				// return d.key + ' : ' + Math.round(d.value * 10)/10 + ' Tick bite notifications / 100k inhabitants' ;
				// this rounding (3 combined) 1) remove very little numbers 2) round to 2 figures precision 3) removes scientific notation
				return d.key + ' : ' + parseFloat((Math.round(d.value * 100000) /100000).toPrecision(2)) + ' Notifications / 100k inhabitants' ;
			})
			;
		// dynamic color domains
		chart.on("preRender", function(chart) {
			chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
		});
		chart.on("preRedraw", function(chart) {
			chart.colorDomain(d3.extent(chart.data(), chart.valueAccessor()));
		});
		
		
		// LEGEND -------------
		
		// https://stackoverflow.com/questions/49250107/dc-js-geochoroplethchart-doesnt-display-legend
		
		// chart.legendables = function () {
		// 	return chart.group().all().map(function (d, i) {
		// 		var legendable = {name: d.key, data: d.value, others: d.others, chart: chart};
		// 		legendable.color = chart.colorCalculator()(d.value);
		// 		return legendable;
		// 	});
		// };
		
		chart.legendables = function () {
			var domain = chart.colorDomain();
			return domain.map(function (d, i) {
				var legendable = {name: parseFloat((Math.round(domain[i] * 100000) /100000).toPrecision(2)) , chart: chart};
				if (i==1) legendable.name += ' Notifications / 100k inhabitants';
				legendable.color = chart.colorCalculator()(domain[i]);
				return legendable;
			});
		}; 
		chart.legend(
			dc.legend()
				.x(width/4)
				.y(height*4/5)
				.itemHeight(height/30)
				// .itemWidth(width/25)
				.gap(5)
				// .horizontal(1)
				// .autoItemWidth(1)
		);
		
		
			// .legend(dc.legend()
			// 	.x(width - legendWidth + 5)
			// 	.y(0)
			// 	.itemHeight(12)
			// 	.gap(5)
			// 	.legendText(function (d) {
			// 		// var percentage = (d.data / all.value() * 100);
			// 		// var text = d.name + " - " + percentage.toFixed(1) + "%";
			// 		// if (percentage>9) text = d.name + " - " + percentage.toFixed(0) + "%";
			// 		// if (chart.hasFilter() && !chart.hasFilter(d.name)) text = d.name + " - " + "0%";
			// 		// return text;
			// 		return titlesRoundedPercentagesF(d.name, d.data, chart, ' - ');
			// 	})
			// 	// .autoItemWidth(1).horizontal(1)
			// 	.maxItems(10)
			// );
		
		
		
		return chart;
	}
	
	var lineChartF = function(name, dimension, group, width, height, minDate, maxDate){
		var chart = dc.lineChart('#'+name+'-chart');	
		chart
			.width(width)
			.height(height)
			// .margins({top: 30, right: 40, bottom: 30, left: 40})
			.margins(marginsBarChart)
			.dimension(dimension)
			.group(group, 'Notifications / week')
			
			.x(d3.time.scale().domain([minDate.setMonth(minDate.getMonth()-1), maxDate.setMonth(maxDate.getMonth()+1)]))
			
			// .legend(dc.legend().x(0).y(0).itemHeight(0))
			
			.round(d3.time.month.round) // brush round
			.renderArea(true)
			.transitionDuration(transitionDuration)
			.elasticY(true)
			.renderHorizontalGridLines(true)
			.legend(dc.legend().x(50).y(10).itemHeight(13).gap(5))
			.brushOn(true)
			.mouseZoomable(false)
			.colors(color2)
			// .xAxisLabel('Date of Diagnosis',10)
			.yAxis().ticks(3)
			
		// .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
		
			;
		return chart;
	}
	
	
	
	
	// ! vars & other arrays are now in the .html file !!!
	
		// var vars = ['Environment', 'Distance', 'NotifierGroup', 'NIS5', 'Region', 'Province', 'Date'];
		// var graphs = ['pie', 'bar', 'row', 'map', 'row', 'row', 'line'];
		// var titles = ['Environment', 'Distance', 'NotifierGroup', 'NIS5', 'Region', 'Province', 'Date'];
		// console.log('vars', vars)
		// console.log(graphs);
	
	
	
	var dimensions={};
	var groups={};
	var charts={};
	
	vars.forEach(function(d,i){
			// console.log(d, i);
			// console.log(graphs[i]);
		// dimensions[d]	= ndx.dimension(function (e) { return e[d]; });
		// groups[d]		= dimensions[d].group();
		
		
		// ROW CHARTS
		// --------------------------------------------------------------------
		if ( graphs[i]==='row' ){
			dimensions[d]	= ndx.dimension(function (e) { return e[d]; });
			groups[d]		= dimensions[d].group();
			charts[d] = rowChartF(d, dimensions[d], groups[d], baseWidth/3.1, baseHeight * 1.1);
		}
		
		// PIE CHARTS
		// --------------------------------------------------------------------
		else if ( graphs[i]==='pie' ){
			dimensions[d]	= ndx.dimension(function (e) { return e[d]; });
			groups[d]		= dimensions[d].group();
			var width = $('#'+d+'-chart').parent().width() - svgPadding;
			charts[d] = pieChartF(d, dimensions[d], groups[d], width, baseHeight, colorScale);
		}
		
		// BAR CHARTS
		// --------------------------------------------------------------------
		else if ( graphs[i]==='bar' ){
			// dimensions[d]	= ndx.dimension(function (e) { return e[d]; });
			// groups[d]		= dimensions[d].group();
			// var max = dimensions[d].top(1)[0][d];
			// // max=15;
			// charts[d] = barChartF_notcentered(d, dimensions[d], groups[d], baseWidth/2.05, baseHeight * 0.9 , 0, max);
			
			// d = 'dGroup';
			
			
	
		    // var fruits = 
		    //   [
		    //       {"name": "apple", "cnt": 10},
		    //       {"name": "orange", "cnt": 15},
		    //       {"name": "banana", "cnt": 12},
		    //       {"name": "grape", "cnt": 2},
		    //       {"name": "grape", "cnt": 4},
		    //       {"name": "pear", "cnt": 1},
		    //       {"name": "lime", "cnt": 12},
		    //       {"name": "grape", "cnt": 50}
		    //   ]
		    // ;
		    // var counts = fruits;
		    // var ndx            = crossfilter(counts);
			// dimensions[d]	= ndx.dimension(function(d) {return d.name;});
			// groups[d]       = dimensions[d].group().reduceSum(function(d) {return d.cnt;});

			dimensions[d]	= ndx.dimension(function (e) { return e.dGroup; });
			groups[d]		= dimensions[d].group();
			
			charts[d] = barChartF_categories(d, dimensions[d], groups[d], baseWidth/2.05, baseHeight * 0.9 );
		}
		
		// LINE CHARTS
		// --------------------------------------------------------------------
		else if ( graphs[i]==='line' ){
			dimensions[d]	= ndx.dimension(function (e) { return e[d]; });
			groups[d]		= dimensions[d].group();
			
			// var minDate = d3.min(data, function(d) { return d.Date; });
			// var maxDate = d3.max(data, function(d) { return d.Date; });
			var minDate = dimensions[d].bottom(1)[0][d];
			var maxDate = dimensions[d].top(1)[0][d];
			
			charts[d] = lineChartF(d, dimensions[d], groups[d], baseWidth, baseHeight /2, minDate, maxDate );
		}
		
		// MAP CHARTS
		// --------------------------------------------------------------------
		else if ( graphs[i]==='map' ){
			
			// province
			// dimensions[d] = ndx.dimension(function(e) { return e[d]; });
			dimensions[d] = ndx.dimension(function(e) { return e.Province; });
			groups[d] = dimensions[d].group().reduceSum(function(e) { return e.incidence / bigMultiplicator; });
			
			// municip
			// dimensions[d] = ndx.dimension(function(d) { return d.m; });
			// groups[d] = dimensions[d].group().reduceSum(function(e) { return e.incidence / bigMultiplicator; });
			
			
			// ,provinceGroup = dimensions[d].group().reduce(reduceAddIncidence('province'), reduceRemoveIncidence('province'), reduceInitIncidence)
			// ,provinceGroup = dimensions[d].group()
			// groups[d] = dimensions[d].group().reduceSum(function(e) { return 0.01; });
			
			// window.dim=dimensions[d];
			// window.gr=groups[d];
			// console.log(groups[d].all());
			
			
			// charts[d] = mapChartF(name, dimension, group, width, height)
			charts[d] = mapChartF(d, dimensions[d], groups[d], baseWidth, baseWidth * 0.4);
		}
	});
	
	
	
	
	// DATA COUNT
	//----------------------------------------------------------------------------
	
	dc.dataCount('#dc-data-count')
		.dimension(ndx)
		.group(all)
		// .html({
		// 	some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
		// 		' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
		// 	all: 'All records are selected. Please click on the graphs to apply filters.'
		// })
		.html({
			some: '<a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All Filters</a>',
			all: 'All records are selected. Please click on the graphs to apply filters.'
		})
		;
	
	// dc.renderlet(function(chart) {
	// 	dc.events.trigger(function() {
	// 		// console.log(subjectChart.filters());
	// 		$('#viewFilters').html('');
	// 		if(subjectChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Pathogen</span>=<span class="text-md">' + subjectChart.filters() + '</span> ' );}
	// 		if(dateChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Date</span>=<span class="text-md">[' + formatDate(dateChart.filters()[0][0]) +', '+formatDate(dateChart.filters()[0][1]) + '[</span> ' );}
	// 		if(mapChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Province</span>=<span class="text-md">' + mapChart.filters() + '</span> ' );}
	// 		if(ageChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Age</span>=<span class="text-md">' + ageChart.filters() + '</span> ' );}
	// 		if(genderChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Gender</span>=<span class="text-md">' + genderChart.filters() + '</span> ' );}
	// 		if(subjectChart.filters().length != 0 || dateChart.filters().length != 0 || mapChart.filters().length != 0 || ageChart.filters().length != 0 || genderChart.filters().length != 0){$('#viewFilters').append( '<a href="javascript:dc.filterAll();dc.redrawAll();"><strong>RESET</strong></a>' );}
	// 	});
	// })
	
	
	
	
		// dc.renderlet(function(chart) {
		// 	dc.events.trigger(function() {
		// 		// console.log(subjectChart.filters());
		// 		$('#viewFilters').html('ffff');
				
		// 		if(germChart.filters().length != 0 ){
		// 			console.log('filter')
		// 			$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Pathogen</span>=<span class="text-md">' + germChart.filters() + '</span> ' );
		// 		}
		// 		if(yearChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Date</span>=<span class="text-md">[' + formatDate(yearChart.filters()[0][0]) +', '+formatDate(yearChart.filters()[0][1]) + '[</span> ' );}
		// 		if(SexualOrientationChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Province</span>=<span class="text-md">' + SexualOrientationChart.filters() + '</span> ' );}
		// 		if(ageChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Age</span>=<span class="text-md">' + ageChart.filters() + '</span> ' );}
		// 		if(genderChart.filters().length != 0 ){$('#viewFilters').append( '<i class="fa fa-filter"></i> <span class="text-bg">Gender</span>=<span class="text-md">' + genderChart.filters() + '</span> ' );}
				
		// 		if(germChart.filters().length != 0 || yearChart.filters().length != 0 || SexualOrientationChart.filters().length != 0 || ageChart.filters().length != 0 || genderChart.filters().length != 0) {
		// 			$('#viewFilters').append( '<a href="javascript:dc.filterAll();dc.redrawAll();"><strong>RESET</strong></a>' );
		// 		}
		// 	});
		// })
		
	// LIST FILTERS
	// for (var chart of dc.chartRegistry.list()) { console.log(chart.anchor(), chart.filters())}
	
		
	// RENDER
	//----------------------------------------------------------------------------
	dc.renderAll();
	
}


// function filterChart3(){
// 	// ageChart.filter(dc.filters.RangedFilter(7, 50));
// 	dc.filterAll();
// 	germChart.filter("Gonorrhea");
// 	yearChart.filter(dc.filters.RangedFilter(2014.5, 2015.5));
// 	dc.renderAll();
// 	// $('#graphs-anchor-link').click();
// 	sweetScroll.toElement(document.getElementById("germ-chart"));
// }
// function filterChart4(){
// 	dc.filterAll();
// 	ageChart.filter(dc.filters.RangedFilter(0, 1));
// 	dc.renderAll();
// 	// scrollTo($('#age-chart'));
// 	// $('#graphs-anchor-link').click();
// 	sweetScroll.toElement(document.getElementById("age-chart"));
	
// }