/***
 * TODO
 * [ ] ADD ALL EXTERNAL FUNCTIONS AS IMPORTS DOM HELPERS AND MBX HELPERS
 * [ ] ADD NUMBER NEXT TO LAYER GROUP OR LAYER DIRECTORY SHOWING HOW MANY LAYERS ARE TURNED ON
 * [ ] ADD MORE DOCS
 * [ ] ADD ZOOM LEVEL VISIBILITY ON TOGGLES MAKE INACTIVE ON ZOOMEND ADD FUNCTION TO CHECK FOR VISIBILITY
 */

import * as mglHelper from "./lib/mglHelpers.js";
import * as domHelper from "./lib/domHelpers.js";


class layerControlGrouped {

  constructor(options) {
    options = (!options) ? {} : options;

    this._collapsed = false;

    if (options.options && options.options.collapsed) {
      this._collapsed = true;
    }

    this._layers = options.layers.reverse().slice()

    let directories = [];
    let groups = [];

    directories = this._layers.reduce(function (i, layer) {
      return [...i, layer.directory]
    }, []);

    this._directories = [...new Set(directories)];

    groups = this._layers.reduce(function (i, layer) {
      if (!layer.group) layer.group = "ชั้นข้อมูลปฏิบัติการ";//"Operational Layers"
      return [...i, layer.group]
    }, []);

    this._groups = [...new Set(groups)];

    let config = {};

    this._directories.map(function (d) {
      options.layers.map(function (layer) {
        if (layer.directory === d) {
          config[layer.directory] = {}
        }
      })
    })

    this._layers.forEach(function (l) {
      if (!l.group) l.group = "ชั้นข้อมูลปฏิบัติการ";//"Operational Layers";
      config[l.directory][l.group] = []
    })

    this._layers.forEach(function (l) {
      config[l.directory][l.group].push(l)
    });

    let layersClone = this._layers.slice();

    //CREATE A LAYERS GROUP IN METADATA FOR FILTERING
    this._layers.forEach(function (l) {
      if (!l.name) l.name = l.id
      //ADD METADATA AND METADATA.LAYERS IF NOT EXIST
      if (!l.metadata) {
        l.metadata = {};
      }
      if (!l.metadata.layers) l.metadata.layers = [l.id];

      //ADD CHILD LAYERS IF ANY
      if (l.children) {
        layersClone.forEach(child => {
          if (child.parent && child.parent === l.id) l.metadata.layers = [...l.metadata.layers, child.id]
        })
      }
    })

    this._layerControlConfig = config

    //console.log(config)

    // TARGET CONFIG LAYOUT
    // this._layerControlConfig = {
    //     directory1: {
    //       groupName: [
    //         {
    //           id: "id",
    //           name: "name",
    //           legend: "html"
    //         }
    //       ]
    //     },
    //     directory2: {
    //       groupName: [
    //         {
    //           id: "id",
    //           name: "name",
    //           legend: "html"
    //         }
    //       ]
    //     }
    //   }
  }

