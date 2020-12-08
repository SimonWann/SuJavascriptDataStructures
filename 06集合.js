class Myset {
    constructor() {
        this.items = {}
    }
    add(value) {
        if(this.has(value)) {
            return false
        }
        this.items[value] = value
    }
    has(value) {
        return this.items.hasOwnProperty(value)
    }
    remove(value) {
        delete this.items[value]
        return true
    }
    clear() {
        this.items = {}
    }
    size() {
        return Object.keys(this.items).length
    }
    values() {
        return Object.keys(this.items)
    }
    union(otherSet) {
        let result = new Myset()
        if(otherSet instanceof Myset) {
            this.values().concat(otherSet.values()).filter((value, index) => {
                return result.add(value)
            })
            return result
        }
    }
    intersaction(otherSet) {
        let result = new Myset()
        if(otherSet instanceof Myset) {
            otherSet.values().filter((value, index) => {
                return this.has(value)
            }).forEach((value, index) => {
                result.add(value)
            })
            return result
        }
    }
    difference(otherSet) {
        let result = new Myset()
        this.values().forEach((value, index) => {
            result.add(value)
        })
        otherSet.values().filter((value, index) => {
            if(this.has(value)) {
                result.remove(value)
            }
        })
        return result
    }
    subset(otherSet) {
        let result = true
        otherSet.values().forEach((value, index) => {
            if(!this.has(value)) {
                result = false
            }
        })
        return result
    }
}

let ss = new Myset();
ss.add('abc')
ss.add('bcd')
ss.add('cda')
ss.add('eda')
console.log(ss.values())
console.log(ss.has('abc'))
console.log(ss.has('abcd'))
ss.remove(ss.remove('abc'))
console.log(ss.values())
let s2 = new Myset()
s2.add('ssdsad')
s2.add('asf123ssdsad')
s2.add('fasssdsad')
s2.add('ssafsdsad')
s2.add('abc')
s2.add('abc')
s2.add('bcd')
let s3 = new Myset()
s3.add('bcd')
console.log('这是是合并',ss.union(s2).values())
console.log('这是是交集',ss.intersaction(s2).values())
console.log('这里是差集',ss.difference(s2).values())
console.log('这里是子集',ss.subset(s2))
console.log('这里是子集',ss.subset(s3))

