
  load_layers();



  async function load_layers() {

    //map_addlayer();
    map_addpiecluster();


    $.getJSON('https://tunchz.github.io/ISOC/DRM.json', function(drm_geojson) {

      //var map_geojson = await get_map_geojson;

      // filter : risk plan   
      var drm_geojson_riskplan = {"type": "FeatureCollection"};
      drm_geojson_riskplan.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id > 90});
      prov_color = {};
      for (i = 0; i < drm_geojson_riskplan.features.length; i++) {
        var prov_code = (drm_geojson_riskplan.features[i].properties.val).toString();
        var riskplan_code = drm_geojson_riskplan.features[i].properties.disaster_type_id - 90;
        var pcolor;

        switch (riskplan_code) {
          case 1:
            pcolor = "#f00";
            break;
          case 4:
            pcolor = "#00f";
            break;
          case 5:
            pcolor = "#ff0";
            break;
          default:
            pcolor = "#fff";
        }
        prov_color[prov_code]=pcolor;
      }

      $.getJSON('https://tunchz.github.io/mapth_small.json', function(map_geojson) {
        for (i = 0; i < map_geojson.features.length; i++) {
          var prov_c = map_geojson.features[i].properties.PROVINCE_C;
          if (typeof prov_color[prov_c] !== 'undefined') {
            map_geojson.features[i].properties['color'] = prov_color[prov_c];
            map_geojson.features[i].properties['opacity'] = 0.3;
          }else{
            map_geojson.features[i].properties['color'] = "#fff";
            map_geojson.features[i].properties['opacity'] = 0;
          }
        }      


        //map_addlayer2();
        map_addlayer(map_geojson);
        
        // icon for each disaster type id
        var symbol = [{'icon':"0"},
        /*1forest*/    {'icon': "https://tunchz.github.io/ISOC/img/marker_forest_green_s5.png",'textcolor':"rgba(255,255,255,1)",  'size':20},
        /*2air*/       {'icon':"☢",    'color':"rgba(50,50,50,1)",    'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,255,200,1)",  'size':1},
        /*3landslide*/ {'icon':"☳",     'color':"rgba(150,0,255,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(210,200,255,1)",  'size':0.7},
        /*4flood*/     {'icon':"♦",      'color':"rgba(0,0,255,1)",    'outlinecolor':"rgba(255,255,255,1)",   'pulsecolor':"rgba(200,200,255,1)",  'size':0.7},
        /*5drought*/   {'icon':"☭",     'color':"rgba(255,190,100,1)", 'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':0.8},
        /*6fire*/      {'icon':"♨",    'color':"rgba(255,100,0,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,235,200,1)",  'size':0.8},
        /*7hotspot*/   {'icon':"☀",    'color':"rgba(255,0,0,1)",     'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(255,200,200,1)",  'size':0.9},
        /*8storm*/     {'icon':"♒",    'color':"rgba(150,150,255,1)", 'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':0.7},
        /*9heavyrain*/ {'icon':"☂",    'color':"rgba(0,150,255,1)",   'outlinecolor':"rgba(255,255,255,1)",  'pulsecolor':"rgba(200,200,255,1)",  'size':1}]

        // filter : AIR AQI ☣    
        var drm_geojson_air = {"type": "FeatureCollection"};
        drm_geojson_air.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 2});
        map_add_pulsemarker(drm_geojson_air,"air_aqi",symbol[2].icon,symbol[2].color,symbol[2].outlinecolor,symbol[2].pulsecolor,symbol[2].size,false);
        //map_addlayer(prov_color).then(map_add_pulsemarker(drm_geojson_air,"air_aqi",'☢','rgba(255,255,255,1)','rgba(255,255,255,1)','rgba(255,255,200,1)',1));
        
        // filter : LANDSLIDE  ▼
        var drm_geojson_landslide = {"type": "FeatureCollection"};
        drm_geojson_landslide.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 3});
        map_add_pulsemarker(drm_geojson_landslide,"landslide",symbol[3].icon,symbol[3].color,symbol[3].outlinecolor,symbol[3].pulsecolor,symbol[3].size,false);

        // filter : Flood  ●   
        var drm_geojson_flood = {"type": "FeatureCollection"};
        drm_geojson_flood.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 4});
        map_add_pulsemarker(drm_geojson_flood,"flood",symbol[4].icon,symbol[4].color,symbol[4].outlinecolor,symbol[4].pulsecolor,symbol[4].size,true);

        // filter : drought  ◆   
        var drm_geojson_drought = {"type": "FeatureCollection"};
        drm_geojson_drought.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 5});
        map_add_pulsemarker(drm_geojson_drought,"drought",symbol[5].icon,symbol[5].color,symbol[5].outlinecolor,symbol[5].pulsecolor,symbol[5].size,false);

        // filter : Forest Fire     
        var drm_geojson_fire = {"type": "FeatureCollection"};
        drm_geojson_fire.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 6});
        map_add_pulsemarker(drm_geojson_fire,"fire",symbol[6].icon,symbol[6].color,symbol[6].outlinecolor,symbol[6].pulsecolor,symbol[6].size,false);

        // filter : Hotspot  ✶   
        var drm_geojson_hotspot = {"type": "FeatureCollection"};
        drm_geojson_hotspot.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 7});
        map_add_pulsemarker(drm_geojson_hotspot,"hotspot",symbol[7].icon,symbol[7].color,symbol[7].outlinecolor,symbol[7].pulsecolor,symbol[7].size,false);

        // filter : Storm
        var drm_geojson_storm = {"type": "FeatureCollection"};
        drm_geojson_storm.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 8});
        map_add_pulsemarker(drm_geojson_storm,"Storm",symbol[8].icon,symbol[8].color,symbol[8].outlinecolor,symbol[8].pulsecolor,symbol[8].size,false);

        // filter : Heavy Rain ☂
        var drm_geojson_rain = {"type": "FeatureCollection"};
        drm_geojson_rain.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 9});
        map_add_pulsemarker(drm_geojson_rain,"rain",symbol[9].icon,symbol[9].color,symbol[9].outlinecolor,symbol[9].pulsecolor,symbol[9].size,false);

        // filter : Forest
        var drm_geojson_forest = {"type": "FeatureCollection"};
        drm_geojson_forest.features = $(drm_geojson.features).filter(function (i,n){return n.properties.disaster_type_id == 1});
        //map_add_custommarker2(drm_geojson_forest,"custom_marker","img/marker_forest_green_s5.png",20);
        map_add_custommarker(drm_geojson_forest,"forest",symbol[1].icon,symbol[1].textcolor,1,symbol[1].size,true);

      });

    });

    //map_addpiecluster();



  }