  onAdd(map) {

    this._map = map;
    let _this = this;

    // SETUP MAIN MAPBOX CONTROL
    this._div = lcCreateButton(this._collapsed);

    // GET THE MAP LAYERS AND LAYER IDS

    mglHelper.GetActiveLayers(this._map, this._layers)

    this._mapLayers = this._map.getStyle().layers;
    this._mapLayerIds = mglHelper.GetMapLayerIds(this._mapLayers);

    //BUILD DIRECTORIES, GROUPS, LAYER TOGGLES AND LEGENDS FROM THE layerControlConfig
    for (let d in this._layerControlConfig) {

      //CREATE DIRECTORY
      let directory = d;

      let layerCount = 0;

      this._layers.map(l => {
        if (l.directory === d && !l.parent) {
          var checked = mglHelper.GetLayerVisibility(this._mapLayers, this._mapLayerIds, l.id);
          if (checked) layerCount = layerCount + 1
        }
      })

      let directoryDiv = lcCreateDicrectory(directory, layerCount);

      //CREATE TOGGLE GROUPS
      for (let g in this._layerControlConfig[d]) {

        let groupDiv = lcCreateGroup(g, this._layerControlConfig[d][g], map)

        let groupLayers = this._layerControlConfig[d][g];

        // CREATE INDIVIDUAL LAYER TOGGLES
        for (let l = 0; l < groupLayers.length; l++) {
          let layer = groupLayers[l];
          let style = mglHelper.GetStyle(this._mapLayers, layer);
          if (!layer.legend && style) {
            layer.simpleLegend = lcCreateLegend(style)
          }
          let checked = mglHelper.GetLayerVisibility(this._mapLayers, this._mapLayerIds, layer.id);
          let layerSelector = lcCreateLayerToggle(this._map, layer, checked);
          groupDiv.appendChild(layerSelector)
        }
        directoryDiv.appendChild(groupDiv);
      }

      this._div.appendChild(directoryDiv)
    }

    /****
     * ADD EVENT LISTENERS FOR THE LAYER CONTROL ALL ON THE CONTROL ITSELF
     ****/
    var hold = false;

    if (this._collapsed) {
      this._div.addEventListener("mouseenter", function (e) {
        setTimeout(function () {
          e.target.classList.remove("collapsed")
        }, 0)
        return
      });
  
      this._div.addEventListener("mouseleave", function (e) {
        if (!hold) e.target.classList.add("collapsed")
        return
      });
    }

    // add right click to hold control group menu
    this._div.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      if (e.target.dataset.directoryToggle) {
        hold = !hold;
        // console.log("hold",hold);
        var dirs = document.getElementsByClassName("directory");
        // console.log(dirs.length);
        for (let i = 0; i<dirs.length; i++) {
          // console.log(i);
          dirs[i].style.backgroundColor = (hold) ? "#e8e9ea":"#f8f9fa";
        }
        // document.getElementById("mgl-layerControl-button").style.opacity = (hold) ? "0.8":"1";
        // if (!hold) e.target.classList.add("collapsed");
      }
     return
    });

    this._div.addEventListener("click", function (e) {
      // console.log(e.target);

      if (e.target.dataset.layerControl) {
        e.target.classList.remove("collapsed");
        return
      }

      if (e.target.className === "checkbox") {
        e.target.children[0].click();
        return
      }

      if (e.target.dataset.mapLayer) {
        mglHelper.SetLayerVisibility(map, e.target.checked, e.target.id);
        if (e.target.dataset.children) {
          let children = document.querySelectorAll("[data-parent]");
          for (let i = 0; i < children.length; i++) {
            if (children[i].dataset.parent === e.target.id) {
              children[i].click()
            }
          }
        }
        return
      }

      if (e.target.dataset.mapLayer && e.target.dataset.group != false) {
        e.stopPropagation();
        let group = e.target.dataset.group;
        let groupMembers = document.querySelectorAll("[data-group]");
        for (let i = 0; i < groupMembers.length; i++) {
          if (group != "false" && groupMembers[i].dataset.group === group) {
            mglHelper.SetLayerVisibility(map, e.target.checked, groupMembers[i].id);
          }
        }
        return
      }

      if (e.target.dataset.layergroup) {
        // console.log("layergroup")
        let inputs = e.target.parentElement.querySelectorAll("[data-master-layer]");
        // CHECK IF ANY OF THE BOXES ARE NOT CHECKED AND IF NOT THEM CHECK THEM ALL
        if (!domHelper.GetAllChecked(inputs)) {
          for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].checked) {
              inputs[i].click()
            }
          }
        }
        // IF ALL OF THE BOXES ARE CHECKED, UNCHECK THEM ALL
        else {
          for (let i = 0; i < inputs.length; i++) {
            let checkbox = inputs[i];
            if (checkbox.checked) {
              checkbox.click()
            }
          }
        }
        return
      }

      if (e.target.dataset.directoryToggle) {
        if (e.target.parentElement.children[2].style.display != "none") {
          e.target.parentElement.children[0].className = "collapsed"
        } else {
          e.target.parentElement.children[0].className = ""
        }
        domHelper.ToggleChildren(e.target.parentElement, 2)

        return
      }
    })

    if (this._collapsed) {
      this._map.on("click", function () {
        if (!hold) _this._div.classList.add("collapsed")
      })
    }

    //NEED TO SET THIS AT THE BEGINNING PASS IN CURRENT ZOOM OF MAP AND SET DISABLED PROPERTY THIS ALSO BINGS IN WEIRD THINGS WITH THE CHECK ALL GROUP BUT TACKLE THAT LATER
    this._map.on("zoomend", function () {
      let zoomendMap = this;
      let lcLayers = document.querySelectorAll("[data-master-layer]");
      lcLayers.forEach(function (l) {
        if (l.dataset.minzoom && l.dataset.minzoom > zoomendMap.getZoom()) {
          l.parentElement.style.opacity = "0.3"
          l.disabled = true
        } else {
          l.parentElement.style.opacity = "1"
          l.disabled = false
        }
      });
    })

    return this._div;
  }
  onRemove(map) {
    this._map = map;
    this._div.parentNode.removeChild(this._div);
    this._map = undefined;
  }
}

