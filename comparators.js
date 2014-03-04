/* Sweet module-wrapper code courtesy of https://github.com/ded/ (via StackOverflow) -- weird humor value-added */
(function(name, definition){
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
}
('Comparators', function(){
    var buildComparator = function(attrOrFunction){
        var comparatorFunction = function(first, second){
            var result = 0,
                valFirst, valSecond;

            if (typeof attrOrFunction === "function"){
                valFirst = attrOrFunction(first);
                valSecond = attrOrFunction(second);
            } else {
                valFirst = first[attrOrFunction];
                valSecond = second[attrOrFunction];
            }

            if      (valFirst > valSecond) { result =  1; }
            else if (valFirst < valSecond) { result = -1; }
            else {
                if (comparatorFunction.next != undefined) {  result = comparatorFunction.next(first, second); } 
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
