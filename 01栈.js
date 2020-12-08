class Stack {
    constructor(item, ele = 'new Element') {
        this.item = item
        this.ele = ele
    }
    pop() {
        return this.item.pop()
    }
    push(ele) {
        return this.item.push(ele)
    }
    peek() {
        return this.item[this.item.length-1]
    }
    isEmpty() {
        return this.item.length === 0
    }
    toString() {
        let result = ''
        for(ele of this.item) {
            result += ele + ' '
        }
        return result
    }
}
let hereStack = new Stack([12, 32, 52, 10], 'new Element')
// console.log(hereStack.item)
// hereStack.pop()
// console.log(hereStack.item)
// hereStack.push('123asd')
// console.log(hereStack.item)
// console.log(hereStack.peek())
let bin = ''
function decToBin(number) {
    let result = new Stack([])
    result.push(number%2) 
    number = Math.floor(number/2)
    console.log(number)
    if (number > 0) {
        decToBin(number)
    }
    while (result.item.length > 0) {
        bin += result.pop()+ ''
        console.log(bin)
    }
    return bin+' = bin'
}
console.log(decToBin(100))
console.log(3/2)