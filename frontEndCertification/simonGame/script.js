/**
 * Created by elvischen on 07/03/2017.
 */

var red = document.getElementById("red");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var yellow =document.getElementById("yellow");
var checkbox = document.getElementById("checkbox");
var start = document.querySelector("#start button");
var count = document.getElementById("count-text");
var list = [red,blue,green,yellow];
var clickSequence = [];
var numList = [];

var squares = document.getElementById("squares");


function addAfterClass() {
    for (let i in arguments){
        arguments[i].classList.add("afterStart");
    }
}

function resetClass() {
    for (let i in arguments) {
        arguments[i].classList.remove("afterStart");
    }
}

checkbox.onclick = function () {
    if (this.checked){
        addAfterClass(red,blue,green,yellow);
        start.onclick = generateSequence([]);
    }
    else {
        resetClass(red,blue,green,yellow);
        start.onclick = null;
    }
}

function generateSequence(array) {
    clickSequence = [];
    numList = array;
    numList.push(Math.floor(Math.random()*4));
    if (numList.length < 5) {
        var time = 500;
    }
    else {
        time = Math.floor(3000/numList.length);
    }
    count.innerHTML = numList.length;
    // count.innerHTML = "Right!";
    simuClickTime(numList,time);
    for (let i = 0; i < 4; i++){
        list[i].onclick = checkInput;
    }
}

function simuClickTime(array,time) {
    var i = 0;
    var timeID = setInterval(function () {
        list[array[i]].style.opacity = 0.6;
        window.setTimeout(function () {
            list[array[i]].style.opacity = 1;
            i++;
        },time);
        if (i == array.length - 1){
            clearInterval(timeID);
        }
    },100+time);
}

function checkInput() {
    this.onmousedown = function() {
        this.style.opacity = 0.6;
    }
    this.onmouseup = function () {
        this.style.opacity = 1;
    }
    let j = 0;
    switch (this.id){
        case "red": j = 0;
            break;
        case "blue": j = 1;
            break;
        case "green": j = 2;
            break;
        case "yellow": j = 3;
            break;
    }
    clickSequence.push(j);
    let l = clickSequence.length;
    if (l !== 0 && clickSequence[l - 1] !== numList[l - 1]) {
        showFalse();
    }
    else if (l === numList.length) {
        showRight();
    }
}

function showFalse() {
    count.innerHTML = "False";
    setTimeout(generateSequence([]),100);
}

function showRight() {
    count.innerHTML = "Right";
    setTimeout(generateSequence(numList), 200);
}

