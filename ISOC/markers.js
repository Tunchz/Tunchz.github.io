


// var disaster_type_color = {
//   '91':"#ff0000",
//   '92':"#ff0000",
//   '93':"#ff0000",
//   '94':"#0000ff",
//   '95':"#f6b513",
//   '96':"#f00",
//   '97':"#f00",
//   '98':"#f00",
//   '99':"#f00"
// };

// icon for each disaster type id
var symbol = {'0':{'icon':"0", 'visibility':'visible', 'dbclick':false, 'itemselected':false},
/*1forest*/    '1':{'layername':"forest",    'icon': "❧",    'noti_type':'disaster',   'color':"#a2cc44",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,255,200,1)",  'size':1.6 ,'ispulse':0, 'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_forest.png", 'icon_url':'img/1.png'},
/*2air*/       '2':{'layername':"air",       'icon':"☢",    'noti_type':'disaster',   'color':"#ed207b",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,255,200,1)",  'size':1.4 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_air.png", 'icon_url':'img/2.png'},
/*3landslide*/ '3':{'layername':"landslide", 'icon':"☳",     'noti_type':'disaster',   'color':"#a9753c",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(210,200,255,1)",  'size':1.1 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_landslide.png", 'icon_url':'img/3.png'},
/*4flood*/     '4':{'layername':"flood",     'icon':"♦",      'noti_type':'disaster',   'color':"#3b7dcb",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.2 ,'ispulse':1,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_flood.png", 'icon_url':'img/4.png'},
/*5drought*/   '5':{'layername':"drought",   'icon':"☭",     'noti_type':'disaster',   'color':"#f7c851",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.2 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_drought.png", 'icon_url':'img/5.png'},
/*6fire*/      '6':{'layername':"fire",      'icon':"♨",    'noti_type':'disaster',   'color':"#f47320",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,235,200,1)",  'size':1.2 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_fire.png", 'icon_url':'img/6.png'},
/*7hotspot*/   '7':{'layername':"hotspot",   'icon':"☀",    'noti_type':'disaster',   'color':"#e30713",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,200,200,1)",  'size':1.3 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_hotspot.png", 'icon_url':'img/7.png'},
/*8storm*/     '8':{'layername':"storm",     'icon':"♒",    'noti_type':'disaster',   'color':"#358ba4",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.1 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_highwave.png", 'icon_url':'img/8.png'},
/*9heavyrain*/ '9':{'layername':"heavyrain", 'icon':"☂",    'noti_type':'disaster',   'color':"#33a1d2",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.4 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/marker_heavyrain.png", 'icon_url':'img/9.png'},
/*riskplan*/  '91':{'layername':"risk_forest", 'icon':"█",   'noti_type':'plan',       'color':"#ff0000",'opacity':0.3 ,'visibility':'visible', 'dbclick':false, 'icon_url':'img/91.png'},
/*riskplan*/  '94':{'layername':"risk_flood",  'icon':"█",   'noti_type':'plan',       'color':"#0000ff",'opacity':0.3 ,'visibility':'visible', 'dbclick':false, 'icon_url':'img/94.png'},
/*riskplan*/  '95':{'layername':"risk_drought",'icon':"█",   'noti_type':'plan',       'color':"#f6b513",'opacity':0.3 ,'visibility':'visible', 'dbclick':false, 'icon_url':'img/95.png'},
/*map_subd*/  '61':{'layername':"map_subd",    'icon':"T",   'color':"#a56400",'opacity':1   ,'visibility':'visible', 'dbclick':false},
/*hotspot*/   '62':{'layername':"hotspott",     'icon':"H",   'color':"#f6b513",'opacity':0.3 ,'visibility':'visible', 'dbclick':false}
                }
var drm_list = [1,2,3,4,5,6,7,8,9,91,94,95];
var risknoti_list = [1,2,3,4,5,6,7,8,9];
var riskplan_list = [91,94,95];
var drm_geojson,disaster_risk_list,disaster_risk_list_summary,
    map_geojson_riskplan = {},
    unselectedcolor = "#555",
    zoom = 2,
    map_Xoffset = 0,
    map_Yoffset = 0,
    orientation=0,
    shortnoti = false,
    datapanel_isopen = 0,
    resize = 0,
    move_start = 0,
    startlnglat,
    datapanel = {xw:0.4,xh:0.4};
//var isonMobile = onMobile();


d3.select('#table-container').append('table').attr("id","table_image");
// d3.select('#table-markers-container').append('table').attr("id","table_image_marker");
// d3.select('#vertical-table-markers-container').append('table').attr("id","vertical_table_image_marker");


//initialize();

switchDatapanel(0);
//switchHeadermenu(1);
map.on('movestart', function (){
  if (resize == 0) {
    move_start = 1;
    startlnglat = map.getCenter();
  }
});

map.on('moveend', function (){  
  if (resize == 0 && move_start == 1) {
    console.log("move from ",mapcenter);
    mapcenter.lng += (map.getCenter().lng-startlnglat.lng);
    mapcenter.lat += (map.getCenter().lat-startlnglat.lat );
    console.log("to ",mapcenter);
  } else {
    setTimeout(function (){
      resize = 0; 
      move_start = 0;
    }, 300);    
  }
});

function resizeAdjust() {
  resize = 1;
  //console.log($("#video-container").width(),$("#video-container").height())
  // mapcenter = map.getCenter({offset: [-map_Xoffset, -map_Yoffset]});
  // console.log(mapcenter);
  // mapcenter.lng += map_Xoffset;
  // mapcenter.lat += map_Yoffset;

  if($("#wholecontent").width() < 768) {
    document.getElementById("Text1_").style.display = "none";
    document.getElementById("header-menu-container").style.width = "100vw";
    document.getElementById("data-panel").style.width = "100%";

    if (datapanel_isopen>0) {
      document.getElementById("data-panel").style.display = "block";  
      document.getElementById("vertical-table-container-MAP").style.height = "57px";
      //document.getElementById("menu-container-bottom-right").style.bottom = ($("#wholecontent").height()*0.30+60).toString()+"px";
      document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].style.bottom = ($("#wholecontent").height()*datapanel.xh+60).toString()+"px";
      
      //document.getElementById("data-panel").style.height = ($("#wholecontent").height()*datapanel.xh).toString()+"px";
      document.getElementById("data-panel").style.height = (datapanel_isopen==1) ?  (100*datapanel.xh)+"vh" : ($("#wholecontent").height()-200).toString()+"px";;//"calc(100vh - 180px)";
      map_Yoffset = -$("#data-panel").height()/2+10;// - 20;
    } else {

      document.getElementById("data-panel").style.display = "none";
      document.getElementById("vertical-table-container-MAP").style.height = "70px";
      //document.getElementById("menu-container-bottom-right").style.bottom = "75px";
      document.getElementsByClassName("mapboxgl-ctrl-bottom-right")[0].style.bottom = "75px";
      
      map_Yoffset = -40; //-40;
    }
    map_Xoffset = 0

    document.getElementById("notification-container-right").style.display = "none";
    document.getElementById("notification-container-bottom").style.display = "block";

    $("#data-panel").appendTo("#notification-container-bottom");


    $("#lp-button").appendTo("#menu-container-bottom-right");
    $("#bb-button").appendTo("#menu-container-bottom-right");
    if (!datapanel_isopen) icon = "<icon class='icon-menu'></icon>"; else icon = "<icon class='icon-ellipsis'></icon>";

    if (orientation == 0) {
      //console.log("switch to portrait");
      map.flyTo({
        center: mapcenter, //[101.6673626,13.2808669],
        offset: [map_Xoffset, map_Yoffset],
        //zoom : zoom(z), 
        //speed : flyspeed, 
        //curve : 1, 
        essential: true
      });
    }
    orientation = 1;
  } else {
    document.getElementById("Text1_").style.display = "block";
    document.getElementById("map-panel").style.width = "100%";
    document.getElementById("data-panel").style.height = "100%";
    document.getElementById("notification-container-bottom").style.display = "none";
    document.getElementById("notification-container-right").style.display = "block";

    if (datapanel_isopen>0) {
      // if (datapanel_isopen = 1) {
      //   document.getElementById("header-menu-container").style.width = (100*(1-datapanel.xw)+"vw";
      // } else {
      //   document.getElementById("header-menu-container").style.width = "100vw";
      // }
      document.getElementById("header-menu-container").style.width = "calc("+(100*(1-datapanel.xw))+"vw - 60px)";
      document.getElementById("data-panel").style.display = "block";  
      //document.getElementById("map-panel").style.width = "100%";
      document.getElementById("data-panel").style.width = ($("#wholecontent").width()*datapanel.xw).toString()+"px";
      map_Xoffset = -$("#data-panel").width()/2 - 20;
    } else {
      document.getElementById("header-menu-container").style.width = "calc(100vw - 60px)";
      document.getElementById("data-panel").style.display = "none";
      map_Xoffset = -20;
    }
    map_Yoffset = 10; //-30;

    $("#data-panel").appendTo("#notification-container-right");

    $("#lp-button").appendTo("#menu-container-top-right");
    $("#bb-button").appendTo("#menu-container-top-right");
    //if (datapanel_isopen=0) icon = "<icon class='icon-menu'></icon>"; else icon = "<icon class='icon-ellipsis-vert'></icon>"; 

    if (orientation == 1) {
      //console.log("switch to lanscape");
      map.flyTo({
        center: mapcenter,//[101.6673626,13.2808669],
        offset: [map_Xoffset, map_Yoffset],
        //zoom : zoom(z), 
        //speed : flyspeed, 
        //curve : 1, 
        essential: true
      });
    }
    orientation = 0;
  }

  // Update map menu icon
  //document.getElementById("bb-button").innerHTML = icon;

  map.resize();
}

// function onMobile() {
//   let check = false;
//   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//   return check;
// };