export {
  layerControlGrouped
}

/****
 * HELPER FUNCTIONS
 ****/

function lcCreateLayerToggle(map, layer, checked, index) {
  let div = document.createElement("div");
  div.className = "checkbox";
  div.title = "Map Layer";

  if (layer.hidden) {
    div.style.display = "none";
    div.dataset.hidden = true
  }

  let input = document.createElement("input");
  input.name = (!layer.name) ? layer.id : layer.name;
  input.type = "checkbox"
  input.id = layer.id;
  input.dataset.group = (layer.group) ? layer.group : false;

  if (layer.minzoom) {
    input.dataset.minzoom = layer.minzoom
  }

  if (layer.children) {
    input.dataset.children = true;
    input.dataset.masterLayer = true;
  }
  if (layer.parent) {
    input.dataset.parent = layer.parent;
  } else {
    input.dataset.masterLayer = true;
  }

  input.className = "layer slide-toggle";
  input.dataset.mapLayer = true;
  if (checked) input.checked = true;

  input.onclick = function () {
    lcSetActiveLayers(this.id, this.checked);
    lcSetLegendVisibility(this);
    lcSetDirectoryLayerCount(this);
    //console.log(this.id, this.checked, this);
    layerswitchAction(this.id,this.checked);
  };

  let label = document.createElement("label");
  label.setAttribute("for", layer.id);
  let legend = document.createElement("div");
  if (layer.legend) {
    label.innerText = (!layer.name) ? layer.id : layer.name;
    legend.innerHTML = layer.legend;
    legend.className = "mgl-layerControlLegend";
    legend.dataset.layerChildLegend = "true"
    if (!checked) {
      legend.style.display = "none"
    }
  } else if (layer.simpleLegend) {
    label.innerHTML += layer.simpleLegend;
    label.innerHTML += (!layer.name) ? layer.id : layer.name;
    label.className = "mgl-layerControlLegend"
  } else {
    label.innerText = (!layer.name) ? layer.id : layer.name;
  }
  label.dataset.layerToggle = "true";

  div.appendChild(input);
  div.appendChild(label);

  if (layer.metadata && layer.metadata.filterSchema) {
    let filterSpan = document.createElement("span");
    filterSpan.id = layer.id+'_filtericon';
    filterSpan.style.float = "right";
    filterSpan.style.height = "20px";
    filterSpan.style.width = "26px";
    filterSpan.style.marginTop = "-4px";
    filterSpan.style.fill = "#999";
    filterSpan.style.opacity = 1;
    filterSpan.innerHTML = filterIcon();
    filterSpan.onclick = function() {
      filterModal(map, layer)
      var thislayer = document.getElementById((this.id).substr(0,(this.id).length - 11));
      // switch on layer
      if (!thislayer.checked) {
        thislayer.checked = true;
        
        // switch on layer
        mglHelper.SetLayerVisibility(map, thislayer.checked, thislayer.id);
        //if (e.target.dataset.children) {
          // switch on child layers
          let children = document.querySelectorAll("[data-parent]");
          for (let i = 0; i < children.length; i++) {
            if (children[i].dataset.parent === thislayer.id) {
              children[i].click()
            }
          }
        //}        
        
        lcSetActiveLayers(thislayer.id, thislayer.checked);
        lcSetLegendVisibility(thislayer);
        lcSetDirectoryLayerCount(thislayer);
      }
      //console.log(thislayer.id, thislayer.checked, thislayer);
    }
    filterSpan.oncontextmenu = function(e) {
      e.preventDefault();
      layer.metadata.layers.map(l => {
        map.setFilter(l)
        document.getElementById(l+"_form").reset();
        autocomplete_list_reset(l);
      });
      document.getElementById(layer.id+'_filtericon').style.fill = "#999";
      //console.log(layer.id+'_filtericon',"#777");
    }    
    filterSpan.onmouseenter = function() {
      this.style.opacity = 0.7;
    }
    filterSpan.onmouseleave= function() {
      this.style.opacity = 1;
    }
    div.appendChild(filterSpan)
  }

  div.appendChild(legend);

  return div
}

