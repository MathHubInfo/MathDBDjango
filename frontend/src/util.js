export const compareObjects = (a, b, compareBy) => {
    var left = compareBy(a);
    var right = compareBy(b);
    if (!!left && left.constructor === Array) { // is array
        var i = 0;
        while (i < left.length && left[i] === right[i]) { i++; }
        left = left[i];
        right = right[i];
    }
    if (left === right) return 0;
    else return (left < right ? -1 : 1);
}