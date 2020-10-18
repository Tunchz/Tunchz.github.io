
  

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
  var symbol = {'0':{'icon':"0"},
  /*1forest*/    '1':{'layername':"forest",    'icon': "❧",    'color':"rgba(52,168,83,1)",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,255,200,1)",  'size':1.2 ,'visibility':'visible', 'dbclick':false},
  /*2air*/       '2':{'layername':"air",       'icon':"☢",    'color':"rgba(108,132,146,1)",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,255,200,1)",  'size':1 ,'visibility':'visible', 'dbclick':false},
  /*3landslide*/ '3':{'layername':"landslide", 'icon':"☳",     'color':"rgba(132,52,135,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(210,200,255,1)",  'size':0.7 ,'visibility':'visible', 'dbclick':false},
  /*4flood*/     '4':{'layername':"flood",     'icon':"♦",      'color':"rgba(49,76,205,1)",    'outlinecolor':"rgba(255,255,255,1)",   'pulsecolor':"rgba(200,200,255,1)",  'size':0.8 ,'visibility':'visible', 'dbclick':false},
  /*5drought*/   '5':{'layername':"drought",   'icon':"☭",     'color':"rgba(255,190,100,1)", 'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':0.8 ,'visibility':'visible', 'dbclick':false},
  /*6fire*/      '6':{'layername':"fire",      'icon':"♨",    'color':"rgba(227,116,0,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,235,200,1)",  'size':0.8 ,'visibility':'visible', 'dbclick':false},
  /*7hotspot*/   '7':{'layername':"hotspot",   'icon':"☀",    'color':"rgba(197,34,31,1)",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,200,200,1)",  'size':0.9 ,'visibility':'visible', 'dbclick':false},
  /*8storm*/     '8':{'layername':"storm",     'icon':"♒",    'color':"rgba(18,158,175,1)", 'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':0.7 ,'visibility':'visible', 'dbclick':false},
  /*9heavyrain*/ '9':{'layername':"heavyrain", 'icon':"☂",    'color':"rgba(156,192,249,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1 ,'visibility':'visible', 'dbclick':false},
  /*riskplan*/  '91':{'layername':"risk_forest", 'icon':"█",   'color':"#ff0000",'opacity':0.3 ,'visibility':'visible', 'dbclick':false},
  /*riskplan*/  '94':{'layername':"risk_flood",  'icon':"█",   'color':"#0000ff",'opacity':0.3 ,'visibility':'visible', 'dbclick':false},
  /*riskplan*/  '95':{'layername':"risk_drought",'icon':"█",   'color':"#f6b513",'opacity':0.3 ,'visibility':'visible', 'dbclick':false}
                  }
  var drm_list = [1,2,3,4,5,6,7,8,9,91,94,95];
  var risknoti_list = [1,2,3,4,5,6,7,8,9];
  var riskplan_list = [91,94,95];
  var disaster_risk_list_summary;
  var unselectedcolor = "#555"

  async function load_map_layers() {

    //map_addlayer();
    map_addpiecluster();


    $.getJSON('https://tunchz.github.io/ISOC/DRM.json', function(drm_geojson) {

      //var map_geojson = await get_map_geojson;

      $.getJSON('https://tunchz.github.io/mapth_small.json', function(map_geojson) {

        // Add map province outline
        map_addlayer(map_geojson);

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
            prov_color[prov_code]={'disaster_type':drm_geojson_riskplan.features[i].properties.disaster_type};
          }

          // filter : risk plan provinces
          var map_geojson_riskplan = {"type": "FeatureCollection"};
          map_geojson_riskplan.features = $(map_geojson.features).filter(function (i,n){return (typeof prov_color[n.properties.PROVINCE_C] !== 'undefined')});
          //console.log("riskplan ",map_geojson_riskplan);


          // Add color & opacity for risk plan in each province
          for (i = 0; i < map_geojson_riskplan.features.length; i++) {
            var prov_c = map_geojson_riskplan.features[i].properties.PROVINCE_C;
            map_geojson_riskplan.features[i].properties['disaster_type'] = prov_color[prov_c].disaster_type;
            map_geojson_riskplan.features[i].properties['color'] = symbol[item].color;//prov_color[prov_c].color;
            map_geojson_riskplan.features[i].properties['opacity'] = symbol[item].opacity;
          }      
          // Add map with color province corresponding to risk plan
          map_add_polygon(map_geojson_riskplan,symbol[item].layername);
        
        });

        // Add Risk Notification Layer ----------------------------------------------
        var drm_geojson_filtered = {};
        risknoti_list.forEach(function (item, index) {

          drm_geojson_filtered[item] = {"type": "FeatureCollection"};
          drm_geojson_filtered[item].features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == item});
          map_add_pulsemarker(drm_geojson_filtered[item],symbol[item].layername,symbol[item].icon,symbol[item].color,symbol[item].outlinecolor,symbol[item].pulsecolor,symbol[item].size,false);

        });


        // Add Risk Notification Layer ----------------------------------------------
        map_addpiecluster();


        

        // Build array for table image marker
        var drm = [];
        var disaster_type_id;
        for (i = 0; i < drm_geojson.features.length; i++) {
          drm.push(drm_geojson.features[i].properties);
          disaster_type_id = drm_geojson.features[i].properties.disaster_type_id;
          drm[i]['icon'] = symbol[disaster_type_id].icon;
          if (disaster_type_id < 90) {
            drm[i]['color'] = symbol[disaster_type_id].color;
          } else {
            drm[i]['color'] = symbol[disaster_type_id].color+"66";
          }
          
        }
        display_table_markers(drm);


      }); //get map_geo_json

    }); //get drm_geo_json

    //map_addpiecluster();



  }