function load_map_layers() {

  $.getJSON('https://tunchz.github.io/ISOC/json/DRM.json', function(drmgeojson) {

    drm_geojson = drmgeojson;

    $.getJSON('https://tunchz.github.io/ISOC/json/mapth_small.json', function(map_geojson) {

      // Add map province outline
      //map_addlayer(map_geojson);

      // Add Risk Plan Layer ----------------------------------------------
      riskplan_list.forEach(function (item, index) {
        //console.log(index,item); 
        // filter : risk plan color for provinces 
        var drm_geojson_riskplan = {"type": "FeatureCollection"};
        drm_geojson_riskplan.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == item});
        prov_color = {};
        for (i = 0; i < drm_geojson_riskplan.features.length; i++) {
          var prov_code = (drm_geojson_riskplan.features[i].properties.val).toString();
          //var riskplan_code = drm_geojson_riskplan.features[i].properties.disaster_type_id - 90;
          var pcolor;
          // Color of each plan risk
          prov_color[prov_code]={
            'disaster_type':drm_geojson_riskplan.features[i].properties.disaster_type,
            'disaster_type_id':drm_geojson_riskplan.features[i].properties.disaster_type_id,
            'disaster_id':drm_geojson_riskplan.features[i].properties.disaster_id
          };
        }

        // filter : risk plan provinces
        map_geojson_riskplan[item] = {"type": "FeatureCollection"}
        map_geojson_riskplan[item].features = $(map_geojson.features).filter(function (i,n){return (typeof prov_color[n.properties.PROVINCE_C] !== 'undefined')});
        //console.log("riskplan ",map_geojson_riskplan);

        //console.log(map_geojson_riskplan[item].features.length);
        // Add color & opacity for risk plan in each province
        for (i = 0; i < map_geojson_riskplan[item].features.length; i++) {
          var prov_c = map_geojson_riskplan[item].features[i].properties.PROVINCE_C;
          map_geojson_riskplan[item].features[i].properties['disaster_type'] = prov_color[prov_c].disaster_type;
          map_geojson_riskplan[item].features[i].properties['disaster_type_id'] = prov_color[prov_c].disaster_type_id;
          map_geojson_riskplan[item].features[i].properties['disaster_id'] = prov_color[prov_c].disaster_id;
          map_geojson_riskplan[item].features[i].properties['color'] = symbol[item].color;//prov_color[prov_c].color;
          map_geojson_riskplan[item].features[i].properties['opacity'] = symbol[item].opacity;
          map_geojson_riskplan[item].features[i].properties['center'] = getCenter(map_geojson_riskplan[item]);
          
        }      
        // Add map with color province corresponding to risk plan
        map_add_polygon(map_geojson_riskplan[item],symbol[item].layername);

      
      });
   

      // Add Risk Notification Layer ----------------------------------------------
      var drm_geojson_filtered = {};
      risknoti_list.forEach(function (item, index) {

        drm_geojson_filtered[item] = {"type": "FeatureCollection"};
        drm_geojson_filtered[item].features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == item});
        // map_add_pulsemarker(drm_geojson_filtered[item],symbol[item].layername,symbol[item].icon,symbol[item].color,symbol[item].outlinecolor,symbol[item].pulsecolor,symbol[item].size,symbol[item].ispulse);
        map_add_custommarker(drm_geojson_filtered[item],symbol[item].layername,symbol[item].marker_url,symbol[item].color,0.15,45);
      });
      


      // Add Risk Notification Layer ----------------------------------------------
      //map_addpiecluster();


      // Build array for table image marker
      var drm = [];
      var disaster_type_id;
      for (i = 0; i < drm_geojson.features.length; i++) {
        drm.push(drm_geojson.features[i].properties);
        disaster_type_id = drm_geojson.features[i].properties.disaster_type_id;
        drm[i]['icon'] = symbol[disaster_type_id].icon;
        drm[i]['icon_url'] = symbol[disaster_type_id].icon_url;
        if (symbol[disaster_type_id].noti_type == 'disaster') {
          drm[i]['color'] = symbol[disaster_type_id].color;
          drm_geojson.features[i].properties['center'] = [0,0];
        } else {
          drm[i]['color'] = symbol[disaster_type_id].color+"66";
          drm_geojson.features[i].properties['center'] = getCenter(map_geojson_riskplan[disaster_type_id]);
        }
        
      }
      //console.log(drm);

      display_table_markers(drm);

      setTimeout(function (){

        var removebutton = document.getElementsByClassName('mgl-layerControl');
        for (i=0;i<removebutton.length;i++) {removebutton[i].parentElement.removeChild(removebutton[i]);}

        map.setStyle('mapbox://styles/mapbox/satellite-v9');
        //display_table_markers(drm);
        firstrun = false;

      }, 1000);

      


    }); //get map_geo_json

  }); //get drm_geo_json

  return true;
}



function getCenter(data) {
  var bounds = {}, coords, point, latitude, longitude,center;
  for (var i = 0; i < data.features.length; i++) {
    coords = data.features[i].geometry.coordinates;

    for (var j = 0; j < coords.length; j++) {
      for (var k = 0; k < coords[j].length; k++) {
        longitude = coords[j][k][0];
        latitude = coords[j][k][1];
        bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
        bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
        bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
        bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
      }
    }
  }
  // center = [0,0];
  // center[0] = (bounds.xMin+bounds.xMax)/2;
  // center[1] = (bounds.yMin+bounds.yMax)/2;
  
  return {"lng":(bounds.xMin+bounds.xMax)/2, "lat":(bounds.yMin+bounds.yMax)/2};  //[(bounds.xMin+bounds.xMax)/2,(bounds.yMin+bounds.yMax)/2];//
}

//==Map Polygon================================================================================================



function map_addlayer(map_geojson) {
    var layername = 'map_th_prov'
    map.on(mapEvent, function () {
      map.addSource(layername, { type: 'geojson', data: map_geojson });
      map.addLayer({
        'id': layername,
        'type': 'fill',
        'source': layername,
        'paint': {
          'fill-color': "#fff",
          'fill-opacity': 0
        }
      });
      map.addLayer({
        'id': layername+'_bound',
        'type': 'line',
        'source': layername,
        'paint': {
          'line-width': 1,
          'line-color': '#fff',//'#2a58c3',
          'line-opacity': 0.5
        }
      });

      map.addLayer({
          id: layername+'_label',
          type: "symbol",
          source: layername,
          layout: {
              "text-field": ['get','PROVINCE_N'],
              "text-font": ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
              "text-size": 10,
              'symbol-placement': "point"
          },
          paint: {
              "text-color": '#fff',
              "text-halo-color": '#000',
              "text-halo-width": 0.5,
              "text-halo-blur": 0,
              'text-opacity':0
          }
      });


    // //Filter map layer
    // map.setFilter('th_prov_bound',["in", "PROVINCE_C", '63','50'])

    // var popup = new mapboxgl.Popup({
    //   offset: 10,
    //   closeButton: false,
    //   closeOnClick: false
    // });

    // map.on('click', layername, function (e) {
    //     map.getCanvas().style.cursor = 'pointer';
    //     //var coordinates = e.features[0].geometry.coordinates.slice();
    //     var prov = e.features[0].properties.PROVINCE_N;
    //      popup
    //       .setLngLat(e.lngLat)
    //       .setHTML(
    //           'จังหวัด : ' + prov
    //       )
    //       .addTo(map);
    // });

    // map.on('mouseenter', layername, function () {
    //   map.getCanvas().style.cursor = 'pointer';
    //   map.setPaintProperty(layername+'_label','text-opacity',1);
    // });

    // map.on('mouseleave', layername, function () {
    //   map.getCanvas().style.cursor = '';
    //   map.setPaintProperty(layername+'_label','text-opacity',0);
    //   //popup.remove();
    // });




    });

  //console.log("map done")
}

function map_add_polygon(map_geojson,layername) {
    //var layername = 'map_th_prov'
    map.on(mapEvent, function () {
      map.addSource(layername, { type: 'geojson', data: map_geojson });
      map.addLayer({
        'id': layername,
        'type': 'fill',
        'source': layername,
          layout: {
              'visibility': 'visible'
          },
        'paint': {
          'fill-color': ['get', 'color'],
          'fill-opacity': ['get', 'opacity']
        }
      });
      map.addLayer({
        'id': layername+'_bound',
        'type': 'line',
        'source': layername,
          layout: {
              'visibility': 'visible'
          },
        'paint': {
          'line-width': 2,
          'line-color': '#fff',
          'line-opacity': 0
        }
      });

      map.addLayer({
          id: layername+'_label',
          type: "symbol",
          source: layername,
          layout: {
              'visibility': 'visible',
              "text-field": ['get','PROVINCE_N'],//"{PROVINCE_N}\n",
              "text-font": ['Open Sans Extrabold', 'Arial Unicode MS Bold'],//["Droid Sans Regular"],
              "text-size": 10,
              'symbol-placement': "point"
          },
          paint: {
              "text-color": '#fff', //["case",["boolean", ["feature-state", "hover"], false],'rgba(255,0,0,0.75)','rgba(0,0,0,0.75)'],
              "text-halo-color": ['get','color'], //["case",["boolean", ["feature-state", "hover"], false],'rgba(255,255,0,0.75)','rgba(255,255,255,0.75)'],
              "text-halo-width": 0.5,
              "text-halo-blur": 0,
          }
      });

      // //Filter map layer
      // map.setFilter('th_prov_bound',["in", "PROVINCE_C", '63','50'])

      var popup = new mapboxgl.Popup(/*{
        offset: 10,
        closeButton: false,
        closeOnClick: false
      }*/);

      map.on('click', layername, function (e) {
          map.getCanvas().style.cursor = 'pointer';
          //var coordinates = e.features[0].geometry.coordinates.slice();
          var a1 = e.features[0].properties.disaster_type
          var a2 = e.features[0].properties.PROVINCE_N;
           popup
            .setLngLat(e.lngLat)
            .setHTML(
                'ภัย : ' + a1 + '<br>จังหวัด : ' + a2
            )
            .addTo(map);
          console.log(e.features[0].properties.disaster_type_id,e.features[0].properties.disaster_id);
          switchUnselectVisibility(e.features[0].properties.disaster_type_id,e.features[0].properties.disaster_id);
          if (datapanel_isopen == 0) switchDatapanel(1);

          //console.log(JSON.parse(e.features[0].properties.center));
          centerMap(JSON.parse(e.features[0].properties.center));

      });

      map.on('mouseenter', layername, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', layername, function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });

      map.on('contextmenu', layername, function (e) {
        switchUnselectVisibility(e.features[0].properties.disaster_type_id);
        map.flyTo({
          center: [101.6673626,13.2808669],
          offset: [map_Xoffset, map_Yoffset],
          zoom : 4.8, 
          speed : flyspeed, 
          curve : 1, 
          essential: true
        });
      });
      

    });

  //console.log("map done")
}


//==Pulsing Marker================================================================================================

function map_add_pulsemarker(data_geojson,layername,marker_text,color_base,color_outline,color_pulse,size,ispulse) {
  //console.log("start",marker_text);
    var framesPerSecond = 30;
    var multiplier = 1;
    var opacity = 1;
    var textSize = 24;

  map.on(mapEvent, function(){
    map.addSource(layername, {
      'type': 'geojson',
      'data': data_geojson
    });

    var baseLayout = {
      'visibility': 'visible',
      'text-field': marker_text,
      'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
      'text-size': Math.round(24*size),
      // 'text-padding': 60,
      'text-allow-overlap': true,
      'text-ignore-placement': true
    }

    map.addLayer({
      'id': layername+'_pulse',
      'type': 'symbol',
      'source': layername,
      'layout': baseLayout,
        'paint': {
            'text-color': color_pulse,
            'text-opacity': ispulse,
        }
    })

    map.addLayer({
      'id': layername,
      'type': 'symbol',
      'source': layername,
      'layout': baseLayout,
        'paint': {
            'text-color': color_base,
            'text-opacity': 1,
            'text-halo-color': "rgba(255,255,255,1)",                  
            'text-halo-width': 1,
            'text-halo-blur': 0
        }
    });

    // if (true) {
    map.addLayer({
        'id': layername+'_label',
        'type': 'symbol',
        'source': layername,
        'layout': {
            'visibility': 'visible',
            'text-field': ['get', 'val'],
            'text-font': ['Roboto Black', 'Arial Unicode MS Bold'],
            'text-ignore-placement': true,
            'text-offset': [0, -1.7*size],
            'text-size': 8
        },
        'paint': {
            'text-color': color_base,
            'text-opacity': 1,
            'text-halo-color': "rgba(255,255,255,1)",                  
            'text-halo-width': 1,
            'text-halo-blur': 0
        }
    });
    // }

    map.setPaintProperty(layername+'_pulse', 'text-color', color_pulse)
    map.setLayoutProperty(layername+'_pulse', 'text-size', 24)

    function pulseMarker(timestamp){
      setTimeout(function() {
        requestAnimationFrame(pulseMarker)

        multiplier += .1;
        opacity -= ( .9 / framesPerSecond );
        textSize += ( Math.round(36*size) / framesPerSecond );

        map.setPaintProperty(layername+'_pulse', 'text-opacity', opacity)
        map.setLayoutProperty(layername+'_pulse', 'text-size', textSize)

        if (opacity <= 0.1) {
          opacity = 1;
          textSize = Math.round(24*size);
        }

      }, 1000 / framesPerSecond );
    }

    if (ispulse) {pulseMarker(0);}

    var popup = new mapboxgl.Popup({
      offset: 10,
      closeButton: false,
      closeOnClick: false
    });


    map.on('click', layername, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var a1 = e.features[0].properties.disaster_type
        var a2 = e.features[0].properties.level_detail;
        console.log(a1,a2)
        //map.flyTo({center: e.features[0].geometry.coordinates});

    });

    map.on('mouseenter', layername, function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var a1 = e.features[0].properties.disaster_type
        var a2 = e.features[0].properties.level_detail;
        var a3 = e.features[0].properties.attr
        var a4 = e.features[0].properties.val;
         popup
          .setLngLat(coordinates)
          .setHTML(
              'ภัย : ' + a1 + '<br>ระดับ : ' + a2 + '<br>'+ a3 +' : ' + a4
          )
          .addTo(map);
    });

    map.on('mouseleave', layername, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });


  })

  //console.log("layer",marker_text);
}

