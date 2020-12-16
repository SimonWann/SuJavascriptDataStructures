class Node {
    constructor(level = 0, key, value, color) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
        this.color = color
        this.level = level
    }
}
class RedBlackTree {
    constructor() {
        this.root = null
        this.pFromeG = ''
        this.gFromGp = ''
        this.recursion = {
            isRecurse: false,
            node: {}
        }
    }
    travelsal() {
        let node = this.root
        this.treeImg = []
        let sideLine = ' -- '
        for(let i = 0;i<this.heirarchy;i++) {
            this.treeImg[i] = []
        }
        this.travelsalNode(node)
        this.treeImg.forEach( (value, index) => {
            value.forEach((value2, index2) => {
                process && process.stdout.write(value2 + '')

                for(let j=0;j<=index2;j++) {
                    process && process.stdout.write(sideLine)
                }
            })
            console.log('\n')
        })
    }
    travelsalNode(node) {
        this.treeImg[node.level].push(node.key)
        if(node.left && node.left.key != -1) {
            this.travelsalNode(node.left)
        }
        if(node.right && node.right.key != -1) {
            this.travelsalNode(node.right)
        } else {
            return
        }
    }
    leave(level = 0) {
        return new Node(level, -1, 'NIL', 'black')
    }
    insert(key, value, recursion) {
        //按照正常二叉树的方式插入节点
        let newNode 
        if(this.recursion.isRecurse) {
            newNode = this.recursion.node
            console.log('cursion:',newNode)
            this.recursion.isRecurse = false
        } else {
            newNode = new Node(0, key, value, 'red')
        }
        let p = null
        let finalP = null
        let g = null
        let u = null
        let gp = null
        if(!this.root) {
            this.root = newNode
            this.fixup(newNode, finalP, g, u)
            return
        }
        p = this.root
        //非空节点就跳出
        while(newNode.key !== p.key){
            // console.log(p.key,newNode.key)
            //删除叶子节点，恢复成普通二叉树
            if(p.left && p.left.key === -1 && p.key === this.root.key) {
                p.left = null
            }
            if(p.right && p.right.key === -1 && p.key === this.root.key) {
                p.right = null
            }
            //拿到祖祖父节点
            if(gp && gp.left == g) {
                this.gFromGp = 'left'
            } else if(gp && gp.right == g) {
                this.gFromGp = 'right'
            } else {
                if(!gp) {
                    gp = g
                } else {
                    //利用g数据在下面循环更新，gp数据还没更新时，上面的判断会跳到这一块代码进行gp的更新
                    if(this.gFromGp === 'left') {
                        gp = gp.left
                    } else if(this.gFromGp === 'right') {
                        gp = gp.right
                    }
                }                
            }
            if(newNode.key < p.key) {
                if(p.left && p.left.key != -1) {
                    g = p
                    u = p.right
                    p = p.left
                } else {
                    // console.log(p.key,newNode.key)
                    p.left = newNode
                    //删除叶子节点
                    // if(p.right && p.right.key === -1)  p.right = null
                    finalP = p
                    if(this.root.left && this.root.left.key === p.key) {
                        g = this.root
                        this.pFromeG = 'left'
                    } else if(this.root.right && this.root.right.key === p.key) {
                        g = this.root
                        this.pFromeG = 'right'
                    }
                    break
                }
            } else if(newNode.key > p.key && p.key > 0) {
                if(p.right && p.right.key != -1) {
                    g = p
                    u = p.left
                    p = p.right
                } else {
                    p.right = newNode
                    //删除叶子节点
                    // if(p.left && p.left.key === -1) p.left = null
                    finalP = p
                    if(this.root.left && this.root.left.key === p.key) {
                        g = this.root
                        this.pFromeG = 'left'
                    } else if(this.root.right && this.root.right.key === p.key) {
                        g = this.root
                        this.pFromeG = 'right'
                    }
                    break
                }
            }
        }
        //将现在插入成功的节点交给红黑树修正函数
        // u && console.log('u:', u.key, 'p:', p.key, 'newNode:', newNode.key)
        this.fixup(newNode, finalP, g, u, gp)
    }
    fixup(n, p, g, u, gp) {
        // console.log('fix',this.root.key, n.key)
        //修正的五条规则：
        //规则1：插入节点是根节点，将其颜色变红，并加入叶子节点
        if( this.root.key === n.key ) {
            this.root.color = 'black'
            this.root.left = this.leave()
            this.root.right = this.leave()
        }
        //规则2： 插入节点父节点p是黑色，插入节点n是红色。我们不需要做任何事情，除了增加与删除叶子节点
        else if(n.color === 'red' && p && p.color === 'black') {
            n.left = this.leave()
            n.right = this.leave()
        }
        //规则3： 父红，叔红，祖黑。分两种情况，父在左，或父在右
        else if(p && u && g && p.color === 'red' && u.color === 'red' && g.color === 'black') {
            console.log('situation 3')
            p.color = 'black'
            u.color = 'black'
            g.color = 'red'
            if(!n.right) {
                n.right = this.leave()
            }
            if(!n.left) {
                n.left = this.leave()
            }
            
            if(this.root === g) {
                    g.color = 'black'
                    gp = null
            }
            if(gp && gp.color == 'red') {
                // console.log('recursion:',gp,this, g)
                this.recursion.isRecurse = true
                this.recursion.node = g
                if(this.gFromGp === 'left') {
                    gp.left = this.leave()
                    this.insert(g.key, g.value, this.recursion)
                } else if(this.gFromGp === 'right'){
                    gp.left = this.leave()
                    this.insert(g.key, g.value, this.recursion)
                }
            }
            //规则4： 父红，叔黑，祖黑，n左
        }else if(p && u && g && p.color === 'red' && u.color === 'black' && g.color === 'black' && p.left == n) {
            p.color = 'black'
            g.color = 'red'
            n.left = this.leave()
            n.right = this.leave()
            if(g.left.key == p.key) {
                g.left = this.leave()
                if(p.right && p.right.key != -1) {
                    g.left = p.right
                }
            }else if(g.right.key == p.key) {
                console.log(n,p,'here the right in situation 4')
            }
            p.right = g
            //祖祖父的指向换掉
            if(this.gFromGp === 'left') {
                gp.left = p
            } else if(this.gFromGp === 'right') {
                gp.right = p
            }
            if(this.root == g) {
                this.root = p
            }
            if(this.root.left == g) {
                this.root.left = p
            } else if(this.root.right == g) {
                this.root.right = p
            }
        //规则5 父红，叔红，祖黑，n右
        }else if(p && u && g && p.color === 'red' && u.color === 'black' && g.color === 'black' && p.right == n) {
            if(g.left.key === p.key) {
                g.left = n
                p.right = this.leave()
                n.left = this.leave()
                n.right = this.leave()
                this.recursion.isRecurse = true
                this.recursion.node = p
                this.insert(p.key, p.value, this.recursion)
            }else if(g.right.key === p.key) {
                console.log('the situation is undefined')
            }
        }
    }
}

let ebt = new RedBlackTree()
ebt.insert(20, 'sss')
ebt.insert(19, 'aaa')
ebt.insert(25, 'aaa')
ebt.insert(23, 'aaa')
ebt.insert(21, 'aaa')
ebt.insert(29, 'aaa')
ebt.insert(18, 'aaa')
ebt.insert(17, 'aaa')
ebt.insert(16, 'aaa')
ebt.insert(15, 'aaa')
ebt.insert(14, 'aaa')
ebt.insert(13, 'aaa')
ebt.insert(16, 'aaa', 'red')
// ebt.travelsal()
console.log(ebt)
