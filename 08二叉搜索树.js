class Node{
    constructor(key, value) {
        this.right = null
        this.left = null
        this.key = key
        this.value = value
    }
}
class BinarySearchTree{
    constructor() {
        this.root = null
        this.traversal = []
    }
    insert(key, value) {
        let newNode = new Node(key, value)
        if(this.root) {
            console.log('root not here')
            this.insertNode(this.root, newNode)
        } else {
            console.log('root is here')
            this.root = newNode
        }
    }
    insertNode(node, newNode) {
        if(newNode.key > node.key) {
            if(node.right) {
                this.insertNode(node.right, newNode)
            } else {
                node.right = newNode
            }
        } else {
            if(node.left) {
                this.insertNode(node.left, newNode)
            } else {
                node.left = newNode
            }
        }
    }
    preOrderTravelsal() {
        this.traversal = []
        this.preOrderTravelsalNode(this.root)
        return this.traversal
    }
    preOrderTravelsalNode(node) {
        if(node) {
            this.traversal.push(node.key)
            if(node.left) {
                this.preOrderTravelsalNode(node.left)
            }
            if(node.right) {
                this.preOrderTravelsalNode(node.right)
            }
        }
        return node.key
    }
    midOrderTravelsal(node) {
        this.traversal = []
        this.midOrderTravelsalNode(this.root)
        return this.traversal
    }
    midOrderTravelsalNode(node) {
        if(node) {
            if(node.left) {
                this.preOrderTravelsalNode(node.left)
            }
            this.traversal.push(node.key)
            if(node.right) {
                this.preOrderTravelsalNode(node.right)
            }
        }
        return node.key
    }
    postOrderTravelsal(node) {
        this.traversal = []
        this.postOrderTravelsalNode(this.root)
        return this.traversal
    }
    postOrderTravelsalNode(node) {
        if(node) {
            if(node.left) {
                this.preOrderTravelsalNode(node.left)
            }
            if(node.right) {
                this.preOrderTravelsalNode(node.right)
            }
            this.traversal.push(node.key)
        }
        return node.key
    }
    search(key) {
        let node = this.root
        while(node) {
            if(key > node.key) {
                node = node.right
            } else if(key < node.key){
                node = node.left
            } else if(key === node.key){
                return node
            } else {
                return false
            }
        }
    }
    getMin() {
        if(this.root == null) return null
        let node = this.root
        while(node.left) {
            node = node.left
        }
        return node.key 
    }
    getMax() {
        if(this.root = null) return null
        let node = this.root
        while(node.right) {
            node = node.right
        }
        return node.key 
    }
    remove(key) {
        let current = this.root
        let parent = null
        let isLeftChild = true
        while(key != current.key) {
            parent = current
            if(key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }
            if(!current) return false
        }
        if(!current.left && !current.right) {
            if(current === this.root) {
                this.root = null
            } else if(isLeftChild){
                parent.left = null
            } else {
                parent.right = null
            }
        } else if(!current.left) {
            if(current === this.root) {
                this.root = current.right
            } else if(isLeftChild){
                parent.left = current.right
            }else {
                parent.right = current.right
            }
        } else if(!current.right){
            if(current === this.root) {
                this.root = current.left
            } else if(isLeftChild){
                parent.left = current.left
            }else {
                parent.right = current.left
            }
        } else if(current.right && current.left) {
            if(current == this.root) {
                parent = current
                current = parent.left
                while(current.right) {
                    parent = current
                    current = current.right
                }
                parent.right = null
                current.left = this.root.left
                current.right = this.root.right
                this.root = current
            } else {
                let thisCurrent = current
                let thisParent = parent
                parent = current
                current = current.left
                while(current.right) {
                    parent = current
                    current = current.right
                }
                if(isLeftChild) {
                    current.left = thisCurrent.left
                    current.right = thisCurrent.right
                    thisParent.left = current
                    parent.right = null
                } else if(!isLeftChild){
                    current.left = thisCurrent.left
                    current.right = thisCurrent.right
                    thisParent.right = current
                    parent.right = null
                }
            }
        }
        
    }
}


const bst1 = new BinarySearchTree()
bst1.insert(99, 'hello')
bst1.insert(9, 'yes')
bst1.insert(122, 'nod')
bst1.insert(34, 'eoood')
bst1.insert(35, 'dsod')
bst1.insert(14, 'ttyood')
bst1.insert(24, 'oyhod')
console.log(bst1)
// console.log(bst1.preOrderTravelsal())
// console.log(bst1.getMin())
// console.log(bst1.search(9))
bst1.remove(14)
console.log(bst1)
console.log(bst1.preOrderTravelsal())