//==Map Polygon================================================================================================



    function map_addlayer(map_geojson) {

        map.on('load', function () {
          map.addSource('mapth', { type: 'geojson', data: map_geojson });
          map.addLayer({
            'id': '_th_prov',
            'type': 'fill',
            'source': 'mapth',
            'paint': {
              'fill-color': ['get', 'color'],
              'fill-opacity': ['get', 'opacity']
            }
          });
          map.addLayer({
            'id': '_th_prov_bound',
            'type': 'line',
            'source': 'mapth',
            'paint': {
              'line-width': 1,
              'line-color': '#ddd',
              'line-opacity': 0.5
            }
          });
        // //Filter map layer
        // map.setFilter('th_prov_bound',["in", "PROVINCE_C", '63','50'])
        });

      console.log("map done")
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
      console.log("start",marker_text);
        var framesPerSecond = 30;
        var multiplier = 1;
        var opacity = 1;
        var textSize = 24;

      map.on('load', function(){
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
            opacity -= ( .8 / framesPerSecond );
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

      console.log("layer",marker_text);
    }

//==CUSTOM MARKER================================================================================================


//map_addcustommarker()


    function map_add_custommarker(datageojson,layername,imageurl,textcolor,size,offset) {
      //console.log(datageojson);
      map.on('load', function () {
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

      console.log("layer", layername)
    }

//=====================================================================================================

//     function map_add_custommarker2(datageojson,class_name,image,size) {
//       //console.log(data_geojson.features.length);
//       var data_geojson = datageojson;
//       // add markers to map
//       data_geojson.features.forEach(function (marker) {
//       //for (i = 0; i < data_geojson.features.length; i++) {
//         marker = data_geojson.features[i];
//         // create a DOM element for the marker
//         var el=document.createElement('div');
//         el.className=class_name;
//         //el.style.backgroundImage='url(https://placekitten.com/g/'+ marker.properties.iconSize.join('/') + '/)';
//         //el.style.width=marker.properties.iconSize[0] + 'px';
//         //el.style.height=marker.properties.iconSize[1] + 'px';
//         el.style.backgroundImage='url('+image+')';
//         el.style.width = size+'px';
//         el.style.height = size+'px';

//         el.addEventListener('click', function () {
//                 window.alert(marker.properties.message);
//             }

//         );

//         var popup = new mapboxgl.Popup({
//           offset : size+2,
//           closeButton: false,
//           closeOnClick: false
//         });

//         //map.on('mouseenter', 'earthquake_circle', function (e) {
//         el.addEventListener('mouseenter', function () {
//             map.getCanvas().style.cursor = 'pointer';
//             var coordinates = marker.geometry.coordinates.slice();
//             var a1 = marker.properties.disaster_type;
//             var a2 = marker.properties.level_detail;
//             popup
//               .setLngLat([coordinates[0],coordinates[1]])
//               .setHTML(
//                   'ภัย : ' + a1 + '<br>ระดับ : ' + a2
//               )
//               .addTo(map);
//         });

//         //map.on('mouseleave', 'earthquake_circle', function () {
//         el.addEventListener('mouseleave', function () {
//           map.getCanvas().style.cursor = '';
//           popup.remove();
//         });

//         // add marker to map
//         new mapboxgl.Marker(el, {offset: [0,(-size/2)]}) .setLngLat(marker.geometry.coordinates) .addTo(map);
//       });

//     }




// //=====================================================================================================

//     function map_addpulsemarker() {

//       var size = 80;
       
//       // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
//       // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
//       var pulsingDot = {
//         width: size,
//         height: size,
//         data: new Uint8Array(size * size * 4),
         
//         // get rendering context for the map canvas when layer is added to the map
//         onAdd: function () {
//           var canvas = document.createElement('canvas');
//           canvas.width = this.width;
//           canvas.height = this.height;
//           this.context = canvas.getContext('2d');
//         },
           
//         // called once before every frame where the icon will be used
//         render: function () {
//           var duration = 1000;
//           var t = (performance.now() % duration) / duration;
           
//           var radius = (size / 2) * 0.3;
//           var outerRadius = (size / 2) * 0.7 * t + radius;
//           var context = this.context;
           
//           // draw outer circle
//           context.clearRect(0, 0, this.width, this.height);
//           context.beginPath();
//           context.arc(
//             this.width / 2,
//             this.height / 2,
//             outerRadius,
//             0,
//             Math.PI * 2
//           );
//           context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
//           context.fill();
           
//           // draw inner circle
//           context.beginPath();
//           context.arc(
//             this.width / 2,
//             this.height / 2,
//             radius,
//             0,
//             Math.PI * 2
//           );
//           context.fillStyle = 'rgba(255, 10, 10, 1)';
//           context.strokeStyle = 'white';
//           context.lineWidth = 2 + 4 * (1 - t);
//           context.fill();
//           context.stroke();
           
//           // update this image's data with data from the canvas
//           this.data = context.getImageData(0,0,this.width,this.height).data;
           
//           // continuously repaint the map, resulting in the smooth animation of the dot
//           map.triggerRepaint();
           
//           // return `true` to let the map know that the image was updated
//           return true;
//         }
//       };
       
//       map.on('load', function () {
//         map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
         
//         map.addSource('points', {
//           'type': 'geojson',
//           'data': {
//             'type': 'FeatureCollection',
//             'features': [
//               {
//                 'type': 'Feature',
//                 'geometry': {
//                   'type': 'Point',
//                   'coordinates': [100.1673626,17.2808669]
//                 }
//               },
//               {
//                 'type': 'Feature',
//                 'geometry': {
//                   'type': 'Point',
//                   'coordinates': [101.1673626,13.2808669]
//                 }
//               }
//             ]




//             // "type": "Point",
//             // "coordinates": [100.1673626,17.2808669]
//           }
//         });

//         map.addLayer({
//           'id': 'points',
//           'type': 'symbol',
//           'source': 'points',
//           'layout': {
//             'icon-image': 'pulsing-dot'
//           }
//         });


//         map.on('mouseenter', 'points', function () {
//             map.getCanvas().style.cursor = 'pointer';
//         });
//         map.on('mouseleave', 'points', function () {
//             map.getCanvas().style.cursor = '';
//         });



//       });
//     }



//     function map_addpulsemarker2() {

//       var framesPerSecond = 50; 
//       var initialOpacity = 1
//       var opacity = initialOpacity;
//       var initialRadius = 6;
//       var radius = initialRadius;
//       var maxRadius = 25;


//       map.on('load', function () {

//           // Add a source and layer displaying a point which will be animated in a circle.
//           map.addSource('point', {
//               "type": "geojson",
//               "data": {
//                   "type": "Point",
//                   "coordinates": [102.073626,14.2]
//               }
//           });

//           map.addLayer({
//               "id": "outtercircle",
//               "source": "point",
//               "type": "circle",
//               "paint": {
//                   "circle-radius": initialRadius,
//                   "circle-radius-transition": {duration: 0},
//                   "circle-opacity-transition": {duration: 0},
//                   "circle-color": "#aaf"
//               }
//           });

//           map.addLayer({
//               "id": "innercircle",
//               "source": "point",
//               "type": "circle",
//               "paint": {
//                   "circle-radius": initialRadius,
//                   "circle-color": "#0000ff"
//               }
//           });


//           function animateMarker(timestamp) {
//               setTimeout(function(){
//                   requestAnimationFrame(animateMarker);

//                   radius += (maxRadius - radius) / framesPerSecond;
//                   opacity -= ( .9 / framesPerSecond );
//                   if (opacity < 0) { opacity = 0}

//                   map.setPaintProperty('outtercircle', 'circle-radius', radius);
//                   map.setPaintProperty('outtercircle', 'circle-opacity', opacity);

//                   if (opacity <= 0) {
//                       radius = initialRadius;
//                       opacity = initialOpacity;
//                   } 

//               }, 1000 / framesPerSecond);
              
//           }

//           // Start the animation.
//           animateMarker(0);


//         map.on('mouseenter', 'innercircle', function () {
//             map.getCanvas().style.cursor = 'pointer';
//         });
//         map.on('mouseleave', 'innercircle', function () {
//             map.getCanvas().style.cursor = '';
//         });




//       });

//     }





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


// map_addcustommarker()


//     function map_addcustommarker() {

//       map.on('load', function () {
//           map.loadImage(
//               'https://tunchz.github.io/ISOC/img/marker_forest_green_s5.png',
//               function (error, image) {
//                   if (error) throw error;
//                   map.addImage('marker_forest', image);
//                   map.addSource('pointforest', {
//                       'type': 'geojson',
//                       'data': {
//                           'type': 'FeatureCollection',
//                           'features': [
//                               {
//                                   'type': 'Feature',
//                                   'geometry': {
//                                       'type': 'Point',
//                                       'coordinates': [104.073626,15.52]
//                                   }
//                               }
//                           ]
//                       }
//                   });
//                   map.addLayer({
//                       'id': 'markerforest_01',
//                       'type': 'symbol',
//                       'source': 'pointforest',
//                       'layout': {
//                           'icon-image': 'marker_forest',
//                           'icon-size': 1
//                       }
//                   });
//               }
//           );
//       });


//     }


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

      map.on('load', function () {
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
              'id': 'earthquake_circle',
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
              'id': 'earthquake_label',
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
                  'text-size': 6
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

          map.on('mouseenter', 'earthquake_circle', function (e) {
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

          map.on('mouseleave', 'earthquake_circle', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });


          // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
          map.on('data', function (e) {
              //console.log('map on data : ',e.sourceId,e.isSourceLoaded);

              if (e.sourceId !== 'hotspotth' || !e.isSourceLoaded) return;

              //console.log('map on data pass!');
              //map.on('move', updateMarkers);
              //map.on('moveend', updateMarkers);
              updateMarkers();
          });
          map.on('move', updateMarkers);
          map.on('moveend', updateMarkers);
          //map.on('zoomend', updateMarkers);
          updateMarkers();

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

                      el.addEventListener('click', function () {
                              console.log("click")
                              window.alert("click");
                          }
                      );

                      var popup = new mapboxgl.Popup({
                        offset : 22,
                        closeButton: false,
                        closeOnClick: false
                      });

                      // //map.on('mouseenter', 'earthquake_circle', function (e) {
                      el.addEventListener('mouseenter', function () {
                          console.log("mouseenter")
                          map.getCanvas().style.cursor = 'pointer';
                          //var coordinates = marker.geometry.coordinates.slice();
                          // var a1 = "test";
                          // var a2 = "cluster marker" + i;
                          // popup
                          //   .setLngLat(coords)
                          //   .setHTML(
                          //       'Name : ' + a1 + '<br>Code : ' + a2
                          //   )
                          //   .addTo(map);
                      });

                      //map.on('mouseleave', 'earthquake_circle', function () {
                      el.addEventListener('mouseleave', function () {
                          console.log("mouseleave")
                          map.getCanvas().style.cursor = '';
                          //popup.remove();
                      });



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


          // map.addLayer( {

          //         id: 'clusters',
          //         type: 'circle',
          //         source: 'hotspotth',
          //         filter: ['has', 'point_count'],
          //         paint: {
          //             // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          //             // with three steps to implement three types of circles:
          //             //   * Blue, 20px circles when point count is less than 100
          //             //   * Yellow, 30px circles when point count is between 100 and 750
          //             //   * Pink, 40px circles when point count is greater than or equal to 750
          //             'circle-color': [ 'step',['get', 'point_count'],
          //               '#fff',100,
          //               '#fff',750,
          //               '#fff'],
          //             'circle-radius': [ 'step',['get', 'point_count'],
          //               7,10,
          //               9,100,
          //               10,1000,
          //               15],
          //             'circle-opacity': 0.7,
          //         }
          //     }

          // );

          // map.addLayer( {

          //         id: 'cluster-count',
          //         type: 'symbol',
          //         source: 'hotspotth',
          //         filter: ['has', 'point_count'],
          //         layout: {
          //             'text-field': '{point_count}',
          //             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          //             'text-size': 11
          //         }
          //     }

          // );



          // // inspect a cluster on click
          // map.on('click', 'clusters', function (e) {
          //         var features=map.queryRenderedFeatures(e.point, {
          //                 layers: ['clusters']
          //             }

          //         );
          //         var clusterId=features[0].properties.cluster_id;

          //         map.getSource('hotspotth').getClusterExpansionZoom(clusterId,
          //             function (err, zoom) {
          //                 if (err) return;

          //                 map.easeTo( {
          //                         center: features[0].geometry.coordinates,
          //                         zoom: zoom
          //                     }

          //                 );
          //             }

          //         );
          //     }

          // );


          // map.on('click', 'unclustered-point', function (e) {
          //         var coordinates=e.features[0].geometry.coordinates.slice();
          //         var mag=e.features[0].properties.mag;
          //         var tsunami;

          //         if (e.features[0].properties.tsunami===1) {
          //             tsunami='yes';
          //         }

          //         else {
          //             tsunami='no';
          //         }

          //         // Ensure that if the map is zoomed out such that
          //         // multiple copies of the feature are visible, the
          //         // popup appears over the copy being pointed to.
          //         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //             coordinates[0] +=e.lngLat.lng > coordinates[0] ? 360 : -360;
          //         }

          //         new mapboxgl.Popup() .setLngLat(coordinates) .setHTML('magnitude: '+ mag + '<br>Was there a tsunami?: '+ tsunami) .addTo(map);
          //     }

          // );

          // map.on('mouseenter', 'clusters', function () {
          //         map.getCanvas().style.cursor='pointer';
          //     }

          // );

          // map.on('mouseleave', 'clusters', function () {
          //         map.getCanvas().style.cursor='';
          //     }

          // );

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
            '" text-anchor="middle" style="font: ' + fontSize + 'Roboto Black; display: block; ">';


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




