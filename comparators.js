/* Comparators.js 1.0.0 
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
    var buildComparisonStep = function(attrOrFunction){
        var comparatorFunction = function(firstItem, secondItem){
            var result, comparisonValueOfFirstItem, comparisonValueOfSecondItem;
            if (typeof attrOrFunction === "function"){
                comparisonValueOfFirstItem  = attrOrFunction(firstItem);
                comparisonValueOfSecondItem = attrOrFunction(secondItem);
            } else {
                comparisonValueOfFirstItem  = firstItem[attrOrFunction];
                comparisonValueOfSecondItem = secondItem[attrOrFunction];
            }

            if      (comparisonValueOfFirstItem > comparisonValueOfSecondItem) { result =  1; }
            else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) { result = -1; }
            else {
                if (comparatorFunction.nextStep != undefined) {  result = comparatorFunction.nextStep(firstItem, secondItem); } 
                else { result = 0; }
            }
            return result;
        };

        var lastStepInComparisonChain = comparatorFunction;
        comparatorFunction.thenComparing = function(attrOrFunction){
            lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction);
            return this;
        }

        return comparatorFunction;
    }

    return { comparing: buildComparisonStep };
}));
