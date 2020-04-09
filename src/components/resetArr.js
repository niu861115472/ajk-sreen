var spArray = function(N,Q)
{
    var R = [],F;
    for (F = 0;F < Q.length;) {
        R.push(Q.slice(F,F += N))
    }
    return R
}
 
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
console.log(spArray(5,arr))

export default spArray