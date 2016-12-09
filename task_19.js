var queue = [];
var showBar = document.getElementById("showbar");
var showBox = document.getElementById("showbox");

function leftIn() {
    if (input.value) {
        queue.unshift(input.value);
        drawBox();
        showBar.insertBefore(drawBar(input.value), showBar.firstChild);
    } else {
        alert("请先输入数字");
    }
}

function rightIn() {
    if (input.value) {
        queue.push(input.value);
        drawBox();
        showBar.appendChild(drawBar(input.value));
    } else {
        alert("请先输入数字");
    }
}

function leftOut() {
    if (queue.length) {
        alert(queue.shift(input.value));
        drawBox();
        showBar.removeChild(showBar.firstChild);
    } else {
        alert("队列中已没有元素");
    }
}

function rightOut() {
    if (queue.length) {
        alert(queue.pop(input.value));
        drawBox();
        showBar.removeChild(showBar.lastChild);
    } else {
        alert("队列中已没有元素");
    }
}

//点击数字，删除数字
function deletSpan() {
    showBox.addEventListener("click", function(event) {
        if (event.target.nodeName === "SPAN") {
            setIndex();
            queue.splice(event.target.dataset.index, 1);
            drawBox();
            showBar.removeChild(showBar.childNodes[event.target.dataset.index]);
        }
    })
}

function setIndex() {
    var child = showbox.childNodes;
    for (var i = 0; i < child.length; i++) {
        child[i].setAttribute("data-index", i);
    }
}

//绘制方块
function drawBox() {
    var drawBox = "";
    queue.map(function(elem) {
        drawBox += "<span>" + elem + "</span>";
    })
    showBox.innerHTML = drawBox;
}

//绘制柱状图
function drawBar(h) {
    var bar = document.createElement("span");
    bar.style.height = h * 5 + "px";
    return bar;
}

//随机生成数
function createNums() {
    queue = []
        //删除showBar所有孩子节点
    while (showBar.firstChild) {
        showBar.removeChild(showBar.firstChild);
    }
    for (var i = 0; i < 15; i++) {
        var temp = Math.floor(Math.random() * 90) + 11
        queue.push(temp);
        showBar.appendChild(drawBar(temp));
    }
    drawBox();
}

function bubbleSort() {
    var i = 0;
    var j = 0;
    var intervalId = setInterval(function() {
        n = queue.length;
        if (i < n - 1) {
            if (j < n - 1 - i) {
                showBar.childNodes[j].style.backgroundColor="#FA8072";
                if (queue[j] > queue[j + 1]) {
                    var t = queue[j];
                    queue[j] = queue[j + 1];
                    queue[j + 1] = t;
                    showBar.childNodes[j].style.height = queue[j] * 5 + "px";
                    showBar.childNodes[j + 1].style.height = queue[j + 1] * 5 + "px";
                }
                showBar.childNodes[j].style.backgroundColor="#d55d5c";
                j++;
                return;
            }
            j = 0;
            i++;
            return;
        }
        clearInterval(intervalId);
    }, 50);
}

function init() {
    document.getElementById("left-in").addEventListener("click", leftIn);
    document.getElementById("right-in").addEventListener("click", rightIn);
    document.getElementById("left-out").addEventListener("click", leftOut);
    document.getElementById("right-out").addEventListener("click", rightOut);
    deletSpan();
    document.getElementById("create-nums").addEventListener("click", createNums);
    document.getElementById("bubble-sort").addEventListener("click", bubbleSort);
}

init();