function lcSetDirectoryLayerCount(e) {
  let targetDirectory = e.closest(".mgl-layerControlDirectory")
  let targetChildren = targetDirectory.querySelectorAll("[data-master-layer]");
  let targetCount = 0;
  targetChildren.forEach(function (c) {
    if (c.checked) targetCount = targetCount + 1;
  })
  if (targetCount > 0) {
    targetDirectory.children[1].children[0].innerHTML = targetCount;
    targetDirectory.children[1].children[0].style.display = "block"
  } else {
    targetDirectory.children[1].children[0].style.display = "none"
  }
}

function lcCreateDicrectory(directoryName, layerCount) {

  let accordian = document.createElement("div");
  accordian.dataset.accordian = true;
  accordian.style.backgroundColor = "white";
  accordian.className = "mgl-layerControlDirectory";

  let button = document.createElement("button");
  button.dataset.directoryToggle = true

  accordian.appendChild(button);

  let d = document.createElement("div");
  d.className = "directory"
  d.id = directoryName.replace(" ", "");
  d.innerText = directoryName;
  d.dataset.name = directoryName;
  d.dataset.directoryToggle = true

  var counter = document.createElement("span");
  counter.style.background = "#0d84b3";
  counter.className = "mgl-layerControlDirectoryCounter";
  counter.style.display = (layerCount === 0) ? "none" : "block";
  counter.innerText = (!layerCount) ? "" : layerCount
  counter.style.float = "right";
  counter.style.color = "white";
  counter.style.padding = "1px 4px";
  d.appendChild(counter)

  accordian.appendChild(d);
  return accordian;
}

function lcCreateGroup(group, layers, map) {
  let titleInputChecked = false;
  // GET CHECKED STATUS OF LAYER GROUP
  // for (let i = 0; i < layers.length; i++) {
  //   let l = layers[i];
  //   console.log(l)
  //   if(map.getLayoutProperty(l.id, "visibility") === "visible") {
  //     titleInputChecked = true
  //     continue
  //   }else{
  //     break
  //   }
  // }

  let titleInputContainer = document.createElement("div");
  titleInputContainer.style.margin = "4px 0 4px 8px"

  let titleInput = document.createElement("input");
  titleInput.type = "checkbox";
  let titleInputId = "layerGroup_" + group.replace(" ", "");
  titleInput.id = titleInputId;
  titleInput.style.display = "none";
  titleInput.dataset.layergroup = group;

  if (titleInputChecked) titleInput.checked = true

  let titleInputLabel = document.createElement("label");
  titleInputLabel.setAttribute("for", titleInputId);
  titleInputLabel.className = "mgl-layerControlGroupHeading"
  titleInputLabel.textContent = group;

  // let titleSettings = document.createElement("span");
  // titleSettings.style.position = "absolute";
  // titleSettings.style.right = "5px";
  // titleSettings.style.opacity = "0.8";
  // titleSettings.innerHTML = "<img src='https://icongr.am/material/dots-vertical.svg' height='24px'></img>"
  // titleInputLabel.appendChild(titleSettings);

  titleInputContainer.appendChild(titleInput);
  titleInputContainer.appendChild(titleInputLabel);

  return titleInputContainer;

}

