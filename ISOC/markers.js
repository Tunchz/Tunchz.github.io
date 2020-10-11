


    map_addlayer();

    map_addpiecluster();


    map_addpulsemarker();
    map_addpulsemarker2();
    map_addpulsemarker3();
    map_addpulsemarker4();


    map_addcustommarker2();

    // map_addcluster();



    function map_addlayer() {

      //var url = "https://gist.githubusercontent.com/milafrerichs/78ef5702db2dc514fc2bed465d58406b/raw/f1366ee2a83a9afb1dd2427e9cbd4cd3db8d87ca/bundeslaender_simplify200.geojson";
      var url = "https://tunchz.github.io/mapth_small.json"

      map.on('load', function () {
        map.addSource('mapth', { type: 'geojson', data: url });
        map.addLayer({
          'id': 'th_prov',
          'type': 'fill',
          'source': 'mapth',
          'paint': {
            'fill-color': [
                      'case',
                      ['==', ['get', 'PROVINCE_C'], '63'],'#ff0',
                      ['==', ['get', 'PROVINCE_C'], '50'],'#f00',
                      ['==', ['get', 'PROVINCE_C'], '30'],'#00f',
                      '#2a58c3'],
            'fill-opacity': [
                      'case',
                      ['==', ['get', 'PROVINCE_C'], '63'],0.4,
                      ['==', ['get', 'PROVINCE_C'], '50'],0.4,
                      ['==', ['get', 'PROVINCE_C'], '30'],0.4,
                      0]
          }
        });
        map.addLayer({
          'id': 'th_prov_bound',
          'type': 'line',
          'source': 'mapth',
          'paint': {
            'line-width': 1,
            'line-color': '#ddd',
            'line-opacity': 0.5
          }
        });
      });

    }


    function map_addpiecluster() {

      // filters for classifying earthquakes into five categories based on magnitude
      var mag1 = ['<', ['get', 'mag'], 150];
      var mag2 = ['all', ['>=', ['get', 'mag'], 150], ['<', ['get', 'mag'], 200]];
      var mag3 = ['all', ['>=', ['get', 'mag'], 200], ['<', ['get', 'mag'], 300]];
      var mag4 = ['all', ['>=', ['get', 'mag'], 300], ['<', ['get', 'mag'], 315]];
      var mag5 = ['>=', ['get', 'mag'], 315];

      // colors to use for the categories
      //var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
      var colors = ['#fed976', '#feb24c', '#ff0', '#fa0', '#f00'];

      map.on('load', function () {
          // add a clustered GeoJSON source for a sample set of earthquakes
          map.addSource('hotspotth', {
              'type': 'geojson',
              'data': 
                  'https://tunchz.github.io/ISOC/hotspotth.geojson',
                  //'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
              'cluster': true,
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
              'layout': {
                  'text-field': [
                      'number-format',
                      ['get', 'mag'],
                      { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
                  ],
                  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
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
                      var el = createDonutChart(props);
                      marker = markers[id] = new mapboxgl.Marker({
                          element: el
                      }).setLngLat(coords);
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
      function createDonutChart(props) {
          //console.log('createdDonutChart call')
          var offsets = [];
          var counts = [ props.mag1, props.mag2, props.mag3, props.mag4, props.mag5 ];
          var total = 0;
          for (var i = 0; i < counts.length; i++) {
              offsets.push(total);
              total += counts[i];
          }
          var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
          fontSize -= 4;
          var r = total >= 1000 ? 30 : total >= 100 ? 26 : total >= 10 ? 22 : 18;
          r = Math.round(r * 0.7);
          var r0 = Math.round(r * 0.75);
          var w = r * 2;

          var html = '<div><svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w + 
            '" text-anchor="middle" style="font: ' + fontSize + 'px sans-serif; display: block">';


          for (i = 0; i < counts.length; i++) {
              html += donutSegment( offsets[i] / total, (offsets[i] + counts[i]) / total, (r-1), (r0-1), colors[i]
              );
          }
          html += '<circle cx="' + r + '" cy="' + r + '" r="' + (r0-1) + 
              '"stroke="black" stroke-width="1" fill="white" stroke-opacity="0" /><text dominant-baseline="central" transform="translate(' + r + ', ' + r + ')">' + total.toLocaleString() + '</text></svg></div>';

          var el = document.createElement('div');
          el.innerHTML = html;
          return el.firstChild;
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
              largeArc, 0, r + r0 * x0 +1, r + r0 * y0 +1, '" fill="' + color + '" stroke-opacity="0.9" />' ].join(' ');
      }


    }


    function map_addpulsemarker() {

      var size = 80;
       
      // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
      // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
         
        // get rendering context for the map canvas when layer is added to the map
        onAdd: function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },
           
        // called once before every frame where the icon will be used
        render: function () {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;
           
          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
           
          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
          context.fill();
           
          // draw inner circle
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          context.fillStyle = 'rgba(255, 10, 10, 1)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
           
          // update this image's data with data from the canvas
          this.data = context.getImageData(0,0,this.width,this.height).data;
           
          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();
           
          // return `true` to let the map know that the image was updated
          return true;
        }
      };
       
      map.on('load', function () {
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
         
        map.addSource('points', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [100.1673626,17.2808669]
                }
              },
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [101.1673626,13.2808669]
                }
              }
            ]




            // "type": "Point",
            // "coordinates": [100.1673626,17.2808669]
          }
        });

        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
            'icon-image': 'pulsing-dot'
          }
        });


        map.on('mouseenter', 'points', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'points', function () {
            map.getCanvas().style.cursor = '';
        });



      });
    }



    function map_addpulsemarker2() {

      var framesPerSecond = 50; 
      var initialOpacity = 1
      var opacity = initialOpacity;
      var initialRadius = 6;
      var radius = initialRadius;
      var maxRadius = 25;


      map.on('load', function () {

          // Add a source and layer displaying a point which will be animated in a circle.
          map.addSource('point', {
              "type": "geojson",
              "data": {
                  "type": "Point",
                  "coordinates": [102.073626,14.2]
              }
          });

          map.addLayer({
              "id": "outtercircle",
              "source": "point",
              "type": "circle",
              "paint": {
                  "circle-radius": initialRadius,
                  "circle-radius-transition": {duration: 0},
                  "circle-opacity-transition": {duration: 0},
                  "circle-color": "#aaf"
              }
          });

          map.addLayer({
              "id": "innercircle",
              "source": "point",
              "type": "circle",
              "paint": {
                  "circle-radius": initialRadius,
                  "circle-color": "#0000ff"
              }
          });


          function animateMarker(timestamp) {
              setTimeout(function(){
                  requestAnimationFrame(animateMarker);

                  radius += (maxRadius - radius) / framesPerSecond;
                  opacity -= ( .9 / framesPerSecond );
                  if (opacity < 0) { opacity = 0}

                  map.setPaintProperty('outtercircle', 'circle-radius', radius);
                  map.setPaintProperty('outtercircle', 'circle-opacity', opacity);

                  if (opacity <= 0) {
                      radius = initialRadius;
                      opacity = initialOpacity;
                  } 

              }, 1000 / framesPerSecond);
              
          }

          // Start the animation.
          animateMarker(0);


        map.on('mouseenter', 'innercircle', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'innercircle', function () {
            map.getCanvas().style.cursor = '';
        });




      });

    }



    function map_addpulsemarker3() {

      //var elevated_points = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_geography_regions_elevation_points.geojson'

      var framesPerSecond = 30;
      var multiplier = 1;
      var opacity = .1;
      var textSize = 24;

      map.on('load', function(){
        map.addSource('mountains', {
          'type': 'geojson',
  
          'data': {
            // "type": "Point",
            // "coordinates": [102.6673626,15.2808669]

            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [102.973626,18.0] //[102.6673626,15.2]
                }
              },
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [103.1673626,15.8808669]
                }
              }
            ]
          }



        });

        var baseLayout = {
          'text-field': '▼',
          'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
          'text-size': 24,
          // 'text-padding': 60,
          // 'text-allow-overlap': true,
          'text-ignore-placement': true
        }

        var basePaint = {
          'text-color': 'rgba(150,0,255,1)',
          'text-opacity': 1,
        }


        map.addLayer({
          'id': 'mountains-pulse',
          'type': 'symbol',
          'source': 'mountains',
          'layout': baseLayout,
          'paint': basePaint
        })

        map.addLayer({
          'id': 'mountains-outline',
          'type': 'symbol',
          'source': 'mountains',
          'layout': {
            'text-field': '▼',
            'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
            'text-size': 34,
            'text-ignore-placement': true
          },
          'paint': {
            'text-color': 'rgba(255,255,255,1)',
            'text-opacity': 1,
          }
        });

        map.addLayer({
          'id': 'mountains',
          'type': 'symbol',
          'source': 'mountains',
          'layout': baseLayout,
          'paint': basePaint
        });

        map.setPaintProperty('mountains-pulse', 'text-color', 'rgba(200,255,200,1)')

        map.setLayoutProperty('mountains-pulse', 'text-size', 24)


        function pulseMarker(timestamp){
          setTimeout(function() {
            requestAnimationFrame(pulseMarker)


            multiplier += .1;
            opacity -= ( .9 / framesPerSecond );
            textSize += ( 50 / framesPerSecond );

            map.setPaintProperty('mountains-pulse', 'text-opacity', opacity)
            map.setLayoutProperty('mountains-pulse', 'text-size', textSize)

            if (opacity <= 0.1) {
              opacity = 1;
              textSize = 24;
            }

          }, 1000 / framesPerSecond );
        }

        pulseMarker(0);


        map.on('mouseenter', 'mountains', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'mountains', function () {
            map.getCanvas().style.cursor = '';
        });



      })


    }

    function map_addpulsemarker4() {


        var framesPerSecond = 30;
        var multiplier = 1;
        var opacity = .1;
        var textSize = 24;


      map.on('load', function(){
        map.addSource('mountains2', {
          'type': 'geojson',
          //'data': elevated_points


          'data': {

            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'attr1': 'Tunchz',
                  'attr2': '34525'
                },                
                'geometry': {
                  'type': 'Point',
                  'coordinates': [99.067,18.8]
                }
              },
              {
                'type': 'Feature',
                'properties': {
                  'attr1': 'Tunchz2',
                  'attr2': '99999'
                },                

                'geometry': {
                  'type': 'Point',
                  'coordinates': [100.073626,14.2]
                }
              }
            ]

          }
        });


        var baseLayout = {
          'text-field': '☢',
          'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
          'text-size': 24,
          // 'text-padding': 60,
          // 'text-allow-overlap': true,
          'text-ignore-placement': true
        }

        var basePaint = {
          'text-color': 'rgba(255,100,0,1)',
          'text-opacity': 1,
        }


        map.addLayer({
          'id': 'mountains2-pulse',
          'type': 'symbol',
          'source': 'mountains2',
          'layout': baseLayout,
          'paint': basePaint
        })

        map.addLayer({
          'id': 'mountains2-outline',
          'type': 'symbol',
          'source': 'mountains2',
          'layout': {
            'text-field': '☢',
            'text-font': ['Open Sans Extrabold', 'Arial Unicode MS Bold'],
            'text-size': 28,
            'text-ignore-placement': true
          },
          'paint': {
            'text-color': 'rgba(255,255,255,1)',
            'text-opacity': 1,
          }
        });

        map.addLayer({
          'id': 'mountains2',
          'type': 'symbol',
          'source': 'mountains2',
          'layout': baseLayout,
          'paint': basePaint
        });

        map.setPaintProperty('mountains2-pulse', 'text-color', 'rgba(255,255,200,1)')

        map.setLayoutProperty('mountains2-pulse', 'text-size', 24)


        function pulseMarker(timestamp){
          setTimeout(function() {
            requestAnimationFrame(pulseMarker)


            multiplier += .1;
            opacity -= ( .9 / framesPerSecond );
            textSize += ( 50 / framesPerSecond );

            map.setPaintProperty('mountains2-pulse', 'text-opacity', opacity)
            map.setLayoutProperty('mountains2-pulse', 'text-size', textSize)

            if (opacity <= 0.1) {
              opacity = 1;
              textSize = 24;
            }

          }, 1000 / framesPerSecond );
        }

        pulseMarker(0);

        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });



        map.on('click', 'mountains2', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var a1 = e.features[0].properties.attr1;
            var a2 = e.features[0].properties.attr2;
            console.log(a1,a2)
            popup
              .setLngLat(coordinates)
              .setHTML(
                  'Name : ' + a1 + '<br>Code : ' + a2
              )
              .addTo(map);
        });




        map.on('mouseenter', 'mountains2', function (e) {
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var a1 = e.features[0].properties.attr1;
            var a2 = e.features[0].properties.attr2;
            popup
              .setLngLat(coordinates)
              .setHTML(
                  'Name : ' + a1 + '<br>Code : ' + a2
              )
              .addTo(map);
        });

        map.on('mouseleave', 'mountains2', function () {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });


      })


    }


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



    // function map_addcustommarker() {

    //   map.on('load', function () {
    //       map.loadImage(
    //           'https://tunchz.github.io/ISOC/img/marker_forest_green_s2.png',
    //           function (error, image) {
    //               if (error) throw error;
    //               map.addImage('marker_forest', image);
    //               map.addSource('pointforest', {
    //                   'type': 'geojson',
    //                   'data': {
    //                       'type': 'FeatureCollection',
    //                       'features': [
    //                           {
    //                               'type': 'Feature',
    //                               'geometry': {
    //                                   'type': 'Point',
    //                                   'coordinates': [104.073626,15.52]
    //                               }
    //                           }
    //                       ]
    //                   }
    //               });
    //               map.addLayer({
    //                   'id': 'markerforest_01',
    //                   'type': 'symbol',
    //                   'source': 'pointforest',
    //                   'layout': {
    //                       'icon-image': 'marker_forest',
    //                       'icon-size': 0.5
    //                   }
    //               });
    //           }
    //       );
    //   });


    // }


    function map_addcustommarker2() {

      var geojson= {

        'type': 'FeatureCollection',
        'features': [ {

            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                    'iconSize': [60, 60]
            }

            ,
            'geometry': {
                'type': 'Point',
                    'coordinates': [104.073626,15.52]
            }
        }

        ,
            {

            'type': 'Feature',
            'properties': {
                'message': 'Bar',
                    'iconSize': [50, 50]
            }

            ,
            'geometry': {
                'type': 'Point',
                    'coordinates': [104.773626,15.2]
            }
        }

        ,
            {

            'type': 'Feature',
            'properties': {
                'message': 'Baz',
                    'iconSize': [40, 40]
            }

            ,
            'geometry': {
                'type': 'Point',
                    'coordinates': [105.073626,14.92]
            }
        }

        ]
      }

      ;


      // add markers to map
      geojson.features.forEach(function (marker) {
              // create a DOM element for the marker
              var el=document.createElement('div');
              el.className='map_custom_marker';
              //el.style.backgroundImage='url(https://placekitten.com/g/'+ marker.properties.iconSize.join('/') + '/)';
              //el.style.width=marker.properties.iconSize[0] + 'px';
              //el.style.height=marker.properties.iconSize[1] + 'px';
              el.style.backgroundImage='url(img/marker_forest_green_s5.png)';
              el.style.width = '20px';
              el.style.height = '20px';

              el.addEventListener('click', function () {
                      window.alert(marker.properties.message);
                  }

              );

              var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
              });

              //map.on('mouseenter', 'earthquake_circle', function (e) {
              el.addEventListener('mouseenter', function () {
                  map.getCanvas().style.cursor = 'pointer';
                  var coordinates = marker.geometry.coordinates.slice();
                  var a1 = marker.properties.message;
                  var a2 = marker.properties.iconSize;
                  popup
                    .setLngLat([coordinates[0],coordinates[1]])
                    .setHTML(
                        'Name : ' + a1 + '<br>Code : ' + a2
                    )
                    .addTo(map);
              });

              //map.on('mouseleave', 'earthquake_circle', function () {
              el.addEventListener('mouseleave', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
              });





              // add marker to map
              new mapboxgl.Marker(el, {offset: [0,-10]}) .setLngLat(marker.geometry.coordinates) .addTo(map);
          }

      );


    }





