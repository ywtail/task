"use strict";

var tag = [];
var hobby = [];

function distinct(array) {
    var disarr = [];
    var flag = 0;
    for (var i = 0; i < array.length; i++) {
        if (disarr.indexOf(array[i]) === -1) {
            disarr.push(array[i]);
        } else
            flag = 1;
    }
    if (flag)
        alert("输入重复");
    return disarr;
}

function removeShow(arr,show) {
    if (arr.length > 10)
        drawSpan(arr.slice(arr.length - 10), document.querySelector(show));
    else
        drawSpan(arr, document.querySelector(show));
}

function getTag() {
    var input = document.querySelector("#tag");
    input.addEventListener("keyup", function(event) {
        if (/[,，\s]/.test(input.value) || event.which === 13) {
            tag = tag.concat(input.value.split(/[,，\s]/g)).filter(function(elem) {
                return elem; });
            tag = distinct(tag);
            removeShow(tag,"#showtag");
            input.value = "";
        }
    })
}

function deleteTag() {
    var showtag = document.querySelector("#showtag");
    showtag.addEventListener("mouseover", function(event) {
        if (event.target.nodeName === "SPAN") {
            event.target.textContent="点击删除"+event.target.textContent;
        }
    })
    showtag.addEventListener("mouseout", function(event) {
        if (event.target.nodeName === "SPAN") {
            event.target.textContent=event.target.textContent.replace("点击删除","");
        }
    })
    showtag.addEventListener("click", function(event) {
        if (event.target.nodeName === "SPAN") {
            setIndex();
            tag.splice(event.target.dataset.index,1);
            drawSpan(tag,showtag);
        }
    })
}

function setIndex() {
    var showtag = document.querySelector("#showtag");
    var child = showtag.childNodes;
    for (var i = 0; i < child.length; i++) {
        child[i].setAttribute("data-index", i);
    }
}

function getHobby() {
    var input = document.querySelector("#hobby");
    if (input.value) {
        var re = /[^A-Za-z0-9\u4e00-\u9fa5]+/;
        hobby = hobby.concat(input.value.split(re)).filter(function(elem) {
            return elem;
        });
        hobby = distinct(hobby);
        removeShow(hobby,"#showhobby");
        input.value = ""
    } else {
        alert("请先输入");
    }
}

//绘制方块
function drawSpan(array, show) {
    var drawSpan = "";
    array.map(function(elem) {
        if (elem.length)
            drawSpan += "<span>" + elem + "</span>";
    })
    show.innerHTML = drawSpan;
}

function init() {
    getTag();
    document.querySelector("#confirmhobby").addEventListener("click", getHobby);
    deleteTag();
}

init();
