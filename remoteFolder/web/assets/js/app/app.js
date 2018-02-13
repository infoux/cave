"use strict";
function Application() {

    this.config = {};

    this.init = function (cfg) {
        jQuery.extend(true, this.config, cfg);
    };

    this.chart = function (selector, cfg) {
        var $el = $(selector);
        if ($el.length) {
            return Highcharts.chart(
                jQuery.extend(true, {
                    chart: {
                        renderTo: $el[0],
                        events: {
                            load: function () {
                                var chart =this;
                                var $window = $(window), $document = $(document);
                                var limit = 0.7;
                                var em = ($window.width() / 3840 *  1.7) < limit ? limit : ($window.width() / 3840 * 1.7);
                                console.log(em);
                                chart.container.style.fontSize = em +'em';
                                chart.reflow();
                                chart.redraw();
                            }
                        }
                    },
                    yAxis: {
                        allowDecimals: true
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            second: '%Y-%m-%d<br /> T%H:%M:%S',
                            minute: '%Y-%m-%d<br /> T%H:%M',
                            hour: '%Y-%m-%d<br /> T%H',
                            day: '%Y-%m-%d',
                            week: '%Y-%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                        },
                        minTickInterval: 10 * 600 * 1000,
                        maxTickInterval: 7 * 24 * 10 * 600 * 1000
                        //tickInterval: 24 * 3600 * 1000,
                    },
                    plotOptions: {
                        series: {
                            tooltip: {
                                dateTimeLabelFormats: {
                                    second: '%Y-%m-%d<br />T%H:%M:%S',
                                    minute: '%Y-%m-%d<br />T%H:%M',
                                    hour: '%Y-%m-%d<br />T%H:%M',
                                    day: '%Y-%m-%d',
                                    week: '%Y-%m-%d',
                                    month: '%Y-%m',
                                    year: '%Y'
                                }
                            }
                            //pointStart: Date.UTC(2012, 0, 1),
                            //pointInterval: 24 * 3600 * 1000
                        }
                    },
                }, cfg)
            );
        }
    };

    this.getPivotArray = function (dataArray, rowIndex, colIndex, dataIndex) {
        //Code from http://techbrij.com
        var result = {}, ret = [];
        var newCols = [];
        for (var i = 0; i < dataArray.length; i++) {

            if (!result[dataArray[i][rowIndex]]) {
                result[dataArray[i][rowIndex]] = {};
            }
            result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

            //To get column names
            if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
                newCols.push(dataArray[i][colIndex]);
            }
        }

        newCols.sort();
        var item = [];

        //Add Header Row
        item.push('Item');
        item.push.apply(item, newCols);
        ret.push(item);

        //Add content
        for (var key in result) {
            item = [];
            item.push(key);
            for (var i = 0; i < newCols.length; i++) {
                item.push(result[key][newCols[i]] || "");
            }
            ret.push(item);
        }
        return ret;
    };

    this.numberPad = function (text, size) {
        var s = String(text);
        while (s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    };
}