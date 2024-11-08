// Código prototipo preliminar no refactorizado
// Prototype code not refactorized

(function() {
    var VEL_INTERFAZ = 600,
        angleStart = 0,
        radio = 250,
        radioPadding = 10,
        radioHoursDot = radio + radioPadding + 12,
        radioHoursLabel = radio + radioPadding + 25,
        formulaRadioBreakdown = (radio * .75) * 2,
        isOuterRadio = 0,
        demanda,
        consumoMaximo,
        consumoMinimo,
        consumoMedio,
        canvasWidth = 1000, //document.getElementById('top-section').clientWidth,  //"100%", //960,
        canvasHeight = 600,
        centerX = canvasWidth * .4,
        centerY = canvasHeight / 2,
        lastJsonData;

    //SUMA LOS ELEMENTOS DEL ARRAY
    Array.prototype.sum = function(ignoraNegativos) {
        var sum = 0,
            ln = this.length,
            i;

        for (i = 0; i < ln; i++) {
            if (typeof(this[i]) === 'number') {

                if (ignoraNegativos && this[i] < 0) {
                    continue;
                } else {
                    sum += this[i];
                }
            }
        }

        return sum;
    }

    function grados_a_radianes(grados) {

        return Math.PI / 180 * grados;
    }

    function rd3(maxi, dato, medida) {
        // la variable medida es la que marca. 180 es un hemiciclo, 360 es un circulo completo
        var mx = +maxi,
            med = (medida) ? medida : 100;
        return (dato * med) / mx;
    }

    function calcArrayPercents(arr) {

        var sum = arr.sum(),
            parciales = [],
            ln = arr.length,
            calc,
            i;

        for (i = 0; i < ln; i++) {
            calc = (arr[i] * 100) / sum;
            parciales.push(calc >= 0 ? calc : 0);
        }

        return parciales;
    }



    // var es_ES = {
    //         "decimal": ",",
    //         "thousands": ".",
    //         "grouping": [3],
    //         "currency": ["€", ""],
    //         "dateTime": "%a %b %e %X %Y",
    //         "date": "%d/%m/%Y",
    //         "time": "%H:%M:%S",
    //         "periods": ["AM", "PM"],
    //         "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    //         "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    //         "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    //         "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    //     },
    var en_US = {
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["$", ""],
            "dateTime": "%a %b %e %X %Y",
            "date": "%m/%d/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        // ES = d3.locale(es_ES),
        ENUS = d3.locale(en_US),
        iso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ"),
        tooltipDateFormat = ENUS.timeFormat("%A %d, %H:%M")






    var tablaIdsOrdenados = ['eol', 'hid', 'sol', 'aut', 'gf', 'nuc', 'car', 'cc', 'inter', 'icb'],
        radEcoParametersOrderArr = ['eol', 'hid', 'sol'],
        tablaIdsInfo = {
            'eol': {
                'id': 'eol',
                'nombre': 'Wind',
                'nombreAbrev': 'น้ำขุ่น/มีกลิ่น',
                'color': '7EAADD',
                'highlightColor': 'c6d1dd',
                'icon': '\\e82b',
            },
            'hid': {
                'id': 'hid',
                'nombre': 'Hydroelectric',
                'nombreAbrev': 'น้ำไม่ไหล',
                'color': '33537A',
                'highlightColor': '446fa4',
                'icon': '\\e82d'
            },
            'sol': {
                'id': 'sol',
                'nombre': 'Solar/Solar Thermal',
                'nombreAbrev': 'น้ำไหลอ่อน',
                'color': 'F5A623',
                'highlightColor': 'f5cc89',
                'icon': '\\e82c'
            },
            'aut': {
                'id': 'aut',
                'nombre': 'Special Scheme',
                'nombreAbrev': 'มาตรวัด',
                'color': '9B9B9B',
                'highlightColor': 'bdbdbd',
                'icon': '\\e800'
            },
            'gf': {
                'id': 'gf',
                'nombre': 'Gas + Fuel',
                'nombreAbrev': 'เจ้าหน้าที่',
                'color': '6F93A4',
                'highlightColor': '96C6DD',
                'icon': '\\e806'
            },
            'nuc': {
                'id': 'nuc',
                'nombre': 'Nuclear',
                'nombreAbrev': 'งานซ่อมท่อ',
                'color': 'BD10E0',
                'highlightColor': 'd712ff',
                'icon': '\\e807'
            },
            'car': {
                'id': 'car',
                'nombre': 'Coal',
                'nombreAbrev': 'งานวางท่อ',
                'color': '583636',
                'highlightColor': '795d5d',
                'icon': '\\e805'
            },
            'cc': {
                'id': 'cc',
                'nombre': 'Combined Cycle',
                'nombreAbrev': 'ใบแจ้งหนี้ค่าน้ำ',
                'color': '3D4163',
                'highlightColor': '686fa9',
                'icon': '\\e804'
            },
            'inter': {
                'id': 'inter',
                'nombre': 'Coal',
                'nombreAbrev': 'งานซ่อมท่อ',
                'color': '0881B4',
                'highlightColor': '795d5d',
                'icon': '\\e805'
            },
            'icb': {
                'id': 'icb',
                'nombre': 'Combined Cycle',
                'nombreAbrev': 'ค่าน้ำผิดปกติ',
                'color': '8835AB',
                'highlightColor': '686fa9',
                'icon': '\\e804'
            }
        },
        tablaIdsConsumos = {
            'eol': {
                'med24h': 0,
                'percent24h': []
            },
            'hid': {
                'med24h': 0,
                'percent24h': []
            },
            'sol': {
                'med24h': 0,
                'percent24h': []
            },
            'aut': {
                'med24h': 0,
                'percent24h': []
            },
            'gf': {
                'med24h': 0,
                'percent24h': []
            },
            'nuc': {
                'med24h': 0,
                'percent24h': []
            },
            'car': {
                'med24h': 0,
                'percent24h': []
            },
            'cc': {
                'med24h': 0,
                'percent24h': []
            },
            'inter': {
                'med24h': 0,
                'percent24h': []
            },
            'icb': {
                'med24h': 0,
                'percent24h': []
            }
        },
        tablaEmisiones = {
            "icb": 0,
            "inter": 0,
            "car": 0.95,
            "aut": 0.27,
            "sol": 0,
            "cc": 0.37,
            "hid": 0,
            "gf": 0.7,
            "nuc": 0,
            "eol": 0
        },
        displayParameters = {
            'dem': true,
            'icb': true,
            'inter': true,
            'car': true,
            'aut': true,
            'sol': true,
            'cc': true,
            'hid': true,
            'gf': true,
            'nuc': true,
            'eol': true,
            'ts': true
        },

        energiasMostradas = {
            'icb': true,
            'inter': true,
            'car': true,
            'aut': true,
            'sol': true,
            'cc': true,
            'hid': true,
            'gf': true,
            'nuc': true,
            'eol': true
        };


    //DIBUJO BASE 


    var svg = d3.select("#top-section").append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight)

    var defs = svg.append("defs"),
        filter = defs.append("filter")
        .attr("id", "brightness"),
        feComponent = filter.append("feComponentTransfer");
    feComponent.append('feFuncR')
        .attr('type', 'linear')
        .attr('slope', '1.25')
    feComponent.append('feFuncG')
        .attr('type', 'linear')
        .attr('slope', '1.25')
    feComponent.append('feFuncB')
        .attr('type', 'linear')
        .attr('slope', '1.25')

    //.style("filter", "url(#brightness)")  


    svg.append('rect')
        .attr('id', 'eye-bg')
        .attr({
            'x': 0,
            'y': 0,
            'width': canvasWidth,
            'height': canvasHeight,
            'fill': '#E1E1E100'
        });

    svg.append('g').attr('id', 'base');


    svg.append('circle')
        .attr('id', 'circleBG')
        .attr('r', radio+radioPadding)
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('fill', '#5559');

    var horaRotation = d3.scale.linear()
        .domain([0, 24 * 60])
        .range([0, 360]);
        
    var arc = d3.svg.arc()
        .startAngle(grados_a_radianes(angleStart + 180 + horaRotation((8 * 60) + 0)))
        .endAngle(grados_a_radianes(angleStart + 180 + horaRotation((16 * 60) + 0)))
        .innerRadius(0)
        .outerRadius(radio+radioPadding);
        
    svg.append("path")
        .attr('id', 'day-shade')
		.attr("transform", function(d, i) {
			return "translate("+centerX+","+centerY+")"
		})
        .attr("fill", "#fff1") //"#D0953322")
        // .attr("stroke-width", 0)
        // .attr("stroke", "darkslategray")
        .attr("d", arc())

    // Create the Host for 'RADIOS'

    svg.append('g').attr('id', 'horas');

    var hostRads = svg.append('g').attr('id', 'hostRads'),
        groupCircle = svg.append('g').attr('id', 'consumo'),
        consumoCircle = groupCircle.append('circle')
        .attr('r', radio)
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('stroke', '#990000')
        .attr('fill', 'none')
        .attr('stroke-dasharray', 3)
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0);

    var groupConsumo = svg.append('g').attr('id', 'consumo-dot'),
        consumoDot = groupConsumo.append('circle')
        .attr('r', 5)
        .attr('cx', -9999)
        .attr('cy', -9999)
        .attr('stroke', 'none')
        .attr('fill', '#900')


    var grupoHoras = d3.select("svg #horas")
        .attr('transform', 'translate(' + centerX + ',' + centerY + ')');

    // Minute Pulsing 24*60 
    var horaRotation = d3.scale.linear()
        .domain([0, 24 * 60])
        .range([0, 360]);

    var hoy = new Date();
    var currentHourRotation = horaRotation((60 * hoy.getHours()) + hoy.getMinutes());

    var circleHour = svg.append('circle')
        .attr('id', 'circleHour')
        .attr('r', 3)
        .attr('cx', centerX + (radioHoursDot) * Math.sin(grados_a_radianes(angleStart + 360 - currentHourRotation)))
        .attr('cy', centerY + (radioHoursDot) * Math.cos(grados_a_radianes(angleStart + 360 - currentHourRotation)))
        .attr('stroke-width', '2')
        .attr('stroke', '#BCD5D5')
        .attr('fill', '#BCD5D5');

    var clockTimer = setInterval(function() {

        var date = new Date(),
            currentHourRotation = horaRotation((60 * date.getHours()) + date.getMinutes()),
            calc = grados_a_radianes(angleStart + 360 - currentHourRotation);

        circleHour.transition()
            .attr('cx', centerX + radioHoursDot * Math.sin(calc))
            .attr('cy', centerY + radioHoursDot * Math.cos(calc))
            .attr('r', function() {
                return ((circleHour.attr('r') != 3) ? 3 : 1);
            });
    }, 1000);

    // 24 Hours Label

    var rotation,
        n,
        lnHoras = 24;

    for (n = 0; n < lnHoras; n++) {
        rotation = angleStart - (360 / lnHoras) * n;
        grupoHoras.append('text')
            .text(((n > 9) ? n : "0" + n) + ':00')
            .attr('x', (radioHoursLabel) * Math.sin(grados_a_radianes(rotation)))
            .attr('y', (radioHoursLabel) * Math.cos(grados_a_radianes(rotation)) + 7)
            .attr('text-anchor', 'middle')
            .style('font-size', '14')
            .style('font-family', 'Kanit')
            .style('fill', '#FFF')
    }

    // PINTO EL Breakdown

    var Breakdown = svg.append('g')
        .attr('id', 'Breakdown_grupo')
        .attr('transform', 'translate(' + (centerX + radio+100) + ',' + (centerY - (radio * .75)) + ')')
        .attr('opacity', 0);

    Breakdown.append('rect')
        .attr('y', formulaRadioBreakdown + 20)
        .attr('width', 165)
        .attr('height', 3)
        .attr('fill', '#3C3C3C');

    var fechaBloque = Breakdown.append('text')
        .text("hoy")
        .attr('y', formulaRadioBreakdown + 39)
        .attr('text-anchor', 'start')
        .style('font-size', '14')
        .style('font-family', 'Kanit')
        .attr('fill', '#fff');

    var horaBloque = Breakdown.append('text')
        .text("21:00h")
        .attr('y', formulaRadioBreakdown + 62)
        .attr('text-anchor', 'start')
        .style('font-size', '27')
        .style('font-family', 'Kanit')
        .attr('fill', '#fff');

    var BreakdownBloqueRenovable = Breakdown.append('g');

    var altoRenovables = BreakdownBloqueRenovable.append('rect')
        .attr('x', -8)
        .attr('width', 2)
        .attr('height', 200)
        .attr('fill', '#669C83');

    var textoRenovables = BreakdownBloqueRenovable.append('text')
        .text("--")
        .attr('text-anchor', 'middle')
        .style('font-size', '13')
        .style('font-family', 'Kanit')
        .attr('fill', '#669C83')
        .attr('x', -100)
        .attr('y', -12)
        .attr('transform', 'rotate(-90)');


    // PINTO EL TOOLTIP
    var tooltipWidth = 120,
        tooltipHeight = 28,
        currentTooltipFormat,
        tooltip = svg.append('g').attr('id', 'dem-tooltip').attr('opacity', 0),
        tooltip_shadow = tooltip.append('rect')
        .attr({
            'width': tooltipWidth + 4,
            'height': tooltipHeight + 4,
            'fill': 'black',
            'fill-opacity': .15
        }),
        tooltip_rect = tooltip.append('rect')
        .attr({
            'width': tooltipWidth,
            'height': tooltipHeight
        }),
        tooltip_fecha = tooltip.append('text')
        .attr('id', 'fecha')
        .attr('x', 5)
        .attr('y', 11)
        .attr('text-anchor', 'start')
        .style('font-size', '11')
        .style('font-family', 'Kanit')
        .style('fill', 'black')
        .style('fill-opacity', .75),
        tooltip_mw = tooltip.append('text')
        .text('')
        .attr('x', 15)
        .attr('y', 24)
        .style('font-size', '13')
        .style('font-family', 'Kanit')
        .style('fill', 'white');



    function setTooltip(name) {


        if (name == 'fmt_0_0') {

            tooltip_shadow
                .attr({
                    'x': -(tooltipWidth + 2),
                    'y': -(tooltipHeight + 2)
                });

            tooltip_rect
                .attr({
                    'x': -tooltipWidth,
                    'y': -tooltipHeight
                });

            tooltip_fecha
                .attr({
                    'x': -4,
                    'y': -16,
                    'text-anchor': 'end'
                });

            tooltip_mw
                .attr({
                    'x': -4,
                    'y': -4,
                    'text-anchor': 'end'
                });


        }

        if (name == 'fmt_1_0') {

            tooltip_shadow
                .attr({
                    'x': -2,
                    'y': -(tooltipHeight + 2)
                });

            tooltip_rect
                .attr({
                    'x': 0,
                    'y': -tooltipHeight
                });

            tooltip_fecha
                .attr({
                    'x': 5,
                    'y': -16,
                    'text-anchor': 'start'
                });

            tooltip_mw
                .attr({
                    'x': 5,
                    'y': -4,
                    'text-anchor': 'start'
                });

        }
        if (name == 'fmt_1_1') {
            tooltip_shadow
                .attr({
                    'x': -2,
                    'y': -2
                });

            tooltip_rect
                .attr({
                    'x': 0,
                    'y': 0
                });

            tooltip_fecha
                .attr({
                    'x': 5,
                    'y': 11,
                    'text-anchor': 'start'
                });

            tooltip_mw
                .attr({
                    'x': 5,
                    'y': 24,
                    'text-anchor': 'start'
                });

        }
        if (name == 'fmt_0_1') {
            tooltip_shadow
                .attr({
                    'x': -(tooltipWidth + 2),
                    'y': -2
                });

            tooltip_rect
                .attr({
                    'x': -tooltipWidth,
                    'y': 0
                });

            tooltip_fecha
                .attr({
                    'x': -4,
                    'y': 11,
                    'text-anchor': 'end'
                });

            tooltip_mw
                .attr({
                    'x': -4,
                    'y': 24,
                    'text-anchor': 'end'
                });

        }


    }

    function mousemove(d, i) {

        var coords = d3.mouse(this),
            x = coords[0],
            y = coords[1],
            mth = Math,
            xs = mth.pow(centerX - x, 2),
            ys = mth.pow(centerY - y, 2),
            sqrt = mth.sqrt(xs + ys),
            offset = {
                'left': svg.offsetLeft,
                'top': svg.offsetTop
            },
            xsign = (x > centerX) ? 1 : 0,
            ysign = (y > centerY) ? 1 : 0,
            tooltipFmtName = ['fmt_', xsign, '_', ysign].join("");

        if (tooltipFmtName != currentTooltipFormat) {
            setTooltip(tooltipFmtName);
            currentTooltipFormat = tooltipFmtName;
        }

        if (isOuterRadio != +(sqrt <= radio)) {



            isOuterRadio = +(sqrt <= radio);

/////            groupCircle.transition().duration(100).style('opacity', isOuterRadio);
/////            groupConsumo.transition().duration(100).style('opacity', isOuterRadio);
/////            tooltip.transition().duration(100).style('opacity', isOuterRadio);
            groupCircle.transition().duration(1).style('opacity', isOuterRadio);
            groupConsumo.transition().duration(1).style('opacity', isOuterRadio);
            tooltip.transition().duration(1).style('opacity', isOuterRadio);

            if (!isOuterRadio) {
                dispatch.mouseenter(this, lastJsonData);
            }

        }

    }


    svg.on('mousemove', mousemove)


    function demFn(d) {
        return +d.dem;
    }

    function idFn(d) {
        return d.id;
    }

    var sizes = d3.scale.linear()
        .range([10, 24]),
        opacityScale = d3.scale.linear()
        .range([.4, 1]),
        colorDemand = d3.scale.linear()
        .range(['#996A00', '#990000']);

    // ESTA ESCALA ME PERMITE ESTABLECER EL MÁXIMO Y MÍNIMO CONSUMO EN FUNCIÓN DE LA DEMANDA
    // Y VARIAR EL MÁXIMO PORCENTAJE DE RADIO

    var scaleRadius = d3.scale.linear()
        .range([0, radio]);

    var dispatch = d3.dispatch("mouseenter");
    dispatch.on("mouseenter", debounce(pintaBreakdown, 125))


    //http://davidwalsh.name/javascript-debounce-function

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function pintaBreakdown(evt, datos) {

        // CALCULAMOS LA SUMA DE LAS DIFERENTES ENERGÍAS PROVEEDORAS
        var generadoras = tablaIdsOrdenados.map((r)=>datos[r]),   //[datos.eol, datos.hid, datos.sol, datos.aut, datos.gf, datos.nuc, datos.car, datos.cc],
            porcentajesDemanda = calcArrayPercents(generadoras),
            demandaHora = generadoras.sum(true);


        var acumuladoInner = 0,
            grosorGeneradora = 0,
            ln = porcentajesDemanda.length,
            tsDate = iso.parse(datos.ts),
            h = tsDate.getHours(),
            m = tsDate.getMinutes(),
            ecoPercent = rd3(demandaHora, radEcoParametersOrderArr.map((r)=>datos[r]).sum(true)),
            path,
            i;


        Breakdown
            .attr('opacity', 1)

        textoRenovables.text("ผลิตภัณฑ์ " + ENUS.numberFormat(",.2f")(ecoPercent) + "% ")
            .transition()
            .attr('x', -(formulaRadioBreakdown / 100 * ecoPercent) / 2)

        altoRenovables
            .transition()
            .attr('height', (formulaRadioBreakdown / 100 * ecoPercent))

        fechaBloque
            .text(ENUS.timeFormat("%A %d")(tsDate))

        horaBloque
            .text(ENUS.timeFormat("%H:%M")(tsDate) + " น.")

        var scaleBreakdown = d3.scale.linear()
            .range([0, formulaRadioBreakdown]),
            tabla = [];

        for (i = 0; i < tablaIdsOrdenados.length; i++) {
            tabla[i] = {
                id: tablaIdsOrdenados[i],
                datos: datos[tablaIdsOrdenados[i]]
            };
        }


        var bloques = Breakdown.selectAll('.j-bloque')
            .data(tabla, function(d, i) {
                return d.id;
            });

        bloques.enter()
            .append('g')
            .attr('id', function(d, i) {
                return "des_" + d.id;
            })
            .attr('class', 'j-bloque')
            .each(function() {
                var that = d3.select(this);

                that.append('rect')
                    .attr('width', 6)
                    .attr('height', 10)
                    .attr('fill', function(d) {
                        return '#' + tablaIdsInfo[d.id].color;
                    });

                that.append('text')
                    .text(function(d) {
                        return tablaIdsInfo[d.id].id;
                    })
                    .attr('class', 'j-nombre')
                    .attr('x', 30)
                    .attr('y', 20)
                    .attr('text-anchor', 'start')
                    .style('font-size', '13')
                    .style('font-family', 'Kanit')
                    .style('fill', '#B3B3B3')
                    .style('fill', function(d) {
                        return '#' + tablaIdsInfo[d.id].color;  //tablaIdsInfo[d.id].highlightColor;
                    })
                    .attr('transform', 'rotate(-45)');

                that.append('text')
                    .text(function(d) {
                        return tablaIdsInfo[d.id].id;
                    })
                    .attr('class', 'j-MW')
                    .attr('x', 30)
                    .attr('y', 32)
                    .attr('text-anchor', 'start')
                    .style('font-size', '12')
                    .style('font-family', 'Kanit')
                    .style('fill', '#B3B3B3')
                    .style('fill', function(d) {
                        return '#' + tablaIdsInfo[d.id].color;  //tablaIdsInfo[d.id].highlightColor;
                    })
                    .attr('transform', 'rotate(-45)');

                that.append('path')
                    .style('fill', 'none')
                    .style('stroke-width', '1')
                    .style('stroke', function(d) {
                        return '#' + tablaIdsInfo[d.id].color;
                    })


            }).attr('transform', function(d, i) {

                return 'translate(0,' + (50 * i) + ')'

            })


        //UPDATE
        var safeStep = 33,
            safeStepCalc = 0,
            colisionCounter = 0,
            minPercentStep = 8;

        bloques.each(function(d, i) {


            if (porcentajesDemanda[i - 1] < minPercentStep) {
                colisionCounter++;
            }


            safeStepCalc = safeStep * colisionCounter;
            grosorGeneradora = porcentajesDemanda[i] / 100 * formulaRadioBreakdown;


            var that = d3.select(this)
                .transition()
                .attr('transform', 'translate(0,' + acumuladoInner + ')')
                .each(function() {
                    var that = d3.select(this);
                    that.select('rect')
                        .transition()
                        .attr('height', grosorGeneradora);

                    that.select('.j-nombre')
                        .text(function(d) {
                            return tablaIdsInfo[d.id].nombreAbrev + " ";
                        })
                        .transition()
                        .attr('transform', 'translate(' + safeStepCalc + ',' + 0 + ') ' + 'rotate(-45 0 0) ');

                    that.select('.j-MW')
                        .text(function(d) {
                            return ENUS.numberFormat(",.1f")(porcentajesDemanda[i]) + "% " + ENUS.numberFormat(",.0f")(d.datos/100) + " งาน";
                        })
                        .transition()
                        .attr('transform', 'translate(' + safeStepCalc + ',' + 0 + ') ' + 'rotate(-45 0 0) ');

                    that.select('path')
                        .transition()
                        .attr('d', 'M6,1 H' + Math.floor(31 + safeStepCalc) + " l3,-3")

                })


            acumuladoInner += grosorGeneradora;
        })

    }

    function getData() {

//        d3.json(path, function(error, data) {

            //if (error) throw error;

            // LIMPIO LOS DATOS DEL JSON NO UTILIZADOS

//JSON.parse(mystring);
	    var data2 = JSON.parse('[{"_id":"5c72483ec56d5ec6413a18a8","ts":"2019-02-24T07:20:00.000Z","__v":0,"aut":0,"car":2591,"cc":1737,"dem":22136,"eol":3725,"gf":0,"hid":984,"icb":-126,"inter":1791,"nuc":7109,"sol":170},{"_id":"5c7245e1c56d5ec6413a0e05","ts":"2019-02-24T07:10:00.000Z","__v":0,"aut":0,"car":2636,"cc":1693,"dem":22049,"eol":3721,"gf":0,"hid":928,"icb":-126,"inter":1857,"nuc":7109,"sol":61},{"_id":"5c724257c56d5ec64139fede","ts":"2019-02-24T07:00:00.000Z","__v":0,"aut":0,"car":2656,"cc":1724,"dem":21713,"eol":3733,"gf":0,"hid":835,"icb":-114,"inter":1580,"nuc":7111,"sol":13},{"_id":"5c72413ac56d5ec64139fa24","ts":"2019-02-24T06:50:00.000Z","__v":0,"aut":0,"car":2671,"cc":1720,"dem":22075,"eol":3721,"gf":0,"hid":871,"icb":-100,"inter":1985,"nuc":7108,"sol":12},{"_id":"5c723ed9c56d5ec64139efb9","ts":"2019-02-24T06:40:00.000Z","__v":0,"aut":0,"car":2713,"cc":1796,"dem":21996,"eol":3659,"gf":0,"hid":865,"icb":-100,"inter":1787,"nuc":7109,"sol":12},{"_id":"5c723b4fc56d5ec64139e014","ts":"2019-02-24T06:30:00.000Z","__v":0,"aut":0,"car":2722,"cc":1850,"dem":22040,"eol":3653,"gf":0,"hid":995,"icb":-100,"inter":1659,"nuc":7105,"sol":12},{"_id":"5c7238f7c56d5ec64139d60c","ts":"2019-02-24T06:20:00.000Z","__v":0,"aut":0,"car":2732,"cc":1906,"dem":22329,"eol":3612,"gf":0,"hid":1053,"icb":-100,"inter":1838,"nuc":7118,"sol":12},{"_id":"5c7236a4c56d5ec64139cbf6","ts":"2019-02-24T06:10:00.000Z","__v":0,"aut":0,"car":2624,"cc":1817,"dem":21969,"eol":3608,"gf":0,"hid":1095,"icb":-100,"inter":1614,"nuc":7113,"sol":12},{"_id":"5c723579c56d5ec64139c6d0","ts":"2019-02-24T06:00:00.000Z","__v":0,"aut":0,"car":2572,"cc":1773,"dem":21515,"eol":3544,"gf":0,"hid":1075,"icb":-90,"inter":1419,"nuc":7111,"sol":12},{"_id":"5c72332ac56d5ec64139bd08","ts":"2019-02-24T05:50:00.000Z","__v":0,"aut":0,"car":2623,"cc":1990,"dem":21838,"eol":3515,"gf":0,"hid":1262,"icb":-80,"inter":1273,"nuc":7107,"sol":11},{"_id":"5c7230c7c56d5ec64139b2ab","ts":"2019-02-24T05:40:00.000Z","__v":0,"aut":0,"car":2514,"cc":1732,"dem":21548,"eol":3488,"gf":0,"hid":1082,"icb":-80,"inter":1552,"nuc":7110,"sol":12},{"_id":"5c722d42c56d5ec64139a36d","ts":"2019-02-24T05:30:00.000Z","__v":0,"aut":0,"car":2601,"cc":1890,"dem":21568,"eol":3435,"gf":0,"hid":1186,"icb":-80,"inter":1274,"nuc":7107,"sol":12},{"_id":"5c722c23c56d5ec641399eb1","ts":"2019-02-24T05:20:00.000Z","__v":0,"aut":0,"car":2546,"cc":1777,"dem":21581,"eol":3506,"gf":0,"hid":1147,"icb":-80,"inter":1361,"nuc":7107,"sol":12},{"_id":"5c7229c1c56d5ec641399206","ts":"2019-02-24T05:10:00.000Z","__v":0,"aut":0,"car":2560,"cc":1778,"dem":21357,"eol":3475,"gf":0,"hid":1172,"icb":-80,"inter":1233,"nuc":7117,"sol":12},{"_id":"5c72263ac56d5ec641398215","ts":"2019-02-24T05:00:00.000Z","__v":0,"aut":0,"car":2563,"cc":1577,"dem":21339,"eol":3484,"gf":0,"hid":1193,"icb":-70,"inter":1332,"nuc":7115,"sol":12},{"_id":"5c72251bc56d5ec641397d4b","ts":"2019-02-24T04:50:00.000Z","__v":0,"aut":0,"car":2501,"cc":1516,"dem":21153,"eol":3537,"gf":0,"hid":1118,"icb":-60,"inter":1302,"nuc":7114,"sol":12},{"_id":"5c722189c56d5ec641396d5b","ts":"2019-02-24T04:40:00.000Z","__v":0,"aut":0,"car":2446,"cc":1414,"dem":21163,"eol":3481,"gf":0,"hid":1069,"icb":-61,"inter":1534,"nuc":7108,"sol":11},{"_id":"5c721f2fc56d5ec641396284","ts":"2019-02-24T04:30:00.000Z","__v":0,"aut":0,"car":2453,"cc":1391,"dem":20909,"eol":3467,"gf":0,"hid":1072,"icb":-61,"inter":1312,"nuc":7112,"sol":12},{"_id":"5c721e0bc56d5ec641395d89","ts":"2019-02-24T04:20:00.000Z","__v":0,"aut":0,"car":2483,"cc":1504,"dem":21188,"eol":3486,"gf":0,"hid":1160,"icb":-60,"inter":1335,"nuc":7112,"sol":12},{"_id":"5c721badc56d5ec641395327","ts":"2019-02-24T04:10:00.000Z","__v":0,"aut":0,"car":2461,"cc":1414,"dem":21007,"eol":3541,"gf":0,"hid":1060,"icb":-61,"inter":1368,"nuc":7107,"sol":12},{"_id":"5c721958c56d5ec641394941","ts":"2019-02-24T04:00:00.000Z","__v":0,"aut":0,"car":2414,"cc":1377,"dem":20979,"eol":3584,"gf":0,"hid":1029,"icb":-61,"inter":1383,"nuc":7108,"sol":12},{"_id":"5c721708c56d5ec641393f68","ts":"2019-02-24T03:50:00.000Z","__v":0,"aut":0,"car":2393,"cc":1355,"dem":20860,"eol":3584,"gf":0,"hid":993,"icb":-61,"inter":1349,"nuc":7113,"sol":12},{"_id":"5c72137ec56d5ec641393005","ts":"2019-02-24T03:40:00.000Z","__v":0,"aut":0,"car":2382,"cc":1344,"dem":21107,"eol":3683,"gf":0,"hid":948,"icb":-60,"inter":1540,"nuc":7109,"sol":12},{"_id":"5c72111cc56d5ec641392512","ts":"2019-02-24T03:30:00.000Z","__v":0,"aut":0,"car":2367,"cc":1259,"dem":21019,"eol":3728,"gf":0,"hid":931,"icb":-61,"inter":1501,"nuc":7113,"sol":13},{"_id":"5c720ffdc56d5ec641392047","ts":"2019-02-24T03:20:00.000Z","__v":0,"aut":0,"car":2375,"cc":1326,"dem":21142,"eol":3729,"gf":0,"hid":1034,"icb":-61,"inter":1501,"nuc":7116,"sol":13},{"_id":"5c720d9ac56d5ec641391596","ts":"2019-02-24T03:10:00.000Z","__v":0,"aut":0,"car":2413,"cc":1355,"dem":21277,"eol":3804,"gf":0,"hid":1103,"icb":-60,"inter":1348,"nuc":7112,"sol":13},{"_id":"5c720a16c56d5ec6413905bf","ts":"2019-02-24T03:00:00.000Z","__v":0,"aut":0,"car":2538,"cc":1362,"dem":21058,"eol":3906,"gf":0,"hid":784,"icb":-61,"inter":1247,"nuc":7109,"sol":13},{"_id":"5c7208f4c56d5ec641390096","ts":"2019-02-24T02:50:00.000Z","__v":0,"aut":0,"car":2573,"cc":1421,"dem":21236,"eol":3899,"gf":0,"hid":660,"icb":-60,"inter":1464,"nuc":7110,"sol":13},{"_id":"5c720692c56d5ec64138f5db","ts":"2019-02-24T02:40:00.000Z","__v":0,"aut":0,"car":2531,"cc":1346,"dem":21112,"eol":3906,"gf":0,"hid":637,"icb":-60,"inter":1501,"nuc":7115,"sol":12},{"_id":"5c72043bc56d5ec64138ebc2","ts":"2019-02-24T02:30:00.000Z","__v":0,"aut":0,"car":2607,"cc":1478,"dem":21480,"eol":3982,"gf":0,"hid":742,"icb":-60,"inter":1498,"nuc":7110,"sol":12},{"_id":"5c7201e7c56d5ec64138e265","ts":"2019-02-24T02:20:00.000Z","__v":0,"aut":0,"car":2565,"cc":1420,"dem":21336,"eol":4095,"gf":0,"hid":668,"icb":-61,"inter":1381,"nuc":7111,"sol":13},{"_id":"5c71ff8bc56d5ec64138d919","ts":"2019-02-24T02:10:00.000Z","__v":0,"aut":0,"car":2644,"cc":1443,"dem":21632,"eol":4224,"gf":0,"hid":778,"icb":-60,"inter":1334,"nuc":7112,"sol":13},{"_id":"5c71fc04c56d5ec64138cb04","ts":"2019-02-24T02:00:00.000Z","__v":0,"aut":0,"car":2675,"cc":1268,"dem":21500,"eol":4331,"gf":0,"hid":390,"icb":-61,"inter":1647,"nuc":7115,"sol":13},{"_id":"5c71fae6c56d5ec64138c6bf","ts":"2019-02-24T01:50:00.000Z","__v":0,"aut":0,"car":2858,"cc":1360,"dem":21714,"eol":4410,"gf":0,"hid":434,"icb":-60,"inter":1488,"nuc":7109,"sol":13},{"_id":"5c71f883c56d5ec64138bd32","ts":"2019-02-24T01:40:00.000Z","__v":0,"aut":0,"car":2886,"cc":1359,"dem":21872,"eol":4566,"gf":0,"hid":397,"icb":-61,"inter":1454,"nuc":7111,"sol":13},{"_id":"5c71f629c56d5ec64138b41b","ts":"2019-02-24T01:30:00.000Z","__v":0,"aut":0,"car":2916,"cc":1466,"dem":22088,"eol":4770,"gf":0,"hid":438,"icb":-61,"inter":1296,"nuc":7110,"sol":12},{"_id":"5c71f3ddc56d5ec64138ab6a","ts":"2019-02-24T01:20:00.000Z","__v":0,"aut":0,"car":2806,"cc":1268,"dem":22178,"eol":4947,"gf":0,"hid":335,"icb":-61,"inter":1605,"nuc":7112,"sol":12},{"_id":"5c71f17bc56d5ec64138a1de","ts":"2019-02-24T01:10:00.000Z","__v":0,"aut":0,"car":2897,"cc":1381,"dem":22364,"eol":5064,"gf":0,"hid":404,"icb":-60,"inter":1413,"nuc":7114,"sol":12},{"_id":"5c71ee24c56d5ec6413894a4","ts":"2019-02-24T01:00:00.000Z","__v":0,"aut":0,"car":3076,"cc":1366,"dem":22566,"eol":5190,"gf":0,"hid":284,"icb":-71,"inter":1446,"nuc":7113,"sol":13},{"_id":"5c71ecd5c56d5ec641388f85","ts":"2019-02-24T00:50:00.000Z","__v":0,"aut":0,"car":3106,"cc":1375,"dem":22726,"eol":5303,"gf":0,"hid":367,"icb":-80,"inter":1413,"nuc":7111,"sol":12},{"_id":"5c71ea75c56d5ec6413885bd","ts":"2019-02-24T00:40:00.000Z","__v":0,"aut":0,"car":3102,"cc":1437,"dem":22965,"eol":5362,"gf":0,"hid":412,"icb":-80,"inter":1480,"nuc":7107,"sol":13},{"_id":"5c71e822c56d5ec641387c25","ts":"2019-02-24T00:30:00.000Z","__v":0,"aut":0,"car":3223,"cc":1631,"dem":23343,"eol":5445,"gf":0,"hid":511,"icb":-80,"inter":1355,"nuc":7117,"sol":12},{"_id":"5c71e5cdc56d5ec641387291","ts":"2019-02-24T00:20:00.000Z","__v":0,"aut":0,"car":3262,"cc":1688,"dem":23644,"eol":5627,"gf":0,"hid":543,"icb":-80,"inter":1318,"nuc":7110,"sol":12},{"_id":"5c71e36ac56d5ec6413868af","ts":"2019-02-24T00:10:00.000Z","__v":0,"aut":0,"car":3205,"cc":1567,"dem":23932,"eol":5806,"gf":0,"hid":589,"icb":-80,"inter":1579,"nuc":7104,"sol":12},{"_id":"5c71e119c56d5ec641385ed0","ts":"2019-02-24T00:00:00.000Z","__v":0,"aut":0,"car":3035,"cc":1384,"dem":23979,"eol":5941,"gf":0,"hid":1009,"icb":-80,"inter":1380,"nuc":7109,"sol":12},{"_id":"5c71decac56d5ec641385543","ts":"2019-02-23T23:50:00.000Z","__v":0,"aut":0,"car":3082,"cc":1368,"dem":24499,"eol":6103,"gf":0,"hid":1166,"icb":-80,"inter":1564,"nuc":7110,"sol":12},{"_id":"5c71db3cc56d5ec641384645","ts":"2019-02-23T23:40:00.000Z","__v":0,"aut":0,"car":3147,"cc":1384,"dem":24872,"eol":6295,"gf":0,"hid":1430,"icb":-80,"inter":1389,"nuc":7109,"sol":12},{"_id":"5c71da0fc56d5ec641384154","ts":"2019-02-23T23:30:00.000Z","__v":0,"aut":0,"car":3199,"cc":1487,"dem":25344,"eol":6389,"gf":0,"hid":1572,"icb":-80,"inter":1474,"nuc":7113,"sol":13},{"_id":"5c71d687c56d5ec641383273","ts":"2019-02-23T23:20:00.000Z","__v":0,"aut":0,"car":3224,"cc":1670,"dem":25476,"eol":6478,"gf":0,"hid":1409,"icb":-80,"inter":1465,"nuc":7119,"sol":12},{"_id":"5c71d431c56d5ec641382882","ts":"2019-02-23T23:10:00.000Z","__v":0,"aut":0,"car":3354,"cc":2054,"dem":25677,"eol":6501,"gf":0,"hid":1227,"icb":-80,"inter":1407,"nuc":7109,"sol":12},{"_id":"5c71d1d7c56d5ec641381e93","ts":"2019-02-23T23:00:00.000Z","__v":0,"aut":0,"car":3443,"cc":2409,"dem":26103,"eol":6518,"gf":0,"hid":1240,"icb":-127,"inter":1339,"nuc":7115,"sol":12},{"_id":"5c71cf81c56d5ec6413814a8","ts":"2019-02-23T22:50:00.000Z","__v":0,"aut":0,"car":3486,"cc":2349,"dem":26448,"eol":6542,"gf":0,"hid":1553,"icb":-151,"inter":1416,"nuc":7116,"sol":13},{"_id":"5c71ce56c56d5ec641380ef1","ts":"2019-02-23T22:40:00.000Z","__v":0,"aut":0,"car":3487,"cc":2535,"dem":26798,"eol":6576,"gf":0,"hid":1804,"icb":-151,"inter":1246,"nuc":7111,"sol":13},{"_id":"5c71cacec56d5ec64137fda3","ts":"2019-02-23T22:30:00.000Z","__v":0,"aut":0,"car":3551,"cc":2588,"dem":27056,"eol":6615,"gf":0,"hid":2020,"icb":-151,"inter":1118,"nuc":7113,"sol":13},{"_id":"5c71c9acc56d5ec64137f85c","ts":"2019-02-23T22:20:00.000Z","__v":0,"aut":0,"car":3578,"cc":2626,"dem":27614,"eol":6646,"gf":0,"hid":2185,"icb":-151,"inter":1435,"nuc":7113,"sol":13},{"_id":"5c71c74dc56d5ec64137ec3b","ts":"2019-02-23T22:10:00.000Z","__v":0,"aut":0,"car":3670,"cc":2659,"dem":27651,"eol":6664,"gf":0,"hid":2292,"icb":-151,"inter":1227,"nuc":7108,"sol":13},{"_id":"5c71c4f5c56d5ec64137e11e","ts":"2019-02-23T22:00:00.000Z","__v":0,"aut":0,"car":3584,"cc":2455,"dem":28149,"eol":6695,"gf":0,"hid":2617,"icb":-178,"inter":1658,"nuc":7109,"sol":13},{"_id":"5c71c2a7c56d5ec64137d624","ts":"2019-02-23T21:50:00.000Z","__v":0,"aut":0,"car":3592,"cc":2497,"dem":28773,"eol":6785,"gf":0,"hid":2652,"icb":-201,"inter":2145,"nuc":7109,"sol":13},{"_id":"5c71c046c56d5ec64137ca91","ts":"2019-02-23T21:40:00.000Z","__v":0,"aut":0,"car":3698,"cc":2485,"dem":28676,"eol":6782,"gf":0,"hid":2669,"icb":-201,"inter":1881,"nuc":7110,"sol":13},{"_id":"5c71bdf0c56d5ec64137bf76","ts":"2019-02-23T21:30:00.000Z","__v":0,"aut":0,"car":3761,"cc":2551,"dem":29133,"eol":6797,"gf":0,"hid":2745,"icb":-201,"inter":2160,"nuc":7110,"sol":13},{"_id":"5c71bb9ac56d5ec64137b47f","ts":"2019-02-23T21:20:00.000Z","__v":0,"aut":0,"car":3880,"cc":2686,"dem":29440,"eol":6747,"gf":0,"hid":2968,"icb":-202,"inter":2014,"nuc":7110,"sol":13},{"_id":"5c71b813c56d5ec64137a387","ts":"2019-02-23T21:10:00.000Z","__v":0,"aut":0,"car":3909,"cc":2706,"dem":29923,"eol":6748,"gf":0,"hid":3248,"icb":-201,"inter":2207,"nuc":7106,"sol":13},{"_id":"5c71b6e4c56d5ec641379dff","ts":"2019-02-23T21:00:00.000Z","__v":0,"aut":0,"car":3917,"cc":2478,"dem":29650,"eol":6808,"gf":0,"hid":3159,"icb":-214,"inter":2175,"nuc":7104,"sol":13},{"_id":"5c71b497c56d5ec64137932b","ts":"2019-02-23T20:50:00.000Z","__v":0,"aut":0,"car":4009,"cc":2616,"dem":29988,"eol":6811,"gf":0,"hid":3403,"icb":-233,"inter":2011,"nuc":7107,"sol":13},{"_id":"5c71b10ac56d5ec641378320","ts":"2019-02-23T20:40:00.000Z","__v":0,"aut":0,"car":4044,"cc":2711,"dem":30311,"eol":6849,"gf":0,"hid":3590,"icb":-232,"inter":1996,"nuc":7098,"sol":13},{"_id":"5c71aeadc56d5ec641377819","ts":"2019-02-23T20:30:00.000Z","__v":0,"aut":0,"car":4060,"cc":2740,"dem":30488,"eol":6887,"gf":0,"hid":3743,"icb":-233,"inter":1941,"nuc":7107,"sol":13},{"_id":"5c71ac53c56d5ec641376cf9","ts":"2019-02-23T20:20:00.000Z","__v":0,"aut":0,"car":4078,"cc":2841,"dem":30768,"eol":6881,"gf":0,"hid":4031,"icb":-232,"inter":1806,"nuc":7104,"sol":13},{"_id":"5c71ab2dc56d5ec6413766e9","ts":"2019-02-23T20:10:00.000Z","__v":0,"aut":0,"car":4051,"cc":2767,"dem":30789,"eol":6832,"gf":0,"hid":4153,"icb":-233,"inter":1856,"nuc":7101,"sol":13},{"_id":"5c71a8d8c56d5ec641375ca3","ts":"2019-02-23T20:00:00.000Z","__v":0,"aut":0,"car":4023,"cc":2602,"dem":30707,"eol":6774,"gf":0,"hid":4451,"icb":-244,"inter":1700,"nuc":7108,"sol":40},{"_id":"5c71a68ac56d5ec6413751d5","ts":"2019-02-23T19:50:00.000Z","__v":0,"aut":0,"car":4084,"cc":2622,"dem":30604,"eol":6687,"gf":0,"hid":4659,"icb":-264,"inter":1419,"nuc":7104,"sol":44},{"_id":"5c71a425c56d5ec64137476d","ts":"2019-02-23T19:40:00.000Z","__v":0,"aut":0,"car":4082,"cc":2530,"dem":30439,"eol":6617,"gf":0,"hid":4651,"icb":-264,"inter":1418,"nuc":7104,"sol":44},{"_id":"5c71a0a2c56d5ec64137379a","ts":"2019-02-23T19:30:00.000Z","__v":0,"aut":0,"car":4081,"cc":2553,"dem":30335,"eol":6575,"gf":0,"hid":4738,"icb":-264,"inter":1276,"nuc":7103,"sol":43},{"_id":"5c719f81c56d5ec641373279","ts":"2019-02-23T19:20:00.000Z","__v":0,"aut":0,"car":4120,"cc":2552,"dem":30277,"eol":6485,"gf":0,"hid":4758,"icb":-264,"inter":1252,"nuc":7106,"sol":48},{"_id":"5c719d1fc56d5ec6413727f8","ts":"2019-02-23T19:10:00.000Z","__v":0,"aut":0,"car":4100,"cc":2526,"dem":30205,"eol":6412,"gf":0,"hid":4627,"icb":-264,"inter":1413,"nuc":7105,"sol":50},{"_id":"5c719ac8c56d5ec641371e0e","ts":"2019-02-23T19:00:00.000Z","__v":0,"aut":0,"car":4087,"cc":2629,"dem":30155,"eol":6251,"gf":0,"hid":4535,"icb":-264,"inter":1463,"nuc":7103,"sol":50},{"_id":"5c719878c56d5ec641371407","ts":"2019-02-23T18:50:00.000Z","__v":0,"aut":0,"car":4065,"cc":2656,"dem":29867,"eol":6132,"gf":0,"hid":4533,"icb":-264,"inter":1358,"nuc":7097,"sol":51},{"_id":"5c7194eec56d5ec641370330","ts":"2019-02-23T18:40:00.000Z","__v":0,"aut":0,"car":4054,"cc":2676,"dem":29802,"eol":5902,"gf":0,"hid":4601,"icb":-264,"inter":1499,"nuc":7103,"sol":52},{"_id":"5c71928fc56d5ec64136f7d1","ts":"2019-02-23T18:30:00.000Z","__v":0,"aut":0,"car":3982,"cc":2741,"dem":29580,"eol":5754,"gf":0,"hid":4580,"icb":-264,"inter":1377,"nuc":7094,"sol":85},{"_id":"5c71916fc56d5ec64136f251","ts":"2019-02-23T18:20:00.000Z","__v":0,"aut":0,"car":3911,"cc":2558,"dem":28936,"eol":5620,"gf":0,"hid":4171,"icb":-264,"inter":1494,"nuc":7101,"sol":100},{"_id":"5c718f12c56d5ec64136e6a0","ts":"2019-02-23T18:10:00.000Z","__v":0,"aut":0,"car":3801,"cc":2528,"dem":28605,"eol":5486,"gf":0,"hid":4140,"icb":-264,"inter":1399,"nuc":7101,"sol":132},{"_id":"5c718cb4c56d5ec64136dafc","ts":"2019-02-23T18:00:00.000Z","__v":0,"aut":0,"car":3798,"cc":2347,"dem":27727,"eol":5301,"gf":0,"hid":3601,"icb":-252,"inter":1445,"nuc":7099,"sol":167},{"_id":"5c718a68c56d5ec64136d05a","ts":"2019-02-23T17:50:00.000Z","__v":0,"aut":0,"car":3736,"cc":2152,"dem":27199,"eol":5193,"gf":0,"hid":3281,"icb":-254,"inter":1547,"nuc":7104,"sol":209},{"_id":"5c718806c56d5ec64136c56c","ts":"2019-02-23T17:40:00.000Z","__v":0,"aut":0,"car":3684,"cc":2077,"dem":26602,"eol":5100,"gf":0,"hid":2926,"icb":-256,"inter":1439,"nuc":7104,"sol":324},{"_id":"5c71847dc56d5ec64136b583","ts":"2019-02-23T17:30:00.000Z","__v":0,"aut":0,"car":3693,"cc":2160,"dem":26524,"eol":5019,"gf":0,"hid":2862,"icb":-241,"inter":1292,"nuc":7100,"sol":478},{"_id":"5c718362c56d5ec64136b089","ts":"2019-02-23T17:20:00.000Z","__v":0,"aut":0,"car":3624,"cc":2070,"dem":26331,"eol":4933,"gf":0,"hid":2660,"icb":-233,"inter":1358,"nuc":7100,"sol":628},{"_id":"5c7180fdc56d5ec64136a544","ts":"2019-02-23T17:10:00.000Z","__v":0,"aut":0,"car":3517,"cc":1901,"dem":26500,"eol":4964,"gf":0,"hid":2456,"icb":-233,"inter":1769,"nuc":7100,"sol":823},{"_id":"5c717ea6c56d5ec641369a2e","ts":"2019-02-23T17:00:00.000Z","__v":0,"aut":0,"car":3449,"cc":1889,"dem":26181,"eol":4931,"gf":0,"hid":2181,"icb":-199,"inter":1672,"nuc":7105,"sol":991},{"_id":"5c717b1fc56d5ec64136892e","ts":"2019-02-23T16:50:00.000Z","__v":0,"aut":0,"car":3377,"cc":2218,"dem":26505,"eol":4938,"gf":0,"hid":2077,"icb":-176,"inter":1563,"nuc":7102,"sol":1192},{"_id":"5c7179f4c56d5ec6413683af","ts":"2019-02-23T16:40:00.000Z","__v":0,"aut":0,"car":3290,"cc":2074,"dem":26237,"eol":4980,"gf":0,"hid":1979,"icb":-176,"inter":1460,"nuc":7104,"sol":1402},{"_id":"5c71766cc56d5ec641367289","ts":"2019-02-23T16:30:00.000Z","__v":0,"aut":0,"car":3235,"cc":1966,"dem":26311,"eol":4999,"gf":0,"hid":1884,"icb":-176,"inter":1501,"nuc":7101,"sol":1601},{"_id":"5c71754cc56d5ec641366cc2","ts":"2019-02-23T16:20:00.000Z","__v":0,"aut":0,"car":3178,"cc":2027,"dem":26330,"eol":4998,"gf":0,"hid":1781,"icb":-177,"inter":1428,"nuc":7101,"sol":1804},{"_id":"5c7172efc56d5ec6413660b1","ts":"2019-02-23T16:10:00.000Z","__v":0,"aut":0,"car":3070,"cc":1905,"dem":26404,"eol":4959,"gf":0,"hid":1703,"icb":-177,"inter":1684,"nuc":7106,"sol":1965},{"_id":"5c716f65c56d5ec641364f3c","ts":"2019-02-23T16:00:00.000Z","__v":0,"aut":0,"car":3025,"cc":2059,"dem":26552,"eol":4969,"gf":0,"hid":1598,"icb":-176,"inter":1644,"nuc":7098,"sol":2135},{"_id":"5c716d0ec56d5ec641364405","ts":"2019-02-23T15:50:00.000Z","__v":0,"aut":0,"car":3007,"cc":2010,"dem":26479,"eol":4961,"gf":0,"hid":1661,"icb":-176,"inter":1464,"nuc":7097,"sol":2249},{"_id":"5c716abbc56d5ec641363b0f","ts":"2019-02-23T15:40:00.000Z","__v":0,"aut":0,"car":3035,"cc":2047,"dem":26763,"eol":5004,"gf":0,"hid":1681,"icb":-177,"inter":1369,"nuc":7105,"sol":2416},{"_id":"5c716857c56d5ec6413631d3","ts":"2019-02-23T15:30:00.000Z","__v":0,"aut":0,"car":3001,"cc":1998,"dem":26875,"eol":4964,"gf":0,"hid":1690,"icb":-176,"inter":1572,"nuc":7094,"sol":2533},{"_id":"5c71673fc56d5ec641362d86","ts":"2019-02-23T15:20:00.000Z","__v":0,"aut":0,"car":2961,"cc":1939,"dem":26827,"eol":4981,"gf":0,"hid":1593,"icb":-177,"inter":1608,"nuc":7097,"sol":2654},{"_id":"5c7163afc56d5ec641361c09","ts":"2019-02-23T15:10:00.000Z","__v":0,"aut":0,"car":2964,"cc":1764,"dem":26539,"eol":4906,"gf":0,"hid":1502,"icb":-177,"inter":1523,"nuc":7103,"sol":2771},{"_id":"5c716156c56d5ec64136102f","ts":"2019-02-23T15:00:00.000Z","__v":0,"aut":0,"car":3152,"cc":1951,"dem":27000,"eol":4902,"gf":0,"hid":1738,"icb":-177,"inter":1250,"nuc":7104,"sol":2883},{"_id":"5c715efdc56d5ec641360561","ts":"2019-02-23T14:50:00.000Z","__v":0,"aut":0,"car":3117,"cc":1941,"dem":27332,"eol":4819,"gf":0,"hid":1705,"icb":-177,"inter":1637,"nuc":7102,"sol":2996},{"_id":"5c715caac56d5ec64135fad4","ts":"2019-02-23T14:40:00.000Z","__v":0,"aut":0,"car":3091,"cc":1844,"dem":27458,"eol":4817,"gf":0,"hid":1668,"icb":-176,"inter":1794,"nuc":7103,"sol":3119},{"_id":"5c715a4ec56d5ec64135efab","ts":"2019-02-23T14:30:00.000Z","__v":0,"aut":0,"car":3198,"cc":1973,"dem":27534,"eol":4756,"gf":0,"hid":1691,"icb":-177,"inter":1504,"nuc":7101,"sol":3242},{"_id":"5c7157f7c56d5ec64135e477","ts":"2019-02-23T14:20:00.000Z","__v":0,"aut":0,"car":3298,"cc":2158,"dem":27890,"eol":4688,"gf":0,"hid":1730,"icb":-176,"inter":1630,"nuc":7103,"sol":3318},{"_id":"5c7155a1c56d5ec64135d8db","ts":"2019-02-23T14:10:00.000Z","__v":0,"aut":0,"car":3399,"cc":2288,"dem":27944,"eol":4629,"gf":0,"hid":1699,"icb":-176,"inter":1460,"nuc":7103,"sol":3362},{"_id":"5c715476c56d5ec64135d31c","ts":"2019-02-23T14:00:00.000Z","__v":0,"aut":0,"car":3469,"cc":2068,"dem":28080,"eol":4547,"gf":0,"hid":1663,"icb":-177,"inter":1799,"nuc":7110,"sol":3431},{"_id":"5c7150efc56d5ec64135c0fc","ts":"2019-02-23T13:50:00.000Z","__v":0,"aut":0,"car":3486,"cc":2041,"dem":28383,"eol":4553,"gf":0,"hid":2099,"icb":-177,"inter":1555,"nuc":7103,"sol":3520},{"_id":"5c714fc3c56d5ec64135bb4f","ts":"2019-02-23T13:40:00.000Z","__v":0,"aut":0,"car":3483,"cc":2023,"dem":28606,"eol":4590,"gf":0,"hid":2076,"icb":-177,"inter":1707,"nuc":7106,"sol":3599},{"_id":"5c714c3dc56d5ec64135aba5","ts":"2019-02-23T13:30:00.000Z","__v":0,"aut":0,"car":3531,"cc":1997,"dem":28808,"eol":4629,"gf":0,"hid":2031,"icb":-176,"inter":1821,"nuc":7109,"sol":3686},{"_id":"5c714b1ac56d5ec64135a665","ts":"2019-02-23T13:20:00.000Z","__v":0,"aut":0,"car":3669,"cc":2222,"dem":29101,"eol":4601,"gf":0,"hid":2079,"icb":-177,"inter":1680,"nuc":7101,"sol":3742},{"_id":"5c7148bec56d5ec641359b80","ts":"2019-02-23T13:10:00.000Z","__v":0,"aut":0,"car":3638,"cc":2261,"dem":29191,"eol":4624,"gf":0,"hid":2106,"icb":-177,"inter":1670,"nuc":7108,"sol":3785},{"_id":"5c714533c56d5ec641358b53","ts":"2019-02-23T13:00:00.000Z","__v":0,"aut":0,"car":3726,"cc":2187,"dem":29246,"eol":4599,"gf":0,"hid":2116,"icb":-187,"inter":1665,"nuc":7108,"sol":3852},{"_id":"5c714416c56d5ec6413585ef","ts":"2019-02-23T12:50:00.000Z","__v":0,"aut":0,"car":3719,"cc":2167,"dem":29395,"eol":4613,"gf":0,"hid":2227,"icb":-202,"inter":1763,"nuc":7113,"sol":3900},{"_id":"5c714086c56d5ec64135738d","ts":"2019-02-23T12:40:00.000Z","__v":0,"aut":0,"car":3747,"cc":2153,"dem":29639,"eol":4568,"gf":0,"hid":2325,"icb":-201,"inter":1774,"nuc":7104,"sol":3933},{"_id":"5c713f5dc56d5ec641356dd7","ts":"2019-02-23T12:30:00.000Z","__v":0,"aut":0,"car":3790,"cc":2189,"dem":29675,"eol":4449,"gf":0,"hid":2295,"icb":-201,"inter":1896,"nuc":7111,"sol":3957},{"_id":"5c713bd6c56d5ec641355889","ts":"2019-02-23T12:20:00.000Z","__v":0,"aut":0,"car":3746,"cc":2004,"dem":29640,"eol":4410,"gf":0,"hid":2198,"icb":-201,"inter":2229,"nuc":7110,"sol":3985},{"_id":"5c713aacc56d5ec6413553b5","ts":"2019-02-23T12:10:00.000Z","__v":0,"aut":0,"car":3728,"cc":1901,"dem":29413,"eol":4334,"gf":0,"hid":2174,"icb":-201,"inter":2181,"nuc":7115,"sol":4000},{"_id":"5c713855c56d5ec6413549ba","ts":"2019-02-23T12:00:00.000Z","__v":0,"aut":0,"car":3722,"cc":1845,"dem":29357,"eol":4260,"gf":0,"hid":2288,"icb":-201,"inter":2146,"nuc":7106,"sol":4023},{"_id":"5c713604c56d5ec641353f96","ts":"2019-02-23T11:50:00.000Z","__v":0,"aut":0,"car":3769,"cc":2018,"dem":29446,"eol":4143,"gf":0,"hid":2419,"icb":-201,"inter":1988,"nuc":7104,"sol":4019},{"_id":"5c713279c56d5ec64135306d","ts":"2019-02-23T11:40:00.000Z","__v":0,"aut":0,"car":3790,"cc":2169,"dem":29673,"eol":4085,"gf":0,"hid":2577,"icb":-201,"inter":1865,"nuc":7108,"sol":4022},{"_id":"5c71301cc56d5ec64135260d","ts":"2019-02-23T11:30:00.000Z","__v":0,"aut":0,"car":3781,"cc":2208,"dem":29693,"eol":4034,"gf":0,"hid":2620,"icb":-202,"inter":1980,"nuc":7109,"sol":3992},{"_id":"5c712efbc56d5ec641352132","ts":"2019-02-23T11:20:00.000Z","__v":0,"aut":0,"car":3816,"cc":2373,"dem":29811,"eol":4009,"gf":0,"hid":2675,"icb":-201,"inter":1886,"nuc":7102,"sol":3954},{"_id":"5c712c9bc56d5ec641351719","ts":"2019-02-23T11:10:00.000Z","__v":0,"aut":0,"car":3843,"cc":2389,"dem":29882,"eol":3884,"gf":0,"hid":2736,"icb":-201,"inter":2076,"nuc":7111,"sol":3879},{"_id":"5c712917c56d5ec641350849","ts":"2019-02-23T11:00:00.000Z","__v":0,"aut":0,"car":3881,"cc":2397,"dem":30122,"eol":3829,"gf":0,"hid":3054,"icb":-201,"inter":2020,"nuc":7106,"sol":3807},{"_id":"5c7126bdc56d5ec64134feea","ts":"2019-02-23T10:50:00.000Z","__v":0,"aut":0,"car":3922,"cc":2532,"dem":30241,"eol":3732,"gf":0,"hid":3028,"icb":-201,"inter":2241,"nuc":7111,"sol":3687},{"_id":"5c71246bc56d5ec64134f4cb","ts":"2019-02-23T10:40:00.000Z","__v":0,"aut":0,"car":3915,"cc":2656,"dem":30411,"eol":3662,"gf":0,"hid":3284,"icb":-201,"inter":2249,"nuc":7103,"sol":3608},{"_id":"5c71220ec56d5ec64134eab6","ts":"2019-02-23T10:30:00.000Z","__v":0,"aut":0,"car":3936,"cc":2747,"dem":30260,"eol":3588,"gf":0,"hid":3235,"icb":-202,"inter":2068,"nuc":7111,"sol":3547},{"_id":"5c7120f1c56d5ec64134e614","ts":"2019-02-23T10:20:00.000Z","__v":0,"aut":0,"car":3966,"cc":2988,"dem":30533,"eol":3544,"gf":0,"hid":3381,"icb":-202,"inter":2061,"nuc":7112,"sol":3487},{"_id":"5c711d67c56d5ec64134d638","ts":"2019-02-23T10:10:00.000Z","__v":0,"aut":0,"car":3968,"cc":2870,"dem":30636,"eol":3581,"gf":0,"hid":3520,"icb":-202,"inter":2213,"nuc":7110,"sol":3404},{"_id":"5c711c36c56d5ec64134d0f2","ts":"2019-02-23T10:00:00.000Z","__v":0,"aut":0,"car":3910,"cc":2638,"dem":30562,"eol":3605,"gf":0,"hid":3654,"icb":-201,"inter":2306,"nuc":7111,"sol":3287},{"_id":"5c7119eac56d5ec64134c6b6","ts":"2019-02-23T09:50:00.000Z","__v":0,"aut":0,"car":3912,"cc":2538,"dem":30426,"eol":3632,"gf":0,"hid":3670,"icb":-201,"inter":2378,"nuc":7106,"sol":3138},{"_id":"5c711787c56d5ec64134bbfd","ts":"2019-02-23T09:40:00.000Z","__v":0,"aut":0,"car":3940,"cc":2478,"dem":30248,"eol":3673,"gf":0,"hid":3640,"icb":-201,"inter":2343,"nuc":7113,"sol":3025},{"_id":"5c711402c56d5ec64134aca3","ts":"2019-02-23T09:30:00.000Z","__v":0,"aut":0,"car":3938,"cc":2546,"dem":30262,"eol":3695,"gf":0,"hid":3701,"icb":-201,"inter":2368,"nuc":7107,"sol":2867},{"_id":"5c7112dfc56d5ec64134a7b2","ts":"2019-02-23T09:20:00.000Z","__v":0,"aut":0,"car":3958,"cc":2710,"dem":30515,"eol":3742,"gf":0,"hid":4029,"icb":-201,"inter":2197,"nuc":7101,"sol":2719},{"_id":"5c710f54c56d5ec6413497f6","ts":"2019-02-23T09:10:00.000Z","__v":0,"aut":0,"car":3951,"cc":2755,"dem":30473,"eol":3766,"gf":0,"hid":4009,"icb":-201,"inter":2284,"nuc":7110,"sol":2532},{"_id":"5c710e28c56d5ec64134930c","ts":"2019-02-23T09:00:00.000Z","__v":0,"aut":0,"car":3817,"cc":2604,"dem":30038,"eol":3898,"gf":0,"hid":3712,"icb":-201,"inter":2532,"nuc":7108,"sol":2315},{"_id":"5c710bddc56d5ec641348926","ts":"2019-02-23T08:50:00.000Z","__v":0,"aut":0,"car":3736,"cc":2456,"dem":29533,"eol":4008,"gf":0,"hid":3609,"icb":-201,"inter":2499,"nuc":7108,"sol":2110},{"_id":"5c71084cc56d5ec641347990","ts":"2019-02-23T08:40:00.000Z","__v":0,"aut":0,"car":3754,"cc":2490,"dem":29523,"eol":4087,"gf":0,"hid":3719,"icb":-201,"inter":2394,"nuc":7110,"sol":1914},{"_id":"5c7105edc56d5ec641346f47","ts":"2019-02-23T08:30:00.000Z","__v":0,"aut":0,"car":3734,"cc":2522,"dem":29505,"eol":4218,"gf":0,"hid":3744,"icb":-201,"inter":2381,"nuc":7109,"sol":1721},{"_id":"5c710396c56d5ec641346541","ts":"2019-02-23T08:20:00.000Z","__v":0,"aut":0,"car":3669,"cc":2360,"dem":29068,"eol":4391,"gf":0,"hid":3567,"icb":-201,"inter":2366,"nuc":7107,"sol":1525},{"_id":"5c71026cc56d5ec641345fd7","ts":"2019-02-23T08:10:00.000Z","__v":0,"aut":0,"car":3625,"cc":2199,"dem":28590,"eol":4520,"gf":0,"hid":3393,"icb":-201,"inter":2374,"nuc":7109,"sol":1316},{"_id":"5c710017c56d5ec64134553e","ts":"2019-02-23T08:00:00.000Z","__v":0,"aut":0,"car":3713,"cc":2548,"dem":27865,"eol":4621,"gf":0,"hid":2791,"icb":-193,"inter":1981,"nuc":7114,"sol":1094},{"_id":"5c70fdcac56d5ec641344aec","ts":"2019-02-23T07:50:00.000Z","__v":0,"aut":0,"car":3680,"cc":2677,"dem":27340,"eol":4739,"gf":0,"hid":2592,"icb":-172,"inter":1625,"nuc":7107,"sol":844},{"_id":"5c70fb68c56d5ec641344099","ts":"2019-02-23T07:40:00.000Z","__v":0,"aut":0,"car":3633,"cc":2521,"dem":27047,"eol":4839,"gf":0,"hid":2457,"icb":-152,"inter":1777,"nuc":7108,"sol":622},{"_id":"5c70f7dfc56d5ec641343167","ts":"2019-02-23T07:30:00.000Z","__v":0,"aut":0,"car":3523,"cc":2300,"dem":26551,"eol":4905,"gf":0,"hid":2309,"icb":-151,"inter":1840,"nuc":7105,"sol":407}]');


            var datosJson = data2.map(function(obj) {
                // REMAPEO EL OBJETO PARA ELIMINAR ALGUNOS DATOS NO UTILIZADOS DEL JSON
                var tmpObj = {},
                    key;

                for (key in obj) {

                    if (displayParameters[key]) {
                        tmpObj[key] = obj[key];
                    }

                }

                return tmpObj;

            });


            datosJson.reverse();


            var maxDemand = d3.max(datosJson, demFn),
                minDemand = d3.min(datosJson, demFn),
                generadoras = [];

            //RESET

            for (key in tablaIdsConsumos) {

                tablaIdsConsumos[key].percent24h = [];
                tablaIdsConsumos[key].med24h = 0;
            }

            datosJson.forEach(function(value) {

                var generadoras = [],
                    porcentajesDemanda,
                    key,
                    i = 0;

                //RESET

                for (key in tablaIdsConsumos) {
                    generadoras.push(value[key]);
                }

                porcentajesDemanda = calcArrayPercents(generadoras);

                for (key in tablaIdsConsumos) {
                    tablaIdsConsumos[key].percent24h.push(porcentajesDemanda[i]);
                    i++;
                }

            })

            for (key in tablaIdsConsumos) {
                tablaIdsConsumos[key].med24h = d3.mean(tablaIdsConsumos[key].percent24h);
            }


            console.log('min', minDemand, 'max', maxDemand, 'length', datosJson.length);

            // ACTUALIZO DOMAINS SCALES
            sizes.domain([minDemand, maxDemand])
            opacityScale.domain([0, datosJson.length])
            colorDemand.domain([minDemand, maxDemand])

            // ESTA ESCALA ME PERMITE ESTABLECER EL MÁXIMO Y MÍNIMO CONSUMO EN FUNCIÓN DE LA DEMANDA
            // Y VARIAR EL MÁXIMO PORCENTAJE DE RADIO
            scaleRadius.domain([0, maxDemand])


            var now = new Date(),
                currentHourDate = iso.parse(datosJson[datosJson.length - 1].ts),
                currentHourDateRotation = horaRotation((currentHourDate.getHours() * 60) + (currentHourDate.getMinutes())),
                arcoPorcion = (360 / datosJson.length) / 1.05;

            // LANZO EL ÚLTIMO DATO DISPONIBLE

            if (!isOuterRadio) {
                dispatch.mouseenter(this, datosJson[datosJson.length - 1]);
            }

            // SELECCIONO LOS RADIOS QUE ALBERGAN CADA UNA DE LAS FRANJAS DE TIEMPO

            var rads = svg.select('#hostRads').selectAll('.rad')
                .data(datosJson, function(d) {
                    return d.ts;
                });


            // ENTER

            rads.enter().append('g')
                .attr('class', 'rad')
                .attr('id', function(d) {
                    var ts = iso.parse(d.ts)
                    return ['id-', ts.getHours(), ':', ts.getMinutes(), '-dia-', ts.getDate()].join("");
                })
                .on('mouseenter', function(d) {

                    dispatch.mouseenter(this, d);

                    /*var that = d3.select(this)
                        that.style("filter", "url(#brightness)")  */

                    var tsDate = iso.parse(d.ts),
                        h = tsDate.getHours(),
                        m = tsDate.getMinutes(),
                        angle = horaRotation((h * 60) + m),
                        // offset = 180,
                        a = grados_a_radianes(angleStart - angle),
                        consumoRadio = scaleRadius(d.dem),
                        sinA = Math.sin(a),
                        cosA = Math.cos(a);

                    consumoDot
                        .attr('cx', centerX + (consumoRadio * sinA))
                        .attr('cy', centerY + (consumoRadio * cosA))
                        .transition()
                        .duration(150)
                        .attr('fill', colorDemand(d.dem))


                    tooltip
                        .attr('transform', 'translate(' + (centerX + (consumoRadio * sinA)) + ',' + (centerY + (consumoRadio * cosA)) + ')')

                    tooltip_fecha
                        .text(function() {
                            var tsDate = iso.parse(d.ts);
                            return tooltipDateFormat(tsDate);
                        });

                    tooltip_mw
                        .text(function() {
                            return ENUS.numberFormat(",.0f")(d.dem/100) + " งาน";
                        });

                    tooltip_rect
                        .attr('fill-opacity', 1)
                        .transition()
                        .duration(150)
                        .attr('fill', colorDemand(d.dem));

                    consumoCircle
                        .attr('stroke-opacity', .9)
                        .transition()
                        .attr({
                            'r': function() {
                                return scaleRadius(d.dem);
                            },
                            'stroke': function() {
                                return colorDemand(d.dem);
                            }
                        })



                })

                .each(function(d) {

                    //CREO LOS 'HUECOS'
                    var group = d3.select(this),
                        ln = 8,
                        n = 0;


                    group.selectAll('path')
                        .data(tablaIdsOrdenados)
                        .enter().append('path')
                        .on('click', function() {
                            var that = d3.select(this);
                            console.log("click", iso.parse(d.ts), that.datum(), d[that.datum()])
                        })
                        .on('mouseover', function() {
                            var that = d3.select(this);
                            that
                                .attr('fill', '#' + tablaIdsInfo[that.datum()].highlightColor);
                        })
                        .on('mouseout', function() {
                            var that = d3.select(this);
                            that
                                .attr('fill', '#' + tablaIdsInfo[that.datum()].color);
                        })
                        .attr('fill', function(d, n) {
                            var that = d3.select(this)
                            return '#' + tablaIdsInfo[that.datum()].color;
                        })


                    n++;


                })
                .attr('opacity', 0)
                .attr('transform', 'translate(' + centerX + ',' + centerY + ')')

            ;

            // UPDATE

            rads.each(function(d) {

                //console.log ('rad',i, this.id);
                paths = d3.select(this).selectAll('path')

                // CALCULAMOS LA SUMA DE LAS DIFERENTES ENERGÍAS PROVEEDORAS
                var generadoras = tablaIdsOrdenados.map((r)=>d[r]), // [d.eol, d.hid, d.sol, d.aut, d.gf, d.nuc, d.car, d.cc],
                    porcentajesDemanda = calcArrayPercents(generadoras),
                    demandaHora = generadoras.sum(true),
                    acumuladoInner = 0,
                    grosorGeneradora = 0,
                    ln = porcentajesDemanda.length,
                    n = 0,
                    arc = d3.svg.arc(),
                    tsDate = iso.parse(d.ts),
                    h = tsDate.getHours(),
                    m = tsDate.getMinutes(),
                    angle = angleStart + 180 + horaRotation((h * 60) + m),
                    path;



                paths.each(function() {

                    grosorGeneradora = porcentajesDemanda[n] / 100 * scaleRadius(d.dem);

                    d3.select(this).attr('d', arc.startAngle(function() {
                            return grados_a_radianes(angle);
                        }).endAngle(function() {
                            return grados_a_radianes(angle + arcoPorcion);
                        }).outerRadius(function() {
                            return grosorGeneradora + acumuladoInner;
                        }).innerRadius(function() {
                            return acumuladoInner;
                        }))
                        //.attr('shape-rendering','optimizeSpeed' )

                    acumuladoInner += grosorGeneradora;

                    n++;


                })

//            });

/////            rads.transition().duration(500).delay(function(d, i) {
/////                    return (datosJson.length - i) * 25
            rads.transition().duration(5).delay(function(d, i) {
                    return (datosJson.length - i)*5 
                })
                .attr('opacity', function(d, i) {
                    return opacityScale(i);
                })
                .attr('transform', 'translate(' + centerX + ',' + centerY + ')');

            //EXIT
            rads.exit().remove()
                .each(function() {
                    console.log('Bye! exit ', this);
                });



            var dLast = lastJsonData = datosJson[datosJson.length - 1],
                generadoras = tablaIdsOrdenados.map((r)=>dLast[r]),  //[dLast.eol, dLast.hid, dLast.sol, dLast.aut, dLast.gf, dLast.nuc, dLast.car, dLast.cc],
                porcentajesDemanda = calcArrayPercents(generadoras),
                demandaHora = generadoras.sum(true),
                id;

            //ACTUALIZO HTML

            var energias = d3.select('#j-energias').selectAll(".energia")
                .data(tablaIdsOrdenados);

            energias.each(function(d, i) {

                var datos = tablaIdsInfo[d],
                    that = d3.select(this),
                    id = d;

                that.select('.energia__titulo')
                    .text(datos.nombre) //.text(that.datum().nombre)
                    .style('color', datos.highlightColor);
                that.selectAll('.energia__subtitulo')
                    .data(['Current Contribution', 'Average 24h', 'Emissions CO<sub>2</sub>'])
                    .each(function(d) {
                        d3.select(this)
                            .html(function() {
                                return d;
                            })
                    });

                that.select('.j-porcentaje-' + id)
                    .text(function() {
                        return ENUS.numberFormat(",.2f")(rd3(demandaHora, +dLast[id])) + "%";
                    });
                that.select('.j-valor-' + id).transition()
                    .text(function() {
                        return ENUS.numberFormat(",.")(dLast[id]) + "MW";
                    });
                that.select('.j-porcentaje-media-' + id)
                    .text(function() {
                        return ENUS.numberFormat(",.2f")(tablaIdsConsumos[id].med24h) + "%";
                    });
                that.select('.j-aportacion-media-' + id)
                    .text(function() {
                        return ENUS.numberFormat(",.2f")(d3.mean(datosJson, function(d) {
                            return d[id];
                        })) + "MW";
                    });
                that.select('.j-co2-' + id)
                    .text(function() {
                        return ENUS.numberFormat(",.2f")(+dLast[id] * tablaEmisiones[id]) + 'T/h';
                    });

                try {
                    document.styleSheets[0].addRule('#id_' + id + ':before', 'content: "' + datos.icon + '"; color:' + datos.highlightColor + ';');
                } catch (err) {
                    console.log(err)
                }

                that.style('opacity', .5)
/////                    .transition().delay(i * 100)
                    .style('opacity', 1)


            });


        })
    }



    //    var baseUrl = "https://energia-ngpt.rhcloud.com/data/last24h";
    //var baseUrl = "../data/last24h";
//    var baseUrl = "http://energia.ningunaparte.net/data/last24h";

//    setInterval(getData, 1000 * 30, baseUrl);


//   var legend = svg.append("g")
//     .attr("class", "legend")
//     .attr("transform", "translate(" + 50 + "," + 50 + ")");


//   legend.append("text")
//     .attr("dy", ".35em")
//   	.style("font-size",24)
//   	.style("font-weight","bold")
//   	.style("fill","#454545")
//   	.style("font-family","monospace")
//     .style("text-anchor", "middle")
//     .text("Tunchz");


    getData();


})()