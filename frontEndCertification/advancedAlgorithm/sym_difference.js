function sym(args) {
  function findRepe(arr1,arr2){
    return function (element){
      return !((arr1.indexOf(element) != -1) && (arr2.indexOf(element) != -1));
    };
  }
  function rep(element,index,array) {
    if ( array.indexOf(element,index + 1) == -1){
      return true; 
    }
    else {return false;}
  }
  if (arguments.length > 2) {
    var res = [].slice.call(arguments);
    res[1] = sym(res[0],res[1]);
    res.shift();
    return sym(...res);
  }
  else {
  console.log(arguments);
  var arr1 = arguments[0], arr2 = arguments[1];
  arr1 = arr1.filter(rep); arr2 = arr2.filter(rep);
  var arr = arr1.concat(arr2);
  arr = arr.filter(findRepe(arr1,arr2));
  return arr;
  }
}
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]);