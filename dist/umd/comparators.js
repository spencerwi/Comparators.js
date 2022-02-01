(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Comparators = factory());
}(this, (function () { 'use strict';

    var buildComparisonStep = function (attrOrFunction, opts) {
        var reversed = (opts && opts.reversed);
        var comparatorFunction = function (firstItem, secondItem) {
            var comparisonValueOfFirstItem;
            var comparisonValueOfSecondItem;
            var result;
            if (typeof attrOrFunction === "function") {
                comparisonValueOfFirstItem = attrOrFunction(firstItem);
                comparisonValueOfSecondItem = attrOrFunction(secondItem);
            }
            else {
                comparisonValueOfFirstItem = firstItem[attrOrFunction];
                comparisonValueOfSecondItem = secondItem[attrOrFunction];
            }
            if (comparisonValueOfFirstItem > comparisonValueOfSecondItem) {
                if (reversed) {
                    result = -1;
                }
                else {
                    result = 1;
                }
            }
            else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) {
                if (reversed) {
                    result = 1;
                }
                else {
                    result = -1;
                }
            }
            else {
                if (comparatorFunction.nextStep != undefined) {
                    result = comparatorFunction.nextStep(firstItem, secondItem);
                }
                else {
                    result = 0;
                }
            }
            return result;
        };
        var lastStepInComparisonChain = comparatorFunction;
        comparatorFunction.thenComparing = function (attrOrFunction, opts) {
            lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction, opts);
            return this;
        };
        return comparatorFunction;
    };
    var Comparators = /** @class */ (function () {
        function Comparators() {
        }
        Comparators.comparing = function (attrOrFunction, opts) {
            return buildComparisonStep(attrOrFunction, opts);
        };
        return Comparators;
    }());
    if (!("undefined" === typeof window)) {
        window["Comparators"] = Comparators;
    }

    return Comparators;

})));
