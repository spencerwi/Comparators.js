if (typeof window === "undefined"){
    /* Running from a console spec runner in node */
    Comparators = require('./comparators.js');
}

describe("Comparators", function(){
    describe(".comparing(attr|fn)", function(){
        it("can take an attribute-name string to use as a comparator", function(){
            var comparatorMethod = Comparators.comparing("name");
            var shouldBeFirst  = {"name": "A"},
                shouldBeSecond = {"name": "B"},
                shouldBeThird  = {"name": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
        it("can take a compareTo-style function to use as a comparator", function(){
            var comparatorMethod = Comparators.comparing(function(first, second){
                if      (first.name.length > second.name.length) { return  1; }
                else if (first.name.length < second.name.length) { return -1; }
                else { return 0; }
            });
            var shouldBeFirst  = {"name": "short"},
                shouldBeSecond = {"name": "pretty long"},
                shouldBeThird  = {"name": "definitely the longest"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        })
    });

    describe(".thenComparing(attr|fn)", function(){
        it("chains from '.comparing(attr|fn)' and accepts an attribute-name string", function(){
            var comparatorMethod = Comparators.comparing("lastName").thenComparing("firstName");
            var shouldBeFirst  = {"firstName": "A", "lastName": "A"},
                shouldBeSecond = {"firstName": "B", "lastName": "A"},
                shouldBeThird  = {"firstName": "C", "lastName": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        });
        it("chains from '.comparing(attr|fn)' and accepts a compareTo-style function", function(){
            var comparatorMethod = Comparators.comparing("lastName").thenComparing(function(first, second){
                if      (first.firstName.length > second.firstName.length){ return  1; }
                else if (first.firstName.length < second.firstName.length){ return -1; }
                else { return 0; }
            });
            var shouldBeFirst  = {"firstName": "short",             "lastName": "A"},
                shouldBeSecond = {"firstName": "Rather long",       "lastName": "A"},
                shouldBeThird  = {"firstName": "Irrelevant length", "lastName": "C"};

            var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
            var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
            var actual = beforeSort.sort(comparatorMethod);
            expect(actual).toEqual(expected);
        })
    });
});
