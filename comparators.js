/* Comparators.js 1.1.0 
 * http://spencerwi.github.io/Comparators.js
 * (c) 2014 Spencer Williams
 * Comparators.js may be freely distributed under the MIT license. */
(function(name, definition){
    if (typeof module != 'undefined') {
        module.exports = definition();
    } else if (typeof define == 'function' && typeof define.amd == 'object'){
        define(definition);
    } else {
        this[name] = definition();
    }
}
('Comparators', function(){
    var buildComparisonStep = function(attrOrFunction, opts){
        var reversed = (opts && opts.reversed);
        var comparatorFunction = function(firstItem, secondItem){
            var result, comparisonValueOfFirstItem, comparisonValueOfSecondItem;
            if (typeof attrOrFunction === "function"){
                comparisonValueOfFirstItem  = attrOrFunction(firstItem);
                comparisonValueOfSecondItem = attrOrFunction(secondItem);
            } else {
                comparisonValueOfFirstItem  = firstItem[attrOrFunction];
                comparisonValueOfSecondItem = secondItem[attrOrFunction];
            }

            if (comparisonValueOfFirstItem > comparisonValueOfSecondItem) { 
                if (reversed){ result = -1;}
                else         { result =  1; }
            }
            else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) { 
                if (reversed){ result =  1;}
                else         { result = -1; }
            }
            else {
                if (comparatorFunction.nextStep != undefined) {  result = comparatorFunction.nextStep(firstItem, secondItem); } 
                else { result = 0; }
            }
            return result;
        };

        var lastStepInComparisonChain = comparatorFunction;
        comparatorFunction.thenComparing = function(attrOrFunction, opts){
            lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction, opts);
            return this;
        };

        return comparatorFunction;
    };

    return { comparing: buildComparisonStep };
}));
