export const compareObjects = (a, b, compareBy) => {
    var left = compareBy(a);
    var right = compareBy(b);
    if (left === right) return 0;
    else return (left < right ? -1 : 1);
}