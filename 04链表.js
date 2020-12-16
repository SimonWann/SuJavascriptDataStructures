class LinkedList{
    constructor(){
        this.length = 0
        this.head = null 
    }
    append(data) {
        const newNode = new NewNode(data)
        if(this.length === 0) {
            this.head = newNode
        } else {
            let current = this.head
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }
        this.length++
    }
    toString() {
        let current = this.head
        let linkString = ''
        while(current) {
            linkString += current.data.name + ','
            current = current.next
        }
        return linkString
    }
    insert(position, data) {
        if (position > this.length || position < 0){
            return 'err position'
        }
        const newNode = new NewNode(data)
        if(position === 0) {
            newNode.next = this.head
            this.head = newNode
        } else {
            let current = this.head
            let previous = null
            let index = 0
            while(index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = newNode
            newNode.next = current
        }
        this.length++
    }
    get(position) {
        if(position >= this.length || position < 0)return 'err'
        let current = this.head
        let index = 0
        while(index++ < position) {
            current = current.next
        }
        return current.data.name
    }
    indexOf(data) {
        let current = this.head
        let index = 0
        let result = []
        while(current){
            if(current.data.name === data.name) {
                result.push(index)
            }
            current = current.next
            index++
        }
        return result
    }
    update(position, data) {
        let current = this.head
        let index = 0
        while(index++ < position) {
            current = current.next
        }
        current.data = data
    }
    removeAt(position) {
        if(position === 0) {
            this.head = this.head.next
        } else {
            let previous = null
            let current = this.head
            let index = 0
            while(index++ < position) {
                previous = current
                current = current.next
            }
            previous.next = current.next
        }
        this.length--
        return true
    }
    remove(data) {
        let position = this.indexOf(data)
        let index = []
        // for(let item of position) {
        //     index.unshift(item)
        // }
        // for(let item of index) {
        //     this.removeAt(item)
        // }
        position.reverse()
        for(let item of position) {
                this.removeAt(item)
            }
        return true
    }
    isEmpty() {
        return this.length === 0
    }
    size() {
        return this.length
    }
}
class NewNode{
    constructor(data){
        this.data = data
        this.next = null
    }
}
const l = new LinkedList()
l.append({
    name: 'song'
})
l.append({
    name: 'simon'
})
l.append({
    name: 'cherry'
})
console.log(l)
console.log(l.toString())
l.insert(3,{
    name: 'Y'
})
console.log(l.toString())
l.insert(3,{
    name: 'Y'
})
console.log(l.toString())
l.insert(3,{
    name: 'Songyu'
})
console.log(l.toString())
l.insert(0,{
    name: 'Y'
})
console.log(l.toString())
console.log(l.get(0))
console.log(l.indexOf({
    name: 'simon'
}))
console.log(l.indexOf({
    name: 'Y'
}))
l.update(0, {
    name: 'songYuuuu'
})
console.log(l.toString())
l.update(5, {
    name: 'songYuuuu'
})
console.log(l.toString())
l.removeAt(0)
console.log(l.toString())
l.remove({
    name: 'simon'
})
l.remove({
    name: 'cherry'
})
console.log(l.toString())
