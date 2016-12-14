var queue = [];
var showBox = document.getElementById("showbox");

function letIn() {
    if (input.value) {
        re=/[^A-Za-z0-9\u4e00-\u9fa5]+/;
        queue=input.value.split(re);
        console.log(queue);
        drawBox(queue);
    } else {
        alert("请先输入");
    }
}

function leftOut() {
    if (queue.length) {
        alert(queue.shift(input.value));
        drawBox(queue);
    } else {
        alert("队列中已没有元素");
    }
}

function rightOut() {
    if (queue.length) {
        alert(queue.pop(input.value));
        drawBox(queue);
    } else {
        alert("队列中已没有元素");
    }
}

function query(){
    queryCon=document.getElementById("query").value;
    newquery=[];
    queue.map(function(elem){
        newquery.push(elem.replace(new RegExp(queryCon,"g"),"<span>"+queryCon+"</span>"));
    });
    drawBox(newquery);
}

//绘制方块
function drawBox(array) {
    var drawBox = "";
    array.map(function(elem) {
        if (elem.length) 
            drawBox += "<div>" + elem + "</div>";
    })
    showBox.innerHTML = drawBox;
}

function init() {
    document.getElementById("let-in").addEventListener("click", letIn);
    document.getElementById("left-out").addEventListener("click", leftOut);
    document.getElementById("right-out").addEventListener("click", rightOut);
    document.getElementById("btn-query").addEventListener("click",query);
}

init();
