var queue = [];

//点击按钮，修改队列数组值
function changeQueue() {
    var input = document.getElementById("input");
    var leftIn = document.getElementById("left-in");
    var rightIn = document.getElementById("right-in");
    var leftOut = document.getElementById("left-out");
    var rightOut = document.getElementById("right-out");

    leftIn.addEventListener("click", function() {
        if (input.value) {
            queue.unshift(input.value);
            drawBox();
        } else {
            alert("请先输入数字");
        }
    });
    rightIn.addEventListener("click", function() {
        if (input.value) {
            queue.push(input.value);
            drawBox();
        } else {
            alert("请先输入数字");
        }
    });
    leftOut.addEventListener("click", function() {
        if (queue.length) {
            alert(queue.shift(input.value));
            drawBox();
        } else {
            alert("队列中已没有元素");
        }
    });
    rightOut.addEventListener("click", function() {
        if (queue.length) {
            alert(queue.pop(input.value));
            drawBox();
        } else {
            alert("队列中已没有元素");
        }
    });
}

//点击数字，删除数字
function deletSpan() {
    var showBox = document.getElementById("showbox");
    showBox.addEventListener("click", function(event) {
        if (event.target.nodeName === "SPAN") {
            setIndex();
            queue.splice(event.target.dataset.index, 1);
            drawBox();
        }
    })
}

function setIndex() {
    var showbox = document.getElementById("showbox");
    var child = showbox.childNodes;
    for (var i = 0; i < child.length; i++) {
        child[i].setAttribute("data-index", i);
    }
}

//绘制方块
function drawBox() {
    var showBox = document.getElementById("showbox");
    var drawBox = "";
    queue.map(function(elem) {
        drawBox += "<span>" + elem + "</span>";
    })
    showBox.innerHTML = drawBox;
}

function init() {
    changeQueue();
    deletSpan();
}

init();
