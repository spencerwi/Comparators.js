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
var mocha_typescript_1 = require("mocha-typescript");
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
        mocha_typescript_1.test
    ], TypescriptComparatorsTests.prototype, "creatingAttrComparator", null);
    __decorate([
        mocha_typescript_1.test
    ], TypescriptComparatorsTests.prototype, "creatingFnComparator", null);
    __decorate([
        mocha_typescript_1.test
    ], TypescriptComparatorsTests.prototype, "reversingComparisonDirection", null);
    TypescriptComparatorsTests = __decorate([
        mocha_typescript_1.suite
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
        mocha_typescript_1.test
    ], ThenComparingTest.prototype, "chainingWithAttr", null);
    __decorate([
        mocha_typescript_1.test
    ], ThenComparingTest.prototype, "chainingWithFn", null);
    __decorate([
        mocha_typescript_1.test
    ], ThenComparingTest.prototype, "chainingMultipleKeys", null);
    __decorate([
        mocha_typescript_1.test
    ], ThenComparingTest.prototype, "chainingWithMixedDirections", null);
    ThenComparingTest = __decorate([
        mocha_typescript_1.suite
    ], ThenComparingTest);
    return ThenComparingTest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC1kZWZpbml0aW9uLWZpbGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQtZGVmaW5pdGlvbi1maWxlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2RUFBdUQ7QUFDdkQscURBQStDO0FBQy9DLDZCQUE4QjtBQVE5QjtJQUFBO0lBK0NBLENBQUM7SUE5Q00sMkRBQXNCLEdBQXRCO1FBQ0wsSUFBSSxhQUFhLEdBQWMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLEVBQzNDLGNBQWMsR0FBYSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFDeEMsYUFBYSxHQUFjLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDO1FBRTFDLElBQUksZ0JBQWdCLEdBQXlCLHFCQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNFLElBQUksUUFBUSxHQUFzQixDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakYsSUFBSSxVQUFVLEdBQW9CLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRixJQUFJLE1BQU0sR0FBd0IsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBFLGFBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUsseURBQW9CLEdBQXBCO1FBQ0MsSUFBSSxhQUFhLEdBQWMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLEVBQzVDLGNBQWMsR0FBYSxFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUMsRUFDbEQsYUFBYSxHQUFjLEVBQUMsTUFBTSxFQUFFLHdCQUF3QixFQUFDLENBQUM7UUFFeEUsSUFBSSxnQkFBZ0IsR0FBeUIscUJBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxJ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LEVBQUMsRUFBRSxFQUFDLEVBQ3hELGFBQWEsR0FBYSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFDLEVBQ2pFLGNBQWMsR0FBWSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFFNUUsSUFBSSxRQUFRLEdBQXFCLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDMUYsSUFBSSxVQUFVLEdBQW1CLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdEcsSUFBSSxNQUFNLEdBQW1CLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRCxhQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQXZESztRQUFMLHVCQUFJOzZEQVVKO0lBRUs7UUFBTCx1QkFBSTsyREFXSjtJQUVLO1FBQUwsdUJBQUk7aUVBY0o7SUFFSztRQUFMLHVCQUFJO3dFQWNKO0lBekRXLGlCQUFpQjtRQUE3Qix3QkFBSztPQUFPLGlCQUFpQixDQTBEN0I7SUFBRCx3QkFBQztDQUFBLEFBMURNLElBMEROIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyYXRvciB9IGZyb20gXCIuLi9kaXN0L2NvbW1vbmpzL2NvbXBhcmF0b3JzXCI7XG5pbXBvcnQgQ29tcGFyYXRvcnMgZnJvbSBcIi4uL2Rpc3QvY29tbW9uanMvY29tcGFyYXRvcnNcIjtcbmltcG9ydCB7IHN1aXRlLCB0ZXN0IH0gZnJvbSBcIm1vY2hhLXR5cGVzY3JpcHRcIjtcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gXCJjaGFpXCI7XG5cbnR5cGUgSGFzTmFtZSA9IHtuYW1lIDogc3RyaW5nfVxudHlwZSBIYXNOYW1lQW5kRG9iID0ge25hbWU6IHN0cmluZywgZG9iOiBzdHJpbmd9XG50eXBlIEZpcnN0QW5kTGFzdCA9IHtmaXJzdE5hbWU6IHN0cmluZyxsYXN0TmFtZTogc3RyaW5nfVxudHlwZSBQZXJzb24gPSB7Zmlyc3ROYW1lOiBzdHJpbmcsIGxhc3ROYW1lOiBzdHJpbmcsIGFnZTogbnVtYmVyfVxuXG5Ac3VpdGVcbmNsYXNzIFR5cGVzY3JpcHRDb21wYXJhdG9yc1Rlc3RzIHtcblx0QHRlc3QgY3JlYXRpbmdBdHRyQ29tcGFyYXRvcigpIHtcblx0XHRsZXQgc2hvdWxkQmVGaXJzdCAgOiBIYXNOYW1lID0ge1wibmFtZVwiOiBcIkFcIn0sXG5cdFx0XHRzaG91bGRCZVNlY29uZCA6IEhhc05hbWUgPSB7XCJuYW1lXCI6IFwiQlwifSxcblx0XHRcdHNob3VsZEJlVGhpcmQgIDogSGFzTmFtZSA9IHtcIm5hbWVcIjogXCJDXCJ9O1xuXG5cdFx0bGV0IGNvbXBhcmF0b3JNZXRob2QgOiBDb21wYXJhdG9yPEhhc05hbWU+ID0gQ29tcGFyYXRvcnMuY29tcGFyaW5nKFwibmFtZVwiKTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBiZWZvcmVTb3J0IDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlRmlyc3QsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBhY3R1YWwgICAgIDogQXJyYXk8SGFzTmFtZT4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG5cdEB0ZXN0IGNyZWF0aW5nRm5Db21wYXJhdG9yKCkge1xuICAgICAgICBsZXQgc2hvdWxkQmVGaXJzdCAgOiBIYXNOYW1lID0ge1wibmFtZVwiOiBcInNob3J0XCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVTZWNvbmQgOiBIYXNOYW1lID0ge1wibmFtZVwiOiBcInByZXR0eSBsb25nXCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVUaGlyZCAgOiBIYXNOYW1lID0ge1wibmFtZVwiOiBcImRlZmluaXRlbHkgdGhlIGxvbmdlc3RcIn07XG5cblx0XHRsZXQgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8SGFzTmFtZT4gPSBDb21wYXJhdG9ycy5jb21wYXJpbmcoKGVhY2ggOiBIYXNOYW1lKSA9PiBlYWNoLm5hbWUubGVuZ3RoKTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBiZWZvcmVTb3J0IDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlRmlyc3QsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBhY3R1YWwgICAgIDogQXJyYXk8SGFzTmFtZT4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG5cdEB0ZXN0IHJldmVyc2luZ0NvbXBhcmlzb25EaXJlY3Rpb24oKSB7XG4gICAgICAgIGxldCBzaG91bGRCZUZpcnN0ICA6IEhhc05hbWVBbmREb2IgPSB7XCJuYW1lXCI6IFwiQ1wiLCBkb2I6IFwiMjAwMC0wMy0wM1wifSxcbiAgICAgICAgICAgIHNob3VsZEJlU2Vjb25kIDogSGFzTmFtZUFuZERvYiA9IHtcIm5hbWVcIjogXCJCXCIsIGRvYjogXCIyMDAwLTAyLTAyXCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVUaGlyZCAgOiBIYXNOYW1lQW5kRG9iID0ge1wibmFtZVwiOiBcIkFcIiwgZG9iOiBcIjIwMDAtMDEtMDFcIn07XG5cblx0XHR2YXIgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8SGFzTmFtZUFuZERvYj4gPSBDb21wYXJhdG9ycy5jb21wYXJpbmcoJ25hbWUnLCB7cmV2ZXJzZWQ6IHRydWV9KTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBiZWZvcmVTb3J0IDogQXJyYXk8SGFzTmFtZT4gPSBbc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlRmlyc3QsIHNob3VsZEJlVGhpcmRdO1xuXHRcdGxldCBhY3R1YWwgICAgIDogQXJyYXk8SGFzTmFtZT4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cdFx0ZXhwZWN0KGFjdHVhbCkudG8uZGVlcC5lcXVhbChleHBlY3RlZCk7XG5cblxuXHRcdHZhciBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxIYXNOYW1lQW5kRG9iPiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZygoZWFjaCA6IEhhc05hbWVBbmREb2IpID0+IG5ldyBEYXRlKGVhY2guZG9iKSwge3JldmVyc2VkOiB0cnVlfSk7XG4gICAgICAgIGFjdHVhbCA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG59XG5cbkBzdWl0ZSBjbGFzcyBUaGVuQ29tcGFyaW5nVGVzdCB7XG5cblx0QHRlc3QgY2hhaW5pbmdXaXRoQXR0cigpIHtcblx0XHRsZXQgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8Rmlyc3RBbmRMYXN0PiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZyhcImxhc3ROYW1lXCIpLnRoZW5Db21wYXJpbmcoXCJmaXJzdE5hbWVcIik7XG4gICAgICAgIGxldCBzaG91bGRCZUZpcnN0ICA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcIkFcIiwgXCJsYXN0TmFtZVwiOiBcIkFcIn0sXG4gICAgICAgIFx0c2hvdWxkQmVTZWNvbmQgOiBGaXJzdEFuZExhc3QgPSB7XCJmaXJzdE5hbWVcIjogXCJCXCIsIFwibGFzdE5hbWVcIjogXCJBXCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVUaGlyZCAgOiBGaXJzdEFuZExhc3QgPSB7XCJmaXJzdE5hbWVcIjogXCJDXCIsIFwibGFzdE5hbWVcIjogXCJDXCJ9O1xuXG5cdFx0bGV0IGV4cGVjdGVkICAgOiBBcnJheTxGaXJzdEFuZExhc3Q+ID0gW3Nob3VsZEJlRmlyc3QsIHNob3VsZEJlU2Vjb25kLCBzaG91bGRCZVRoaXJkXTtcbiAgICAgICAgbGV0IGJlZm9yZVNvcnQgOiBBcnJheTxGaXJzdEFuZExhc3Q+ID0gW3Nob3VsZEJlU2Vjb25kLCBzaG91bGRCZUZpcnN0LCBzaG91bGRCZVRoaXJkXTtcblx0XHRsZXQgYWN0dWFsIDogQXJyYXk8Rmlyc3RBbmRMYXN0PiA9IGJlZm9yZVNvcnQuc29ydChjb21wYXJhdG9yTWV0aG9kKTtcblx0XHRleHBlY3QoYWN0dWFsKS50by5kZWVwLmVxdWFsKGV4cGVjdGVkKTtcblx0fVxuXG5cdEB0ZXN0IGNoYWluaW5nV2l0aEZuKCkge1xuXHRcdGxldCBjb21wYXJhdG9yTWV0aG9kIDogQ29tcGFyYXRvcjxGaXJzdEFuZExhc3Q+ID0gQ29tcGFyYXRvcnMuY29tcGFyaW5nKFwibGFzdE5hbWVcIikudGhlbkNvbXBhcmluZygoZWFjaCA6IEZpcnN0QW5kTGFzdCkgPT4gZWFjaC5maXJzdE5hbWUubGVuZ3RoKTtcblxuICAgICAgICBsZXQgc2hvdWxkQmVGaXJzdCAgOiBGaXJzdEFuZExhc3QgPSB7XCJmaXJzdE5hbWVcIjogXCJzaG9ydFwiLCAgICAgICAgICAgICBcImxhc3ROYW1lXCI6IFwiQVwifSxcbiAgICAgICAgXHRzaG91bGRCZVNlY29uZCA6IEZpcnN0QW5kTGFzdCA9IHtcImZpcnN0TmFtZVwiOiBcIlJhdGhlciBsb25nXCIsICAgICAgIFwibGFzdE5hbWVcIjogXCJBXCJ9LFxuICAgICAgICAgICAgc2hvdWxkQmVUaGlyZCAgOiBGaXJzdEFuZExhc3QgPSB7XCJmaXJzdE5hbWVcIjogXCJJcnJlbGV2YW50IGxlbmd0aFwiLCBcImxhc3ROYW1lXCI6IFwiQ1wifTtcblxuXHRcdGxldCBleHBlY3RlZCAgIDogQXJyYXk8Rmlyc3RBbmRMYXN0PiA9IFtzaG91bGRCZUZpcnN0LCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVUaGlyZF07XG4gICAgICAgIGxldCBiZWZvcmVTb3J0IDogQXJyYXk8Rmlyc3RBbmRMYXN0PiA9IFtzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVUaGlyZF07XG5cdFx0bGV0IGFjdHVhbCA6IEFycmF5PEZpcnN0QW5kTGFzdD4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cdFx0ZXhwZWN0KGFjdHVhbCkudG8uZGVlcC5lcXVhbChleHBlY3RlZCk7XG5cdH1cblxuXHRAdGVzdCBjaGFpbmluZ011bHRpcGxlS2V5cygpIHtcblx0XHRsZXQgY29tcGFyYXRvck1ldGhvZCA6IENvbXBhcmF0b3I8UGVyc29uPiA9IENvbXBhcmF0b3JzLmNvbXBhcmluZyhcImxhc3ROYW1lXCIpXG4gICAgICAgICAgICAudGhlbkNvbXBhcmluZyhcImZpcnN0TmFtZVwiKVxuICAgICAgICAgICAgLnRoZW5Db21wYXJpbmcoXCJhZ2VcIik7XG5cbiAgICAgICAgbGV0IHNob3VsZEJlRmlyc3QgIDogUGVyc29uID0ge2xhc3ROYW1lOiBcIkFcIiwgZmlyc3ROYW1lOiBcIkFcIiwgYWdlOjI0fSxcbiAgICAgICAgXHRzaG91bGRCZVNlY29uZCA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJBXCIsIGZpcnN0TmFtZTogXCJBXCIsIGFnZToyNX0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJBXCIsIGZpcnN0TmFtZTogXCJCXCIsIGFnZToyNH0sXG4gICAgICAgICAgICBzaG91bGRCZUZvdXJ0aCA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJCXCIsIGZpcnN0TmFtZTogXCJBXCIsIGFnZToyNH07XG5cblx0XHRsZXQgZXhwZWN0ZWQgICA6IEFycmF5PFBlcnNvbj4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmQsIHNob3VsZEJlRm91cnRoXTtcbiAgICAgICAgbGV0IGJlZm9yZVNvcnQgOiBBcnJheTxQZXJzb24+ID0gW3Nob3VsZEJlVGhpcmQsIHNob3VsZEJlRm91cnRoLCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdF07XG5cdFx0bGV0IGFjdHVhbCA6IEFycmF5PFBlcnNvbj4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cdFx0ZXhwZWN0KGFjdHVhbCkudG8uZGVlcC5lcXVhbChleHBlY3RlZCk7XG5cdH1cblxuXHRAdGVzdCBjaGFpbmluZ1dpdGhNaXhlZERpcmVjdGlvbnMoKSB7XG5cdFx0bGV0IGNvbXBhcmF0b3JNZXRob2QgOiBDb21wYXJhdG9yPFBlcnNvbj4gPSBDb21wYXJhdG9ycy5jb21wYXJpbmcoXCJsYXN0TmFtZVwiKVxuXHRcdFx0LnRoZW5Db21wYXJpbmcoXCJmaXJzdE5hbWVcIiwge3JldmVyc2VkOiB0cnVlfSlcblx0XHRcdC50aGVuQ29tcGFyaW5nKFwiYWdlXCIpO1xuXG4gICAgICAgIGxldCBzaG91bGRCZUZpcnN0ICA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJBXCIsIGZpcnN0TmFtZTogXCJCXCIsIGFnZToyNH0sXG5cdFx0XHRzaG91bGRCZVNlY29uZCA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJBXCIsIGZpcnN0TmFtZTogXCJBXCIsIGFnZToyNH0sXG4gICAgICAgICAgICBzaG91bGRCZVRoaXJkICA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJBXCIsIGZpcnN0TmFtZTogXCJBXCIsIGFnZToyNX0sXG4gICAgICAgICAgICBzaG91bGRCZUZvdXJ0aCA6IFBlcnNvbiA9IHtsYXN0TmFtZTogXCJCXCIsIGZpcnN0TmFtZTogXCJBXCIsIGFnZToyNH07XG5cblx0XHRsZXQgZXhwZWN0ZWQgICA6IEFycmF5PFBlcnNvbj4gPSBbc2hvdWxkQmVGaXJzdCwgc2hvdWxkQmVTZWNvbmQsIHNob3VsZEJlVGhpcmQsIHNob3VsZEJlRm91cnRoXTtcbiAgICAgICAgbGV0IGJlZm9yZVNvcnQgOiBBcnJheTxQZXJzb24+ID0gW3Nob3VsZEJlVGhpcmQsIHNob3VsZEJlRm91cnRoLCBzaG91bGRCZVNlY29uZCwgc2hvdWxkQmVGaXJzdF07XG5cdFx0bGV0IGFjdHVhbCA6IEFycmF5PFBlcnNvbj4gPSBiZWZvcmVTb3J0LnNvcnQoY29tcGFyYXRvck1ldGhvZCk7XG5cdFx0ZXhwZWN0KGFjdHVhbCkudG8uZGVlcC5lcXVhbChleHBlY3RlZCk7XG5cdH1cbn1cblxuIl19