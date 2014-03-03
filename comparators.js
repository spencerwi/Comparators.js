(function(){
    var buildComparator = function(attr){
        var comparatorFunction = function(first, second){
            if      (first[attr] > second[attr]) { return  1; }
            else if (first[attr] < second[attr]) { return -1; }
            else                                 { return  0; }
        };
        comparatorFunction.thenComparing = buildComparator;
        return comparatorFunction;
    }

    var Comparators = {
        comparing: function(attr){ return buildComparator(attr); }   
    };
    if (typeof exports !== 'undefined') {
        /* When in CommonJS, do as the Commoners do */
        exports.comparing = Comparators.comparing;
    } else {
        /* Browser's Castle */
        window.Comparators = Comparators;
    }
})();
