class DoublyLinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }
    append(element){
        const ele = new NewDNode(element)
        if(this.length === 0) {
            this.head = ele
            this.tail = ele
        }   else {
            this.tail.next = ele
            ele.prev = this.tail
            this.tail = ele
        }
        this.length++
    }
    backwardString() {
        let current = this.head
        let result = ''
        while(current) {
            result += current.item.name + ','
            current = current.next
        }
        return result
    }
    forwardString() {
        let current = this.tail
        let result = ''
        while(current) {
            result += current.item.name + ','
            current = current.prev
        }
        return result
    }
    insert(position, item) {
        let ele = new NewDNode(item)
        let current = this.head
        let index = 0
        if( position < 0 || position > this.length) {
            return false
        }
        if(this.length === 0) {
            this.head = ele
            this.tail = ele
        } else {
            if(position === 0) {
                ele.next = this.tail
                this.tail.prev = ele
                this.head = ele
            } else if(position === this.length) {
                this.tail.next = ele
                ele.prev = this.tail
                this.tail = ele
            } else {
                while(index++ < position) {
                    current = current.next
                }
                ele.next = current
                ele.prev = current.prev
                current.prev.next = ele
                current.prev = ele
            }
        }
        this.length++
    }
    get(position) {
        let index = 0
        if(position < this.length/2){
            let current = this.head
            while(index++ < position) {
                current = current.next
            }
            return current.item
        }   else {
            let current = this.tail
            while(index++ < this.length - 1 - position) {
                current = current.prev
            }
            return current.item
        }
        
    }
    indexOf(item) {
        const ele = new NewDNode(item)
        let current = this.head
        let index = 0
        let result = []
        while(current) {
            if(ele.item.name === current.item.name) {
                result.push(index)
            }
            index++
            current = current.next
        }
        return result
    }
    update(position, item) {
        if(position < 0 || position >= this.length) {
            return false
        }
        let index = 0
        let current = this.head
        while(index++ < position){
            // console.log(current)
            current = current.next
        }
        current.item = item   
        return true  
    }
    removeAt(position) {
        if( position < 0 || position > this.length){
            return null
        }
        let index = 0
        let current = this.head
        if(this.length === 0) {
            return null
        } else if(this.length === 1){
            this.head = null
            this.tail = null
        } else if(position === 0){
            this.head = this.head.next
            this.head.next.prev = null
        }else if(position === this.length - 1 ){
            this.tail.prev.next = null
            this.tail = this.tail.prev
        } else {
            while(index++ < position){
                current = current.next
            }
            current.prev.next = current.next
            current.next.prev = current.prev

        }
    }
}
class NewDNode{
    constructor(item){
        this.prev = null
        this.next = null
        this.item = item
    }
}

const dlink = new DoublyLinkedList()
dlink.append({
    name: 'simon'
})
dlink.append({
    name: 'song'
})
dlink.append({
    name: 'cherry'
})
// console.log(dlink)
console.log(dlink.backwardString())
// console.log(dlink.forwardString())
dlink.insert(1, {
    name: 'simonwann'
})
dlink.insert(4, {
    name: 'SongY'
})
console.log(dlink.backwardString())
console.log(dlink.get(3))
// console.log(dlink.tail)
console.log(dlink.indexOf({
    name: 'cherry'
}))
dlink.update(3, {
    name: 'cherryH'
})
console.log(dlink.backwardString())
dlink.removeAt(3)
console.log(dlink.backwardString())