(function(name, definition){
    /* Sweet module-wrapper code courtesy of https://github.com/ded/ (via StackOverflow) -- weird humor value-added */
    if (typeof module != 'undefined') {
        /* When in CommonJS, do as the Commoners do */
        module.exports = definition();
    } else if (typeof define == 'function' && typeof define.amd == 'object'){
        /* All Men Die */
        define(definition);
    } else {
        /* Browser's Castle */
        this[name] = definition();
    }
}('Comparators', function(){
    var buildComparator = function(attr){
        var comparatorFunction = function(first, second){
            var result;
            if      (first[attr] > second[attr]) { result =  1; }
            else if (first[attr] < second[attr]) { result = -1; }
            else {
                if (comparatorFunction.next == undefined) { result = 0;} 
                else                                      { result = comparatorFunction.next(first, second); }
            }
            return result;
        };
        comparatorFunction.thenComparing = function(attr){
            comparatorFunction.next = buildComparator(attr);
            return comparatorFunction;
        }
        return comparatorFunction;
    }

    return {
        comparing: buildComparator
    };
}));
