/*
* @Author: elvischen
* @Date:   2017-03-01 17:05:57
* @Last Modified by:   elvischen
* @Last Modified time: 2017-03-01 18:43:48
*/

'use strict';

function makeFriendlyDates(arr) {
  var begin = readDate(arr[0]);
  // console.log(begin);
  var end = readDate(arr[1]);
  var result = [];
  if (arr[0] == arr[1]){
  	result.push(writeDate(begin));	
  	return result;
  }
  var numBegin = toNumDate(begin);
  var numEnd = toNumDate(end);
  if (ifInOneYear(numBegin,numEnd)){
  	if (numBegin[2] == 2016){
  		if (numBegin[1] == numEnd[1]){
  			// console.log(writeDate(begin,3));
  			result.push(writeDate(begin,2));
  			result.push(writeDate(end,1));
  		}
  		else {
  			result.push(writeDate(begin,2));
  			result.push(writeDate(end,2));
  		}
  	}
  	else {
  		if (numBegin[1] == numEnd[1]){
  			result.push(writeDate(begin,3));
  			result.push(writeDate(end,2));
  		}
  		else {
  			result.push(writeDate(begin,3));
  			result.push(writeDate(end,2));
  		}
  	}
  }
  else {
  	result.push(writeDate(begin));
  	result.push(writeDate(end));
  }
  return result;
}

function ifInOneYear(arr1,arr2){
	// console.log(arr1,arr2);
	if(arr2[2] - arr1[2] > 1) {
		return false;
	}
	else if (arr2[2] - arr1[2] === 1){
		if (arr2[1] > arr1[1]){
			return false;
		}
		else if (arr2[1] == arr1[1] && arr2[0] >= arr1[0]){
				return false; 
			}	
		} 
	// console.log("!!!");
	return true;
}

function toNumDate(arr) {
	var numArr = [];
	for (let i in arr) {
		numArr[i] = parseInt(arr[i],10);
	}
	return numArr;
}

function readDate(string) {
	var arr = string.split("-").reverse();
	return arr;
}

function writeDate(arr,num){
	var result,day,month = "";
	var dayNum = arr[0];
	var monNum = arr[1];
	var yearNum = arr[2];
	day = dayNum;
	if (day[0] == "0"){
		dayNum = dayNum[1];
		day = day[1];
	}
	switch(dayNum){
		case "1":
		case "21":
		case "31":
			day += "st";
			break;
		case "2":
		case "22":
			day += "nd";
			break;
		case "3":
		case "23":
			day += "rd";
			break;
		default:
			day += "th";
			break; 
	}
	switch(monNum){
		case "01":
			month = "January";
			break;
		case "02":
			month = "February";
			break;
		case "03":
			month = "March";
			break;
		case "04":
			month = "April";
			break;
		case "05":
			month = "May";
			break;
		case "06":
			month = "June";
			break;
		case "07":
			month = "July";
			break;
		case "08":
			month = "August";
			break;
		case "09":
			month = "September";
			break;
		case "10":
			month = "October";
			break;
		case "11":
			month = "November";
			break;
		case "12":
			month = "December"; 
			break;
	}
	switch (num){
		case 1: 
			return day;
		case 2:
			return month + " " + day;
		case 3: 
		case undefined:
			return month + " " + day + ", " + yearNum;
	}
}