//==CUSTOM MARKER================================================================================================


//map_addcustommarker()


function map_add_custommarker(datageojson,layername,imageurl,textcolor,size,offset) {
  //console.log(datageojson);
  map.on(mapEvent, function () {
      map.loadImage(imageurl,
          function (error, image) {
              if (error) throw error;
              map.addImage(layername+'-icon', image);
              map.addSource(layername, {
                  'type': 'geojson',
                  'data': datageojson
              });
              map.addLayer({
                  'id': layername,
                  'type': 'symbol',
                  'source': layername,
                  'layout': {
                      'visibility': 'visible',
                      'icon-image': layername+'-icon',
                      'icon-size': size,
                      'icon-anchor': 'bottom',
                      'icon-allow-overlap': true
                  },
                  'paint': {
                    'icon-opacity': 1
                  }
              });
              // if (true) {

              map.addLayer({
                  'id': layername+'_label',
                  'type': 'symbol',
                  'source': layername,
                  'layout': {
                      'visibility': 'visible',
                      'text-field': ['get', 'val'],
                      'text-font': ['Roboto Black', 'Arial Unicode MS Bold'],
                      'text-ignore-placement': true,
                      'text-offset': [0, -4.9],
                      'text-size': 8
                  },
                  'paint': {
                      'text-color': textcolor,
                      'text-opacity': 1,
                      'text-halo-color': "rgba(255,255,255,1)",                  
                      'text-halo-width': 1,
                      'text-halo-blur': 0
                  }
              });

              // }
          }
      );


    var popup = new mapboxgl.Popup({
      offset: offset,
      closeButton: false,
      closeOnClick: false
    });

    map.on('click', layername, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var a1 = e.features[0].properties.disaster_type
        var a2 = e.features[0].properties.level_detail;
        console.log(a1,a2)
        switchUnselectVisibility(e.features[0].properties.disaster_type_id,e.features[0].properties.disaster_id);
        if (datapanel_isopen == 0) switchDatapanel(1);
        //console.log(e.features[0].geometry.coordinates.slice());
        centerMap(e.features[0].geometry.coordinates.slice());
    });

    map.on('mouseenter', layername, function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var a1 = e.features[0].properties.disaster_type
        var a2 = e.features[0].properties.level_detail;
        var a3 = e.features[0].properties.attr
        var a4 = e.features[0].properties.val;
         popup
          .setLngLat(coordinates)
          .setHTML(
              'ภัย : ' + a1 + '<br>ระดับ : ' + a2 + '<br>'+ a3 +' : ' + a4
          )
          .addTo(map);
    });

    map.on('mouseleave', layername, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    map.on('contextmenu', layername, function (e) {
      switchUnselectVisibility(e.features[0].properties.disaster_type_id);
      map.flyTo({
        center: [101.6673626,13.2808669],
        offset: [map_Xoffset, map_Yoffset],
        zoom : 4.8, 
        speed : flyspeed, 
        curve : 1, 
        essential: true
      });      
    });

  });

  //console.log("layer", layername)
}



//==CLUSTER================================================================================================


function map_addcluster(layername,url,visibility) {

  //var layername = 'hotspotth';
//  map.on(mapEvent, function () {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource(layername, {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: url, //'https://tunchz.github.io/ISOC/json/hotspotth.geojson',
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
          id: layername + '-cluster',
          type: 'circle',
          source: layername,
          filter: ['has', 'point_count'],
          layout: {
              'visibility': visibility
          },           
          paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#51bbd6',
                  100,
                  '#f1f075',
                  750,
                  '#f28cb1'
              ],
              'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  10,
                  100,
                  13,
                  750,
                  16
              ],
              'circle-stroke-width': 1,
              'circle-stroke-color': '#000',
              'circle-opacity': 0.7          
          }
      });

      map.addLayer({
          id: layername + '-cluster-count',
          type: 'symbol',
          source: layername,
          filter: ['has', 'point_count'],
          layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
              'visibility': visibility
          }
      });

      map.addLayer({
          id: layername + '-unclustered-point',
          type: 'circle',
          source: layername,
          filter: ['!', ['has', 'point_count']],
          layout: {
              'visibility': visibility
          },          
          paint: {
              'circle-color': '#11b4da',
              'circle-radius': 4,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
          }
      });

      // // inspect a cluster on click
      // map.on('click', 'clusters', function (e) {
      //     var features = map.queryRenderedFeatures(e.point, {
      //         layers: ['clusters']
      //     });
      //     var clusterId = features[0].properties.cluster_id;
      //     map.getSource('earthquakes').getClusterExpansionZoom(
      //         clusterId,
      //         function (err, zoom) {
      //             if (err) return;

      //             map.easeTo({
      //                 center: features[0].geometry.coordinates,
      //                 zoom: zoom
      //             });
      //         }
      //     );
      // });

      // var popup = new mapboxgl.Popup({
      //   closeButton: false,
      //   closeOnClick: false
      // });


      // // When a click event occurs on a feature in
      // // the unclustered-point layer, open a popup at
      // // the location of the feature, with
      // // description HTML from its properties.
      // map.on('click', 'unclustered-point', function (e) {
      //     var coordinates = e.features[0].geometry.coordinates.slice();
      //     var mag = e.features[0].properties.mag;
      //     var tsunami;

      //     if (e.features[0].properties.tsunami === 1) {
      //         tsunami = 'yes';
      //     } else {
      //         tsunami = 'no';
      //     }

      //     // Ensure that if the map is zoomed out such that
      //     // multiple copies of the feature are visible, the
      //     // popup appears over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //     }

      //     popup
      //         .setLngLat(coordinates)
      //         .setHTML(
      //             'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
      //         )
      //         .addTo(map);
      // });

      // map.on('mouseenter', 'clusters', function () {
      //     map.getCanvas().style.cursor = 'pointer';
      // });
      // map.on('mouseleave', 'clusters', function () {
      //     map.getCanvas().style.cursor = '';
      // });

      // map.on('mouseenter', 'unclustered-point', function (e) {
      //     map.getCanvas().style.cursor = 'pointer';
      //     var coordinates = e.features[0].geometry.coordinates.slice();
      //     var mag = e.features[0].properties.mag;
      //     var tsunami;

      //     if (e.features[0].properties.tsunami === 1) {
      //         tsunami = 'yes';
      //     } else {
      //         tsunami = 'no';
      //     }

      //     // Ensure that if the map is zoomed out such that
      //     // multiple copies of the feature are visible, the
      //     // popup appears over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      //     }

      //     popup
      //         .setLngLat(coordinates)
      //         .setHTML(
      //             'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
      //         )
      //         .addTo(map);
      // });

      // map.on('mouseleave', 'unclustered-point', function () {
      //     map.getCanvas().style.cursor = '';
      //     popup.remove();
      // });


//  });


}





//==PIE CLUSTER================================================================================================

