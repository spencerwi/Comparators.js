declare module Comparators {
  type KeyExtractorFn<T> = (x: T)=>any;
  interface ComparatorsStatic {
    comparing<T>(attrOrFunction: string|KeyExtractorFn<T>, opts?: ComparatorOptions): Comparator<T>;
  }
  interface Comparator<T> {
    (a: T, b: T): number;
    thenComparing(attrOrFunction: string|Function, opts?: ComparatorOptions): Comparator<T>;
  }
  interface ComparatorOptions {
    reversed?: boolean;
  }
}

declare var Comparators: Comparators.ComparatorsStatic;
