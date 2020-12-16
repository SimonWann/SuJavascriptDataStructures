const {Dictionary} = require('./11字典')
const {Queue} = require('./02队列')
class Graph {
    constructor() {
        this.vertex = []
        this.edges = new Dictionary()
    }
    addVertex(v) {
        this.vertex.push(v)
        this.edges.set(v, [])
    }
    addEdge(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }
    toString() {
        let resultString = ''
        this.vertex.forEach((value, index) => {
            resultString += value + ' -> '
            let vEdges = this.edges.get(value) 
            resultString += (vEdges.toString() + '\n')
        })
        console.log(resultString)
        return resultString
    }
    initializeColor() {
        let colors = []
        for (let i=0 ;i<this.vertex.length ;i++) {
            colors[this.vertex[i]] = 'white'
        }
        return colors
    }
    bfs(v, handler) {
        let color = this.initializeColor()
        console.log(color)
        let queue = new Queue()
        queue.Enqueue(v)
       
        while(!queue.isEmpty()) {
            // console.log(queue,'queue')
            let v1 = queue.Dequeue()
            let vlist = this.edges.get(v1)
            color[v] = 'gray'
            for(let i = 0;i<vlist.length;i++) {
                let other = vlist[i]
                if(color[other] === 'white') {
                    color[other] = 'gray'
                    queue.Enqueue(other)
                }
            }
            handler(v1)
            color[v1] = 'black'
        }
    }
    dfsVisit(v, colors, handler) {
        colors[v] = 'gray'
        handler(v)
        let vlist = this.edges.get(v)
        for(let i = 0; i<vlist.length; i++) {
            if(colors[vlist[i]] === 'white')
            this.dfsVisit(vlist[i], colors, handler)
        }
        colors[v] = 'black'
    }
}
const grapg = new Graph()
let vertex = 'ABCDEFGHI'
for(let i = 0;i<vertex.length;i++) {
    console.log(vertex[i],i)
    grapg.addVertex(vertex[i])
}
console.log(grapg.vertex)
grapg.addEdge('A', 'B')
grapg.addEdge('A', 'C')
grapg.addEdge('A', 'D')
grapg.addEdge('C', 'D')
grapg.addEdge('C', 'G')
grapg.addEdge('D', 'G')
grapg.addEdge('D', 'H')
grapg.addEdge('B', 'E')
grapg.addEdge('B', 'F')
grapg.addEdge('E', 'I')
grapg.toString()
// grapg.bfs(grapg.vertex[0],(a) => {
//     console.log(a)
// })
grapg.dfsVisit(grapg.vertex[0], grapg.initializeColor(), (v) => {
    console.log(v)
})
// console.log(Dictionary)
// grapg.addEdge()