# Hash Table (or Hash Map)

A hash map is basically an array with numerical indexes, but unlike array, we can set and get values from it by using a string key
which then translates to a corresponding numerical index in the array by **hashing** the string into a number.

You may ask yourself: why not just use object? The main benefit is that a hash map is iterable, so we can loop through its keys
and values.

In Javascript, we have a built-in hash map called ```Map()``` (not to be confused with ```Array.prototype.map```). We can implement the
hash map like so:

```javascript
let myMap = new Map([["test", 'a'], ['test2', 2], ['test3', {hello: 'world'}]]);

console.log(myMap);
```
