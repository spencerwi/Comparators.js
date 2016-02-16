(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var buildComparisonStep = function (attrOrFunction, opts) {
        var reversed = (opts && opts.reversed);
        var comparatorFunction = function (firstItem, secondItem) {
            var comparisonValueOfFirstItem;
            var comparisonValueOfSecondItem;
            var result;
            if (typeof attrOrFunction === "function") {
                comparisonValueOfFirstItem = attrOrFunction(firstItem);
                comparisonValueOfSecondItem = attrOrFunction(secondItem);
            }
            else {
                comparisonValueOfFirstItem = firstItem[attrOrFunction];
                comparisonValueOfSecondItem = secondItem[attrOrFunction];
            }
            if (comparisonValueOfFirstItem > comparisonValueOfSecondItem) {
                if (reversed) {
                    result = -1;
                }
                else {
                    result = 1;
                }
            }
            else if (comparisonValueOfFirstItem < comparisonValueOfSecondItem) {
                if (reversed) {
                    result = 1;
                }
                else {
                    result = -1;
                }
            }
            else {
                if (comparatorFunction.nextStep != undefined) {
                    result = comparatorFunction.nextStep(firstItem, secondItem);
                }
                else {
                    result = 0;
                }
            }
            return result;
        };
        var lastStepInComparisonChain = comparatorFunction;
        comparatorFunction.thenComparing = function (attrOrFunction, opts) {
            lastStepInComparisonChain = lastStepInComparisonChain.nextStep = buildComparisonStep(attrOrFunction, opts);
            return this;
        };
        return comparatorFunction;
    };
    var Comparators = (function () {
        function Comparators() {
        }
        Comparators.comparing = function (attrOrFunction, opts) {
            return buildComparisonStep(attrOrFunction, opts);
        };
        return Comparators;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Comparators;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGFyYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0lBZ0JBLElBQUksbUJBQW1CLEdBQUcsVUFBTSxjQUF3QyxFQUFFLElBQXNCO1FBQzVGLElBQU0sUUFBUSxHQUFZLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLGtCQUFrQixHQUEwQixVQUFDLFNBQVksRUFBRSxVQUFhO1lBQ3hFLElBQUksMEJBQStCLENBQUM7WUFDcEMsSUFBSSwyQkFBZ0MsQ0FBQztZQUNyQyxJQUFJLE1BQWMsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsS0FBSyxVQUFVLENBQUMsQ0FBQSxDQUFDO2dCQUN0QywwQkFBMEIsR0FBSSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hELDJCQUEyQixHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osMEJBQTBCLEdBQUcsU0FBUyxDQUFTLGNBQWMsQ0FBQyxDQUFDO2dCQUMvRCwyQkFBMkIsR0FBRyxVQUFVLENBQVMsY0FBYyxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLDBCQUEwQixHQUFHLDJCQUEyQixDQUFDLENBQUMsQ0FBQztnQkFDM0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFVLENBQUM7b0JBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFBRSxDQUFDO1lBQ2xDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsMEJBQTBCLEdBQUcsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUFDLE1BQU0sR0FBSSxDQUFDLENBQUM7Z0JBQUEsQ0FBQztnQkFDNUIsSUFBSSxDQUFTLENBQUM7b0JBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDakMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBQzlHLElBQUksQ0FBQyxDQUFDO29CQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUN4QixDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUE7UUFDRCxJQUFJLHlCQUF5QixHQUFHLGtCQUFrQixDQUFDO1FBQ25ELGtCQUFrQixDQUFDLGFBQWEsR0FBRyxVQUFTLGNBQWMsRUFBRSxJQUFJO1lBQzVELHlCQUF5QixHQUFHLHlCQUF5QixDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0csTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUE7UUFDRCxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDOUIsQ0FBQyxDQUFBO0lBRUQ7UUFBQTtRQUlBLENBQUM7UUFIaUIscUJBQVMsR0FBdkIsVUFBMkIsY0FBd0MsRUFBRSxJQUF3QjtZQUN6RixNQUFNLENBQUMsbUJBQW1CLENBQUksY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDTCxrQkFBQztJQUFELENBQUMsQUFKRCxJQUlDO0lBSkQ7aUNBSUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgS2V5RXh0cmFjdG9yRm48VD4ge1xuICAgICh0OiBUKTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmF0b3JPcHRpb25zIHtcbiAgICByZXZlcnNlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGFyYXRvcjxUPiB7XG4gICAgKGE6IFQsIGI6IFQpOiBudW1iZXI7XG4gICAgdGhlbkNvbXBhcmluZz8oYXR0ck9yRnVuY3Rpb246IHN0cmluZ3xLZXlFeHRyYWN0b3JGbjxUPiwgb3B0cz86IENvbXBhcmF0b3JPcHRpb25zKTogQ29tcGFyYXRvcjxUPjtcbn1cbmludGVyZmFjZSBDb21wYXJhdG9ySW50ZXJuYWw8VD4gZXh0ZW5kcyBDb21wYXJhdG9yPFQ+IHtcbiAgICBuZXh0U3RlcD86IENvbXBhcmF0b3I8VD47XG59XG5cbnZhciBidWlsZENvbXBhcmlzb25TdGVwID0gPCBUID4oYXR0ck9yRnVuY3Rpb246IHN0cmluZ3xLZXlFeHRyYWN0b3JGbjxUPiwgb3B0czpDb21wYXJhdG9yT3B0aW9ucyk6IENvbXBhcmF0b3I8VD4gPT4ge1xuICAgIGNvbnN0IHJldmVyc2VkOiBib29sZWFuID0gKG9wdHMgJiYgb3B0cy5yZXZlcnNlZCk7XG4gICAgdmFyIGNvbXBhcmF0b3JGdW5jdGlvbjogQ29tcGFyYXRvckludGVybmFsPFQ+ID0gKGZpcnN0SXRlbTogVCwgc2Vjb25kSXRlbTogVCk6IG51bWJlciA9PiB7XG4gICAgICAgIGxldCBjb21wYXJpc29uVmFsdWVPZkZpcnN0SXRlbTogYW55O1xuICAgICAgICBsZXQgY29tcGFyaXNvblZhbHVlT2ZTZWNvbmRJdGVtOiBhbnk7XG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBhdHRyT3JGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgICAgICAgIGNvbXBhcmlzb25WYWx1ZU9mRmlyc3RJdGVtICA9IGF0dHJPckZ1bmN0aW9uKGZpcnN0SXRlbSk7XG4gICAgICAgICAgICBjb21wYXJpc29uVmFsdWVPZlNlY29uZEl0ZW0gPSBhdHRyT3JGdW5jdGlvbihzZWNvbmRJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBhcmlzb25WYWx1ZU9mRmlyc3RJdGVtID0gZmlyc3RJdGVtWzxzdHJpbmc+YXR0ck9yRnVuY3Rpb25dO1xuICAgICAgICAgICAgY29tcGFyaXNvblZhbHVlT2ZTZWNvbmRJdGVtID0gc2Vjb25kSXRlbVs8c3RyaW5nPmF0dHJPckZ1bmN0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcGFyaXNvblZhbHVlT2ZGaXJzdEl0ZW0gPiBjb21wYXJpc29uVmFsdWVPZlNlY29uZEl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChyZXZlcnNlZCkgeyByZXN1bHQgPSAtMTsgfVxuICAgICAgICAgICAgZWxzZSAgICAgICAgICB7IHJlc3VsdCA9IDE7ICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY29tcGFyaXNvblZhbHVlT2ZGaXJzdEl0ZW0gPCBjb21wYXJpc29uVmFsdWVPZlNlY29uZEl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChyZXZlcnNlZCl7IHJlc3VsdCA9ICAxO31cbiAgICAgICAgICAgIGVsc2UgICAgICAgICB7IHJlc3VsdCA9IC0xOyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcGFyYXRvckZ1bmN0aW9uLm5leHRTdGVwICE9IHVuZGVmaW5lZCkgeyByZXN1bHQgPSBjb21wYXJhdG9yRnVuY3Rpb24ubmV4dFN0ZXAoZmlyc3RJdGVtLCBzZWNvbmRJdGVtKTsgfVxuICAgICAgICAgICAgZWxzZSB7IHJlc3VsdCA9IDA7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBsZXQgbGFzdFN0ZXBJbkNvbXBhcmlzb25DaGFpbiA9IGNvbXBhcmF0b3JGdW5jdGlvbjtcbiAgICBjb21wYXJhdG9yRnVuY3Rpb24udGhlbkNvbXBhcmluZyA9IGZ1bmN0aW9uKGF0dHJPckZ1bmN0aW9uLCBvcHRzKSB7XG4gICAgICAgIGxhc3RTdGVwSW5Db21wYXJpc29uQ2hhaW4gPSBsYXN0U3RlcEluQ29tcGFyaXNvbkNoYWluLm5leHRTdGVwID0gYnVpbGRDb21wYXJpc29uU3RlcChhdHRyT3JGdW5jdGlvbiwgb3B0cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGFyYXRvckZ1bmN0aW9uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wYXJhdG9ycyB7XG4gICAgcHVibGljIHN0YXRpYyBjb21wYXJpbmc8VD4oYXR0ck9yRnVuY3Rpb246IHN0cmluZ3xLZXlFeHRyYWN0b3JGbjxUPiwgb3B0cz86IENvbXBhcmF0b3JPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBidWlsZENvbXBhcmlzb25TdGVwPFQ+KGF0dHJPckZ1bmN0aW9uLCBvcHRzKTtcbiAgICB9XG59XG4iXX0=