
// var admin_filtered = {"จังหวัด":[],"อำเภอ":[],"ตำบล":[]};

// function autocomplete_list_reset(layer) {
//   console.log(layer);
//   admin_filtered = {"จังหวัด":[],"อำเภอ":[],"ตำบล":[]};
// }

function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {}, 
        itemarray = [];
    // Because features come from tiled vector data, feature geometries may be split
    // or duplicated across tile boundaries and, as a result, features may appear
    // multiple times in query results.
    var uniqueFeatures = array.filter(function (el) {
        if (existingFeatureKeys[el.properties[comparatorProperty]]) {
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            itemarray.push(el.properties[comparatorProperty]);
            return true;
        }
    });

    return itemarray; //uniqueFeatures;
}

var layer_;
function pass_layer(layer) {
  layer_ = layer;
}

function instance_filter(el) {
  var form = el.parentElement.parentElement;

  console.log(layer_.id);
  // filter map layer
  var filter = buildFilter(new FormData(form), layer_);
  map.setFilter(layer_.id, filter);
  // highlight filter icon
  document.getElementById(layer_.id+'_filtericon').style.fill = "#2a58c3";
}

function buildFilter(data, layer) {
  const fields = [...data.keys()];
  const values = [...data.values()];

  var filter = [];

  for (var i = 0; i < fields.length; i++) {
    if (fields[i].includes("operator")) continue;
    values[i] = values[i].replace("-- ทั้งหมด --", "");
    if (!values[i]) continue;
    //DATES AND INTEGERS MUST HAVE AN OPERATOR OPTION AS THE SECOND VALUE IN THE FORM
    switch (layer.metadata.filterSchema[fields[i]].type) {
      case "date" : filter.push([values[i + 1], ["get", fields[i] ], values[i] ]); break;
      case "number" : filter.push([values[i + 1], ["get", fields[i] ], Number(values[i]) ]); break;
      default: filter.push(["match", ["get", fields[i]], [...new Set(values[i].split(','))],true,false]); //build >> ["match",["get", "จังหวัด"],['น่าน','นครนายก'],true,false]
    }    
  }

  if (filter.length < 1) {
    return null
  }else{
    return ["all", ...filter]
  }
}


// Remove Dupplicate for JSON Object
function getUniquejson(arr) {
  return [...new Set(arr.map(el => JSON.stringify(el)))].map(e => JSON.parse(e));
}


var features_listing = {};
function autocomplete_list_reset(layer) {
  features_listing[layer] = {};
}

function autocomplete_list(layer,form) {
  // console.log(layer);
  features_listing[layer.id] = {};
  // move map for initiate >> map.queryRenderedFeatures
  map_Xoffset += 10;
  map.flyTo({
    center: mapcenter,
    offset: [map_Xoffset, map_Yoffset],
    essential: true
  });
  map_Xoffset -= 10;
  map.flyTo({
    center: mapcenter,
    offset: [map_Xoffset, map_Yoffset],
    essential: true
  });


  for (let item in layer.metadata.filterSchema) {

    //if (features) features_listing[item] = getUniqueFeatures(features, item);

    //console.log(item);
    // if (['จังหวัด','อำเภอ','ตำบล'].includes(item)) {
      $( function() {

        function split( val ) {
          return val.split( /,\s*/ );
        }
        function extractLast( term ) {
          return split( term ).pop();
        }

        function featurelisting(layer,item) {
          if (!features_listing[layer][item]) features_listing[layer][item] = getUniqueFeatures(map.queryRenderedFeatures({ layers: [layer] }), item);
          return features_listing[layer][item];          
        }
     
        $("#"+item)
          // don't navigate away from the field on tab when selecting an item
          // .on( "keydown", function( event ) {
          //   if ( event.keyCode === $.ui.keyCode.TAB &&
          //       $( this ).autocomplete( "instance" ).menu.active ) {
          //     event.preventDefault();
          //   }
          // })

          .autocomplete({
            minLength: 0,
            source: function( request, response ) {
              // delegate back to autocomplete, but extract the last term
              response( $.ui.autocomplete.filter(
              
        //        (item=="อำเภอ" || item=="ตำบล") ? $.grep(admin[item], function( n, i ) {return admin_filtered[admin_parent[item]].includes(n[admin_parent[item]]);}) : admin[item], 
      
        //        features_listing[item], 
                featurelisting(layer.id,item),
                extractLast( request.term ) ) );

            },
            focus: function() {
              // prevent value inserted on focus
              return false;
            },
            select: function( event, ui ) {
              var terms = split( this.value );
              // remove the current input
              terms.pop();
              // add the selected item
              terms.push( ui.item.value );
              // add placeholder to get the comma-and-space at the end
              terms.push( "" );
              this.value = terms.join( "," );

              // admin_filtered[item].push(ui.item.value);
              // console.log(admin_filtered[item]);

              // filter map layer
              var filter = buildFilter(new FormData(form), layer);
              //console.log("filter",layer.id, filter);
              layer_.metadata.layers.map(l => {
                map.setFilter(l, filter);
              });
              // highlight filter icon
              document.getElementById(layer.id+'_filtericon').style.fill = "#2a58c3";

              return false;
            }
          })
          // .focus(function() {
          //     console.log("focus");
          //     $(this).autocomplete("search", "");
          // })
          .on( "click", function() {
              $(this).autocomplete("search", "");
          });
      });
    // }

    console.log(features_listing);
  }
  
}
