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
