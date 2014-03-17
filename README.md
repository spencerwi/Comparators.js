Comparators.js
==============

[![Build Status](https://travis-ci.org/spencerwi/Comparators.js.png?branch=master)](https://travis-ci.org/spencerwi/Comparators.js)

Java8-style chainable comparators for Javascript


Raison d'être
-------------

At [work](http://siftit.com/), I've run across situations where I need multi-key sorting in my Backbone collections  -- which can sort themselves using the same type of comparator function as [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) expects.

Recently, I'd played some with Java 8 and liked the new [Comparator](http://download.java.net/jdk8/docs/api/java/util/Comparator.html) interface and the way it allows chaining comparators for multi-attribute sort like this:

```java
people.sort(
    Comparator.comparing(Person::getLastName)
        .thenComparing(Person::getFirstName)
);
```

So the simplest solution for me was to bridge this need and this interest by writing a Javascript comparator-function generator with the same(ish) syntax as the upcoming Java8 Comparator interface.


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

For more examples (and tests!), see the [project page](http://spencerwi.github.io/Comparators.js)


Where and how can I use it?
---------------------------

It works in the browser without a module system, as a CommonJS module, and as an AMD module.

The simplest (but global-namespace-polluting) way to use it is to include `comparators.js` in a script tag:

```html
<script type="text/javascript" src="comparators.min.js"></script>
```

In node/CommonJS loaders, just `require` it (it's available on NPM as [`comparators`](https://www.npmjs.org/package/comparators)):

```javascript
var Comparators = require("comparators");
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