function lcCreateButton(collapsed) {
  let div = document.createElement('div');
  div["aria-label"] = "Layer Control";
  div.dataset.layerControl = "true"
  div.id = 'mgl-layerControl-button';
  div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mgl-layerControl';
  if (collapsed) div.classList.add("collapsed");
  // add color-picker
  // div.appendChild(create_colorPicker());
  div.innerHTML = create_colorPicker();
  return div
}

function lcCreateLegend(style) {
  let type = Object.keys(style)
  let legend = false;
  if (type.indexOf("line-color") > -1 && isString(style["line-color"])) {
    legend = `<icon class='icon-minus' style='color:${style["line-color"]};margin-right:6px;' onclick="showcolorPicker(this); return false;"></icon>`;
  } else if (type.indexOf("fill-color") > -1 && isString(style["fill-color"])) {
    legend = `<icon class='icon-stop' style='color:${style["fill-color"]};margin-right:6px;' onclick="showcolorPicker(this); return false;"></icon>`;
  } else if (type.indexOf("circle-color") > -1 && isString(style["circle-color"])) {
    legend = `<icon class='icon-circle' style='color:${style["circle-color"]};margin-right:6px;' onclick="showcolorPicker(this); return false;"></icon>`;
  } else if (type.indexOf("heatmap-color") > -1 && isString(style["heatmap-color"])) {
    legend = `<icon class='icon-blank' style='color:#ccc;margin-right:6px;' return false;"></icon>`;
  } else {
    legend = `<icon class='icon-location' style='color:#ccc;margin-right:6px;' return false;"></icon>`;
  }

  return legend
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function lcSetActiveLayers(l, checked) {
  let _layer = l;
  let _visibility = checked;
  let params = new URLSearchParams(window.location.search);
  if (_visibility) {
    params.set(_layer, true);
    if (history.replaceState) {
      let url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + params.toString() + window.location.hash;
      window.history.replaceState({
        path: url
      }, '', url);
    }
  } else {
    params.delete(_layer);
    if (history.replaceState) {
      let url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + params.toString() + window.location.hash;
      window.history.replaceState({
        path: url
      }, '', url);
    }
  }
}

function lcSetLegendVisibility(e) {
  let _legend = e.parentElement.querySelectorAll("[data-layer-child-legend]");
  let _display = (!e.checked) ? "none" : "block";
  for (let i = 0; i < _legend.length; i++) {
    _legend[i].style.display = _display
  }
}

function filterModal(map, layer) {
  //console.log(layer)
  pass_layer(layer);
  var id = layer.id + "FilterModal";
  if (!document.getElementById(id)) {
    var modal = document.createElement("div");
    modal.id = id;
    modal.classList = "modal fade"
    modal.style.alignItems = "flex-start";
    // modal.innerHTML = `
    // <a href="#close" class="modal-overlay" aria-label="Close" style="opacity: 0.8"></a>
    // <div class="modal-container" style="width: 400px;">
    //   <div class="modal-header">
    //     <a href="#close" class="btn btn-clear float-right modal-close" aria-label="Close"></a>
    //     <div class="modal-title h4">
    //       <span>Filter ${layer.name}</span>
    //     </div>
    //   </div>
    //   <div class="modal-body">
    //   </div>
    //   <div class="modal-footer">
    //   </div>
    // </div>
    // `
    modal.innerHTML = `
    <div class="modal fade in" tabindex="-1" role="dialog" aria-hidden="false" style="display:block;">
        <a href="#close" class="modal-overlay" aria-label="Close" style="opacity: 0.1"></a>
        <div class="modal-dialog modal-filter">
            <div class="modal-content modal-container">
                <div class="modal-header">

                    <h2 class="modal-title h4">
                      <span>Filter ${layer.name}</span>
                    </h2>
                </div>
                <div class="modal-body">
                </div>

            </div>
        </div>
    </div>
    `

//                    <a href="#close" class="btn btn-clear float-right modal-close icon-cancel" aria-label="Close"></a>
//                <div class="modal-footer" style="margin-top: 0px; padding-top: 0px;"><span class="pull-left"></span><span class="pull-left"></span></div>


    var form = document.createElement("form");
    form.id = layer.id + "_form";
    form.innerHTML = `
      ${createFormFields(layer.metadata.filterSchema)}
      <br>
      <button type="submit" class="btn btn-primary">Apply</button>
      <button class="btn btn-outline" style="float:right;"><a href="#close" class="" aria-label="Close">Close</a></button>
      <button class="btn btn-outline" type="reset" style="float:right">Reset</button>
    `
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      window.location.hash = "#";
      var filter = buildFilter(new FormData(form), layer);
      //console.log(filter)
      if (!filter) {
        layer.metadata.layers.map(l => {
          map.setFilter(l);
          autocomplete_list_reset(l);
        });
        document.getElementById(layer.id+'_filtericon').style.fill = "#999";
        //console.log(layer.id+'_filtericon',"#000");
      }else{
        layer.metadata.layers.map(l => {
          map.setFilter(l, filter);
        });
        document.getElementById(layer.id+'_filtericon').style.fill = "#2a58c3";
        //console.log(layer.id+'_filtericon',"#2a58c3");
      }
      //filterModal(map, layer);
    });

    form.addEventListener("reset", function(e) {
      layer.metadata.layers.map(l => {
        map.setFilter(l);
        autocomplete_list_reset(l);
      })
      document.getElementById(layer.id+'_filtericon').style.fill = "#999";
      //console.log(layer.id+'_filtericon',"#000");      
    })

    modal.querySelector(".modal-body").appendChild(form)
    document.getElementById("header-container").appendChild(modal);  //document.body.appendChild(modal);
    window.location.hash = id


    //add autocomplete to modal filter
    autocomplete_list(layer,form);

  }else{
    window.location.hash = id
  }
}

