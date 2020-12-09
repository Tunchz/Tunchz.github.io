function get_thaiwater_geojson(url) {
  var keys = {'21':{key:"dam",data_str:"data/data",
                    basecols:{
                          disaster_type:"เขื่อน",
                          disaster_type_id:21,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"%น้ำในอ่าง"
                        },
                    cols:{lat:"dam/dam_lat",lon:"dam/dam_long",
                          ชื่อเขื่อน:"dam/dam_name/th",
                          'น้ำไหลลงอ่าง (ล้าน ลบม./วัน)':"dam_inflow",
                          ปริมาตรน้ำในอ่าง:"dam_storage",
                          '%น้ำในอ่าง':"dam_storage_percent",
                          ใช้ได้จริง:"dam_uses_water",
                          '%ใช้ได้จริง':"dam_uses_water_percent",
                          'น้ำระบาย (ล้าน ลบม./วัน)':"dam_released",
                          source:"agency/agency_name/th",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          val:"dam_storage_percent",
                          updated_date:"dam_date"
                        },
                    levels:[{attr:"%ใช้ได้จริง",op:'<=',val:20,level:1,detail:"น้ำน้อยวิกฤต(%ใช้การฯ)",color:'#FFC000',warning:'แจ้งเตือน'},
                          {attr:"%น้ำในอ่าง",op:'>',val:100,level:6,detail:"น้ำมาก(%รนก.)",color:'#C70000',warning:'แจ้งเตือน'},
                          {attr:"%น้ำในอ่าง",op:'>',val:80,level:5,detail:"81-100",color:'#FF0000',warning:'ปกติ'},
                          {attr:"%น้ำในอ่าง",op:'>',val:50,level:4,detail:"51-80",color:'#003CFA',warning:'ปกติ'},
                          {attr:"%น้ำในอ่าง",op:'>',val:30,level:3,detail:"31-50",color:'#00B050',warning:'ปกติ'},
                          {attr:"%น้ำในอ่าง",op:'<=',val:30,level:2,detail:"0-30",color:'#FFC000',warning:'ปกติ'}
                        ]
                    },
              '22':{key:"waterlevel",data_str:"data/data",
                    basecols:{
                          disaster_type:"ระดับน้ำ",
                          disaster_type_id:22,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"%ความจุลำน้ำ"
                        },
                    cols:{lat:"station/tele_station_lat",lon:"station/tele_station_long",
                          สถานี:"station/tele_station_name/th",
                          'ระดับน้ำ (ม.รทก.)':"waterlevel_msl",
                          '%ความจุลำน้ำ':"storage_percent",
                          ลุ่มน้ำ:"basin/basin_name/th",
                          source:"agency/agency_name/th",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          val:"storage_percent",
                          updated_date:"waterlevel_datetime"
                        },
                    levels:[{attr:"%ความจุลำน้ำ",op:'>',val:100,level:5,detail:"น้ำล้นตลิ่ง",color:'#FF0000',warning:'แจ้งเตือน'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:70,level:4,detail:"น้ำมาก",color:'#003CFA',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:30,level:3,detail:"น้ำปกติ",color:'#00B050',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:10,level:2,detail:"น้ำน้อย",color:'#FFC000',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'<=',val:10,level:1,detail:"น้ำน้อยวิกฤต",color:'#990000',warning:'แจ้งเตือน'}
                        ]
                     },
              '23':{key:"waterquality",disaster_type:"คุณภาพน้ำ",disaster_type_id:27,data_str:"data/data",
                    basecols:{
                          disaster_type:"คุณภาพน้ำ",
                          disaster_type_id:23,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"ค่าความเค็ม (g/L)"
                        },
                    cols:{lat:"waterquality_station/waterquality_station_lat",lon:"waterquality_station/waterquality_station_long",
                          สถานี:"waterquality_station/waterquality_station_name/th",
                          'ค่าความเค็ม (g/L)':"waterquality_salinity",
                          'ออกซิเจน (mg/L)':"waterquality_do",
                          source:"waterquality_station/agency_name/th",
                          ภาค:"",
                          จังหวัด:"waterquality_station/province_name/th",
                          อำเภอ:"waterquality_station/amphoe_name/th",
                          ตำบล:"waterquality_station/tumbon_name/th",
                          river:"waterquality_station/river_name",
                          val:"waterquality_salinity",
                          updated_date:"waterquality_datetime"
                        },
                    levels:[{attr:"ค่าความเค็ม (g/L)",op:'>',val:2,level:3,detail:"> 2",color:'#EE141F',warning:'แจ้งเตือน'},
                          {attr:"ค่าความเค็ม (g/L)",op:'>',val:0.5,level:2,detail:"> 0.5",color:'#EE141F',warning:'ปกติ'},
                          {attr:"ค่าความเค็ม (g/L)",op:'<=',val:0.5,level:1,detail:"> 0.25",color:'#FFA500',warning:'ปกติ'}
                        ]
                    },
              '24':{key:"rain",data_str:"data/data",
                    basecols:{
                          disaster_type:"ฝน",
                          disaster_type_id:24,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"ฝนสะสม 24 ชม"
                        },
                    cols:{lat:"station/tele_station_lat",lon:"station/tele_station_long",
                          สถานี:"station/tele_station_name/th",
                          ฝนสะสม:"rain_24h",
                          เขตลุ่มน้ำ:"basin/basin_name/th",
                          source:"agency/agency_name/th",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          val:"rain_24h",
                          updated_date:"rainfall_datetime"
                        },
                    levels:[{attr:"ฝนสะสม",op:'>',val:90,level:7,detail:"ฝนตกหนักมาก",color:'#EE141F',warning:'แจ้งเตือน'},
                          {attr:"ฝนสะสม",op:'>',val:70,level:6,detail:"ฝนตกหนักมาก",color:'#CA6504',warning:'แจ้งเตือน'},
                          {attr:"ฝนสะสม",op:'>',val:50,level:5,detail:"ฝนตกหนัก",color:'#FE8A04',warning:'ปกติ'},
                          {attr:"ฝนสะสม",op:'>',val:35,level:4,detail:"ฝนตกปานกลาง",color:'#F6D300',warning:'ปกติ'},
                          {attr:"ฝนสะสม",op:'>',val:20,level:3,detail:"ฝนตกปานกลาง",color:'#66C803',warning:'ปกติ'},
                          {attr:"ฝนสะสม",op:'>',val:10,level:2,detail:"ฝนตกเล็กน้อย",color:'#9CEEB2',warning:'ปกติ'},
                          {attr:"ฝนสะสม",op:'<=',val:10,level:1,detail:"ฝนตกเล็กน้อย",color:'#A9D1FC',warning:'ปกติ'}
                        ]
                    },
              '25':{key:"storm",data_str:"data/data",
                    basecols:{
                          disaster_type:"พายุ",
                          disaster_type_id:25,
                          DRM_state:"เฝ้าระวัง",
                          source:"กรมอุตุนิยมวิทยา",
                          response:"response",
                          contract:"contract",
                          attr:"-",
                          val:"-"
                        },
                    cols:{lat:"",lon:"",
                          name:"",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          updated_date:""
                        },
                    levels:[/*{attr:"%ความจุลำน้ำ",op:'>',val:100,level:5,detail:"น้ำล้นตลิ่ง",color:'#FF0000',warning:'แจ้งเตือน'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:70,level:4,detail:"น้ำมาก",color:'#003CFA',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:30,level:3,detail:"น้ำปกติ",color:'#00B050',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:10,level:2,detail:"น้ำน้อย",color:'#FFC000',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'<=',val:10,level:1,detail:"น้ำน้อยวิกฤต",color:'#990000',warning:'แจ้งเตือน'}
                        */]
                    },
              '26':{key:"pre_rain",data_str:"data/data",
                    basecols:{
                          disaster_type:"คาดการณ์ฝน",
                          disaster_type_id:26,
                          DRM_state:"เฝ้าระวัง",
                          source:"กรมอุตุนิยมวิทยา",
                          response:"response",
                          contract:"contract",
                          attr:"จังหวัด",
                        },
                    cols:{lat:"",lon:"",
                          name:"province_name/th",
                          จังหวัด:"province_name/th",
                          ระดับ:"rainforecast_level",
                          val:"province_code",
                          updated_date:""
                        },
                    levels:[{attr:"ระดับ",op:'=',val:5,level:5,detail:"ฝนตกหนักมาก",color:'#ff0000',warning:'แจ้งเตือน'},
                          {attr:"ระดับ",op:'=',val:4,level:4,detail:"ฝนตกหนัก",color:'#f0ad4e',warning:'แจ้งเตือน'}
                        ]
                    }, 
              '27':{key:"warning",data_str:"data",
                    basecols:{
                          disaster_type:"พื้นที่เกิดสาธารณภัย",
                          disaster_type_id:27,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"-",
                          val:"-"
                        },
                    cols:{lat:"",lon:"",
                          name:"",
                          source:"agency/agency_name/th",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          updated_date:""
                        },
                    levels:[/*{attr:"%ความจุลำน้ำ",op:'>',val:100,level:5,detail:"น้ำล้นตลิ่ง",color:'#FF0000',warning:'แจ้งเตือน'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:70,level:4,detail:"น้ำมาก",color:'#003CFA',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:30,level:3,detail:"น้ำปกติ",color:'#00B050',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:10,level:2,detail:"น้ำน้อย",color:'#FFC000',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'<=',val:10,level:1,detail:"น้ำน้อยวิกฤต",color:'#990000',warning:'แจ้งเตือน'}
                        */]
                    }, 
              '28':{key:"wave",data_str:"data/data",
                    basecols:{
                          disaster_type:"คาดการณ์คลื่น",
                          disaster_type_id:28,
                          DRM_state:"เฝ้าระวัง",
                          response:"response",
                          contract:"contract",
                          attr:"-",
                          val:"-"
                        },
                    cols:{lat:"",lon:"",
                          สถานี:"",
                          source:"",
                          ภาค:"geocode/area_name/th",
                          จังหวัด:"geocode/province_name/th",
                          อำเภอ:"geocode/amphoe_name/th",
                          ตำบล:"geocode/tumbon_name/th",
                          updated_date:""
                        },
                    levels:[/*{attr:"%ความจุลำน้ำ",op:'>',val:100,level:5,detail:"น้ำล้นตลิ่ง",color:'#FF0000',warning:'แจ้งเตือน'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:70,level:4,detail:"น้ำมาก",color:'#003CFA',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:30,level:3,detail:"น้ำปกติ",color:'#00B050',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'>',val:10,level:2,detail:"น้ำน้อย",color:'#FFC000',warning:'ปกติ'},
                          {attr:"%ความจุลำน้ำ",op:'<=',val:10,level:1,detail:"น้ำน้อยวิกฤต",color:'#990000',warning:'แจ้งเตือน'}
                        */]
                    }
              };

      // prep_json = [];

  var thaiwater_geojson = {"type": "FeatureCollection","features": []};

//  $.getJSON(url, function(data) {
    var data = url;
    //console.log("from jquery", data)
    //keys.forEach(function (key) {
    Object.values(keys).forEach(function (key) {
      var data_arr;
      // console.log("key",key);
      data_arr = getdata(data[key.key],key.data_str.split("/"));

      //console.log(key.key,data_arr);
      if (!data_arr) data_arr = [];
      // console.log(data_arr.length);
      //var index=0;
      data_arr.forEach(function(rec,index) {
        //index++;
        // console.log(index);
        var row = {};
        row['disaster_id'] =  key.basecols.disaster_type_id + '-' + (index+1);
        Object.keys(key.basecols).forEach(function (j) {
          row[j] = key.basecols[j];
        });
        Object.keys(key.cols).forEach(function(k){
          row[k] = (key.cols[k] == "") ? "": getdata(rec,key.cols[k].split("/"));
        });

        if (key.levels) {
          for (var i = 0; i<key.levels.length; i++) {
            var checked = false;
            // console.log(i);
            if (key.levels[i].op == '>') {
              checked = (row[key.levels[i].attr] > key.levels[i].val);
            } else if (key.levels[i].op == '<=') {
              checked = (row[key.levels[i].attr] <= key.levels[i].val);
            } else if (key.levels[i].op == '<') {
              checked = (row[key.levels[i].attr] < key.levels[i].val);
            } else if (key.levels[i].op == '=') {
              checked = (row[key.levels[i].attr] == key.levels[i].val);
            }
            if (checked) {
              row["level_id"] = key.levels[i].level;
              row["level_detail"] = key.levels[i].detail;
              row["color"] = key.levels[i].color;
              row["warning"] = key.levels[i].warning;
              i = key.levels.length;
            }
          }
          row.disaster_type_id = 10*row.disaster_type_id + row.level_id;
          row.updated_date = row.updated_date.split(" ")[0];
          //console.log(row.disaster_type_id);

        }



        // console.log("row",row.name);          
        // prep_json.push(row);
        var feature = {"geometry": {"coordinates": [], "type": "Point"}, "properties": {}, "type": "Feature"};
        feature.geometry.coordinates = [row.lon,row.lat];
        feature.properties = row;
        thaiwater_geojson.features.push(feature);          
      });          
    });
    // console.log("prep_json", prep_json);
    // console.log("geojson", thaiwater_geojson);
//  });

  return thaiwater_geojson;

} //---get_thaiwater_geojson()


  function getdata(json,str_arr) {
    // console.log(json,str_arr);
    var json_data=json;
    for (var i=0; i<str_arr.length; i++) {
      json_data = json_data[str_arr[i]];
    }
    return json_data;//(json_data == null)? []: json_data;
  }

