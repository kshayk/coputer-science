## Linked List

Unlike arrays which are saved in a designated portion of the memory with each node
comes after the other, in linked list, there is no specific allocated memory spots for the entire list, but
rather each node has its own memory spot.

The reason it is called a linked list is because, apart from the data this node stores, it also stores a link to the next node
which can be located anywhere in the memory. In more complex nodes, there can be multiple links (apart from a link to the next node, there can also be a link to the previous node).

One thing a linked list is good for, is if we are not sure about the amount of nodes that are going to be needed in runtime.
We can add or remove nodes without needing to delete the entire list and re-create it in the memory.

On the contrary, linked list will prevent us from reaching a specific node (like we do in arrays by pointing to a specific index).
In order to reach a specific node, we will have to start from the first node (called "head", while the last node is called a "tail") and move to the next node until the desired node is reached.

As mentioned, each node has a link (also called a "reference") to the next node. While the "head" node has a link to the next node,
the "tail" node has a reference to NULL since there are no more nodes in the sequence.

A very "bare-boned" example for a linked list in Javascript can be written like this:

```javascript
const n1 = {
    data: 100
};

const n2 = {
    data: 200
}

n1.next = n2;

console.log(n1);
```

The ```n1``` and ```n2``` are object that are not related to each other, except that after creating the both, we are assigning
the "next" property for ```n1``` to be the ```n2``` object, and by that, linking the ```n2``` object with the ```n1``` object.

When we print the ```n1``` object we can see its data but also the ```n2``` object.

The more conventional way of creating a linked list is by using classes in Javascript.

First we will create the Node class:

```javascript
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
```

The class's constructor gets the data and also the reference to the next node, if there is any.
If no next node is sent, the next node will be set as null.

Next, we will create the linked list itself, and again, we will use a class for that:

```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert first node

    // Insert last node

    // Insert at index

    // Get at index

    // Remove at index

    // Clear list

    // Print list data
}
```

This class will start with no nodes, so we first set the head to null and the size to 0. It's important to have those two properties
in this class, so we can keep track on the nodes in it and also to know the size of the linked list at all times.

We also added some pseudocode for all the functionality we will need for the linked list.

### insertFirst()

First we will start by implementing the insertion of the first node:

```javascript
// Insert first node
insertFirst(data) {
    this.head = new Node(data, this.head); // because we are inserting at the beginning, the next node will be the current head
    this.size++;
}
```

This function will get the data we want this node to have as a parameter. It will create a new node by instantiating a new ```Node``` class
and passing all the relevant information to its constructor. We are referencing the current "head" node as its "next" value, since
this node will become the new "head", and therefore, the current "head" is now the second node in the list.

We will also increase the size of the linked list by 1, since now we have 1 more node in our list.

We can test that it works by running this code:

```javascript
const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(200);

console.log(ll);
```

First we instantiate the ```LinkedList``` class, and then we insert the first head which has a data of "100".
Then we insert a new head again which has a data of 200. We can see that in the console, the "head" is the node with the data
of "200" and its next linked node is the node with the data of 100:

```bash
LinkedList {
  head: Node { data: 200, next: Node { data: 100, next: null } },
  size: 2
}
```

Next, we will implement the function that will print the current list data:

```javascript
// Print list data
printListData() {
    let current = this.head;

    while (current) {
        console.log(current.data);
        current = current.next;
    }
}
```

Here we loop through all the nodes, starting at the first node (the "head"), and as long as the current node is not null, it will
iterate through all the nodes and print their data to the console.

if we now write this code:

```javascript
const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(300);

ll.printListData();
```

This is what it will print to the console:

```bash
300
200
100
```

### insertLast()

Next, we will create the function to insert a node at the end of the list:

```javascript
// Insert last node
insertLast(data) {
    let node = new Node(data);
    let current;

    // If empty, make head
    if (!this.head) {
        this.head = node;
    } else {
        current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = node;
    }

    this.size++;
}
```

First, we will create the node itself by instantiating a new ```Node``` class.
We also declare a "current" variable for later.

Then, we check if the list is currently empty (there is no "head" node), we assign the new node as the "head", and that's all we do if the list
is empty because no other node should change its "next" property.

If the list is not empty, we must iterate through all the current nodes until we react a node that its "next" property is null (which indicates that this is the last node in the list).
At this point, we will reference the new node as the "next" property of the last current node.

We also increase the size of the linked list by 1, since we added a new node to it.

