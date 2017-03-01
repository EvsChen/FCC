function steamrollArray(arr) {
  // I'm a steamroller, baby 
  var array = [];
  function flatten(arr,array){
     function isEmpty(obj) {
        if (obj instanceof Array) {return false;}
        for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
            return false;
        }
        return true;
      }
     for (var i in arr) {
        if ( typeof arr[i] !== "object" || isEmpty(arr[i])){
          array.push(arr[i]);
        }
        else { flatten(arr[i],array); }
      }
    return array;
  } 
  flatten(arr,array);
  return array;
}

steamrollArray([1, [], [3, [[4]]]]);

// a much better way

var list1 = [[0, 1], [2, 3], [4, 5]];
var list2 = [0, [1, [2, [3, [4, [5]]]]]];

const flatten = arr => arr.reduce(
  (acc, val) => acc.concat(
    Array.isArray(val) ? flatten(val) : val
  ),
  []
);
flatten(list1); // returns [0, 1, 2, 3, 4, 5]
flatten(list2); // returns [0, 1, 2, 3, 4, 5]