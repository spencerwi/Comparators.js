Comparators.js
==============

[![Build Status](https://travis-ci.org/spencerwi/Comparators.js.png?branch=master)](https://travis-ci.org/spencerwi/Comparators.js)

Java8-style chainable comparators for Javascript


Raison d'être
-------------

I played some with Java 8 and liked the new [Comparator](http://download.java.net/jdk8/docs/api/java/util/Comparator.html) interface and the way it allows chaining comparators for multi-attribute sort like this:

```java
people.sort(
    Comparator.comparing(Person::getLastName)
        .thenComparing(Person::getFirstName)
);
```

At [work](http://siftit.com/), I've run across situations where I need chainable comparators in my Backbone collections (which can use the same type of function as [`Array.prototype.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) expects.


Usage and examples
------------------

Directly translating our above Java 8 code, we could do the following:

```javascript
/* Demo data */
var people = [
  {lastName: "Williams", firstName: "Emma"},
  {lastName: "Williams", firstName: "Spencer"},
  {lastName: "Beard", firstName: "Amanda"}
];

sortedPeople = people.sort(Comparators.comparing("lastName").thenComparing("firstName"));

/* sortedPeople is now:
[
  {lastName: "Beard", firstName: "Amanda"},
  {lastName: "Williams", firstName: "Emma"},
  {lastName: "Williams", firstName: "Spencer"}
]; 
*/
```

Where and how can I use it?
---------------------------

It works in the browser and in anything that handles CommonJS modules.

In the browser, include `comparators.js` in a script tag:

```html
<script type="text/javascript" src="comparators.js"></script>
```

In node, just `require` it:

```javascript
var Comparators = require("Comparators.js");
```

