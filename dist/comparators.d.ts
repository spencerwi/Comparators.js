export interface KeyExtractorFn<T> {
    (t: T): any;
}
export interface ComparatorOptions {
    reversed?: boolean;
}
export interface Comparator<T> {
    (a: T, b: T): number;
    thenComparing?(attrOrFunction: string | KeyExtractorFn<T>, opts?: ComparatorOptions): Comparator<T>;
}
export default class Comparators {
    static comparing<T>(attrOrFunction: string | KeyExtractorFn<T>, opts?: ComparatorOptions): Comparator<T>;
}