//==Map Polygon================================================================================================



    function map_addlayer(map_geojson) {
        var layername = 'map_th_prov'
        map.on('style.load', function () {
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
              'line-color': '#aaa',
              'line-opacity': 0.5
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
            var prov = e.features[0].properties.PROVINCE_N;
             popup
              .setLngLat(e.lngLat)
              .setHTML(
                  'จังหวัด : ' + prov
              )
              .addTo(map);
        });

        // map.on('mouseenter', layername, function () {
        //   map.getCanvas().style.cursor = 'pointer';
        // });

        map.on('mouseleave', layername, function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });




        });

      //console.log("map done")
    }

    function map_add_polygon(map_geojson,layername) {
        //var layername = 'map_th_prov'
        map.on('style.load', function () {
          map.addSource(layername, { type: 'geojson', data: map_geojson });
          map.addLayer({
            'id': layername,
            'type': 'fill',
            'source': layername,
            'paint': {
              'fill-color': ['get', 'color'],
              'fill-opacity': ['get', 'opacity']
            }
          });
          map.addLayer({
            'id': layername+'_bound',
            'type': 'line',
            'source': layername,
            'paint': {
              'line-width': 2,
              'line-color': '#fff',
              'line-opacity': 0
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
        });

        map.on('mouseenter', layername, function () {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', layername, function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });




        });

      //console.log("map done")
    }


    // function map_addlayer2() {
    //   var url = "https://tunchz.github.io/mapth_small.json"
    //   map.on('load', function () {
    //     map.addSource('mapth', { type: 'geojson', data: url });
    //     map.addLayer({
    //       'id': 'th_prov',
    //       'type': 'fill',
    //       'source': 'mapth',
    //       'paint': {
    //         'fill-color': [
    //                   'case',
    //                   ['==', ['get', 'PROVINCE_C'], '63'],'#ff0',
    //                   ['==', ['get', 'PROVINCE_C'], '50'],'#f00',
    //                   ['==', ['get', 'PROVINCE_C'], '30'],'#00f',
    //                   '#2a58c3'],
    //         'fill-opacity': [
    //                   'case',
    //                   ['==', ['get', 'PROVINCE_C'], '63'],0.3,
    //                   ['==', ['get', 'PROVINCE_C'], '50'],0.3,
    //                   ['==', ['get', 'PROVINCE_C'], '30'],0.3,
    //                   0]
    //       }
    //     });
    //     map.addLayer({
    //       'id': 'th_prov_bound',
    //       'type': 'line',
    //       'source': 'mapth',
    //       'paint': {
    //         'line-width': 1,
    //         'line-color': '#ddd',
    //         'line-opacity': 0.5
    //       }
    //     });
    //   // //Filter map layer
    //   // map.setFilter('th_prov_bound',["in", "PROVINCE_C", '63','50'])
    //   });
    // }

//==Pulsing Marker================================================================================================

    function map_add_pulsemarker(data_geojson,layername,marker_text,color_base,color_outline,color_pulse,size,ispulse) {
      //console.log("start",marker_text);
        var framesPerSecond = 30;
        var multiplier = 1;
        var opacity = 1;
        var textSize = 24;

      map.on('style.load', function(){
        map.addSource(layername, {
          'type': 'geojson',
          'data': data_geojson
        });

        var baseLayout = {
          'text-field': marker_text,
          'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
          'text-size': Math.round(24*size),
          // 'text-padding': 60,
          // 'text-allow-overlap': true,
          'text-ignore-placement': true
        }

        var basePaint = {
          'text-color': color_base,
          'text-opacity': 1,
        }

        map.addLayer({
          'id': layername+'-pulse',
          'type': 'symbol',
          'source': layername,
          'layout': baseLayout,
          'paint': basePaint
        })

        map.addLayer({
          'id': layername+'-outline',
          'type': 'symbol',
          'source': layername,
          'layout': {
            'text-field': marker_text,
            'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
            'text-size': Math.round(28*size),
            'text-ignore-placement': true
          },
          'paint': {
            'text-color': color_outline,
            'text-opacity': 1,
          }
        });

        map.addLayer({
          'id': layername,
          'type': 'symbol',
          'source': layername,
          'layout': baseLayout,
          'paint': basePaint
        });

        // if (true) {
          map.addLayer({
              'id': layername+'-label',
              'type': 'symbol',
              'source': layername,
              'layout': {
                  'text-field': ['get', 'val'],
                  'text-font': ['Roboto Black', 'Arial Unicode MS Bold'],
                  'text-ignore-placement': true,
                  'text-offset': [0, -1.7*size],
                  'text-size': 8
              },
              'paint': {
                  'text-color': color_base,
                  'text-opacity': 1,
              }
          });
        // }

        map.setPaintProperty(layername+'-pulse', 'text-color', color_pulse)
        map.setLayoutProperty(layername+'-pulse', 'text-size', 24)

        function pulseMarker(timestamp){
          setTimeout(function() {
            requestAnimationFrame(pulseMarker)

            multiplier += .1;
            opacity -= ( .6 / framesPerSecond );
            textSize += ( Math.round(36*size) / framesPerSecond );

            map.setPaintProperty(layername+'-pulse', 'text-opacity', opacity)
            map.setLayoutProperty(layername+'-pulse', 'text-size', textSize)

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
      map.on('style.load', function () {
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
                        'id': layername+'-label',
                        'type': 'symbol',
                        'source': layername,
                        'layout': {
                            'text-field': ['get', 'val'],
                            'text-font': ['Roboto Black', 'Arial Unicode MS Bold'],
                            'text-ignore-placement': true,
                            'text-offset': [0, -size*3],
                            'text-size': 8
                        },
                        'paint': {
                            'text-color': textcolor,
                            'text-opacity': 1,
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


      });

      //console.log("layer", layername)
    }



//==CLUSTER================================================================================================


    // function map_addcluster() {

    //   map.on('load', function () {
    //       // Add a new source from our GeoJSON data and
    //       // set the 'cluster' option to true. GL-JS will
    //       // add the point_count property to your source data.
    //       map.addSource('earthquakes', {
    //           type: 'geojson',
    //           // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    //           // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
    //           data:
    //               'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    //           cluster: true,
    //           clusterMaxZoom: 14, // Max zoom to cluster points on
    //           clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    //       });

    //       map.addLayer({
    //           id: 'clusters',
    //           type: 'circle',
    //           source: 'earthquakes',
    //           filter: ['has', 'point_count'],
    //           paint: {
    //               // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    //               // with three steps to implement three types of circles:
    //               //   * Blue, 20px circles when point count is less than 100
    //               //   * Yellow, 30px circles when point count is between 100 and 750
    //               //   * Pink, 40px circles when point count is greater than or equal to 750
    //               'circle-color': [
    //                   'step',
    //                   ['get', 'point_count'],
    //                   '#51bbd6',
    //                   100,
    //                   '#f1f075',
    //                   750,
    //                   '#f28cb1'
    //               ],
    //               'circle-radius': [
    //                   'step',
    //                   ['get', 'point_count'],
    //                   10,
    //                   100,
    //                   15,
    //                   750,
    //                   20
    //               ]
    //           }
    //       });

    //       map.addLayer({
    //           id: 'cluster-count',
    //           type: 'symbol',
    //           source: 'earthquakes',
    //           filter: ['has', 'point_count'],
    //           layout: {
    //               'text-field': '{point_count_abbreviated}',
    //               'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //               'text-size': 12
    //           }
    //       });

    //       map.addLayer({
    //           id: 'unclustered-point',
    //           type: 'circle',
    //           source: 'earthquakes',
    //           filter: ['!', ['has', 'point_count']],
    //           paint: {
    //               'circle-color': '#11b4da',
    //               'circle-radius': 4,
    //               'circle-stroke-width': 1,
    //               'circle-stroke-color': '#fff'
    //           }
    //       });

    //       // inspect a cluster on click
    //       map.on('click', 'clusters', function (e) {
    //           var features = map.queryRenderedFeatures(e.point, {
    //               layers: ['clusters']
    //           });
    //           var clusterId = features[0].properties.cluster_id;
    //           map.getSource('earthquakes').getClusterExpansionZoom(
    //               clusterId,
    //               function (err, zoom) {
    //                   if (err) return;

    //                   map.easeTo({
    //                       center: features[0].geometry.coordinates,
    //                       zoom: zoom
    //                   });
    //               }
    //           );
    //       });

    //       var popup = new mapboxgl.Popup({
    //         closeButton: false,
    //         closeOnClick: false
    //       });


    //       // When a click event occurs on a feature in
    //       // the unclustered-point layer, open a popup at
    //       // the location of the feature, with
    //       // description HTML from its properties.
    //       map.on('click', 'unclustered-point', function (e) {
    //           var coordinates = e.features[0].geometry.coordinates.slice();
    //           var mag = e.features[0].properties.mag;
    //           var tsunami;

    //           if (e.features[0].properties.tsunami === 1) {
    //               tsunami = 'yes';
    //           } else {
    //               tsunami = 'no';
    //           }

    //           // Ensure that if the map is zoomed out such that
    //           // multiple copies of the feature are visible, the
    //           // popup appears over the copy being pointed to.
    //           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //               coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //           }

    //           popup
    //               .setLngLat(coordinates)
    //               .setHTML(
    //                   'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
    //               )
    //               .addTo(map);
    //       });

    //       map.on('mouseenter', 'clusters', function () {
    //           map.getCanvas().style.cursor = 'pointer';
    //       });
    //       map.on('mouseleave', 'clusters', function () {
    //           map.getCanvas().style.cursor = '';
    //       });

    //       map.on('mouseenter', 'unclustered-point', function (e) {
    //           map.getCanvas().style.cursor = 'pointer';
    //           var coordinates = e.features[0].geometry.coordinates.slice();
    //           var mag = e.features[0].properties.mag;
    //           var tsunami;

    //           if (e.features[0].properties.tsunami === 1) {
    //               tsunami = 'yes';
    //           } else {
    //               tsunami = 'no';
    //           }

    //           // Ensure that if the map is zoomed out such that
    //           // multiple copies of the feature are visible, the
    //           // popup appears over the copy being pointed to.
    //           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //               coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //           }

    //           popup
    //               .setLngLat(coordinates)
    //               .setHTML(
    //                   'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
    //               )
    //               .addTo(map);
    //       });

    //       map.on('mouseleave', 'unclustered-point', function () {
    //           map.getCanvas().style.cursor = '';
    //           popup.remove();
    //       });


    //   });


    // }





//==PIE CLUSTER================================================================================================

    function map_addpiecluster() {

$.getJSON('https://tunchz.github.io/ISOC/hotspotth.geojson', function(data_hotspot) {

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

      map.on('style.load', function () {
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
                  'circle-radius': 6
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
          map.on('style.load', function (e) {
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
          var r = total >= 1000 ? 30 : total >= 100 ? 22 : total >= 10 ? 18 : 16;
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


    // tabulateimg(List_filtered, ["img","id","dept","date","timein","last","mood","status","detection"]);
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
        .attr('id',function(d) {return 'id-'+d.disaster_type});

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
        .append('div')
        .attr('class', function (d) {return'table_img_marker_container image_marker_'+ d.disaster_type})
        .style("border",function (d) {return (d.color.length != 9) ? "2px solid " + d.color : "2px solid " + d.color.substr(0,7);})
        .append('th')
            .attr('class', 'marker_icon')
            .text(function(d) {return d.column == columns[0] ?  d.value : null;})
            .style("color",function (d) {return d.color})


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
          //d3.select("#map").selectAll(".marker").style('opacity',0.6);
          var zoom = 2;

          if (e.disaster_type_id < 90 ) {
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-outline', 'text-size', zoom*Math.round(28*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'text-size', zoom*Math.round(24*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-size', 12);
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-offset', [0, -1.8*symbol[e.disaster_type_id].size]);
          } else {
            map.setPaintProperty(symbol[e.disaster_type_id].layername, 'fill-opacity',1);
            map.setPaintProperty(symbol[e.disaster_type_id].layername+'_bound','line-opacity',1);
          }
        })
        .on('mouseout', function(e) { 
          if (e.disaster_type_id < 90 ) {
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-outline', 'text-size', Math.round(28*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'text-size', Math.round(24*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-size', 8);
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-offset', [0, -1.7*symbol[e.disaster_type_id].size]);
          } else {
            map.setPaintProperty(symbol[e.disaster_type_id].layername, 'fill-opacity',symbol[e.disaster_type_id].opacity);
            map.setPaintProperty(symbol[e.disaster_type_id].layername+'_bound','line-opacity',0);
          }
        })
        .on('click', function(e) { })
        .on('dblclick', function(e) {  
          swithUnselectVisibility(e.disaster_type_id);
        })
        .on('contextmenu', function(e) { 
          swithLayerVisibility(e.disaster_type_id);
        });


      return table;
    }

    function swithUnselectVisibility(disaster_type_id) {
          drm_list.forEach(function (item, index) {
            if (!symbol[disaster_type_id].dbclick) {              
                symbol[item].visibility = 'visible';                              
            } else {
                symbol[item].visibility = 'none';                
            }
            if (disaster_type_id == item) {
              symbol[disaster_type_id].visibility = 'none';
            } else {
              symbol[item].dbclick = false;
            }
            swithLayerVisibility(item);
          })
          symbol[disaster_type_id].dbclick = !symbol[disaster_type_id].dbclick;
    }

    function swithLayerVisibility(disaster_type_id) {

      var marker = document.getElementsByClassName('image_marker_'+disaster_type_id);
      if (symbol[disaster_type_id].visibility == 'none') {            
        marker[0].style.border = "2px solid " + symbol[disaster_type_id].color;
        marker[0].style.backgroundColor = "#fff";
        marker[1].style.border = "2px solid " + symbol[disaster_type_id].color;
        marker[1].style.backgroundColor = "#fff";
        symbol[disaster_type_id].visibility = 'visible';
      } else {
        marker[0].style.border = "2px solid " + unselectedcolor;
        marker[0].style.backgroundColor = unselectedcolor;
        marker[1].style.border = "2px solid " + unselectedcolor;
        marker[1].style.backgroundColor = unselectedcolor;
        symbol[disaster_type_id].visibility = 'none';
      }


      if (disaster_type_id < 90 ) {
        map.setLayoutProperty(symbol[disaster_type_id].layername+'-pulse', 'visibility', symbol[disaster_type_id].visibility);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'-outline', 'visibility', symbol[disaster_type_id].visibility);
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'visibility', symbol[disaster_type_id].visibility);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'-label', 'visibility', symbol[disaster_type_id].visibility);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'-label', 'visibility', symbol[disaster_type_id].visibility);
      } else {
        map.setLayoutProperty(symbol[disaster_type_id].layername, 'visibility', symbol[disaster_type_id].visibility);
        map.setLayoutProperty(symbol[disaster_type_id].layername+'_bound', 'visibility', symbol[disaster_type_id].visibility);
      }
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
        .attr('id','table_col_marker'/*function(d) {return 'col-'+d.row_no}*/)
        //.style("width","100px")
        ;

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
        .append('div')
        .attr('class', function (d) {return'table_img_marker_container image_marker_'+ d.disaster_type})
        .style("border",function (d) {return (d.color.length != 9) ? "2px solid " + d.color : "2px solid " + d.color.substr(0,7);})
        .append('th')
            .attr('class', 'marker_icon')
            .text(function(d) {return d.column == columns[0] ?  d.value : null;})
            .style("color",function (d) {return d.color})


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
          //d3.select("#map").selectAll(".marker").style('opacity',0.6);
          var zoom = 2;

          if (e.disaster_type_id < 90 ) {
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-outline', 'text-size', zoom*Math.round(28*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'text-size', zoom*Math.round(24*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-size', 12);
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-offset', [0, -1.8*symbol[e.disaster_type_id].size]);
          } else {
            map.setPaintProperty(symbol[e.disaster_type_id].layername, 'fill-opacity',1);
            map.setPaintProperty(symbol[e.disaster_type_id].layername+'_bound','line-opacity',1);
          }
        })
        .on('mouseout', function(e) { 
          if (e.disaster_type_id < 90 ) {
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-outline', 'text-size', Math.round(28*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'text-size', Math.round(24*symbol[e.disaster_type_id].size));
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-size', 8);
            map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'text-offset', [0, -1.7*symbol[e.disaster_type_id].size]);
          } else {
            map.setPaintProperty(symbol[e.disaster_type_id].layername, 'fill-opacity',symbol[e.disaster_type_id].opacity);
            map.setPaintProperty(symbol[e.disaster_type_id].layername+'_bound','line-opacity',0);
          }
        })
        .on('click', function(e) { })
        .on('dblclick', function(e) {  
          swithUnselectVisibility(e.disaster_type_id);
        })
        .on('contextmenu', function(e) { 
          swithLayerVisibility(e.disaster_type_id);
          // var marker = document.getElementsByClassName('image_marker_'+e.disaster_type_id);
          // if (symbol[e.disaster_type_id].visibility == 'none') {            
          //   marker[0].style.border = "2px solid " + symbol[e.disaster_type_id].color;
          //   marker[0].style.backgroundColor = "#fff";
          //   marker[1].style.border = "2px solid " + symbol[e.disaster_type_id].color;
          //   marker[1].style.backgroundColor = "#fff";
          //   symbol[e.disaster_type_id].visibility = 'visible';
          // } else {
          //   marker[0].style.border = "2px solid " + unselectedcolor;
          //   marker[0].style.backgroundColor = unselectedcolor;
          //   marker[1].style.border = "2px solid " + unselectedcolor;
          //   marker[1].style.backgroundColor = unselectedcolor;
          //   symbol[e.disaster_type_id].visibility = 'none';
          // }
          // if (e.disaster_type_id < 90 ) {
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-pulse', 'visibility', symbol[e.disaster_type_id].visibility);
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-outline', 'visibility', symbol[e.disaster_type_id].visibility);
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'visibility', symbol[e.disaster_type_id].visibility);
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'visibility', symbol[e.disaster_type_id].visibility);
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername+'-label', 'visibility', symbol[e.disaster_type_id].visibility);
          // } else {
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername, 'visibility', symbol[e.disaster_type_id].visibility);
          //   map.setLayoutProperty(symbol[e.disaster_type_id].layername+'_bound', 'visibility', symbol[e.disaster_type_id].visibility);
          // }

        });



      return table;
    }



    function display_table_markers(disaster_risk_list) {

        //console.log(disaster_risk_list);


// var data=[ 
//  { "category" : "Search Engines", "hits" : 5, "bytes" : 50189 },
//  { "category" : "Content Server", "hits" : 1, "bytes" : 17308 },
//  { "category" : "Content Server", "hits" : 1, "bytes" : 47412 },
//  { "category" : "Search Engines", "hits" : 1, "bytes" : 7601 },
//  { "category" : "Business", "hits" : 1, "bytes" : 2847 },
//  { "category" : "Content Server", "hits" : 1, "bytes" : 24210 },
//  { "category" : "Internet Services", "hits" : 1, "bytes" : 3690 },
//  { "category" : "Search Engines", "hits" : 6, "bytes" : 613036 },
//  { "category" : "Search Engines", "hits" : 1, "bytes" : 2858 } 
// ];

// var res = alasql('SELECT category, sum(hits) AS hits, sum(bytes) as bytes \
// FROM ? \
// GROUP BY category \
// ORDER BY bytes DESC',[data]);

        disaster_risk_list_summary = alasql('SELECT disaster_type_id, disaster_type, icon, color, "" as blank, count(*) as num_rec \ FROM ?\ GROUP BY disaster_type_id, disaster_type, icon, color',[disaster_risk_list]);
        //var res = alasql("SELECT disaster_type, count(*) as num_rec \ FROM ?\ GROUP BY disaster_type",[disaster_risk_list]);
        //console.log(res);

        // Initialize crossfilter variable for Disaster Risk List
        var drl = crossfilter(disaster_risk_list);
        drl.dtype_id = drl.dimension(function(d) { return d.disaster_type_id; });
        dtype_id_group = drl.dtype_id.group();
        //console.log(drl.dtype_id.bottom(Infinity));
        //console.log(dtype_id_group.all());
        //tabulateimg_marker(res, ["icon","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
        //tabulateimg_marker(res, ["icon","num_rec","blank","\u00a0","blank","blank","blank","blank","blank","color"]);



        //vertabulateimg_marker(res, ["icon","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);

        switchShortNoti();

    }












    function startMap() {

      //hide 
      // document.getElementById("video-container").style.display = "none";
      // document.getElementById("map-container").style.display = "block";
      map.resize();

      //document.getElementById("stop-button").innerHTML = "■";
      var menubtn = document.createElement("button");
      menubtn.id = "lp-button";
      menubtn.className = "map-menu-button";
      //stopbtn.style.margin = "-20px 0px 0px 0px";
      menubtn.style.padding = "0px 0px";
      menubtn.setAttribute('type', 'button');
      //stopbtn.setAttribute('onclick', 'inputMenu()');
      menubtn.setAttribute('onclick', 'switchShortNoti()');
      document.getElementById("menu-container-top-right").append(menubtn);
      //document.getElementById("stop-button").innerHTML = "☷■⌂";
      document.getElementById("lp-button").innerHTML = "↹";


      //document.getElementById("stop-button").innerHTML = "■";
      var menubtn = document.createElement("button");
      menubtn.id = "bb-button";
      menubtn.className = "map-menu-button";
      //stopbtn.style.margin = "-20px 0px 0px 0px";
      menubtn.style.padding = "0px 0px";
      menubtn.setAttribute('type', 'button');
      //stopbtn.setAttribute('onclick', 'inputMenu()');
      menubtn.setAttribute('onclick', 'switchRightpanel()');
      document.getElementById("menu-container-top-right").append(menubtn);
      //document.getElementById("stop-button").innerHTML = "☰⌷↹■⌂";
      document.getElementById("bb-button").innerHTML = "☷";


    }


    function switchShortNoti() {
      var w;
      var removetable = document.getElementById('table_image_marker');
      removetable.parentElement.removeChild(removetable);    
      removetable = document.getElementById('vertical_table_image_marker');
      removetable.parentElement.removeChild(removetable);    
      if (shortnoti==0) {
        document.getElementById('notification-container-right').style.width = "70px";
        tabulateimg_marker(disaster_risk_list_summary, ["icon","num_rec","blank","\u00a0","blank","blank","blank","blank","blank","color"]);
        vertabulateimg_marker(disaster_risk_list_summary, ["icon","num_rec","blank","\u00a0","blank","blank","blank","blank","blank","color"]);
        w = "55px";
        shortnoti = 1;
      } else {
        document.getElementById('notification-container-right').style.width = "100px";
        tabulateimg_marker(disaster_risk_list_summary, ["icon","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
        vertabulateimg_marker(disaster_risk_list_summary, ["icon","num_rec","blank","disaster_type","blank","blank","blank","blank","blank","color"]);
        w = "90px";
        shortnoti = 0;
      }
        var doc = document.getElementsByClassName('table_col_marker');
        for (i=0;i<doc.length;i++) {doc[i].style.width = w;} 
    }

    function switchRightpanel() {
      if (rightpanel_isopen == 0) {
      document.getElementById("left-panel").style.width = "66.67%";
      document.getElementById("right-panel").style.width = "33.33%";
      document.getElementById("right-panel").style.display = "block";  
      rightpanel_isopen = 1;
      } else {
      document.getElementById("left-panel").style.width = "100%";
      //document.getElementById("right-panel").style.width= "5%";
      document.getElementById("right-panel").style.display = "none";
      rightpanel_isopen = 0;
      }
      resizeAdjust()  
    }



    