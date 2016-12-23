"use strict";

var divs = document.querySelectorAll("div");
var traversal = [];
var intervalId;

//先序遍历(Pre-Order Traversal)
function preOrder(node) {
    if (node !== null) {
        traversal.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

//中序遍历(In-Order Traversal)
function inOrder(node) {
    if (node !== null) {
        inOrder(node.firstElementChild);
        traversal.push(node);
        inOrder(node.lastElementChild);
    }
}

//后序遍历(Post-Order Traversal)
function postOrder(node) {
    if (node !== null) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        traversal.push(node);
    }
}

function show() {
    var i = 0;
    traversal[i].style.backgroundColor = "#FA8072";
    intervalId = setInterval(function() {
        i++;
        if (i < traversal.length) {
            traversal[i - 1].style.backgroundColor = "#fff";
            traversal[i].style.backgroundColor = "#FA8072";
        } else {
            traversal[i - 1].style.backgroundColor = "#fff";
            clearInterval(intervalId);
        }
    }, 400);
}

function reset() {
    traversal = [];
    clearInterval(intervalId);
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = "#fff";
    }
}

function init() {
    document.querySelector("#pre-order").addEventListener("click", function() {
        reset();
        preOrder(divs[0]);
        show();
    });
    document.querySelector("#in-order").addEventListener("click", function() {
        reset();
        inOrder(divs[0]);
        show();
    });
    document.querySelector("#post-order").addEventListener("click", function() {
        reset();
        postOrder(divs[0]);
        show();
    });
}

init();
