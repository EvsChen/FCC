/**
 * Created by elvischen on 05/03/2017.
 */
var min = document.getElementById("min");
var sec = document.getElementById("sec");
var box = document.getElementById("box");
var button = document.getElementById("startstop");
var minSet = 25;
var secSet = 0;
var stopFlag = 0;
var x;

function startstop() {
    if (button.value == "1") {
        timer();
        button.innerHTML = "Parse";
        button.value = "0";
    }
    else {
        stopTimer();
        button.innerHTML = "Resume";
        button.value = "1";
    }
}


function timer() {
    var startTime = Date.now();
    var startMin = parseInt(min.innerHTML,10);
    var startSec = parseInt(sec.innerHTML,10);
    var totalSec = startMin * 60 + startSec;
    var totalSecSet = minSet * 60 + secSet;
    var taskName = document.getElementById("input-task-box").value;
    if (stopFlag === 0 && taskName !== "Enter task name"){
        var newSpan = document.createElement("span");
        var newTask = document.createTextNode(taskName);
        var list = document.getElementById("goal-list");
        var inputBox = document.getElementById("task-box");
        newSpan.className = "goal-item";
        newSpan.appendChild(newTask);
        console.log(newSpan);
        list.insertBefore(newSpan,inputBox);
    }
    stopFlag = 0;
    x = setInterval(
        function () {
            var now = Date.now();
            var lapse = Math.round((now - startTime)/1000);
            box.style.height = lapse/totalSecSet * 280 + 'px';
            var diff = totalSec - lapse;
            if (diff === 0) {
                stopTimer();
                stopFlag = 0;
            }
            var newSec = diff % 60;
            newSec < 10 ? newSec = "0" + newSec: newSec;
            var newMin = Math.round((diff - newSec)/60);
            min.innerHTML = newMin;
            sec.innerHTML = newSec;
        }
        ,1000);
}


function stopTimer() {
    clearInterval(x);
    stopFlag = 1;
}

function reset() {
    clearInterval(x);
    document.getElementById("input-task-box").value = "Enter task name";
    stopFlag = 0;
    box.style.height = 0;
    min.innerHTML = minSet;
    sec.innerHTML = "00";
    button.value = "1";
    button.innerHTML = "Start";
}

function plus() {
    reset();
    minSet ++;
    min.innerHTML = minSet;
}

function minus() {
    reset();
    minSet === 1 ?  minSet : minSet--;
    min.innerHTML = minSet;
}

function checkInput() {
    var taskName = document.getElementById("input-task-box").value;
    // alert("taskname is " + taskName);
    taskName == "" ? document.getElementById("input-task-box").value = "Enter task name" : taskName;
}

function submitInput() {
    timer();
    button.innerHTML = "Parse";
    button.value = "0";
    document.getElementById("input-task-box").value = "Enter task name";
}