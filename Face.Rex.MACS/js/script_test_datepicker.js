$(document).ready(function() {

  /*----bootstrap.min.js
  $('[data-toggle="popover"]').popover({
    'container': '#pf-timeline',
    'placement': 'top'
  });
  */

});


/*------click on event drop
$(document).on('click', '.drop', function () {$(this).popover('show'); });

$(document).on('click', '.grid', function () {$('[data-toggle="popover"]').popover('hide');});
*/

const ONE_HOUR = 60 * 60 * 1000,
      ONE_DAY = 24 * ONE_HOUR;

/*
const ONE_HOUR = 60 * 60 * 1000,
      ONE_DAY = 24 * ONE_HOUR,
      ONE_WEEK = 7 * ONE_DAY,
      ONE_MONTH = 30 * ONE_DAY,
      SIX_MONTHS = 6 * ONE_MONTH,
      ONE_YEAR = 365 * ONE_DAY ;
*/
var data = [],
  //start = new Date('2020-05-18T17:59:06.134Z'),
  today = new Date();//Date('2020-05-18T17:59:06.134Z');

for (var x in json) { //json lives in external file for testing
  data[x] = {};
  data[x].name = json[x].name;

/*
  data[x].data = [];
  for (var y in json[x].data) {
    data[x].data.push({});
    data[x].data[y].date = new Date(json[x].data[y].date);
    data[x].data[y].details = json[x].data[y].details;
  }
*/

  $('#timeline-selectpicker').append("<option>" + data[x].name + "</option>");
  data[x].display = true;
}
$('#timeline-selectpicker').selectpicker('selectAll');



/*


var timeline = d3.chart.timeline()
  .end(today)
  .start(today - ONE_WEEK)
  .minScale(ONE_WEEK / ONE_MONTH)
  .maxScale(ONE_WEEK / ONE_HOUR)
  .eventClick(function(el) {
    var table = '<table class="table table-striped table-bordered">';
    if(el.hasOwnProperty("events")) {
      table = table + '<thead>This is a group of ' + el.events.length + ' events starting on '+ el.date + '</thead><tbody>';
      table = table + '<tr><th>Date</th><th>Event</th><th>Object</th></tr>';
      for (var i = 0; i < el.events.length; i++) {
        table = table + '<tr><td>' + el.events[i].date + ' </td> ';
        for (var j in el.events[i].details) {
          table = table +'<td> ' + el.events[i].details[j] + ' </td> ';
        }
        table = table + '</tr>';
      }
      table = table + '</tbody>';
    } else {
      table = table + 'Date: ' + el.date + '<br>';
      for (i in el.details) {
        table = table + i.charAt(0).toUpperCase() + i.slice(1) + ': ' + el.details[i] + '<br>';
      }
    }
    $('#legend').html(table);

  });
*/

/*
if(countNames(data) <= 0) {
  //--------------timeline.labelWidth(60);
}
*/


var element = d3.select('#pf-timeline').append('div').datum(data.filter(function(eventGroup) {
  return eventGroup.display === true;
}));



//--------------timeline(element);



$('#timeline-selectpicker').on('changed.bs.select', function(event, clickedIndex, newValue, oldValue) {
  data[clickedIndex].display = !data[clickedIndex].display;
  element.datum(data.filter(function(eventGroup) {
    return eventGroup.display === true;
  }));

  //--------------timeline(element);

  /*----bootstrap.min.js
  $('[data-toggle="popover"]').popover({
    'container': '#pf-timeline',
    'placement': 'top'
  });
  */

  //**************update after item option has been reselected
  console.log(data);


});

/*

$(window).on('resize', function() {

  screenResizeW(isWidthSmall);
  screenResizeH(isHeightSmall);

});
*/

$('#datepicker').datepicker({
  autoclose: true,
  //todayBtn: "linked",
  todayHighlight: true
});

$('#datepicker').datepicker('setDate', today);

$('#datepicker').on('changeDate', zoomFilter);

$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {
  var $target = $( event.currentTarget );
  $target.closest( '.dropdown' )
    .find( '[data-bind="label"]' ).text( $target.text() )
      .end()
    .children( '.dropdown-toggle' ).dropdown( 'toggle' );

  zoomFilter();

  return false;
});

/*
function countNames(data) {
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].name !== undefined && data[i].name !=='') {
      count++;
    }
  }
  return count;
}
*/


function zoomFilter() {
/*
  var range = $('#range-dropdown').find('[data-bind="label"]' ).text(),
      position = $('#position-dropdown').find('[data-bind="label"]' ).text(),
      date = $('#datepicker').datepicker('getDate'),
      startDate,
      endDate;

  switch (range) {
    case '1 วัน':
      range = ONE_DAY;
      break;

    case '1 สัปดาห์':
      range = ONE_WEEK;
      break;

    case '1 เดือน':
      range = ONE_MONTH;
      break;

    case '1 ปี':
      range = ONE_YEAR;
      break;  }
  switch (position) {
    case 'centered on':
      startDate = new Date(date.getTime() - range/2);
      endDate = new Date(date.getTime() + range/2);
      break;

    case 'เริ่มต้น':
      startDate = date;
      endDate = new Date(date.getTime() + range);
      break;

    case 'สิ้นสุด':
      startDate =  new Date(date.getTime() - range);
      endDate = date;
      break;   
  }
*/  
  //--------------timeline.Zoom.zoomFilter(startDate, endDate);

  //**************update after time option has been reselected
  //console.log(range,startDate,endDate)
  filterDate = formatDate($('#datepicker').datepicker('getDate'));
  updateTable();
}

$('#reset-button').click(function() {

  //--------------timeline(element);

  /*----bootstrap.min.js
  $('[data-toggle="popover"]').popover({
    'container': '#pf-timeline',
    'placement': 'top'
  });
  */
  
//  document.getElementById("range").innerHTML = "1 วัน";
//  document.getElementById("position").innerHTML = "สิ้นสุด";
  $('#datepicker').datepicker('setDate', today);

  zoomFilter();


});

$('#left-button').click(function() {

  //conts date =  ;

  $('#datepicker').datepicker('setDate', new Date(($('#datepicker').datepicker('getDate')).getTime() - ONE_DAY));

  zoomFilter();


});

$('#right-button').click(function() {

  if (formatDate($('#datepicker').datepicker('getDate')) != formatDate(new Date())) {
    $('#datepicker').datepicker('setDate', new Date(($('#datepicker').datepicker('getDate')).getTime() + ONE_DAY));

    zoomFilter();
  }

});


