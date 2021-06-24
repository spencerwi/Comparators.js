"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var comparators_1 = __importDefault(require("../dist/commonjs/comparators"));
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require("chai");
var TypescriptComparatorsTests = /** @class */ (function () {
    function TypescriptComparatorsTests() {
    }
    TypescriptComparatorsTests.prototype.creatingAttrComparator = function () {
        var shouldBeFirst = { "name": "A" }, shouldBeSecond = { "name": "B" }, shouldBeThird = { "name": "C" };
        var comparatorMethod = comparators_1.default.comparing("name");
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    TypescriptComparatorsTests.prototype.creatingFnComparator = function () {
        var shouldBeFirst = { "name": "short" }, shouldBeSecond = { "name": "pretty long" }, shouldBeThird = { "name": "definitely the longest" };
        var comparatorMethod = comparators_1.default.comparing(function (each) { return each.name.length; });
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    TypescriptComparatorsTests.prototype.reversingComparisonDirection = function () {
        var shouldBeFirst = { "name": "C", dob: "2000-03-03" }, shouldBeSecond = { "name": "B", dob: "2000-02-02" }, shouldBeThird = { "name": "A", dob: "2000-01-01" };
        var comparatorMethod = comparators_1.default.comparing('name', { reversed: true });
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
        var comparatorMethod = comparators_1.default.comparing(function (each) { return new Date(each.dob); }, { reversed: true });
        actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    __decorate([
        mocha_1.test
    ], TypescriptComparatorsTests.prototype, "creatingAttrComparator", null);
    __decorate([
        mocha_1.test
    ], TypescriptComparatorsTests.prototype, "creatingFnComparator", null);
    __decorate([
        mocha_1.test
    ], TypescriptComparatorsTests.prototype, "reversingComparisonDirection", null);
    TypescriptComparatorsTests = __decorate([
        mocha_1.suite
    ], TypescriptComparatorsTests);
    return TypescriptComparatorsTests;
}());
var ThenComparingTest = /** @class */ (function () {
    function ThenComparingTest() {
    }
    ThenComparingTest.prototype.chainingWithAttr = function () {
        var comparatorMethod = comparators_1.default.comparing("lastName").thenComparing("firstName");
        var shouldBeFirst = { "firstName": "A", "lastName": "A" }, shouldBeSecond = { "firstName": "B", "lastName": "A" }, shouldBeThird = { "firstName": "C", "lastName": "C" };
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    ThenComparingTest.prototype.chainingWithFn = function () {
        var comparatorMethod = comparators_1.default.comparing("lastName").thenComparing(function (each) { return each.firstName.length; });
        var shouldBeFirst = { "firstName": "short", "lastName": "A" }, shouldBeSecond = { "firstName": "Rather long", "lastName": "A" }, shouldBeThird = { "firstName": "Irrelevant length", "lastName": "C" };
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird];
        var beforeSort = [shouldBeSecond, shouldBeFirst, shouldBeThird];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    ThenComparingTest.prototype.chainingMultipleKeys = function () {
        var comparatorMethod = comparators_1.default.comparing("lastName")
            .thenComparing("firstName")
            .thenComparing("age");
        var shouldBeFirst = { lastName: "A", firstName: "A", age: 24 }, shouldBeSecond = { lastName: "A", firstName: "A", age: 25 }, shouldBeThird = { lastName: "A", firstName: "B", age: 24 }, shouldBeFourth = { lastName: "B", firstName: "A", age: 24 };
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
        var beforeSort = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    ThenComparingTest.prototype.chainingWithMixedDirections = function () {
        var comparatorMethod = comparators_1.default.comparing("lastName")
            .thenComparing("firstName", { reversed: true })
            .thenComparing("age");
        var shouldBeFirst = { lastName: "A", firstName: "B", age: 24 }, shouldBeSecond = { lastName: "A", firstName: "A", age: 24 }, shouldBeThird = { lastName: "A", firstName: "A", age: 25 }, shouldBeFourth = { lastName: "B", firstName: "A", age: 24 };
        var expected = [shouldBeFirst, shouldBeSecond, shouldBeThird, shouldBeFourth];
        var beforeSort = [shouldBeThird, shouldBeFourth, shouldBeSecond, shouldBeFirst];
        var actual = beforeSort.sort(comparatorMethod);
        chai_1.expect(actual).to.deep.equal(expected);
    };
    __decorate([
        mocha_1.test
    ], ThenComparingTest.prototype, "chainingWithAttr", null);
    __decorate([
        mocha_1.test
    ], ThenComparingTest.prototype, "chainingWithFn", null);
    __decorate([
        mocha_1.test
    ], ThenComparingTest.prototype, "chainingMultipleKeys", null);
    __decorate([
        mocha_1.test
    ], ThenComparingTest.prototype, "chainingWithMixedDirections", null);
    ThenComparingTest = __decorate([
        mocha_1.suite
    ], ThenComparingTest);
    return ThenComparingTest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC1kZWZpbml0aW9uLWZpbGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQtZGVmaW5pdGlvbi1maWxlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2RUFBdUQ7QUFDdkQseUNBQThDO0FBQzlDLDZCQUE4QjtBQVE5QjtJQUFBO0lBK0NBLENBQUM7SUE5Q00sMkRBQXNCLEdBQXRCO1FBQ0wsSUFBSSxhQUFhLEdBQWMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEVBQzNDLGNBQWMsR0FBYSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFDeEMsYUFBYSxHQUFjLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBRTFDLElBQUksZ0JBQWdCLEdBQXlCLHFCQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNFLElBQUksUUFBUSxHQUFzQixDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakYsSUFBSSxVQUFVLEdBQW9CLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRixJQUFJLE1BQU0sR0FBd0IsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBFLGFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUsseURBQW9CLEdBQXBCO1FBQ0MsSUFBSSxhQUFhLEdBQWMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEVBQzVDLGNBQWMsR0FBYSxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUMsRUFDbEQsYUFBYSxHQUFjLEVBQUMsTUFBTSxFQUFFLHdCQUF3QixFQUFDLENBQUM7UUFFeEUsSUFBSSxnQkFBZ0IsR0FBeUIscUJBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxJ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QyxFQUFFLEVBQUMsRUFDeEQsYUFBYSxHQUFhLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsRUFDakUsY0FBYyxHQUFZLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxFQUFFLEVBQUMsQ0FBQztRQUU1RSxJQUFJLFFBQVEsR0FBcUIsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUMxRixJQUFJLFVBQVUsR0FBbUIsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN0RyxJQUFJLE1BQU0sR0FBbUIsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELGFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBdkRLO1FBQUwsWUFBSTs2REFVSjtJQUVLO1FBQUwsWUFBSTsyREFXSjtJQUVLO1FBQUwsWUFBSTtpRUFjSjtJQUVLO1FBQUwsWUFBSTt3RUFjSjtJQXpEVyxpQkFBaUI7UUFBN0IsYUFBSztPQUFPLGlCQUFpQixDQTBEN0I7SUFBRCx3QkFBQztDQUFBLEFBMURNLElBMEROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyYXRvciB9IGZyb20gXCIuLi9kaXN0L2NvbW1vbmpzL2NvbXBhcmF0b3JzXCI7XG5pbXBvcnQgQ29tcGFyYXRvcnMgZnJvbSBcIi4uL2Rpc3QvY29tbW9uanMvY29tcGFyYXRvcnNcIjtcbmltcG9ydCB7IHN1aXRlLCB0ZXN0IH0gZnJvbSBcIkB0ZXN0ZGVjay9tb2NoYVwiO1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSBcImNoYWlcIjtcblxudHlwZSBIYXNOYW1lID0ge25hbWUgOiBzdHJpbmd9XG50eXBlIEhhc05hbWVBbmREb2IgPSB7bmFtZTogc3RyaW5nLCBkb2I6IHN0cmluZ31cbnR5cGUgRmlyc3RBbmRMYXN0ID0ge2ZpcnN0TmFtZTogc3RyaW5nLGxhc3ROYW1lOiBzdHJpbmd9XG50eXBlIFBlcnNvbiA9IHtmaXJzdE5hbWU6IHN0cmluZywgbGFzdE5hbWU6IHN0cmluZywgYWdlOiBudW1iZXJ9XG5cbkBzdWl0ZVxuY2xhc3MgVHlwZXNjcmlwdENvbXBhcmF0b3JzVGVzdHMge1xuXHRAdGVzdCBjcmVhdGluZ0F0dHJDb21wYXJhdG9yKCkge1xuXHRcdGxldCBzaG91bGRCZUZpcnN0ICA6IEhhc05hbWUgPSB7XCJuYW1lXCI6IFwiQVwifSxcblx0XHRcdHNob3VsZEJlU2Vjb25kIDogSGFzTmFtZSA9IHtcIm5hbWVcIjogXCJCXCJ9LFxuXHRcdFx0c2hvdWxkQmVUaGlyZCAgOiBIYXNOYW1lID0ge1wibmFtZVwiOiBcIkNcIn07XG5cblx0XHRsZXQgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8SGFzTmFtZT4gPSBDb21wYXJhdG9ycy5jb21wYXJpbmcoXCJuYW1lXCIpO1xuXG5cdFx0bGV0IGV4cGVjdGVkICAgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGJlZm9yZVNvcnQgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGFjdHVhbCAgICAgOiBBcnJheTxIYXNOYW1lPiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblxuXHRcdGV4cGVjdChhY3R1YWwpLnRvLmRlZXAuZXF1YWwoZXhwZWN0ZWQpO1xuXHR9XG5cblx0QHRlc3QgY3JlYXRpbmdGbkNvbXBhcmF0b3IoKSB7XG4gICAgICAgIGxldCBzaG91bGRCZUZpcnN0ICA6IEhhc05hbWUgPSB7XCJuYW1lXCI6IFwic2hvcnRcIn0sXG4gICAgICAgICAgICBzaG91bGRCZVNlY29uZCA6IEhhc05hbWUgPSB7XCJuYW1lXCI6IFwicHJldHR5IGxvbmdcIn0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IEhhc05hbWUgPSB7XCJuYW1lXCI6IFwiZGVmaW5pdGVseSB0aGUgbG9uZ2VzdFwifTtcblxuXHRcdGxldCBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxIYXNOYW1lPiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZygoZWFjaCA6IEhhc05hbWUpID0+IGVhY2gubmFtZS5sZW5ndGgpO1xuXG5cdFx0bGV0IGV4cGVjdGVkICAgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGJlZm9yZVNvcnQgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGFjdHVhbCAgICAgOiBBcnJheTxIYXNOYW1lPiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblxuXHRcdGV4cGVjdChhY3R1YWwpLnRvLmRlZXAuZXF1YWwoZXhwZWN0ZWQpO1xuXHR9XG5cblx0QHRlc3QgcmV2ZXJzaW5nQ29tcGFyaXNvbkRpcmVjdGlvbigpIHtcbiAgICAgICAgbGV0IHNob3VsZEJlRmlyc3QgIDogSGFzTmFtZUFuZERvYiA9IHtcIm5hbWVcIjogXCJDXCIsIGRvYjogXCIyMDAwLTAzLTAzXCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVTZWNvbmQgOiBIYXNOYW1lQW5kRG9iID0ge1wibmFtZVwiOiBcIkJcIiwgZG9iOiBcIjIwMDAtMDItMDJcIn0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IEhhc05hbWVBbmREb2IgPSB7XCJuYW1lXCI6IFwiQVwiLCBkb2I6IFwiMjAwMC0wMS0wMVwifTtcblxuXHRcdHZhciBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxIYXNOYW1lQW5kRG9iPiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZygnbmFtZScsIHtyZXZlcnNlZDogdHJ1ZX0pO1xuXG5cdFx0bGV0IGV4cGVjdGVkICAgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGJlZm9yZVNvcnQgOiBBcnJheTxIYXNOYW1lPiA9IFtzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGFjdHVhbCAgICAgOiBBcnJheTxIYXNOYW1lPiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblxuXG5cdFx0dmFyIGNvbXBhcmF0b3JNZXRob2QgOiBDb21wYXJhdG9yPEhhc05hbWVBbmREb2I+ID0gQ29tcGFyYXRvcnMuY29tcGFyaW5nKChlYWNoIDogSGFzTmFtZUFuZERvYikgPT4gbmV3IERhdGUoZWFjaC5kb2IpLCB7cmV2ZXJzZWQ6IHRydWV9KTtcbiAgICAgICAgYWN0dWFsID0gYmVmb3JlU29ydC5zb3J0KGNvbXBhcmF0b3JNZXRob2QpO1xuXHRcdGV4cGVjdChhY3R1YWwpLnRvLmRlZXAuZXF1YWwoZXhwZWN0ZWQpO1xuXHR9XG5cbn1cblxuQHN1aXRlIGNsYXNzIFRoZW5Db21wYXJpbmdUZXN0IHtcblxuXHRAdGVzdCBjaGFpbmluZ1dpdGhBdHRyKCkge1xuXHRcdGxldCBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxGaXJzdEFuZExhc3Q+ID0gQ29tcGFyYXRvcnMuY29tcGFyaW5nKFwibGFzdE5hbWVcIikudGhlbkNvbXBhcmluZyhcImZpcnN0TmFtZVwiKTtcbiAgICAgICAgbGV0IHNob3VsZEJlRmlyc3QgIDogRmlyc3RBbmRMYXN0ID0ge1wiZmlyc3ROYW1lXCI6IFwiQVwiLCBcImxhc3ROYW1lXCI6IFwiQVwifSxcbiAgICAgICAgXHRzaG91bGRCZVNlY29uZCA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcIkJcIiwgXCJsYXN0TmFtZVwiOiBcIkFcIn0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcIkNcIiwgXCJsYXN0TmFtZVwiOiBcIkNcIn07XG5cblx0XHRsZXQgZXhwZWN0ZWQgICA6IEFycmF5PEZpcnN0QW5kTGFzdD4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmRdO1xuICAgICAgICBsZXQgYmVmb3JlU29ydCA6IEFycmF5PEZpcnN0QW5kTGFzdD4gPSBbc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlRmlyc3QsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBhY3R1YWwgOiBBcnJheTxGaXJzdEFuZExhc3Q+ID0gYmVmb3JlU29ydC5zb3J0KGNvbXBhcmF0b3JNZXRob2QpO1xuXHRcdGV4cGVjdChhY3R1YWwpLnRvLmRlZXAuZXF1YWwoZXhwZWN0ZWQpO1xuXHR9XG5cblx0QHRlc3QgY2hhaW5pbmdXaXRoRm4oKSB7XG5cdFx0bGV0IGNvbXBhcmF0b3JNZXRob2QgOiBDb21wYXJhdG9yPEZpcnN0QW5kTGFzdD4gPSBDb21wYXJhdG9ycy5jb21wYXJpbmcoXCJsYXN0TmFtZVwiKS50aGVuQ29tcGFyaW5nKChlYWNoIDogRmlyc3RBbmRMYXN0KSA9PiBlYWNoLmZpcnN0TmFtZS5sZW5ndGgpO1xuXG4gICAgICAgIGxldCBzaG91bGRCZUZpcnN0ICA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcInNob3J0XCIsICAgICAgICAgICAgIFwibGFzdE5hbWVcIjogXCJBXCJ9LFxuICAgICAgICBcdHNob3VsZEJlU2Vjb25kIDogRmlyc3RBbmRMYXN0ID0ge1wiZmlyc3ROYW1lXCI6IFwiUmF0aGVyIGxvbmdcIiwgICAgICAgXCJsYXN0TmFtZVwiOiBcIkFcIn0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcIklycmVsZXZhbnQgbGVuZ3RoXCIsIFwibGFzdE5hbWVcIjogXCJDXCJ9O1xuXG5cdFx0bGV0IGV4cGVjdGVkICAgOiBBcnJheTxGaXJzdEFuZExhc3Q+ID0gW3Nob3VsZEJlRmlyc3QsIHNob3VsZEJlU2Vjb25kLCBzaG91bGRCZVRoaXJkXTtcbiAgICAgICAgbGV0IGJlZm9yZVNvcnQgOiBBcnJheTxGaXJzdEFuZExhc3Q+ID0gW3Nob3VsZEJlU2Vjb25kLCBzaG91bGRCZUZpcnN0LCBzaG91bGRCZVRoaXJkXTtcblx0XHRsZXQgYWN0dWFsIDogQXJyYXk8Rmlyc3RBbmRMYXN0PiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG5cdEB0ZXN0IGNoYWluaW5nTXVsdGlwbGVLZXlzKCkge1xuXHRcdGxldCBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxQZXJzb24+ID0gQ29tcGFyYXRvcnMuY29tcGFyaW5nKFwibGFzdE5hbWVcIilcbiAgICAgICAgICAgIC50aGVuQ29tcGFyaW5nKFwiZmlyc3ROYW1lXCIpXG4gICAgICAgICAgICAudGhlbkNvbXBhcmluZyhcImFnZVwiKTtcblxuICAgICAgICBsZXQgc2hvdWxkQmVGaXJzdCAgOiBQZXJzb24gPSB7bGFzdE5hbWU6IFwiQVwiLCBmaXJzdE5hbWU6IFwiQVwiLCBhZ2U6MjR9LFxuICAgICAgICBcdHNob3VsZEJlU2Vjb25kIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI1fSxcbiAgICAgICAgICAgIHNob3VsZEJlVGhpcmQgIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkJcIiwgYWdlOjI0fSxcbiAgICAgICAgICAgIHNob3VsZEJlRm91cnRoIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkJcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI0fTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8UGVyc29uPiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZCwgc2hvdWxkQmVGb3VydGhdO1xuICAgICAgICBsZXQgYmVmb3JlU29ydCA6IEFycmF5PFBlcnNvbj4gPSBbc2hvdWxkQmVUaGlyZCwgc2hvdWxkQmVGb3VydGgsIHNob3VsZEJlU2Vjb25kLCBzaG91bGRCZUZpcnN0XTtcblx0XHRsZXQgYWN0dWFsIDogQXJyYXk8UGVyc29uPiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG5cdEB0ZXN0IGNoYWluaW5nV2l0aE1peGVkRGlyZWN0aW9ucygpIHtcblx0XHRsZXQgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8UGVyc29uPiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZyhcImxhc3ROYW1lXCIpXG5cdFx0XHQudGhlbkNvbXBhcmluZyhcImZpcnN0TmFtZVwiLCB7cmV2ZXJzZWQ6IHRydWV9KVxuXHRcdFx0LnRoZW5Db21wYXJpbmcoXCJhZ2VcIik7XG5cbiAgICAgICAgbGV0IHNob3VsZEJlRmlyc3QgIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkJcIiwgYWdlOjI0fSxcblx0XHRcdHNob3VsZEJlU2Vjb25kIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI0fSxcbiAgICAgICAgICAgIHNob3VsZEJlVGhpcmQgIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI1fSxcbiAgICAgICAgICAgIHNob3VsZEJlRm91cnRoIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkJcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI0fTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8UGVyc29uPiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZCwgc2hvdWxkQmVGb3VydGhdO1xuICAgICAgICBsZXQgYmVmb3JlU29ydCA6IEFycmF5PFBlcnNvbj4gPSBbc2hvdWxkQmVUaGlyZCwgc2hvdWxkQmVGb3VydGgsIHNob3VsZEJlU2Vjb25kLCBzaG91bGRCZUZpcnN0XTtcblx0XHRsZXQgYWN0dWFsIDogQXJyYXk8UGVyc29uPiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxufVxuXG4iXX0=