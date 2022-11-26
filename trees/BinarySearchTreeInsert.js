class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const node  = new Node(data);

        // If root is null, then tree is empty. Insert node as root.
        if (this.root === null) {
            this.root = node;
            return;
        }

        let current = this.root;
        while (true) {
            // if data is more than current node, go right to the next node
            if (data > current.data) {
                // If right child is null, insert node here
                if (current.right === null) {
                    current.right = node;
                    return;
                }
                current = current.right;
            } else {
                // If left child is null, insert node here
                if (current.left === null) {
                    current.left = node;
                    return;
                }
                current = current.left;
            }
        }
    }
}

let bst = new BST();
const nodes = [10, 5, 15, 0, 20];
nodes.forEach(node => bst.insert(node));

console.log(bst);