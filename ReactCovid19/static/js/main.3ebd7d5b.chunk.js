(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{188:function(e,t,a){e.exports=a(376)},193:function(e,t,a){},376:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(59),o=a.n(r),i=(a(193),a(45)),c=a(379),u=a(380),s=a(381),d=a(382),m=a(383),p=a(384),v=a(12);function E(e){var t=Object(n.useState)("open_menu"),a=Object(i.a)(t,2),r=a[0],o=a[1];return l.a.createElement("nav",null,l.a.createElement("div",{className:"nav_content"},l.a.createElement(c.a,null),l.a.createElement("h3",{className:"site_title"},"react project | COVID-19 Dashboard"),l.a.createElement("button",{className:"nav_button",onClick:function(){o("closed_menu"===r?"open_menu":"closed_menu")}},l.a.createElement(u.a,null)),l.a.createElement("div",{className:"menu ".concat(r)},l.a.createElement("div",{className:"menu_content"},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/"},l.a.createElement(s.a,null),l.a.createElement("p",null,"Home"))),l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/about"},l.a.createElement(d.a,null),l.a.createElement("p",null,"About"))),l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/manual"},l.a.createElement(m.a,null),l.a.createElement("p",null,"Manual"))),l.a.createElement("li",null,l.a.createElement("a",{href:"https://tunchz.github.io/Covid-19/",target:"_self",rel:"noopener noreferrer"},l.a.createElement(p.a,null),l.a.createElement("p",null,"Covid-19 in Thailand")))),l.a.createElement("p",{style:{marginBottom:"10px"}},"react project | COVID-19 Dashboard")))))}function g(e){return l.a.createElement("footer",null,l.a.createElement("div",{className:"footer_content"},l.a.createElement("h4",null,"- FWTT -"),l.a.createElement("ul",{className:"footer_nav"},l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/"},l.a.createElement(s.a,null),l.a.createElement("p",null,"Home"))),l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/about"},l.a.createElement(d.a,null),l.a.createElement("p",null,"About"))),l.a.createElement("li",null,l.a.createElement(v.b,{to:"/ReactCovid19/manual"},l.a.createElement(m.a,null),l.a.createElement("p",null,"Manual"))),l.a.createElement("li",null,l.a.createElement("a",{href:"https://tunchz.github.io/Covid-19/",target:"_self",rel:"noopener noreferrer"},l.a.createElement(p.a,null),l.a.createElement("p",null,"Covid-19 in Thailand"))))))}var y=a(149),h=a(150),f=a(162),b=a(161),x=a(31),C=a.n(x),_=function(e){Object(f.a)(a,e);var t=Object(b.a)(a);function a(){var e;Object(y.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).mapContainer="",e.map=null,e}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e,t,a=this;this.map=new C.a.Map({container:this.mapContainer,style:"mapbox://styles/khattakahmed/ckai0622g0ggc1io16p7dggg4",center:[null!==(e=this.props.lng)&&void 0!==e?e:0,null!==(t=this.props.lat)&&void 0!==t?t:0],zoom:3}),this.map.once("load",(function(){var e,t,n,l;null===(e=a.map)||void 0===e||e.addSource("points",{type:"geojson",data:{type:"FeatureCollection",features:a.mapDataToGeoJSON(a.props.allCoutries)}}),null===(t=a.map)||void 0===t||t.addLayer({id:"circles",source:"points",type:"circle",paint:{"circle-opacity":.75,"circle-stroke-width":.1,"circle-radius":["interpolate",["linear"],["get","cases"],1,4,1e3,8,4e3,10,8e3,14,12e3,18,1e5,40],"circle-color":["interpolate",["linear"],["get","cases"],1,"#ffffb2",5e3,"#fed976",1e4,"#feb24c",25e3,"#fd8d3c",5e4,"#fc4e2a",75e3,"#e31a1c",1e5,"#b10026"]}});var r,o=new C.a.Popup({closeButton:!1,closeOnClick:!1});null===(n=a.map)||void 0===n||n.on("mousemove","circles",(function(e){var t,n=e.features[0];if(n){var l=null===(t=n.properties)||void 0===t?void 0:t.id;if(l&&l!==r){r=l,a.map.getCanvas().style.cursor="pointer";var i=n.properties,c=i.cases,u=i.country,s=i.deaths,d=i.recoveries,m=e.features[0].geometry.coordinates.slice(),p="\n          <div class='popup'>\n            <p>Country: <b>".concat(u.toLocaleString(),"</b></p>\n            <p>Cases: <b>").concat(c.toLocaleString(),"</b></p>\n            <p>Deaths: <b>").concat(s.toLocaleString(),"</b></p>\n            <p>Recoveries: <b>").concat(d.toLocaleString(),"</b></p>\n          </div>\n          ");o.setLngLat(m).setHTML(p).addTo(a.map)}}})),null===(l=a.map)||void 0===l||l.on("mouseleave","circles",(function(){r=void 0,a.map.getCanvas().style.cursor="",o.remove()}))})),this.map.addControl(new C.a.NavigationControl),this.map.addControl(new C.a.FullscreenControl)}},{key:"mapDataToGeoJSON",value:function(e){return null===e||void 0===e?void 0:e.data.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.countryInfo.long,e.countryInfo.lat]},properties:{id:""+e.countryInfo._id+e.countryInfo.iso2+e.countryInfo.iso3,country:e.country,cases:e.cases,deaths:e.deaths,recoveries:e.recovered}}}))}},{key:"render",value:function(){var e,t,a,n=this;return null===(e=this.map)||void 0===e||e.flyTo({center:[null!==(t=this.props.lng)&&void 0!==t?t:0,null!==(a=this.props.lat)&&void 0!==a?a:0],essential:!0,zoom:5}),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"map_content",ref:function(e){return n.mapContainer=e}}))}}]),a}(l.a.PureComponent),L=a(385);function D(e){return e.isLoading?l.a.createElement("div",{className:"grid_box",id:e.id},l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement(L.a,null),l.a.createElement("span",{style:{marginLeft:10}},"Loading ..."))):l.a.createElement("div",{className:"grid_box",id:e.id},e.children)}var A=a(95),N=/^[a-z]{2}$/i;function I(e){if(!N.test(e)){var t=typeof e;throw new TypeError("cc argument must be an ISO 3166-1 alpha-2 string, but got '".concat("string"===t?e:t,"' instead."))}var a=Object(A.a)(e.toUpperCase()).map((function(e){return e.charCodeAt()+127397}));return String.fromCodePoint.apply(String,Object(A.a)(a))}var T=a(151),j=a.n(T);var S=l.a.memo((function(e){var t;return l.a.createElement("table",{className:"table_content"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Country"),l.a.createElement("th",null,"Cases"),l.a.createElement("th",null,"Recoveries"),l.a.createElement("th",null,"Fatal"))),l.a.createElement("tbody",null,null===(t=e.data)||void 0===t?void 0:t.map((function(e){return l.a.createElement("tr",{key:e.country},l.a.createElement("td",null,I(e.countryInfo.iso2)," \xa0",j()(e.country,{length:15})),l.a.createElement("td",null,e.cases.toLocaleString()),l.a.createElement("td",null,e.recovered.toLocaleString()),l.a.createElement("td",null,e.deaths.toLocaleString()))}))))})),O=a(14);var w=l.a.memo((function(e){var t,a=function(e){var t=e.yAxisValue,a=e.data;return a?(null===a||void 0===a?void 0:a.map((function(e,a){return{name:new Date(e.date).toLocaleString("default",{month:"short"}),fulldate:e.date,value:e[t]}}))).reverse():null}({xAxisValue:e.xAxisValue,yAxisValue:e.yAxisValue,data:e.timeline});return e.simple?l.a.createElement(O.f,{width:"100%",height:"100%"},l.a.createElement(O.b,{data:a,margin:{top:0,right:0,left:0,bottom:0}},l.a.createElement(O.a,{strokeWidth:2.5,isAnimationActive:!0,animationEasing:"linear",animationDuration:400,dataKey:"value",stroke:"#A5CFE3",fill:"rgba(166, 206, 227, 0.2)"}))):l.a.createElement(O.f,{width:"100%",height:"100%"},l.a.createElement(O.d,{data:a},l.a.createElement(O.e,{vertical:!1,stroke:"#666666",strokeDasharray:"7"}),l.a.createElement(O.h,{dataKey:"name",tickLine:!1,ticks:["Jan","Feb","Mar","Apr","May"]}),l.a.createElement(O.i,{tickLine:!1}),l.a.createElement(O.g,{cursor:!0,content:(t=e.say,function(e){var a=e.active,n=e.payload;if(e.label,a&&n){var r=new Date(n[0].payload.fulldate),o=r.toLocaleString("default",{month:"short"}),i=r.toLocaleString("default",{day:"numeric"});return l.a.createElement("div",{className:"grid_box",style:{padding:"10px"}},l.a.createElement("h4",{style:{margin:"0px"}},o+" "+i),l.a.createElement("p",{style:{margin:"0px"}},n[0].payload.value.toLocaleString()," ",null!==t&&void 0!==t?t:""))}return null}),isAnimationActive:!1}),l.a.createElement(O.c,{dataKey:"value",fill:"rgba(166, 206, 227, 0.5)",isAnimationActive:!1})))})),k=a(63);function R(e){return fetch("https://corona-api.com/countries/".concat(e)).then((function(e){return e.json()})).then((function(e){return e.data}))}function V(e){var t=e.countryCode,a=e.children,n=Object(k.a)(t,R,{refetchInterval:0,refetchOnWindowFocus:!1,refetchIntervalInBackground:!1}),r=n.data,o=n.error,i={country:r,isLoading:n.isLoading,error:o};return l.a.createElement(l.a.Fragment,null,a(i))}function F(e){var t,a,n,r,o,i,c,u,s,d,m,p,v,E,g,y,h,f,b,x,C,L,A,N;return l.a.createElement("div",{className:"grid-container"},l.a.createElement(D,{id:"count_total_cases",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content"},l.a.createElement("p",null,"Total Cases"),l.a.createElement("h3",null,null===(t=e.countryData)||void 0===t?void 0:t.cases.toLocaleString())),l.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px",bottom:"0px",right:"0px"}})),l.a.createElement(D,{id:"count_total_deaths",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content"},l.a.createElement("p",null,"Total Deaths"),l.a.createElement("h3",null,null===(a=e.countryData)||void 0===a?void 0:a.deaths.toLocaleString()))),l.a.createElement(D,{id:"count_total_recoveries",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content"},l.a.createElement("p",null,"Total Recovered"),l.a.createElement("h3",null,null===(n=e.countryData)||void 0===n?void 0:n.recovered.toLocaleString()))),l.a.createElement(V,{countryCode:null!==(r=null===(o=e.countryData)||void 0===o?void 0:o.countryInfo.iso2)&&void 0!==r?r:"TH"},(function(t){var a,n,r=t.country,o=t.error;t.isLoading;return o?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"cases_today",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content"},l.a.createElement("p",null,"Cases Today"),l.a.createElement("h3",null,null!==(a=null===r||void 0===r||null===(n=r.timeline[0])||void 0===n?void 0:n.new_confirmed.toLocaleString())&&void 0!==a?a:"N/A")))})),l.a.createElement(V,{countryCode:null!==(i=null===(c=e.countryData)||void 0===c?void 0:c.countryInfo.iso2)&&void 0!==i?i:"TH"},(function(t){var a,n,r=t.country,o=t.error;t.isLoading;return o?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"cases_recovered",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content"},l.a.createElement("p",null,"Cases Recovered"),l.a.createElement("h3",null,null!==(a=null===r||void 0===r||null===(n=r.timeline[0])||void 0===n?void 0:n.new_recovered.toLocaleString())&&void 0!==a?a:"N/A")))})),l.a.createElement(V,{countryCode:null!==(u=null===(s=e.countryData)||void 0===s?void 0:s.countryInfo.iso2)&&void 0!==u?u:"TH"},(function(t){var a,n,r,o,i=t.country,c=t.error;t.isLoading;return c?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"graph_fatality",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content",style:{zIndex:1}},l.a.createElement("p",null,"Fatality Rate"),l.a.createElement("h3",null,((null!==(a=null===(n=e.countryData)||void 0===n?void 0:n.deaths)&&void 0!==a?a:1)/(null!==(r=null===(o=e.countryData)||void 0===o?void 0:o.cases)&&void 0!==r?r:1)).toFixed(3)+"%")),l.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px",bottom:"0px",right:"0px"}},l.a.createElement(w,{simple:!0,xAxisValue:"date",yAxisValue:"deaths",timeline:null===i||void 0===i?void 0:i.timeline})))})),l.a.createElement(V,{countryCode:null!==(d=null===(m=e.countryData)||void 0===m?void 0:m.countryInfo.iso2)&&void 0!==d?d:"TH"},(function(t){var a,n,r,o,i,c=t.country,u=t.error;t.isLoading;return u?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"graph_recovery",isLoading:e.isLoading},l.a.createElement("div",{className:"grid_box_inner_content",style:{zIndex:1}},l.a.createElement("p",null,"Recovery Rate"),l.a.createElement("h3",null,((null!==(a=null===(n=e.countryData)||void 0===n?void 0:n.recovered)&&void 0!==a?a:1)/(null!==(r=null===(o=e.countryData)||void 0===o?void 0:o.cases)&&void 0!==r?r:1)).toFixed(3)+"%")),l.a.createElement("div",{style:{position:"absolute",top:"0px",left:"0px",bottom:"0px",right:"0px"}},l.a.createElement(w,{simple:!0,xAxisValue:"date",yAxisValue:"recovered",timeline:null!==(i=null===c||void 0===c?void 0:c.timeline)&&void 0!==i?i:[]})))})),l.a.createElement(D,{id:"map",isLoading:e.isLoading},l.a.createElement("div",{style:{padding:"10px"}},l.a.createElement(_,{lat:null===(p=e.countryData)||void 0===p?void 0:p.countryInfo.lat,lng:null===(v=e.countryData)||void 0===v?void 0:v.countryInfo.long,allCoutries:e.allCountriesData}))),l.a.createElement(D,{id:"global_graph_recovery",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"Global Recoveries Over Time"),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{say:"recovered",xAxisValue:"date",yAxisValue:"recovered",timeline:null===(E=e.globalTimeline)||void 0===E?void 0:E.data})))),l.a.createElement(D,{id:"global_graph_fatality",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"Global Fatalities Over Time"),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{say:"dead",xAxisValue:"date",yAxisValue:"deaths",timeline:null===(g=e.globalTimeline)||void 0===g?void 0:g.data})))),l.a.createElement(D,{id:"global_graph_cases",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"Global New Cases Over Time"),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{say:"new cases",xAxisValue:"date",yAxisValue:"new_confirmed",timeline:null===(y=e.globalTimeline)||void 0===y?void 0:y.data})))),l.a.createElement(V,{countryCode:null!==(h=null===(f=e.countryData)||void 0===f?void 0:f.countryInfo.iso2)&&void 0!==h?h:"TH"},(function(t){var a,n,r,o=t.country,i=t.error;t.isLoading;return i?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"local_graph_recovery",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"Recovery Over Time for ",null!==(a=null===(n=e.countryData)||void 0===n?void 0:n.country)&&void 0!==a?a:"N/A"," "),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{xAxisValue:"date",yAxisValue:"recovered",say:"recovered",timeline:null!==(r=null===o||void 0===o?void 0:o.timeline)&&void 0!==r?r:[]}))))})),l.a.createElement(V,{countryCode:null!==(b=null===(x=e.countryData)||void 0===x?void 0:x.countryInfo.iso2)&&void 0!==b?b:"TH"},(function(t){var a,n,r,o=t.country,i=t.error;t.isLoading;return i?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"local_graph_fatality",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"Fatalities Over Time for ",null!==(a=null===(n=e.countryData)||void 0===n?void 0:n.country)&&void 0!==a?a:"N/A"," "),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{say:"dead",xAxisValue:"date",yAxisValue:"deaths",timeline:null!==(r=null===o||void 0===o?void 0:o.timeline)&&void 0!==r?r:[]}))))})),l.a.createElement(V,{countryCode:null!==(C=null===(L=e.countryData)||void 0===L?void 0:L.countryInfo.iso2)&&void 0!==C?C:"TH"},(function(t){var a,n,r,o=t.country,i=t.error;t.isLoading;return i?l.a.createElement("div",{style:{textAlign:"center",padding:"10px",display:"flex",alignItems:"center",height:"100%",justifyContent:"center"}},l.a.createElement("span",null,"Error")):l.a.createElement(D,{id:"local_graph_cases",isLoading:e.isLoading},l.a.createElement("div",{className:"graph_heading"},"New Cases Over Time for ",null!==(a=null===(n=e.countryData)||void 0===n?void 0:n.country)&&void 0!==a?a:"N/A"," "),l.a.createElement("div",{className:"graph_container"},l.a.createElement("div",{style:{position:"absolute",top:"12px",bottom:"12px",left:"12px",right:"12px"}},l.a.createElement(w,{say:"new cases",xAxisValue:"date",yAxisValue:"new_confirmed",timeline:null!==(r=null===o||void 0===o?void 0:o.timeline)&&void 0!==r?r:[]}))))})),l.a.createElement(D,{id:"table",isLoading:e.isLoading},l.a.createElement("div",{style:{position:"absolute",top:"0px",bottom:"0px",left:"0px",right:"0px",overflow:"auto"}},l.a.createElement(S,{data:null!==(A=null===(N=e.allCountriesData)||void 0===N?void 0:N.data)&&void 0!==A?A:[]}))))}var H=l.a.memo((function(e){var t,a;return e.isLoading?l.a.createElement("div",{className:"controls"},l.a.createElement("div",{className:"controls_detail"},l.a.createElement("span",null,"Updated ",(new Date).toDateString()),l.a.createElement("h3",null,"Realtime stats for")),l.a.createElement("form",null,l.a.createElement("select",null,l.a.createElement("option",null,"Loading ...")))):l.a.createElement("div",{className:"controls"},l.a.createElement("div",{className:"controls_detail"},l.a.createElement("span",null,"Updated ",(new Date).toDateString()),l.a.createElement("h3",null,"Realtime stats for")),l.a.createElement("form",null,l.a.createElement("select",{name:"currentCountry",value:null===(t=e.countryData)||void 0===t?void 0:t.country,onChange:e.changeCountry},null===(a=e.allCountriesData)||void 0===a?void 0:a.data.map((function(e){return l.a.createElement("option",{key:""+e.countryInfo.iso2+e.countryInfo.iso3,value:e.country}," ",I(e.countryInfo.iso2)," \xa0 ",e.country)})))))})),M=a(47);function P(e){return Promise.all([fetch("https://corona.lmao.ninja/v3/covid-19/countries").then((function(e){return e.json()})),fetch("https://corona-api.com/timeline").then((function(e){return e.json()}))])}var z=a(24);function W(){return l.a.createElement("div",{className:"about"},l.a.createElement("h1",null,"About"),l.a.createElement("p",null,"This is a simple project i made to learn React. The source code for this app is available on github. The API for the dashboard is provided by"," ",l.a.createElement("a",{href:"https://about-corona.net/documentation"},"https://about-corona.net/documentation"),".",l.a.createElement("br",null)," ",l.a.createElement("br",null)," The sources for data are available at the api documentation as well."),l.a.createElement("h4",{style:{marginTop:"10px",marginBottom:"10px"}},"Data Sources"),l.a.createElement("ul",{style:{marginTop:"0px"}},l.a.createElement("li",null,"World Health Organization Situation Reports"),l.a.createElement("li",null,"Johns Hopkins CSSE"),l.a.createElement("li",null,"US CDC"),l.a.createElement("li",null,"China CDC (CCDC)"),l.a.createElement("li",null,"European Centre for Disease Prevention and Control (ECDC)"),l.a.createElement("li",null,"National Health Commission of the People\u2019s Republic of China (NHC)"),l.a.createElement("li",null,"DXY.cn. Pneumonia. 2020")),l.a.createElement("p",null,"Thanks to"," ",l.a.createElement("a",{href:"https://about-corona.net/"},"https://about-corona.net "),"for providing the API."),l.a.createElement("h3",{style:{textAlign:"center",marginTop:"20px"}},"Stay Safe \u2022 Wear Masks \u2022 Wash hands \u2022 Maintain Social Distance"))}function B(){return l.a.createElement("div",{className:"manual"},l.a.createElement("iframe",{className:"iframe",src:"https://tunchz.github.io/ISOC/Manual_DRM.pdf"}))}function J(){var e=function(e){var t=Object(k.a)(["https://corona.lmao.ninja/v3/covid-19/countries","https://corona-api.com/timeline"],P,{refetchInterval:0,refetchOnWindowFocus:!1,refetchIntervalInBackground:!1}),a=t.refetch,l=t.isLoading,r=t.error,o=t.data,c=Object(n.useState)({globalTimeline:null,countryData:null,allCountriesData:null}),u=Object(i.a)(c,2),s=u[0],d=u[1],m=Object(n.useState)(e.startingCountry),p=Object(i.a)(m,2),v=p[0],E=p[1];return Object(n.useEffect)((function(){if(o&&o[0]&&o[1]){var e={data:o[0]}.data.filter((function(e){return 0!==e.countryInfo.lat&&0!==e.countryInfo.long})),t=e.find((function(e){return e.country===v})),a={data:e};d(Object(M.a)(Object(M.a)({},s),{},{allCountriesData:a,globalTimeline:o[1],countryData:t}))}}),[o]),{allCountriesData:s.allCountriesData,globalTimeline:s.globalTimeline,isLoading:l,changeCountry:function(e){var t,a=e.target.value,n=null===(t=s.allCountriesData)||void 0===t?void 0:t.data.find((function(e){return e.country===a}));n&&d((function(e){return Object(M.a)(Object(M.a)({},e),{},{countryData:n})})),E(a)},countryData:s.countryData,error:r,retry:a}}({startingCountry:"Thailand"}),t=e.allCountriesData,a=e.error,r=e.changeCountry,o=e.countryData,c=e.isLoading,u=e.globalTimeline,s=e.retry;return a?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}},l.a.createElement("h4",null,"An Error Occurred"),l.a.createElement("p",null,"Please Try Again Later"),l.a.createElement("p",{style:{width:"240px"}},"But don't worry it has been automatically reported"),l.a.createElement("br",null),l.a.createElement("button",{onClick:s,style:{borderRadius:"2px",color:"white",background:"#1f78b4",outline:"none",border:"0px",fontSize:"15px",height:"40px",display:"block",width:"200px"}},"Retry"))):l.a.createElement(l.a.Fragment,null,l.a.createElement(H,{isLoading:c,allCountriesData:t,changeCountry:r,countryData:o}),l.a.createElement(F,{allCountriesData:t,isLoading:c,globalTimeline:u,countryData:o}))}function G(e){return l.a.createElement("main",null,l.a.createElement("div",{className:"main_content"},l.a.createElement(z.c,null,l.a.createElement(z.a,{exact:!0,path:"/ReactCovid19/"},l.a.createElement(J,null)),l.a.createElement(z.a,{path:"/ReactCovid19/about"},l.a.createElement(W,null)),l.a.createElement(z.a,{path:"/ReactCovid19/manual"},l.a.createElement(B,null)))))}var U,K=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(E,null),l.a.createElement(G,null),l.a.createElement(g,null))};C.a.accessToken=null!==(U="pk.eyJ1Ijoia2hhdHRha2FobWVkIiwiYSI6ImNrYTZqb2VvNjAwankycG16emI1a3VhanYifQ.nwaK090RUAWB1yIfVOS63Q")?U:"",o.a.render(l.a.createElement(v.a,null,l.a.createElement(K,null)),document.getElementById("root"))}},[[188,1,2]]]);
//# sourceMappingURL=main.3ebd7d5b.chunk.js.map