/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var value = document.getElementById("aqi-value-input").value.trim();

    var re1 = /^[\u4e00-\u9fa5a-zA-Z\s]+$/;
    var re2 = /\D/;
    if (!re1.test(city)) {
        alert("城市名应为中英文字符");
    } else if (re2.test(value)) {
        alert("空气质量应为整数");
    } else {
        aqiData[city] = value;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var showtable = document.getElementById("aqi-table");
    var tableRow = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for (var city in aqiData) {
        tableRow += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='" + city + "'>删除</button></td></tr>";
    }
    showtable.innerHTML = city ? tableRow : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addbtn = document.getElementById("add-btn");
    addbtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    table.addEventListener("click", function(event) {
        if (event.target.nodeName == "BUTTON") {
            delBtnHandle.call(null, event.target.dataset.city);
        }
    })

}

//init();节点需要先加载完才能执行onclick事件，否则报错
window.onload = init;
