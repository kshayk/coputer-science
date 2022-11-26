// create a binary search tree
var BST = function(value) {
    var newTree = {};
    newTree.value = value;
    newTree.left = null;
    newTree.right = null;
    _.extend(newTree, bstMethods);
    return newTree;
}

var bstMethods = {};


// validate a binary search tree
var validateBST = function(tree) {
    var left = tree.left;
    var right = tree.right;
    if (left && left.value > tree.value) {
        return false;
    }
    if (right && right.value < tree.value) {
        return false;
    }
    if (left && !validateBST(left)) {
        return false;
    }

    if (right && !validateBST(right)) {
        return false;
    }
    return true;
}