function buildFilter(data, layer) {
  const fields = [...data.keys()];
  const values = [...data.values()];

  // console.log(fields[0], values[0])

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

function createFormFields(schema) {
  let html = "";
  for (let s in schema) {
    let name = s.replace(/_/g, " ").toUpperCase()
    html += `
    <div class="form-group">
      <label class="form-label" for="${s}">${name}</label>
      ${(!schema[s].options) 
          ?
        `<input class="form-input" onchange="instance_filter(this)" id="${s}" type="${schema[s].type}" name="${s}"  ${(!schema[s].readonly) ? '' : 'readonly="true"'} ${(!schema[s].required) ? '' : 'required="true"'}>`
          :
        `<select id="${s}" class="form-select" onchange="instance_filter(this)" name="${s}" ${(!schema[s].required) ? '' : 'required="true"'}>
          ${schema[s].options.map(o => {
            return `<option>${o}</option>`
          })}
         </select>`
      }
      ${(!schema[s].hint) ? "" : `<p class="form-input-hint">${schema[s].hint}</p>`}
    </div>
    `

    if (schema[s].type === "date" || schema[s].type === "number") html += `
      <div class="form-group">
        <label  class="form-label" for="${s}_operator">${name} OPERATOR</label>
        <select id="${s}_operator"  name="${s}_operator" class="form-select">
          <option>></option>
          <option>>=</option>
          <option>==</option>
          <option><=</option>
          <option><</option>
        </select>
      </div>
    `

  }
  return html
}


function filterIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>`
}


function create_colorPicker() {
  return `<div id="color_picker" class="color_picker" style="display:none" onmouseleave="hidecolorPicker()"></div>`; //color_picker;
}