If we now print the current code:

```javascript
ll.insertFirst(100);
ll.insertFirst(200);
ll.insertLast(300);

ll.printListData();
```

We will see the following:

```bash
200
100
300
```

Now the node with the data of "300" is the last node in the list.

### insertAt()

Next, we will create the function that inserts a new node at a given index:

```javascript
// Insert at index
insertAt(data, index) {
    // If index is out of range
    if (index > 0 && index > this.size) {
        return;
    }

    // If first index
    if (index === 0) {
        this.insertFirst(data);
        return;
    }

    const node = new Node(data);
    let current, previous;

    // Set current to first
    current = this.head;
    let count = 0;

    while (count < index) {
        previous = current; // Node before index
        count++;
        current = current.next; // Node after index
    }

    node.next = current;
    previous.next = node;

    this.size++;
}
```

This function gets the data that will be in the node and the index in which the node will be inserted into.

First we want to check if the index is within the bounds of the linked list. If it's a negative value or a value that is greater
than the entire list's length, then it is invalid and should not apply any functionality.

If the index value is 0, then this means it should be the new "head" of the linked list, and therefore, we can simply use the
already created ```insertFirst()``` method.

For any other case, we will need to iterate through the linked list until we reach the desired index location. At this point,
we need to assign the new node as the previous node's "next" property, and we should also assign the current node as the "next" property of
the new node. This way the new node takes place in the desired index of the linked list.

We then increase the link's size by 1.

If we run this code:

```javascript
const ll = new LinkedList();

ll.insertFirst(100);
ll.insertFirst(200);
ll.insertAt(300,1);

ll.printListData();
```

Which indicates that we have the node with the "200" data as the "head" node and the node with the "100" data as the next node.
We then want to insert a new node with data of "300" into the index where the node with the data of "200" is located.

When we print the linked list, we will see the following output:

```bash
200
300
100
```

### getAt()

Next, we will implement the function that gets the data of a node in a specific index:

```javascript
// Get at index
getAt(index) {
    let current = this.head;
    let count = 0;

    while (current) {
        if (count === index) {
            return current.data;
        }

        count++;
        current = current.next;
    }

    return null;
}
```

This function gets the index in which the desired node is located.

We start from the head node at index 0 and iterate through the nodes until we reach the count (which represents the index) is met with the "index parameter".

After each iteration we increase the count (current index) and set the next node as the current node. If the current node is null (reached the end of the linked list), 
it means the index that is passed as a parameter does not exist on this linked list, and therefore returning null.

Running this code:

```javascript
ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(300);

console.log(ll.getAt(1));
```

Will result in the following output:

```bash
200
```

### removeAt()
The next function we will implement is removing a node at a specific index:

```javascript
// Remove at index
removeAt(index) {
    if (index > 0 && index > this.size) {
        return;
    }

    let current = this.head;
    let previous;
    let count = 0;

    // Remove first
    if (index === 0) {
        this.head = current.next;
    } else {
        while (count < index) {
            count++;
            previous = current;
            current = current.next;
        }

        previous.next = current.next;
    }

    this.size--;
}
```

This function gets the index to remove from the linked list.

First we check if the index is a valid index. If not then we do nothing.

We then start from the "head" node and pre-declare the ```previous``` and ```count``` variables.

If the index that is passed as a parameter is 0, then we remove the head by simple setting the current head in the ```LinkedList```
class as the "next" property of the current head, which is the next node in the sequence.

In any other scenario, we iterate through the linked list, each time setting the current and previous nodes for reference.

If the current count equals to the index parameter, we simply set the previous node's "next" property as the current's "next" property instead of the current node.
This way we "unlink" the current node in the desired index from the linked list and setting the next node as the current node instead.

We then decrease the linked list size by 1, since we removed one node from it.

If we run the following code:

```javascript
ll.insertFirst(100);
ll.insertFirst(200);
ll.insertFirst(300);
ll.removeAt(1);

ll.printListData();
```

We will see the following output:

```bash
300
100
```

Since the node in the "1" index was the node with the data of "200".

### clearList()

We will now implement the function which will clear the list completely:

```javascript
clearList() {
    this.head = null;
    this.size = 0;
}
```

The logic here is pretty simple. The linked list only knows about one node, and that is the head. 
By removing the head, we also remove all the other nodes, since practically, the head stores all the other nodes in its "next" property.

After clearing the head, we also set the size as 0, since the linked list is now empty.