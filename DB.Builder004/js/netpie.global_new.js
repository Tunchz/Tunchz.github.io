/*  NETPIE global functions                                         */

if (typeof globalStore === "undefined") {
    globalStore = {};
}

function runCode(cmd) {
    eval(eval(cmd));
}

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

function toggletheme() {
    var stylesheet = document.getElementById('netpie-theme-css');
    if(stylesheet!=null){
        stylesheet.parentNode.removeChild(stylesheet);
        np_theme = "default";
    }
    else{
        var  theme = document.createElement('link');
        theme.id = 'netpie-theme-css';
        theme.href = 'css/netpie.theme.css';
        theme.rel = 'stylesheet';
        document.head.appendChild(theme);
        np_theme = "netpie";
    }
    tmp_theme = np_theme;
    saveTheme();
    freeboard.emit('theme_changed');
}

//=============== for web ===============//
var dtmp = '{}';
var access_mode = document.getElementById("am") ? document.getElementById("am").value : '';
if(access_mode == 'web'){
    var sid = document.getElementById("sid") ? document.getElementById("sid").value : '';
    var arr = window.location.pathname.split("/");
    var url = 'https://api.netpie.io/freeboard/'+arr[arr.length-1];
}

function np_getDatasource(){ 
    if(access_mode == 'web'){
        var http = new XMLHttpRequest();                            
        var param = "?sesid="+sid+"&_version=_v2";
                    
        http.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                dtmp = http.responseText;
                freeboard.emit('load_theme');
            }
        };
                                
        http.open("GET", url+param, true);
        http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        http.send();
    }
    else dtmp = window.localStorage.getItem("netpie.freeboard.dashboard");
}
//=======================================//

if (typeof np_theme == "undefined") { 
        np_getDatasource();
        if(dtmp!==null && dtmp != '{}'){
        var djson = JSON.parse(dtmp);
        np_theme = (typeof djson.theme != 'undefined') ? djson.theme : "default";
    }
    else np_theme = "default";
}

function saveTheme(){
    var data = dtmp;
    if(data!==null && dtmp != '{}'){ 
        var datajson = JSON.parse(data);
        datajson.theme = np_theme;
        
        //update flags for save datasource (for web)
        tmp_datasource = JSON.stringify(datajson); 

        save_mode = save_mode == 'no' ? 'yes' : save_mode;
    }    
}

freeboard.on('load_theme',function() {
    var stylesheet = document.getElementById('netpie-theme-css');
    var data = dtmp;
    var datajson = JSON.parse(data);
    if(datajson!==null && dtmp != '{}'){ 
        if(datajson.theme===null || datajson.theme=="default"){
            if(stylesheet!=null){
                stylesheet.parentNode.removeChild(stylesheet);
            }
            np_theme = "default";
            document.getElementById('theme-toggle').checked = false;
        }
        if(datajson.theme=="netpie"){
            var  theme = document.createElement('link');
            theme.id = 'netpie-theme-css';
            theme.href = 'css/netpie.theme.css';
            theme.rel = 'stylesheet';
            document.head.appendChild(theme);
            np_theme = "netpie";
            document.getElementById('theme-toggle').checked = true;
        }
    }
    else{
        np_theme = "default";
        document.getElementById('theme-toggle').checked = false;
    }
    saveTheme();
});

freeboard.emit('load_theme');
