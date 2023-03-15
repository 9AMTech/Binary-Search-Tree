// Binary Search Tree Code
// Take a sorted Arrray increasing value
// Divide it in the middle, thats the initial root.
// Ignoring the middle root node, take the left and right half and make that the next roots.
// Put the left root in the left node and the right root in the right node.
// Continue this process until there is nothing left.

const merge = (left, right) => {
    let array = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            array.push(left.shift());
        }
        else {
            array.push(right.shift());
        }
    }
    return [...array, ...left, ...right];
}

const mergeSort = (array) => {
    let mid = array.length / 2;
    if (array.length < 2) return array;
    let left = array.splice(0, mid);
    return merge(mergeSort(left), mergeSort(array));
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const createBST = value => {
    const createNode = (value) => {
        return {
            value,
            left: null,
            right: null,
        }
    }

    let count = 0;
    let root = createNode(value);

    const insert = value => {
        count++;

        let newNode = createNode(value);

        const searchTree = node => {
            // If value < node.value, go left
            if (value < node.value) {
                // If there's no left child, append the new node
                if (!node.left) {
                    node.left = newNode;
                }
                // Run the search again
                else {
                    searchTree(node.left);
                }
            }
            // If value > node.value, go right
            else if (value > node.value) {
                // If node.right 
                if (!node.right) {
                    node.right = newNode;
                }
                else {
                    searchTree(node.right);
                }
            }
        }
        searchTree(root);
    }

    const size = () => {
        return this.count;
    }

    // takes in the root node
    const min = () => {
        let currentNode = root;
        while (currentNode.left) {
            currentNode = currentNode.left
        }
        return currentNode.value;
    }

    const max = () => {
        let currentNode = root;
        while (currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode.value;
    }

    const contains = value => {
        let currentNode = root;

        while (currentNode) {
            if (value === currentNode.value) {
                return true;
            }
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            }
            else {
                currentNode = currentNode.right;
            }
        }

        return false;
    }

    // Array 2, 3, 12, 15, 28, 36, 39

    // Tree       15
    //        3       36 
    //     2   12   28   39

    // depth first search

    // In-Order
    // left, root, right
    // 2, 3, 12, 15, 28, 36, 39
    const dfsInOrder = () => {
        let result = [];

        const traverse = node => {
            if (node.left) traverse(node.left);
            result.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(root);
        return result;
    }

    // Pre-Order
    // root, left, right
    // 15, 3, 2, 12, 36, 28, 39
    const dfsPreOrder = () => {
        let result = [];

        const traverse = node => {
            result.push(node.value);
            if (node.right) traverse(node.right);
            if (node.left) traverse(node.left);
        }
        traverse(root);
        return result;
    }

    // Post-Order
    // right, root, left
    // 39, 36, 28, 15, 12, 3, 2
    const dfsPostOrder = () => {
        let result = [];

        const traverse = node => {
            if (node.right) traverse(node.right);
            result.push(node.value);
            if (node.left) traverse(node.left);

        }
        traverse(root);
        return result;
    }

    // breadth first search
    const bfs = () => {
        let result = [];
        let queue = [];

        queue.push(root);
        while (queue.length) {
            let currentNode = queue.shift();
            result.push(currentNode);

            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
        return result;
    }

    return {
        root,
        count: 0,
        insert,
        min,
        max,
        contains,
        dfsInOrder,
        dfsPostOrder,
        dfsPreOrder,
        bfs
    }
}

// Array 2, 3, 12, 15, 28, 36, 39

// Tree       15
//        3       36 
//     2   12   28   39
const badArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const purgedDupes = [...new Set(badArray)];
const sorted = mergeSort(purgedDupes);
const bst = createBST(15);
bst.insert(2);
bst.insert(3);
bst.insert(12);
bst.insert(28);
bst.insert(36);
bst.insert(39);

console.log(bst);
console.log(bst.min());
console.log(bst.max());
console.log(bst.contains(2));
console.log(bst.contains(1000));
console.log(bst.dfsInOrder());
console.log(bst.dfsPreOrder());
console.log(bst.dfsPostOrder());
console.log(bst.bfs());

