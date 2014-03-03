if (typeof window === "undefined"){
    /* Running from a console spec runner in node */
    Comparators = require('./comparators.js');
}

describe("Comparator", function(){
    describe(".comparing(attr)", function(){
        it("can take an attribute as a string to use as a comparator", function(){
            var comparatorMethod = Comparators.comparing("name");
            var shouldBeFirst  = {"name": "A"},
                shouldBeSecond = {"name": "B"},
                shouldBeThird  = {"name": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
    });

    describe(".thenComparing(attr)", function(){
        it("chains from a comparator created by '.comparing(attr)'", function(){
            var comparatorMethod = Comparators.comparing("lastName").thenComparing("firstName");
            var shouldBeFirst  = {"firstName": "A", "lastName": "A"},
                shouldBeSecond = {"firstName": "B", "lastName": "A"},
                shouldBeThird  = {"firstName": "C", "lastName": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
    });
});