function map_addpiecluster() {

  $.getJSON('https://tunchz.github.io/ISOC/json/hotspotth.geojson', function(data_hotspot) {

  // filter json
  var data_hotspot_filtered = {};
  data_hotspot_filtered.features = $(data_hotspot.features).filter(function (i,n){return n.properties.mag > 320});
  //console.log(data_filtered);

  // filters for classifying earthquakes into five categories based on magnitude
  var mag1 = ['<', ['get', 'mag'], 150];
  var mag2 = ['all', ['>=', ['get', 'mag'], 150], ['<', ['get', 'mag'], 200]];
  var mag3 = ['all', ['>=', ['get', 'mag'], 200], ['<', ['get', 'mag'], 300]];
  var mag4 = ['all', ['>=', ['get', 'mag'], 300], ['<', ['get', 'mag'], 350]];
  var mag5 = ['>=', ['get', 'mag'], 350];

  // colors to use for the categories
  //var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
  var colors = ['#fed976', '#feb24c', '#ff0', '#fa0', '#f00'];

  map.on(mapEvent, function () {
      // add a clustered GeoJSON source for a sample set of earthquakes
      map.addSource('hotspotth', {
          'type': 'geojson',
          'data': data_hotspot_filtered,
              //'https://tunchz.github.io/ISOC/hotspotth.geojson',
              //'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          'cluster': true,
          'clusterMaxZoom': 20,
          'clusterRadius': 70,
          'clusterProperties': {
              // keep separate counts for each magnitude category in a cluster
              'mag1': ['+', ['case', mag1, 1, 0]],
              'mag2': ['+', ['case', mag2, 1, 0]],
              'mag3': ['+', ['case', mag3, 1, 0]],
              'mag4': ['+', ['case', mag4, 1, 0]],
              'mag5': ['+', ['case', mag5, 1, 0]]
          }
      });



      // circle and symbol layers for rendering individual earthquakes (unclustered points)
      map.addLayer({
          'id': 'hotspot_circle',
          'type': 'circle',
          'source': 'hotspotth',
          'filter': ['!=', 'cluster', true],
          //'filter': ["all",['!=', 'cluster', true],[">", "mag", 300]],
          'paint': {
              'circle-color': [
                  'case',
                  mag1, colors[0],
                  mag2, colors[1],
                  mag3, colors[2],
                  mag4, colors[3],
                  colors[4]
              ],
              'circle-opacity': 1,
              'circle-radius': 8
          }
      });
      map.addLayer({
          'id': 'hotspot_label',
          'type': 'symbol',
          'source': 'hotspotth',
          'filter': ['!=', 'cluster', true],
          //'filter': ["all",['!=', 'cluster', true],[">", "mag", 300]],
          'layout': {
              'text-field': [
                  'number-format',
                  ['get', 'mag'],
                  { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
              ],
              'text-font': ['Roboto Black', 'Arial Unicode MS Bold'],
              'text-offset': [0, -1.5],
              'text-size': 8
          },
          'paint': {
              'text-color': [
                  'case',
                  ['<', ['get', 'mag'], 3],
                  'black',
                  'white'
              ]
          }
      });


      // //Filter map layer
      // map.setFilter('earthquake_label',[">", "mag", 310])


      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mouseenter', 'hotspot_circle', function (e) {
          map.getCanvas().style.cursor = 'pointer';
          var coordinates = e.features[0].geometry.coordinates.slice();
          var a1 = e.features[0].properties.CHANGWAT;
          var a2 = e.features[0].properties.mag;
          popup
            .setLngLat([coordinates[0],coordinates[1]])
            .setHTML(
                'จังหวัด : ' + a1 + '<br>ความสว่าง : ' + a2
            )
            .addTo(map);
      });

      map.on('mouseleave', 'hotspot_circle', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });


      // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
      map.on(mapEvent, function (e) {
          //console.log('map on data : ',e.sourceId,e.isSourceLoaded);
          if (e.sourceId !== 'hotspotth' || !e.isSourceLoaded) return;
          updateMarkers();
      });
      map.on('move', updateMarkers);
      map.on('moveend', updateMarkers);

      setTimeout(function (){
        updateMarkers();
      }, 1000);          
      

      // objects for caching and keeping track of HTML marker objects (for performance)
      var markers = {};
      var markersOnScreen = {};

      function updateMarkers() {
          //console.log('updateMarker call');
          var newMarkers = {};
          var features = map.querySourceFeatures('hotspotth');

          // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
          // and add it to the map if it's not there already
          for (var i = 0; i < features.length; i++) {
              var coords = features[i].geometry.coordinates;
              var props = features[i].properties;
              if (!props.cluster) continue;
              var id = props.cluster_id;

              var marker = markers[id];
              if (!marker) {

                  var el = createDonutChart(props,i);

                  // el.addEventListener('click', function () {
                  //         console.log("click")
                  //         window.alert("click");
                  //     }
                  // );

                  // var popup = new mapboxgl.Popup({
                  //   offset : 22,
                  //   closeButton: false,
                  //   closeOnClick: false
                  // });

                  // // //map.on('mouseenter', 'earthquake_circle', function (e) {
                  // el.addEventListener('mouseenter', function () {
                  //     console.log("mouseenter")
                  //     map.getCanvas().style.cursor = 'pointer';
                  //     //var coordinates = marker.geometry.coordinates.slice();
                  //     // var a1 = "test";
                  //     // var a2 = "cluster marker" + i;
                  //     // popup
                  //     //   .setLngLat(coords)
                  //     //   .setHTML(
                  //     //       'Name : ' + a1 + '<br>Code : ' + a2
                  //     //   )
                  //     //   .addTo(map);
                  // });

                  // //map.on('mouseleave', 'earthquake_circle', function () {
                  // el.addEventListener('mouseleave', function () {
                  //     console.log("mouseleave")
                  //     map.getCanvas().style.cursor = '';
                  //     //popup.remove();
                  // });



                  marker = markers[id] = new mapboxgl.Marker(el).setLngLat(coords);
              }
              newMarkers[id] = marker;

              if (!markersOnScreen[id]) marker.addTo(map);
          }
          // for every marker we've added previously, remove those that are no longer visible
          for (id in markersOnScreen) {
              if (!newMarkers[id]) markersOnScreen[id].remove();
          }
          markersOnScreen = newMarkers;
      }


  });

  // code for creating an SVG donut chart from feature properties
  function createDonutChart(props,index) {
      //console.log('createdDonutChart call')
      var offsets = [];
      var counts = [ props.mag1, props.mag2, props.mag3, props.mag4, props.mag5 ];
      var total = 0;
      for (var i = 0; i < counts.length; i++) {
          offsets.push(total);
          total += counts[i];
      }
      var fontSize = total >= 1000 ? 17 : total >= 100 ? 16 : total >= 10 ? 15 : 14;
      fontSize -= 4;
      var r = total >= 1000 ? 30 : total >= 100 ? 24 : total >= 10 ? 20 : 18;
      r = Math.round(r * 0.7);
      var r0 = Math.round(r * 0.75);
      var w = r * 2;

      var html = '<svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w + 
        '" text-anchor="middle" style="font: ' + fontSize + 'Serithai; display: block; ">';


      for (i = 0; i < counts.length; i++) {
          html += donutSegment( offsets[i] / total, (offsets[i] + counts[i]) / total, (r-1), (r0-1), colors[i]
          );
      }
      html += '<circle cx="' + r + '" cy="' + r + '" r="' + (r0-1) + 
          '"stroke="black" stroke-width="1" fill="white" stroke-opacity="0.1" opacity="0.7" /><text dominant-baseline="central" transform="translate(' + r + ', ' + r + ')">' + total.toLocaleString() + '</text></svg>';

      // var el = document.createElement('div');
      // el.id = 'cluster_marker-'+index;
      // el.innerHTML = html;

                  var el = document.createElement('div');
                  el.id = 'cluster_marker-'+i;
                  el.style.width = w +'px';
                  el.style.height = w +'px';
                  el.innerHTML = html;                    
                  //console.log(el.innerHTML)


      return el;
  }

  function donutSegment(start, end, r, r0, color) {

      if (end - start === 1) end -= 0.00001;
      var a0 = 2 * Math.PI * (start - 0.25);
      var a1 = 2 * Math.PI * (end - 0.25);
      var x0 = Math.cos(a0),
          y0 = Math.sin(a0);
      var x1 = Math.cos(a1),
          y1 = Math.sin(a1);
      var largeArc = end - start > 0.5 ? 1 : 0;

      return [ '<path stroke="white" d="M', r + r0 * x0 +1, r + r0 * y0 +1, 'L', r + r * x0 +1, r + r * y0 +1, 'A', (r), (r), 0,
          largeArc, 1, r + r * x1 +1, r + r * y1 +1, 'L', r + r0 * x1 +1, r + r0 * y1 +1, 'A', (r0), (r0), 0, 
          largeArc, 0, r + r0 * x0 +1, r + r0 * y0 +1, '" fill="' + color + '" stroke-opacity="0.1" opacity="0.7" />' ].join(' ');
  }
  });

}


//=== Table Image Marker ===============================================================================================================


//tabulateimg_marker(disaster_risk_list_summary, ["icon","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
function tabulateimg_marker(data, columns) {

  var table = d3.select('#table-markers-container').append('table').attr("id","table_image_marker");

  //var thead = table.append('thead')
  var tbody = table.append('tbody');
  var dummy = [];

  for (t=0; t<data.length; t++) {
    data[t].row_no = t;
  }
  columns.push('row_no');

  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .append('div')
    .attr('class','table_row_marker')
    .attr('id',function(d) {return 'table_row_marker_'+d.disaster_type_id});

  // create a cell in each row for each column

  //------ 1st column section ------------------------------------------------------------------  
  var img_cells = rows.selectAll('td')
    .data(function (row) { //console.log("row",row);
      return [columns[0]].map(function (column) {//console.log("col",column);
        return {column: column, value: row[column], color:row[columns[9]], disaster_type: row["disaster_type_id"]};
      });
    })
    .enter()
    .append('td')
    .attr("class","img_col_marker")
    .append('img')//'div')
    .attr('class', function (d) {return'table_img_marker_container image_marker_'+ d.disaster_type})
    .attr('src', function(d) {return d.column == columns[0] ?  d.value : null;})
    //.style('background-image', "url('https://tunchz.github.io/ISOC/img/1.png')")
    .style("border",function (d) {return (d.color.length != 9) ? "3px solid " + d.color : "3px solid " + d.color.substr(0,7);})
    // .append('th')
    //     .attr('class', 'marker_icon')
    //     .text(function(d) {return d.column == columns[0] ?  d.value : null;})
    //     .style("color",function (d) {return d.color})


    ;

  //------ 2nd column section ------------------------------------------------------------------  
  var cells = rows.selectAll('td')
    .data(function (row) {
      //console.log(row);
      return ['img','detail'].map(function (column) {
        var dt = {};
        for (m=1; m < 4 /*columns.length*/; m++) {
          if (columns[m] == 'id') {
            if ((row[columns[m]].substr(0,7)) != 'unknown') {
              dt[columns[m]] = facelabels[parseInt(row[columns[m]])].name;
            } else {
              dt[columns[m]] = row[columns[m]];
            }
            
          } else {
            dt[columns[m]] = row[columns[m]];
          }
          dt[columns[9]] = row[columns[9]];
        }
        //console.log(dt);
        return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
      });
    })
    .enter()
    .append('td').attr("class","tag_col_marker")
    .append('table').attr("id","tag_table_marker");

    var cthead = cells.append('thead')
    var ctbody = cells.append('tbody');

    // Display detail as table header
    cthead.append('tr')
      .selectAll('th')
      .data(function (d) {return [{tag:d.value[columns[1]], color:d.value[columns[9]]}]})
      .enter()
      .append('div')
        .attr('class', 'tag_marker_bg')
        .style("background-color",function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})
        //.style("border",function (d) {return "1px solid " + d.color; /*console.log("color",d.color)*/})
      .append('th')
        .attr('class', 'tag_marker')
        .text(function (d) {return d.tag })
        .style("color", "#fff" /*function (d) {return d.color}*/)

    // Display subdetail as table row 
    var crows = ctbody.selectAll('tr')
      .data(function (d) {return [{value:d.value[columns[2]],color:d.value[columns[9]],value:d.value[columns[3]],color:d.value[columns[9]]}]})
      .enter()
      .append('tr')
      .append('th')
        .attr('class', 'subtag_marker')
        .text(function (d) {return (typeof d.value !== 'undefined') ? d.value : columns[3] /*"\u00a0"*/})
        .style("color", function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})

  // //------ 3rd column section ------------------------------------------------------------------         
  // var cells2 = rows.selectAll('td')
  //   .data(function (row) {
  //     //console.log(row);
  //     return ['img','detail','tag'].map(function (column) {
  //       var dt = {};
  //       for (m=4; m<columns.length; m++) {
  //         /*if (m == 7) {
  //           dt['row_no'] = row['row_no'];
  //         } else if (columns[m] == 'lat') {
  //           dt[columns[m]] = '●';
  //         } else {
  //           dt[columns[m]] = row[columns[m]];
  //         } */    
  //         dt[columns[m]] = row[columns[m]];
  //       }
  //       //console.log(dt);
  //       return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
  //     });
  //   })
  //   .enter()
  //   .append('td').attr("class","detail_col_marker")
  //   .append('table').attr("id","detail_table_marker");

  //   var cthead2 = cells2.append('thead')
  //   var ctbody2 = cells2.append('tbody');

  //   // Display detail as table header
  //   cthead2.append('tr')
  //     .selectAll('th')
  //     .data(function (d) {/*console.log(d.value[columns[1]]);*/ return d.value[columns[4]]==d.value[columns[5]]?[d.value[columns[4]]]:[d.value[columns[4]]+" - "+d.value[columns[5]]]})
  //     .enter()
  //     .append('th')
  //       .attr('class', 'detail_marker')
  //       .text(function (column) {return column })

  //   // Display subdetail as table row 
  //   var crows2 = ctbody2.selectAll('tr')
  //     .data(function (d) {return [{value : d.value[columns[6]], name : "mood", row : d.value[columns[9]]},{value : d.value[columns[7]], name : "status", row : d.value[columns[9]], detection : d.value[columns[8]]}]})
  //     .enter()
  //     .append('tr')
  //     .append('th')
  //       .attr('id',function(d) {/*console.log(d);*/return 'subtag-'+d.row+'-'+d.name})
  //       .attr('class', 'subdetail_marker')
  //       .text(function (column) {return column.name == "mood"? column.value : column.detection + "" + column.value/*(column.value == 'succeeded'|column.value == 'unknown' ? '✔': column.value == 'failed' ? '✘': '❗' )*/})
  //       .style("color", function (d) {return (d.row.length != 9) ? d.row : d.row.substr(0,7);})
