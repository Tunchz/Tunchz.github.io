
//=======Map Layer Control ========================================================================================
    //import { layerControlSimple } from "https://tunchz.github.io/ISOC/layer_control/layerControlSimple.js"
    import { layerControlGrouped } from "https://tunchz.github.io/ISOC/layer_control/layerControlGrouped.js"

function load_map_baselayers() {

    map.on('style.load', function () {


      map.addSource('mapth_prov', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/json/mapth_small.json'
      });


      map.addSource('counties', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/layer_control/counties.min.geojson'
      });

      map.addSource('states', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/layer_control/states.geojson'
      });

      map.addSource('lakes', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/layer_control/lakes.geojson'
      });     

      map.addSource('rivers', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/layer_control/rivers.geojson'
      });

      map.addSource('rail', {
        'type': 'geojson',
        'data': 'https://tunchz.github.io/ISOC/layer_control/rail.geojson'
      });

      map.addLayer({
        'id': 'CountiesbASE',
        'type': 'fill',
        'source': 'counties',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-color': 'transparent',
          'fill-outline-color': 'white',
          'fill-opacity': 0.5
        }
      });

      map.addLayer({
        'id': 'Province',
        'type': 'line',
        'source': 'mapth_prov',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': '#ff0000',
        }
      });

      map.addLayer({
        'id': 'Counties',
        'type': 'fill',
        'source': 'counties',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-color': 'lightgray',
          'fill-outline-color': 'white',
          'fill-opacity': 0.9
        }
      });

      map.addLayer({
        'id': 'States',
        'type': 'line',
        'source': 'states',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': '#121212',
        }
      });

      map.addLayer({
        'id': 'Lakes',
        'type': 'fill',
        'source': 'lakes',
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'fill-color': 'blue',
          'fill-outline-color': 'white',
          'fill-opacity': 0.9
        }
      });

      map.addLayer({
        'id': 'riversCase',
        'type': 'line',
        'source': "rivers",
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': 'white',
          'line-width': 6
        }
      });

      map.addLayer({
        'id': 'rivers',
        'type': 'line',
        'source': "rivers",
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': 'blue',
          'line-width': 3
        }
      });

      map.addLayer({
        'id': 'Rail',
        'type': 'line',
        'source': "rail",
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': {
            stops: [
              [0, "black"],
              [14, "black"],
              [18, "black"]
            ]
          },
          'line-width': 3
        }
      });

      var config = {
        options: {
          collapsed: true
        },
        layers: [
          {
            id: "Province",
            hidden: false,
            group: "Political",
            directory: "Admin"
          },
          {
            id: "Counties",
            hidden: false,
            group: "Cadastral",
            directory: "Admin"
          },
          {
            id: "States",
            hidden: false,
            group: "Political",
            directory: "Admin"
          },
          {
            id: "Lakes",
            hidden: false,
            group: "Hydro",
            directory: "Environment"
          },
          {
            id: "riversCase",
            hidden: true,
            group: "Hydro",
            parent: "rivers",
            directory: "Environment"
          },
          {
            name: "Rivers",
            id: "rivers",
            hidden: false,
            group: "Hydro",
            children: true,
            directory: "Environment"
          },
          {
            id: "Rail",
            hidden: false,
            directory: "Cultural",
            legend: "<icon class='fa fa-minus' style='color:red;'></icon> Legend defined in config<br><icon class='fa fa-minus' style='color:black;'></icon> Toggles when layer is off"
          }
        ]
      }

      map.addControl(new layerControlGrouped(config), "top-left");

    });

}


