export interface KeyExtractorFn<T> {
    (t: T): any;
}

export interface ComparatorOptions {
    reversed?: boolean;
}

export interface Comparator<T> {
    (a: T, b: T): number;
    thenComparing?(attrOrFunction: string|KeyExtractorFn<T>, opts?: ComparatorOptions): Comparator<T>;
}
interface ComparatorInternal<T> extends Comparator<T> {
    nextStep?: Comparator<T>;
}

var buildComparisonStep = < T >(attrOrFunction: string|KeyExtractorFn<T>, opts:ComparatorOptions): Comparator<T> => {
    const reversed: boolean = (opts && opts.reversed);
    var comparatorFunction: ComparatorInternal<T> = (firstItem: T, secondItem: T): number => {
        let comparisonValueOfFirstItem: any;
        let comparisonValueOfSecondItem: any;
        let result: number;
        if (typeof attrOrFunction === "function"){
            comparisonValueOfFirstItem  = attrOrFunction(firstItem);
            comparisonValueOfSecondItem = attrOrFunction(secondItem);
        } else {
            comparisonValueOfFirstItem = firstItem[<string>attrOrFunction];
            comparisonValueOfSecondItem = secondItem[<string>attrOrFunction];
        }
        if (comparisonValueOfFirstItem > comparisonValueOfSecondItem) {
            if (reversed) { result = -1; }
            else          { result = 1;  }
        } else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) {
            if (reversed){ result =  1;}
            else         { result = -1; }
        } else {
            if (comparatorFunction.nextStep != undefined) { result = comparatorFunction.nextStep(firstItem, secondItem); }
            else { result = 0; }
        }
        return result;
    }
    let lastStepInComparisonChain = comparatorFunction;
    comparatorFunction.thenComparing = function(attrOrFunction, opts) {
        lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction, opts);
        return this;
    }
    return comparatorFunction;
}

export default class Comparators {
    public static comparing<T>(attrOrFunction: string|KeyExtractorFn<T>, opts?: ComparatorOptions) {
        return buildComparisonStep<T>(attrOrFunction, opts);
    }
}
