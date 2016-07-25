/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
/*
chartData={
    day:{北京:{1:1345,...}},
    week:{北京:{1:134532,...}},
    month:{北京:{1:1345135,...}}
}
*/


// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

var color = [
    "#f7acbc",
    "#f15b6c",
    "#deab8a",
    "#a3cf62",
    "#f58220",
    "#65c294",
    "#e0861a",
    "#33a3dc",
];

/**
 * 渲染图表
 */
function renderChart() {
    var chartWrap = document.getElementsByTagName("div")[0];
    var time = pageState["nowGraTime"];
    var city = pageState["nowSelectCity"];
    var drawCity = chartData[time][city];
    //aqiSourceData[city];
    var width = 1200;
    var number = Object.keys(drawCity).length; //drawCity.length返回undefined,先用key转成属性名组成的数组，再length
    var barWidth = width / (number * 2 + 1);
    var left = barWidth;
    var bar = "";
    bar += "<div class='title'>" + city + "市01-03月空气质量<span>（将光标放在柱状图上可查看详细数值）</span></div>";
    if (time === "day") {
        for (var event in drawCity) {
            bar += "<div title='" + event + "  空气质量: " + drawCity[event] + "' style='width:" + barWidth + "px; height: " + drawCity[event] + "px; left: " + left + "px; background-color:" + color[Math.floor(Math.random() * 8)] + ";'></div>";
            left += barWidth * 2;
        }
    } else if (time === "week") {
        for (var event in drawCity) {
            bar += "<div title='第" + event + "周  空气质量: " + drawCity[event] + "' style='width:" + barWidth + "px; height: " + (drawCity[event] / 7) + "px; left: " + left + "px; background-color:" + color[Math.floor(Math.random() * 8)] + ";'></div>";
            left += barWidth * 2;
        }
    } else if (time === "month") {
        for (var event in drawCity) {
            bar += "<div title='" + event + "月  空气质量: " + drawCity[event] + "' style='width:" + barWidth + "px; height: " + (drawCity[event] / 30) + "px; left: " + left + "px; background-color:" + color[Math.floor(Math.random() * 8)] + ";'></div>";
            left += barWidth * 2;
        }
    } else {
        alert("Something Wrong!");
    }
    chartWrap.innerHTML = bar;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    // 确定是否选项发生了变化
    // 设置对应数据
    pageState["nowGraTime"] = time;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
    // 确定是否选项发生了变化
    // 设置对应数据
    pageState["nowSelectCity"] = city;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var chooseTime = document.getElementById("form-gra-time");
    chooseTime.addEventListener("change", function(event) { //不监听change是因为调用graTimeChange函数在里面，如果不change就没法调用
        if (event.target.nodeName == "INPUT") {
            graTimeChange(event.target.value);
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select");
    var select = "";
    for (var city in aqiSourceData) {
        select += "<option>" + city + "</option>"
    }
    citySelect.innerHTML = select;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener("change", function(event) {
        citySelectChange(event.target.value);
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var weeks = {},
        week = {},
        wcount = 0,
        dcount = 0,
        wnumber = 0;
    var months = {},
        month = {},
        mcount = 0,
        mnumber = 0;
    for (var city in aqiSourceData) {
        var nowCity = city;
        var dayArray = Object.keys(aqiSourceData[nowCity]);
        for (var day in aqiSourceData[nowCity]) {
            dcount++;
            wnumber += aqiSourceData[nowCity][day];
            if (dcount % 7 === 0 || day === dayArray[dayArray.length - 1]) {
                wnumber += aqiSourceData[nowCity][day];
                wcount++;
                week[wcount] = wnumber;
                dcount = 0;
                wnumber = 0;
            }
        }
        wcount = 0;
        weeks[nowCity] = week;
        week = {}; //important

        var i = 0;
        for (var day in aqiSourceData[nowCity]) {
            mnumber += aqiSourceData[nowCity][day];
            if (day === dayArray[dayArray.length - 1] || dayArray[i].slice(8) > dayArray[i + 1].slice(8)) {
                mnumber += aqiSourceData[nowCity][day];
                mcount++;
                month[mcount] = mnumber;
                mnumber = 0;
            }
            i++;
        }
        mcount = 0;
        months[nowCity] = month;
        month = {};
    }

    // 处理好的数据存到 chartData 中
    chartData["day"] = aqiSourceData;
    chartData["week"] = weeks;
    chartData["month"] = months;

    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