/*
    if (data[t].status == 'succeeded') {
      data[t].status = '✔';
    } else if (data[t].status == 'failed') {
      data[t].status = '✘';
    } else {
      data[t].status = '❗';
    }

*/



    // if (true) {


      // map.addLayer({
      //   'id': layername,
      //   'type': 'fill',
      //   'source': layername,
      //   'paint': {
      //     'fill-color': ['get', 'color'],
      //     'fill-opacity': ['get', 'opacity']
      //   }
      // });
      // map.addLayer({
      //   'id': layername+'_bound',
      //   'type': 'line',
      //   'source': layername,
      //   'paint': {
      //     'line-width': 2,
      //     'line-color': '#fff',
      //     'line-opacity': 0


  d3.select("#table-markers-container").selectAll(".table_row_marker")
    .on('mouseover', function(e) {
      if (!symbol[0].selecteditem) switchZoomLayer(e.disaster_type_id,true);
    })
    .on('mouseout', function(e) { 
      if (!symbol[0].selecteditem) switchZoomLayer(e.disaster_type_id,false);
    })
    .on('dblclick', function(e) { })
    .on('click', function(e) {  
      switchUnselectVisibility(e.disaster_type_id);
    })
    .on('contextmenu', function(e) { 
      switchLayerVisibility(e.disaster_type_id);
    });

  return table;
}
//=== Vertical Table Image Marker ===============================================================================================================


// tabulateimg(List_filtered, ["img","id","dept","date","timein","last","mood","status","detection"]);
function vertabulateimg_marker(data, columns) {

  var table = d3.select('#vertical-table-markers-container').append('table').attr("id","vertical_table_image_marker");

  //var thead = table.append('thead')
  var tbody = table.append('tbody');
  var dummy = [];

  for (t=0; t<data.length; t++) {
    data[t].row_no = t;
  }
  columns.push('row_no');

  var rows = tbody.selectAll('td')
    .data(data)
    .enter()
    .append('td')
    .append('div')
    .attr('class','table_col_marker')
    .attr('id',function(d) {return 'table_col_marker_'+d.disaster_type_id});
    //.style("width","100px")
  

  // create a cell in each row for each column

  //------ 1st column section ------------------------------------------------------------------  
  var img_cells = rows.selectAll('td')
    .data(function (row) { //console.log("row",row);
      return [columns[0]].map(function (column) {//console.log("col",column);
        return {column: column, value: row[column], color:row[columns[9]], disaster_type:row['disaster_type_id']};
      });
    })
    .enter()
    .append('td')
    .attr("class","img_col_marker")
    .append('img')//'div')
    .attr('class', function (d) {return'table_img_marker_container image_marker_'+ d.disaster_type})
    .attr('src', function(d) {return d.column == columns[0] ?  d.value : null;})
    .style("border",function (d) {return (d.color.length != 9) ? "3px solid " + d.color : "3px solid " + d.color.substr(0,7);})
    // .append('th')
    //     .attr('class', 'marker_icon')
    //     .text(function(d) {return d.column == columns[0] ?  d.value : null;})
    //     .style("color",function (d) {return d.color})


    ;

  //------ 2nd column section ------------------------------------------------------------------  
  var cells = rows.selectAll('td')
    .data(function (row) {
      //console.log(row);
      return ['img','detail'].map(function (column) {
        var dt = {};
        for (m=1; m < 4 /*columns.length*/; m++) {
          if (columns[m] == 'id') {
            if ((row[columns[m]].substr(0,7)) != 'unknown') {
              dt[columns[m]] = facelabels[parseInt(row[columns[m]])].name;
            } else {
              dt[columns[m]] = row[columns[m]];
            }
            
          } else {
            dt[columns[m]] = row[columns[m]];
          }
          dt[columns[9]] = row[columns[9]];
        }
        //console.log(dt);
        return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
      });
    })
    .enter()
    .append('td').attr("class","tag_col_marker")
    .append('table').attr("id","tag_table_marker");

    var cthead = cells.append('thead')
    var ctbody = cells.append('tbody');

    // Display detail as table header
    cthead.append('tr')
      .selectAll('th')
      .data(function (d) {return [{tag:d.value[columns[1]], color:d.value[columns[9]]}]})
      .enter()
      .append('div')
        .attr('class', 'tag_marker_bg')
        .style("background-color",function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})
        //.style("border",function (d) {return "1px solid " + d.color; /*console.log("color",d.color)*/})
      .append('th')
        .attr('class', 'tag_marker')
        .text(function (d) {return d.tag })
        .style("color", "#fff" /*function (d) {return d.color}*/)

    // Display subdetail as table row 
    var crows = ctbody.selectAll('tr')
      .data(function (d) {return [{value:d.value[columns[2]],color:d.value[columns[9]],value:d.value[columns[3]],color:d.value[columns[9]]}]})
      .enter()
      .append('tr')
      .append('th')
        .attr('class', 'subtag_marker')
        .text(function (d) {return (typeof d.value !== 'undefined') ? d.value : columns[3] /*"\u00a0"*/})
        .style("color", function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})

  // //------ 3rd column section ------------------------------------------------------------------         
  // var cells2 = rows.selectAll('td')
  //   .data(function (row) {
  //     //console.log(row);
  //     return ['img','detail','tag'].map(function (column) {
  //       var dt = {};
  //       for (m=4; m<columns.length; m++) {
  //         /*if (m == 7) {
  //           dt['row_no'] = row['row_no'];
  //         } else if (columns[m] == 'lat') {
  //           dt[columns[m]] = '●';
  //         } else {
  //           dt[columns[m]] = row[columns[m]];
  //         } */    
  //         dt[columns[m]] = row[columns[m]];
  //       }
  //       //console.log(dt);
  //       return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
  //     });
  //   })
  //   .enter()
  //   .append('td').attr("class","detail_col_marker")
  //   .append('table').attr("id","detail_table_marker");

  //   var cthead2 = cells2.append('thead')
  //   var ctbody2 = cells2.append('tbody');

  //   // Display detail as table header
  //   cthead2.append('tr')
  //     .selectAll('th')
  //     .data(function (d) {/*console.log(d.value[columns[1]]);*/ return d.value[columns[4]]==d.value[columns[5]]?[d.value[columns[4]]]:[d.value[columns[4]]+" - "+d.value[columns[5]]]})
  //     .enter()
  //     .append('th')
  //       .attr('class', 'detail_marker')
  //       .text(function (column) {return column })

  //   // Display subdetail as table row 
  //   var crows2 = ctbody2.selectAll('tr')
  //     .data(function (d) {return [{value : d.value[columns[6]], name : "mood", row : d.value[columns[9]]},{value : d.value[columns[7]], name : "status", row : d.value[columns[9]], detection : d.value[columns[8]]}]})
  //     .enter()
  //     .append('tr')
  //     .append('th')
  //       .attr('id',function(d) {/*console.log(d);*/return 'subtag-'+d.row+'-'+d.name})
  //       .attr('class', 'subdetail_marker')
  //       .text(function (column) {return column.name == "mood"? column.value : column.detection + "" + column.value/*(column.value == 'succeeded'|column.value == 'unknown' ? '✔': column.value == 'failed' ? '✘': '❗' )*/})
  //       .style("color", function (d) {return (d.row.length != 9) ? d.row : d.row.substr(0,7);})
/*
    if (data[t].status == 'succeeded') {
      data[t].status = '✔';
    } else if (data[t].status == 'failed') {
      data[t].status = '✘';
    } else {
      data[t].status = '❗';
    }

*/


  d3.select("#vertical-table-markers-container").selectAll(".table_col_marker")
    .on('mouseover', function(e) {
      if (!symbol[0].selecteditem) switchZoomLayer(e.disaster_type_id,true);
    })
    .on('mouseout', function(e) { 
      if (!symbol[0].selecteditem) switchZoomLayer(e.disaster_type_id,false);
    })
    .on('dblclick', function(e) { })
    .on('click', function(e) {  
      switchUnselectVisibility(e.disaster_type_id);
    })
    .on('contextmenu', function(e) { 
      switchLayerVisibility(e.disaster_type_id);
    });



  return table;
}



//----Data Table ------------------------------------------

