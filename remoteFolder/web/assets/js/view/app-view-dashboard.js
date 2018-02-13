var app = new Application();
var fnObj = {};
var pageCfg = {
    caveId: '',
    gwPlcId: '',
    rtuId: '',
    senTypeCd: {},
    chart: []
};
var ACTIONS = axboot.actionExtend(fnObj, {

    INIT_TIME: function(){
        var $timeObj = $('[ax-view-id=time]');

        setInterval(function() {
            $timeObj.text(moment().format('A hh:mm:ss'));
        }, 1000);
    },

    INIT_CHART: function(caller, act, data){

    },

    LOAD_SENSOR_DATA: function (caller, act, data) {
        axboot.call({
            type: 'GET',
            url: '/data/lastSenserData',
            data: {
                caveId: pageCfg.caveId,
                gwPlcId: pageCfg.gwPlcId,
                rtuId: pageCfg.rtuId
            },
            callback: function (res) {
                var $view = $('.screen .cavedata[data='+ pageCfg.caveId +'] div.nowdata');
                $view.empty();
                pageCfg.senTypeCd = {};
                if(res.list.length) {
                    res.list.forEach(function(e1,e2){

                        pageCfg.senTypeCd[e1.SEN_TYPE_CD] = {
                            SEN_TYPE_CD: e1.SEN_TYPE_CD,
                            SEN_NM: e1.SEN_NM
                        };

                        if(e1.EQ_STAT == 'N'){
                            $view.append(
                                $('<p />', {class: e1.SEN_TYPE_CD.toLowerCase()})
                                    .html(e1.SEN_NM + '<strong>'+ (e1.MEAS_VAL? e1.MEAS_VAL:'N/A') +'<u>'+e1.MEAS_UNIT+'</u></strong><span>'+e1.RTU_NM+'</span>')
                            );
                        }else{
                            $view.append(
                                $('<p />', {class: 'e'})
                                    .html(e1.SEN_NM + '<strong>ERROR<u></u></strong><span>'+e1.RTU_NM+'</span>')
                            );
                        }
                    });
                }
            },
            options: {
                // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                onError: function (err) {
                    console.log(err);
                }
            }
        }).call(function(){
            //console.log(pageCfg.chart);
            pageCfg.chart.forEach(function(e1, e2){
                e1.destroy();
            });
            pageCfg.chart = [];
        }).call(function() {
            Object.keys(pageCfg.senTypeCd).forEach(function (e1, e2) {
                if(e2 > 1) return;
                axboot.ajax({
                    type: 'GET',
                    url: '/data/senserLogData',
                    data: {
                        caveId: pageCfg.caveId,
                        gwPlcId: pageCfg.gwPlcId,
                        rtuId: pageCfg.rtuId,
                        senTypeCd: e1
                    },
                    callback: function (res) {
                        if (res.list.length) {

                            // IE DATE 컨버팅
                            res.list.forEach(function (e1, e2) {
                                e1.MEAS_DT = moment(e1.MEAS_DT).format('x');
                            });

                            console.log(app.getPivotArray(res.list, 'MEAS_DT', 'INST_LOC_CMNT', 'MEAS_VAL'));

                            pageCfg.chart.push(
                                app.chart('.chart[chart-view=' + pageCfg.caveId + '][index=' + e2 + ']', {
                                    chart: {

                                    },
                                    data: {
                                        rows: app.getPivotArray(res.list, 'MEAS_DT', 'INST_LOC_CMNT', 'MEAS_VAL')
                                    },
                                    chart: {
                                        type: 'line',
                                        zoomType: 'x'
                                    },
                                    plotOptions: {
                                        series: {
                                            connectNulls: true
                                        }
                                    },
                                    title: {
                                        text: '시간대별 ' + pageCfg.senTypeCd[e1].SEN_NM
                                    },
                                    legend: {
                                        layout: 'vertical',
                                        align: 'right',
                                        verticalAlign: 'middle'
                                    },
                                    yAxis: {
                                        allowDecimals: false,
                                        title: {
                                            text: 'Units'
                                        }
                                    },
                                    xAxis: {
                                        type: 'datetime'
                                    },
                                    boost: {
                                        useGPUTranslations: true
                                    },
                                    tooltip: {}
                                })
                            );
                        } else {
                            pageCfg.chart.push(
                                app.chart('.chart[chart-view=' + pageCfg.caveId + '][index=' + e2 + ']', {
                                    title: {
                                        text: '시간대별 ' + pageCfg.senTypeCd[e1].SEN_NM
                                    }
                                })
                            );
                        }
                    },
                    options: {
                        // axboot.ajax 함수에 2번째 인자는 필수가 아닙니다. ajax의 옵션을 전달하고자 할때 사용합니다.
                        onError: function (err) {
                            console.log(err);
                        }
                    }
                });
            });
        }).done(function () {
            resizeChart();
        });
        return false;
    }
});

// fnObj 기본 함수 스타트와 리사이즈
fnObj.pageStart = function () {

    $(".screen button.cave").on("click", function() {
        pageCfg.caveId = $(this).attr("data");

        $(".screen button.cave[data]").removeClass("active");
        $(".screen button.cave[data="+ pageCfg.caveId +"]").addClass("active");

        $(".screen .cavedata[data]").removeClass("active");
        $(".screen .cavedata[data="+ pageCfg.caveId +"]").addClass("active");

        $("h1 p").text($(this).text());

        pageCfg.rtuId = $(".screen .cavedata[data="+ pageCfg.caveId +"] input[data-rtuid]:checked").attr("data-rtuid");

        ACTIONS.dispatch(ACTIONS.LOAD_SENSOR_DATA);

        $("#map").removeAttr("class");
        $("#map").addClass( pageCfg.caveId );
    });

    $(".screen .cavedata[data] input[data-rtuid]").on('click', function(){
        pageCfg.rtuId = $(".screen .cavedata[data="+ pageCfg.caveId +"] input[data-rtuid]:checked").attr("data-rtuid");
        ACTIONS.dispatch(ACTIONS.LOAD_SENSOR_DATA);
    });


    pageCfg.caveId = $(".screen .tabdata button.cave[data].active").attr("data");
    pageCfg.rtuId = $(".screen .cavedata[data="+ pageCfg.caveId +"]").attr("data");

    $("h1 p").text($(".screen .tabdata button.cave[data].active").text());

    this.pageButtonView.initView();
    ACTIONS.dispatch(ACTIONS.INIT_TIME);
    ACTIONS.dispatch(ACTIONS.LOAD_SENSOR_DATA);
};

fnObj.pageResize = function () {
    resizeChart();
};


fnObj.pageButtonView = axboot.viewExtend({
    initView: function () {
    }
});

function resizeChart() {
    var $window = $(window), $document = $(document);

    var limit = 0.75;
    var em = ($window.width() / 3840 *  1.7) < limit ? limit : ($window.width() / 3840 * 1.7);
    pageCfg.chart.forEach(function(e1, e2) {
        e1.container.style.fontSize = em +'em';
        e1.redraw();
        e1.reflow();
    });
}