// var symbol2 = {'20':{'icon':"0", 'visibility':'visible', 'dbclick':false, 'itemselected':false},
// /*1forest*/    '21':{'layername':"เขื่อน",    'icon': "❧",    'noti_type':'disaster',   'color':"#a2cc44",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,255,200,1)",  'size':1.6 ,'ispulse':0, 'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/dam_.png", 'icon_url':'img/1.png'},
// /*2air*/       '22':{'layername':"ระดับน้ำ",       'icon':"☢",    'noti_type':'disaster',   'color':"#ed207b",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,255,200,1)",  'size':1.4 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/waterlevel_.png", 'icon_url':'img/2.png'},
// /*3landslide*/ '23':{'layername':"คุณภาพน้ำ", 'icon':"☳",     'noti_type':'disaster',   'color':"#a9753c",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(210,200,255,1)",  'size':1.1 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/waterqaulity_.png", 'icon_url':'img/3.png'},
// /*4flood*/     '24':{'layername':"ฝน",     'icon':"♦",      'noti_type':'disaster',   'color':"#3b7dcb",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.2 ,'ispulse':1,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/rain_.png", 'icon_url':'img/4.png'},
// /*5drought*/   '25':{'layername':"พายุ",   'icon':"☭",     'noti_type':'disaster',   'color':"#f7c851",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.2 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/storm_.png", 'icon_url':'img/5.png'},
// /*6fire*/      '26':{'layername':"คาดการณ์ฝน",      'icon':"♨",    'noti_type':'disaster',   'color':"#f47320",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,235,200,1)",  'size':1.2 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/rainforecast_.png", 'icon_url':'img/6.png'},
// /*7hotspot*/   '27':{'layername':"พื้นที่เกิดสาธารณภัย",   'icon':"☀",    'noti_type':'disaster',   'color':"#e30713",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,200,200,1)",  'size':1.3 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/warning_.png", 'icon_url':'img/7.png'},
// /*8storm*/     '28':{'layername':"คาดการณ์คลื่น",     'icon':"♒",    'noti_type':'disaster',   'color':"#358ba4",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.1 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/wave_.png", 'icon_url':'img/8.png'},
// /*9heavyrain*/ '29':{'layername':"คาดการณ์น้ำหลาก", 'icon':"☂",    'noti_type':'disaster',   'color':"#33a1d2",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1.4 ,'ispulse':0,'visibility':'visible', 'dbclick':false, 'marker_url': "https://tunchz.github.io/ISOC/img/flashflood_.png", 'icon_url':'img/9.png'}
//                 }