function tabulateimg(data, columns) {
  //console.log(data);

  var table = d3.select('#table-container').append('table').attr("id","table_image");

  //var thead = table.append('thead')
  var tbody = table.append('tbody');
  var dummy = [];

  for (t=0; t<data.length; t++) {
    data[t].row_no = t;
  }
  columns.push('row_no');

  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .append('div')
    .attr('class','table_row')
    .attr('id',function(d) {return 'datarow-'+d.disaster_id})
    .attr('class',function(d) {return 'table_row datarow-'+d.disaster_type_id});

  // create a cell in each row for each column

  //------ 1st column section ------------------------------------------------------------------  
  var img_cells = rows.selectAll('td')
    .data(function (row) { //console.log("row",row);
      return [columns[0]].map(function (column) {//console.log("col",column);
        return {column: column, value: row[column], color:row[columns[9]], disaster_type: row["disaster_type_id"]};
      });
    })
    .enter()
    .append('td')
    .attr("class","img_col")
    .append('img')//'div')
    .attr('class', function (d) {return'table_img_container image_marker_'+ d.disaster_type})
    .attr('src', function(d) {return d.column == columns[0] ?  d.value : null;})
    .style("border",function (d) {return (d.color.length != 9) ? "3px solid " + d.color : "3px solid " + d.color.substr(0,7);})
    // .append('th')
    //     .attr('class', 'marker_icon')
    //     .text(function(d) {return d.column == columns[0] ?  d.value : null;})
    //     .style("color",function (d) {return d.color})


    ;

  //------ 2nd column section ------------------------------------------------------------------  
  var cells = rows.selectAll('td')
    .data(function (row) {
      //console.log(row);
      return ['img','detail'].map(function (column) {
        var dt = {};
        for (m=1; m < 4 /*columns.length*/; m++) {
          if (columns[m] == 'id') {
            if ((row[columns[m]].substr(0,7)) != 'unknown') {
              dt[columns[m]] = facelabels[parseInt(row[columns[m]])].name;
            } else {
              dt[columns[m]] = row[columns[m]];
            }
            
          } else {
            dt[columns[m]] = row[columns[m]];
          }
          dt[columns[9]] = row[columns[9]];
        }
        //console.log(dt);
        return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
      });
    })
    .enter()
    .append('td').attr("class","detail_col")
    .append('table').attr("id","detail_table");

    var cthead = cells.append('thead')
    var ctbody = cells.append('tbody');

    // Display detail as table header
    cthead.append('tr')
      .selectAll('th')
      .data(function (d) {return [{detail:d.value[columns[1]], color:d.value[columns[9]]}]})
      .enter()
      .append('th')
        .attr('class', 'detail')
        .text(function (d) {return d.detail })
        .style("color",function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})

    // Display subdetail as table row 
    var crows = ctbody.selectAll('tr')
      .data(function (d) {return [d.value[columns[2]],d.value[columns[3]]]})
      .enter()
      .append('tr')
      .append('th')
        .attr('class', 'subdetail')
        .text(function (column) {return column })

  //------ 3rd column section ------------------------------------------------------------------         
  var cells2 = rows.selectAll('td')
    .data(function (row) {
      //console.log(row);
      return ['img','detail','tag'].map(function (column) {
        var dt = {};
        for (m=4; m<columns.length; m++) {
          /*if (m == 7) {
            dt['row_no'] = row['row_no'];
          } else if (columns[m] == 'lat') {
            dt[columns[m]] = '●';
          } else {
            dt[columns[m]] = row[columns[m]];
          } */    
          dt[columns[m]] = row[columns[m]];
        }
        dt[columns[9]] = row[columns[9]];
        //console.log(dt);
        return {column: column, value: dt /*{"detail" : row[columns[1]], "subdetail_1" : row[columns[2]], "subdetail_2" : row[columns[3]]}*/};
      });
    })
    .enter()
    .append('td').attr("class","tag_col")
    .append('table').attr("id","tag_table");

    var cthead2 = cells2.append('thead')
    var ctbody2 = cells2.append('tbody');

    // Display detail as table header
    cthead2.append('tr')
      .selectAll('th')
      .data(function (d) {return [{value : d.value[columns[4]]+" | "+d.value[columns[5]],color: d.value[columns[9]]}]})
      .enter()
      .append('th')
        .attr('class', 'tag')
        .text(function (d) {return d.value })
        .style("color",function (d) {return (d.color.length != 9) ? d.color : d.color.substr(0,7);})

    // Display subdetail as table row 
    var crows2 = ctbody2.selectAll('tr')
      .data(function (d) {return [{value : d.value[columns[6]], name : "response", row : d.value[columns[9]]},{value : d.value[columns[7]], name : "contract", row : d.value[columns[9]], detection : d.value[columns[8]]}]})
      .enter()
      .append('tr')
      .append('th')
        .attr('id',function(d) {/*console.log(d);*/return 'subtag-'+d.row+'-'+d.name})
        .attr('class', 'subtag')
        .text(function (column) {return column.value})




    d3.select("#table-container").selectAll(".table_row")
      .on('mouseover', function(e) {
        //console.log(e.disaster_type_id,e.disaster_id);
        switchZoomMarker(e.disaster_type_id,e.disaster_id,true);
        //switchZoom(e.disaster_type_id,true);
      })
      .on('mouseout', function(e) { 
        //switchZoom(e.disaster_type_id,false);
        switchZoomMarker(e.disaster_type_id,e.disaster_id,false);
      })
      .on('click', function(e) { 
        if (e.disaster_type_id < 90) {
          var coor = ($(drm_geojson.features).filter(function (i,n){return n.properties.disaster_id == e.disaster_id}))[0].geometry.coordinates;
          centerMap({"lng":coor[0],"lat":coor[1]});
        } else {
          //zoomtoPolygon(map_geojson_riskplan[e.disaster_type_id].features[0].geometry.coordinates,false);
          centerMap(e.center);
          //console.log(e.center);
        }
      })
      .on('dblclick', function(e) {  
        //switchUnselectVisibility(e.disaster_type_id);
        switchUnselectVisibility(e.disaster_type_id,e.disaster_id);
      })
      .on('contextmenu', function(e) { 
        //switchLayerVisibility(e.disaster_type_id);
        switchUnselectVisibility(e.disaster_type_id);
        map.flyTo({
          center: [101.6673626,13.2808669],
          offset: [map_Xoffset, map_Yoffset],
          zoom : 4.8, 
          speed : flyspeed, 
          curve : 1, 
          essential: true
        });        
      });



  return table;
}


//========================================================================

// function zoomtoPolygon(coordinates,zoom) {
//   // coordinates >> geojson.features.geometry.coordinates
//   var currentzoom = map.getZoom();           
//   var bounds = coordinates[0].reduce(function (bounds, coord) {
//       return bounds.extend(coord);
//   }, new mapboxgl.LngLatBounds(coordinates[0][0], coordinates[0][0]));

//   map.fitBounds(bounds, {
//     speed : flyspeed,
//     padding: 20
//   });
//   if (!zoom) map.setZoom(currentzoom)
// }

function centerMap(lnglat) {
  resize = 1;
  mapcenter = lnglat;
  map.flyTo({
    center: lnglat,
    offset: [map_Xoffset, map_Yoffset],
    //zoom : zoom(z), 
    speed : flyspeed, 
    curve : 1, 
    essential: true
  }); 
}
function switchZoomLayer(disaster_type_id,iszoomed) {
  
  if (iszoomed) {

      if (symbol[disaster_type_id].noti_type == 'disaster') {
        // map.setLayoutProperty(symbol[disaster_type_id].layername, 'text-size', zoom*Math.round(24*symbol[disaster_type_id].size));
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 12);
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0, -1.8*symbol[disaster_type_id].size]);
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'icon-size', 0.21);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 11);
        //map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0, -4.9]);        
      } else {
        map.setPaintProperty(symbol[disaster_type_id].layername, 'fill-opacity',1);
        map.setPaintProperty(symbol[disaster_type_id].layername+'_bound','line-opacity',1);
      }

      // // Highlight table data rows
      // var table_row = document.getElementsByClassName('datarow-'+disaster_type_id);
      // //console.log(table_row.length,table_row);
      // for (i=0;i<table_row.length;i++) {
      //   table_row[i].style.backgroundColor = "#666666";
      // }

      if (symbol[disaster_type_id].visibility == 'visible') {
        filter_dataTable(disaster_type_id);
      } 

  } else {
      if (symbol[disaster_type_id].noti_type == 'disaster') {
        // map.setLayoutProperty(symbol[disaster_type_id].layername, 'text-size', Math.round(24*symbol[disaster_type_id].size));
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 8);
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0, -1.7*symbol[disaster_type_id].size]);
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'icon-size', 0.15);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 8);
        //map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0, -4.9]);        
      } else {
        map.setPaintProperty(symbol[disaster_type_id].layername, 'fill-opacity',symbol[disaster_type_id].opacity);
        map.setPaintProperty(symbol[disaster_type_id].layername+'_bound','line-opacity',0);
      }

      // // Highlight table data rows
      // var table_row = document.getElementsByClassName('datarow-'+disaster_type_id);
      // for (i=0;i<table_row.length;i++) {
      //   table_row[i].style.backgroundColor = "#494949";
      // }

      if ((symbol[disaster_type_id].visibility == 'visible')&&(!symbol[disaster_type_id].dbclick)) {
        filter_dataTable("all");
      }

  }
}


function switchZoomMarker(disaster_type_id,disaster_id,iszoomed) {

  var size = symbol[disaster_type_id].size,
      unzoomedSize = 0.15,//Math.round(28*size),
      zoomedSize = 0.21;zoom*unzoomedSize;
  if (iszoomed) {

      if (symbol[disaster_type_id].noti_type == 'disaster') {
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'-pulse', 'visibility', 'none');
        // map.setLayoutProperty(symbol[disaster_type_id].layername, 'text-size', ['match',['get', 'disaster_id'], disaster_id, zoomedSize ,unzoomedSize]);
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', ['match',['get', 'disaster_id'], disaster_id, 12 ,8]);
        // //map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0,['match',['get', 'disaster_id'], disaster_id,-1.8,-1.7]]);
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'icon-size', ['match',['get', 'disaster_id'], disaster_id, zoomedSize ,unzoomedSize]);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', ['match',['get', 'disaster_id'], disaster_id, 11 ,8]);

      } else {
        map.setPaintProperty(symbol[disaster_type_id].layername, 'fill-opacity',['match',['get', 'disaster_id'], disaster_id, 1 ,symbol[disaster_type_id].opacity]);
        map.setPaintProperty(symbol[disaster_type_id].layername+'_bound','line-opacity',['match',['get', 'disaster_id'], disaster_id, 1 ,0]);
        //console.log(disaster_type_id,disaster_id)
      }

  } else {
      if (symbol[disaster_type_id].noti_type == 'disaster') {
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'-pulse', 'visibility', 'visible');
        // map.setLayoutProperty(symbol[disaster_type_id].layername, 'text-size', Math.round(24*symbol[disaster_type_id].size));
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 8);
        // map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-offset', [0, -1.7*symbol[disaster_type_id].size]);
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'icon-size', 0.15);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'text-size', 8);        
      } else {
        map.setPaintProperty(symbol[disaster_type_id].layername, 'fill-opacity',symbol[disaster_type_id].opacity);
        map.setPaintProperty(symbol[disaster_type_id].layername+'_bound','line-opacity',0);
      }
  }
}




function switchUnselectVisibility(disaster_type_id,disaster_id) {


  if (!disaster_id) {
    symbol[disaster_type_id].dbclick = !symbol[disaster_type_id].dbclick;
    symbol[0].selecteditem = false;
  } else {
    symbol[disaster_type_id].dbclick = true;
    symbol[0].selecteditem = !symbol[0].selecteditem;
  }
  //console.log(symbol[0].selecteditem);

  drm_list.forEach(function (item, index) {
    if (symbol[disaster_type_id].dbclick) {              
        symbol[item].visibility = 'visible';                     
    } else {
        symbol[item].visibility = 'none';            
    }
    if (disaster_type_id == item) {
      symbol[disaster_type_id].visibility = 'none';
      if (symbol[item].dbclick) {

        (symbol[0].selecteditem) ? switchLayerVisibility(item,disaster_id) : switchLayerVisibility(item,'all');
      } else {
        switchLayerVisibility(item);
      }
    } else {
      symbol[item].dbclick = false;
      switchLayerVisibility(item);
    }
    //switchLayerVisibility(item);
    try {
      document.getElementById("table_row_marker_"+item.toString()).style.borderRight = '0px solid #000';
      document.getElementById("table_col_marker_"+item.toString()).style.borderBottom = '0px solid #000';        
    }
    catch(err) {

    }
  })

  if (disaster_type_id == 0) {
    if (symbol['0'].dbclick) {
      document.getElementById("lp-button").innerHTML = "<icon class='icon-circle-empty'></icon>";
    } else {
      document.getElementById("lp-button").innerHTML = "<icon class='icon-circle'></icon>";
    }
  } else {
    if (symbol[disaster_type_id].dbclick) {
      document.getElementById("table_row_marker_"+disaster_type_id.toString()).style.borderRight = '5px solid '+ symbol[disaster_type_id].color;
      document.getElementById("table_col_marker_"+disaster_type_id.toString()).style.borderBottom = '5px solid '+ symbol[disaster_type_id].color;

      if (disaster_id) {
        //symbol[disaster_type_id].selecteditem = !symbol[disaster_type_id].selecteditem;
        if (symbol[0].selecteditem) {

          filter_dataTable(disaster_type_id, disaster_id);
          display_detailTable(disaster_type_id,disaster_id);

        } else {
          filter_dataTable(disaster_type_id, 'all');
          display_detailTable('none');
        }
        
      } else {
        filter_dataTable(disaster_type_id);  
        display_detailTable('none');
      }   


    } else {
      filter_dataTable('all');
      display_detailTable('none');
    }
  }



}

