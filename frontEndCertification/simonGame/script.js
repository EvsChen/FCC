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
var startText = document.getElementById("start-text");
var list = [red,blue,green,yellow];
var clickSequence = [];
var numList = [];
var timeID = 0;


checkbox.onclick = function () {
    if (this.checked){
        start.onclick = startGame;
        for (let i = 0; i < 4; i++){
            list[i].onmousedown =fade;
            list[i].onmouseup = unfade;
        }
    }
    else {
        start.onclick = null;
        count.innerHTML = "";
        for (let i = 0; i < 4; i++){
            list[i].onmousedown = null;
            list[i].onmouseup = null;
            list[i].onclick = null;
        }
        clearInterval(timeID);
    }
}

function startGame() {
    generateSequence([]);
    startText.innerHTML = "Reset:";
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
    console.log(numList.length);
    count.innerHTML = numList.length;
    simuClickTime(numList,time);
    for (let i = 0; i < 4; i++){
        list[i].onclick = checkInput;
    }
}

function simuClickTime(array,time) {
    var i = 0;
    timeID = setInterval(function () {
        list[array[i]].style.opacity = 0.6;
        setTimeout(function () {
            list[array[i]].style.opacity = 1;
            i++;
        },time);
        if (i == array.length - 1){
            clearInterval(timeID);
        }
    },100+time);
}

function fade() {
    this.style.opacity = 0.6;
}
function unfade() {
    this.style.opacity = 1;
}

function checkInput() {
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
    console.log("false!");
    setTimeout(function(){
        generateSequence([]);
    },1000);
}

function showRight() {
    count.innerHTML = "Right";
    console.log("right!");
    if (numList.length == 20){
        count.innerHTML = "You win!";
    }
    else{
        setTimeout(function () {
            generateSequence(numList);
        },500);
    }
}

