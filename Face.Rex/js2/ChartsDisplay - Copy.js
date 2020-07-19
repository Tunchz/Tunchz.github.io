    !function() {
        var dispatch = d3.dispatch('hideTooltip', 'iTooltip');
        var container;
        var axes;
        var lineHeight = 100,
            lineWidth = 600;
        var chartPadding = 30,
            chartHeight = 490,
            chartWidth = 907;
        var visPadding = {
            top: 10,
            right: 20,
            bottom: 10,
            left: 100,
            middle: 50
        }
        var scatterWidth = scatterHeight = chartWidth - lineWidth - visPadding.left - visPadding.right;

        // Added to anonymize data
        var keyReplace = {
            humd: 'Humid',
            light: 'Light',
            temp: 'Temp'
        };
        var formatTime = d3.time.format("%d %B %Y %H:%M:%S"),
            //formatTime2 = d3.time.format("%H:%M %p %S secs");
            formatTime2 = d3.time.format("%S secs");

        getColor = function(d) {
            if(d.key) return axes.chartColors(d.key);
            else return axes.chartColors(d);
        }

        window.buildChart = function(data) {
            axes = new Axes(data);
            // remove all element of old data
            container = d3.select('#chart-container').selectAll('g.container');
            container.remove();

            // generate graph elements from new data
            container = d3.select('#chart-container').selectAll('g.container').data([data]);
            container.enter().append('g')
                .attr('class', 'container')
                .attr('transform', 'translate(' + visPadding.left + ',' + visPadding.top + ')');

            var skeleton = buildSkeleton(data);
            var disCorrLines = buildPM(data);
            var alphaBars = buildParameter(data);
            var scatter = buildScatter(data);
            var text = buildTextBox(data);
            var interactiveLayer = buildInteractiveLayer(data);
            var tooltips = setupTooltips(scatter, interactiveLayer, text, data);
        }

        buildSkeleton = function(data) {

            var xAxis = d3.svg.axis()
                .scale(axes.timeX)
                .orient('bottom');

            container.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate(0,' + (axes.charts('pm10pm25') + axes.lineY(0)) + ')')
                .call(xAxis);

        }

        // Line graphs
        buildPM = function(data) {

            //console.log(data);
            var dcWrap = container.selectAll('g.d-c-wrap').data([data]);
            dcWrap.enter().append('g')
                .attr('class', 'd-c-wrap')
                .attr('transform', 'translate(0,' + axes.charts('pm10pm25') + ')');

            var dcText = dcWrap.append('text')
                .attr('transform', 'translate(-15,' /*+ lineHeight*/ + axes.lineY(data[0].pm25) + ')')
                .attr('dy', '.3em')
                .attr('text-anchor', 'end');

            //console.log(axes.lineY(data[0].pm25));

            dcText.append('tspan')
                .attr('fill',function(d) {return getColor('pm25') })
                .text('PM 2.5 : '+data[0].pm25)+' ';
            dcText.append('tspan')
                .text(' ▶');
/*            dcText.append('tspan')
                .text('PM 10 ')
                .attr('x', '0')
                .attr('y', '1.4em');
*/
            var dcDateText = dcWrap.append('text')
                .attr('transform', 'translate(-15,' + (lineHeight + 13) +')')
                .attr('dy', '.3em')
                .attr('text-anchor', 'end')
                .text(formatTime2(data[0].date) +' ▶');


            var keys = ['pm25']; //['pm10','pm25'];
            var linesWrap = dcWrap.selectAll('g').data(function(d) {
                var a = keys.map(function(k) {
                    return {
                        data: d,
                        key: k
                    };
                })
                return a;
            });
            linesWrap.enter().append('g').attr('class', 'lines-wrap');

            var line = d3.svg.line()
                .x(function(d) { return axes.timeX(new Date(d.date)); });

            var linesPath = linesWrap.selectAll('path').data(function(d,i) {
                keys[i] = d.key
                return [d.data];
            });

            linesPath.enter().append('path')
                .attr('d', function(d,i,j) {
                    var k = keys[j];
                    line.y(function(d) {return axes.lineY(d[k]); })
                    return line(d,i);
                })
                .attr('stroke', function(d,i,j) { return getColor(keys[j]) })
                .attr('stroke-width', 2)
                .attr('fill', 'none');

            dcWrap.append('g')
                .attr('class', 'z-line');

            var zLine = dcWrap.select('.z-line');

            zLine.append('text')
                .text(0)
                .attr('x', lineWidth - visPadding.middle)
                .attr('y', axes.lineY(0))
                .attr('dy', '0.33em')
                .attr('dx', 11)
                .attr('text-anchor', 'end');

            dcWrap.append('line')
                .attr('y1', axes.lineY(data[0].pm25))
                .attr('y2', axes.lineY(data[0].pm25))
                .attr('x1', 0)
                .attr('x2', lineWidth-visPadding.middle)
                .attr('dx', 1)
                .attr('stroke', '#000')
                .attr('stroke-dasharray', ('2, 2'))
                .attr('stroke-width', 0.5)
                .attr('opacity', 0.3);


            return dcWrap;
        }

        // 3 bar graphs
        buildParameter = function(data) {
            var parameterWrap = container.selectAll('g.parameter-wrap').data([data]);
            parameterWrap.enter().append('g')
                .attr('class', 'parameter-wrap')
                ;

            var keys = ['humd','temp','light'];
            var barsWrap = parameterWrap.selectAll('g.bars-wrap').data(function(d) {
                var a = keys.map(function(k) {
                    return {
                        data: d,
                        key: k
                    };
                })
                return a;
            });

            barsWrap.enter().append('g')
                .attr('class', 'bars-wrap')
                .attr('transform', function(d) {
                    return 'translate(0,' + axes.charts(d.key) + ')';
                });

            var barText = barsWrap.append('text')
                .attr('transform', function(d) { return 'translate(-15,' + axes[d.key + 'Y'](data[0][d.key]) +')'})
                .attr('text-anchor', 'end')
                .attr('dy', '.3em');

            barText.append('tspan')
                .text(function(d) { return keyReplace[d.key] + ' : '+data[0][d.key]+' '; })
                .attr('fill',function(d) {return getColor(d.key) });

            barText.append('tspan')
                .text(' ▶');
            //console.log(axes[keys[j] + 'Y'](d[keys[j]]));

            var bars = barsWrap.selectAll('rect').data(function(d) {
                return d.data
            });

            bars.enter().append('rect')
                .attr('fill', function(d,i,j) { return getColor(keys[j]) })
                .attr('x', function(d) { return axes.timeX(new Date(d.date)); })
                .attr('y', function(d,i,j) {return axes[keys[j] + 'Y'](d[keys[j]]); })
                .attr('height', function(d,i,j) {
                    var num = d[keys[j]];
                    var yPos = axes[keys[j] + 'Y'](num);

                    if(num > 0) return lineHeight/2 - yPos;
                    else if(num == 0) return 0;
                    else if(num < 0) {
                        return lineHeight/2 - axes[keys[j] + 'Y'](Math.abs(num));
                    }
                })
                .attr('width', 2.5)
                ;

            barsWrap.append('g')
                .attr('class', 'z-line');

            var zLine = barsWrap.select('.z-line')
                // .attr('transform', 'translate(0,' + axes[d.key + 'Y'](0) + ')');

            zLine.append('line')
                .attr('x1', 0)
                .attr('x2', lineWidth - visPadding.middle+3)
                .attr('y1', function(d) { return axes[d.key + 'Y'](0)})
                .attr('y2', function(d) { return axes[d.key + 'Y'](0)})
                .attr('stroke-width',1.5);

            zLine.append('text')
                .text(0)
                .attr('x', lineWidth - visPadding.middle - 4)
                .attr('y', function(d) { return axes[d.key + 'Y'](0)})
                .attr('dy', '0.3em')
                .attr('dx', 11);

            barsWrap.append('line')
                .attr('y1', function(d) { return axes[d.key + 'Y'](data[0][d.key])})
                .attr('y2', function(d) { return axes[d.key + 'Y'](data[0][d.key])})
                .attr('x1', 0)
                .attr('x2', lineWidth-visPadding.middle)
                .attr('dx', 1)
                .attr('stroke', '#000')
                .attr('stroke-dasharray', ('2, 2'))
                .attr('stroke-width', 0.5)
                .attr('opacity', 0.3);


            return parameterWrap;
        }

        buildTextBox = function(data) {
            var tWrap = container.append('g')
                .attr('class', 'text-wrap')
                .attr('transform', 'translate(' + (lineWidth + visPadding.middle - visPadding.left) + ',' + (scatterHeight + visPadding.top + 114) + ')');

            var labels = ['Humid', 'Temperature', 'light', 'PM10', 'PM2.5', 'Date'];
            var keys = ['humd', 'temp', 'light', 'pm10', 'pm25', 'date'];
            var o = labels.map(function(d,i) {
                return { label: d, key: keys[i] };
            });

            var textScale = d3.scale.ordinal();
            textScale
                .domain(o.map(function(d) { return d.key }))
                .range(d3.range(0,81,27))
                // .range(d3.range(0,108,54))

            var ttLabel = tWrap.selectAll('text.tt-label').data(o);
            ttLabel.enter().append('text')
                .attr('class', function(d) { return 'tt-label ' + d.key })
                .attr('x', function(d,i) { return i < 3 ? 18 : scatterWidth/2 + 20 })
                // .attr('text-anchor', 'end')
                .attr('y', function(d,i) { return textScale(d.key) + i%3 * 27 })
                .attr('fill', getColor)
                .text(function(d) { return d.label });

            var ttVal = tWrap.selectAll('text.tt-value').data(o);
            ttVal.enter().append('text')
                .attr('class', function(d) { return 'tt-value ' + d.key })
                .attr('y', function(d,i) { return textScale(d.key) + (i%3 * 27) + 18 })
                .attr('x', function(d,i) { return i < 3 ? 18 : scatterWidth/2 + 20 })
                .attr('text-anchor', 'start')
                .text('-');

            return ttVal;
        };

        //tooltips for 4 lines graph
        buildInteractiveLayer = function(data) {
            var iWrap = container.selectAll('g.interactive-wrap').data([data]);
            iWrap.enter().append('g').attr('class', 'interactive-wrap');

            var lineWrap = iWrap.append('g')
                .attr('class', 'line-wrap')
                .attr('opacity', 0);

            lineWrap.append('line')
                .attr('y1', 0)
                .attr('y2', chartHeight)
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('dx', 1)
                .attr('stroke', '#000')
                .attr('stroke-width', 1);

            var valBoxes = lineWrap.selectAll('rect.text-box').data(['humd','temp','light','pm10','pm25']);

            valBoxes.enter().append('rect')
                .attr('class',function(d) { return 'text-box ' + d })
                .attr('x',2)
                .attr('y', axes.charts)
                .attr('rx', 3)
                .attr('ry', 3)
                .attr('fill', '#2a2a2a')
                .attr('height', function(d) { return d == 'pm10Disp' ? 36 : 18 })
                .attr('width', 50);

            valBoxes.enter().append('text')
                .attr('x',48)
                .attr('y', function(d) { return axes.charts(d) + 14 })
                .attr('fill', getColor)
                .text('')
                .attr('text-anchor', 'end');

            iWrap.append('rect')
                .attr('width', lineWidth - visPadding.middle)
                .attr('height', chartHeight)
                .attr('class', 'interactive-layer')
                .attr('fill', '#000')
                .attr('opacity', 0)
                .on('mouseover', dispatch.iTooltip)
                .on('mousemove', dispatch.iTooltip)
                .on('mouseout', dispatch.hideTooltip);

            return lineWrap;

        }


        setupTooltips = function(circles, line, text, data) {

            dispatch.on('iTooltip', function(d,i,ext) {
                var x = d3.event.layerX - visPadding.left;
                var location = 0;
                var point;

                if(!d.point) {
                    var leftEdges = axes.interactiveX.range();
                    var width = axes.interactiveX.rangeBand();
                    while(x > (leftEdges[location] + width)) {
                        location++
                    }
                    location = Math.min(++location,d.length-1)
                    point = d[location];
                } else {
                    point = d.point;
                }

                circles.each(function(k,i,j) {
                    if(point.date === k.date) {
                        d3.select(this)
                            .attr('fill', function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' })
                            .attr('stroke', 'black') //function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' })
                        .transition().duration(200)
                            .attr('opacity', 1)
                            .attr('stroke-width', 3);
                    }
                    else {
                        d3.select(this)
                            .attr('fill', '#ccc')
                            .attr('stroke', '#ccc')
                            .transition().duration(200)
                            .attr('opacity', 0.8)
                            .attr('stroke-width', 1);
                    }
                });

                if(d.point) {
                    var dDate = new Date(d.point.date);
                    dDate = dDate.getTime();

                    line.transition().duration(300)
                        .attr('opacity',1)
                        .attr('transform', 'translate(' + (axes.timeX(dDate) + 2) + ',0)');

                } else {
                    if(!line.classed('active')) {
                        line.transition().duration(200)
                            .attr('opacity',1);
                    }

                    line
                        .classed('active', true)
                        .attr('transform', 'translate(' + (x + 2) + ',0)');
                }

                showText(point,i);

            });

            dispatch.on('hideTooltip', function(d,i,ext) {

                circles
                    .attr('fill', function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' })
                    .attr('stroke', function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' })
                .transition()
                    .attr('opacity', 1)
                    .attr('stroke-width', 1);

                text.text('-')

                line
                    .classed('active', false)
                    .transition().duration(200)
                    .attr('opacity',0);
            });



            //show text in text box area
            function showText(o) {
                line.selectAll('text').text(function(d) {
                    var num = o[d];
                    if(num === null) { return 'N/A'; }
                    else { return num; }
                });

                text
                    .text(function(d) {
                        if(d.key == 'date') {
                            /*var retDate = new Date(o[d.key]);
                            retDate = retDate.getMonth()+1 + '/' + (1900 + retDate.getYear());
                            return retDate;*/
                            return formatTime(o[d.key]);
                        } else {
                            var retVal = o[d.key];

                            if(o[d.key] === null) { return 'N/A'; }
                            else { return retVal; }
                        }

                    })
                    .attr('fill', function(d) { return o[d.key] < 0 ? '#D6616B' : '#000' });
            }

        }

        buildScatter = function(data) {
            var scatterWrap = container.selectAll('g.scatter-wrap').data([data])
            scatterWrap.enter().append('g')
                .attr('class', 'scatter-wrap')
                .attr('transform', 'translate(' + (lineWidth) + ',' + (visPadding.top + 25) + ')');

            var xAxis = d3.svg.axis()
                .scale(axes.scatterX)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(axes.scatterY)
                .orient('right');

            var x = scatterWrap.append('g')
                .attr('class','x-axis')
                .attr('transform', 'translate(0,' + axes.scatterY.range()[1] + ')')
                .call(xAxis);

            x.append('text')
                .text('PM 10 ▶')
                .attr('transform', 'translate(' + axes.scatterX.range()[0] + ',' + (scatterWidth - axes.scatterY.range()[0]) + ')')
                .attr('dx', 3)
                .attr('dy', 11);

            var y = scatterWrap.append('g')
                .attr('class','y-axis')
                .attr('transform', 'translate(' + axes.scatterX.range()[1] + ',0)')
                .call(yAxis);

            y.append('text')
                .text('PM 2.5 ▶')
                .attr('transform', 'translate(' + axes.scatterX.range()[0] + ',' + axes.scatterY.range()[0] + ')rotate(-90)')
                .attr('dx', 3)
                .attr('dy', 11);

            var pointsWrap = scatterWrap.append('g')
                .attr('class', 'points-wrap');

            var points = pointsWrap.selectAll('g.scatter-points').data(function(d,i) {
                d.forEach(function(d) {
                    d.avgAlpha = d3.mean([d.light,d.temp,d.humd]);
                });
                return [d];
            });

            points.enter().append('g')
                .attr('class', 'scatter-points')

            var circles = points.selectAll('circle.point').data(function(d) {
                return d;
            });

            circles.enter().append('circle')
                .attr('class', function(d,i,j) {
                    // var currDate = new Date(d.date);
                    // d.point = i;
                    // d.group = j;
                    // d.month = currDate.getMonth() + 1;
                    // d.year = currDate.getYear();
                    // d.day = currDate.getDate();
                    return 'point point-' + i + ' group-' + j
                })
                .attr('r', function(d,i,j) {
                    if(d.avgAlpha !== undefined) return axes.alphaY(d.avgAlpha)
                    else return 0;
                })
                .attr('cx', function(d) { return axes.scatterX(d.pm10) })
                .attr('cy', function(d) { return axes.scatterY(d.pm25) })
                .attr('fill-opacity', 0.8)
                .attr('stroke-opacity',0.5)
                .attr('fill', function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' })
                .attr('stroke', function(d) { return d.avgAlpha < 0 ? '#DAA0A2' : '#C8DDEC' });

            var voronoi = d3.geom.voronoi()
                .clipExtent([[-10,-10],[scatterWidth + 10, scatterWidth + 10]])
                .x(function(d) { return axes.scatterX(d.pm10) })
                .y(function(d) { return axes.scatterY(d.pm25) });

            var vWrap = pointsWrap.append('g').attr('class', 'voronoi');

            var vPath = vWrap.selectAll('path').data(function(d) {
                return voronoi(d).filter(function(d) { return d; });
            });

            vPath.enter().append('path')
                .attr('opacity', 0)
                .attr('fill','#000')
                .attr('stroke','#fff')
                .attr('d', function(d) { return 'M' + d.join('L') + 'Z'; })
                .on('mouseover', dispatch.iTooltip)
                .on('mouseout', dispatch.hideTooltip);

            return circles;
        }

        Axes = function(data) {
            this.chartColors = d3.scale.ordinal();
            this.chartColors
                .domain(['pm10', 'pm25', 'light', 'temp', 'humd', 'date'])
                .range(['#ff7f00'/*'#3A7FA3'*/, '#316be6'/*'#FC9E27'*/, '#ffc629'/*'#B5CF6B'*/, '#ff0000'/*'#D6616B'*/, '#9bee00'/*'#E7BA52'*/, '#000']);

            this.timeX = d3.time.scale();

            var dateStart = new Date(data[0].date);
            var dateEnd = new Date(data[data.length - 1].date);

            this.timeX.domain([dateStart,dateEnd]);
            this.timeX.range([0,lineWidth-visPadding.middle]);

            this.interactiveX = d3.scale.ordinal();
            this.interactiveX.domain(d3.range(0,data.length,1));
            this.interactiveX.rangeBands([0,lineWidth - visPadding.middle])

            var maxD = d3.max(data, function(d) { return d.pm25; });
            var maxC = d3.max(data, function(d) { return d.pm10; });
            var maxDC = d3.max([maxD, maxC]);

            var minD = d3.min(data, function(d) { return d.pm25; });
            var minC = d3.min(data, function(d) { return d.pm10; });
            var minDC = d3.min([minD, minC]);

            this.lineY = d3.scale.linear();
            this.lineY.domain([minDC < 0 ? minDC : 0, maxDC]);
            this.lineY.range([lineHeight,0]);

            var maxhumd = d3.max(data, function(d) { return d.humd; });
            var maxtemp = d3.max(data, function(d) { return d.temp; });
            var maxlight = d3.max(data, function(d) { return d.light; });


            var minhumd = d3.min(data, function(d) { return d.humd; });
            var mintemp = d3.min(data, function(d) { return d.temp; });
            var minlight = d3.min(data, function(d) { return d.light; });


            var humdBound = Math.max(Math.abs(minhumd), Math.abs(maxhumd));
            var tempBound = Math.max(Math.abs(mintemp), Math.abs(maxtemp));
            var lightBound = Math.max(Math.abs(minlight), Math.abs(maxlight));

            this.humdY = d3.scale.linear();
            this.humdY.domain([-humdBound, 0, humdBound])
            this.humdY.range([lineHeight/2, lineHeight/2, 0]);

            this.tempY = d3.scale.linear();
            this.tempY.domain([-tempBound, 0, tempBound])
            this.tempY.range([lineHeight/2, lineHeight/2, 0]);

            this.lightY = d3.scale.linear();
            this.lightY.domain([-lightBound, 0, lightBound])
            this.lightY.range([lineHeight/2, lineHeight/2, 0]);

            //For scatter only
            var maxFH = d3.max([maxhumd,maxlight]);
            var minFH = d3.min([minhumd,minlight]);

            var alphaBound = Math.max(Math.abs(minFH), Math.abs(maxFH));
            this.alphaY = d3.scale.linear();
            this.alphaY.domain([-alphaBound, 0,alphaBound]);
            this.alphaY.range([12, 2, 12]);

            this.quadrants = {};
            this.quadrants.light = d3.scale.linear();
            this.quadrants.humd = d3.scale.linear();

            this.scatterX = d3.scale.linear();
            this.scatterY = d3.scale.linear();

            var medD = d3.median(data, function(d) { return d.pm25; });
            var medC = d3.median(data, function(d) { return d.pm10; });
            this.scatterX.domain([minC, medC, maxC]);
            this.scatterY.domain([minD, medD, maxD]);

            this.scatterX.range([0, scatterWidth/2, scatterWidth]);
            this.scatterY.range([scatterHeight, scatterHeight/2, 0]);

            var cDHeight = 3*(lineHeight + chartPadding);
            this.charts = d3.scale.ordinal();
            this.charts
                .domain(['pm10','pm25','pm10pm25', 'temp', 'light', 'humd'])
                .range([3*(lineHeight + chartPadding), 3*(lineHeight + chartPadding) + 13, 3*(lineHeight + chartPadding), 2*(lineHeight + chartPadding), (lineHeight + chartPadding), 0]);

        };
    }();