function switchLayerVisibility(disaster_type_id,disaster_id) {

  var marker = document.getElementsByClassName('image_marker_'+disaster_type_id);
  if (symbol[disaster_type_id].visibility == 'none') {
    for (i=0;i<marker.length;i++) {
      marker[i].style.border = "3px solid " + symbol[disaster_type_id].color;
      marker[i].style.backgroundColor = "#fff";
      // marker[1].style.border = "2px solid " + symbol[disaster_type_id].color;
      // marker[1].style.backgroundColor = "#fff";
    }
    symbol[disaster_type_id].visibility = 'visible';
  } else {
    for (i=0;i<marker.length;i++) {
      marker[i].style.border = "3px solid " + unselectedcolor;
      marker[i].style.backgroundColor = unselectedcolor;
      // marker[1].style.border = "2px solid " + unselectedcolor;
      // marker[1].style.backgroundColor = unselectedcolor;
    }
    symbol[disaster_type_id].visibility = 'none';
  }


  if (symbol[disaster_type_id].noti_type == 'disaster') {
    //map.setLayoutProperty(symbol[disaster_type_id].layername+'-pulse', 'visibility', symbol[disaster_type_id].visibility);
    map.setLayoutProperty(symbol[disaster_type_id].layername, 'visibility', symbol[disaster_type_id].visibility);
    map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'visibility', symbol[disaster_type_id].visibility);
    //map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'visibility', symbol[disaster_type_id].visibility);

    map.setFilter(symbol[disaster_type_id].layername);
    map.setFilter(symbol[disaster_type_id].layername+'_label');
    // filter marker if disaster id is passed
    if ((disaster_id) && (disaster_id != 'all')) { 
      map.setFilter(symbol[disaster_type_id].layername, ["==",["get", "disaster_id"],disaster_id]);
      map.setFilter(symbol[disaster_type_id].layername+'_label', ["==",["get", "disaster_id"],disaster_id]);
    }
  } else {
    map.setLayoutProperty(symbol[disaster_type_id].layername, 'visibility', symbol[disaster_type_id].visibility);
    map.setLayoutProperty(symbol[disaster_type_id].layername+'_bound', 'visibility', symbol[disaster_type_id].visibility);
    map.setLayoutProperty(symbol[disaster_type_id].layername+'_label', 'visibility', symbol[disaster_type_id].visibility);

    map.setFilter(symbol[disaster_type_id].layername);
    map.setFilter(symbol[disaster_type_id].layername+'_bound');
    map.setFilter(symbol[disaster_type_id].layername+'_label');
    // filter marker if disaster id is passed
    if ((disaster_id) && (disaster_id != 'all')) { 
      map.setFilter(symbol[disaster_type_id].layername, ["==",["get", "disaster_id"],disaster_id]);
      map.setFilter(symbol[disaster_type_id].layername+'_bound', ["==",["get", "disaster_id"],disaster_id]);
      map.setFilter(symbol[disaster_type_id].layername+'_label', ["==",["get", "disaster_id"],disaster_id]);
    } 
  }


}



function filter_dataTable(disaster_type_id,disaster_id) {

    disaster_risk_list.d_id.filterAll();
    disaster_risk_list.dtype_id.filterAll();

    // Apply filter
    if (disaster_type_id !== 'all') {
      disaster_risk_list.dtype_id.filterExact(disaster_type_id);
      if ((disaster_id) && (disaster_id != 'all')) { 

         disaster_risk_list.d_id.filterExact(disaster_id);
      } 
    } 

    // Remove the previous display table
    var removetable = document.getElementById('table_image');
    removetable.parentElement.removeChild(removetable);    

    tabulateimg(disaster_risk_list.dtype_id.bottom(Infinity), ["icon_url","disaster_type","source","updated_date","level_detail","DRM_state","response","contract","blank","color"]);
}


// function display_detailTable(disaster_id) {
//   console.log(disaster_id);




// }


function display_table_markers(drm) {

    //console.log(drm);

    disaster_risk_list_summary_ = alasql('SELECT disaster_type_id, disaster_type, icon, icon_url, color, "" as blank, count(*) as num_rec \ FROM ?\ GROUP BY disaster_type_id, disaster_type, icon, icon_url, color',[drm]);

    // Initialize crossfilter variable for Disaster Risk List summary
    disaster_risk_list_summary = crossfilter(disaster_risk_list_summary_);
    disaster_risk_list_summary.dtype_id = disaster_risk_list_summary.dimension(function(d) { return d.disaster_type_id; });
    disaster_risk_list_summary.disaster = disaster_risk_list_summary.dimension(function(d) { return symbol[d.disaster_type_id].noti_type == 'disaster';});
    disaster_risk_list_summary.plan = disaster_risk_list_summary.dimension(function(d) { return symbol[d.disaster_type_id].noti_type == 'plan';});

    // Initialize crossfilter variable for Disaster Risk List
    disaster_risk_list = crossfilter(drm);
    disaster_risk_list.dtype_id = disaster_risk_list.dimension(function(d) { return d.disaster_type_id; });
    disaster_risk_list.d_id = disaster_risk_list.dimension(function(d) { return d.disaster_id; });
    disaster_risk_list.disaster = disaster_risk_list.dimension(function(d) { return symbol[d.disaster_type_id].noti_type == 'disaster';});
    disaster_risk_list.plan = disaster_risk_list.dimension(function(d) { return symbol[d.disaster_type_id].noti_type == 'plan';});
    //dtype_id_group = drl.dtype_id.group();


    //tabulateimg(disaster_risk_list.dtype_id.bottom(Infinity), ["icon","disaster_type","source","updated_date","level_detail","DRM_state","response","contract","blank","color"]);
    filter_dataTable('all');
    //switchShortNoti();

    //console.log(disaster_risk_list_summary);
    // Display Table markers
    tabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
    vertabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);

    //requestFullScreen(document.getElementById('map-panel'));


}

function filterNotiType(type,filter) {
  var noti = {'แจ้งเตือนภัย':'disaster',
              'แจ้งเตือนวางแผน':'plan'};
  //console.log(type,filter);
  //disaster_risk_list_summary[type].filterExact(!filter);
  if (filter) {
    disaster_risk_list_summary[noti[type]].filterAll(); 
    disaster_risk_list[noti[type]].filterAll(); 
  } else {
    disaster_risk_list_summary[noti[type]].filterExact(false); 
    disaster_risk_list[noti[type]].filterExact(false); 
  }







  var removetable = document.getElementById('table_image');
  removetable.parentElement.removeChild(removetable);    
  removetable = document.getElementById('table_image_marker');
  removetable.parentElement.removeChild(removetable);
  removetable = document.getElementById('vertical_table_image_marker');
  removetable.parentElement.removeChild(removetable);

  tabulateimg(disaster_risk_list.dtype_id.bottom(Infinity), ["icon_url","disaster_type","source","updated_date","level_detail","DRM_state","response","contract","blank","color"]);

  tabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
  vertabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);


}



function initialize() {

  //hide 
  // document.getElementById("video-container").style.display = "none";
  // document.getElementById("map-container").style.display = "block";
  map.resize();

  //document.getElementById("stop-button").innerHTML = "■";
  var menubtn = document.createElement("button");
  menubtn.id = "lp-button";
  menubtn.className = "map-menu-button";
  //stopbtn.style.margin = "-20px 0px 0px 0px";
  //menubtn.style.padding = "0px 0px";
  menubtn.setAttribute('type', 'button');
  //stopbtn.setAttribute('onclick', 'inputMenu()');
  menubtn.setAttribute('oncontextmenu', 'switchShortNoti();return false;');
  menubtn.setAttribute('onclick', 'switchUnselectVisibility(0);return false;'); //switchUnselectVisibility(disaster_type_id)
  document.getElementById("menu-container-top-right").append(menubtn);
  //document.getElementById("stop-button").innerHTML = "⍜☷■⌂";
  document.getElementById("lp-button").innerHTML = "<icon class='icon-circle'></icon>";


  //document.getElementById("stop-button").innerHTML = "■";
  var menubtn = document.createElement("button");
  menubtn.id = "bb-button";
  menubtn.className = "map-menu-button";
  //stopbtn.style.margin = "-20px 0px 0px 0px";
  //menubtn.style.padding = "0px 0px";
  menubtn.setAttribute('type', 'button');
  //stopbtn.setAttribute('onclick', 'inputMenu()');
  menubtn.setAttribute('onclick', 'switchDatapanel()');
  document.getElementById("menu-container-top-right").append(menubtn);
  //document.getElementById("stop-button").innerHTML = "☰⌷↹■⌂";


}



