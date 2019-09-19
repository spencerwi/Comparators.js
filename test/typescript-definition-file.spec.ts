import { Comparator } from "../dist/commonjs/comparators";
import Comparators from "../dist/commonjs/comparators";
import { suite, test } from "mocha-typescript";
import { expect } from "chai";

type HasName = {name : string}
type HasNameAndDob = {name: string, dob: string}
type FirstAndLast = {firstName: string,lastName: string}
type Person = {firstName: string, lastName: string, age: number}

@suite
class TypescriptComparatorsTests {
	@test creatingAttrComparator() {
		let shouldBeFirst  : HasName = {"name": "A"},
			shouldBeSecond : HasName = {"name": "B"},
			shouldBeThird  : HasName = {"name": "C"};

		let comparatorMethod : Comparator<HasName> = Comparators.comparing("name");

		let expected   : Array<HasName> = [shouldBeFirst, shouldBeSecond, shouldBeThird];
		let beforeSort : Array<HasName> = [shouldBeSecond, shouldBeFirst, shouldBeThird];
		let actual     : Array<HasName> = beforeSort.sort(comparatorMethod);

		expect(actual).to.deep.equal(expected);
	}

	@test creatingFnComparator() {
        let shouldBeFirst  : HasName = {"name": "short"},
            shouldBeSecond : HasName = {"name": "pretty long"},
            shouldBeThird  : HasName = {"name": "definitely the longest"};

		let comparatorMethod : Comparator<HasName> = Comparators.comparing((each : HasName) => each.name.length);

		let expected   : Array<HasName> = [shouldBeFirst, shouldBeSecond, shouldBeThird];
		let beforeSort : Array<HasName> = [shouldBeSecond, shouldBeFirst, shouldBeThird];
		let actual     : Array<HasName> = beforeSort.sort(comparatorMethod);

		expect(actual).to.deep.equal(expected);
	}

	@test reversingComparisonDirection() {
        let shouldBeFirst  : HasNameAndDob = {"name": "C", dob: "2000-03-03"},
            shouldBeSecond : HasNameAndDob = {"name": "B", dob: "2000-02-02"},
            shouldBeThird  : HasNameAndDob = {"name": "A", dob: "2000-01-01"};

		var comparatorMethod : Comparator<HasNameAndDob> = Comparators.comparing('name', {reversed: true});

		let expected   : Array<HasName> = [shouldBeFirst, shouldBeSecond, shouldBeThird];
		let beforeSort : Array<HasName> = [shouldBeSecond, shouldBeFirst, shouldBeThird];
		let actual     : Array<HasName> = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);


		var comparatorMethod : Comparator<HasNameAndDob> = Comparators.comparing((each : HasNameAndDob) => new Date(each.dob), {reversed: true});
        actual = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);
	}

}

@suite class ThenComparingTest {

	@test chainingWithAttr() {
		let comparatorMethod : Comparator<FirstAndLast> = Comparators.comparing("lastName").thenComparing("firstName");
        let shouldBeFirst  : FirstAndLast = {"firstName": "A", "lastName": "A"},
        	shouldBeSecond : FirstAndLast = {"firstName": "B", "lastName": "A"},
            shouldBeThird  : FirstAndLast = {"firstName": "C", "lastName": "C"};

		let expected   : Array<FirstAndLast> = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        let beforeSort : Array<FirstAndLast> = [shouldBeSecond, shouldBeFirst, shouldBeThird];
		let actual : Array<FirstAndLast> = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);
	}

	@test chainingWithFn() {
		let comparatorMethod : Comparator<FirstAndLast> = Comparators.comparing("lastName").thenComparing((each : FirstAndLast) => each.firstName.length);

        let shouldBeFirst  : FirstAndLast = {"firstName": "short",             "lastName": "A"},
        	shouldBeSecond : FirstAndLast = {"firstName": "Rather long",       "lastName": "A"},
            shouldBeThird  : FirstAndLast = {"firstName": "Irrelevant length", "lastName": "C"};

		let expected   : Array<FirstAndLast> = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        let beforeSort : Array<FirstAndLast> = [shouldBeSecond, shouldBeFirst, shouldBeThird];
		let actual : Array<FirstAndLast> = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);
	}

	@test chainingMultipleKeys() {
		let comparatorMethod : Comparator<Person> = Comparators.comparing("lastName")
            .thenComparing("firstName")
            .thenComparing("age");

        let shouldBeFirst  : Person = {lastName: "A", firstName: "A", age:24},
        	shouldBeSecond : Person = {lastName: "A", firstName: "A", age:25},
            shouldBeThird  : Person = {lastName: "A", firstName: "B", age:24},
            shouldBeFourth : Person = {lastName: "B", firstName: "A", age:24};

		let expected   : Array<Person> = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
        let beforeSort : Array<Person> = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
		let actual : Array<Person> = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);
	}

	@test chainingWithMixedDirections() {
		let comparatorMethod : Comparator<Person> = Comparators.comparing("lastName")
			.thenComparing("firstName", {reversed: true})
			.thenComparing("age");

        let shouldBeFirst  : Person = {lastName: "A", firstName: "B", age:24},
			shouldBeSecond : Person = {lastName: "A", firstName: "A", age:24},
            shouldBeThird  : Person = {lastName: "A", firstName: "A", age:25},
            shouldBeFourth : Person = {lastName: "B", firstName: "A", age:24};

		let expected   : Array<Person> = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
        let beforeSort : Array<Person> = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
		let actual : Array<Person> = beforeSort.sort(comparatorMethod);
		expect(actual).to.deep.equal(expected);
	}
}

