Comparators.js
==============

Java8-style chainable comparators for Javascript


Raison d'être
-------------

In working with JS, I've run across situations where I need multi-key sorting in my Backbone collections  -- which can sort themselves using the same type of comparator function as [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) expects.

When Java 8 rolled out, it brought with it a [Comparator](http://download.java.net/jdk8/docs/api/java/util/Comparator.html) interface, that allowed chaining comparators for multi-attribute sort like this:

```java
people.sort(
    Comparator.comparing(Person::getLastName)
        .thenComparing(Person::getFirstName)
);
```

I really liked that approach, so I brought that into Javascript with the same(ish) syntax. That's this library.


Usage and examples
------------------

Directly translating our above Java 8 code, we could do the following:

```javascript
/* Demo data */
var people = [
  {lastName: "Baggins", firstName: "Frodo"},
  {lastName: "Gamgee",  firstName: "Samwise"},
  {lastName: "Baggins", firstName: "Bilbo"}
];

sortedPeople = people.sort(Comparators.comparing("lastName").thenComparing("firstName"));

/* sortedPeople is now:
[
  {lastName: "Baggins", firstName: "Bilbo"},
  {lastName: "Baggins", firstName: "Frodo"},
  {lastName: "Gamgee",  firstName: "Samwise"},
]; 
*/
```

For more examples, see the tests in `test/comparators.spec.js`.


Where and how can I use it?
---------------------------

It works in the browser without a module system, as a CommonJS module, and as an AMD module.

The simplest (but global-namespace-polluting) way to use it is to include `comparators.js` in a script tag:

```html
<script type="text/javascript" src="comparators.min.js"></script>
```

In node/CommonJS loaders, just `require` it (it's available on NPM as [`comparators`](https://www.npmjs.org/package/comparators)):

```javascript
var Comparators = require("comparators").default; // the .default is necessary because of how Typescript compiles to commonjs
```

It works similarly in AMD loaders ([require.js](http://requirejs.org) used in the below example):

```javascript
require(['comparators.min'], function(Comparators){
  /* Do a thing! */
});
```


License
-------

Comparators.js is made available under the [MIT License](http://opensource.org/licenses/MIT) (Quick summary of it [here](https://tldrlegal.com/license/mit-license)) 
