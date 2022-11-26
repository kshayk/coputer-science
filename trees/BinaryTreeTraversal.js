// definition for a binary tree node
function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
   this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
}

const leftNode = new TreeNode(2);
const rightNode = new TreeNode(3);
const node1 = new TreeNode(1, leftNode, rightNode);

const inorderTraversal = function(root) {
    if (root === null) {
        return [];
    }

    const result = [];
    if (root.left) {
        result.push(...inorderTraversal(root.left));
    }

    result.push(root.val);

    if (root.right) {
        result.push(...inorderTraversal(root.right));
    }

    return result;
}

console.log(inorderTraversal(node1));