// function load_thaiwater() {
//   var geojson = get_thaiwater_geojson('https://tunchz.github.io/ISOC/json/thaiwater30_public_thailand.json');
//   //var geojson = get_thaiwater_geojson('http://api2.thaiwater.net:9200/api/v1/thaiwater30/public/thailand');

//   console.log(geojson);

//   map.on(mapEvent, function () {
//     var temp={},item = 21;

//     temp[item] = {"type": "FeatureCollection"};
//     temp[item].features = $(geojson.features).filter(function (i,n){return n.properties.disaster_type_id == item});
//     //map_add_custommarker(temp[item],symbol2[item].layername,symbol2[item].marker_url,symbol2[item].color,0.15,45);
//     // tabulateimg(temp[item].features, ["icon_url","disaster_type","source","updated_date","level_detail","DRM_state","attr","val","response","contract","color"]);

//     // map.addSource('thaiwater', {
//     //   'type': 'geojson',
//     //   'data':temp[item]
//     // });    

//     // map.addLayer({
//     //   'id': 'สถานการณ์น้ำ',
//     //   'type': 'circle',
//     //   'source': 'thaiwater',
//     //   filter: ["==", ['get','disaster_type'], 'เขื่อน'],
//     //   layout: {
//     //       'visibility': 'visible'
//     //   },          
//     //   paint: {
//     //       'circle-color': ['get','color'],//'#f00',
//     //       'circle-radius': 2,
//     //       'circle-stroke-width': 0,
//     //       'circle-stroke-color': '#fff'
//     //   }
//     // });

//   });
// }