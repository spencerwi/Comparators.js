// Comparators.js
// ==============
if (typeof window === "undefined"){
    // If we're in a console (where `window` is undefined) it's probably node, so require the module.
    Comparators = require('./comparators.js');
}

describe("Comparators", function(){
    describe(".comparing(attr|fn)", function(){
        // Creating an "attr" comparator
        // -----------------------------
        it("accepts a string specifying the name of the attribute to use for comparison", function(){
            var shouldBeFirst  = {"name": "A"},
                shouldBeSecond = {"name": "B"},
                shouldBeThird  = {"name": "C"};

            // We can specify that we want to compare our demo objects by name simply by passing
            //  the string `"name"` to `.comparing`.
            var comparatorMethod = Comparators.comparing("name");


            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);

            expect(actual).toEqual(expected);
        });
        // Creating a "fn" comparator
        // --------------------------
        it("accepts an 'attribute-extractor' function that returns the attribute to use for comparison", function(){
            var shouldBeFirst  = {"name": "short"},
                shouldBeSecond = {"name": "pretty long"},
                shouldBeThird  = {"name": "definitely the longest"};

            // If the comparison key is a calculated value (or something that's not a direct property of each object in the array),
            //  we can create a chainable comparator that generates the comparison key using an anonymous function.
            // In this example, we want to sort by name length (largest to smallest)
            var comparatorMethod = Comparators.comparing(function(each){
                return each.name.length;
            });

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        })
    });

    describe(".thenComparing(attr|fn)", function(){
        // Chaining with an "attr" comparator
        // ----------------------------------
        it("chains from '.comparing(attr|fn)' and accepts an attribute-name string", function(){
            // As with `.comparing(attr)`, we can specify a comparison-key attribute just by passing in the
            //  attribute name as a string.
            // The advantage of `thenComparing(attr)` is that it lets us easily define a hierarchical multi-key sort.
            //
            // In this case, we sort alphabetically by lastName, then by firstName -- like an old phone book.
            var comparatorMethod = Comparators.comparing("lastName").thenComparing("firstName");
            var shouldBeFirst  = {"firstName": "A", "lastName": "A"},
                shouldBeSecond = {"firstName": "B", "lastName": "A"},
                shouldBeThird  = {"firstName": "C", "lastName": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
        // Chaining with a "fn" comparator
        // -------------------------------
        it("chains from '.comparing(attr|fn)' and accepts an attribute-extractor function", function(){
            // And as with `.comparing(fn)`, we can pass in a function that returns the comparison key
            //  when given each element of the method as a parameter. Functors are neat!
            //
            // This example also demonstrates that `(attr)` and `(fn)` comparators can be mixed-and-matched
            //  to produce the desired results.
            var comparatorMethod = Comparators.comparing("lastName").thenComparing(function(each){
                return each.firstName.length;
            });
            var shouldBeFirst  = {"firstName": "short",             "lastName": "A"},
                shouldBeSecond = {"firstName": "Rather long",       "lastName": "A"},
                shouldBeThird  = {"firstName": "Irrelevant length", "lastName": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        })

        // Multiple chains
        // ---------------
        it("can chain multiple comparison keys", function(){
            // Any point in the chain can be further chained, allowing you to easily
            //  create complex, multi-attribute comparison functions.
            var comparatorMethod = Comparators.comparing("lastName")
                                                .thenComparing("firstName")
                                                .thenComparing("age");

            var shouldBeFirst   = {lastName: "A", firstName: "A", age:24},
                shouldBeSecond  = {lastName: "A", firstName: "A", age:25},
                shouldBeThird   = {lastName: "A", firstName: "B", age:24},
                shouldBeFourth  = {lastName: "B", firstName: "A", age:24}

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
            var beforeSort = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
    });
});
