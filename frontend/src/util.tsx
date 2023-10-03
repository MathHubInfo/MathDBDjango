type Comparison = string|number|Comparison[]
export function compareObjects<T,C extends Comparison>(a: T, b: T, compareBy: (t: T) => C): -1 | 1 | 0 {
    let left: Comparison = compareBy(a);
    let right: Comparison = compareBy(b);
    if (!!left && left.constructor === Array) { // is array
        if (right.constructor !== Array) {
            throw new Error('compareBy must return the same type for left and right');
        }
        
        let i = 0;
        while (i < left.length && left[i] === right[i]) { i++; }
        left = left[i];
        right = right[i];
    }
    if (left === right) return 0;
    else return (left < right ? -1 : 1);
}