function switchShortNoti() {
  var w;
  var removetable = document.getElementById('table_image_marker');
  removetable.parentElement.removeChild(removetable);    
  removetable = document.getElementById('vertical_table_image_marker');
  removetable.parentElement.removeChild(removetable);    
  shortnoti = !shortnoti;
  if (shortnoti) {
    document.getElementById('table-container-MAP').style.width = "70px";
    tabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","\u00a0","blank","blank","blank","blank","blank","color"]);
    vertabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","\u00a0","blank","blank","blank","blank","blank","color"]);
    w = "61px";
  } else {
    document.getElementById('table-container-MAP').style.width = "105px";
    tabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
    vertabulateimg_marker(disaster_risk_list_summary.dtype_id.bottom(Infinity), ["icon_url","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
    w = "96px";
  }
  var doc = document.getElementsByClassName('table_col_marker');
  for (i=0;i<doc.length;i++) {doc[i].style.width = w;} 

  // Recheck and display table marker according to double click
  drm_list.forEach(function (item, index) {
    switchLayerVisibility(item);
    switchLayerVisibility(item);
    if (symbol[item].dbclick) {
      try {
      document.getElementById("table_row_marker_"+item.toString()).style.borderRight = '3px solid '+ symbol[item].color;
      document.getElementById("table_col_marker_"+item.toString()).style.borderBottom = '3px solid '+ symbol[item].color;
      }
      catch(err) {

      }      
    } 
  })

}

function switchDatapanel(op) {
  switch(op) {  
    case 0:
      // map layout
      datapanel_isopen = 0;
      break;
    case 1:
      // map&table layout
      datapanel_isopen = 1;
      datapanel = {xw:0.4,xh:0.4};
      break;
    case 2:
      // table layout
      datapanel_isopen = 2;
      datapanel = {xw:0.55,xh:0.85};
      break;
    default:
      console.log("layout type is unrecognized!")
      datapanel_isopen = !datapanel_isopen;
  }

  for (m=0;m<3;m++) {
    if (m == op) {
      document.getElementById("headermenu"+m).style.backgroundColor = "#fff";
      document.getElementById("headermenu"+m).style.color = "#2a58c3";
    } else {
      document.getElementById("headermenu"+m).style.backgroundColor = "#fff0";
      document.getElementById("headermenu"+m).style.color = "#fff";
    }
  }



  //datapanel_isopen = !datapanel_isopen;
  resizeAdjust()  
  map.flyTo({
    center: mapcenter, //[101.6673626,13.2808669],
    offset: [map_Xoffset, map_Yoffset],
    //zoom : zoom(z), 
    speed : flyspeed, 
    curve : 1, 
    essential: true
  });
}


// function updateMapMenu() {

//   var icon = "☰";
//   if($("#wholecontent").width() < 768){
//     // Move menu buttons position
//     $("#lp-button").appendTo("#menu-container-bottom-right");
//     $("#bb-button").appendTo("#menu-container-bottom-right");
//     if (datapanel_isopen == 0) icon = '⊼'; else icon = '⊻';
//   } else {
//     $("#lp-button").appendTo("#menu-container-top-right");
//     $("#bb-button").appendTo("#menu-container-top-right");
//     if (datapanel_isopen == 0) icon = '<'; else icon = '>';
//   }
//   document.getElementById("bb-button").innerHTML = icon;//"☷";
// }

//     function cancelFullScreen(el) {
//         var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
//         if (requestMethod) { // cancel full screen.
//             requestMethod.call(el);
//         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//             var wscript = new ActiveXObject("WScript.Shell");
//             if (wscript !== null) {
//                 wscript.SendKeys("{F11}");
//             }
//         }
//     }

//     function requestFullScreen(el) {
//         // Supports most browsers and their versions.
//         var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

//         if (requestMethod) { // Native full screen.
//             requestMethod.call(el);
//         } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//             var wscript = new ActiveXObject("WScript.Shell");
//             if (wscript !== null) {
//                 wscript.SendKeys("{F11}");
//             }
//         }
//         return false
//     }

//     function toggleFull() {
//         var elem = document.body; // Make the body go full screen.
//         var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

//         if (isInFullScreen) {
//             cancelFullScreen(document);
//         } else {
//             requestFullScreen(elem);
//         }
//         return false;
//     }
// 

function display_detailTable(disaster_type_id,disaster_id) {

  //console.log(disaster_id);  
  if (disaster_type_id != 'none') {
    //console.log("create table");
    var tbl = document.createElement("div");
    tbl.id = "detailTable-container";
    tbl.className = "detailTable-container";
    tbl.innerHTML = `
      <div class="datailTable-scroll-container">
        <table id="datailTable" class="detailTable">
          <tbody>
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="header bgblank">
                <td class="icon-circle"></td>
                <td class="dstep" colspan="3">ประกาศ</td>
                <td class="dstep_date" colspan="2">9 ต.ค. 63</td>
            </tr>
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">พื้นที่</span>
                <span class="detailHeader_col2">2 จังหวัด<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td>นครนายก</td>
                <td>1 อำเภอ</td>
                <td colspan="2">5 ตำบล</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>             
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td>อุบลราชธานี</td>
                <td>3 อำเภอ</td>
                <td colspan="2">15 ตำบล</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>             
          <tbody>
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="header">
                <td class="icon-circle"></td>
                <td class="dstep" colspan="3">ดำเนินการ</td>
                <td class="dstep_date" colspan="2">14 ต.ค. 63</td>
            </tr>
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">เผชิญเหตุ</span>
                <span class="detailHeader_col2">3 ปฏิบัติการ<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 02</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>         
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 03</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>   
          </tbody>    
          <tbody>        
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">ช่วยชีวิต</span>
                <span class="detailHeader_col2">1 ปฏิบัติการ<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อช่วยขนย้ายผู้บาดเจ็บ</td>
                <td colspan="2">14 ต.ค. 63 1040</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    

          </tbody>    
          <tbody>
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="header">
                <td class="icon-circle"></td>
                <td class="dstep" colspan="3">คำร้องขอความช่วยเหลือ</td>
                <td class="dstep_date" colspan="2">15 ต.ค. 63</td>
            </tr>
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">ต้องการอาหาร</span>
                <span class="detailHeader_col2">2 คำร้อง<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 02</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>         
          </tbody>
          <tbody>        
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">เคลื่อนย้ายออกจากพื้นที่อันตราย</span>
                <span class="detailHeader_col2">1 คำร้อง<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อช่วยขนย้ายผู้บาดเจ็บ</td>
                <td colspan="2">14 ต.ค. 63 1040</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    

          </tbody>                 
          <tbody>
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="header">
                <td class="icon-circle"></td>
                <td class="dstep" colspan="3">ฟื้นฟู</td>
                <td class="dstep_date" colspan="2">29 ต.ค. 63</td>
            </tr>
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">บูรณะที่พักอาศัย</span>
                <span class="detailHeader_col2">2 จังหวัด<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 02</td>
                <td colspan="2">หัวข้อการช่วยเหลือ</td>
                <td colspan="2">14 ต.ค. 63 0930</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>         
          </tbody>
          <tbody>        
            <tr><td class="bgblank" colspan="6"></td></tr>                     
            <tr class="parent">
                <td class="bgblank"></td>
                <td class="detailHeader"  colspan="5">
                <span class="detailHeader_col1">ตรวจสุขภาพ</span>
                <span class="detailHeader_col2">1 อำเภอ<span class="icon_dropdown"><i class="fa icon-down-open"></i></spand></span>               
                </td>
            </tr>
            <tr class="cchild topic">
                <td class="bgblank"></td>
                <td colspan="1">หน่วย 01</td>
                <td colspan="2">หัวข้อช่วยขนย้ายผู้บาดเจ็บ</td>
                <td colspan="2">14 ต.ค. 63 1040</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  พื้นที่</td>
                <td colspan="4">  จ.นครนายก อ.ปากพลี</td>
            </tr>
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  รายละเอียด</td>
                <td colspan="4">รายละเอียดการดำเนินการ  ********************************* ****************************</td>
            </tr>    
            <tr class="cchild">
                <td class="bgblank"></td>
                <td colspan="1">  ติดต่อ</td>
                <td colspan="2">คุณวิชัย จันทร์แสง</td>
                <td colspan="2">0909123456</td>
            </tr>                    

          </tbody>    
        </table>
      </div>
    `
    //console.log("append table");
    document.getElementById("table-container").appendChild(tbl);

    // toggle one click topic
    $('table').on('click', '.parent ', function(){
      $(this).closest('tbody').toggleClass('open');
    });

    // open all on doubleclick header
    $('table').on('dblclick', '.header ', function(){
      $(".parent").each(function() {
        $(this).closest('tbody').addClass('open');
      });
    });

    // close all on right click header
    $('table').on('contextmenu', '.header ', function(){
      $(".parent").each(function() {
        $(this).closest('tbody').removeClass('open');
      });
    });

    // set color corresponding to disaster_type
    document.getElementById("dynamic_style").innerHTML = `
        .detailTable>tbody>tr>td {
          background-color: `+ symbol[disaster_type_id].color +`0f;
        }
        .open>.parent>.detailHeader {
          background-color: `+ symbol[disaster_type_id].color +`;
          color: #fff;
        }
        .detailTable{
          color: `+ symbol[disaster_type_id].color +`;
        }
        .detailTable-container{
          background-color : `+ symbol[disaster_type_id].color +`ff;
        }
        .detailTable>tbody>tr>.detailHeader {
          border: 1px solid `+ symbol[disaster_type_id].color +`77;
        }
        .topic {
          background-color: `+ symbol[disaster_type_id].color +`33;
        }`;

    // $(".detailTable").css("color", symbol[disaster_type_id].color);
    // document.getElementById("detailTable-container").style.backgroundColor = symbol[disaster_type_id].color+"ff";

    // $(".detailHeader").css("border", "1px solid "+ symbol[disaster_type_id].color + "77");

    // topics = document.getElementsByClassName("topic");
    // for (i=0; i<topics.length; i++) {
    //   console.log(i);
    //   topics[i].style.backgroundColor = symbol[disaster_type_id].color+"33";
    // }

  } else {
    try {
      //console.log("remove table");
      var removetable = document.getElementById('detailTable-container');
      removetable.parentElement.removeChild(removetable);        
    }
    catch(err) {

    }    
  }
}

var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function switchHeadermenu(op) {
  console.log(op);
  for (m=0;m<3;m++) {
    if (m+1 == op) {
      document.getElementById("headermenu"+(m+1)).style.backgroundColor = "#fff";
      document.getElementById("headermenu"+(m+1)).style.color = "#2a58c3";
    } else {
      document.getElementById("headermenu"+(m+1)).style.backgroundColor = "#fff0";
      document.getElementById("headermenu"+(m+1)).style.color = "#fff";
    }


  }
}

// function hidegeocoderserchbar() {
//   console.log("geocoder hide");
//   $('div.password-suggestions').hide();
// }





function showcolorPicker(el) {
  //console.log("show",el.parentElement,el.style.color);

  layer = el.parentElement.textContent;

  if (!["แจ้งเตือนภัย","แจ้งเตือนวางแผน"].includes(layer)) {
    colorpicker = document.getElementById('color_picker');
    colorpicker.innerHTML ="";
    colorpicker.innerHTML += `
    <div>
      <div style="width:100%;height:28px;color:#000;border-bottom:1px solid #0004;margin-bottom:3px;padding-top:10px;">
        <span style="margin:5px 0 0 3px; top:">`+layer+`</span>
        <input id="color_picker_input" type="color" id="body" style="float:right;padding:0px;margin:-10px 1px 1px 1px;" value=`+rgb2hex(el.style.color)+`>
      </div>
    </div>`;    
    colorpicker.style.display = "block";
    colorpicker.style.top = ((event.pageY - 165) < 0) ? 0 : (event.pageY - 170) + "px";
    colorpicker.style.left = "2px";//(event.pageX - 50) + "px";
    //colorpicker.innerHTML = content;
    colorpicker.innerHTML += `
    
    `;  
    document.getElementById("color_picker_input").addEventListener('change', function () {
      //map.setPaintProperty(layer.value, 'fill-color', color);
      layerSetcolor(el,layer,this.value);
    }); 
    var colors = [
      '#ffffcc',
      '#a1dab4',
      '#41b6c4',
      '#2c7fb8',
      '#253494',
      '#fed976',
      '#feb24c',
      '#fd8d3c',
      '#f03b20',
      '#bd0026'
    ];
     
    colors.forEach(function (color) {
      var color_rec = document.createElement('button');
      color_rec.className = "color_picker_button";
      color_rec.style.backgroundColor = color;
      color_rec.style.opacity = "1";
      color_rec.style.width = "33px";
      color_rec.style.height = "28px";
      color_rec.style.margin = "2px";
      color_rec.style.borderRadius = "2px";
      //color_rec.style.border = "1px solid #000";
      color_rec.style.backgroundImage = "none";
      color_rec.addEventListener('click', function () {
        //map.setPaintProperty(layer.value, 'fill-color', color);
        layerSetcolor(el,layer,color);
        document.getElementById("color_picker_input").value = color;
      });
      colorpicker.appendChild(document.createElement('div').appendChild(color_rec));
    });
    // colorpicker.innerHTML += `
    // <div id="color_picker_input">
    // <input type="color" id="body" name="body" onchange="layerSetcolor(el,layer,color);" value=`+rgb2hex(el.style.color)+`>
    // </div>`;

  }


  //return colorpicker;
}

function hidecolorPicker() {
  colorpicker = document.getElementById('color_picker');
  colorpicker.style.display = "none";
}

function layerSetcolor(el,layer,color) {
  //map.setPaintProperty(layer.value, 'fill-color', color);
  el.style.color = color;
  
  switch(el.className) {
    case "icon-minus":
      // line
      map.setPaintProperty(layer, 'line-color', color);
      break;
    case "icon-stop":
      // fill area
      map.setPaintProperty(layer, 'fill-color', color);
      break;
    case "icon-circle":
      // point
      map.setPaintProperty(layer, 'circle-color', color);
      break;
    default:
      console.log("layer type is unrecognized!")
  }
        
  //console.log("set color",layer,color,el.className);  
}