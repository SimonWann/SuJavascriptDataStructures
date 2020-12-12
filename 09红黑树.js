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
        // this.heirarchy = 0
        // this.lh = 1
        // this.rh = 1
        // this.treeImg = []
        // this.isLeft = true
        // this.gShow = false
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
    insert(key, value) {
        //按照正常二叉树的方式插入节点
        const newNode = new Node(0, key, value, 'red')
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
        u && console.log('u:', u.key, 'p:', p.key, 'newNode:', newNode.key)
        this.fixup(newNode, finalP, g, u, gp)
    }
    fixup(n, p, g, u, gp) {
        console.log('fix',this.root.key, n.key)
        //修正的五条规则：
        //规则1：插入节点是根节点，将其颜色变红，并加入叶子节点
        if( this.root.key === n.key ) {
            this.root.color = 'black'
            this.root.left = this.leave()
            this.root.right = this.leave()
        }
        //规则2： 插入节点父节点p是黑色，插入节点n是红色。我们不需要做任何事情，除了增加与删除叶子节点
        else if(n.color === 'red' && p && p.color === 'black') {
            console.log('situation 2')
            // if(p.left && p.left.key === n.key) {
            //     p.right = this.leave()
            // } else if(p.right && p.right.key === n.key) {
            //     p.left = this.leave()
            // }
            n.left = this.leave()
            n.right = this.leave()
        }
        //规则3： 父红，叔红，祖黑。分两种情况，父在左，或父在右
        else if(p && u && g && p.color === 'red' && u.color === 'red' && g.color === 'black') {
            console.log('situation 3')
            p.color = 'black'
            u.color = 'black'
            g.color = 'red'
            n.right = this.leave()
            n.left = this.leave()
            if(this.root === g) {
                    g.color = 'black'
            }
            // if(g.left.key === p.key) {
            //     if(p.left.key === n.key) {
                    
            //     } else if(p.right.key === n.key) {

            //     }
            // }else if(g.right.key === p.key) {
            //     if(p.left.key === n.key) {

            //     } else if(p.right.key === n.key) {
                    
            //     }
            // }
            //规则4： 父红，叔黑，祖黑，n左
        }else if(p && u && g && p.color === 'red' && u.color === 'black' && g.color === 'black' && p.left == n) {
            p.color = 'black'
            g.color = 'red'
            n.left = this.leave()
            n.right = this.leave()
            if(g.left.key == p.key) {
                g.left = null
                if(p.right && p.right.key != -1) {
                    g.left = p.right
                }
            }else if(g.right.key == p.key) {
                // g.right = null
                // if(p.right && p.right.key != -1) {
                //     g.left = p.right
                // }
                console.log(n,p,'here the right in situation 4')
            }
            p.right = g
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
        }
    }

    //  --------------------------------old--------------------------------------  
    // insert(key, value, color, level = 0) {
    //     const n = new Node(level, key, value, color)
    //     const p = null
    //     const u = null
    //     const g = null
    //     const gp = null
    //     if(!this.root) {
    //         n.color = 'black'
    //         this.root = n
    //         n.left = this.leave(this.heirarchy + 1)
    //         n.right = this.leave(this.heirarchy + 1)
    //         this.heirarchy++
    //         this.root.level = this.heirarchy
    //     } else {
    //         this.insertNode(this.root, n, p, g, u, gp)
    //     }   
    // }
    // insertNode(node, newNode, p, g, u, gp) {
     
    //     p = node
    //     if(newNode.key < node.key) {
    //         if(node.left && node.left.key != -1) {
    //             if(gp) {
    //                 if(this.gShow) {
    //                     if(newNode.key <gp.key) {
    //                         this.isLeft = true
    //                     } else {
    //                         this.isLeft = false
    //                     }
    //                     this.gShow = false
    //                 }
    //             }
    //             console.log('p:',node.left.key)
    //             p = node.left
    //             g = node
    //             u = node.right
    //             if((p.left && p.left.key != -1) || (p.right && p.right.key != -1)) {
    //                 gp = g
    //                 this.gShow = true
    //                 // console.log('get and update gp-------', gp.key, gp.left.key, gp.right.key)
    //             }
    //             this.insertNode(node.left, newNode,p, g, u, gp)
    //         }else if(node.left){
    //             newNode.left = this.leave(this.lh + 1)
    //             newNode.right = this.leave(this.rh + 1)
    //             node.left = newNode
    //             this.lh++
    //             node.left.level = this.lh
    //             if(p.color === 'black' && newNode.color === 'red') {
    //                 console.log('here the 2')
    //             } else if(p && u && g && p.color === 'red' && u.color === 'red' && g.color === 'black') {
    //                 // p红u红g黑
    //                 console.log('here the 3')
    //                 p.color = 'black'
    //                 u.color = 'black'
    //                 g.color = 'red'
    //             } else if(p && u && g && p.color === 'red' && u.color === 'black' && g.color === 'black') {
    //                 console.log('here the 4')
    //                 // p红u黑g黑n左
    //                 if(gp) {
    //                     if(this.isLeft) {
    //                         gp.left = p
    //                     } else {
    //                         gp.right = p
    //                     }
    //                     p.color = 'black'
    //                 }
    //                 if(this.root == g) {
    //                     if(this.isLeft) {
    //                         this.root.left = p
    //                     } else {
    //                         this.root.right = p
    //                     }
    //                     console.log('root:',gp.key)
    //                 }
    //                 if(p.right && p.right.key != -1) {
    //                     g.left = p.right
    //                 }else if(p.right) {
    //                     g.left = this.leave(u.level)
    //                 }
    //                 p.color = 'black'
    //                 g.color = 'red'
    //                 p.right = g
    //             }
    //         }
    //     }else if(newNode.key > node.key){
    //         if(gp) {
    //             if(this.gShow) {
    //                 if(newNode.key <gp.key) {
    //                     this.isLeft = true
    //                 } else {
    //                     this.isLeft = false
    //                 }
    //                 this.gShow = false
    //             }
    //         }
    //         if(node.right && node.right.key != -1) {
    //             p = node.right
    //             g = node
    //             u = node.left
    //             if((p.left && p.left.key != -1) || (p.right && p.right.key != -1)) {
    //                 gp = g
    //                 this.gShow = true
    //             }
    //             this.insertNode(node.right, newNode,p ,g ,u, gp)
    //         } else if(node.right){
    //             newNode.left = this.leave(this.lh + 1)
    //             newNode.right = this.leave(this.rh + 1)
    //             node.right = newNode
    //             this.rh++
    //             node.right.level = this.rh
    //             if(p.color === 'black' && newNode.color === 'red') {
    //                 console.log('here the 2')
    //             } else if(p && u && g && p.color === 'red' && u.color === 'red' && g.color === 'black') {
    //                 // p红u红g黑
    //                 console.log('here the 3')
    //                 p.color = 'black'
    //                 u.color = 'black'
    //                 g.color = 'red'
    //             } else if(p.color === 'red' && u.color === 'black' && g.color === 'black') {
    //                 //p红u黑g黑n右
    //                 console.log('here is 5 ------------')
    //                 g.left = node.right
    //                 node.right.left = p
    //                 p.right = this.leave(this.rh + 1)
    //                 if(this.isLeft) {
    //                     gp.left = node.right
    //                 } else {
    //                     gp.right = node.right
    //                 }
    //                 if(this.root == g) {
    //                     this.root = node.right
    //                     console.log('root:',this.root.key)
    //                 }
    //                 node.right.right = g
    //                 node.right.color = 'black'
    //                 g.color = 'red'
    //             }
                
    //         }
    //     }else {
    //         return false
    //     }
    //     if(this.lh > this.rh) {
    //         this.heirarchy = this.lh + 1
    //     } else {
    //         this.heirarchy = this.rh + 1
    //     }
    // }
    //  --------------------------------old-------------------------------------- 

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
