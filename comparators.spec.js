if (typeof window === "undefined"){
    /* Running from a console spec runner in node */
    Comparators = require('./comparators.js');
}

describe("comparing", function(){
    it("can take an attribute as a string to use as a comparator", function(){
        var comparatorMethod = Comparators.comparing("name");
        var shouldBeFirst  = {"name": "A"},
            shouldBeSecond = {"name": "B"},
            shouldBeThird  = {"name": "C"};

        var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        expect(beforeSort.sort(comparatorMethod)).toEqual(expected);
    });
});

describe("thenComparing", function(){
    it("chains from a comparator created by 'comparing'", function(){
        var comparatorMethod = Comparators.comparing("lastName").thenComparing("firstName");
        var shouldBeFirst  = {"lastName": "A", "firstName": "A"},
            shouldBeSecond = {"lastName": "A", "firstName": "B"},
            shouldBeThird  = {"lastName": "C", "firstName": "C"};

        var expected   = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        expect(beforeSort.sort(comparatorMethod)).toEqual(expected);
    });
});
