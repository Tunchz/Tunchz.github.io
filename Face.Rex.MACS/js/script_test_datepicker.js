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


var dept = [{"dept" : "All"},{"dept" : "MACS"},{"dept" : "MHL"},{"dept" : "Tunchz Family"}];


/*
for (var x in dept) { 
  $('#timeline-selectpicker').append("<option>" + dept[x].dept + "</option>");
  dept[x].display = true;
}
$('#timeline-selectpicker').selectpicker('selectAll');

*/

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

var allGroup = ["All", "MACS", "MHL", "Tunchz Family"];

// add the options to the button
d3.select("#dept-selector")
  .selectAll('myOptions')
  .data(allGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

d3.select("#dept-selector").on("change", function(d) {
    // recover the option that has been chosen
    filterDept = d3.select(this).property("value")
    // run the updateChart function with this selected option
    //console.log(filterDept);
    zoomFilter();
})


/*
var element = d3.select('#pf-timeline').append('div').datum(dept.filter(function(eventGroup) {
  return eventGroup.display === true;
}));



//--------------timeline(element);



$('#timeline-selectpicker').on('changed.bs.select', function(event, clickedIndex, newValue, oldValue) {
  dept[clickedIndex].display = !dept[clickedIndex].display;
  element.datum(dept.filter(function(eventGroup) {
    return eventGroup.display === true;
  }));


  console.log(dept);


});
*/


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

/*
$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {
  var $target = $( event.currentTarget );
  $target.closest( '.dropdown' )
    .find( '[data-bind="label"]' ).text( $target.text() )
      .end()
    .children( '.dropdown-toggle' ).dropdown( 'toggle' );

  zoomFilter();

  return false;
});
*/


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


