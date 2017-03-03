/**
 * Created by elvischen on 03/03/2017.
 */

function init() {
    var num = document.getElementsByClassName("num");
    console.log(num);
    var main = document.getElementById("main-screen");
    var sub = document.getElementById("subscreen");
    for (var i = 0; i < num.length; i++) {
        num[i].onclick = function() {
            if (main.length === 0){
                main.innerHTML = this.innerHTML;
            }
            sub.innerHTML += this.innerHTML;
        };
    }

    document.getElementById("equal").onclick = function() {
        var equation = sub.innerHTML;
        main.innerHTML = calEquation(equation);
        sub.innerHTML = "";
    }

    document.getElementById("ac").onclick = function() {
        main.innerHTML = "";
        sub.innerHTML = "";
    }
}

function calEquation(str) {
    var n = str.search(/[^0-9.]/);
    if (n !== -1){
        var operation = str[n];
        var num1 = parseFloat(str.substr(0,n));
        var num2 = parseFloat(str.substr(n+1,str.length));
        var division = String.fromCharCode(247);
        switch (operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case division:
                result = num1 / num2;
                break;
        }
    }
    else{
        result = string;
    }
    return result;
}
