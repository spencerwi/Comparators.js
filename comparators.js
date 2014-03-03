Comparators = (function(){
    var buildComparator = function(attr){
        var comparatorFunction = function(first, second){
            if      (first[attr] > second[attr]) { return  1; }
            else if (first[attr] < second[attr]) { return -1; }
            else                                 { return  0; }
        };
        comparatorFunction.thenComparing = buildComparator;
        return comparatorFunction;
    }
    return {
        comparing: function(attr){ return buildComparator(attr); }   
    }
})();

if (typeof exports !== 'undefined') {
    exports = Comparators;
}
