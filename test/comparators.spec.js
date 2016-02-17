// Comparators.js
// ==============
var Comparators = require("../dist/comparators").default;
var painless = require('painless');
var assert = painless.assert;

var comparatorsComparing = painless.createGroup("Comparators.comparing(attr|fn)");
var comparatorThenComparing = painless.createGroup(".thenComparing(attr|fn)");

// Creating an "attr" comparator
// -----------------------------
comparatorsComparing("accepts a string specifying the name of the attribute to use for comparison", function(){
    var shouldBeFirst  = {"name": "A"},
    shouldBeSecond = {"name": "B"},
    shouldBeThird  = {"name": "C"};

    // We can specify that we want to compare our demo objects by name simply by passing
    //  the string `"name"` to `.comparing`.
    var comparatorMethod = Comparators.comparing("name");


    var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
    var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
    var actual = beforeSort.sort(comparatorMethod);

    assert.deepEqual(actual, expected);
});
// Creating a "fn" comparator
// --------------------------
comparatorsComparing("accepts an 'attribute-extractor' function that returns the attribute to use for comparison", function(){
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
    assert.deepEqual(actual, expected);
});

// Reversing comparison direction
// -------------------------------
comparatorsComparing("accepts a second options parameter that allows reversing comparison results", function(){
    var shouldBeFirst  = {"name": "C", dob: "2000-03-03"},
    shouldBeSecond = {"name": "B", dob: "2000-02-02"},
    shouldBeThird  = {"name": "A", dob: "2000-01-01"};

    // Sometimes, you want to sort things in reverse order.
    // This can be done by including an options object as a second parameter, with `reversed` set to `true`
    // In this example, we want to sort by name in reverse order.
    var comparatorMethod = Comparators.comparing('name', {reversed: true});

    var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
    var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
    var actual = beforeSort.sort(comparatorMethod);
    assert.deepEqual(actual, expected);

    var comparatorMethod = Comparators.comparing(function(each){
        return new Date(each.dob);
    }, {reversed: true});
    actual = beforeSort.sort(comparatorMethod);
    assert.deepEqual(actual, expected);
});

// Chaining with an "attr" comparator
// ----------------------------------
comparatorThenComparing("chains from '.comparing(attr|fn)' and accepts an attribute-name string", function(){
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
    assert.deepEqual(actual, expected);
});
// Chaining with a "fn" comparator
// -------------------------------
comparatorThenComparing("chains from '.comparing(attr|fn)' and accepts an attribute-extractor function", function(){
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
    assert.deepEqual(actual, expected);
});

// Multiple chains
// ---------------
comparatorThenComparing("can chain multiple comparison keys", function(){
    // Any point in the chain can be further chained, allowing you to easily
    //  create complex, multi-attribute comparison functions.
    var comparatorMethod = Comparators.comparing("lastName")
        .thenComparing("firstName")
        .thenComparing("age");

    var shouldBeFirst   = {lastName: "A", firstName: "A", age:24},
    shouldBeSecond  = {lastName: "A", firstName: "A", age:25},
        shouldBeThird   = {lastName: "A", firstName: "B", age:24},
        shouldBeFourth  = {lastName: "B", firstName: "A", age:24};

    var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
    var beforeSort = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
    var actual = beforeSort.sort(comparatorMethod);
    assert.deepEqual(actual, expected);
});

// Multiple chains
// ---------------
comparatorThenComparing("can chain multiple comparison keys with mixed directions", function(){
    // Any point in the chain can be sorted in normal or reverse order.
    var comparatorMethod = Comparators.comparing("lastName")
        .thenComparing("firstName", {reversed: true})
        .thenComparing("age");

    var shouldBeFirst  = {lastName: "A", firstName: "B", age:24},
    shouldBeSecond = {lastName: "A", firstName: "A", age:24},
        shouldBeThird  = {lastName: "A", firstName: "A", age:25},
        shouldBeFourth = {lastName: "B", firstName: "A", age:24};

    var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
    var beforeSort = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
    var actual = beforeSort.sort(comparatorMethod);
    assert.deepEqual(actual, expected);
});
